import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's blood type reader. You connect blood type to ancestral nutrition blueprint, immune tendencies, stress response, optimal movement style, and emotional architecture — drawing from ancient traditions and frequency wellness frameworks.

LANGUAGE RULES:
- Positive and possibility-focused
- NEVER use: healing, heal, medicine, treatment, diagnose, cure, therapy, prescribe. Use: frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion, ancestral nourishment
- Speak directly to the person — "you" and "your"
- Be specific to the blood type they gave you
- Educational and inspirational only — never make health claims

You MUST call return_blood_type_reading with the structured fields.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, blood_type, rh_factor } = await req.json();
    if (!blood_type) {
      return new Response(JSON.stringify({ error: "blood_type required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const tools = [{
      type: "function",
      function: {
        name: "return_blood_type_reading",
        parameters: {
          type: "object",
          properties: {
            teaser: { type: "string", description: "2-3 sentence free preview." },
            ancestral_blueprint: { type: "string", description: "3-4 sentences on ancestral lineage / origin frequency for this blood type." },
            nourishment: { type: "string", description: "3-4 sentences on optimal nourishment style." },
            immune_signature: { type: "string", description: "3-4 sentences on immune tendencies, framed as frequency wellness." },
            stress_response: { type: "string", description: "3-4 sentences on stress response patterns." },
            movement_style: { type: "string", description: "3-4 sentences on optimal movement / embodiment." },
            emotional_architecture: { type: "string", description: "3-4 sentences on emotional patterns and gifts." },
            soul_message: { type: "string", description: "2-3 sentences direct closing message." },
          },
          required: ["teaser","ancestral_blueprint","nourishment","immune_signature","stress_response","movement_style","emotional_architecture","soul_message"],
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
          { role: "user", content: `Name: ${name ?? "(unspecified)"}\nBlood Type: ${blood_type}\nRh Factor: ${rh_factor ?? "(unspecified)"}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "return_blood_type_reading" } },
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
    console.error("blood-type-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
