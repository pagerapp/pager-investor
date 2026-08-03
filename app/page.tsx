import { ProductDemo } from "./components/ProductDemo";

const contactHref = "mailto:martynov.usa@gmail.com?subject=PAGER%20%E2%80%94%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BF%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%B8";

const stages = [
  ["01", "Передать сообщение", "Почта и SMS сделали связь возможной."],
  ["02", "Общаться мгновенно", "Мессенджеры убрали расстояние и ожидание."],
  ["03", "Выбирать, как именно общаться", "PAGER добавляет контекст, согласие и понятные правила."],
];

const productToday = [
  ["Уже собрано", ["Регистрация", "PAGER ID", "Поиск по ID", "Запросы на контакт", "1:1-диалоги", "Базовый профиль"]],
  ["Проверяем в private beta", ["Контекстные профили", "Управление способами общения", "Гостевой профиль", "Временный доступ", "Понятность правил"]],
  ["Следующий этап", ["Аудио- и видеозвонки", "Расширенные профили", "Дополнительные настройки приватности", "Бизнес-сценарии", "API"]],
];

const offers = [
  ["Premium PAGER ID", "Короткий, запоминающийся идентификатор для личного или профессионального использования.", "После beta"],
  ["Расширенные профили", "Больше контекстов, вариантов представления и настроек для разных типов общения.", "После beta"],
  ["Возможности приложения", "Дополнительные способы коммуникации и более детальный контроль приватности.", "Гипотеза"],
  ["B2B / API", "Безопасная связь бизнеса с клиентами без раскрытия личных номеров сотрудников.", "B2B гипотеза"],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="PAGER — к началу">PAGER</a>
        <nav aria-label="Навигация по странице">
          <a href="#difference">Продукт</a>
          <a href="#demo">Демо</a>
          <a href="#today">Статус</a>
          <a href="#business">Бизнес</a>
        </nav>
        <a className="topbar__cta" href={contactHref}>Запросить материалы <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero__copy">
            <p className="kicker">Новая модель приватного общения</p>
            <h1>Цифровое общение стирает границы приватности <em>PAGER возвращает вам контроль.</em></h1>
            <p className="hero__thesis">Я остаюсь собой, но открываюсь по-разному.</p>
          </div>

            <div className="hero__visual" aria-label="Интерфейс PAGER: профиль общения, правила доступа и чат">
            <picture>
              <source media="(max-width: 700px)" srcSet="/pager-assets/hero-mobile.png" />
              <img src="/pager-assets/hero-desktop.png" alt="Интерфейс PAGER с профилями общения, правилами доступа и чатом" width="1672" height="941" fetchPriority="high" />
            </picture>
          </div>

          <div className="hero__bottom">
            <div className="hero__actions">
              <a className="button button--dark" href={contactHref}>Запросить презентацию <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#how">Посмотреть, как это работает <span aria-hidden="true">↓</span></a>
            </div>
            <div className="launches" aria-label="Сроки запуска">
              <span>Private beta <b>Q3 2026</b></span>
              <span>App Store / Google Play <b>Q1 2027</b></span>
            </div>
          </div>
        </section>

        <section className="problem section" id="difference">
          <div className="section-label"><span>01</span> Почему сейчас</div>
          <div className="problem__lead">
            <h2>Мы научились быстро связываться.<br />Но не научились выбирать границы.</h2>
            <p>Мессенджеры сделали общение мгновенным. Вместе с этим доступ к человеку часто стал автоматическим: сообщение, звонок, добавление в группу и видимость активности появляются раньше, чем мы успеваем выбрать формат общения.</p>
          </div>
          <div className="generation-grid">
            {stages.map(([number, title, copy], index) => (
              <article className={`generation generation--${index + 1}`} key={number}>
                <span className="generation__number">{number}</span>
                <div className="generation__visual" aria-hidden="true">
                  {index === 0 && <><i>SMS</i><i>→</i></>}
                  {index === 1 && <><i>chat</i><i>•••</i></>}
                  {index === 2 && <><i>@id</i><i>✓</i><i>24h</i></>}
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="identity">
          <div className="identity__statement">
            <div className="section-label section-label--light"><span>02</span> Что такое PAGER</div>
            <h2>Один человек.<br /><em>Несколько способов</em><br />быть на связи.</h2>
            <p>PAGER — мессенджер, где профиль и способы общения зависят от контекста.</p>
          </div>
          <div className="identity__visual">
            <picture>
              <source media="(max-width: 700px)" srcSet="/pager-assets/contexts-mobile.png" />
              <img src="/pager-assets/contexts-desktop.png" alt="Примеры личного, рабочего и гостевого контекста в PAGER" width="1672" height="941" loading="lazy" />
            </picture>
            <div className="identity__note">Это не разные аккаунты и не фальшивые личности.<br /><strong>Меняется только то, что видит конкретный контакт.</strong></div>
          </div>
        </section>

        <section className="how section" id="how">
          <div className="how__header">
            <div className="section-label"><span>03</span> Как начинается общение</div>
            <h2>Сначала запрос.<br />Затем — выбранный<br /><em>формат общения.</em></h2>
          </div>
          <ol className="how__steps">
            <li><span>01</span><div><h3>Найти</h3><p>Найдите человека по PAGER ID — без раскрытия номера телефона.</p></div></li>
            <li><span>02</span><div><h3>Отправить запрос</h3><p>Выберите, в каком контексте хотите начать общение, и отправьте запрос.</p></div></li>
            <li><span>03</span><div><h3>Получатель решает</h3><p>Человек видит ваш запрос и выбирает профиль и способы связи для этого контакта.</p></div></li>
            <li><span>04</span><div><h3>Начать разговор</h3><p>После подтверждения вы видите только разрешённое. Гостевой профиль действует 24 часа.</p></div></li>
          </ol>
          <aside className="guest-card">
            <span>Временный доступ</span>
            <strong>24:00:00</strong>
            <p>Только гостевой профиль. Доступ можно продлить или сделать постоянным после начала общения.</p>
          </aside>
        </section>

        <section className="demo-section" id="demo">
          <div className="demo-section__intro">
            <div className="section-label section-label--light"><span>04</span> Демо механики</div>
            <h2>Один PAGER ID.<br />Разные правила<br /><em>для разных людей.</em></h2>
            <p>Переключите контекст — мы покажем экран получателя: профиль, разрешения и срок доступа.</p>
          </div>
          <ProductDemo />
        </section>

        <section className="today section" id="today">
          <div className="today__intro">
            <div className="section-label"><span>05</span> Продукт сегодня</div>
            <h2>Не обещаем всё.<br /><em>Показываем, что строим.</em></h2>
          </div>
          <div className="today__grid">
            {productToday.map(([title, items], index) => (
              <article className={index === 1 ? "today__featured" : ""} key={title}>
                <span>0{index + 1}</span><h3>{title}</h3>
                <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="today__proof">
            <div className="today__proof-copy">
              <div className="section-label"><span>↗</span> Product proof</div>
              <h3>Правила видны до начала разговора.</h3>
              <p>Профиль, способы связи и срок доступа собраны в одном понятном экране. Это и есть продуктовая гипотеза PAGER — сначала выбрать формат общения, затем начать диалог.</p>
            </div>
            <figure className="today__proof-media">
              <img src="/ledger/screen-access.jpg" alt="Экран PAGER с выбором профиля, разрешений и срока доступа" width="477" height="1043" loading="lazy" />
              <figcaption>Пример экрана профиля общения и разрешений</figcaption>
            </figure>
          </div>
          <div className="hypotheses">
            <p>Гипотезы, которые проверяем</p>
            <ol>
              <li>Люди готовы начинать общение без раскрытия номера телефона.</li>
              <li>Контекстный профиль помогает проще объяснить границы общения.</li>
              <li>Пользователь воспринимает правила и срок доступа как самостоятельную ценность.</li>
            </ol>
          </div>
        </section>

        <section className="growth">
          <div className="growth__intro">
            <div className="section-label section-label--light"><span>06</span> Рост</div>
            <h2>Проверяем, может ли одно приглашение привести в PAGER следующего участника.</h2>
            <p>Не называем это вирусностью заранее — смотрим, как сценарий работает на реальных запросах.</p>
          </div>
          <div className="growth__path">
            {[
              "Пользователь находит контакт и отправляет запрос.",
              "Получатель видит, кто обращается и в каком контексте.",
              "Чтобы ответить, он знакомится с PAGER и создаёт свой профиль.",
              "Следующее общение уже начинается с понятных правил.",
            ].map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}
          </div>
        </section>

        <section className="business section">
          <div className="business__intro">
            <div className="section-label"><span>07</span> Потенциал модели</div>
            <h2>Что может стать платным<br />в PAGER</h2>
          </div>
          <div className="offer-grid">
            {offers.map(([title, copy, stage], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><small>{stage}</small></article>)}
          </div>
        </section>

        <section className="closing" id="contact">
          <div className="closing__grid" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="closing__content">
            <div className="section-label section-label--light"><span>08</span> Следующий шаг</div>
            <h2>Хотите увидеть<br />PAGER изнутри?</h2>
            <p>Мы показываем текущий продукт, план private beta и следующие этапы развития мессенджера.</p>
            <a className="button button--light" href={contactHref}>Запросить презентацию и материалы <span aria-hidden="true">↗</span></a>
          </div>
          <footer><span>PAGER © 2026</span><span>Private communication</span><a href="#top">Наверх ↑</a></footer>
        </section>
      </main>
    </>
  );
}
