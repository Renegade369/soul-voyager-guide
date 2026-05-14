import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PAYWALL_COPY, READER_TITLES, READER_PRICES, BUNDLE_PRICE, redeemCode, unlock, type ReaderSlug } from "@/lib/unlocks";

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

interface Props {
  slug: ReaderSlug;
  open: boolean;
  email?: string;
  onClose: () => void;
  onUnlocked: () => void;
}

export function PaywallModal({ slug, open, email, onClose, onUnlocked }: Props) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const apply = async () => {
    if (!code.trim()) return;
    setState("checking"); setMsg("");
    const r = await redeemCode(code, slug, email);
    if (r.ok) {
      // Server returned authoritative unlock list
      const slugs = r.unlocks.includes("all") ? "all" : (r.unlocks.filter((s) => s !== "all") as ReaderSlug[]);
      unlock(slugs);
      setState("ok");
      setMsg("Access granted. Your full reading is unlocked.");
      setTimeout(() => { onUnlocked(); }, 700);
    } else {
      setState("error");
      setMsg(r.message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-none border p-8"
            style={{ background: C.bg, borderColor: `${C.gold}66`, color: C.text, fontFamily: '"Outfit", sans-serif' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4" style={{ color: C.dim }}>
              <X size={18} />
            </button>

            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
              Unlock Your Full Reading
            </p>
            <h2 className="mt-3 font-serif text-3xl font-light italic" style={{ color: C.text, fontFamily: '"Cormorant Garamond", serif' }}>
              {READER_TITLES[slug]}
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: C.muted }}>
              {PAYWALL_COPY[slug]}
            </p>

            <div className="mt-7 space-y-3">
              <button
                disabled
                className="block w-full cursor-not-allowed rounded-none px-6 py-4 text-[11px] uppercase tracking-[0.22em] opacity-60"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}
                title="Payments coming soon"
              >
                ${READER_PRICES[slug].toFixed(2)} — Unlock Full Reading
              </button>
              <button
                disabled
                className="block w-full cursor-not-allowed rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em] opacity-60"
                style={{ borderColor: C.gold, color: C.gold, background: "transparent" }}
                title="Payments coming soon"
              >
                ${BUNDLE_PRICE.toFixed(2)} — Unlock All Four Readers (Bundle)
              </button>
              <p className="text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                Payments coming soon
              </p>
            </div>

            <div className="mt-8 border-t pt-6" style={{ borderColor: `${C.gold}33` }}>
              <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
                Have an access code?
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter access code"
                  className="flex-1 rounded-none border bg-transparent px-4 py-3 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }}
                  onKeyDown={(e) => { if (e.key === "Enter") apply(); }}
                />
                <button
                  onClick={apply}
                  disabled={!code.trim() || state === "checking"}
                  className="rounded-none px-5 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}
                >
                  {state === "checking" ? "…" : "Apply"}
                </button>
              </div>
              {msg && (
                <p className="mt-3 text-sm" style={{ color: state === "ok" ? C.gold : "#E8504C" }}>
                  {msg}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
