
DROP POLICY IF EXISTS "Users can insert own progress" ON public.challenge_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.challenge_progress;

CREATE POLICY "Users can insert own progress"
ON public.challenge_progress
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON public.challenge_progress
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
