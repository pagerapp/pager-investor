"use client";

import { useEffect, useState } from "react";

const mechanics = [
  ["01", "Найти человека", "по PAGER ID, без раскрытия номера телефона."],
  ["02", "Отправить запрос", "общение начинается только после подтверждения."],
  ["03", "Выбрать профиль", "определить, что именно увидит этот контакт."],
  ["04", "Настроить правила", "выбрать доступные способы взаимодействия."],
  ["05", "Начать общение", "у отношения появляются собственные условия."],
] as const;

export function RelationshipStory() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>("[data-relationship-step]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveStep(Number((visible.target as HTMLElement).dataset.relationshipStep));
        }
      },
      { rootMargin: "-24% 0px -42%", threshold: [0.15, 0.45, 0.75] },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const current = mechanics[activeStep];

  return (
    <div className="mechanics-story">
      <div className="mechanics-list">
        {mechanics.map(([number, title, copy], index) => (
          <article
            key={number}
            className={activeStep === index ? "is-active" : ""}
            data-relationship-step={index}
          >
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <i aria-hidden="true">→</i>
          </article>
        ))}
      </div>

      <aside className="relationship-console" aria-label="Текущее состояние отношения">
        <div className="relationship-console__top">
          <span>ОТНОШЕНИЕ</span>
          <b>0{activeStep + 1} / 05</b>
        </div>
        <div className="relationship-console__identity">
          <div className="relationship-console__avatar">
            <img
              src="/ledger/profile-2.png"
              alt=""
              width="543"
              height="724"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <span>{current[0] === "01" ? "PAGER ID" : current[1]}</span>
            <strong>{current[1]}</strong>
          </div>
        </div>
        <p>{current[2]}</p>
        <div className="relationship-console__permissions">
          <span>Текстовые сообщения <b>Разрешено</b></span>
          <span>Аудиозвонки <b>Закрыто</b></span>
          <span>Срок <b>24:00:00</b></span>
        </div>
        <div className="relationship-console__progress" aria-hidden="true">
          {mechanics.map(([number], index) => (
            <i className={index <= activeStep ? "is-complete" : ""} key={number} />
          ))}
        </div>
      </aside>
    </div>
  );
}
