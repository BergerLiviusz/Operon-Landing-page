import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Operon ERP | Modulalapú vállalatirányítás magyar kkv-knak",
  description:
    "Prémium, modulalapú ERP SaaS magyar kis- és középvállalatoknak: pénzügy, készlet, CRM, gyártás, projektek, HR és riporting egy platformon.",
  icons: {
    icon: "/operon_symbol.png",
    shortcut: "/operon_symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
