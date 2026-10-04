import { tourPage } from "@/content/pages/tour-page";
import { Inline } from "@/lib/content/inline";
import type { ItineraryDay as Day } from "@/types/content";

/** One day: mono "Day n" label, title, labelled facts (hours on the road, meals) and the body. */
export function ItineraryDay({ day }: { day: Day }) {
  const facts = (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-body-s text-muted-foreground">
      {day.facts.map((fact) => (
        <li key={fact.label}>
          <span className="font-semibold text-foreground">{fact.label}:</span> <Inline text={fact.value} />
        </li>
      ))}
    </ul>
  );

  return (
    <li className="grid grid-cols-1 gap-2 border-t py-5 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
      <p className="font-mono text-label uppercase tracking-[0.08em] text-clay sm:pt-1.5">
        {tourPage.day} {day.day}
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="text-display-m">{day.title}</h3>
        {day.factsAfterBody ? null : facts}
        <p className="measure">
          <Inline text={day.body} />
        </p>
        {day.factsAfterBody ? facts : null}
      </div>
    </li>
  );
}
