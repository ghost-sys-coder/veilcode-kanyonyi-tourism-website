"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/analytics/events";
import { site } from "@/content/site";

/** Footer "Cookie settings" link: reopens the consent banner so the choice can be changed. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {site.footer.cookieSettingsLabel}
    </button>
  );
}
