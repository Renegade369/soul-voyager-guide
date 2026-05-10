import { useState, useEffect } from "react";
import { Heart, Sprout, Sun, Flame, Copy, Check, Compass, Coins, Route, Smile } from "lucide-react";
import { C, fonts, GoldRule, StepCard, Emblem, Eyebrow, HeroTitle, GoldText } from "./GuideShared";
import { trackPageEnter, trackPillar, trackPromptCopy, trackCTA } from "@/lib/analytics";

function PromptCard({ label, prompt, copyName, pillar }: { label: string; prompt: string; copyName: string; pillar: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    trackPromptCopy(copyName, pillar);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: C.card, borderColor: C.border, borderTopColor: C.gold, borderTopWidth: 2 }}>
      <p className="mb-2 text-[10px] uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.teal }}>{label}</p>
      <div className="mb-3 border-l-2 pl-4" style={{ borderLeftColor: C.teal }}>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: fonts.body, color: C.text, fontWeight: 300 }}>{prompt}</p>
      </div>
      <button
        onClick={copy}
        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors"
        style={{ backgroundColor: `${C.teal}15`, color: C.teal, fontFamily: fonts.body }}
      >
        {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Prompt</>}
      </button>
    </div>
  );
}

const pillars = [
  { id: "physical", icon: Heart, label: "Physical", sub: "Body & Vitality", bg: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447810986.png" },
  { id: "mental", icon: Sprout, label: "Mental & Emotional", sub: "Mind & Heart", bg: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447857528.png" },
  { id: "spiritual", icon: Sun, label: "Spiritual", sub: "Purpose & Presence", bg: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447858945.png" },
  { id: "work", icon: Flame, label: "Work, Wealth & Purpose", sub: "Money & Meaning", bg: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447864555.png" },
] as const;

export function PillarsTab() {
  const [active, setActive] = useState<string>("physical");

  useEffect(() => { trackPageEnter("pillars"); }, []);

  return (
    <div style={{ color: C.text }}>
      <div className="py-16 text-center">
        <Emblem icon={<Sun size={32} />} />
        <Eyebrow>The Four Pillars</Eyebrow>
        <HeroTitle>Whole-Person <GoldText>Transformation</GoldText></HeroTitle>
      </div>

      {/* Pillar tabs */}
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
        {pillars.map((p) => {
          const isActive = active === p.id;
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => { setActive(p.id); trackPillar(p.id); }}
              className="relative overflow-hidden rounded-xl border text-center transition-all duration-200 hover:scale-[1.02]"
              style={{
                minHeight: 160,
                borderColor: isActive ? C.gold : C.border,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${p.bg})` }}
              />
              <div className="absolute inset-0" style={{ backgroundColor: isActive ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.6)" }} />
              <div className="relative z-10 flex h-full flex-col items-center justify-center p-4" style={{ minHeight: 160 }}>
                <Icon size={24} style={{ color: isActive ? C.gold : "#E8C87A" }} className="mb-2" />
                <div className="text-sm font-medium" style={{ fontFamily: fonts.body, color: isActive ? C.gold : "#F5F0E8" }}>{p.label}</div>
                <div className="mt-1 text-[10px] opacity-80" style={{ fontFamily: fonts.body, color: "#E8C87A" }}>{p.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pillar content */}
      <div className="mx-auto mt-8 max-w-4xl">
        {active === "physical" && (
          <div className="space-y-6">
            <PromptCard
              label="PHYSICAL — STARTER PROMPT"
              prompt={`I am [age], my current health challenges are [X]. My energy level is [low/medium/high]. Help me build a realistic 90-day physical wellness plan that fits my actual life — not a perfect life.`}
              copyName="physical_90day"
              pillar="physical"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StepCard icon={<Sun size={20} />} title="Daily check-ins" desc="Tell Claude your energy, sleep, and how your body feels each morning." />
              <StepCard icon={<Compass size={20} />} title="Accountability logs" desc="Weekly tracking with honest reports, no sugarcoating." />
              <StepCard icon={<Route size={20} />} title="Obstacle mapping" desc="When you fall off, tell Claude exactly what happened to find the real pattern." />
            </div>
          </div>
        )}

        {active === "mental" && (
          <div className="space-y-6">
            <PromptCard
              label="MENTAL & EMOTIONAL — STARTER PROMPT"
              prompt={`I want to work on [anxiety / negative self-talk / emotional regulation / past patterns]. Here's what's going on in my life: [share freely]. Help me understand what's driving this and give me real, actionable steps to shift it.`}
              copyName="mental_shift"
              pillar="mental"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StepCard icon={<Sprout size={20} />} title="Emotional processing" desc="Work through what you're feeling with structured AI-guided reflection." />
              <StepCard icon={<Compass size={20} />} title="Belief system audits" desc="Challenge stories about money, relationships, and worthiness." />
              <StepCard icon={<Route size={20} />} title="Weekly mental health reports" desc="Assess emotional state, flag areas needing professional support." />
            </div>
          </div>
        )}

        {active === "spiritual" && (
          <div className="space-y-6">
            <PromptCard
              label="SPIRITUAL — STARTER PROMPT"
              prompt={`I feel disconnected from my purpose. I know there's something more I'm here to do but I can't see it clearly. Based on my gifts, my history, and what lights me up — help me map what my soul is actually calling me toward.`}
              copyName="spiritual_purpose"
              pillar="spiritual"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StepCard icon={<Sun size={20} />} title="Purpose mapping" desc="Discover what you're truly here to do with guided AI exploration." />
              <StepCard icon={<Compass size={20} />} title="Spiritual practice design" desc="Customized to your beliefs, not someone else's template." />
              <StepCard icon={<Smile size={20} />} title="Alignment checks" desc="Are my daily actions aligned with the life I say I want?" />
            </div>
          </div>
        )}

        {active === "work" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "90,000", label: "hours the average person spends working" },
                { val: "1/3", label: "of your entire life at work" },
                { val: "85%", label: "of people feel disengaged at work" },
                { val: "∞", label: "cost of doing work your soul rejects" },
              ].map((s) => (
                <div key={s.val} className="rounded-xl border p-4 text-center" style={{ backgroundColor: C.card, borderColor: C.border }}>
                  <div className="text-2xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>{s.val}</div>
                  <p className="mt-1 text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-l-2 p-5" style={{ borderLeftColor: C.gold, backgroundColor: `${C.gold}08` }}>
              <p className="text-sm italic leading-relaxed" style={{ fontFamily: fonts.body, color: C.gold }}>
                "Work isn't just about income. It's where you spend your most alert, capable hours. In the age of AI, finding work rooted in your unique human gifts isn't just fulfilling — it's the smartest financial move you can make."
              </p>
            </div>

            <PromptCard
              label="WORK & PURPOSE — STARTER PROMPT"
              prompt={`I work as [job/role]. My income is approximately [range]. I honestly feel [fulfilled/trapped/numb/in between] in my work. Here's what I'm good at and love: [share]. Help me find a path where I feel alive AND build real financial security.`}
              copyName="work_purpose"
              pillar="work"
            />
            <PromptCard
              label="FINANCIAL CLARITY — STARTER PROMPT"
              prompt={`My current financial situation is: [income, debts, savings]. I feel [stressed/stuck/hopeful/confused] about money. Help me build an honest picture of where I stand and the first 3 real steps toward financial freedom — without judgment.`}
              copyName="financial_clarity"
              pillar="work"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <StepCard icon={<Compass size={20} />} title="The gifts audit" desc="Map what you're truly gifted at — beyond job titles." />
              <StepCard icon={<Coins size={20} />} title="Financial reality mapping" desc="Get clear on where you actually stand, no judgment." />
              <StepCard icon={<Route size={20} />} title="The pivot possibilities map" desc="Discover paths that align gifts with income potential." />
              <StepCard icon={<Smile size={20} />} title="The weekly alignment question" desc="Am I spending my hours on what actually matters?" />
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mx-auto mt-16 max-w-lg text-center">
        <a
          href="mailto:highervibrations36@gmail.com"
          onClick={() => trackCTA("kim_alfano_pillars")}
          className="inline-block rounded-lg px-8 py-3 text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`, color: C.bg, fontFamily: fonts.body }}
        >
          Connect with Kim Alfano →
        </a>
      </div>
    </div>
  );
}
