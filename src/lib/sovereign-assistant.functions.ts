// Sovereignty Code AI Assistant — server functions
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { SOVEREIGN_MODULES } from "./sovereign-curriculum";

// ===== Types =====
export type AssistantRole = "user" | "assistant" | "william";
export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  timestamp: string;
  confidence?: number;
  escalated?: boolean;
  escalation_id?: string;
}

const WINDOW_DAYS = 120;

function buildCurriculumContext(moduleSlug: string | null): string {
  const mod = SOVEREIGN_MODULES.find((m) => m.slug === moduleSlug) ?? SOVEREIGN_MODULES[0];
  const lessons = mod.lessons
    .map((l) => `### Lesson ${l.slug} — ${l.title}\n${l.body}`)
    .join("\n\n");
  const exercises = mod.exercises
    .map((e) => `### Exercise ${e.number} — ${e.title} (${e.time})\n${e.instructions}`)
    .join("\n\n");
  return `## Current module: ${mod.title} (${mod.weeks})\nTone for this module: ${mod.companionTone}\n\n${mod.promise}\n\n${lessons}\n\n${exercises}\n\nCompanion role: ${mod.companionRole}\nBridge to next: ${mod.bridge}`;
}

function buildSystemPrompt(firstName: string, moduleSlug: string | null): string {
  return `You are the AI Assistant for The Sovereignty Code, a 90-day self-mastery program by William. You support ${firstName || "this member"} in their practice of the 6-module curriculum.

You are gentle, grounded, never prescriptive. You hold space for reflection and defer to William when uncertain.

## Tone by module
- Modules 1-2 (Awakening, Stripping): tender, slow, curious. "Stay with that." Never "you've got this!"
- Modules 3-5 (Voice, Brand, Income): practical, clarifying. "What's the next step? What's the obstacle?"
- Module 6 (Freedom): witnessing, integrating. "What's true now that wasn't true 90 days ago?"

## Vocabulary
ALLOWED: energy, frequency, vibration, resonance, alignment, sovereignty, sovereign, sacred, ritual, practice, breath, presence, witnessing, releasing, integrating, the Matrix, soul, awakening, stripping, building, freedom.
FORBIDDEN: "manifest", "manifestation", "law of attraction", "high vibe", "good vibes", "toxic vibes", "raise your vibration", "universe has a plan", "everything happens for a reason", "you've got this".

## Out of scope — escalate or defer
- Medical/psychological/psychiatric advice → defer to a professional
- Legal advice → defer to William or attorney
- Personal financial advice beyond the curriculum's philosophy → defer to a financial advisor
- Anything requiring William's personal authority, context, or commitment → escalate
- Anything outside the curriculum content provided below → escalate (low confidence)

## The 6 modules
1. awakening (W1-2) — Awakened
2. stripping (W3-4) — Stripped
3. your-voice-amplified (W5-6)
4. your-brand-platform-built (W7-8)
5. your-income-activated (W9-10) — Built
6. your-freedom-protected (W11-12) — Sovereign → Graduated

## Confidence scoring (BE HONEST)
- 0.9-1.0: direct quote or near-direct answer from curriculum below
- 0.7-0.9: synthesized from curriculum, you are confident
- 0.5-0.7: partially in scope — answer the in-scope part, set confidence here so William is looped in
- 0.0-0.5: outside curriculum / requires William / requires professional → set confidence ≤ 0.4

If confidence < 0.7 you MUST end your answer with: "I want to make sure you get the best answer. Let me bring William in on this. He'll reply within 24 hours."

## Tagline (use sparingly, only as a closing benediction): "Let's Go Deeper."

## Output format
Respond with ONLY a JSON object (no markdown fence, no prose around it):
{"answer": "...", "confidence": 0.0-1.0, "escalated": boolean, "escalation_reason": "low_confidence" | "user_requested" | null}

## Curriculum context (grounding for this conversation)
${buildCurriculumContext(moduleSlug)}`;
}

