import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send, Sparkles, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { askSiteAssistant, type SiteAssistantMessage } from "@/lib/site-assistant.functions";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  glow: "#E8821A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.4)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

type Mode = "chat" | "summarize";

const GREETING: SiteAssistantMessage = {
  role: "assistant",
  content:
    "Welcome to Soul True. I can guide you through our teachings, readings, and meditations — or summarize any text you'd like to share. *Let's Go Deeper.*",
};

export function SiteAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<SiteAssistantMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const ask = useServerFn(askSiteAssistant);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, mode]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    const next: SiteAssistantMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setSending(true);
    try {
      const res = await ask({ data: { messages: next, mode } });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went quiet on my end. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Soul True Guide"
          className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 px-4 py-3 transition-all hover:shadow-lg"
          style={{
            background: C.gold,
            color: C.bg,
            fontFamily: fonts.body,
            fontWeight: 600,
            letterSpacing: "0.1em",
            fontSize: 11,
            textTransform: "uppercase",
            boxShadow: `0 6px 24px rgba(232,130,26,0.35)`,
            borderRadius: 4,
          }}
        >
          <MessageCircle size={16} />
          Ask the Guide
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed z-[60] flex flex-col bottom-5 right-5 left-5 sm:left-auto sm:w-[400px] h-[78vh] sm:h-[600px] max-h-[90vh]"
          style={{
            background: C.bg,
            border: `1px solid ${C.gold}55`,
            color: C.text,
            fontFamily: fonts.body,
            boxShadow: `0 20px 60px rgba(0,0,0,0.6)`,
            borderRadius: 4,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: `${C.gold}33` }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
                <Sparkles size={10} className="inline mr-1 -mt-0.5" />
                Soul True Guide
              </p>
              <p className="text-xs" style={{ color: C.muted, fontFamily: fonts.display, fontStyle: "italic" }}>
                Let's Go Deeper.
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ color: C.muted }}>
              <X size={18} />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex border-b" style={{ borderColor: `${C.gold}22` }}>
            {(["chat", "summarize"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 text-[10px] uppercase tracking-[0.22em] inline-flex items-center justify-center gap-1.5"
                style={{
                  color: mode === m ? C.gold : C.muted,
                  borderBottom: mode === m ? `1px solid ${C.gold}` : "1px solid transparent",
                  background: mode === m ? `${C.gold}0a` : "transparent",
                }}
              >
                {m === "chat" ? <MessageCircle size={11} /> : <FileText size={11} />}
                {m === "chat" ? "Ask & Explore" : "Summarize"}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <Bubble key={i} message={m} />
            ))}
            {sending && (
              <div className="flex">
                <div className="px-3 py-2" style={{ background: `${C.gold}11`, border: `1px solid ${C.gold}33` }}>
                  <span className="inline-flex gap-1">
                    <Dot d={0} /><Dot d={150} /><Dot d={300} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t px-3 py-3" style={{ borderColor: `${C.gold}33` }}>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={mode === "summarize" ? 3 : 1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={
                  mode === "summarize"
                    ? "Paste text, a journal entry, or a transcript…"
                    : "Ask anything about Soul True…"
                }
                className="flex-1 resize-none px-3 py-2 text-sm outline-none"
                style={{
                  background: C.card,
                  color: C.text,
                  border: `1px solid ${C.gold}33`,
                  fontFamily: fonts.body,
                  maxHeight: 200,
                  borderRadius: 2,
                }}
              />
              <button
                onClick={send}
                disabled={sending || !input.trim()}
                aria-label="Send"
                className="px-3 py-2 disabled:opacity-40"
                style={{ background: C.gold, color: C.bg, borderRadius: 2 }}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-[10px]" style={{ color: C.dim }}>
              Educational & inspirational only. Not medical advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ message }: { message: SiteAssistantMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-3 py-2 text-sm"
          style={{ background: "rgba(245,240,232,0.08)", color: C.text, borderRadius: 2 }}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div
        className="max-w-[90%] px-3 py-2 text-sm"
        style={{
          background: `${C.gold}10`,
          border: `1px solid ${C.gold}33`,
          color: C.text,
          borderRadius: 2,
        }}
      >
        <div className="prose prose-sm prose-invert max-w-none [&_a]:text-[#C9A84C] [&_a]:underline [&_p]:my-1 [&_ul]:my-1 [&_strong]:text-[#C9A84C]">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function Dot({ d }: { d: number }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
      style={{ background: C.gold, animationDelay: `${d}ms` }}
    />
  );
}
