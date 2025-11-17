'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type FormState = {
  success: boolean
  message: string | null
}

export async function addEbookAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient()
  const title = formData.get('title') as string
  const price = formData.get('price') as string
  const description = formData.get('description') as string
  const coverImageFile = formData.get('cover') as File
  const pdfFile = formData.get('file') as File

  if (!title || !price || !coverImageFile || !pdfFile) {
    return { success: false, message: 'Todos os campos, incluindo capa e PDF, são obrigatórios.' }
  }

  // --- Upload da Capa ---
  const coverPath = `covers/${Date.now()}_${coverImageFile.name}`
  const { error: coverError } = await supabase.storage
    .from('ebook_files')
    .upload(coverPath, coverImageFile)
  if (coverError) return { success: false, message: `Erro ao enviar capa: ${coverError.message}` }
  const { data: coverUrlData } = supabase.storage.from('ebook_files').getPublicUrl(coverPath)

  // --- Upload do PDF ---
  const pdfPath = `pdfs/${Date.now()}_${pdfFile.name}`
  const { error: pdfError } = await supabase.storage
    .from('ebook_files')
    .upload(pdfPath, pdfFile)
  if (pdfError) return { success: false, message: `Erro ao enviar PDF: ${pdfError.message}` }
  const { data: pdfUrlData } = supabase.storage.from('ebook_files').getPublicUrl(pdfPath)

  // --- Inserir no Banco de Dados ---
  const { error: dbError } = await supabase.from('ebooks').insert({
    title,
    description,
    price: parseFloat(price),
    cover_image_url: coverUrlData.publicUrl,
    pdf_file_url: pdfUrlData.publicUrl,
    cover_image_path: coverPath, // <-- ADICIONADO
    pdf_file_path: pdfPath,       // <-- ADICIONADO
  })
  if (dbError) return { success: false, message: `Erro ao salvar e-book: ${dbError.message}` }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true, message: 'E-book adicionado com sucesso!' }
}


export async function addCourseAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient()
  const title = formData.get('title') as string
  const price = formData.get('price') as string
  const description = formData.get('description') as string
  const youtube_playlist_url = formData.get('youtube_playlist_url') as string
  const thumbnailFile = formData.get('thumbnail') as File
  const lessons_count = formData.get('lessons_count') as string
  const duration_hours = formData.get('duration_hours') as string

  if (!title || !price || !youtube_playlist_url || !thumbnailFile || !lessons_count || !duration_hours) {
    return { success: false, message: 'Todos os campos são obrigatórios.' }
  }

  // --- Upload da Thumbnail ---
  const thumbnailPath = `thumbnails/${Date.now()}_${thumbnailFile.name}`
  const { error: thumbnailError } = await supabase.storage
    .from('course_thumbnails')
    .upload(thumbnailPath, thumbnailFile)
  if (thumbnailError) return { success: false, message: `Erro ao enviar thumbnail: ${thumbnailError.message}` }
  const { data: thumbnailUrlData } = supabase.storage.from('course_thumbnails').getPublicUrl(thumbnailPath)

  // --- Inserir no Banco de Dados ---
  const { error: dbError } = await supabase.from('courses').insert({
    title,
    description,
    price: parseFloat(price),
    thumbnail_url: thumbnailUrlData.publicUrl,
    youtube_playlist_url,
    lessons_count: parseInt(lessons_count, 10),
    duration_hours: parseInt(duration_hours, 10),
    thumbnail_path: thumbnailPath, // <-- ADICIONADO
  })
  if (dbError) return { success: false, message: `Erro ao salvar curso: ${dbError.message}` }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true, message: 'Curso adicionado com sucesso!' }
}


// --- NOVA AÇÃO DE DELETAR ---
export async function deleteProductAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient()

  // 1. Obter dados
  const productId = formData.get('product_id') as string
  const productType = formData.get('product_type') as string // 'ebook' or 'course'
  
  // Caminhos dos arquivos para deletar
  const coverPath = formData.get('cover_path') as string | null
  const pdfPath = formData.get('pdf_path') as string | null
  const thumbnailPath = formData.get('thumbnail_path') as string | null

  if (!productId || !productType) {
    return { success: false, message: 'ID ou tipo do produto inválido.' }
  }

  try {
    // 2. Deletar Arquivos do Storage
    if (productType === 'ebook') {
      const pathsToDelete = [coverPath, pdfPath].filter(Boolean) as string[]
      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('ebook_files')
          .remove(pathsToDelete)
        if (storageError) throw new Error(`Erro no Storage (ebook): ${storageError.message}`)
      }
      
      // 3. Deletar do Banco de Dados
      const { error: dbError } = await supabase.from('ebooks').delete().eq('id', productId)
      if (dbError) throw new Error(`Erro no DB (ebook): ${dbError.message}`)

    } else if (productType === 'course') {
      if (thumbnailPath) {
        const { error: storageError } = await supabase.storage
          .from('course_thumbnails')
          .remove([thumbnailPath])
        if (storageError) throw new Error(`Erro no Storage (curso): ${storageError.message}`)
      }
      
      // 3. Deletar do Banco de Dados
      const { error: dbError } = await supabase.from('courses').delete().eq('id', productId)
      if (dbError) throw new Error(`Erro no DB (curso): ${dbError.message}`)
    }

    // 4. Sucesso
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true, message: 'Produto deletado com sucesso!' }

  } catch (error: any) {
    return { success: false, message: error.message }
  }
}