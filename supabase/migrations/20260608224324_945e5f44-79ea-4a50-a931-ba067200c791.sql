
-- Sovereignty Code AI Assistant tables

CREATE TABLE public.sovereign_assistant_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  module_slug text,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.sovereign_assistant_threads TO authenticated;
GRANT ALL ON public.sovereign_assistant_threads TO service_role;
ALTER TABLE public.sovereign_assistant_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own thread" ON public.sovereign_assistant_threads
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own thread" ON public.sovereign_assistant_threads
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users insert own thread" ON public.sovereign_assistant_threads
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read all threads" ON public.sovereign_assistant_threads
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER set_updated_at_assistant_threads
  BEFORE UPDATE ON public.sovereign_assistant_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.sovereign_assistant_escalations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.sovereign_assistant_threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  question text NOT NULL,
  ai_attempted_answer text,
  confidence_score numeric,
  escalation_reason text NOT NULL CHECK (escalation_reason IN ('low_confidence','user_requested')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','replied','resolved')),
  william_reply text,
  module_slug text,
  escalated_at timestamptz NOT NULL DEFAULT now(),
  replied_at timestamptz,
  resolved_at timestamptz
);
CREATE INDEX idx_escalations_user ON public.sovereign_assistant_escalations(user_id);
CREATE INDEX idx_escalations_status ON public.sovereign_assistant_escalations(status, escalated_at);
GRANT SELECT ON public.sovereign_assistant_escalations TO authenticated;
GRANT ALL ON public.sovereign_assistant_escalations TO service_role;
ALTER TABLE public.sovereign_assistant_escalations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own escalations" ON public.sovereign_assistant_escalations
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all escalations" ON public.sovereign_assistant_escalations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update escalations" ON public.sovereign_assistant_escalations
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.sovereign_assistant_settings (
  user_id uuid PRIMARY KEY,
  window_start timestamptz NOT NULL,
  window_end timestamptz NOT NULL,
  tier_at_enrollment text NOT NULL,
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  total_messages integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.sovereign_assistant_settings TO authenticated;
GRANT ALL ON public.sovereign_assistant_settings TO service_role;
ALTER TABLE public.sovereign_assistant_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own settings" ON public.sovereign_assistant_settings
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all settings" ON public.sovereign_assistant_settings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
