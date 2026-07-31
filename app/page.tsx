"use client";

import { useEffect, useState } from "react";

const generations = [
  {
    number: "01",
    label: "Первое поколение",
    question: "Как отправить сообщение?",
    answer: "Главная задача: передать информацию на расстоянии.",
  },
  {
    number: "02",
    label: "Второе поколение",
    question: "Как сделать общение быстрее и удобнее?",
    answer: "Главная задача: сделать взаимодействие мгновенным.",
  },
  {
    number: "03",
    label: "Третье поколение",
    question: "Как определить правила этого общения?",
    answer: "Главная задача: вернуть человеку контроль над доступностью.",
  },
];

const mechanics = [
  ["01", "Найти человека", "по PAGER ID, без раскрытия номера телефона."],
  ["02", "Отправить запрос", "общение начинается только после подтверждения."],
  [
    "03",
    "Выбрать профиль",
    "определить, какое имя, фотографию и описание увидит контакт.",
  ],
  ["04", "Настроить правила", "выбрать доступные способы взаимодействия."],
  ["05", "Начать общение", "у отношения появляются собственные условия."],
];

const relationshipStates = [
  {
    label: "PAGER ID",
    title: "Найти человека",
    copy: "по PAGER ID, без раскрытия номера телефона.",
  },
  {
    label: "Запрос",
    title: "Отправить запрос",
    copy: "общение начинается только после подтверждения.",
  },
  {
    label: "Профиль",
    title: "Выбрать профиль",
    copy: "определить, какое имя, фотографию и описание увидит контакт.",
  },
  {
    label: "Правила",
    title: "Настроить правила",
    copy: "выбрать доступные способы взаимодействия.",
  },
  {
    label: "Отношение",
    title: "Начать общение",
    copy: "у отношения появляются собственные условия.",
  },
];

const profiles = [
  ["Личное", "/ledger/profile-1.png", "Близкий круг"],
  ["Работа", "/ledger/profile-2.png", "Профессиональный контекст"],
  ["Гостевое", "/ledger/profile-3.png", "Временное общение"],
  ["Другое", "/ledger/profile-4.png", "Отдельный круг"],
];

const permissions = [
  ["Текстовые сообщения", "Разрешено"],
  ["Голосовые сообщения", "Разрешено"],
  ["Видеосообщения", "По запросу"],
  ["Аудиозвонки", "Закрыто"],
  ["Видеозвонки", "Закрыто"],
  ["Добавление в группы", "Закрыто"],
  ["Пересылка сообщений", "Разрешено"],
  ["Последняя активность", "Скрыто"],
];

const roadmap = [
  [
    "Этап 1",
    "продукт управления доступностью",
    "Кто и как может связаться с человеком.",
  ],
  [
    "Этап 2",
    "стандарт безопасного контекстного общения",
    "Отношения, профили и правила как единая модель.",
  ],
  [
    "Этап 3",
    "персональный слой цифрового доступа",
    "Единые правила взаимодействия для людей и цифровых сервисов.",
  ],
];

const acts = [
  ["01", "Манифест PAGER", "#top"],
  ["02", "Эволюция цифрового общения", "#evolution"],
  ["03", "Новая единица продукта", "#model"],
  ["04", "Механика отношения", "#mechanics"],
  ["05", "PAGER ID", "#identity"],
  ["06", "Контекстная видимость", "#profiles"],
  ["07", "Персональные правила", "#rules"],
  ["08", "Продукт сегодня", "#product"],
  ["09", "Бизнес-модель", "#business"],
  ["10", "Путь развития", "#roadmap"],
];

const deckHref =
  "mailto:martynov.usa@gmail.com?subject=PAGER%20%E2%80%94%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20pitch%20deck&body=%D0%98%D0%BC%D1%8F%3A%0A%D0%A4%D0%BE%D0%BD%D0%B4%20%2F%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F%3A%0A%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D1%8E%D1%89%D0%B8%D0%B9%20%D1%87%D0%B5%D0%BA%3A%0A";

