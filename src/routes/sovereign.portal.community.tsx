import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, Users, Lock, Trash2 } from "lucide-react";
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

type Post = {
  id: string;
  user_id: string;
  author_display_name: string;
  title: string | null;
  body: string;
  created_at: string;
};

export const Route = createFileRoute("/sovereign/portal/community")({
  head: () => ({ meta: [{ title: "Council — Sovereign Portal" }] }),
  component: CommunityPage,
});

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function CommunityPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isComplete = status.state === "ready" && status.tier === "complete";

  async function load() {
    const { data } = await supabase
      .from("sovereign_community_posts")
      .select("*")
      .eq("is_hidden", false)
      .order("created_at", { ascending: false })
      .limit(100);
    setPosts((data as Post[]) ?? []);
  }

  useEffect(() => {
    if (status.state !== "ready") return;
    load();
  }, [status]);

  async function submit() {
    if (status.state !== "ready") return;
    setError("");
    if (!body.trim()) { setError("Share something honest."); return; }
    if (!name.trim()) { setError("Choose a name to be known by."); return; }
    setSaving(true);
    const { error: err } = await supabase.from("sovereign_community_posts").insert({
      user_id: status.userId,
      author_display_name: name.trim().slice(0, 60),
      title: title.trim() ? title.trim().slice(0, 120) : null,
      body: body.trim().slice(0, 4000),
    });
    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    setTitle("");
    setBody("");
    setSaving(false);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this reflection?")) return;
    await supabase.from("sovereign_community_posts").delete().eq("id", id);
    await load();
  }

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
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            to="/sovereign/portal/dashboard"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The Council
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Walk this <em style={{ color: C.gold }}>together</em>.
          </h1>
          <p className="mt-3 text-base font-light max-w-2xl" style={{ color: C.muted }}>
            A quiet space for initiates. Share what is alive in your practice. Read what others are working with. No likes. No noise.
          </p>
          {!isComplete && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 text-sm" style={{ background: C.card, border: `1px solid rgba(232,130,26,0.3)`, color: C.muted }}>
              <Lock size={14} color={C.glow} />
              <span>Posting is part of the Complete tier. You can read the council on either tier.</span>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
        {isComplete && (
          <div className="p-6" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}>
            <h2 className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Share a reflection
            </h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Known as (your council name)"
              maxLength={60}
              className="mt-4 w-full px-4 py-3 text-sm"
              style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              maxLength={120}
              className="mt-3 w-full px-4 py-3 text-sm"
              style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What is alive for you in the practice today?"
              rows={5}
              maxLength={4000}
              className="mt-3 w-full px-4 py-3 text-base"
              style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
            />
            {error && <p className="mt-3 text-sm" style={{ color: "#E8504C" }}>{error}</p>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs" style={{ color: C.dim }}>{body.length}/4000</p>
              <button
                onClick={submit}
                disabled={saving}
                className="px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
                style={{ background: C.gold, color: C.bg }}
              >
                {saving ? "Posting…" : "Share with the Council"}
              </button>
            </div>
          </div>
        )}

        <div>
          {posts === null ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin" size={24} color={C.gold} /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16" style={{ color: C.muted }}>
              <Users size={32} color={C.dim} className="mx-auto" />
              <p className="mt-4 text-lg font-light italic" style={{ fontFamily: fonts.display }}>
                The council is quiet. Be the first voice.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="p-6"
                  style={{ background: C.card, border: `1px solid rgba(201,168,76,0.18)` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                      <span style={{ color: C.gold }}>{p.author_display_name}</span>
                      <span>·</span>
                      <span>{timeAgo(p.created_at)}</span>
                    </div>
                    {p.user_id === status.userId && (
                      <button
                        onClick={() => remove(p.id)}
                        className="opacity-50 hover:opacity-100"
                        aria-label="Delete post"
                      >
                        <Trash2 size={14} color={C.muted} />
                      </button>
                    )}
                  </div>
                  {p.title && (
                    <h3 className="mt-3 text-2xl font-light" style={{ fontFamily: fonts.display }}>{p.title}</h3>
                  )}
                  <p className="mt-2 text-base font-light leading-relaxed whitespace-pre-line" style={{ color: C.text }}>
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
