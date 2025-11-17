-- PASS0 1: TABELA DE PERFIS DE USUÁRIO (profiles)
-- Esta tabela armazena dados públicos dos usuários, como nome completo.
-- Ela é vinculada à tabela de autenticação (auth.users) pelo ID.
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Função helper para criar um perfil automaticamente quando um novo usuário se cadastra
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que chama a função acima após cada novo cadastro
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

---

-- PASSO 2: TABELA DE PRODUTOS (ebooks)
-- Armazena as informações dos e-books que o admin vai cadastrar.
CREATE TABLE public.ebooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  cover_image_url TEXT, -- URL da imagem de capa vinda do Storage
  pdf_file_url TEXT,    -- URL do PDF vinda do Storage
  created_at TIMESTAMPTZ DEFAULT NOW()
);

---

-- PASSO 3: TABELA DE PRODUTOS (courses)
-- Armazena as informações dos cursos (baseados no YouTube).
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  thumbnail_url TEXT,   -- URL da thumbnail vinda do Storage
  youtube_playlist_url TEXT, -- Link da playlist "Não Listada"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

---

-- PASSO 4: TABELA DE COMPRAS (user_purchases)
-- Tabela-chave que vincula usuários aos produtos que eles "compraram".
CREATE TABLE public.user_purchases (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ebook_id UUID REFERENCES public.ebooks(id) ON DELETE SET NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Garante que um usuário não possa comprar o mesmo item múltiplas vezes (opcional, mas bom)
  CONSTRAINT unique_ebook_purchase UNIQUE(user_id, ebook_id),
  CONSTRAINT unique_course_purchase UNIQUE(user_id, course_id),
  
  -- Garante que cada registro de compra seja ou de um e-book OU de um curso, não ambos.
  CONSTRAINT check_one_product CHECK (
    (ebook_id IS NOT NULL AND course_id IS NULL) OR 
    (ebook_id IS NULL AND course_id IS NOT NULL)
  )
);

---

-- PASSO 5: HABILITAR ROW LEVEL SECURITY (RLS)
-- Esta é a camada de segurança do Supabase. Por padrão, ninguém pode ver nada.
-- Vamos habilitar o RLS em todas as nossas novas tabelas.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

---

-- PASSO 6: CRIAR AS POLÍTICAS DE ACESSO (POLICIES)
-- Agora, definimos as "regras" de quem pode fazer o quê.

-- Tabela profiles:
-- 1. Usuários podem ver seu PRÓPRIO perfil.
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);
-- 2. Usuários podem atualizar seu PRÓPRIO perfil.
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tabelas ebooks e courses (Produtos):
-- 1. QUALQUER pessoa (logada ou não) pode ver os produtos.
-- (Isso é necessário para a sua homepage `app/page.tsx` funcionar)
CREATE POLICY "Allow public read access to products."
  ON public.ebooks FOR SELECT
  USING (true);
  
CREATE POLICY "Allow public read access to products."
  ON public.courses FOR SELECT
  USING (true);

-- Tabela user_purchases (Compras):
-- 1. Usuários podem ver APENAS as SUAS PRÓPRIAS compras.
-- (Esta é a política de segurança mais importante para o dashboard)
CREATE POLICY "Users can view their own purchases."
  ON public.user_purchases FOR SELECT
  USING (auth.uid() = user_id);

---

-- PASSO 7: CRIAR OS "BUCKETS" DE ARMAZENAMENTO (STORAGE)
-- Precisamos de pastas para guardar os uploads de arquivos.

-- Bucket para capas de e-books e PDFs
-- (Definindo como 'public' para que possamos mostrar a capa e o usuário possa baixar o PDF)
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebook_files', 'ebook_files', TRUE);

-- Bucket para thumbnails dos cursos
-- (Definindo como 'public' para que possamos mostrar a thumbnail na homepage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('course_thumbnails', 'course_thumbnails', TRUE);