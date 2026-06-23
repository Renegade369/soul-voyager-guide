import { createServerFn } from "@tanstack/react-start";

type OnboardingRow = {
  cert_name: string | null;
  wake_time: string | null;
  timezone: string | null;
  meditation_voice: string | null;
  completed_at: string | null;
} | null;

type GetResult = { onboarding: OnboardingRow } | { error: string };
type SaveResult = { ok: true } | { error: string };

export const getOnboardingByEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => {
    if (!data.email || !data.email.includes("@")) throw new Error("Invalid email");
    return data;
  })
  .handler(async ({ data }): Promise<GetResult> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: rows, error } = await supabaseAdmin
        .from("sovereign_onboarding")
        .select("cert_name, wake_time, timezone, meditation_voice, completed_at")
        .ilike("email", data.email)
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      return { onboarding: (rows?.[0] as OnboardingRow) ?? null };
    } catch (error) {
      console.error("getOnboardingByEmail error:", error);
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  });

export const savePhase2Onboarding = createServerFn({ method: "POST" })
  .inputValidator((data: {
    email: string;
    userId: string;
    cert_name: string;
    wake_time: string; // "HH:MM"
    timezone: string;
    meditation_voice: "erin" | "milo" | "charlotte";
  }) => {
    if (!data.email?.includes("@")) throw new Error("Invalid email");
    if (!data.userId) throw new Error("Missing userId");
    if (!/^\d{2}:\d{2}$/.test(data.wake_time)) throw new Error("Invalid wake_time");
    return data;
  })
  .handler(async ({ data }): Promise<SaveResult> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const now = new Date().toISOString();

      // Upsert onboarding row
      const { error: onbErr } = await supabaseAdmin
        .from("sovereign_onboarding")
        .upsert(
          {
            user_id: data.userId,
            email: data.email,
            cert_name: data.cert_name,
            wake_time: data.wake_time,
            timezone: data.timezone,
            meditation_voice: data.meditation_voice,
            completed_at: now,
          },
          { onConflict: "user_id" }
        );
      if (onbErr) throw onbErr;

      // Mirror to enrollments
      const { error: enrErr } = await supabaseAdmin
        .from("sovereign_enrollments")
        .update({
          cert_name: data.cert_name,
          wake_time: data.wake_time,
          timezone: data.timezone,
          meditation_voice: data.meditation_voice,
        })
        .ilike("email", data.email);
      if (enrErr) throw enrErr;

      return { ok: true };
    } catch (error) {
      console.error("savePhase2Onboarding error:", error);
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  });
