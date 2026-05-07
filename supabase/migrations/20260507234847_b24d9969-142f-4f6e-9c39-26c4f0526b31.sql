
CREATE TABLE public.soul_quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  soul_type TEXT NOT NULL,
  scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.soul_quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz results"
  ON public.soul_quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON public.soul_quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own quiz results"
  ON public.soul_quiz_results FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all quiz results"
  ON public.soul_quiz_results FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
