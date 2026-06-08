import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToJournal } from "@/lib/subscribe.functions";

export function SubscribeForm({ source = "manual", compact = false }: { source?: string; compact?: boolean }) {
  const subscribe = useServerFn(subscribeToJournal);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await subscribe({ data: { email, name: name || undefined, source } });
      setStatus("ok");
      setMsg(res.alreadySubscribed
        ? "You're already on the list — see you on the 1st."
        : "You're in. See you in your inbox on the 1st.");
      setEmail("");
      setName("");
    } catch (err: any) {
      setStatus("error");
      setMsg(err?.message ?? "Something went wrong. Try again.");
    }
  }

  if (status === "ok") {
    return (
      <p
        className="text-center font-serif text-lg italic"
        style={{ color: "#C9A84C" }}
      >
        {msg}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex flex-col gap-3 sm:flex-row" : "mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"}>
      {!compact && (
        <input
          type="text"
          placeholder="First name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-none border bg-transparent px-4 py-3 text-sm placeholder:text-[rgba(245,240,232,0.4)]"
          style={{ borderColor: "rgba(201,168,76,0.35)", color: "#F5F0E8" }}
        />
      )}
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-none border bg-transparent px-4 py-3 text-sm placeholder:text-[rgba(245,240,232,0.4)]"
        style={{ borderColor: "rgba(201,168,76,0.35)", color: "#F5F0E8" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em] disabled:opacity-50"
        style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)" }}
      >
        {status === "loading" ? "Joining…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs" style={{ color: "#E8821A" }}>{msg}</p>
      )}
    </form>
  );
}
