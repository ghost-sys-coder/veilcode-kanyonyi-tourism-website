import { CONSENT_STORAGE_KEY, type ConsentChoice } from "@/lib/analytics/events";

// The visitor's analytics choice lives in localStorage on their own device only.
// Reads and writes are wrapped because storage can be blocked or throw in private windows.

export const CONSENT_CHANGED_EVENT = "kx:consent-changed";

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Blocked storage: the choice applies to this page view only, and the banner returns next time.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGED_EVENT, { detail: choice }));
}
