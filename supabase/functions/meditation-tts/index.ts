import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const INTRO =
  "Silence your phone. Find a comfortable position, seated or lying down. Close your eyes. Take three deep breaths. Breathe in... and breathe out. In... and out. In... and out. You are here. You are present. Let's begin. ";

// Bella — warm, natural female voice from ElevenLabs default library
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Sarah (warm). Swap to Bella "EXAVITQu4vr4xnSDxMaL"
const MODEL_ID = "eleven_turbo_v2_5";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { text, includeIntro = true } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Missing text" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) throw new Error("ELEVENLABS_API_KEY not configured");

    const cleaned = String(text)
      .replace(/\[long pause\]/gi, "... ... ...")
      .replace(/\[pause\]/gi, "... ...")
      .replace(/[#*_`>]/g, "")
      .trim();
    const fullText = (includeIntro ? INTRO : "") + cleaned;
    const trimmed = fullText.slice(0, 4900);

    const resp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: trimmed,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!resp.ok) {
      const err = await resp.text();
      console.error("ElevenLabs error:", resp.status, err);
      return new Response(JSON.stringify({ error: `TTS failed: ${resp.status}` }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: { ...corsHeaders, "Content-Type": "audio/mpeg", "Cache-Control": "no-cache" },
    });
  } catch (e) {
    console.error("meditation-tts error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