function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label ${light ? "section-label--light" : ""}`}>
      <span>{number}</span>
      <b>{children}</b>
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function BrandWord() {
  return <span className="brand-word">PAGER</span>;
}

function RelationshipThread({
  step,
  label,
  detail,
  light = false,
}: {
  step: number;
  label: string;
  detail: string;
  light?: boolean;
}) {
  return (
    <div
      className={`relationship-thread ${light ? "relationship-thread--light" : ""}`}
      aria-label={`Отношение: шаг ${step} из 5 — ${label}`}
    >
      <span className="relationship-thread__index">
        ОТНОШЕНИЕ · 0{step}/05
      </span>
      <span className="relationship-thread__avatar" aria-hidden="true">
        <img
          src="/ledger/profile-2.png"
          alt=""
          width="543"
          height="724"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="relationship-thread__copy">
        <b>{label}</b>
        <small>{detail}</small>
      </span>
      <span className="relationship-thread__progress" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((item) => (
          <i className={item <= step ? "is-complete" : ""} key={item} />
        ))}
      </span>
    </div>
  );
}

function AccessSimulator() {
  const [profileIndex, setProfileIndex] = useState(1);
  const [capabilities, setCapabilities] = useState([true, false, false]);
  const [duration, setDuration] = useState("24 часа");
  const activeProfile = profiles[profileIndex];
  const capabilityLabels = [
    "Текстовые сообщения",
    "Аудиозвонки",
    "Добавление в группы",
  ];

  const toggleCapability = (index: number) => {
    setCapabilities((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? !item : item)),
    );
  };

  return (
    <div className="access-lab" aria-label="Интерактивная модель отношения PAGER">
      <div className="access-lab__heading">
        <span>LIVE / МОДЕЛЬ ОТНОШЕНИЯ</span>
        <p>Измените профиль, правила и срок — получатель увидит только разрешённое.</p>
      </div>

      <div className="access-lab__controls">
        <fieldset>
          <legend>01 / Профиль</legend>
          <div className="access-lab__profiles">
            {profiles.map(([title, image], index) => (
              <button
                type="button"
                className={index === profileIndex ? "is-active" : ""}
                aria-pressed={index === profileIndex}
                onClick={() => setProfileIndex(index)}
                key={title}
              >
                <img src={image} alt="" width="543" height="724" />
                <span>{title}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>02 / Правила</legend>
          <div className="access-lab__toggles">
            {capabilityLabels.map((label, index) => (
              <button
                type="button"
                role="switch"
                aria-checked={capabilities[index]}
                onClick={() => toggleCapability(index)}
                key={label}
              >
                <span>{label}</span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>03 / Срок</legend>
          <div className="access-lab__duration">
            {["24 часа", "7 дней", "Постоянно"].map((item) => (
              <button
                type="button"
                className={duration === item ? "is-active" : ""}
                aria-pressed={duration === item}
                onClick={() => setDuration(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="access-lab__preview" aria-live="polite">
        <div className="access-lab__preview-top">
          <span>ПОЛУЧАТЕЛЬ ВИДИТ</span>
          <b>@PAGER ID</b>
        </div>
        <div className="access-lab__identity">
          <img
            src={activeProfile[1]}
            alt={`Профиль «${activeProfile[0]}»`}
            width="543"
            height="724"
          />
          <div>
            <span>{activeProfile[2]}</span>
            <strong>{activeProfile[0]}</strong>
          </div>
        </div>
        <div className="access-lab__result">
          {capabilityLabels.map((label, index) => (
            <span key={label}>
              {label}
              <b className={capabilities[index] ? "is-open" : ""}>
                {capabilities[index] ? "Разрешено" : "Закрыто"}
              </b>
            </span>
          ))}
        </div>
        <div className="access-lab__expires">
          <span>СРОК ОТНОШЕНИЯ</span>
          <b>{duration}</b>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [relationshipStep, setRelationshipStep] = useState(0);
  const [activeAct, setActiveAct] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-is-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>("[data-relationship-step]"),
    );
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleStep = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleStep) return;
        setRelationshipStep(
          Number(
            (visibleStep.target as HTMLElement).dataset.relationshipStep ?? 0,
          ),
        );
      },
      {
        rootMargin: "-28% 0px -48%",
        threshold: [0.15, 0.35, 0.65],
      },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

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

    updateAct();
    window.addEventListener("scroll", updateAct, { passive: true });
    window.addEventListener("resize", updateAct);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateAct);
      window.removeEventListener("resize", updateAct);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#content">
        Перейти к содержанию
      </a>

      <div className="utility-bar">
        <span>PRIVATE COMMUNICATION / 2026</span>
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
          <a href="#roadmap">Roadmap</a>
          <a className="header-cta" href={deckHref}>
            Получить deck <Arrow />
          </a>
        </div>

        <button
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
        <div className="act-progress__current" aria-live="polite">
          <b>{acts[activeAct][0]}</b>
          <span>/ 10</span>
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
        <a href="#model" onClick={closeMenu}>
          Модель <span>01</span>
        </a>
        <a href="#mechanics" onClick={closeMenu}>
          Демо <span>02</span>
        </a>
        <a href="#product" onClick={closeMenu}>
          Продукт <span>03</span>
        </a>
        <a href="#business" onClick={closeMenu}>
          Бизнес <span>04</span>
        </a>
        <a href="#roadmap" onClick={closeMenu}>
          Roadmap <span>05</span>
        </a>
        <a href={deckHref} onClick={closeMenu}>
          Получить pitch deck <Arrow />
        </a>
      </div>

      <main id="content">
        <section className="hero" id="top" data-scene="01" data-act="1">
          <div className="hero__stage">
            <div className="hero__word" aria-hidden="true">
              PAGER
            </div>

            <div className="hero__problem">
              <SectionLabel number="01">Манифест PAGER</SectionLabel>
              <p className="hero__eyebrow">Новая модель приватного общения</p>
              <h1>
                Цифровое общение
                <br />
                стерло границы
                <br />
                приватности
              </h1>
            </div>

            <div className="hero__solution">
              <span>Следующий шаг</span>
              <h2>
                <BrandWord /> возвращает вам контроль
              </h2>
              <p>Вы остаетесь собой — но открываетесь по-разному.</p>
              <div className="hero__product-formula" aria-label="Формула продукта">
                <span>PAGER ID</span>
                <i>+</i>
                <span>Профиль</span>
                <i>+</i>
                <span>Правила</span>
                <i>+</i>
                <span>Срок</span>
              </div>
              <div className="hero__actions">
                <a className="button button--black" href={deckHref}>
                  Получить pitch deck <Arrow />
                </a>
                <a className="text-link" href="#mechanics">
                  Смотреть демо <span>↓</span>
                </a>
              </div>
            </div>

            <img
              className="hero__phone"
              src="/gazu/hero-phone.png"
              alt="Телефон с логотипом PAGER"
              width="1122"
              height="1402"
              fetchPriority="high"
            />

            <div className="hero__release">
              <span>PRIVATE BETA</span>
              <b>Q3 2026</b>
              <i />
              <span>APP STORE / GOOGLE PLAY</span>
              <b>Q1 2027</b>
            </div>
          </div>
        </section>

        <section className="principles" aria-label="Ключевая модель PAGER">
          <article>
            <img
              src="/ledger/screen-logo.jpg"
              alt=""
              width="477"
              height="1043"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>01</span>
              <h2>
                <BrandWord /> ID
              </h2>
              <p>Публичная точка контакта вместо раскрытия номера.</p>
            </div>
          </article>
          <article>
            <img
              src="/ledger/screen-access.jpg"
              alt=""
              width="477"
              height="1043"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>02</span>
              <h2>Запрос</h2>
              <p>Контакт не становится доступом автоматически.</p>
            </div>
          </article>
          <article>
            <img
              src="/ledger/screen-profile.jpg"
              alt=""
              width="477"
              height="1043"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>03</span>
              <h2>Профиль</h2>
              <p>Каждое отношение получает нужную версию личности.</p>
            </div>
          </article>
          <article className="principles__text">
            <div>
              <span>04</span>
              <h2>Правила</h2>
              <p>Способы и срок общения определяет владелец контакта.</p>
            </div>
          </article>
        </section>

        <section
          className="evolution section"
          id="evolution"
          data-scene="02"
          data-act="2"
        >
          <div className="section__head">
            <SectionLabel number="02">Эволюция цифрового общения</SectionLabel>
            <h2>Каждое поколение решало новую проблему коммуникации</h2>
            <p>
              PAGER предлагает следующий шаг — дать человеку возможность
              определять правила собственного общения.
            </p>
          </div>
          <div className="generation-grid">
            {generations.map((generation) => (
              <article key={generation.number}>
                <span>{generation.number}</span>
                <small>{generation.label}</small>
                <h3>{generation.question}</h3>
                <p>{generation.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="problem-banner" data-scene="03">
          <div className="problem-banner__copy">
            <SectionLabel number="03" light>
              Контакт сегодня
            </SectionLabel>
            <h2>Получить контакт — почти всегда значит получить доступ</h2>
            <p>
              Сообщения, звонки, добавление в группы и другие способы
              взаимодействия открываются слишком рано — еще до того, как
              человек определил границы общения.
            </p>
          </div>
          <div className="problem-banner__visual">
            <img
              src="/ledger/product-hand.png"
              alt="PAGER на смартфоне"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            />
            <span className="problem-note problem-note--one">
              Входящий звонок
            </span>
            <span className="problem-note problem-note--two">Добавлен в чат</span>
            <span className="problem-note problem-note--three">
              Новое сообщение
            </span>
          </div>
          <div
            className="access-shift"
            aria-label="Переход от автоматического доступа к управляемому отношению"
          >
            <article className="access-shift__before">
              <span>СЕЙЧАС</span>
              <h3>Контакт</h3>
              <p>Автоматический доступ</p>
              <div>
                <b>Сообщения</b>
                <b>Звонки</b>
                <b>Группы</b>
              </div>
            </article>
            <div className="access-shift__bridge" aria-hidden="true">
              <span>PAGER</span>
              <i />
              <b>→</b>
            </div>
            <article className="access-shift__after">
              <span>СЛЕДУЮЩИЙ ШАГ</span>
              <h3>Отношение</h3>
              <p>Доступ после подтверждения</p>
              <div>
                <b>Профиль</b>
                <b>Правила</b>
                <b>Срок</b>
              </div>
            </article>
          </div>
        </section>

        <section
          className="model section"
          id="model"
          data-scene="04"
          data-act="3"
        >
          <div className="model__headline">
            <SectionLabel number="04">Новая единица продукта</SectionLabel>
            <h2>
              <BrandWord /> проектирует не чат.
              <br />
              <BrandWord /> проектирует <em>отношение.</em>
            </h2>
            <p>
              Для каждого отношения владелец выбирает, какой профиль показать и
              какие правила общения разрешить.
            </p>
          </div>
          <div className="relation-equation" aria-label="Модель отношения PAGER">
            <article>
              <span>01</span>
              <h3>Отношение</h3>
              <p>Кто получает доступ</p>
            </article>
            <b aria-hidden="true">+</b>
            <article>
              <span>02</span>
              <h3>Профиль</h3>
              <p>Что человек видит</p>
            </article>
            <b aria-hidden="true">+</b>
            <article>
              <span>03</span>
              <h3>Правила</h3>
              <p>Как можно общаться</p>
            </article>
          </div>
        </section>

        <section
          className="mechanics section section--black"
          id="mechanics"
          data-scene="05"
          data-act="4"
        >
          <div className="section__head section__head--light">
            <SectionLabel number="05" light>
              Механика
            </SectionLabel>
            <h2>
              Каждое новое общение начинается одинаково. Дальше — по вашим
              правилам.
            </h2>
            <p>
              Пять последовательных шагов превращают новый контакт в
              управляемое отношение.
            </p>
          </div>
          <div className="mechanics-story">
            <div className="mechanics-list">
              {mechanics.map(([number, title, copy], index) => (
                <article
                  key={number}
                  className={relationshipStep === index ? "is-active" : ""}
                  data-relationship-step={index}
                >
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <i aria-hidden="true">→</i>
                </article>
              ))}
            </div>

            <aside
              className="relationship-console"
              aria-label="Отношение, профиль и правила общения"
              aria-live="polite"
              style={
                {
                  "--relationship-progress": relationshipStep + 1,
                } as React.CSSProperties
              }
            >
              <div className="relationship-console__top">
                <span>ОТНОШЕНИЕ</span>
                <b>0{relationshipStep + 1} / 05</b>
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
                  <span>{relationshipStates[relationshipStep].label}</span>
                  <strong>{relationshipStates[relationshipStep].title}</strong>
                </div>
              </div>
              <p>{relationshipStates[relationshipStep].copy}</p>
              <div className="relationship-console__permissions">
                <span>
                  Текстовые сообщения <b>Разрешено</b>
                </span>
                <span>
                  Аудиозвонки <b>Закрыто</b>
                </span>
                <span>
                  Срок <b>24:00:00</b>
                </span>
              </div>
              <div
                className="relationship-console__progress"
                aria-hidden="true"
              >
                {relationshipStates.map((state, index) => (
                  <i
                    className={index <= relationshipStep ? "is-complete" : ""}
                    key={state.label}
                  />
                ))}
              </div>
            </aside>
          </div>
          <AccessSimulator />
        </section>

        <section
          className="id-showcase section"
          id="identity"
          data-scene="06"
          data-act="5"
        >
          <RelationshipThread
            step={1}
            label="PAGER ID"
            detail="Публичная точка контакта"
          />
          <div className="id-showcase__copy">
            <SectionLabel number="06">Публичная точка контакта</SectionLabel>
            <h2>
              Один аккаунт. Один постоянный <BrandWord /> ID.
            </h2>
            <p>
              Номер телефона остается приватным. Для начала общения достаточно
              публичного PAGER ID и подтвержденного запроса.
            </p>
          </div>
          <div className="id-showcase__visual">
            <img
              src="/ledger/ui-id.png"
              alt="Интерфейс постоянного PAGER ID"
              width="1145"
              height="252"
              loading="lazy"
              decoding="async"
            />
            <div className="id-sequence" aria-hidden="true">
              <span>НАЙТИ</span>
              <i>→</i>
              <span>ЗАПРОСИТЬ</span>
              <i>→</i>
              <b>ПОДТВЕРДИТЬ</b>
            </div>
          </div>
        </section>

        <section
          className="profiles section"
          id="profiles"
          data-scene="07"
          data-act="6"
        >
          <div className="section__head">
            <SectionLabel number="07">Контекстная видимость</SectionLabel>
            <h2>Один человек. Разные представления.</h2>
            <p>
              Каждый контакт видит только то представление, которое подходит
              этому контексту. У каждого профиля — свое имя, фотография и
              описание.
            </p>
          </div>
          <RelationshipThread
            step={2}
            label="Профиль"
            detail="Контекстная видимость"
          />
          <div className="profile-grid">
            {profiles.map(([title, image, caption], index) => (
              <article key={title}>
                <div className="profile-grid__image">
                  <img
                    src={image}
                    alt={`Профиль «${title}»`}
                    width="543"
                    height="724"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="multiprofile" data-scene="08">
          <RelationshipThread
            step={3}
            label="Один аккаунт"
            detail="Вы открываетесь по-разному"
            light
          />
          <div className="multiprofile__media">
            <img
              src="/ledger/profile-contexts.png"
              alt="Контекстные профили внутри одного аккаунта PAGER"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="multiprofile__copy">
            <SectionLabel number="08" light>
              Один аккаунт
            </SectionLabel>
            <h2>Вы остаетесь собой — но открываетесь по-разному.</h2>
            <p>
              Личное, профессиональное и временное общение существуют внутри
              одного аккаунта и одного PAGER ID.
            </p>
            <div className="context-list">
              <span>Личное</span>
              <span>Работа</span>
              <span>Временное</span>
              <span>Другое</span>
            </div>
          </div>
        </section>

        <section
          className="rules section section--black"
          id="rules"
          data-scene="09"
          data-act="7"
        >
          <RelationshipThread
            step={4}
            label="Правила"
            detail="Персональные условия"
            light
          />
          <div className="rules__copy">
            <SectionLabel number="09" light>
              Персональные условия
            </SectionLabel>
            <h2>Каждый контакт получает собственные правила общения</h2>
            <p>
              Изменение одного отношения не влияет на остальные. Доступ можно
              расширить, ограничить или отозвать в любой момент.
            </p>
          </div>
          <div className="permission-board">
            {permissions.map(([title, status]) => (
              <div key={title}>
                <span>{title}</span>
                <b
                  className={
                    status === "Разрешено"
                      ? "is-allowed"
                      : status === "По запросу"
                        ? "is-request"
                        : ""
                  }
                >
                  {status}
                </b>
              </div>
            ))}
          </div>
        </section>

        <section className="temporary section" data-scene="10">
          <RelationshipThread
            step={5}
            label="Срок"
            detail="Отношения с ограниченным сроком"
          />
          <div className="temporary__visual">
            <span className="timer">24:00:00</span>
            <img
              src="/ledger/ui-temporary.png"
              alt="Интерфейс временного доступа PAGER"
              width="1145"
              height="252"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="temporary__copy">
            <SectionLabel number="10">
              Отношения с ограниченным сроком
            </SectionLabel>
            <h2>Не каждое отношение должно быть постоянным</h2>
            <p>
              Доступ может завершиться автоматически — без блокировки, конфликта
              или ручной очистки контактов.
            </p>
          </div>
        </section>

        <section
          className="system section"
          id="system"
          data-scene="11"
        >
          <div className="section__head">
            <SectionLabel number="11">Один принцип</SectionLabel>
            <h2>
              Все механики <BrandWord /> являются следствиями управляемого доступа
            </h2>
            <p>
              Запрос, ID, профили, правила и срок отношений складываются в одну
              модель, а не в набор разрозненных функций.
            </p>
          </div>
          <div className="system-flow">
            {["PAGER ID", "Запрос", "Профиль", "Правила", "Срок"].map(
              (item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <b>{item}</b>
                  {index < 4 && <i aria-hidden="true">→</i>}
                </div>
              ),
            )}
          </div>
        </section>

        <section className="potential" data-scene="12">
          <div className="potential__image">
            <img
              src="/ledger/profile-system.png"
              alt="Система отношений, профилей и правил PAGER"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="potential__copy">
            <SectionLabel number="12" light>
              Больше, чем интерфейс
            </SectionLabel>
            <h2>
              Отдельную функцию можно скопировать. Накопленную модель отношений
              — значительно сложнее.
            </h2>
            <p>
              Со временем PAGER формирует персональную структуру контекстов,
              разрешений, сроков и истории взаимодействия.
            </p>
          </div>
        </section>

        <section
          className="product section"
          id="product"
          data-scene="13"
          data-act="8"
        >
          <div className="section__head">
            <SectionLabel number="13">Продукт сегодня</SectionLabel>
            <h2>
              Первая версия <BrandWord /> проверяет новую модель на реальном
              общении
            </h2>
            <p>
              Один аккаунт, постоянный ID, контекстные профили и персональные
              правила уже объединены в целостный пользовательский сценарий.
            </p>
          </div>
          <div className="product-proof" aria-label="Статус продукта">
            <div>
              <span>01</span>
              <b>Один аккаунт</b>
            </div>
            <div>
              <span>02</span>
              <b>Постоянный PAGER ID</b>
            </div>
            <div>
              <span>03</span>
              <b>Контекстные профили</b>
            </div>
            <div>
              <span>04</span>
              <b>Персональные правила</b>
            </div>
            <div>
              <span>Q3 2026</span>
              <b>Private beta</b>
            </div>
            <div>
              <span>Q1 2027</span>
              <b>App Store / Google Play</b>
            </div>
          </div>
          <div className="screen-scroll-hint" aria-hidden="true">
            <span>01</span>
            <i />
            <span>03</span>
            <b>Листайте экраны →</b>
          </div>
          <div
            className="screen-grid"
            role="region"
            aria-label="Экраны продукта PAGER"
            tabIndex={0}
          >
            <article>
              <span>01 / Вход</span>
              <img
                src="/ledger/screen-logo.jpg"
                alt="Стартовый экран PAGER"
                width="477"
                height="1043"
                loading="lazy"
                decoding="async"
              />
            </article>
            <article>
              <span>02 / Профиль</span>
              <img
                src="/ledger/screen-profile.jpg"
                alt="Экран профиля PAGER"
                width="477"
                height="1043"
                loading="lazy"
                decoding="async"
              />
            </article>
            <article>
              <span>03 / Доступ</span>
              <img
                src="/ledger/screen-access.jpg"
                alt="Экран доступа PAGER"
                width="477"
                height="1043"
                loading="lazy"
                decoding="async"
              />
            </article>
          </div>
        </section>

        <section
          className="business section section--black"
          id="business"
          data-scene="14"
          data-act="9"
        >
          <div className="business__headline">
            <SectionLabel number="14" light>
              Бизнес-модель
            </SectionLabel>
            <h2>
              <BrandWord /> монетизирует расширенное управление цифровыми
              отношениями
            </h2>
          </div>
          <div className="business__model">
            <article>
              <span>FREE</span>
              <h3>Базовое общение</h3>
              <p>Создает сеть и привычку использовать PAGER ID.</p>
            </article>
            <div aria-hidden="true">→</div>
            <article>
              <span>PAID</span>
              <h3>Расширенное управление</h3>
              <p>
                Контекстами, правилами и сроками создает платную ценность.
              </p>
            </article>
          </div>
          <p className="business__note">
            Базовое общение создает сеть. Расширенное управление цифровыми
            отношениями создает платную ценность.
          </p>
          <div className="investor-status" aria-label="Подтвержденный статус проекта">
            <article>
              <span>СТАДИЯ</span>
              <b>Работающий пользовательский сценарий</b>
            </article>
            <article>
              <span>PRIVATE BETA</span>
              <b>Q3 2026</b>
            </article>
            <article>
              <span>APP STORE / GOOGLE PLAY</span>
              <b>Q1 2027</b>
            </article>
            <article>
              <span>ИНВЕСТИЦИОННЫЕ МАТЕРИАЛЫ</span>
              <a href={deckHref}>Получить pitch deck <Arrow /></a>
            </article>
          </div>
        </section>

        <section
          className="roadmap section"
          id="roadmap"
          data-scene="15"
          data-act="10"
        >
          <div className="section__head">
            <SectionLabel number="15">Путь развития</SectionLabel>
            <h2>От продукта для общения — к персональному слою доступа</h2>
            <p>Каждый этап расширяет одну и ту же модель отношений.</p>
          </div>
          <div className="roadmap-status" aria-label="Подтвержденные даты запуска">
            <span>
              <b>Q3 2026</b>
              Private beta
            </span>
            <i aria-hidden="true">→</i>
            <span>
              <b>Q1 2027</b>
              App Store / Google Play
            </span>
          </div>
          <div className="roadmap-list">
            {roadmap.map(([stage, title, copy], index) => (
              <article key={stage}>
                <span>0{index + 1}</span>
                <small>{stage}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final" id="next-step" data-scene="16">
          <div className="final__system" aria-hidden="true">
            <div className="final__core"><span>PAGER</span><b>КОНТРОЛЬ</b></div>
            <div className="final__node final__node--one">
              <span>ЛИЧНОЕ</span><b>Сообщения · Звонки</b>
            </div>
            <div className="final__node final__node--two">
              <span>РАБОТА</span><b>Текст · Файлы</b>
            </div>
            <div className="final__node final__node--three">
              <span>ВРЕМЕННОЕ</span><b>24:00:00</b>
            </div>
            <i className="final__line final__line--one" />
            <i className="final__line final__line--two" />
            <i className="final__line final__line--three" />
          </div>
          <div className="final__content">
            <SectionLabel number="16" light>
              Следующий шаг
            </SectionLabel>
            <h2>
              <BrandWord /> создает новую модель цифрового общения
            </h2>
            <p>
              Дать людям возможность самостоятельно определять правила
              доступности, видимости и коммуникации.
            </p>
            <strong>
              Контакт больше не означает автоматический доступ.
            </strong>
            <a className="button button--white" href={deckHref}>
              Получить pitch deck <Arrow />
            </a>
          </div>
          <footer>
            <span>PAGER © 2026</span>
            <span>PRIVATE COMMUNICATION</span>
            <a href="#top">Наверх ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}
