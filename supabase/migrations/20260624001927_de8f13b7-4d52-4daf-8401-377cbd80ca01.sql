CREATE TABLE public.sovereign_email_sequence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES public.sovereign_enrollments(id) ON DELETE CASCADE,
  email_key text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  sent_at timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','failed')),
  tier text NOT NULL CHECK (tier IN ('digital','complete')),
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (enrollment_id, email_key)
);

CREATE INDEX idx_sovereign_email_sequence_enrollment ON public.sovereign_email_sequence(enrollment_id, email_key);
CREATE INDEX idx_sovereign_email_sequence_due ON public.sovereign_email_sequence(status, scheduled_for) WHERE status = 'pending';

GRANT SELECT ON public.sovereign_email_sequence TO authenticated;
GRANT ALL ON public.sovereign_email_sequence TO service_role;

ALTER TABLE public.sovereign_email_sequence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read own sequence rows"
ON public.sovereign_email_sequence
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.sovereign_enrollments e
    JOIN auth.users u ON lower(u.email) = lower(e.email)
    WHERE e.id = sovereign_email_sequence.enrollment_id
      AND u.id = auth.uid()
  )
);

CREATE POLICY "Service role manages sequence"
ON public.sovereign_email_sequence
FOR ALL
TO service_role
USING (true) WITH CHECK (true);