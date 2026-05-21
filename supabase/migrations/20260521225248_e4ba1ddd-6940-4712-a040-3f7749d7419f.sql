-- Transmissions history
CREATE TABLE public.transmissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emotional_state text NOT NULL,
  intention text NOT NULL,
  script text NOT NULL,
  seal text,
  audio_path text,
  profile_snapshot jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.transmissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own transmissions"
  ON public.transmissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own transmissions"
  ON public.transmissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own transmissions"
  ON public.transmissions FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all transmissions"
  ON public.transmissions FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_transmissions_user_created
  ON public.transmissions(user_id, created_at DESC);

-- Transmission credits / All Access flag
CREATE TABLE public.transmission_credits (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits int NOT NULL DEFAULT 0,
  all_access boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.transmission_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own credits"
  ON public.transmission_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all credits"
  ON public.transmission_credits FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage credits"
  ON public.transmission_credits FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER set_transmission_credits_updated
  BEFORE UPDATE ON public.transmission_credits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Private storage bucket for transmission audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('transmissions', 'transmissions', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users read own transmission audio"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'transmissions'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
