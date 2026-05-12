import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's numerology interpreter. You have been given pre-calculated numerology numbers for a person. Do not recalculate — use the numbers provided exactly.

LANGUAGE RULES:
- Positive, possibility-focused language always
- Never diagnostic, never medical
- Never use: healing, heal, medicine, treatment, diagnose, cure, therapy. Use instead: frequency wellness, energetic alignment, vibrational shift, soul work
- Speak directly: "you", "your"
- Be specific to THEIR numbers — not generic numerology definitions

Under 500 words total. Precise. Powerful. Personal.

You MUST respond by calling return_numerology_reading with structured data.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { numbers, name, currentYear } = await req.json();
    if (!numbers) return new Response(JSON.stringify({ error: "numbers required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const tools = [{
      type: "function",
      function: {
        name: "return_numerology_reading",
        description: "Structured numerology reading sections.",
        parameters: {
          type: "object",
          properties: {
            life_path_meaning: { type: "string", description: "What Life Path [X] means for THIS soul. 3-4 sentences." },
            expression_meaning: { type: "string", description: "What they are here to express." },
            soul_urge_meaning: { type: "string", description: "What their soul privately hungers for." },
            personality_meaning: { type: "string", description: "How they appear to others." },
            personal_year_meaning: { type: "string", description: `Personal Year [X] in ${currentYear}. What it asks of them. What to release.` },
            number_message: { type: "string", description: "3 sentences about what their numbers collectively are saying about this moment." },
          },
          required: ["life_path_meaning", "expression_meaning", "soul_urge_meaning", "personality_meaning", "personal_year_meaning", "number_message"],
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
          { role: "user", content: `Name: ${name}\nCurrent year: ${currentYear}\nNumbers (already calculated):\n${JSON.stringify(numbers, null, 2)}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "return_numerology_reading" } },
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
    console.error("numerology-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
