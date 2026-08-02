export const profiles = [
  ["Личное", "/ledger/profile-1.png", "Близкий круг"],
  ["Работа", "/ledger/profile-2.png", "Профессиональный контекст"],
  ["Гостевое", "/ledger/profile-3.png", "Временное общение"],
  ["Другое", "/ledger/profile-4.png", "Отдельный круг"],
] as const;

export const acts = [
  ["01", "Манифест PAGER", "#top"],
  ["02", "Почему сейчас", "#why-now"],
  ["03", "Новая единица продукта", "#model"],
  ["04", "Механика отношения", "#mechanics"],
  ["05", "Система отношения", "#relationship"],
  ["06", "Продукт сегодня", "#product"],
  ["07", "Гипотеза роста", "#growth"],
  ["08", "Бизнес и рынок", "#business"],
  ["09", "Следующий шаг", "#next-step"],
] as const;

export const deckHref = `mailto:martynov.usa@gmail.com?subject=${encodeURIComponent(
  "PAGER — запрос pitch deck и product demo",
)}&body=${encodeURIComponent(
  "Имя:\nФонд / компания:\nИнтересует: pitch deck / product demo\nИнтересующий чек:\n",
)}`;
