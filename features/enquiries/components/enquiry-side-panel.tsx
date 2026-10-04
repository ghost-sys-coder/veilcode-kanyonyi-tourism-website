import { MessageCircleIcon } from "lucide-react";
import { FactStamp } from "@/components/content/fact-stamp";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { pickVariant } from "@/config/demo";
import { whatsappDisplay, whatsappHref } from "@/config/contact";
import { planYourTrip } from "@/lib/content/pages";
import { cn } from "@/lib/utils";

export function EnquirySidePanel() {
  const copy = pickVariant<{ heading: string; steps: readonly string[] }>(planYourTrip.sidePanel);
  const href = whatsappHref();
  return <aside className="flex flex-col gap-6 rounded-lg border bg-secondary p-6 lg:sticky lg:top-28 lg:p-8">
    <h2 className="text-h3">{copy.heading}</h2>
    <ol className="flex flex-col gap-5">
      {copy.steps.map((step, i) => <li key={step} className="flex gap-3 text-body-s"><span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/30 font-mono text-primary" aria-hidden>{i + 1}</span><span>{step}</span></li>)}
    </ol>
    <div className="border-t pt-6">
      <h3 className="mb-3 font-semibold">{planYourTrip.sidePanel.preferToTalk}</h3>
      {href && <WhatsAppLink href={href} location="plan_page" className={cn(buttonVariants({ variant: "outline" }), "h-auto min-h-11 w-full flex-wrap whitespace-normal py-3")}><MessageCircleIcon aria-hidden />{planYourTrip.sidePanel.whatsappLabel}</WhatsAppLink>}
      {whatsappDisplay && <p className="mt-3 text-body-s tabular-nums">{whatsappDisplay}</p>}
      <p className="mt-4 text-body-s text-muted-foreground">{planYourTrip.sidePanel.hoursLabel} {planYourTrip.sidePanel.hours}</p>
    </div>
    <FactStamp className="border-t pt-5" />
  </aside>;
}
