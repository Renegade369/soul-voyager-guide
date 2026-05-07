
-- Drop all existing user-facing policies
DROP POLICY IF EXISTS "Users can view own progress" ON public.challenge_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.challenge_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.challenge_progress;
DROP POLICY IF EXISTS "Admins can view all progress" ON public.challenge_progress;

-- Recreate with explicit TO authenticated
CREATE POLICY "Users can select own progress"
ON public.challenge_progress
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
ON public.challenge_progress
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON public.challenge_progress
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress"
ON public.challenge_progress
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
