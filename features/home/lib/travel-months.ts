import { monthLabel } from "@/features/tours/lib/filters";
import type { MonthNumber } from "@/types/content";

export interface TravelMonth {
  value: string;
  label: string;
  month: MonthNumber;
}

/** Current month and the following eleven, using the operator's timezone, not the build host's. */
export function getTravelMonths(now: Date, count = 12): TravelMonth[] {
  const parts = new Intl.DateTimeFormat("en-GB", {
    year: "numeric", month: "2-digit", timeZone: "Africa/Kampala",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")!.value);
  const month = Number(parts.find((part) => part.type === "month")!.value);
  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(Date.UTC(year, month - 1 + offset, 1));
    const monthNumber = date.getUTCMonth() + 1;
    const value = `${date.getUTCFullYear()}-${String(monthNumber).padStart(2, "0")}`;
    return { value, label: monthLabel(value)!, month: monthNumber as MonthNumber };
  });
}
