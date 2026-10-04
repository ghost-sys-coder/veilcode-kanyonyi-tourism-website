import { Section } from "@/components/layout/section";
import { CloseCta } from "@/components/layout/close-cta";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { SiteImage } from "@/components/media/site-image";
import { JsonLd } from "@/components/seo/json-ld";
import { whatsappHref } from "@/config/contact";
import { pickVariant } from "@/config/demo";
import { AboutTeam } from "@/features/about/components/about-team";
import { Inline } from "@/lib/content/inline";
import { about } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { aboutPageSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata("/about", { image: { id: "about-vehicle" } });

export default function AboutPage() {
  const licences = pickVariant(about.licences);
  const whatsapp = whatsappHref();
  return <>
    <Section className="flex flex-col gap-8">
      <SiteBreadcrumb trail={[{ label: about.eyebrow, href: "/about" }]} />
      <div className="grid grid-cols-1 items-center gap-8 min-[720px]:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-5">
          <p className="eyebrow">{about.eyebrow}</p>
          <h1 className="text-display-l">{about.h1}</h1>
          <p className="measure-lede text-body-l"><Inline text={about.lede} /></p>
        </div>
        <SiteImage media={{ id: "about-vehicle" }} preset="hero" priority showCaption className="rounded-lg" sizes="(min-width: 1180px) 540px, (min-width: 720px) 50vw, 100vw" />
      </div>
    </Section>
    <Section className="flex flex-col gap-6 pt-0 md:pt-0">
      <h2 className="text-display-l">{about.howWeWork.heading}</h2>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-8 min-[720px]:grid-cols-2">
        {about.howWeWork.items.map((item) => <li key={item.title} className="flex flex-col gap-3 border-t pt-5">
          <h3 className="text-display-m">{item.title}</h3>
          <p className="measure"><Inline text={item.body} /></p>
        </li>)}
      </ul>
    </Section>
    <Section className="flex flex-col gap-5 pt-0 md:pt-0">
      <h2 className="text-display-l">{about.whatWeDont.heading}</h2>
      <ul className="measure flex list-disc flex-col gap-3 pl-5 marker:text-clay">
        {about.whatWeDont.items.map((item) => <li key={item}><Inline text={item} /></li>)}
      </ul>
    </Section>
    <AboutTeam />
    {licences ? <Section className="flex flex-col gap-5 pt-0 md:pt-0">
      <h2 className="text-display-l">{about.licences.heading}</h2>
      <p className="measure"><Inline text={licences} /></p>
    </Section> : null}
    <CloseCta content={{ heading: about.close.heading, body: about.close.body, button: { label: about.close.primary, target: "enquiry" } }} secondary={whatsapp ? <WhatsAppLink href={whatsapp} location="closing_cta" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{about.close.secondary}</WhatsAppLink> : null} />
    <JsonLd data={aboutPageSchema()} />
  </>;
}
