
-- Phase 2 schema additions

-- 1. Extend sovereign_onboarding
ALTER TABLE public.sovereign_onboarding
  ADD COLUMN IF NOT EXISTS cert_name text,
  ADD COLUMN IF NOT EXISTS wake_time time,
  ADD COLUMN IF NOT EXISTS timezone text,
  ADD COLUMN IF NOT EXISTS meditation_voice text DEFAULT 'erin';

-- 2. Extend sovereign_enrollments
ALTER TABLE public.sovereign_enrollments
  ADD COLUMN IF NOT EXISTS cert_name text,
  ADD COLUMN IF NOT EXISTS wake_time time DEFAULT '07:00',
  ADD COLUMN IF NOT EXISTS timezone text,
  ADD COLUMN IF NOT EXISTS meditation_voice text DEFAULT 'erin';

-- 3. New table: sovereign_ritual_completions
CREATE TABLE IF NOT EXISTS public.sovereign_ritual_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES public.sovereign_enrollments(id) ON DELETE SET NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  day_number int,
  skipped boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_ritual_completions TO authenticated;
GRANT ALL ON public.sovereign_ritual_completions TO service_role;

ALTER TABLE public.sovereign_ritual_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ritual_completions_select_own" ON public.sovereign_ritual_completions;
CREATE POLICY "ritual_completions_select_own"
  ON public.sovereign_ritual_completions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ritual_completions_insert_own" ON public.sovereign_ritual_completions;
CREATE POLICY "ritual_completions_insert_own"
  ON public.sovereign_ritual_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ritual_completions_user_date
  ON public.sovereign_ritual_completions (user_id, completed_at DESC);
