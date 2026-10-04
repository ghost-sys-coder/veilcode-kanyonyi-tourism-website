import type { MonthNumber } from "@/types/content";

// Month notes from docs/copy/03-home.md section 5. Used by the home month picker and by
// /tours?month= ("{Month}: {month note}", 02-global.md).
// `kind` picks the bar colour and legend entry. The legend has three entries, so March
// ("Long rains begin") and October ("Short rains") share the rains colour (plan.md gap G13).

export type SeasonKind = "drier" | "green" | "rains";

export interface MonthNote {
  month: MonthNumber;
  name: string;
  season: string;
  kind: SeasonKind;
  note: string;
  /** Nearest approved weather-only copy until year-specific home notes are supplied (G18). */
  futureNote?: string;
}

export const seasonLegend: Record<SeasonKind, string> = {
  drier: "Drier months",
  green: "Green season, cheaper permits",
  rains: "Short rains",
};

export const monthNotes: MonthNote[] = [
  { month: 1, name: "January", season: "Drier", kind: "drier", note: "One of the best months for trekking and game drives. Trails are firmer and lodges fill early, so book four to six months ahead." },
  { month: 2, name: "February", season: "Drier", kind: "drier", note: "Dry, warm and busy. Good for every trip on this site." },
  { month: 3, name: "March", season: "Long rains begin", kind: "rains", note: "Rain usually arrives in the second half of the month. Fewer visitors, green landscapes, standard permit prices." },
  { month: 4, name: "April", season: "Green season", kind: "green", note: "The wettest month in most parks. Gorilla permits drop to USD 600 for non-residents, but discounted permits can't be moved to another date.", futureNote: "The wettest month in most parks." },
  { month: 5, name: "May", season: "Green season", kind: "green", note: "Still wet, still discounted. Forest trails can be muddy; good boots and a porter matter more now.", futureNote: "Forest trails can be muddy; good boots and a porter matter more now." },
  { month: 6, name: "June", season: "Drier", kind: "drier", note: "The dry season starts. Busy from mid-June, especially with European summer holidays." },
  { month: 7, name: "July", season: "Drier", kind: "drier", note: "Peak month. Permits for July and August are often the first to sell out." },
  { month: 8, name: "August", season: "Drier", kind: "drier", note: "Peak month. Excellent game viewing as animals stay near water." },
  { month: 9, name: "September", season: "Drier", kind: "drier", note: "Still dry, slightly quieter than August. A good balance of weather and availability." },
  { month: 10, name: "October", season: "Short rains", kind: "rains", note: "Afternoon showers are common, mornings often clear. Good for birding as migrant species arrive." },
  { month: 11, name: "November", season: "Green season", kind: "green", note: "Short rains, discounted permits (USD 600) and fewer vehicles at sightings.", futureNote: "Good for birding." },
  { month: 12, name: "December", season: "Drier", kind: "drier", note: "Rain eases through the month. The Christmas fortnight books up early." },
];
