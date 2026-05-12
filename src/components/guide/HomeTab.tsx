import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Sprout, Sun, Flame, Brain, Rocket, RefreshCw, Shield, Sparkles, Compass, Zap } from "lucide-react";
import { C, fonts, GoldRule, StepCard } from "./GuideShared";
import { trackPageEnter, trackCTA } from "@/lib/analytics";
import { EmberField } from "@/components/aesthetic/EmberField";

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
        className="relative isolate -mx-4 overflow-hidden px-6 py-24 text-center md:py-36"
        style={{
          background: `radial-gradient(ellipse at center, #1a1530 0%, #0f0d1f 45%, ${C.bg} 100%)`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 720,
            height: 720,
            background:
              "radial-gradient(circle, rgba(180,140,255,0.22) 0%, rgba(201,168,76,0.12) 35%, transparent 70%)",
            filter: "blur(20px)",
            animation: "auraPulse 6s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes auraPulse {0%,100%{opacity:.7;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}`}</style>

        <h1
          className="mx-auto max-w-3xl text-4xl font-light leading-[1.1] md:text-6xl"
          style={{ fontFamily: fonts.display, color: C.text }}
        >
          Something in Your Energy Has Been{" "}
          <em className="italic" style={{ color: C.gold }}>Waiting to Be Seen.</em>
        </h1>
        <p
          className="mx-auto mt-7 max-w-xl text-base md:text-lg"
          style={{ fontFamily: fonts.body, color: "rgba(232,237,233,0.78)", fontWeight: 300 }}
        >
          In 60 seconds, you'll know exactly what your soul is carrying right now.
        </p>

        <div className="mt-9">
          <Link
            to="/aura-reader"
            onClick={() => trackCTA("hero_reveal_reading")}
            className="inline-block rounded px-9 py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition-transform hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, #E8C87A)`,
              color: C.bg,
              fontFamily: fonts.body,
              boxShadow: `0 20px 50px -15px rgba(201,168,76,0.45)`,
            }}
          >
            Reveal My Reading →
          </Link>
          <p className="mt-4 text-xs" style={{ fontFamily: fonts.body, color: "rgba(232,237,233,0.5)" }}>
            Free • No account needed • Instant results
          </p>
        </div>

        <p
          className="mx-auto mt-10 max-w-md text-xs italic"
          style={{ fontFamily: fonts.body, color: "rgba(232,237,233,0.45)" }}
        >
          Thousands of people have already seen what their energy reveals. Yours is waiting.
        </p>
      </div>

      {/* What Gets Revealed */}
      <div className="mx-auto mt-20 max-w-5xl">
        <h2
          className="mb-12 text-center text-3xl font-light md:text-4xl"
          style={{ fontFamily: fonts.display, color: C.text }}
        >
          What Gets Revealed in <em className="italic" style={{ color: C.gold }}>Your Reading</em>
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: <Sparkles size={22} />, title: "Your Aura", desc: "See the colors and frequencies your energy field is broadcasting right now — and what they mean for your relationships, health, and path forward." },
            { icon: <Compass size={22} />, title: "Your Soul Profile", desc: "Discover the deeper patterns shaping your life — your gifts, your blocks, and what your soul is here to do." },
            { icon: <Zap size={22} />, title: "Your Energy Map", desc: "Get a clear picture of where your energy is flowing, where it's stuck, and what wants to shift." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border p-7" style={{ backgroundColor: C.card, borderColor: C.border }}>
              <span style={{ color: C.gold }}>{f.icon}</span>
              <h3 className="mt-4 text-xl font-medium" style={{ fontFamily: fonts.display, color: C.text }}>{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5 text-base italic" style={{ fontFamily: fonts.display, color: C.text }}>
            Ready to see what's there?
          </p>
          <Link
            to="/aura-reader"
            onClick={() => trackCTA("grid_start_reading")}
            className="inline-block rounded px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] transition-transform hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${C.gold}, #E8C87A)`, color: C.bg, fontFamily: fonts.body }}
          >
            Start My Free Reading →
          </Link>
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
