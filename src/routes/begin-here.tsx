import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FlowerOfLife } from "../components/SacredGeometry";
import heroForest from "../assets/hero-begin-here-forest.jpg";

export const Route = createFileRoute("/begin-here")({
  head: () => ({
    meta: [
      { title: "Begin Here — Soul True" },
      { name: "description", content: "A warm, guided conversation to discover your path forward — personalized recommendations based on where you are and where you want to go." },
      { property: "og:title", content: "Begin Here — Soul True" },
      { property: "og:description", content: "A warm, guided conversation to discover your path forward." },
    ],
  }),
  component: BeginHerePage,
});

const DISCLAIMER = "Soul True is a holistic wellness and spiritual guidance platform. The information, resources, and guidance provided here are for educational and inspirational purposes only and do not constitute medical, psychological, or healthcare advice. Always consult your primary care physician or a qualified healthcare professional regarding any health concerns or before making any changes to your health regimen.";

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
      {/* ═══ FULL-BLEED HERO WITH FOREST IMAGE ═══ */}
      <section className="relative isolate overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* Background image */}
        <img
          src={heroForest}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.28) saturate(0.85)" }}
        />
        {/* Gradient overlays */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center 40%, rgba(20,23,22,0.2) 0%, rgba(20,23,22,0.7) 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(20,23,22,0.95))" }}
        />

        {/* Sacred geometry watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sacred-rotate-slow"
        >
          <FlowerOfLife size={650} color="#C9A84C" opacity={0.06} strokeWidth={0.35} />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center md:px-8 md:py-32">
          <p
            className="text-[11px] font-light uppercase tracking-[0.32em]"
            style={{ color: "#C9A84C" }}
          >
            Begin Here
          </p>

          {/* Mission statement — generous spacing, breathing typography */}
          <div className="mt-12 space-y-10 md:mt-16 md:space-y-12">
            <h1
              className="font-serif text-[1.65rem] font-light leading-[1.55] md:text-[2rem] lg:text-[2.25rem] lg:leading-[1.5]"
              style={{ color: "#F5F0E8" }}
            >
              At the core of every struggle — every feeling of emptiness, lost purpose, burnout, addiction, or disconnection — is one fundamental truth:{" "}
              <em className="italic" style={{ color: "#C9A84C" }}>we have drifted from our own souls.</em>
            </h1>

            <p
              className="font-serif text-lg font-light leading-[1.7] md:text-xl lg:text-[1.35rem]"
              style={{ color: "rgba(245,240,232,0.8)" }}
            >
              This is not weakness. This is the human condition in the world we live in today.
            </p>

            <p
              className="font-serif text-lg font-light leading-[1.7] md:text-xl lg:text-[1.35rem]"
              style={{ color: "rgba(245,240,232,0.8)" }}
            >
              Reconnecting with who you truly are at soul level is not just a remembrance journey — it is the most important work of your lifetime. It is the reason you are here. And it is the root cause beneath every challenge you are facing.
            </p>

            <p
              className="font-serif text-xl font-light italic leading-[1.6] md:text-2xl lg:text-[1.75rem]"
              style={{ color: "#C9A84C" }}
            >
              Your soul is not something you find. It is where you truly live. It is home.
            </p>

            <p
              className="font-serif text-lg font-light leading-[1.7] md:text-xl lg:text-[1.35rem]"
              style={{ color: "rgba(245,240,232,0.85)" }}
            >
              Soul True exists for one reason — to help you find your way back home.
            </p>

            <p
              className="font-serif text-xl font-light italic leading-[1.6] md:text-2xl lg:text-[1.75rem]"
              style={{ color: "#F5F0E8" }}
            >
              Everything changes when you do.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce md:mt-20">
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2 L10 22 M3 16 L10 23 L17 16" stroke="rgba(212,175,100,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ DISCLAIMER — subtle, separated ═══ */}
      <section style={{ backgroundColor: "#141716" }}>
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div style={{ borderTop: "0.5px solid rgba(212,175,100,0.15)", paddingTop: "24px" }}>
            <p
              className="text-center text-[10px] font-light leading-[1.8] tracking-wide"
              style={{ color: "rgba(245,240,232,0.4)" }}
            >
              {DISCLAIMER}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TRANSITION — invitation to converse ═══ */}
      <section style={{ backgroundColor: "#F5F0E8" }}>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          {!started ? (
            <>
              {/* Pre-conversation: invitation + prominent button */}
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <FlowerOfLife size={280} color="#141716" opacity={0.04} strokeWidth={0.5} />
                </div>

                <p
                  className="text-[11px] font-light uppercase tracking-[0.28em]"
                  style={{ color: "#C9A84C" }}
                >
                  Your Journey Begins
                </p>
                <h2
                  className="mt-8 font-serif text-3xl font-light italic leading-snug md:text-4xl lg:text-5xl"
                  style={{ color: "#141716" }}
                >
                  A few minutes of presence.
                </h2>
                <p
                  className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed md:text-lg"
                  style={{ color: "#8A9A8E" }}
                >
                  We'll ask you a handful of thoughtful questions about where you are and where you want to go.
                  Then we'll weave together a personalized path forward — specific practices, resources,
                  and daily steps matched to your unique journey.
                </p>

                {/* THE BUTTON — large, centered, impossible to miss */}
                <div className="mt-14">
                  <button
                    type="button"
                    onClick={startConversation}
                    className="group relative inline-block px-16 py-6 text-sm font-normal uppercase tracking-[0.3em] transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,100,0.4)]"
                    style={{
                      backgroundColor: "#C9A84C",
                      color: "#141716",
                      borderRadius: "0.25rem",
                      fontSize: "15px",
                    }}
                  >
                    Begin the Conversation
                  </button>
                  <p
                    className="mt-5 text-[11px] font-light uppercase tracking-[0.2em]"
                    style={{ color: "rgba(92,90,122,0.5)" }}
                  >
                    No account needed · Completely free · Takes 5–10 minutes
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Active conversation */}
              <h2
                className="mb-4 font-serif text-3xl font-light md:text-4xl"
                style={{ color: "#141716" }}
              >
                Your Path Forward
              </h2>
              <p
                className="mx-auto mb-10 max-w-xl text-sm font-light leading-relaxed"
                style={{ color: "#8A9A8E" }}
              >
                Take your time. There are no wrong answers — only what is true for you right now.
              </p>

              <div
                className="mx-auto max-w-2xl text-left"
                style={{ border: "0.5px solid rgba(20,23,22,0.12)", borderRadius: "0.25rem", overflow: "hidden" }}
              >
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
                            ? { backgroundColor: "#141716", color: "#F5F0E8", borderRadius: "0.25rem" }
                            : { backgroundColor: "rgba(20,23,22,0.04)", color: "#141716", borderRadius: "0.25rem" }
                        }
                      >
                        {m.role === "assistant" ? (
                          <div
                            className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-strong:font-normal prose-em:italic prose-a:text-[#141716] prose-a:underline prose-a:underline-offset-2"
                            style={{ color: "#141716" }}
                          >
                            <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {streaming && (
                    <p
                      className="text-center text-[11px] font-light uppercase tracking-[0.28em]"
                      style={{ color: "#8A9A8E" }}
                    >
                      listening…
                    </p>
                  )}
                </div>

                {error && (
                  <p
                    className="px-6 py-3 text-center text-xs font-light"
                    style={{ color: "#c44", borderTop: "0.5px solid rgba(20,23,22,0.12)" }}
                  >
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
                    style={{ borderTop: "0.5px solid rgba(20,23,22,0.12)", backgroundColor: "#FFFFFF" }}
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
                      className="flex-1 resize-none rounded px-3 py-2 text-sm font-light outline-none"
                      style={{ border: "0.5px solid rgba(20,23,22,0.15)", color: "#141716", backgroundColor: "#FFFFFF" }}
                      disabled={streaming}
                    />
                    <button
                      type="submit"
                      disabled={streaming || !input.trim()}
                      className="px-7 py-3 text-[11px] font-normal uppercase tracking-[0.22em] transition disabled:opacity-40"
                      style={{
                        backgroundColor: "#C9A84C",
                        color: "#141716",
                        borderRadius: "0.25rem",
                      }}
                    >
                      Send
                    </button>
                  </form>
                ) : (
                  <div
                    className="p-10 text-center"
                    style={{ backgroundColor: "#141716", color: "#F5F0E8" }}
                  >
                    <p className="font-serif text-2xl font-light italic">Your path forward has been revealed.</p>
                    <p
                      className="mt-4 text-[11px] font-light uppercase tracking-[0.22em]"
                      style={{ color: "rgba(245,240,232,0.7)" }}
                    >
                      Scroll up to review your personalized recommendations
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                      <a
                        href="/contact-william"
                        className="inline-block px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
                        style={{
                          border: "1px solid rgba(245,240,232,0.5)",
                          color: "#F5F0E8",
                          borderRadius: "0.25rem",
                        }}
                      >
                        Talk to William
                      </a>
                      <a
                        href="/services"
                        className="inline-block px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
                        style={{
                          backgroundColor: "#C9A84C",
                          color: "#141716",
                          borderRadius: "0.25rem",
                        }}
                      >
                        Explore Services
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom disclaimer after complete */}
              {complete && (
                <div className="mx-auto mt-10 max-w-2xl">
                  <div style={{ borderTop: "0.5px solid rgba(20,23,22,0.1)", paddingTop: "20px" }}>
                    <p
                      className="text-center text-[10px] font-light leading-[1.8] tracking-wide"
                      style={{ color: "rgba(92,90,122,0.5)" }}
                    >
                      {DISCLAIMER}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
