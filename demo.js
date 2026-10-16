/* Tappable Sanpo demo: real app screenshots with clickable areas.
   To add a screen: drop its image in /images, add an entry to SCREENS,
   and point a hotspot's `to` at its id. Hotspot boxes are in pixels of a
   924x2000 screen: [x, y, width, height]. */
(function () {
  var W = 924, H = 2000;

  var SCREENS = {
    home: {
      img: 'images/app-home.webp',
      alt: 'Sanpo home screen',
      hot: [
        { label: 'Arrival guide', box: [408, 1749, 108, 108], to: 'arrival', hint: true },
        { label: 'Scenarios', box: [216, 1205, 492, 123], to: 'arrival' },
        { label: "What's nearby", box: [216, 1045, 492, 123], to: 'nearby' },
        { label: 'Quick translations', box: [556, 1749, 108, 108], to: 'translations' }
      ]
    },
    nearby: {
      img: 'images/app-nearby.webp',
      alt: "Sanpo What's Nearby categories",
      hot: [
        { label: 'Back', box: [40, 123, 108, 108], to: 'home' },
        { label: 'Search', box: [408, 493, 108, 68], to: 'results', hint: true },
        { label: 'Saved places', box: [660, 1769, 152, 88], to: 'saved' }
      ]
    },
    results: {
      img: 'images/app-nearby-results.webp',
      alt: 'Sanpo ramen results',
      hot: [{ label: 'Close', box: [796, 192, 74, 74], to: 'nearby' }]
    },
    saved: {
      img: 'images/app-saved.webp',
      alt: 'Sanpo saved places',
      hot: [{ label: 'Back', box: [37, 142, 100, 100], to: 'nearby' }]
    },
    translations: {
      img: 'images/app-translations.webp',
      alt: 'Sanpo quick translations',
      hot: [{ label: 'Back', box: [40, 123, 108, 108], to: 'home' }]
    },
    arrival: {
      img: 'images/app-scenarios.webp',
      alt: 'Sanpo Arriving in Japan walkthrough',
      hot: [
        { label: 'Close', box: [806, 163, 78, 78], to: 'home' },
        { label: 'Start', box: [216, 1626, 492, 122], to: 'end', hint: true }
      ]
    }
  };

  var root = document.getElementById('demo');
  if (!root) return;
  var viewport = root.querySelector('.demo-viewport');
  var endcard = root.querySelector('.demo-end');
  var caption = document.getElementById('demo-caption');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = {}, current = 'home', moves = 0;

  function pct(v, total) { return (v / total * 100).toFixed(3) + '%'; }

  Object.keys(SCREENS).forEach(function (id) {
    var s = SCREENS[id];
    var wrap = document.createElement('div');
    wrap.className = 'demo-screen';
    wrap.setAttribute('aria-hidden', 'true');
    var img = new Image();
    img.src = s.img; img.alt = s.alt; img.draggable = false;
    img.decoding = 'async';
    wrap.appendChild(img);
    s.hot.forEach(function (h) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'demo-hot' + (h.hint ? ' hint' : '');
      b.setAttribute('aria-label', h.label);
      b.tabIndex = -1;
      b.style.left = pct(h.box[0], W); b.style.top = pct(h.box[1], H);
      b.style.width = pct(h.box[2], W); b.style.height = pct(h.box[3], H);
      b.addEventListener('click', function () { go(h.to); });
      wrap.appendChild(b);
    });
    viewport.insertBefore(wrap, endcard);
    els[id] = wrap;
  });

  function setActive(id) {
    Object.keys(els).forEach(function (k) {
      var on = k === id;
      els[k].classList.toggle('active', on);
      els[k].setAttribute('aria-hidden', on ? 'false' : 'true');
      els[k].querySelectorAll('.demo-hot').forEach(function (b) { b.tabIndex = on ? 0 : -1; });
    });
  }

  function go(id) {
    if (id === 'end') {
      endcard.hidden = false;
      requestAnimationFrame(function () { endcard.classList.add('show'); });
      setActive(null);
      var a = endcard.querySelector('a'); if (a) a.focus({ preventScroll: true });
      if (caption) caption.textContent = 'that was the start of the arrival guide';
      return;
    }
    endcard.classList.remove('show'); endcard.hidden = true;
    current = id; moves++;
    root.classList.toggle('moved', moves > 0);
    setActive(id);
    if (caption) caption.textContent = id === 'home' ? 'tap the glowing button to try it' : 'keep tapping, it works like the app';
  }

  endcard.querySelector('.demo-restart').addEventListener('click', function () { go('home'); });
  root.classList.add('ready');
  setActive('home');
})();
