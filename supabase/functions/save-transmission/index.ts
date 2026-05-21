import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401, headers: corsHeaders });

    const body = await req.json().catch(() => ({}));
    const { emotionalState, intention, script, seal, audioPath, profileSnapshot } = body as Record<string, unknown>;
    if (typeof emotionalState !== "string" || typeof intention !== "string" || typeof script !== "string") {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: corsHeaders });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const client = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authHeader } } });

    const { data: userRes, error: userErr } = await client.auth.getUser();
    if (userErr || !userRes?.user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401, headers: corsHeaders });

    const { data, error } = await client.from("transmissions").insert({
      user_id: userRes.user.id,
      emotional_state: emotionalState,
      intention,
      script,
      seal: typeof seal === "string" ? seal : null,
      audio_path: typeof audioPath === "string" ? audioPath : null,
      profile_snapshot: profileSnapshot ?? {},
    }).select("id").single();

    if (error) {
      console.error("save-transmission insert error", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
    return new Response(JSON.stringify({ id: data.id }), { headers: corsHeaders });
  } catch (e) {
    console.error("save-transmission unexpected", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: corsHeaders });
  }
});
