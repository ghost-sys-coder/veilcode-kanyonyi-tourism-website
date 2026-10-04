"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinderSelect } from "@/features/home/components/finder-select";
import type { TravelMonth } from "@/features/home/lib/travel-months";
import { EXPERIENCES, LENGTHS, parseFilters, toQueryString } from "@/features/tours/lib/filters";
import { track } from "@/lib/analytics/track";
import { ui } from "@/lib/content/pages";

const experienceItems = [
  { value: null, label: ui.tripFinder.experience.options.everything },
  ...EXPERIENCES.map((value) => ({ value, label: ui.tripFinder.experience.options[value] })),
];
const lengthItems = [
  { value: null, label: ui.tripFinder.length.options.any },
  ...LENGTHS.map((value) => ({ value, label: ui.tripFinder.length.options[value] })),
];

export function TripFinder({ months }: { months: TravelMonth[] }) {
  const router = useRouter();
  const [experience, setExperience] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const monthItems = [{ value: null, label: ui.tripFinder.month.any }, ...months];
  return (
    <form action="/tours" method="get" aria-label={ui.buttons.findTrips}
      className="grid grid-cols-1 items-end gap-5 rounded-lg border bg-card p-5 shadow-lg md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const filters = parseFilters({ experience: experience ?? undefined, month: month ?? undefined, length: length ?? undefined });
        track("tour_search", { experience: filters.experience ?? "", month: filters.month?.value ?? "", length: filters.length ?? "" });
        router.push(`/tours${toQueryString(filters)}`);
      }}>
      <FinderSelect id="experience" label={ui.tripFinder.experience.label} items={experienceItems} value={experience} onValueChange={setExperience} />
      <FinderSelect id="month" label={ui.tripFinder.month.label} items={monthItems} value={month} onValueChange={setMonth} />
      <FinderSelect id="length" label={ui.tripFinder.length.label} items={lengthItems} value={length} onValueChange={setLength} />
      <Button type="submit" variant="sun" className="w-full md:col-span-3 lg:col-span-1">{ui.buttons.findTrips}<ArrowRightIcon aria-hidden className="size-4" /></Button>
    </form>
  );
}
