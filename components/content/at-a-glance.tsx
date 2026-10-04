import { Inline } from "@/lib/content/inline";
import type { LabelValue } from "@/types/content";

/** Label and value pairs. A <dl>: these are definitions, not tabular data (004 section 5). */
export function AtAGlance({ rows }: { rows: readonly LabelValue[] }) {
  return (
    <dl className="divide-y rounded-lg border bg-card">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-[12rem_1fr] sm:gap-6">
          <dt className="font-mono text-label uppercase tracking-[0.08em] text-muted-foreground sm:pt-1">{row.label}</dt>
          <dd>
            <Inline text={row.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
