import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const latinSans = Geist({
  variable: "--font-latin-sans",
  subsets: ["latin"],
});

const latinMono = Geist_Mono({
  variable: "--font-latin-mono",
  subsets: ["latin"],
});

const arabicSans = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Matjar — Your store, live by lunch",
  description:
    "Matjar is the fast, simple storefront for independent sellers, backed by a professional engineering team for custom software, integrations, and portals. Launch a shop, manage products and orders, and get paid — without hiring a developer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${latinSans.variable} ${latinMono.variable} ${arabicSans.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
