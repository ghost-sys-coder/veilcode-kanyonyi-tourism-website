import { Section } from "@/components/layout/section";
import { home } from "@/lib/content/pages";

export function HomeBookingSteps() {
  const content = home.howItWorks;
  return <div className="bg-secondary">
    <Section id="how-it-works" aria-labelledby="booking-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="booking-heading" className="text-display-l">{content.h2}</h2>
      </div>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {content.steps.map((step, index) => <li key={step.title} className="flex flex-col gap-4">
          <span aria-hidden className="flex size-11 items-center justify-center rounded-full border border-primary font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-display-m">{step.title}</h3>
          <p className="measure text-muted-foreground">{step.body}</p>
        </li>)}
      </ol>
      <p className="measure text-body-s text-muted-foreground">{content.paymentMethods}</p>
    </Section>
  </div>;
}
