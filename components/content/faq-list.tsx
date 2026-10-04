import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Inline } from "@/lib/content/inline";
import type { Faq } from "@/types/content";

/**
 * Questions as an accordion (09-faq.md: "All answers render as accordions"). `hiddenUntilFound`
 * keeps closed answers in the server HTML (hidden="until-found"), so search engines, Ctrl+F and
 * the FAQPage structured data all see the same text. Base UI unmounts closed panels by default.
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Accordion multiple hiddenUntilFound className="rounded-lg border bg-card px-5">
      {items.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger className="py-4 text-left text-base font-semibold">{faq.question}</AccordionTrigger>
          <AccordionContent className="pb-4 text-body">
            <p className="measure">
              <Inline text={faq.answer} />
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
