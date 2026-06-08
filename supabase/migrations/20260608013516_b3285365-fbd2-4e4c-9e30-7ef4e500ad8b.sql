
CREATE TABLE public.sovereign_onboarding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  sacred_contract_signed_at TIMESTAMPTZ,
  intention_one TEXT,
  intention_two TEXT,
  intention_three TEXT,
  why_now TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.sovereign_onboarding TO authenticated;
GRANT ALL ON public.sovereign_onboarding TO service_role;
ALTER TABLE public.sovereign_onboarding ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own onboarding" ON public.sovereign_onboarding
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_sovereign_onboarding_updated_at
  BEFORE UPDATE ON public.sovereign_onboarding
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.sovereign_rituals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ritual_date DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  morning_completed_at TIMESTAMPTZ,
  evening_completed_at TIMESTAMPTZ,
  reflection TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, ritual_date)
);
GRANT SELECT, INSERT, UPDATE ON public.sovereign_rituals TO authenticated;
GRANT ALL ON public.sovereign_rituals TO service_role;
ALTER TABLE public.sovereign_rituals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own rituals" ON public.sovereign_rituals
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_sovereign_rituals_user_date ON public.sovereign_rituals(user_id, ritual_date DESC);
CREATE TRIGGER update_sovereign_rituals_updated_at
  BEFORE UPDATE ON public.sovereign_rituals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
