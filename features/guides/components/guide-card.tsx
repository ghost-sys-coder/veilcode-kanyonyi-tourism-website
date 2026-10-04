import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteImage } from "@/components/media/site-image";
import { fill, formatContentDate } from "@/lib/content/format";
import { guidePage, ui } from "@/lib/content/pages";
import type { Guide } from "@/types/content";

export function GuideCard({ guide }: { guide: Guide }) {
  return <article className="relative rounded-lg focus-within:ring-2 focus-within:ring-ring">
    <Card className="h-full gap-0 pt-0">
      <SiteImage media={guide.image} preset="card" />
      <CardContent className="flex flex-1 flex-col gap-3 py-5">
        <p className="eyebrow">{fill(guidePage.eyebrow, { date: formatContentDate(guide.dateModified) })}</p>
        <h2 id={`guide-${guide.slug}`} className="text-display-m">{guide.title}</h2>
        <p className="measure text-muted-foreground">{guide.cardLine}</p>
        <Link href={`/guides/${guide.slug}`} aria-describedby={`guide-${guide.slug}`} className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-primary underline underline-offset-4 after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none">
          {ui.buttons.readGuide}<ArrowRightIcon aria-hidden className="size-4" />
        </Link>
      </CardContent>
    </Card>
  </article>;
}
