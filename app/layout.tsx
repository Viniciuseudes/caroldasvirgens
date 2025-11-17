import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // <-- 1. IMPORTE AQUI

export const metadata: Metadata = {
  title: "Carol das Virgens - Psicopedagogia",
  description: "Transforme a educação dos seus filhos com Disciplina Positiva",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head />
      <body>
        {children}
        <Analytics />
        <Toaster richColors />{" "}
        {/* <-- 2. ADICIONE AQUI (richColors é um bônus) */}
      </body>
    </html>
  );
}
