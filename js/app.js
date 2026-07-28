/* ============================================================
   PAGER — investor page, v3 (bento)
   Без зависимостей: i18n, появление карточек, счётчики, скрэмбл ID.
   ============================================================ */
(function () {
  'use strict';

  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ── i18n ────────────────────────────────────────────────
     Русский лежит в разметке, английский — в data-en.
     Оба варианта могут содержать <i> и <br>, поэтому меняем innerHTML. */
  var lang = 'ru';
  function setLang(next) {
    if (next === lang) return;
    lang = next;
    document.documentElement.lang = next;
    $$('[data-en]').forEach(function (el) {
      if (el.dataset.ru === undefined) el.dataset.ru = el.innerHTML;
      el.innerHTML = next === 'en' ? el.dataset.en : el.dataset.ru;
    });
    $$('.lang-btn').forEach(function (b) { b.classList.toggle('is-on', b.dataset.lang === next); });
  }
  $$('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ── появление карточек: волна по бенто-сетке ───────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var cards = $$('.b', e.target);
      cards.forEach(function (c, i) {
        c.style.transitionDelay = (RM ? 0 : Math.min(i * 55, 400)) + 'ms';
        c.classList.add('in');
      });
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
  $$('.bento').forEach(function (g) { io.observe(g); });

  /* ── счётчики ───────────────────────────────────────────── */
  var numIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, to = parseInt(el.dataset.count, 10);
      numIo.unobserve(el);
      if (RM || !to) { el.textContent = to; return; }
      var t0 = performance.now(), dur = 900;
      (function step(now) {
        var p = clamp((now - t0) / dur, 0, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased);
        if (p < 1) requestAnimationFrame(step); else el.textContent = to;
      })(t0);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { el.textContent = '0'; numIo.observe(el); });

  /* ── скрэмбл PAGER ID ───────────────────────────────────── */
  var GL = '0123456789ABCDEFHKLMNPRSTVXZ';
  function scramble(el) {
    var final = el.textContent.trim();
    if (RM) return;
    var idIo = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      idIo.disconnect();
      var t0 = performance.now(), chars = final.split('');
      (function step(now) {
        var p = clamp((now - t0) / 900, 0, 1), rev = Math.floor(p * chars.length * 1.4);
        el.textContent = chars.map(function (c, i) {
          return c === ' ' ? ' ' : (i < rev ? c : GL[(Math.random() * GL.length) | 0]);
        }).join('');
        if (p < 1) requestAnimationFrame(step); else el.textContent = final;
      })(t0);
    }, { threshold: 0.5 });
    idIo.observe(el);
  }
  ['#heroId', '#idMega'].forEach(function (s) { var el = $(s); if (el) scramble(el); });

  /* ── меню ───────────────────────────────────────────────── */
  var burger = $('#burger'), menu = $('#menu');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu');
      document.body.classList.toggle('lock', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    $$('#menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu', 'lock');
        menu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ── шапка ──────────────────────────────────────────────── */
  var nav = $('#nav'), tick = false;
  function frame() { if (nav) nav.classList.toggle('stuck', scrollY > 30); tick = false; }
  addEventListener('scroll', function () {
    if (!tick) { tick = true; requestAnimationFrame(frame); }
  }, { passive: true });

  /* ── якоря ──────────────────────────────────────────────── */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = $(id); if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    });
  });

  frame();
})();
