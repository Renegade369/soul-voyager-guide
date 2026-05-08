import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/analytics";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { sendEmail } from "@/lib/email.functions";
import { welcomeEmail } from "@/lib/emailTemplates";

const C = { bg: "#0D0F0E", card: "#141917", inner: "#1C2420", border: "#2E3A35", teal: "#1D9E75", tealDark: "#0F6E56", gold: "#C9A84C", goldDark: "#8B6914", text: "#E8EDE9", muted: "#8A9E94", red: "#E24B4A" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif', label: '"Cinzel", serif' };

const COUNTRIES = ["United States","Canada","United Kingdom","Australia","India","Germany","France","Brazil","Mexico","Japan","Nigeria","South Africa","Philippines","Italy","Spain","Netherlands","Sweden","Norway","Denmark","New Zealand","Ireland","Singapore","UAE","Saudi Arabia","Other"];

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Soul True — Your Transformation Starts Here" }, { name: "description", content: "Join thousands using AI to design their most fulfilled life. Free access to the Soul True guide." }, { property: "og:title", content: "Soul True — Your Transformation Starts Here" }, { property: "og:description", content: "Join thousands using AI to design their most fulfilled life." }] }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", city: "", state: "", country: "United States", consent: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sendEmailFn = useServerFn(sendEmail);
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.city || !form.country) { setError("Please fill all required fields"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Please enter a valid email"); return; }
    if (!form.consent) { setError("Please agree to receive Soul True content"); return; }
    setLoading(true);
    try {
      const { error: dbErr } = await supabase.from("contacts").insert([{ first_name: form.firstName, last_name: form.lastName, email: form.email, phone: form.phone || null, city: form.city, state: form.state || null, country: form.country, marketing_consent: form.consent, consent_date: new Date().toISOString(), lead_source: "welcome_page" }]);
      if (dbErr) throw dbErr;
      trackLead(form.city, form.state, form.country);
      // Send welcome email
      sendEmailFn({ data: { to: form.email, subject: "Welcome to Soul True", html: welcomeEmail(form.firstName) } }).catch(e => console.error("Welcome email failed:", e));
      if (typeof window !== "undefined") localStorage.setItem("st_visited", "true");
      toast.success("Welcome to Soul True!");
      setTimeout(() => navigate({ to: "/guide" }), 1200);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const inputStyle = { backgroundColor: C.inner, color: C.text, border: `0.5px solid ${C.border}`, fontFamily: fonts.body };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12" style={{ backgroundColor: C.bg }}>
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-20 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${C.gold}30, transparent 70%)` }} />
        <div className="relative rounded-xl border p-8" style={{ backgroundColor: C.card, borderColor: C.border }}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ border: `1.5px solid ${C.gold}` }}>
            <Sparkles size={28} style={{ color: C.gold }} />
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>SOUL TRUE</p>
          <h1 className="mt-3 text-center text-3xl" style={{ fontFamily: fonts.display, color: C.text }}>Your Transformation Starts Here.</h1>
          <p className="mt-3 text-center text-xs leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted }}>Join thousands of people using AI to design their most fulfilled life. Get free access to the complete Soul True guide, exclusive content, and early access.</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["Free AI Life Guide", "Local content for your area", "Soul True center early access"].map((b) => (
              <span key={b} className="rounded-full px-3 py-1 text-[10px]" style={{ backgroundColor: `${C.teal}15`, color: C.teal, fontFamily: fonts.body }}>{b}</span>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="First name *" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle} />
              <input placeholder="Last name *" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
            <input type="email" placeholder="Email *" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="City *" value={form.city} onChange={(e) => set("city", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle} />
              <input placeholder="State/Province" value={form.state} onChange={(e) => set("state", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
            <select value={form.country} onChange={(e) => set("country", e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={inputStyle}>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: C.muted, fontFamily: fonts.body }}>
              <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5" />
              I agree to receive Soul True content, special offers, and updates. I can unsubscribe anytime.
            </label>
            {error && <p className="text-xs" style={{ color: C.red }}>{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-lg py-3 text-sm font-medium disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`, color: "#fff", fontFamily: fonts.body }}>
              {loading ? "…" : "Access the Free Guide →"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>
            Already a member? <a href="/guide" className="underline" style={{ color: C.text }}>Sign in</a> · <a href="/guide" className="underline" style={{ color: C.text }}>Skip for now</a>
          </p>
        </div>
      </div>
    </div>
  );
}
