import { ContentTable } from "@/components/content/content-table";
import { FactStamp } from "@/components/content/fact-stamp";
import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import { getDestinations } from "@/lib/content/destinations";
import { Inline } from "@/lib/content/inline";
import { destinationsHub, ui } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { itemListSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata("/destinations");

export default function DestinationsPage() {
  const destinations = getDestinations();
  return (
    <>
      <Section className="flex flex-col gap-6">
        <SiteBreadcrumb trail={[{ label: ui.breadcrumbs.destinations, href: "/destinations" }]} />
        <p className="eyebrow">{destinationsHub.eyebrow}</p>
        <h1 className="text-display-l">{destinationsHub.h1}</h1>
        <p className="measure-lede text-body-l"><Inline text={destinationsHub.intro} /></p>
      </Section>
      <Section className="grid grid-cols-1 gap-6 pt-0 min-[720px]:grid-cols-2 md:pt-0">
        {destinations.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}
      </Section>
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <p id="drive-times" className="measure">{destinationsHub.mapCaption}</p>
        <ContentTable labelledBy="drive-times" columns={destinationsHub.tableColumns} rows={destinations.map((d) => [`[${d.cardName}](/destinations/${d.slug})`, d.hub.forLine, d.hub.driveFromKampala])} />
        <FactStamp />
      </Section>
      <CloseCta content={{ heading: destinationsHub.close.lead, button: { label: destinationsHub.close.button, target: "enquiry" } }} />
      <JsonLd data={itemListSchema(destinations.map((d) => ({ name: d.name, href: `/destinations/${d.slug}` })))} />
    </>
  );
}
