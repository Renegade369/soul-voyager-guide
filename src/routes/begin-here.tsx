import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/begin-here")({
  head: () =>
    makeRouteMeta({
      title: "Begin Here — Sacred Journey",
      description:
        "A warm, AI-guided conversation to discover your healing path — personalized recommendations based on where you are and where you want to go.",
    }),
  component: BeginHerePage,
});

type Msg = { role: "user" | "assistant"; content: string };

function BeginHerePage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function startConversation() {
    setStarted(true);
    setStreaming(true);
    setError(null);

    const initial: Msg[] = [];
    setMessages([{ role: "assistant", content: "" }]);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/begin-here-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: initial }),
      });

      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Something interrupted the conversation.");
      }

      await processStream(resp.body, initial);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMessages([]);
      setStarted(false);
    } finally {
      setStreaming(false);
    }
  }

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/begin-here-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Something interrupted the conversation.");
      }

      await processStream(resp.body, next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  }

  async function processStream(body: ReadableStream<Uint8Array>, prior: Msg[]) {
    const reader = body.getReader();
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
          const delta = parsed.choices?.[0]?.delta?.content;
          if (typeof delta === "string") {
            assistant += delta;
            if (assistant.includes("[[INTAKE_COMPLETE]]")) foundComplete = true;
            const cleaned = assistant.replace("[[INTAKE_COMPLETE]]", "");
            setMessages(() => {
              return [...prior, { role: "assistant", content: cleaned }];
            });
          }
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    if (foundComplete) setComplete(true);
  }

  if (!started) {
    return (
      <PageShell
        eyebrow="Begin Here"
        title="Your Healing Path Starts Now"
        intro="A sacred, guided conversation to understand where you are — and illuminate the path forward. No forms, no checkboxes — just an honest exchange, soul to soul."
      >
        <div className="mx-auto max-w-xl border-y border-border py-12">
          <p className="text-center font-serif text-2xl font-light italic text-foreground">
            A few minutes of presence.
          </p>
          <p className="mx-auto mt-4 max-w-md text-center text-sm font-light leading-relaxed text-muted-foreground">
            We'll ask you a handful of thoughtful questions about where you are and where you want to go.
            Then we'll weave together a personalized healing path — specific practices, ceremonies,
            and resources matched to your unique journey.
          </p>
          <button
            type="button"
            onClick={startConversation}
            className="mt-10 w-full px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
            style={{
              backgroundColor: "#D4AF64",
              color: "#1C1B3A",
              borderRadius: "0.25rem",
            }}
          >
            Begin the Conversation
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Begin Here"
      title="Your Healing Path"
      intro="Take your time. There are no wrong answers — only what is true for you right now."
    >
      <div className="border border-border bg-card">
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
                    ? "max-w-[85%] px-4 py-3 text-sm font-light"
                    : "max-w-[90%] border border-border bg-background px-4 py-3 text-sm font-light text-foreground"
                }
                style={
                  m.role === "user"
                    ? { backgroundColor: "#1C1B3A", color: "#F8F5F0" }
                    : undefined
                }
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-strong:font-normal prose-li:text-foreground prose-em:italic prose-em:text-foreground">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </div>
          ))}
          {streaming && (
            <p className="text-center text-[11px] font-light uppercase tracking-[0.28em] text-muted-foreground">
              listening…
            </p>
          )}
        </div>

        {error && (
          <p className="border-t border-border px-6 py-3 text-center text-xs font-light text-destructive">
            {error}
          </p>
        )}

        {!complete ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-3 border-t border-border bg-background p-4 md:p-5"
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
              className="flex-1 resize-none border border-border bg-background px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground"
              disabled={streaming}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="px-7 py-3 text-[11px] font-normal uppercase tracking-[0.22em] transition disabled:opacity-40"
              style={{
                backgroundColor: "#D4AF64",
                color: "#1C1B3A",
                borderRadius: "0.25rem",
              }}
            >
              Send
            </button>
          </form>
        ) : (
          <div
            className="border-t border-border p-10 text-center"
            style={{ backgroundColor: "#1C1B3A", color: "#F8F5F0" }}
          >
            <p className="font-serif text-2xl font-light italic">Your healing path has been revealed.</p>
            <p
              className="mt-4 text-[11px] font-light uppercase tracking-[0.22em]"
              style={{ color: "rgba(248,245,240,0.7)" }}
            >
              Scroll up to review your personalized recommendations
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact-william"
                className="inline-block px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
                style={{
                  border: "1px solid #F8F5F0",
                  color: "#F8F5F0",
                  borderRadius: "0.25rem",
                }}
              >
                Talk to William
              </a>
              <a
                href="/services"
                className="inline-block px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
                style={{
                  backgroundColor: "#D4AF64",
                  color: "#1C1B3A",
                  borderRadius: "0.25rem",
                }}
              >
                Explore Services
              </a>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
