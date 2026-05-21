// Best-effort fetch of the user's completed readings to feed Frequency Transmissions.
// Silently skips any table that doesn't exist or returns no data.
import { supabase } from "@/integrations/supabase/client";

export type SoulProfileSnapshot = Record<string, unknown>;

export async function loadSoulProfile(userId: string): Promise<SoulProfileSnapshot> {
  const snapshot: SoulProfileSnapshot = {};

  try {
    const { data } = await supabase
      .from("user_readings")
      .select("reading_type, result_data, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (Array.isArray(data)) {
      for (const row of data) {
        const key = row.reading_type;
        if (!key || (snapshot as Record<string, unknown>)[key]) continue;
        (snapshot as Record<string, unknown>)[key] = row.result_data;
      }
    }
  } catch (e) {
    console.warn("loadSoulProfile user_readings failed", e);
  }

  try {
    const { data } = await supabase
      .from("blood_type_results")
      .select("blood_type, rh_factor")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) snapshot.blood_type = data;
  } catch {
    // ignore
  }

  try {
    const { data } = await supabase
      .from("soul_quiz_results")
      .select("soul_type, scores")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) snapshot.soul_quiz = data;
  } catch {
    // ignore
  }

  return snapshot;
}

export async function getTransmissionAccess(userId: string): Promise<{ credits: number; allAccess: boolean }> {
  try {
    const { data } = await supabase
      .from("transmission_credits")
      .select("credits, all_access")
      .eq("user_id", userId)
      .maybeSingle();
    return { credits: data?.credits ?? 0, allAccess: data?.all_access ?? false };
  } catch {
    return { credits: 0, allAccess: false };
  }
}
