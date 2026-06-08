import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

function admin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

const SubscribeSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(1).max(120).optional(),
  source: z.string().min(1).max(60).default("manual"),
});

export const subscribeToJournal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SubscribeSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = admin();
    const email = data.email.toLowerCase().trim();

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, is_active")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      if (!existing.is_active) {
        await supabase
          .from("subscribers")
          .update({ is_active: true, unsubscribed_at: null, first_name: data.name ?? null })
          .eq("id", existing.id);
      }
      return { ok: true, alreadySubscribed: existing.is_active };
    }

    const { error } = await supabase.from("subscribers").insert({
      email,
      first_name: data.name ?? null,
      source: data.source,
      is_active: true,
    });
    if (error) throw new Error(error.message);
    return { ok: true, alreadySubscribed: false };
  });

const TokenSchema = z.object({ token: z.string().min(8).max(80) });

export const validateUnsubscribeToken = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TokenSchema.parse(data))
  .handler(async ({ data }) => {
    const { data: row } = await admin()
      .from("subscribers")
      .select("email, is_active")
      .eq("unsubscribe_token", data.token)
      .maybeSingle();
    if (!row) return { ok: false as const, reason: "invalid" as const };
    return { ok: true as const, email: row.email, alreadyUnsubscribed: !row.is_active };
  });

export const unsubscribeByToken = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TokenSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = admin();
    const { data: row } = await supabase
      .from("subscribers")
      .select("id, email, is_active")
      .eq("unsubscribe_token", data.token)
      .maybeSingle();
    if (!row) return { ok: false as const, reason: "invalid" as const };
    if (!row.is_active) return { ok: true as const, email: row.email, alreadyUnsubscribed: true };
    const { error } = await supabase
      .from("subscribers")
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq("id", row.id);
    if (error) throw new Error(error.message);
    return { ok: true as const, email: row.email, alreadyUnsubscribed: false };
  });
