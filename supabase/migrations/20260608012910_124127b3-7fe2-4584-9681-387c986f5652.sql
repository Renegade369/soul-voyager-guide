
CREATE TABLE public.sovereign_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('digital','complete')),
  stripe_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount_cents INTEGER,
  currency TEXT DEFAULT 'usd',
  environment TEXT NOT NULL DEFAULT 'sandbox',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_sovereign_enrollments_email ON public.sovereign_enrollments(lower(email));
GRANT SELECT ON public.sovereign_enrollments TO authenticated;
GRANT ALL ON public.sovereign_enrollments TO service_role;
ALTER TABLE public.sovereign_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own enrollment by email" ON public.sovereign_enrollments
  FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce((auth.jwt() ->> 'email'), '')));

CREATE TABLE public.sovereign_vip_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX idx_sovereign_vip_email ON public.sovereign_vip_waitlist(lower(email));
GRANT INSERT ON public.sovereign_vip_waitlist TO anon, authenticated;
GRANT ALL ON public.sovereign_vip_waitlist TO service_role;
ALTER TABLE public.sovereign_vip_waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join VIP waitlist" ON public.sovereign_vip_waitlist
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE TRIGGER update_sovereign_enrollments_updated_at
  BEFORE UPDATE ON public.sovereign_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
