/* Pages + router */
(function (EC) {
  const app = EC.$('#app');

  /* ---------- small animated scenes for activity cards ---------- */
  EC.mini = function (kind) {
    switch (kind) {
      case 'somtam':
        return `<div class="mini-somtam" aria-hidden="true">
          <div class="bubbles">${['happy', 'angry', 'worried', 'content'].map((f, i) => `<span style="--i:${i}">${EC.face(f, 34)}</span>`).join('')}</div>
          <div class="mini-bowl">
            <svg viewBox="0 0 160 90"><ellipse cx="80" cy="26" rx="70" ry="14" fill="#7d3f28"/><path d="M10 26a70 14 0 0 0 140 0c-4 36-30 58-70 58S14 62 10 26z" fill="#fff" stroke="#5a4032" stroke-width="2"/><path d="M72 58c0-6 8-6 8 0 0-6 8-6 8 0 0 6-8 10-8 10s-8-4-8-10z" fill="#f28b8b"/></svg>
            <div class="mini-pile">${['papaya', 'tomato', 'bean', 'chili', 'lime', 'carrot'].map((k, i) => `<span style="--i:${i}">${EC.ingredient(k, 30)}</span>`).join('')}</div>
            <div class="mini-pestle"></div>
          </div>
          <div class="mini-side l">${EC.ingredient('papaya', 46)}</div><div class="mini-side r">${EC.ingredient('lime', 34)}${EC.ingredient('chili', 34)}</div>
        </div>`;
      case 'bouquet':
        return `<div class="mini-bouquet" aria-hidden="true">${['sunflower', 'hydrangea', 'bluebell', 'sakura', 'lily'].map((f, i) => `<span class="mb" style="--i:${i}">${EC.flowerIcon(f, 46)}</span>`).join('')}
          <svg class="mb-wrap" viewBox="0 0 100 70"><path d="M15 10 50 68 85 10z" fill="#fbeedc" stroke="#5a4032" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="40" r="6" fill="#f2a9b4" stroke="#5a4032" stroke-width="1.6"/></svg></div>`;
      case 'timeline':
        return `<div class="mini-art">${EC.art.classroom()}</div>`;
      default:
        return `<div class="mini-art">${(EC.art[kind] || EC.art.notebook)()}</div>`;
    }
  };

  function progress(n) {
    const a1 = EC.store.find(n, 'a1').length > 0;
    const s = EC.store.find(n, 'a2').map(e => e.session);
    return { a1, r1: s.includes(1), r2: s.includes(2), pct: Math.round(((a1 ? 1 : 0) + (s.includes(1) ? 1 : 0) + (s.includes(2) ? 1 : 0)) / 3 * 100) };
  }

  function actCard(w, i) {
    const a = w.acts[i];
    const done = i === 0 ? progress(w.n).a1 : progress(w.n).r1;
    return `<a class="act-card" href="#/week/${w.n}/a${i + 1}">
      <span class="tag">กิจกรรมที่ ${i + 1}${done ? ` · ${EC.icon('tick')} ทำแล้ว` : ''}</span>
      <h3>${a.title}</h3><p>${a.desc}</p>
      <div class="act-pic">${EC.mini(a.art)}</div>
      <span class="btn sm soft">เริ่มกิจกรรม ${EC.icon('arrow')}</span>
    </a>`;
  }

  /* ---------- pages ---------- */
  function home() {
    const w1 = EC.WEEKS[0];
    return `<div class="home">
      <section class="hero">
        <div class="hero-l">${EC.art.teacher()}</div>
        <div class="hero-c">
          <span class="hero-kicker">โปรแกรมออนไลน์ 8 สัปดาห์</span>
          <h1 class="hero-title"><span>ดูแลอารมณ์ครู</span></h1>
          <p>เสริมทักษะการกำกับอารมณ์<br>เพื่อการสอนเด็กออทิสติกอย่างมีพลัง</p>
          <a class="btn cta" href="#/week/1">เริ่มโปรแกรม ${EC.icon('arrow')}</a>
        </div>
        <div class="hero-r">${EC.art.books()}</div>
      </section>
      <section class="about">
        <div class="about-art">${EC.art.heartHands()}</div>
        <div><h2>เกี่ยวกับโปรแกรม</h2><p>โปรแกรมออนไลน์ 8 สัปดาห์ เพื่อดูแลอารมณ์ เข้าใจตนเอง และเพิ่มพลังในการสอน — ใช้แนวคิดการกำกับอารมณ์ของ Thompson (1994) ร่วมกับการฝึกสติ (Bishop et al., 2004) และการสะท้อนตนเอง (Grant et al., 2002) สัปดาห์ละ 1 กิจกรรมหลัก และบันทึกสะท้อนตนเองสัปดาห์ละ 2 ครั้ง รวม 16 ครั้ง</p>
          <div class="mee">${[['eye', 'Monitoring', 'ติดตามและตระหนักรู้อารมณ์ของตนเอง'], ['scale', 'Evaluating', 'ประเมินอารมณ์และพิจารณาสถานการณ์'], ['gear', 'Modifying', 'ปรับเปลี่ยนการตอบสนองอย่างเหมาะสม']].map(([i, t, d]) => `<div>${EC.icon(i)}<b>${t}</b><small>${d}</small></div>`).join('')}</div>
        </div>
      </section>
      <h2 class="sec-title"><span class="dash l"></span>ภาพรวมโปรแกรม 8 สัปดาห์<span class="dash r"></span></h2>
      <div class="week-cards">${EC.WEEKS.map(w => { const p = progress(w.n); return `
        <a class="wk theme-${w.theme}" href="#/week/${w.n}" style="--i:${w.n}">
          <b>สัปดาห์ที่ ${w.n}</b><span>${w.title}</span>
          <i class="wk-ic">${EC.icon(w.icon)}</i>
          <span class="wk-bar"><span style="width:${p.pct}%"></span></span>
        </a>`; }).join('')}</div>
      <h2 class="sec-title"><span class="dash l"></span>สัปดาห์ที่ 1<span class="dash r"></span></h2>
      <p class="sec-sub">${w1.title} (${w1.phase})</p>
      <div class="act-cards">${actCard(w1, 0)}${actCard(w1, 1)}</div>
      <h2 class="sec-title"><span class="dash l"></span>ไฮไลต์ สัปดาห์ที่ 2<span class="dash r"></span></h2>
      <div class="act-cards">${actCard(EC.WEEKS[1], 0)}${actCard(EC.WEEKS[1], 1)}</div>
    </div>`;
  }

  function program() {
    return `<div class="program">
      <h1 class="page-title">โปรแกรม 8 สัปดาห์</h1>
      <p class="page-sub">ทำกิจกรรมตามลำดับการเรียนรู้สัปดาห์ละ 1 กิจกรรม และฝึกปฏิบัติร่วมกับการสะท้อนตนเองผ่านระบบบนฐานเว็บ สัปดาห์ละ 2 ครั้ง</p>
      <div class="phase-line">${[['Monitoring', '1–2'], ['Evaluating', '3–5'], ['Modifying', '5–6'], ['บูรณาการ', '7–8']].map(([t, r]) => `<span><b>${t}</b><small>สัปดาห์ ${r}</small></span>`).join(EC.icon('arrow'))}</div>
      <div class="prog-list">${EC.WEEKS.map(w => { const p = progress(w.n); return `
        <article class="prog-item theme-${w.theme}">
          <div class="pi-num">${w.n}</div>
          <div class="pi-body"><h3>${w.title} <small>(${w.phase})</small></h3>
            <ul>${w.acts.map((a, i) => `<li>${EC.icon(a.icon)} <a href="#/week/${w.n}/a${i + 1}">กิจกรรมที่ ${i + 1} ${a.title}</a> ${(i ? p.r1 : p.a1) ? `<span class="okmark">${EC.icon('tick')}</span>` : ''}</li>`).join('')}</ul>
          </div>
          <div class="pi-prog"><span class="ring" style="--p:${p.pct}">${p.pct}%</span><a class="btn sm soft" href="#/week/${w.n}">เข้าสู่สัปดาห์ ${EC.icon('arrow')}</a></div>
        </article>`; }).join('')}</div>
    </div>`;
  }

  function weekOverview(w) {
    const p = progress(w.n);
    const inner = `
      <section class="wk-hero">
        <div class="wk-hero-art">${(EC.art[w.art] || EC.art.teacher)()}</div>
        <div class="wk-hero-c"><span class="tag">สัปดาห์ที่ ${w.n}</span><h1>${w.title}</h1><p>(${w.phase})</p></div>
        <div class="wk-hero-art r">${w.n % 2 ? EC.art.books() : EC.art.classroom()}</div>
      </section>
      <p class="wk-desc">${w.desc}</p>
      <div class="two">
        <section class="panel"><h3>${EC.icon('target')} เป้าหมายของสัปดาห์นี้</h3><ul class="ticks">${w.goals.map(g => `<li>${g}</li>`).join('')}</ul></section>
        <section class="panel"><h3>${EC.icon('bulb')} สิ่งที่จะได้ฝึก</h3><div class="skills">${w.skills.map(([i, t]) => `<div>${EC.icon(i)}<span>${t}</span></div>`).join('')}</div></section>
      </div>
      <div class="act-cards">${actCard(w, 0)}${actCard(w, 1)}</div>
      <div class="next-bar">${EC.icon('calendar')}<b>บันทึกการสะท้อน</b><span>มีการบันทึกการสะท้อน <b class="pill">2 ครั้งต่อสัปดาห์</b></span>
        <span class="dots">${['กิจกรรม 1', 'ครั้งที่ 1', 'ครั้งที่ 2'].map((t, i) => `<i class="${[p.a1, p.r1, p.r2][i] ? 'on' : ''}" title="${t}"></i>`).join('')}</span></div>`;
    return EC.weekShell(w, 'overview', inner);
  }

  function summarize(e) {
    const d = e.data || {};
    const chips = (arr) => (arr || []).filter(Boolean).map(x => `<span class="chip sm">${EC.esc(x)}</span>`).join(' ');
    const para = (label, v) => v ? `<p><b>${label}</b> ${EC.esc(v)}</p>` : '';
    if (e.kind === 'a2') {
      return (d.parts || []).map((p, i) => {
        const label = (d.labels || [])[i] || '';
        if (Array.isArray(p) && (d.questions || [])[i]) {
          const qs = d.questions[i];
          return p.map((v, k) => v ? `<p><b>${EC.esc(qs[k] || label)}</b><br>${EC.esc(v)}</p>` : '').join('');
        }
        if (Array.isArray(p)) return p.length ? `<p><b>${EC.esc(label)}:</b> ${chips(p)}</p>` : '';
        return (p.sel?.length || p.text) ? `<p><b>${EC.esc(label)}:</b> ${chips(p.sel)} ${EC.esc(p.text || '')}</p>` : '';
      }).join('') || '<p class="muted">—</p>';
    }
    if (e.kind === 'summary') return para('', d.text);
    let h = '';
    if (d.img) h += `<img class="thumb" src="${d.img}" alt="ภาพจากกิจกรรม ${EC.esc(e.title)}">`;
    if (d.emotions?.length) h += `<p><b>อารมณ์:</b> ${chips(d.emotions)}</p>`;
    if (d.signals?.length) h += `<p><b>สัญญาณ:</b> ${chips(d.signals)}</p>`;
    if (d.triggers?.length) h += `<p><b>สิ่งกระตุ้น:</b> ${chips(d.triggers)}</p>`;
    if (d.names) h += Object.entries({ keep: 'อยากเก็บไว้', unsure: 'ยังไม่รู้จะจัดการยังไง', drop: 'อยากวางลง' }).map(([k, t]) => d.names[k]?.length ? `<p><b>${t}:</b> ${chips(d.names[k])}</p>` : '').join('');
    if (d.strategies?.length) h += `<p><b>วิธีกำกับอารมณ์:</b> ${chips(d.strategies)}</p>`;
    if (d.items?.length) h += `<ul class="star-items">${d.items.map(x => `<li>⭐ ${EC.esc(x)}</li>`).join('')}</ul>`;
    if (d.meanings?.length) h += d.meanings.map(m => para(m.name + ' =', m.v || '…')).join('');
    if (d.prompts) h += d.prompts.filter(Boolean).map(x => `<p>${EC.esc(x)}</p>`).join('');
    h += para('เหตุการณ์:', d.event) + para('สิ่งที่เห็น:', d.see) + para('สิ่งที่คิด:', d.think) + para('อยากจำไว้:', d.memo);
    if (d.seq) h += para('ก่อน:', d.seq[0]) + para('ขณะ:', d.seq[1]) + para('หลัง:', d.seq[2]);
    if (d.obs) h += ['อารมณ์ของฉัน:', 'สิ่งกระตุ้น:', 'การตอบสนอง:', 'สิ่งที่ได้เรียนรู้:'].map((l, i) => para(l, d.obs[i])).join('');
    h += para('บันทึก:', d.note);
    return h || '<p class="muted">—</p>';
  }

  function weekSummary(w) {
    const p = progress(w.n);
    const entries = EC.store.byWeek(w.n).filter(e => e.kind !== 'summary').sort((a, b) => a.kind.localeCompare(b.kind) || (a.session || 0) - (b.session || 0));
    const note = EC.store.find(w.n, 'summary')[0]?.data?.text || '';
    const next = EC.WEEKS[w.n];
    const inner = `
      <header class="act-head"><div><span class="tag">สัปดาห์ที่ ${w.n}</span><h1 class="act-title">สรุป &amp; บันทึกการเรียนรู้</h1><p class="act-sub">${w.title} (${w.phase})</p></div><div class="act-art">${EC.art.journal()}</div></header>
      <div class="checklist">${[['กิจกรรมที่ 1: ' + w.acts[0].title, p.a1, 'a1'], ['สะท้อนตนเอง ครั้งที่ 1', p.r1, 'a2/1'], ['สะท้อนตนเอง ครั้งที่ 2', p.r2, 'a2/2']].map(([t, ok, h]) => `
        <a href="#/week/${w.n}/${h}" class="ck ${ok ? 'on' : ''}"><span class="ckbox">${ok ? EC.icon('tick') : ''}</span>${t}</a>`).join('')}</div>
      <section class="panel"><h3>${EC.icon('book')} สิ่งที่บันทึกไว้ในสัปดาห์นี้</h3>
        ${entries.length ? entries.map(e => `<article class="entry"><h4>${EC.esc(e.title)} <small>${EC.dateTH(e.at)}</small></h4>${summarize(e)}</article>`).join('') : '<p class="muted">ยังไม่มีบันทึกในสัปดาห์นี้ — เริ่มจากกิจกรรมที่ 1 ได้เลย</p>'}
      </section>
      <section class="panel mt"><h3>${EC.icon('sprout')} สิ่งที่ฉันได้เรียนรู้ในสัปดาห์นี้</h3>
        <textarea class="ta" id="sumNote" rows="4" maxlength="1000" placeholder="สรุปสั้น ๆ ว่าสัปดาห์นี้ฉันได้เรียนรู้อะไรเกี่ยวกับตนเองและการสอน...">${EC.esc(note)}</textarea>
        <div class="row-end"><button type="button" class="btn brown" id="sumSave">${EC.icon('save')} บันทึก</button>
        ${next ? `<a class="btn soft" href="#/week/${next.n}">ไปสัปดาห์ที่ ${next.n} ${EC.icon('arrow')}</a>` : `<a class="btn soft" href="#/journal">ดูบันทึกทั้งหมด ${EC.icon('arrow')}</a>`}</div>
      </section>`;
    return EC.weekShell(w, 'summary', inner);
  }

  function journal() {
    const all = EC.store.all();
    const groups = EC.WEEKS.map(w => [w, all.filter(e => e.week === w.n)]).filter(([, es]) => es.length);
    return `<div class="journal-page">
      <div class="jp-head"><div><h1 class="page-title">บันทึกของฉัน</h1><p class="page-sub">${EC.mode === 'server' ? 'บันทึกของคุณเก็บไว้ในระบบอย่างปลอดภัย' : 'ทุกบันทึกเก็บไว้ในเบราว์เซอร์นี้เท่านั้น'} · ทั้งหมด ${all.length} รายการ</p></div>
        <div class="jp-actions"><button type="button" class="btn ghost sm" id="jpExport">${EC.icon('download')} ดาวน์โหลด (JSON)</button>
        <button type="button" class="btn ghost sm" id="jpPrint">${EC.icon('clipboard')} พิมพ์</button>
        ${all.length ? `<button type="button" class="btn ghost sm danger" id="jpClear">${EC.icon('trash')} ลบทั้งหมด</button>` : ''}</div></div>
      ${groups.length ? groups.map(([w, es]) => `
        <section class="jp-week theme-${w.theme}"><h2><span class="pill-week">สัปดาห์ที่ ${w.n}</span> ${w.title}</h2>
          ${es.map(e => `<article class="entry"><h4>${EC.esc(e.title)} <small>${EC.dateTH(e.at)}</small>
            <button type="button" class="icon-btn sm" data-del="${e.id}" aria-label="ลบบันทึกนี้">${EC.icon('trash')}</button></h4>${summarize(e)}</article>`).join('')}
        </section>`).join('') : `<div class="empty">${EC.art.journal()}<p>ยังไม่มีบันทึก<br><a class="btn cta" href="#/week/1/a1">เริ่มกิจกรรมแรก: ส้มตำความรู้สึก ${EC.icon('arrow')}</a></p></div>`}
    </div>`;
  }

  function library() {
    const cards = [
      ['eye', 'Monitoring', 'การติดตามและตระหนักรู้อารมณ์ของตนเอง', 'สังเกตว่ากำลังรู้สึกอะไร สัญญาณในร่างกายเป็นอย่างไร และอารมณ์เปลี่ยนไปเมื่อใด — ฝึกในสัปดาห์ที่ 1–2'],
      ['scale', 'Evaluating', 'การประเมินอารมณ์และพิจารณาสถานการณ์', 'แยกสิ่งที่เห็นออกจากสิ่งที่คิด พิจารณาความต้องการของเด็กและบริบท ก่อนด่วนสรุป — ฝึกในสัปดาห์ที่ 3–5'],
      ['gear', 'Modifying', 'การปรับเปลี่ยนการตอบสนองทางอารมณ์อย่างเหมาะสม', 'เว้นจังหวะ หายใจ ปรับน้ำเสียง หรือเลือกวิธีตอบสนองที่เหมาะกับเด็ก — ฝึกในสัปดาห์ที่ 5–8'],
      ['sprout', 'สติ (Mindfulness)', 'Bishop et al. (2004)', 'Self-regulation of attention — การกำกับความใส่ใจไว้ที่ปัจจุบัน และ Orientation to experience — การเปิดรับประสบการณ์ด้วยความอยากรู้และยอมรับ'],
      ['pencil', 'การสะท้อนตนเอง', 'Grant et al. (2002)', 'การทบทวนความคิด ความรู้สึก และการกระทำของตนเองอย่างเป็นระบบ เพื่อเข้าใจตนเองและนำไปสู่การเปลี่ยนแปลง']
    ];
    return `<div class="library">
      <h1 class="page-title">คลังความรู้ &amp; เครื่องมือ</h1>
      <p class="page-sub">แนวคิดหลักของโปรแกรม และเครื่องมือเล็ก ๆ สำหรับดูแลอารมณ์ระหว่างวัน</p>
      <div class="lib-grid">${cards.map(([i, t, s, d]) => `<article class="lib-card">${EC.icon(i)}<h3>${t}</h3><b>${s}</b><p>${d}</p></article>`).join('')}</div>
      <section class="breathe-box panel">
        <div><h2>${EC.icon('breath')} พักหายใจ 1 นาที</h2><p>ใช้เมื่อรู้สึกว่าอารมณ์กำลังพุ่งขึ้น: หายใจเข้า 4 วินาที · กลั้น 4 วินาที · หายใจออก 6 วินาที</p>
          <button type="button" class="btn green" id="brBtn">${EC.icon('play')} เริ่ม</button></div>
        <div class="breathe"><div class="br-circle" id="brC"><span id="brT">พร้อม</span></div></div>
      </section>
      <section class="panel mt stop-card"><h2>หยุด – สังเกต – เลือก</h2>
        <div class="flow-strip big"><span class="fs s1">${EC.icon('pause')} <b>หยุด</b><small>เว้นจังหวะ 1 ลมหายใจก่อนตอบสนอง</small></span>${EC.icon('arrow')}
        <span class="fs s2">${EC.icon('eye')} <b>สังเกต</b><small>ตอนนี้ฉันรู้สึกอะไร ร่างกายบอกอะไร เด็กกำลังสื่อสารอะไร</small></span>${EC.icon('arrow')}
        <span class="fs s3">${EC.icon('tick')} <b>เลือก</b><small>วิธีที่ปลอดภัย เหมาะกับเด็ก และตรงกับเป้าหมายการสอน</small></span></div></section>
    </div>`;
  }

  /* ---------- login / register ---------- */
  function loginPage() {
    return `<div class="auth">
      <div class="auth-art">${EC.art.teacher()}<h2>ดูแลอารมณ์ครู</h2><p>โปรแกรมออนไลน์ 8 สัปดาห์<br>เสริมทักษะการกำกับอารมณ์สำหรับครูผู้สอนเด็กออทิสติก</p></div>
      <div class="auth-card panel">
        <div class="auth-tabs" role="tablist"><button type="button" class="on" data-tab="login">เข้าสู่ระบบ</button><button type="button" data-tab="register">ลงทะเบียน</button></div>
        <form id="loginForm" class="auth-form">
          <label>ชื่อผู้ใช้<input name="username" autocomplete="username" required></label>
          <label>รหัสผ่าน<input name="password" type="password" autocomplete="current-password" required></label>
          <p class="auth-err" role="alert"></p>
          <button class="btn brown full" type="submit">เข้าสู่ระบบ ${EC.icon('arrow')}</button>
        </form>
        <form id="regForm" class="auth-form" hidden>
          <label>ชื่อที่แสดง <small>(เช่น ครูแอน)</small><input name="displayName" maxlength="80" required></label>
          <label>ชื่อผู้ใช้ <small>(a-z, 0-9, . _ - อย่างน้อย 3 ตัว)</small><input name="username" autocomplete="username" pattern="[a-zA-Z0-9._\\-]{3,32}" required></label>
          <label>รหัสผ่าน <small>(อย่างน้อย 8 ตัวอักษร)</small><input name="password" type="password" autocomplete="new-password" minlength="8" required></label>
          <label id="codeRow" hidden>รหัสลงทะเบียน <small>(ได้รับจากผู้วิจัย)</small><input name="code" autocomplete="off"></label>
          <p class="auth-err" role="alert"></p>
          <button class="btn green full" type="submit">สร้างบัญชี ${EC.icon('arrow')}</button>
        </form>
        <p class="auth-note">ข้อมูลที่คุณบันทึกจะถูกเก็บอย่างปลอดภัยเพื่อใช้ในการวิจัยเท่านั้น</p>
      </div>
    </div>`;
  }
  function mountLogin() {
    EC.$$('.auth-tabs button').forEach(b => b.addEventListener('click', () => {
      EC.$$('.auth-tabs button').forEach(x => x.classList.toggle('on', x === b));
      EC.$('#loginForm').hidden = b.dataset.tab !== 'login';
      EC.$('#regForm').hidden = b.dataset.tab !== 'register';
    }));
    EC.api('GET', '/api/config').then(c => { EC.$('#codeRow').hidden = !c.registerNeedsCode; }).catch(() => {});
    const submit = (form, url) => form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = EC.$('button[type=submit]', form), err = EC.$('.auth-err', form);
      btn.disabled = true; err.textContent = '';
      try {
        const r = await EC.api('POST', url, Object.fromEntries(new FormData(form)));
        await EC.setUser(r.user);
        updateUserUI();
        location.hash = r.user.role === 'admin' ? '#/admin' : (sessionStorage.getItem('ec_next') || '#/');
        sessionStorage.removeItem('ec_next');
      } catch (ex) { err.textContent = ex.message; }
      btn.disabled = false;
    });
    submit(EC.$('#loginForm'), '/api/login');
    submit(EC.$('#regForm'), '/api/register');
  }

  /* ---------- admin ---------- */
  const fmt = (t) => t ? EC.dateTH(new Date(t).getTime()) : '—';
  function doneMap(done) {
    const m = {}; (done || []).forEach(d => { m[d.week] = m[d.week] || {}; m[d.week][d.kind + (d.session || '')] = 1; }); return m;
  }
  async function adminPage() {
    const { users } = await EC.api('GET', '/api/admin/users');
    const teachers = users.filter(u => u.role === 'teacher');
    const total = users.reduce((s, u) => s + u.entry_count, 0);
    const finished = teachers.filter(u => { const m = doneMap(u.done); return EC.WEEKS.every(w => m[w.n]?.a1 && m[w.n]?.a21 && m[w.n]?.a22); }).length;
    return `<div class="admin">
      <div class="jp-head"><div><h1 class="page-title">หน้าผู้ดูแลระบบ</h1><p class="page-sub">ติดตามความก้าวหน้าและดาวน์โหลดข้อมูลของผู้เข้าร่วม</p></div>
        <div class="jp-actions"><a class="btn green sm" href="/api/admin/export.csv">${EC.icon('download')} ดาวน์โหลดทั้งหมด (CSV / Excel)</a>
        <a class="btn ghost sm" href="/api/admin/export.json">${EC.icon('download')} JSON (ข้อมูลดิบ + ภาพ)</a></div></div>
      <div class="stats">
        <div><b>${teachers.length}</b><span>ครูที่ลงทะเบียน</span></div>
        <div><b>${total}</b><span>บันทึกทั้งหมด</span></div>
        <div><b>${teachers.filter(u => u.entry_count).length}</b><span>ครูที่เริ่มทำกิจกรรม</span></div>
        <div><b>${finished}</b><span>ทำครบ 8 สัปดาห์</span></div>
      </div>
      <section class="panel"><h3>${EC.icon('people')} ผู้ใช้งาน</h3>
        <div class="table-wrap"><table class="utable">
          <thead><tr><th>ผู้ใช้</th><th>ความก้าวหน้า (สัปดาห์ 1–8)</th><th>บันทึก</th><th>เข้าใช้ล่าสุด</th><th></th></tr></thead>
          <tbody>${users.map(u => { const m = doneMap(u.done); return `<tr>
            <td><b>${EC.esc(u.display_name)}</b>${u.role === 'admin' ? ' <span class="chip sm">แอดมิน</span>' : ''}<br><small>@${EC.esc(u.username)}</small></td>
            <td><div class="wkprog">${EC.WEEKS.map(w => `<span class="theme-${w.theme}" title="สัปดาห์ ${w.n}: กิจกรรม ${m[w.n]?.a1 ? '✓' : '–'} · สะท้อน 1 ${m[w.n]?.a21 ? '✓' : '–'} · สะท้อน 2 ${m[w.n]?.a22 ? '✓' : '–'}">
              <em>${w.n}</em>${['a1', 'a21', 'a22'].map(k => `<i class="${m[w.n]?.[k] ? 'on' : ''}"></i>`).join('')}</span>`).join('')}</div></td>
            <td>${u.entry_count}</td><td><small>${fmt(u.last_login_at)}</small></td>
            <td class="acts"><a class="btn sm soft" href="#/admin/user/${u.id}">ดูบันทึก</a>
              <a class="btn sm ghost" href="/api/admin/export.csv?user=${u.id}" title="ดาวน์โหลด CSV">${EC.icon('download')}</a>
              <button type="button" class="btn sm ghost" data-reset="${u.id}" data-name="${EC.esc(u.username)}" title="ตั้งรหัสผ่านใหม่">${EC.icon('refresh')}</button>
              ${u.id !== EC.user.id ? `<button type="button" class="btn sm ghost danger" data-deluser="${u.id}" data-name="${EC.esc(u.username)}" title="ลบผู้ใช้">${EC.icon('trash')}</button>` : ''}</td>
          </tr>`; }).join('')}</tbody></table></div>
      </section>
      <section class="panel mt"><h3>${EC.icon('plus')} สร้างบัญชีให้ผู้เข้าร่วม</h3>
        <form id="newUser" class="new-user">
          <input name="displayName" placeholder="ชื่อที่แสดง" maxlength="80" required>
          <input name="username" placeholder="ชื่อผู้ใช้ เช่น t01" pattern="[a-zA-Z0-9._\\-]{3,32}" required>
          <input name="password" placeholder="รหัสผ่าน (≥ 8 ตัว)" minlength="8" required>
          <select name="role"><option value="teacher">ครู</option><option value="admin">ผู้ดูแลระบบ</option></select>
          <button class="btn brown" type="submit">สร้างบัญชี</button>
        </form>
      </section>
    </div>`;
  }
  function mountAdmin() {
    EC.$('#newUser').addEventListener('submit', async e => {
      e.preventDefault();
      try { await EC.api('POST', '/api/admin/users', Object.fromEntries(new FormData(e.target))); EC.toast('สร้างบัญชีแล้ว ✓', 'ok'); route(); }
      catch (ex) { EC.toast(EC.esc(ex.message), 'err'); }
    });
    EC.$$('[data-reset]').forEach(b => b.addEventListener('click', async () => {
      const pw = prompt(`ตั้งรหัสผ่านใหม่ให้ @${b.dataset.name} (อย่างน้อย 8 ตัวอักษร)`);
      if (!pw) return;
      try { await EC.api('POST', `/api/admin/users/${b.dataset.reset}/password`, { password: pw }); EC.toast('ตั้งรหัสผ่านใหม่แล้ว ✓', 'ok'); }
      catch (ex) { EC.toast(EC.esc(ex.message), 'err'); }
    }));
    EC.$$('[data-deluser]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm(`ลบผู้ใช้ @${b.dataset.name} และบันทึกทั้งหมดของผู้ใช้นี้? การลบย้อนกลับไม่ได้`)) return;
      try { await EC.api('DELETE', `/api/admin/users/${b.dataset.deluser}`, {}); route(); }
      catch (ex) { EC.toast(EC.esc(ex.message), 'err'); }
    }));
  }
  async function adminUserPage(id) {
    const [{ users }, { entries }] = await Promise.all([EC.api('GET', '/api/admin/users'), EC.api('GET', `/api/admin/users/${id}/entries`)]);
    const u = users.find(x => x.id === +id);
    if (!u) return '<p>ไม่พบผู้ใช้</p>';
    const groups = EC.WEEKS.map(w => [w, entries.filter(e => e.week === w.n)]).filter(([, es]) => es.length);
    return `<div class="journal-page">
      <p class="crumbs"><a href="#/admin">หน้าผู้ดูแลระบบ</a> › ${EC.esc(u.display_name)}</p>
      <div class="jp-head"><div><h1 class="page-title">${EC.esc(u.display_name)} <small class="muted">@${EC.esc(u.username)}</small></h1>
        <p class="page-sub">ลงทะเบียน ${fmt(u.created_at)} · บันทึก ${entries.length} รายการ</p></div>
        <div class="jp-actions"><a class="btn green sm" href="/api/admin/export.csv?user=${u.id}">${EC.icon('download')} ดาวน์โหลด CSV</a>
        <button type="button" class="btn ghost sm" onclick="print()">${EC.icon('clipboard')} พิมพ์</button></div></div>
      ${groups.length ? groups.map(([w, es]) => `<section class="jp-week theme-${w.theme}"><h2><span class="pill-week">สัปดาห์ที่ ${w.n}</span> ${w.title}</h2>
        ${es.map(e => `<article class="entry"><h4>${EC.esc(e.title)} <small>${EC.dateTH(e.at)}</small></h4>${summarize(e)}</article>`).join('')}</section>`).join('')
        : '<div class="empty"><p>ผู้ใช้นี้ยังไม่มีบันทึก</p></div>'}
    </div>`;
  }

  /* ---------- user menu ---------- */
  function updateUserUI() {
    const btn = EC.$('#userBtn'), adminLink = EC.$('#adminNav');
    const isAdmin = EC.user?.role === 'admin';
    adminLink.hidden = !isAdmin;
    btn.title = EC.user ? `${EC.user.displayName} (@${EC.user.username})` : 'โปรไฟล์';
    EC.$('#userName').textContent = EC.user ? EC.user.displayName : '';
  }
  EC.$('#userBtn').addEventListener('click', e => {
    e.stopPropagation();
    const menu = EC.$('#userMenu');
    if (EC.mode !== 'server') { EC.toast('โหมดออฟไลน์: ข้อมูลถูกเก็บในเบราว์เซอร์นี้เท่านั้น'); return; }
    if (!EC.user) { location.hash = '#/login'; return; }
    menu.innerHTML = `<div class="um-head"><b>${EC.esc(EC.user.displayName)}</b><small>@${EC.esc(EC.user.username)}</small></div>
      ${EC.user.role === 'admin' ? `<a href="#/admin">${EC.icon('chart')} หน้าผู้ดูแลระบบ</a>` : ''}
      <a href="#/journal">${EC.icon('book')} บันทึกของฉัน</a>
      <button type="button" id="umPw">${EC.icon('gear')} เปลี่ยนรหัสผ่าน</button>
      <button type="button" id="umOut">${EC.icon('back')} ออกจากระบบ</button>`;
    menu.hidden = !menu.hidden;
    EC.$('#umOut').onclick = async () => { await EC.api('POST', '/api/logout', {}).catch(() => {}); await EC.setUser(null); updateUserUI(); menu.hidden = true; location.hash = '#/login'; };
    EC.$('#umPw').onclick = async () => {
      menu.hidden = true;
      const current = prompt('รหัสผ่านเดิม'); if (!current) return;
      const next = prompt('รหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)'); if (!next) return;
      try { await EC.api('POST', '/api/me/password', { current, next }); EC.toast('เปลี่ยนรหัสผ่านแล้ว ✓', 'ok'); } catch (ex) { EC.toast(EC.esc(ex.message), 'err'); }
    };
  });
  document.addEventListener('click', e => { if (!e.target.closest('#userMenu')) EC.$('#userMenu').hidden = true; });

  /* ---------- router ---------- */
  const mounts = { somtam: EC.mountSomtam, bouquet: EC.mountBouquet, notebook: EC.mountNotebook, paint: EC.mountPaint, fill: EC.mountFill, boxes: EC.mountBoxes, timeline: EC.mountTimeline, stars: EC.mountStars };
  const renders = { 1: ['somtam', EC.renderSomtam], 2: ['bouquet', EC.renderBouquet], 3: ['notebook', EC.renderNotebook], 4: ['paint', EC.renderPaint], 5: ['fill', EC.renderFill], 6: ['boxes', EC.renderBoxes], 7: ['timeline', EC.renderTimeline], 8: ['stars', EC.renderStars] };

  let routeSeq = 0;
  async function route() {
    const seq = ++routeSeq;
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    let nav = 'home', after = null;
    document.body.className = '';
    EC.$('#userMenu').hidden = true;
    // login guard (server mode only)
    if (EC.mode === 'server' && !EC.user && parts[0] !== 'login') {
      if (parts.length) sessionStorage.setItem('ec_next', location.hash);
      location.replace('#/login'); return;
    }
    if (parts[0] === 'login' && (EC.mode !== 'server' || EC.user)) { location.replace('#/'); return; }
    if (parts[0] === 'admin' && EC.user?.role !== 'admin') { location.replace('#/'); return; }
    document.body.classList.toggle('authed', !!EC.user || EC.mode === 'local');
    if (parts[0] === 'login') { nav = ''; app.innerHTML = loginPage(); after = mountLogin; document.body.classList.add('on-login'); }
    else if (parts[0] === 'admin') {
      nav = 'admin';
      app.innerHTML = '<p class="loading">กำลังโหลดข้อมูล…</p>';
      try {
        const html = parts[1] === 'user' ? await adminUserPage(parts[2]) : await adminPage();
        if (seq !== routeSeq) return;
        app.innerHTML = html; after = parts[1] === 'user' ? null : mountAdmin;
      } catch (ex) { app.innerHTML = `<p class="loading">โหลดข้อมูลไม่สำเร็จ: ${EC.esc(ex.message)}</p>`; }
    }
    else if (!parts.length) { app.innerHTML = home(); }
    else if (parts[0] === 'program') { nav = 'program'; app.innerHTML = program(); }
    else if (parts[0] === 'journal') { nav = 'journal'; app.innerHTML = journal(); after = mountJournal; }
    else if (parts[0] === 'library') { nav = 'library'; app.innerHTML = library(); after = mountLibrary; }
    else if (parts[0] === 'week') {
      nav = 'program';
      const w = EC.WEEKS[(+parts[1] || 1) - 1] || EC.WEEKS[0];
      document.body.className = 'wk-' + w.theme;
      const sub = parts[2];
      if (sub === 'a1') { const [k, r] = renders[w.n]; app.innerHTML = r(w); after = mounts[k]; }
      else if (sub === 'a2') { const s = parts[3] === '2' ? 2 : 1; app.innerHTML = EC.renderReflect(w, s); after = () => EC.mountReflect(w, s); }
      else if (sub === 'summary') { app.innerHTML = weekSummary(w); after = () => mountSummary(w); }
      else app.innerHTML = weekOverview(w);
    } else { app.innerHTML = home(); }
    EC.$$('.mainnav a').forEach(a => a.classList.toggle('on', a.dataset.nav === nav));
    EC.hydrateIcons(document);
    window.scrollTo({ top: 0 });
    app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
    if (after) after();
  }

  function mountSummary(w) {
    EC.$('#sumSave').addEventListener('click', () => {
      EC.store.upsert({ week: w.n, kind: 'summary', title: 'สิ่งที่ได้เรียนรู้ในสัปดาห์นี้', data: { text: EC.$('#sumNote').value.trim() } });
      EC.toast('บันทึกสรุปสัปดาห์แล้ว ✓', 'ok');
    });
  }
  function mountJournal() {
    EC.$$('[data-del]').forEach(b => b.addEventListener('click', () => {
      if (!confirm('ลบบันทึกนี้หรือไม่?')) return;
      EC.store.remove(b.dataset.del); route();
    }));
    EC.$('#jpClear')?.addEventListener('click', () => { if (confirm('ลบบันทึกทั้งหมดหรือไม่? การลบนี้ย้อนกลับไม่ได้')) { EC.store.clear(); route(); } });
    EC.$('#jpPrint').addEventListener('click', () => window.print());
    EC.$('#jpExport').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(EC.store.raw(), null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'emotion-care-journal.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }
  function mountLibrary() {
    const c = EC.$('#brC'), t = EC.$('#brT'), btn = EC.$('#brBtn');
    let timer = null;
    const steps = [['หายใจเข้า', 4000, 'in'], ['กลั้นไว้', 4000, 'hold'], ['หายใจออก', 6000, 'out']];
    function stop() { clearTimeout(timer); timer = null; c.className = 'br-circle'; t.textContent = 'พร้อม'; btn.innerHTML = `${EC.icon('play')} เริ่ม`; }
    btn.addEventListener('click', () => {
      if (timer) return stop();
      let i = 0, rounds = 0;
      btn.innerHTML = `${EC.icon('pause')} หยุด`;
      const next = () => {
        if (!document.body.contains(c)) return;
        const [label, ms, cls] = steps[i];
        c.className = 'br-circle ' + cls; c.style.transitionDuration = ms + 'ms'; t.textContent = label;
        i = (i + 1) % 3; if (!i) rounds++;
        timer = rounds >= 4 ? setTimeout(() => { stop(); t.textContent = 'เยี่ยมมาก 💛'; }, ms) : setTimeout(next, ms);
      };
      next();
    });
  }

  EC.$('#bellBtn').addEventListener('click', () => {
    const next = EC.WEEKS.find(w => progress(w.n).pct < 100);
    EC.toast(next ? `อย่าลืมบันทึกการสะท้อนของ <b>สัปดาห์ที่ ${next.n}</b> นะคะ 🌿` : 'คุณทำครบทั้ง 8 สัปดาห์แล้ว 🎉');
  });

  window.addEventListener('hashchange', route);
  EC.hydrateIcons(document);
  EC.boot().then(() => {
    if (EC.mode === 'local') EC.$('#userName').textContent = '';
    updateUserUI();
    route();
  });
})(window.EC);
