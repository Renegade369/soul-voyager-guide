import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Blood type data for email
const ARCHETYPES: Record<string, string> = {
  "O+": "The Hunter", "O-": "The Rare Hunter",
  "A+": "The Agrarian", "A-": "The Sensitive Agrarian",
  "B+": "The Nomad", "B-": "The Rare Nomad",
  "AB+": "The Enigma", "AB-": "The Rarest Enigma",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, email, bloodType, rhFactor } = await req.json();
    if (!name || !email || !bloodType || !rhFactor) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const key = `${bloodType}${rhFactor === "positive" ? "+" : "-"}`;
    const archetype = ARCHETYPES[key] || "Unknown";
    const rhLabel = rhFactor === "positive" ? "+" : "−";
    const isRhNeg = rhFactor === "negative";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not set");
      return new Response(JSON.stringify({ error: "Server config error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate email content via AI
    const prompt = `Create a beautifully written HTML email for "${name}" about their blood type ${bloodType}${rhLabel} (${archetype}).

The email should have a dark luxury design with these inline styles:
- Background: #0D0F0E
- Text: #E8EDE9
- Gold accents: #C9A84C
- Teal accents: #1D9E75
- Font: system sans-serif

Include these sections:
1. Header with "Soul True" gold text and "Your Blood Type Profile Has Been Revealed"
2. Large blood type display: ${bloodType}${rhLabel}
3. Archetype name: ${archetype}
4. Brief overview of this blood type's origin and meaning (2-3 paragraphs)
5. Top 10 beneficial foods for this blood type in green-styled list
6. Top 10 foods to avoid in red-styled list
7. Exercise recommendation (1 paragraph)
8. Key personality traits as gold badges
9. Health strengths and vulnerabilities
${isRhNeg ? '10. A special section about Rh negative blood being rare and mysterious - mention the Basque connection and spiritual implications (2 paragraphs)' : ''}
11. "Your Next Steps" section with links:
   - Start the 10-Day AI Challenge: https://soul-true.com/guide
   - Discover Your Soul Origin: https://soul-true.com/guide (Soul Quiz tab)
   - Generate Your Personal Meditation: https://soul-true.com/guide (Meditations tab)
   - Read Your Birth Chart: https://soul-true.com/guide (Birth Chart tab)
12. CTA: "Ready for deeper guidance? Book a session with Kim Alfano at Higher Vibes — highervibrations36@gmail.com"
13. Footer: "Live Your Truth." and "Soul True — soul-true.com"

Return ONLY the complete HTML email content, no markdown wrapping. All CSS must be inline. Make it look premium and sacred.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert HTML email designer. Return only valid HTML with inline CSS. Dark luxury aesthetic." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      console.error("AI gateway error:", aiResponse.status);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    let htmlContent = aiData.choices?.[0]?.message?.content || "";
    // Strip markdown code fences if present
    htmlContent = htmlContent.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "");

    // For now, log the email (email sending requires domain setup)
    console.log(`Blood type email generated for ${email}, blood type: ${key}`);
    console.log(`Email HTML length: ${htmlContent.length}`);

    return new Response(JSON.stringify({ success: true, message: "Profile generated" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("blood-type-email error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
