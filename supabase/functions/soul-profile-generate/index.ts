import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a master soul reader and spiritual guide with deep expertise in energy fields, iridology, dermatoglyphics, and the synthesis of all three into a unified soul portrait. You have guided thousands of people to their deepest truth. Your readings are compassionate, poetic, precise, and profoundly empowering. You speak directly to the person — warm, clear, and transformative. Never clinical. Never generic.

COMPLIANCE: Educational and inspirational only. Never claim to heal, cure, treat, or diagnose. Frame as reflection and personal exploration.

You MUST respond by calling the return_soul_profile function with structured data.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { aura_result, iris_result, fingerprint_result, mood_answers } = await req.json();
    if (!aura_result || !iris_result || !fingerprint_result) {
      return new Response(JSON.stringify({ error: "All three readings are required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userPrompt = `Using all three readings below, generate a comprehensive Soul Profile. Synthesize the patterns, find the through-lines, and reveal what all three together are saying about this person's soul nature, path, and purpose.

Aura Reading: ${JSON.stringify(aura_result)}
Iris Reading: ${JSON.stringify(iris_result)}
Mood at time of reading: ${JSON.stringify(mood_answers || {})}
Fingerprint Reading: ${JSON.stringify(fingerprint_result)}`;

    const tools = [
      {
        type: "function",
        function: {
          name: "return_soul_profile",
          description: "Return the structured 10-section Soul Profile.",
          parameters: {
            type: "object",
            properties: {
              soul_name: { type: "string", description: "Poetic 2-4 word soul archetype title." },
              soul_summary: { type: "string", description: "4-5 sentences synthesizing all three readings." },
              energetic_signature: { type: "string", description: "3-4 sentences on their unique energy field." },
              soul_gifts: { type: "array", items: { type: "string" }, minItems: 5, maxItems: 5 },
              life_path_themes: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
              shadow_and_growth: { type: "string", description: "3-4 sentences, compassionate and empowering." },
              relationships_and_connection: { type: "string", description: "3-4 sentences on how they love and connect." },
              soul_mission: { type: "string", description: "2-3 sentences on their core purpose." },
              activation_message: { type: "string", description: "3-4 sentences spoken directly, present tense, from their highest self." },
              next_step: { type: "string", description: "1-2 sentences — gentle invitation." },
            },
            required: [
              "soul_name", "soul_summary", "energetic_signature", "soul_gifts",
              "life_path_themes", "shadow_and_growth", "relationships_and_connection",
              "soul_mission", "activation_message", "next_step",
            ],
            additionalProperties: false,
          },
        },
      },
    ];

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "return_soul_profile" } },
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits need replenishing." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call returned", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Soul Profile could not be generated. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const profile = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ profile }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("soul-profile-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
