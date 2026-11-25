/* ดูแลอารมณ์ครู — API + static server
   Env:
     DATABASE_URL     Postgres connection string (required)
     ADMIN_USERNAME   admin account created/updated on start (optional)
     ADMIN_PASSWORD   password for that admin (optional, min 8 chars)
     REGISTER_CODE    if set, teachers must enter this code to self-register
     PORT             default 3000
*/
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const PROD = process.env.NODE_ENV === 'production' || !!process.env.RENDER;
const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error('DATABASE_URL is required'); process.exit(1); }
const pool = new Pool({
  connectionString: DB_URL,
  ssl: /render\.com|sslmode=require/.test(DB_URL) ? { rejectUnauthorized: false } : false
});
const q = (text, params) => pool.query(text, params);

const SESSION_DAYS = 30;
const COOKIE = 'ec_sid';

async function migrate() {
  await q(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name  TEXT NOT NULL DEFAULT '',
      role          TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('teacher','admin')),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_login_at TIMESTAMPTZ
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS entries (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      week       SMALLINT NOT NULL CHECK (week BETWEEN 1 AND 8),
      kind       TEXT NOT NULL CHECK (kind IN ('a1','a2','summary')),
      session    SMALLINT NOT NULL DEFAULT 0,
      title      TEXT NOT NULL DEFAULT '',
      data       JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, week, kind, session)
    );
    CREATE INDEX IF NOT EXISTS entries_user_idx ON entries(user_id);
  `);
  await q('DELETE FROM sessions WHERE expires_at < now()');
  const u = process.env.ADMIN_USERNAME, p = process.env.ADMIN_PASSWORD;
  if (u && p) {
    if (p.length < 8) console.warn('ADMIN_PASSWORD must be at least 8 characters — admin not created');
    else {
      const hash = await bcrypt.hash(p, 10);
      await q(`INSERT INTO users (username, password_hash, display_name, role) VALUES ($1,$2,'ผู้ดูแลระบบ','admin')
               ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin'`, [u.trim().toLowerCase(), hash]);
      console.log(`admin account ready: ${u}`);
    }
  }
}

/* ---------- helpers ---------- */
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach(c => { const i = c.indexOf('='); if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); });
  return out;
}
function setSessionCookie(res, token, maxAgeSec) {
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}${PROD ? '; Secure' : ''}`);
}
async function startSession(res, userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  await q(`INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '${SESSION_DAYS} days')`, [sha(token), userId]);
  await q('UPDATE users SET last_login_at = now() WHERE id = $1', [userId]);
  setSessionCookie(res, token, SESSION_DAYS * 86400);
}
const publicUser = (u) => ({ id: u.id, username: u.username, displayName: u.display_name, role: u.role });
const USERNAME_RE = /^[a-z0-9._-]{3,32}$/;

// tiny in-memory throttle for login/register
const attempts = new Map();
function throttled(key) {
  const now = Date.now(), a = attempts.get(key) || { n: 0, t: now };
  if (now - a.t > 15 * 60 * 1000) { a.n = 0; a.t = now; }
  a.n++; attempts.set(key, a);
  return a.n > 20;
}

const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* ---------- app ---------- */
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
app.use('/api', express.json({ limit: '2mb' }));

// CSRF guard: state-changing API calls must be JSON (forms can't send that cross-site) and same-origin
app.use('/api', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    if (!req.is('application/json')) return res.status(415).json({ error: 'ต้องส่งข้อมูลเป็น JSON' });
    const origin = req.headers.origin;
    if (origin && new URL(origin).host !== req.headers.host) return res.status(403).json({ error: 'origin ไม่ถูกต้อง' });
  }
  next();
});

// attach user
app.use('/api', ah(async (req, res, next) => {
  const tok = parseCookies(req)[COOKIE];
  if (tok) {
    const r = await q(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = $1 AND s.expires_at > now()`, [sha(tok)]);
    req.user = r.rows[0] || null;
  }
  next();
}));
const needUser = (req, res, next) => req.user ? next() : res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' });
const needAdmin = (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'สำหรับผู้ดูแลระบบเท่านั้น' });

app.get('/api/health', ah(async (req, res) => { await q('SELECT 1'); res.json({ ok: true }); }));
app.get('/api/config', (req, res) => res.json({ registerNeedsCode: !!process.env.REGISTER_CODE }));

