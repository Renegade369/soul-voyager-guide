import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's aura reader. Based on the answers, generate a powerful 3-layer aura reading PLUS a 7-chakra alignment assessment.

THE 3 LAYERS (always include all three):
1. Emotional Core — what emotions are dominant, what is being processed, what feelings seek expression. Identify color(s) for this layer.
2. Social Presence — how the energy projects outward, what others feel around them, where energy is magnetic vs. contracted. Identify color(s) for this layer.
3. Spiritual Depth — soul purpose energy, spiritual gifts present, connection to higher guidance, active karmic themes. Identify color(s) for this layer.

EXTENDED COLOR VOCABULARY (use these freely alongside the basic palette):
Basic: Gold, Blue, Green, Violet, White, Red, Orange, Indigo
Metallics: Gold (divine wisdom/spiritual mastery), Silver (intuition/lunar/psychic sensitivity), Platinum (rare high-frequency clarity), Copper (grounded transmission/earth connection)
Crystalline: Diamond/Clear (pure consciousness), Opalescent (multidimensional awareness/creative flow), Iridescent (integration of polarities/rainbow bridge), Obsidian (protection/shadow integration/deep transformation)

CHAKRA ASSESSMENT (all 7, in order — root, sacral, solar_plexus, heart, throat, third_eye, crown):
For each: status ("Open" | "Partially Open" | "Blocked" | "Overactive"), 1-2 sentence description specific to this person, and 1 simple practice or awareness.

DOMINANT AURA COLOR: Choose ONE primary aura color from the basic + extended palette that best represents this person right now.

LANGUAGE RULES:
- Positive and possibility-focused
- Never use: healing, heal, medicine, treatment, diagnose, cure, therapy. Use: frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion
- Speak directly using "you" and "your"
- Be specific, not generic

Total reading should be substantive but not bloated. You MUST respond by calling return_aura_reading with structured fields.`;

const CHAKRA_KEYS = ["root","sacral","solar_plexus","heart","throat","third_eye","crown"] as const;

const chakraSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["Open","Partially Open","Blocked","Overactive"] },
    description: { type: "string" },
    practice: { type: "string" },
  },
  required: ["status","description","practice"],
  additionalProperties: false,
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { answers } = await req.json();
    if (!answers) {
      return new Response(JSON.stringify({ error: "answers required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const tools = [{
      type: "function",
      function: {
        name: "return_aura_reading",
        description: "Return the structured 3-layer aura reading plus chakra alignment.",
        parameters: {
          type: "object",
          properties: {
            aura_color: { type: "string", description: "Primary dominant aura color (basic, metallic, or crystalline)." },
            teaser: { type: "string", description: "2-3 sentence FREE preview that reveals the dominant color and gives a genuine taste, but stops before the full reading." },
            emotional_core: {
              type: "object",
              properties: {
                colors: { type: "array", items: { type: "string" } },
                reading: { type: "string", description: "3-4 sentences on emotional core layer." },
              },
              required: ["colors","reading"], additionalProperties: false,
            },
            social_presence: {
              type: "object",
              properties: {
                colors: { type: "array", items: { type: "string" } },
                reading: { type: "string" },
              },
              required: ["colors","reading"], additionalProperties: false,
            },
            spiritual_depth: {
              type: "object",
              properties: {
                colors: { type: "array", items: { type: "string" } },
                reading: { type: "string" },
              },
              required: ["colors","reading"], additionalProperties: false,
            },
            chakras: {
              type: "object",
              properties: {
                root: chakraSchema, sacral: chakraSchema, solar_plexus: chakraSchema,
                heart: chakraSchema, throat: chakraSchema, third_eye: chakraSchema, crown: chakraSchema,
              },
              required: [...CHAKRA_KEYS], additionalProperties: false,
            },
            soul_message: { type: "string", description: "2-3 sentences spoken directly. Make it land." },
          },
          required: ["aura_color","teaser","emotional_core","social_presence","spiritual_depth","chakras","soul_message"],
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
          { role: "user", content: `Answers:\n${JSON.stringify(answers, null, 2)}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "return_aura_reading" } },
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
    const reading = JSON.parse(tc.function.arguments);
    return new Response(JSON.stringify({ reading }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("aura-reader-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
