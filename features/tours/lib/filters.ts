import { toursListing } from "@/content/pages/tours-listing";
import { ui } from "@/content/ui";
import { fill } from "@/lib/content/format";
import { isLowSeasonMonth } from "@/lib/content/pricing";
import type { MonthNumber, TourCategory } from "@/types/content";

// /tours query parameters (002 section 4, 02-global.md "How the month works"):
//   experience  filters by category
//   length      3 | 5 | 7 | 8plus  (up to N days, or more than a week)
//   month       YYYY-MM: never removes tours; adds "Good in {Month}" (sorted first) and, in April,
//               May and November, "Cheaper permits" on gorilla and chimp tours
//   sort        recommended | shortest | longest | price
// Pure functions, shared by the listing and the home trip finder, and unit-tested.

export const EXPERIENCES = ["gorillas-and-chimps", "savannah-wildlife", "nile-and-adventure"] as const;
export const LENGTHS = ["3", "5", "7", "8plus"] as const;
export const SORTS = ["recommended", "shortest", "longest", "price"] as const;

export type Experience = (typeof EXPERIENCES)[number];
export type Length = (typeof LENGTHS)[number];
export type Sort = (typeof SORTS)[number];

export interface TourFilters {
  experience?: Experience;
  length?: Length;
  month?: { value: string; month: MonthNumber; label: string };
  sort: Sort;
}

/** The facts each card needs to be filtered and sorted. Serialisable, so it can cross to the client. */
export interface FilterableTour {
  slug: string;
  order: number;
  days: number;
  priceFrom: number;
  categories: TourCategory[];
  bestMonths: MonthNumber[];
  includesPrimatePermits: boolean;
}

export interface FilteredTour extends FilterableTour {
  goodInMonth: boolean;
  cheaperPermits: boolean;
}

type Params = Record<string, string | string[] | undefined> | URLSearchParams;

function read(params: Params, key: string): string | undefined {
  if (params instanceof URLSearchParams) return params.get(key) ?? undefined;
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

const oneOf = <T extends string>(list: readonly T[], value: string | undefined): T | undefined =>
  list.includes(value as T) ? (value as T) : undefined;

export function monthLabel(value: string): string | undefined {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) return undefined;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Unknown or malformed values are ignored rather than producing an error page. */
export function parseFilters(params: Params): TourFilters {
  const monthValue = read(params, "month");
  const label = monthValue ? monthLabel(monthValue) : undefined;
  return {
    experience: oneOf(EXPERIENCES, read(params, "experience")),
    length: oneOf(LENGTHS, read(params, "length")),
    month: label && monthValue ? { value: monthValue, month: Number(monthValue.slice(5)) as MonthNumber, label } : undefined,
    sort: oneOf(SORTS, read(params, "sort")) ?? "recommended",
  };
}

export function toQueryString(filters: TourFilters): string {
  const params = new URLSearchParams();
  if (filters.experience) params.set("experience", filters.experience);
  if (filters.length) params.set("length", filters.length);
  if (filters.month) params.set("month", filters.month.value);
  if (filters.sort !== "recommended") params.set("sort", filters.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function fitsLength(days: number, length: Length | undefined): boolean {
  if (!length) return true;
  return length === "8plus" ? days > 7 : days <= Number(length);
}

const SORTERS: Record<Sort, (a: FilterableTour, b: FilterableTour) => number> = {
  recommended: (a, b) => a.order - b.order,
  shortest: (a, b) => a.days - b.days || a.order - b.order,
  longest: (a, b) => b.days - a.days || a.order - b.order,
  price: (a, b) => a.priceFrom - b.priceFrom || a.order - b.order,
};

export function applyFilters(tours: readonly FilterableTour[], filters: TourFilters): FilteredTour[] {
  const month = filters.month?.month;
  return tours
    .filter((t) => !filters.experience || t.categories.includes(filters.experience))
    .filter((t) => fitsLength(t.days, filters.length))
    .map((t) => ({
      ...t,
      goodInMonth: month !== undefined && t.bestMonths.includes(month),
      cheaperPermits: month !== undefined && isLowSeasonMonth(month) && t.includesPrimatePermits,
    }))
    .sort((a, b) => Number(b.goodInMonth) - Number(a.goodInMonth) || SORTERS[filters.sort](a, b));
}

/** Labels of the active filters, in the order the trip finder asks for them. */
export function activeFilterLabels(filters: TourFilters): string[] {
  return [
    filters.experience ? toursListing.filters[filters.experience] : undefined,
    filters.month?.label,
    filters.length ? ui.tripFinder.length.options[filters.length] : undefined,
  ].filter((label): label is string => Boolean(label));
}

/** "Showing {n} of 6 trips" or "Showing {n} trips: {filters}" (04-tours.md). */
export function resultsLine(count: number, filters: TourFilters): string {
  const labels = activeFilterLabels(filters);
  return labels.length
    ? fill(toursListing.resultsLineFiltered, { n: count, filters: labels.join(", ") })
    : fill(toursListing.resultsLine, { n: count });
}
