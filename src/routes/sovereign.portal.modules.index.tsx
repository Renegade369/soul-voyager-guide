import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ChevronRight, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { SOVEREIGN_MODULES } from "@/lib/sovereign-curriculum";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.4)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/portal/modules/")({
  head: () => ({ meta: [{ title: "Modules — Sovereign Portal" }] }),
  component: ModulesIndexPage,
});

function ModulesIndexPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const { data } = await supabase
        .from("sovereign_module_progress")
        .select("module_slug")
        .eq("user_id", status.userId);
      const counts: Record<string, number> = {};
      (data ?? []).forEach((r: any) => {
        counts[r.module_slug] = (counts[r.module_slug] ?? 0) + 1;
      });
      setProgress(counts);
      setLoaded(true);
    })();
  }, [status]);

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} color={C.gold} />
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <section className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link to="/sovereign/portal/dashboard" className="text-[11px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>
            ← Dashboard
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The Curriculum
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Six modules. <em style={{ color: C.gold }}>Six layers.</em>
          </h1>
          <p className="mt-3 text-base font-light max-w-2xl" style={{ color: C.muted }}>
            Move through them in order, or follow what calls you. Each lesson is short. The work is in the practice.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-4">
        {SOVEREIGN_MODULES.map((m) => {
          const done = progress[m.slug] ?? 0;
          const total = m.lessons.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <Link
              key={m.slug}
              to="/sovereign/portal/modules/$slug"
              params={{ slug: m.slug }}
              className="block p-6 transition-opacity hover:opacity-90"
              style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
                      Module 0{m.number}
                    </span>
                    {loaded && (
                      <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                        {done}/{total} complete
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 text-2xl md:text-3xl font-light" style={{ fontFamily: fonts.display }}>
                    {m.title}
                  </h2>
                  <p className="mt-1 text-sm italic" style={{ color: C.gold, fontFamily: fonts.display }}>
                    {m.subtitle}
                  </p>
                  <p className="mt-3 text-sm font-light" style={{ color: C.muted }}>
                    {m.description}
                  </p>
                  {loaded && total > 0 && (
                    <div className="mt-4 h-[2px] w-full" style={{ background: "rgba(201,168,76,0.15)" }}>
                      <div className="h-full" style={{ width: `${pct}%`, background: C.gold }} />
                    </div>
                  )}
                </div>
                <ChevronRight size={20} color={C.gold} className="mt-2 flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      <footer className="border-t mt-12" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-5xl px-6 py-8 text-xs flex items-center gap-2" style={{ color: C.muted }}>
          <BookOpen size={14} color={C.gold} />
          <span>The Sovereignty Code · Curriculum</span>
        </div>
      </footer>
    </div>
  );
}
