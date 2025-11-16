import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  // Cria um cliente Supabase do lado do servidor
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // O `set` pode falhar em Server Components estaticamente renderizados
            // ou quando se tenta definir um cookie em um Server Action.
            // Nestes casos, podemos ignorar o erro com segurança.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // O `set` pode falhar em Server Components estaticamente renderizados
            // ou quando se tenta definir um cookie em um Server Action.
            // Nestes casos, podemos ignorar o erro com segurança.
          }
        },
      },
    }
  )
}