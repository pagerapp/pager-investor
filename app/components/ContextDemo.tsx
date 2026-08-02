"use client";

import { useState } from "react";

const profiles = [
  {
    label: "Личное",
    name: "Евгений",
    image: "/ledger/profile-1.png",
    relation: "Близкий круг",
    expiry: "Постоянно",
    status: ["Разрешено", "Разрешено", "В beta", "В разработке", "Следующий этап", "В beta", "В beta", "В beta"],
  },
  {
    label: "Работа",
    name: "Е. Мартынов",
    image: "/ledger/profile-2.png",
    relation: "Профессиональный контекст",
    expiry: "Постоянно",
    status: ["Разрешено", "Разрешено", "В beta", "По запросу", "Следующий этап", "В beta", "В beta", "В beta"],
  },
  {
    label: "Гостевое",
    name: "Evgeny",
    image: "/ledger/profile-3.png",
    relation: "Временное общение",
    expiry: "24:00:00",
    status: ["Разрешено", "В beta", "В beta", "Закрыто", "Следующий этап", "В beta", "В beta", "В beta"],
  },
] as const;

const permissions = [
  "Текстовые сообщения", "Голосовые сообщения", "Видеосообщения", "Аудиозвонки",
  "Видеозвонки", "Добавление в группы", "Пересылка сообщений", "Последняя активность",
] as const;

export function ContextDemo() {
  const [active, setActive] = useState(0);
  const profile = profiles[active];

  return (
    <section className="context-demo" aria-label="Демонстрация контекстного профиля">
      <div className="context-demo__nav" role="tablist" aria-label="Контексты общения">
        <span>ВЫБЕРИТЕ КОНТЕКСТ</span>
        <div>
          {profiles.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              <i>0{index + 1}</i>{item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="context-demo__canvas">
        <aside className="context-demo__identity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.image} alt={`Профиль «${profile.label}»`} width="543" height="724" />
          <div><span>КОНТАКТ ВИДИТ</span><h3>{profile.name}</h3><p>{profile.relation}</p></div>
          <dl><div><dt>PAGER ID</dt><dd>@PAGER ID</dd></div><div><dt>Срок доступа</dt><dd>{profile.expiry}</dd></div></dl>
        </aside>

        <div className="context-demo__permissions" aria-live="polite">
          <div className="context-demo__headline"><span>РАЗРЕШЁННЫЕ КАНАЛЫ</span><p>В интерфейсе рядом показана модель private beta: будущие функции не выданы за готовые.</p></div>
          <div className="context-demo__list">
            {permissions.map((permission, index) => <div key={permission}><span>{permission}</span><b className={profile.status[index] === "Разрешено" ? "is-open" : profile.status[index] === "Закрыто" ? "is-closed" : ""}>{profile.status[index]}</b></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
