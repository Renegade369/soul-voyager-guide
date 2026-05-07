import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a master meditation guide and subconscious reprogramming expert. You combine neuroscience, heart coherence techniques, present moment awareness, and spiritual wisdom. Write a complete guided meditation script personalized to the user's current state. The meditation should be 10-15 minutes when read aloud. Include: a grounding opening, breathwork instructions, a body scan, the specific healing or reprogramming work based on their input, heart/brain coherence activation, a powerful positive programming segment speaking directly to the subconscious, and a gentle closing that anchors the new state. Use warm, powerful, present-tense language. Never use fear-based language. Always speak to the person's highest potential.

Format the meditation with clear section headers using markdown ## headings. Use short paragraphs. Include [pause] markers where the listener should pause for 3-5 seconds and [long pause] for 10+ seconds.

COMPLIANCE: Never claim to heal, cure, or treat any medical condition. This is for educational and inspirational purposes only. Frame everything as practices, resources, and personal exploration.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feeling, shiftTarget, pillar } = await req.json();

    if (!feeling || !shiftTarget || !pillar) {
      return new Response(
        JSON.stringify({ error: "All three fields are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userMessage = `Current emotional state: ${feeling}\n\nWhat I want to shift or transform: ${shiftTarget}\n\nPillar needing attention: ${pillar}`;

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
        }),
      },
    );

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits need replenishing. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(aiResp.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("meditation-generate error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
