import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GPT_SYSTEM = `You are an energy analyst. Analyze this person's current emotional and energetic state based on their words and photo if provided. Return structured raw insights about their energetic state, emotional patterns, blockages, and strengths. Be specific and observational. Return only raw insights — no poetic language, no preamble.`;

const CLAUDE_SYSTEM = `You are Soul True's sacred energy reader. A supporting AI has provided analytical insights below. Use those as one layer of input combined with your own deep reading of this person's words and photo if provided. Synthesize everything into one unified, powerful, spiritually grounded aura reading. Speak directly to the person. Use warm, truth-forward, possibility-focused language. Never use clinical or cold language.

OUTPUT STRUCTURE — you MUST call the return_aura_reading tool with these fields:
- aura_color: ONE primary aura color (Gold, Silver, Platinum, Copper, Blue, Green, Violet, White, Red, Orange, Indigo, Diamond, Clear, Opalescent, Iridescent, Obsidian, etc.)
- teaser: 2-3 sentence free preview revealing the dominant color
- emotional_core: { colors: string[], reading: 3-4 sentences }
- social_presence: { colors: string[], reading: 3-4 sentences }
- spiritual_depth: { colors: string[], reading: 3-4 sentences }
- chakras: object with root, sacral, solar_plexus, heart, throat, third_eye, crown — each with { status: "Open"|"Partially Open"|"Blocked"|"Overactive", description: 1-2 sentences, practice: 1 simple practice }
- soul_message: 2-3 sentences spoken directly. Make it land.

COMPLIANCE: Never use the words healing, heal, medicine, treatment, diagnose, cure, therapy. Use frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion instead.`;

const CHAKRA_KEYS = ["root","sacral","solar_plexus","heart","throat","third_eye","crown"] as const;

const chakraSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["Open","Partially Open","Blocked","Overactive"] },
    description: { type: "string" },
    practice: { type: "string" },
  },
  required: ["status","description","practice"],
};

const readingToolSchema = {
  name: "return_aura_reading",
  description: "Return the structured 3-layer aura reading plus chakra alignment.",
  input_schema: {
    type: "object",
    properties: {
      aura_color: { type: "string" },
      teaser: { type: "string" },
      emotional_core: {
        type: "object",
        properties: { colors: { type: "array", items: { type: "string" } }, reading: { type: "string" } },
        required: ["colors","reading"],
      },
      social_presence: {
        type: "object",
        properties: { colors: { type: "array", items: { type: "string" } }, reading: { type: "string" } },
        required: ["colors","reading"],
      },
      spiritual_depth: {
        type: "object",
        properties: { colors: { type: "array", items: { type: "string" } }, reading: { type: "string" } },
        required: ["colors","reading"],
      },
      chakras: {
        type: "object",
        properties: {
          root: chakraSchema, sacral: chakraSchema, solar_plexus: chakraSchema,
          heart: chakraSchema, throat: chakraSchema, third_eye: chakraSchema, crown: chakraSchema,
        },
        required: [...CHAKRA_KEYS],
      },
      soul_message: { type: "string" },
    },
    required: ["aura_color","teaser","emotional_core","social_presence","spiritual_depth","chakras","soul_message"],
  },
};

// Parse a data URL ("data:image/jpeg;base64,xxxx") into media type + raw base64
function parseDataUrl(dataUrl: string): { mediaType: string; data: string } | null {
  const m = dataUrl.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
  if (!m) return null;
  return { mediaType: m[1], data: m[2] };
}

function userText(answers: unknown): string {
  if (typeof answers === "string") return answers;
  if (answers && typeof answers === "object") {
    const vals = Object.values(answers as Record<string, unknown>).filter((v) => typeof v === "string");
    if (vals.length) return vals.join("\n\n");
    return JSON.stringify(answers);
  }
  return String(answers ?? "");
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { answers, imageBase64 } = await req.json();
    if (!answers) {
      return new Response(JSON.stringify({ error: "answers required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");
    if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not configured");

    const userResponse = userText(answers);
    const parsedImage = imageBase64 ? parseDataUrl(imageBase64) : null;

    // ---------- 1. GPT-4o: raw analytical insights ----------
    const gptUserContent: unknown = parsedImage
      ? [
          { type: "text", text: `User's open response:\n\n${userResponse}` },
          { type: "image_url", image_url: { url: imageBase64 } },
        ]
      : `User's open response:\n\n${userResponse}`;

    const gptResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: GPT_SYSTEM },
          { role: "user", content: gptUserContent },
        ],
        temperature: 0.7,
      }),
    });

    if (!gptResp.ok) {
      const t = await gptResp.text();
      console.error("OpenAI error", gptResp.status, t);
      return new Response(JSON.stringify({ error: `OpenAI error: ${gptResp.status}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const gptData = await gptResp.json();
    const gpt_insights: string = gptData?.choices?.[0]?.message?.content ?? "";

    // ---------- 2. Claude: synthesize into final structured reading ----------
    const claudeUserBlocks: unknown[] = [];
    if (parsedImage) {
      claudeUserBlocks.push({
        type: "image",
        source: { type: "base64", media_type: parsedImage.mediaType, data: parsedImage.data },
      });
    }
    claudeUserBlocks.push({
      type: "text",
      text:
        `THE PERSON'S OWN WORDS:\n${userResponse}\n\n` +
        `SUPPORTING ANALYTICAL INSIGHTS (from a supporting AI — use as one layer of input):\n${gpt_insights}\n\n` +
        `Now synthesize everything into the unified aura reading by calling the return_aura_reading tool.`,
    });

    const claudeResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: CLAUDE_SYSTEM,
        tools: [readingToolSchema],
        tool_choice: { type: "tool", name: "return_aura_reading" },
        messages: [{ role: "user", content: claudeUserBlocks }],
      }),
    });

    if (!claudeResp.ok) {
      const t = await claudeResp.text();
      console.error("Anthropic error", claudeResp.status, t);
      if (claudeResp.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: `Anthropic error: ${claudeResp.status}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const claudeData = await claudeResp.json();
    const toolUse = (claudeData?.content ?? []).find((b: { type: string }) => b.type === "tool_use");
    if (!toolUse?.input) {
      console.error("Claude did not return tool_use", JSON.stringify(claudeData).slice(0, 500));
      return new Response(JSON.stringify({ error: "No reading generated" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const reading = toolUse.input;
    return new Response(JSON.stringify({ reading }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("aura-reader-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
