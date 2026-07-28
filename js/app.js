/* ============================================================
   PAGER — investor page
   Vanilla. No dependencies.
   ============================================================ */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ── line splitting (re-runnable after language switch) ──── */
  function splitLines(el) {
    var html = el.dataset.rawHtml;
    if (html === undefined) { html = el.innerHTML; el.dataset.rawHtml = html; }
    el.innerHTML = html.split(/<br\s*\/?>/i).map(function (line) {
      return '<span class="ln"><span class="ln-i">' + line.trim() + '</span></span>';
    }).join('');
  }
  function splitAll() { $$('[data-split]').forEach(splitLines); }

  /* ── i18n ─────────────────────────────────────────────────
     Source of truth is the Russian markup. Every translatable
     node carries data-en; the RU original is captured once.   */
  var lang = 'ru';
  function setLang(next) {
    if (next === lang) return;
    lang = next;
    document.documentElement.lang = next;

    $$('[data-en]').forEach(function (el) {
      if (el.dataset.ruHtml === undefined) {
        el.dataset.ruHtml = el.dataset.rawHtml !== undefined ? el.dataset.rawHtml : el.innerHTML;
      }
      var html = next === 'en' ? el.dataset.en : el.dataset.ruHtml;
      if (el.hasAttribute('data-split')) {
        el.dataset.rawHtml = html;
        splitLines(el);
        el.classList.add('is-in');
      } else {
        el.innerHTML = html;
      }
    });

    $$('.lang-btn').forEach(function (b) { b.classList.toggle('is-on', b.dataset.lang === next); });
    if (idNum) idNum.textContent = 'A147 0865';
  }
  $$('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ── preloader ────────────────────────────────────────────── */
  var pre = $('#preloader'), plNum = $('#plNum');
  function bootDone() {
    if (!pre || pre.dataset.done) return;
    pre.dataset.done = '1';
    pre.classList.add('is-out');
    setTimeout(function () {
      pre.classList.add('is-gone');
      document.body.classList.remove('is-locked');
      kick();
    }, 620);
  }
  if (pre) {
    document.body.classList.add('is-locked');
    var n = 0, t0 = performance.now(), dur = RM ? 300 : 1150;
    (function tick(now) {
      var p = clamp((now - t0) / dur, 0, 1);
      n = Math.round(p * 100);
      plNum.textContent = String(n).padStart(3, '0');
      if (p < 1) requestAnimationFrame(tick); else bootDone();
    })(t0);
    setTimeout(bootDone, 3500);
  }

  /* ── reveal on enter ──────────────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  function kick() {
    $$('.reveal, .split, .sec-head, .id-card, .pcard').forEach(function (el) { io.observe(el); });
    // hero copy animates immediately after the curtain
    $$('#hero .reveal, #hero .split').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('is-in'); }, 60 + i * 70);
    });
  }

  /* ── scroll progress + nav state ──────────────────────────── */
  var bar = $('.scroll-progress i');
  var nav = $('#nav');
  var inkSections = $$('.s-ink, .mp, .marquee, .foot');

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    if (nav) {
      nav.classList.toggle('is-stuck', window.scrollY > 40);
      var probe = nav.offsetHeight * 0.6;
      var onInk = inkSections.some(function (s) {
        var r = s.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      nav.classList.toggle('on-ink', onInk);
    }
  }

  /* ── mobile menu ──────────────────────────────────────────── */
  var burger = $('#burger'), menu = $('#menu');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.classList.toggle('is-locked', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    $$('#menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open', 'is-locked');
        menu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ── custom cursor (desktop only) ─────────────────────────── */
  var cur = $('.cursor');
  if (cur && window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:1024px)').matches && !RM) {
    var cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;
    var dot = $('.c-dot'), ring = $('.c-ring');
    addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
    }, { passive: true });
    (function loop() {
      rx += (cx - rx) * 0.16; ry += (cy - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    $$('a, button, .pcard, .ui-shot, .id-shot').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hot'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hot'); });
    });
  }

  /* ── hero: parallax plate + PAGER ID scramble ─────────────── */
  var plate = $('.hero-plate');
  var heroCopy = $('.hero-copy');
  var idNum = $('#idNum');

  function heroParallax() {
    if (RM || !plate) return;
    var y = window.scrollY;
    if (y > innerHeight * 1.2) return;
    plate.style.transform = 'translate3d(0,' + (y * 0.14) + 'px,0)';
    if (heroCopy) heroCopy.style.transform = 'translate3d(0,' + (y * -0.06) + 'px,0)';
  }

  var GLYPHS = '0123456789ABCDEFGHKLMNPRSTVXZ';
  function scramble(el, finalText, ms) {
    if (RM) { el.textContent = finalText; return; }
    var start = performance.now(), chars = finalText.split('');
    (function step(now) {
      var p = clamp((now - start) / ms, 0, 1);
      var reveal = Math.floor(p * chars.length * 1.35);
      el.textContent = chars.map(function (c, i) {
        if (c === ' ') return ' ';
        if (i < reveal) return c;
        return GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }).join('');
      if (p < 1) requestAnimationFrame(step); else el.textContent = finalText;
    })(start);
  }
  if (idNum) {
    var idIo = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { scramble(idNum, 'A147 0865', 900); idIo.disconnect(); }
    }, { threshold: 0.5 });
    idIo.observe(idNum);
  }

  /* ── hero swarm (canvas) ──────────────────────────────────── */
  var cv = $('#swarm');
  if (cv && !RM) {
    var ctx = cv.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2), parts = [], W = 0, H = 0;
    function sizeCanvas() {
      var r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(clamp(W * H / 9000, 40, 190));
      parts = [];
      for (var i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * W * 0.62,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.35,
          v: Math.random() * 0.24 + 0.05,
          a: Math.random() * 0.5 + 0.12,
          s: Math.random() * Math.PI * 2
        });
      }
    }
    var raf = null, visible = true;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.v; p.s += 0.012;
        p.y += Math.sin(p.s) * 0.16;
        if (p.x > W * 0.66) { p.x = -6; p.y = Math.random() * H; }
        var fade = 1 - clamp((p.x - W * 0.34) / (W * 0.3), 0, 1);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(11,11,12,' + (p.a * fade * 0.8).toFixed(3) + ')';
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    sizeCanvas(); draw();
    addEventListener('resize', sizeCanvas);
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      if (visible && !raf) draw();
      if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0 }).observe(cv);
  }

  /* ── multiprofile: pinned 4-frame storyscroll ─────────────── */
  var mp = $('#mpScroll');
  var mpFrames = $$('.mp-frame'), mpTexts = $$('.mp-text'), mpTicks = $$('.mp-ticks li');
  var mpCurrent = -1;

  function mpUpdate() {
    if (!mp) return;
    var r = mp.getBoundingClientRect();
    var total = mp.offsetHeight - innerHeight;
    var p = clamp((-r.top) / total, 0, 1);
    var i = clamp(Math.floor(p * 3.999), 0, 3);
    if (i === mpCurrent) return;
    mpCurrent = i;
    mpFrames.forEach(function (f, k) { f.classList.toggle('is-on', k === i); });
    mpTexts.forEach(function (t, k) { t.classList.toggle('is-on', k === i); });
    mpTicks.forEach(function (t, k) {
      t.classList.toggle('is-on', k === i);
      t.classList.toggle('is-done', k < i);
    });
  }

  /* ── roadmap: horizontal pin (>=1024) + line draw ─────────── */
  var rmScroll = $('#rmScroll'), rmTrack = $('#rmTrack'), rmLine = $('#rmLine');
  var rmItems = $$('.rm-item'), rmStep = $('#rmStep'), rmRail = $('#rmRail');

  function rmUpdate() {
    if (!rmScroll || !rmTrack) return;
    var wide = innerWidth >= 1024;
    var r = rmScroll.getBoundingClientRect();

    if (wide) {
      var total = rmScroll.offsetHeight - innerHeight;
      var p = clamp((-r.top) / total, 0, 1);
      var travel = rmTrack.scrollWidth - innerWidth + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pad')) * 2;
      rmTrack.style.transform = 'translate3d(' + (-travel * p) + 'px,0,0)';
      if (rmLine) rmLine.style.transform = 'scaleX(' + (0.06 + p * 0.94) + ')';
      var live = Math.round(p * (rmItems.length - 1));
      rmItems.forEach(function (it, k) { it.classList.toggle('is-live', k <= live); });
      if (rmStep) rmStep.textContent = String(live + 1).padStart(2, '0') + ' / 0' + rmItems.length;
      if (rmRail) rmRail.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    } else {
      rmTrack.style.transform = '';
      var vp = clamp((innerHeight * 0.75 - r.top) / (r.height * 0.8), 0, 1);
      if (rmLine) rmLine.style.transform = 'scaleY(' + vp + ')';
      rmItems.forEach(function (it) {
        var b = it.getBoundingClientRect();
        it.classList.toggle('is-live', b.top < innerHeight * 0.8);
      });
    }
  }

  /* ── 24h ring ─────────────────────────────────────────────── */
  var clock = $('#clock'), ring = $('.cr-fg'), crTicks = $('#crTicks');
  if (crTicks) {
    var svgNS = 'http://www.w3.org/2000/svg', marks = '';
    for (var h = 0; h < 24; h++) {
      var a = (h / 24) * Math.PI * 2 - Math.PI / 2;
      var maj = h % 6 === 0, r1 = maj ? 76 : 82, r2 = 86;
      marks += '<line class="' + (maj ? 'maj' : '') + '" x1="' + (100 + Math.cos(a) * r1).toFixed(2) +
        '" y1="' + (100 + Math.sin(a) * r1).toFixed(2) +
        '" x2="' + (100 + Math.cos(a) * r2).toFixed(2) +
        '" y2="' + (100 + Math.sin(a) * r2).toFixed(2) + '"/>';
    }
    crTicks.innerHTML = marks;
  }
  function clockUpdate() {
    if (!clock || !ring) return;
    var r = clock.getBoundingClientRect();
    var p = clamp((innerHeight * 0.86 - r.top) / (innerHeight * 0.62), 0, 1);
    ring.style.strokeDashoffset = (578 * (1 - p)).toFixed(1);
  }

  /* ── raf loop ─────────────────────────────────────────────── */
  var ticking = false;
  function frame() {
    onScroll();
    heroParallax();
    mpUpdate();
    rmUpdate();
    clockUpdate();
    ticking = false;
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);

  /* ── smooth anchors ───────────────────────────────────────── */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ── init ─────────────────────────────────────────────────── */
  splitAll();
  frame();
  if (!pre) kick();
})();
