-- PASSO 3.2: POLÍTICAS DE ESCRITA (CRUD) PARA PRODUTOS (ADMIN)

-- 1. Permite que usuários LOGADOS (authenticated) gerenciem e-books
CREATE POLICY "Allow authenticated users to manage ebooks"
  ON public.ebooks
  FOR ALL -- 'ALL' cobre INSERT, UPDATE, DELETE
  TO authenticated
  USING (true) -- 'USING (true)' se aplica a SELECT
  WITH CHECK (true); -- 'WITH CHECK (true)' se aplica a INSERT/UPDATE

-- 2. Permite que usuários LOGADOS (authenticated) gerenciem cursos
CREATE POLICY "Allow authenticated users to manage courses"
  ON public.courses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);