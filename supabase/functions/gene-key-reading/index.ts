import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const GENE_KEY_TITLES: Record<number, string> = {
  1: "Freshness", 2: "Unity", 3: "Innovation", 4: "Forgiveness", 5: "Patience",
  6: "Diplomacy", 7: "Guidance", 8: "Contribution", 9: "Determination", 10: "Being",
  11: "Idealism", 12: "Discrimination", 13: "Discernment", 14: "Competence",
  15: "Magnetism", 16: "Versatility", 17: "Omniscience", 18: "Integrity",
  19: "Sacrifice", 20: "The Now", 21: "Valour", 22: "Graciousness", 23: "Simplicity",
  24: "Invention", 25: "Universal Love", 26: "Invisibility", 27: "Altruism",
  28: "Totality", 29: "Devotion", 30: "Lightness", 31: "Leadership", 32: "Veneration",
  33: "Mindfulness", 34: "Power", 35: "Adventure", 36: "Compassion", 37: "Tenderness",
  38: "Perseverance", 39: "Dynamism", 40: "Resolve", 41: "Fantasy", 42: "Detachment",
  43: "Insight", 44: "Synarchy", 45: "Communion", 46: "Ecstasy", 47: "Transmutation",
  48: "Wisdom", 49: "Revolution", 50: "Harmony", 51: "Initiative", 52: "Stillness",
  53: "Expansion", 54: "Aspiration", 55: "Freedom", 56: "Enrichment", 57: "Acuity",
  58: "Vitality", 59: "Intimacy", 60: "Realism", 61: "Inspiration", 62: "Precision",
  63: "Truth", 64: "Imagination",
};