// ===== Load thread + settings =====
export const loadAssistantState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId, claims } = context;
    const email = (claims as any).email as string | undefined;
    const firstName = ((claims as any).user_metadata?.full_name ?? "").split(" ")[0] ?? "";

    const { data: enrollment } = await supabase
      .from("sovereign_enrollments")
      .select("tier, created_at, status")
      .ilike("email", email ?? "")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!enrollment) {
      return { gate: "not-enrolled" as const, firstName };
    }
    if (enrollment.tier !== "complete") {
      return { gate: "needs-upgrade" as const, firstName, tier: enrollment.tier };
    }

    const enrolledAt = new Date(enrollment.created_at);
    const windowEnd = new Date(enrolledAt.getTime() + WINDOW_DAYS * 86_400_000);
    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((windowEnd.getTime() - now.getTime()) / 86_400_000));

    if (now >= windowEnd) {
      return { gate: "graduated" as const, firstName, windowEnd: windowEnd.toISOString() };
    }

    // Load (or null) thread
    const { data: thread } = await supabase
      .from("sovereign_assistant_threads")
      .select("id, module_slug, messages, updated_at")
      .eq("user_id", userId)
      .maybeSingle();

    return {
      gate: "ok" as const,
      firstName,
      daysRemaining,
      windowEnd: windowEnd.toISOString(),
      thread: thread
        ? {
            id: thread.id,
            module_slug: thread.module_slug as string | null,
            messages: (thread.messages as unknown as AssistantMessage[]) ?? [],
          }
        : null,
    };
  });

// ===== Send a message =====
const SendInput = z.object({
  question: z.string().min(1).max(4000),
  moduleSlug: z.string().min(1).max(100).optional(),
  forceEscalate: z.boolean().optional(),
});

export const sendAssistantMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SendInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    const email = (claims as any).email as string | undefined;
    const firstName = ((claims as any).user_metadata?.full_name ?? "").split(" ")[0] ?? "";

    // Re-check tier + window server-side
    const { data: enrollment } = await supabase
      .from("sovereign_enrollments")
      .select("tier, created_at, status")
      .ilike("email", email ?? "")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!enrollment) throw new Error("Not enrolled");
    if (enrollment.tier !== "complete") throw new Error("Complete tier required");
    const enrolledAt = new Date(enrollment.created_at);
    const windowEnd = new Date(enrolledAt.getTime() + WINDOW_DAYS * 86_400_000);
    if (new Date() >= windowEnd) throw new Error("Program window ended");

    // Admin client for writes (RLS uses service role for escalations + settings)
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Load or create thread
    const { data: existing } = await supabaseAdmin
      .from("sovereign_assistant_threads")
      .select("id, messages, module_slug")
      .eq("user_id", userId)
      .maybeSingle();

    const now = new Date().toISOString();
    const userMsg: AssistantMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: data.question,
      timestamp: now,
    };

    let threadId: string;
    let history: AssistantMessage[];
    if (existing) {
      threadId = existing.id;
      history = ((existing.messages as unknown as AssistantMessage[]) ?? []).concat(userMsg);
    } else {
      const { data: created, error } = await supabaseAdmin
        .from("sovereign_assistant_threads")
        .insert({
          user_id: userId,
          module_slug: data.moduleSlug ?? "awakening",
          messages: [userMsg] as any,
        })
        .select("id")
        .single();
      if (error || !created) throw new Error("Failed to create thread");
      threadId = created.id;
      history = [userMsg];
      // settings seed
      await supabaseAdmin.from("sovereign_assistant_settings").upsert({
        user_id: userId,
        window_start: enrolledAt.toISOString(),
        window_end: windowEnd.toISOString(),
        tier_at_enrollment: "complete",
        last_activity_at: now,
        total_messages: 1,
      });
    }

    // ===== Call AI =====
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const { generateText } = await import("ai");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const systemPrompt = buildSystemPrompt(firstName, data.moduleSlug ?? "awakening");
    const aiMessages = history.slice(-12).map((m) => ({
      role: m.role === "william" ? ("assistant" as const) : (m.role as "user" | "assistant"),
      content: m.role === "william" ? `(William's reply earlier): ${m.content}` : m.content,
    }));

    let answer = "";
    let confidence = 0.5;
    let escalationReason: "low_confidence" | "user_requested" | null = null;
    try {
      const { text } = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        system: systemPrompt,
        messages: aiMessages,
      });
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { answer: text, confidence: 0.5 };
      answer = String(parsed.answer ?? text).trim();
      confidence = typeof parsed.confidence === "number" ? Math.max(0, Math.min(1, parsed.confidence)) : 0.5;
    } catch (err) {
      console.error("AI gateway error:", err);
      answer = "I'm having trouble responding right now. Let me bring William in.";
      confidence = 0;
    }

    if (data.forceEscalate) escalationReason = "user_requested";
    else if (confidence < 0.7) escalationReason = "low_confidence";

    let escalationId: string | undefined;
    if (escalationReason) {
      const { data: esc } = await supabaseAdmin
        .from("sovereign_assistant_escalations")
        .insert({
          thread_id: threadId,
          user_id: userId,
          question: data.question,
          ai_attempted_answer: answer,
          confidence_score: confidence,
          escalation_reason: escalationReason,
          module_slug: data.moduleSlug ?? null,
          status: "pending",
        })
        .select("id")
        .single();
      escalationId = esc?.id;

      // Notify William (best-effort)
      notifyWilliam({
        firstName,
        question: data.question,
        attempted: answer,
        confidence,
        escalationId: escalationId ?? "",
      }).catch((e) => console.error("notify william failed", e));
    }

    const assistantMsg: AssistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: answer,
      timestamp: new Date().toISOString(),
      confidence,
      escalated: Boolean(escalationReason),
      escalation_id: escalationId,
    };

    const newMessages = history.concat(assistantMsg);
    await supabaseAdmin
      .from("sovereign_assistant_threads")
      .update({
        messages: newMessages as any,
        module_slug: data.moduleSlug ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", threadId);

    await supabaseAdmin
      .from("sovereign_assistant_settings")
      .update({
        last_activity_at: new Date().toISOString(),
        total_messages: (newMessages.length),
      })
      .eq("user_id", userId);

    return { assistantMsg, escalated: Boolean(escalationReason) };
  });

