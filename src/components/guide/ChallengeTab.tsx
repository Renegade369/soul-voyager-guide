import { useState, useEffect, useCallback } from "react";
import { Trophy, ChevronDown, Check, Award, BarChart2, Edit } from "lucide-react";
import { C, fonts, Emblem, Eyebrow, HeroTitle, GoldText } from "./GuideShared";
import { trackPageEnter, trackDayToggle, trackTestSubmit, trackCertificate, trackCTA } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

/* ───── challenge data ───── */
const DAYS = [
  { day: 1, cat: "MIND", color: `${C.teal}25`, title: "Have your first real conversation with AI", tool: "Claude (claude.ai)", prompt: `"Hi, my name is [name]. I'm [age] and I work in [field]. One thing I really want to change about my life is [X]. Where would you suggest I start?"` },
  { day: 2, cat: "SPIRIT", color: `${C.gold}25`, title: "Do a 5-year vision dump", tool: "Claude (claude.ai)", prompt: `"I'm going to describe my ideal life 5 years from now with zero filters: [let it all out]. Organize this into a vision across all four pillars and tell me my 3 biggest gaps."` },
  { day: 3, cat: "BODY", color: "#3B82F620", title: "Build a personalized wellness plan", tool: "Claude (claude.ai)", prompt: `"Here's my honest health situation: [share everything]. My schedule looks like [describe]. Build me a 30-day wellness plan a real human being can actually follow."` },
  { day: 4, cat: "MIND", color: `${C.teal}25`, title: "Do a beliefs audit on money", tool: "Claude (claude.ai)", prompt: `"Here's what I was taught about money growing up: [share]. Here's how I feel about it today: [share]. What limiting beliefs are running in the background — and what should replace each one?"` },
  { day: 5, cat: "AI EXPLORE", color: "#8B5CF620", title: "Create something with AI just for fun", tool: "Suno.com, Canva.com, or Claude", prompt: `"Write me a vivid 3-paragraph story where I am the hero living my dream life 5 years from now. Here's what that looks like: [describe it]. Make it feel absolutely real."` },
  { day: 6, cat: "WORK", color: `${C.amber}25`, title: "Map your gifts and income possibilities", tool: "Claude (claude.ai)", prompt: `"Here are all the things I'm good at: [share everything]. What are 5 realistic ways I could generate meaningful income in today's AI-driven economy rooted in these specific gifts?"` },
  { day: 7, cat: "MIND", color: `${C.teal}25`, title: "Use AI to solve your biggest current problem", tool: "Claude (claude.ai)", prompt: `"Here is the problem taking up the most space in my life right now: [describe fully]. Here's what I've tried: [share]. Give me a clear, specific path forward — real steps I can take this week."` },
  { day: 8, cat: "BODY", color: "#3B82F620", title: "Design your ideal daily routine", tool: "Claude (claude.ai)", prompt: `"My current daily routine honestly looks like this: [describe]. I want my days to feel [describe]. Build me a morning and evening routine starting from where I am, not where I wish I was."` },
  { day: 9, cat: "SPIRIT", color: `${C.gold}25`, title: "Connect with your spiritual purpose", tool: "Claude (claude.ai)", prompt: `"Here's what I feel I might be here to do: [share]. What breaks my heart about the world: [share]. What lights me up: [share]. Reflect my purpose back to me and give me one daily practice to stay connected to it."` },
  { day: 10, cat: "ALL PILLARS", color: `${C.gold}25`, title: "Build your 90-day Soul True blueprint", tool: "Claude + Notion (notion.so)", prompt: `"Using everything I've shared over the past 10 days — build me a personalized 90-day Soul True blueprint with specific weekly actions across my physical, mental/emotional, spiritual, and work/wealth pillars. Ambitious but achievable."` },
];

