import { describe, expect, it } from "vitest";
import { tours } from "@/content/tours";
import { applyFilters, parseFilters, resultsLine, toQueryString, type FilterableTour } from "@/features/tours/lib/filters";
import { priceFrom } from "@/lib/content/pricing";

const items: FilterableTour[] = tours.map((t, order) => ({
  slug: t.slug,
  order,
  days: t.days,
  priceFrom: priceFrom(t.pricing),
  categories: t.categories,
  bestMonths: t.bestMonths,
  includesPrimatePermits: t.includesPrimatePermits,
}));
const slugs = (q: string) => applyFilters(items, parseFilters(new URLSearchParams(q))).map((t) => t.slug);

describe("parseFilters", () => {
  it("ignores unknown or malformed values", () => {
    expect(parseFilters(new URLSearchParams("experience=x&length=9&month=2026-13&sort=zzz"))).toEqual({
      experience: undefined,
      length: undefined,
      month: undefined,
      sort: "recommended",
    });
  });

  it("reads a month as its number and an en-GB label", () => {
    expect(parseFilters({ month: "2026-11" }).month).toEqual({ value: "2026-11", month: 11, label: "November 2026" });
  });

  it("round-trips through the query string", () => {
    const qs = "?experience=savannah-wildlife&length=7&month=2027-07&sort=price";
    expect(toQueryString(parseFilters(new URLSearchParams(qs)))).toBe(qs);
    expect(toQueryString(parseFilters({}))).toBe("");
  });
});

describe("applyFilters", () => {
  it("recommended order is the copy-deck order", () => {
    expect(slugs("")).toEqual(tours.map((t) => t.slug));
  });

  it("filters by experience", () => {
    expect(slugs("experience=nile-and-adventure")).toEqual(["2-day-jinja-and-the-nile"]);
    expect(slugs("experience=gorillas-and-chimps")).toHaveLength(4);
  });

  it("filters by length", () => {
    expect(slugs("length=3")).toEqual(["3-day-bwindi-gorilla-trek", "2-day-jinja-and-the-nile"]);
    expect(slugs("length=8plus")).toEqual(["10-day-classic-uganda"]);
  });

  it("sorts by length and price", () => {
    expect(slugs("sort=shortest")[0]).toBe("2-day-jinja-and-the-nile");
    expect(slugs("sort=longest")[0]).toBe("10-day-classic-uganda");
    expect(slugs("sort=price")[0]).toBe("2-day-jinja-and-the-nile");
    expect(slugs("sort=price").at(-1)).toBe("10-day-classic-uganda");
  });

  it("a month never removes tours, and good-month tours come first", () => {
    const october = applyFilters(items, parseFilters({ month: "2026-10" }));
    expect(october).toHaveLength(6);
    // Only the Kibale and Queen Elizabeth tour and the Jinja trip list October as a best month.
    expect(october.filter((t) => t.goodInMonth).map((t) => t.slug)).toEqual([
      "4-day-kibale-chimps-and-queen-elizabeth",
      "2-day-jinja-and-the-nile",
    ]);
    expect(october.slice(0, 2).every((t) => t.goodInMonth)).toBe(true);
  });

  it("cheaper permits only in April, May and November, only on primate tours", () => {
    const nov = applyFilters(items, parseFilters({ month: "2026-11" }));
    expect(nov.filter((t) => t.cheaperPermits).map((t) => t.slug).sort()).toEqual(
      items.filter((t) => t.includesPrimatePermits).map((t) => t.slug).sort(),
    );
    expect(applyFilters(items, parseFilters({ month: "2026-07" })).some((t) => t.cheaperPermits)).toBe(false);
  });

  it("does not extend the confirmed 2026 discount into an unconfirmed future year", () => {
    for (const value of ["2027-04", "2027-05", "2027-11", "2028-11"]) {
      const results = applyFilters(items, parseFilters({ month: value }));
      expect(results).toHaveLength(6);
      expect(results.some((tour) => tour.cheaperPermits)).toBe(false);
    }
  });
});

describe("resultsLine (04-tours.md)", () => {
  it("unfiltered", () => {
    expect(resultsLine(6, parseFilters({}))).toBe("Showing 6 of 6 trips");
  });

  it("with filters, in trip-finder order", () => {
    expect(resultsLine(2, parseFilters({ experience: "gorillas-and-chimps", length: "5", month: "2026-11" }))).toBe(
      "Showing 2 trips: Gorillas and chimps, November 2026, Up to 5 days",
    );
  });
});
