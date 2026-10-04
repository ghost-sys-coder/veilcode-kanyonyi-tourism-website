import Link from "next/link";
import { FaqList } from "@/components/content/faq-list";
import { Section } from "@/components/layout/section";
import { home } from "@/lib/content/pages";

export function HomeQuestions() {
  const content = home.questions;
  return <Section id="questions" aria-labelledby="questions-heading" className="flex flex-col gap-6">
    <h2 id="questions-heading" className="text-display-l">{content.h2}</h2>
    <FaqList items={content.items} />
    <Link href="/faq" className="min-h-11 self-start font-semibold text-primary underline underline-offset-4">{content.link}</Link>
  </Section>;
}
