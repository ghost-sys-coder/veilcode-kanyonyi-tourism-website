import { ContentTable } from "@/components/content/content-table";
import { FactStamp } from "@/components/content/fact-stamp";
import { gorillaPermitRows, permitTables } from "@/lib/content/facts";

/** One source of permit fees for the guide and S7 homepage. Official fees retain their currency. */
export function PermitTable({ columns, labelledBy }: { columns: "guide" | "home"; labelledBy?: string }) {
  const content = permitTables[columns];
  const rows = gorillaPermitRows.map((row) => columns === "guide"
    ? [row.visitorLong ?? row.visitor, row.standard, row.lowSeason2026, row.from2027]
    : [row.visitor, row.standard, row.lowSeason2026]);
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <ContentTable columns={content.columns} rows={rows} labelledBy={labelledBy} />
      <FactStamp text={content.stamp} />
    </div>
  );
}
