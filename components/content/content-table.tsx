import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Inline } from "@/lib/content/inline";
import type { RichText } from "@/types/content";

/** Wrapping cells keep the guide and policy tables readable within a 360px page. */
export function ContentTable({ columns, rows, caption, labelledBy }: {
  columns: readonly string[];
  rows: readonly (readonly RichText[])[];
  caption?: RichText;
  labelledBy?: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border bg-card">
      <Table aria-labelledby={labelledBy} className="table-fixed text-body-s md:text-body">
        {caption ? <TableCaption className="px-3 pb-3"><Inline text={caption} /></TableCaption> : null}
        <TableHeader>
          <TableRow>
            {columns.map((column) => <TableHead key={column} scope="col" className="p-2 align-top whitespace-normal md:p-4">{column}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => j === 0 ? (
                <TableHead key={j} scope="row" className="p-2 align-top font-medium whitespace-normal md:p-4"><Inline text={cell} /></TableHead>
              ) : (
                <TableCell key={j} className="p-2 align-top whitespace-normal md:p-4"><Inline text={cell} /></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
