CREATE TABLE public.saved_meditations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  feeling TEXT NOT NULL,
  shift_target TEXT NOT NULL,
  pillar TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_meditations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meditations"
ON public.saved_meditations FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meditations"
ON public.saved_meditations FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own meditations"
ON public.saved_meditations FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all meditations"
ON public.saved_meditations FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));