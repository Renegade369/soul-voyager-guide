import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  getEscalationDetail,
  sendEscalationReply,
  resolveEscalation,
  checkIsAdmin,
  type AssistantMessage,
} from "@/lib/sovereign-assistant";

const C = { bg: "#0A0A0A", card: "#1A1209", gold: "#C9A84C", text: "#F5F0E8", muted: "rgba(245,240,232,0.7)", dim: "rgba(245,240,232,0.4)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/admin/escalations/$id")({
  head: () => ({ meta: [{ title: "Escalation — Admin" }] }),
  component: EscalationDetail,
});

function EscalationDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const adminFn = useServerFn(checkIsAdmin);
  const detailFn = useServerFn(getEscalationDetail);
  const replyFn = useServerFn(sendEscalationReply);
  const resolveFn = useServerFn(resolveEscalation);

  const { data: adminCheck } = useQuery({ queryKey: ["is-admin"], queryFn: () => adminFn() });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["escalation", id],
    queryFn: () => detailFn({ data: { id } }),
    enabled: Boolean(adminCheck?.isAdmin),
  });
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (adminCheck && !adminCheck.isAdmin) navigate({ to: "/" });
  }, [adminCheck, navigate]);

  if (!adminCheck?.isAdmin || isLoading || !data) {
    return <div style={{ background: C.bg, color: C.muted, minHeight: "100vh" }} className="flex items-center justify-center font-light">Loading…</div>;
  }

  const { escalation, thread, profile, settings } = data;

  const handleSend = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      await replyFn({ data: { id, reply: reply.trim() } });
      toast.success(`Reply sent to ${profile.first_name}`);
      setReply("");
      refetch();
    } catch (e) {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleResolve = async () => {
    await resolveFn({ data: { id } });
    toast.success("Marked resolved");
    refetch();
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: fonts.body }}>
      <header className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link to="/admin/escalations" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>
            <ArrowLeft size={14} /> Escalations
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>Conversation</p>
            <h1 className="mt-2 text-3xl font-light" style={{ fontFamily: fonts.display }}>
              {profile.first_name}'s thread
            </h1>
          </div>

          <div className="space-y-4">
            {thread.map((m: AssistantMessage) => (
              <div key={m.id} className={`px-4 py-3 ${m.role === "user" ? "ml-12" : "mr-12"}`}
                   style={{
                     background: m.role === "william" ? C.card : m.role === "assistant" ? `${C.gold}10` : "rgba(245,240,232,0.05)",
                     border: m.role === "william" ? `2px solid ${C.gold}` : `1px solid rgba(201,168,76,0.2)`,
                   }}>
                <p className="text-[10px] uppercase tracking-[0.32em] mb-1" style={{ color: m.role === "william" ? C.gold : m.role === "assistant" ? C.gold : C.muted }}>
                  {m.role === "assistant" ? "AI" : m.role === "william" ? "William" : profile.first_name}
                </p>
                <p className="text-sm font-light whitespace-pre-line" style={{ color: C.text }}>{m.content}</p>
                {m.confidence != null && (
                  <p className="mt-2 text-[10px]" style={{ color: C.dim }}>confidence {m.confidence.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>

          <div className="p-5" style={{ background: C.card, border: `1px solid ${C.gold}55` }}>
            <p className="text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: C.gold }}>Escalated question</p>
            <p className="font-light mb-4" style={{ color: C.text }}>{escalation.question}</p>
            <p className="text-[11px] uppercase tracking-[0.32em] mt-3 mb-1" style={{ color: C.muted }}>AI attempted answer ({Number(escalation.confidence_score).toFixed(2)})</p>
            <p className="text-sm font-light whitespace-pre-line" style={{ color: C.muted }}>{escalation.ai_attempted_answer}</p>
            <p className="mt-2 text-[10px]" style={{ color: C.dim }}>Reason: {escalation.escalation_reason}</p>
          </div>

          {escalation.william_reply ? (
            <div className="p-5" style={{ background: C.card, border: `2px solid ${C.gold}` }}>
              <p className="text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: C.gold }}>Your reply (sent {escalation.replied_at ? new Date(escalation.replied_at).toLocaleString() : ""})</p>
              <p className="font-light whitespace-pre-line">{escalation.william_reply}</p>
              {escalation.status !== "resolved" && (
                <button onClick={handleResolve} className="mt-4 px-4 py-2 text-[10px] uppercase tracking-[0.22em]" style={{ border: `1px solid ${C.gold}`, color: C.gold }}>
                  Mark resolved
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: C.gold }}>Your reply</p>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Speak to them directly…"
                rows={6}
                className="w-full px-4 py-3 text-base outline-none resize-y"
                style={{ background: C.card, color: C.text, border: `1px solid ${C.gold}33`, fontFamily: fonts.body }}
              />
              <div className="mt-3 flex gap-3">
                <button onClick={handleSend} disabled={sending || !reply.trim()} className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-50" style={{ background: C.gold, color: C.bg }}>
                  Send reply
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="p-5" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}>
            <p className="text-[10px] uppercase tracking-[0.32em] mb-3" style={{ color: C.gold }}>Member</p>
            <p className="font-medium" style={{ color: C.text }}>{profile.full_name || profile.first_name}</p>
            <p className="text-sm" style={{ color: C.muted }}>{profile.email}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Tier" value={settings?.tier_at_enrollment ?? "—"} />
              <Row label="Module" value={data.moduleSlug ?? "—"} />
              <Row label="Window end" value={settings?.window_end ? new Date(settings.window_end).toLocaleDateString() : "—"} />
              <Row label="Last activity" value={settings?.last_activity_at ? new Date(settings.last_activity_at).toLocaleString() : "—"} />
              <Row label="Total messages" value={String(settings?.total_messages ?? thread.length)} />
            </dl>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>{label}</dt>
      <dd style={{ color: C.muted }}>{value}</dd>
    </div>
  );
}
