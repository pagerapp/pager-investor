import { AccessSimulator } from "./components/AccessSimulator";
import { InvestorNavigation } from "./components/InvestorNavigation";
import { RelationshipStory } from "./components/RelationshipStory";
import { deckHref } from "./site-data";

const generations = [
  {
    number: "01",
    label: "Первое поколение",
    question: "Как отправить сообщение?",
    answer: "Передать информацию на расстоянии.",
  },
  {
    number: "02",
    label: "Второе поколение",
    question: "Как сделать общение мгновенным?",
    answer: "Ускорить связь и убрать дистанцию.",
  },
  {
    number: "03",
    label: "Следующее поколение",
    question: "Как определить правила общения?",
    answer: "Вернуть человеку контроль над доступностью.",
  },
];

const permissions = [
  ["Текстовые сообщения", "Разрешено"],
  ["Голосовые сообщения", "Разрешено"],
  ["Видеосообщения", "По запросу"],
  ["Аудиозвонки", "Закрыто"],
];

const betaHypotheses = [
  {
    number: "01",
    title: "PAGER ID вместо номера",
    copy: "Готовы ли люди начинать новое общение без раскрытия номера телефона?",
  },
  {
    number: "02",
    title: "Профиль выбирается для отношения",
    copy: "Помогает ли контекстная версия личности точнее задавать границы?",
  },
  {
    number: "03",
    title: "Правила становятся ценностью",
    copy: "Воспринимают ли пользователи способы и срок связи как отдельную ценность?",
  },
];

const growthSteps = [
  {
    number: "01",
    title: "Приглашение",
    copy: "Пользователь делится PAGER ID или контролируемой ссылкой на контакт.",
  },
  {
    number: "02",
    title: "Понятные условия",
    copy: "Получатель видит, кто приглашает, какой профиль открыт и какие способы связи предложены.",
  },
  {
    number: "03",
    title: "Новое отношение",
    copy: "После подтверждения связь продолжается внутри PAGER по согласованным правилам.",
  },
];

const growthMetrics = [
  "Приглашение → открытие",
  "Открытие → подтверждение",
  "Подтверждение → активное отношение",
  "Повторное приглашение",
];

