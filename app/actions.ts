'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function purchaseProductAction(formData: FormData) {
  const supabase = createClient()

  // 1. Verificar se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // Se não estiver logado, redireciona para o login
    return redirect('/login')
  }

  // 2. Obter os dados do produto do formulário
  const productId = formData.get('product_id') as string
  const productType = formData.get('product_type') as string // 'ebook' ou 'course'

  if (!productId || !productType) {
    // Lidar com erro - idealmente redirecionar com uma mensagem
    return redirect('/?error=Produto inválido')
  }

  // 3. Preparar os dados da compra
  let purchaseData: {
    user_id: string
    ebook_id?: string
    course_id?: string
  } = {
    user_id: user.id,
  }

  if (productType === 'ebook') {
    purchaseData.ebook_id = productId
  } else if (productType === 'course') {
    purchaseData.course_id = productId
  }

  // 4. Inserir a compra no banco de dados
  const { error } = await supabase
    .from('user_purchases')
    .insert(purchaseData)

  if (error) {
    // O '23505' é o código de erro do PostgreSQL para 'unique_violation'
    // que definimos no nosso SQL. Isso significa que o usuário já comprou.
    if (error.code === '23505') {
      // O usuário já possui este item.
      // Apenas o redirecione para o dashboard.
      revalidatePath('/dashboard')
      return redirect('/dashboard?message=Você já possui este item.')
    }

    // Outro erro
    console.error('Erro na compra:', error)
    return redirect(`/?error=${error.message}`)
  }

  // 5. Sucesso!
  // Revalida o dashboard (limpa o cache) e redireciona o usuário
  revalidatePath('/dashboard')
  redirect('/dashboard?success=Compra realizada com sucesso!')
}

export async function signOutAction() {
  const supabase = createClient()
  // Limpa a sessão do usuário
  await supabase.auth.signOut()
  // Redireciona para a página inicial
  return redirect('/')
}

// A função createSignedPdfUrlAction foi REMOVIDA.