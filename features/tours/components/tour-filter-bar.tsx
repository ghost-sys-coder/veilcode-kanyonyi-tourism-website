"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toursListing } from "@/content/pages/tours-listing";
import { EXPERIENCES, SORTS, type Experience, type Sort, type TourFilters } from "@/features/tours/lib/filters";

const sortItems = SORTS.map((value) => ({ value, label: toursListing.sort.options[value] }));

/** Category chips ("All · Gorillas and chimps · ...") and the sort select (04-tours.md). */
export function TourFilterBar({
  filters,
  onExperience,
  onSort,
}: {
  filters: TourFilters;
  onExperience: (value: Experience | undefined) => void;
  onSort: (value: Sort) => void;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <ToggleGroup
        aria-label={toursListing.eyebrow}
        variant="outline"
        value={[filters.experience ?? "all"]}
        onValueChange={(value) => {
          const next = value[0];
          // A single-select group can be emptied by pressing the active chip; treat that as "All".
          onExperience(EXPERIENCES.includes(next as Experience) ? (next as Experience) : undefined);
        }}
        className="flex-wrap"
      >
        <ToggleGroupItem value="all" className="aria-pressed:border-primary aria-pressed:bg-secondary aria-pressed:text-primary">
          {toursListing.filters.all}
        </ToggleGroupItem>
        {EXPERIENCES.map((value) => (
          <ToggleGroupItem
            key={value}
            value={value}
            className="aria-pressed:border-primary aria-pressed:bg-secondary aria-pressed:text-primary"
          >
            {toursListing.filters[value]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="flex items-center gap-3">
        <label id="sort-label" htmlFor="sort-trigger" className="text-body-s font-medium whitespace-nowrap">
          {toursListing.sort.label}
        </label>
        <Select items={sortItems} value={filters.sort} onValueChange={(value) => value && onSort(value as Sort)}>
          <SelectTrigger id="sort-trigger" aria-labelledby="sort-label sort-trigger" className="min-w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
