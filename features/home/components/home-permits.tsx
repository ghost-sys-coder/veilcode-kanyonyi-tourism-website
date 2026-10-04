import Link from "next/link";
import { PermitTable } from "@/components/content/permit-table";
import { Section } from "@/components/layout/section";
import { home } from "@/lib/content/pages";

export function HomePermits() {
  const content = home.permits;
  return <div className="bg-card">
    <Section id="permits" aria-labelledby="permits-heading" className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      <div className="flex flex-col gap-4">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="permits-heading" className="text-display-l">{content.h2}</h2>
        {content.body.map((paragraph) => <p key={paragraph} className="measure text-muted-foreground">{paragraph}</p>)}
        <Link href="/guides/uganda-gorilla-permits" className="min-h-11 self-start font-semibold text-primary underline underline-offset-4">{content.link}</Link>
      </div>
      <PermitTable columns="home" labelledBy="permits-heading" />
    </Section>
  </div>;
}