app.post('/api/register', ah(async (req, res) => {
  if (throttled('reg:' + req.ip)) return res.status(429).json({ error: 'ลองใหม่อีกครั้งภายหลัง' });
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const displayName = String(req.body.displayName || '').trim().slice(0, 80);
  if (process.env.REGISTER_CODE && req.body.code !== process.env.REGISTER_CODE) return res.status(403).json({ error: 'รหัสลงทะเบียนไม่ถูกต้อง' });
  if (!USERNAME_RE.test(username)) return res.status(400).json({ error: 'ชื่อผู้ใช้ต้องเป็น a-z, 0-9, . _ - ยาว 3–32 ตัว' });
  if (password.length < 8) return res.status(400).json({ error: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร' });
  const hash = await bcrypt.hash(password, 10);
  const r = await q(`INSERT INTO users (username, password_hash, display_name) VALUES ($1,$2,$3) ON CONFLICT (username) DO NOTHING RETURNING *`, [username, hash, displayName || username]);
  if (!r.rows[0]) return res.status(409).json({ error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' });
  await startSession(res, r.rows[0].id);
  res.json({ user: publicUser(r.rows[0]) });
}));

app.post('/api/login', ah(async (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  if (throttled('login:' + req.ip + ':' + username)) return res.status(429).json({ error: 'พยายามเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาที' });
  const r = await q('SELECT * FROM users WHERE username = $1', [username]);
  const u = r.rows[0];
  if (!u || !(await bcrypt.compare(String(req.body.password || ''), u.password_hash))) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  await startSession(res, u.id);
  res.json({ user: publicUser(u) });
}));

app.post('/api/logout', ah(async (req, res) => {
  const tok = parseCookies(req)[COOKIE];
  if (tok) await q('DELETE FROM sessions WHERE token_hash = $1', [sha(tok)]);
  setSessionCookie(res, '', 0);
  res.json({ ok: true });
}));

app.get('/api/me', needUser, (req, res) => res.json({ user: publicUser(req.user) }));

app.post('/api/me/password', needUser, ah(async (req, res) => {
  const { current, next: nw } = req.body;
  if (!(await bcrypt.compare(String(current || ''), req.user.password_hash))) return res.status(400).json({ error: 'รหัสผ่านเดิมไม่ถูกต้อง' });
  if (String(nw || '').length < 8) return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องยาวอย่างน้อย 8 ตัวอักษร' });
  await q('UPDATE users SET password_hash = $1 WHERE id = $2', [await bcrypt.hash(nw, 10), req.user.id]);
  res.json({ ok: true });
}));

/* ---------- entries (own) ---------- */
// order of the 4 steps inside a week: activity 1, reflection 1, reflection 2, end-of-week record
const STEP_ORDER = { 'a1:0': 0, 'a2:1': 1, 'a2:2': 2, 'summary:0': 3 };
const stepIndex = (week, kind, session) => { const k = STEP_ORDER[`${kind}:${session}`]; return k === undefined ? -1 : (week - 1) * 4 + k; };
const STEP_SQL = `((week - 1) * 4 + CASE kind || ':' || session WHEN 'a1:0' THEN 0 WHEN 'a2:1' THEN 1 WHEN 'a2:2' THEN 2 WHEN 'summary:0' THEN 3 ELSE -100 END)`;
const rowToEntry = (r) => ({ id: String(r.id), week: r.week, kind: r.kind, session: r.session || undefined, title: r.title, data: r.data, at: new Date(r.updated_at).getTime() });

app.get('/api/entries', needUser, ah(async (req, res) => {
  const r = await q('SELECT * FROM entries WHERE user_id = $1 ORDER BY week, kind, session', [req.user.id]);
  res.json({ entries: r.rows.map(rowToEntry) });
}));

app.put('/api/entries', needUser, ah(async (req, res) => {
  const { week, kind, session = 0, title = '', data = {} } = req.body || {};
  if (!(Number.isInteger(week) && week >= 1 && week <= 8) || !['a1', 'a2', 'summary'].includes(kind) || ![0, 1, 2].includes(+session || 0))
    return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  // program is sequential: every earlier step (all previous weeks, earlier steps this week) must exist first
  if (req.user.role !== 'admin') {
    const idx = stepIndex(week, kind, +session || 0);
    if (idx < 0) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
    const done = await q(`SELECT COUNT(DISTINCT ${STEP_SQL})::int AS n FROM entries WHERE user_id = $1 AND ${STEP_SQL} >= 0 AND ${STEP_SQL} < $2`, [req.user.id, idx]);
    if (done.rows[0].n < idx) return res.status(409).json({ error: 'ต้องทำขั้นตอนก่อนหน้าให้เสร็จก่อน' });
  }
  const r = await q(`INSERT INTO entries (user_id, week, kind, session, title, data) VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT (user_id, week, kind, session) DO UPDATE SET title = EXCLUDED.title, data = EXCLUDED.data, updated_at = now()
    RETURNING *`, [req.user.id, week, kind, +session || 0, String(title).slice(0, 200), data]);
  res.json({ entry: rowToEntry(r.rows[0]) });
}));

// teachers cannot delete entries: the program is sequential and the data is research data.
// an admin can remove a whole account from the admin page if needed.

/* ---------- admin ---------- */
app.get('/api/admin/users', needUser, needAdmin, ah(async (req, res) => {
  const r = await q(`SELECT u.id, u.username, u.display_name, u.role, u.created_at, u.last_login_at,
      COUNT(e.id)::int AS entry_count, MAX(e.updated_at) AS last_entry_at,
      COALESCE(json_agg(json_build_object('week', e.week, 'kind', e.kind, 'session', e.session)) FILTER (WHERE e.id IS NOT NULL), '[]') AS done
    FROM users u LEFT JOIN entries e ON e.user_id = u.id GROUP BY u.id ORDER BY u.role DESC, u.created_at`);
  res.json({ users: r.rows });
}));

app.post('/api/admin/users', needUser, needAdmin, ah(async (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const role = req.body.role === 'admin' ? 'admin' : 'teacher';
  if (!USERNAME_RE.test(username)) return res.status(400).json({ error: 'ชื่อผู้ใช้ต้องเป็น a-z, 0-9, . _ - ยาว 3–32 ตัว' });
  if (password.length < 8) return res.status(400).json({ error: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร' });
  const r = await q(`INSERT INTO users (username, password_hash, display_name, role) VALUES ($1,$2,$3,$4) ON CONFLICT (username) DO NOTHING RETURNING id`,
    [username, await bcrypt.hash(password, 10), String(req.body.displayName || username).slice(0, 80), role]);
  if (!r.rows[0]) return res.status(409).json({ error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' });
  res.json({ ok: true, id: r.rows[0].id });
}));

app.post('/api/admin/users/:id/password', needUser, needAdmin, ah(async (req, res) => {
  const pw = String(req.body.password || '');
  if (pw.length < 8) return res.status(400).json({ error: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร' });
  await q('UPDATE users SET password_hash = $1 WHERE id = $2', [await bcrypt.hash(pw, 10), +req.params.id]);
  await q('DELETE FROM sessions WHERE user_id = $1', [+req.params.id]);
  res.json({ ok: true });
}));

app.delete('/api/admin/users/:id', needUser, needAdmin, ah(async (req, res) => {
  if (+req.params.id === req.user.id) return res.status(400).json({ error: 'ลบบัญชีตัวเองไม่ได้' });
  await q('DELETE FROM users WHERE id = $1', [+req.params.id]);
  res.json({ ok: true });
}));

app.get('/api/admin/users/:id/entries', needUser, needAdmin, ah(async (req, res) => {
  const r = await q('SELECT * FROM entries WHERE user_id = $1 ORDER BY week, kind, session', [+req.params.id]);
  res.json({ entries: r.rows.map(rowToEntry) });
}));

/* ---------- export ---------- */
// readable text for one entry (images are omitted; JSON export keeps everything)
function entryText(e) {
  const d = e.data || {}, out = [];
  const join = (a) => (a || []).filter(Boolean).join(', ');
  if (e.kind === 'a2') {
    (d.parts || []).forEach((p, i) => {
      const label = (d.labels || [])[i] || `ส่วนที่ ${i + 1}`, qs = (d.questions || [])[i];
      if (Array.isArray(p) && qs) p.forEach((v, k) => { if (v) out.push(`${qs[k] || label}: ${v}`); });
      else if (Array.isArray(p)) { if (p.length) out.push(`${label}: ${join(p)}`); }
      else if (p && (p.sel?.length || p.text)) out.push(`${label}: ${join(p.sel)}${p.text ? ' — ' + p.text : ''}`);
    });
    return out.join('\n');
  }
  const add = (k, v) => { if (v && (!Array.isArray(v) || v.length)) out.push(`${k}: ${Array.isArray(v) ? join(v) : v}`); };
  add('อารมณ์', d.emotions); add('สัญญาณ', d.signals); add('สิ่งกระตุ้น', d.triggers);
  if (d.names) Object.entries({ keep: 'อยากเก็บไว้', unsure: 'ยังไม่รู้จะจัดการยังไง', drop: 'อยากวางลง' }).forEach(([k, t]) => add(t, d.names[k]));
  add('วิธีกำกับอารมณ์', d.strategies); add('ดาวแห่งการเรียนรู้', d.items);
  (d.meanings || []).forEach(m => add(m.name, m.v)); add('คำชวนคิด', (d.prompts || []).filter(Boolean));
  add('เหตุการณ์', d.event); add('สิ่งที่เห็น', d.see); add('สิ่งที่คิด', d.think); add('อยากจำไว้', d.memo);
  if (d.seq) { add('ก่อนเกิดเหตุ', d.seq[0]); add('ขณะเกิดเหตุ', d.seq[1]); add('หลังเกิดเหตุ', d.seq[2]); }
  if (d.obs) ['อารมณ์ของฉัน', 'สิ่งกระตุ้น', 'การตอบสนอง', 'สิ่งที่ได้เรียนรู้'].forEach((l, i) => add(l, d.obs[i]));
  add('บันทึก', d.note); add('สรุป', d.text);
  return out.join('\n');
}
const csvCell = (v) => {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // avoid spreadsheet formula injection
  return '"' + s.replace(/"/g, '""') + '"';
};
const KIND_TH = { a1: 'กิจกรรมที่ 1', a2: 'สะท้อนตนเอง', summary: 'สรุปสัปดาห์' };

app.get('/api/admin/export.csv', needUser, needAdmin, ah(async (req, res) => {
  const params = [], where = req.query.user ? (params.push(+req.query.user), 'WHERE u.id = $1') : '';
  const r = await q(`SELECT e.*, u.username, u.display_name FROM entries e JOIN users u ON u.id = e.user_id ${where} ORDER BY u.username, e.week, e.kind, e.session`, params);
  const head = ['username', 'ชื่อที่แสดง', 'สัปดาห์', 'ประเภท', 'ครั้งที่', 'ชื่อกิจกรรม', 'เนื้อหา', 'บันทึกครั้งแรก', 'แก้ไขล่าสุด'];
  const rows = r.rows.map(e => [e.username, e.display_name, e.week, KIND_TH[e.kind], e.session || '', e.title, entryText(e),
    new Date(e.created_at).toISOString(), new Date(e.updated_at).toISOString()]);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="emotion-care-${req.query.user ? 'user-' + (+req.query.user) : 'all'}-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send('﻿' + [head, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n'));
}));

app.get('/api/admin/export.json', needUser, needAdmin, ah(async (req, res) => {
  const users = (await q('SELECT id, username, display_name, role, created_at, last_login_at FROM users ORDER BY id')).rows;
  const entries = (await q('SELECT * FROM entries ORDER BY user_id, week, kind, session')).rows;
  res.setHeader('Content-Disposition', `attachment; filename="emotion-care-all-${new Date().toISOString().slice(0, 10)}.json"`);
  res.json({ exportedAt: new Date().toISOString(), users, entries });
}));

app.use('/api', (req, res) => res.status(404).json({ error: 'not found' }));

/* ---------- static site ---------- */
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'], maxAge: PROD ? '1h' : 0 }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'ข้อมูลใหญ่เกินไป' });
  res.status(500).json({ error: 'เกิดข้อผิดพลาดในระบบ' });
});

const PORT = process.env.PORT || 3000;
migrate().then(() => app.listen(PORT, () => console.log(`listening on :${PORT}`)))
  .catch(e => { console.error('startup failed', e); process.exit(1); });
