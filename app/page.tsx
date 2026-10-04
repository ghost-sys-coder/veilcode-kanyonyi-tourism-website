import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SiteImage } from "@/components/media/site-image";
import { home } from "@/content/pages/home";
import { pageMetadata } from "@/lib/seo/page-metadata";

// Interim homepage: the approved hero with its photo. S7 (docs/plan.md) builds the full page:
// trip finder, promises, signature trips, permits, month picker and the rest.

export const metadata = pageMetadata("/", { image: { id: "home-hero" } });

export default function HomePage() {
  const { hero } = home;

  return (
    <section className="container-page section-y grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
      <div className="flex flex-col gap-5">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="text-display-xl">{hero.h1}</h1>
        <p className="measure-lede text-body-l text-muted-foreground">{hero.lede}</p>
        <p>
          <Link
            href={hero.textLink.href}
            className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-4"
          >
            {hero.textLink.label}
            <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
      {/* Text sits beside the photo, never on it (DESIGN.md section 7.1). */}
      <SiteImage
        media={{ id: "home-hero" }}
        preset="hero"
        priority
        sizes="(min-width: 1180px) 620px, (min-width: 768px) 53vw, 100vw"
        className="rounded-lg"
      />
    </section>
  );
}
