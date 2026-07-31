import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAGER — Контроль над цифровым общением",
  description:
    "PAGER возвращает человеку контроль над доступностью, видимостью и правилами общения.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