// Shadow / Gift / Siddhi triads (canonical Richard Rudd Gene Keys reference)
const GENE_KEY_FREQUENCIES: Record<number, { shadow: string; gift: string; siddhi: string }> = {
  1: { shadow: "Entropy", gift: "Freshness", siddhi: "Beauty" },
  2: { shadow: "Dislocation", gift: "Orientation", siddhi: "Unity" },
  3: { shadow: "Chaos", gift: "Innovation", siddhi: "Innocence" },
  4: { shadow: "Intolerance", gift: "Understanding", siddhi: "Forgiveness" },
  5: { shadow: "Impatience", gift: "Patience", siddhi: "Timelessness" },
  6: { shadow: "Conflict", gift: "Diplomacy", siddhi: "Peace" },
  7: { shadow: "Division", gift: "Guidance", siddhi: "Virtue" },
  8: { shadow: "Mediocrity", gift: "Style", siddhi: "Exquisiteness" },
  9: { shadow: "Inertia", gift: "Determination", siddhi: "Invincibility" },
  10: { shadow: "Self-Obsession", gift: "Naturalness", siddhi: "Being" },
  11: { shadow: "Obscurity", gift: "Idealism", siddhi: "Light" },
  12: { shadow: "Vanity", gift: "Discrimination", siddhi: "Purity" },
  13: { shadow: "Discord", gift: "Discernment", siddhi: "Empathy" },
  14: { shadow: "Compromise", gift: "Competence", siddhi: "Bounteousness" },
  15: { shadow: "Dullness", gift: "Magnetism", siddhi: "Florescence" },
  16: { shadow: "Indifference", gift: "Versatility", siddhi: "Mastery" },
  17: { shadow: "Opinion", gift: "Far-sightedness", siddhi: "Omniscience" },
  18: { shadow: "Judgement", gift: "Integrity", siddhi: "Perfection" },
  19: { shadow: "Co-dependence", gift: "Sensitivity", siddhi: "Sacrifice" },
  20: { shadow: "Superficiality", gift: "Self-Assurance", siddhi: "Presence" },
  21: { shadow: "Control", gift: "Authority", siddhi: "Valour" },
  22: { shadow: "Dishonour", gift: "Graciousness", siddhi: "Grace" },
  23: { shadow: "Complexity", gift: "Simplicity", siddhi: "Quintessence" },
  24: { shadow: "Addiction", gift: "Invention", siddhi: "Silence" },
  25: { shadow: "Constriction", gift: "Acceptance", siddhi: "Universal Love" },
  26: { shadow: "Pride", gift: "Artfulness", siddhi: "Invisibility" },
  27: { shadow: "Selfishness", gift: "Altruism", siddhi: "Selflessness" },
  28: { shadow: "Purposelessness", gift: "Totality", siddhi: "Immortality" },
  29: { shadow: "Half-heartedness", gift: "Commitment", siddhi: "Devotion" },
  30: { shadow: "Desire", gift: "Lightness", siddhi: "Rapture" },
  31: { shadow: "Arrogance", gift: "Leadership", siddhi: "Humility" },
  32: { shadow: "Failure", gift: "Preservation", siddhi: "Veneration" },
  33: { shadow: "Forgetting", gift: "Mindfulness", siddhi: "Revelation" },
  34: { shadow: "Force", gift: "Strength", siddhi: "Majesty" },
  35: { shadow: "Hunger", gift: "Adventure", siddhi: "Boundlessness" },
  36: { shadow: "Turbulence", gift: "Humanity", siddhi: "Compassion" },
  37: { shadow: "Weakness", gift: "Equality", siddhi: "Tenderness" },
  38: { shadow: "Struggle", gift: "Perseverance", siddhi: "Honour" },
  39: { shadow: "Provocation", gift: "Dynamism", siddhi: "Liberation" },
  40: { shadow: "Exhaustion", gift: "Resolve", siddhi: "Divine Will" },
  41: { shadow: "Fantasy", gift: "Anticipation", siddhi: "Emanation" },
  42: { shadow: "Expectation", gift: "Detachment", siddhi: "Celebration" },
  43: { shadow: "Deafness", gift: "Insight", siddhi: "Epiphany" },
  44: { shadow: "Interference", gift: "Teamwork", siddhi: "Synarchy" },
  45: { shadow: "Dominance", gift: "Synergy", siddhi: "Communion" },
  46: { shadow: "Seriousness", gift: "Delight", siddhi: "Ecstasy" },
  47: { shadow: "Oppression", gift: "Transmutation", siddhi: "Transfiguration" },
  48: { shadow: "Inadequacy", gift: "Resourcefulness", siddhi: "Wisdom" },
  49: { shadow: "Reaction", gift: "Revolution", siddhi: "Rebirth" },
  50: { shadow: "Corruption", gift: "Equilibrium", siddhi: "Harmony" },
  51: { shadow: "Agitation", gift: "Initiative", siddhi: "Awakening" },
  52: { shadow: "Stress", gift: "Restraint", siddhi: "Stillness" },
  53: { shadow: "Immaturity", gift: "Expansion", siddhi: "Superabundance" },
  54: { shadow: "Greed", gift: "Aspiration", siddhi: "Ascension" },
  55: { shadow: "Victimisation", gift: "Freedom", siddhi: "Freedom" },
  56: { shadow: "Distraction", gift: "Enrichment", siddhi: "Intoxication" },
  57: { shadow: "Unease", gift: "Intuition", siddhi: "Clarity" },
  58: { shadow: "Dissatisfaction", gift: "Vitality", siddhi: "Bliss" },
  59: { shadow: "Dishonesty", gift: "Intimacy", siddhi: "Transparency" },
  60: { shadow: "Limitation", gift: "Realism", siddhi: "Justice" },
  61: { shadow: "Psychosis", gift: "Inspiration", siddhi: "Sanctity" },
  62: { shadow: "Intellect", gift: "Precision", siddhi: "Impeccability" },
  63: { shadow: "Doubt", gift: "Inquiry", siddhi: "Truth" },
  64: { shadow: "Confusion", gift: "Imagination", siddhi: "Illumination" },
};

const SPHERE_NAMES = {
  lifeWork: "Life's Work",
  evolution: "Evolution",
  radiance: "Radiance",
  purpose: "Purpose",
  pearl: "Pearl",
  venus: "Venus",
} as const;

const SPHERES = ["lifeWork", "evolution", "radiance", "purpose", "pearl", "venus"] as const;

const SYSTEM_PROMPT = `You are a sacred Gene Keys guide — a mystic and soul whisperer who speaks in the language of depth, beauty, and awakening. You do NOT use clinical, generic, or wellness-blogger language. Your tone is reverent, poetic, and precise.

Gene Keys are a synthesis of the I Ching, Human Design, astrology, and epigenetics. Each key (1–64) has three frequencies: Shadow (unconscious pattern), Gift (awakened expression), and Siddhi (highest potential / divine essence).

For each Gene Key reading requested, generate a rich, personalized paragraph of 120–180 words that:
1. Names the Gene Key number and its title
2. Describes what this sphere of life means for this soul (use the sphere name — Life's Work, Evolution, Radiance, Purpose, Pearl, or Venus)
3. Weaves in the Shadow, Gift, and Siddhi frequencies in a poetic way
4. Ends with a single sacred activation sentence — something the person can sit with or return to

COMPLIANCE: Never use the words healing, heal, medicine, treatment, diagnose, cure, therapy. Use frequency wellness, energetic alignment, vibrational shift, soul work, consciousness expansion instead.

Do NOT use the word "AI". Do NOT use generic spiritual filler ("you are on a journey", "trust the process"). Make each reading feel like it was written specifically for this soul.`;