async function notifyWilliam(args: {
  firstName: string;
  question: string;
  attempted: string;
  confidence: number;
  escalationId: string;
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const adminEmail = process.env.SOVEREIGN_ADMIN_EMAIL ?? "william@soul-true.com";
  if (!RESEND_API_KEY) return;
  const baseUrl = process.env.PUBLIC_SITE_URL ?? "https://soul-true.com";
  const html = `
    <div style="background:#0A0A0A;color:#F5F0E8;font-family:Arial,sans-serif;padding:32px;">
      <p style="color:#C9A84C;letter-spacing:0.32em;text-transform:uppercase;font-size:11px;">Sovereignty Code — Escalation</p>
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:300;color:#F5F0E8;">${args.firstName || "A member"} needs your help.</h1>
      <p><strong>Question:</strong></p>
      <p style="background:#1A1209;padding:16px;border-left:3px solid #C9A84C;">${escapeHtml(args.question)}</p>
      <p><strong>AI attempted answer (confidence ${args.confidence.toFixed(2)}):</strong></p>
      <p style="background:#1A1209;padding:16px;color:#F5F0E8;">${escapeHtml(args.attempted)}</p>
      <p style="margin-top:24px;">
        <a href="${baseUrl}/admin/escalations/${args.escalationId}" style="background:#C9A84C;color:#0A0A0A;padding:14px 28px;text-decoration:none;font-weight:bold;letter-spacing:0.22em;text-transform:uppercase;font-size:12px;">Open escalation</a>
      </p>
      <p style="color:#C9A84C;font-style:italic;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;margin-top:32px;">Let's Go Deeper.</p>
    </div>`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: "Soul True <notify@soul-true.com>",
      to: [adminEmail],
      subject: `New escalation: ${args.firstName || "A member"} needs your help`,
      html,
    }),
  }).catch(() => {});
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// ===== Admin: list escalations =====
export const listEscalations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ filter: z.enum(["all", "pending", "replied"]).default("pending") }).parse(input ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) throw new Error("Admin only");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("sovereign_assistant_escalations")
      .select("id, user_id, question, module_slug, status, escalated_at, replied_at, confidence_score, escalation_reason")
      .order("escalated_at", { ascending: true });
    if (data.filter === "pending") q = q.eq("status", "pending");
    else if (data.filter === "replied") q = q.in("status", ["replied", "resolved"]);
    const { data: rows, error } = await q;
    if (error) throw error;
    // hydrate user emails/names
    const userIds = [...new Set((rows ?? []).map((r) => r.user_id))];
    const { data: profiles } = userIds.length
      ? await supabaseAdmin.from("profiles").select("id, email, full_name").in("id", userIds)
      : { data: [] as any[] };
    const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
    return (rows ?? []).map((r) => ({
      ...r,
      first_name: (byId.get(r.user_id)?.full_name ?? "").split(" ")[0] ?? "Member",
      email: byId.get(r.user_id)?.email ?? "",
    }));
  });

