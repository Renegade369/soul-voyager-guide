import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's sacred reading interpreter. You speak with clarity, warmth, and unflinching truth. You are not a therapist, doctor, or medical professional. You offer vibrational wellness insights and energetic guidance — never medical diagnoses or psychological treatment.

You have received soul data for a reading. Generate a complete 10-section Soul Profile. Each section must feel deeply personal, specific to THIS person's data — never generic. Use their first name throughout. Speak directly to them.

LANGUAGE RULES:
- Always possibility-focused, positive language
- Never use: healing, heal, medicine, treatment, diagnose, cure, therapy, healer
- Use: frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion
- Direct and powerful — not vague or overly spiritual
- If birth time provided, use it for ascendant and house calculations
- If birth time not provided, use sun + moon sign only

CALCULATE BEFORE WRITING:
- Use the pre-calculated NUMEROLOGY NUMBERS provided in the user message exactly as given. Do not recalculate them. Echo them back in the corresponding fields (life_path_number, expression_number, soul_urge_number, personal_year_number).
- Sun Sign, Moon Sign (approx), Rising (only if time provided)

You MUST respond by calling return_soul_profile_v2 with structured fields. Do not respond in plain text.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { identity, lifeState, oneWord, numerology, currentYear } = await req.json();
    if (!identity || !lifeState) return new Response(JSON.stringify({ error: "identity and lifeState required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const meditationOptions = [
      "Releasing Fear", "Living from the Heart", "Theta Brainwave Journey",
      "Purpose Activation", "Abundance Programming", "Heart Brain Coherence",
      "Rewiring the Subconscious", "Living in the Present Moment",
    ];

    const tools = [{
      type: "function",
      function: {
        name: "return_soul_profile_v2",
        description: "Return the structured 10-section Soul Profile.",
        parameters: {
          type: "object",
          properties: {
            first_name: { type: "string" },
            // Calculated numbers / signs (for display)
            life_path_number: { type: "string" },
            expression_number: { type: "string" },
            soul_urge_number: { type: "string" },
            personal_year_number: { type: "string" },
            sun_sign: { type: "string" },
            moon_sign: { type: "string" },
            rising_sign: { type: "string", description: "Empty if no birth time." },
            // 10 sections
            soul_signature: { type: "string", description: "Section 1. Core energetic identity. 3-4 sentences." },
            your_numbers_speak: { type: "string", description: "Section 2. Each number's meaning, alive and specific." },
            energetic_blueprint: { type: "string", description: "Section 3. Current aura state + dominant energy color." },
            primary_aura_color: { type: "string", description: "One word color. e.g. Gold, Indigo, Green." },
            patterns_you_carry: { type: "string", description: "Section 4. Recurring patterns running on repeat." },
            primary_blocks: { type: "string", description: "Section 5. Top 2-3 blocks, specific and compassionate." },
            shift_available: { type: "string", description: "Section 6. The specific shift available right now." },
            path_to_highest_self: { type: "string", description: "Section 7. 3-5 specific real-world steps for THIS person." },
            meditation_prescription: {
              type: "array", minItems: 3, maxItems: 3,
              items: {
                type: "object",
                properties: {
                  name: { type: "string", enum: meditationOptions },
                  why: { type: "string", description: "Why this is right for them specifically." },
                },
                required: ["name", "why"], additionalProperties: false,
              },
            },
            awakening_stage: { type: "string", enum: ["Asleep", "Stirring", "Awakening", "Integrating", "Embodying"] },
            awakening_stage_description: { type: "string", description: "What stage means for them + what next stage looks like." },
            soul_message: { type: "string", description: "Section 10. Direct message from highest self. 4-6 sentences. Make it stop them." },
            closing: { type: "string", description: 'Exactly: "Your next step is a conversation. Kim Alfano at Higher Vibes works with souls exactly where you are right now. Reach her at HigherVibration36@gmail.com — tell her Soul True sent you."' },
          },
          required: [
            "first_name", "life_path_number", "expression_number", "soul_urge_number", "personal_year_number",
            "sun_sign", "moon_sign", "rising_sign",
            "soul_signature", "your_numbers_speak", "energetic_blueprint", "primary_aura_color",
            "patterns_you_carry", "primary_blocks", "shift_available", "path_to_highest_self",
            "meditation_prescription", "awakening_stage", "awakening_stage_description", "soul_message", "closing",
          ],
          additionalProperties: false,
        },
      },
    }];

    const numerologyBlock = numerology
      ? `NUMEROLOGY NUMBERS (pre-calculated — use these exactly, do not recalculate):
Life Path: ${numerology.life_path}
Expression: ${numerology.expression}
Soul Urge: ${numerology.soul_urge}
Personality: ${numerology.personality}
Personal Year: ${numerology.personal_year}
`
      : "";

    const userPrompt = `Generate the Soul Profile for the data below. Current year: ${currentYear}.

IDENTITY:
${JSON.stringify(identity, null, 2)}

${numerologyBlock}
LIFE STATE ANSWERS:
${JSON.stringify(lifeState, null, 2)}

ONE-WORD SOUL NEED: ${oneWord || "(not provided)"}
`;

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
        tool_choice: { type: "function", function: { name: "return_soul_profile_v2" } },
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
    if (!tc?.function?.arguments) return new Response(JSON.stringify({ error: "Could not generate profile. Please try again." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ profile: JSON.parse(tc.function.arguments) }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("soul-profile-v2 error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
