"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ui } from "@/content/ui";
import { useConsent } from "@/hooks/use-consent";
import { writeConsent } from "@/lib/analytics/consent";
import { OPEN_CONSENT_EVENT, type ConsentChoice } from "@/lib/analytics/events";

// Shown until the visitor chooses, and again from "Cookie settings" in the footer.
// A non-modal bottom bar: it never blocks reading the page.

export function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reopen = () => {
      setReopened(true);
      requestAnimationFrame(() => acceptRef.current?.focus());
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // "unknown" means we are still hydrating: render nothing rather than flash the bar.
  if (consent === "unknown" || (consent !== null && !reopened)) return null;

  function choose(choice: ConsentChoice) {
    const withdrawing = consent === "granted" && choice === "denied";
    writeConsent(choice);
    setReopened(false);
    // gtag cannot be unloaded from a running page; a reload guarantees nothing more is sent.
    if (withdrawing) window.location.reload();
  }

  return (
    <section
      aria-labelledby="consent-text"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card shadow-[0_-12px_30px_-20px_rgb(0_0_0/0.35)]"
    >
      <div className="container-page flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-6">
        <p id="consent-text" className="measure flex-1 text-body-s">
          {ui.consent.text}{" "}
          <Link href="/privacy" className="font-medium text-primary underline underline-offset-4">
            {ui.consent.privacyLink}
          </Link>
        </p>
        <div className="flex flex-wrap gap-2">
          <Button ref={acceptRef} onClick={() => choose("granted")}>
            {ui.consent.accept}
          </Button>
          <Button variant="outline" onClick={() => choose("denied")}>
            {ui.consent.reject}
          </Button>
        </div>
      </div>
    </section>
  );
}
