import { supabase } from "@/integrations/supabase/client";
import { nanoid } from "nanoid";

export type SoulProfile = {
  soul_name: string;
  soul_summary: string;
  energetic_signature: string;
  soul_gifts: string[];
  life_path_themes: string[];
  shadow_and_growth: string;
  relationships_and_connection: string;
  soul_mission: string;
  activation_message: string;
  next_step: string;
};

/** Create shareable profile, save to user_readings if logged in, log consciousness_data. */
export async function persistSoulProfile(
  profile: SoulProfile,
  extras?: { aura_color?: string; dominant_energy?: string }
): Promise<{ shareId: string }> {
  const shareId = nanoid(12);

  // 1. Create shared_profiles row
  await supabase.from("shared_profiles").insert({
    id: shareId,
    profile_data: profile as unknown as Record<string, unknown>,
  });

  // 2. Save to user history if logged in
  const { data: sessionData } = await supabase.auth.getUser();
  const userId = sessionData?.user?.id;
  if (userId) {
    await supabase.from("user_readings").insert({
      user_id: userId,
      reading_type: "soul_profile",
      result_data: profile as unknown as Record<string, unknown>,
      shared_profile_id: shareId,
    });
  }

  // 3. Anonymous consciousness data
  await supabase.from("consciousness_data").insert({
    aura_color: extras?.aura_color ?? null,
    dominant_energy: extras?.dominant_energy ?? null,
    soul_archetype: profile.soul_name ?? null,
  });

  return { shareId };
}

export async function fetchSharedProfile(id: string): Promise<SoulProfile | null> {
  const { data, error } = await supabase
    .from("shared_profiles")
    .select("profile_data")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  // Increment view_count (best-effort)
  await supabase.rpc("increment_view_count" as never, { share_id: id } as never).catch(() => {});
  // Fallback: read+write atomic-ish
  await supabase.from("shared_profiles").select("view_count").eq("id", id).maybeSingle().then(async (r) => {
    const vc = (r.data?.view_count ?? 0) + 1;
    await supabase.from("shared_profiles").update({ view_count: vc }).eq("id", id);
  }).catch(() => {});
  return data.profile_data as unknown as SoulProfile;
}
