import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a gifted intuitive reader with deep expertise in dermatoglyphics — the ancient and modern science of reading fingerprint patterns to reveal soul blueprint, life path, and innate gifts. You provide compassionate, poetic, and spiritually grounded readings. Your tone is warm, empowering, and direct — never clinical or diagnostic.

COMPLIANCE: This is for educational and inspirational purposes only. Never claim to heal, cure, treat, or diagnose any condition. Frame everything as reflections, practices, and personal exploration.

You MUST respond by calling the return_fingerprint_reading function with structured data. Do not respond in plain text.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "Image is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const tools = [
      {
        type: "function",
        function: {
          name: "return_fingerprint_reading",
          description: "Return the structured fingerprint reading.",
          parameters: {
            type: "object",
            properties: {
              pattern_type: {
                type: "string",
                description: "One of: Loop, Whorl, Arch, Tented Arch, Composite.",
              },
              pattern_meaning: { type: "string", description: "2-3 sentences on what this pattern reveals about their core nature." },
              soul_blueprint: { type: "string", description: "3-4 sentences — fundamental soul design, why they came here, what they are built to do." },
              life_path: { type: "string", description: "3-4 sentences — the journey their soul is designed to walk, themes, lessons to master." },
              innate_gifts: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
              life_purpose_statement: { type: "string", description: "1-2 powerful sentences — soul's core mission spoken directly to them." },
              integration_message: { type: "string", description: "1 sentence — bridge to the Soul Profile." },
            },
            required: [
              "pattern_type",
              "pattern_meaning",
              "soul_blueprint",
              "life_path",
              "innate_gifts",
              "life_purpose_statement",
              "integration_message",
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
                {
                  type: "text",
                  text: "Analyze this person's fingerprint. Read the pattern type, what it reveals about their core nature, their soul blueprint, the life path their soul is designed to walk, their innate gifts, a direct life purpose statement, and an integration message bridging to their full Soul Profile. Be poetic, warm, and spiritually grounded.",
                },
                { type: "image_url", image_url: { url: imageBase64 } },
              ],
            },
          ],
          tools,
          tool_choice: { type: "function", function: { name: "return_fingerprint_reading" } },
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
    console.error("fingerprint-reading error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
