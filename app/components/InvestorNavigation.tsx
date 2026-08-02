"use client";

import { useEffect, useRef, useState } from "react";
import { acts, deckHref } from "../site-data";

export function InvestorNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAct, setActiveAct] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    if (menuOpen) firstMenuLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuOpen) return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-is-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const actStarts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-act]"),
    );
    if (!actStarts.length) return;

    let frame = 0;
    const updateAct = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const readingLine = window.scrollY + window.innerHeight * 0.24;
        const currentAct = actStarts.reduce((latest, act) => {
          if (act.offsetTop > readingLine) return latest;
          return Number(act.dataset.act ?? 1) - 1;
        }, 0);
        setActiveAct(currentAct);
      });
    };

    const settleHash = () => {
      updateAct();
      const target = window.location.hash
        ? document.querySelector<HTMLElement>(window.location.hash)
        : null;
      if (!target) return;
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
        updateAct();
      });
    };

    const resizeObserver = new ResizeObserver(updateAct);
    resizeObserver.observe(document.body);
    void document.fonts.ready.then(settleHash);
    window.addEventListener("load", settleHash, { once: true });
    window.addEventListener("hashchange", settleHash);
    window.addEventListener("scroll", updateAct, { passive: true });
    window.addEventListener("resize", updateAct);
    updateAct();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("hashchange", settleHash);
      window.removeEventListener("scroll", updateAct);
      window.removeEventListener("resize", updateAct);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="utility-bar">
        <span className="utility-bar__desktop">PRIVATE COMMUNICATION / 2026</span>
        <span className="utility-bar__mobile">PAGER / 2026</span>
        <span>ИНВЕСТИЦИОННАЯ ПРЕЗЕНТАЦИЯ</span>
      </div>

      <header className="site-header">
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#model">Модель</a>
          <a href="#mechanics">Демо</a>
          <a href="#product">Продукт</a>
        </nav>

        <a className="wordmark" href="#top" aria-label="PAGER — к началу">
          PAGER
        </a>

        <div className="header-actions">
          <a href="#growth">Рост</a>
          <a className="header-cta" href={deckHref}>
            Получить deck <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          ref={toggleRef}
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <nav className="act-progress" aria-label="Прогресс презентации">
        <div className="act-progress__current">
          <b>{acts[activeAct][0]}</b>
          <span>/ {acts.length}</span>
        </div>
        <ol>
          {acts.map(([number, label, href], index) => (
            <li className={index === activeAct ? "is-active" : ""} key={number}>
              <a
                href={href}
                aria-current={index === activeAct ? "step" : undefined}
                aria-label={`${number}. ${label}`}
              >
                <i />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
        <small>{acts[activeAct][1]}</small>
      </nav>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <a ref={firstMenuLinkRef} href="#model" onClick={closeMenu}>
          Модель <span>01</span>
        </a>
        <a href="#mechanics" onClick={closeMenu}>
          Демо <span>02</span>
        </a>
        <a href="#product" onClick={closeMenu}>
          Продукт <span>03</span>
        </a>
        <a href="#business" onClick={closeMenu}>
          Бизнес и рынок <span>08</span>
        </a>
        <a href="#growth" onClick={closeMenu}>
          Гипотеза роста <span>07</span>
        </a>
        <a href={deckHref} onClick={closeMenu}>
          Получить pitch deck <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
