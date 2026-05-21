// Client-side unlock state for paid readers. Backed by localStorage,
// gated server-side by the redeem_promo_code RPC + RLS on the codes table.
import { supabase } from "@/integrations/supabase/client";

export type ReaderSlug = "aura" | "blood-type" | "birth-chart" | "numerology" | "astrology" | "gene-keys";

const KEY = "soul_true_unlocks_v1";

function read(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function write(state: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function isUnlocked(slug: ReaderSlug): boolean {
  return read()[slug] === true;
}

export function unlock(slugs: ReaderSlug[] | "all") {
  const state = read();
  const all: ReaderSlug[] = ["aura", "blood-type", "birth-chart", "numerology", "astrology", "gene-keys"];
  const target = slugs === "all" ? all : slugs;
  target.forEach((s) => { state[s] = true; });
  write(state);
}

export const READER_PRICES = {
  aura: 9.99,
  "blood-type": 9.99,
  "birth-chart": 9.99,
  numerology: 9.99,
  astrology: 9.99,
  "gene-keys": 9.36,
} as const;

export const BUNDLE_PRICE = 29.99;

export const PAYWALL_COPY: Record<ReaderSlug, string> = {
  aura: "Your aura is a living record — every emotion you've carried, every wound you haven't released, every gift waiting to emerge. The full reading maps all three layers of your energy field: your emotional core, your social presence, and your spiritual depth. It tells you what your body is holding that your mind hasn't fully processed yet. This is not metaphor. This is your energy, mapped precisely.",
  "blood-type": "Your blood type is one of the oldest biological codes you carry. The full reading connects your specific blood type to your ancestral nutrition blueprint, your immune tendencies, your stress response, your optimal movement style, and your emotional architecture. Ancient traditions built entire wisdom systems around this knowledge. Most people never access it.",
  "birth-chart": "The sky at the exact moment of your first breath created a map of your soul's intention for this lifetime. The full reading decodes your Sun, Moon, Rising, and every major planetary placement — not as personality labels, but as a precise map of your gifts, your challenges, your karmic themes, and the specific energies available to you right now. This is your soul's blueprint.",
  numerology: "Your birth date and name encode a vibrational frequency that has been shaping your life since before you were aware of it. The full reading calculates your Life Path, Expression, Soul Urge, and Personal Year numbers — then synthesizes them into a complete picture of your soul's purpose, your natural gifts, your most significant challenges, and the timing of your life's major chapters.",
  astrology: "Your natal chart is a living document. The full reading goes beyond your Sun sign — it maps the current planetary transits against your natal positions to reveal exactly what energies are active in your life right now, what is ending, what is beginning, and what you are being called to step into. This is not a horoscope. This is a precision energetic forecast built from your specific chart.",
  "gene-keys": "Your 6 Gene Keys are a synthesis of the I Ching, Human Design, astrology, and epigenetics — six spheres of light encoded at your first breath. The full reading unlocks your Evolution, Radiance, Purpose, Pearl, and Venus keys, each revealing a different dimension of your soul: the Shadow you're moving through, the Gift awakening, and the Siddhi waiting at the highest frequency. This is your sacred blueprint.",
};

export const READER_TITLES: Record<ReaderSlug, string> = {
  aura: "Aura Reader",
  "blood-type": "Blood Type Reader",
  "birth-chart": "Birth Chart Reader",
  numerology: "Numerology Reader",
  astrology: "Astrology Reader",
  "gene-keys": "Gene Key Reading",
};

export async function redeemCode(code: string, slug: ReaderSlug, email?: string): Promise<
  | { ok: true; unlocks: string[] }
  | { ok: false; reason: "invalid" | "expired" | "exhausted" | "wrong_reader" | "error"; message: string }
> {
  try {
    const { data, error } = await supabase.rpc("redeem_promo_code", {
      _code: code.trim(),
      _reader: slug,
      _email: email?.trim().toLowerCase(),
    });
    if (error) return { ok: false, reason: "error", message: error.message };
    const r = data as { ok: boolean; unlocks?: string[]; reason?: string };
    if (!r?.ok) {
      const reason = (r?.reason ?? "invalid") as "invalid" | "expired" | "exhausted" | "wrong_reader";
      const messages = {
        invalid: "That code isn't valid.",
        expired: "That code has expired.",
        exhausted: "That code has reached its use limit.",
        wrong_reader: "That code doesn't unlock this reader.",
      };
      return { ok: false, reason, message: messages[reason] };
    }
    return { ok: true, unlocks: r.unlocks ?? [] };
  } catch (e) {
    return { ok: false, reason: "error", message: e instanceof Error ? e.message : "Unknown error" };
  }
}
