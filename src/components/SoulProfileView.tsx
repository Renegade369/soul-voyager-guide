import { Heart, Sparkles, Star } from "lucide-react";
import type { SoulProfile } from "@/lib/profileSharing";

const C = {
  bg: "#0A0A0A",
  border: "rgba(212,175,100,0.18)",
  borderStrong: "rgba(212,175,100,0.4)",
  gold: "#C9A84C",
  goldLight: "#E8C87A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.65)",
  dim: "rgba(245,240,232,0.4)",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>{children}</p>;
}

export function SoulProfileView({ profile }: { profile: SoulProfile }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16" style={{ color: C.text }}>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Soul Profile</p>
        <h1 className="mt-5 font-serif text-5xl font-light italic md:text-6xl" style={{ color: C.goldLight, lineHeight: 1.1 }}>
          {profile.soul_name}
        </h1>
      </div>

      <div className="my-12 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />

      <div className="rounded-none border p-7 sm:p-9" style={{ borderColor: C.borderStrong, background: "rgba(201,168,76,0.03)" }}>
        <SectionLabel>Soul Summary</SectionLabel>
        <p className="font-serif text-lg leading-relaxed sm:text-xl">{profile.soul_summary}</p>
      </div>

      <div className="mt-12">
        <SectionLabel>Energetic Signature</SectionLabel>
        <p className="text-base leading-relaxed sm:text-lg">{profile.energetic_signature}</p>
      </div>

      <div className="mt-12">
        <SectionLabel>Soul Gifts</SectionLabel>
        <ul className="space-y-4">
          {profile.soul_gifts.map((g, i) => (
            <li key={i} className="flex items-start gap-4">
              <Star size={14} strokeWidth={1.2} fill={C.gold} style={{ color: C.gold }} className="mt-1.5 flex-shrink-0" />
              <span className="text-base leading-relaxed sm:text-lg">{g}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <SectionLabel>Life Path Themes</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {profile.life_path_themes.map((t, i) => (
            <span key={i} className="rounded-none border px-4 py-2 text-sm"
              style={{ borderColor: C.gold, color: C.goldLight, background: "rgba(201,168,76,0.05)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-none border p-7" style={{ borderColor: C.border, background: "rgba(201,168,76,0.06)" }}>
        <SectionLabel>Shadow &amp; Growth</SectionLabel>
        <p className="text-base leading-relaxed">{profile.shadow_and_growth}</p>
      </div>

      <div className="mt-12 rounded-none border p-7" style={{ borderColor: C.border, background: "rgba(201,168,76,0.03)" }}>
        <div className="mb-3 flex items-center gap-3">
          <Heart size={16} fill={C.gold} style={{ color: C.gold }} />
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Relationships &amp; Connection</p>
        </div>
        <p className="text-base leading-relaxed">{profile.relationships_and_connection}</p>
      </div>

      <div className="mt-14 text-center">
        <SectionLabel>Soul Mission</SectionLabel>
        <p className="mx-auto max-w-xl font-serif text-2xl font-light leading-relaxed sm:text-3xl">{profile.soul_mission}</p>
      </div>

      <div className="relative mt-16">
        <div className="absolute -inset-3 -z-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${C.gold}33, transparent 70%)`, filter: "blur(30px)" }} />
        <div className="relative rounded-none border-2 px-7 py-12 text-center sm:px-12 sm:py-16"
          style={{ borderColor: C.borderStrong, background: "rgba(0,0,0,0.5)" }}>
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Activation</p>
          <p className="mx-auto mt-7 max-w-xl font-serif text-2xl font-light italic leading-relaxed sm:text-3xl"
            style={{ color: C.goldLight }}>"{profile.activation_message}"</p>
        </div>
      </div>

      <div className="mt-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Your Next Step</p>
        <p className="mx-auto mt-4 max-w-md text-base italic leading-relaxed" style={{ color: C.muted }}>{profile.next_step}</p>
      </div>

      <div className="mt-12 flex items-center justify-center gap-2">
        <Sparkles size={12} style={{ color: C.gold }} />
        <p className="font-serif text-sm italic" style={{ color: C.gold }}>With love, Soul True</p>
        <Sparkles size={12} style={{ color: C.gold }} />
      </div>

      <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
        For educational &amp; inspirational purposes only.
      </p>
    </div>
  );
}
