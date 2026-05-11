
CREATE TABLE public.energy_reading_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  user_id uuid,
  aura_result jsonb,
  iris_result jsonb,
  fingerprint_result jsonb,
  mood_answers jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.energy_reading_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can create a session (anonymous flow)
CREATE POLICY "Anyone can create energy reading session"
ON public.energy_reading_sessions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can update a session row by id (writes are scoped via the id known only to that client)
CREATE POLICY "Anyone can update energy reading session"
ON public.energy_reading_sessions FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Admins can view all
CREATE POLICY "Admins can view all energy reading sessions"
ON public.energy_reading_sessions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Users can view their own (when logged in and user_id matches)
CREATE POLICY "Users can view own energy reading sessions"
ON public.energy_reading_sessions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER update_energy_reading_sessions_updated_at
BEFORE UPDATE ON public.energy_reading_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
