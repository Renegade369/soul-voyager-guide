
-- 1) sessions: tighten INSERT WITH CHECK so authenticated users must own the row.
DROP POLICY IF EXISTS "Anyone can insert sessions" ON public.sessions;
CREATE POLICY "Anyone can insert sessions"
  ON public.sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- 2) sovereign_assistant_escalations: add INSERT policy gated on ownership + enrollment + verified email.
CREATE POLICY "Users insert own escalations"
  ON public.sovereign_assistant_escalations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND COALESCE(((auth.jwt() ->> 'email_verified')::boolean), false) = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(COALESCE((auth.jwt() ->> 'email'), ''))
    )
  );

-- 3) sovereign_assistant_settings: add INSERT and UPDATE policies scoped to the row owner.
CREATE POLICY "Users insert own settings"
  ON public.sovereign_assistant_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own settings"
  ON public.sovereign_assistant_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4) sovereign_community_posts: tighten INSERT to require enrollment + verified email.
DROP POLICY IF EXISTS "own posts insert" ON public.sovereign_community_posts;
CREATE POLICY "own posts insert"
  ON public.sovereign_community_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND COALESCE(((auth.jwt() ->> 'email_verified')::boolean), false) = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(COALESCE((auth.jwt() ->> 'email'), ''))
    )
  );
