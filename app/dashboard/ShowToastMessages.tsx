"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function ShowToastMessages() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const successMessage = searchParams.get("success");
    const errorMessage = searchParams.get("error");
    const message = searchParams.get("message");

    if (successMessage) {
      toast.success(successMessage);
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (message) {
      toast.info(message);
    }

    // Usamos 'effect' para rodar apenas uma vez quando a página carrega
  }, [searchParams]);

  // Este componente não renderiza nada visível
  return null;
}
