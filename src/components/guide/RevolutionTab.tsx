import { useEffect, useRef } from "react";
import { Zap, DoorOpen, TrendingUp, Clock, Rocket } from "lucide-react";
import { C, fonts, GoldRule, StepCard, Emblem, Eyebrow, HeroTitle, GoldText } from "./GuideShared";
import { trackPageEnter } from "@/lib/analytics";

function RiskBar({ label, pct, level, delay }: { label: string; pct: number; level: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => { el.style.width = `${pct}%`; }, delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  const color = pct >= 80 ? C.red : pct >= 60 ? C.amber : C.teal;
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between text-xs" style={{ fontFamily: fonts.body }}>
        <span style={{ color: C.muted }}>{label}</span>
        <div className="flex items-center gap-2">
          <span style={{ color: C.text }}>{pct}%</span>
          <span className="rounded px-2 py-0.5 text-[10px]" style={{ backgroundColor: `${color}22`, color }}>{level}</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: C.inner }}>
        <div
          ref={ref}
          className="h-full rounded-full"
          style={{ width: "0%", backgroundColor: color, transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </div>
    </div>
  );
}

export function RevolutionTab() {
  useEffect(() => { trackPageEnter("revolution"); }, []);

  return (
    <div style={{ color: C.text }}>
      <div className="py-16 text-center">
        <Emblem icon={<Zap size={32} />} />
        <Eyebrow>Wake-Up Call</Eyebrow>
        <HeroTitle>The AI Revolution Is <GoldText>Here.</GoldText></HeroTitle>
      </div>

      {/* Revolution card */}
      <div className="mx-auto max-w-3xl rounded-xl border p-8" style={{ backgroundColor: C.card, borderColor: C.border, boxShadow: `inset 40px -20px 80px -60px ${C.red}11` }}>
        <p className="mb-4 text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
          AI and robotics are not a future threat — they are a present reality moving faster than any government, school system, or corporation is prepared to handle. This is not said to create fear. The truth received early enough becomes an advantage. Soul True exists to make sure you rise with this wave — not get left behind.
        </p>
        <p className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
          The jobs most at risk are not the top or bottom — they are the middle. Repetitive, predictable, process-driven work. Manufacturing floors automated. Warehouses filling with robots. Mid-level management replaced by AI dashboards. Customer service handled by bots that never sleep. This is happening now.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-4">
        {[
          { val: "85M", label: "jobs projected displaced by AI by 2030" },
          { val: "97M", label: "new roles emerging for those who adapt" },
          { val: "40%", label: "of all work tasks already automatable today" },
        ].map((s) => (
          <div key={s.val} className="rounded-xl border p-5 text-center" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <div className="text-3xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>{s.val}</div>
            <p className="mt-2 text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Risk Chart */}
      <div className="mx-auto mt-8 max-w-3xl rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
        <p className="mb-4 text-[10px] uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>Job Displacement Risk by Sector</p>
        <RiskBar label="Manufacturing & Assembly" pct={92} level="Very High" delay={200} />
        <RiskBar label="Warehouse & Logistics" pct={88} level="Very High" delay={300} />
        <RiskBar label="Data Entry & Admin" pct={85} level="Very High" delay={400} />
        <RiskBar label="Mid-Level Management" pct={68} level="High" delay={500} />
        <RiskBar label="Customer Service" pct={65} level="High" delay={600} />
        <RiskBar label="Creative & Strategic" pct={28} level="Lower" delay={700} />
        <RiskBar label="Purpose-Driven & Human Work" pct={15} level="Lowest" delay={800} />
      </div>

      {/* Green callout */}
      <div className="mx-auto mt-8 max-w-3xl rounded-xl border-l-2 p-6" style={{ borderLeftColor: C.teal, backgroundColor: `${C.teal}08` }}>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: fonts.body, color: C.teal }}>
          "The people who thrive in the AI age are not the most educated. They are the most adaptable — those who work with AI, multiply their gifts, and build lives rooted in purpose that no machine can replicate. That is what Soul True is here to help you become."
        </p>
      </div>

      <GoldRule />

      {/* Good News */}
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-8 text-center text-2xl" style={{ fontFamily: fonts.display }}>The Good News</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard icon={<DoorOpen size={20} />} title="The entry point is a conversation" desc="Talk to AI like a brilliant friend who has read everything, judged nothing, and has unlimited time for you." index={1} />
          <StepCard icon={<TrendingUp size={20} />} title="Your human gifts become more valuable" desc="Empathy, creativity, lived wisdom, purpose rise in value as AI replaces the mechanical." index={2} />
          <StepCard icon={<Clock size={20} />} title="The window is open — but not forever" desc="AI fluency in 2025 is what internet fluency was in 1997. Every day you wait is a day someone else is pulling ahead." index={3} />
          <StepCard icon={<Rocket size={20} />} title="AI literacy is a life skill, not a tech skill" desc="You don't need to understand how AI works any more than you need to understand electricity to flip a light switch." index={4} />
        </div>
      </div>
    </div>
  );
}