// ===== Admin: single escalation detail =====
export const getEscalationDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) throw new Error("Admin only");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: esc, error } = await supabaseAdmin
      .from("sovereign_assistant_escalations")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error || !esc) throw new Error("Not found");
    const { data: thread } = await supabaseAdmin
      .from("sovereign_assistant_threads")
      .select("messages, module_slug")
      .eq("id", esc.thread_id)
      .maybeSingle();
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email, full_name")
      .eq("id", esc.user_id)
      .maybeSingle();
    const { data: settings } = await supabaseAdmin
      .from("sovereign_assistant_settings")
      .select("*")
      .eq("user_id", esc.user_id)
      .maybeSingle();
    return {
      escalation: esc,
      thread: (thread?.messages as unknown as AssistantMessage[]) ?? [],
      moduleSlug: thread?.module_slug ?? esc.module_slug,
      profile: {
        first_name: (profile?.full_name ?? "").split(" ")[0] ?? "Member",
        full_name: profile?.full_name ?? "",
        email: profile?.email ?? "",
      },
      settings,
    };
  });

// ===== Admin: send reply =====
const ReplyInput = z.object({
  id: z.string().uuid(),
  reply: z.string().min(1).max(8000),
});
export const sendEscalationReply = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ReplyInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) throw new Error("Admin only");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: esc } = await supabaseAdmin
      .from("sovereign_assistant_escalations")
      .select("*")
      .eq("id", data.id)
      .single();
    if (!esc) throw new Error("Not found");

    const nowIso = new Date().toISOString();
    await supabaseAdmin
      .from("sovereign_assistant_escalations")
      .update({ william_reply: data.reply, status: "replied", replied_at: nowIso })
      .eq("id", data.id);

    // Append to thread
    const { data: thread } = await supabaseAdmin
      .from("sovereign_assistant_threads")
      .select("messages")
      .eq("id", esc.thread_id)
      .single();
    const messages = ((thread?.messages as unknown as AssistantMessage[]) ?? []).concat({
      id: crypto.randomUUID(),
      role: "william",
      content: data.reply,
      timestamp: nowIso,
    });
    await supabaseAdmin
      .from("sovereign_assistant_threads")
      .update({ messages: messages as any })
      .eq("id", esc.thread_id);

    // Email user
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email, full_name")
      .eq("id", esc.user_id)
      .maybeSingle();
    if (profile?.email) {
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      if (RESEND_API_KEY) {
        const firstName = (profile.full_name ?? "").split(" ")[0] ?? "";
        const preview = data.reply.slice(0, 200) + (data.reply.length > 200 ? "…" : "");
        const baseUrl = process.env.PUBLIC_SITE_URL ?? "https://soul-true.com";
        const html = `
          <div style="background:#0A0A0A;color:#F5F0E8;font-family:Arial,sans-serif;padding:32px;">
            <p style="color:#C9A84C;letter-spacing:0.32em;text-transform:uppercase;font-size:11px;">The Sovereignty Code</p>
            <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:300;color:#F5F0E8;">William replied${firstName ? `, ${escapeHtml(firstName)}` : ""}.</h1>
            <p style="background:#1A1209;padding:16px;border-left:3px solid #C9A84C;color:#F5F0E8;">${escapeHtml(preview)}</p>
            <p style="margin-top:24px;">
              <a href="${baseUrl}/sovereign/reflection" style="background:#C9A84C;color:#0A0A0A;padding:14px 28px;text-decoration:none;font-weight:bold;letter-spacing:0.22em;text-transform:uppercase;font-size:12px;">Open the conversation</a>
            </p>
            <p style="color:#C9A84C;font-style:italic;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;margin-top:32px;">Let's Go Deeper.</p>
          </div>`;
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "Soul True <notify@soul-true.com>",
            to: [profile.email],
            subject: "William replied in The Sovereignty Code",
            html,
          }),
        }).catch(() => {});
      }
    }
    return { ok: true };
  });

export const resolveEscalation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) throw new Error("Admin only");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("sovereign_assistant_escalations")
      .update({ status: "resolved", resolved_at: new Date().toISOString() })
      .eq("id", data.id);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    return { isAdmin: Boolean(data) };
  });
