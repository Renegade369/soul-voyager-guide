
ALTER TABLE public.sovereign_rituals ADD COLUMN IF NOT EXISTS evening_reflection text;

CREATE TABLE public.sovereign_live_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  join_url text,
  recording_url text,
  tier_required text NOT NULL DEFAULT 'complete',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sovereign_live_calls TO authenticated;
GRANT ALL ON public.sovereign_live_calls TO service_role;
ALTER TABLE public.sovereign_live_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrolled view published calls" ON public.sovereign_live_calls
  FOR SELECT TO authenticated
  USING (
    is_published = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );
CREATE TRIGGER trg_sovereign_live_calls_updated
  BEFORE UPDATE ON public.sovereign_live_calls
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.sovereign_community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  author_display_name text NOT NULL,
  title text,
  body text NOT NULL,
  is_hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sovereign_community_posts TO authenticated;
GRANT ALL ON public.sovereign_community_posts TO service_role;
ALTER TABLE public.sovereign_community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrolled read posts" ON public.sovereign_community_posts
  FOR SELECT TO authenticated
  USING (
    is_hidden = false
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );
CREATE POLICY "own posts insert" ON public.sovereign_community_posts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own posts update" ON public.sovereign_community_posts
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own posts delete" ON public.sovereign_community_posts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
CREATE TRIGGER trg_sovereign_community_posts_updated
  BEFORE UPDATE ON public.sovereign_community_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_sovereign_community_posts_created ON public.sovereign_community_posts (created_at DESC);
