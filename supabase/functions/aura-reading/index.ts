import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a gifted intuitive energy reader with deep knowledge of aura fields, color frequencies, and energetic states. You provide compassionate, insightful, and spiritually grounded readings. Your tone is warm, poetic, and empowering — never clinical.

COMPLIANCE: This is for educational and inspirational purposes only. Never claim to heal, cure, treat, or diagnose any condition. Frame everything as practices, reflections, and personal exploration.

You MUST respond by calling the return_aura_reading function with structured data. Do not respond in plain text.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, mood } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "Image is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const moodText = mood
      ? `Feeling: ${mood.feeling}. Energy centered in: ${mood.center}. Seeking: ${mood.seeking}.`
      : "No mood data provided.";

    const userMessage = `Analyze this person's aura based on their photo and current energetic state. They described: ${moodText}\n\nReturn a reading of their aura field, color frequency, current energetic state, strengths, areas inviting healing, and an empowering affirmation.`;

    const tools = [
      {
        type: "function",
        function: {
          name: "return_aura_reading",
          description: "Return the structured aura reading.",
          parameters: {
            type: "object",
            properties: {
              aura_color: { type: "string", description: "Primary aura color (e.g. 'Violet', 'Emerald Green')." },
              color_meaning: { type: "string", description: "2-3 sentences on the meaning of this color." },
              current_energetic_state: { type: "string", description: "3-4 sentences describing current energetic state." },
              energetic_strengths: {
                type: "array",
                items: { type: "string" },
                minItems: 3,
                maxItems: 3,
              },
              areas_for_healing: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 2,
              },
              affirmation: { type: "string", description: "One powerful sentence." },
            },
            required: [
              "aura_color",
              "color_meaning",
              "current_energetic_state",
              "energetic_strengths",
              "areas_for_healing",
              "affirmation",
            ],
            additionalProperties: false,
          },
        },
      },
    ];

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                { type: "text", text: userMessage },
                { type: "image_url", image_url: { url: imageBase64 } },
              ],
            },
          ],
          tools,
          tool_choice: { type: "function", function: { name: "return_aura_reading" } },
        }),
      },
    );

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
      return new Response(JSON.stringify({ error: "Reading could not be generated. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const reading = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ reading }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("aura-reading error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
