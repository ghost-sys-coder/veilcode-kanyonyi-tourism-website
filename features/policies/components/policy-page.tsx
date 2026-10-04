import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CloseCta } from "@/components/layout/close-cta";
import { Section } from "@/components/layout/section";
import { SiteBreadcrumb } from "@/components/layout/site-breadcrumb";
import { isDemo, pickVariant } from "@/config/demo";
import { PolicySection } from "@/features/policies/components/policy-section";
import { about, demoPolicyNotice, updatedLabel, type PolicyPage as PageContent } from "@/lib/content/pages";

export function PolicyPage({ content, href }: { content: PageContent; href: string }) {
  return <>
    <div className="mx-auto max-w-[860px]">
      <Section className="flex flex-col gap-6">
        <SiteBreadcrumb trail={[{ label: content.h1, href }]} />
        {isDemo ? <Alert className="p-4"><InfoIcon aria-hidden /><AlertDescription className="text-foreground">{demoPolicyNotice}</AlertDescription></Alert> : null}
        <h1 className="text-display-l">{content.h1}</h1>
        <p className="text-body-s text-muted-foreground">{updatedLabel} {content.updated}</p>
      </Section>
      {pickVariant(content.sections).map((section, index) => <PolicySection key={section.heading} section={section} index={index} />)}
    </div>
    <CloseCta content={{ heading: about.close.heading, body: about.close.body, button: { label: about.close.primary, target: "enquiry" } }} />
  </>;
}