const QUESTIONS = [
  { q: "How many hours does the average person spend working in their lifetime?", opts: ["40,000", "90,000", "120,000", "60,000"], correct: 1 },
  { q: "What is the primary role of AI in your Soul True transformation journey?", opts: ["To make decisions for you", "To replace human connection", "To be a thinking partner that amplifies your clarity and action", "To choose your career path"], correct: 2 },
  { q: "How many jobs are projected to be displaced by AI and automation by 2030?", opts: ["10 million", "85 million", "200 million", "5 million"], correct: 1 },
  { q: "Which type of work carries the LOWEST displacement risk?", opts: ["Manufacturing and assembly", "Data entry and administration", "Customer service", "Purpose-driven and deeply human work"], correct: 3 },
  { q: "What are the four pillars of a fulfilled life according to Soul True?", opts: ["Health, money, fame, and family", "Physical, mental/emotional, spiritual, and work/wealth/purpose", "Career, fitness, relationships, and hobbies", "Mind, body, spirit, and social"], correct: 1 },
  { q: "What is the Soul True resource rule?", opts: ["Recommend premium first", "Lead with the free version — growth should be accessible to everyone", "Only recommend paid services", "Suggest the most popular option"], correct: 1 },
  { q: "What most determines whether someone thrives in the AI revolution?", opts: ["A technology degree", "Being young enough to learn", "Adaptability — the willingness to learn and move with change", "Having significant financial resources"], correct: 2 },
  { q: "How often should you do a status report check-in with Claude?", opts: ["Monthly", "Daily", "Every Sunday — weekly", "Once at the end of 90 days"], correct: 2 },
  { q: "What makes work fulfilling beyond income?", opts: ["A high status title", "Working fewest hours", "Work that engages your unique gifts and aligns with deeper purpose", "Working for a well-known company"], correct: 2 },
  { q: "What is the final step of the Soul True Dream Life Blueprint?", opts: ["Posting goals on social media", "Hiring a coach immediately", "Building a 90-day bridge plan with weekly AI status reports", "Quitting your job"], correct: 2 },
];

type Screen = "challenge" | "test" | "report" | "certificate";

