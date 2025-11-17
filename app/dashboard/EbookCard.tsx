"use client";

// Imports simplificados
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; // <-- Importamos o Link
import { Download, CheckCircle } from "lucide-react";

// Tipo para o e-book
type Ebook = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  pdf_file_path: string | null; // (Mantemos para o admin)
  pdf_file_url: string | null; // <-- Usaremos este
};

type EbookCardProps = {
  ebook: Ebook;
};

export function EbookCard({ ebook }: EbookCardProps) {
  // Toda a lógica de state, effect e server action foi removida.

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={ebook.cover_image_url || "/placeholder.svg"}
          alt={ebook.title}
          width={300}
          height={400}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          Adquirido
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{ebook.title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
          {ebook.description}
        </p>

        <div className="space-y-3">
          {/* --- MUDANÇA: Voltamos ao <Link> simples --- */}
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            asChild
          >
            {/* O botão agora é um link real para o PDF, com a flag 'download' */}
            <Link href={ebook.pdf_file_url || "#"} target="_blank" download>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Link>
          </Button>
          {/* --- FIM DA MUDANÇA --- */}
        </div>
      </CardContent>
    </Card>
  );
}
