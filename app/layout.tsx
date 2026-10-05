import type { Metadata, Viewport } from "next";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { DemoNotice } from "@/components/layout/demo-notice";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { JsonLd } from "@/components/seo/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";
import { whatsappDisplay, whatsappHref } from "@/config/contact";
import { isDemo } from "@/config/demo";
import { isIndexable } from "@/config/indexing";
import { siteUrl } from "@/config/site-url";
import { meta, titleSuffix } from "@/content/meta";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { bootScript } from "@/lib/ui/boot-script";
import { body, display, label } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: meta["/"].absoluteTitle, template: `%s${titleSuffix}` },
  description: meta["/"].description,
  applicationName: site.operator.name,
  // Demo copy stays independent of indexing (002 section 2). The matching header in
  // next.config.ts covers non-HTML responses too.
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: { siteName: site.operator.name, locale: "en_GB", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#F2F4EF",
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const waHref = whatsappHref();

  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${label.variable}`}
      // The boot script sets data-currency / data-demo-dismissed before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {ui.a11y.skipLink}
        </a>
        <TooltipProvider>
          {isDemo ? <DemoNotice /> : null}
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          {waHref && whatsappDisplay ? <WhatsAppFab href={waHref} displayNumber={whatsappDisplay} /> : null}
          <ConsentBanner />
        </TooltipProvider>
        {gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
