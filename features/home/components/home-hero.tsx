import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SiteImage } from "@/components/media/site-image";
import { TripFinder } from "@/features/home/components/trip-finder";
import type { TravelMonth } from "@/features/home/lib/travel-months";
import { home } from "@/lib/content/pages";

export function HomeHero({ months }: { months: TravelMonth[] }) {
  const { hero } = home;
  return (
    <Section id="home-hero" className="flex flex-col gap-8 md:gap-10">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[0.85fr_1.35fr] md:gap-12">
        <div className="flex flex-col gap-5">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="text-display-xl">{hero.h1}</h1>
          <p className="measure-lede text-body-l text-muted-foreground">{hero.lede}</p>
          <Link href={hero.textLink.href} className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-primary underline underline-offset-4">
            {hero.textLink.label}<ArrowRightIcon className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>
        <div className="order-first md:order-last">
          <SiteImage media={{ id: "home-hero" }} preset="hero" priority sizes="(min-width: 1180px) 696px, (min-width: 768px) 61vw, 100vw" className="rounded-lg" />
        </div>
      </div>
      <TripFinder months={months} />
    </Section>
  );
}
