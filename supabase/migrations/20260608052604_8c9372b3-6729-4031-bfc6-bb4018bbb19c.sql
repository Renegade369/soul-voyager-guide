
-- sovereign_module_responses
CREATE TABLE public.sovereign_module_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug text NOT NULL,
  exercise_id text NOT NULL,
  response_text text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_slug, exercise_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_module_responses TO authenticated;
GRANT ALL ON public.sovereign_module_responses TO service_role;
ALTER TABLE public.sovereign_module_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own module responses"
  ON public.sovereign_module_responses
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_sovereign_module_responses_updated
  BEFORE UPDATE ON public.sovereign_module_responses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- sovereign_milestones
CREATE TABLE public.sovereign_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  milestone text NOT NULL,
  module_slug text,
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, milestone)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_milestones TO authenticated;
GRANT ALL ON public.sovereign_milestones TO service_role;
ALTER TABLE public.sovereign_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own milestones"
  ON public.sovereign_milestones
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Track when a module first becomes available, for the 14-day fallback unlock.
CREATE TABLE public.sovereign_module_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug text NOT NULL,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_module_unlocks TO authenticated;
GRANT ALL ON public.sovereign_module_unlocks TO service_role;
ALTER TABLE public.sovereign_module_unlocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own module unlocks"
  ON public.sovereign_module_unlocks
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
