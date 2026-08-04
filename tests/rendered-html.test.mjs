import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the product-first investor narrative", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = html.replace(/<[^>]*>/g, " ");

  assert.match(html, /class="hero"/);
  assert.match(html, /class="product-demo/);
  assert.match(text, /Цифровое общение стирает границы приватности/);
  assert.match(text, /PAGER возвращает вам контроль/);
  assert.match(text, /Я остаюсь собой, но открываюсь по-разному/);
  assert.match(text, /Один аккаунт[\s\S]*До четырёх[\s\S]*профилей/);
  assert.match(text, /Найдите контакт по PAGER ID/);
  assert.match(text, /Гостевой профиль/);
  assert.match(text, /Уже собрано/);
  assert.match(text, /Проверяем в private beta/);
  assert.match(text, /Следующий этап[\s\S]*Premium PAGER ID/);
  assert.match(text, /Хотите увидеть[\s\S]*PAGER изнутри/);
  assert.match(text, /App Store \/ Google Play[\s\S]*Q1 2027/);
  assert.match(text, /Последняя активность/);
  assert.match(text, /Правила видны до начала разговора/);
  assert.match(html, /src="\/ledger\/screen-access\.jpg"/);
  assert.match(text, /Каждый новый контакт может начать свой разговор/);
  assert.match(text, /Сначала запрос[\s\S]*формат общения/);
  assert.match(text, /отправьте запрос/);
  assert.match(text, /человек выберет профиль/);
  assert.match(text, /Только разрешённое/);
  assert.match(text, /EMAIL[\s\S]*SMS[\s\S]*МЕССЕНДЖЕРЫ[\s\S]*PAGER/);
  assert.match(text, /Передать сообщение[\s\S]*Связаться напрямую[\s\S]*Общаться мгновенно[\s\S]*Выбирать границы/);
  assert.match(html, /src="\/ledger\/screen-profile\.jpg"/);
  assert.match(html, /id="business"/);
  assert.doesNotMatch(html, /act-progress|relationship-console|access-lab|hero__word|new-hero|context-demo/);
});

test("keeps accessible navigation and context switching controls", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-label="Навигация по странице"/);
  assert.match(html, /href="#difference"/);
  assert.match(html, /href="#demo"/);
  assert.match(html, /href="#today"/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /aria-controls="profile-panel"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /mailto:martynov\.usa@gmail\.com/);
});