export function ChallengeTab() {
  const { user } = useAuth();
  const [screen, setScreen] = useState<Screen>("challenge");
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [certName, setCertName] = useState("");
  const [certDate, setCertDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [attemptNumber, setAttemptNumber] = useState(1);

  useEffect(() => { trackPageEnter("challenge"); }, []);

  // Load data
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      supabase.from("challenge_progress").select("day_number, completed").eq("user_id", user.id),
      supabase.from("test_results").select("attempt_number").eq("user_id", user.id).order("attempt_number", { ascending: false }).limit(1),
      supabase.from("certificates").select("full_name, issued_at").eq("user_id", user.id).maybeSingle(),
    ]).then(([progress, tests, cert]) => {
      if (progress.data) {
        setCompleted(new Set(progress.data.filter((d) => d.completed).map((d) => d.day_number)));
      }
      if (tests.data?.[0]) setAttemptNumber((tests.data[0].attempt_number ?? 0) + 1);
      if (cert.data) {
        setCertName(cert.data.full_name);
        setCertDate(cert.data.issued_at ?? "");
      }
      setLoading(false);
    });
  }, [user]);

  const toggleDay = useCallback(async (day: number) => {
    const newDone = !completed.has(day);
    const next = new Set(completed);
    if (newDone) next.add(day); else next.delete(day);
    setCompleted(next);
    trackDayToggle(day, newDone);

    if (!user) {
      toast.info("Sign in to save your progress permanently");
      return;
    }

    try {
      const { error } = await supabase.from("challenge_progress").upsert(
        { user_id: user.id, day_number: day, completed: newDone, completed_at: newDone ? new Date().toISOString() : null },
        { onConflict: "user_id,day_number" }
      );
      if (error) throw error;
      toast.success("Progress saved ✓");
      if (next.size === 10) {
        await supabase.from("profiles").update({ challenge_completed_at: new Date().toISOString() }).eq("id", user.id);
      }
    } catch {
      // revert
      const rev = new Set(completed);
      if (newDone) rev.delete(day); else rev.add(day);
      setCompleted(rev);
      toast.error("Error saving — please try again");
    }
  }, [completed, user]);

  const submitTest = async () => {
    if (answers.some((a) => a === null)) { toast.error("Please answer all 10 questions"); return; }
    const correct = answers.reduce<number>((acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0), 0);
    const pct = correct * 10;
    const pass = pct >= 70;
    setScore(pct);
    setSubmitted(true);

    if (user) {
      await supabase.from("test_results").insert([{ user_id: user.id, attempt_number: attemptNumber, score: correct, percentage: pct, passed: pass, answers: answers as unknown as import("@/integrations/supabase/types").Json }]);
    }
    trackTestSubmit(pct, pass, attemptNumber);
  };

  const allDone = completed.size === 10;
  const passed = score >= 70;
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";

  const saveCert = async () => {
    if (!user || !certName.trim()) return;
    try {
      await supabase.from("certificates").upsert(
        { user_id: user.id, full_name: certName, score, issued_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
      await supabase.from("profiles").update({ certificate_earned_at: new Date().toISOString() }).eq("id", user.id);
      trackCertificate(score);
      toast.success("Certificate saved to your account ✓");
    } catch {
      toast.error("Error saving certificate");
    }
  };

  /* ─── CHALLENGE SCREEN ─── */
  if (screen === "challenge") {
    return (
      <div style={{ color: C.text }}>
        <div className="py-16 text-center">
          <Emblem icon={<Trophy size={32} />} />
          <Eyebrow>10-Day Challenge</Eyebrow>
          <HeroTitle>10 Days. 10 Tasks. <GoldText>One New Life.</GoldText></HeroTitle>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 rounded-xl border p-5 text-center" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <p className="text-sm" style={{ fontFamily: fonts.body, color: C.muted }}>Complete all 10 days. Pass the test. Earn your certificate. Each task is 10–20 minutes.</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-sm" style={{ fontFamily: fonts.body }}>
              <span style={{ color: C.muted }}>Progress</span>
              <span style={{ color: C.text }}>{completed.size}/10</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full" style={{ backgroundColor: C.inner }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${completed.size * 10}%`, background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal})` }} />
            </div>
          </div>

          {/* Days */}
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl" style={{ backgroundColor: C.card }} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {DAYS.map((d) => {
                const done = completed.has(d.day);
                const isOpen = expanded === d.day;
                return (
                  <div key={d.day} className="rounded-xl border transition-colors" style={{ backgroundColor: C.card, borderColor: done ? C.teal : C.border }}>
                    <button className="flex w-full items-center gap-4 p-4 text-left" onClick={() => setExpanded(isOpen ? null : d.day)}>
                      <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-200"
                        style={{
                          backgroundColor: done ? C.teal : C.inner,
                          color: done ? "#fff" : C.muted,
                          fontFamily: fonts.body,
                          transform: done ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {done ? <Check size={16} /> : d.day}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ fontFamily: fonts.body, color: C.text }}>Day {d.day} — {d.title}</span>
                        </div>
                        <span className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px]" style={{ backgroundColor: d.color, color: C.text, fontFamily: fonts.body }}>{d.cat}</span>
                      </div>
                      <ChevronDown size={18} style={{ color: C.dim, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms" }} />
                    </button>
                    {isOpen && (
                      <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: C.border }}>
                        <p className="mb-2 text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>Tool: {d.tool}</p>
                        <div className="mb-4 rounded-lg border-l-2 p-3" style={{ borderLeftColor: C.gold, backgroundColor: `${C.gold}08` }}>
                          <p className="text-sm italic" style={{ fontFamily: fonts.body, color: C.text, fontWeight: 300 }}>{d.prompt}</p>
                        </div>
                        <button
                          onClick={() => toggleDay(d.day)}
                          className="rounded-md px-4 py-2 text-xs font-medium"
                          style={{
                            backgroundColor: done ? `${C.teal}20` : C.inner,
                            color: done ? C.teal : C.text,
                            fontFamily: fonts.body,
                          }}
                        >
                          {done ? "✓ Completed — Undo?" : "Mark Complete"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Unlock */}
          <div className="mt-8 text-center">
            <button
              disabled={!allDone}
              onClick={() => setScreen("test")}
              className="rounded-lg px-8 py-3 text-sm font-medium transition-opacity disabled:opacity-40"
              style={{
                background: allDone ? `linear-gradient(135deg, ${C.goldDark}, ${C.gold})` : C.inner,
                color: allDone ? C.bg : C.dim,
                fontFamily: fonts.body,
              }}
            >
              {allDone ? "Take the Final Test — Earn Your Certificate →" : `Complete all 10 days to unlock (${completed.size}/10)`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── TEST SCREEN ─── */
  if (screen === "test") {
    return (
      <div style={{ color: C.text }}>
        <div className="py-16 text-center">
          <Emblem icon={<Edit size={32} />} />
          <Eyebrow>Final Test</Eyebrow>
          <HeroTitle>Prove What You <GoldText>Know.</GoldText></HeroTitle>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-xl border p-4 text-center" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <p className="text-sm" style={{ fontFamily: fonts.body, color: C.muted }}>10 questions. 70% to pass. Retake available if needed.</p>
          </div>
          <div className="space-y-6">
            {QUESTIONS.map((q, qi) => (
              <div key={qi} className="rounded-xl border p-5" style={{ backgroundColor: C.card, borderColor: C.border }}>
                <p className="mb-1 text-[10px] uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.gold }}>Question {qi + 1}</p>
                <p className="mb-4 text-sm font-medium" style={{ fontFamily: fonts.body, color: C.text }}>{q.q}</p>
                <div className="space-y-2">
                  {q.opts.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    const isCorrect = oi === q.correct;
                    let bg = C.inner;
                    let border = C.border;
                    if (submitted) {
                      if (isCorrect) { bg = `${C.teal}20`; border = C.teal; }
                      else if (selected && !isCorrect) { bg = `${C.red}20`; border = C.red; }
                    } else if (selected) {
                      bg = `${C.gold}15`; border = C.gold;
                    }
                    return (
                      <button
                        key={oi}
                        disabled={submitted}
                        onClick={() => { const n = [...answers]; n[qi] = oi; setAnswers(n); }}
                        className="w-full rounded-lg border p-3 text-left text-sm transition-colors"
                        style={{ backgroundColor: bg, borderColor: border, color: C.text, fontFamily: fonts.body }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {!submitted ? (
            <div className="mt-8 text-center">
              <button onClick={submitTest} className="rounded-lg px-8 py-3 text-sm font-medium" style={{ background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`, color: "#fff", fontFamily: fonts.body }}>
                Submit Test
              </button>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <button onClick={() => setScreen("report")} className="rounded-lg px-8 py-3 text-sm font-medium" style={{ background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`, color: C.bg, fontFamily: fonts.body }}>
                View Report Card →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── REPORT CARD ─── */
  if (screen === "report") {
    const feedback = score === 100
      ? "Perfect score. You didn't just read this — you absorbed it. You are exactly the kind of soul this revolution is waiting for."
      : score >= 90 ? "Outstanding. You've genuinely internalized what most people will never take time to understand."
      : score >= 80 ? "Strong work. You've got the foundation. A few concepts to revisit, but your commitment is clear."
      : score >= 70 ? "You passed. The knowledge is taking root. Review what you missed and let it deepen."
      : "Not quite yet — and that's okay. The fact that you showed up puts you ahead of 95%. Review the guide and come back stronger.";

    return (
      <div style={{ color: C.text }}>
        <div className="py-16 text-center">
          <Emblem icon={<BarChart2 size={32} />} />
          <Eyebrow>Report Card</Eyebrow>
          <HeroTitle>Your <GoldText>Results.</GoldText></HeroTitle>
        </div>
        <div className="mx-auto max-w-lg">
          <div className="rounded-xl border" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <div className="rounded-t-xl p-6 text-center" style={{ backgroundColor: C.inner }}>
              <h3 className="text-xl" style={{ fontFamily: fonts.display }}>Soul True Final Assessment</h3>
              <p className="text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>10-Day AI Challenge</p>
              <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full" style={{ border: `2px solid ${C.gold}` }}>
                <div className="text-center">
                  <div className="text-3xl" style={{ fontFamily: fonts.display, color: C.gold }}>{grade}</div>
                  <div className="text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>{score}%</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-6">
              {[
                ["Correct answers", `${score / 10}/10`],
                ["Score", `${score}%`],
                ["Passing score", "70%"],
                ["Status", passed ? "PASSED" : "NOT YET — RETAKE AVAILABLE"],
                ["Challenge days", "10/10 ✓"],
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between text-sm" style={{ fontFamily: fonts.body }}>
                  <span style={{ color: C.muted }}>{l}</span>
                  <span style={{ color: l === "Status" ? (passed ? C.teal : C.red) : C.text }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="border-t p-6" style={{ borderColor: C.border }}>
              <div className="rounded-lg border-l-2 p-4" style={{ borderLeftColor: C.gold, backgroundColor: `${C.gold}08` }}>
                <p className="text-sm italic" style={{ fontFamily: fonts.body, color: C.gold, fontWeight: 300 }}>{feedback}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            {passed ? (
              <button onClick={() => setScreen("certificate")} className="rounded-lg px-8 py-3 text-sm font-medium" style={{ background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`, color: C.bg, fontFamily: fonts.body }}>
                Claim Your Graduation Certificate →
              </button>
            ) : (
              <button
                onClick={() => { setAnswers(Array(10).fill(null)); setSubmitted(false); setAttemptNumber((n) => n + 1); setScreen("test"); }}
                className="rounded-lg border px-8 py-3 text-sm font-medium"
                style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
              >
                Retake the Test
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── CERTIFICATE SCREEN ─── */
  return (
    <div style={{ color: C.text }}>
      <div className="py-16 text-center">
        <Emblem icon={<Award size={32} />} />
        <Eyebrow>Graduation Certificate</Eyebrow>
        <HeroTitle>You Earned <GoldText>It.</GoldText></HeroTitle>
        <p className="mx-auto mt-4 max-w-md text-sm" style={{ fontFamily: fonts.body, color: C.muted }}>
          Enter your name to personalize your certificate. You did the work. This is yours.
        </p>
      </div>

      {/* Name input */}
      <div className="mx-auto mb-8 flex max-w-lg items-center gap-4">
        <label className="text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.muted }}>Your Name</label>
        <input
          type="text"
          value={certName}
          onChange={(e) => setCertName(e.target.value)}
          onBlur={saveCert}
          className="flex-1 rounded-lg px-4 py-2 text-sm outline-none"
          style={{ backgroundColor: C.inner, color: C.text, border: `0.5px solid ${C.border}`, fontFamily: fonts.body }}
        />
      </div>

      {/* Certificate */}
      <div id="soul-true-certificate" className="mx-auto max-w-2xl overflow-hidden rounded-xl" style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, boxShadow: `0 0 80px -20px ${C.gold}15, 0 0 80px -20px ${C.teal}10` }}>
        <div className="p-4">
          <div className="rounded-lg p-10 text-center" style={{ border: `1px solid ${C.gold}30`, background: `radial-gradient(ellipse at top, ${C.gold}08 0%, transparent 60%), radial-gradient(ellipse at bottom, ${C.teal}08 0%, transparent 60%)` }}>
            <p className="text-sm uppercase tracking-[0.3em]" style={{ fontFamily: fonts.label, color: C.gold }}>SOUL TRUE</p>
            <div className="mx-auto my-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ border: `2px solid ${C.gold}`, boxShadow: `0 0 0 4px ${C.gold}15` }}>
              <Award size={28} style={{ color: C.gold }} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.muted }}>Certificate of Completion</p>
            <p className="mt-6 text-sm" style={{ fontFamily: fonts.display, color: C.muted, fontWeight: 300 }}>This certifies that</p>
            <p className="mt-2 text-3xl italic" style={{ fontFamily: fonts.display, color: C.gold, textShadow: `0 0 40px ${C.gold}33` }}>
              {certName || "Your Name"}
            </p>
            <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
              has successfully completed the Soul True 10-Day AI Challenge — demonstrating commitment to whole-person transformation across body, mind, spirit, and purposeful work in the age of the AI Revolution.
            </p>

            {/* Pillar row */}
            <div className="mx-auto mt-6 flex max-w-sm justify-between">
              {[
                { icon: "♥", label: "Physical" },
                { icon: "🌱", label: "Mental" },
                { icon: "☀", label: "Spiritual" },
                { icon: "🔥", label: "Work & Wealth" },
                { icon: "🧠", label: "AI Fluency" },
              ].map((p) => (
                <div key={p.label} className="text-center">
                  <div className="text-base" style={{ color: C.gold }}>{p.icon}</div>
                  <div className="text-[9px]" style={{ fontFamily: fonts.body, color: C.dim }}>{p.label}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-end justify-between border-t pt-4" style={{ borderColor: `${C.border}50` }}>
              <div className="text-left">
                <p className="text-xs italic" style={{ fontFamily: fonts.display, color: C.muted }}>William & the Soul True Team</p>
                <p className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>Founders, Soul True</p>
              </div>
              <div className="rounded-md px-3 py-1" style={{ backgroundColor: `${C.gold}15` }}>
                <span className="text-xs font-medium" style={{ fontFamily: fonts.body, color: C.gold }}>Score: {score}%</span>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>{certDate ? new Date(certDate).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                <p className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>Date of Completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mx-auto mt-8 flex max-w-lg justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border px-6 py-2.5 text-sm"
          style={{ borderColor: C.teal, color: C.teal, fontFamily: fonts.body }}
        >
          Print / Save Certificate
        </button>
        <a
          href="mailto:highervibrations36@gmail.com"
          onClick={() => trackCTA("kim_alfano_cert")}
          className="flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`, color: C.bg, fontFamily: fonts.body }}
        >
          Connect with Kim Alfano →
        </a>
      </div>
    </div>
  );
}
