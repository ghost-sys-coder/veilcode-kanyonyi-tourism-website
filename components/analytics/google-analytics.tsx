"use client";

import Script from "next/script";
import { useConsent } from "@/hooks/use-consent";

// GA4 with Consent Mode v2 in basic mode (AGENTS.md section 0, default 3): gtag.js is not
// requested at all until the visitor accepts analytics. Ad signals stay denied permanently,
// because the banner promises "No advertising cookies". Withdrawing consent reloads the page
// (consent-banner.tsx), so a loaded gtag never keeps running after "Reject".

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const consent = useConsent();
  if (consent !== "granted") return null;

  const init = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)}, { allow_google_signals: false });
`;

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {init}
      </Script>
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      />
    </>
  );
}
