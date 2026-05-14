-- Promo codes table
CREATE TABLE public.promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  unlocks text[] NOT NULL DEFAULT '{}',
  max_uses integer,
  uses_count integer NOT NULL DEFAULT 0,
  expires_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage promo codes select"
  ON public.promo_codes FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage promo codes insert"
  ON public.promo_codes FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage promo codes update"
  ON public.promo_codes FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage promo codes delete"
  ON public.promo_codes FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_promo_codes_updated_at
  BEFORE UPDATE ON public.promo_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Redemption log
CREATE TABLE public.promo_code_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id uuid REFERENCES public.promo_codes(id) ON DELETE SET NULL,
  code text NOT NULL,
  email text,
  reader_slug text NOT NULL,
  redeemed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.promo_code_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view redemptions"
  ON public.promo_code_redemptions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Redemption RPC: validates and increments atomically. SECURITY DEFINER so anon can call.
CREATE OR REPLACE FUNCTION public.redeem_promo_code(_code text, _reader text, _email text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _row public.promo_codes;
  _normalized text := upper(trim(_code));
BEGIN
  SELECT * INTO _row FROM public.promo_codes
    WHERE upper(code) = _normalized AND is_active = true
    FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid');
  END IF;

  IF _row.expires_at IS NOT NULL AND _row.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'expired');
  END IF;

  IF _row.max_uses IS NOT NULL AND _row.uses_count >= _row.max_uses THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'exhausted');
  END IF;

  IF NOT ('all' = ANY(_row.unlocks) OR _reader = ANY(_row.unlocks)) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'wrong_reader');
  END IF;

  UPDATE public.promo_codes SET uses_count = uses_count + 1 WHERE id = _row.id;
  INSERT INTO public.promo_code_redemptions (code_id, code, email, reader_slug)
    VALUES (_row.id, _row.code, _email, _reader);

  RETURN jsonb_build_object('ok', true, 'unlocks', _row.unlocks);
END;
$$;

GRANT EXECUTE ON FUNCTION public.redeem_promo_code(text, text, text) TO anon, authenticated;