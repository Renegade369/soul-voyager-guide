import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Grid3X3, Headphones, Wrench, Trophy, Sparkles, Orbit, Droplet } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/guide/AuthModal";
import { HomeTab } from "@/components/guide/HomeTab";
import { PillarsTab } from "@/components/guide/PillarsTab";
import { MeditationsTab } from "@/components/guide/MeditationsTab";
import { ToolsTab } from "@/components/guide/ToolsTab";
import { ChallengeTab } from "@/components/guide/ChallengeTab";
import { SoulQuizTab } from "@/components/guide/SoulQuizTab";
import { BirthChartTab } from "@/components/guide/BirthChartTab";
import { BloodTypeTab } from "@/components/guide/BloodTypeTab";
import { PlantImageBand, PLANT_IMAGES } from "@/components/PlantImageBand";


const C = { bg: "#0D0F0E", border: "#2E3A35", gold: "#C9A84C", text: "#E8EDE9", muted: "#8A9E94" };
const fonts = { body: '"Outfit", sans-serif' };

const pageBackgrounds: Record<string, string> = {
  meditations: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448421456.png",
  tools: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448440620.png",
  challenge: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448428398.png",
  soulquiz: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448438907.png",
  birthchart: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448428624.png",
  bloodtype: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448443237.png",
};

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "pillars", label: "Pillars", icon: Grid3X3 },
  { id: "meditations", label: "Meditations", icon: Headphones },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "challenge", label: "Challenge", icon: Trophy },
  { id: "soulquiz", label: "Soul Quiz", icon: Sparkles },
  { id: "birthchart", label: "Birth Chart", icon: Orbit },
  { id: "bloodtype", label: "Blood Type", icon: Droplet },
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
  const handleTabChange = (id: string) => {
    setActive(id);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  };
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a1410" }}>
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
                  data-tab={t.id}
                  onClick={() => handleTabChange(t.id)}
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
                <Link to="/dashboard" className="text-xs" style={{ color: C.gold, fontFamily: fonts.body }}>Dashboard</Link>
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
      <div className="relative">
        {pageBackgrounds[active] && (
          <>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `url(${pageBackgrounds[active]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            />
            <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20">
          {active === "home" && <HomeTab />}
          {active === "pillars" && <PillarsTab />}
          {active === "meditations" && <MeditationsTab />}
          {active === "tools" && <ToolsTab onGoToChallenge={() => handleTabChange("challenge")} />}
          {active === "challenge" && <ChallengeTab />}
          {active === "soulquiz" && <SoulQuizTab />}
          {active === "birthchart" && <BirthChartTab />}
          {active === "bloodtype" && <BloodTypeTab />}
        </div>
        <PlantImageBand src={PLANT_IMAGES.guide} />
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
