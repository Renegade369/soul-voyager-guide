ALTER TABLE public.consciousness_data
  ADD COLUMN IF NOT EXISTS reader_type text,
  ADD COLUMN IF NOT EXISTS life_path_number integer,
  ADD COLUMN IF NOT EXISTS sun_sign text,
  ADD COLUMN IF NOT EXISTS awakening_stage text,
  ADD COLUMN IF NOT EXISTS dominant_emotion text,
  ADD COLUMN IF NOT EXISTS primary_focus text,
  ADD COLUMN IF NOT EXISTS geographic_region text;

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS opted_in_consciousness_map boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_consciousness_reader_type ON public.consciousness_data(reader_type);
CREATE INDEX IF NOT EXISTS idx_consciousness_created_at ON public.consciousness_data(created_at DESC);