const roadmap = [
  ["Сейчас", "Private beta", "Проверка ядра: ID, профиль, правила и срок."],
  ["Следующий этап", "Публичный запуск", "Масштабирование сценария управляемого контакта."],
  ["Дальше", "Слой цифрового доступа", "Единая модель правил для людей и сервисов."],
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
              <h1>Цифровое общение стерло границы приватности</h1>
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

          <div className="principles hero__principles" aria-label="Ключевая модель PAGER">
            <article>
              <span>01</span>
              <h3>PAGER ID</h3>
              <p>Контакт без раскрытия номера.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Запрос</h3>
              <p>Доступ начинается после подтверждения.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Профиль</h3>
              <p>Контекст определяет видимую версию личности.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Правила + срок</h3>
              <p>Способы общения и длительность задаёт владелец.</p>
            </article>
          </div>
        </section>

        <section
          className="why-now section"
          id="why-now"
          data-scene="02"
          data-act="2"
        >
          <div className="section__head">
            <SectionLabel number="02">Почему сейчас</SectionLabel>
            <h2>Мессенджеры ускорили связь, но не дали управлять доступом</h2>
            <p>
              Следующий шаг коммуникации — не ещё один чат, а возможность
              определять правила каждого нового отношения.
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

          <div className="problem-card">
            <div className="problem-card__copy">
              <span>КОНТАКТ СЕГОДНЯ</span>
              <h3>Получить контакт — почти всегда значит получить доступ</h3>
              <p>
                Сообщения, звонки и добавление в группы открываются раньше, чем
                человек определил границы общения.
              </p>
            </div>
            <div className="problem-card__visual">
              <img
                src="/ledger/product-hand.png"
                alt="Интерфейс PAGER на смартфоне"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              className="access-shift"
              aria-label="Переход от автоматического доступа к управляемому отношению"
            >
              <article className="access-shift__before">
                <span>СЕЙЧАС</span>
                <h4>Контакт</h4>
                <p>Автоматический доступ</p>
              </article>
              <div className="access-shift__bridge" aria-hidden="true">
                <span>PAGER</span>
                <i />
                <b>→</b>
              </div>
              <article className="access-shift__after">
                <span>СЛЕДУЮЩИЙ ШАГ</span>
                <h4>Отношение</h4>
                <p>Профиль · правила · срок</p>
              </article>
            </div>
          </div>
        </section>

        <section className="model section" id="model" data-scene="03" data-act="3">
          <div className="model__headline">
            <SectionLabel number="03">Новая единица продукта</SectionLabel>
            <h2>
              <BrandWord /> проектирует не чат. <BrandWord /> проектирует{" "}
              <em>отношение.</em>
            </h2>
            <p>
              Для каждого отношения владелец выбирает, кто получает доступ,
              какую версию личности видит и как может общаться.
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
              <p>Как и сколько можно общаться</p>
            </article>
          </div>
        </section>

        <section
          className="mechanics section section--black"
          id="mechanics"
          data-scene="04"
          data-act="4"
        >
          <div className="section__head section__head--light">
            <SectionLabel number="04" light>
              Механика
            </SectionLabel>
            <h2>Пять шагов превращают новый контакт в управляемое отношение</h2>
            <p>
              Сначала подтверждение. Затем профиль, способы связи и срок — без
              автоматического доступа ко всему сразу.
            </p>
          </div>
          <RelationshipStory />
          <AccessSimulator />
        </section>

        <section
          className="relationship-system section"
          id="relationship"
          data-scene="05"
          data-act="5"
        >
          <div className="section__head">
            <SectionLabel number="05">Система отношения</SectionLabel>
            <h2>Один ID. Разные контексты. Свои правила для каждого.</h2>
            <p>
              Один аккаунт остаётся основой. Видимая личность, доступные способы
              связи и срок меняются для конкретного отношения.
            </p>
          </div>

          <div className="relationship-system__scroll-hint" aria-hidden="true">
            <span>01</span>
            <i />
            <span>03</span>
            <b>Листайте модель →</b>
          </div>
          <div
            className="relationship-system__grid"
            role="region"
            aria-label="Три слоя управляемого отношения"
            tabIndex={0}
          >
            <article className="relationship-system__card relationship-system__card--id">
              <span>01 / ПУБЛИЧНАЯ ТОЧКА КОНТАКТА</span>
              <h3>Один постоянный <BrandWord /> ID</h3>
              <p>Номер телефона остаётся приватным.</p>
              <img
                src="/ledger/ui-id.png"
                alt="Интерфейс постоянного PAGER ID"
                width="1145"
                height="252"
                loading="lazy"
                decoding="async"
              />
            </article>
            <article className="relationship-system__card relationship-system__card--profile">
              <img
                src="/ledger/profile-architecture.png"
                alt="Контекстные профили внутри одного аккаунта PAGER"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
              />
              <div>
                <span>02 / КОНТЕКСТНАЯ ВИДИМОСТЬ</span>
                <h3>Вы остаётесь собой — но открываетесь по-разному</h3>
                <p>Личное, профессиональное и временное общение — внутри одного аккаунта.</p>
              </div>
            </article>
            <article className="relationship-system__card relationship-system__card--rules">
              <div className="relationship-system__copy">
                <span>03 / ПЕРСОНАЛЬНЫЕ УСЛОВИЯ</span>
                <h3>Каждый контакт получает свои правила</h3>
                <p>
                  Доступ можно расширить, ограничить или завершить отдельно от
                  остальных отношений.
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
              <div className="relationship-system__time">
                <span>СРОК ОТНОШЕНИЯ</span>
                <b>24:00:00</b>
                <p>Завершается автоматически.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="product section" id="product" data-scene="06" data-act="6">
          <div className="section__head">
            <SectionLabel number="06">Продукт сегодня</SectionLabel>
            <h2>Первая версия проверяет модель на реальном общении</h2>
            <p>
              Один аккаунт, постоянный ID, контекстные профили и персональные
              правила объединены в один пользовательский сценарий.
            </p>
          </div>
          <div className="product-proof" aria-label="Статус продукта">
            <div>
              <span>ЯДРО</span>
              <b>ID + запрос</b>
            </div>
            <div>
              <span>КОНТЕКСТ</span>
              <b>Профили</b>
            </div>
            <div>
              <span>КОНТРОЛЬ</span>
              <b>Правила + срок</b>
            </div>
            <div>
              <span>Q3 2026</span>
              <b>Private beta</b>
            </div>
          </div>

          <div className="screen-scroll-hint" aria-hidden="true">
            <span>01</span>
            <i />
            <span>03</span>
            <b>Листайте экраны →</b>
          </div>
          <div className="screen-grid" role="region" aria-label="Экраны продукта PAGER" tabIndex={0}>
            <article>
              <span>01 / Вход</span>
              <img src="/ledger/screen-logo.jpg" alt="Стартовый экран PAGER" width="477" height="1043" loading="lazy" decoding="async" />
              <div className="screen-grid__proof">
                <small>Продуктовый контур</small>
                <b>Единая точка входа в приватное общение</b>
              </div>
            </article>
            <article>
              <span>02 / Профиль</span>
              <img src="/ledger/screen-profile.jpg" alt="Экран профиля PAGER" width="477" height="1043" loading="lazy" decoding="async" />
              <div className="screen-grid__proof">
                <small>Контекстная личность</small>
                <b>Профиль и PAGER ID находятся в одном сценарии</b>
              </div>
            </article>
            <article>
              <span>03 / Доступ</span>
              <img src="/ledger/screen-access.jpg" alt="Экран доступа PAGER" width="477" height="1043" loading="lazy" decoding="async" />
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
              <p>Это вопросы проверки, а не заявленные результаты.</p>
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
          className="growth section section--black"
          id="growth"
          data-scene="07"
          data-act="7"
        >
          <div className="section__head section__head--light">
            <SectionLabel number="07" light>
              Гипотеза роста
            </SectionLabel>
            <h2>Каждое новое отношение может приводить в PAGER следующего участника</h2>
            <p>
              Это проверяемый сценарий распространения, а не заявленный сетевой
              эффект. Получатель сначала видит контекст и условия связи.
            </p>
          </div>
          <div className="growth-scenario">
            <article className="growth-invite" aria-label="Пример приглашения PAGER">
              <div className="growth-invite__top">
                <span>PAGER / ПРИГЛАШЕНИЕ</span>
                <b>24 ЧАСА</b>
              </div>
              <div className="growth-invite__identity">
                <img
                  src="/ledger/profile-2.png"
                  alt="Профиль отправителя приглашения"
                  width="543"
                  height="724"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span>ПРОФЕССИОНАЛЬНЫЙ КОНТЕКСТ</span>
                  <strong>Е. Мартынов</strong>
                  <small>@PAGER ID</small>
                </div>
              </div>
              <div className="growth-invite__terms">
                <span>Сообщения <b>Разрешено</b></span>
                <span>Звонки <b>По запросу</b></span>
                <span>Срок <b>24 часа</b></span>
              </div>
              <a href="#mechanics">Посмотреть условия <span aria-hidden="true">↗</span></a>
              <p>Получатель видит контекст до установки и подтверждения связи.</p>
            </article>

            <div className="growth-loop">
              {growthSteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="growth-measures">
            <div>
              <span>PRIVATE BETA / ЧТО ИЗМЕРЯЕМ</span>
              <h3>Виральность начинается не с установки, а с принятого отношения</h3>
            </div>
            <ol>
              {growthMetrics.map((metric, index) => (
                <li key={metric}>
                  <span>0{index + 1}</span>
                  <b>{metric}</b>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="business section" id="business" data-scene="08" data-act="8">
          <div className="section__head">
            <SectionLabel number="08">Бизнес и рынок</SectionLabel>
            <h2>Базовая связь создаёт сеть. Управление отношениями создаёт платную ценность.</h2>
            <p>
              Текущая модель отделена от будущих направлений. Размер рынка будет
              рассчитан снизу вверх после проверки поведения private beta.
            </p>
          </div>

          <div className="business-now-next">
            <article>
              <span>ТЕКУЩАЯ МОДЕЛЬ</span>
              <h3>Free → Premium control</h3>
              <p>Базовый PAGER ID и запросы формируют сеть.</p>
              <p>Контексты, расширенные правила и автоматизация сроков формируют подписку.</p>
            </article>
            <article>
              <span>БУДУЩАЯ ОПЦИОНАЛЬНОСТЬ</span>
              <h3>Business access layer</h3>
              <p>Безопасный канал для связи бизнеса с клиентом без доступа к личному номеру.</p>
              <small>Направление развития, не текущий продукт и не подтверждённая выручка.</small>
            </article>
          </div>

          <div className="market-model" aria-label="Bottom-up модель рынка">
            <div className="market-model__intro">
              <span>BOTTOM-UP / БЕЗ АБСТРАКТНОГО TAM</span>
              <h3>Рынок считается через поведение продукта</h3>
              <p>Числа будут зафиксированы после private beta.</p>
            </div>
            <div className="market-formula" aria-label="Формула оценки рынка">
              <span>Целевые пользователи</span>
              <i>×</i>
              <span>Активация отношений</span>
              <i>×</i>
              <span>Платящая доля</span>
              <i>×</i>
              <span>ARPU</span>
            </div>
            <div className="market-assumptions">
              <article>
                <span>СТАРТОВЫЙ СЕГМЕНТ / ГИПОТЕЗА</span>
                <b>Люди с несколькими контекстами общения и высокой ценой нежелательного доступа.</b>
              </article>
              <article>
                <span>ПЛАТНАЯ ЦЕННОСТЬ / ГИПОТЕЗА</span>
                <b>Автоматизация профилей, правил и временного доступа.</b>
              </article>
            </div>
          </div>

          <div className="business-roadmap" id="roadmap">
            <div>
              <span>ПУТЬ РАЗВИТИЯ</span>
              <h3>От продукта для общения — к персональному слою доступа</h3>
            </div>
            <div className="roadmap-list">
              {roadmap.map(([stage, title, copy], index) => (
                <article key={stage}>
                  <span>0{index + 1}</span>
                  <small>{stage}</small>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final" id="next-step" data-scene="09" data-act="9">
          <div className="final__system" aria-hidden="true">
            <div className="final__core"><span>PAGER</span><b>КОНТРОЛЬ</b></div>
            <div className="final__node final__node--one"><span>ЛИЧНОЕ</span><b>Сообщения · Звонки</b></div>
            <div className="final__node final__node--two"><span>РАБОТА</span><b>Текст · Файлы</b></div>
            <div className="final__node final__node--three"><span>ВРЕМЕННОЕ</span><b>24:00:00</b></div>
            <i className="final__line final__line--one" />
            <i className="final__line final__line--two" />
            <i className="final__line final__line--three" />
          </div>
          <div className="final__content">
            <SectionLabel number="09" light>
              Следующий шаг
            </SectionLabel>
            <h2><BrandWord /> создаёт новую модель цифрового общения</h2>
            <p>Дать людям возможность самостоятельно определять правила доступности, видимости и коммуникации.</p>
            <strong>Контакт больше не означает автоматический доступ.</strong>
            <span className="final__status">Private beta · Q3 2026 · product demo по запросу</span>
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
