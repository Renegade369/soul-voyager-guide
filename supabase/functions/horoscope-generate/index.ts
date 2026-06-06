import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const FREE_SYSTEM = `You are the Soul True Oracle — a deeply wise, spiritually attuned voice. Tone: mystical yet grounded, poetic yet direct. Speak raw truth. Never use cliches.

COMPLIANCE: Never use the words healing, heal, medicine, treatment, diagnose, cure, therapy. Use frequency, alignment, vibrational shift, soul work, consciousness expansion instead.

You MUST call the return_free_horoscope function.`;

const DEEP_SYSTEM = `You are the Soul True Oracle — the deepest, most unfiltered transmission. This is the FULL reading — nothing held back. Go beyond surface astrology into soul-level truth. Raw, real, transformative. No platitudes.

COMPLIANCE: Never use the words healing, heal, medicine, treatment, diagnose, cure, therapy. Use frequency, alignment, vibrational shift, soul work, consciousness expansion instead.

You MUST call the return_deep_horoscope function.`;

const freeFn = {
  type: "function",
  function: {
    name: "return_free_horoscope",
    description: "Return a free preview daily horoscope.",
    parameters: {
      type: "object",
      properties: {
        theme: { type: "string", description: "2-4 word soul theme" },
        message: { type: "string", description: "2 sentences of daily guidance" },
        shadow: { type: "string", description: "1 sentence on shadow or resistance today" },
        activation: { type: "string", description: "One powerful soul activation sentence" },
        energy: { type: "string", enum: ["Low", "Building", "High", "Intense", "Transformative"] },
        domains: {
          type: "object",
          properties: {
            love: { type: "string" },
            purpose: { type: "string" },
            wealth: { type: "string" },
            spirit: { type: "string" },
          },
          required: ["love", "purpose", "wealth", "spirit"],
          additionalProperties: false,
        },
      },
      required: ["theme", "message", "shadow", "activation", "energy", "domains"],
      additionalProperties: false,
    },
  },
};

const deepFn = {
  type: "function",
  function: {
    name: "return_deep_horoscope",
    description: "Return the full deep horoscope reading.",
    parameters: {
      type: "object",
      properties: {
        extended_message: { type: "string", description: "5-7 sentences of profound channeled guidance" },
        deeper_shadow: { type: "string", description: "2-3 sentences on shadow patterns at play" },
        soul_invitation: { type: "string", description: "2 sentences on what the soul is invited to step into this week" },
        cosmic_context: { type: "string", description: "1-2 sentences on current cosmic climate for this sign" },
      },
      required: ["extended_message", "deeper_shadow", "soul_invitation", "cosmic_context"],
      additionalProperties: false,
    },
  },
};

function errorResponse(message: string, status = 200) {
  return new Response(JSON.stringify({ error: message }), { status, headers: corsHeaders });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    let body: { sign?: string; element?: string; dates?: string; mode?: "free" | "deep" };
    try {
      body = await req.json();
    } catch (e) {
      console.error("horoscope-generate: invalid JSON body", e);
      return errorResponse("Invalid request body", 400);
    }

    const { sign, element, dates, mode } = body;
    if (!sign || !element || !dates || (mode !== "free" && mode !== "deep")) {
      return errorResponse("sign, element, dates, mode required", 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("horoscope-generate: LOVABLE_API_KEY not configured");
      return errorResponse("AI gateway not configured");
    }

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const isFree = mode === "free";
    const fn = isFree ? freeFn : deepFn;
    const systemPrompt = isFree ? FREE_SYSTEM : DEEP_SYSTEM;
    const userMsg = isFree
      ? `Generate a FREE PREVIEW daily horoscope for ${sign} (${element}, ${dates}). Today: ${today}. Give just enough to feel real and powerful — the deeper truth is reserved for the full reading.`
      : `Generate the FULL DEEP READING for ${sign} (${element}, ${dates}). Today: ${today}. Hold nothing back.`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMsg },
        ],
        tools: [fn],
        tool_choice: { type: "function", function: { name: fn.function.name } },
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text().catch(() => "");
      console.error("horoscope-generate: AI gateway error", aiResp.status, t.slice(0, 500));
      if (aiResp.status === 429) return errorResponse("Too many requests. Please wait a moment and try again.");
      if (aiResp.status === 402) return errorResponse("AI credits exhausted. Please add credits in workspace settings.");
      return errorResponse(`AI gateway error: ${aiResp.status}`);
    }

    const data = await aiResp.json();
    const argsStr = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!argsStr) {
      console.error("horoscope-generate: no tool_call", JSON.stringify(data).slice(0, 500));
      return errorResponse("No reading generated");
    }

    let reading: unknown;
    try {
      reading = JSON.parse(argsStr);
    } catch (e) {
      console.error("horoscope-generate: failed to parse tool args", e);
      return errorResponse("Reading could not be parsed");
    }

    return new Response(JSON.stringify({ reading }), { headers: corsHeaders });
  } catch (e) {
    console.error("horoscope-generate: unexpected error", e instanceof Error ? e.stack || e.message : e);
    return errorResponse(e instanceof Error ? e.message : "Unknown error");
  }
});
