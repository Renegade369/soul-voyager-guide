import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function EmailCapture({
  source,
  label = "Free aura reading + weekly soul insights",
  placeholder = "your@email.com",
  cta = "Begin →",
  variant = "inline",
}: {
  source: string;
  label?: string;
  placeholder?: string;
  cta?: string;
  variant?: "inline" | "card";
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setBusy(true);
    try {
      // Upsert subscriber
      await supabase.from("subscribers").insert({ email: email.toLowerCase(), source }).then((r) => {
        // ignore unique-violation
        if (r.error && !r.error.message.includes("duplicate")) throw r.error;
      });
      // Trigger welcome (non-blocking)
      supabase.functions.invoke("send-welcome-email", { body: { email, source } }).catch(() => {});
      setDone(true);
      toast.success("You're in — check your inbox.", {
        style: { background: "#1A1209", border: "1px solid #C9A84C", color: "#F5F0E8" },
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not subscribe.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <p className="text-sm italic" style={{ color: "#E8C87A" }}>You're in — check your inbox. ✦</p>
    );
  }

  if (variant === "card") {
    return (
      <form onSubmit={submit} className="rounded-none border p-6"
        style={{ borderColor: "rgba(201,168,76,0.3)", background: "#1A1209" }}>
        <p className="font-serif text-lg" style={{ color: "#F5F0E8" }}>{label}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder}
            className="flex-1 rounded-none border px-4 py-3 text-sm outline-none"
            style={{ background: "#0A0A0A", borderColor: "rgba(201,168,76,0.3)", color: "#F5F0E8" }} required />
          <button type="submit" disabled={busy}
            className="rounded-none px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
            style={{ background: "#C9A84C", color: "#0A0A0A" }}>
            {busy ? "Sending…" : cta}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md">
      <p className="mb-3 text-center text-xs" style={{ color: "rgba(245,240,232,0.6)" }}>{label}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder}
          className="flex-1 rounded-none border px-4 py-3 text-sm outline-none"
          style={{ background: "transparent", borderColor: "rgba(201,168,76,0.3)", color: "#F5F0E8" }} required />
        <button type="submit" disabled={busy}
          className="rounded-none px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
          style={{ background: "#C9A84C", color: "#0A0A0A" }}>
          {busy ? "…" : cta}
        </button>
      </div>
    </form>
  );
}
