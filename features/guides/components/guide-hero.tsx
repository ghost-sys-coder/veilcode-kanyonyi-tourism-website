import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { SiteImage } from "@/components/media/site-image";
import { fill, formatContentDate } from "@/lib/content/format";
import { Inline } from "@/lib/content/inline";
import { guidePage, ui } from "@/lib/content/pages";
import type { Guide } from "@/types/content";

export function GuideHero({ guide }: { guide: Guide }) {
  return <Section className="flex flex-col gap-8">
    <SiteBreadcrumb trail={[{ label: ui.breadcrumbs.guides, href: "/guides" }, { label: guide.h1, href: `/guides/${guide.slug}` }]} />
    <div className="grid grid-cols-1 items-center gap-8 min-[720px]:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-5">
        <p className="eyebrow">{fill(guidePage.eyebrow, { date: formatContentDate(guide.dateModified) })}</p>
        <h1 className="text-display-l">{guide.h1}</h1>
        <p className="measure-lede text-body-l"><Inline text={guide.lede} /></p>
        <p className="text-body-s text-muted-foreground">{guide.author}</p>
      </div>
      <SiteImage media={guide.image} preset="hero" priority showCaption className="rounded-lg" sizes="(min-width: 1180px) 540px, (min-width: 720px) 50vw, 100vw" />
    </div>
  </Section>;
}
