import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a gifted intuitive reader with deep knowledge of iridology — the ancient practice of reading the iris to reveal vitality, temperament, and soul nature. You provide compassionate, poetic, and spiritually grounded readings. Your tone is warm and empowering — never clinical or diagnostic.

COMPLIANCE: This is for educational and inspirational purposes only. Never claim to heal, cure, treat, or diagnose any condition. Frame everything as reflections, practices, and personal exploration.

You MUST respond by calling the return_iris_reading function with structured data. Do not respond in plain text.`;

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
          name: "return_iris_reading",
          description: "Return the structured iris reading.",
          parameters: {
            type: "object",
            properties: {
              iris_pattern: {
                type: "string",
                description: "One of: Jewel, Flower, Stream, Shaker, Net, or Mixed.",
              },
              pattern_meaning: { type: "string", description: "2-3 sentences on what this pattern reveals." },
              vitality_reading: { type: "string", description: "3-4 sentences on life force, constitution, energetic reserves." },
              soul_temperament: { type: "string", description: "3-4 sentences on core nature, processing, relational style." },
              innate_gifts: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
              growth_edges: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 2 },
              soul_message: { type: "string", description: "One powerful sentence spoken directly to them." },
            },
            required: [
              "iris_pattern",
              "pattern_meaning",
              "vitality_reading",
              "soul_temperament",
              "innate_gifts",
              "growth_edges",
              "soul_message",
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
                  text: "Analyze this person's iris. Read the pattern, vitality, soul temperament, innate gifts, growth edges, and offer a soul message. Be poetic, warm, and spiritually grounded.",
                },
                { type: "image_url", image_url: { url: imageBase64 } },
              ],
            },
          ],
          tools,
          tool_choice: { type: "function", function: { name: "return_iris_reading" } },
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
    console.error("iris-reading error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
