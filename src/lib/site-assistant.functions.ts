import { createServerFn } from "@tanstack/react-start";
import { generateText, type ModelMessage } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

export type SiteAssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

type AskInput = {
  messages: SiteAssistantMessage[];
  mode?: "chat" | "summarize";
};

const SYSTEM_PROMPT = `You are the Soul True Guide — a warm, grounded in-app assistant for soul-true.com.

About Soul True:
- A sanctuary for holistic wellness, sacred teachings, and the remembrance of who we truly are.
- Brand voice: tender, cinematic, grounded. Italics for emphasis. Tagline: "Let's Go Deeper."
- Core surfaces visitors can explore:
  • / — Homepage
  • /wisdom — Sacred teachings (origins, plant medicines, sacred texts, the true story of Jeshua)
  • /readings — Soul Profile, Birth Chart, Numerology, Gene Keys, Astrology, Blood Type, Aura
  • /meditations — Guided meditations + AI-generated personal meditations
  • /wellness — Curated wellness products
  • /practitioners — Trusted healers and guides directory
  • /blog — Journal articles
  • /sovereign — The Sovereignty Code, a 120-day program with William
  • /begin-here — Onboarding
  • /contact — Reach out to William

How to help:
1. Answer questions about Soul True's offerings, teachings, and practices. Point visitors to the most relevant route.
2. Summarize text, journal entries, or transcripts a user pastes — calm, structured, faithful to source.
3. Answer questions grounded in spiritual/wellness content the user shares.
4. If asked something outside Soul True's scope, answer briefly and helpfully.

COMPLIANCE — non-negotiable:
- Never claim to heal, cure, treat, diagnose, or prescribe.
- Never use the words "healing", "medicine", "healer", "cure", "treatment", "therapy" as claims about what Soul True offers. Use "frequency", "resources", "practices", "guidance".
- All content is educational and inspirational only. Add a soft disclaimer when discussing wellness topics.

Style:
- Concise. 1–3 short paragraphs unless a summary is requested.
- Use plain prose, not bullet-spam. Markdown is fine.
- When you recommend a page, link it like [Wisdom](/wisdom).`;

const SUMMARIZE_PROMPT = `Summarize the following text the user pasted. Produce:
1) A 1-sentence essence.
2) 3–6 key points as bullets.
3) Any action items or invitations (if present).
Be faithful to the source. Do not add claims that aren't there.`;

export const askSiteAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: AskInput) => {
    if (!input || !Array.isArray(input.messages) || input.messages.length === 0) {
      throw new Error("messages required");
    }
    const last = input.messages[input.messages.length - 1];
    if (!last?.content || last.content.length > 20000) {
      throw new Error("invalid message");
    }
    return {
      messages: input.messages.slice(-12),
      mode: input.mode === "summarize" ? "summarize" : "chat",
    } as Required<AskInput>;
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");

    const system = data.mode === "summarize"
      ? `${SYSTEM_PROMPT}\n\n${SUMMARIZE_PROMPT}`
      : SYSTEM_PROMPT;

    const modelMessages: ModelMessage[] = data.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const { text } = await generateText({
        model,
        system,
        messages: modelMessages,
      });
      return { reply: text };
    } catch (err: any) {
      const msg = String(err?.message ?? err);
      if (msg.includes("429")) {
        return { reply: "I'm receiving a lot of questions right now. Please try again in a moment." };
      }
      if (msg.includes("402")) {
        return { reply: "The guide is briefly unavailable. Please try again shortly." };
      }
      console.error("askSiteAssistant error", err);
      throw new Error("Assistant unavailable");
    }
  });
