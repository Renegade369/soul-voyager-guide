
-- 1. profiles
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  challenge_started_at timestamptz,
  challenge_completed_at timestamptz,
  certificate_earned_at timestamptz
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. challenge_progress
CREATE TABLE public.challenge_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  day_number integer NOT NULL CHECK (day_number BETWEEN 1 AND 10),
  completed boolean DEFAULT false,
  completed_at timestamptz,
  UNIQUE(user_id, day_number)
);
ALTER TABLE public.challenge_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own progress" ON public.challenge_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.challenge_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all progress" ON public.challenge_progress FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. test_results
CREATE TABLE public.test_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  attempt_number integer DEFAULT 1,
  score integer NOT NULL,
  percentage integer NOT NULL,
  passed boolean NOT NULL,
  answers jsonb,
  taken_at timestamptz DEFAULT now()
);
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own results" ON public.test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON public.test_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all results" ON public.test_results FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. certificates
CREATE TABLE public.certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
  full_name text NOT NULL,
  score integer NOT NULL,
  issued_at timestamptz DEFAULT now()
);
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cert" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cert" ON public.certificates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cert" ON public.certificates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all certs" ON public.certificates FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 5. contacts (lead capture)
CREATE TABLE public.contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  city text,
  state text,
  country text,
  marketing_consent boolean DEFAULT false,
  consent_date timestamptz,
  lead_source text,
  tags text[],
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contacts FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view contacts" ON public.contacts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update contacts" ON public.contacts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete contacts" ON public.contacts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 6. events (analytics)
CREATE TABLE public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  session_id text NOT NULL,
  event_type text NOT NULL,
  section text,
  properties jsonb,
  duration_ms integer,
  occurred_at timestamptz DEFAULT now()
);
CREATE INDEX events_user_idx ON public.events(user_id);
CREATE INDEX events_type_idx ON public.events(event_type);
CREATE INDEX events_time_idx ON public.events(occurred_at);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert events" ON public.events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read events" ON public.events FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 7. sessions (analytics)
CREATE TABLE public.sessions (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration_ms integer,
  pages_visited text[],
  entry_page text,
  exit_page text,
  device_type text,
  country text,
  city text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own sessions" ON public.sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert sessions" ON public.sessions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read all sessions" ON public.sessions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
