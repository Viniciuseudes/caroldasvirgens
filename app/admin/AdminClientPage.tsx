"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Edit,
  Loader2,
  Plus,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { toast } from "sonner";
// NOVO: Importar o Alert Dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Import das nossas Server Actions
import {
  addEbookAction,
  addCourseAction,
  deleteProductAction,
  type FormState,
} from "./actions"; // Adicionado deleteProductAction
import { Ebook, Course, User, Stats } from "./types";

// --- Componentes dos Botões de Submit (sem mudanças) ---
function SubmitEbookButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="... (sem mudanças)" disabled={pending}>
      {/* ... (sem mudanças) ... */}
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Adicionando E-book...
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar E-book
        </>
      )}
    </Button>
  );
}
function SubmitCourseButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="... (sem mudanças)" disabled={pending}>
      {/* ... (sem mudanças) ... */}
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Adicionando Curso...
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Curso
        </>
      )}
    </Button>
  );
}
// NOVO: Botão de Deletar (para o Modal)
function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <AlertDialogAction asChild>
      <Button type="submit" variant="destructive" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Deletando...
          </>
        ) : (
          "Sim, deletar"
        )}
      </Button>
    </AlertDialogAction>
  );
}
// --- Fim dos Componentes dos Botões ---

type AdminClientPageProps = {
  stats: Stats;
  ebooks: Ebook[];
  courses: Course[];
  users: User[];
};

