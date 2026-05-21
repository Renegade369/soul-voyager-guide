import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

// Default voice (Sarah — warm, serene feminine). Override via ELEVENLABS_VOICE_ID.
const DEFAULT_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";
const MODEL_ID = "eleven_multilingual_v2";

function jsonResp(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResp({ error: "Not authenticated" }, 401);

    let body: { script?: string };
    try { body = await req.json(); } catch { return jsonResp({ error: "Invalid JSON" }, 400); }
    const script = (body.script || "").trim();
    if (!script) return jsonResp({ error: "script required" }, 400);
    if (script.length > 5000) return jsonResp({ error: "script too long" }, 400);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userRes, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userRes?.user) return jsonResp({ error: "Not authenticated" }, 401);
    const userId = userRes.user.id;

    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return jsonResp({
        audioPath: null, signedUrl: null,
        message: "Your transmission has been prepared. Audio is temporarily unavailable — return shortly to receive it as sound.",
      });
    }
    const voiceId = Deno.env.get("ELEVENLABS_VOICE_ID") || DEFAULT_VOICE_ID;

    const tts = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          text: script,
          model_id: MODEL_ID,
          voice_settings: { stability: 0.65, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true },
        }),
      },
    );

    if (!tts.ok) {
      const errText = await tts.text().catch(() => "");
      console.error("ElevenLabs error", tts.status, errText.slice(0, 400));
      return jsonResp({
        audioPath: null, signedUrl: null,
        message: "Your transmission has been prepared. Audio is temporarily unavailable — return shortly to receive it as sound.",
      });
    }

    const audioBuf = new Uint8Array(await tts.arrayBuffer());
    const filename = `${userId}/transmission_${Date.now()}.mp3`;

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { error: upErr } = await admin.storage
      .from("transmissions")
      .upload(filename, audioBuf, { contentType: "audio/mpeg", upsert: false });
    if (upErr) {
      console.error("storage upload error", upErr);
      return jsonResp({
        audioPath: null, signedUrl: null,
        message: "Your transmission has been prepared. Audio storage is temporarily unavailable.",
      });
    }

    const { data: signed, error: signErr } = await admin.storage
      .from("transmissions").createSignedUrl(filename, 60 * 60);
    if (signErr || !signed) {
      console.error("sign url error", signErr);
      return jsonResp({ audioPath: filename, signedUrl: null, message: "Audio stored, link unavailable." });
    }

    return jsonResp({ audioPath: filename, signedUrl: signed.signedUrl });
  } catch (e) {
    console.error("transmission-audio unexpected", e instanceof Error ? e.stack : e);
    return jsonResp({
      audioPath: null, signedUrl: null,
      message: "Your transmission has been prepared. Audio is temporarily unavailable — return shortly to receive it as sound.",
    });
  }
});
