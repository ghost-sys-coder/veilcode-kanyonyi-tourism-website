import type { Destination } from "@/types/content";
import { bwindi } from "./bwindi";
import { kibale } from "./kibale";
import { murchisonFalls } from "./murchison-falls";
import { queenElizabeth } from "./queen-elizabeth";

/** Copy-deck order (hub table, home cards, sitemap). */
export const destinations: Destination[] = [bwindi, kibale, queenElizabeth, murchisonFalls];
