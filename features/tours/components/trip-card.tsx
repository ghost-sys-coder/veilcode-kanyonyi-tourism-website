import type { ReactNode } from "react";
import { TrackLink } from "@/components/analytics/track-link";
import { Price } from "@/components/content/price";
import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { ui } from "@/content/ui";
import { priceFrom } from "@/lib/content/pricing";
import type { Tour } from "@/types/content";

// DESIGN.md section 10.2: image, tag badge, mono meta line, h3 name, one-sentence summary,
// footer with "From, per person sharing", price and "See itinerary". Same anatomy everywhere.
// The "See itinerary" link stretches over the whole card, so the card is one tap target; it is
// described by the tour name, so screen readers don't hear six identical links.

export function TripCard({
  tour,
  list,
  badges,
  headingLevel = "h3",
}: {
  tour: Tour;
  list: "home" | "tours" | "destination";
  /** Context badges ("Good in July", "Cheaper permits") shown on the image. */
  badges?: ReactNode;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const nameId = `trip-${list}-${tour.slug}`;

  return (
    <article className="group/trip relative flex flex-col overflow-hidden rounded-lg border bg-card transition-[translate,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-28px_rgb(10_40_30/0.5)] focus-within:ring-2 focus-within:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative">
        <SiteImage media={tour.hero.image} preset="card" />
        <Badge variant="tag" className="absolute top-3 left-3 bg-card font-semibold">
          {tour.tag}
        </Badge>
        {badges ? <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">{badges}</div> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p className="font-mono text-label tracking-[0.04em] text-muted-foreground">{tour.metaLine}</p>
        <Heading id={nameId} className="text-display-m">
          {tour.name}
        </Heading>
        <p className="text-[0.9375rem] text-muted-foreground">{tour.cardSummary}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed pt-3">
          <p className="flex flex-col">
            <span className="text-label text-muted-foreground">{ui.labels.priceFrom}</span>
            <Price usd={priceFrom(tour.pricing)} className="price text-[1.625rem] leading-tight" />
          </p>
          <TrackLink
            href={`/tours/${tour.slug}`}
            event="view_itinerary"
            params={{ tour_slug: tour.slug, list }}
            aria-describedby={nameId}
            className="rounded-sm font-semibold text-primary underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none"
          >
            {ui.buttons.seeItinerary}
          </TrackLink>
        </div>
      </div>
    </article>
  );
}
