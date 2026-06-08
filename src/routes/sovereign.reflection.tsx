import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Send, Sparkles, Lock } from "lucide-react";
import {
  loadAssistantState,
  sendAssistantMessage,
  type AssistantMessage,
} from "@/lib/sovereign-assistant";
import { SOVEREIGN_MODULES } from "@/lib/sovereign-curriculum";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  goldAlt: "#D4A017",
  glow: "#E8821A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.4)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

type Search = { module?: string; exercise?: string };

export const Route = createFileRoute("/sovereign/reflection")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    module: typeof s.module === "string" ? s.module : undefined,
    exercise: typeof s.exercise === "string" ? s.exercise : undefined,
  }),
  head: () => ({ meta: [{ title: "AI Assistant — The Sovereignty Code" }] }),
  component: ReflectionPage,
});

const SUGGESTIONS_BY_MODULE: Record<string, string[]> = {
  awakening: [
    "What is the Matrix, exactly?",
    "How do I do the Witnessing Practice?",
    "What if I don't notice anything?",
    "I missed a day. What do I do?",
  ],
  stripping: [
    "What am I supposed to strip away?",
    "How do I know if a relationship is draining me?",
    "I feel resistance. Is that normal?",
  ],
  "your-voice-amplified": [
    "What is my voice, really?",
    "How do I share without performing?",
    "What if no one listens?",
  ],
  "your-brand-platform-built": [
    "Where do I start building?",
    "What platform makes sense for me?",
    "How do I stay aligned?",
  ],
  "your-income-activated": [
    "How do I price what I offer?",
    "What's an aligned offer?",
    "I feel afraid to charge. What now?",
  ],
  "your-freedom-protected": [
    "What is the Law of Witnessing?",
    "How do I write the Integration Letter?",
    "What stays after the program?",
  ],
};

