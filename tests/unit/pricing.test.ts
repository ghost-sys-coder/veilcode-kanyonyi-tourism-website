import { describe, expect, it } from "vitest";
import { estimateTotal, priceFrom, pricePerPerson, vehiclesFor } from "@/lib/content/pricing";

// Cost inputs and expected table rows copied from docs/copy/04-tours.md.
const tours = {
  "3-day-bwindi-gorilla-trek": { pp: 1190, pv: 920, lsd: 200, ss: 140, rows: [1650, 1420, 1340], low: [1450, 1220, 1140] },
  "4-day-murchison-falls-safari": { pp: 730, pv: 920, lsd: 0, ss: 150, rows: [1190, 960, 880] },
  "4-day-kibale-chimps-and-queen-elizabeth": { pp: 1020, pv: 920, lsd: 0, ss: 160, rows: [1480, 1250, 1170] },
  "7-day-primates-and-savannah": { pp: 2590, pv: 1720, lsd: 200, ss: 330, rows: [3450, 3020, 2880] },
  "10-day-classic-uganda": { pp: 3610, pv: 2680, lsd: 200, ss: 450, rows: [4950, 4280, 4060] },
  "2-day-jinja-and-the-nile": { pp: 300, pv: 240, lsd: 0, ss: 60, rows: [420, 360, 340] },
} as const;

const inputs = (t: (typeof tours)[keyof typeof tours]) => ({
  perPersonCostUSD: t.pp,
  perVehicleCostUSD: t.pv,
  lowSeasonDiscountUSD: t.lsd,
  singleSupplementUSD: t.ss,
});

describe("price model reproduces every copy-deck table", () => {
  for (const [slug, tour] of Object.entries(tours)) {
    it(slug, () => {
      expect([2, 4, 6].map((n) => pricePerPerson(inputs(tour), n))).toEqual(tour.rows);
      expect(priceFrom(inputs(tour))).toBe(tour.rows[0]);
    });
  }

  it("tour 1 low-season column", () => {
    const t = tours["3-day-bwindi-gorilla-trek"];
    expect([2, 4, 6].map((n) => pricePerPerson(inputs(t), n, { lowSeason: true }))).toEqual(t.low);
  });
});

describe("worked check in 04-tours.md (3-Day Bwindi Gorilla Trek)", () => {
  const bwindi = inputs(tours["3-day-bwindi-gorilla-trek"]);
  it.each([
    [1, 2110],
    [3, 1500],
    [5, 1370],
    [7, 1450],
    [12, 1340],
  ])("%i travellers -> $%i per person", (n, expected) => {
    expect(pricePerPerson(bwindi, n)).toBe(expected);
  });

  it("solo estimate adds the single room supplement", () => {
    expect(estimateTotal(bwindi, 1)).toBe(2110 + 140);
  });

  it("group estimate is per person times travellers", () => {
    expect(estimateTotal(bwindi, 3)).toBe(4500);
  });
});

describe("vehicles", () => {
  it("six guests per vehicle", () => {
    expect([1, 6, 7, 12].map(vehiclesFor)).toEqual([1, 1, 2, 2]);
  });

  it.each([0, 13, 2.5])("rejects %s travellers", (n) => {
    expect(() => vehiclesFor(n)).toThrow(RangeError);
  });
});
