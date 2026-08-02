import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the new investor narrative without the former presentation shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = html.replace(/<[^>]*>/g, " ");

  assert.match(html, /class="new-hero"/);
  assert.match(html, /class="context-demo"/);
  assert.match(text, /Цифровое общение стирает границы приватности/);
  assert.match(text, /PAGER возвращает вам контроль/);
  assert.match(text, /Я остаюсь собой, но открываюсь по-разному/);
  assert.match(text, /Один человек[\s\S]*Несколько способов[\s\S]*быть на связи/);
  assert.match(text, /Найдите человека по PAGER ID/);
  assert.match(text, /ГОСТЕВОЙ ДОСТУП/);
  assert.match(text, /Уже собрано/);
  assert.match(text, /Проверяем в private beta/);
  assert.match(text, /Что может стать платным в PAGER/);
  assert.match(text, /Хотите увидеть[\s\S]*PAGER изнутри/);
  assert.match(text, /App Store \/ Google Play[\s\S]*Q1 2027/);
  assert.match(text, /Последняя активность/);
  assert.doesNotMatch(html, /act-progress|relationship-console|access-lab|hero__word/);
});

test("keeps accessible navigation and context switching controls", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /class="skip"/);
  assert.match(html, /aria-label="Навигация"/);
  assert.match(html, /href="#idea"/);
  assert.match(html, /href="#demo"/);
  assert.match(html, /href="#today"/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /mailto:martynov\.usa@gmail\.com/);
});
