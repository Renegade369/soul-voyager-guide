import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Heart, Sparkles, Star, Mail, RotateCcw, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/soul-profile")({
  head: () => ({
    meta: [
      { title: "Your Soul Profile — Soul True" },
      { name: "description", content: "Your complete Soul Profile — the union of your Aura, Iris, and Fingerprint readings, woven into one sacred portrait." },
      { property: "og:title", content: "Your Soul Profile — Soul True" },
      { property: "og:description", content: "The union of your three readings — one complete portrait of your soul." },
    ],
  }),
  component: SoulProfilePage,
});

const C = {
  bg: "#0a0a0a",
  surface: "#141716",
  border: "rgba(212,175,100,0.18)",
  borderStrong: "rgba(212,175,100,0.4)",
  gold: "#C9A84C",
  goldLight: "#E8C87A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.65)",
  dim: "rgba(245,240,232,0.4)",
};

type Profile = {
  soul_name: string;
  soul_summary: string;
  energetic_signature: string;
  soul_gifts: string[];
  life_path_themes: string[];
  shadow_and_growth: string;
  relationships_and_connection: string;
  soul_mission: string;
  activation_message: string;
  next_step: string;
};

type Step = "loading" | "incomplete" | "processing" | "result" | "error";

function getSession(): { id: string; email: string } | null {
  try {
    const raw = localStorage.getItem("soultrue_energy_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Mandala SVG — three symbols merged
function Mandala({ size = 220, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ animation: animated ? "sp-spin 80s linear infinite" : undefined }}>
        <defs>
          <radialGradient id="sp-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="40%" stopColor={C.goldLight} stopOpacity="0.7" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Outer aura ring */}
        <circle cx="100" cy="100" r="92" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.6" />
        <circle cx="100" cy="100" r="84" fill="none" stroke={C.goldLight} strokeWidth="0.3" opacity="0.4" />
        {/* Iris radial lines */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 36;
          const x1 = 100 + Math.cos(a) * 40;
          const y1 = 100 + Math.sin(a) * 40;
          const x2 = 100 + Math.cos(a) * 76;
          const y2 = 100 + Math.sin(a) * 76;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.goldLight} strokeWidth="0.25" opacity="0.5" />;
        })}
        {/* Fingerprint ridges */}
        {Array.from({ length: 7 }).map((_, i) => {
          const r = 14 + i * 4;
          return (
            <ellipse key={i} cx="100" cy={100 + i * 0.6} rx={r} ry={r * 0.9}
              fill="none" stroke={C.gold} strokeWidth="0.5" opacity={0.85 - i * 0.08}
              transform={`rotate(${i * 8} 100 100)`} />
          );
        })}
        {/* Aura core */}
        <circle cx="100" cy="100" r="34" fill="url(#sp-core)" />
      </svg>
      <div className="absolute -inset-6 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
          filter: "blur(28px)", opacity: 0.4,
          animation: animated ? "sp-pulse 5s ease-in-out infinite" : undefined,
        }} />
      <style>{`@keyframes sp-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } } @keyframes sp-pulse { 0%,100% { opacity: 0.3; transform: scale(0.95); } 50% { opacity: 0.6; transform: scale(1.1); } }`}</style>
    </div>
  );
}

function FadeReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect(); } }),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 900ms ease, transform 900ms ease",
      }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>{children}</p>;
}

function SoulProfilePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("loading");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [savedAndSent, setSavedAndSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState(0); // processing animation phases
  const ranRef = useRef(false);

  // Load session + readings, then generate
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    (async () => {
      const session = getSession();
      if (!session?.id) {
        setStep("incomplete");
        return;
      }
      setSessionId(session.id);
      setEmail(session.email || "");

      const { data, error } = await supabase
        .from("energy_reading_sessions")
        .select("email, aura_result, iris_result, fingerprint_result, mood_answers, soul_profile_result")
        .eq("id", session.id)
        .maybeSingle();

      if (error || !data) {
        setStep("incomplete");
        return;
      }
      if (data.email) setEmail(data.email);

      // If profile already generated, show it directly
      if (data.soul_profile_result) {
        setProfile(data.soul_profile_result as Profile);
        setStep("result");
        return;
      }

      if (!data.aura_result || !data.iris_result || !data.fingerprint_result) {
        setStep("incomplete");
        return;
      }

      // Begin ceremonial processing
      setStep("processing");
      const t1 = setTimeout(() => setPhase(1), 900);
      const t2 = setTimeout(() => setPhase(2), 1800);
      const t3 = setTimeout(() => setPhase(3), 2700);

      // Kick off generation in parallel; ensure min 4.5s ceremony
      const startedAt = Date.now();
      try {
        const { data: gen, error: genErr } = await supabase.functions.invoke("soul-profile-generate", {
          body: {
            aura_result: data.aura_result,
            iris_result: data.iris_result,
            fingerprint_result: data.fingerprint_result,
            mood_answers: data.mood_answers,
          },
        });
        if (genErr) throw new Error(genErr.message || "Generation failed");
        if (gen?.error) throw new Error(gen.error);
        if (!gen?.profile) throw new Error("No profile returned");

        const elapsed = Date.now() - startedAt;
        const wait = Math.max(0, 4500 - elapsed);
        setTimeout(async () => {
          setProfile(gen.profile as Profile);
          setStep("result");
          // Persist immediately
          await supabase
            .from("energy_reading_sessions")
            .update({ soul_profile_result: gen.profile })
            .eq("id", session.id);
        }, wait);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
        setStep("error");
      }
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    })();
  }, []);

  const saveAndEmail = async () => {
    if (!profile || !sessionId) return;
    setBusy(true);
    setErrorMsg("");
    try {
      // Profile is already saved on generation, but re-save defensively
      await supabase
        .from("energy_reading_sessions")
        .update({ soul_profile_result: profile })
        .eq("id", sessionId);

      if (email) {
        const { data, error } = await supabase.functions.invoke("send-soul-profile-email", {
          body: { email, profile },
        });
        if (error) throw new Error(error.message || "Email failed");
        if (data?.error) throw new Error(data.error);
      }
      setSavedAndSent(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Could not send email");
    } finally {
      setBusy(false);
    }
  };

  const startNew = () => {
    try { localStorage.removeItem("soultrue_energy_session"); } catch {}
    navigate({ to: "/aura-reader" });
  };

  // ============================== RENDER ==============================
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: C.bg, color: C.text }}>
      {/* ---------- LOADING ---------- */}
      {step === "loading" && (
        <div className="flex min-h-screen items-center justify-center">
          <Mandala size={140} />
        </div>
      )}

      {/* ---------- INCOMPLETE ---------- */}
      {step === "incomplete" && (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <Mandala size={120} animated={false} />
          <h1 className="mt-10 font-serif text-3xl font-light italic" style={{ color: C.goldLight }}>
            One reading is missing
          </h1>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: C.muted }}>
            It looks like one of your readings is incomplete. Your Soul Profile is woven from all three — let's begin again from the start.
          </p>
          <Link to="/aura-reader"
            className="mt-10 rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}>
            Return to Aura Reader
          </Link>
        </div>
      )}

      {/* ---------- PROCESSING ---------- */}
      {step === "processing" && (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <div className="relative h-44 w-44">
            {/* Phase 0: orb */}
            <div className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: phase >= 3 ? 0 : phase === 0 ? 1 : 0.35 }}>
              <div className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${C.goldLight}, ${C.gold} 50%, transparent 75%)`, filter: "blur(8px)", animation: "sp-pulse 2.4s ease-in-out infinite" }} />
            </div>
            {/* Phase 1: eye */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
              style={{ opacity: phase >= 3 ? 0 : phase === 1 ? 1 : 0.35 }}>
              <svg viewBox="0 0 100 100" className="h-32 w-32">
                <ellipse cx="50" cy="50" rx="42" ry="22" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.9" />
                <circle cx="50" cy="50" r="14" fill="none" stroke={C.goldLight} strokeWidth="1" />
                <circle cx="50" cy="50" r="5" fill={C.gold} />
              </svg>
            </div>
            {/* Phase 2: fingerprint */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
              style={{ opacity: phase >= 3 ? 0 : phase === 2 ? 1 : 0 }}>
              <svg viewBox="0 0 100 100" className="h-32 w-32">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ellipse key={i} cx="50" cy={50 + i * 0.5} rx={10 + i * 5} ry={(10 + i * 5) * 0.9}
                    fill="none" stroke={C.gold} strokeWidth="0.7" opacity={0.9 - i * 0.1} />
                ))}
              </svg>
            </div>
            {/* Phase 3: merged mandala */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
              style={{ opacity: phase >= 3 ? 1 : 0 }}>
              <Mandala size={176} />
            </div>
          </div>
          <p className="mt-12 font-serif text-xl font-light italic leading-relaxed" style={{ color: C.goldLight }}>
            Weaving your three readings into<br />one complete Soul Profile…
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>The synthesis is sacred</p>
        </div>
      )}

      {/* ---------- ERROR ---------- */}
      {step === "error" && (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-3xl font-light italic" style={{ color: C.goldLight }}>
            The synthesis didn't come through
          </h1>
          <p className="mt-4 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
          <button onClick={() => window.location.reload()}
            className="mt-8 rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}>
            Try again
          </button>
        </div>
      )}

      {/* ---------- RESULT ---------- */}
      {step === "result" && profile && (
        <div className="mx-auto max-w-2xl px-5 pb-24 pt-12 sm:px-6">
          {/* Header */}
          <FadeReveal>
            <div className="flex flex-col items-center text-center">
              <Mandala size={200} />
              <p className="mt-8 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your Complete Soul Profile</p>
              <h1 className="mt-5 font-serif text-5xl font-light italic md:text-6xl" style={{ color: C.goldLight, lineHeight: 1.1 }}>
                {profile.soul_name}
              </h1>
              <p className="mt-6 text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </FadeReveal>

          <div className="my-14 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />

          {/* 1. Soul Summary — large card */}
          <FadeReveal>
            <div className="rounded-none border p-7 sm:p-9" style={{ borderColor: C.borderStrong, background: "rgba(201,168,76,0.03)" }}>
              <SectionLabel>Soul Summary</SectionLabel>
              <p className="font-serif text-lg leading-relaxed sm:text-xl" style={{ color: C.text }}>
                {profile.soul_summary}
              </p>
            </div>
          </FadeReveal>

          {/* 2. Energetic Signature — with aura glow */}
          <FadeReveal delay={80}>
            <div className="relative mt-12 px-2 py-6">
              <div className="absolute inset-0 -z-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${C.gold}22, transparent 70%)`, filter: "blur(40px)", animation: "sp-pulse 6s ease-in-out infinite" }} />
              <div className="relative">
                <SectionLabel>Energetic Signature</SectionLabel>
                <p className="text-base leading-relaxed sm:text-lg" style={{ color: C.text }}>
                  {profile.energetic_signature}
                </p>
              </div>
            </div>
          </FadeReveal>

          {/* 3. Soul Gifts */}
          <FadeReveal delay={80}>
            <div className="mt-12">
              <SectionLabel>Soul Gifts</SectionLabel>
              <ul className="space-y-4">
                {profile.soul_gifts.map((g, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Star size={14} strokeWidth={1.2} fill={C.gold} style={{ color: C.gold }} className="mt-1.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed sm:text-lg" style={{ color: C.text }}>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeReveal>

          {/* 4. Life Path Themes — chips */}
          <FadeReveal delay={80}>
            <div className="mt-12">
              <SectionLabel>Life Path Themes</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {profile.life_path_themes.map((t, i) => (
                  <span key={i}
                    className="rounded-none border px-4 py-2 text-sm"
                    style={{ borderColor: C.gold, color: C.goldLight, background: "rgba(201,168,76,0.05)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeReveal>

          {/* 5. Shadow & Growth */}
          <FadeReveal delay={80}>
            <div className="mt-12 rounded-none border p-7" style={{ borderColor: C.border, background: "rgba(201,168,76,0.06)" }}>
              <SectionLabel>Shadow &amp; Growth</SectionLabel>
              <p className="text-base leading-relaxed" style={{ color: C.text }}>
                {profile.shadow_and_growth}
              </p>
            </div>
          </FadeReveal>

          {/* 6. Relationships & Connection */}
          <FadeReveal delay={80}>
            <div className="mt-12 rounded-none border p-7" style={{ borderColor: C.border, background: "rgba(201,168,76,0.03)" }}>
              <div className="mb-3 flex items-center gap-3">
                <Heart size={16} fill={C.gold} style={{ color: C.gold }} />
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Relationships &amp; Connection</p>
              </div>
              <p className="text-base leading-relaxed" style={{ color: C.text }}>
                {profile.relationships_and_connection}
              </p>
            </div>
          </FadeReveal>

          {/* 7. Soul Mission */}
          <FadeReveal delay={80}>
            <div className="mt-14 text-center">
              <SectionLabel>Soul Mission</SectionLabel>
              <p className="mx-auto max-w-xl font-serif text-2xl font-light leading-relaxed sm:text-3xl" style={{ color: C.text }}>
                {profile.soul_mission}
              </p>
            </div>
          </FadeReveal>

          {/* 8. Activation Message — emotional peak */}
          <FadeReveal delay={120}>
            <div className="relative mt-16">
              <div className="absolute -inset-3 -z-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse, ${C.gold}33, transparent 70%)`, filter: "blur(30px)", animation: "sp-pulse 5s ease-in-out infinite" }} />
              <div className="relative rounded-none border-2 px-7 py-12 text-center sm:px-12 sm:py-16"
                style={{ borderColor: C.borderStrong, background: "rgba(0,0,0,0.5)" }}>
                <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Activation</p>
                <p className="mx-auto mt-7 max-w-xl font-serif text-2xl font-light italic leading-relaxed sm:text-3xl"
                  style={{ color: C.goldLight }}>
                  "{profile.activation_message}"
                </p>
              </div>
            </div>
          </FadeReveal>

          {/* 9. Next Step */}
          <FadeReveal delay={80}>
            <div className="mt-14 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Your Next Step</p>
              <p className="mx-auto mt-4 max-w-md text-base italic leading-relaxed" style={{ color: C.muted }}>
                {profile.next_step}
              </p>
            </div>
          </FadeReveal>

          <div className="my-14 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />

          {/* Footer actions */}
          <FadeReveal>
            <div className="flex flex-col gap-3">
              <button onClick={saveAndEmail} disabled={busy || savedAndSent || !email}
                className="flex items-center justify-center gap-2 rounded-none px-6 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-60"
                style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}>
                {savedAndSent ? <><Check size={14} /> Saved &amp; Sent to {email}</> : busy ? "Sending…" : <><Mail size={14} /> Save &amp; Email My Soul Profile</>}
              </button>
              {errorMsg && <p className="text-center text-xs" style={{ color: "#FF8FB8" }}>{errorMsg}</p>}
              {!email && <p className="text-center text-xs" style={{ color: C.muted }}>No email on file — saved to your session.</p>}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button onClick={startNew}
                  className="flex items-center justify-center gap-2 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: C.gold, color: C.gold }}>
                  <RotateCcw size={13} /> Start a New Reading
                </button>
                <Link to="/guide"
                  className="flex items-center justify-center gap-2 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: C.border, color: C.muted }}>
                  <Home size={13} /> Return to Soul True
                </Link>
              </div>
            </div>

            <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
              For educational &amp; inspirational purposes only. Not medical advice.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <Sparkles size={12} style={{ color: C.gold }} />
              <p className="font-serif text-sm italic" style={{ color: C.gold }}>With love, Soul True</p>
              <Sparkles size={12} style={{ color: C.gold }} />
            </div>
          </FadeReveal>
        </div>
      )}
    </div>
  );
}
