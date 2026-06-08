import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect, useRef, useState } from "react";
import { Loader2, ArrowLeft, Play, Pause, Lock, Headphones } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  glow: "#E8821A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.4)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

type Transmission = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  module_slug: string | null;
  tier_required: string;
  audio_url: string;
  duration_seconds: number | null;
  sort_order: number;
};

export const Route = createFileRoute("/sovereign/portal/audio")({
  head: () => ({ meta: [{ title: "Audio Transmissions — Sovereign Portal" }] }),
  component: AudioLibraryPage,
});

function fmt(seconds: number | null) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function AudioLibraryPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [items, setItems] = useState<Transmission[] | null>(null);
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const { data } = await supabase
        .from("sovereign_audio_transmissions")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      setItems((data as Transmission[]) ?? []);
    })();
  }, [status]);

  async function togglePlay(t: Transmission) {
    if (status.state !== "ready") return;
    const isComplete = status.tier === "complete";
    if (t.tier_required === "complete" && !isComplete) return;

    if (playingSlug === t.slug) {
      audioRef.current?.pause();
      setPlayingSlug(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const a = new Audio(t.audio_url);
    audioRef.current = a;
    a.play().catch(() => {});
    setPlayingSlug(t.slug);
    a.onended = () => setPlayingSlug(null);

    // Record play (fire and forget).
    await supabase.from("sovereign_audio_plays").upsert(
      {
        user_id: status.userId,
        transmission_slug: t.slug,
        play_count: 1,
        last_position_seconds: 0,
      },
      { onConflict: "user_id,transmission_slug" }
    );
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  const isComplete = status.tier === "complete";

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <section className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/sovereign/portal/dashboard"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Audio Transmissions
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Voiced <em style={{ color: C.gold }}>guidance</em>.
          </h1>
          <p className="mt-3 text-base font-light max-w-2xl" style={{ color: C.muted }}>
            Companion audio for the work — guided practices, meditations, and transmissions from William.
          </p>
          {!isComplete && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 text-sm" style={{ background: C.card, border: `1px solid rgba(232,130,26,0.3)`, color: C.muted }}>
              <Lock size={14} color={C.glow} />
              <span>Some transmissions require the Complete tier. <a href="mailto:hello@soul-true.com" style={{ color: C.gold, textDecoration: "underline" }}>Upgrade for $200</a>.</span>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {items === null ? (
          <div className="flex justify-center py-20"><BrandLoader size={48} /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20" style={{ color: C.muted }}>
            <Headphones size={32} color={C.dim} className="mx-auto" />
            <p className="mt-4 text-lg font-light italic" style={{ fontFamily: fonts.display }}>
              The first transmissions are being prepared.
            </p>
            <p className="mt-2 text-sm">Check back soon. You'll be notified by email.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((t) => {
              const locked = t.tier_required === "complete" && !isComplete;
              const playing = playingSlug === t.slug;
              return (
                <li
                  key={t.id}
                  className="p-5 flex items-start gap-4"
                  style={{
                    background: C.card,
                    border: `1px solid rgba(201,168,76,${locked ? 0.12 : 0.25})`,
                    opacity: locked ? 0.6 : 1,
                  }}
                >
                  <button
                    onClick={() => togglePlay(t)}
                    disabled={locked}
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
                    style={{
                      background: locked ? "transparent" : C.gold,
                      border: locked ? `1px solid ${C.dim}` : "none",
                      cursor: locked ? "not-allowed" : "pointer",
                    }}
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {locked ? (
                      <Lock size={16} color={C.dim} />
                    ) : playing ? (
                      <Pause size={18} color={C.bg} />
                    ) : (
                      <Play size={18} color={C.bg} style={{ marginLeft: 2 }} />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                      <span>{fmt(t.duration_seconds)}</span>
                      {t.module_slug && (<><span>·</span><span>{t.module_slug.replace(/-/g, " ")}</span></>)}
                      {t.tier_required === "complete" && (
                        <>
                          <span>·</span>
                          <span style={{ color: C.glow }}>Complete</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-1 text-xl font-light" style={{ fontFamily: fonts.display }}>
                      {t.title}
                    </h3>
                    {t.description && (
                      <p className="mt-1 text-sm font-light" style={{ color: C.muted }}>
                        {t.description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
