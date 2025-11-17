-- PASSO 3.1: POLÍTICAS DE UPLOAD (INSERT) PARA O STORAGE

-- 1. Permite que usuários LOGADOS (authenticated) façam upload (INSERT)
--    no bucket 'ebook_files'.
CREATE POLICY "Allow authenticated users to upload to ebook_files"
  ON storage.objects FOR INSERT
  TO authenticated -- 'authenticated' é um grupo padrão do Supabase
  WITH CHECK (bucket_id = 'ebook_files');

-- 2. Permite que usuários LOGADOS (authenticated) façam upload (INSERT)
--    no bucket 'course_thumbnails'.
CREATE POLICY "Allow authenticated users to upload to course_thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'course_thumbnails');