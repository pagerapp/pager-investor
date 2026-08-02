import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAGER — Новая модель приватного общения",
  description:
    "PAGER — мессенджер, в котором для каждого контекста можно выбрать свой профиль и свои способы общения.",
  icons: {
    icon: "/favicon.svg",
  },
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
