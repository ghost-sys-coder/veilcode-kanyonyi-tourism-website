import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { home } from "@/content/pages/home";
import { pageMetadata } from "@/lib/seo/page-metadata";

// Interim homepage: the approved hero only. S7 (docs/plan.md) builds the full page:
// hero photo, trip finder, promises, signature trips, permits, month picker and the rest.

export const metadata = pageMetadata("/");

export default function HomePage() {
  const { hero } = home;

  return (
    <section className="container-page section-y flex flex-col gap-5">
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="max-w-[16ch] text-display-xl">{hero.h1}</h1>
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
    </section>
  );
}
