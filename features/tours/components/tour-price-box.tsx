import Link from "next/link";
import { Price } from "@/components/content/price";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/layout/whatsapp-icon";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { whatsappHref } from "@/config/contact";
import { ui } from "@/content/ui";
import { priceFrom, pricePerPerson } from "@/lib/content/pricing";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/content";

/**
 * From-price and the page's one sun action, "Ask about this trip" (DESIGN.md sections 2 and 6),
 * with the inline WhatsApp link tour pages also carry.
 */
export function TourPriceBox({ tour }: { tour: Tour }) {
  const waHref = whatsappHref();

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
        <p className="flex flex-col">
          <span className="text-body-s text-muted-foreground">{ui.labels.priceFrom}</span>
          <Price usd={priceFrom(tour.pricing)} className="price text-display-l" />
        </p>
        {tour.pricing.showLowSeasonColumn ? (
          <p className="flex flex-col">
            <span className="text-body-s text-muted-foreground">{ui.labels.lowSeasonPrice}</span>
            <Price usd={pricePerPerson(tour.pricing, 2, { lowSeason: true })} className="price text-display-m" />
          </p>
        ) : null}
      </div>
      <Link
        href={`/plan-your-trip?tour=${tour.slug}`}
        className={cn(buttonVariants({ variant: "sun", size: "cta" }), "w-full")}
      >
        {ui.buttons.askAboutTrip}
      </Link>
      {waHref ? (
        <WhatsAppLink
          href={waHref}
          location="tour_page"
          tourSlug={tour.slug}
          className="inline-flex min-h-11 items-center justify-center gap-2 font-semibold text-primary underline underline-offset-4"
        >
          <WhatsAppIcon className="size-5" />
          {ui.buttons.chatOnWhatsApp}
        </WhatsAppLink>
      ) : null}
    </div>
  );
}
