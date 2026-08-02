/* eslint-disable @next/next/no-img-element */

import { ContextDemo } from "./components/ContextDemo";
import { deckHref } from "./site-data";

const generations = [
  ["01", "Передать сообщение", "SMS и почта сделали связь возможной."],
  ["02", "Общаться мгновенно", "Мессенджеры убрали расстояние и ожидание."],
  ["03", "Выбирать формат общения", "PAGER добавляет профиль, разрешения и срок доступа."],
] as const;

const productStages = [
  ["Уже собрано", "01", ["Регистрация", "PAGER ID", "Поиск по ID", "1:1-диалоги", "Flutter-клиент", "Supabase backend"]],
  ["Проверяем в private beta", "02", ["Контекстные профили", "Управление способами общения", "Гостевой профиль", "Временный доступ", "Понятность правил"]],
  ["Следующий этап", "03", ["Аудио- и видеозвонки", "Расширенные профили", "Дополнительные настройки приватности", "Бизнес-сценарии", "API"]],
] as const;

const offers = [
  ["Premium PAGER ID", "Короткий, запоминающийся идентификатор для личного или профессионального использования."],
  ["Расширенные профили", "Больше контекстов, вариантов представления и настроек для разных типов общения."],
  ["Возможности приложения", "Дополнительные способы коммуникации, автоматизация правил и более детальный контроль приватности."],
  ["B2B / API", "Безопасная связь бизнеса с клиентами без раскрытия личных номеров сотрудников."],
] as const;

