"use client";

import { useState } from "react";

const contexts = {
  personal: {
    label: "Личное", name: "Евгений", note: "Для тех, с кем можно быть без формальностей.", term: "Постоянно", accent: "mint", media: "/ledger/screen-profile.jpg", mediaAlt: "Личный профиль PAGER с идентификатором и разрешёнными способами связи",
    rules: [["Текстовые сообщения", "Разрешены"], ["Голосовые сообщения", "Разрешены"], ["Видеосообщения", "В beta"], ["Аудиозвонки", "Разрешены"], ["Видеозвонки", "Следующий этап"], ["Добавление в группы", "Разрешено"], ["Пересылка сообщений", "В beta"], ["Последняя активность", "Разрешена"]],
  },
  work: {
    label: "Работа", name: "Е. Мартынов", note: "Рабочее представление с понятным способом связи.", term: "Постоянно", accent: "blue", media: "/ledger/screen-access.jpg", mediaAlt: "Запрос PAGER с выбором профиля, разрешений и срока доступа",
    rules: [["Текстовые сообщения", "Разрешены"], ["Голосовые сообщения", "Разрешены"], ["Видеосообщения", "В beta"], ["Аудиозвонки", "По запросу"], ["Видеозвонки", "Следующий этап"], ["Добавление в группы", "По запросу"], ["Пересылка сообщений", "В beta"], ["Последняя активность", "Скрыта"]],
  },
  guest: {
    label: "Гостевое", name: "Evgeny", note: "Минимум информации для нового или временного контакта.", term: "24:00:00", accent: "gold", media: "/ledger/ui-temporary.png", mediaAlt: "Карточка временного доступа PAGER на 24 часа",
    rules: [["Текстовые сообщения", "Разрешены"], ["Голосовые сообщения", "В beta"], ["Видеосообщения", "Следующий этап"], ["Аудиозвонки", "Закрыты"], ["Видеозвонки", "Закрыты"], ["Добавление в группы", "Закрыто"], ["Пересылка сообщений", "В beta"], ["Последняя активность", "Скрыта"]],
  },
  other: {
    label: "Другое", name: "Evgeny", note: "Отдельный контекст для особого сценария общения.", term: "Постоянно", accent: "blue", media: "/ledger/screen-profile.jpg", mediaAlt: "Профиль PAGER для отдельного контекста общения",
    rules: [["Текстовые сообщения", "Разрешены"], ["Голосовые сообщения", "Разрешены"], ["Видеосообщения", "В beta"], ["Аудиозвонки", "По запросу"], ["Видеозвонки", "Следующий этап"], ["Добавление в группы", "По запросу"], ["Пересылка сообщений", "В beta"], ["Последняя активность", "Скрыта"]],
  },
} as const;

type ContextKey = keyof typeof contexts;

function stateClass(value: string) {
  if (value === "Разрешены" || value === "Разрешено") return "is-open";
  if (value === "Закрыты" || value === "Закрыто" || value === "Скрыта") return "is-closed";
  return "is-planned";
}

export function ProductDemo() {
  const [active, setActive] = useState<ContextKey>("personal");
  const context = contexts[active];

  return (
    <section className={`product-demo product-demo--${context.accent}`} aria-label="Интерактивная демонстрация контекстов PAGER">
      <div className="product-demo__tabs" role="tablist" aria-label="Контекст общения">
        {(Object.keys(contexts) as ContextKey[]).map((key, index) => (
          <button key={key} type="button" role="tab" id={`profile-tab-${key}`} aria-controls="profile-panel" aria-selected={active === key} tabIndex={active === key ? 0 : -1} onClick={() => setActive(key)}>
            <span>0{index + 1}</span>{contexts[key].label}
          </button>
        ))}
      </div>
      <div className="product-demo__body" id="profile-panel" role="tabpanel" aria-labelledby={`profile-tab-${active}`} aria-live="polite">
        <div className="product-demo__profile">
          <span className="product-demo__caption">Экран получателя</span>
          <figure className="product-demo__media">
            <img src={context.media} alt={context.mediaAlt} width="477" height="520" loading="lazy" />
          </figure>
          <div className="profile-dot" aria-hidden="true">{context.name.slice(0, 1)}</div>
          <h3>{context.name}</h3>
          <p>{context.note}</p>
          <dl><div><dt>Контекст</dt><dd>{context.label}</dd></div><div><dt>Срок доступа</dt><dd>{context.term}</dd></div></dl>
        </div>
        <div className="product-demo__rules">
          <div className="product-demo__rules-head"><div><span>Контакт видит</span><h3>Только разрешённое</h3></div><p>Владелец выбирает контекст и правила. Получатель видит только их результат.</p></div>
          <div className="rule-list">
            {context.rules.map(([label, state]) => <div key={label}><span>{label}</span><b className={stateClass(state)}>{state}</b></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
