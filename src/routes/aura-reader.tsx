import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PaywallModal } from "@/components/PaywallModal";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { isUnlocked } from "@/lib/unlocks";

export const Route = createFileRoute("/aura-reader")({
  head: () => ({
    meta: [
      { title: "Aura Reader — Soul True" },
      { name: "description", content: "A 3-layer aura reading: emotional core, social presence, spiritual depth — plus full 7-chakra alignment." },
      { property: "og:title", content: "Aura Reader — Soul True" },
      { property: "og:description", content: "Map your 3-layer energy field." },
    ],
  }),
  component: AuraReaderPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

const AURA_HEX: Record<string, string> = {
  Gold: "#C9A84C", Silver: "#C0C0C0", Platinum: "#E5E4E2", Copper: "#B87333",
  Blue: "#5B8FC9", Green: "#5BC97D", Violet: "#A05BC9", White: "#F5F0E8",
  Red: "#E8504C", Orange: "#E89149", Indigo: "#6E5BC9",
  Diamond: "#F5F0E8", Clear: "#F5F0E8", Opalescent: "#E8D8E8",
  Iridescent: "#C3A6D4", Obsidian: "#1A1209",
};
function colorOf(name: string): string {
  const key = Object.keys(AURA_HEX).find(k => name.toLowerCase().includes(k.toLowerCase()));
  return key ? AURA_HEX[key] : C.gold;
}

const FEELING_QUESTION = "How are you feeling right now?";

const CHAKRAS = [
  { key: "root", label: "Root", color: "#C9302C" },
  { key: "sacral", label: "Sacral", color: "#E89149" },
  { key: "solar_plexus", label: "Solar Plexus", color: "#D4A017" },
  { key: "heart", label: "Heart", color: "#5BC97D" },
  { key: "throat", label: "Throat", color: "#5B8FC9" },
  { key: "third_eye", label: "Third Eye", color: "#6E5BC9" },
  { key: "crown", label: "Crown", color: "#A05BC9" },
] as const;

type Layer = { colors: string[]; reading: string };
type Chakra = { status: string; description: string; practice: string };
type Reading = {
  aura_color: string; teaser: string;
  emotional_core: Layer; social_presence: Layer; spiritual_depth: Layer;
  chakras: Record<string, Chakra>;
  soul_message: string;
};

function AuraReaderPage() {
  const [step, setStep] = useState<"intake" | "email" | "loading" | "result" | "error">("intake");
  const [feeling, setFeeling] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  // Compress + resize an image dataURL to <= maxDim on the longest side, JPEG quality 0.82.
  const compressImage = (dataUrl: string, maxDim = 1024, quality = 0.82): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(dataUrl);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch (err) { reject(err); }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = dataUrl;
    });

  const handlePhotoFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const raw = reader.result as string;
        const compressed = await compressImage(raw, 1024, 0.82);
        setPhoto(compressed);
      } catch {
        setPhoto(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => { setUnlocked(isUnlocked("aura")); }, []);

  const goToEmail = () => {
    if (!feeling.trim()) return;
    setStep("email");
  };

  const submit = async () => {
    if (!email.trim()) return;
    setStep("loading");
    setErrorMsg("");
    try {
      // Ensure image is fully encoded + compressed before the API call.
      let imageBase64: string | undefined = photo ?? undefined;
      if (imageBase64) {
        try { imageBase64 = await compressImage(imageBase64, 1024, 0.82); } catch { /* keep original */ }
      }

      const payload: Record<string, string> = { [FEELING_QUESTION]: feeling.trim() };

      // 60s timeout guard
      const TIMEOUT_MS = 60_000;
      const invocation = supabase.functions.invoke("aura-reader-generate", {
        body: { answers: payload, imageBase64 },
      });
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), TIMEOUT_MS),
      );
      const { data, error } = await Promise.race([invocation, timeout]) as Awaited<typeof invocation>;

      if (error) throw new Error(error.message || "Edge function error");
      if (!data || data.error) throw new Error(data?.error || "No reading returned");
      const r = data.reading as Reading | undefined;
      if (!r) throw new Error("No reading returned");

      setReading(r);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      setStep("result");
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), source: "aura-reader", opted_in_consciousness_map: optIn });
      if (optIn) void supabase.from("consciousness_data").insert({ reader_type: "aura", aura_color: r.aura_color, dominant_energy: feeling.trim().slice(0, 200) });
    } catch (e) {
      console.error("aura-reader submit error", e);
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("error");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/readings" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← All Readings</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Aura · $9.99</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "intake" && (
            <motion.div key="intake" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: C.gold }}>Begin</p>
              <h1 className="font-serif text-3xl font-light italic md:text-4xl">{FEELING_QUESTION}</h1>
              <textarea
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Be honest. This is your space."
                rows={6}
                className="mt-8 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none resize-none"
                style={{ borderColor: `${C.gold}66`, color: C.text, background: "rgba(201,168,76,0.03)" }}
              />

              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>Optional · Add your photo</p>
                <p className="text-sm mb-4" style={{ color: C.muted }}>
                  Sharing a photo lets the reading sense your present energetic field. Entirely optional — the reading works beautifully without it.
                </p>
                {photo ? (
                  <div className="flex items-center gap-4 rounded-none border p-4" style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                    <img src={photo} alt="Your photo" className="h-20 w-20 object-cover" style={{ border: `1px solid ${C.gold}55` }} />
                    <div className="flex-1 flex flex-col gap-2">
                      <button type="button" onClick={() => { setPhoto(null); cameraInputRef.current?.click(); }}
                        className="text-[10px] uppercase tracking-[0.22em] text-left" style={{ color: C.gold }}>
                        Retake / Replace
                      </button>
                      <button type="button" onClick={() => setPhoto(null)}
                        className="text-[10px] uppercase tracking-[0.22em] text-left" style={{ color: C.dim }}>
                        Remove photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => cameraInputRef.current?.click()}
                      className="rounded-none border px-4 py-3 text-[11px] uppercase tracking-[0.22em]"
                      style={{ borderColor: `${C.gold}66`, color: C.gold, background: "rgba(201,168,76,0.04)" }}>
                      📷 Take Photo
                    </button>
                    <button type="button" onClick={() => uploadInputRef.current?.click()}
                      className="rounded-none border px-4 py-3 text-[11px] uppercase tracking-[0.22em]"
                      style={{ borderColor: `${C.gold}66`, color: C.gold, background: "rgba(201,168,76,0.04)" }}>
                      📁 Upload Photo
                    </button>
                  </div>
                )}
                <input ref={cameraInputRef} type="file" accept="image/*" capture="user" className="hidden"
                  onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
                <input ref={uploadInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
              </div>

              <button onClick={goToEmail} disabled={!feeling.trim()}
                className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Continue →
              </button>
            </motion.div>
          )}

          {step === "email" && (
            <motion.div key="email" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: C.gold }}>Almost there</p>
              <h1 className="font-serif text-3xl font-light italic md:text-4xl">Where shall we send your aura reading?</h1>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                className="mt-8 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                style={{ borderColor: `${C.gold}66`, color: C.text }} />
              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm" style={{ color: C.muted }}>
                <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-1" />
                <span>Contribute my anonymized reading to the Soul True Consciousness Map. No personal information is ever stored with your reading data.</span>
              </label>
              <button onClick={submit} disabled={!email.trim()}
                className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Reveal My Aura →
              </button>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div
              key="load"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
              style={{ background: "rgba(10,10,10,0.94)", backdropFilter: "blur(6px)", pointerEvents: "auto" }}
              aria-busy="true"
              aria-live="polite"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-32 w-32 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
              <p className="mt-10 font-serif text-xl italic text-center" style={{ color: C.gold }}>
                Reading your aura field… please wait
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                This may take up to a minute
              </p>
            </motion.div>
          )}

          {step === "error" && (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <p className="font-serif text-2xl italic" style={{ color: C.gold }}>
                We couldn't read your aura this time — please retake your photo and try again.
              </p>
              {errorMsg && <p className="mt-3 text-xs" style={{ color: C.dim }}>{errorMsg === "TIMEOUT" ? "The reading took too long to respond." : errorMsg}</p>}
              <button onClick={() => { setStep("intake"); setErrorMsg(""); }}
                className="mt-8 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>Try again</button>
            </motion.div>
          )}

          {step === "result" && reading && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your dominant aura</p>
                <div className="relative mx-auto mt-8 h-44 w-44">
                  <div className="absolute inset-0 animate-pulse rounded-full"
                    style={{ background: `radial-gradient(circle, ${colorOf(reading.aura_color)}, transparent 70%)`, filter: "blur(20px)" }} />
                  <div className="absolute inset-6 rounded-full"
                    style={{ background: colorOf(reading.aura_color), boxShadow: `0 0 60px ${colorOf(reading.aura_color)}` }} />
                </div>
                <h1 className="mt-10 font-serif text-5xl font-light italic" style={{ color: C.text }}>{reading.aura_color}</h1>
              </div>

              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>Free preview</p>
                <p className="font-serif text-xl italic leading-relaxed">"{reading.teaser}"</p>
              </motion.section>

              {!unlocked && (
                <div className="mt-10 rounded-none border p-7 text-center" style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The full 3-layer reading awaits</p>
                  <p className="mt-3 text-base" style={{ color: C.muted }}>Emotional Core, Social Presence, Spiritual Depth — plus your full 7-chakra alignment.</p>
                  <button onClick={() => setPaywallOpen(true)}
                    className="mt-6 inline-block rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                    style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                    Unlock Full Reading →
                  </button>
                </div>
              )}

              {unlocked && (
                <>
                  {[
                    { label: "Layer 1 · Emotional Core", layer: reading.emotional_core },
                    { label: "Layer 2 · Social Presence", layer: reading.social_presence },
                    { label: "Layer 3 · Spiritual Depth", layer: reading.spiritual_depth },
                  ].map((s, i) => (
                    <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="mt-12">
                      <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>{s.label}</p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {s.layer.colors.map((c) => (
                          <span key={c} className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
                            <span className="inline-block h-3 w-3 rounded-full" style={{ background: colorOf(c), boxShadow: `0 0 8px ${colorOf(c)}80` }} />
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-base leading-relaxed">{s.layer.reading}</p>
                    </motion.section>
                  ))}

                  <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-14">
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>Chakra alignment</p>
                    <div className="space-y-3">
                      {CHAKRAS.map(({ key, label, color }) => {
                        const ch = reading.chakras[key];
                        if (!ch) return null;
                        return (
                          <div key={key} className="rounded-none border p-4" style={{ borderColor: `${C.gold}33`, background: "rgba(201,168,76,0.03)" }}>
                            <div className="flex items-center gap-3">
                              <span className="inline-block h-4 w-4 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}80` }} />
                              <p className="text-base font-medium">{label}</p>
                              <span className="ml-auto text-[10px] uppercase tracking-[0.25em]" style={{ color: C.gold }}>{ch.status}</span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed" style={{ color: C.text }}>{ch.description}</p>
                            <p className="mt-2 text-sm italic" style={{ color: C.muted }}><span className="text-[10px] uppercase tracking-[0.2em] mr-2" style={{ color: C.gold }}>Practice</span>{ch.practice}</p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.section>

                  <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                    className="mt-14 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>A message for you</p>
                    <p className="font-serif text-xl italic leading-relaxed">"{reading.soul_message}"</p>
                  </motion.section>

                  <KimAlfanoCard />
                </>
              )}

              <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                For educational &amp; inspirational purposes only.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <PaywallModal slug="aura" open={paywallOpen} email={email} onClose={() => setPaywallOpen(false)} onUnlocked={() => { setUnlocked(true); setPaywallOpen(false); }} />
      </div>
    </motion.div>
  );
}
