import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin-codes")({
  head: () => ({
    meta: [
      { title: "Promo Codes — Admin — Soul True" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminCodesPage,
});

const C = { bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)", border: "rgba(201,168,76,0.3)" };

const READER_OPTIONS = [
  { value: "all", label: "All Readers" },
  { value: "aura", label: "Aura" },
  { value: "blood-type", label: "Blood Type" },
  { value: "birth-chart", label: "Birth Chart" },
  { value: "numerology", label: "Numerology" },
  { value: "astrology", label: "Astrology" },
];

type PromoCode = {
  id: string; code: string; unlocks: string[]; max_uses: number | null;
  uses_count: number; expires_at: string | null; is_active: boolean; created_at: string;
};
type Redemption = { id: string; code: string; email: string | null; reader_slug: string; redeemed_at: string };

function AdminCodesPage() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [reds, setReds] = useState<Redemption[]>([]);
  const [busy, setBusy] = useState(true);

  // form
  const [newCode, setNewCode] = useState("");
  const [unlocks, setUnlocks] = useState<string[]>(["all"]);
  const [maxUses, setMaxUses] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const refresh = async () => {
    const [c, r] = await Promise.all([
      supabase.from("promo_codes").select("*").order("created_at", { ascending: false }),
      supabase.from("promo_code_redemptions").select("*").order("redeemed_at", { ascending: false }).limit(100),
    ]);
    if (c.error) { setIsAdmin(false); return; }
    setIsAdmin(true);
    setCodes((c.data ?? []) as PromoCode[]);
    setReds((r.data ?? []) as Redemption[]);
  };

  useEffect(() => {
    if (!user) { setIsAdmin(false); setBusy(false); return; }
    refresh().finally(() => setBusy(false));
  }, [user]);

  const create = async () => {
    if (!newCode.trim() || unlocks.length === 0) return;
    setCreating(true); setErr(null);
    const { error } = await supabase.from("promo_codes").insert({
      code: newCode.trim().toUpperCase(),
      unlocks,
      max_uses: maxUses ? Number(maxUses) : null,
      expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
      created_by: user?.id,
    });
    if (error) setErr(error.message);
    else { setNewCode(""); setMaxUses(""); setExpiresAt(""); setUnlocks(["all"]); await refresh(); }
    setCreating(false);
  };

  const toggle = async (c: PromoCode) => {
    await supabase.from("promo_codes").update({ is_active: !c.is_active }).eq("id", c.id);
    refresh();
  };

  const toggleUnlock = (val: string) => {
    setUnlocks((prev) => {
      if (val === "all") return ["all"];
      const without = prev.filter((u) => u !== "all");
      return without.includes(val) ? without.filter((u) => u !== val) : [...without, val];
    });
  };

  if (loading || busy) {
    return <div className="flex min-h-screen items-center justify-center" style={{ background: C.bg, color: C.muted }}>Loading…</div>;
  }
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center" style={{ background: C.bg, color: C.text }}>
        <h1 className="font-serif text-3xl font-light italic" style={{ color: C.gold }}>Admin sign-in required</h1>
        <Link to="/sign-in" className="rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>Sign in</Link>
      </div>
    );
  }
  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center" style={{ background: C.bg, color: C.text }}>
        <h1 className="font-serif text-3xl font-light italic" style={{ color: C.gold }}>Not authorized</h1>
        <p style={{ color: C.muted }}>This area is restricted to Soul True administrators.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: C.bg, color: C.text, fontFamily: '"Outfit", sans-serif' }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Admin</p>
            <h1 className="mt-2 font-serif text-4xl font-light italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Promo Codes</h1>
          </div>
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Soul True</Link>
        </div>

        {/* Create */}
        <section className="rounded-none border p-6" style={{ borderColor: C.border, background: C.deep }}>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Create new code</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs" style={{ color: C.muted }}>Code (e.g. SOULTRUE2024)</label>
              <input type="text" value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                className="mt-1 w-full rounded-none border bg-transparent px-4 py-3 text-base outline-none"
                style={{ borderColor: `${C.gold}66`, color: C.text }} />
            </div>
            <div>
              <label className="text-xs" style={{ color: C.muted }}>Max uses (blank = unlimited)</label>
              <input type="number" min={1} value={maxUses} onChange={(e) => setMaxUses(e.target.value)}
                className="mt-1 w-full rounded-none border bg-transparent px-4 py-3 text-base outline-none"
                style={{ borderColor: `${C.gold}66`, color: C.text }} />
            </div>
            <div>
              <label className="text-xs" style={{ color: C.muted }}>Expires at (blank = never)</label>
              <input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)}
                className="mt-1 w-full rounded-none border bg-transparent px-4 py-3 text-base outline-none"
                style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
            </div>
            <div>
              <label className="text-xs" style={{ color: C.muted }}>Unlocks</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {READER_OPTIONS.map((o) => (
                  <button key={o.value} onClick={() => toggleUnlock(o.value)} type="button"
                    className="rounded-none border px-3 py-2 text-xs uppercase tracking-[0.2em]"
                    style={{
                      borderColor: unlocks.includes(o.value) ? C.gold : `${C.gold}40`,
                      color: unlocks.includes(o.value) ? C.text : C.muted,
                      background: unlocks.includes(o.value) ? "rgba(201,168,76,0.12)" : "transparent",
                    }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={create} disabled={creating || !newCode.trim() || unlocks.length === 0}
            className="mt-6 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
            {creating ? "Creating…" : "Create Code"}
          </button>
          {err && <p className="mt-3 text-sm" style={{ color: "#E8504C" }}>{err}</p>}
        </section>

        {/* List */}
        <section className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>Active codes</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ color: C.muted }}>
                <tr className="border-b" style={{ borderColor: C.border }}>
                  <th className="py-2 text-left">Code</th>
                  <th className="py-2 text-left">Unlocks</th>
                  <th className="py-2 text-left">Uses</th>
                  <th className="py-2 text-left">Expires</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((c) => (
                  <tr key={c.id} className="border-b" style={{ borderColor: "rgba(201,168,76,0.12)" }}>
                    <td className="py-3 font-mono" style={{ color: C.gold }}>{c.code}</td>
                    <td className="py-3">{c.unlocks.join(", ")}</td>
                    <td className="py-3">{c.uses_count}{c.max_uses ? ` / ${c.max_uses}` : ""}</td>
                    <td className="py-3">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : "—"}</td>
                    <td className="py-3" style={{ color: c.is_active ? "#5BC97D" : C.dim }}>{c.is_active ? "Active" : "Inactive"}</td>
                    <td className="py-3">
                      <button onClick={() => toggle(c)} className="text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline" style={{ color: C.gold }}>
                        {c.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
                {codes.length === 0 && (
                  <tr><td colSpan={6} className="py-6 text-center" style={{ color: C.dim }}>No codes yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Redemption log */}
        <section className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>Recent redemptions</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ color: C.muted }}>
                <tr className="border-b" style={{ borderColor: C.border }}>
                  <th className="py-2 text-left">When</th>
                  <th className="py-2 text-left">Code</th>
                  <th className="py-2 text-left">Reader</th>
                  <th className="py-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {reds.map((r) => (
                  <tr key={r.id} className="border-b" style={{ borderColor: "rgba(201,168,76,0.12)" }}>
                    <td className="py-3" style={{ color: C.muted }}>{new Date(r.redeemed_at).toLocaleString()}</td>
                    <td className="py-3 font-mono" style={{ color: C.gold }}>{r.code}</td>
                    <td className="py-3">{r.reader_slug}</td>
                    <td className="py-3" style={{ color: C.muted }}>{r.email ?? "—"}</td>
                  </tr>
                ))}
                {reds.length === 0 && (
                  <tr><td colSpan={4} className="py-6 text-center" style={{ color: C.dim }}>No redemptions yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
