"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "5511999999999" // Substitua pelo número real
    const message = encodeURIComponent("Olá! Gostaria de agendar uma consulta.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  if (!mounted) return null

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 whatsapp-pulse"
      size="icon"
      aria-label="Agendar consulta no WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
    </Button>
  )
}
