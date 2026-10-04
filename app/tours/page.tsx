import { Suspense } from "react";
import { CircleAlertIcon } from "lucide-react";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toursListing } from "@/content/pages/tours-listing";
import { ui } from "@/content/ui";
import { TripCard } from "@/features/tours/components/trip-card";
import { TourResults, type ResultItem } from "@/features/tours/components/tour-results";
import { getMonthNotes } from "@/lib/content/seasons";
import { priceFrom } from "@/lib/content/pricing";
import { getTours } from "@/lib/content/tours";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { itemListSchema } from "@/lib/seo/schema";

// Static page. Filters run in the browser over these server-rendered cards and every filtered
// URL canonicalises to /tours (002 section 4).
export const metadata = pageMetadata("/tours");

export default function ToursPage() {
  const tours = getTours();
  const items: ResultItem[] = tours.map((tour, order) => ({
    data: {
      slug: tour.slug,
      order,
      days: tour.days,
      priceFrom: priceFrom(tour.pricing),
      categories: tour.categories,
      bestMonths: tour.bestMonths,
      includesPrimatePermits: tour.includesPrimatePermits,
    },
    card: <TripCard tour={tour} list="tours" headingLevel="h2" />,
  }));
  const monthNotes = Object.fromEntries(getMonthNotes().map((m) => [m.month, m.note]));

  // Before the URL is read (and for crawlers), every card in recommended order.
  const allCards = (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.data.slug} className="flex">
          {item.card}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Section className="flex flex-col gap-5 pt-6 md:pt-6">
        <SiteBreadcrumb trail={[{ label: ui.breadcrumbs.tours, href: "/tours" }]} />
        <p className="eyebrow mt-4">{toursListing.eyebrow}</p>
        <h1 className="max-w-[24ch] text-display-l">{toursListing.h1}</h1>
        <p className="measure-lede text-body-l text-muted-foreground">{toursListing.intro}</p>
      </Section>

      <Section className="flex flex-col gap-8 pt-0 md:pt-0">
        <Suspense fallback={allCards}>
          <TourResults items={items} monthNotes={monthNotes} />
        </Suspense>
        <p className="measure text-body-s text-muted-foreground">{toursListing.priceNote}</p>
        <Alert className="max-w-3xl border-warning bg-warning-surface text-warning">
          <CircleAlertIcon aria-hidden />
          <AlertTitle className="font-semibold">{toursListing.callout2027.title}</AlertTitle>
          <AlertDescription className="text-warning">{toursListing.callout2027.body}</AlertDescription>
        </Alert>
      </Section>

      <CloseCta
        content={{
          heading: toursListing.close.heading,
          body: toursListing.close.body,
          button: { label: toursListing.close.button, target: "enquiry" },
        }}
        tourSlug="custom"
      />

      <JsonLd data={itemListSchema(tours.map((t) => ({ name: t.name, href: `/tours/${t.slug}` })))} />
    </>
  );
}
