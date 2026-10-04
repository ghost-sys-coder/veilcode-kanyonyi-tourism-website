import { Section } from "@/components/layout/section";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import { getDestinations } from "@/lib/content/destinations";
import { home } from "@/lib/content/pages";

export function HomeDestinations() {
  const content = home.destinations;
  return <Section id="destinations" aria-labelledby="destinations-heading" className="flex flex-col gap-8">
    <div className="flex flex-col gap-4">
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 id="destinations-heading" className="text-display-l">{content.h2}</h2>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {getDestinations().map((destination) => <DestinationCard key={destination.slug} destination={destination} headingLevel="h3" />)}
    </div>
  </Section>;
}
