import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/layout/whatsapp-icon";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { whatsappHref } from "@/config/contact";
import { Inline } from "@/lib/content/inline";
import { resolveLink } from "@/lib/content/links";
import { cn } from "@/lib/utils";
import type { CloseCta as CloseCtaContent } from "@/types/content";

/**
 * The closing call to action every page ends with (AGENTS.md section 5: no dead ends).
 * `enquiry` goes to the form, pre-selecting the tour when there is one.
 */
export function CloseCta({
  content,
  tourSlug,
  sun = false,
}: {
  content: CloseCtaContent;
  tourSlug?: string;
  /** Sun only when no other sun button shares the viewport (DESIGN.md section 2). */
  sun?: boolean;
}) {
  const { target, label } = content.button;
  const buttonClass = cn(
    buttonVariants({ variant: sun ? "sun" : "default", size: "cta" }),
    "w-full sm:w-auto",
  );

  let action: React.ReactNode;
  if (target === "whatsapp") {
    const href = whatsappHref();
    action = href ? (
      <WhatsAppLink href={href} location="closing_cta" tourSlug={tourSlug} className={buttonClass}>
        <WhatsAppIcon className="size-5" />
        {label}
      </WhatsAppLink>
    ) : null;
  } else {
    const href =
      target === "enquiry"
        ? tourSlug
          ? `/plan-your-trip?tour=${tourSlug}`
          : "/plan-your-trip"
        : resolveLink(target).href;
    action = (
      <Link href={href} className={buttonClass}>
        {label}
      </Link>
    );
  }

  return (
    <section className="bg-secondary">
      <div className="container-page section-y flex flex-col items-start gap-5">
        <h2 className="max-w-[22ch] text-display-l">{content.heading}</h2>
        {content.body ? (
          <p className="measure-lede text-body-l">
            <Inline text={content.body} />
          </p>
        ) : null}
        {action}
      </div>
    </section>
  );
}
