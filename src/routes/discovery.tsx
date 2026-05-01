import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/discovery")({
  head: () =>
    makeRouteMeta({
      title: "Soul Discovery — Sacred Journey",
      description:
        "An AI-guided sacred conversation to discover where you are spiritually, physically and mentally — so William can serve you well.",
    }),
  component: DiscoveryPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const OPENING: Msg = {
  role: "assistant",
  content:
    "Welcome, soul. I'm here to listen on William's behalf, so we can understand where you are and how the sanctuary may best serve you. Before we begin — what name would you like me to call you?",
};

function DiscoveryPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([OPENING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [complete, setComplete] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discovery-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          name: name || null,
          email: email || null,
          messages: next,
        }),
      });

      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Something interrupted the conversation.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      let done = false;
      let foundComplete = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            if (parsed.sessionId && !sessionId) setSessionId(parsed.sessionId);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (typeof delta === "string") {
              assistant += delta;
              if (assistant.includes("[[DISCOVERY_COMPLETE]]")) foundComplete = true;
              const cleaned = assistant.replace("[[DISCOVERY_COMPLETE]]", "");
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: cleaned };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (foundComplete) setComplete(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  }

  if (!started) {
    return (
      <PageShell
        eyebrow="✦ Soul Discovery ✦"
        title="Begin Your Discovery"
        intro="A sacred, AI-guided conversation to gently get to know where you are — spiritually, physically, mentally — so William can discern how Sacred Journey may best serve your path."
      >
        <div className="mx-auto max-w-xl rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-8 shadow-[var(--shadow-glow)]">
          <p className="font-serif text-xl text-foreground">Before we begin</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Share a name and (optionally) an email so William may reach you afterwards. Your words are held in confidence.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">First name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="What shall I call you?"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email (optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="So William may follow up"
              />
            </div>
            <button
              type="button"
              disabled={!name.trim()}
              onClick={() => setStarted(true)}
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-90 disabled:opacity-50"
            >
              Enter the conversation
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow={`✦ In Conversation${name ? ` with ${name}` : ""} ✦`}
      title="Soul Discovery"
      intro="Take your time. There are no wrong answers — only what is true for you right now."
    >
      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <div
          ref={scrollRef}
          className="max-h-[60vh] min-h-[420px] space-y-5 overflow-y-auto px-5 py-6 md:px-8"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground"
                    : "max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-3 text-sm text-foreground"
                }
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-em:text-primary">
                    <ReactMarkdown>
                      {m.content || "…"}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </div>
          ))}
          {streaming && (
            <p className="text-center text-xs uppercase tracking-[0.3em] text-primary">
              listening…
            </p>
          )}
        </div>

        {error && (
          <p className="border-t border-border px-6 py-3 text-center text-xs text-destructive">
            {error}
          </p>
        )}

        {!complete ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-3 border-t border-border bg-background/60 p-4 md:p-5"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={2}
              maxLength={2000}
              placeholder="Speak from the heart…"
              className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={streaming}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-90 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        ) : (
          <div className="border-t border-border bg-[image:var(--gradient-warm)] p-6 text-center text-primary-foreground">
            <p className="font-serif text-xl">Your reflection has been received 🙏</p>
            <p className="mt-2 text-sm opacity-90">
              William has been notified and will reach out personally within 1–3 days.
            </p>
            <a
              href="/contact-william"
              className="mt-4 inline-block rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-background/90"
            >
              Send William a direct note
            </a>
          </div>
        )}
      </div>
    </PageShell>
  );
}
