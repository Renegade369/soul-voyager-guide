import { useEffect } from "react";
import { Wrench, MessageCircle, Brain, Pencil, Mic, Search, Music, FileText, Video, PencilLine, Users, Handshake, Store, Laptop, Home } from "lucide-react";
import { C, fonts, GoldRule, Emblem, Eyebrow, HeroTitle, GoldText } from "./GuideShared";
import { trackPageEnter } from "@/lib/analytics";

const tools = [
  { icon: MessageCircle, name: "Claude", badge: "FREE", desc: "Your primary AI life partner. Best for deep thinking, life planning, emotional processing, and honest conversation.", url: "claude.ai" },
  { icon: Brain, name: "ChatGPT", badge: "FREE", desc: "Great for quick answers, brainstorming, and everyday tasks. A strong second AI alongside Claude.", url: "chatgpt.com" },
  { icon: Pencil, name: "Canva AI", badge: "FREE", desc: "Create stunning graphics, social posts, and presentations in minutes. Zero design experience needed.", url: "canva.com" },
  { icon: Mic, name: "Otter.ai", badge: "FREE", desc: "Records and transcribes any conversation instantly. Never lose a great idea again.", url: "otter.ai" },
  { icon: Search, name: "Perplexity AI", badge: "FREE", desc: "AI-powered search with real answers and sources. Replace Google for anything that matters.", url: "perplexity.ai" },
  { icon: Music, name: "Suno AI", badge: "FREE", desc: "Generate original music in any genre just by describing the vibe.", url: "suno.com" },
  { icon: FileText, name: "Notion AI", badge: "FREEMIUM", desc: "An AI-powered life and business organizer. Plan goals, track habits, build your vision.", url: "notion.so" },
  { icon: Video, name: "CapCut AI", badge: "FREE", desc: "Create and edit videos with AI. Build a personal brand with no editing skills needed.", url: "capcut.com" },
];

const incomePaths = [
  { icon: PencilLine, title: "AI-Assisted Content Creator", desc: "Use Claude and Canva to create content for businesses: social posts, newsletters, email campaigns. Businesses pay $500–$3,000/month per client.", tip: "Pick one niche. Offer 3 free posts to a local business. Build from there." },
  { icon: Users, title: "AI Literacy Coach or Consultant", desc: "Teach individuals or small businesses to use AI. You're already ahead of 90% of the population. Charge $75–$200/hour.", tip: "Help 3 people in your circle get started. Your confidence grows with each one." },
  { icon: Handshake, title: "Purpose-Driven Coach or Mentor", desc: "Run a coaching practice around transformation, career pivots, or mindset. AI handles notes and follow-ups.", tip: "Define your transformation story. That's your niche. Your lived experience is your credential." },
  { icon: Store, title: "AI-Powered Local Business Services", desc: "Help local businesses set up AI tools that save them hours weekly. Most owners have no idea where to start.", tip: "Walk into 5 local businesses. Ask what takes the most time. Show them how AI solves it." },
  { icon: Laptop, title: "Digital Products & Online Courses", desc: "Use AI to create and sell guides, templates, or mini-courses. Create a polished product in days, not months.", tip: 'Ask Claude: "Help me outline a 5-lesson mini-course on [your area of knowledge]."' },
  { icon: Home, title: "Supercharge Your Existing Career", desc: "AI can make you 3–10x more productive in any field: roofing, sales, healthcare, real estate, trades.", tip: 'Ask Claude: "I work in [your field]. What are the 5 highest-impact ways AI can help me right now?"' },
];

export function ToolsTab({ onGoToChallenge }: { onGoToChallenge: () => void }) {
  useEffect(() => { trackPageEnter("tools"); }, []);

  return (
    <div style={{ color: C.text }}>
      <div className="py-16 text-center">
        <Emblem icon={<Wrench size={32} />} />
        <Eyebrow>AI Onramp & Income Paths</Eyebrow>
        <HeroTitle>Get Involved With AI <GoldText>Today.</GoldText></HeroTitle>
      </div>

      {/* Tools */}
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-6 text-center text-2xl" style={{ fontFamily: fonts.display }}>8 AI Tools to Start With</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((t) => {
            const Icon = t.icon;
            const isFree = t.badge === "FREE";
            return (
              <div
                key={t.name}
                className="rounded-xl border p-5 transition-colors duration-200"
                style={{ backgroundColor: C.card, borderColor: C.border }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <Icon size={20} style={{ color: C.teal }} />
                  <span className="text-sm font-medium" style={{ fontFamily: fonts.body, color: C.text }}>{t.name}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] uppercase" style={{ backgroundColor: isFree ? `${C.teal}18` : `${C.amber}18`, color: isFree ? C.teal : C.amber }}>
                    {t.badge}
                  </span>
                </div>
                <p className="mb-3 text-xs leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>{t.desc}</p>
                <a href={`https://${t.url}`} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: C.teal }}>{t.url}</a>
              </div>
            );
          })}
        </div>
      </div>

      <GoldRule />

      {/* Income Paths */}
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-6 text-center text-2xl" style={{ fontFamily: fonts.display }}>6 Income Paths in the AI Economy</h3>
        <div className="space-y-4">
          {incomePaths.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0"><Icon size={24} style={{ color: C.gold }} /></div>
                  <div>
                    <h4 className="mb-1 text-base font-medium" style={{ fontFamily: fonts.body, color: C.text }}>{p.title}</h4>
                    <p className="mb-3 text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>{p.desc}</p>
                    <p className="text-xs" style={{ color: C.teal }}><strong>Start:</strong> {p.tip}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-16 max-w-lg text-center">
        <button
          onClick={onGoToChallenge}
          className="rounded-lg px-8 py-3 text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`, color: "#fff", fontFamily: fonts.body }}
        >
          Start the 10-Day Challenge →
        </button>
      </div>
    </div>
  );
}
