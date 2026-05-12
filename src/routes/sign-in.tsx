import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — Soul True" },
      { name: "description", content: "Sign in to save your readings on Soul True." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/my-readings` : undefined },
      });
      if (error) throw error;
      setSent(true);
      toast.success("Check your inbox for the sign-in link.", {
        style: { background: "#1A1209", border: "1px solid #C9A84C", color: "#F5F0E8" },
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send link.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: typeof window !== "undefined" ? `${window.location.origin}/my-readings` : undefined },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ background: "#0A0A0A", color: "#F5F0E8" }}>
      <div className="w-full max-w-md rounded-none border p-10" style={{ borderColor: "rgba(201,168,76,0.3)", background: "#1A1209" }}>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Sign In</p>
        <h1 className="mt-3 font-serif text-3xl italic" style={{ color: "#E8C87A" }}>Return to your readings.</h1>
        <p className="mt-3 text-sm" style={{ color: "rgba(245,240,232,0.7)" }}>
          Sign in with a magic link — no password needed.
        </p>

        {sent ? (
          <p className="mt-8 text-sm italic" style={{ color: "#E8C87A" }}>
            ✦ Link sent to {email}. Check your inbox.
          </p>
        ) : (
          <>
            <form onSubmit={sendMagicLink} className="mt-6 flex flex-col gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                className="rounded-none border px-4 py-3 text-sm outline-none"
                style={{ background: "#0A0A0A", borderColor: "rgba(201,168,76,0.3)", color: "#F5F0E8" }} />
              <button type="submit" disabled={busy}
                className="rounded-none px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
                style={{ background: "#C9A84C", color: "#0A0A0A" }}>
                {busy ? "Sending…" : "Send Magic Link"}
              </button>
            </form>
            <div className="my-5 text-center text-xs" style={{ color: "rgba(245,240,232,0.5)" }}>or</div>
            <button onClick={google}
              className="w-full rounded-none border px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: "#C9A84C", color: "#C9A84C" }}>
              Continue with Google
            </button>
          </>
        )}
        <p className="mt-8 text-center text-xs" style={{ color: "rgba(245,240,232,0.4)" }}>
          <Link to="/" style={{ color: "#C9A84C" }}>← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
