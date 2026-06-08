
-- Extend subscribers
ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS unsubscribe_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz;

-- Backfill tokens for existing rows
UPDATE public.subscribers
  SET unsubscribe_token = gen_random_uuid()::text
  WHERE unsubscribe_token IS NULL;

-- Default for new inserts
ALTER TABLE public.subscribers
  ALTER COLUMN unsubscribe_token SET DEFAULT gen_random_uuid()::text;

ALTER TABLE public.subscribers
  ALTER COLUMN unsubscribe_token SET NOT NULL;

-- Ensure emails get lowercased + trimmed
CREATE OR REPLACE FUNCTION public.normalize_subscriber_email()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.email = lower(trim(NEW.email));
  IF NEW.unsubscribe_token IS NULL THEN
    NEW.unsubscribe_token = gen_random_uuid()::text;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS normalize_subscriber_email_trigger ON public.subscribers;
CREATE TRIGGER normalize_subscriber_email_trigger
  BEFORE INSERT OR UPDATE ON public.subscribers
  FOR EACH ROW EXECUTE FUNCTION public.normalize_subscriber_email();

-- Extend handle_new_user to also auto-subscribe to Journal
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');

  INSERT INTO public.subscribers (email, first_name, source, is_active)
  VALUES (
    new.email,
    new.raw_user_meta_data->>'full_name',
    'auth_signup',
    true
  )
  ON CONFLICT (email) DO UPDATE
    SET is_active = true,
        unsubscribed_at = NULL,
        first_name = COALESCE(EXCLUDED.first_name, public.subscribers.first_name);

  RETURN new;
END;
$$;

-- Journal email send log
CREATE TABLE IF NOT EXISTS public.journal_email_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id uuid REFERENCES public.subscribers(id) ON DELETE SET NULL,
  email text NOT NULL,
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  post_slug text,
  sent_at timestamptz NOT NULL DEFAULT now(),
  resend_id text,
  status text NOT NULL DEFAULT 'sent',
  error text
);

GRANT SELECT ON public.journal_email_sends TO authenticated;
GRANT ALL ON public.journal_email_sends TO service_role;

ALTER TABLE public.journal_email_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view journal email sends"
  ON public.journal_email_sends FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS journal_email_sends_post_idx ON public.journal_email_sends(post_id);
CREATE INDEX IF NOT EXISTS journal_email_sends_sent_at_idx ON public.journal_email_sends(sent_at DESC);

-- Tighten subscribers access: only admins can read; anonymous can still subscribe (existing policy).
-- Add an unsubscribe lookup policy via service role only (no public RLS bypass needed).
