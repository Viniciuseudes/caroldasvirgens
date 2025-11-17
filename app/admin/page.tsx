import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Imports de Servidor
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions";

// Import do nosso novo Client Component
import { AdminClientPage } from "./AdminClientPage";
// Import dos nossos tipos compartilhados
import { Ebook, Course, User, Stats } from "./types";

// --- Função Principal da Página (Server Component) ---
export default async function AdminPage() {
  const supabase = createClient();

  // 1. Proteger a rota: verificar se o usuário está logado
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  // --- 2. VERIFICAÇÃO DE SEGURANÇA DE ADMIN ---
  // Busca o perfil do usuário logado para checar a 'role'
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Se o perfil não for encontrado ou a 'role' não for 'admin',
  // redireciona o usuário para o dashboard normal.
  if (!profile || profile.role !== "admin") {
    return redirect("/dashboard");
  }
  // --- FIM DA VERIFICAÇÃO DE SEGURANÇA ---

  // 3. Buscar todos os dados em paralelo para performance
  const [ebooksData, coursesData, usersData, purchasesData] = await Promise.all(
    [
      supabase
        .from("ebooks")
        .select(
          "id, title, price, created_at, cover_image_path, pdf_file_path"
        ),
      supabase
        .from("courses")
        .select("id, title, price, created_at, thumbnail_path"),
      supabase
        .from("profiles")
        .select("id, full_name, created_at, users(email)"),
      supabase
        .from("user_purchases")
        .select("*, ebooks(price), courses(price)"),
    ]
  );

  // --- 4. Calcular Estatísticas ---

  // Contagem de Vendas por Produto
  const salesCountMap = new Map<string, number>();
  let calculatedTotalRevenue = 0;

  if (purchasesData.data) {
    for (const purchase of purchasesData.data) {
      let productId: string | null = null;
      let price = 0;

      if (purchase.ebook_id && purchase.ebooks) {
        productId = purchase.ebook_id;
        price = purchase.ebooks.price || 0;
      } else if (purchase.course_id && purchase.courses) {
        productId = purchase.course_id;
        price = purchase.courses.price || 0;
      }

      // Adiciona à receita total
      calculatedTotalRevenue += price;

      // Adiciona à contagem de vendas do produto
      if (productId) {
        salesCountMap.set(productId, (salesCountMap.get(productId) || 0) + 1);
      }
    }
  }

  const stats: Stats = {
    totalRevenue: calculatedTotalRevenue,
    totalSales: purchasesData.data?.length || 0,
    totalProducts:
      (ebooksData.data?.length || 0) + (coursesData.data?.length || 0),
    totalUsers: usersData.data?.length || 0,
  };

  // --- 5. Formatar os dados para passar ao cliente ---

  const ebooks: Ebook[] = (ebooksData.data || []).map((e) => ({
    ...e,
    price: e.price || 0,
    sales: salesCountMap.get(e.id) || 0,
    cover_image_path: e.cover_image_path,
    pdf_file_path: e.pdf_file_path,
  }));

  const courses: Course[] = (coursesData.data || []).map((c) => ({
    ...c,
    price: c.price || 0,
    sales: salesCountMap.get(c.id) || 0,
    thumbnail_path: c.thumbnail_path,
  }));

  // Contagem de Compras por Usuário
  const purchaseCountMap = new Map<string, number>();
  if (purchasesData.data) {
    for (const purchase of purchasesData.data) {
      purchaseCountMap.set(
        purchase.user_id,
        (purchaseCountMap.get(purchase.user_id) || 0) + 1
      );
    }
  }

  const users: User[] = (usersData.data || []).map((p: any) => ({
    id: p.id,
    full_name: p.full_name,
    email: p.users?.email || "N/A",
    created_at: p.created_at,
    purchases: purchaseCountMap.get(p.id) || 0,
  }));

  // --- 6. Renderizar a Página ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão "Sair" funcional */}
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
                  Área Administrativa
                </h1>
                <p className="text-sm text-gray-600">Carol das Virgens</p>
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
        {/* Passamos todos os dados pré-buscados para o Componente de Cliente */}
        <AdminClientPage
          stats={stats}
          ebooks={ebooks}
          courses={courses}
          users={users}
        />
      </div>
    </div>
  );
}
