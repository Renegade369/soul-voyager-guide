import { supabase } from "@/integrations/supabase/client";

export type WellnessCategory = "supplement" | "tool" | "book" | "candle" | "accessory" | "other";
export type PractitionerSpecialty = "healer" | "coach" | "bodyworker" | "energy_worker" | "therapist" | "other";

export type WellnessProduct = {
  id: string;
  name: string;
  slug: string;
  category: WellnessCategory;
  image: string | null;
  description: string | null;
  why_william_uses_it: string | null;
  how_to_use: string | null;
  buy_url: string | null;
  is_featured: boolean;
  display_order: number;
};

export type Practitioner = {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  specialty: PractitionerSpecialty;
  location: string | null;
  bio: string | null;
  how_william_knows_them: string | null;
  what_they_offer: string | null;
  booking_url: string | null;
  is_featured: boolean;
  display_order: number;
};

export async function fetchWellnessProducts(): Promise<WellnessProduct[]> {
  const { data, error } = await supabase
    .from("wellness_products")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as WellnessProduct[];
}

export async function fetchWellnessProduct(slug: string): Promise<WellnessProduct | null> {
  const { data, error } = await supabase
    .from("wellness_products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as WellnessProduct) ?? null;
}

export async function fetchPractitioners(): Promise<Practitioner[]> {
  const { data, error } = await supabase
    .from("trusted_practitioners")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Practitioner[];
}

export async function fetchPractitioner(slug: string): Promise<Practitioner | null> {
  const { data, error } = await supabase
    .from("trusted_practitioners")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Practitioner) ?? null;
}

export const WELLNESS_CATEGORIES: { value: WellnessCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "supplement", label: "Supplements" },
  { value: "tool", label: "Tools" },
  { value: "book", label: "Books" },
  { value: "candle", label: "Candles" },
  { value: "accessory", label: "Accessories" },
  { value: "other", label: "Other" },
];

export const PRACTITIONER_SPECIALTIES: { value: PractitionerSpecialty | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "healer", label: "Healers" },
  { value: "coach", label: "Coaches" },
  { value: "bodyworker", label: "Bodyworkers" },
  { value: "energy_worker", label: "Energy Workers" },
  { value: "therapist", label: "Therapists" },
  { value: "other", label: "Other" },
];

export function specialtyLabel(s: PractitionerSpecialty): string {
  return PRACTITIONER_SPECIALTIES.find((x) => x.value === s)?.label.replace(/s$/, "") ?? s;
}

export function categoryLabel(c: WellnessCategory): string {
  return WELLNESS_CATEGORIES.find((x) => x.value === c)?.label.replace(/s$/, "") ?? c;
}
