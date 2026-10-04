import Link from "next/link";
import { Section } from "@/components/layout/section";
import { FactStamp } from "@/components/content/fact-stamp";
import { MonthPicker } from "@/features/home/components/month-picker";
import type { TravelMonth } from "@/features/home/lib/travel-months";
import { home, ui } from "@/lib/content/pages";

export function HomeSeasons({ months }: { months: TravelMonth[] }) {
  const content = home.whenToGo;
  return <div className="bg-band text-band-foreground">
    <Section id="seasons" aria-labelledby="seasons-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="eyebrow text-band-accent">{content.eyebrow}</p>
        <h2 id="seasons-heading" className="text-display-l">{content.h2}</h2>
        <p className="measure-lede text-body-l">{content.intro}</p>
      </div>
      <MonthPicker months={months} />
      <FactStamp text={ui.factStamp} className="text-band-foreground" />
      <Link href="/guides/best-time-to-visit-uganda" className="min-h-11 self-start rounded-sm font-semibold underline underline-offset-4 focus-visible:outline-band-foreground">{content.link}</Link>
    </Section>
  </div>;
}
