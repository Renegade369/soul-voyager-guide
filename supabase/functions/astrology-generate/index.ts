import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's astrology interpreter. You speak with directness and depth. You are not reciting textbook definitions — you are reading this specific person's chart and speaking to them personally.

LANGUAGE RULES:
- Positive, possibility-focused always
- Never medical, never diagnostic
- Never use: healing, heal, medicine, treatment, diagnose, cure, therapy. Use: frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion
- Direct and specific — use their placements to say something true about THIS person
- Avoid clichés — "Scorpios are intense" is not acceptable. Dig deeper.

Calculate or estimate the relevant placements yourself based on the birth data:
IF birth time provided: Sun sign + house, Moon sign + house, Rising/Ascendant, Mercury, Venus, Mars, any major aspects.
IF birth time NOT provided: Sun, Moon (approximate), Mercury, Venus, Mars only.

End with: "The stars show the weather — you choose where to walk. If you're ready to move with intention, Kim Alfano at Higher Vibes can help you do exactly that. highervibrations36@gmail.com"

Under 600 words. Every sentence earns its place.

You MUST respond by calling return_astrology_reading with structured data.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { birthDate, birthTime, birthPlace } = await req.json();
    if (!birthDate || !birthPlace) return new Response(JSON.stringify({ error: "birthDate and birthPlace required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const hasTime = !!birthTime && birthTime !== "unknown";

    const tools = [{
      type: "function",
      function: {
        name: "return_astrology_reading",
        description: "Structured natal chart reading.",
        parameters: {
          type: "object",
          properties: {
            sun_sign: { type: "string" },
            moon_sign: { type: "string" },
            rising_sign: { type: "string", description: "Empty string if birth time not provided." },
            mercury_sign: { type: "string" },
            venus_sign: { type: "string" },
            mars_sign: { type: "string" },
            cosmic_blueprint: { type: "string", description: "Opening synthesis. 2-3 sentences." },
            your_sun: { type: "string", description: "Their core identity / life force. Specific to sign and house if available." },
            your_moon: { type: "string", description: "Emotional nature, what they need to feel safe." },
            your_rising: { type: "string", description: "How they enter rooms. Empty string if no birth time." },
            your_inner_planets: { type: "string", description: "Mercury (think), Venus (love), Mars (act). Brief but specific." },
            your_current_sky: { type: "string", description: "Current transits activating their chart. What's available now." },
            cosmic_message: { type: "string", description: "3-4 sentences direct to this soul about this exact moment." },
            closing: { type: "string", description: "Use the exact closing line provided in the system prompt." },
          },
          required: ["sun_sign", "moon_sign", "rising_sign", "mercury_sign", "venus_sign", "mars_sign", "cosmic_blueprint", "your_sun", "your_moon", "your_rising", "your_inner_planets", "your_current_sky", "cosmic_message", "closing"],
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
          { role: "user", content: `Birth date: ${birthDate}\nBirth time: ${hasTime ? birthTime : "UNKNOWN — use sun + moon focused reading"}\nBirth place: ${birthPlace}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "return_astrology_reading" } },
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      if (aiResp.status === 429) return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (aiResp.status === 402) return new Response(JSON.stringify({ error: "AI credits need replenishing." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await aiResp.json();
    const tc = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!tc?.function?.arguments) return new Response(JSON.stringify({ error: "No reading generated" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ reading: JSON.parse(tc.function.arguments) }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("astrology-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
