/* Hero demo: a tiny multi-robot sim. Agents head for goals, sense nearby agents, walls and your
   cursor, and steer around them with no central planner. Progressive enhancement: the static SVG
   stays if JS or canvas is unavailable. */
(function () {
  var fig = document.querySelector('.hero-art');
  var svg = fig && fig.querySelector('svg.art');
  if (!fig || !svg) return;
  var cv = document.createElement('canvas');
  cv.className = 'sim'; cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Interactive demo: five robots navigate to goals and steer around each other and your cursor');
  var ctx = cv.getContext('2d'); if (!ctx) return;
  svg.style.display = 'none'; svg.parentNode.insertBefore(cv, svg);

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 480, H = 360, DPR = 1, CELL = 30;
  var css = getComputedStyle(document.documentElement);
  function col(n, d) { return (css.getPropertyValue(n) || d).trim(); }
  var C = {};
  function colors() {
    css = getComputedStyle(document.documentElement);
    C = { card: col('--card', '#121a23'), line: col('--line', '#1f2a36'), bg2: col('--bg2', '#10161d'),
          muted: col('--muted', '#8b9aab'), text: col('--text', '#e6edf3'),
          a: [col('--accent', '#3fe0b0'), col('--accent2', '#5aa9ff'), col('--warn', '#ffb454'), '#c792ea', '#ff7b8a'] };
  }
  colors();
  if (window.matchMedia) matchMedia('(prefers-color-scheme: light)').addEventListener('change', colors);

  var walls = [[150, 90, 60, 60], [270, 180, 30, 90], [90, 210, 60, 30], [360, 60, 30, 90]];
  var R = 6, SENSE = 54, VMAX = 52;
  var mouse = null, agents = [], t0 = 0, raf = 0, visible = true;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function randGoal() {
    for (var k = 0; k < 40; k++) {
      var x = (1 + Math.floor(Math.random() * (W / CELL - 1))) * CELL, y = (1 + Math.floor(Math.random() * (H / CELL - 1))) * CELL;
      if (!inWall(x, y, 16)) return { x: x, y: y };
    }
    return { x: 30, y: 30 };
  }
  function inWall(x, y, pad) {
    return walls.some(function (w) { return x > w[0] - pad && x < w[0] + w[2] + pad && y > w[1] - pad && y < w[1] + w[3] + pad; });
  }
  function init() {
    agents = [];
    for (var i = 0; i < 5; i++) {
      var p = randGoal();
      agents.push({ x: p.x, y: p.y, vx: 0, vy: 0, g: randGoal(), c: C.a[i], trail: [], sensing: 0, id: i });
    }
  }
  function resize() {
    var r = fig.getBoundingClientRect(); var w = Math.max(240, r.width);
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    cv.style.width = w + 'px'; cv.style.height = (w * H / W) + 'px';
    cv.width = Math.round(w * DPR); cv.height = Math.round(w * H / W * DPR);
  }

  // Steering: head to goal, then add repulsion from anything sensed (agents, walls, cursor).
  // Repulsion is rotated slightly so agents slide around obstacles instead of deadlocking.
  function step(dt) {
    agents.forEach(function (a) {
      var dx = a.g.x - a.x, dy = a.g.y - a.y, d = Math.hypot(dx, dy);
      if (d < 8) { a.g = randGoal(); dx = a.g.x - a.x; dy = a.g.y - a.y; d = Math.hypot(dx, dy); }
      var vx = dx / d * VMAX, vy = dy / d * VMAX, sensed = 0;
      function repel(ox, oy, rad, w) {
        var rx = a.x - ox, ry = a.y - oy, rd = Math.hypot(rx, ry) - rad;
        if (rd < SENSE) {
          sensed = Math.max(sensed, 1 - Math.max(rd, 0) / SENSE);
          var k = w * Math.pow(1 - Math.max(rd, 0) / SENSE, 2) * VMAX * 2.2, n = Math.hypot(rx, ry) || 1;
          rx /= n; ry /= n;
          var ca = 0.55, s = Math.sin(ca), c = Math.cos(ca);   // bias to one side
          vx += (rx * c - ry * s) * k; vy += (rx * s + ry * c) * k;
        }
      }
      agents.forEach(function (b) { if (b !== a) repel(b.x, b.y, R, 1); });
      walls.forEach(function (w) {
        var nx = Math.max(w[0], Math.min(a.x, w[0] + w[2])), ny = Math.max(w[1], Math.min(a.y, w[1] + w[3]));
        repel(nx, ny, 0, 1.6);
      });
      if (mouse) repel(mouse.x, mouse.y, 10, 2.2);
      var sp = Math.hypot(vx, vy); if (sp > VMAX * 1.3) { vx *= VMAX * 1.3 / sp; vy *= VMAX * 1.3 / sp; }
      a.vx += (vx - a.vx) * Math.min(1, dt * 6); a.vy += (vy - a.vy) * Math.min(1, dt * 6);
      a.x += a.vx * dt; a.y += a.vy * dt;
      a.x = Math.max(R, Math.min(W - R, a.x)); a.y = Math.max(R, Math.min(H - R, a.y));
      a.sensing += (sensed - a.sensing) * Math.min(1, dt * 8);
      a.trail.push([a.x, a.y]); if (a.trail.length > 38) a.trail.shift();
    });
  }

  function draw() {
    var s = cv.width / W; ctx.setTransform(s, 0, 0, s, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = C.card; rr(0, 0, W, H, 16); ctx.fill();
    ctx.save(); rr(0, 0, W, H, 16); ctx.clip();
    ctx.strokeStyle = C.line; ctx.globalAlpha = .55; ctx.lineWidth = 1; ctx.beginPath();
    for (var x = 0; x <= W; x += CELL) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (var y = 0; y <= H; y += CELL) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke(); ctx.globalAlpha = 1;
    ctx.fillStyle = C.bg2; ctx.strokeStyle = C.line;
    walls.forEach(function (w) { rr(w[0], w[1], w[2], w[3], 4); ctx.fill(); ctx.stroke(); });
    // coordination links: agents that can sense each other
    ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
    for (var i = 0; i < agents.length; i++) for (var j = i + 1; j < agents.length; j++) {
      var A = agents[i], B = agents[j], d = Math.hypot(A.x - B.x, A.y - B.y);
      if (d < SENSE * 1.6) { ctx.globalAlpha = .45 * (1 - d / (SENSE * 1.6)); ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    }
    ctx.setLineDash([]); ctx.globalAlpha = 1;
    agents.forEach(function (a) {
      // goal
      ctx.strokeStyle = a.c; ctx.lineWidth = 2; ctx.globalAlpha = .8; ctx.beginPath(); ctx.arc(a.g.x, a.g.y, 6, 0, 6.283); ctx.stroke();
      // trail
      ctx.globalAlpha = 1; ctx.lineWidth = 2;
      for (var k = 1; k < a.trail.length; k++) { ctx.globalAlpha = k / a.trail.length * .5; ctx.strokeStyle = a.c; ctx.beginPath(); ctx.moveTo(a.trail[k - 1][0], a.trail[k - 1][1]); ctx.lineTo(a.trail[k][0], a.trail[k][1]); ctx.stroke(); }
      // sensing ring (brightens while avoiding)
      ctx.globalAlpha = .12 + a.sensing * .5; ctx.lineWidth = 1; ctx.strokeStyle = a.c; ctx.beginPath(); ctx.arc(a.x, a.y, SENSE * .55, 0, 6.283); ctx.stroke();
      // body + heading
      ctx.globalAlpha = 1; ctx.fillStyle = a.c; ctx.beginPath(); ctx.arc(a.x, a.y, R, 0, 6.283); ctx.fill();
      var sp = Math.hypot(a.vx, a.vy) || 1; ctx.strokeStyle = C.card; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + a.vx / sp * R, a.y + a.vy / sp * R); ctx.stroke();
    });
    if (mouse) { ctx.globalAlpha = .9; ctx.strokeStyle = C.text; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 10, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = C.text; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1; }
    ctx.restore();
  }
  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  function loop(ts) {
    raf = 0; if (!visible) return;
    var dt = Math.min(.05, (ts - t0) / 1000 || .016); t0 = ts;
    step(dt); draw(); raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && visible && !reduce) { t0 = performance.now(); raf = requestAnimationFrame(loop); } }

  function pos(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
  cv.addEventListener('pointermove', function (e) { mouse = pos(e); });
  cv.addEventListener('pointerdown', function (e) { mouse = pos(e); });
  cv.addEventListener('pointerleave', function () { mouse = null; });
  cv.style.touchAction = 'pan-y';

  window.addEventListener('resize', function () { resize(); if (reduce) draw(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(cv);
  resize(); init();
  if (reduce) { for (var i = 0; i < 90; i++) step(1 / 30); draw(); } else start();
})();
