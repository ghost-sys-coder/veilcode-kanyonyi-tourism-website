import type { MonthNumber, TourPricing } from "@/types/content";

// Price model from docs/copy/04-tours.md. A vehicle carries at most six guests.

export const MAX_GUESTS_PER_VEHICLE = 6;
export const MIN_TRAVELLERS = 1;
export const MAX_TRAVELLERS = 12;
export const TABLE_GROUP_SIZES = [2, 4, 6] as const;

/** April, May and November 2026: discounted gorilla permits. */
export const LOW_SEASON_MONTHS: readonly MonthNumber[] = [4, 5, 11];

type PriceInputs = Pick<
  TourPricing,
  "perPersonCostUSD" | "perVehicleCostUSD" | "lowSeasonDiscountUSD" | "singleSupplementUSD"
>;

function assertTravellers(travellers: number) {
  if (!Number.isInteger(travellers) || travellers < MIN_TRAVELLERS || travellers > MAX_TRAVELLERS) {
    throw new RangeError(`travellers must be an integer from ${MIN_TRAVELLERS} to ${MAX_TRAVELLERS}`);
  }
}

/** Half-up rounding to the nearest USD 10, done in integer cents' worth of tenths to avoid float drift. */
function roundToTen(amount: number): number {
  return Math.floor(amount / 10 + 0.5 + 1e-9) * 10;
}

export function vehiclesFor(travellers: number): number {
  assertTravellers(travellers);
  return Math.ceil(travellers / MAX_GUESTS_PER_VEHICLE);
}

/** Per-person price for a group, excluding the single room supplement. */
export function pricePerPerson(
  pricing: PriceInputs,
  travellers: number,
  { lowSeason = false }: { lowSeason?: boolean } = {},
): number {
  const vehicleShare = (pricing.perVehicleCostUSD * vehiclesFor(travellers)) / travellers;
  const discount = lowSeason ? pricing.lowSeasonDiscountUSD : 0;
  return roundToTen(pricing.perPersonCostUSD + vehicleShare) - discount;
}

/** The "From, per person sharing" figure: two travellers, standard season. */
export function priceFrom(pricing: PriceInputs): number {
  return pricePerPerson(pricing, 2);
}

/** Enquiry estimate (08-plan-your-trip.md): standard season, rooms shared, solo pays the supplement. */
export function estimateTotal(pricing: PriceInputs, travellers: number): number {
  const total = pricePerPerson(pricing, travellers) * travellers;
  return travellers === 1 ? total + pricing.singleSupplementUSD : total;
}

export function isLowSeasonMonth(month: MonthNumber): boolean {
  return LOW_SEASON_MONTHS.includes(month);
}