function ReflectionPage() {
  const navigate = useNavigate();
  const { module: moduleParam, exercise: exerciseId } = Route.useSearch();
  const loadFn = useServerFn(loadAssistantState);
  const sendFn = useServerFn(sendAssistantMessage);

  const { data: state, refetch, isLoading } = useQuery({
    queryKey: ["assistant-state"],
    queryFn: () => loadFn(),
  });

  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [forceEscalate, setForceEscalate] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state?.gate === "ok" && state.thread) setMessages(state.thread.messages);
  }, [state]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const activeModuleSlug = moduleParam ?? state?.thread?.module_slug ?? "awakening";
  const activeModule = SOVEREIGN_MODULES.find((m) => m.slug === activeModuleSlug);
  const suggestions = SUGGESTIONS_BY_MODULE[activeModuleSlug] ?? SUGGESTIONS_BY_MODULE.awakening;

  const handleSend = useCallback(
    async (text?: string) => {
      const question = (text ?? input).trim();
      if (!question || sending) return;
      setInput("");
      setSending(true);
      const optimistic: AssistantMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
        timestamp: new Date().toISOString(),
      };
      setMessages((m) => [...m, optimistic]);
      try {
        const result = await sendFn({
          data: { question, moduleSlug: activeModuleSlug, forceEscalate },
        });
        setMessages((m) => [...m, result.assistantMsg]);
        setForceEscalate(false);
      } catch (e) {
        console.error(e);
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Something went wrong sending that. Please try again.",
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [input, sending, sendFn, activeModuleSlug, forceEscalate]
  );

  if (isLoading || !state) {
    return (
      <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }} className="flex items-center justify-center">
        <p style={{ color: C.muted, fontFamily: fonts.body }}>Loading…</p>
      </div>
    );
  }

  if (state.gate === "not-enrolled") {
    return (
      <GateScreen
        title="The AI Assistant is for Sovereignty Code members."
        body="Join The Sovereignty Code to access the 120-day AI Assistant and direct line to William."
        cta={{ label: "Explore the program", to: "/sovereign" }}
      />
    );
  }

  if (state.gate === "graduated") {
    return (
      <GateScreen
        title="Your 120 days are complete."
        body="The chat surface closes at day 120, but you don't. Your Sovereignty Plan and Sovereignty Call are waiting. Reach out anytime."
        cta={{ label: "Open the graduation portal", to: "/sovereign/portal/dashboard" }}
      />
    );
  }


  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }} className="flex flex-col">
      {/* Top bar */}
      <header className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link to="/sovereign/portal/dashboard" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>
            <ArrowLeft size={14} /> Portal
          </Link>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>AI Assistant</p>
            <p className="text-xs" style={{ color: C.muted }}>{state.daysRemaining} days remaining</p>
          </div>
        </div>
      </header>

      {/* Thread */}
      <main className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="mx-auto max-w-3xl px-6 py-8">
          {activeModule && (
            <p className="text-[11px] uppercase tracking-[0.32em] mb-6" style={{ color: C.gold }}>
              In {activeModule.title} — tone: {activeModule.companionTone.split(" — ")[0]}
            </p>
          )}

          {messages.length === 0 && (
            <div className="space-y-6">
              <div className="p-6" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}>
                <p className="text-base font-light leading-relaxed" style={{ color: C.text }}>
                  I'm here to support you through the 120-day program. Ask me anything about the modules, the exercises, or the practices. If I can't help, I'll loop William in.
                </p>
                <p className="mt-4 italic text-sm" style={{ color: C.gold, fontFamily: fonts.display }}>
                  Let's Go Deeper.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-5 mt-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {sending && (
              <div className="flex">
                <div className="px-5 py-3" style={{ background: `${C.gold}11`, border: `1px solid ${C.gold}33` }}>
                  <span className="inline-flex gap-1">
                    <Dot delay={0} /><Dot delay={150} /><Dot delay={300} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Suggestions + Composer */}
      <footer className="border-t" style={{ borderColor: "rgba(201,168,76,0.2)", background: C.bg }}>
        <div className="mx-auto max-w-3xl px-6 py-4">
          {!input && messages.length < 6 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-xs px-3 py-1.5 transition-colors"
                  style={{ border: `1px solid ${C.gold}55`, color: C.muted, background: "transparent" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about the program…"
              rows={1}
              className="flex-1 resize-none px-4 py-3 text-base outline-none"
              style={{
                background: C.card,
                color: C.text,
                border: `1px solid ${forceEscalate ? C.gold : "rgba(201,168,76,0.25)"}`,
                fontFamily: fonts.body,
                minHeight: 48,
                maxHeight: 200,
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={sending || !input.trim()}
              className="px-4 py-3 disabled:opacity-50"
              style={{ background: C.gold, color: C.bg }}
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] cursor-pointer" style={{ color: forceEscalate ? C.gold : C.muted }}>
              <input
                type="checkbox"
                checked={forceEscalate}
                onChange={(e) => setForceEscalate(e.target.checked)}
                className="accent-[#C9A84C]"
              />
              Talk to William instead
            </label>
            <p className="text-[10px]" style={{ color: C.dim }}>Enter to send · Shift+Enter for newline</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MessageBubble({ message }: { message: AssistantMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] px-4 py-3" style={{ background: "rgba(245,240,232,0.08)", color: C.text }}>
          <p className="text-base font-light whitespace-pre-line">{message.content}</p>
        </div>
      </div>
    );
  }
  if (message.role === "william") {
    return (
      <div className="flex">
        <div className="max-w-[88%] px-5 py-4" style={{ background: C.card, border: `2px solid ${C.gold}` }}>
          <p className="text-[10px] uppercase tracking-[0.32em] mb-2" style={{ color: C.gold, fontFamily: fonts.display, fontStyle: "italic", letterSpacing: "0.2em" }}>
            William replied
          </p>
          <p className="text-base font-light whitespace-pre-line" style={{ color: C.text }}>{message.content}</p>
        </div>
      </div>
    );
  }
  // assistant
  return (
    <div className="flex">
      <div className="max-w-[88%] px-5 py-4" style={{ background: `${C.gold}10`, border: `1px solid ${C.gold}33` }}>
        <p className="text-[10px] uppercase tracking-[0.32em] mb-2 inline-flex items-center gap-1" style={{ color: C.gold }}>
          <Sparkles size={10} /> AI
        </p>
        <p className="text-base font-light whitespace-pre-line" style={{ color: C.text }}>{message.content}</p>
        {message.escalated && (
          <p className="mt-3 text-xs italic" style={{ color: C.glow, fontFamily: fonts.display }}>
            William has been looped in. He'll reply within 24 hours.
          </p>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
      style={{ background: C.gold, animationDelay: `${delay}ms` }}
    />
  );
}

function GateScreen({ title, body, cta }: { title: string; body: string; cta: { label: string; to: string } }) {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: fonts.body }} className="flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 inline-flex items-center justify-center w-14 h-14" style={{ background: C.card, border: `1px solid ${C.gold}55` }}>
          <Lock size={20} style={{ color: C.gold }} />
        </div>
        <h1 className="text-3xl font-light mb-4" style={{ fontFamily: fonts.display }}>{title}</h1>
        <p className="text-base font-light mb-8" style={{ color: C.muted }}>{body}</p>
        <Link to={cta.to} className="inline-block px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ background: C.gold, color: C.bg }}>
          {cta.label}
        </Link>
        <p className="mt-8 italic text-sm" style={{ color: C.gold, fontFamily: fonts.display }}>Let's Go Deeper.</p>
      </div>
    </div>
  );
}
