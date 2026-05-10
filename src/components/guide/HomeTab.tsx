import { useEffect, useRef } from "react";
import { Heart, Sprout, Sun, Flame, Brain, Rocket, RefreshCw, Shield } from "lucide-react";
import { C, fonts, GoldRule, StepCard, Emblem, Eyebrow, HeroTitle, GoldText } from "./GuideShared";
import { trackPageEnter, trackCTA } from "@/lib/analytics";

function AnimatedBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => { el.style.width = `${pct}%`; }, delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm" style={{ fontFamily: fonts.body, color: C.muted }}>{label}</span>
        <span className="text-sm font-medium" style={{ fontFamily: fonts.body, color: C.text }}>{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: C.inner }}>
        <div
          ref={ref}
          className="h-full rounded-full transition-all"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal})`,
            transitionDuration: "900ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}

export function HomeTab() {
  useEffect(() => { trackPageEnter("home"); }, []);

  return (
    <div style={{ color: C.text }}>
      {/* Hero */}
      <div
        className="relative isolate -mx-4 overflow-hidden px-4 py-24 text-center md:py-32"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Emblem icon={<Sun size={32} />} />
        <Eyebrow>SOUL TRUE — OFFICIAL AI LIFE GUIDE</Eyebrow>
        <HeroTitle>
          You Were Built for <GoldText>More.</GoldText><br />
          Now You Have the Tools.
        </HeroTitle>
        <p className="mx-auto mt-5 max-w-xl text-base" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
          A free, AI-powered guide to transform every dimension of your life — physical, mental, spiritual, and professional.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["Free to use", "No tech skills needed", "Start today"].map((b) => (
            <span key={b} className="rounded-full px-4 py-1.5 text-xs" style={{ backgroundColor: `${C.teal}18`, color: C.teal, fontFamily: fonts.body }}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Icon Banner */}
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-4 rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
        {[
          { icon: <Heart size={24} />, label: "Physical" },
          { icon: <Sprout size={24} />, label: "Mental" },
          { icon: <Sun size={24} />, label: "Spiritual" },
          { icon: <Flame size={24} />, label: "Work & Wealth" },
          { icon: <Brain size={24} />, label: "AI Fluency" },
        ].map((i) => (
          <div key={i.label} className="flex flex-col items-center gap-2">
            <span style={{ color: C.gold }}>{i.icon}</span>
            <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>{i.label}</span>
          </div>
        ))}
      </div>

      <GoldRule />

      {/* What AI Actually Is */}
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-8 text-center text-2xl" style={{ fontFamily: fonts.display, color: C.text }}>What AI Actually Is (And Isn't)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard icon={<Brain size={20} />} title="AI is a thinking partner, not a decision-maker" desc="You bring the vision, the values, the desire. AI helps you organize, challenge, and expand your thinking. Every decision stays yours." index={1} />
          <StepCard icon={<Shield size={20} />} title="Your privacy is in your hands" desc="Share what feels right. The more honest you are with AI, the more useful it becomes — but only share what you're comfortable with." index={2} />
          <StepCard icon={<RefreshCw size={20} />} title="Consistency is the multiplier" desc="Daily intentional use — even 10 minutes — compounds into massive life shifts over 90 days." index={3} />
          <StepCard icon={<Rocket size={20} />} title="AI literacy is now a life skill — not optional" desc="The same way email became non-negotiable in the 1990s, AI fluency is the defining skill of this decade." index={4} />
        </div>
      </div>

      <GoldRule />

      {/* Dream Life Blueprint */}
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-8 text-center text-2xl" style={{ fontFamily: fonts.display, color: C.text }}>Your Dream Life Blueprint</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard icon={<Sun size={20} />} title="The vision dump" desc="Tell Claude your ideal life in 5 years, zero filters, organized into all four pillars." index={1} />
          <StepCard icon={<Shield size={20} />} title="The honest gap analysis" desc="Compare vision to current reality. Ask for 3 biggest gaps. Don't be gentle." index={2} />
          <StepCard icon={<Rocket size={20} />} title="The 90-day bridge" desc="Specific action plan, weekly milestones, grounded in real life." index={3} />
          <StepCard icon={<RefreshCw size={20} />} title="The weekly status report" desc="Every Sunday: where do I stand and what needs to adjust." index={4} />
        </div>
      </div>

      <GoldRule />

      {/* Life Tracker */}
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-8 text-center text-2xl" style={{ fontFamily: fonts.display, color: C.text }}>Life Tracker Sample Dashboard</h3>
        <div className="rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
          <AnimatedBar label="Physical" pct={72} delay={100} />
          <AnimatedBar label="Mental & Emotional" pct={58} delay={200} />
          <AnimatedBar label="Spiritual" pct={45} delay={300} />
          <AnimatedBar label="Work & Wealth" pct={41} delay={400} />
          <AnimatedBar label="Overall Alignment" pct={55} delay={500} />
        </div>
        <p className="mt-3 text-center text-xs" style={{ fontFamily: fonts.body, color: C.dim }}>
          Your real scores come from honest weekly check-ins with Claude. The numbers don't lie.
        </p>
      </div>

      <GoldRule />

      {/* Best Practices */}
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-8 text-center text-2xl" style={{ fontFamily: fonts.display, color: C.text }}>Best Practices for Using AI Daily</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard icon={<Sun size={20} />} title="Morning intention (5 min)" desc="Start each day telling Claude your top intention and biggest challenge. Ask for one mindset shift and one action." index={1} />
          <StepCard icon={<Sun size={20} />} title="Evening reflection (5 min)" desc="Here's what happened today, what I felt, what I didn't do. Help me show up better tomorrow." index={2} />
          <StepCard icon={<RefreshCw size={20} />} title="Weekly status report (15 min)" desc="Every Sunday, review all four pillars. Ask for brutally honest assessment and refined plan." index={3} />
          <StepCard icon={<Rocket size={20} />} title="90-day blueprint review" desc="Every 90 days, rebuild your blueprint from scratch. Who you are becoming is different from who you were." index={4} />
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-16 max-w-lg rounded-xl border p-8 text-center" style={{ backgroundColor: C.card, borderColor: C.border, boxShadow: `0 20px 60px -20px ${C.teal}22` }}>
        <h3 className="text-2xl" style={{ fontFamily: fonts.display }}>Ready to Go Deeper?</h3>
        <a
          href="mailto:highervibrations36@gmail.com"
          onClick={() => trackCTA("kim_alfano_home")}
          className="mt-6 inline-block rounded-lg px-8 py-3 text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`, color: C.bg, fontFamily: fonts.body }}
        >
          Connect with Kim Alfano →
        </a>
      </div>
    </div>
  );
}
