
-- Wellness Products
CREATE TYPE public.wellness_category AS ENUM ('supplement','tool','book','candle','accessory','other');

CREATE TABLE public.wellness_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category public.wellness_category NOT NULL DEFAULT 'other',
  image text,
  description text,
  why_william_uses_it text,
  how_to_use text,
  buy_url text,
  is_featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.wellness_products TO anon, authenticated;
GRANT ALL ON public.wellness_products TO service_role;

ALTER TABLE public.wellness_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view wellness products"
  ON public.wellness_products FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage wellness products"
  ON public.wellness_products FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_wellness_products_updated_at
  BEFORE UPDATE ON public.wellness_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trusted Practitioners
CREATE TYPE public.practitioner_specialty AS ENUM ('healer','coach','bodyworker','energy_worker','therapist','other');

CREATE TABLE public.trusted_practitioners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  photo text,
  specialty public.practitioner_specialty NOT NULL DEFAULT 'other',
  location text,
  bio text,
  how_william_knows_them text,
  what_they_offer text,
  booking_url text,
  is_featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.trusted_practitioners TO anon, authenticated;
GRANT ALL ON public.trusted_practitioners TO service_role;

ALTER TABLE public.trusted_practitioners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view practitioners"
  ON public.trusted_practitioners FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage practitioners"
  ON public.trusted_practitioners FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_trusted_practitioners_updated_at
  BEFORE UPDATE ON public.trusted_practitioners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
