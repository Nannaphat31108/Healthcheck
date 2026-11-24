/* Activity 2 of every week — guided self-reflection (2 sessions per week) */
(function (EC) {
  const ev = (list) => ({ t: 'events', label: 'เลือกเหตุการณ์ในการสอน', hint: 'เลือกเหตุการณ์ที่เกิดขึ้นจริงในห้องเรียนของคุณ (เลือก 1 ข้อ)', list });
  const EV2 = [['เด็กร้องไห้เมื่อเปลี่ยนกิจกรรม', 'sad'], ['เด็กมีพฤติกรรมซ้ำ ๆ ต่อเนื่อง', 'confused'], ['เด็กไม่ตอบสนองต่อคำสั่ง', 'worried'], ['ต้องช่วยหลายคนพร้อมกัน', 'tired']];
  const EV1 = EC.EVENTS.map((e, i) => [`${e.t} ${e.d}`, ['stressed', 'angry', 'confused', 'worried'][i]]);

  EC.REFLECT = {
    1: {
      intro: 'สะท้อนประสบการณ์การสอนเด็กที่มีภาวะออทิซึมสเปกตรัม เพื่อสำรวจอารมณ์ ความคิด และการตอบสนองของตนเอง',
      goal: 'ทบทวนเหตุการณ์การสอนในสัปดาห์นี้ และสะท้อนอารมณ์ของตนเอง เพื่อให้รู้เท่าทันอารมณ์ (Monitoring)',
      sessions: [
        [ev(EV1), { t: 'faces', label: 'เลือกอารมณ์ที่เกิดขึ้น', hint: 'เลือกได้มากกว่า 1 ข้อ', ids: ['calm', 'content', 'determined', 'pressured', 'angry', 'stressed', 'worried', 'tired', 'sad'] },
          { t: 'qs', label: 'สะท้อนตนเอง', items: [['pencil', 'จากเหตุการณ์นี้ คุณสังเกตอะไรเกี่ยวกับอารมณ์ของตนเองบ้าง? (เขียนสั้น ๆ 3–5 ประโยค)']], max: 500 }],
        [ev(EV1), { t: 'chips', label: 'ฉันเริ่มรู้ตัวว่ามีอารมณ์เกิดขึ้นเมื่อใด', hint: 'เลือก 1 ข้อ', list: ['ก่อนตอบสนองต่อเด็ก', 'ระหว่างที่กำลังตอบสนอง', 'หลังจากเหตุการณ์ผ่านไปแล้ว', 'ยังไม่แน่ใจ'], multi: false },
          { t: 'qs', label: 'สะท้อนตนเอง', items: [['search', 'สัญญาณอะไร (ความคิด ความรู้สึก หรือร่างกาย) ที่ทำให้ฉันรู้ทันอารมณ์ของตนเอง?'], ['sprout', 'ครั้งต่อไป ฉันอยากรู้ทันอารมณ์ให้เร็วขึ้นได้อย่างไร?']], max: 500 }]
      ]
    },
    2: {
      intro: 'กิจกรรมนี้ช่วยให้ครูสังเกตสัญญาณทางกาย สัญญาณทางอารมณ์ และสิ่งกระตุ้นของตนเองที่เกิดขึ้นระหว่างการสอนเด็กที่มีภาวะออทิซึมสเปกตรัม (ASD)',
      sessions: [0, 1].map(() => [ev(EV2),
        { t: 'chips', label: 'สัญญาณที่ฉันสังเกตได้', hint: 'เลือกสัญญาณที่เกิดขึ้นกับตนเองในระหว่างเหตุการณ์นี้ (เลือกได้มากกว่า 1 ข้อ)', list: EC.SIGNALS2, multi: true },
        { t: 'qs', label: 'เขียนสะท้อนตนเอง', hint: 'ใช้เหตุการณ์ที่เลือกไว้ข้างต้น เขียนสะท้อนเพื่อทำความเข้าใจตนเอง และวางแนวทางในการตอบสนองเมื่อสอนเด็กในครั้งต่อไป', items: [['heart', 'ตอนนั้นฉันรู้สึกอะไร?'], ['search', 'สัญญาณอะไรที่ฉันสังเกตได้?'], ['bolt', 'อะไรเป็นสิ่งกระตุ้น?'], ['target', 'ครั้งหน้าฉันอยากตอบสนองอย่างไร?']], max: 500 }])
    },
    3: {
      intro: 'เขียนสะท้อนประสบการณ์การสอนเด็กออทิสติก โดยพิจารณา “สาเหตุหรือปัจจัย” ที่เกี่ยวข้องกับเหตุการณ์นั้นก่อนการตอบสนอง เพื่อทำความเข้าใจเหตุการณ์อย่างรอบด้าน',
      sessions: [
        [{ t: 'qs', label: 'สิ่งที่เห็นกับสิ่งที่คิด', hint: 'แยกข้อเท็จจริงที่สังเกตเห็นออกจากการตีความของตนเอง', items: [['clipboard', 'วันนี้เกิดเหตุการณ์อะไรขึ้นในการสอนเด็กออทิสติก?'], ['eye', 'สิ่งที่ฉันเห็นหรือได้ยินจริง ๆ (ข้อเท็จจริง) คืออะไร?'], ['chat', 'สิ่งที่ฉันคิดหรือตีความในขณะนั้นคืออะไร?'], ['scale', 'เมื่อแยกสองสิ่งนี้ออกจากกัน ฉันมองเหตุการณ์ต่างไปอย่างไร?']], max: 500 }],
        [{ t: 'qs', label: 'คำถามชี้นำในการสะท้อนตนเอง', items: [['clipboard', 'วันนี้เกิดเหตุการณ์อะไรขึ้นในการสอนเด็กออทิสติก?'], ['heart', 'ฉันรู้สึกอย่างไรในตอนนั้น?'], ['gear', 'อะไรอาจเป็นสาเหตุหรือปัจจัยที่เกี่ยวข้องกับเหตุการณ์นี้? (เช่น ความต้องการของเด็ก สภาพแวดล้อม ลักษณะกิจกรรม หรือการสื่อสาร)'], ['sprout', 'จากการพิจารณาเหตุการณ์ครั้งนี้ ฉันได้เรียนรู้อะไร และหากเกิดเหตุการณ์คล้ายกันอีก ฉันจะปรับการตอบสนองอย่างไร?']], max: 500 }]
      ]
    },
    4: {
      intro: 'ทบทวนเหตุการณ์การสอนจริง โดยมองทั้งมุมมองของตนเองและข้อมูลเกี่ยวกับเด็ก',
      sessions: [0, 1].map(() => [{ t: 'journal', label: 'บันทึกสะท้อนตนเอง', guide: ['ในเหตุการณ์การสอนที่ฉันเลือก ขณะนั้นฉันมีอารมณ์และความรู้สึกอย่างไร?', 'จากสิ่งที่สังเกตเห็น เด็กอาจกำลังเผชิญความยากลำบากหรือมีความต้องการด้านใดที่เกี่ยวข้องกับการทำกิจกรรมนั้น?'], ph: 'เริ่มเขียนจากเหตุการณ์ที่เกิดขึ้นจริงระหว่างการสอน...', max: 1000 }])
    },
    5: {
      intro: 'ครูสะท้อนเหตุการณ์จริงในการสอนเด็กที่มีภาวะออทิซึม เพื่อเข้าใจความรู้สึกของตนเอง และมองหาความต้องการที่เป็นไปได้ของเด็ก',
      goal: 'ช่วยให้ครูกลับมาทบทวนเหตุการณ์ ทำความเข้าใจทั้งตนเองและเด็กที่มีภาวะออทิซึม และคิดหาวิธีการตอบสนองให้เหมาะสมก่อนลงมือทำ',
      sessions: [0, 1].map(() => [
        { t: 'chips', label: 'เหตุการณ์ที่เลือก', hint: 'เลือกเหตุการณ์จริงในการสอนเด็กที่มีภาวะออทิซึมที่อยากสะท้อน (เลือก 1 เหตุการณ์)', list: ['เด็กไม่ยอมเริ่มกิจกรรม', 'เด็กเปลี่ยนกิจกรรมยาก', 'เด็กตอบสนองต่อเสียงดัง', 'เด็กมีพฤติกรรมซ้ำ'], multi: false },
        { t: 'journal', label: 'บันทึกสะท้อนตนเอง', guide: ['ในเหตุการณ์นี้ ฉันรู้สึกอะไร และอะไรทำให้ฉันรู้สึกเช่นนั้น?', 'จากสิ่งที่สังเกต เด็กอาจกำลังต้องการอะไรหรือกำลังเผชิญความยากลำบากอะไร?', 'ถ้าได้ลองอีกครั้ง ฉันอยากปรับวิธีพูด วิธีสอน หรือสภาพแวดล้อมอย่างไร?'], ph: 'เขียนสะท้อนตามคำถามชี้นำ...', max: 1000 }])
    },
    6: {
      intro: 'หน้านี้ช่วยให้ครูได้สะท้อนว่า ในการสอนเด็กออทิสติก ครูได้หยุด สังเกตตนเอง และเลือกวิธีตอบสนองอย่างไร ในสถานการณ์ที่เกิดขึ้น',
      sessions: [
        [{ t: 'pair3', label: 'สถานการณ์ของฉัน', items: [['clipboard', 'สถานการณ์ที่เลือก', 'เช่น ครูแจ้งเปลี่ยนกิจกรรม แต่เด็กยังไม่เริ่มทำตาม สีหน้าตึงเครียด และหันหน้าหนี'], ['heart', 'อารมณ์ที่สังเกต', 'เช่น หงุดหงิด / ใจเต้นเร็ว / รู้สึกตึงที่ไหล่'], ['target', 'วิธีตอบสนองที่เลือก', 'เช่น ใช้น้ำเสียงสงบ ให้เวลารอ เข้าไปช่วยทีละขั้น']] },
          { t: 'qs', label: 'วิธีที่ฉันใช้อยู่แล้ว', tips: ['เขียนจากเหตุการณ์จริงในการสอน', 'เน้นสิ่งที่สังเกตได้จากตนเองและเด็ก', 'ไม่ต้องตอบยาว เน้นเห็นกระบวนการคิดของตนเอง'], items: [['pause', 'ในสถานการณ์นี้ ฉันหยุดตัวเองได้ตรงไหนก่อนตอบสนอง?'], ['search', 'ฉันสังเกตอารมณ์หรือสัญญาณทางกายอะไรของตนเอง?'], ['chat', 'ปกติฉันมักตอบสนองต่อเด็กในลักษณะใด เมื่อเกิดเหตุการณ์แบบนี้?'], ['user', 'วิธีที่ฉันใช้ครั้งนี้ส่งผลต่อเด็กอย่างไร?'], ['flag', 'สิ่งที่ฉันอยากคงไว้หรือปรับเล็กน้อยในการสอนครั้งต่อไปคืออะไร?']], max: 300 }],
        [{ t: 'chips', label: 'วิธีตอบสนองที่ฉันอยากลองใช้', hint: 'เลือกได้มากกว่า 1 ข้อ', list: ['ใช้น้ำเสียงสงบ', 'ให้เวลารอ', 'ใช้ภาพหรือสัญลักษณ์ช่วยสื่อสาร', 'แบ่งงานเป็นขั้นเล็ก ๆ', 'ลดสิ่งเร้าในห้อง', 'บอกล่วงหน้าก่อนเปลี่ยนกิจกรรม'], multi: true },
          { t: 'qs', label: 'เลือกวิธีตอบสนองให้เหมาะกับเด็ก', items: [['clipboard', 'สถานการณ์ที่ฉันนึกถึงคืออะไร?'], ['target', 'ฉันเลือกวิธีตอบสนองแบบใด และเพราะอะไรจึงเหมาะกับเด็กคนนี้?'], ['user', 'ฉันคาดว่าวิธีนี้จะส่งผลต่อเด็กอย่างไร?'], ['heart', 'ระหว่างนั้น ฉันจะดูแลอารมณ์ของตนเองอย่างไร?']], max: 300 }]
      ]
    },
    7: {
      intro: 'เขียนสะท้อนตนเองจากเหตุการณ์จริงในการสอน เพื่อทบทวนความคิด ความรู้สึก การตอบสนอง และแนวทางครั้งต่อไป',
      note: 'เป็นการสะท้อนจากเหตุการณ์ในห้องเรียน ขณะสอนเด็กออทิสติกเท่านั้น',
      sessions: [0, 1].map(s => [{ t: 'grid', label: s ? 'ถ้าเหตุการณ์คล้ายเดิมเกิดขึ้นอีก' : 'เหตุการณ์ที่ทำให้ฉันได้เรียนรู้', items: [
        ['people', 'เหตุการณ์ที่ฉันเลือก', 'เล่าเหตุการณ์การสอนที่เกิดขึ้นกับเด็กออทิสติก (สั้น ๆ)'], ['heart', 'ขณะนั้นฉันรู้สึกอย่างไร', 'บอกความรู้สึกของคุณในขณะเกิดเหตุการณ์'],
        ['bolt', 'สิ่งใดกระตุ้นอารมณ์ของฉัน', 'ระบุปัจจัย/สิ่งที่ทำให้เกิดความรู้สึกดังกล่าว'], ['gear', 'ฉันตอบสนองอย่างไรต่อเด็ก/สถานการณ์', 'อธิบายสิ่งที่คุณได้ทำหรือพูดในขณะนั้น'],
        ['bulb', 'ฉันเข้าใจตนเองและเด็กมากขึ้นอย่างไร', 'สิ่งที่ได้เรียนรู้เกี่ยวกับตนเอง และการเข้าใจเด็กออทิสติก'], ['sprout', 'ครั้งหน้าฉันอยากลองทำอะไรต่างไป', 'แนวทางหรือวิธีการที่อยากปรับ หรือทดลองใช้ในการสอนครั้งต่อไป']], max: 500 }])
    },
    8: {
      intro: 'บันทึกสะท้อนครั้งสุดท้าย สรุปภาพรวมการเรียนรู้ตลอด 8 สัปดาห์ ในบริบทการสอนเด็กที่มีภาวะออทิซึมสเปกตรัม',
      final: true,
      sessions: [0, 1].map(() => [
        { t: 'qs', label: 'สรุปเส้นทางการเรียนรู้ตลอด 8 สัปดาห์', items: [['heart', 'ฉันได้เรียนรู้อะไรเกี่ยวกับอารมณ์ของตนเอง โดยเฉพาะในสถานการณ์การสอนเด็กที่มีภาวะออทิซึมสเปกตรัม'], ['clipboard', 'เมื่อมองย้อนกลับ ฉันเข้าใจเหตุการณ์และความรู้สึกของตนเองมากขึ้นอย่างไร']], max: 1000 },
        { t: 'chips', label: 'ฉันได้ปรับวิธีตอบสนองต่อเด็กอย่างไร', list: ['หยุดก่อนตอบ', 'เลือกคำพูดใหม่', 'ปรับกิจกรรม', 'ขอเวลาพักสั้น ๆ'], multi: true, text: 'พิมพ์ตัวอย่างหรือสิ่งที่ได้ปรับเปลี่ยน...' },
        { t: 'pair', label: 'สิ่งที่ฉันเห็นการเปลี่ยนแปลงในตัวเองและต่อเด็ก', a: ['user', 'ตัวฉัน', 'เช่น ความสงบ ความมั่นใจ วิธีคิด ฯลฯ'], b: ['people', 'เด็ก/บรรยากาศในห้องเรียน', 'เช่น การตอบสนองของเด็ก ความร่วมมือ บรรยากาศที่ผ่อนคลายขึ้น ฯลฯ'] },
        { t: 'qs', label: 'ก้าวต่อไปของฉัน', items: [['layers', 'ทักษะที่ฉันอยากเก็บไว้ใช้ต่อ'], ['heart', 'ข้อความถึงตัวเองหลังจบโปรแกรม (ส่งกำลังใจ ขอบคุณความพยายาม และตั้งใจดูแลอารมณ์ของตนเองต่อไป)']], max: 1000 }])
    }
  };

  /* ---------- rendering ---------- */
  function part(p, i) {
    const head = `<h3 class="part-h"><span class="num">${i + 1}</span>${p.label}</h3>${p.hint ? `<p class="hint">${p.hint}</p>` : ''}`;
    switch (p.t) {
      case 'events':
        return `<section class="rpart" data-t="choice" data-i="${i}">${head}<div class="ev-grid">${p.list.map(([t, f]) => `
          <button type="button" class="ev-card" aria-pressed="false" data-v="${EC.esc(t)}"><span class="radio"></span><span class="ev-face">${EC.face(f, 46)}</span><span><b>${t}</b></span></button>`).join('')}</div></section>`;
      case 'faces':
        return `<section class="rpart" data-t="multi" data-i="${i}">${head}<div class="face-grid">${p.ids.map(id => `
          <button type="button" class="face-opt" aria-pressed="false" data-v="${EC.EMO[id]}"><span class="sq"></span>${EC.face(id, 44)}<b>${EC.EMO[id]}</b></button>`).join('')}</div></section>`;
      case 'chips':
        return `<section class="rpart" data-t="${p.multi ? 'multi' : 'choice'}" data-i="${i}">${head}<div class="tchips big">${p.list.map(t => `<button type="button" class="tchip" aria-pressed="false" data-v="${EC.esc(t)}">${t}</button>`).join('')}</div>
          ${p.text ? `<textarea class="ta mt" rows="2" maxlength="1000" data-extra placeholder="${p.text}"></textarea>` : ''}</section>`;
      case 'qs':
        return `<section class="rpart" data-t="texts" data-i="${i}">${head}<div class="${p.tips ? 'qs-with-tips' : ''}"><div class="qs">${p.items.map(([ic, q], k) => `
          <label class="q"><span class="q-ic">${EC.icon(ic)}</span><span class="q-t"><b>${q}</b>
          <textarea rows="2" maxlength="${p.max}" placeholder="พิมพ์คำตอบของคุณที่นี่..."></textarea><small class="cnt">0 / ${p.max}</small></span></label>`).join('')}</div>
          ${p.tips ? `<aside class="tips">${EC.icon('bulb')}<b>แนวทางเขียนสั้น ๆ</b><ul>${p.tips.map(t => `<li>${t}</li>`).join('')}</ul></aside>` : ''}</div></section>`;
      case 'grid':
        return `<section class="rpart" data-t="texts" data-i="${i}">${head}<div class="qgrid">${p.items.map(([ic, q, d], k) => `
          <label class="gq"><span class="q-ic c${k % 3}">${EC.icon(ic)}</span><span class="q-t"><b>${k + 1}. ${q}</b><small>${d}</small></span>
          <textarea rows="3" maxlength="${p.max}" placeholder="พิมพ์การสะท้อนของคุณที่นี่..."></textarea></label>`).join('')}</div></section>`;
      case 'journal':
        return `<section class="rpart journal" data-t="texts" data-i="${i}"><div class="j-guide"><h3>${EC.icon('chat')} คำถามชี้นำ</h3><ol>${p.guide.map(g => `<li>${g}</li>`).join('')}</ol></div>
          <div class="j-write"><h3>${EC.icon('pencil')} ${p.label}</h3><textarea class="lined" rows="9" maxlength="${p.max}" placeholder="${p.ph}"></textarea><small class="cnt">0 / ${p.max.toLocaleString()} ตัวอักษร</small></div></section>`;
      case 'pair':
        return `<section class="rpart" data-t="texts" data-i="${i}">${head}<div class="pair">${[p.a, p.b].map(([ic, t, ph]) => `
          <label class="pair-box">${EC.icon(ic)}<b>${t}</b><textarea rows="3" maxlength="500" placeholder="${ph}"></textarea></label>`).join('')}</div></section>`;
      case 'pair3':
        return `<section class="rpart" data-t="texts" data-i="${i}">${head}<div class="pair three">${p.items.map(([ic, t, ph]) => `
          <label class="pair-box">${EC.icon(ic)}<b>${t}</b><textarea rows="3" maxlength="300" placeholder="${ph}"></textarea></label>`).join('')}</div></section>`;
    }
    return '';
  }

  EC.renderReflect = function (w, sess = 1) {
    const cfg = EC.REFLECT[w.n];
    const saved = [1, 2].map(s => EC.store.find(w.n, 'a2').some(e => e.session === s));
    const tabs = `<div class="sess-tabs" role="tablist">${w.sessions.map((t, i) => `
      <a role="tab" href="#/week/${w.n}/a2/${i + 1}" class="${sess === i + 1 ? 'on' : ''}" aria-selected="${sess === i + 1}">ครั้งที่ ${i + 1} : ${t} ${saved[i] ? `<span class="ok">${EC.icon('tick')}</span>` : ''}</a>`).join('')}</div>`;
    const parts = cfg.sessions[sess - 1].map(part).join('');
    const html = `${EC.actHeader(w, 2, w.acts[1].title, cfg.intro, `<div class="ref-art">${EC.art.journal()}</div>`)}
      ${cfg.goal ? `<div class="goal-strip">${EC.icon('target')}<b>เป้าหมาย</b><span>${cfg.goal}</span></div>` : ''}
      ${cfg.note ? `<div class="goal-strip soft">${EC.icon('target')}<b>โปรดระลึก</b><span>${cfg.note}</span></div>` : ''}
      <div class="sess-bar">${EC.icon('calendar')}<b>บันทึกสะท้อนตนเอง 2 ครั้งต่อสัปดาห์</b>${tabs}</div>
      <form class="reflect" id="rf">${parts}
        ${cfg.final && sess === 2 ? `<section class="closing">${EC.art.stars()}<div><h3>สรุปการปิดโปรแกรม</h3><p>ฉันได้ทบทวนและสรุปการเรียนรู้ตลอด 8 สัปดาห์ และพร้อมนำสิ่งที่ได้ไปใช้ในการสอนต่อไป</p></div>
          <div class="close-checks"><label><input type="checkbox" required> ฉันเขียนสะท้อนครบแล้ว</label><label><input type="checkbox"> ฉันมองเห็นจุดแข็งของตนเอง</label><label><input type="checkbox"> ฉันมีแนวทางดูแลอารมณ์ต่อไป</label></div></section>` : ''}
        <div class="form-actions">
          <button type="button" class="btn ghost" id="rfClear">${EC.icon('refresh')} ล้างข้อความ</button>
          <button type="submit" class="btn brown">${EC.icon('save')} ${cfg.final && sess === 2 ? 'บันทึกและจบโปรแกรม' : 'บันทึกการสะท้อน'}</button>
          ${sess === 1 ? `<a class="btn ghost" href="#/week/${w.n}/a2/2">ไปต่อ : ครั้งที่ 2 ${EC.icon('arrow')}</a>` : `<a class="btn ghost" href="#/week/${w.n}/summary">สรุปสัปดาห์ ${EC.icon('arrow')}</a>`}
        </div>
      </form>`;
    return EC.weekShell(w, 'a2', html);
  };

  EC.mountReflect = function (w, sess = 1) {
    const form = EC.$('#rf');
    const cfg = EC.REFLECT[w.n];
    // selection behaviour
    form.addEventListener('click', e => {
      const b = e.target.closest('.ev-card, .face-opt, .tchip'); if (!b) return;
      const sec = b.closest('.rpart');
      if (sec.dataset.t === 'choice') EC.$$('[aria-pressed]', sec).forEach(x => x.setAttribute('aria-pressed', x === b));
      else b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
      if (b.getAttribute('aria-pressed') === 'true') { b.classList.remove('boing'); void b.offsetWidth; b.classList.add('boing'); }
    });
    form.addEventListener('input', e => {
      const t = e.target; if (t.tagName !== 'TEXTAREA') return;
      const c = t.parentElement.querySelector('.cnt');
      if (c) c.textContent = `${t.value.length.toLocaleString()} / ${(+t.maxLength).toLocaleString()}${t.classList.contains('lined') ? ' ตัวอักษร' : ''}`;
    });
    function collect() {
      return EC.$$('.rpart', form).map(sec => {
        const t = sec.dataset.t;
        if (t === 'texts') return EC.$$('textarea', sec).map(x => x.value.trim());
        const sel = EC.$$('[aria-pressed="true"]', sec).map(x => x.dataset.v);
        const extra = EC.$('[data-extra]', sec);
        return extra ? { sel, text: extra.value.trim() } : sel;
      });
    }
    function fill(vals) {
      EC.$$('.rpart', form).forEach((sec, i) => {
        const v = vals[i]; if (v == null) return;
        if (sec.dataset.t === 'texts') EC.$$('textarea', sec).forEach((x, k) => { x.value = v[k] || ''; x.dispatchEvent(new Event('input', { bubbles: true })); });
        else {
          const sel = Array.isArray(v) ? v : v.sel || [];
          EC.$$('[aria-pressed]', sec).forEach(x => x.setAttribute('aria-pressed', sel.includes(x.dataset.v)));
          if (!Array.isArray(v) && EC.$('[data-extra]', sec)) EC.$('[data-extra]', sec).value = v.text || '';
        }
      });
    }
    const prev = EC.store.find(w.n, 'a2').find(e => e.session === sess);
    if (prev) fill(prev.data.parts);
    EC.$('#rfClear').addEventListener('click', () => { EC.$$('textarea', form).forEach(t => { t.value = ''; t.dispatchEvent(new Event('input', { bubbles: true })); }); EC.$$('[aria-pressed="true"]', form).forEach(x => x.setAttribute('aria-pressed', 'false')); });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const parts = collect();
      const any = parts.some(p => Array.isArray(p) ? p.some(Boolean) : (p.sel.length || p.text));
      if (!any) { EC.toast('ลองเขียนหรือเลือกคำตอบอย่างน้อย 1 ข้อนะคะ ✍️'); return; }
      const labels = cfg.sessions[sess - 1].map(p => p.label);
      const questions = cfg.sessions[sess - 1].map(p => p.items ? p.items.map(x => x[1]) : p.guide ? ['บันทึก'] : p.a ? [p.a[1], p.b[1]] : null);
      EC.store.upsert({ week: w.n, kind: 'a2', session: sess, title: `${w.acts[1].title} · ครั้งที่ ${sess}`, data: { parts, labels, questions } });
      EC.$$('.sess-tabs a')[sess - 1].insertAdjacentHTML('beforeend', EC.$('.ok', EC.$$('.sess-tabs a')[sess - 1]) ? '' : `<span class="ok">${EC.icon('tick')}</span>`);
      if (cfg.final && sess === 2) { EC.celebrate(); return; }
      const r = form.getBoundingClientRect();
      EC.burst(r.left + r.width / 2, Math.min(window.innerHeight - 80, r.bottom - 40), { count: 18, shapes: ['heart', 'star'], up: true, dist: 120 });
      EC.toast('บันทึกการสะท้อนแล้ว ✓', 'ok');
    });
  };

  EC.celebrate = function () {
    const ov = document.createElement('div');
    ov.className = 'celebrate';
    ov.innerHTML = `<div class="cel-card">${EC.art.stars()}<h2>จบโปรแกรม 8 สัปดาห์แล้ว 🌙</h2>
      <p>ขอบคุณที่ดูแลอารมณ์ของตนเองอย่างตั้งใจตลอดการเดินทางนี้<br>ทุกการหยุด สังเกต และเลือก คือของขวัญทั้งสำหรับคุณและเด็ก ๆ</p>
      <a class="btn purple" href="#/journal">ดูบันทึกของฉัน ${EC.icon('arrow')}</a> <button type="button" class="btn ghost" id="celClose">ปิด</button></div>`;
    document.body.appendChild(ov);
    const close = () => ov.remove();
    EC.$('#celClose', ov).addEventListener('click', close);
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    EC.$('a', ov).addEventListener('click', close);
    for (let i = 0; i < 4; i++) setTimeout(() => EC.burst(EC.rand(100, innerWidth - 100), EC.rand(100, innerHeight / 2), { count: 26, shapes: ['star', 'heart'], dist: 180, min: 8, max: 16, duration: 1500 }), i * 350);
  };
})(window.EC);
