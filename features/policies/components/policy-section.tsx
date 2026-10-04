import { ContentTable } from "@/components/content/content-table";
import { Section } from "@/components/layout/section";
import { Inline } from "@/lib/content/inline";
import type { PolicySection as SectionContent } from "@/lib/content/pages";

export function PolicySection({ section, index }: { section: SectionContent; index: number }) {
  const id = `policy-section-${index}`;
  return <Section aria-labelledby={id} className="flex flex-col gap-5 pt-0 md:pt-0">
    <h2 id={id} className="text-display-m">{section.heading}</h2>
    {section.paragraphs.map((text) => <p key={text} className="measure"><Inline text={text} /></p>)}
    {section.table ? <ContentTable columns={section.table.columns} rows={section.table.rows} labelledBy={id} /> : null}
    {section.after?.map((text) => <p key={text} className="measure"><Inline text={text} /></p>)}
  </Section>;
}
