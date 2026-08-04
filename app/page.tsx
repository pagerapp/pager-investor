import { ProductDemo } from "./components/ProductDemo";

const contactHref = "mailto:martynov.usa@gmail.com?subject=PAGER%20%E2%80%94%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BF%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%B8";

const stages = [
  ["01", "EMAIL", "Передать сообщение — почта сделала связь возможной.", "/ledger/screen-access.jpg", "Сообщение PAGER до подтверждения запроса"],
  ["02", "SMS", "Связаться напрямую — SMS сделали связь мгновенной.", "/ledger/screen-profile.jpg", "Активный чат PAGER с выбранным профилем"],
  ["03", "МЕССЕНДЖЕРЫ", "Общаться мгновенно — мессенджеры убрали расстояние.", "/ledger/ui-permissions.png", "Экран выбора способов общения в PAGER"],
  ["04", "PAGER", "Общаться с выбранными границами — профиль и правила помогают заранее выбрать формат.", "/ledger/hero-screen-request.jpg", "Запрос PAGER с профилем и разрешениями"],
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
        <span className="topbar__meta">Private communication / 2026</span>
        <nav aria-label="Навигация по странице">
          <a href="#difference">Продукт</a>
          <a href="#demo">Демо</a>
          <a href="#today">Статус</a>
          <a href="#business">Бизнес</a>
        </nav>
        <a className="topbar__cta" href={contactHref}>Запросить материалы <span aria-hidden="true">↗</span></a>
        <details className="topbar__menu">
          <summary aria-label="Открыть меню"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></summary>
          <nav aria-label="Мобильная навигация">
            <a href="#difference">Продукт</a>
            <a href="#demo">Демо</a>
            <a href="#today">Статус</a>
            <a href="#business">Бизнес</a>
          </nav>
        </details>
      </header>

      <div className="cover-band" aria-label="PAGER Investor Brief">
        <span>PAGER / INVESTOR BRIEF</span>
        <span>2026</span>
        <p>Мессенджер, где для каждого контакта можно выбрать профиль и правила общения.</p>
      </div>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="kicker"><span>01</span> Новая модель приватного общения</p>
              <h1>Цифровое общение стирает границы приватности <em>PAGER возвращает вам контроль.</em></h1>
              <div className="hero__thesis-block">
                <p className="hero__thesis">Я остаюсь собой, но открываюсь по-разному.</p>
              </div>
            </div>

            <div className="hero__visual hero__visual--composite" aria-label="Запрос на общение в PAGER: экран с профилем, правилами и сроком доступа">
              <span className="hero__visual-kicker">ЗАПРОС НА ОБЩЕНИЕ</span>
              <figure className="hero__composite-stage">
                <img className="hero__screen-layer" src="/ledger/hero-screen-request.jpg" alt="Экран PAGER с профилем общения, правилами и сроком доступа" width="477" height="1043" fetchPriority="high" />
                <img className="hero__hand-layer" src="/ledger/hero-phone-hand.png" alt="Рука держит телефон с экраном PAGER" width="1122" height="1303" fetchPriority="high" />
              </figure>
            </div>

            <aside className="hero__aside">
              <span className="hero__aside-label">Что дальше</span>
              <div className="hero__timeline">
                <div className="hero__milestone"><span>Private beta</span><strong>Q3 2026</strong></div>
                <div className="hero__milestone"><span>App Store / Google Play</span><strong>Q1 2027</strong></div>
              </div>
              <span className="hero__aside-label hero__aside-label--bottom">Мессенджер с выбранными границами общения.</span>
            </aside>

            <div className="hero__bottom">
              <div className="hero__actions">
                <a className="button button--dark" href={contactHref}>Запросить презентацию <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="#how">Посмотреть, как это работает <span aria-hidden="true">↓</span></a>
              </div>
              <span className="hero__bottom-note">Один запрос — и человек сам решает, как продолжить разговор.</span>
            </div>
          </div>
        </section>

        <div className="hero-ticker" aria-label="Ключевая идея PAGER">
          <div className="hero-ticker__viewport">
            <div className="hero-ticker__track">
              <span>Выбирайте, что открыть</span><b>·</b><span>решайте, как общаться</span><b>·</b><span>закрывайте доступ, когда хотите</span><b>·</b><span>PAGER</span>
              <span aria-hidden="true">Выбирайте, что открыть</span><b aria-hidden="true">·</b><span aria-hidden="true">решайте, как общаться</span><b aria-hidden="true">·</b><span aria-hidden="true">закрывайте доступ, когда хотите</span><b aria-hidden="true">·</b><span aria-hidden="true">PAGER</span>
            </div>
          </div>
        </div>

        <section className="problem section" id="difference">
          <div className="section-label"><span>01</span> Эволюция цифрового общения</div>
          <div className="problem__lead">
            <h2>Каждое поколение делало общение быстрее.<br /><em>PAGER делает его осознаннее.</em></h2>
            <p>Мессенджеры сделали общение мгновенным. Вместе с этим доступ к человеку часто стал автоматическим: сообщение, звонок, добавление в группу и видимость активности появляются раньше, чем мы успеваем выбрать формат общения.</p>
          </div>
          <div className="generation-grid">
            {stages.map(([number, title, copy, media, alt], index) => (
              <article className={`generation generation--${index + 1}`} key={number}>
                <span className="generation__number">{number}</span>
                <figure className="generation__visual">
                  <img src={media} alt={alt} width="1146" height="723" loading="lazy" />
                <figcaption>{index === 0 ? "Передать сообщение" : index === 1 ? "Связаться напрямую" : index === 2 ? "Общаться мгновенно" : "Выбирать границы"}</figcaption>
                </figure>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="identity">
          <div className="identity__statement">
            <div className="section-label section-label--light"><span>02</span> Мультипрофиль</div>
            <h2>Один аккаунт.<br /><em>До четырёх</em><br />профилей.</h2>
            <p>Создайте несколько профилей внутри одного аккаунта. Для каждого можно выбрать своё имя, фото и описание.</p>
          </div>
          <div className="identity__visual">
            <picture>
              <source media="(max-width: 700px)" srcSet="/ledger/profile-contexts.png" />
              <img src="/ledger/profile-contexts.png" alt="Личный, рабочий и гостевой контексты одного человека в PAGER" width="1672" height="941" loading="lazy" />
            </picture>
            <div className="identity__note">Это не разные аккаунты и не фальшивые личности.<br /><strong>Вы выбираете, какую сторону себя показать.</strong></div>
          </div>
        </section>

        <section className="how section" id="how">
          <div className="how__header">
            <div className="section-label"><span>03</span> Контекст контакта</div>
            <h2>Каждый контакт<br /><em>видит свой</em><br />профиль.</h2>
          </div>
          <ol className="how__steps">
            <li><span>01</span><div><h3>Личное</h3><p>Для тех, с кем можно быть без формальностей.</p></div></li>
            <li><span>02</span><div><h3>Работа</h3><p>Рабочее представление с понятными границами.</p></div></li>
            <li><span>03</span><div><h3>Гостевое</h3><p>Минимум информации для нового или временного контакта.</p></div></li>
            <li><span>04</span><div><h3>Другое</h3><p>Отдельный контекст для особого сценария общения.</p></div></li>
          </ol>
          <aside className="guest-card">
            <span>Профиль для каждого контакта</span>
            <strong>СВОИ<br />ПРАВИЛА</strong>
            <img src="/ledger/ui-temporary.png" alt="Настройка гостевого доступа на 24 часа" width="1145" height="252" loading="lazy" />
            <p>Для гостевого профиля можно включить доступ на 24 часа. Его можно продлить или сделать постоянным.</p>
          </aside>
        </section>

        <section className="demo-section" id="demo">
          <div className="demo-section__intro">
            <div className="section-label section-label--light"><span>04</span> Как начинается общение</div>
            <h2>Сначала запрос.<br />Потом — выбранный<br /><em>формат общения.</em></h2>
            <p>Найдите контакт по PAGER ID, отправьте запрос и дождитесь, пока человек выберет профиль и способы связи.</p>
          </div>
          <ProductDemo />
        </section>

        <section className="today section" id="today">
          <div className="today__intro">
            <div className="section-label"><span>05</span> Состояние продукта</div>
            <h2>PAGER уже работает<br /><em>как мессенджер.</em></h2>
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
            <div className="section-label section-label--light"><span>06</span> Как растёт сеть</div>
            <h2>Каждый новый контакт может начать свой разговор в PAGER.</h2>
            <p>Пользователь приглашает человека в конкретный контекст, а новый контакт знакомится с PAGER через реальный сценарий общения.</p>
          </div>
          <div className="growth__path">
            {[
              "Пользователь находит контакт и отправляет запрос.",
              "Получатель видит, кто обращается и в каком контексте.",
              "Чтобы ответить, он знакомится с PAGER и создаёт свой профиль.",
              "Следующее общение уже начинается с понятных правил.",
            ].map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}
          </div>
          <figure className="growth__evidence">
            <img src="/ledger/ui-id.png" alt="Карточка PAGER ID для поиска и приглашения контакта" width="1145" height="252" loading="lazy" />
            <figcaption>PAGER ID — точка входа в новое общение, без раскрытия номера телефона.</figcaption>
          </figure>
        </section>

        <section id="business" className="business section">
          <div className="business__intro">
            <div className="section-label"><span>07</span> Следующий этап</div>
            <h2>От личного мессенджера<br />к новой инфраструктуре общения.</h2>
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
