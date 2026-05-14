import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's natal chart reader. Decode the soul's intention encoded in the sky at someone's first breath. Map gifts, challenges, karmic themes, and current available energies — not personality labels.

LANGUAGE RULES:
- Positive, possibility-focused
- NEVER use: healing, heal, medicine, treatment, diagnose, cure, therapy. Use: frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion
- Direct address: "you" and "your"
- If birth time is "unknown", omit Rising and houses gracefully

You MUST call return_birth_chart_reading.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { birthDate, birthTime, birthPlace } = await req.json();
    if (!birthDate || !birthPlace) {
      return new Response(JSON.stringify({ error: "birthDate and birthPlace required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const tools = [{
      type: "function",
      function: {
        name: "return_birth_chart_reading",
        parameters: {
          type: "object",
          properties: {
            sun_sign: { type: "string" },
            moon_sign: { type: "string" },
            rising_sign: { type: "string", description: "Empty string if birth time unknown." },
            mercury_sign: { type: "string" },
            venus_sign: { type: "string" },
            mars_sign: { type: "string" },
            teaser: { type: "string", description: "2-3 sentence free preview revealing sun + a tease of the deeper map." },
            soul_blueprint: { type: "string", description: "3-4 sentences on the overall soul intention." },
            sun_reading: { type: "string", description: "3-4 sentences on Sun." },
            moon_reading: { type: "string", description: "3-4 sentences on Moon." },
            rising_reading: { type: "string", description: "3-4 sentences on Rising. Empty string if no birth time." },
            inner_planets_reading: { type: "string", description: "3-4 sentences on Mercury, Venus, Mars together." },
            karmic_themes: { type: "string", description: "3-4 sentences on karmic themes, gifts, and challenges." },
            current_energies: { type: "string", description: "3-4 sentences on energies available now." },
            soul_message: { type: "string", description: "2-3 sentences direct closing." },
          },
          required: ["sun_sign","moon_sign","rising_sign","mercury_sign","venus_sign","mars_sign","teaser","soul_blueprint","sun_reading","moon_reading","rising_reading","inner_planets_reading","karmic_themes","current_energies","soul_message"],
          additionalProperties: false,
        },
      },
    }];

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Birth date: ${birthDate}\nBirth time: ${birthTime ?? "unknown"}\nBirth place: ${birthPlace}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "return_birth_chart_reading" } },
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      if (aiResp.status === 429) return new Response(JSON.stringify({ error: "Too many requests." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (aiResp.status === 402) return new Response(JSON.stringify({ error: "AI credits need replenishing." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await aiResp.json();
    const tc = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!tc?.function?.arguments) return new Response(JSON.stringify({ error: "No reading generated" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ reading: JSON.parse(tc.function.arguments) }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("birth-chart-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
