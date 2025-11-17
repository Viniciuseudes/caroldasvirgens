-- Adiciona colunas para contagem de aulas e duração em horas
ALTER TABLE public.courses
  ADD COLUMN lessons_count INT DEFAULT 0,
  ADD COLUMN duration_hours INT DEFAULT 0;