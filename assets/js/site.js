(function () {
  // mobile nav
  var t = document.querySelector('.nav-toggle'), n = document.getElementById('nav');
  if (t && n) t.addEventListener('click', function () {
    var open = n.classList.toggle('open');
    t.setAttribute('aria-expanded', open);
  });

  // project tag filter
  var f = document.querySelector('[data-filters]');
  if (f) f.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    f.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
    var tag = b.dataset.tag;
    document.querySelectorAll('[data-grid] .card').forEach(function (c) {
      var tags = (c.dataset.tags || '').split(',');
      c.classList.toggle('hide', !!tag && tags.indexOf(tag) === -1);
    });
  });

  // click-to-load YouTube (no tracking until played)
  document.querySelectorAll('.video[data-yt]').forEach(function (v) {
    var btn = v.querySelector('.video-play'); if (!btn) return;
    btn.addEventListener('click', function () {
      var i = document.createElement('iframe');
      i.src = 'https://www.youtube-nocookie.com/embed/' + v.dataset.yt + '?autoplay=1&rel=0';
      i.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
      i.allowFullscreen = true; i.title = 'Demo video';
      v.replaceChild(i, btn);
    });
  });

  // image lightbox
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-lightbox]'); if (!a) return;
    e.preventDefault();
    var o = document.createElement('div'); o.className = 'lightbox';
    var im = document.createElement('img'); im.src = a.href; im.alt = (a.querySelector('img') || {}).alt || '';
    o.appendChild(im); document.body.appendChild(o);
    function close() { o.remove(); document.removeEventListener('keydown', k); }
    function k(ev) { if (ev.key === 'Escape') close(); }
    o.addEventListener('click', close); document.addEventListener('keydown', k);
  });
})();
