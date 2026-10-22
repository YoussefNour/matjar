import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matjar — Your store, live by lunch",
  description:
    "Matjar is the fast, simple storefront for independent sellers. Launch a beautiful shop, manage products and orders, and get paid — without hiring a developer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-[#faf9f6] font-sans text-[#161a17] antialiased">
        {children}
      </body>
    </html>
  );
}
