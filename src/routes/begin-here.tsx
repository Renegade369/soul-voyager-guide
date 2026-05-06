import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FlowerOfLife } from "../components/SacredGeometry";

export const Route = createFileRoute("/begin-here")({
  head: () => ({
    meta: [
      { title: "Begin Here — Sacred Journey" },
      { name: "description", content: "A warm, AI-guided conversation to discover your healing path — personalized recommendations based on where you are and where you want to go." },
      { property: "og:title", content: "Begin Here — Sacred Journey" },
      { property: "og:description", content: "A warm, AI-guided conversation to discover your healing path." },
    ],
  }),
  component: BeginHerePage,
});

const DISCLAIMER = "Sacred Journey is a holistic wellness and spiritual guidance platform. The information, resources, and guidance provided here are for educational and inspirational purposes only and do not constitute medical, psychological, or healthcare advice. Always consult your primary care physician or a qualified healthcare professional regarding any health concerns or before making any changes to your health regimen.";

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

  return (
    <div>
      {/* ─── HERO STATEMENT ─── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "#1C1B3A" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FlowerOfLife size={520} color="#D4AF64" opacity={0.11} strokeWidth={0.5} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
          <p
            className="text-[11px] font-light uppercase tracking-[0.28em]"
            style={{ color: "#D4AF64" }}
          >
            Begin Here
          </p>
          <div className="mt-10 space-y-6">
            <p
              className="font-serif text-2xl font-light leading-relaxed md:text-3xl"
              style={{ color: "#F8F5F0" }}
            >
              At the core of every struggle — every feeling of emptiness, lost purpose, burnout, addiction, or disconnection — is one fundamental truth:{" "}
              <em>we have drifted from our own souls.</em>
            </p>
            <p
              className="font-serif text-xl font-light leading-relaxed md:text-2xl"
              style={{ color: "rgba(248,245,240,0.85)" }}
            >
              This is not weakness. This is the human condition in the world we live in today.
            </p>
            <p
              className="font-serif text-xl font-light leading-relaxed md:text-2xl"
              style={{ color: "rgba(248,245,240,0.85)" }}
            >
              Reconnecting with who you truly are at soul level is not just a healing journey — it is the most important work of your lifetime. It is the reason you are here. And it is the root cause beneath every challenge you are facing.
            </p>
            <p
              className="font-serif text-2xl font-light italic leading-relaxed md:text-3xl"
              style={{ color: "#D4AF64" }}
            >
              Your soul is not something you find. It is where you truly live. It is home.
            </p>
            <p
              className="font-serif text-xl font-light leading-relaxed md:text-2xl"
              style={{ color: "rgba(248,245,240,0.85)" }}
            >
              Sacred Journey exists for one reason — to help you find your way back home.
            </p>
            <p
              className="font-serif text-2xl font-light italic leading-relaxed md:text-3xl"
              style={{ color: "#F8F5F0" }}
            >
              Everything changes when you do.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section style={{ backgroundColor: "#F8F5F0" }}>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <p
            className="text-center text-[11px] font-light leading-relaxed tracking-wide"
            style={{ color: "#5C5A7A" }}
          >
            {DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ─── CONVERSATIONAL INTAKE ─── */}
      <section style={{ backgroundColor: "#F8F5F0" }}>
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-8 md:pb-28">
          {!started ? (
            <div className="mx-auto max-w-xl py-12" style={{ borderTop: "0.5px solid rgba(28,27,58,0.12)", borderBottom: "0.5px solid rgba(28,27,58,0.12)" }}>
              <p className="text-center font-serif text-2xl font-light italic" style={{ color: "#1C1B3A" }}>
                A few minutes of presence.
              </p>
              <p className="mx-auto mt-4 max-w-md text-center text-sm font-light leading-relaxed" style={{ color: "#5C5A7A" }}>
                We'll ask you a handful of thoughtful questions about where you are and where you want to go.
                Then we'll weave together a personalized healing path — specific practices, resources,
                and daily steps matched to your unique journey.
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
          ) : (
            <>
              <h2 className="mb-8 text-center font-serif text-3xl font-light" style={{ color: "#1C1B3A" }}>
                Your Healing Path
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-center text-sm font-light" style={{ color: "#5C5A7A" }}>
                Take your time. There are no wrong answers — only what is true for you right now.
              </p>
              <div style={{ border: "0.5px solid rgba(28,27,58,0.12)" }}>
                <div
                  ref={scrollRef}
                  className="max-h-[60vh] min-h-[420px] space-y-5 overflow-y-auto px-5 py-6 md:px-8"
                  style={{ backgroundColor: "#FFFFFF" }}
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
                            : "max-w-[90%] px-4 py-3 text-sm font-light"
                        }
                        style={
                          m.role === "user"
                            ? { backgroundColor: "#1C1B3A", color: "#F8F5F0", borderRadius: "0.25rem" }
                            : { backgroundColor: "rgba(28,27,58,0.04)", color: "#1C1B3A", borderRadius: "0.25rem" }
                        }
                      >
                        {m.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-strong:font-normal prose-em:italic" style={{ color: "#1C1B3A" }}>
                            <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {streaming && (
                    <p className="text-center text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#5C5A7A" }}>
                      listening…
                    </p>
                  )}
                </div>

                {error && (
                  <p className="px-6 py-3 text-center text-xs font-light" style={{ color: "#c44", borderTop: "0.5px solid rgba(28,27,58,0.12)" }}>
                    {error}
                  </p>
                )}

                {!complete ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      send(input);
                    }}
                    className="flex items-end gap-3 p-4 md:p-5"
                    style={{ borderTop: "0.5px solid rgba(28,27,58,0.12)", backgroundColor: "#FFFFFF" }}
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
                      className="flex-1 resize-none px-3 py-2 text-sm font-light outline-none"
                      style={{ border: "0.5px solid rgba(28,27,58,0.15)", color: "#1C1B3A", backgroundColor: "#FFFFFF" }}
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
                    className="p-10 text-center"
                    style={{ backgroundColor: "#1C1B3A", color: "#F8F5F0", borderTop: "0.5px solid rgba(28,27,58,0.12)" }}
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

              {/* ─── BOTTOM DISCLAIMER (after healing path) ─── */}
              {complete && (
                <div className="mx-auto mt-10 max-w-3xl">
                  <p
                    className="text-center text-[11px] font-light leading-relaxed tracking-wide"
                    style={{ color: "#5C5A7A" }}
                  >
                    {DISCLAIMER}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
