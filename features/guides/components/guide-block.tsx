import { ContentTable } from "@/components/content/content-table";
import { FactStamp } from "@/components/content/fact-stamp";
import { PermitTable } from "@/components/content/permit-table";
import { Inline } from "@/lib/content/inline";
import type { GuideBlock as Block } from "@/types/content";

export function GuideBlock({ block, labelledBy }: { block: Block; labelledBy: string }) {
  switch (block.type) {
    case "paragraph":
      return <p className="measure"><Inline text={block.text} /></p>;
    case "list":
    case "orderedList": {
      const List = block.type === "orderedList" ? "ol" : "ul";
      return <List className={`measure flex flex-col gap-3 pl-5 marker:text-clay ${block.type === "orderedList" ? "list-decimal" : "list-disc"}`}>
        {block.items.map((text) => <li key={text}><Inline text={text} /></li>)}
      </List>;
    }
    case "table":
      return <ContentTable columns={block.columns} rows={block.rows} caption={block.caption} labelledBy={labelledBy} />;
    case "permitTable":
      return <PermitTable columns={block.columns} labelledBy={labelledBy} />;
    case "stamp":
      return <FactStamp text={block.text} />;
    case "monthEntry":
      return <div className="grid grid-cols-1 gap-3 border-b pb-6 min-[720px]:grid-cols-[8rem_minmax(0,1fr)]">
        <h3 className="text-display-m">{block.month}</h3>
        <p className="measure"><Inline text={block.text} /></p>
      </div>;
    default: {
      const unreachable: never = block;
      throw new Error(`Unsupported guide block: ${unreachable}`);
    }
  }
}
