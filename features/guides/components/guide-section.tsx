import { Section } from "@/components/layout/section";
import { GuideBlock } from "@/features/guides/components/guide-block";
import type { GuideSection as SectionContent } from "@/types/content";

export function GuideSection({ section }: { section: SectionContent }) {
  const headingId = `${section.id}-heading`;
  return <Section id={section.id} aria-labelledby={headingId} className="flex flex-col gap-6">
    <h2 id={headingId} className="text-display-l">{section.heading}</h2>
    {section.blocks.map((block, index) => <GuideBlock key={index} block={block} labelledBy={headingId} />)}
  </Section>;
}
