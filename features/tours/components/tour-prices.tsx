import { FactStamp } from "@/components/content/fact-stamp";
import { Price } from "@/components/content/price";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tourPage } from "@/content/pages/tour-page";
import { fill } from "@/lib/content/format";
import { Inline } from "@/lib/content/inline";
import { TABLE_GROUP_SIZES, pricePerPerson } from "@/lib/content/pricing";
import type { Tour } from "@/types/content";

/** Price table: every row computed from the 04-tours.md price model, never typed in by hand. */
export function TourPrices({ tour }: { tour: Tour }) {
  const { pricing } = tour;
  const lowSeason = pricing.showLowSeasonColumn;

  return (
    <div className="flex flex-col gap-4">
      <Table className="rounded-lg border bg-card text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">{tourPage.prices.groupSize}</TableHead>
            <TableHead className="px-4 text-right">{lowSeason ? tourPage.prices.standardDates : tourPage.prices.price}</TableHead>
            {lowSeason ? <TableHead className="px-4 text-right">{pricing.lowSeasonLabel}</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {TABLE_GROUP_SIZES.map((n) => (
            <TableRow key={n}>
              <TableCell className="px-4">{fill(tourPage.prices.travellers, { n })}</TableCell>
              <TableCell className="px-4 text-right">
                <Price usd={pricePerPerson(pricing, n)} className="price text-lg" />
              </TableCell>
              {lowSeason ? (
                <TableCell className="px-4 text-right">
                  <Price usd={pricePerPerson(pricing, n, { lowSeason: true })} className="price text-lg" />
                </TableCell>
              ) : null}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="px-4">{tourPage.prices.singleSupplement}</TableCell>
            <TableCell className="px-4 text-right">
              <Price usd={pricing.singleSupplementUSD} className="price text-lg" />
            </TableCell>
            {lowSeason ? (
              <TableCell className="px-4 text-right">
                <Price usd={pricing.singleSupplementUSD} className="price text-lg" />
              </TableCell>
            ) : null}
          </TableRow>
          {pricing.extraRows?.map((row) => (
            <TableRow key={row.label}>
              <TableCell className="px-4 whitespace-normal">{row.label}</TableCell>
              <TableCell className="px-4 text-right whitespace-normal" colSpan={lowSeason ? 2 : 1}>
                <Inline text={row.value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pricing.footnote ? (
        <p className="measure text-body-s text-muted-foreground">
          <Inline text={pricing.footnote} />
        </p>
      ) : null}
      {tour.includesPrimatePermits ? <FactStamp /> : null}
    </div>
  );
}
