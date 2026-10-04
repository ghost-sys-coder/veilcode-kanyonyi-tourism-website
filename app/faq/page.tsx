import { FaqList } from "@/components/content/faq-list";
import { FactStamp } from "@/components/content/fact-stamp";
import { BackToTop } from "@/components/layout/back-to-top";
import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { faqGroups, faqPage, guidesIndex } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { faqPageSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata("/faq");

export default function FaqPage() {
  return <>
    <Section className="flex flex-col gap-6">
      <SiteBreadcrumb trail={[{ label: guidesIndex.close.faqLabel, href: "/faq" }]} />
      <h1 className="text-display-l">{faqPage.h1}</h1>
      <p className="measure-lede text-body-l">{faqPage.lede}</p>
    </Section>
    <div className="mx-auto max-w-[860px]">
      {faqGroups.map((group, index) => <Section key={group.heading} aria-labelledby={`faq-group-${index}`} className="flex flex-col gap-5 pt-0 md:pt-0">
        <h2 id={`faq-group-${index}`} className="text-display-l">{group.heading}</h2>
        <FaqList items={group.items} />
      </Section>)}
      <Section className="flex flex-col gap-5 pt-0 md:pt-0">
        <FactStamp text={faqPage.stamp} />
        <BackToTop />
      </Section>
    </div>
    <CloseCta content={{ heading: guidesIndex.close.lead, button: { label: guidesIndex.close.whatsappLabel, target: "whatsapp" } }} />
    <JsonLd data={faqPageSchema(faqGroups.flatMap((group) => group.items))} />
  </>;
}
