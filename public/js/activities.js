/* Creative activities for weeks 3–8 (activity 1 of each week) */
(function (EC) {
  const INK = '#5a4032';
  const svgURL = (s) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);

  /* ---------- sticker / stamp art ---------- */
  const ST = {
    heart: `<path d="M30 52S8 38 8 22a11 11 0 0 1 22-4 11 11 0 0 1 22 4c0 16-22 30-22 30z" fill="#f28b8b" stroke="${INK}" stroke-width="2.4"/>`,
    star: `<path d="M30 6l7 15 16 2-12 11 3 16-14-8-14 8 3-16L7 23l16-2z" fill="#f7d14b" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`,
    sun: `<circle cx="30" cy="30" r="12" fill="#f7d14b" stroke="${INK}" stroke-width="2.4"/>${[...Array(8)].map((_, i) => `<path d="M30 8v6" transform="rotate(${i * 45} 30 30)" stroke="#e9a826" stroke-width="3" stroke-linecap="round"/>`).join('')}`,
    cloud: `<path d="M16 42c-8 0-9-12 0-12 0-10 14-12 18-4 4-6 16-4 15 5 8 1 8 11 0 11z" fill="#fff" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`,
    raincloud: `<path d="M16 34c-8 0-9-12 0-12 0-10 14-12 18-4 4-6 16-4 15 5 8 1 8 11 0 11z" fill="#c9d3df" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M20 40l-3 8M30 40l-3 8M40 40l-3 8" stroke="#6fa3db" stroke-width="2.6" stroke-linecap="round"/>`,
    rain: `<path d="M18 14q5 9 0 13-5-4 0-13zM34 22q5 9 0 13-5-4 0-13zM24 36q5 9 0 13-5-4 0-13z" fill="#8ec1ea" stroke="${INK}" stroke-width="2"/>`,
    wind: `<path d="M8 24h28a6 6 0 1 0-6-6M8 34h36a6 6 0 1 1-6 6M8 29h18" fill="none" stroke="#7fa6c9" stroke-width="3" stroke-linecap="round"/>`,
    leaf: `<path d="M12 48C12 26 26 12 50 10c0 24-14 38-38 38z" fill="#9cc26a" stroke="${INK}" stroke-width="2.4"/><path d="M12 48 36 24" stroke="${INK}" stroke-width="2"/>`,
    rainbow: `<path d="M8 44a22 22 0 0 1 44 0" fill="none" stroke="#f28b8b" stroke-width="5"/><path d="M14 44a16 16 0 0 1 32 0" fill="none" stroke="#f7d14b" stroke-width="5"/><path d="M20 44a10 10 0 0 1 20 0" fill="none" stroke="#8ec1ea" stroke-width="5"/>`,
    mountain: `<path d="M4 48 22 18l10 14 8-10 16 26z" fill="#b9d59a" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 24l4-6 4 6" fill="#fff"/>`,
    flower: `<g transform="translate(30 26)">${EC.flowerHead('sakura')}</g><path d="M30 40v16" stroke="#6f9a45" stroke-width="3"/>`,
    bird: `<path d="M10 30q8-8 14 0 6-8 14 0" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`,
    path: `<path d="M20 54c6-14 26-12 18-26S40 8 44 6" fill="none" stroke="#e8c48a" stroke-width="7" stroke-linecap="round"/>`
  };
  const sticker = (k, size = 44) => `<svg viewBox="0 0 60 60" width="${size}" height="${size}" aria-hidden="true">${ST[k]}</svg>`;
  const stickerSVG = (k) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="120" height="120">${ST[k]}</svg>`;

  // make children of `area` draggable with pointer events (stickers)
  function draggable(el, area) {
    let sx, sy, ox, oy, moving = false;
    el.addEventListener('pointerdown', e => {
      moving = true; el.setPointerCapture(e.pointerId); el.classList.add('grab');
      sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
    });
    el.addEventListener('pointermove', e => {
      if (!moving) return;
      const r = area.getBoundingClientRect();
      const x = Math.max(-10, Math.min(r.width - 30, ox + e.clientX - sx));
      const y = Math.max(-10, Math.min(r.height - 30, oy + e.clientY - sy));
      el.style.left = x + 'px'; el.style.top = y + 'px';
    });
    const end = () => { moving = false; el.classList.remove('grab'); };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
    el.addEventListener('dblclick', () => el.remove());
  }

  /* =====================================================================
     Week 3 · ออกแบบสมุด
     ===================================================================== */
  EC.renderNotebook = function (w) {
    const feel = ['worried', 'angry', 'relieved', 'calm', 'sad', 'proud'];
    const sigs = ['ใจเต้นเร็ว', 'พูดเร็ว', 'เกร็งไหล่', 'หายใจตื้น'];
    const html = `${EC.actHeader(w, 1, 'ออกแบบสมุด', 'ออกแบบ “หน้าสมุดบันทึกประสบการณ์การสอน” เพื่อรวบรวมเหตุการณ์ อารมณ์ และสัญญาณที่เกิดขึ้นจากการสอนเด็กออทิสติกในวันนี้ โดยใช้ภาพ สี สติกเกอร์ และคำสำคัญตามความรู้สึกของคุณ', EC.art.notebook())}
      <div class="nb-wrap">
        <div class="nb-tools panel">
          <div class="tool-group"><b>${EC.icon('star')} สติกเกอร์</b><small>แตะเพื่อติด · ลากเพื่อย้าย · ดับเบิลคลิกเพื่อลบ</small>
            <div class="stk-row">${Object.keys(ST).filter(k => !['path', 'raincloud', 'mountain', 'bird', 'wind', 'rain'].includes(k)).map(k => `<button type="button" class="stk" data-k="${k}" aria-label="สติกเกอร์ ${k}">${sticker(k, 34)}</button>`).join('')}</div></div>
          <div class="tool-group"><b>${EC.icon('palette')} สีกระดาษ</b>
            <div class="paper-row">${['#fbf3e2', '#fde8ea', '#e6f0fa', '#eaf3dc', '#f1eafa'].map((c, i) => `<button type="button" class="paper ${i ? '' : 'on'}" data-c="${c}" style="background:${c}" aria-label="สีกระดาษ ${i + 1}"></button>`).join('')}</div></div>
          <div class="tool-group guide"><b>${EC.icon('bulb')} แนวทางการออกแบบสมุด</b>
            <ul class="ticks"><li>เลือก 1 เหตุการณ์การสอนเด็กออทิสติกในวันนี้</li><li>ระบุความรู้สึกที่เกิดขึ้น (เลือกสัญลักษณ์/สี/ภาพได้)</li><li>บันทึกสัญญาณที่สังเกตในตัวเอง</li><li>เขียนข้อคิดหรือสิ่งที่อยากจำไว้ (สั้น ๆ)</li></ul></div>
        </div>
        <div class="notebook" id="nb">
          <div class="nb-page left">
            <h2 class="nb-title">วันนี้ในห้องเรียน<br>ของฉัน ♡</h2>
            <label class="nb-label">เหตุการณ์วันนี้</label>
            <textarea class="nb-input" id="nbEvent" rows="3" placeholder="เช่น เด็กไม่ยอมเปลี่ยนกิจกรรมจากงานเดี่ยวไปกิจกรรมกลุ่ม"></textarea>
            <label class="nb-label">ความรู้สึกของฉัน</label>
            <div class="nb-faces">${feel.map(f => `<button type="button" class="nb-face" data-f="${f}" aria-pressed="false">${EC.face(f, 44)}<small>${EC.EMO[f]}</small></button>`).join('')}</div>
          </div>
          <div class="nb-rings" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
          <div class="nb-page right">
            <div class="nb-two">
              <div><label class="nb-label see">${EC.icon('eye')} สิ่งที่เห็น <small>(ข้อเท็จจริง)</small></label><textarea class="nb-input" id="nbSee" rows="3" placeholder="สิ่งที่เกิดขึ้นจริง เห็น/ได้ยิน..."></textarea></div>
              <div><label class="nb-label think">${EC.icon('chat')} สิ่งที่คิด <small>(การตีความ)</small></label><textarea class="nb-input" id="nbThink" rows="3" placeholder="สิ่งที่ฉันคิด/ตีความ..."></textarea></div>
            </div>
            <label class="nb-label">สัญญาณที่สังเกตในตัวเอง</label>
            <div class="nb-checks">${sigs.map(s => `<label><input type="checkbox" value="${s}"> ${s}</label>`).join('')}</div>
            <label class="nb-label">สิ่งที่อยากจำไว้</label>
            <textarea class="nb-input" id="nbMemo" rows="2" placeholder="ค่อย ๆ ประเมินสถานการณ์ก่อนตอบสนอง เพื่อเลือกวิธีที่เหมาะกับเด็ก"></textarea>
          </div>
          <div class="nb-stickers" id="nbStk"></div>
        </div>
      </div>
      <div class="next-bar">${EC.icon('book')}<span>บันทึกหน้าสมุดของคุณ แล้วไปต่อที่การเขียนสะท้อนตนเอง</span>
        <button type="button" class="btn blue" id="nbSave">${EC.icon('save')} เริ่มออกแบบสมุด – บันทึก</button></div>`;
    return EC.weekShell(w, 'a1', html);
  };
  EC.mountNotebook = function () {
    const nb = EC.$('#nb'), layer = EC.$('#nbStk');
    function addSticker(k, x, y, pop = true) {
      const s = document.createElement('div');
      s.className = 'sticker' + (pop ? ' pop' : '');
      s.dataset.k = k;
      s.innerHTML = sticker(k, 54);
      const r = nb.getBoundingClientRect();
      s.style.left = (x ?? EC.rand(20, r.width - 80)) + 'px';
      s.style.top = (y ?? EC.rand(20, r.height - 80)) + 'px';
      s.style.setProperty('--r', EC.rand(-18, 18) + 'deg');
      layer.appendChild(s); draggable(s, nb);
    }
    EC.$$('.stk').forEach(b => b.addEventListener('click', () => {
      addSticker(b.dataset.k);
      const r = b.getBoundingClientRect(); EC.burst(r.left + r.width / 2, r.top + r.height / 2, { count: 6, dist: 30, min: 4, max: 8 });
    }));
    EC.$$('.paper').forEach(b => b.addEventListener('click', () => {
      EC.$$('.paper').forEach(x => x.classList.toggle('on', x === b));
      nb.style.setProperty('--paper', b.dataset.c);
    }));
    EC.$$('.nb-face').forEach(b => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      if (on) { b.classList.remove('boing'); void b.offsetWidth; b.classList.add('boing'); }
    }));
    const prev = EC.store.find(3, 'a1')[0]?.data;
    if (prev) {
      EC.$('#nbEvent').value = prev.event || ''; EC.$('#nbSee').value = prev.see || ''; EC.$('#nbThink').value = prev.think || ''; EC.$('#nbMemo').value = prev.memo || '';
      (prev.feelIds || []).forEach(f => EC.$(`.nb-face[data-f="${f}"]`)?.setAttribute('aria-pressed', 'true'));
      EC.$$('.nb-checks input').forEach(i => i.checked = (prev.signals || []).includes(i.value));
      if (prev.paper) EC.$(`.paper[data-c="${prev.paper}"]`)?.click();
      (prev.stickers || []).forEach(s => addSticker(s.k, s.x, s.y, false));
    } else {
      setTimeout(() => { addSticker('flower', 18, 260); addSticker('heart', null, 14); }, 200);
    }
    EC.$('#nbSave').addEventListener('click', () => {
      const feelIds = EC.$$('.nb-face[aria-pressed="true"]').map(b => b.dataset.f);
      const data = {
        event: EC.$('#nbEvent').value.trim(), see: EC.$('#nbSee').value.trim(), think: EC.$('#nbThink').value.trim(), memo: EC.$('#nbMemo').value.trim(),
        feelIds, emotions: feelIds.map(f => EC.EMO[f]), signals: EC.$$('.nb-checks input:checked').map(i => i.value),
        paper: EC.$('.paper.on')?.dataset.c, stickers: EC.$$('.sticker', layer).map(s => ({ k: s.dataset.k, x: s.offsetLeft, y: s.offsetTop }))
      };
      if (!data.event && !data.see && !data.think) { EC.toast('ลองเขียนเหตุการณ์ หรือสิ่งที่เห็น/สิ่งที่คิด อย่างน้อย 1 ช่องนะคะ'); return; }
      EC.store.upsert({ week: 3, kind: 'a1', title: 'ออกแบบสมุด', data });
      const r = nb.getBoundingClientRect(); EC.burst(r.left + r.width / 2, r.top + 40, { count: 22, shapes: ['star', 'heart'], up: true, dist: 120 });
      EC.toast('บันทึกหน้าสมุดแล้ว ✓', 'ok');
    });
  };

  /* =====================================================================
     Week 4 · ปาสีความรู้สึก (watercolor splash canvas)
     ===================================================================== */
  const PAINTS = ['#7f9cc4', '#e9a1a1', '#9cb77a', '#f2c85b', '#b59ad6', '#d9b48c', '#e0786a', '#b8c3cc', '#7d7d86'];
  EC.renderPaint = function (w) {
    const feels = ['กังวล', 'หงุดหงิด', 'เหนื่อยล้า', 'สงบ', 'มีหวัง', 'ภูมิใจ', 'อื่น ๆ'];
    const html = `${EC.actHeader(w, 1, 'ปาสีความรู้สึก', 'เลือกสีที่แทนความรู้สึกของคุณในช่วงการสอนเด็กออทิสติก แล้วปาสีลงบนกระดาษเพื่อสร้างภาพความรู้สึกในวันนี้ — ไม่มีความหมายของสีที่ถูกหรือผิด', EC.art.paint())}
      <div class="paint-grid">
        <section class="panel swatch-panel"><h3>เลือกสี</h3>
          <div class="swatches">${PAINTS.map((c, i) => `<button type="button" class="swatch ${i ? '' : 'on'}" data-c="${c}" style="--c:${c}" aria-label="สี ${i + 1}"></button>`).join('')}</div>
          <div class="brush-mode"><label><input type="radio" name="pm" value="splash" checked> ปาสี (คลิก)</label><label><input type="radio" name="pm" value="brush"> พู่กัน (ลาก)</label></div>
        </section>
        <section class="canvas-box"><canvas id="pc" width="900" height="600" aria-label="กระดาษสำหรับปาสี"></canvas><div class="canvas-hint" id="pcHint">คลิกหรือแตะบนกระดาษเพื่อปาสี 🎨</div></section>
        <section class="panel">
          <h3>ช่วงเหตุการณ์ในการสอน</h3>
          <select id="pcEvent" class="select"><option value="">เลือกเหตุการณ์</option>${EC.EVENTS.map(e => `<option>${e.t}</option>`).join('')}<option>อื่น ๆ</option></select>
          <h3 class="mt">ตอนนั้นคุณรู้สึก...</h3>
          <div class="tchips" id="pcFeel">${feels.map(f => `<button type="button" class="tchip" aria-pressed="false">${f}</button>`).join('')}</div>
          <h3 class="mt">ภาพนี้บอกอะไรเกี่ยวกับความคาดหวังของฉัน?</h3>
          <textarea class="ta" id="pcNote" rows="3" placeholder="เช่น สีเทามีมากกว่าที่คิด เพราะฉันคาดหวังให้เด็กเปลี่ยนกิจกรรมได้เร็ว..."></textarea>
        </section>
      </div>
      <div class="row-center">
        <button type="button" class="btn ghost" id="pcClear">${EC.icon('refresh')} ล้างภาพ</button>
        <button type="button" class="btn blue" id="pcSave">${EC.icon('tick')} บันทึกภาพ</button>
      </div>`;
    return EC.weekShell(w, 'a1', html);
  };
  EC.mountPaint = function () {
    const cv = EC.$('#pc'), ctx = cv.getContext('2d');
    let color = PAINTS[0], mode = 'splash', drawing = false, last = null;
    function paper() {
      ctx.fillStyle = '#fdfaf3'; ctx.fillRect(0, 0, cv.width, cv.height);
      for (let i = 0; i < 2200; i++) { ctx.fillStyle = `rgba(160,140,110,${Math.random() * 0.05})`; ctx.fillRect(Math.random() * cv.width, Math.random() * cv.height, 2, 2); }
    }
    paper();
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * cv.width, (e.clientY - r.top) / r.height * cv.height]; };
    function blob(x, y, r, a) {
      const g = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
      g.addColorStop(0, color + Math.round(a * 255).toString(16).padStart(2, '0'));
      g.addColorStop(0.7, color + Math.round(a * 180).toString(16).padStart(2, '0'));
      g.addColorStop(1, color + '00');
      ctx.fillStyle = g;
      ctx.beginPath();
      const pts = 14;
      for (let i = 0; i <= pts; i++) {
        const ang = i / pts * Math.PI * 2, rr = r * EC.rand(0.75, 1.1);
        const px = x + Math.cos(ang) * rr, py = y + Math.sin(ang) * rr;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath(); ctx.fill();
    }
    function splash(x, y) {
      ctx.globalCompositeOperation = 'multiply';
      const R = EC.rand(55, 95);
      blob(x, y, R, 0.55); blob(x + EC.rand(-15, 15), y + EC.rand(-15, 15), R * 0.6, 0.45);
      for (let i = 0; i < 26; i++) {
        const ang = EC.rand(0, Math.PI * 2), d = R * EC.rand(0.8, 2.1), s = EC.rand(2, 9) * (1.6 - d / (R * 2.1));
        ctx.fillStyle = color + 'b0';
        ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, Math.max(1, s), 0, Math.PI * 2); ctx.fill();
        if (Math.random() < .25) { // streak
          ctx.strokeStyle = color + '90'; ctx.lineWidth = EC.rand(1.5, 3); ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * R * .7, y + Math.sin(ang) * R * .7); ctx.lineTo(x + Math.cos(ang) * d, y + Math.sin(ang) * d); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      const r = cv.getBoundingClientRect();
      EC.burst(r.left + x / cv.width * r.width, r.top + y / cv.height * r.height, { count: 10, colors: [color], shapes: ['dot'], dist: 60, gravity: 30, min: 4, max: 9 });
      EC.$('#pcHint').classList.add('hide');
    }
    function stroke(x, y) {
      ctx.globalCompositeOperation = 'multiply';
      const [lx, ly] = last || [x, y];
      const dist = Math.hypot(x - lx, y - ly), steps = Math.max(1, dist / 4);
      for (let i = 0; i < steps; i++) {
        const t = i / steps; blob(lx + (x - lx) * t, ly + (y - ly) * t, EC.rand(14, 20), 0.12);
      }
      ctx.globalCompositeOperation = 'source-over';
      last = [x, y];
      EC.$('#pcHint').classList.add('hide');
    }
    cv.addEventListener('pointerdown', e => {
      const [x, y] = pos(e);
      if (mode === 'splash') { splash(x, y); return; }
      drawing = true; last = null; cv.setPointerCapture(e.pointerId); stroke(x, y);
    });
    cv.addEventListener('pointermove', e => { if (drawing) stroke(...pos(e)); });
    cv.addEventListener('pointerup', () => drawing = false);
    EC.$$('.swatch').forEach(b => b.addEventListener('click', () => { color = b.dataset.c; EC.$$('.swatch').forEach(x => x.classList.toggle('on', x === b)); }));
    EC.$$('input[name="pm"]').forEach(r => r.addEventListener('change', () => mode = r.value));
    EC.$('#pcFeel').addEventListener('click', e => { const b = e.target.closest('.tchip'); if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); });
    EC.$('#pcClear').addEventListener('click', () => { paper(); EC.$('#pcHint').classList.remove('hide'); });
    const prev = EC.store.find(4, 'a1')[0]?.data;
    if (prev) {
      if (prev.img) { const im = new Image(); im.onload = () => { ctx.drawImage(im, 0, 0, cv.width, cv.height); EC.$('#pcHint').classList.add('hide'); }; im.src = prev.img; }
      EC.$('#pcEvent').value = prev.event || ''; EC.$('#pcNote').value = prev.note || '';
      EC.$$('#pcFeel .tchip').forEach(b => { if ((prev.emotions || []).includes(b.textContent)) b.setAttribute('aria-pressed', 'true'); });
    }
    EC.$('#pcSave').addEventListener('click', () => {
      const t = document.createElement('canvas'); t.width = 450; t.height = 300;
      t.getContext('2d').drawImage(cv, 0, 0, 450, 300);
      EC.store.upsert({ week: 4, kind: 'a1', title: 'ปาสีความรู้สึก', data: {
        img: t.toDataURL('image/jpeg', 0.75), event: EC.$('#pcEvent').value,
        emotions: EC.$$('#pcFeel .tchip[aria-pressed="true"]').map(b => b.textContent), note: EC.$('#pcNote').value.trim() } });
      EC.toast('บันทึกภาพความรู้สึกแล้ว ✓', 'ok');
    });
  };

  /* =====================================================================
     Week 5 · เติมภาพความรู้สึกของฉัน (crayon + stamps on a landscape)
     ===================================================================== */
  const CRAYON = ['#f4a7a7', '#f6b26b', '#f7d96b', '#9cc98a', '#8fbbe8', '#c3a6e6'];
  const STAMPS = [['raincloud', 'เมฆฝน'], ['sun', 'ดวงอาทิตย์'], ['rain', 'สายฝน'], ['wind', 'สายลม'], ['flower', 'ดอกไม้'], ['heart', 'หัวใจ'], ['star', 'ดาว'], ['mountain', 'ภูเขา'], ['path', 'ทางเดิน'], ['bird', 'นก']];
  EC.renderFill = function (w) {
    const html = `${EC.actHeader(w, 1, 'เติมภาพความรู้สึกของฉัน', 'กิจกรรมนี้ช่วยให้ครูแสดงความรู้สึกของตนเองในปัจจุบันระหว่างการสอนเด็กออทิสติก ผ่านการวาดภาพและสัญลักษณ์ต่าง ๆ ในภาพทิวทัศน์ที่ผ่อนคลาย', EC.art.sky())}
      <div class="goal-strip">${EC.icon('target')}<b>เป้าหมาย</b><ul><li>เข้าใจและรู้เท่าทันความรู้สึกของตนเองขณะสอนเด็กออทิสติก</li><li>หยุดและเว้นจังหวะก่อนตอบสนองต่อพฤติกรรมของเด็ก</li><li>สังเกตสิ่งที่เด็กออทิสติกอาจกำลังสื่อสารผ่านพฤติกรรมของเขา</li></ul></div>
      <div class="fill-grid">
        <section class="canvas-box"><canvas id="fc" width="900" height="640" aria-label="ภาพทิวทัศน์สำหรับเติมภาพ"></canvas><div class="canvas-hint" id="fcHint">เลือกสัญลักษณ์แล้วแตะบนภาพ หรือเลือกสีแล้วลากเพื่อระบาย</div></section>
        <section class="panel">
          <h3>${EC.icon('palette')} เครื่องมือเติมภาพ</h3>
          <small class="muted">สีที่ฉันอยากใช้</small>
          <div class="crayons">${CRAYON.map((c, i) => `<button type="button" class="crayon" data-c="${c}" style="--c:${c}" aria-label="สีเทียน ${i + 1}"></button>`).join('')}</div>
          <small class="muted">สัญลักษณ์/องค์ประกอบง่าย ๆ</small>
          <div class="stamps">${STAMPS.map(([k, n], i) => `<button type="button" class="stamp ${i ? '' : 'on'}" data-k="${k}" title="${n}">${sticker(k, 32)}</button>`).join('')}</div>
          <small class="muted">คำชวนคิดในการเติมภาพ</small>
          <input class="inp" id="fq1" placeholder="☁ ถ้าความรู้สึกของฉันเป็นท้องฟ้า...">
          <input class="inp" id="fq2" placeholder="〰 ถ้าความรู้สึกของฉันเป็นลม...">
          <input class="inp" id="fq3" placeholder="✎ สิ่งที่ฉันอยากเติมลงไปในภาพตอนนี้...">
          <button type="button" class="btn ghost sm mt" id="fcUndo">${EC.icon('refresh')} เริ่มภาพใหม่</button>
        </section>
        <section class="panel">
          <h3>${EC.icon('bulb')} สิ่งที่ฉันสื่อผ่านภาพ</h3>
          <div id="fcMeanings" class="meanings"><p class="muted">เมื่อคุณวางสัญลักษณ์ลงบนภาพ ช่องสำหรับเขียนความหมายจะปรากฏที่นี่ เช่น <i>เมฆสีเทา = รู้สึกกังวลระหว่างสอน</i></p></div>
        </section>
      </div>
      <div class="row-end"><button type="button" class="btn brown" id="fcSave">บันทึกและไปต่อ ${EC.icon('arrow')}</button></div>`;
    return EC.weekShell(w, 'a1', html);
  };
  EC.mountFill = function () {
    const cv = EC.$('#fc'), ctx = cv.getContext('2d');
    let tool = { t: 'stamp', k: 'raincloud' }, drawing = false, last = null;
    const used = new Map(); // k -> meaning
    const imgs = {};
    STAMPS.forEach(([k]) => { const im = new Image(); im.src = svgURL(stickerSVG(k)); imgs[k] = im; });
    function scene() {
      const W = cv.width, H = cv.height;
      const g = ctx.createLinearGradient(0, 0, 0, H * .6); g.addColorStop(0, '#dbeaf7'); g.addColorStop(1, '#f6f1e4');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#d9e8b8'; ctx.beginPath(); ctx.moveTo(0, H * .62);
      ctx.bezierCurveTo(W * .25, H * .5, W * .45, H * .55, W * .6, H * .62); ctx.bezierCurveTo(W * .75, H * .7, W * .9, H * .55, W, H * .58); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
      ctx.fillStyle = '#c7dc9b'; ctx.beginPath(); ctx.moveTo(0, H * .78); ctx.bezierCurveTo(W * .3, H * .66, W * .6, H * .8, W, H * .72); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
      ctx.strokeStyle = '#ecd29b'; ctx.lineWidth = 26; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(W * .48, H); ctx.bezierCurveTo(W * .58, H * .85, W * .4, H * .78, W * .62, H * .64); ctx.stroke();
      ctx.strokeStyle = '#9bb878'; ctx.lineWidth = 3;
      for (let i = 0; i < 40; i++) { const x = Math.random() * W, y = H * .75 + Math.random() * H * .23; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4, y - 12); ctx.moveTo(x, y); ctx.lineTo(x + 4, y - 12); ctx.stroke(); }
    }
    scene();
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * cv.width, (e.clientY - r.top) / r.height * cv.height]; };
    function crayon(x, y) {
      const [lx, ly] = last || [x, y];
      ctx.strokeStyle = tool.c; ctx.globalAlpha = .55; ctx.lineCap = 'round';
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = EC.rand(5, 10);
        ctx.beginPath(); ctx.moveTo(lx + EC.rand(-3, 3), ly + EC.rand(-3, 3)); ctx.lineTo(x + EC.rand(-3, 3), y + EC.rand(-3, 3)); ctx.stroke();
      }
      ctx.globalAlpha = 1; last = [x, y];
    }
    function stamp(x, y) {
      const s = EC.rand(80, 110);
      ctx.save(); ctx.translate(x, y); ctx.rotate(EC.rand(-.2, .2));
      ctx.drawImage(imgs[tool.k], -s / 2, -s / 2, s, s); ctx.restore();
      const r = cv.getBoundingClientRect();
      EC.burst(r.left + x / cv.width * r.width, r.top + y / cv.height * r.height, { count: 8, shapes: ['star', 'dot'], dist: 50, gravity: 10, min: 5, max: 9 });
      if (!used.has(tool.k)) { used.set(tool.k, ''); renderMeanings(); }
    }
    function renderMeanings(focusK) {
      const box = EC.$('#fcMeanings');
      if (!used.size) return;
      box.innerHTML = [...used.entries()].map(([k, v]) => `<div class="meaning"><span class="m-ic">${sticker(k, 40)}</span><b>${STAMPS.find(s => s[0] === k)[1]} =</b>
        <textarea rows="2" data-k="${k}" placeholder="ความหมายสำหรับฉัน...">${EC.esc(v)}</textarea></div>`).join('');
      EC.$$('textarea', box).forEach(t => t.addEventListener('input', () => used.set(t.dataset.k, t.value)));
    }
    cv.addEventListener('pointerdown', e => {
      EC.$('#fcHint').classList.add('hide');
      const [x, y] = pos(e);
      if (tool.t === 'stamp') { stamp(x, y); return; }
      drawing = true; last = null; cv.setPointerCapture(e.pointerId); crayon(x, y);
    });
    cv.addEventListener('pointermove', e => { if (drawing) crayon(...pos(e)); });
    cv.addEventListener('pointerup', () => drawing = false);
    EC.$$('.crayon').forEach(b => b.addEventListener('click', () => { tool = { t: 'brush', c: b.dataset.c }; EC.$$('.crayon,.stamp').forEach(x => x.classList.toggle('on', x === b)); }));
    EC.$$('.stamp').forEach(b => b.addEventListener('click', () => { tool = { t: 'stamp', k: b.dataset.k }; EC.$$('.crayon,.stamp').forEach(x => x.classList.toggle('on', x === b)); }));
    EC.$('#fcUndo').addEventListener('click', () => { scene(); used.clear(); EC.$('#fcMeanings').innerHTML = '<p class="muted">วางสัญลักษณ์ลงบนภาพเพื่อเริ่มเขียนความหมาย</p>'; EC.$('#fcHint').classList.remove('hide'); });
    const prev = EC.store.find(5, 'a1')[0]?.data;
    if (prev) {
      if (prev.img) { const im = new Image(); im.onload = () => { ctx.drawImage(im, 0, 0, cv.width, cv.height); EC.$('#fcHint').classList.add('hide'); }; im.src = prev.img; }
      (prev.meanings || []).forEach(m => used.set(m.k, m.v)); renderMeanings();
      ['fq1', 'fq2', 'fq3'].forEach((id, i) => EC.$('#' + id).value = (prev.prompts || [])[i] || '');
    }
    EC.$('#fcSave').addEventListener('click', () => {
      const t = document.createElement('canvas'); t.width = 450; t.height = 320;
      t.getContext('2d').drawImage(cv, 0, 0, 450, 320);
      EC.store.upsert({ week: 5, kind: 'a1', title: 'เติมภาพความรู้สึกของฉัน', data: {
        img: t.toDataURL('image/jpeg', 0.75), meanings: [...used.entries()].map(([k, v]) => ({ k, name: STAMPS.find(s => s[0] === k)[1], v })),
        prompts: ['fq1', 'fq2', 'fq3'].map(id => EC.$('#' + id).value.trim()) } });
      EC.toast('บันทึกภาพแล้ว ✓ กำลังไปที่การเขียนสะท้อนตนเอง', 'ok');
      setTimeout(() => location.hash = '#/week/5/a2', 1200);
    });
  };

  /* =====================================================================
     Week 6 · กล่องความรู้สึกของฉัน (drag feelings into boxes)
     ===================================================================== */
  const BOX_FEEL = [['calm', 'สงบ'], ['happy', 'มีความสุข'], ['proud', 'ภูมิใจ'], ['determined', 'มั่นใจ'], ['worried', 'กังวล'], ['stressed', 'เครียด'], ['angry', 'หงุดหงิด'], ['tired', 'เหนื่อยล้า'], ['sad', 'ท้อ'], ['confused', 'สับสน']];
  const BOXES = [
    ['keep', 'ความรู้สึก<br>ที่อยากเก็บไว้', 'ช่วยให้ฉันมีกำลังใจและพลังในการสอน', 'heart', 'green'],
    ['unsure', 'ความรู้สึก<br>ที่ยังไม่รู้จะจัดการยังไง', 'กำลังสับสน ไม่แน่ใจว่าจะรับมืออย่างไร', 'gear', 'yellow'],
    ['drop', 'ความรู้สึก<br>ที่อยากวางลง', 'ทำให้ฉันเหนื่อยหรือไม่สบายใจในการสอน', 'trash', 'pink']
  ];
  const STRAT = ['เว้นจังหวะก่อนตอบสนอง', 'หายใจอย่างมีสติ', 'ปรับน้ำเสียงให้นุ่มนวลลง', 'ให้เวลาตนเองก่อนตอบสนอง', 'ขอความช่วยเหลือจากเพื่อนครู', 'บอกความรู้สึกตนเองกับคนที่ไว้ใจ'];
  EC.renderBoxes = function (w) {
    const html = `${EC.actHeader(w, 1, 'กล่องความรู้สึกของฉัน', 'เลือก “ความรู้สึก” จากด้านซ้าย แล้วลากไปใส่ในกล่องที่ตรงกับความรู้สึกของคุณในช่วงนี้ จากประสบการณ์การสอนเด็กที่มีภาวะออทิซึมสเปกตรัม', EC.art.box())}
      <div class="flow-strip"><span class="fs s1">${EC.icon('pause')} หยุด</span>${EC.icon('arrow')}<span class="fs s2">${EC.icon('eye')} สังเกต</span>${EC.icon('arrow')}<span class="fs s3">${EC.icon('tick')} เลือก</span></div>
      <div class="boxes-grid">
        <section class="panel feel-tray"><h3>ความรู้สึกของฉัน ${EC.icon('heart')}</h3><small class="muted">ลากไปวางในกล่องที่เหมาะสม (หรือแตะความรู้สึก แล้วแตะกล่อง)</small>
          <div class="tray" id="bxTray">${BOX_FEEL.map(([f, t]) => `<button type="button" class="fchip" data-f="${f}">${EC.face(f, 28)}<span>${t}</span></button>`).join('')}</div>
        </section>
        <div class="box-row">${BOXES.map(([id, t, d, ic, col]) => `
          <div class="fbox ${col}" data-box="${id}">
            <div class="fbox-label"><b>${t}</b><small>${d}</small></div>
            <div class="fbox-body">
              <div class="lid"></div>
              <div class="fbox-front">${EC.icon(ic)}</div>
              <div class="drop" data-drop="${id}"><span class="ph">${EC.icon('plus')} ลากความรู้สึกมาวางที่นี่</span></div>
            </div>
          </div>`).join('')}</div>
      </div>
      <section class="panel mt">
        <h3>${EC.icon('sparkle')} วิธีกำกับอารมณ์ที่ฉันสามารถนำมาใช้ได้</h3>
        <div class="tchips" id="bxStrat">${STRAT.map(s => `<button type="button" class="tchip" aria-pressed="false">${s}</button>`).join('')}</div>
        <textarea class="ta mt" id="bxNote" rows="2" placeholder="วิธีอื่น ๆ หรือสิ่งที่อยากลองใช้ในสถานการณ์การสอนครั้งต่อไป..."></textarea>
      </section>
      <div class="row-center"><button type="button" class="btn rose" id="bxSave">${EC.icon('save')} บันทึกกิจกรรม</button></div>`;
    return EC.weekShell(w, 'a1', html);
  };
  EC.mountBoxes = function () {
    const tray = EC.$('#bxTray');
    let picked = null;
    function place(chip, dropId) {
      const drop = EC.$(`.drop[data-drop="${dropId}"]`);
      drop.appendChild(chip);
      chip.classList.remove('picked'); chip.classList.add('in', 'pop');
      setTimeout(() => chip.classList.remove('pop'), 500);
      const box = drop.closest('.fbox');
      box.classList.remove('gulp'); void box.offsetWidth; box.classList.add('gulp');
      const r = drop.getBoundingClientRect();
      EC.burst(r.left + r.width / 2, r.top + 10, { count: 10, shapes: ['heart', 'dot'], up: true, dist: 60 });
      EC.$$('.fbox').forEach(b => b.classList.toggle('has', !!EC.$('.fchip', b)));
    }
    function back(chip) { tray.appendChild(chip); chip.classList.remove('in'); EC.$$('.fbox').forEach(b => b.classList.toggle('has', !!EC.$('.fchip', b))); }

    // pointer drag with ghost
    EC.$$('.fchip').forEach(chip => {
      let ghost = null, sx = 0, sy = 0, moved = false;
      chip.addEventListener('pointerdown', e => {
        sx = e.clientX; sy = e.clientY; moved = false;
        chip.setPointerCapture(e.pointerId);
      });
      chip.addEventListener('pointermove', e => {
        if (!chip.hasPointerCapture(e.pointerId)) return;
        if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) < 6) return;
        if (!moved) {
          moved = true;
          ghost = chip.cloneNode(true); ghost.classList.add('ghost'); document.body.appendChild(ghost);
          chip.classList.add('dragging');
        }
        ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
        const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('.fbox');
        EC.$$('.fbox').forEach(b => b.classList.toggle('over', b === over));
      });
      chip.addEventListener('pointerup', e => {
        if (moved) {
          ghost.remove(); ghost = null; chip.classList.remove('dragging');
          EC.$$('.fbox').forEach(b => b.classList.remove('over'));
          const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('.fbox');
          if (over) place(chip, over.dataset.box);
          else if (document.elementFromPoint(e.clientX, e.clientY)?.closest('#bxTray')) back(chip);
          return;
        }
        // tap mode
        if (chip.classList.contains('in')) { back(chip); return; }
        EC.$$('.fchip.picked').forEach(c => c !== chip && c.classList.remove('picked'));
        chip.classList.toggle('picked');
        picked = chip.classList.contains('picked') ? chip : null;
      });
    });
    EC.$$('.fbox').forEach(b => b.addEventListener('click', e => {
      if (e.target.closest('.fchip')) return;
      if (picked) { place(picked, b.dataset.box); picked = null; }
    }));
    EC.$('#bxStrat').addEventListener('click', e => { const b = e.target.closest('.tchip'); if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); });

    const prev = EC.store.find(6, 'a1')[0]?.data;
    if (prev) {
      Object.entries(prev.boxes || {}).forEach(([box, fs]) => fs.forEach(f => { const c = EC.$(`.fchip[data-f="${f}"]`); if (c) place(c, box); }));
      EC.$$('#bxStrat .tchip').forEach(b => { if ((prev.strategies || []).includes(b.textContent)) b.setAttribute('aria-pressed', 'true'); });
      EC.$('#bxNote').value = prev.note || '';
    }
    EC.$('#bxSave').addEventListener('click', () => {
      const boxes = {}; const names = {};
      BOXES.forEach(([id]) => { boxes[id] = EC.$$(`.drop[data-drop="${id}"] .fchip`).map(c => c.dataset.f); names[id] = boxes[id].map(f => BOX_FEEL.find(x => x[0] === f)[1]); });
      if (!Object.values(boxes).flat().length) { EC.toast('ลองวางความรู้สึกลงในกล่องอย่างน้อย 1 ความรู้สึกนะคะ'); return; }
      EC.store.upsert({ week: 6, kind: 'a1', title: 'กล่องความรู้สึกของฉัน', data: { boxes, names, strategies: EC.$$('#bxStrat .tchip[aria-pressed="true"]').map(b => b.textContent), note: EC.$('#bxNote').value.trim() } });
      EC.toast('บันทึกกล่องความรู้สึกแล้ว ✓', 'ok');
    });
  };

  /* =====================================================================
     Week 7 · เรียนรู้จากเหตุการณ์จริงของฉัน (timeline)
     ===================================================================== */
  const W7EV = [
    ['transition', 'การเปลี่ยนกิจกรรม', '(เปลี่ยนจากกิจกรรมที่ชอบไปกิจกรรมถัดไป)', 'worried'],
    ['noise', 'เด็กมีความไม่สบายใจ', 'เมื่อมีเสียงดังหรือมีการเปลี่ยนแปลงที่ไม่คาดคิด', 'stressed'],
    ['group', 'เด็กไม่เข้าร่วมกิจกรรมกลุ่ม', '(เช่น กิจกรรมวงกลม กิจกรรมร่วมกับเพื่อน)', 'confused']
  ];
  EC.renderTimeline = function (w) {
    const obs = [['heart', 'อารมณ์ของฉัน', 'ฉันรู้สึกอย่างไรในเหตุการณ์นี้?'], ['bolt', 'สิ่งกระตุ้น', 'อะไรที่น่าจะเป็นตัวกระตุ้นให้เกิดเหตุการณ์นี้?'], ['gear', 'การตอบสนองของฉัน', 'ฉันได้ทำหรือพูดอะไรไปบ้าง?'], ['sprout', 'สิ่งที่ได้เรียนรู้', 'ฉันได้เรียนรู้อะไรเกี่ยวกับการสอนเด็กออทิสติกจากเหตุการณ์นี้?']];
    const html = `${EC.actHeader(w, 1, 'เรียนรู้จากเหตุการณ์จริงของฉัน', 'ทบทวนเหตุการณ์จริงในการสอน เพื่อมองเห็นสิ่งที่เกิดขึ้น อารมณ์ของตนเอง และสิ่งที่ได้เรียนรู้', EC.art.classroom())}
      <div class="tl-grid">
        <section class="panel"><h3><span class="num">1</span> เลือกเหตุการณ์จริง</h3><small class="muted">เลือก 1 เหตุการณ์จริงจากการสอนเด็กออทิสติกที่ต้องการทบทวนในครั้งนี้</small>
          <div class="ev-list" id="tlEv">${W7EV.map(([id, t, d, f]) => `<button type="button" class="ev-card" data-id="${id}" aria-pressed="false"><span class="radio"></span><span class="ev-face">${EC.face(f, 48)}</span><span><b>${t}</b><small>${d}</small></span></button>`).join('')}
            <input class="inp" id="tlOther" placeholder="หรือเขียนเหตุการณ์อื่น...">
          </div>
        </section>
        <section class="panel"><h3><span class="num">2</span> มองเหตุการณ์เป็นลำดับ</h3><small class="muted">บันทึกเหตุการณ์ที่เลือก โดยเรียงลำดับก่อน–ขณะ–หลังเกิดเหตุ</small>
          <ol class="timeline">
            <li class="t1">${EC.icon('calendar')}<b>ก่อนเกิดเหตุ</b><textarea rows="2" id="tlB" placeholder="เกิดอะไรขึ้นก่อนหน้านั้น?"></textarea></li>
            <li class="t2">${EC.icon('bolt')}<b>ขณะเกิดเหตุ</b><textarea rows="2" id="tlD" placeholder="เกิดอะไรขึ้นในขณะนั้น?"></textarea></li>
            <li class="t3">${EC.icon('check')}<b>หลังเกิดเหตุ</b><textarea rows="2" id="tlA" placeholder="เกิดอะไรขึ้นต่อมา? (เช่น เด็กสงบลงอย่างไร / จบกิจกรรมอย่างไร)"></textarea></li>
          </ol>
        </section>
        <section class="panel"><h3><span class="num">3</span> สิ่งที่ฉันสังเกตได้</h3><small class="muted">พิจารณาและบันทึกจากเหตุการณ์นี้</small>
          ${obs.map(([ic, t, ph], i) => `<label class="obs">${EC.icon(ic)}<b>${t}</b><textarea rows="2" id="tlO${i}" placeholder="${ph}"></textarea></label>`).join('')}
        </section>
      </div>
      <div class="next-bar">${EC.icon('bulb')}<span><b>ตัวอย่างเหตุการณ์</b> “ช่วงเปลี่ยนกิจกรรม เด็กออทิสติกไม่ยอมเก็บของและมีความไม่สบายใจเมื่อบอกให้หยุดกิจกรรมที่กำลังสนใจ”</span>
        <button type="button" class="btn green" id="tlSave">${EC.icon('save')} บันทึกเหตุการณ์นี้</button></div>`;
    return EC.weekShell(w, 'a1', html);
  };
  EC.mountTimeline = function () {
    EC.$$('.ev-card').forEach(c => c.addEventListener('click', () => {
      EC.$$('.ev-card').forEach(x => x.setAttribute('aria-pressed', x === c));
      c.classList.remove('boing'); void c.offsetWidth; c.classList.add('boing');
    }));
    const prev = EC.store.find(7, 'a1')[0]?.data;
    if (prev) {
      if (prev.eventId) EC.$(`.ev-card[data-id="${prev.eventId}"]`)?.setAttribute('aria-pressed', 'true');
      EC.$('#tlOther').value = prev.other || '';
      ['tlB', 'tlD', 'tlA'].forEach((id, i) => EC.$('#' + id).value = (prev.seq || [])[i] || '');
      [0, 1, 2, 3].forEach(i => EC.$('#tlO' + i).value = (prev.obs || [])[i] || '');
    }
    EC.$('#tlSave').addEventListener('click', () => {
      const sel = EC.$('.ev-card[aria-pressed="true"]');
      const other = EC.$('#tlOther').value.trim();
      if (!sel && !other) { EC.toast('เลือกหรือเขียนเหตุการณ์ก่อนนะคะ'); return; }
      EC.store.upsert({ week: 7, kind: 'a1', title: 'เรียนรู้จากเหตุการณ์จริงของฉัน', data: {
        eventId: sel?.dataset.id, event: sel ? W7EV.find(e => e[0] === sel.dataset.id)[1] : other, other,
        seq: ['tlB', 'tlD', 'tlA'].map(id => EC.$('#' + id).value.trim()), obs: [0, 1, 2, 3].map(i => EC.$('#tlO' + i).value.trim()) } });
      EC.toast('บันทึกเหตุการณ์แล้ว ✓', 'ok');
    });
  };

  /* =====================================================================
     Week 8 · เติมดาวให้ท้องฟ้าของฉัน
     ===================================================================== */
  const PROC = [
    ['mon', 'Monitoring', 'ฉันรู้ทันอารมณ์ของตนเอง', 'eye', ['ฉันเริ่มสังเกตได้ว่าเมื่อเครียด ฉันมักพูดเร็วขึ้น / ใจร้อนขึ้น', 'ฉันรับรู้อารมณ์ของตนเองได้เร็วขึ้นระหว่างการสอน', 'ฉันรู้สัญญาณเตือนของความตึงเครียดได้ดีขึ้น']],
    ['eva', 'Evaluating', 'ฉันเข้าใจสถานการณ์มากขึ้น', 'clipboard', ['ฉันมองเห็นความต้องการของเด็กได้ชัดเจนขึ้น', 'ฉันเข้าใจว่าพฤติกรรมของเด็กอาจเกิดจากความไม่สบายใจ', 'ฉันสามารถมองสถานการณ์ได้อย่างรอบด้านและใจเย็นขึ้น']],
    ['mod', 'Modifying', 'ฉันเลือกตอบสนองได้เหมาะสมขึ้น', 'gear', ['ฉันปรับวิธีการสื่อสารให้สงบและชัดเจนขึ้น', 'ฉันใช้กลยุทธ์ที่ช่วยให้เด็กสงบลงได้ (เช่น visual schedule, เวลาพัก)', 'ฉันเลือกวิธีจัดการอารมณ์ของตนเองก่อนตอบสนองเด็ก']]
  ];
  const ZONES = { mon: [[14, 26], [24, 48], [10, 58]], eva: [[42, 20], [52, 40], [40, 54]], mod: [[70, 28], [84, 44], [72, 58]] };
  EC.renderStars = function (w) {
    const html = `${EC.actHeader(w, 1, 'เติมดาวให้ท้องฟ้าของฉัน', 'เลือกและตกแต่งดาว เพื่อบอกเล่าสิ่งที่คุณได้เรียนรู้จากการฝึกทั้ง 3 กระบวนการ ในการกำกับอารมณ์จากการสอนเด็กที่มีภาวะออทิซึมสเปกตรัม',
      `<div class="bubble">จากประสบการณ์ตลอด 8 สัปดาห์<br>วันนี้...คุณได้เรียนรู้อะไร และเติบโตอย่างไรในการกำกับอารมณ์ของตนเอง?</div>`)}
      <div class="stars-grid">
        <section class="sky" id="sky">
          <div class="sky-top"><span class="sky-pill">${EC.icon('star')} ท้องฟ้าของฉัน</span><span class="sky-pill" id="skyCount">${EC.icon('star')} ดาวที่เติมแล้ว : 0 / 3</span></div>
          <div class="moon"></div>
          <div class="twinkles" id="twk"></div>
          <svg class="const" id="constel" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
          <div class="my-stars" id="myStars"></div>
          <div class="sky-empty" id="skyEmpty">${EC.icon('plus')}<span>เริ่มเลือกดาว<br>เพื่อเติมสิ่งที่คุณได้เรียนรู้</span></div>
          <div class="sky-msg" id="skyMsg" hidden>✨ กลุ่มดาวแห่งการเรียนรู้ของฉัน ✨</div>
          <svg class="hills" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50C60 20 110 30 160 44s100-30 160-16 60 18 80 10V80H0z" fill="#3c4377"/><path d="M0 64C80 44 150 58 220 62s120-14 180-6V80H0z" fill="#2c315c"/></svg>
          <div class="proc-row">${PROC.map(([id, en, th, ic]) => `<span class="proc ${id}" id="pr-${id}">${EC.icon(ic)}<b>${en}</b><small>${th.replace('ฉัน', '')}</small></span>`).join(EC.icon('arrow'))}</div>
        </section>
        <section class="panel star-pick"><h3>${EC.icon('star')} เลือกดาวแห่งการเรียนรู้</h3><small class="muted">เลือกข้อความที่สะท้อนสิ่งที่คุณได้เรียนรู้ในแต่ละกระบวนการ</small>
          ${PROC.map(([id, en, th, ic, items]) => `<details class="pgroup ${id}" open><summary>${EC.icon(ic)} <b>${en}</b> : ${th}</summary>
            ${items.map((t, i) => `<label class="sopt"><input type="checkbox" data-p="${id}" data-i="${i}"><span class="sbox"></span><span>${t}</span></label>`).join('')}</details>`).join('')}
          <button type="button" class="btn purple full" id="starSave">${EC.icon('star')} เติมดาวลงบนท้องฟ้า ${EC.icon('arrow')}</button>
        </section>
      </div>
      <div class="howto purple">${EC.icon('bulb')}<b>วิธีทำกิจกรรม</b><span>① เลือกดาวจาก 3 กระบวนการที่คุณได้เรียนรู้ ② ดาวจะลอยไปอยู่บนท้องฟ้าของคุณ ③ เมื่อครบ 3 กระบวนการ จะได้ “กลุ่มดาวแห่งการเรียนรู้ของฉัน”</span></div>`;
    return EC.weekShell(w, 'a1', html);
  };
  EC.mountStars = function () {
    const sky = EC.$('#sky'), mine = EC.$('#myStars'), cons = EC.$('#constel');
    const twk = EC.$('#twk');
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('i');
      s.style.left = EC.rand(0, 100) + '%'; s.style.top = EC.rand(0, 72) + '%';
      s.style.animationDelay = EC.rand(0, 4) + 's'; s.style.width = s.style.height = EC.rand(1, 3.2) + 'px';
      twk.appendChild(s);
    }
    const shoot = setInterval(() => {
      if (!document.body.contains(sky)) return clearInterval(shoot);
      if (EC.reduceMotion()) return;
      const m = document.createElement('span'); m.className = 'meteor';
      m.style.left = EC.rand(10, 70) + '%'; m.style.top = EC.rand(4, 30) + '%';
      sky.appendChild(m); setTimeout(() => m.remove(), 1400);
    }, 3800);

    const placed = new Map(); // key -> {el, pos, p}
    function count() { return new Set([...placed.values()].map(v => v.p)).size; }
    function refresh() {
      const n = count();
      EC.$('#skyCount').innerHTML = `${EC.icon('star')} ดาวที่เติมแล้ว : ${n} / 3`;
      EC.$('#skyEmpty').classList.toggle('hide', placed.size > 0);
      PROC.forEach(([id]) => EC.$('#pr-' + id).classList.toggle('lit', [...placed.values()].some(v => v.p === id)));
      // constellation lines in placement order
      const pts = [...placed.values()].map(v => v.pos);
      cons.innerHTML = pts.length > 1 ? `<polyline points="${pts.map(p => p.join(',')).join(' ')}" class="cline ${n === 3 ? 'full' : ''}"/>` : '';
      const msg = EC.$('#skyMsg');
      if (n === 3 && msg.hidden) {
        msg.hidden = false;
        const r = sky.getBoundingClientRect();
        EC.burst(r.left + r.width / 2, r.top + r.height * .4, { count: 30, colors: ['#ffe28a', '#fff', '#c9b6ef'], shapes: ['star'], dist: 200, gravity: 10, min: 8, max: 16, duration: 1600 });
      } else if (n < 3) msg.hidden = true;
    }
    function addStar(input, animate = true) {
      const p = input.dataset.p, i = +input.dataset.i, key = p + i;
      const pos = ZONES[p][i];
      const st = document.createElement('button');
      st.type = 'button'; st.className = 'mystar ' + p;
      st.style.left = pos[0] + '%'; st.style.top = pos[1] + '%';
      st.innerHTML = `<svg viewBox="0 0 60 60" width="100%" height="100%">${ST.star}</svg><span class="tip">${EC.esc(input.parentElement.textContent.trim())}</span>`;
      st.addEventListener('click', () => { input.checked = false; input.dispatchEvent(new Event('change')); });
      placed.set(key, { el: st, pos, p });
      if (animate && !EC.reduceMotion()) {
        const from = input.parentElement.getBoundingClientRect(), sr = sky.getBoundingClientRect();
        const fly = document.createElement('div'); fly.className = 'flystar';
        fly.innerHTML = `<svg viewBox="0 0 60 60" width="34" height="34">${ST.star}</svg>`;
        document.body.appendChild(fly);
        const ex = sr.left + sr.width * pos[0] / 100, ey = sr.top + sr.height * pos[1] / 100;
        fly.animate([
          { transform: `translate(${from.left}px, ${from.top + from.height / 2}px) scale(.6) rotate(0)` },
          { transform: `translate(${(from.left + ex) / 2}px, ${Math.min(from.top, ey) - 80}px) scale(1.3) rotate(200deg)`, offset: .5 },
          { transform: `translate(${ex - 17}px, ${ey - 17}px) scale(1) rotate(360deg)` }
        ], { duration: 800, easing: 'ease-in-out' }).onfinish = () => {
          fly.remove(); mine.appendChild(st); st.classList.add('pop');
          EC.burst(ex, ey, { count: 12, colors: ['#ffe28a', '#fff'], shapes: ['star', 'dot'], dist: 60, gravity: 0, min: 4, max: 9 });
          refresh();
        };
      } else { mine.appendChild(st); refresh(); }
    }
    EC.$$('.sopt input').forEach(inp => inp.addEventListener('change', () => {
      const key = inp.dataset.p + inp.dataset.i;
      if (inp.checked) addStar(inp);
      else if (placed.has(key)) { const s = placed.get(key).el; s.classList.add('fade'); setTimeout(() => s.remove(), 300); placed.delete(key); refresh(); }
    }));
    const prev = EC.store.find(8, 'a1')[0]?.data;
    if (prev?.keys) prev.keys.forEach(k => { const inp = EC.$(`.sopt input[data-p="${k.slice(0, 3)}"][data-i="${k.slice(3)}"]`); if (inp) { inp.checked = true; addStar(inp, false); } });
    EC.$('#starSave').addEventListener('click', () => {
      if (!placed.size) { EC.toast('เลือกดาวอย่างน้อย 1 ดวงก่อนนะคะ ⭐'); return; }
      const keys = [...placed.keys()];
      const items = keys.map(k => { const p = PROC.find(x => x[0] === k.slice(0, 3)); return `${p[1]}: ${p[4][+k.slice(3)]}`; });
      EC.store.upsert({ week: 8, kind: 'a1', title: 'เติมดาวให้ท้องฟ้าของฉัน', data: { keys, items } });
      const r = sky.getBoundingClientRect();
      EC.burst(r.left + r.width / 2, r.top + r.height / 2, { count: 26, colors: ['#ffe28a', '#fff', '#c9b6ef'], shapes: ['star'], dist: 180, gravity: 20, min: 8, max: 16 });
      EC.toast('เติมดาวลงบนท้องฟ้าของคุณแล้ว ✓', 'ok');
    });
    refresh();
  };
})(window.EC);
