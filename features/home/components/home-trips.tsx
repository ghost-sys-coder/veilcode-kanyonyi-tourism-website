import Link from "next/link";
import { Section } from "@/components/layout/section";
import { TripCard } from "@/features/tours/components/trip-card";
import { home } from "@/lib/content/pages";
import { getTours } from "@/lib/content/tours";

export function HomeTrips() {
  const content = home.signatureTrips;
  return <Section id="trips" aria-labelledby="trips-heading" className="flex flex-col gap-8">
    <div className="flex flex-col gap-4">
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 id="trips-heading" className="text-display-l">{content.h2}</h2>
      <p className="measure-lede text-body-l text-muted-foreground">{content.intro}</p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {getTours().map((tour) => <TripCard key={tour.slug} tour={tour} list="home" />)}
    </div>
    <Link href="/tours" className="min-h-11 self-start font-semibold text-primary underline underline-offset-4">{content.link}</Link>
  </Section>;
}
