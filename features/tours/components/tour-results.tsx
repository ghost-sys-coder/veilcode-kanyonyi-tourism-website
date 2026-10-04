"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ui } from "@/content/ui";
import { track } from "@/lib/analytics/track";
import { fill } from "@/lib/content/format";
import { cn } from "@/lib/utils";
import {
  applyFilters,
  parseFilters,
  resultsLine,
  toQueryString,
  type FilterableTour,
  type TourFilters,
} from "@/features/tours/lib/filters";
import { TourFilterBar } from "./tour-filter-bar";

export interface ResultItem {
  data: FilterableTour;
  /** The server-rendered TripCard; the client only reorders and filters. */
  card: ReactNode;
}

/**
 * Filters and sorts the six cards from the URL (?experience, ?length, ?month, ?sort). The static
 * HTML holds every card in recommended order (Suspense fallback), so all tours stay crawlable;
 * filtered URLs canonicalise to /tours (002 section 4).
 */
export function TourResults({ items, monthNotes }: { items: ResultItem[]; monthNotes: Record<number, string> }) {
  const router = useRouter();
  const filters = parseFilters(useSearchParams());
  const cards = new Map(items.map((item) => [item.data.slug, item.card]));
  const results = applyFilters(
    items.map((item) => item.data),
    filters,
  );
  const hasFilters = Boolean(filters.experience || filters.length || filters.month);

  function update(next: TourFilters, event?: { filter: string; value: string }) {
    if (event) track("tour_filter", event);
    router.replace(`/tours${toQueryString(next)}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-6">
      <TourFilterBar
        filters={filters}
        onExperience={(experience) => update({ ...filters, experience }, { filter: "experience", value: experience ?? "all" })}
        onSort={(sort) => update({ ...filters, sort }, { filter: "sort", value: sort })}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="font-medium">
          {resultsLine(results.length, filters)}
        </p>
        {hasFilters ? (
          <Button variant="outline" size="sm" onClick={() => update({ sort: filters.sort }, { filter: "clear", value: "all" })}>
            {ui.buttons.clearFilters}
          </Button>
        ) : null}
      </div>

      {filters.month ? (
        <p className="measure rounded-lg border bg-card p-4">
          {fill(ui.tripFinder.resultsNote, {
            month: filters.month.label.split(" ")[0],
            note: monthNotes[filters.month.month],
          })}
        </p>
      ) : null}

      {results.length ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <li key={result.slug} className="relative flex">
              <div className="flex w-full">{cards.get(result.slug)}</div>
              {result.goodInMonth || result.cheaperPermits ? (
                <div className="pointer-events-none absolute top-3 right-3 flex flex-col items-end gap-1.5">
                  {result.goodInMonth && filters.month ? (
                    <Badge variant="success" className="font-semibold">
                      {fill(ui.labels.goodInMonth, { month: filters.month.label.split(" ")[0] })}
                    </Badge>
                  ) : null}
                  {result.cheaperPermits ? (
                    <Badge variant="warning" className="font-semibold">
                      {ui.labels.cheaperPermits}
                    </Badge>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-lg border bg-card p-6">
          <h2 className="text-display-m">{ui.emptyStates.tripFinder.heading}</h2>
          <p className="measure">{ui.emptyStates.tripFinder.body}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => update({ sort: filters.sort }, { filter: "clear", value: "all" })}>
              {ui.emptyStates.tripFinder.clear}
            </Button>
            <Link href="/plan-your-trip" className={cn(buttonVariants())}>
              {ui.emptyStates.tripFinder.custom}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
