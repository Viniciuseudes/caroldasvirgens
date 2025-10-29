"use client";

import Image from "next/image"; // Importa o componente Image
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // Heart foi removido pois não é mais usado aqui
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre Mim" },
    { href: "#ebooks", label: "E-books" },
    { href: "#cursos", label: "Cursos" },
    { href: "/blog", label: "Blog" },
    { href: "#midia", label: "Carol na Mídia" },
    { href: "#depoimentos", label: "Depoimentos" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Link da Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo111.png" // Caminho para a logo na pasta public
              alt="Logo Carol das Virgens" // Texto alternativo
              width={180} // Ajuste a largura conforme necessário
              height={50} // Ajuste a altura conforme necessário
              priority // Carrega a logo com prioridade
              className="h-auto" // Mantém a proporção
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/login">Entrar</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Entrar
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
