import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type SaveChallengeProgressInput = {
  dayNumber: number;
  completed: boolean;
};

export const saveChallengeProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: SaveChallengeProgressInput) => {
    if (!Number.isInteger(input.dayNumber) || input.dayNumber < 1 || input.dayNumber > 10) {
      throw new Error("Invalid challenge day");
    }

    if (typeof input.completed !== "boolean") {
      throw new Error("Invalid completion state");
    }

    return input;
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const completedAt = data.completed ? new Date().toISOString() : null;

    console.info("Saving challenge_progress via Lovable Cloud", {
      userId,
      dayNumber: data.dayNumber,
      completed: data.completed,
      completedAt,
    });

    const { error } = await supabase.from("challenge_progress").upsert(
      {
        user_id: userId,
        day_number: data.dayNumber,
        completed: data.completed,
        completed_at: completedAt,
      },
      { onConflict: "user_id,day_number" }
    );

    if (error) {
      console.error("Lovable Cloud challenge_progress save failed", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        userId,
        dayNumber: data.dayNumber,
        completed: data.completed,
      });
      throw new Error(error.message);
    }

    if (data.completed && data.dayNumber === 10) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ challenge_completed_at: new Date().toISOString() })
        .eq("id", userId);

      if (profileError) {
        console.error("Lovable Cloud challenge completion profile update failed", {
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint,
          userId,
        });
      }
    }

    return { ok: true };
  });