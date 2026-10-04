import { KeyFactsStrip } from "@/components/content/key-facts-strip";
import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { SiteImage } from "@/components/media/site-image";
import { Inline } from "@/lib/content/inline";
import { ui } from "@/lib/content/pages";
import type { Destination } from "@/types/content";

export function DestinationHero({ destination }: { destination: Destination }) {
  return (
    <Section className="flex flex-col gap-8">
      <SiteBreadcrumb trail={[{ label: ui.breadcrumbs.destinations, href: "/destinations" }, { label: destination.shortName, href: `/destinations/${destination.slug}` }]} />
      <div className="grid grid-cols-1 items-center gap-8 min-[720px]:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-5">
          <p className="eyebrow">{ui.breadcrumbs.destinations}</p>
          <h1 className="text-display-l">{destination.name}</h1>
          <p className="measure-lede text-body-l"><Inline text={destination.hero.summary} /></p>
          <KeyFactsStrip facts={destination.hero.keyFacts} />
        </div>
        <SiteImage media={destination.hero.image} preset="hero" priority showCaption className="rounded-lg" sizes="(min-width: 1180px) 540px, (min-width: 720px) 50vw, 100vw" />
      </div>
    </Section>
  );
}
