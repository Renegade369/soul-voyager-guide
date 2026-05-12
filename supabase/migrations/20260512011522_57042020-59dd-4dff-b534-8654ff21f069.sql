
-- Upgrade 7: Shareable Soul Profile
CREATE TABLE public.shared_profiles (
  id TEXT PRIMARY KEY,
  profile_data JSONB NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shared_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view shared profiles" ON public.shared_profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can create shared profiles" ON public.shared_profiles FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update view count" ON public.shared_profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Upgrade 9: User Readings
CREATE TABLE public.user_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reading_type TEXT NOT NULL,
  result_data JSONB NOT NULL,
  shared_profile_id TEXT REFERENCES public.shared_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own readings" ON public.user_readings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own readings" ON public.user_readings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own readings" ON public.user_readings FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all readings" ON public.user_readings FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE INDEX idx_user_readings_user ON public.user_readings(user_id, created_at DESC);

-- Upgrade 10: Subscribers
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view subscribers" ON public.subscribers FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Upgrade 11: Consciousness Data
CREATE TABLE public.consciousness_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aura_color TEXT,
  dominant_energy TEXT,
  soul_archetype TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.consciousness_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view consciousness data" ON public.consciousness_data FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can add consciousness data" ON public.consciousness_data FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX idx_consciousness_created ON public.consciousness_data(created_at DESC);
