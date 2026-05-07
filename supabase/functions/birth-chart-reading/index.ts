import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a master astrologer and spiritual guide who combines traditional astrology with Soul True's philosophy of whole-person transformation. You read birth charts not just as personality profiles but as soul blueprints — maps of why this soul chose this particular incarnation, what gifts they brought, what lessons they came to master, and what their mission is in this lifetime.

Write a complete, deeply personal birth chart reading that covers:

1. SOUL BLUEPRINT OVERVIEW — A powerful opening paragraph about what this chart reveals about who this soul is and why they chose this incarnation at this exact moment in history

2. THE SUN — Core identity, life purpose, the self they are becoming (not just who they are but who they are meant to be)

3. THE MOON — Emotional nature, subconscious patterns, what their soul needs to feel safe and whole, karmic emotional themes

4. THE RISING/ASCENDANT — How they move through the world, their energetic presence, the mask and the mission behind it (only include if Ascendant data is provided)

5. MERCURY — How they think, communicate, process truth, and share wisdom

6. VENUS — How they love, what they value, their relationship with beauty and abundance

7. MARS — How they take action, fight for what matters, and channel their warrior energy

8. JUPITER — Where abundance flows, their spiritual philosophy, and how they expand

9. SATURN — Their greatest life lessons, karmic debts, and where mastery awaits

10. URANUS, NEPTUNE & PLUTO — Generational themes and personal transformation points

11. NORTH NODE — The soul's destiny direction, what they are growing toward, the path of greatest fulfillment

12. KEY ASPECTS — The most significant planetary conversations in their chart and what they mean for their soul journey

13. SOUL PURPOSE SYNTHESIS — Bring it all together into a powerful closing message about their unique mission, combining the key themes into one cohesive soul narrative

Format each section with the section name as a header. Write in second person ("you"). Be specific to their exact placements — never generic. Be warm, empowering, and deeply insightful. This should feel like a reading from a wise spiritual guide who truly sees them.

IMPORTANT: Do not use the word "healing" or "healer" as claims. Instead use "growth", "transformation", "guidance", "support". All content is educational and inspirational only.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { chartData, name } = await req.json();
    if (!chartData) {
      return new Response(JSON.stringify({ error: "Missing chart data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPrompt = `Generate a complete birth chart reading for ${name || "this soul"}.

Here is their calculated birth chart data:

${JSON.stringify(chartData, null, 2)}

Please write a comprehensive, deeply personal reading based on these exact placements.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const err = await response.text();
      console.error("AI gateway error:", response.status, err);
      return new Response(JSON.stringify({ error: "Failed to generate reading" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Birth chart reading error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
