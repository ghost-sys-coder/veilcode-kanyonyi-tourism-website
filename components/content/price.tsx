import { formatUgx, formatUsd, formatUsdCompact } from "@/lib/content/money";
import { cn } from "@/lib/utils";

/**
 * A price in both currencies. Both spans are in the static HTML; CSS shows the one matching
 * html[data-currency] (004 section 7), so prices never need client JavaScript.
 */
export function Price({
  usd,
  format = "compact",
  className,
}: {
  usd: number;
  format?: "compact" | "text";
  className?: string;
}) {
  return (
    <span className={cn("tabular-nums", className)}>
      <span data-ccy="usd">{format === "compact" ? formatUsdCompact(usd) : formatUsd(usd)}</span>
      <span data-ccy="ugx">{formatUgx(usd)}</span>
    </span>
  );
}
