'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function purchaseProductAction(formData: FormData) {
  const supabase = createClient()

  // 1. Verificar se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  // 2. Obter os dados do produto do formulário
  const productId = formData.get('product_id') as string
  const productType = formData.get('product_type') as string // 'ebook' ou 'course'

  if (!productId || !productType) {
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
    if (error.code === '23505') {
      revalidatePath('/dashboard')
      return redirect('/dashboard?message=Você já possui este item.')
    }
    console.error('Erro na compra:', error)
    return redirect(`/?error=${error.message}`)
  }

  // 5. Sucesso!
  revalidatePath('/dashboard')
  redirect('/dashboard?success=Compra realizada com sucesso!')
}

export async function signOutAction() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/')
}


// --- NOVA AÇÃO PARA PDF SEGURO ---
export async function createSignedPdfUrlAction(pdfPath: string): Promise<{
  success: boolean;
  message: string;
  url: string | null;
}> {
  'use server' // Garante que isso é uma Server Action

  const supabase = createClient()

  // 1. Verifica se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Usuário não autenticado.', url: null }
  }
  
  // 2. Tenta criar uma URL assinada (temporária)
  // O Supabase irá checar nossa Política de RLS (Passo 1)
  // e SÓ VAI FUNCIONAR se o usuário logado tiver comprado o e-book
  // com o 'pdf_file_path' correspondente.
  const { data, error } = await supabase.storage
    .from('ebook_files')
    .createSignedUrl(pdfPath, 3600) // 3600 segundos = 1 hora de validade

  if (error) {
    console.error('Erro ao criar URL assinada:', error)
    // Este erro pode significar que o usuário NÃO TEM permissão (compra)
    return { success: false, message: 'Não foi possível acessar o e-book. Verifique sua compra.', url: null }
  }

  // 3. Sucesso
  return { success: true, message: 'URL gerada com sucesso.', url: data.signedUrl }
}