
-- 1. energy_reading_sessions: drop permissive anon policies (table is admin/service-role only)
DROP POLICY IF EXISTS "Anyone can create energy reading session" ON public.energy_reading_sessions;
DROP POLICY IF EXISTS "Anyone can update energy reading session" ON public.energy_reading_sessions;

-- 2. shared_profiles: replace permissive UPDATE with a security-definer RPC for view count
DROP POLICY IF EXISTS "Anyone can update view count" ON public.shared_profiles;

CREATE OR REPLACE FUNCTION public.increment_shared_profile_views(_id text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.shared_profiles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = _id;
$$;

REVOKE ALL ON FUNCTION public.increment_shared_profile_views(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_shared_profile_views(text) TO anon, authenticated;

-- 3. soul_discovery_sessions: add explicit admin-only SELECT so RLS has at least one policy.
-- The table is otherwise written/read by edge functions using the service role (bypasses RLS).
CREATE POLICY "Admins can view discovery sessions"
ON public.soul_discovery_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4. Lock down internal helper functions from direct client execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
