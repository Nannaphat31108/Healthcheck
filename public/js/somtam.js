/* Week 1 · Activity 1 — ส้มตำความรู้สึก
   Pick emotion "ingredients" → they are tossed in an arc into the mortar.
   Press "คลุกความรู้สึก" → pestle pounds, pieces jump & mix, juice splashes. */
(function (EC) {
  const INK = '#5a4032';

  const mortarBack = `<svg class="m-back" viewBox="0 0 300 240" aria-hidden="true">
    <ellipse cx="150" cy="100" rx="118" ry="24" fill="#7d3f28"/>
    <ellipse cx="150" cy="104" rx="104" ry="17" fill="#5e2d1c" opacity=".55"/>
    <path d="M32 100A118 24 0 0 1 268 100" fill="none" stroke="#e7a07a" stroke-width="10" stroke-linecap="round"/>
    <path d="M32 100A118 24 0 0 1 268 100" fill="none" stroke="${INK}" stroke-width="2.2"/>
  </svg>`;

  const mortarFront = `<svg class="m-front" viewBox="0 0 300 240" aria-hidden="true">
    <path d="M110 200l-10 22h100l-10-22" fill="#b7633f" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M32 100A118 24 0 0 0 268 100C262 168 214 206 150 206S38 168 32 100z" fill="#cf7d55" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M52 128c14 34 46 54 70 58" fill="none" stroke="#e9a17c" stroke-width="6" stroke-linecap="round" opacity=".8"/>
    <path d="M232 150c-6 10-14 18-24 24" fill="none" stroke="#a9563a" stroke-width="5" stroke-linecap="round" opacity=".6"/>
    <path d="M32 100A118 24 0 0 0 268 100" fill="none" stroke="#e7a07a" stroke-width="10" stroke-linecap="round"/>
    <path d="M32 100A118 24 0 0 0 268 100" fill="none" stroke="${INK}" stroke-width="2.2"/>
    <path d="M36 104A114 22 0 0 0 264 104" fill="none" stroke="${INK}" stroke-width="1.4" opacity=".5"/>
    <g class="m-heart"><path d="M138 156c0-9 12-9 12-1 0-8 12-8 12 1 0 9-12 15-12 15s-12-6-12-15z" fill="#f6b3a6" stroke="${INK}" stroke-width="2"/></g>
  </svg>`;

  const pestle = `<svg viewBox="0 0 60 220" aria-hidden="true">
    <path d="M22 8c0-6 16-6 16 0l4 150c6 10 10 22 10 34 0 16-10 24-22 24S8 208 8 192c0-12 4-24 10-34z" fill="#e0b27c" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M28 20l2 130" stroke="#f3d3a6" stroke-width="4" stroke-linecap="round"/>
    <path d="M16 186c4 10 10 14 16 14" stroke="#c48d57" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;

  const mound = (lvl) => {
    // shredded papaya mound sitting in the bowl mouth; lvl 0..1
    const h = 10 + lvl * 34;
    let shreds = '';
    for (let i = 0; i < 26; i++) {
      const x = 50 + Math.random() * 200, y = 100 - Math.random() * h * 0.85;
      const len = 18 + Math.random() * 22, a = -35 + Math.random() * 70;
      const c = EC.pick(['#d9ec9c', '#c6e27f', '#e8f3b8', '#b9d96d']);
      shreds += `<path d="M${x} ${y}l${len * Math.cos(a * Math.PI / 180)} ${len * Math.sin(a * Math.PI / 180)}" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/>`;
    }
    return `<svg class="m-mound" viewBox="0 0 300 240" aria-hidden="true">
      <path d="M40 104C70 ${100 - h} 110 ${96 - h} 150 ${94 - h}S236 ${100 - h} 262 104z" fill="#cfe68e" stroke="#9cbf55" stroke-width="1.6"/>
      <g>${shreds}</g></svg>`;
  };

  EC.renderSomtam = function (w) {
    const cards = EC.SOMTAM.map(s => `
      <button type="button" class="emo-card" data-id="${s.id}" aria-pressed="false">
        <span class="chk">${EC.icon('tick')}</span>
        <span class="emo-name">${EC.EMO[s.id]}</span>
        <span class="emo-ex">${s.ex}</span>
        <span class="emo-face">${EC.face(s.id, 50)}</span>
        <span class="emo-ing" title="${s.ingName}">${EC.ingredient(s.ing, 30)}<small>${s.ingName}</small></span>
      </button>`).join('');

    const signals = EC.BODY_SIGNALS.map(([k, t]) => `
      <label class="sig"><input type="checkbox" value="${t}"><span class="box">${EC.icon('tick')}</span><span>${t}</span></label>`).join('');

    const html = `${EC.actHeader(w, 1, 'ส้มตำความรู้สึก', 'สำรวจอารมณ์ของตนเองในช่วงการสอนเด็กที่มีภาวะออทิซึมสเปกตรัม',
      `<div class="float-ingr">${['tomato', 'lime', 'chili'].map((k, i) => `<span style="--d:${i * .6}s">${EC.ingredient(k, 54)}</span>`).join('')}</div>`)}
      <div class="somtam-grid">
        <div class="stepper" id="stSteps">
          ${EC.stepTrack(['เลือกความรู้สึก', 'สัญญาณในร่างกาย', 'คลุกความรู้สึก', 'สะท้อนตนเอง'])}
          <section class="step-card" data-step="0">
            <h2 class="step-h">ช่วงการสอนที่ผ่านมา คุณรู้สึกอย่างไรบ้าง?</h2>
            <p class="step-sub">แตะการ์ดความรู้สึก แล้ววัตถุดิบจะถูกโยนลงครก (เลือกได้หลายข้อ)</p>
            <div class="emo-grid">${cards}</div>
          </section>
          <section class="step-card" data-step="1">
            <h2 class="step-h">ตอนนั้น ร่างกายของคุณส่งสัญญาณอะไรบ้าง?</h2>
            <p class="step-sub">ทุกสัญญาณที่เลือกจะกลายเป็นเครื่องปรุงโรยลงครก (เลือกได้หลายข้อ)</p>
            <div class="sig-list" id="stSignals">${signals}</div>
          </section>
          <section class="step-card" data-step="2">
            <h2 class="step-h">ได้เวลาคลุกความรู้สึก!</h2>
            <p class="step-sub">กดปุ่มด้านล่างเพื่อตำและคลุกทุกความรู้สึกให้เข้ากัน — ทุกความรู้สึกเป็นส่วนหนึ่งของรสชาติในวันนี้</p>
            <div class="bowl-actions">
              <button type="button" class="btn pound" id="stPound">${EC.icon('mortar')} คลุกความรู้สึก</button>
            </div>
          </section>
          <section class="step-card" data-step="3">
            <div id="stResult"></div>
          </section>
          ${EC.stepNav('บันทึกและไปเขียนสะท้อนตนเอง')}
        </div>
        <section class="panel bowl-panel">
          <h3>${EC.icon('mortar')} ส้มตำความรู้สึกของวันนี้</h3>
          <div class="stage" id="stStage">
            <button type="button" class="sound-btn" id="stSound" aria-pressed="true" title="เปิด/ปิดเสียง">🔊</button>
            <div class="cloth"></div>
            <div class="deco d1">${EC.ingredient('lime', 44)}</div>
            <div class="deco d2">${EC.ingredient('tomato', 40)}</div>
            <div class="deco d3">${EC.ingredient('chili', 38)}</div>
            <div class="mortar" id="stMortar">
              ${mortarBack}
              <div class="mound-wrap" id="stMound">${mound(0)}</div>
              <div class="pile" id="stPile"></div>
              <div class="pestle" id="stPestle"><div class="pestle-in">${pestle}</div></div>
              ${mortarFront}
            </div>
            <div class="fx" id="stFx"></div>
            <div class="stage-hint" id="stHint">แตะความรู้สึกทางซ้าย<br>เพื่อโยนวัตถุดิบลงครก ✨</div>
          </div>
          <div class="bowl-status" id="stStatus">ยังไม่มีวัตถุดิบในครก</div>
          <div class="chips center" id="stChips"></div>
          <div class="bowl-actions"><button type="button" class="btn ghost sm" id="stReset">${EC.icon('refresh')} เทใหม่</button></div>
        </section>
      </div>`;
    return EC.weekShell(w, 'a1', html);
  };

  /* ---------- behaviour ---------- */
  EC.mountSomtam = function () {
    const stage = EC.$('#stStage'), mortar = EC.$('#stMortar'), pile = EC.$('#stPile');
    const moundWrap = EC.$('#stMound'), fx = EC.$('#stFx');
    const selected = new Map(); // id -> [piece elements]
    let pounded = false, busy = false, soundOn = true, actx = null;

    const soundBtn = EC.$('#stSound');
    soundBtn.addEventListener('click', () => { soundOn = !soundOn; soundBtn.textContent = soundOn ? '🔊' : '🔈'; soundBtn.setAttribute('aria-pressed', soundOn); });

    function thud(freq = 120, dur = 0.12, vol = 0.35) {
      if (!soundOn) return;
      try {
        actx = actx || new (window.AudioContext || window.webkitAudioContext)();
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(freq * 1.8, actx.currentTime);
        o.frequency.exponentialRampToValueAtTime(freq * 0.6, actx.currentTime + dur);
        g.gain.setValueAtTime(vol, actx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
        o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime + dur + 0.02);
      } catch (e) { /* audio not available */ }
    }

    function level() {
      let n = 0; selected.forEach(v => n += v.length); return Math.min(1, n / 18);
    }
    function redrawMound() { moundWrap.innerHTML = mound(level()); }

    // pick a random landing spot (percent of mortar box) on top of the mound
    function spot() {
      const lv = level();
      const dx = EC.rand(-88, 88);
      const edge = Math.abs(dx) / 88;
      const top = 100 - (10 + lv * 34) * (1 - edge * edge) * EC.rand(0.4, 1);
      const dy = top + EC.rand(-4, 10);
      return { x: (150 + dx) / 300 * 100, y: dy / 240 * 100, r: EC.rand(-60, 60) };
    }

    function updateUI() {
      const n = selected.size;
      EC.$('#stHint').classList.toggle('hide', n > 0);
      EC.$('#stStatus').innerHTML = n ? `ในครกมี <b>${n}</b> ความรู้สึก · ${[...selected.keys()].map(id => EC.SOMTAM.find(s => s.id === id).ingName).join(' · ')}` : 'ยังไม่มีวัตถุดิบในครก';
      EC.$('#stChips').innerHTML = n ? [...selected.keys()].map(id =>
        `<button type="button" class="chip c-${id}" data-rm="${id}">${EC.EMO[id]} <span aria-hidden="true">×</span></button>`).join('') : '<span class="muted">ยังไม่ได้เลือก</span>';
      EC.$('#stPound').classList.toggle('ready', n > 0);
    }

    function toss(fromEl, def, delay) {
      return new Promise(res => setTimeout(() => {
        const fr = fromEl.getBoundingClientRect();
        const mr = mortar.getBoundingClientRect();
        const s = spot();
        const size = mr.width * 0.15;
        const sx = fr.left + fr.width / 2, sy = fr.top + fr.height / 2;
        const ex = mr.left + mr.width * s.x / 100, ey = mr.top + mr.height * s.y / 100;
        const peak = Math.min(sy, ey) - EC.rand(90, 150);
        const cx = (sx + ex) / 2, cy = peak;
        const fly = document.createElement('div');
        fly.className = 'flyer';
        fly.style.width = fly.style.height = size + 'px';
        fly.innerHTML = EC.ingredient(def.ing, size);
        document.body.appendChild(fly);
        const frames = [], spin = EC.rand(360, 720) * (Math.random() < .5 ? -1 : 1);
        for (let i = 0; i <= 24; i++) {
          const t = i / 24, u = 1 - t;
          const x = u * u * sx + 2 * u * t * cx + t * t * ex;
          const y = u * u * sy + 2 * u * t * cy + t * t * ey;
          const sc = 0.6 + 0.4 * Math.sin(Math.PI * t) + (t > .9 ? 0 : 0) + 0.25 * t;
          frames.push({ transform: `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${spin * t + s.r * t}deg) scale(${sc})` });
        }
        const done = () => {
          fly.remove();
          const p = document.createElement('div');
          p.className = 'piece land';
          p.style.left = s.x + '%'; p.style.top = s.y + '%';
          p.style.width = '15%';
          p.style.setProperty('--r', s.r + 'deg');
          p.style.zIndex = Math.round(s.y * 10);
          p.innerHTML = EC.ingredient(def.ing, 60);
          pile.appendChild(p);
          mortar.classList.remove('wobble'); void mortar.offsetWidth; mortar.classList.add('wobble');
          EC.burst(ex, ey, { count: 7, colors: [def.color, '#fff6d8', '#cfe68e'], shapes: ['dot'], up: true, dist: 46, gravity: 40, min: 4, max: 8 });
          thud(260, 0.07, 0.12);
          res(p);
        };
        if (EC.reduceMotion()) { done(); return; }
        fly.animate(frames, { duration: EC.rand(620, 780), easing: 'linear' }).onfinish = done;
      }, delay));
    }

    function popOut(p) {
      const anim = p.animate([
        { transform: `translate(-50%,-50%) rotate(var(--r)) scale(1)`, opacity: 1 },
        { transform: `translate(-50%,-160%) rotate(90deg) scale(1.1)`, opacity: 1, offset: .5 },
        { transform: `translate(-50%,-260%) rotate(200deg) scale(.2)`, opacity: 0 }
      ], { duration: EC.reduceMotion() ? 1 : 520, easing: 'ease-out' });
      anim.onfinish = () => p.remove();
    }

    function setPounded(v) {
      pounded = v;
      stage.classList.toggle('done', v);
      if (!v) EC.$('#stResult').innerHTML = '';
    }

    async function toggle(card) {
      const id = card.dataset.id, def = EC.SOMTAM.find(s => s.id === id);
      if (busy) return;
      if (pounded) setPounded(false);
      if (selected.has(id)) {
        selected.get(id).forEach(popOut);
        selected.delete(id);
        card.classList.remove('on'); card.setAttribute('aria-pressed', 'false');
        redrawMound(); updateUI();
        return;
      }
      card.classList.add('on', 'boing'); card.setAttribute('aria-pressed', 'true');
      setTimeout(() => card.classList.remove('boing'), 500);
      selected.set(id, []);
      updateUI();
      const from = EC.$('.emo-ing', card);
      const pieces = await Promise.all([0, 1, 2].map(i => toss(from, def, i * 120)));
      if (!selected.has(id)) { pieces.forEach(popOut); return; }
      selected.set(id, pieces);
      redrawMound();
    }

    EC.$$('.emo-card').forEach(c => c.addEventListener('click', () => toggle(c)));
    EC.$('#stChips').addEventListener('click', e => {
      const b = e.target.closest('[data-rm]'); if (!b) return;
      toggle(EC.$(`.emo-card[data-id="${b.dataset.rm}"]`));
    });

    // seasoning sprinkle when a body signal is ticked
    EC.$('#stSignals').addEventListener('change', e => {
      if (!e.target.checked || EC.reduceMotion()) return;
      if (pounded) setPounded(false);
      const mr = mortar.getBoundingClientRect();
      for (let i = 0; i < 10; i++) {
        const d = document.createElement('span');
        d.className = 'sprinkle';
        d.style.left = (mr.left + mr.width * EC.rand(.35, .65)) + 'px';
        d.style.top = (mr.top - 10) + 'px';
        d.style.background = EC.pick(['#d79b4e', '#a8572f', '#f4c64e', '#7a4a2a']);
        document.body.appendChild(d);
        d.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translate(${EC.rand(-20, 20)}px, ${mr.height * .38}px)`, opacity: .2 }],
          { duration: EC.rand(450, 750), delay: i * 30, easing: 'cubic-bezier(.5,0,1,1)' }).onfinish = () => d.remove();
      }
    });

    EC.$('#stReset').addEventListener('click', () => {
      if (busy) return;
      selected.forEach(v => v.forEach(popOut));
      selected.clear();
      EC.$$('.emo-card.on').forEach(c => { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      EC.$$('#stSignals input').forEach(i => i.checked = false);
      setPounded(false); redrawMound(); updateUI();
      if (st.current > 0) st.show(0, true);
    });

    const words = ['ตุ๊ก!', 'ป๊อก!', 'ตำ!', 'คลุก~', 'ตุ๊ก ตุ๊ก!', 'แซ่บ!'];
    function impact(i) {
      const mr = mortar.getBoundingClientRect();
      mortar.classList.remove('squash'); void mortar.offsetWidth; mortar.classList.add('squash');
      stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake');
      thud(90 + Math.random() * 20, 0.16, 0.4);
      // pieces jump and reshuffle
      EC.$$('.piece', pile).forEach(p => {
        const s = spot();
        p.classList.remove('land');
        p.animate([
          { transform: `translate(-50%,-50%) rotate(var(--r))` },
          { transform: `translate(-50%, ${-50 - EC.rand(60, 160)}%) rotate(${EC.rand(-180, 180)}deg)` , offset: .45 },
          { transform: `translate(-50%,-50%) rotate(${s.r}deg)` }
        ], { duration: 360, easing: 'cubic-bezier(.3,.6,.4,1)' });
        p.style.left = s.x + '%'; p.style.top = s.y + '%';
        p.style.setProperty('--r', s.r + 'deg');
        p.style.zIndex = Math.round(s.y * 10);
        p.style.width = Math.max(9, 15 - i * 0.9) + '%';
      });
      // juice splash
      const colors = [...selected.keys()].map(id => EC.SOMTAM.find(s => s.id === id).color).concat(['#f3c47a', '#e98a5f']);
      EC.burst(mr.left + mr.width * .5, mr.top + mr.height * .38, { count: 16, colors, shapes: ['dot', 'drop'], up: true, dist: 120, gravity: 90, min: 5, max: 11 });
      // word pop
      const wd = document.createElement('span');
      wd.className = 'pow';
      wd.textContent = words[i % words.length];
      wd.style.left = EC.rand(8, 70) + '%'; wd.style.top = EC.rand(4, 30) + '%';
      wd.style.setProperty('--rot', EC.rand(-16, 16) + 'deg');
      fx.appendChild(wd);
      setTimeout(() => wd.remove(), 800);
      redrawMound();
    }

    async function pound() {
      if (busy) return;
      if (!selected.size) {
        EC.toast('เลือกเครื่องปรุงความรู้สึกอย่างน้อย 1 อย่างก่อนนะคะ 🌿');
        const b = EC.$('#stPound'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope');
        return;
      }
      busy = true;
      stage.classList.add('pounding');
      EC.$('#stPound').disabled = true;
      const pin = EC.$('.pestle-in');
      const hits = 7;
      await new Promise(r => setTimeout(r, 380));
      for (let i = 0; i < hits; i++) {
        if (EC.reduceMotion()) { impact(i); continue; }
        await pin.animate([{ transform: 'translateY(-38%) rotate(-4deg)' }, { transform: 'translateY(4%) rotate(2deg)' }],
          { duration: 170, easing: 'cubic-bezier(.6,0,1,.6)', fill: 'forwards' }).finished;
        impact(i);
        await pin.animate([{ transform: 'translateY(4%) rotate(2deg)' }, { transform: 'translateY(-38%) rotate(-4deg)' }],
          { duration: 220, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' }).finished;
      }
      pin.getAnimations().forEach(a => a.cancel());
      stage.classList.remove('pounding');
      busy = false;
      EC.$('#stPound').disabled = false;
      setPounded(true);
      const mr = mortar.getBoundingClientRect();
      EC.burst(mr.left + mr.width / 2, mr.top + mr.height * .3, { count: 26, shapes: ['heart', 'star'], up: true, dist: 170, gravity: 30, min: 10, max: 18, duration: 1400 });
      thud(520, 0.18, 0.08); setTimeout(() => thud(660, 0.22, 0.08), 140);
      showResult();
      setTimeout(() => st.show(3, true), 900);
    }
    EC.$('#stPound').addEventListener('click', pound);

    function showResult() {
      const ids = [...selected.keys()];
      const sigs = EC.$$('#stSignals input:checked').map(i => i.value);
      const box = EC.$('#stResult');
      const prev = EC.store.find(1, 'a1')[0];
      box.innerHTML = `
        <div class="result-plate">
          <div class="plate-title">${EC.icon('sparkle')} ส้มตำความรู้สึกจานนี้พร้อมแล้ว!</div>
          <div class="plate-emos">${ids.map((id, i) => `<div class="plate-emo" style="--i:${i}">${EC.face(id, 54)}<b>${EC.EMO[id]}</b><small>${EC.SOMTAM.find(s => s.id === id).ingName}</small></div>`).join('')}</div>
          ${sigs.length ? `<p class="plate-sig"><b>สัญญาณที่สังเกตได้:</b> ${sigs.map(EC.esc).join(' · ')}</p>` : ''}
          <p class="plate-note">ทุกความรู้สึกเป็นส่วนหนึ่งของรสชาติในวันนี้ ไม่มีถูกหรือผิด — การรู้ทันว่ามีอะไรอยู่ในครก คือก้าวแรกของการดูแลอารมณ์ 💛</p>
        </div>
        <label class="field big"><span class="step-h sm">หลังปรุงส้มตำจานนี้ คุณอยากบอกอะไรกับตัวเอง?</span>
          <textarea id="stNote" rows="3" maxlength="300" placeholder="เช่น วันนี้มีความกังวลอยู่มาก แต่ก็มีความภูมิใจเล็ก ๆ ด้วย...">${EC.esc(prev?.data?.note || '')}</textarea></label>`;
      box.classList.remove('rise'); void box.offsetWidth; box.classList.add('rise');
    }

    const st = EC.stepper(EC.$('#stSteps'), {
      steps: [
        { title: 'เลือกความรู้สึก', hint: 'แตะเลือก <b>ความรู้สึก</b> ที่เกิดขึ้นระหว่างการสอน วัตถุดิบจะลอยลงครก — เลือกได้หลายข้อ', validate: () => EC.need.pick(selected.size, 'กรุณาเลือกความรู้สึกอย่างน้อย 1 ข้อ') },
        { title: 'สัญญาณในร่างกาย', hint: 'เลือก <b>สัญญาณในร่างกาย</b> ที่คุณสังเกตได้ในตอนนั้น', validate: () => EC.need.pick(EC.$$('#stSignals input:checked').length, 'กรุณาเลือกสัญญาณอย่างน้อย 1 ข้อ') },
        { title: 'คลุกความรู้สึก', hint: 'กดปุ่ม <b>คลุกความรู้สึก</b> แล้วดูสากตำทุกความรู้สึกให้เข้ากัน', validate: () => pounded ? '' : 'กดปุ่ม “คลุกความรู้สึก” ก่อนนะคะ' },
        { title: 'สะท้อนตนเอง', hint: 'ดูส้มตำความรู้สึกของคุณ แล้ว <b>เขียนสิ่งที่อยากบอกตัวเอง</b>', enter: () => { if (pounded && !EC.$('#stNote')) showResult(); }, validate: () => EC.need.text(EC.$('#stNote')) }
      ],
      onFinish() {
        const ids = [...selected.keys()];
        EC.store.upsert({ week: 1, kind: 'a1', title: 'ส้มตำความรู้สึก', data: { emotions: ids.map(id => EC.EMO[id]), signals: EC.$$('#stSignals input:checked').map(i => i.value), note: EC.$('#stNote').value.trim() } });
        EC.toast('บันทึกส้มตำความรู้สึกแล้ว ✓ ไปเขียนสะท้อนตนเองกันต่อ', 'ok');
        EC.goNext(900);
      }
    });

    updateUI();
  };
})(window.EC);