export function AdminClientPage({
  stats,
  ebooks,
  courses,
  users,
}: AdminClientPageProps) {
  const initialState: FormState = { success: false, message: null };
  const [ebookFormState, ebookDispatch] = useFormState(
    addEbookAction,
    initialState
  );
  const [courseFormState, courseDispatch] = useFormState(
    addCourseAction,
    initialState
  );
  const [deleteFormState, deleteDispatch] = useFormState(
    deleteProductAction,
    initialState
  ); // NOVO: Estado para deleção

  // --- Efeito para disparar Toasts (Atualizado) ---
  useEffect(() => {
    if (ebookFormState.message) {
      if (ebookFormState.success) toast.success(ebookFormState.message);
      else toast.error(ebookFormState.message);
    }
  }, [ebookFormState]);

  useEffect(() => {
    if (courseFormState.message) {
      if (courseFormState.success) toast.success(courseFormState.message);
      else toast.error(courseFormState.message);
    }
  }, [courseFormState]);

  // NOVO: Efeito para toast de deleção
  useEffect(() => {
    if (deleteFormState.message) {
      if (deleteFormState.success) toast.success(deleteFormState.message);
      else toast.error(deleteFormState.message);
    }
  }, [deleteFormState]);
  // --- FIM DO EFEITO ---

  return (
    <>
      {/* Dashboard Stats (sem mudanças) */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* ... (cards de estatísticas) ... */}
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-sm text-gray-600">
              Receita Total
            </CardTitle>
            <p className="text-2xl font-bold text-green-600">
              R${" "}
              {stats.totalRevenue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-sm text-gray-600">
              Vendas Totais
            </CardTitle>
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalSales}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-sm text-gray-600">
              Produtos Ativos
            </CardTitle>
            <p className="text-2xl font-bold text-purple-600">
              {stats.totalProducts}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-sm text-gray-600">Usuários</CardTitle>
            <p className="text-2xl font-bold text-orange-600">
              {stats.totalUsers}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content (Tabs) */}
      <Tabs defaultValue="ebooks" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="ebooks">Gerenciar E-books</TabsTrigger>
          <TabsTrigger value="courses">Gerenciar Cursos</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="add-ebook">Adicionar E-book</TabsTrigger>
          <TabsTrigger value="add-course">Adicionar Curso</TabsTrigger>
        </TabsList>

        {/* Aba "Gerenciar E-books" (Botão Deletar ATUALIZADO) */}
        <TabsContent value="ebooks">
          <Card>
            <CardHeader>{/* ... */}</CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ebooks.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Nenhum e-book cadastrado ainda.
                  </p>
                ) : (
                  ebooks.map((ebook) => (
                    <div
                      key={ebook.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      {/* ... (info do ebook) ... */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {ebook.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">
                            Preço: R$ {ebook.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-600">
                            Vendas: {ebook.sales}
                          </span>
                          <Badge variant="secondary">Ativo</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>

                        {/* --- BOTÃO DELETAR ATUALIZADO --- */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Você tem certeza absoluta?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso irá
                                deletar permanentemente o e-book e remover seus
                                arquivos (capa e PDF) do armazenamento.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              {/* O formulário chama a action de deletar */}
                              <form action={deleteDispatch}>
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value={ebook.id}
                                />
                                <input
                                  type="hidden"
                                  name="product_type"
                                  value="ebook"
                                />
                                <input
                                  type="hidden"
                                  name="cover_path"
                                  value={ebook.cover_image_path || ""}
                                />
                                <input
                                  type="hidden"
                                  name="pdf_path"
                                  value={ebook.pdf_file_path || ""}
                                />
                                <DeleteButton />
                              </form>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* --- FIM DO BOTÃO DELETAR --- */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba "Gerenciar Cursos" (Botão Deletar ATUALIZADO) */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>{/* ... */}</CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Nenhum curso cadastrado ainda.
                  </p>
                ) : (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      {/* ... (info do curso) ... */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">
                            Preço: R$ {course.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-600">
                            Vendas: {course.sales}
                          </span>
                          <Badge variant="secondary">Ativo</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>

                        {/* --- BOTÃO DELETAR ATUALIZADO --- */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Você tem certeza absoluta?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso irá
                                deletar permanentemente o curso e remover sua
                                thumbnail do armazenamento.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <form action={deleteDispatch}>
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value={course.id}
                                />
                                <input
                                  type="hidden"
                                  name="product_type"
                                  value="course"
                                />
                                <input
                                  type="hidden"
                                  name="thumbnail_path"
                                  value={course.thumbnail_path || ""}
                                />
                                <DeleteButton />
                              </form>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* --- FIM DO BOTÃO DELETAR --- */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ... (abas 'users', 'add-ebook', 'add-course' não mudam) ... */}
        {/* Aba "Usuários" */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Usuários Cadastrados</CardTitle>
              <CardDescription>
                Visualize todos os usuários da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Nenhum usuário cadastrado ainda.
                  </p>
                ) : (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {user.full_name || "Usuário sem nome"}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">
                            Compras: {user.purchases}
                          </span>
                          <span className="text-sm text-gray-600">
                            Cadastro:{" "}
                            {new Date(user.created_at).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba "Adicionar E-book" */}
        <TabsContent value="add-ebook">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo E-book</CardTitle>
              <CardDescription>
                Crie um novo e-book para venda na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={ebookDispatch} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title-ebook">Título do E-book</Label>
                    <Input
                      id="title-ebook"
                      name="title"
                      placeholder="Digite o título do e-book"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-ebook">Preço (R$)</Label>
                    <Input
                      id="price-ebook"
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description-ebook">Descrição</Label>
                  <Textarea
                    id="description-ebook"
                    name="description"
                    placeholder="Descreva o conteúdo do e-book"
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover-ebook">Capa do E-book (Imagem)</Label>
                  <Input
                    id="cover-ebook"
                    name="cover"
                    type="file"
                    accept="image/*"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-ebook">Arquivo do E-book (PDF)</Label>
                  <Input
                    id="file-ebook"
                    name="file"
                    type="file"
                    accept=".pdf"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="reset" variant="outline">
                    Cancelar
                  </Button>
                  <SubmitEbookButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba "Adicionar Curso" */}
        <TabsContent value="add-course">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Curso</CardTitle>
              <CardDescription>
                Crie um novo curso para venda na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={courseDispatch} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title-course">Título do Curso</Label>
                    <Input
                      id="title-course"
                      name="title"
                      placeholder="Digite o título do curso"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-course">Preço (R$)</Label>
                    <Input
                      id="price-course"
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lessons_count">Quantidade de Aulas</Label>
                    <Input
                      id="lessons_count"
                      name="lessons_count"
                      type="number"
                      placeholder="20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_hours">Duração (em horas)</Label>
                    <Input
                      id="duration_hours"
                      name="duration_hours"
                      type="number"
                      placeholder="8"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description-course">Descrição</Label>
                  <Textarea
                    id="description-course"
                    name="description"
                    placeholder="Descreva o conteúdo do curso"
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube_playlist_url">
                    URL da Playlist (YouTube Não Listado)
                  </Label>
                  <Input
                    id="youtube_playlist_url"
                    name="youtube_playlist_url"
                    type="url"
                    placeholder="https://www.youtube.com/playlist?list=..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail-course">
                    Thumbnail do Curso (Imagem)
                  </Label>
                  <Input
                    id="thumbnail-course"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="reset" variant="outline">
                    Cancelar
                  </Button>
                  <SubmitCourseButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
