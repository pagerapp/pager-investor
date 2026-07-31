import { AccessSimulator } from "./components/AccessSimulator";
import { InvestorNavigation } from "./components/InvestorNavigation";
import { RelationshipStory } from "./components/RelationshipStory";
import { deckHref, profiles } from "./site-data";

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

const betaHypotheses = [
  {
    number: "01",
    title: "PAGER ID вместо номера",
    copy: "Проверить, готовы ли люди начинать новое общение без раскрытия номера телефона.",
  },
  {
    number: "02",
    title: "Профиль выбирается для отношения",
    copy: "Проверить, помогает ли контекстная версия личности точнее задавать границы общения.",
  },
  {
    number: "03",
    title: "Правила становятся ценностью",
    copy: "Проверить, воспринимают ли пользователи управление способами и сроком связи как отдельную ценность.",
  },
];

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

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Перейти к содержанию
      </a>

      <InvestorNavigation />

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
          <RelationshipStory />
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
          <div className="profiles__architecture">
            <img
              src="/ledger/profile-architecture.png"
              alt="Контекстные профили внутри одного аккаунта PAGER"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>ОДИН АККАУНТ / ОДИН PAGER ID</span>
              <h3>Вы остаетесь собой — но открываетесь по-разному.</h3>
              <p>
                Личное, профессиональное и временное общение существуют внутри
                одного аккаунта.
              </p>
              <div className="context-list">
                <span>Личное</span>
                <span>Работа</span>
                <span>Временное</span>
                <span>Другое</span>
              </div>
            </div>
          </div>
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
          <div className="rules__temporary">
            <div className="rules__temporary-visual">
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
            <div className="rules__temporary-copy">
              <span>СРОК / 05</span>
              <h3>Не каждое отношение должно быть постоянным</h3>
              <p>
                Доступ может завершиться автоматически — без блокировки,
                конфликта или ручной очистки контактов.
              </p>
            </div>
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
              <div className="screen-grid__proof">
                <small>Продуктовый контур</small>
                <b>Единая точка входа в приватное общение</b>
              </div>
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
              <div className="screen-grid__proof">
                <small>Контекстная личность</small>
                <b>Профиль и PAGER ID находятся в одном сценарии</b>
              </div>
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
              <div className="screen-grid__proof">
                <small>Управляемое отношение</small>
                <b>Способы связи открываются выборочно</b>
              </div>
            </article>
          </div>
          <div className="beta-theses" aria-label="Гипотезы private beta">
            <div className="beta-theses__intro">
              <span>PRIVATE BETA / Q3 2026</span>
              <h3>Что должна подтвердить первая версия</h3>
              <p>
                Это вопросы проверки, а не заявленные результаты. Метрики будут
                зафиксированы после запуска private beta.
              </p>
            </div>
            <div className="beta-theses__list">
              {betaHypotheses.map((hypothesis) => (
                <article key={hypothesis.number}>
                  <span>{hypothesis.number}</span>
                  <h4>{hypothesis.title}</h4>
                  <p>{hypothesis.copy}</p>
                </article>
              ))}
            </div>
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
              <BrandWord />
              <br />
              монетизирует
              <br />
              расширенное управление
              <br />
              цифровыми отношениями
            </h2>
          </div>
          <div className="business__model">
            <article>
              <span>FREE</span>
              <h3>Базовое общение</h3>
              <p>Создает сеть и привычку использовать PAGER ID.</p>
              <small>PAGER ID · запросы · базовые способы связи</small>
            </article>
            <div aria-hidden="true">→</div>
            <article>
              <span>PAID</span>
              <h3>Расширенное управление</h3>
              <p>
                Контекстами, правилами и сроками создает платную ценность.
              </p>
              <small>Контексты · персональные правила · временный доступ</small>
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
              <a href={deckHref}>Pitch deck + product demo <Arrow /></a>
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
            <span className="final__status">
              Private beta · Q3 2026 · product demo по запросу
            </span>
            <a className="button button--white" href={deckHref}>
              Запросить deck и product demo <Arrow />
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
