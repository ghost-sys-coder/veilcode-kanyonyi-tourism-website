"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { Inline } from "@/lib/content/inline";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { isDemo } from "@/config/demo";
import { whatsappHref } from "@/config/contact";
import { track } from "@/lib/analytics/track";
import { fill } from "@/lib/content/format";
import { planYourTrip } from "@/lib/content/pages";
import { cn } from "@/lib/utils";
import type { EnquiryState } from "../state";

export function EnquirySuccess({ state }: { state: Extract<EnquiryState, { status: "success" }> }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const tracked = useRef(false);
  const copy = isDemo ? planYourTrip.success.demo : planYourTrip.success.live;
  const values = { firstName: state.firstName, reference: state.reference, email: state.email, tourName: state.tourName, month: state.monthLabel };
  const href = whatsappHref();
  useEffect(() => {
    heading.current?.focus();
    if (state.analytics && !tracked.current) { tracked.current = true; track("submit_enquiry", state.analytics); }
  }, [state]);
  return <section aria-labelledby="success-heading" className="flex flex-col gap-5 rounded-lg border border-success bg-success-surface p-6 lg:p-8">
    <p className="eyebrow flex items-center gap-2 text-success"><CircleCheckIcon aria-hidden className="size-5" />{copy.eyebrow}</p>
    <h2 ref={heading} tabIndex={-1} id="success-heading" className="text-h2 outline-none focus-visible:ring-3 focus-visible:ring-ring">{fill(copy.heading, values)}</h2>
    {!isDemo && <p className="text-body"><Inline text={fill(planYourTrip.success.live.reference, values)} /></p>}
    <p className="text-body break-words"><Inline text={fill(copy.body, values)} /></p>
    {!isDemo && <ol className="flex list-decimal flex-col gap-3 pl-5 text-body-s">{planYourTrip.success.live.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
    <div className="flex flex-col items-start gap-3">
      <Link href={isDemo ? planYourTrip.success.demo.primaryHref : "/guides/uganda-gorilla-permits"} className={cn(buttonVariants(), "h-auto min-h-11 whitespace-normal py-3")}>{copy.primary}</Link>
      {href && <WhatsAppLink href={href} location="success" className="min-h-11 py-3 text-primary underline underline-offset-4">{copy.secondary}</WhatsAppLink>}
    </div>
    <p className="text-body-s text-muted-foreground">{planYourTrip.success.emailFallback}</p>
  </section>;
}
