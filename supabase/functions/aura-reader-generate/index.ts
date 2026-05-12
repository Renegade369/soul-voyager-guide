import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Soul True's aura reader. Based on the 5 answers provided, determine this person's dominant aura color and generate a powerful personal reading.

AURA COLOR FRAMEWORK:
- Gold/Yellow — solar, purposeful, leadership energy, here to lead and illuminate
- Blue — communicator, truth-seeker, deep feeler, here to speak and be heard
- Green — healer-presence, grounded, connected to life force, here to nurture and grow
- Violet/Purple — visionary, highly intuitive, bridging worlds, here to see what others cannot
- White — pure channel, transitioning, between chapters, here to reset and rebirth
- Red — warrior, passionate, embodied power, here to act and create in the physical
- Orange — creator, connector, magnetic, here to build and bring people together
- Indigo — ancient soul, deep knowing, rare frequency, here to hold wisdom

LANGUAGE RULES:
- Positive and possibility-focused at all times
- Never medical, never diagnostic
- Never use the words: healing, heal, medicine, treatment, diagnose, cure, therapy. Use: frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion
- Speak directly to the person — use "you" and "your"
- Be specific — not "you are intuitive" but "your intuition speaks loudest when you go quiet"

Keep total reading under 400 words. Make every word count.

You MUST respond by calling return_aura_reading with structured fields. Do not respond in plain text.`;

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
        description: "Return the structured aura reading.",
        parameters: {
          type: "object",
          properties: {
            aura_color: { type: "string", enum: ["Gold", "Blue", "Green", "Violet", "White", "Red", "Orange", "Indigo"] },
            color_meaning: { type: "string", description: "What this color means for THIS person specifically. 2-3 sentences." },
            current_frequency: { type: "string", description: "What their energy field is doing right now based on answers. 2-3 sentences." },
            your_gift: { type: "string", description: "The specific energetic gift this aura carries. 2-3 sentences." },
            what_energy_needs: { type: "string", description: "One specific thing that would shift their frequency right now. 2-3 sentences." },
            soul_message: { type: "string", description: "2-3 sentences spoken directly. Make it land." },
          },
          required: ["aura_color", "color_meaning", "current_frequency", "your_gift", "what_energy_needs", "soul_message"],
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
