/* Core helpers: storage, DOM utils, particles, page shells */
(function (EC) {
  const KEY = 'emotioncare.v1';

  /* ---------- storage (local only) ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { entries: [] }; } catch (e) { return { entries: [] }; }
  }
  let state = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } }
  EC.store = {
    all: () => state.entries.slice().sort((a, b) => b.at - a.at),
    byWeek: (n) => state.entries.filter(e => e.week === n),
    find: (week, kind) => state.entries.filter(e => e.week === week && e.kind === kind),
    add(entry) {
      entry.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      entry.at = Date.now();
      state.entries.push(entry); persist(); return entry;
    },
    upsert(entry) { // one entry per (week, kind, session)
      const i = state.entries.findIndex(e => e.week === entry.week && e.kind === entry.kind && (e.session || 0) === (entry.session || 0));
      if (i >= 0) { entry.id = state.entries[i].id; entry.at = Date.now(); state.entries[i] = entry; persist(); return entry; }
      return this.add(entry);
    },
    remove(id) { state.entries = state.entries.filter(e => e.id !== id); persist(); },
    clear() { state.entries = []; persist(); },
    raw: () => state
  };

  /* ---------- DOM helpers ---------- */
  EC.esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  EC.$ = (sel, root = document) => root.querySelector(sel);
  EC.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  EC.hydrateIcons = (root = document) => EC.$$('[data-icon]', root).forEach(n => { if (!n.firstChild) n.innerHTML = EC.icon(n.dataset.icon); });
  EC.reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  EC.rand = (a, b) => a + Math.random() * (b - a);
  EC.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  EC.dateTH = (t) => new Date(t).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' });

  let toastTimer;
  EC.toast = function (msg, kind = '') {
    const t = EC.$('#toast');
    t.className = 'toast show ' + kind;
    t.innerHTML = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  };

  /* ---------- particles ---------- */
  // burst of small shapes from a point (page coords via fixed positioning)
  EC.burst = function (x, y, opts = {}) {
    if (EC.reduceMotion()) return;
    const n = opts.count || 14;
    const colors = opts.colors || ['#f4c64e', '#f28b8b', '#9ccc5a', '#8ec1ea', '#c9b6ef'];
    const shapes = opts.shapes || ['dot', 'star', 'heart'];
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      const shape = EC.pick(shapes);
      p.className = 'particle p-' + shape;
      const c = EC.pick(colors);
      p.style.setProperty('--c', c);
      p.style.left = x + 'px'; p.style.top = y + 'px';
      const size = EC.rand(opts.min || 6, opts.max || 13);
      p.style.width = p.style.height = size + 'px';
      document.body.appendChild(p);
      const ang = opts.up ? EC.rand(-Math.PI * 0.95, -Math.PI * 0.05) : EC.rand(0, Math.PI * 2);
      const dist = EC.rand(opts.dist ? opts.dist * 0.5 : 30, opts.dist || 80);
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
      const g = opts.gravity ?? 60;
      p.animate([
        { transform: 'translate(-50%,-50%) scale(.3) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * 0.7}px), calc(-50% + ${dy * 0.7}px)) scale(1) rotate(${EC.rand(-180, 180)}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + g}px)) scale(.6) rotate(${EC.rand(-360, 360)}deg)`, opacity: 0 }
      ], { duration: opts.duration || EC.rand(700, 1100), easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => p.remove();
    }
  };

  /* ---------- shared UI pieces ---------- */
  EC.weekColor = (w) => 'theme-' + w.theme;

  EC.sidebar = function (w, active) {
    const items = [
      ['overview', 'home', 'ภาพรวมสัปดาห์', `#/week/${w.n}`],
      ['a1', w.acts[0].icon, `กิจกรรมที่ 1<br><b>${w.acts[0].title}</b>`, `#/week/${w.n}/a1`],
      ['a2', w.acts[1].icon, `กิจกรรมที่ 2<br><b>${w.acts[1].title}</b>`, `#/week/${w.n}/a2`],
      ['summary', 'check', 'สรุป &amp; บันทึก<br>การเรียนรู้', `#/week/${w.n}/summary`]
    ];
    return `<aside class="sidebar">
      <div class="side-week"><span class="pill-week">สัปดาห์ที่ ${w.n}</span></div>
      <a class="side-title" href="#/week/${w.n}">${EC.icon('book')}<span><b>สัปดาห์ที่ ${w.n}</b><small>${w.title}<br>(${w.phase})</small></span></a>
      <nav class="side-nav">
        ${items.map(([k, ic, label, href]) => `<a href="${href}" class="${k === active ? 'on' : ''}">${EC.icon(ic)}<span>${label}</span></a>`).join('')}
      </nav>
      <div class="side-weeks" aria-label="เลือกสัปดาห์">
        ${EC.WEEKS.map(x => `<a href="#/week/${x.n}" class="${x.n === w.n ? 'on' : ''}" title="สัปดาห์ที่ ${x.n}: ${x.title}">${x.n}</a>`).join('')}
      </div>
      <div class="side-art">${EC.art.house()}</div>
    </aside>`;
  };

  EC.weekShell = function (w, active, inner) {
    return `<div class="week-layout ${EC.weekColor(w)}">
      ${EC.sidebar(w, active)}
      <section class="week-main">
        <div class="crumbs"><a href="#/">${EC.icon('home')}</a> › <a href="#/program">โปรแกรม</a> › <a href="#/week/${w.n}">สัปดาห์ที่ ${w.n}</a>${active === 'a1' || active === 'a2' ? ` › ${w.acts[active === 'a1' ? 0 : 1].title}` : active === 'summary' ? ' › สรุป' : ''}</div>
        ${inner}
      </section>
    </div>`;
  };

  EC.actHeader = function (w, idx, title, sub, art) {
    return `<header class="act-head">
      <div>
        <span class="tag">สัปดาห์ที่ ${w.n} : กิจกรรมที่ ${idx}</span>
        <h1 class="act-title"><span class="dash l"></span>${title}<span class="dash r"></span></h1>
        <p class="act-sub">${sub}</p>
      </div>
      <div class="act-art">${art || ''}</div>
    </header>`;
  };

  EC.howTo = (text) => `<div class="howto">${EC.icon('target')}<b>วิธีเล่น</b><span>${text}</span></div>`;
})(window.EC);
