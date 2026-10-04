import { monthNotes, seasonLegend, type MonthNote } from "@/content/seasons";

export function getMonthNotes(): MonthNote[] {
  return monthNotes;
}

export function getSeasonLegend() {
  return seasonLegend;
}
