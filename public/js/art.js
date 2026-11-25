/* Hand-drawn style SVG art: line icons, faces, illustrations, ingredients, flowers */
window.EC = window.EC || {};
(function (EC) {
  const INK = '#5a4032';

  /* ---------- line icons (24x24) ---------- */
  const P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
    book: '<path d="M3 6c3-1.5 6-1.5 9 .5 3-2 6-2 9-.5v13c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5z"/><path d="M12 6.5v13"/>',
    mortar: '<path d="M3.5 12h17c0 4-3.6 7-8.5 7s-8.5-3-8.5-7z"/><path d="M8 19l-1 2h10l-1-2"/><path d="M13 12l5.5-8a1.6 1.6 0 0 1 2.6 1.8L15.5 12"/>',
    pencil: '<path d="M4 20l1-4.5L16 4.5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M14 6.5l3 3"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
    tick: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="M13 11l7-7M17 4h3v3"/>',
    bulb: '<path d="M9 17h6M10 20.5h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.8.7-1 1.5-1 2.5h-5c0-1-.2-1.8-1-2.5z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
    sprout: '<path d="M12 21v-9"/><path d="M12 12c0-4-3-6.5-8-6.5 0 4.5 3 6.5 8 6.5z"/><path d="M12 10c0-3.5 2.5-6 7.5-6 0 4-2.5 6-7.5 6z"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.5-4.5 3.8-7 8-7s7.5 2.5 8 7"/>',
    flower: '<circle cx="12" cy="8" r="2"/><path d="M12 6c-1.5-3 1.5-4.5 2.5-2.5M14 8c3-1.5 4.5 1.5 2.5 2.5M12 10c1.5 3-1.5 4.5-2.5 2.5M10 8c-3 1.5-4.5-1.5-2.5-2.5"/><path d="M12 10.5V21M12 17c-2-2-4.5-2-6-1 1.5 2 4 2.5 6 1z"/>',
    bouquet: '<circle cx="8.5" cy="6.5" r="2.5"/><circle cx="15.5" cy="6.5" r="2.5"/><circle cx="12" cy="4" r="2"/><path d="M8.5 9 12 15l3.5-6M12 6v9"/><path d="M8 13.5h8l-2.5 7.5h-3z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 1.8-1.2 1.2-2.2-.7-1.2.1-2.6 1.5-2.6H17a3.5 3.5 0 0 0 3.5-3.5c0-4.8-3.8-8.7-8.5-8.7z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7.5" r="1.2"/><circle cx="14.5" cy="7.5" r="1.2"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="M8.5 11l2 2 4-4M8.5 17h7"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z"/>',
    chart: '<path d="M5 20V13M10 20V8M15 20V11M20 20V5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    pause: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7M14 8.5v7"/>',
    scale: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-2.5 6h5zM19 7l-2.5 6h5z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/><circle cx="12" cy="12" r="6.3"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
    chat: '<path d="M4 5.5h16v10H9l-5 4z"/><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01"/>',
    refresh: '<path d="M19.5 8A8 8 0 0 0 5 7M4.5 16A8 8 0 0 0 19 17"/><path d="M19.5 3.5V8H15M4.5 20.5V16H9"/>',
    arrow: '<path d="M4 12h15M14 6.5l5.5 5.5-5.5 5.5"/>',
    back: '<path d="M20 12H5M10 6.5 4.5 12l5.5 5.5"/>',
    save: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
    box: '<path d="M3.5 8 12 4l8.5 4v9L12 21l-8.5-4z"/><path d="M3.5 8 12 12l8.5-4M12 12v9"/>',
    people: '<circle cx="8.5" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M3 19c.5-3.5 2.6-5.5 5.5-5.5S13.5 15.5 14 19M14.5 14.2c3 0 5.5 1.5 6 4.8"/>',
    flag: '<path d="M5 21V4M5 4.5c5-2.5 8 2.5 14 0v8c-6 2.5-9-2.5-14 0"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    layers: '<path d="M12 3.5 21 8l-9 4.5L3 8z"/><path d="M3 12l9 4.5 9-4.5M3 16l9 4.5 9-4.5"/>',
    bolt: '<path d="M13.5 2.5 5 13.5h6l-1.5 8 9-11h-6z"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l5.5-3.5z"/>',
    trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15"/>',
    wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 11.5h7"/>',
    leaf: '<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z"/><path d="M5 19 14 10"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><circle cx="12" cy="15.5" r="1.3"/>',
    breath: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.5" stroke-dasharray="2 2.6"/><circle cx="12" cy="12" r="9.5"/>'
  };
  EC.icon = (name, cls = '') =>
    `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.sparkle}</svg>`;

  /* ---------- faces (emotion characters) ---------- */
  const FACE = {
    happy:    { eyes: 'arc', brows: 'none', mouth: 'open', extra: 'spark', tint: '#fff1c9' },
    worried:  { eyes: 'dot', brows: 'worry', mouth: 'wave', extra: 'q', tint: '#fbe1e6' },
    angry:    { eyes: 'dot', brows: 'angry', mouth: 'frown', extra: 'vein', tint: '#fde0d8' },
    stressed: { eyes: 'dot', brows: 'worry', mouth: 'flat', extra: 'drop', tint: '#e4eefb' },
    tired:    { eyes: 'line', brows: 'none', mouth: 'o', extra: 'zzz', tint: '#ece6f7' },
    confused: { eyes: 'dot', brows: 'raise', mouth: 'wave', extra: 'q2', tint: '#eaf2dc' },
    relieved: { eyes: 'arcdown', brows: 'none', mouth: 'smile', extra: 'breeze', tint: '#e1f1ee' },
    proud:    { eyes: 'arc', brows: 'none', mouth: 'grin', extra: 'star', tint: '#fff1c9' },
    calm:     { eyes: 'arcdown', brows: 'none', mouth: 'smile', extra: '', tint: '#fff4e4' },
    content:  { eyes: 'arc', brows: 'none', mouth: 'smile', extra: 'spark', tint: '#fff4e4' },
    determined:{ eyes: 'dot', brows: 'flat', mouth: 'smile', extra: 'spark', tint: '#fff4e4' },
    pressured:{ eyes: 'arcdown', brows: 'worry', mouth: 'flat', extra: 'drop', tint: '#fbe6dc' },
    sad:      { eyes: 'dot', brows: 'worry', mouth: 'frown', extra: 'lines', tint: '#f1e6f5' },
    hopeful:  { eyes: 'arc', brows: 'none', mouth: 'smile', extra: 'spark', tint: '#fff4e4' }
  };
  EC.face = function (mood, size = 56) {
    const f = FACE[mood] || FACE.calm;
    const s = `stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    let eyes = '';
    if (f.eyes === 'arc') eyes = `<path d="M20 31q3-4 6 0M34 31q3-4 6 0" ${s}/>`;
    else if (f.eyes === 'arcdown') eyes = `<path d="M20 30q3 3 6 0M34 30q3 3 6 0" ${s}/>`;
    else if (f.eyes === 'line') eyes = `<path d="M20 31h6M34 31h6" ${s}/>`;
    else eyes = `<circle cx="23" cy="31" r="2" fill="${INK}"/><circle cx="37" cy="31" r="2" fill="${INK}"/>`;
    let brows = '';
    if (f.brows === 'worry') brows = `<path d="M19 25l6-2M41 25l-6-2" ${s}/>`;
    else if (f.brows === 'angry') brows = `<path d="M19 23l7 3M41 23l-7 3" ${s}/>`;
    else if (f.brows === 'raise') brows = `<path d="M19 25q3-2 6 0M34 22q3-2 6 0" ${s}/>`;
    else if (f.brows === 'flat') brows = `<path d="M19 25.5l6-1M41 25.5l-6-1" ${s}/>`;
    let mouth = '';
    switch (f.mouth) {
      case 'open': mouth = `<path d="M24 38q6 7 12 0z" fill="#e4716a" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`; break;
      case 'grin': mouth = `<path d="M23 37q7 6 14 0" ${s}/><path d="M25 38.2h10" stroke="#fff" stroke-width="1.2"/>`; break;
      case 'smile': mouth = `<path d="M25 38q5 4 10 0" ${s}/>`; break;
      case 'wave': mouth = `<path d="M24 40q2-2 4 0t4 0 4 0" ${s}/>`; break;
      case 'frown': mouth = `<path d="M25 41q5-4 10 0" ${s}/>`; break;
      case 'flat': mouth = `<path d="M25.5 40h9" ${s}/>`; break;
      case 'o': mouth = `<ellipse cx="30" cy="40" rx="2.4" ry="2.8" ${s}/>`; break;
    }
    let extra = '';
    switch (f.extra) {
      case 'spark': extra = `<path d="M50 12l1.2 3 3 1.2-3 1.2L50 20.4l-1.2-3-3-1.2 3-1.2z" fill="#f4c64e"/>`; break;
      case 'star': extra = `<path d="M50 9l1.8 3.8 4 .5-3 2.8.8 4-3.6-2-3.6 2 .8-4-3-2.8 4-.5z" fill="#f4c64e"/>`; break;
      case 'q': extra = `<text x="47" y="18" font-size="11" font-family="Mali" fill="#8aa6d6">?</text>`; break;
      case 'q2': extra = `<text x="46" y="18" font-size="12" font-family="Mali" fill="#d18aa6">?</text><text x="52" y="13" font-size="8" font-family="Mali" fill="#8aa6d6">?</text>`; break;
      case 'vein': extra = `<path d="M48 10v4M46 12h4M53 15v3M51.5 16.5h3" stroke="#e05a4f" stroke-width="2" stroke-linecap="round"/>`; break;
      case 'drop': extra = `<path d="M50 11q3 4 0 6.5-3-2.5 0-6.5z" fill="#8ec1ea"/>`; break;
      case 'zzz': extra = `<text x="44" y="16" font-size="9" font-family="Mali" fill="#8aa6d6">z</text><text x="50" y="11" font-size="7" font-family="Mali" fill="#8aa6d6">z</text>`; break;
      case 'breeze': extra = `<path d="M46 14q4-2 6 0t5 0M47 18q3-1.5 5 0" stroke="#8ec1ea" stroke-width="1.6" fill="none" stroke-linecap="round"/>`; break;
      case 'lines': extra = `<path d="M48 9v7M51.5 9v7M55 9v7" stroke="#a9a1c7" stroke-width="1.6" stroke-linecap="round"/>`; break;
    }
    return `<svg class="face" width="${size}" height="${size}" viewBox="0 0 60 60" aria-hidden="true">
      <circle cx="30" cy="31" r="27" fill="${f.tint}"/>
      <path d="M9 30c0-13 9-20 21-20s21 7 21 20" fill="#9a6a4b"/>
      <circle cx="30" cy="9" r="6" fill="#9a6a4b"/>
      <ellipse cx="30" cy="34" rx="17" ry="16" fill="#ffe2cc" stroke="${INK}" stroke-width="2"/>
      <path d="M13.5 29c4-7 11-9 16.5-9 3 0 9 1 13 6-6-1-14-1-19.5-4-2 3-6 5.5-10 7z" fill="#9a6a4b" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <ellipse cx="19.5" cy="37" rx="3" ry="2" fill="#f7a9a0" opacity=".7"/>
      <ellipse cx="40.5" cy="37" rx="3" ry="2" fill="#f7a9a0" opacity=".7"/>
      ${brows}${eyes}${mouth}${extra}
    </svg>`;
  };

  /* ---------- somtam ingredients ---------- */
  EC.ingredient = function (kind, size = 46) {
    const stroke = `stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`;
    let g = '';
    switch (kind) {
      case 'lime':
        g = `<circle cx="30" cy="30" r="20" fill="#9ccc5a" ${stroke}/><circle cx="30" cy="30" r="15.5" fill="#e3f2b8"/>
             <path d="M30 15v30M15.5 30h29M19.7 19.7l20.6 20.6M40.3 19.7 19.7 40.3" stroke="#bcd97f" stroke-width="2"/>
             <circle cx="30" cy="30" r="2.5" fill="#fff"/>`; break;
      case 'bean':
        g = `<path d="M8 40c10-2 18-12 26-20s14-12 18-12" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
             <path d="M8 40c10-2 18-12 26-20s14-12 18-12" fill="none" stroke="#7fb24a" stroke-width="6" stroke-linecap="round"/>
             <path d="M14 37.5c3-1 5-3 6-4M26 27c2-2 4-4 5-5M38 16.5c2-2 4-3 5-3.5" stroke="#b6d97d" stroke-width="1.6" stroke-linecap="round"/>
             <path d="M46 44c6-4 9-8 10-13" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
             <path d="M46 44c6-4 9-8 10-13" fill="none" stroke="#8cbf55" stroke-width="4.5" stroke-linecap="round"/>`; break;
      case 'chili':
        g = `<path d="M18 16c-2 14 6 30 26 34 3 .6 4-2 2-3.5C34 40 30 30 28 18z" fill="#e5483d" ${stroke}/>
             <path d="M22 20c0 8 3 16 9 22" stroke="#ff8f80" stroke-width="2.2" fill="none" stroke-linecap="round"/>
             <path d="M16 17c2-4 9-4 12 1-3 2-9 2-12-1z" fill="#6aa84f" ${stroke}/>
             <path d="M22 15c0-4 2-7 5-9" fill="none" ${stroke}/>`; break;
      case 'garlic':
        g = `<path d="M30 10c-3 5-14 12-14 24 0 9 7 15 14 15s14-6 14-15c0-12-11-19-14-24z" fill="#fbf4e6" ${stroke}/>
             <path d="M30 14c-2 8-5 18-3 34M30 14c3 8 7 18 5 34" stroke="#e6d9c2" stroke-width="1.6" fill="none"/>
             <path d="M27 10c1-3 5-3 6 0" fill="#e8d8b8" ${stroke}/>`; break;
      case 'peanut':
        g = `<path d="M22 14c-8 0-10 9-6 14 2 3 1 5 0 8-3 7 2 14 10 14s12-6 10-12c-1-3-2-5 0-8 4-6 0-16-8-16-2 0-4 1-6 0z" fill="#e2b677" ${stroke} transform="rotate(25 30 30)"/>
             <path d="M25 22h.01M31 20h.01M24 36h.01M32 38h.01M28 29h.01" stroke="#b9864a" stroke-width="2.6" stroke-linecap="round" transform="rotate(25 30 30)"/>`; break;
      case 'shrimp':
        g = `<path d="M44 20c-4-8-18-10-25-2-6 7-4 18 4 22 5 3 11 1 13-3-5 1-10-1-11-6-1-6 5-10 11-8 4 1 6 4 8-3z" fill="#f59a5d" ${stroke}/>
             <path d="M24 22l3 4M21 29l4 2M24 36l3-2" stroke="#c8653a" stroke-width="1.8" stroke-linecap="round"/>
             <path d="M36 37l4 7 3-6" fill="#f59a5d" ${stroke}/><circle cx="41" cy="18.5" r="1.4" fill="${INK}"/>
             <path d="M45 16c4-4 8-5 11-4M45 19c4-1 8 0 10 2" stroke="${INK}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`; break;
      case 'tomato':
        g = `<path d="M30 14c12 0 21 6 21 17S41 50 30 50 9 42 9 31s9-17 21-17z" fill="#ef5a4c" ${stroke}/>
             <path d="M30 28V50M30 28c-8 4-14 10-17 15M30 28c8 4 14 10 17 15" stroke="#f9a191" stroke-width="2" fill="none"/>
             <path d="M30 28c-3-3-3-6 0-9 3 3 3 6 0 9z" fill="#fff1d6"/>
             <path d="M22 15l8 4 8-4-5-1-3-4-3 4z" fill="#6aa84f" ${stroke}/>
             <ellipse cx="20" cy="24" rx="3" ry="2" fill="#fff" opacity=".55" transform="rotate(-30 20 24)"/>`; break;
      case 'carrot':
        g = `<path d="M12 44 44 12" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
             <path d="M12 44 44 12" stroke="#f58a3c" stroke-width="4.5" stroke-linecap="round"/>
             <path d="M18 48 48 20" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
             <path d="M18 48 48 20" stroke="#f7a254" stroke-width="3.6" stroke-linecap="round"/>
             <path d="M10 36 36 10" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
             <path d="M10 36 36 10" stroke="#ffb46a" stroke-width="3.6" stroke-linecap="round"/>`; break;
      case 'papaya':
        g = `<g stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6].map(i => {
          const y = 14 + i * 5, c = i % 2 ? '#c9e58a' : '#e8f3b0';
          return `<path d="M${8 + (i % 3) * 2} ${y + 6}q20 -${4 + i} ${44 - (i % 2) * 6} ${-2 + (i % 3)}" stroke="${INK}" stroke-width="5" fill="none"/>
                  <path d="M${8 + (i % 3) * 2} ${y + 6}q20 -${4 + i} ${44 - (i % 2) * 6} ${-2 + (i % 3)}" stroke="${c}" stroke-width="3" fill="none"/>`;
        }).join('')}</g>`; break;
      case 'drop': // seasoning drop
        g = `<path d="M30 10c6 10 14 18 14 26a14 14 0 0 1-28 0c0-8 8-16 14-26z" fill="#d79b4e" ${stroke}/>`; break;
    }
    return `<svg class="ingr" width="${size}" height="${size}" viewBox="0 0 60 60" aria-hidden="true">${g}</svg>`;
  };

  /* ---------- flowers ---------- */
  function petalRing(n, rx, ry, dist, fill, stroke, rot = 0) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = rot + (360 / n) * i;
      s += `<ellipse cx="0" cy="${-dist}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="1.3" transform="rotate(${a})"/>`;
    }
    return s;
  }
  function pointedRing(n, len, w, fill, stroke, rot = 0) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = rot + (360 / n) * i;
      s += `<path d="M0 0C${w} ${-len * 0.35} ${w * 0.6} ${-len * 0.8} 0 ${-len}C${-w * 0.6} ${-len * 0.8} ${-w} ${-len * 0.35} 0 0z" fill="${fill}" stroke="${stroke}" stroke-width="1.3" transform="rotate(${a})"/>`;
    }
    return s;
  }
  // returns inner SVG group centered at 0,0 (radius ~ 24)
  EC.flowerHead = function (type) {
    switch (type) {
      case 'hydrangea': // ดีใจ – pink round
        return `${petalRing(5, 11, 13, 11, '#f7c4cf', '#d98fa0')}${petalRing(5, 6, 7, 6, '#fbd9e1', '#e2a3b3', 36)}
                <circle r="3.6" fill="#f3e08a" stroke="#c9a94c" stroke-width="1"/>`;
      case 'lavender': // กังวล
        return `<path d="M0 26V-22" stroke="#7f9a5a" stroke-width="2"/>
          ${[-22, -15, -8, -1, 6, 13].map((y, i) => `<ellipse cx="${i % 2 ? 4 : -4}" cy="${y}" rx="4.6" ry="6" fill="${i % 2 ? '#a58bd6' : '#bba4e6'}" stroke="#7a62b0" stroke-width="1.1"/>`).join('')}
          ${[-18, -4, 10].map(y => `<ellipse cx="0" cy="${y}" rx="4" ry="5" fill="#c9b6ef" stroke="#7a62b0" stroke-width="1"/>`).join('')}`;
      case 'lily': // หงุดหงิด – red/coral pointed
        return `${pointedRing(6, 25, 9, '#f17c78', '#c4504c', 0)}
                ${[0, 60, 120, 180, 240, 300].map(a => `<path d="M0 0 0 -13" stroke="#8b3a2f" stroke-width="1.3" transform="rotate(${a + 30})"/><circle cx="0" cy="-14" r="1.8" fill="#8b3a2f" transform="rotate(${a + 30})"/>`).join('')}
                <circle r="3.5" fill="#f6c25b"/>`;
      case 'jasmine': // เหนื่อยล้า – cream white
        return `${pointedRing(5, 23, 11, '#fffaf0', '#c9bfa6', 0)}${pointedRing(5, 14, 7, '#f6efdc', '#d6ccb1', 36)}
                <circle r="4" fill="#f5d77a" stroke="#c9a94c" stroke-width="1"/>`;
      case 'bluebell': // โล่งใจ – light blue
        return `${petalRing(5, 10, 13, 12, '#c3d9f4', '#7e9fd0')}<circle r="6" fill="#e6f0fb"/>
                ${[0, 72, 144, 216, 288].map(a => `<path d="M0 -3 0 -10" stroke="#7e9fd0" stroke-width="1.4" transform="rotate(${a})"/>`).join('')}
                <circle r="3" fill="#f3e08a"/>`;
      case 'sunflower': // ภูมิใจ
        return `${pointedRing(14, 25, 7, '#f7c843', '#d39a1e', 0)}${pointedRing(14, 20, 6, '#fbd768', '#d39a1e', 12.8)}
                <circle r="10" fill="#8a5a33" stroke="#5a3a20" stroke-width="1.3"/>
                <circle r="6" fill="#6e4426"/>
                ${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="0" cy="-7.5" r="1" fill="#c9915a" transform="rotate(${a})"/>`).join('')}`;
      case 'clover': // สับสน – lilac 4-petal
        return `${petalRing(4, 12, 13, 11, '#cdbfe0', '#9584b5', 45)}${petalRing(4, 8, 9, 10, '#bcd1ea', '#8aa0c4', 0)}
                <circle r="4" fill="#efe7a2" stroke="#b7a85a" stroke-width="1"/>`;
      case 'sakura': // กดดัน – pink notched
        return `${[0, 72, 144, 216, 288].map(a => `<path d="M0 0C9 -6 12 -18 6 -24L0 -20 -6 -24C-12 -18 -9 -6 0 0z" fill="#f8b7c4" stroke="#d57f93" stroke-width="1.3" transform="rotate(${a})"/>`).join('')}
                ${[0, 72, 144, 216, 288].map(a => `<path d="M0 0 0 -9" stroke="#c75b78" stroke-width="1.2" transform="rotate(${a + 36})"/>`).join('')}
                <circle r="3" fill="#e05f7c"/>`;
      default:
        return petalRing(5, 10, 12, 11, '#f7c4cf', '#d98fa0') + '<circle r="4" fill="#f3e08a"/>';
    }
  };
  EC.flowerIcon = function (type, size = 64) {
    return `<svg class="flower-ico" width="${size}" height="${size}" viewBox="-32 -32 64 64" aria-hidden="true">
      <g class="fh">${EC.flowerHead(type)}</g></svg>`;
  };

  /* ---------- illustrations ---------- */
  const S = `stroke="${INK}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  EC.art = {
    teacher: () => `<svg viewBox="0 0 220 180" class="illo" aria-hidden="true">
      <path d="M20 168h180" ${S} fill="none"/>
      <path d="M70 168c-6-30 8-52 40-52s48 22 42 52" fill="#fff" ${S}/>
      <path d="M96 120l14 14 14-14" fill="none" ${S}/>
      <circle cx="110" cy="146" r="2.2" fill="${INK}"/><circle cx="110" cy="158" r="2.2" fill="${INK}"/>
      <path d="M58 74c-4-28 14-50 46-50s50 20 48 46" fill="#9a6a4b" ${S}/>
      <circle cx="78" cy="30" r="15" fill="#9a6a4b" ${S}/>
      <ellipse cx="106" cy="80" rx="38" ry="36" fill="#ffe7d4" ${S}/>
      <path d="M68 74c10-12 26-20 46-18 12 1 24 6 30 14-14-2-30-4-44-12-8 8-18 14-32 16z" fill="#9a6a4b" ${S}/>
      <path d="M86 84q5 5 10 0M114 84q5 5 10 0" fill="none" ${S}/>
      <path d="M100 98q6 5 12 0" fill="none" ${S}/>
      <ellipse cx="82" cy="94" rx="6" ry="3.5" fill="#f7a9a0" opacity=".7"/><ellipse cx="130" cy="94" rx="6" ry="3.5" fill="#f7a9a0" opacity=".7"/>
      <path d="M74 106c-6 10-6 22 4 26 8 4 18-2 22-10" fill="#ffe7d4" ${S}/>
      <path d="M140 104c6 10 4 22-6 26-8 3-16-3-20-10" fill="#ffe7d4" ${S}/>
      <path d="M150 140h34v22c0 6-5 8-17 8s-17-2-17-8z" fill="#fff" ${S}/>
      <path d="M184 146c9 0 9 12 0 12" fill="none" ${S}/>
      <path d="M161 152c0-4 6-4 6 0 0-4 6-4 6 0 0 4-6 7-6 7s-6-3-6-7z" fill="#f28b8b" stroke="${INK}" stroke-width="1.4"/>
      <path d="M160 130c-4-6 4-8 0-14M172 130c-4-6 4-8 0-14" fill="none" ${S}/>
      <path d="M178 40c-2-8 9-12 12-4 3-8 14-4 12 4-2 7-12 12-12 12s-10-5-12-12z" fill="#fff" ${S}/>
      <path d="M150 22l6-8M166 30l10-4M160 14l2-8" ${S}/>
    </svg>`,
    books: () => `<svg viewBox="0 0 170 150" class="illo" aria-hidden="true">
      <rect x="22" y="112" width="120" height="24" rx="5" fill="#fff" ${S}/>
      <path d="M30 120h96M30 128h96" stroke="#c9b8a6" stroke-width="1.6"/>
      <rect x="32" y="88" width="104" height="24" rx="5" fill="#fbe7c2" ${S}/>
      <path d="M40 96h84M40 104h84" stroke="#d9c18e" stroke-width="1.6"/>
      <path d="M68 116c0-4 6-4 6 0 0-4 6-4 6 0 0 4-6 7-6 7s-6-3-6-7z" fill="#f28b8b" stroke="${INK}" stroke-width="1.3"/>
      <path d="M72 88h30l-3-18H75z" fill="#fff" ${S}/>
      <path d="M87 70V44" ${S}/>
      <path d="M87 54c-2-14-14-20-26-18 0 12 10 20 26 18z" fill="#bcd98f" ${S}/>
      <path d="M87 48c2-14 14-20 28-16-2 12-14 18-28 16z" fill="#a8cc78" ${S}/>
      <path d="M130 40l8-6M136 54l10-2M126 28l4-8" ${S}/>
    </svg>`,
    cat: () => `<svg viewBox="0 0 160 120" class="illo" aria-hidden="true">
      <path d="M20 104h120" ${S}/>
      <path d="M36 104c-10-20 2-46 30-48l4-16 10 12c6-1 14 0 20 2l10-12 2 18c14 10 14 32 4 44z" fill="#fff" ${S}/>
      <path d="M70 76q5 4 10 0M90 76q5 4 10 0" fill="none" ${S}/>
      <path d="M84 84l2 2 2-2" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M116 102c14 0 24-8 22-22" fill="none" ${S}/>
      <ellipse cx="70" cy="86" rx="4" ry="2.5" fill="#f7a9a0" opacity=".7"/><ellipse cx="102" cy="86" rx="4" ry="2.5" fill="#f7a9a0" opacity=".7"/>
      <path d="M120 40l6-6M128 50l8-2" ${S}/>
    </svg>`,
    house: () => `<svg viewBox="0 0 220 150" class="illo" aria-hidden="true">
      <path d="M0 132c40-22 90-20 120-10s70 6 100-6v34H0z" fill="#e7efcc"/>
      <path d="M54 122V80" ${S}/>
      <path d="M54 96l-12-12M54 90l12-12" ${S}/>
      <circle cx="54" cy="64" r="28" fill="#cfe0a8" ${S}/>
      <path d="M118 128V92l32-26 32 26v36z" fill="#fff" ${S}/>
      <path d="M110 96l40-34 40 34" fill="none" stroke="#e9a37c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M110 96l40-34 40 34" fill="none" ${S}/>
      <path d="M142 128v-20h16v20" fill="#f6d5a8" ${S}/>
      <rect x="126" y="100" width="10" height="10" fill="#fff" ${S}/><rect x="164" y="100" width="10" height="10" fill="#fff" ${S}/>
      <path d="M150 62V40l14 5-14 5" fill="#f4c64e" ${S}/>
      <path d="M30 140q4-4 8 0M90 138l2-4 2 4M196 136l2-4 2 4" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`,
    heartHands: () => `<svg viewBox="0 0 140 110" class="illo" aria-hidden="true">
      <path d="M70 70S40 54 40 34c0-12 10-18 18-18 6 0 10 3 12 8 2-5 6-8 12-8 8 0 18 6 18 18 0 20-30 36-30 36z" fill="#fff" ${S}/>
      <path d="M58 40q4 4 8 0M74 40q4 4 8 0M64 50q6 4 12 0" fill="none" ${S}/>
      <path d="M24 64c8 0 14 6 22 12 8 6 16 8 24 8s16-2 24-8 14-12 22-12" fill="none" ${S}/>
      <path d="M24 64c-4 14 6 26 22 30h48c16-4 26-16 22-30" fill="#ffe7d4" ${S}/>
      <path d="M30 22l6 6M22 36h8M110 22l-6 6M118 36h-8" ${S}/>
    </svg>`,
    notebook: () => `<svg viewBox="0 0 180 130" class="illo" aria-hidden="true">
      <path d="M20 110l70 10 70-10V24L90 34 20 24z" fill="#fff" ${S}/>
      <path d="M90 34v86" ${S}/>
      <path d="M34 46l42 5M34 60l42 5M34 74l42 5M104 51l42-5M104 65l42-5" stroke="#d8c8b4" stroke-width="2" stroke-linecap="round"/>
      <path d="M118 80c0-5 7-5 7 0 0-5 7-5 7 0 0 5-7 9-7 9s-7-4-7-9z" fill="#f28b8b" stroke="${INK}" stroke-width="1.4"/>
      <rect x="36" y="82" width="10" height="10" rx="2" fill="#fff" ${S}/><path d="M38 87l2 2 4-4" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <path d="M150 112l20-50 6 3-18 50-8 3z" fill="#f4c64e" ${S}/>
      <path d="M8 40l8 4M6 56h8M168 30l-6 6" ${S}/>
    </svg>`,
    classroom: () => `<svg viewBox="0 0 200 130" class="illo" aria-hidden="true">
      <rect x="70" y="10" width="100" height="62" rx="4" fill="#fff" ${S}/>
      <path d="M106 32h10v-8h10v8h10v12h-10v8h-10v-8h-10z" fill="#bcd3f0" ${S}/>
      <circle cx="50" cy="70" r="18" fill="#ffe7d4" ${S}/><path d="M32 66c2-14 30-18 36 0-10-6-24-4-36 0z" fill="#6e4b36" ${S}/>
      <path d="M44 72h.01M56 72h.01" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/><path d="M46 78q4 3 8 0" fill="none" ${S}/>
      <circle cx="140" cy="84" r="16" fill="#ffe7d4" ${S}/><path d="M124 82c0-14 30-18 32 0-8-6-22-6-32 0z" fill="#9a6a4b" ${S}/>
      <path d="M135 86h.01M145 86h.01" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/><path d="M136 92q4 3 8 0" fill="none" ${S}/>
      <path d="M20 104h64M110 112h64M30 104v20M74 104v20M120 112v14M164 112v14" ${S}/>
    </svg>`,
    paint: () => `<svg viewBox="0 0 180 130" class="illo" aria-hidden="true">
      <circle cx="120" cy="50" r="26" fill="#f4b7b7" opacity=".55"/><circle cx="140" cy="76" r="22" fill="#a9c3e6" opacity=".6"/><circle cx="104" cy="82" r="18" fill="#f6d38a" opacity=".65"/>
      <path d="M30 120h56V60H30z" fill="#fff" ${S}/><path d="M30 76h56" ${S}/>
      <path d="M44 60 40 10M58 60V6M72 60l6-48" ${S}/>
      <path d="M36 12l8-4 2 8zM54 8h8l-4 8zM74 10l8 0-4 8z" fill="#d79b4e" ${S}/>
    </svg>`,
    sky: () => `<svg viewBox="0 0 200 130" class="illo" aria-hidden="true">
      <rect x="10" y="10" width="180" height="110" rx="10" fill="#e9f3fb" ${S}/>
      <path d="M10 92c40-20 70-10 100 0s60 6 80-6v24a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10z" fill="#d6e8b0" ${S}/>
      <path d="M104 120c4-12 26-18 18-28" fill="none" stroke="#e8c48a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="152" cy="40" r="12" fill="#f7d14b" ${S}/><path d="M152 18v-4M170 26l3-3M174 40h4M134 26l-3-3" ${S}/>
      <path d="M40 46c-10 0-10-14 0-13 2-9 16-9 18 0 9-1 9 13 0 13z" fill="#fff" ${S}/>
      <path d="M44 54l-2 6M52 54l-2 6" stroke="#7fb0e0" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    box: () => `<svg viewBox="0 0 160 130" class="illo" aria-hidden="true">
      <path d="M30 60h100v50a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6z" fill="#f2d6a2" ${S}/>
      <path d="M26 48h108v14H26z" fill="#f7e1b6" ${S}/>
      <path d="M70 84c0-6 10-6 10 0 0-6 10-6 10 0 0 7-10 12-10 12s-10-5-10-12z" fill="#f28b8b" ${S}/>
      <path d="M62 40l-6-14M80 36V20M98 40l6-14" ${S}/>
    </svg>`,
    stars: () => `<svg viewBox="0 0 200 130" class="illo" aria-hidden="true">
      <rect x="6" y="6" width="188" height="118" rx="14" fill="#2f3a66"/>
      <circle cx="160" cy="34" r="12" fill="#fbefc2"/><circle cx="166" cy="30" r="11" fill="#2f3a66"/>
      ${[[30, 30], [60, 50], [90, 26], [120, 60], [50, 90], [140, 92]].map(([x, y]) => `<path d="M${x} ${y - 6}l1.8 4.2 4.2 1.8-4.2 1.8L${x} ${y + 6}l-1.8-4.2-4.2-1.8 4.2-1.8z" fill="#ffe28a"/>`).join('')}
      <path d="M30 30 60 50 90 26M60 50 50 90" stroke="#ffe28a" stroke-width="1" stroke-dasharray="3 3" fill="none"/>
      <path d="M6 108c40-18 70-12 110-4s60 0 78-8v14a14 14 0 0 1-14 14H20A14 14 0 0 1 6 110z" fill="#4b4f86"/>
    </svg>`,
    journal: () => `<svg viewBox="0 0 180 130" class="illo" aria-hidden="true">
      <rect x="40" y="14" width="96" height="104" rx="6" fill="#fff" ${S}/>
      <path d="M40 30h-8M40 50h-8M40 70h-8M40 90h-8" ${S}/>
      <path d="M58 40h60M58 56h60M58 72h44" stroke="#d8c8b4" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M120 116l30-60 8 4-28 60-10 6z" fill="#f4c64e" ${S}/>
      <path d="M18 100c8-2 14 4 14 12-10 0-14-6-14-12z" fill="#bcd98f" ${S}/>
    </svg>`
  };
})(window.EC);
