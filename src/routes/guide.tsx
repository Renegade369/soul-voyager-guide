import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Home, Zap, Grid3X3, Headphones, Wrench, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/guide/AuthModal";
import { HomeTab } from "@/components/guide/HomeTab";
import { RevolutionTab } from "@/components/guide/RevolutionTab";
import { PillarsTab } from "@/components/guide/PillarsTab";
import { MeditationsTab } from "@/components/guide/MeditationsTab";
import { ToolsTab } from "@/components/guide/ToolsTab";
import { ChallengeTab } from "@/components/guide/ChallengeTab";

const C = { bg: "#0D0F0E", border: "#2E3A35", gold: "#C9A84C", text: "#E8EDE9", muted: "#8A9E94" };
const fonts = { body: '"Outfit", sans-serif' };

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "revolution", label: "Revolution", icon: Zap },
  { id: "pillars", label: "Pillars", icon: Grid3X3 },
  { id: "meditations", label: "Meditations", icon: Headphones },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "challenge", label: "Challenge", icon: Trophy },
] as const;

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Soul True — AI Life Guide" },
      { name: "description", content: "A free, AI-powered guide to transform every dimension of your life. 10-day challenge, test, and certificate." },
      { property: "og:title", content: "Soul True — AI Life Guide" },
      { property: "og:description", content: "A free, AI-powered guide to transform every dimension of your life." },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const [active, setActive] = useState("home");
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: `${C.bg}ee`, backdropFilter: "blur(12px)", borderColor: C.border }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <div className="flex">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="flex flex-col items-center gap-1 px-4 py-3 transition-colors"
                  style={{
                    borderBottom: isActive ? `2px solid ${C.gold}` : "2px solid transparent",
                    color: isActive ? C.gold : C.muted,
                  }}
                >
                  <Icon size={18} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: fonts.body }}>{t.label}</span>
                </button>
              );
            })}
          </div>
          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
                <a href="/dashboard" className="text-xs" style={{ color: C.gold, fontFamily: fonts.body }}>Dashboard</a>
                <button onClick={signOut} className="text-xs" style={{ color: C.muted, fontFamily: fonts.body }}>Sign Out</button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="rounded-md border px-4 py-1.5 text-xs"
                style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 pb-20">
        {active === "home" && <HomeTab />}
        {active === "revolution" && <RevolutionTab />}
        {active === "pillars" && <PillarsTab />}
        {active === "meditations" && <MeditationsTab />}
        {active === "tools" && <ToolsTab onGoToChallenge={() => setActive("challenge")} />}
        {active === "challenge" && <ChallengeTab />}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
