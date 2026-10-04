"use client";

import { useState } from "react";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import type { TravelMonth } from "@/features/home/lib/travel-months";
import { parseFilters, toQueryString } from "@/features/tours/lib/filters";
import { fill } from "@/lib/content/format";
import { home, toursListing } from "@/lib/content/pages";
import { getMonthNotes, getSeasonLegend } from "@/lib/content/seasons";
import { cn } from "@/lib/utils";

const seasonClasses = { drier: "bg-band-accent", green: "bg-band-foreground/60", rains: "bg-band-foreground/35" };
const heights = { drier: "h-20", green: "h-12", rains: "h-16" };

export function MonthPicker({ months }: { months: TravelMonth[] }) {
  const [selected, setSelected] = useState(months[0].month);
  const notes = getMonthNotes();
  const legend = getSeasonLegend();
  const note = notes.find((entry) => entry.month === selected)!;
  const travelMonth = months.find((entry) => entry.month === selected)!;
  const isFutureRates = travelMonth.value.slice(0, 4) >= "2027";
  const href = `/tours${toQueryString(parseFilters({ month: travelMonth.value }))}`;
  return <div className="flex flex-col gap-6">
    <ToggleGroup aria-labelledby="seasons-heading" value={[String(selected)]}
      onValueChange={(values) => { if (values[0]) setSelected(Number(values[0]) as typeof selected); }}
      className="grid w-full grid-cols-6 items-end gap-2 rounded-none md:grid-cols-12">
      {notes.map((entry) => <ToggleGroupItem key={entry.month} value={String(entry.month)} aria-label={`${entry.name}: ${entry.season}`}
        aria-controls="month-note" className="h-auto min-w-0 flex-col gap-3 rounded-sm border border-transparent px-2 py-3 text-band-foreground hover:bg-band-foreground/10 hover:text-band-foreground aria-pressed:border-band-foreground aria-pressed:bg-band-foreground/10 data-[state=on]:bg-band-foreground/10 focus-visible:border-band-foreground focus-visible:ring-band-foreground">
        <span aria-hidden className={cn("w-full rounded-sm", heights[entry.kind], seasonClasses[entry.kind])} />
        <span aria-hidden className="font-mono text-label">{entry.name.slice(0, 3)}</span>
      </ToggleGroupItem>)}
    </ToggleGroup>
    <ul className="flex flex-wrap gap-x-6 gap-y-3 text-body-s">
      {Object.entries(legend).map(([kind, label]) => <li key={kind} className="flex items-center gap-2">
        <span aria-hidden className={cn("size-3 shrink-0 rounded-sm", seasonClasses[kind as keyof typeof seasonClasses])} />{label}
      </li>)}
    </ul>
    <div id="month-note" aria-live="polite" aria-atomic="true" className="grid grid-cols-1 gap-4 rounded-lg border border-band-foreground/30 bg-band-foreground/5 p-5 md:grid-cols-[auto_1fr] md:gap-8 md:p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-display-m">{note.name}</h3>
        <p className="font-mono text-label">{note.season}</p>
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="measure">{isFutureRates ? note.futureNote ?? note.note : note.note}</p>
        {isFutureRates ? <Alert role="note" className="border-warning bg-warning-surface text-warning">
          <InfoIcon aria-hidden />
          <AlertTitle>{toursListing.callout2027.title}</AlertTitle>
          <AlertDescription className="text-warning">{toursListing.callout2027.body}</AlertDescription>
        </Alert> : null}
        <Link href={href} className={cn(buttonVariants({ variant: "secondary" }), "max-w-full focus-visible:ring-band-foreground")}>
          {fill(home.whenToGo.showTrips, { month: note.name })}
        </Link>
      </div>
    </div>
  </div>;
}
