import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
