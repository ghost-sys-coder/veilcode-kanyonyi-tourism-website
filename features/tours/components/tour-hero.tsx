import { KeyFactsStrip } from "@/components/content/key-facts-strip";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { ui } from "@/content/ui";
import { Inline } from "@/lib/content/inline";
import type { Tour } from "@/types/content";
import { TourPriceBox } from "./tour-price-box";

/** Hero: tag, H1, summary, key facts and the price box (04-tours.md layout, item 1). */
export function TourHero({ tour }: { tour: Tour }) {
  return (
    <section id="overview" className="container-page scroll-mt-24 pt-6 pb-12 md:pb-16">
      <SiteBreadcrumb
        trail={[
          { label: ui.breadcrumbs.tours, href: "/tours" },
          { label: tour.name, href: `/tours/${tour.slug}` },
        ]}
      />
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-5">
          <Badge variant="tag" className="font-semibold">
            {tour.tag}
          </Badge>
          <h1 className="text-display-l">{tour.name}</h1>
          <p className="measure-lede text-body-l">
            <Inline text={tour.hero.summary} />
          </p>
          <KeyFactsStrip facts={tour.hero.keyFacts} />
          <TourPriceBox tour={tour} />
        </div>
        <SiteImage
          media={tour.hero.image}
          preset="card"
          priority
          showCaption
          sizes="(min-width: 1180px) 560px, (min-width: 1024px) 48vw, 100vw"
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
