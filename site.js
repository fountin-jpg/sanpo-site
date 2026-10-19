/* Small touches: the walk line on the features page fills as you scroll, and the footer shows the time in Tokyo. */
(function () {
  var t = document.getElementById('tokyo-time');
  if (t) {
    var fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', hour: 'numeric', minute: '2-digit' });
    var tick = function () { t.textContent = "it's " + fmt.format(new Date()).toLowerCase() + ' in tokyo'; };
    tick(); setInterval(tick, 30000);
  }

  var route = document.querySelector('.route');
  if (!route) return;
  var fill = route.querySelector('.route-fill');
  var items = route.querySelectorAll('.stop-item');
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function update() {
    var mid = window.innerHeight * 0.55;
    var top = route.getBoundingClientRect().top;
    var p = Math.max(0, Math.min(route.offsetHeight, mid - top));
    if (still) p = route.offsetHeight;
    fill.style.setProperty('--p', p + 'px');
    items.forEach(function (el) {
      el.classList.toggle('on', still || el.getBoundingClientRect().top < mid);
    });
  }
  var queued = false;
  function onScroll() { if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; update(); }); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
