import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ShareProfileButton } from "@/components/ShareProfileButton";
import { persistSoulProfile, type SoulProfile as ShareableProfile } from "@/lib/profileSharing";
import { calculateAll } from "@/lib/numerology";
import { useScrollTopOnChange } from "@/hooks/useScrollTop";

export const Route = createFileRoute("/soul-profile")({
  head: () => ({
    meta: [
      { title: "Your Soul Profile — Soul True" },
      { name: "description", content: "The complete reading. Numerology, astrology, archetype, and life-state — woven into one Soul Profile." },
      { property: "og:title", content: "Your Soul Profile — Soul True" },
      { property: "og:description", content: "Numerology, astrology, archetype, and life-state — one Soul Profile." },
    ],
  }),
  component: SoulProfilePage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

const LIFE_STATE = [
  { q: "Which word best describes your current energy?", k: "energy", options: ["Expansive", "Contracted", "Searching", "Rebuilding", "Awakening"] },
  { q: "What area of life is calling for the most attention?", k: "focus", options: ["Purpose", "Relationships", "Abundance", "Health", "Spiritual Growth"] },
  { q: "How connected do you feel to your true self right now?", k: "connection", options: ["Deeply connected", "Somewhat connected", "Disconnected", "Not sure"] },
  { q: "What is the dominant emotion you carry most days?", k: "emotion", options: ["Peace", "Anxiety", "Excitement", "Grief", "Numbness", "Anticipation"] },
  { q: "What do you most want to release?", k: "release", options: ["Fear", "Control", "The past", "A relationship", "A version of myself"] },
  { q: "What are you most ready to step into?", k: "step_into", options: ["My purpose", "My power", "My authentic self", "A new chapter", "I don't know yet"] },
];

type Profile = {
  first_name: string;
  life_path_number: string; expression_number: string; soul_urge_number: string; personal_year_number: string;
  sun_sign: string; moon_sign: string; rising_sign: string;
  soul_signature: string; your_numbers_speak: string; energetic_blueprint: string; primary_aura_color: string;
  patterns_you_carry: string; primary_blocks: string; shift_available: string; path_to_highest_self: string;
  meditation_prescription: { name: string; why: string }[];
  awakening_stage: string; awakening_stage_description: string; soul_message: string; closing: string;
};

function SoulProfilePage() {
  const [stage, setStage] = useState<"step1" | "step2" | "step3" | "loading" | "result" | "error">("step1");
  useScrollTopOnChange([stage]);
  const [identity, setIdentity] = useState({
    fullName: "", birthDate: "", birthTime: "", unknownTime: false,
    birthCity: "", birthState: "", birthCountry: "",
    currentCity: "", currentState: "", currentCountry: "",
  });
  const birthPlace = [identity.birthCity, identity.birthState, identity.birthCountry].map(s => s.trim()).filter(Boolean).join(", ");
  const currentLocation = [identity.currentCity, identity.currentState, identity.currentCountry].map(s => s.trim()).filter(Boolean).join(", ");
  const [lifeState, setLifeState] = useState<Record<string, string>>({});
  const [oneWord, setOneWord] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const submitFinal = async () => {
    if (!email.trim()) return;
    setStage("loading");
    try {
      const currentYear = new Date().getFullYear();
      const numerology = calculateAll(identity.fullName, identity.birthDate, currentYear);
      const { data, error } = await supabase.functions.invoke("soul-profile-v2", {
        body: {
          identity: {
            full_name_at_birth: identity.fullName,
            date_of_birth: identity.birthDate,
            time_of_birth: identity.unknownTime ? "unknown" : identity.birthTime,
            place_of_birth: birthPlace,
            current_city: currentLocation,
          },
          lifeState,
          oneWord,
          numerology,
          currentYear,
        },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      const p = data.profile as Profile;
      setProfile(p);
      setStage("result");

      // Background: subscribe + log + persist shareable
      void supabase.from("subscribers").insert({
        email: email.trim().toLowerCase(),
        first_name: p.first_name || identity.fullName.split(" ")[0],
        source: "soul-profile",
        opted_in_consciousness_map: optIn,
      });
      if (optIn) {
        void supabase.from("consciousness_data").insert({
          reader_type: "soul_profile",
          aura_color: p.primary_aura_color,
          dominant_energy: lifeState["energy"] ?? null,
          soul_archetype: p.soul_signature?.split(".")[0]?.slice(0, 60) ?? null,
          life_path_number: Number(p.life_path_number) || null,
          sun_sign: p.sun_sign,
          awakening_stage: p.awakening_stage,
          dominant_emotion: lifeState["emotion"] ?? null,
          primary_focus: lifeState["focus"] ?? null,
        });
      }
      // Shareable card
      try {
        const shareable: ShareableProfile = {
          soul_name: p.first_name || "Your Soul",
          soul_summary: p.soul_signature,
          energetic_signature: p.energetic_blueprint,
          soul_gifts: [p.your_numbers_speak.split(".")[0] + "."],
          life_path_themes: [`Life Path ${p.life_path_number}`, `Sun in ${p.sun_sign}`, `Moon in ${p.moon_sign}`],
          shadow_and_growth: p.primary_blocks,
          relationships_and_connection: p.patterns_you_carry,
          soul_mission: p.shift_available,
          activation_message: p.soul_message,
          next_step: p.path_to_highest_self,
        };
        const { shareId: sid } = await persistSoulProfile(shareable, { aura_color: p.primary_aura_color });
        setShareId(sid);
      } catch (e) { console.warn("share persist failed", e); }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStage("error");
    }
  };

  const step1Ready = identity.fullName.trim() && identity.birthDate && identity.birthCity.trim() && identity.birthCountry.trim();
  const step2Ready = LIFE_STATE.every((q) => lifeState[q.k]) && oneWord.trim();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Soul True</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Soul Profile</span>
        </div>

        <AnimatePresence mode="wait">
          {stage === "step1" && (
            <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>Step 1 of 3 · Identity</p>
              <h1 className="font-serif text-4xl font-light italic md:text-5xl">Who you are at the start.</h1>
              <div className="mt-10 space-y-5">
                <Field label="Full name at birth" value={identity.fullName} onChange={(v) => setIdentity({ ...identity, fullName: v })} placeholder="First Middle Last" />
                <Field label="Date of birth" type="date" value={identity.birthDate} onChange={(v) => setIdentity({ ...identity, birthDate: v })} />
                <div>
                  <Field label="Time of birth (approximate is fine)" type="time" value={identity.birthTime} onChange={(v) => setIdentity({ ...identity, birthTime: v })} disabled={identity.unknownTime} />
                  <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm" style={{ color: C.muted }}>
                    <input type="checkbox" checked={identity.unknownTime} onChange={(e) => setIdentity({ ...identity, unknownTime: e.target.checked })} />
                    I don't know my birth time
                  </label>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Place of birth</p>
                  <Field label="City" value={identity.birthCity} onChange={(v) => setIdentity({ ...identity, birthCity: v })} placeholder="City" />
                  <Field label="State / Province (optional)" value={identity.birthState} onChange={(v) => setIdentity({ ...identity, birthState: v })} placeholder="State or Province" />
                  <Field label="Country" value={identity.birthCountry} onChange={(v) => setIdentity({ ...identity, birthCountry: v })} placeholder="Country" />
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Current residence</p>
                  <Field label="City" value={identity.currentCity} onChange={(v) => setIdentity({ ...identity, currentCity: v })} placeholder="City" />
                  <Field label="State / Province (optional)" value={identity.currentState} onChange={(v) => setIdentity({ ...identity, currentState: v })} placeholder="State or Province" />
                  <Field label="Country" value={identity.currentCountry} onChange={(v) => setIdentity({ ...identity, currentCountry: v })} placeholder="Country" />
                </div>
              </div>
              <button onClick={() => setStage("step2")} disabled={!step1Ready}
                className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Continue →
              </button>
            </motion.div>
          )}

          {stage === "step2" && (
            <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>Step 2 of 3 · Life State</p>
              <h1 className="font-serif text-4xl font-light italic md:text-5xl">Where you stand right now.</h1>
              <div className="mt-10 space-y-10">
                {LIFE_STATE.map((q) => (
                  <div key={q.k}>
                    <p className="font-serif text-lg italic">{q.q}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {q.options.map((opt) => {
                        const active = lifeState[q.k] === opt;
                        return (
                          <button key={opt} onClick={() => setLifeState({ ...lifeState, [q.k]: opt })}
                            className="rounded-none border px-4 py-2 text-sm transition-all"
                            style={{
                              borderColor: active ? C.gold : `${C.gold}40`,
                              background: active ? "rgba(201,168,76,0.12)" : "transparent",
                              color: active ? C.text : C.muted,
                            }}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div>
                  <p className="font-serif text-lg italic">In one word — what does your soul most need right now?</p>
                  <input type="text" maxLength={20} value={oneWord} onChange={(e) => setOneWord(e.target.value)}
                    className="mt-4 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                    style={{ borderColor: `${C.gold}66`, color: C.text }} />
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setStage("step1")} className="flex-1 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: `${C.gold}66`, color: C.gold }}>← Back</button>
                <button onClick={() => setStage("step3")} disabled={!step2Ready}
                  className="flex-[2] rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>Continue →</button>
              </div>
            </motion.div>
          )}

          {stage === "step3" && (
            <motion.div key="s3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>Step 3 of 3</p>
              <h1 className="font-serif text-4xl font-light italic md:text-5xl">Where shall we send your Soul Profile?</h1>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                className="mt-8 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                style={{ borderColor: `${C.gold}66`, color: C.text }} />
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm" style={{ color: C.muted }}>
                <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-1" />
                <span>Contribute my anonymized reading to the Soul True Consciousness Map.</span>
              </label>
              <p className="mt-4 text-xs" style={{ color: C.dim }}>Personal information is never shared with anonymized data.</p>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setStage("step2")} className="flex-1 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: `${C.gold}66`, color: C.gold }}>← Back</button>
                <button onClick={submitFinal} disabled={!email.trim()}
                  className="flex-[2] rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                  Reveal My Soul Profile →
                </button>
              </div>
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24">
              <div className="h-40 w-40 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(14px)" }} />
              <p className="mt-12 font-serif text-2xl italic" style={{ color: C.gold }}>Weaving your Soul Profile…</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>The synthesis is sacred</p>
            </motion.div>
          )}

          {stage === "error" && (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <p className="font-serif text-2xl italic" style={{ color: C.gold }}>The synthesis didn't come through.</p>
              <p className="mt-3 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
              <button onClick={() => setStage("step3")} className="mt-8 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>Try again</button>
            </motion.div>
          )}

          {stage === "result" && profile && (
            <ResultView profile={profile} shareId={shareId} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, disabled }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none disabled:opacity-40"
        style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
    </div>
  );
}

function Section({ label, children, delay = 0 }: { label: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="mt-12">
      <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>{label}</p>
      <div className="text-base leading-relaxed">{children}</div>
    </motion.section>
  );
}

function ResultView({ profile, shareId }: { profile: Profile; shareId: string | null }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your Soul Profile</p>
        <h1 className="mt-4 font-serif text-5xl font-light italic uppercase tracking-wide" style={{ color: C.text }}>
          {profile.first_name}
        </h1>
        <div className="mx-auto mt-6 h-px w-24" style={{ background: C.gold }} />
      </div>

      <Section label="1 · Soul Signature" delay={0.2}>{profile.soul_signature}</Section>
      <Section label="2 · Your Numbers Speak" delay={0.35}>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Life Path", profile.life_path_number], ["Expression", profile.expression_number],
            ["Soul Urge", profile.soul_urge_number], ["Personal Year", profile.personal_year_number],
          ].map(([l, v]) => (
            <div key={l} className="rounded-none border p-3 text-center" style={{ borderColor: `${C.gold}40`, background: "rgba(201,168,76,0.04)" }}>
              <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: C.gold }}>{l}</p>
              <p className="mt-1 font-serif text-2xl">{v}</p>
            </div>
          ))}
        </div>
        {profile.your_numbers_speak}
      </Section>
      <Section label="3 · Your Energetic Blueprint" delay={0.5}>
        <p className="mb-3 text-sm" style={{ color: C.gold }}>Primary aura color: <span style={{ color: C.text }}>{profile.primary_aura_color}</span></p>
        {profile.energetic_blueprint}
      </Section>
      <Section label="4 · The Patterns You Carry" delay={0.65}>{profile.patterns_you_carry}</Section>
      <Section label="5 · Your Primary Blocks" delay={0.8}>{profile.primary_blocks}</Section>
      <Section label="6 · The Shift Available to You" delay={0.95}>{profile.shift_available}</Section>
      <Section label="7 · Your Path to Highest Self" delay={1.1}>{profile.path_to_highest_self}</Section>
      <Section label="8 · Meditation Prescription" delay={1.25}>
        <ul className="space-y-4">
          {profile.meditation_prescription?.map((m, i) => (
            <li key={i} className="rounded-none border p-4" style={{ borderColor: `${C.gold}33` }}>
              <p className="font-serif text-lg italic" style={{ color: C.goldAlt }}>{m.name}</p>
              <p className="mt-2 text-sm" style={{ color: C.muted }}>{m.why}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section label={`9 · Your Awakening Stage · ${profile.awakening_stage}`} delay={1.4}>{profile.awakening_stage_description}</Section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}
        className="mt-14 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
        <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>10 · A Message From Your Soul</p>
        <p className="font-serif text-xl italic leading-relaxed">"{profile.soul_message}"</p>
      </motion.section>

      <p className="mt-10 text-center text-sm leading-relaxed" style={{ color: C.muted }}>{profile.closing}</p>

      {shareId && (
        <div className="mt-10 flex justify-center">
          <ShareProfileButton shareId={shareId} />
        </div>
      )}

      <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
        For educational &amp; inspirational purposes only.
      </p>
    </motion.div>
  );
}
