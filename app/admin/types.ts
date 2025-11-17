// Tipos para nossos dados reais
export type Ebook = {
  id: string
  title: string
  price: number
  created_at: string
  sales: number
  cover_image_path: string | null
  pdf_file_path: string | null    
}

export type Course = {
  id: string
  title: string
  price: number
  created_at: string
  sales: number
thumbnail_path: string | null
}

export type User = {
  id: string
  full_name: string | null
  email: string | null
  created_at: string
  purchases: number // Adicionaremos esta contagem
}

export type Stats = {
  totalRevenue: number
  totalSales: number
  totalProducts: number
  totalUsers: number
}