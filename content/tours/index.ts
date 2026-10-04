import type { Tour } from "@/types/content";
import { classicUganda } from "./10-day-classic-uganda";
import { jinjaAndTheNile } from "./2-day-jinja-and-the-nile";
import { bwindiGorillaTrek } from "./3-day-bwindi-gorilla-trek";
import { kibaleChimpsQueenElizabeth } from "./4-day-kibale-chimps-and-queen-elizabeth";
import { murchisonFallsSafari } from "./4-day-murchison-falls-safari";
import { primatesAndSavannah } from "./7-day-primates-and-savannah";

/** Copy-deck order, which is also the "Recommended" sort on /tours. */
export const tours: Tour[] = [
  bwindiGorillaTrek,
  murchisonFallsSafari,
  kibaleChimpsQueenElizabeth,
  primatesAndSavannah,
  classicUganda,
  jinjaAndTheNile,
];
