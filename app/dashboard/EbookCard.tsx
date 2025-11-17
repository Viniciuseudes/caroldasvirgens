"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { BookOpen, Download, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createSignedPdfUrlAction } from "@/app/actions"; // Nossa Server Action

// Tipo para o e-book
type Ebook = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  pdf_file_path: string | null; // Precisamos do PATH
  pdf_file_url: string | null; // A URL original (não usaremos mais)
};

type EbookCardProps = {
  ebook: Ebook;
};

export function EbookCard({ ebook }: EbookCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPdf = async () => {
    if (!ebook.pdf_file_path) {
      toast.error("Arquivo PDF não encontrado.");
      return;
    }

    setIsLoading(true);

    // Chama a Server Action
    const result = await createSignedPdfUrlAction(ebook.pdf_file_path);

    if (result.success && result.url) {
      setPdfUrl(result.url);
      setIsModalOpen(true); // Abre o modal
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

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
          {/* --- A MUDANÇA ESTÁ AQUI --- */}
          {/* Usamos o Dialog em vez do Link */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={handleOpenPdf}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <BookOpen className="w-4 h-4 mr-2" />
                )}
                Ler E-book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] p-0">
              <DialogHeader className="p-4 sm:p-6">
                <DialogTitle>{ebook.title}</DialogTitle>
              </DialogHeader>
              <div className="h-full w-full">
                {pdfUrl ? (
                  <embed
                    src={pdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          {/* --- FIM DA MUDANÇA --- */}
        </div>
      </CardContent>
    </Card>
  );
}
