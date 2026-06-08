import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { listEscalations, checkIsAdmin } from "@/lib/sovereign-assistant";

const C = { bg: "#0A0A0A", card: "#1A1209", gold: "#C9A84C", text: "#F5F0E8", muted: "rgba(245,240,232,0.7)", dim: "rgba(245,240,232,0.4)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/admin/escalations/")({
  head: () => ({ meta: [{ title: "Escalations — Admin" }] }),
  component: EscalationsList,
});

type Filter = "all" | "pending" | "replied";

function EscalationsList() {
  const navigate = useNavigate();
  const adminFn = useServerFn(checkIsAdmin);
  const listFn = useServerFn(listEscalations);
  const [filter, setFilter] = useState<Filter>("pending");

  const { data: adminCheck } = useQuery({ queryKey: ["is-admin"], queryFn: () => adminFn() });
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["escalations", filter],
    queryFn: () => listFn({ data: { filter } }),
    enabled: Boolean(adminCheck?.isAdmin),
  });

  useEffect(() => {
    if (adminCheck && !adminCheck.isAdmin) navigate({ to: "/" });
  }, [adminCheck, navigate]);

  if (!adminCheck?.isAdmin) {
    return <div style={{ background: C.bg, color: C.muted, minHeight: "100vh" }} className="flex items-center justify-center font-light">Checking access…</div>;
  }

  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: fonts.body }}>
      <header className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>Sovereignty Code</p>
              <h1 className="mt-2 text-4xl font-light" style={{ fontFamily: fonts.display }}>
                Escalations Queue {filter === "pending" && pendingCount > 0 && <span style={{ color: C.gold }}>· {pendingCount}</span>}
              </h1>
            </div>
            <div className="flex gap-2">
              {(["pending", "replied", "all"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors"
                  style={{
                    background: filter === f ? C.gold : "transparent",
                    color: filter === f ? C.bg : C.muted,
                    border: `1px solid ${C.gold}55`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {isLoading && <p style={{ color: C.muted }}>Loading…</p>}
        {!isLoading && rows.length === 0 && (
          <div className="text-center py-20" style={{ color: C.muted }}>
            <p className="text-lg italic" style={{ fontFamily: fonts.display }}>
              No escalations pending. The AI is handling everything.
            </p>
          </div>
        )}
        <ul className="divide-y" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          {rows.map((r) => (
            <li key={r.id} className="py-5">
              <Link to="/admin/escalations/$id" params={{ id: r.id }} className="block group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium" style={{ color: C.text }}>{r.first_name}</p>
                      <span className="text-[10px] uppercase tracking-[0.22em] px-2 py-0.5" style={{ background: `${C.gold}22`, color: C.gold }}>
                        {r.module_slug ?? "—"}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: r.status === "pending" ? C.gold : C.dim }}>
                        {r.status}
                      </span>
                      {r.escalation_reason === "user_requested" && (
                        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>user-asked</span>
                      )}
                    </div>
                    <p className="text-sm line-clamp-2 font-light" style={{ color: C.muted }}>{r.question}</p>
                    <p className="mt-2 text-[10px]" style={{ color: C.dim }}>
                      {timeAgo(r.escalated_at)} · confidence {Number(r.confidence_score ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] self-center" style={{ color: C.gold }}>View →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diffMs / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
