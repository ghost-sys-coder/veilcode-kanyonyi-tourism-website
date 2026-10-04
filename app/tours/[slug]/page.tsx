import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/track-view";
import { AtAGlance } from "@/components/content/at-a-glance";
import { FaqList } from "@/components/content/faq-list";
import { InclusionList } from "@/components/content/inclusion-list";
import { RelatedLinks } from "@/components/content/related-links";
import { CloseCta } from "@/components/layout/close-cta";
import { OnThisPage } from "@/components/layout/on-this-page";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { tourPage } from "@/content/pages/tour-page";
import { ui } from "@/content/ui";
import type { MetaPath } from "@/content/meta";
import { ItineraryDay } from "@/features/tours/components/itinerary-day";
import { TourFit } from "@/features/tours/components/tour-fit";
import { TourHero } from "@/features/tours/components/tour-hero";
import { TourPrices } from "@/features/tours/components/tour-prices";
import { Inline } from "@/lib/content/inline";
import { getTour, tourSlugs } from "@/lib/content/tours";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { faqPageSchema, touristTripSchema } from "@/lib/seo/schema";

// Six statically generated tour pages (002 section 1). Unknown slugs are a static 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return tourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return pageMetadata(`/tours/${tour.slug}` as MetaPath, { image: tour.hero.image });
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const anchors = ui.labels.tourAnchors;
  const sections = [
    { id: "overview", label: anchors.overview },
    { id: "day-by-day", label: anchors.dayByDay },
    { id: "included", label: anchors.included },
    { id: "prices", label: anchors.prices },
    ...(tour.goodToKnow ? [{ id: "good-to-know", label: anchors.goodToKnow }] : []),
    { id: "questions", label: anchors.questions },
  ];

  return (
    <>
      <TourHero tour={tour} />
      <OnThisPage links={sections} />

      <Section aria-labelledby="at-a-glance" className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 id="at-a-glance" className="text-display-l">
            {tourPage.atAGlance}
          </h2>
          <AtAGlance rows={tour.atAGlance} />
        </div>
        {tour.fit ? (
          <div className="flex flex-col gap-5">
            <h2 className="text-display-l">{tourPage.fit.heading}</h2>
            <TourFit fit={tour.fit} />
          </div>
        ) : null}
      </Section>

      <Section id="day-by-day" aria-labelledby="day-by-day-heading" className="pt-0 md:pt-0">
        <h2 id="day-by-day-heading" className="mb-4 text-display-l">
          {tourPage.dayByDay}
        </h2>
        <ol className="border-b">
          {tour.itinerary.map((day) => (
            <ItineraryDay key={day.day} day={day} />
          ))}
        </ol>
      </Section>

      <Section id="included" className="grid grid-cols-1 gap-10 pt-0 md:grid-cols-2 md:pt-0">
        <InclusionList heading={tourPage.included} items={tour.included} kind="included" />
        <InclusionList heading={tourPage.notIncluded} items={tour.notIncluded} kind="excluded" />
      </Section>

      <Section id="prices" aria-labelledby="prices-heading" className="flex flex-col gap-5 pt-0 md:pt-0">
        {/* The copy's heading is "Prices (per person, ...)": the qualifier is set smaller, same words. */}
        <h2 id="prices-heading" className="flex flex-col gap-1 text-display-l">
          {tour.pricing.heading.split(" (")[0]}
          <span className="font-sans text-body-l text-muted-foreground">({tour.pricing.heading.split(" (")[1]}</span>
        </h2>
        <TourPrices tour={tour} />
      </Section>

      {tour.goodToKnow ? (
        <Section id="good-to-know" aria-labelledby="good-to-know-heading" className="flex flex-col gap-5 pt-0 md:pt-0">
          <h2 id="good-to-know-heading" className="text-display-l">
            {tourPage.goodToKnow}
          </h2>
          <ul className="measure flex list-disc flex-col gap-3 pl-5 marker:text-clay">
            {tour.goodToKnow.map((item) => (
              <li key={item}>
                <Inline text={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section id="questions" aria-labelledby="questions-heading" className="flex flex-col gap-8 pt-0 md:pt-0">
        <h2 id="questions-heading" className="text-display-l">
          {tourPage.questions}
        </h2>
        <FaqList items={tour.faqs} />
        <RelatedLinks heading={tourPage.related} links={tour.related} />
      </Section>

      <CloseCta content={tour.close} tourSlug={tour.slug} sun />

      <JsonLd data={[touristTripSchema(tour), faqPageSchema(tour.faqs)]} />
      <TrackView event="tour_view" params={{ tour_slug: tour.slug }} />
    </>
  );
}
