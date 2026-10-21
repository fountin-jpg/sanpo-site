/* Tappable Sanpo demo: real app screenshots with clickable areas.

   Each screen is an image in /images/demo plus a list of hotspots.
   Hotspot boxes are [x, y, width, height] in pixels of the 1206 x 2622
   screenshots. `to` is a screen id, '@options' (the airport options screen
   for whichever airport was picked) or 'end:<kind>' (the sign-up card).
   `hint: true` marks the suggested next tap (it glows). */
(function () {
  var W = 1206, H = 2622;
  var BACK = [49, 186, 131, 131];

  function h(label, box, to, hint) { return { label: label, box: box, to: to, hint: !!hint }; }

  var SCREENS = {
    home: { alt: 'Sanpo home screen', hot: [
      { label: 'Sanpo walk', box: [303, 1105, 600, 149], to: 'party', hint: true, primary: true },
      { label: 'Arrival guide (airplane)', box: [357, 2147, 132, 131], to: 'airport', hint: true },
      { label: 'Talk (chat bubbles)', box: [897, 2147, 132, 131], to: 'talk' },
      { label: 'Before you go (checklist)', box: [177, 2147, 132, 131], to: 'checklist' }
    ] },
    checklist: { alt: 'Before you go checklist', hot: [h('Back', BACK, 'home')] },

    /* ---- arrival ---- */
    airport: { alt: 'Airport picker: Haneda or Narita', hot: [
      h('Back', BACK, 'home'),
      h('Haneda', [303, 1262, 600, 149], 'hnd-options', true),
      h('Narita', [303, 1456, 600, 149], 'nrt-options')
    ] },
    'hnd-options': { alt: 'Haneda arrival options', airport: 'hnd', hot: [
      h('Back', BACK, 'airport'),
      h('Immigration', [303, 969, 600, 149], 'imm1', true),
      h('To my hotel', [303, 1164, 600, 149], 'hotel')
    ] },
    'nrt-options': { alt: 'Narita arrival options', airport: 'nrt', hot: [
      h('Back', BACK, 'airport'),
      h('Immigration', [303, 1226, 600, 149], 'imm1', true)
    ] },
    hotel: { alt: 'Where are you staying?', hot: [
      h('Back', BACK, '@options'),
      h('Shinjuku', [121, 1266, 464, 149], 'shinjuku', true)
    ] },
    shinjuku: { alt: 'Airport to Shinjuku: train and bus, taxi or uber', hot: [
      h('Back', BACK, 'hotel'),
      h('Train and bus', [303, 1266, 600, 149], 'trainbus', true),
      h('Taxi', [303, 1462, 600, 149], 'taxi'),
      h('Uber', [303, 1656, 600, 149], 'uber')
    ] },
    trainbus: { alt: 'Airport to Shinjuku by train and bus', hot: [h('Back', BACK, 'shinjuku')] },
    taxi: { alt: 'Airport to Shinjuku by taxi', hot: [h('Back', BACK, 'shinjuku')] },
    uber: { alt: 'Airport to Shinjuku by uber', hot: [h('Back', BACK, 'shinjuku')] },

    /* ---- sanpo walk ---- */
    party: { alt: 'Walk party size: 1 person', hot: [
      h('Back', BACK, 'home'),
      h('One more person', [815, 1199, 66, 66], 'party2'),
      h('Sanpo', [303, 1342, 600, 149], 'hunger', true)
    ] },
    party2: { alt: 'Walk party size: 2 people', hot: [
      h('Back', BACK, 'home'),
      h('One fewer person', [324, 1199, 66, 66], 'party'),
      h('Sanpo', [303, 1342, 600, 149], 'hunger', true)
    ] },
    hunger: { alt: 'How hungry are you?', hot: [
      h('Back', BACK, 'party'),
      h('Lunch', [303, 1021, 600, 149], 'prefs', true)
    ] },
    prefs: { alt: 'Walk preferences', hot: [
      h('Back', BACK, 'hunger'),
      h('Sanpo', [303, 2058, 600, 165], 'route', true)
    ] },
    route: { alt: 'Medium walk route with map and stops', hot: [
      h('Back', BACK, 'home'),
      h('Short', [47, 396, 357, 115], 'route-short'),
      h('Long', [802, 396, 358, 115], 'route-long'),
      h('Step through', [81, 839, 404, 100], 'step1', true)
    ] },
    'route-short': { alt: 'Short walk route', hot: [
      h('Back', BACK, 'home'),
      h('Medium', [425, 396, 358, 115], 'route'),
      h('Long', [802, 396, 358, 115], 'route-long')
    ] },
    'route-long': { alt: 'Long walk route', hot: [
      h('Back', BACK, 'home'),
      h('Short', [47, 396, 357, 115], 'route-short'),
      h('Medium', [425, 396, 358, 115], 'route')
    ] },
    step1: { alt: 'Stepping through the walk', hot: [
      h('Whole walk', [207, 381, 315, 102], 'route'),
      h('Previous stop', [81, 381, 102, 102], 'route'),
      h('Next stop', [545, 381, 102, 102], 'step2', true)
    ] },
    step2: { alt: 'Walking to stop 1', hot: [
      h('Whole walk', [207, 381, 315, 102], 'route'),
      h('Previous stop', [81, 381, 102, 102], 'step1'),
      h('Next stop', [545, 381, 102, 102], 'step3', true)
    ] },
    step3: { alt: 'Walking to stop 2', hot: [
      h('Whole walk', [207, 381, 315, 102], 'route'),
      h('Previous stop', [81, 381, 102, 102], 'step2'),
      h('Next stop', [545, 381, 102, 102], 'end:walk', true)
    ] },

    /* ---- talk ---- */
    talk: { alt: 'Talk: conversation categories', hot: [
      h('Back', BACK, 'home'),
      h('Trains', [60, 372, 524, 180], 'trains', true),
      h('Everyday', [621, 1236, 524, 180], 'everyday')
    ] },
    trains: { alt: 'Trains: phrases to say', hot: [
      h('Back', BACK, 'talk'),
      h('More', [619, 2197, 545, 125], 'trains-more', true)
    ] },
    'trains-more': { alt: 'Trains: more phrases', hot: [
      h('Back', BACK, 'talk'),
      h('How many stops to...?', [42, 1753, 545, 166], 'picker', true)
    ] },
    picker: { alt: 'Where to? Station picker', hot: [
      h('Done', [946, 186, 211, 131], 'trains-more'),
      h('Tokyo', [49, 924, 543, 149], 'trains-after', true),
      h('Shinjuku', [615, 924, 543, 149], 'trains-after')
    ] },
    'trains-after': { alt: 'The phrase shown upside down to the station staff', hot: [
      h('Back', BACK, 'talk'),
      h('Choose a place', [363, 2365, 481, 117], 'picker')
    ] },
    everyday: { alt: 'Everyday: phrases to say', hot: [
      h('Back', BACK, 'talk'),
      h('Check, please', [42, 2011, 545, 146], 'everyday-after', true)
    ] },
    'everyday-after': { alt: "'Check, please' shown upside down to the staff", hot: [h('Back', BACK, 'talk')] }
  };

  for (var n = 1; n <= 10; n++) {
    var close = h('Close', [1062, 235, 96, 94], '@options');
    var hot = [close];
    if (n === 1) {
      hot.push(h('Start', [303, 2166, 600, 149], 'imm2', true));
    } else {
      hot.push(h(n === 10 ? 'Done' : 'Next', [303, 2166, 600, 149], n === 10 ? 'end:arrival' : 'imm' + (n + 1), true));
      hot.push(h('Back', [485, 2352, 236, 109], 'imm' + (n - 1)));
    }
    SCREENS['imm' + n] = { alt: 'Arriving in Japan, step ' + n + ' of 10', hot: hot };
  }

  var END = {
    arrival: ["That's the arrival guide.", 'Get the app to keep it in your pocket, from the signs to the exit.'],
    walk: ["That's how a walk works.", 'Get the app to build one anywhere in Tokyo, with stops locals love.']
  };

  var root = document.getElementById('demo');
  if (!root) return;
  var viewport = root.querySelector('.demo-viewport');
  var endcard = root.querySelector('.demo-end');
  var endTitle = endcard.querySelector('h3');
  var endText = endcard.querySelector('p');
  var caption = document.getElementById('demo-caption');
  var cta = document.getElementById('demo-cta');
  var els = {}, airport = 'hnd', moves = 0;

  function pct(v, total) { return (v / total * 100).toFixed(3) + '%'; }

  function ensure(id) {
    if (els[id]) return els[id];
    var s = SCREENS[id];
    var wrap = document.createElement('div');
    wrap.className = 'demo-screen';
    wrap.setAttribute('aria-hidden', 'true');
    var img = new Image();
    img.src = 'images/demo/' + id + '.webp';
    img.alt = s.alt; img.draggable = false; img.decoding = 'async';
    wrap.appendChild(img);
    s.hot.forEach(function (hs) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'demo-hot' + (hs.hint ? ' hint' : '') + (hs.primary ? ' primary' : '');
      b.setAttribute('aria-label', hs.label);
      b.tabIndex = -1;
      b.style.left = pct(hs.box[0], W); b.style.top = pct(hs.box[1], H);
      b.style.width = pct(hs.box[2], W); b.style.height = pct(hs.box[3], H);
      b.addEventListener('click', function () { go(hs.to); });
      wrap.appendChild(b);
    });
    viewport.insertBefore(wrap, endcard);
    els[id] = wrap;
    return wrap;
  }

  function resolve(to) { return to === '@options' ? airport + '-options' : to; }

  function setActive(id) {
    Object.keys(els).forEach(function (k) {
      var on = k === id;
      els[k].classList.toggle('active', on);
      els[k].setAttribute('aria-hidden', on ? 'false' : 'true');
      els[k].querySelectorAll('.demo-hot').forEach(function (b) { b.tabIndex = on ? 0 : -1; });
    });
  }

  function showEnd(kind) {
    endTitle.textContent = END[kind][0];
    endText.textContent = END[kind][1];
    endcard.hidden = false;
    requestAnimationFrame(function () { endcard.classList.add('show'); });
    setActive(null);
    var a = endcard.querySelector('a'); if (a) a.focus({ preventScroll: true });
    if (caption) caption.textContent = '';
    if (cta) cta.hidden = true;
  }

  function go(to) {
    if (to.indexOf('end:') === 0) { showEnd(to.slice(4)); return; }
    var id = resolve(to);
    var s = SCREENS[id];
    if (s.airport) airport = s.airport;
    ensure(id);
    endcard.classList.remove('show'); endcard.hidden = true;
    moves++;
    setActive(id);
    s.hot.forEach(function (hs) {
      if (hs.to.indexOf('end:') !== 0) ensure(resolve(hs.to));
    });
    if (caption) caption.textContent = id === 'home' ? 'tap sanpo to take a walk, or the airplane if you just landed' : 'tap the glowing button, or explore';
    if (cta) cta.hidden = moves < 4;
  }

  endcard.querySelector('.demo-restart').addEventListener('click', function () {
    airport = 'hnd'; moves = 0; go('home'); moves = 0; if (cta) cta.hidden = true;
  });
  root.classList.add('ready');
  go('home'); moves = 0;
})();
