/* คลังความรู้ & เครื่องมือ — knowledge articles + short self-care tools */
(function (EC) {
  const KNOW = [
    { ic: 'heart', t: 'อารมณ์ของครูสำคัญอย่างไร', tag: 'พื้นฐาน', body: `
      <p>การสอนเด็กที่มีภาวะออทิซึมสเปกตรัมต้องใช้ทั้งความรู้ ความอดทน และพลังทางอารมณ์สูง ครูต้องรับมือกับพฤติกรรมที่คาดเดาได้ยาก การสื่อสารที่ไม่เป็นไปตามคาด และความคาดหวังจากหลายฝ่าย</p>
      <p>อารมณ์ของครูส่งผลต่อบรรยากาศในห้องเรียน เด็กหลายคนไวต่อน้ำเสียง สีหน้า และท่าทางของผู้ใหญ่ เมื่อครูสงบ เด็กมักสงบตามได้ง่ายขึ้น</p>
      <ul><li>อารมณ์ไม่มี “ถูก” หรือ “ผิด” — ทุกความรู้สึกเป็นข้อมูลที่บอกว่าเรากำลังเผชิญอะไร</li><li>การกำกับอารมณ์ ไม่ใช่การเก็บกดหรือปฏิเสธอารมณ์ แต่คือการรู้ทัน เข้าใจ และเลือกตอบสนองอย่างเหมาะสม</li></ul>` },
    { ic: 'eye', t: 'Monitoring — รู้ทันอารมณ์ของตนเอง', tag: 'สัปดาห์ 1–2', body: `
      <p>ขั้นแรกของการกำกับอารมณ์ตามแนวคิดของ Thompson (1994) คือ <b>การติดตามและตระหนักรู้</b> ว่าตอนนี้เรากำลังรู้สึกอะไร</p>
      <ul><li><b>สัญญาณทางกาย:</b> ใจเต้นเร็ว มือเกร็ง หายใจถี่ ไหล่ตึง พูดเร็วขึ้น</li><li><b>สัญญาณทางความคิด:</b> คิดวนซ้ำ คิดไม่ออก ตัดสินเร็ว</li><li><b>สิ่งกระตุ้น:</b> ทั้งเรื่องที่ทำให้หนักใจ (เช่น ช่วงเปลี่ยนกิจกรรม เสียงดัง) และเรื่องที่ทำให้รู้สึกดี (เช่น เด็กทำได้สำเร็จ)</li></ul>
      <p class="tip">💡 ลองตั้ง “จุดเช็กอิน” วันละ 2–3 ครั้ง เช่น ก่อนเข้าห้อง หลังพักกลางวัน และก่อนกลับบ้าน ถามตัวเองว่า “ตอนนี้ฉันรู้สึกอะไร ร่างกายบอกอะไร”</p>` },
    { ic: 'scale', t: 'Evaluating — เข้าใจเหตุการณ์ก่อนตอบสนอง', tag: 'สัปดาห์ 3–5', body: `
      <p>ขั้นที่สองคือ <b>การประเมินอารมณ์และสถานการณ์</b> แยก “สิ่งที่เห็นจริง” ออกจาก “สิ่งที่เราคิดหรือตีความ”</p>
      <ul><li><b>สิ่งที่เห็น:</b> “เด็กปิดหูและนั่งลงกับพื้นเมื่อเสียงกริ่งดัง”</li><li><b>สิ่งที่คิด:</b> “เด็กดื้อ ไม่อยากทำกิจกรรม” — ซึ่งอาจไม่ใช่ความจริง</li><li><b>มองอีกมุม:</b> เด็กอาจไวต่อเสียง อาจยังไม่พร้อมเปลี่ยนกิจกรรม หรือกำลังสื่อสารว่าต้องการความช่วยเหลือ</li></ul>
      <p class="tip">💡 พฤติกรรมของเด็กออทิสติกมักเป็น “การสื่อสาร” — ลองถามว่า “เด็กกำลังบอกอะไรเรา?” ก่อนตัดสิน</p>` },
    { ic: 'gear', t: 'Modifying — เลือกตอบสนองอย่างเหมาะสม', tag: 'สัปดาห์ 5–8', body: `
      <p>ขั้นที่สามคือ <b>การปรับเปลี่ยนการตอบสนอง</b> ให้เหมาะกับสถานการณ์ ความปลอดภัย และความต้องการของเด็ก</p>
      <ul><li><b>หยุด:</b> เว้นจังหวะ 1 ลมหายใจก่อนพูดหรือทำ</li><li><b>สังเกต:</b> ฉันรู้สึกอะไร เด็กต้องการอะไร</li><li><b>เลือก:</b> ใช้น้ำเสียงสงบ ให้เวลารอ ใช้ภาพช่วยสื่อสาร แบ่งงานเป็นขั้นเล็ก ๆ ลดสิ่งเร้า หรือบอกล่วงหน้าก่อนเปลี่ยนกิจกรรม</li></ul>` },
    { ic: 'sprout', t: 'สติกับการสอน (Mindfulness)', tag: 'Bishop et al., 2004', body: `
      <p>สติประกอบด้วย 2 องค์ประกอบ</p>
      <ul><li><b>Self-regulation of attention</b> — การกำกับความใส่ใจไว้กับปัจจุบัน เช่น รับรู้ลมหายใจ รับรู้ความรู้สึกในร่างกาย</li><li><b>Orientation to experience</b> — การเปิดรับประสบการณ์ด้วยความอยากรู้ ใจกว้าง และยอมรับ โดยไม่รีบตัดสิน</li></ul>
      <p class="tip">💡 ฝึกสั้น ๆ ได้ทุกวัน เช่น หายใจอย่างรู้ตัว 3 ครั้งก่อนเริ่มคาบเรียน</p>` },
    { ic: 'pencil', t: 'การสะท้อนตนเอง (Self-reflection)', tag: 'Grant et al., 2002', body: `
      <p>การสะท้อนตนเองคือการทบทวนความคิด ความรู้สึก และการกระทำของตนเองอย่างเป็นระบบ เพื่อเข้าใจตนเองมากขึ้นและนำไปสู่การเปลี่ยนแปลง</p>
      <ul><li>เขียนจากเหตุการณ์จริง สั้น ๆ แต่สม่ำเสมอ</li><li>มองด้วยความเมตตาต่อตนเอง ไม่ตำหนิตัวเอง</li><li>จบด้วย “ครั้งหน้าฉันจะลอง…” เพื่อเปลี่ยนการเรียนรู้เป็นการลงมือ</li></ul>` },
    { ic: 'bolt', t: 'สัญญาณเตือนความเหนื่อยล้าสะสม', tag: 'ดูแลตนเอง', body: `
      <p>ความเครียดจากการทำงานที่สะสมนาน ๆ อาจนำไปสู่ภาวะหมดไฟ (burnout) ลองสังเกตสัญญาณเหล่านี้</p>
      <ul><li>เหนื่อยแม้ได้พักผ่อน นอนไม่หลับหรือหลับไม่สนิท</li><li>รู้สึกห่างเหิน เฉยชา หรือหงุดหงิดกับเด็กและเพื่อนร่วมงานง่ายขึ้น</li><li>รู้สึกว่าทำอะไรก็ไม่ดีพอ ขาดความภูมิใจในงาน</li></ul>
      <p class="tip">💛 หากสัญญาณเหล่านี้เกิดต่อเนื่องหลายสัปดาห์ ควรพูดคุยกับคนที่ไว้ใจ หัวหน้างาน หรือผู้เชี่ยวชาญด้านสุขภาพจิต (สายด่วนสุขภาพจิต 1323)</p>` }
  ];

  const KIND = [
    'ฉันทำดีที่สุดแล้วในวันนี้ และนั่นก็เพียงพอ',
    'การรู้สึกเหนื่อย ไม่ได้แปลว่าฉันเป็นครูที่ไม่ดี',
    'ทุกครั้งที่ฉันหยุดหายใจก่อนตอบ คือการดูแลทั้งตัวฉันและเด็ก',
    'ความก้าวหน้าเล็ก ๆ ของเด็ก มีส่วนหนึ่งมาจากความตั้งใจของฉัน',
    'ฉันอนุญาตให้ตัวเองพักได้ เพื่อกลับมาสอนอย่างมีพลัง',
    'วันนี้อาจไม่เป็นไปตามแผน แต่พรุ่งนี้คือโอกาสใหม่',
    'ฉันไม่จำเป็นต้องสมบูรณ์แบบ เพื่อเป็นครูที่ดีสำหรับเด็ก ๆ',
    'ความรู้สึกทุกอย่างของฉันมีความหมาย ฉันรับฟังมันได้'
  ];

  const GROUND = [
    ['eye', 5, 'สิ่งที่มองเห็น', 'มองรอบตัว แล้วบอกชื่อสิ่งที่เห็น 5 อย่าง'],
    ['user', 4, 'สิ่งที่สัมผัสได้', 'รับรู้สิ่งที่สัมผัสได้ 4 อย่าง เช่น เท้าที่แตะพื้น มือที่วางบนโต๊ะ'],
    ['chat', 3, 'เสียงที่ได้ยิน', 'ฟังเสียงรอบตัว 3 เสียง'],
    ['wind', 2, 'กลิ่นที่ได้กลิ่น', 'สังเกตกลิ่น 2 อย่าง (หรือนึกถึงกลิ่นที่ชอบ)'],
    ['heart', 1, 'สิ่งที่รับรู้ได้ในใจ', 'บอกตัวเอง 1 ประโยคที่อ่อนโยน เช่น “ฉันปลอดภัย ฉันค่อย ๆ ไปได้”']
  ];

  const RELAX = [
    ['มือ', 'กำมือทั้งสองข้างแน่น ๆ', 'คลายมือออกช้า ๆ รับรู้ความผ่อนคลาย'],
    ['ไหล่', 'ยกไหล่ขึ้นใกล้หู ค้างไว้', 'ปล่อยไหล่ลงสบาย ๆ'],
    ['ใบหน้า', 'ขมวดคิ้ว หลับตาแน่น', 'คลายใบหน้า ยิ้มเล็กน้อย'],
    ['หน้าท้อง', 'เกร็งหน้าท้องเล็กน้อย', 'ปล่อยคลาย หายใจลึกลงท้อง']
  ];

  const THERMO = [
    [0, 2, '#9cc98a', 'สงบ ผ่อนคลาย', 'เยี่ยมมาก ลองสังเกตว่าอะไรช่วยให้คุณสงบได้ แล้วเก็บไว้ใช้ต่อ'],
    [3, 4, '#c9d96b', 'ตึงเล็กน้อย', 'ลองหายใจลึก ๆ 3 ครั้ง และยืดไหล่สักครู่'],
    [5, 6, '#f2c85b', 'เริ่มเครียด', 'หยุดสักครู่ ใช้ “พักหายใจ 1 นาที” หรือดื่มน้ำ ก่อนกลับไปทำงานต่อ'],
    [7, 8, '#f39a5d', 'เครียดมาก', 'ถ้าทำได้ ขอให้เพื่อนครูช่วยดูแลเด็กสักครู่ แล้วใช้ “5-4-3-2-1” เพื่อดึงใจกลับมาปัจจุบัน'],
    [9, 10, '#e0605a', 'ล้นมาก', 'ความปลอดภัยมาก่อน ขอความช่วยเหลือทันที ไม่ต้องจัดการคนเดียว แล้วค่อยทบทวนเมื่อสงบลง']
  ];

  EC.renderLibrary = function () {
    return `<div class="library">
      <h1 class="page-title">คลังความรู้ &amp; เครื่องมือ</h1>
      <p class="page-sub">ความรู้ประกอบโปรแกรม และเครื่องมือสั้น ๆ สำหรับดูแลอารมณ์ระหว่างวัน — ใช้ได้ทุกเมื่อ ไม่ต้องรอปลดล็อก</p>
      <div class="lib-tabs" role="tablist"><button type="button" class="on" data-tab="know">${EC.icon('book')} องค์ความรู้</button><button type="button" data-tab="tools">${EC.icon('sparkle')} เครื่องมือดูแลอารมณ์</button></div>

      <section class="lib-pane" data-pane="know">
        <div class="know-list">${KNOW.map((k, i) => `<details class="know" ${i === 0 ? 'open' : ''}><summary><span class="k-ic">${EC.icon(k.ic)}</span><span><b>${k.t}</b><small>${k.tag}</small></span></summary><div class="k-body">${k.body}</div></details>`).join('')}</div>
        <section class="panel mt stop-card"><h2>หยุด – สังเกต – เลือก</h2>
          <div class="flow-strip big"><span class="fs s1">${EC.icon('pause')} <b>หยุด</b><small>เว้นจังหวะ 1 ลมหายใจก่อนตอบสนอง</small></span>${EC.icon('arrow')}
          <span class="fs s2">${EC.icon('eye')} <b>สังเกต</b><small>ตอนนี้ฉันรู้สึกอะไร ร่างกายบอกอะไร เด็กกำลังสื่อสารอะไร</small></span>${EC.icon('arrow')}
          <span class="fs s3">${EC.icon('tick')} <b>เลือก</b><small>วิธีที่ปลอดภัย เหมาะกับเด็ก และตรงกับเป้าหมายการสอน</small></span></div></section>
      </section>

      <section class="lib-pane" data-pane="tools" hidden>
        <div class="tool-grid">
          <section class="panel tool breathe-box">
            <div><h2>${EC.icon('breath')} พักหายใจ 1 นาที</h2><p>หายใจเข้า 4 วินาที · กลั้น 4 วินาที · หายใจออก 6 วินาที (4 รอบ) ใช้เมื่อรู้สึกว่าอารมณ์กำลังพุ่งขึ้น</p>
              <button type="button" class="btn green" id="brBtn">${EC.icon('play')} เริ่ม</button></div>
            <div class="breathe"><div class="br-circle" id="brC"><span id="brT">พร้อม</span></div></div>
          </section>

          <section class="panel tool">
            <h2>${EC.icon('target')} 5-4-3-2-1 ดึงใจกลับมาปัจจุบัน</h2>
            <p>ใช้ประสาทสัมผัสพาใจกลับมาที่ “ตอนนี้” เมื่อรู้สึกว้าวุ่นหรือคิดวน</p>
            <div class="ground" id="gr">
              <div class="gr-num" id="grNum">5</div>
              <div><b id="grTitle">${GROUND[0][2]}</b><p id="grText">${GROUND[0][3]}</p></div>
            </div>
            <div class="gr-dots">${GROUND.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
            <div class="row-end"><button type="button" class="btn ghost sm" id="grReset">${EC.icon('refresh')} เริ่มใหม่</button><button type="button" class="btn brown sm" id="grNext">ทำแล้ว ถัดไป ${EC.icon('arrow')}</button></div>
          </section>

          <section class="panel tool">
            <h2>${EC.icon('user')} คลายกล้ามเนื้อ 2 นาที</h2>
            <p>เกร็ง 5 วินาที แล้วคลาย 10 วินาที ทีละส่วนของร่างกาย ช่วยปล่อยความตึงที่สะสม</p>
            <div class="relax"><div class="rx-ring" id="rxRing"><b id="rxPart">พร้อม</b><span id="rxCue">กดเริ่มเมื่อพร้อม</span><em id="rxSec"></em></div></div>
            <div class="row-end"><button type="button" class="btn green sm" id="rxBtn">${EC.icon('play')} เริ่ม</button></div>
          </section>

          <section class="panel tool">
            <h2>${EC.icon('chart')} เทอร์โมมิเตอร์อารมณ์</h2>
            <p>ตอนนี้ความตึงเครียดของคุณอยู่ระดับไหน? (0 = สงบมาก, 10 = ล้นมาก)</p>
            <div class="thermo"><input type="range" min="0" max="10" value="3" id="thR" aria-label="ระดับความตึงเครียด"><output id="thV">3</output></div>
            <div class="th-card" id="thCard"></div>
          </section>

          <section class="panel tool">
            <h2>${EC.icon('heart')} การ์ดให้กำลังใจตัวเอง</h2>
            <p>แตะการ์ดเพื่อสุ่มข้อความดี ๆ สำหรับตัวคุณเองวันนี้</p>
            <button type="button" class="kind-card" id="kCard"><span class="kc-front">${EC.icon('sparkle')}<b>แตะเพื่อเปิดการ์ด</b></span><span class="kc-back" id="kText"></span></button>
          </section>
        </div>
      </section>
    </div>`;
  };

  EC.mountLibrary = function () {
    EC.$$('.lib-tabs button').forEach(b => b.addEventListener('click', () => {
      EC.$$('.lib-tabs button').forEach(x => x.classList.toggle('on', x === b));
      EC.$$('.lib-pane').forEach(p => p.hidden = p.dataset.pane !== b.dataset.tab);
    }));
    const alive = (el) => document.body.contains(el);

    // breathing
    const c = EC.$('#brC'), t = EC.$('#brT'), btn = EC.$('#brBtn');
    let timer = null;
    const steps = [['หายใจเข้า', 4000, 'in'], ['กลั้นไว้', 4000, 'hold'], ['หายใจออก', 6000, 'out']];
    function stop() { clearTimeout(timer); timer = null; c.className = 'br-circle'; t.textContent = 'พร้อม'; btn.innerHTML = `${EC.icon('play')} เริ่ม`; }
    btn.addEventListener('click', () => {
      if (timer) return stop();
      let i = 0, rounds = 0;
      btn.innerHTML = `${EC.icon('pause')} หยุด`;
      const next = () => {
        if (!alive(c)) return;
        const [label, ms, cls] = steps[i];
        c.className = 'br-circle ' + cls; c.style.transitionDuration = ms + 'ms'; t.textContent = label;
        i = (i + 1) % 3; if (!i) rounds++;
        timer = rounds >= 4 ? setTimeout(() => { stop(); t.textContent = 'เยี่ยมมาก 💛'; }, ms) : setTimeout(next, ms);
      };
      next();
    });

    // grounding 5-4-3-2-1
    let g = 0;
    const showG = () => {
      const [ic, n, title, text] = GROUND[g];
      EC.$('#grNum').textContent = n; EC.$('#grTitle').textContent = title; EC.$('#grText').textContent = text;
      EC.$$('.gr-dots i').forEach((d, k) => d.className = k < g ? 'done' : k === g ? 'on' : '');
      const box = EC.$('#gr'); box.classList.remove('flip'); void box.offsetWidth; box.classList.add('flip');
    };
    EC.$('#grNext').addEventListener('click', () => {
      if (g < GROUND.length - 1) { g++; showG(); return; }
      EC.$('#grNum').textContent = '✓'; EC.$('#grTitle').textContent = 'กลับมาอยู่กับปัจจุบันแล้ว';
      EC.$('#grText').textContent = 'สังเกตว่าตอนนี้ใจของคุณเปลี่ยนไปอย่างไรบ้าง 💛';
      EC.$$('.gr-dots i').forEach(d => d.className = 'done');
      const r = EC.$('#gr').getBoundingClientRect(); EC.burst(r.left + 40, r.top + 30, { count: 12, shapes: ['heart', 'star'], dist: 70 });
    });
    EC.$('#grReset').addEventListener('click', () => { g = 0; showG(); });

    // progressive muscle relaxation
    let rx = null;
    const rxBtn = EC.$('#rxBtn');
    function rxStop(msg) {
      clearInterval(rx); rx = null; rxBtn.innerHTML = `${EC.icon('play')} เริ่ม`;
      EC.$('#rxRing').className = 'rx-ring'; EC.$('#rxPart').textContent = msg || 'พร้อม'; EC.$('#rxCue').textContent = msg ? 'ร่างกายผ่อนคลายขึ้นแล้ว' : 'กดเริ่มเมื่อพร้อม'; EC.$('#rxSec').textContent = '';
    }
    rxBtn.addEventListener('click', () => {
      if (rx) return rxStop();
      rxBtn.innerHTML = `${EC.icon('pause')} หยุด`;
      const plan = RELAX.flatMap(([part, tense, rel]) => [[part, tense, 5, 'tense'], [part, rel, 10, 'relax']]);
      let k = 0, left = plan[0][2];
      const paint = () => { const [part, cue, , cls] = plan[k]; EC.$('#rxRing').className = 'rx-ring ' + cls; EC.$('#rxPart').textContent = (cls === 'tense' ? 'เกร็ง · ' : 'คลาย · ') + part; EC.$('#rxCue').textContent = cue; EC.$('#rxSec').textContent = left; };
      paint();
      rx = setInterval(() => {
        if (!alive(rxBtn)) return clearInterval(rx);
        left--;
        if (left <= 0) { k++; if (k >= plan.length) return rxStop('เยี่ยมมาก 💛'); left = plan[k][2]; }
        paint();
      }, 1000);
    });

    // thermometer
    const thR = EC.$('#thR');
    const showTh = () => {
      const v = +thR.value; EC.$('#thV').textContent = v;
      const row = THERMO.find(r => v >= r[0] && v <= r[1]);
      thR.style.setProperty('--c', row[2]);
      EC.$('#thCard').innerHTML = `<b style="color:${row[2]}">${row[3]}</b><p>${row[4]}</p>`;
      EC.$('#thCard').style.borderColor = row[2];
    };
    thR.addEventListener('input', showTh); showTh();

    // kindness card
    const kc = EC.$('#kCard');
    let last = -1;
    kc.addEventListener('click', () => {
      let n; do { n = Math.floor(Math.random() * KIND.length); } while (n === last && KIND.length > 1);
      last = n;
      kc.classList.remove('open'); void kc.offsetWidth;
      EC.$('#kText').textContent = '“' + KIND[n] + '”';
      kc.classList.add('open');
      const r = kc.getBoundingClientRect(); EC.burst(r.left + r.width / 2, r.top + r.height / 2, { count: 14, shapes: ['heart', 'star'], dist: 90 });
    });
  };
})(window.EC);
