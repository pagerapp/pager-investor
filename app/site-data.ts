export const profiles = [
  ["Личное", "/ledger/profile-1.png", "Близкий круг"],
  ["Работа", "/ledger/profile-2.png", "Профессиональный контекст"],
  ["Гостевое", "/ledger/profile-3.png", "Временное общение"],
  ["Другое", "/ledger/profile-4.png", "Отдельный круг"],
] as const;

export const acts = [
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
] as const;

export const deckHref = `mailto:martynov.usa@gmail.com?subject=${encodeURIComponent(
  "PAGER — запрос pitch deck и product demo",
)}&body=${encodeURIComponent(
  "Имя:\nФонд / компания:\nИнтересует: pitch deck / product demo\nИнтересующий чек:\n",
)}`;
