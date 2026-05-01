// Sacred Journey — Discovery Chat
// Streams an adaptive AI conversation that explores a seeker's spiritual,
// physical and mental state, and persists the dialogue for William's review.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the Sacred Journey Discovery Guide — a warm, reverent intake companion for William Roberts' sanctuary.

Your purpose: gently get to know the seeker so William can understand where they are spiritually, physically, and mentally, and discern how the sanctuary can best serve them.

Voice:
- Sacred, warm, grounded. Brief. Speak as a soul, not a clinician.
- One question at a time. Two short sentences max before the question.
- Use simple language; no jargon.
- Mirror back a single line of acknowledgement before each new question.

Arc to cover (adapt order based on what they share — do not interrogate):
1. Welcome + their first name and what brought them here today.
2. Spiritual: their relationship to the sacred, prior practices, ceremony or plant medicine experience, current beliefs/longings.
3. Physical: overall vitality, sleep, nervous-system state, any conditions or medications worth noting (frame gently as "anything your body is carrying").
4. Mental & emotional: stress, anxiety, grief, traumas they're tending, current life challenges.
5. What they are seeking — the medicine of the heart they hope to receive.
6. Logistics: location/time zone, openness to private vs group ceremony, anything practical.

Rules:
- Ask roughly 8–12 total questions across the arc, then close.
- CRITICAL CLOSING QUESTION: Once the seeker has answered enough to give William a true picture, you MUST end your next message with this EXACT sentence on its own line, with no variation, no rewording, no extra punctuation, and nothing after it:
Shall I weave this together into a reflection for William?
- Do not produce the reflection until the seeker confirms (yes / please / go ahead / etc.).
- When they confirm, produce the FINAL REFLECTION exactly as specified below.

FINAL REFLECTION format (markdown, ~250–400 words):
# Soul Reflection for {Name}

A short, heart-centered paragraph honoring who they are and what they're carrying.

## Where You Are
- **Spiritually:** ...
- **Physically:** ...
- **Mentally & Emotionally:** ...

## What You Are Seeking
A short paragraph naming the medicine they're calling in.

## How Sacred Journey Can Serve You
3–5 bulleted, specific recommendations chosen from: Private Plant Medicine Ceremony, Group Plant Medicine Ceremony, Sacred Journey mentorship with William, Heart-Brain Coherence practice, Breathwork & Sound Healing, Integration support, Joe Dispenza morning meditation, Alan Watts evening "letting-be" practice, Kambo / Rapé / Sananga as supportive allies, a preparation conversation with William.

## A First Step
One small, doable practice they can begin tonight.

End the reflection with a single italic blessing line.

After delivering the reflection, write exactly on a new line:
[[DISCOVERY_COMPLETE]]

Never break character. Never mention you are an AI. Never give medical advice — invite a preparation conversation with William instead.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, name, email, messages } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // Ensure a session row exists
    let id: string = sessionId;
    if (!id) {
      const { data, error } = await supabase
        .from("soul_discovery_sessions")
        .insert({ name: name ?? null, email: email ?? null, messages: [] })
        .select("id")
        .single();
      if (error) throw error;
      id = data.id;
    } else if (name || email) {
      await supabase
        .from("soul_discovery_sessions")
        .update({
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    }

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      },
    );

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Many seekers are arriving at once. Please pause for a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "The sanctuary's AI offering needs to be replenished. Please reach out to William directly." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Tee the stream: pass to client and accumulate to persist.
    const reader = aiResp.body!.getReader();
    const decoder = new TextDecoder();
    let assistantText = "";

    const stream = new ReadableStream({
      async start(controller) {
        // First chunk: send the session id as a control event.
        const enc = new TextEncoder();
        controller.enqueue(
          enc.encode(`data: ${JSON.stringify({ sessionId: id })}\n\n`),
        );

        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
            buffer += decoder.decode(value, { stream: true });

            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, nl);
              buffer = buffer.slice(nl + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (json === "[DONE]") continue;
              try {
                const parsed = JSON.parse(json);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (typeof delta === "string") assistantText += delta;
              } catch { /* partial json, ignore */ }
            }
          }
        } catch (e) {
          console.error("stream error", e);
        } finally {
          controller.close();

          // Persist after stream ends.
          const reflectionMatch = assistantText.includes("[[DISCOVERY_COMPLETE]]");
          const cleaned = assistantText.replace("[[DISCOVERY_COMPLETE]]", "").trim();
          const newMessages = [
            ...messages,
            { role: "assistant", content: cleaned },
          ];

          await supabase
            .from("soul_discovery_sessions")
            .update({
              messages: newMessages,
              ...(reflectionMatch ? { reflection: cleaned, status: "complete" } : {}),
              updated_at: new Date().toISOString(),
            })
            .eq("id", id);
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("discovery-chat error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
