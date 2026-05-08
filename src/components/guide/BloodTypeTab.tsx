import { useState, useEffect, useRef } from "react";
import { Droplet, Check, X, ExternalLink, Share2, Heart, Brain, Dumbbell, Pill, Mail, Sparkles, ArrowRight } from "lucide-react";
import { C, fonts, GoldRule } from "./GuideShared";
import { BLOOD_TYPE_PROFILES, RH_NEGATIVE_GUIDE, RH_NEGATIVE_RESOURCES, type BloodTypeProfile } from "./bloodTypeData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useServerFn } from "@tanstack/react-start";
import { sendEmail } from "@/lib/email.functions";
import { bloodTypeEmail as bloodTypeEmailTemplate } from "@/lib/emailTemplates";

/* ── Phases ── */
type Phase = "input" | "loading" | "result";

/* ── Loading messages ── */
const LOADING_MSGS = [
  "Analyzing your blood type profile...",
  "Mapping your optimal foods...",
  "Connecting your blood to your soul...",
  "Preparing your personalized Soul True profile...",
];

/* ── Soul True Logo ── */
function STLogo({ size = 40, pulse = false }: { size?: number; pulse?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${pulse ? "animate-pulse" : ""}`}>
      <span
        style={{
          fontFamily: fonts.display,
          fontSize: size,
          color: C.gold,
          fontWeight: 300,
          letterSpacing: "0.08em",
        }}
      >
        ST
      </span>
    </div>
  );
}

/* ── Food Card ── */
function FoodCard({ item, type }: { item: string; type: "beneficial" | "avoid" }) {
  const bg = type === "beneficial" ? "#0F2A1F" : "#2A1515";
  const border = type === "beneficial" ? "#1D9E7544" : "#E24B4A44";
  const icon = type === "beneficial" ? <Check size={12} /> : <X size={12} />;
  const iconColor = type === "beneficial" ? "#1D9E75" : "#E24B4A";

  return (
    <div
      className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs"
      style={{ backgroundColor: bg, borderColor: border, color: C.text, fontFamily: fonts.body, fontWeight: 300 }}
    >
      <span style={{ color: iconColor }}>{icon}</span>
      {item}
    </div>
  );
}

/* ── Section Card ── */
function ProfileSection({ title, icon, children, gold = false }: { title: string; icon: React.ReactNode; children: React.ReactNode; gold?: boolean }) {
  return (
    <div
      className="rounded-xl border p-6 md:p-8"
      style={{
        backgroundColor: C.card,
        borderColor: gold ? `${C.gold}55` : C.border,
        borderLeftWidth: 3,
        borderLeftColor: gold ? C.gold : C.teal,
      }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span style={{ color: gold ? C.gold : C.teal }}>{icon}</span>
        <h3 className="text-xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ── Trait Badge ── */
function TraitBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-full border px-3 py-1 text-xs"
      style={{ borderColor: `${C.gold}66`, color: C.gold, fontFamily: fonts.body, fontWeight: 300 }}
    >
      {label}
    </span>
  );
}

/* ════════════ MAIN COMPONENT ════════════ */
export function BloodTypeTab() {
  const [phase, setPhase] = useState<Phase>("input");
  const [bloodType, setBloodType] = useState<string | null>(null);
  const [rhFactor, setRhFactor] = useState<"positive" | "negative" | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const resultRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Loading text cycling
  useEffect(() => {
    if (phase !== "loading") return;
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setLoadingIdx((i) => (i + 1) % LOADING_MSGS.length);
        setFade(true);
      }, 400);
    }, 2500);
    return () => clearInterval(iv);
  }, [phase]);

  // Simulate loading then show result
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => {
      setPhase("result");
      window.scrollTo({ top: 0 });
    }, 8000);
    return () => clearTimeout(t);
  }, [phase]);

  const profileKey = bloodType && rhFactor ? `${bloodType}${rhFactor === "positive" ? "+" : "-"}` : null;
  const profile = profileKey ? BLOOD_TYPE_PROFILES[profileKey] : null;
  const isRhNeg = rhFactor === "negative";

  const handleReveal = async () => {
    if (!bloodType || !rhFactor || !fullName.trim() || !email.trim()) return;
    setPhase("loading");

    // Save to DB if logged in
    if (user) {
      try {
        await supabase.from("blood_type_results").insert({
          user_id: user.id,
          blood_type: bloodType,
          rh_factor: rhFactor,
          full_name: fullName.trim(),
          email: email.trim(),
        });
      } catch (e) {
        console.error("Failed to save blood type result:", e);
      }
    }

    // Send email
    try {
      await supabase.functions.invoke("blood-type-email", {
        body: {
          name: fullName.trim(),
          email: email.trim(),
          bloodType,
          rhFactor,
        },
      });
    } catch (e) {
      console.error("Email send failed:", e);
    }
  };

  const handleShare = async () => {
    if (!profile) return;
    const text = `I just discovered my Blood Type Profile on Soul True! I'm ${bloodType}${rhFactor === "positive" ? "+" : "-"} — ${profile.archetype}. Discover yours at soul-true.com/guide`;
    if (navigator.share) {
      try { await navigator.share({ title: "My Soul True Blood Type", text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  /* ── INPUT PHASE ── */
  if (phase === "input") {
    return (
      <div className="mx-auto max-w-2xl py-16">
        {/* Logo */}
        <div className="mb-8 text-center">
          <STLogo size={48} />
          <p className="mt-2 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
            Blood Type Guide
          </p>
        </div>

        <div className="rounded-2xl border p-8 md:p-10" style={{ backgroundColor: C.card, borderColor: C.border }}>
          <h2 className="mb-2 text-center text-3xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
            Discover Your Blood Type Profile
          </h2>
          <p className="mb-8 text-center text-sm" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
            Your blood carries ancient wisdom. Select your blood type to reveal your personalized Soul True profile.
          </p>

          {/* Blood Type Selection */}
          <label className="mb-3 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>
            Blood Type
          </label>
          <div className="mb-6 grid grid-cols-4 gap-3">
            {["O", "A", "B", "AB"].map((t) => (
              <button
                key={t}
                onClick={() => setBloodType(t)}
                className="rounded-xl border-2 py-6 text-center text-2xl font-light transition-all"
                style={{
                  fontFamily: fonts.display,
                  borderColor: bloodType === t ? C.gold : C.border,
                  backgroundColor: bloodType === t ? `${C.gold}15` : C.inner,
                  color: bloodType === t ? C.gold : C.text,
                  boxShadow: bloodType === t ? `0 0 20px ${C.gold}22` : "none",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Rh Factor */}
          <label className="mb-3 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>
            Rh Factor
          </label>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {([["positive", "Positive (+)"], ["negative", "Negative (−)"]] as const).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setRhFactor(v)}
                className="rounded-xl border-2 py-5 text-center text-lg font-light transition-all"
                style={{
                  fontFamily: fonts.display,
                  borderColor: rhFactor === v ? C.gold : C.border,
                  backgroundColor: rhFactor === v ? `${C.gold}15` : C.inner,
                  color: rhFactor === v ? C.gold : C.text,
                  boxShadow: rhFactor === v ? `0 0 20px ${C.gold}22` : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Name */}
          <label className="mb-2 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="mb-4 w-full rounded-lg border px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: C.inner, borderColor: C.border, color: C.text, fontFamily: fonts.body }}
          />

          {/* Email */}
          <label className="mb-2 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>
            Email Address
          </label>
          <p className="mb-2 text-[11px]" style={{ color: C.dim, fontFamily: fonts.body }}>
            We'll send your complete profile to this email
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mb-8 w-full rounded-lg border px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: C.inner, borderColor: C.border, color: C.text, fontFamily: fonts.body }}
          />

          {/* CTA */}
          <button
            onClick={handleReveal}
            disabled={!bloodType || !rhFactor || !fullName.trim() || !email.trim()}
            className="w-full rounded py-4 text-[11px] uppercase tracking-[0.22em] transition-all disabled:opacity-40"
            style={{
              backgroundColor: C.gold,
              color: "#1C1B3A",
              fontFamily: fonts.body,
              fontWeight: 500,
            }}
          >
            Reveal My Blood Type Profile →
          </button>
        </div>

        <p className="mt-6 text-center text-[10px]" style={{ color: C.dim, fontFamily: fonts.body }}>
          This guide is for educational and exploratory purposes only. It is not medical advice. Always consult a healthcare professional for health decisions.
        </p>
      </div>
    );
  }

  /* ── LOADING PHASE ── */
  if (phase === "loading") {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <STLogo size={64} pulse />

        {/* DNA / Blood drop animation */}
        <div className="my-10">
          <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin" style={{ animationDuration: "4s" }}>
            <circle cx="40" cy="40" r="35" fill="none" stroke={C.gold} strokeWidth="1" strokeDasharray="8 4" opacity={0.4} />
            <circle cx="40" cy="40" r="25" fill="none" stroke={C.gold} strokeWidth="0.5" strokeDasharray="4 6" opacity={0.3} />
            {/* Blood drop */}
            <path d="M40 18 C40 18 28 35 28 44 C28 50.6 33.4 56 40 56 C46.6 56 52 50.6 52 44 C52 35 40 18 40 18Z" fill={`${C.gold}22`} stroke={C.gold} strokeWidth="1" />
          </svg>
        </div>

        <p
          className="text-center text-lg font-light transition-opacity duration-400"
          style={{
            fontFamily: fonts.display,
            color: C.text,
            opacity: fade ? 1 : 0,
          }}
        >
          {LOADING_MSGS[loadingIdx]}
        </p>
      </div>
    );
  }

  /* ── RESULT PHASE ── */
  if (!profile) return null;

  return (
    <div ref={resultRef} className="mx-auto max-w-3xl py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <STLogo size={48} />
        <p className="mt-4 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
          Blood Type Profile
        </p>

        {/* Large blood type symbol */}
        <div
          className="mx-auto my-6 flex h-28 w-28 items-center justify-center rounded-full border-2"
          style={{ borderColor: C.gold, color: C.gold }}
        >
          <span className="text-4xl font-light" style={{ fontFamily: fonts.display }}>
            {bloodType}{rhFactor === "positive" ? "+" : "−"}
          </span>
        </div>

        <h1 className="text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display, color: C.gold }}>
          {fullName}'s Blood Type Profile
        </h1>
        <p className="mt-2 text-xl font-light italic" style={{ fontFamily: fonts.display, color: C.muted }}>
          {profile.archetype}
        </p>
      </div>

      <div className="space-y-6">
        {/* Overview */}
        <ProfileSection title="Your Blood Type Origin" icon={<Droplet size={20} />} gold>
          <p className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
            {profile.overview}
          </p>
          {profile.overviewExtra && (
            <p className="mt-4 text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.text, fontWeight: 300 }}>
              {profile.overviewExtra}
            </p>
          )}
        </ProfileSection>

        {/* Beneficial Foods */}
        <ProfileSection title="Highly Beneficial Foods" icon={<Check size={20} />}>
          {profile.beneficialFoods.map((cat) => (
            <div key={cat.category} className="mb-4">
              <h4 className="mb-2 text-sm font-medium" style={{ fontFamily: fonts.body, color: C.teal }}>
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <FoodCard key={item} item={item} type="beneficial" />
                ))}
              </div>
            </div>
          ))}
        </ProfileSection>

        {/* Avoid Foods */}
        <ProfileSection title="Foods to Avoid" icon={<X size={20} />}>
          {profile.avoidFoods.map((cat) => (
            <div key={cat.category} className="mb-4">
              <h4 className="mb-2 text-sm font-medium" style={{ fontFamily: fonts.body, color: "#E24B4A" }}>
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <FoodCard key={item} item={item} type="avoid" />
                ))}
              </div>
            </div>
          ))}
        </ProfileSection>

        {/* Exercise */}
        <ProfileSection title="Exercise" icon={<Dumbbell size={20} />}>
          <p className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
            {profile.exercise}
          </p>
        </ProfileSection>

        {/* Personality */}
        <ProfileSection title="Personality Traits" icon={<Brain size={20} />} gold>
          <div className="mb-4 flex flex-wrap gap-2">
            {profile.personalityTraits.map((t) => (
              <TraitBadge key={t} label={t} />
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
            {profile.personalityDescription}
          </p>
        </ProfileSection>

        {/* Health */}
        <ProfileSection title="Health Tendencies" icon={<Heart size={20} />}>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: "#1D9E75", fontFamily: fonts.body }}>Strengths</h4>
              <ul className="space-y-1">
                {profile.healthStrengths.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm" style={{ color: C.muted, fontFamily: fonts.body, fontWeight: 300 }}>
                    <span style={{ color: "#1D9E75" }}>●</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: "#EF9F27", fontFamily: fonts.body }}>Vulnerabilities</h4>
              <ul className="space-y-1">
                {profile.healthVulnerabilities.map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm" style={{ color: C.muted, fontFamily: fonts.body, fontWeight: 300 }}>
                    <span style={{ color: "#EF9F27" }}>●</span> {v}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: "#E24B4A", fontFamily: fonts.body }}>Watch For</h4>
              <ul className="space-y-1">
                {profile.healthWatch.map((w) => (
                  <li key={w} className="flex items-center gap-2 text-sm" style={{ color: C.muted, fontFamily: fonts.body, fontWeight: 300 }}>
                    <span style={{ color: "#E24B4A" }}>●</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ProfileSection>

        {/* Supplements */}
        <ProfileSection title="Recommended Supplements" icon={<Pill size={20} />}>
          <div className="flex flex-wrap gap-2">
            {profile.supplements.map((s) => (
              <span
                key={s}
                className="rounded-lg border px-3 py-2 text-xs"
                style={{ backgroundColor: C.inner, borderColor: C.border, color: C.text, fontFamily: fonts.body, fontWeight: 300 }}
              >
                {s}
              </span>
            ))}
          </div>
          {profile.teas && profile.teas.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: C.muted, fontFamily: fonts.body }}>Beneficial Teas</h4>
              <div className="flex flex-wrap gap-2">
                {profile.teas.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: `${C.teal}11`, borderColor: `${C.teal}33`, color: C.teal, fontFamily: fonts.body, fontWeight: 300 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </ProfileSection>

        {/* ── RH NEGATIVE DEEP GUIDE ── */}
        {isRhNeg && (
          <>
            <GoldRule />

            {/* Glowing gold card */}
            <div
              className="rounded-2xl border-2 p-8 md:p-10"
              style={{
                borderColor: C.gold,
                backgroundColor: `${C.gold}08`,
                boxShadow: `0 0 40px ${C.gold}18, inset 0 0 40px ${C.gold}08`,
              }}
            >
              <div className="mb-6 text-center">
                <Sparkles size={32} style={{ color: C.gold, margin: "0 auto" }} />
                <h2 className="mt-4 text-3xl font-light md:text-4xl" style={{ fontFamily: fonts.display, color: C.gold }}>
                  {RH_NEGATIVE_GUIDE.title}
                </h2>
                <p className="mt-3 text-sm italic" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
                  {RH_NEGATIVE_GUIDE.subtitle}
                </p>
              </div>

              <div className="space-y-8">
                {RH_NEGATIVE_GUIDE.chapters.map((ch) => (
                  <div key={ch.title}>
                    <h3 className="mb-3 text-xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>
                      {ch.title}
                    </h3>
                    <div className="text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
                      {ch.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Resources */}
            <div className="mt-8">
              <h3 className="mb-6 text-center text-2xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
                Go Deeper — The Rh Negative Rabbit Hole
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {RH_NEGATIVE_RESOURCES.map((res) => (
                  <a
                    key={res.title}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border p-5 transition-all hover:border-[#C9A84C88]"
                    style={{ backgroundColor: C.card, borderColor: C.border }}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="text-sm font-light leading-tight" style={{ fontFamily: fonts.display, color: C.text }}>
                        {res.title}
                      </h4>
                      <ExternalLink size={14} style={{ color: C.gold, flexShrink: 0, marginLeft: 8 }} />
                    </div>
                    <p className="mb-3 text-xs leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
                      {res.description}
                    </p>
                    <span className="text-xs" style={{ color: C.teal, fontFamily: fonts.body }}>
                      Read More →
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-6 text-center text-[10px]" style={{ color: C.dim, fontFamily: fonts.body }}>
                These resources represent a range of scientific, historical, and metaphysical perspectives. Soul True encourages independent research and critical thinking. We present these resources for educational and exploratory purposes only.
              </p>
            </div>
          </>
        )}

        <GoldRule />

        {/* Bottom CTAs */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded border py-3 text-[11px] uppercase tracking-[0.22em] transition-all"
            style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
          >
            <Share2 size={14} /> Share My Blood Type
          </button>

          <button
            onClick={() => {
              const guideEl = document.querySelector('[data-tab="challenge"]');
              if (guideEl) (guideEl as HTMLElement).click();
            }}
            className="w-full rounded py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ backgroundColor: C.gold, color: "#1C1B3A", fontFamily: fonts.body, fontWeight: 500 }}
          >
            Start My 10-Day Challenge →
          </button>

          <a
            href="mailto:highervibrations36@gmail.com"
            className="block w-full rounded py-3 text-center text-[11px] uppercase tracking-[0.22em]"
            style={{ backgroundColor: C.gold, color: "#1C1B3A", fontFamily: fonts.body, fontWeight: 500 }}
          >
            Book a Session with Kim Alfano →
          </a>

          <button
            onClick={() => {
              const guideEl = document.querySelector('[data-tab="meditations"]');
              if (guideEl) (guideEl as HTMLElement).click();
            }}
            className="w-full rounded border py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ borderColor: C.teal, color: C.teal, fontFamily: fonts.body, backgroundColor: `${C.teal}11` }}
          >
            Generate My Personalized Meditation →
          </button>
        </div>

        <p className="mt-8 text-center text-[10px]" style={{ color: C.dim, fontFamily: fonts.body }}>
          This guide is for educational and exploratory purposes only. It is not medical advice. Always consult a healthcare professional for health decisions.
        </p>
      </div>
    </div>
  );
}
