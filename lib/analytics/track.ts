import type { AnalyticsEvents, EventName } from "@/lib/analytics/events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Sends a GA4 event. Does nothing until the visitor accepts analytics, because gtag.js only loads
 * after consent (basic Consent Mode, AGENTS.md section 0 default 3). Never throws.
 */
export function track<E extends EventName>(name: E, params: AnalyticsEvents[E]): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // Analytics must never break a traveller's action.
  }
}