function Mark({ number, children, dark = false }: { number: string; children: React.ReactNode; dark?: boolean }) {
  return <div className={`mark ${dark ? "mark--dark" : ""}`}><i>{number}</i><span>{children}</span></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Перейти к содержанию</a>
      <header className="nav">
        <a className="nav__brand" href="#top" aria-label="PAGER — к началу">PAGER</a>
        <nav aria-label="Навигация"><a href="#idea">Идея</a><a href="#demo">Демо</a><a href="#today">Продукт</a></nav>
        <a className="nav__contact" href={deckHref}>Запросить материалы <span>↗</span></a>
      </header>

      <main id="main">
        <section className="new-hero" id="top">
          <div className="new-hero__copy">
            <p className="new-hero__eyebrow">Новая модель приватного общения</p>
            <h1>Цифровое общение стирает границы приватности.<strong>PAGER возвращает вам контроль.</strong></h1>
            <p className="new-hero__thesis">Я остаюсь собой, но открываюсь по-разному.</p>
            <p className="new-hero__explain">PAGER — мессенджер, в котором для каждого контекста можно выбрать свой профиль и свои способы общения.</p>
            <div className="new-hero__actions"><a className="primary" href={deckHref}>Запросить презентацию <span>↗</span></a><a className="secondary" href="#how">Посмотреть, как это работает <span>↓</span></a></div>
            <div className="new-hero__dates"><span>Private beta <b>Q3 2026</b></span><span>App Store / Google Play <b>Q1 2027</b></span></div>
          </div>
          <div className="new-hero__image"><img src="/ledger/hero-light.jpg" alt="PAGER связывает личное, рабочее и гостевое общение через управляемые каналы" width="2048" height="1152" fetchPriority="high" /><div className="new-hero__signals" aria-hidden="true"><span>Личное</span><span>Работа</span><span>Гостевое / 24 ч</span></div></div>
        </section>

        <section className="reason" id="why">
          <div className="reason__head"><Mark number="01">Почему сейчас</Mark><h2>Мы научились быстро связываться.<br />Но не научились выбирать границы.</h2><p>Мессенджеры сделали общение мгновенным. Вместе с этим доступ к человеку часто стал автоматическим: сообщение, звонок, добавление в группу и видимость активности появляются раньше, чем мы успеваем выбрать формат общения.</p></div>
          <div className="reason__generations">{generations.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="identity" id="idea">
          <div className="identity__manifest"><Mark number="02" dark>Что такое PAGER</Mark><h2>Один человек.<br /><em>Несколько способов</em><br />быть на связи.</h2><p>PAGER — мессенджер, где профиль и способы общения зависят от контекста.</p></div>
          <div className="identity__proof"><p>Это не разные аккаунты. Не фальшивые личности.</p><strong>Один человек выбирает, что увидит конкретный контакт.</strong><div className="identity__frames"><article><img src="/ledger/profile-1.png" alt="" width="543" height="724" /><span>Личное</span></article><article><img src="/ledger/profile-2.png" alt="" width="543" height="724" /><span>Работа</span></article><article><img src="/ledger/profile-3.png" alt="" width="543" height="724" /><span>Гостевое</span></article></div></div>
        </section>

        <section className="how" id="how">
          <div className="how__intro"><Mark number="03">Как это работает</Mark><h2>Не новый аккаунт.<br />Новый способ начать общение.</h2></div>
          <ol className="how__sequence"><li><span>01</span><div><h3>Найти</h3><p>Найдите человека по PAGER ID — без раскрытия номера телефона.</p></div></li><li><span>02</span><div><h3>Выбрать профиль</h3><p>Решите, какое представление увидит этот контакт: личное, рабочее или гостевое.</p></div></li><li><span>03</span><div><h3>Настроить общение</h3><p>Разрешите только те способы связи, которые подходят этому контексту.</p></div></li></ol>
          <aside className="how__temporary"><span>ГОСТЕВОЙ ДОСТУП</span><b>24:00:00</b><p>По умолчанию доступ действует 24 часа. Затем его можно продлить или сделать постоянным.</p></aside>
        </section>

        <section className="demo" id="demo"><div className="demo__intro"><Mark number="04" dark>Контекст в действии</Mark><h2>Один PAGER ID.<br />Разные правила<br /><em>для разных людей.</em></h2></div><ContextDemo /></section>

        <section className="today" id="today"><div className="today__head"><Mark number="05">Продукт сегодня</Mark><h2>Собираем продукт и проверяем, нужна ли людям новая форма границ.</h2></div><div className="today__columns">{productStages.map(([title, number, items]) => <article key={title}><span>{number}</span><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="today__hypotheses"><p>Три гипотезы private beta</p><ol><li>Люди готовы начинать общение без раскрытия номера телефона.</li><li>Контекстный профиль помогает проще объяснить границы общения.</li><li>Пользователь воспринимает правила и срок доступа как самостоятельную ценность.</li></ol></div></section>

        <section className="growth" id="growth"><div className="growth__head"><Mark number="06" dark>Рост</Mark><h2>Каждое новое общение может приводить в PAGER следующего участника.</h2><p>Это гипотеза, которую мы проверяем через реальные приглашения.</p></div><div className="growth__path"><article><span>01</span><p>Пользователь находит контакт и отправляет запрос.</p></article><article><span>02</span><p>Получатель видит, кто обращается и в каком контексте.</p></article><article><span>03</span><p>Для ответа он знакомится с PAGER и создаёт собственный профиль.</p></article><article><span>04</span><p>Следующее общение происходит с заранее понятными правилами.</p></article></div><small>Тестируемый cold-start сценарий, не заявление о доказанной вирусности.</small></section>

        <section className="business" id="business"><div className="business__head"><Mark number="07">Потенциальная бизнес-модель</Mark><h2>Что может стать платным в PAGER</h2><p>Направления развития, а не обещания выручки, цен или размера рынка.</p></div><div className="business__offers">{offers.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="close" id="contact"><div><Mark number="08" dark>Следующий шаг</Mark><h2>Хотите увидеть<br />PAGER изнутри?</h2><p>Мы показываем текущий продукт, план private beta и следующие этапы развития мессенджера.</p><a className="primary primary--light" href={deckHref}>Запросить презентацию и дополнительные материалы <span>↗</span></a></div><footer><span>PAGER © 2026</span><span>PRIVATE COMMUNICATION</span><a href="#top">Наверх ↑</a></footer></section>
      </main>
    </>
  );
}
