
-- Static curriculum lives in code; we persist per-user lesson progress + audio catalog/plays.

CREATE TABLE public.sovereign_module_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module_slug text NOT NULL,
  lesson_slug text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_slug, lesson_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_module_progress TO authenticated;
GRANT ALL ON public.sovereign_module_progress TO service_role;
ALTER TABLE public.sovereign_module_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own module progress" ON public.sovereign_module_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_sovereign_module_progress_updated
  BEFORE UPDATE ON public.sovereign_module_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.sovereign_audio_transmissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  module_slug text,
  tier_required text NOT NULL DEFAULT 'digital', -- 'digital' | 'complete'
  audio_url text NOT NULL,
  duration_seconds integer,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sovereign_audio_transmissions TO authenticated;
GRANT ALL ON public.sovereign_audio_transmissions TO service_role;
ALTER TABLE public.sovereign_audio_transmissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrolled can view published transmissions"
  ON public.sovereign_audio_transmissions
  FOR SELECT TO authenticated
  USING (
    is_published = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );
CREATE TRIGGER trg_sovereign_audio_updated
  BEFORE UPDATE ON public.sovereign_audio_transmissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.sovereign_audio_plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  transmission_slug text NOT NULL,
  last_position_seconds integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  play_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, transmission_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_audio_plays TO authenticated;
GRANT ALL ON public.sovereign_audio_plays TO service_role;
ALTER TABLE public.sovereign_audio_plays ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own audio plays" ON public.sovereign_audio_plays
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_sovereign_audio_plays_updated
  BEFORE UPDATE ON public.sovereign_audio_plays
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
