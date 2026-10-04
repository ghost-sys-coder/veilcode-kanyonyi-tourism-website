import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { EnquiryForm } from "@/features/enquiries/components/enquiry-form";
import { EnquirySidePanel } from "@/features/enquiries/components/enquiry-side-panel";
import { getEnquiryMonths, tourOptions } from "@/features/enquiries/options";
import { planYourTrip, ui } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata("/plan-your-trip");

export default async function PlanYourTripPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const preselectedTour = typeof query.tour === "string" && tourOptions.some(({ value }) => value === query.tour) ? query.tour : undefined;
  const param = (name: string) => typeof query[name] === "string" ? query[name].slice(0, 100) : "";
  return <>
    <Section className="flex flex-col gap-6">
      <SiteBreadcrumb trail={[{ label: ui.buttons.planMyTrip, href: "/plan-your-trip" }]} />
      <p className="eyebrow">{planYourTrip.eyebrow}</p>
      <h1 className="max-w-[22ch] text-display-l">{planYourTrip.h1}</h1>
      <p className="measure-lede text-body-l">{planYourTrip.lede}</p>
    </Section>
    <Section className="grid items-start gap-10 pt-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
      <EnquiryForm preselectedTour={preselectedTour} months={getEnquiryMonths(new Date())} attribution={{ utmSource: param("utm_source"), utmMedium: param("utm_medium"), utmCampaign: param("utm_campaign") }} />
      <EnquirySidePanel />
    </Section>
  </>;
}
