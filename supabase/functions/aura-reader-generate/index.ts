import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const SYSTEM_PROMPT = `You are Soul True's sacred energy reader. Read this person's current emotional and energetic state from their own words and (if provided) their photo. Speak directly to the person with warm, truth-forward, possibility-focused language. Never use clinical or cold language.

You MUST call the return_aura_reading function with the structured fields.

COMPLIANCE: Never use the words healing, heal, medicine, treatment, diagnose, cure, therapy. Use frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion instead.

FIELD GUIDANCE:
- aura_color: ONE primary aura color (Gold, Silver, Platinum, Copper, Blue, Green, Violet, White, Red, Orange, Indigo, Diamond, Clear, Opalescent, Iridescent, Obsidian, etc.)
- teaser: 2-3 sentence preview revealing the dominant color
- emotional_core / social_presence / spiritual_depth: each { colors: string[], reading: 3-4 sentences }
- chakras: root, sacral, solar_plexus, heart, throat, third_eye, crown — each with { status: "Open"|"Partially Open"|"Blocked"|"Overactive", description: 1-2 sentences, practice: 1 simple practice }
- soul_message: 2-3 sentences spoken directly. Make it land.`;

const CHAKRA_KEYS = ["root","sacral","solar_plexus","heart","throat","third_eye","crown"] as const;

const layerSchema = {
  type: "object",
  properties: {
    colors: { type: "array", items: { type: "string" } },
    reading: { type: "string" },
  },
  required: ["colors", "reading"],
  additionalProperties: false,
};

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

const readingFunction = {
  type: "function",
  function: {
    name: "return_aura_reading",
    description: "Return the structured 3-layer aura reading plus chakra alignment.",
    parameters: {
      type: "object",
      properties: {
        aura_color: { type: "string" },
        teaser: { type: "string" },
        emotional_core: layerSchema,
        social_presence: layerSchema,
        spiritual_depth: layerSchema,
        chakras: {
          type: "object",
          properties: Object.fromEntries(CHAKRA_KEYS.map((k) => [k, chakraSchema])),
          required: [...CHAKRA_KEYS],
          additionalProperties: false,
        },
        soul_message: { type: "string" },
      },
      required: ["aura_color","teaser","emotional_core","social_presence","spiritual_depth","chakras","soul_message"],
      additionalProperties: false,
    },
  },
};

function userText(answers: unknown): string {
  if (typeof answers === "string") return answers;
  if (answers && typeof answers === "object") {
    const vals = Object.values(answers as Record<string, unknown>).filter((v) => typeof v === "string");
    if (vals.length) return vals.join("\n\n");
    return JSON.stringify(answers);
  }
  return String(answers ?? "");
}

function errorResponse(message: string, status = 200) {
  // Return 200 with structured error so the frontend can show a graceful retry
  return new Response(JSON.stringify({ error: message }), { status, headers: corsHeaders });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    let body: { answers?: unknown; imageBase64?: string };
    try {
      body = await req.json();
    } catch (e) {
      console.error("aura-reader-generate: invalid JSON body", e);
      return errorResponse("Invalid request body", 400);
    }

    const { answers, imageBase64 } = body;
    if (!answers) {
      console.error("aura-reader-generate: missing answers");
      return errorResponse("answers required", 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("aura-reader-generate: LOVABLE_API_KEY not configured");
      return errorResponse("AI gateway not configured");
    }

    const userResponse = userText(answers);

    // Validate image payload (data URL form expected from the client)
    let imageUrl: string | null = null;
    if (typeof imageBase64 === "string" && imageBase64.length > 0) {
      const m = imageBase64.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
      if (!m) {
        console.error("aura-reader-generate: image is not a valid data URL — ignoring");
      } else {
        // ~base64 size in bytes
        const approxBytes = Math.floor((m[2].length * 3) / 4);
        console.log(`aura-reader-generate: image accepted media=${m[1]} approxBytes=${approxBytes}`);
        if (approxBytes > 6 * 1024 * 1024) {
          console.error("aura-reader-generate: image too large", approxBytes);
          return errorResponse("Image too large — please retake at a smaller size");
        }
        imageUrl = imageBase64;
      }
    }

    const userContent: unknown = imageUrl
      ? [
          { type: "text", text: `User's open response:\n\n${userResponse}` },
          { type: "image_url", image_url: { url: imageUrl } },
        ]
      : `User's open response:\n\n${userResponse}`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        tools: [readingFunction],
        tool_choice: { type: "function", function: { name: "return_aura_reading" } },
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text().catch(() => "");
      console.error("aura-reader-generate: AI gateway error", aiResp.status, t.slice(0, 500));
      if (aiResp.status === 429) return errorResponse("Too many requests. Please wait a moment and try again.");
      if (aiResp.status === 402) return errorResponse("AI credits exhausted. Please add credits in workspace settings.");
      return errorResponse(`AI gateway error: ${aiResp.status}`);
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments;
    if (!argsStr) {
      console.error("aura-reader-generate: no tool_call in response", JSON.stringify(data).slice(0, 500));
      return errorResponse("No reading generated");
    }

    let reading: unknown;
    try {
      reading = JSON.parse(argsStr);
    } catch (e) {
      console.error("aura-reader-generate: failed to parse tool args", e, argsStr.slice(0, 500));
      return errorResponse("Reading could not be parsed");
    }

    return new Response(JSON.stringify({ reading }), { headers: corsHeaders });
  } catch (e) {
    console.error("aura-reader-generate: unexpected error", e instanceof Error ? e.stack || e.message : e);
    return errorResponse(e instanceof Error ? e.message : "Unknown error");
  }
});
