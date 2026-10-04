import Link from "next/link";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { Logo } from "@/components/layout/logo";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { whatsappDisplay, whatsappHref } from "@/config/contact";
import { pickVariant } from "@/config/demo";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { Inline } from "@/lib/content/inline";

const linkClass = "rounded-sm opacity-90 underline-offset-4 hover:underline hover:opacity-100";

export function SiteFooter() {
  const { footer } = site;
  const waHref = whatsappHref();

  return (
    <footer className="bg-band text-band-foreground">
      <div className="container-page flex flex-col gap-10 pt-12 pb-28 md:pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo tone="light" />
            <p className="measure text-body-s opacity-90">{site.operator.brandLine}</p>
            <p className="max-w-[36ch] text-body-s opacity-80">
              <Inline text={site.operator.nameStory} />
            </p>
          </div>

          <nav aria-label={ui.a11y.footerNavLabel} className="contents">
            {footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h2 className="font-mono text-label uppercase tracking-[0.12em] opacity-75">{column.title}</h2>
                <ul className="flex flex-col gap-2 text-[0.9375rem]">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-label uppercase tracking-[0.12em] opacity-75">{footer.contact.title}</h2>
            <ul className="flex flex-col gap-2 text-[0.9375rem]">
              {waHref && whatsappDisplay ? (
                <li>
                  WhatsApp:{" "}
                  <WhatsAppLink href={waHref} location="footer" className={`${linkClass} font-mono whitespace-nowrap`}>
                    {whatsappDisplay}
                  </WhatsAppLink>
                </li>
              ) : null}
              <li className="opacity-90">{footer.contact.email}</li>
              <li className="opacity-90">{pickVariant(footer.contact.office)}</li>
              <li className="opacity-90">{footer.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-band-foreground/25 pt-6 text-body-s opacity-80 md:flex-row md:items-center md:justify-between">
          <p>{pickVariant(footer.licenceLine)}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>{pickVariant(footer.bottomLine)}</p>
            <CookieSettingsButton className={`${linkClass} underline`} />
          </div>
        </div>
      </div>
    </footer>
  );
}
