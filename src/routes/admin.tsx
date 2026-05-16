import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Soul True" },
      { name: "description", content: "Soul True admin dashboard." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const C = { bg: "#0D0F0E", card: "#141716", border: "#1E2320", gold: "#C9A84C", goldLight: "#E8C87A", teal: "#C9A84C", text: "#F5F0E8", muted: "#8A9A8E" };
const heading = { fontFamily: '"Cormorant Garamond", serif', color: C.gold };
const body = { fontFamily: '"Outfit", sans-serif' };

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  preferred_date: string | null;
  modality: string;
  intention: string;
  status: string | null;
  created_at: string;
};

function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setIsAdmin(false); setBusy(false); return; }
    (async () => {
      // Admin check via attempted read on admin-only table
      const { data, error } = await supabase
        .from("nature_healing_bookings")
        .select("id, name, email, phone, preferred_date, modality, intention, status, created_at")
        .order("created_at", { ascending: false });
      if (error) {
        setIsAdmin(false);
        setErr(error.message);
      } else {
        setIsAdmin(true);
        setBookings((data ?? []) as Booking[]);
      }
      setBusy(false);
    })();
  }, [user]);

  if (loading || busy) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: C.bg }}>
        <p style={{ ...body, color: C.muted }}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4" style={{ backgroundColor: C.bg }}>
        <h1 className="text-3xl" style={heading}>Admin sign-in required</h1>
        <Link to="/dashboard" className="rounded px-5 py-2 text-xs uppercase tracking-[0.22em]" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.bg, fontFamily: body.fontFamily }}>Go to Sign In</Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center" style={{ backgroundColor: C.bg }}>
        <h1 className="text-3xl" style={heading}>Not authorized</h1>
        <p style={{ ...body, color: C.muted }}>This area is restricted to Soul True administrators.</p>
        <Link to="/" className="text-xs uppercase tracking-[0.22em]" style={{ color: C.teal, fontFamily: body.fontFamily }}>Return home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: C.bg }}>
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-end justify-between border-b pb-6" style={{ borderColor: C.border }}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ ...body, color: C.teal }}>Soul True</p>
            <h1 className="mt-1 text-4xl font-light italic" style={heading}>Admin</h1>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/admin-codes" className="text-[11px] uppercase tracking-[0.22em]" style={{ ...body, color: C.gold }}>Promo Codes →</Link>
            <button onClick={signOut} className="text-[11px] uppercase tracking-[0.22em]" style={{ ...body, color: C.muted }}>Sign out</button>
          </div>
        </header>

        <section>
          <h2 className="mb-4 text-2xl font-light" style={heading}>Nature Connection Bookings</h2>
          {err && <p className="mb-4 text-sm" style={{ ...body, color: C.muted }}>{err}</p>}
          {bookings.length === 0 ? (
            <p style={{ ...body, color: C.muted }}>No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto rounded border" style={{ borderColor: C.border, backgroundColor: C.card }}>
              <table className="w-full text-left text-sm" style={body}>
                <thead style={{ color: C.gold, borderBottom: `1px solid ${C.border}` }}>
                  <tr>
                    <th className="px-4 py-3 font-normal">Name</th>
                    <th className="px-4 py-3 font-normal">Email</th>
                    <th className="px-4 py-3 font-normal">Phone</th>
                    <th className="px-4 py-3 font-normal">Preferred Date</th>
                    <th className="px-4 py-3 font-normal">Status</th>
                    <th className="px-4 py-3 font-normal">Submitted</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.text }}>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderTop: `1px solid ${C.border}` }}>
                      <td className="px-4 py-3">{b.name}</td>
                      <td className="px-4 py-3">{b.email}</td>
                      <td className="px-4 py-3">{b.phone ?? "—"}</td>
                      <td className="px-4 py-3">{b.preferred_date ?? "—"}</td>
                      <td className="px-4 py-3" style={{ color: C.teal }}>{b.status ?? "new"}</td>
                      <td className="px-4 py-3" style={{ color: C.muted }}>{new Date(b.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
