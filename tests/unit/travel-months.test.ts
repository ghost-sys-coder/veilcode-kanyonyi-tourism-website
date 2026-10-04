import { describe, expect, it } from "vitest";
import { getTravelMonths } from "@/features/home/lib/travel-months";

describe("homepage travel months", () => {
  it("offers twelve distinct months, including the current month, across a year boundary", () => {
    const months = getTravelMonths(new Date("2026-10-04T10:00:00Z"));
    expect(months).toHaveLength(12);
    expect(months[0]).toEqual({ value: "2026-10", label: "October 2026", month: 10 });
    expect(months[11]).toEqual({ value: "2027-09", label: "September 2027", month: 9 });
    expect(new Set(months.map((month) => month.value)).size).toBe(12);
  });

  it("rolls at midnight in Kampala rather than the build machine's timezone", () => {
    expect(getTravelMonths(new Date("2026-12-31T20:59:59Z"))[0].value).toBe("2026-12");
    expect(getTravelMonths(new Date("2026-12-31T21:00:00Z"))[0].value).toBe("2027-01");
  });
});
