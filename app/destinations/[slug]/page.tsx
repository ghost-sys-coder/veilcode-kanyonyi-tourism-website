import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/track-view";
import { AtAGlance } from "@/components/content/at-a-glance";
import { FaqList } from "@/components/content/faq-list";
import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { DestinationHero } from "@/features/destinations/components/destination-hero";
import { DestinationActivities } from "@/features/destinations/components/destination-activities";
import { TripCard } from "@/features/tours/components/trip-card";
import { destinationSlugs, getDestination } from "@/lib/content/destinations";
import { Inline } from "@/lib/content/inline";
import { destinationPage } from "@/lib/content/pages";
import { getToursForDestination } from "@/lib/content/tours";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { faqPageSchema, touristDestinationSchema } from "@/lib/seo/schema";

export const dynamicParams = false;
export function generateStaticParams() { return destinationSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const destination = getDestination((await params).slug);
  if (!destination) notFound();
  return pageMetadata(`/destinations/${destination.slug}`, { image: destination.hero.image });
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const destination = getDestination((await params).slug);
  if (!destination) notFound();
  const copy = destinationPage;
  return (
    <>
      <DestinationHero destination={destination} />
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.atAGlance}</h2>
        <AtAGlance rows={destination.atAGlance} />
      </Section>
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.whyGo}</h2>
        {destination.whyGo.map((text) => <p key={text} className="measure"><Inline text={text} /></p>)}
      </Section>
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.activities}</h2>
        <DestinationActivities activities={destination.activities} />
      </Section>
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.whenToGo}</h2>
        <p className="measure"><Inline text={destination.whenToGo} /></p>
      </Section>
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.gettingThere}</h2>
        <p className="measure"><Inline text={destination.gettingThere} /></p>
      </Section>
      {destination.goodToKnow?.length ? (
        <Section className="flex flex-col gap-5 pt-0 md:pt-0">
          <h2 className="text-display-l">{copy.goodToKnow}</h2>
          <ul className="measure flex list-disc flex-col gap-3 pl-5 marker:text-clay">
            {destination.goodToKnow.map((text) => <li key={text}><Inline text={text} /></li>)}
          </ul>
        </Section>
      ) : null}
      <Section id="tours" className="flex flex-col gap-6 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.toursThatVisit} {destination.shortName}</h2>
        <div className="grid grid-cols-1 gap-6 min-[720px]:grid-cols-2 lg:grid-cols-3">
          {getToursForDestination(destination.slug).map((tour) => <TripCard key={tour.slug} tour={tour} list="destination" />)}
        </div>
      </Section>
      <Section id="questions" className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 className="text-display-l">{copy.questions}</h2>
        <FaqList items={destination.faqs} />
      </Section>
      <CloseCta content={destination.close} />
      <JsonLd data={[touristDestinationSchema(destination), faqPageSchema(destination.faqs)]} />
      <TrackView event="destination_view" params={{ destination_slug: destination.slug }} />
    </>
  );
}
