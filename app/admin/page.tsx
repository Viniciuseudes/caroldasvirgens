"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Users, DollarSign, Plus, Edit, Trash2, Upload, BarChart3, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [ebooks, setEbooks] = useState([
    {
      id: 1,
      title: "Disciplina Positiva na Prática",
      price: 47.0,
      sales: 156,
      status: "Ativo",
    },
    {
      id: 2,
      title: "Criando Vínculos Saudáveis",
      price: 37.0,
      sales: 89,
      status: "Ativo",
    },
    {
      id: 3,
      title: "Educação Emocional Infantil",
      price: 42.0,
      sales: 124,
      status: "Ativo",
    },
  ])

  const [users] = useState([
    { id: 1, name: "Maria Silva", email: "maria@email.com", purchases: 3, joined: "2024-01-15" },
    { id: 2, name: "João Santos", email: "joao@email.com", purchases: 2, joined: "2024-02-20" },
    { id: 3, name: "Ana Costa", email: "ana@email.com", purchases: 1, joined: "2024-03-10" },
  ])

  const totalRevenue = ebooks.reduce((sum, ebook) => sum + ebook.price * ebook.sales, 0)
  const totalSales = ebooks.reduce((sum, ebook) => sum + ebook.sales, 0)

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
                <h1 className="font-bold text-xl text-gray-800">Área Administrativa</h1>
                <p className="text-sm text-gray-600">Carol das Virgens</p>
              </div>
            </div>
          </div>
          <Button variant="outline">Sair</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vendas Totais</p>
                  <p className="text-2xl font-bold text-blue-600">{totalSales}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">E-books Ativos</p>
                  <p className="text-2xl font-bold text-purple-600">{ebooks.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Usuários</p>
                  <p className="text-2xl font-bold text-orange-600">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="ebooks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="ebooks">E-books</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="add-ebook">Adicionar E-book</TabsTrigger>
          </TabsList>

          <TabsContent value="ebooks">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar E-books</CardTitle>
                <CardDescription>Visualize e gerencie todos os seus e-books</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ebooks.map((ebook) => (
                    <div key={ebook.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{ebook.title}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">Preço: R$ {ebook.price.toFixed(2)}</span>
                          <span className="text-sm text-gray-600">Vendas: {ebook.sales}</span>
                          <Badge variant="secondary">{ebook.status}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Cadastrados</CardTitle>
                <CardDescription>Visualize todos os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">Compras: {user.purchases}</span>
                          <span className="text-sm text-gray-600">
                            Cadastro: {new Date(user.joined).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-ebook">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo E-book</CardTitle>
                <CardDescription>Crie um novo e-book para venda na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do E-book</Label>
                      <Input id="title" placeholder="Digite o título do e-book" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input id="price" type="number" step="0.01" placeholder="0.00" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descreva o conteúdo do e-book" rows={4} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover">Capa do E-book</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Clique para fazer upload da capa ou arraste aqui</p>
                      <Input id="cover" type="file" accept="image/*" className="hidden" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Arquivo do E-book (PDF)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Clique para fazer upload do PDF ou arraste aqui</p>
                      <Input id="file" type="file" accept=".pdf" className="hidden" />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar E-book
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
