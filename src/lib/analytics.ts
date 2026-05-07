import { supabase } from "@/integrations/supabase/client";

const SESSION_ID = typeof crypto !== "undefined" ? crypto.randomUUID() : "ssr";
const pageTimers: Record<string, number> = {};
let currentPage = "";

export async function track(eventType: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("events").insert([{
      user_id: user?.id ?? null,
      session_id: SESSION_ID,
      event_type: eventType,
      section: (props?.section as string) ?? currentPage,
      properties: (props ?? {}) as Record<string, unknown>,
      duration_ms: (props?.duration_ms as number) ?? null,
      occurred_at: new Date().toISOString(),
    }]);
  } catch {
    // analytics should never break the app
  }
}

export function trackPageEnter(page: string) {
  if (currentPage && pageTimers[currentPage]) {
    track("page_exit", { section: currentPage, duration_ms: Date.now() - pageTimers[currentPage] });
  }
  currentPage = page;
  pageTimers[page] = Date.now();
  track("page_view", { section: page });
}

export function trackPromptCopy(name: string, pillar: string) {
  track("prompt_copied", { prompt_name: name, pillar });
}
export function trackDayToggle(day: number, done: boolean) {
  track("challenge_day_toggled", { day_number: day, completed: done });
}
export function trackTestSubmit(score: number, passed: boolean, attempt: number) {
  track("test_submitted", { score, passed, attempt_number: attempt });
}
export function trackCertificate(score: number) {
  track("certificate_generated", { score });
}
export function trackPillar(pillar: string) {
  track("pillar_tab_clicked", { pillar });
}
export function trackCTA(name: string) {
  track("cta_clicked", { cta_name: name });
}
export function trackLead(city: string, state: string, country: string) {
  track("lead_captured", { city, state, country });
}

export function initTracking() {
  if (typeof window === "undefined") return;
  track("session_start", {
    device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    referrer: document.referrer,
    landing_page: window.location.pathname,
  });
  window.addEventListener("beforeunload", () => {
    if (currentPage && pageTimers[currentPage]) {
      track("page_exit", { section: currentPage, duration_ms: Date.now() - pageTimers[currentPage] });
    }
    track("session_end", { session_id: SESSION_ID });
  });
}
