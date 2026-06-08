
-- 1. energy_reading_sessions: allow owners to insert/update their own rows
CREATE POLICY "Users can insert own energy reading sessions"
  ON public.energy_reading_sessions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own energy reading sessions"
  ON public.energy_reading_sessions
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. Require verified email for enrollment-based access
DROP POLICY IF EXISTS "Users view own enrollment by email" ON public.sovereign_enrollments;
CREATE POLICY "Users view own enrollment by verified email"
  ON public.sovereign_enrollments
  FOR SELECT TO authenticated
  USING (
    COALESCE((auth.jwt() ->> 'email_verified')::boolean, false) = true
    AND lower(email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
  );

DROP POLICY IF EXISTS "enrolled can view published transmissions" ON public.sovereign_audio_transmissions;
CREATE POLICY "enrolled can view published transmissions"
  ON public.sovereign_audio_transmissions
  FOR SELECT TO authenticated
  USING (
    is_published = true
    AND COALESCE((auth.jwt() ->> 'email_verified')::boolean, false) = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
    )
  );

DROP POLICY IF EXISTS "enrolled view published calls" ON public.sovereign_live_calls;
CREATE POLICY "enrolled view published calls"
  ON public.sovereign_live_calls
  FOR SELECT TO authenticated
  USING (
    is_published = true
    AND COALESCE((auth.jwt() ->> 'email_verified')::boolean, false) = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
    )
  );

DROP POLICY IF EXISTS "enrolled read posts" ON public.sovereign_community_posts;
CREATE POLICY "enrolled read posts"
  ON public.sovereign_community_posts
  FOR SELECT TO authenticated
  USING (
    is_hidden = false
    AND COALESCE((auth.jwt() ->> 'email_verified')::boolean, false) = true
    AND EXISTS (
      SELECT 1 FROM public.sovereign_enrollments e
      WHERE lower(e.email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
    )
  );

-- 3. Fix function search_path mutable warnings
CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;
