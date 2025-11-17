import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  BookOpen,
  Clock,
  ArrowLeft,
  CheckCircle,
  Video,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Imports de Servidor
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions";

// Imports para o Toast
import { Suspense } from "react";
import { ShowToastMessages } from "./ShowToastMessages";

// Nossos NOVOS Componentes de Card
import { CourseCard } from "./CourseCard";
import { EbookCard } from "./EbookCard";

// --- Tipos para nossos dados ---
type Ebook = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  pdf_file_path: string | null; // <-- Atualizado
  pdf_file_url: string | null;
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  youtube_playlist_url: string | null;
  lessons_count: number | null;
  duration_hours: number | null;
};

type Purchase = {
  id: number;
  ebooks: Ebook | null;
  courses: Course | null;
};
// --- Fim dos Tipos ---

export default async function UserDashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const userName = profile?.full_name || user.email || "Usuário";

  // Query Atualizada para buscar os 'pdf_file_path'
  const { data: purchasesData } = await supabase
    .from("user_purchases")
    .select("*, ebooks(*), courses(*)") // ebooks(*) agora inclui os novos paths
    .eq("user_id", user.id);

  const purchases = (purchasesData || []) as Purchase[];

  const purchasedEbooks = purchases
    .filter((p) => p.ebooks)
    .map((p) => p.ebooks!);

  const purchasedCourses = purchases
    .filter((p) => p.courses)
    .map((p) => p.courses!);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={null}>
        <ShowToastMessages />
      </Suspense>

      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao site
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">
                  Minha Biblioteca
                </h1>
                <p className="text-sm text-gray-600">Bem-vindo(a) de volta!</p>
              </div>
            </div>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Sair
            </Button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">Olá, {userName}! 👋</h2>
          <p className="text-purple-100 mb-4">
            Continue sua jornada na Disciplina Positiva. Você já adquiriu{" "}
            {purchases.length} produto(s)!
          </p>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{purchasedEbooks.length}</div>
              <div className="text-sm text-purple-100">E-books Adquiridos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {purchasedCourses.length}
              </div>
              <div className="text-sm text-purple-100">Cursos Adquiridos</div>
            </div>
          </div>
        </div>

        {/* Meus E-books (com novo Card) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Meus E-books
          </h2>
          {purchasedEbooks.length === 0 ? (
            <p className="text-gray-500">
              Você ainda não adquiriu nenhum e-book.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedEbooks.map((ebook) => (
                <EbookCard key={ebook.id} ebook={ebook} />
              ))}
            </div>
          )}
        </section>

        {/* Meus Cursos (com novo Card) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Cursos</h2>
          {purchasedCourses.length === 0 ? (
            <p className="text-gray-500">
              Você ainda não adquiriu nenhum curso.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">Ações Rápidas</CardTitle>
              <CardDescription>
                Explore mais recursos da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  asChild
                >
                  <Link href="/#ebooks">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <span>Explorar Catálogo</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                >
                  <Clock className="w-6 h-6 text-purple-600" />
                  <span>Histórico de Leitura</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                >
                  <Heart className="w-6 h-6 text-purple-600" />
                  <span>Lista de Desejos</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
