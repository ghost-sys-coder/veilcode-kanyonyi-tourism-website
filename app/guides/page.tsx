import Link from "next/link";
import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { GuideCard } from "@/features/guides/components/guide-card";
import { getGuides } from "@/lib/content/guides";
import { Inline } from "@/lib/content/inline";
import { guidesIndex, ui } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { itemListSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata("/guides");

export default function GuidesPage() {
  const guides = getGuides();
  const copy = guidesIndex;
  return <>
    <Section className="flex flex-col gap-6">
      <SiteBreadcrumb trail={[{ label: ui.breadcrumbs.guides, href: "/guides" }]} />
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="text-display-l">{copy.h1}</h1>
      <p className="measure-lede text-body-l"><Inline text={copy.intro} /></p>
    </Section>
    <Section className="grid grid-cols-1 gap-6 pt-0 min-[720px]:grid-cols-2 md:pt-0 lg:grid-cols-3">
      {guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
    </Section>
    <CloseCta content={{ heading: copy.close.lead, button: { label: copy.close.whatsappLabel, target: "whatsapp" } }} secondary={<p>{copy.close.faqLead} <Link href="/faq" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{copy.close.faqLabel}</Link></p>} />
    <JsonLd data={itemListSchema(guides.map((guide) => ({ name: guide.title, href: `/guides/${guide.slug}` })))} />
  </>;
}
