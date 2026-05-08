CREATE TABLE public.blood_type_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  blood_type TEXT NOT NULL CHECK (blood_type IN ('O', 'A', 'B', 'AB')),
  rh_factor TEXT NOT NULL CHECK (rh_factor IN ('positive', 'negative')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blood_type_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own blood type results"
ON public.blood_type_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own blood type results"
ON public.blood_type_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own blood type results"
ON public.blood_type_results FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all blood type results"
ON public.blood_type_results FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));