const sphereSchema = {
  type: "object",
  properties: {
    keyNumber: { type: "number" },
    keyTitle: { type: "string" },
    reading: { type: "string" },
  },
  required: ["keyNumber", "keyTitle", "reading"],
  additionalProperties: false,
};

const readingFunction = {
  type: "function",
  function: {
    name: "return_gene_key_reading",
    description: "Return the structured 6-sphere Gene Keys reading.",
    parameters: {
      type: "object",
      properties: Object.fromEntries(SPHERES.map((s) => [s, sphereSchema])),
      required: [...SPHERES],
      additionalProperties: false,
    },
  },
};

function errorResponse(message: string, status = 200) {
  return new Response(JSON.stringify({ error: message }), { status, headers: corsHeaders });
}

function clampGate(n: unknown): number {
  const v = typeof n === "number" ? Math.floor(n) : parseInt(String(n), 10);
  if (!Number.isFinite(v)) return 1;
  return Math.min(64, Math.max(1, v));
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    let body: Record<string, unknown>;
    try { body = await req.json(); }
    catch (e) {
      console.error("gene-key-reading: invalid JSON", e);
      return errorResponse("Invalid request body", 400);
    }

    const keys: Record<string, number> = {};
    for (const s of SPHERES) keys[s] = clampGate(body[s]);
    const birthDate = String(body.birthDate ?? "");
    const birthCity = String(body.birthCity ?? "");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("gene-key-reading: LOVABLE_API_KEY not configured");
      return errorResponse("AI gateway not configured");
    }

    const reference = SPHERES.map((s) => {
      const n = keys[s];
      const freq = GENE_KEY_FREQUENCIES[n];
      return `${SPHERE_NAMES[s]} → Gene Key ${n}: ${GENE_KEY_TITLES[n]} (Shadow: ${freq.shadow} · Gift: ${freq.gift} · Siddhi: ${freq.siddhi})`;
    }).join("\n");

    const userPrompt = `This soul was born ${birthDate}${birthCity ? ` in ${birthCity}` : ""}. Generate a personalized 120–180 word reading for each of the 6 spheres below. Use the canonical titles exactly.

${reference}

Return your response by calling return_gene_key_reading with all 6 spheres filled in (keyNumber + keyTitle + reading).`;

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
          { role: "user", content: userPrompt },
        ],
        tools: [readingFunction],
        tool_choice: { type: "function", function: { name: "return_gene_key_reading" } },
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text().catch(() => "");
      console.error("gene-key-reading: AI gateway error", aiResp.status, t.slice(0, 500));
      if (aiResp.status === 429) return errorResponse("Too many requests. Please wait a moment and try again.");
      if (aiResp.status === 402) return errorResponse("Credits exhausted. Please add credits in workspace settings.");
      return errorResponse(`AI gateway error: ${aiResp.status}`);
    }

    const data = await aiResp.json();
    const argsStr = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!argsStr) {
      console.error("gene-key-reading: no tool_call", JSON.stringify(data).slice(0, 500));
      return errorResponse("No reading generated");
    }

    let reading: Record<string, { keyNumber: number; keyTitle: string; reading: string }>;
    try { reading = JSON.parse(argsStr); }
    catch (e) {
      console.error("gene-key-reading: parse failed", e);
      return errorResponse("Reading could not be parsed");
    }

    // Ensure titles & numbers match what we computed (AI sometimes drifts)
    for (const s of SPHERES) {
      if (reading[s]) {
        reading[s].keyNumber = keys[s];
        reading[s].keyTitle = GENE_KEY_TITLES[keys[s]];
      }
    }

    return new Response(JSON.stringify({ reading }), { headers: corsHeaders });
  } catch (e) {
    console.error("gene-key-reading: unexpected error", e instanceof Error ? e.stack || e.message : e);
    return errorResponse(e instanceof Error ? e.message : "Unknown error");
  }
});
