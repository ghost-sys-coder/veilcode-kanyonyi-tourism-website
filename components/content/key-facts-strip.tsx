/** The hero facts line ("3 days · Starts and ends in Kampala or Entebbe · ..."). */
export function KeyFactsStrip({ facts }: { facts: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-label uppercase tracking-[0.08em] text-muted-foreground">
      {facts.map((fact, index) => (
        <li key={fact} className="flex items-center gap-3">
          {index > 0 ? <span aria-hidden>·</span> : null}
          {fact}
        </li>
      ))}
    </ul>
  );
}
