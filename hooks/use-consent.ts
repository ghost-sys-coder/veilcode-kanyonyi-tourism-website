"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_CHANGED_EVENT, readConsent } from "@/lib/analytics/consent";
import type { ConsentChoice } from "@/lib/analytics/events";

/** "unknown" during server render and hydration; then the stored choice, or null if none yet. */
export type ConsentState = ConsentChoice | null | "unknown";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange); // another tab changed it
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore<ConsentState>(subscribe, readConsent, () => "unknown");
}
