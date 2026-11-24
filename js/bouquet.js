/* Week 2 · Activity 1 — ช่อดอกไม้ความรู้สึก
   Picking a flower makes it spring up out of the bouquet wrap (stem draws, head
   pops with a bounce, sparkles + petals). Flowers also pop up from the meadow. */
(function (EC) {
  const INK = '#5a4032';
  // slots for heads in the bouquet (viewBox 0 0 300 360), stems start at 150,250
  const SLOTS = [[150, 92], [100, 118], [200, 116], [62, 160], [238, 158], [126, 152], [176, 150], [150, 190]];
  const BASE = [150, 262];

  const wrapBack = `<path d="M60 170 150 330 240 170z" fill="#f3dcc0" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M60 170c30 14 150 14 180 0" fill="none" stroke="#e5c39d" stroke-width="2"/>`;
  const wrapFront = `<path d="M84 206 150 334 216 206c-20 18-112 18-132 0z" fill="#fbeedc" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M100 230l50 96M200 230l-50 96" stroke="#ead2b2" stroke-width="2"/>
    <g class="ribbon">
      <path d="M150 270c-26-22-48-14-44 2 4 14 30 10 44-2z" fill="#f2a9b4" stroke="${INK}" stroke-width="2"/>
      <path d="M150 270c26-22 48-14 44 2-4 14-30 10-44-2z" fill="#f2a9b4" stroke="${INK}" stroke-width="2"/>
      <path d="M146 274l-16 44 12-6 6 10 4-46M154 274l16 44-12-6-6 10-4-46" fill="#f6bcc5" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="150" cy="272" r="7" fill="#e98f9e" stroke="${INK}" stroke-width="2"/>
    </g>`;

  function stemPath(hx, hy) {
    const [bx, by] = BASE;
    const mx = (bx + hx) / 2 + (hx - bx) * 0.15, my = (by + hy) / 2 + 20;
    return `M${bx} ${by}Q${mx} ${my} ${hx} ${hy + 18}`;
  }
  function leaf(hx, hy, side) {
    const [bx, by] = BASE;
    const t = 0.55, x = bx + (hx - bx) * t, y = by + (hy - by) * t;
    const d = side > 0 ? `M${x} ${y}c12 -8 26 -6 30 2 -10 8 -22 8 -30 -2z` : `M${x} ${y}c-12 -8 -26 -6 -30 2 10 8 22 8 30 -2z`;
    return `<path class="leaf" d="${d}" fill="#9cc26a" stroke="${INK}" stroke-width="1.6"/>`;
  }

  EC.renderBouquet = function (w) {
    const cards = EC.FLOWERS.map(f => `
      <button type="button" class="flower-card" data-id="${f.id}" aria-pressed="false" style="--fc:${f.color}">
        <span class="radio" aria-hidden="true"></span>
        <span class="fc-pic">${EC.flowerIcon(f.flower, 70)}</span>
        <span class="fc-name">${EC.EMO[f.id]}</span>
        <span class="fc-ex">${f.ex}</span>
      </button>`).join('');
    const trig = EC.TRIGGERS.map(t => `<button type="button" class="tchip" aria-pressed="false">${t}</button>`).join('');

    const html = `${EC.actHeader(w, 1, 'ช่อดอกไม้ความรู้สึก',
      'กิจกรรมนี้ช่วยให้ครูได้สำรวจความรู้สึกของตนเองขณะสอนเด็กที่มีภาวะออทิซึมสเปกตรัม (Autism Spectrum Disorder)',
      `<div class="hero-flowers">${['sunflower', 'hydrangea', 'bluebell'].map((f, i) => `<span style="--d:${i * .25}s">${EC.flowerIcon(f, 58)}</span>`).join('')}</div>`)}
      ${EC.howTo('เลือกดอกไม้ที่ตรงกับความรู้สึกของคุณขณะสอนเด็กที่มีภาวะออทิซึมสเปกตรัม แล้วดูดอกไม้เด้งขึ้นมาเป็น “ช่อดอกไม้ความรู้สึก” ของคุณในวันนี้')}
      <div class="bouquet-grid">
        <section class="panel">
          <h3>${EC.icon('flower')} เลือกดอกไม้ความรู้สึกของคุณ</h3>
          <div class="flower-grid">${cards}</div>
        </section>
        <section class="panel bq-panel">
          <h3>${EC.icon('bouquet')} ช่อดอกไม้ความรู้สึกของฉันวันนี้</h3>
          <div class="bq-stage" id="bqStage">
            <svg viewBox="0 0 300 360" class="bq-svg" id="bqSvg" aria-label="ช่อดอกไม้ความรู้สึก">
              <g class="rays">${[...Array(10)].map((_, i) => `<path d="M150 40l0 -14" transform="rotate(${i * 36 - 90} 150 170)" stroke="#f4c64e" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>
              <g id="bqBack">${wrapBack}</g>
              <g id="bqStems"></g>
              <g id="bqHeads"></g>
              <g id="bqFront">${wrapFront}</g>
            </svg>
            <div class="bq-empty" id="bqEmpty">ช่อดอกไม้ยังว่างอยู่<br>เลือกดอกไม้ทางซ้ายได้เลย 🌷</div>
            <div class="petal-layer" id="bqPetals"></div>
          </div>
          <div class="sel-row">${EC.icon('heart')} <b>อารมณ์ที่เลือก</b><div class="chips" id="bqChips"><span class="muted">—</span></div></div>
          <div class="trig-box">
            <div class="trig-head">${EC.icon('bolt')} <b>สิ่งกระตุ้นที่เกี่ยวข้อง</b> <small>(แตะเพื่อเลือก)</small></div>
            <div class="tchips" id="bqTrig">${trig}</div>
            <form class="add-trig" id="bqAdd"><input type="text" maxlength="40" placeholder="เพิ่มสิ่งกระตุ้นอื่น ๆ..." aria-label="เพิ่มสิ่งกระตุ้น"><button class="btn sm ghost" type="submit">${EC.icon('plus')}</button></form>
          </div>
        </section>
      </div>
      <div class="meadow" id="bqMeadow" title="แตะทุ่งหญ้าเพื่อปลูกดอกไม้">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60C150 20 300 30 450 50s300 10 450-14 220 6 300 20V90H0z" fill="#e3edc6"/><path d="M0 72C200 46 380 60 600 66s420-20 600 0V90H0z" fill="#d3e2ad"/></svg>
      </div>
      <div class="next-bar">${EC.icon('calendar')}<span>เมื่อเลือกดอกไม้เสร็จ ระบบจะพาไปบันทึกสะท้อนตนเอง</span>
        <button type="button" class="btn rose" id="bqSave">บันทึกและไปต่อ ${EC.icon('arrow')}</button></div>`;
    return EC.weekShell(w, 'a1', html);
  };

  EC.mountBouquet = function () {
    const svg = EC.$('#bqSvg'), stems = EC.$('#bqStems'), heads = EC.$('#bqHeads');
    const stage = EC.$('#bqStage'), petals = EC.$('#bqPetals');
    const chosen = new Map(); // id -> {slot, stem, head}
    const NS = 'http://www.w3.org/2000/svg';

    function toScreen(x, y) {
      const r = svg.getBoundingClientRect();
      return [r.left + x / 300 * r.width, r.top + y / 360 * r.height];
    }

    function rainPetals(color, n = 10) {
      if (EC.reduceMotion()) return;
      for (let i = 0; i < n; i++) {
        const p = document.createElement('span');
        p.className = 'petal';
        p.style.left = EC.rand(5, 95) + '%';
        p.style.setProperty('--c', color);
        p.style.setProperty('--dx', EC.rand(-60, 60) + 'px');
        p.style.animationDuration = EC.rand(1.8, 3) + 's';
        p.style.animationDelay = EC.rand(0, .5) + 's';
        petals.appendChild(p);
        setTimeout(() => p.remove(), 3800);
      }
    }

    function add(id) {
      const f = EC.FLOWERS.find(x => x.id === id);
      const used = new Set([...chosen.values()].map(v => v.slot));
      const slot = SLOTS.findIndex((_, i) => !used.has(i));
      if (slot < 0) return;
      const [hx, hy] = SLOTS[slot];
      const sway = document.createElementNS(NS, 'g');
      sway.setAttribute('class', 'sway');
      sway.style.animationDelay = (-Math.random() * 3) + 's';
      sway.style.setProperty('--sw', (hx < 150 ? -1 : 1) * EC.rand(1.5, 3) + 'deg');
      const stemG = document.createElementNS(NS, 'g');
      stemG.innerHTML = `<path class="stem" d="${stemPath(hx, hy)}" fill="none" stroke="#6f9a45" stroke-width="3.2" stroke-linecap="round"/>${leaf(hx, hy, hx < 150 ? -1 : 1)}`;
      const head = document.createElementNS(NS, 'g');
      head.setAttribute('transform', `translate(${hx} ${hy})`);
      head.innerHTML = `<g class="head pop" style="--rot:${EC.rand(-14, 14)}deg">${EC.flowerHead(f.flower)}</g>`;
      sway.appendChild(stemG); sway.appendChild(head);
      stems.appendChild(sway);
      chosen.set(id, { slot, el: sway });
      // draw stem
      const path = EC.$('.stem', stemG);
      const len = path.getTotalLength();
      path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
      requestAnimationFrame(() => { path.style.transition = 'stroke-dashoffset .45s ease-out'; path.style.strokeDashoffset = 0; });
      // sparkle + petals once the head pops
      setTimeout(() => {
        const [sx, sy] = toScreen(hx, hy);
        EC.burst(sx, sy, { count: 14, colors: [f.color, '#f4c64e', '#fff'], shapes: ['star', 'dot', 'heart'], dist: 70, gravity: 20, min: 6, max: 12 });
        rainPetals(f.color, 8);
        svg.classList.remove('glow'); void svg.getBoundingClientRect(); svg.classList.add('glow');
      }, 380);
      updateUI();
    }

    function remove(id) {
      const c = chosen.get(id); if (!c) return;
      chosen.delete(id);
      const h = EC.$('.head', c.el);
      h.classList.remove('pop'); h.classList.add('wilt');
      setTimeout(() => c.el.remove(), EC.reduceMotion() ? 0 : 420);
      updateUI();
    }

    function updateUI() {
      EC.$('#bqEmpty').classList.toggle('hide', chosen.size > 0);
      EC.$('#bqChips').innerHTML = chosen.size ? [...chosen.keys()].map(id => `<button type="button" class="chip c-${id}" data-rm="${id}">${EC.EMO[id]} <span aria-hidden="true">×</span></button>`).join('') : '<span class="muted">—</span>';
    }

    EC.$$('.flower-card').forEach(card => card.addEventListener('click', () => {
      const id = card.dataset.id;
      const on = !chosen.has(id);
      if (on && chosen.size >= SLOTS.length) return;
      card.classList.toggle('on', on); card.setAttribute('aria-pressed', on);
      const pic = EC.$('.fc-pic', card);
      pic.classList.remove('boing'); void pic.offsetWidth; pic.classList.add('boing');
      on ? add(id) : remove(id);
    }));
    EC.$('#bqChips').addEventListener('click', e => {
      const b = e.target.closest('[data-rm]'); if (!b) return;
      EC.$(`.flower-card[data-id="${b.dataset.rm}"]`).click();
    });

    // trigger chips
    const trigBox = EC.$('#bqTrig');
    trigBox.addEventListener('click', e => {
      const b = e.target.closest('.tchip'); if (!b) return;
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      if (on) { const r = b.getBoundingClientRect(); EC.burst(r.left + r.width / 2, r.top, { count: 6, shapes: ['dot'], up: true, dist: 30, min: 4, max: 7 }); }
    });
    EC.$('#bqAdd').addEventListener('submit', e => {
      e.preventDefault();
      const inp = EC.$('input', e.target), v = inp.value.trim(); if (!v) return;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tchip'; b.textContent = v; b.setAttribute('aria-pressed', 'true');
      trigBox.appendChild(b); inp.value = '';
    });

    // meadow: flowers pop up and bounce, on a gentle loop + on tap
    const meadow = EC.$('#bqMeadow');
    const kinds = EC.FLOWERS.map(f => f.flower);
    function sprout(xPct, kind) {
      const s = document.createElement('div');
      s.className = 'sprout';
      s.style.left = xPct + '%';
      s.style.setProperty('--h', EC.rand(26, 52) + 'px');
      s.innerHTML = `<i class="st"></i><span class="bloom">${EC.flowerIcon(kind || EC.pick(kinds), 34)}</span>`;
      meadow.appendChild(s);
      setTimeout(() => s.classList.add('bye'), 5200);
      setTimeout(() => s.remove(), 6000);
    }
    meadow.addEventListener('click', e => {
      const r = meadow.getBoundingClientRect();
      sprout((e.clientX - r.left) / r.width * 100);
    });
    if (!EC.reduceMotion()) {
      [8, 22, 38, 61, 77, 92].forEach((x, i) => setTimeout(() => sprout(x), 250 + i * 220));
      const loop = setInterval(() => { if (!document.body.contains(meadow)) return clearInterval(loop); sprout(EC.rand(3, 97)); }, 1400);
    }

    // restore previous
    const prev = EC.store.find(2, 'a1')[0];
    if (prev?.data?.ids) prev.data.ids.forEach((id, i) => setTimeout(() => EC.$(`.flower-card[data-id="${id}"]`)?.click(), 300 + i * 260));
    if (prev?.data?.triggers) EC.$$('.tchip', trigBox).forEach(b => { if (prev.data.triggers.includes(b.textContent)) b.setAttribute('aria-pressed', 'true'); });

    EC.$('#bqSave').addEventListener('click', () => {
      if (!chosen.size) { EC.toast('เลือกดอกไม้อย่างน้อย 1 ดอกก่อนนะคะ 🌸'); return; }
      const ids = [...chosen.keys()];
      const triggers = EC.$$('.tchip[aria-pressed="true"]', trigBox).map(b => b.textContent);
      EC.store.upsert({ week: 2, kind: 'a1', title: 'ช่อดอกไม้ความรู้สึก', data: { ids, emotions: ids.map(i => EC.EMO[i]), triggers } });
      const r = stage.getBoundingClientRect();
      EC.burst(r.left + r.width / 2, r.top + r.height * .35, { count: 30, shapes: ['heart', 'star'], dist: 160, gravity: 40, min: 10, max: 18, duration: 1300 });
      rainPetals('#f8b7c4', 16);
      EC.toast('บันทึกช่อดอกไม้ความรู้สึกแล้ว ✓ กำลังพาไปกิจกรรมถัดไป', 'ok');
      setTimeout(() => { location.hash = '#/week/2/a2'; }, 1400);
    });
  };
})(window.EC);
