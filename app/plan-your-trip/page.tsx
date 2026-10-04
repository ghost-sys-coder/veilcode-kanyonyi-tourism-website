import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { pickVariant } from "@/config/demo";
import { planYourTrip, ui } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";

// Keeps conversion links useful until S8 supplies the enquiry form, storage and emails.
export const metadata = pageMetadata("/plan-your-trip");

export default function PlanYourTripPage() {
  return <>
    <Section className="flex flex-col gap-6">
      <SiteBreadcrumb trail={[{ label: ui.buttons.planMyTrip, href: "/plan-your-trip" }]} />
      <p className="eyebrow">{planYourTrip.eyebrow}</p>
      <h1 className="max-w-[22ch] text-display-l">{planYourTrip.h1}</h1>
      <p className="measure-lede text-body-l">{planYourTrip.lede}</p>
    </Section>
    <CloseCta content={{ heading: planYourTrip.sidePanel.preferToTalk, body: pickVariant(planYourTrip.interimBody), button: { label: planYourTrip.sidePanel.whatsappLabel, target: "whatsapp" } }} secondary={<p className="measure text-body-s text-muted-foreground">{planYourTrip.sidePanel.hoursLabel} {planYourTrip.sidePanel.hours}</p>} />
  </>;
}
