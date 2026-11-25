/* Core helpers: storage, DOM utils, particles, page shells */
(function (EC) {
  const KEY = 'emotioncare.v1';

  /* ---------- API ---------- */
  EC.api = async function (method, url, body) {
    const res = await fetch(url, {
      method, credentials: 'same-origin',
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : {},
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    const isJSON = (res.headers.get('content-type') || '').includes('application/json');
    const data = isJSON ? await res.json() : null;
    if (!res.ok) { const err = new Error(data?.error || `HTTP ${res.status}`); err.status = res.status; err.json = isJSON; throw err; }
    return data;
  };

  /* ---------- session & mode ----------
     server mode: data lives in the database, user must log in
     local mode:  no backend reachable (e.g. opened as a static site) → localStorage */
  EC.mode = 'local';
  EC.user = null;
  let state = { entries: [] };
  let queue = Promise.resolve();

  function loadLocal() {
    try { state = JSON.parse(localStorage.getItem(KEY)) || { entries: [] }; } catch (e) { state = { entries: [] }; }
  }
  function persist() { if (EC.mode === 'local') { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* unavailable */ } } }

  EC.boot = async function () {
    try {
      const r = await EC.api('GET', '/api/me');
      EC.mode = 'server'; EC.user = r.user;
      await EC.loadEntries();
    } catch (e) {
      if (e.status === 401 && e.json) { EC.mode = 'server'; EC.user = null; state = { entries: [] }; }
      else { EC.mode = 'local'; loadLocal(); }
    }
  };
  EC.loadEntries = async function () {
    const r = await EC.api('GET', '/api/entries');
    state = { entries: r.entries };
  };
  EC.setUser = async function (u) { EC.user = u; state = { entries: [] }; if (u) await EC.loadEntries(); };

  function sync(promise) {
    promise.catch(e => {
      if (e.status === 401) { EC.toast('หมดเวลาการเข้าสู่ระบบ กรุณาเข้าสู่ระบบใหม่'); EC.user = null; location.hash = '#/login'; }
      else EC.toast('บันทึกไปยังเซิร์ฟเวอร์ไม่สำเร็จ: ' + EC.esc(e.message), 'err');
    });
  }

  EC.store = {
    all: () => state.entries.slice().sort((a, b) => b.at - a.at),
    byWeek: (n) => state.entries.filter(e => e.week === n),
    find: (week, kind) => state.entries.filter(e => e.week === week && e.kind === kind),
    upsert(entry) { // one entry per (week, kind, session)
      entry.at = Date.now();
      const i = state.entries.findIndex(e => e.week === entry.week && e.kind === entry.kind && (e.session || 0) === (entry.session || 0));
      if (i >= 0) { entry.id = state.entries[i].id; state.entries[i] = entry; }
      else { entry.id = 'tmp' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); state.entries.push(entry); }
      if (EC.mode === 'server') {
        // saves are queued so the server always receives steps in order
        const body = { week: entry.week, kind: entry.kind, session: entry.session || 0, title: entry.title, data: entry.data };
        queue = queue.then(() => EC.api('PUT', '/api/entries', body).then(r => { entry.id = r.entry.id; }));
        sync(queue); queue = queue.catch(() => {});
      } else persist();
      return entry;
    },
    remove(id) {
      state.entries = state.entries.filter(e => e.id !== id);
      if (EC.mode === 'server') sync(EC.api('DELETE', '/api/entries/' + encodeURIComponent(id), {})); else persist();
    },
    clear() {
      state.entries = [];
      if (EC.mode === 'server') sync(EC.api('DELETE', '/api/entries', {})); else persist();
    },
    raw: () => state
  };


  /* ---------- program flow: everything unlocks in order ----------
     each week = 4 steps: activity 1 → reflection 1 → reflection 2 → end-of-week feelings record */
  EC.STEPS = [['a1', 0, 'a1'], ['a2', 1, 'a2/1'], ['a2', 2, 'a2/2'], ['summary', 0, 'summary']];
  EC.isAdmin = () => EC.user?.role === 'admin';
  EC.stepDone = (w, i) => { const [k, s] = EC.STEPS[i]; return state.entries.some(e => e.week === w && e.kind === k && (e.session || 0) === s); };
  EC.stepHref = (w, i) => `#/week/${w}/${EC.STEPS[i][2]}`;
  EC.stepLabel = (w, i) => {
    const wk = EC.WEEKS[w - 1];
    return [`กิจกรรมที่ 1 · ${wk.acts[0].title}`, `กิจกรรมที่ 2 · ${wk.acts[1].title} (ครั้งที่ 1)`, `กิจกรรมที่ 2 · ${wk.acts[1].title} (ครั้งที่ 2)`, 'บันทึกความรู้สึกท้ายสัปดาห์'][i];
  };
  EC.stepShort = ['กิจกรรมที่ 1', 'สะท้อนตนเอง ครั้งที่ 1', 'สะท้อนตนเอง ครั้งที่ 2', 'บันทึกความรู้สึกท้ายสัปดาห์'];
  EC.nextStep = () => {
    for (let w = 1; w <= 8; w++) for (let i = 0; i < 4; i++) if (!EC.stepDone(w, i)) return { w, i };
    return null;
  };
  EC.isOpen = (w, i) => {
    if (EC.isAdmin()) return true;
    const n = EC.nextStep();
    return !n || w < n.w || (w === n.w && i <= n.i);
  };
  EC.weekDone = (w) => [0, 1, 2, 3].every(i => EC.stepDone(w, i));
  EC.goNext = (delay = 0) => {
    const go = () => { const n = EC.nextStep(); location.hash = n ? EC.stepHref(n.w, n.i) : '#/journal'; };
    delay ? setTimeout(go, delay) : go();
  };

  /* ---------- stepper: one thing per screen ----------
     elements marked [data-step="i"] inside root belong to step i.
     mode 'single' shows only the current step; 'reveal' keeps earlier steps visible. */
  EC.stepTrack = (titles) => `<div class="step-banner">
      <div class="sb-top"><span class="sb-badge">${EC.icon('target')} วิธีเล่น</span><span class="sb-count"></span></div>
      <p class="sb-hint"></p>
      <ol class="step-track">${titles.map((t, i) => `<li data-i="${i}"><i>${i + 1}</i><span>${t}</span></li>`).join('')}</ol>
    </div>`;
  EC.stepNav = (finish) => `<div class="step-nav">
      <button type="button" class="btn ghost st-prev">${EC.icon('back')} ย้อนกลับ</button>
      <p class="st-err" role="alert"></p>
      <button type="button" class="btn brown st-next">ถัดไป ${EC.icon('arrow')}</button>
      <button type="button" class="btn green st-finish" hidden>${finish || 'บันทึกและไปขั้นตอนถัดไป'} ${EC.icon('arrow')}</button>
    </div>`;
  EC.stepper = function (root, opt) {
    const steps = opt.steps, mode = opt.mode || 'single';
    let cur = 0;
    const els = (i) => EC.$$(`[data-step="${i}"]`, root);
    const prev = EC.$('.st-prev', root), next = EC.$('.st-next', root), fin = EC.$('.st-finish', root), err = EC.$('.st-err', root);
    function show(i, scroll) {
      cur = i;
      steps.forEach((s, k) => els(k).forEach(el => {
        el.hidden = mode === 'single' ? k !== i : k > i;
        el.classList.toggle('st-current', k === i);
        el.classList.toggle('st-past', k < i);
      }));
      EC.$$('.step-track li', root).forEach((li, k) => { li.className = k < i ? 'done' : k === i ? 'on' : ''; });
      EC.$('.sb-count', root).textContent = `ขั้นตอนที่ ${i + 1} จาก ${steps.length}`;
      EC.$('.sb-hint', root).innerHTML = steps[i].hint || steps[i].title;
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1; fin.hidden = i !== steps.length - 1;
      err.textContent = '';
      steps[i].enter?.();
      if (scroll) {
        const top = EC.$('.step-banner', root).getBoundingClientRect().top + scrollY - 90;
        if (top < scrollY) window.scrollTo({ top, behavior: EC.reduceMotion() ? 'auto' : 'smooth' });
      }
    }
    function check() {
      const msg = steps[cur].validate?.();
      if (msg) {
        err.textContent = msg;
        const b = cur === steps.length - 1 ? fin : next;
        b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope');
        return false;
      }
      return true;
    }
    next.addEventListener('click', () => { if (check()) show(cur + 1, true); });
    prev.addEventListener('click', () => show(cur - 1, true));
    fin.addEventListener('click', () => { if (check()) opt.onFinish(); });
    EC.$$('.step-track li', root).forEach((li, k) => li.addEventListener('click', () => {
      if (k < cur) show(k, true); // back is always allowed; forward only through "ถัดไป"
    }));
    show(0);
    return { show, get current() { return cur; } };
  };

  /* required-field helpers for validators */
  EC.need = {
    text: (el, msg) => (el && el.value.trim() ? '' : msg || 'กรุณาเขียนคำตอบก่อนไปขั้นตอนถัดไป'),
    texts: (els, msg) => (els.every(t => t.value.trim()) ? '' : msg || 'กรุณาตอบให้ครบทุกข้อก่อนไปขั้นตอนถัดไป'),
    pick: (n, msg) => (n > 0 ? '' : msg || 'กรุณาเลือกอย่างน้อย 1 ข้อ')
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
    // [key, step index, icon, label, href]
    const items = [
      ['overview', -1, 'home', 'ภาพรวมสัปดาห์', `#/week/${w.n}`],
      ['a1', 0, w.acts[0].icon, `ขั้นที่ 1 · กิจกรรมที่ 1<br><b>${w.acts[0].title}</b>`, EC.stepHref(w.n, 0)],
      ['a2-1', 1, w.acts[1].icon, `ขั้นที่ 2 · กิจกรรมที่ 2<br><b>สะท้อนตนเอง ครั้งที่ 1</b>`, EC.stepHref(w.n, 1)],
      ['a2-2', 2, w.acts[1].icon, `ขั้นที่ 3 · กิจกรรมที่ 2<br><b>สะท้อนตนเอง ครั้งที่ 2</b>`, EC.stepHref(w.n, 2)],
      ['summary', 3, 'heart', 'ขั้นที่ 4<br><b>บันทึกความรู้สึกท้ายสัปดาห์</b>', EC.stepHref(w.n, 3)]
    ];
    return `<aside class="sidebar">
      <div class="side-week"><span class="pill-week">สัปดาห์ที่ ${w.n}</span></div>
      <a class="side-title" href="#/week/${w.n}">${EC.icon('book')}<span><b>สัปดาห์ที่ ${w.n}</b><small>${w.title}<br>(${w.phase})</small></span></a>
      <nav class="side-nav">
        ${items.map(([k, si, ic, label, href]) => {
          const done = si >= 0 && EC.stepDone(w.n, si), open = si < 0 || EC.isOpen(w.n, si);
          const tail = done ? `<i class="sn-ok">${EC.icon('tick')}</i>` : open ? '' : `<i class="sn-lock">${EC.icon('lock')}</i>`;
          return open ? `<a href="${href}" class="${k === active ? 'on' : ''}">${EC.icon(ic)}<span>${label}</span>${tail}</a>`
            : `<span class="locked" aria-disabled="true" title="ปลดล็อกเมื่อทำขั้นตอนก่อนหน้าเสร็จ">${EC.icon(ic)}<span>${label}</span>${tail}</span>`;
        }).join('')}
      </nav>
      <div class="side-weeks" aria-label="เลือกสัปดาห์">
        ${EC.WEEKS.map(x => EC.isOpen(x.n, 0) ? `<a href="#/week/${x.n}" class="${x.n === w.n ? 'on' : ''} ${EC.weekDone(x.n) ? 'done' : ''}" title="สัปดาห์ที่ ${x.n}: ${x.title}">${x.n}</a>`
          : `<span class="locked" title="สัปดาห์ที่ ${x.n} ยังล็อกอยู่">${EC.icon('lock')}</span>`).join('')}
      </div>
      <div class="side-art">${EC.art.house()}</div>
    </aside>`;
  };

  EC.weekShell = function (w, active, inner) {
    return `<div class="week-layout ${EC.weekColor(w)}">
      ${EC.sidebar(w, active)}
      <section class="week-main">
        <div class="crumbs"><a href="#/">${EC.icon('home')}</a> › <a href="#/program">โปรแกรม</a> › <a href="#/week/${w.n}">สัปดาห์ที่ ${w.n}</a>${active === 'a1' ? ` › ${w.acts[0].title}` : active.startsWith('a2') ? ` › ${w.acts[1].title} (ครั้งที่ ${active.slice(3)})` : active === 'summary' ? ' › บันทึกความรู้สึกท้ายสัปดาห์' : ''}</div>
        ${inner}
      </section>
    </div>`;
  };

  EC.actHeader = function (w, idx, title, sub, art) {
    return `<header class="act-head">
      <div>
        <span class="tag">สัปดาห์ที่ ${w.n} : ${typeof idx === "string" ? idx : "กิจกรรมที่ " + idx}</span>
        <h1 class="act-title"><span class="dash l"></span>${title}<span class="dash r"></span></h1>
        <p class="act-sub">${sub}</p>
      </div>
      <div class="act-art">${art || ''}</div>
    </header>`;
  };

  EC.howTo = (text) => `<div class="howto">${EC.icon('target')}<b>วิธีเล่น</b><span>${text}</span></div>`;
})(window.EC);
