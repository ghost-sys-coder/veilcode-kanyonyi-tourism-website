import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelatedLinks } from "@/components/content/related-links";
import { FactStamp } from "@/components/content/fact-stamp";
import { BackToTop } from "@/components/layout/back-to-top";
import { CloseCta } from "@/components/layout/close-cta";
import { OnThisPage } from "@/components/layout/on-this-page";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { GuideHero } from "@/features/guides/components/guide-hero";
import { GuideSection } from "@/features/guides/components/guide-section";
import { getGuide, guideSlugs } from "@/lib/content/guides";
import { guidePage, ui } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { articleSchema } from "@/lib/seo/schema";

export const dynamicParams = false;
export function generateStaticParams() { return guideSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return pageMetadata(`/guides/${guide.slug}`, { type: "article", image: guide.image });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <>
    <GuideHero guide={guide} />
    {guide.jumpLinks ? <OnThisPage heading={ui.labels.guideJumpLinks} links={guide.jumpLinks} /> : null}
    <article className="mx-auto max-w-[860px]">
      {guide.sections.map((section) => <GuideSection key={section.id} section={section} />)}
    </article>
    <Section className="flex flex-col gap-6 pt-0 md:pt-0">
      {guide.factStamp ? <FactStamp text={guide.factStamp} /> : null}
      <RelatedLinks heading={guidePage.related} links={guide.related} />
      <BackToTop />
    </Section>
    <CloseCta content={guide.close} />
    <JsonLd data={articleSchema(guide)} />
  </>;
}
