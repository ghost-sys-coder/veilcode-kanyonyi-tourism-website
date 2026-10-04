import { site } from "@/content/site";

// Money formats from docs/copy/01-voice.md: "USD 1,650" in running text, "$1,650" in compact UI
// (cards, tables), "UGX 6,530,000" for shillings. UGX is converted at the single configured rate
// and rounded to the nearest 10,000, matching the copy's own example (USD 1,650 -> UGX 6,530,000).

const grouped = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });

export function formatUsdCompact(usd: number): string {
  return `$${grouped.format(usd)}`;
}

export function formatUsd(usd: number): string {
  return `USD ${grouped.format(usd)}`;
}

export function usdToUgx(usd: number, rate: number = site.currency.ugxPerUsd): number {
  return Math.round((usd * rate) / 10_000) * 10_000;
}

export function formatUgx(usd: number): string {
  return `UGX ${grouped.format(usdToUgx(usd))}`;
}
