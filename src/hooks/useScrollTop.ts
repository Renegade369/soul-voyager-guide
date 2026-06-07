import { useEffect } from "react";

/**
 * Smoothly scroll the page (and any matching scroll containers) back to the top.
 * Respects users who have reduced-motion preferences by falling back to instant.
 */
export function scrollToTopSmooth() {
  if (typeof window === "undefined") return;
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

  try {
    window.scrollTo({ top: 0, left: 0, behavior });
  } catch {
    window.scrollTo(0, 0);
  }
  // Also reset document scroll roots in case the page uses one
  if (typeof document !== "undefined") {
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    // Any element opted-in as a scroll container
    document.querySelectorAll<HTMLElement>("[data-scroll-container]").forEach((el) => {
      try {
        el.scrollTo({ top: 0, left: 0, behavior });
      } catch {
        el.scrollTop = 0;
      }
    });
  }
}

/**
 * Run scrollToTopSmooth() whenever any dependency in `deps` changes.
 * Use to keep a reader's window aligned as the user moves between steps
 * (intake → loading → result, etc.) or when a reading first renders.
 */
export function useScrollTopOnChange(deps: ReadonlyArray<unknown>) {
  useEffect(() => {
    scrollToTopSmooth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
