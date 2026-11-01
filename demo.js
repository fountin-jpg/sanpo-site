/* Tappable Sanpo demo: real app screenshots with clickable areas.

   Each screen is an image in /images/demo plus a list of hotspots.
   Hotspot boxes are [x, y, width, height] in pixels of the 1206 x 2622
   screenshots (iPhone 17 Pro). `to` is a screen id, '@options' (the airport options screen
   for whichever airport was picked) or 'end:<kind>' (the sign-up card).
   `hint: true` marks the suggested next tap (it glows). */
(function () {
  var W = 1206, H = 2622;
  var BACK = [49, 186, 131, 131];

  function h(label, box, to, hint) { return { label: label, box: box, to: to, hint: !!hint }; }

  /* `down` / `up`: the same page scrolled; shown as small arrow buttons. */
  var SCREENS = {
    home: { alt: 'Sanpo home screen', hot: [
      { label: 'Sanpo walk', box: [303, 1214, 600, 150], to: 'w1', hint: true, primary: true },
      { label: 'Arrival guide (airplane)', box: [357, 2147, 132, 131], to: 'airport', hint: true },
      h("What's nearby", [303, 1410, 600, 148], 'nearby'),
      h('Scenarios', [303, 1604, 600, 149], 'guides'),
      h('Talk (chat bubbles)', [897, 2147, 132, 131], 'talk'),
      h('Before you go (checklist)', [177, 2147, 132, 131], 'checklist')
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
    w1: { alt: 'The first walk: short, medium and long, include chains, customize, four stops on a map', hot: [
      h('Back', BACK, 'home'),
      h('Customize', [47, 731, 1111, 114], 'w2', true)
    ] },
    w2: { alt: 'Customize: how many are walking, hungry, and what you like', hot: [
      h('Back', BACK, 'home'),
      h('Lunch', [614, 1200, 503, 115], 'w3', true)
    ] },
    w3: { alt: 'Customize, scrolled: what to leave out, and update my walk', hot: [
      h('Back', BACK, 'home'),
      h('Update my walk', [49, 1985, 1105, 150], 'w4', true)
    ] },
    w4: { alt: 'The lunch walk: four stops on a map with short, medium and long', down: 'w5', hot: [
      h('Back', BACK, 'home'),
      h('Step through', [81, 1040, 410, 110], 'step1', true)
    ] },
    w5: { alt: 'The lunch walk stops, with a soba restaurant as the main stop', up: 'w4', hot: [
      h('Back', BACK, 'home')
    ] },
    step1: { alt: 'Stepping through the walk', hot: [
      h('Whole walk', [207, 381, 315, 102], 'w4'),
      h('Previous stop', [81, 381, 102, 102], 'w4'),
      h('Next stop', [545, 381, 102, 102], 'step2', true)
    ] },
    step2: { alt: 'Walking to stop 1', hot: [
      h('Whole walk', [207, 381, 315, 102], 'w4'),
      h('Previous stop', [81, 381, 102, 102], 'step1'),
      h('Next stop', [545, 381, 102, 102], 'step3', true)
    ] },
    step3: { alt: 'Walking to stop 2', hot: [
      h('Whole walk', [207, 381, 315, 102], 'w4'),
      h('Previous stop', [81, 381, 102, 102], 'step2'),
      h('Next stop', [545, 381, 102, 102], 'end:walk', true)
    ] },

    /* ---- what's nearby: search, results, a place ---- */
    nearby: { alt: "What's nearby: find something for me, search, and kinds of place", hot: [
      h('Back', BACK, 'home'),
      h('Find something for me', [212, 520, 780, 159], 'around'),
      h('Search', [537, 886, 130, 81], 'search', true)
    ] },
    search: { alt: 'Typing ram: the search suggests ramen with ラーメン beside it', hot: [
      h('Ramen', [40, 455, 1126, 115], 'results', true),
      h('Search', [905, 2250, 285, 140], 'results')
    ] },
    results: { alt: 'Ramen results, photos off: open now, distance and rating', hot: [
      h('Close', [1050, 255, 100, 100], 'nearby'),
      h('Torisoba Zagin', [45, 712, 1116, 382], 'place1', true)
    ] },
    around: { alt: 'Find something for me: the best open places around you, photos off', hot: [
      h('Close', [1050, 255, 100, 100], 'nearby')
    ] },
    place1: { alt: 'A place page: open in maps, been here, show photos, and good to know with a topic chip', down: 'place2', downHint: true, hot: [
      h('Close', [1020, 255, 130, 100], 'results')
    ] },
    place2: { alt: "The place page's review summary, labelled Summarized with Gemini", up: 'place1', hot: [
      h('Close', [1020, 240, 130, 120], 'results'),
      h('Menu words', [345, 868, 516, 100], 'place3', true)
    ] },
    place3: { alt: 'Menu words in Japanese with romaji and English', up: 'place2', down: 'place4', hot: [
      h('Close', [1020, 240, 130, 120], 'results')
    ] },
    place4: { alt: 'Seating notes and a phrase to say how many are in your group', up: 'place3', hot: [
      h('Close', [1020, 240, 130, 120], 'results')
    ] },

    /* ---- guides and phrase cards ---- */
    guides: { alt: 'Guides: food, everyday, cafes and sweets, sights, shopping, drinks and nightlife', hot: [
      h('Back', BACK, 'home'),
      h('Food', [303, 774, 598, 148], 'guides-food', true)
    ] },
    'guides-food': { alt: 'Food guides', hot: [
      h('Back', BACK, 'guides'),
      h('Japanese food', [303, 930, 598, 148], 'guides-jp', true)
    ] },
    'guides-jp': { alt: 'Japanese food guides: ramen, teishoku, gyudon, tonkatsu, sushi, yakitori and more', hot: [
      h('Back', BACK, 'guides-food'),
      h('Ramen', [60, 758, 524, 150], 'guide-ramen', true)
    ] },
    'guide-ramen': { alt: 'The ramen guide, with a phrase card showing romaji, Japanese and English', down: 'guide-ramen2', hot: [
      h('Back', BACK, 'guides-jp'),
      h('Phrase card: osusume wa nan desu ka?', [48, 1489, 1109, 205], 'card1', true)
    ] },
    'guide-ramen2': { alt: 'The ramen guide steps: at the ticket machine, with a phrase card for how many', up: 'guide-ramen', hot: [
      h('Back', BACK, 'guides-jp'),
      h('Phrase card: hitori desu', [90, 720, 1025, 260], 'card2')
    ] },
    card1: { alt: 'A phrase card filling the screen in large Japanese: what do you recommend?', hot: [
      h('Back', [0, 0, 1206, 2622], 'guide-ramen')
    ] },
    card2: { alt: 'A phrase card filling the screen in large Japanese: just one', hot: [
      h('Back', [0, 0, 1206, 2622], 'guide-ramen2')
    ] },

    /* ---- talk ---- */
    talk: { alt: 'Talk: conversation topics', hot: [
      h('Back', BACK, 'home'),
      h('Pharmacy', [621, 1452, 524, 180], 'talk2', true)
    ] },
    talk2: { alt: 'Pharmacy: choose what to say', hot: [
      h('Back', BACK, 'talk'),
      h('A cold', [619, 1659, 545, 146], 'talk3', true)
    ] },
    talk3: { alt: 'The staff side shows the Japanese upside down; you see "please wait"', hot: [
      h('Back', BACK, 'talk')
    ] }
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
    if (s.up || s.down) {
      var bar = document.createElement('div');
      bar.className = 'demo-scrolls';
      [['up', s.up], ['down', s.down]].forEach(function (d) {
        if (!d[1]) return;
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'demo-hot demo-scroll ' + d[0] + (d[0] === 'down' && s.downHint ? ' hint' : '');
        b.setAttribute('aria-label', d[0] === 'down' ? 'Scroll down' : 'Scroll up');
        b.tabIndex = -1;
        b.textContent = d[0] === 'down' ? '↓' : '↑';
        b.addEventListener('click', function () { go(d[1]); });
        bar.appendChild(b);
      });
      wrap.appendChild(bar);
    }
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
    if (s.up) ensure(s.up);
    if (s.down) ensure(s.down);
    if (caption) caption.textContent = id === 'home' ? 'tap sanpo to take a walk, or the airplane if you just landed' : 'tap the glowing button, or explore';
    if (cta) cta.hidden = moves < 4;
  }

  endcard.querySelector('.demo-restart').addEventListener('click', function () {
    airport = 'hnd'; moves = 0; go('home'); moves = 0; if (cta) cta.hidden = true;
  });
  root.classList.add('ready');
  go('home'); moves = 0;
})();
