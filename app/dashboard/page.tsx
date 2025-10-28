"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, BookOpen, Download, Play, Clock, ArrowLeft, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function UserDashboard() {
  const [purchasedEbooks] = useState([
    {
      id: 1,
      title: "Disciplina Positiva na Prática",
      description: "Guia completo com estratégias práticas para implementar a disciplina positiva no dia a dia.",
      progress: 75,
      downloadUrl: "#",
      coverImage: "/placeholder.svg?height=200&width=150",
      purchaseDate: "2024-01-15",
      rating: 5,
    },
    {
      id: 2,
      title: "Criando Vínculos Saudáveis",
      description: "Como fortalecer a conexão com seus filhos através da comunicação empática.",
      progress: 45,
      downloadUrl: "#",
      coverImage: "/placeholder.svg?height=200&width=150",
      purchaseDate: "2024-02-20",
      rating: 4,
    },
  ])

  const [availableEbooks] = useState([
    {
      id: 3,
      title: "Educação Emocional Infantil",
      description: "Desenvolva a inteligência emocional das crianças com técnicas comprovadas.",
      price: 42.0,
      coverImage: "/placeholder.svg?height=200&width=150",
      bestseller: false,
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao site
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">Minha Biblioteca</h1>
                <p className="text-sm text-gray-600">Bem-vindo de volta!</p>
              </div>
            </div>
          </div>
          <Button variant="outline">Sair</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">Olá, Maria! 👋</h2>
          <p className="text-purple-100 mb-4">
            Continue sua jornada na Disciplina Positiva. Você já completou 2 e-books!
          </p>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{purchasedEbooks.length}</div>
              <div className="text-sm text-purple-100">E-books Adquiridos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">60%</div>
              <div className="text-sm text-purple-100">Progresso Médio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-purple-100">Dias de Acesso</div>
            </div>
          </div>
        </div>

        {/* My E-books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus E-books</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedEbooks.map((ebook) => (
              <Card key={ebook.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={ebook.coverImage || "/placeholder.svg"}
                    alt={ebook.title}
                    width={150}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Adquirido
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{ebook.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ebook.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progresso</span>
                        <span className="text-purple-600 font-medium">{ebook.progress}%</span>
                      </div>
                      <Progress value={ebook.progress} className="h-2" />
                    </div>

                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < ebook.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">Sua avaliação</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Continuar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                    Adquirido em {new Date(ebook.purchaseDate).toLocaleDateString("pt-BR")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended E-books */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recomendados para Você</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableEbooks.map((ebook) => (
              <Card key={ebook.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={ebook.coverImage || "/placeholder.svg"}
                    alt={ebook.title}
                    width={150}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {ebook.bestseller && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      Mais Vendido
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{ebook.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ebook.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">R$ {ebook.price.toFixed(2)}</span>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">Ações Rápidas</CardTitle>
              <CardDescription>Explore mais recursos da plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <span>Explorar Catálogo</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <span>Histórico de Leitura</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <Heart className="w-6 h-6 text-purple-600" />
                  <span>Lista de Desejos</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
