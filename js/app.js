/* ============================================================
   PAGER — investor page, v2
   Ядро: «линза» — выбранный профиль перенастраивает страницу.
   Без зависимостей.
   ============================================================ */
(function () {
  'use strict';

  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var root = document.documentElement;

  /* ── персоны: один человек, четыре предъявления ─────────── */
  var P = {
    personal: {
      face: 'assets/img/face-1.jpg',
      ru: { role: 'Личное', name: 'Марк', bio: 'Для тех, кто знает меня давно. Пишите когда угодно.', ttl: 'Бессрочно' },
      en: { role: 'Personal', name: 'Mark', bio: 'For the people who have known me for years. Any time.', ttl: 'No limit' },
      caps: { text: 1, audio: 1, video: 1, files: 1, call: 1, vcall: 1 }
    },
    work: {
      face: 'assets/img/face-2.jpg',
      ru: { role: 'Работа', name: 'Марк Д.', bio: 'Продукт и партнёрства. Отвечаю в рабочее время.', ttl: 'Бессрочно' },
      en: { role: 'Work', name: 'Mark D.', bio: 'Product and partnerships. I reply during working hours.', ttl: 'No limit' },
      caps: { text: 1, audio: 1, video: 0, files: 1, call: 1, vcall: 0 }
    },
    guest: {
      face: 'assets/img/face-3.jpg',
      ru: { role: 'Гость', name: 'M.', bio: 'Временный контакт по конкретному поводу.', ttl: '24:00:00' },
      en: { role: 'Guest', name: 'M.', bio: 'A temporary contact for one specific reason.', ttl: '24:00:00' },
      caps: { text: 1, audio: 0, video: 0, files: 0, call: 0, vcall: 0 }
    },
    alter: {
      face: 'assets/img/face-4.jpg',
      ru: { role: 'Альтер эго', name: 'nocturne', bio: 'Отдельный круг. Не пересекается с остальными.', ttl: 'Бессрочно' },
      en: { role: 'Alter ego', name: 'nocturne', bio: 'A separate circle. It never overlaps the rest.', ttl: 'No limit' },
      caps: { text: 1, audio: 1, video: 0, files: 0, call: 0, vcall: 0 }
    }
  };

  var lang = 'ru';
  var profile = 'work';

  /* ── разбивка строк (переживает смену языка) ────────────── */
  function splitLines(el) {
    var html = el.dataset.rawHtml;
    if (html === undefined) { html = el.innerHTML; el.dataset.rawHtml = html; }
    el.innerHTML = html.split(/<br\s*\/?>/i).map(function (l) {
      return '<span class="ln"><span class="ln-i">' + l.trim() + '</span></span>';
    }).join('');
  }
  $$('[data-split]').forEach(splitLines);

  /* ── i18n ───────────────────────────────────────────────── */
  function setLang(next) {
    if (next === lang) return;
    lang = next;
    root.lang = next;
    $$('[data-en]').forEach(function (el) {
      if (el.dataset.ruHtml === undefined) {
        el.dataset.ruHtml = el.dataset.rawHtml !== undefined ? el.dataset.rawHtml : el.innerHTML;
      }
      var html = next === 'en' ? el.dataset.en : el.dataset.ruHtml;
      if (el.hasAttribute('data-split')) {
        el.dataset.rawHtml = html; splitLines(el); el.classList.add('in');
      } else { el.innerHTML = html; }
    });
    $$('.lang-btn').forEach(function (b) { b.classList.toggle('is-on', b.dataset.lang === next); });
    paintProfile(true);
  }
  $$('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ── линза ──────────────────────────────────────────────── */
  var hudNow = $('#hudNow'), hudTtl = $('#hudTtl');
  var cardFace = $('#cardFace'), cardName = $('#cardName'), cardRole = $('#cardRole');
  var cardBio = $('#cardBio'), cardTtl = $('#cardTtl'), card = $('#card');
  var capRows = $$('#cardCaps div');

  function paintProfile(silent) {
    var p = P[profile], t = p[lang];
    root.dataset.profile = profile;

    if (hudNow) hudNow.textContent = t.role;
    if (cardRole) cardRole.textContent = t.role;
    if (cardName) cardName.textContent = t.name;
    if (cardBio) cardBio.textContent = t.bio;
    if (cardFace && cardFace.getAttribute('src') !== p.face) {
      cardFace.style.opacity = '0';
      setTimeout(function () { cardFace.src = p.face; cardFace.style.opacity = '1'; }, silent ? 0 : 180);
    }
    capRows.forEach(function (row, i) {
      var on = !!p.caps[row.dataset.k];
      setTimeout(function () { row.classList.toggle('on', on); }, silent ? 0 : 60 + i * 45);
    });

    $$('[data-p]').forEach(function (b) { b.classList.toggle('on', b.dataset.p === profile); });

    if (profile === 'guest') { startGuest(); }
    else {
      stopGuest();
      if (cardTtl) cardTtl.textContent = t.ttl;
      if (hudTtl) hudTtl.textContent = '';
      if (card) card.classList.remove('locked');
    }
  }

  function setProfile(next, withWipe) {
    if (!P[next]) return;
    profile = next;
    try { sessionStorage.setItem('pager.profile', next); } catch (e) {}
    if (withWipe && !RM) {
      var w = $('#wipe');
      w.classList.remove('go'); void w.offsetWidth; w.classList.add('go');
      setTimeout(function () { paintProfile(); }, 420);
    } else { paintProfile(); }
  }

  // порог обрабатывает свои кнопки отдельно — иначе шторка сработает дважды
  $$('[data-set]').forEach(function (b) {
    if (b.closest('#threshold')) return;
    b.addEventListener('click', function () { setProfile(b.dataset.set, true); });
  });

  /* ── гостевой таймер: 24 часа, сжатые до ~2 минут ───────── */
  var guestT = null, guestLeft = 24 * 3600;
  var TICK = 12 * 60; // за одну секунду проходит 12 «минут»

  function fmt(s) {
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = Math.floor(s % 60);
    return [h, m, x].map(function (n) { return String(n).padStart(2, '0'); }).join(':');
  }
  function guestTick() {
    guestLeft -= TICK;
    if (guestLeft <= 0) {
      guestLeft = 0; stopGuest();
      if (card) card.classList.add('locked');
      if (cardTtl) cardTtl.textContent = fmt(0);
      if (hudTtl) hudTtl.textContent = fmt(0);
      return;
    }
    if (cardTtl) cardTtl.textContent = fmt(guestLeft);
    if (hudTtl) hudTtl.textContent = fmt(guestLeft);
  }
  function startGuest() {
    if (card) card.classList.remove('locked');
    if (guestLeft <= 0) guestLeft = 24 * 3600;
    if (cardTtl) cardTtl.textContent = fmt(guestLeft);
    if (hudTtl) hudTtl.textContent = fmt(guestLeft);
    if (guestT || RM) return;
    guestT = setInterval(guestTick, 1000);
  }
  function stopGuest() { if (guestT) { clearInterval(guestT); guestT = null; } }

  var extend = $('#cardExtend');
  if (extend) extend.addEventListener('click', function () { guestLeft = 24 * 3600; startGuest(); });

  /* ── порог ──────────────────────────────────────────────── */
  var thr = $('#threshold'), hud = $('#hud');
  var seen = null;
  try { seen = sessionStorage.getItem('pager.profile'); } catch (e) {}

  function closeThreshold(next) {
    if (next) { profile = next; try { sessionStorage.setItem('pager.profile', next); } catch (e) {} }
    paintProfile(true);
    document.body.classList.remove('lock');
    if (thr) {
      thr.classList.add('out');
      setTimeout(function () { thr.hidden = true; }, RM ? 0 : 700);
    }
    setTimeout(function () { if (hud) hud.classList.add('on'); }, 900);
  }

  if (thr && !seen) {
    thr.hidden = false;
    document.body.classList.add('lock');
    $$('#thrList [data-set]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var w = $('#wipe');
        root.dataset.profile = b.dataset.set;
        if (!RM) { w.classList.remove('go'); void w.offsetWidth; w.classList.add('go'); }
        setTimeout(function () { closeThreshold(b.dataset.set); }, RM ? 0 : 420);
      });
    });
    $('#thrSkip').addEventListener('click', function () { closeThreshold('work'); });
    addEventListener('wheel', function once() {
      removeEventListener('wheel', once);
      if (!thr.hidden) closeThreshold('work');
    }, { passive: true, once: true });
  } else {
    if (seen && P[seen]) profile = seen;
    paintProfile(true);
    setTimeout(function () { if (hud) hud.classList.add('on'); }, 400);
  }

  /* ── ревилы ─────────────────────────────────────────────── */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
  $$('.split, .rise').forEach(function (el) { io.observe(el); });

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

  /* ── курсор ─────────────────────────────────────────────── */
  var cur = $('.cursor');
  if (cur && matchMedia('(hover:hover) and (pointer:fine) and (min-width:1024px)').matches && !RM) {
    var cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;
    var dot = $('.c-dot'), ring = $('.c-ring');
    addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
    }, { passive: true });
    (function loop() {
      rx += (cx - rx) * .17; ry += (cy - ry) * .17;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      document.body.classList.toggle('hot', !!e.target.closest('a,button,.card'));
    });
  }

  /* ── скрэмбл PAGER ID ───────────────────────────────────── */
  var idMega = $('#idMega');
  if (idMega) {
    var G = '0123456789ABCDEFHKLMNPRSTVXZ', FINAL = 'A147 0865';
    var idIo = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      idIo.disconnect();
      if (RM) { idMega.textContent = FINAL; return; }
      var t0 = performance.now(), chars = FINAL.split('');
      (function step(now) {
        var p = clamp((now - t0) / 950, 0, 1), rev = Math.floor(p * chars.length * 1.4);
        idMega.textContent = chars.map(function (c, i) {
          return c === ' ' ? ' ' : (i < rev ? c : G[(Math.random() * G.length) | 0]);
        }).join('');
        if (p < 1) requestAnimationFrame(step); else idMega.textContent = FINAL;
      })(t0);
    }, { threshold: .5 });
    idIo.observe(idMega);
  }

  /* ── скролл-системы ─────────────────────────────────────── */
  var nav = $('#nav'), hero = $('#hero');
  var darkEls = $$('.ink, .mp, .rm, .founder, .foot');
  var railLinks = $$('.rail a');
  var secs = railLinks.map(function (a) { return $(a.getAttribute('href')); });

  var mp = $('#multi'), mpFrames = $$('.mp-frame'), mpTexts = $$('.mp-text'), mpTicks = $$('.mp-ticks li');
  var mpAt = -1;

  var rmScroll = $('#rmScroll'), rmTrack = $('#rmTrack'), rmLine = $('#rmLine');
  var rmItems = $$('.rm-i'), rmStep = $('#rmStep'), rmRail = $('#rmRail');

  function frame() {
    var y = scrollY, vh = innerHeight;

    if (nav) nav.classList.toggle('stuck', y > 40);
    var probe = 34;
    var onDark = darkEls.some(function (s) {
      var r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom > probe;
    });
    if (nav) nav.classList.toggle('dark', onDark);
    document.body.classList.toggle('on-ink', onDark);

    // hero: граница расходится по мере входа
    if (hero && !RM) {
      var hp = clamp(y / vh, 0, 1);
      hero.style.setProperty('--bx', (62 - hp * 40).toFixed(1) + '%');
    }

    // мультипрофиль
    if (mp) {
      var r = mp.getBoundingClientRect(), total = mp.offsetHeight - vh;
      var p = clamp((-r.top) / total, 0, 1);
      var i = clamp(Math.floor(p * 3.999), 0, 3);
      if (i !== mpAt) {
        mpAt = i;
        mpFrames.forEach(function (f, k) { f.classList.toggle('is-on', k === i); });
        mpTexts.forEach(function (t, k) {
          t.classList.toggle('is-on', k === i);
          if (k === i) $$('.split', t).forEach(function (s) { s.classList.add('in'); });
        });
        mpTicks.forEach(function (t, k) { t.classList.toggle('is-on', k === i); t.classList.toggle('done', k < i); });
      }
    }

    // roadmap
    if (rmScroll && rmTrack) {
      var wide = innerWidth >= 1024, rr = rmScroll.getBoundingClientRect();
      if (wide) {
        var tot = rmScroll.offsetHeight - vh;
        var pp = clamp((-rr.top) / tot, 0, 1);
        var pad = parseFloat(getComputedStyle(root).getPropertyValue('--pad')) || 40;
        var travel = Math.max(0, rmTrack.scrollWidth - innerWidth + pad * 2);
        rmTrack.style.transform = 'translate3d(' + (-travel * pp) + 'px,0,0)';
        if (rmLine) rmLine.style.transform = 'scaleX(' + (.05 + pp * .95) + ')';
        var live = Math.round(pp * (rmItems.length - 1));
        rmItems.forEach(function (it, k) { it.classList.toggle('live', k <= live); });
        if (rmStep) rmStep.textContent = String(live + 1).padStart(2, '0') + ' / 0' + rmItems.length;
        if (rmRail) rmRail.style.transform = 'scaleX(' + pp.toFixed(3) + ')';
      } else {
        rmTrack.style.transform = '';
        var vp = clamp((vh * .72 - rr.top) / (rr.height * .78), 0, 1);
        if (rmLine) rmLine.style.transform = 'scaleY(' + vp + ')';
        rmItems.forEach(function (it) {
          it.classList.toggle('live', it.getBoundingClientRect().top < vh * .82);
        });
      }
    }

    // рельс
    var active = 0;
    secs.forEach(function (s, k) { if (s && s.getBoundingClientRect().top <= vh * .38) active = k; });
    railLinks.forEach(function (a, k) { a.classList.toggle('is-on', k === active); });
  }

  var tick = false;
  function req() { if (!tick) { tick = true; requestAnimationFrame(function () { frame(); tick = false; }); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);

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
