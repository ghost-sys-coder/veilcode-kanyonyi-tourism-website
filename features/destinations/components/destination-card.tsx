import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SiteImage } from "@/components/media/site-image";
import { Card, CardContent } from "@/components/ui/card";
import { fill } from "@/lib/content/format";
import { ui } from "@/lib/content/pages";
import type { Destination } from "@/types/content";

export function DestinationCard({ destination, headingLevel = "h2" }: { destination: Destination; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="relative rounded-lg focus-within:ring-2 focus-within:ring-ring">
      <Card className="h-full gap-0 pt-0">
        <SiteImage media={destination.hero.image} preset="card" sizes="(min-width: 1180px) 540px, (min-width: 720px) 50vw, 100vw" />
        <CardContent className="flex flex-col gap-3 py-5">
          <Heading id={`destination-${destination.slug}`} className="text-display-m">{destination.cardName}</Heading>
          <p className="measure text-muted-foreground">{destination.cardLine}</p>
          <Link href={`/destinations/${destination.slug}`} aria-describedby={`destination-${destination.slug}`} className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-primary underline underline-offset-4 after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none">
            {fill(ui.buttons.exploreDestination, { destination: destination.shortName })}<ArrowRightIcon aria-hidden className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}
