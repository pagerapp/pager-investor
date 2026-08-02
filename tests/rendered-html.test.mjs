import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete PAGER investor story", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const visibleText = html.replace(/<[^>]*>/g, " ");
  assert.match(html, /PAGER — Контроль над цифровым общением/);
  assert.match(visibleText, /Цифровое общение/i);
  assert.match(visibleText, /PAGER\s+возвращает вам контроль/i);
  assert.match(visibleText, /PAGER\s+проектирует\s+отношение/i);
  assert.match(visibleText, /Один постоянный\s+PAGER\s+ID/i);
  assert.match(visibleText, /Каждый контакт получает собственные правила общения/);
  assert.match(visibleText, /PAGER\s+создаёт новую модель цифрового общения/);
  assert.match(html, /data-scene="09"/);
  assert.match(html, /PAGER ID/);
  assert.match(visibleText, /Доступ начинается после подтверждения/);
  assert.match(html, /class="relationship-console"/);
  assert.match(html, /class="act-progress"/);
  assert.match(html, /class="access-shift"/);
  assert.match(html, /class="relationship-system/);
  assert.match(html, /class="product-proof"/);
  assert.match(html, /class="access-lab"/);
  assert.match(html, /Интерактивная модель отношения PAGER/);
  assert.match(html, /class="business-now-next"/);
  assert.match(visibleText, /ТЕКУЩАЯ МОДЕЛЬ/);
  assert.match(html, /class="beta-theses"/);
  assert.match(visibleText, /Что должна подтвердить первая версия/);
  assert.match(visibleText, /Это вопросы проверки, а не заявленные результаты/);
  assert.match(html, /class="growth-loop"/);
  assert.match(visibleText, /Виральность начинается не с установки/);
  assert.match(html, /class="market-model"/);
  assert.match(visibleText, /Рынок считается через поведение продукта/);
  assert.match(html, /profile-architecture\.png/);
  assert.match(html, /Private beta/i);
  assert.match(html, /Q1 2027/);
  assert.match(html, /App Store \/ Google Play/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|SkeletonPreview/);
});

test("includes navigation, responsive media, and accessible controls", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /aria-label="Открыть меню"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /<nav[^>]+aria-label="Основная навигация"/);
  assert.match(html, /<nav[^>]+aria-label="Прогресс презентации"/);
  assert.match(html, /aria-current="step"/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /href="#model"/);
  assert.match(html, /href="#mechanics"/);
  assert.match(html, /href="#product"/);
  assert.match(html, /href="#business"/);
  assert.match(html, /id="roadmap"/);
  assert.match(html, /id="next-step"/);
  assert.match(html, /aria-label="Экраны продукта PAGER"/);
  assert.match(html, /tabindex="0"/i);
  assert.match(html, /mailto:martynov\.usa@gmail\.com/);
  assert.match(html, /aria-label="Интерактивная модель отношения PAGER"/);
  assert.match(html, /role="switch"/);
  assert.match(html, /class="access-lab__mobile-result"/);
  assert.match(html, /\/\s*(?:<!-- -->)?\s*9/);
  assert.match(html, /Быстрые сценарии отношения/);
});
