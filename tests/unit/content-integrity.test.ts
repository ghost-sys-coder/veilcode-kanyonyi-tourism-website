import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { destinations } from "@/content/destinations";
import { gorillaPermitRows, permitTables } from "@/content/facts";
import { guides } from "@/content/guides";
import { media } from "@/content/media";
import { meta } from "@/content/meta";
import { monthNotes } from "@/content/seasons";
import { tours } from "@/content/tours";
import { resolveLink } from "@/lib/content/links";
import { getMedia } from "@/lib/content/media";
import { priceFrom, pricePerPerson } from "@/lib/content/pricing";
import { parseRichText } from "@/lib/content/rich-text";
import { getToursForDestination } from "@/lib/content/tours";
import type { LinkRef } from "@/types/content";

// Structured values must match the `Field:` lines in the copy deck (001 section 5).

const read = (file: string) => readFileSync(`docs/copy/${file}`, "utf8").replace(/\r\n/g, "\n");
const toursCopy = read("04-tours.md");
const destinationsCopy = read("05-destinations.md");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function fieldsFor(copy: string, slug: string): Record<string, string> {
  const start = copy.indexOf(`- Field: slug: \`${slug}\``);
  expect(start, `no Field block for ${slug}`).toBeGreaterThan(-1);
  const block = copy.slice(start).split("\n\n")[0];
  return Object.fromEntries(
    [...block.matchAll(/^- Field: ([^:]+): (.*)$/gm)].map(([, key, value]) => [key.trim(), value.trim()]),
  );
}

describe("tours match their Field: lines in 04-tours.md", () => {
  for (const tour of tours) {
    describe(tour.slug, () => {
      const f = fieldsFor(toursCopy, tour.slug);

      it("name, tag, meta line and card summary", () => {
        expect(tour.name).toBe(f.name);
        expect(tour.tag).toBe(f.tag);
        expect(tour.metaLine).toBe(f["meta line"]);
        expect(tour.cardSummary).toBe(f["card summary"]);
      });

      it("days and nights", () => {
        expect(`${tour.days} · nights: ${tour.nights}`).toBe(f.days);
      });

      it("cost inputs, from price and single supplement", () => {
        expect(tour.pricing.perPersonCostUSD).toBe(Number(f.perPersonCostUSD));
        expect(tour.pricing.perVehicleCostUSD).toBe(Number(f.perVehicleCostUSD));
        expect(priceFrom(tour.pricing)).toBe(Number.parseInt(f.priceFromUSD, 10));
        expect(tour.pricing.singleSupplementUSD).toBe(Number(f.singleSupplementUSD));
      });

      it("low-season price where the copy gives one", () => {
        if (f.lowSeasonPriceUSD) {
          expect(pricePerPerson(tour.pricing, 2, { lowSeason: true })).toBe(Number.parseInt(f.lowSeasonPriceUSD, 10));
        }
      });

      it("best months and primate permits", () => {
        const expected =
          f.bestMonths === "All months" ? MONTHS.map((_, i) => i + 1) : f.bestMonths.split(", ").map((m) => MONTHS.indexOf(m) + 1);
        expect(tour.bestMonths).toEqual(expected);
        expect(tour.includesPrimatePermits).toBe(f.includesPrimatePermits === "yes");
      });

      it("destinations", () => {
        const expected = f.destinations.startsWith("none") ? [] : f.destinations.split(", ");
        expect(tour.destinations).toEqual(expected);
      });

      it("every price table row comes from the formula", () => {
        const section = toursCopy.slice(toursCopy.indexOf(`- Field: slug: \`${tour.slug}\``));
        for (const n of [2, 4, 6]) {
          const row = new RegExp(`\\| ${n} travellers \\| \\$([\\d,]+) \\|`).exec(section)?.[1];
          expect(pricePerPerson(tour.pricing, n), `${n} travellers`).toBe(Number(row?.replace(",", "")));
        }
      });
    });
  }
});

describe("destinations", () => {
  for (const destination of destinations) {
    it(`${destination.slug} matches its Field: lines`, () => {
      const f = fieldsFor(destinationsCopy, destination.slug);
      expect(destination.name).toBe(f.name);
      expect(destination.shortName).toBe(f.shortName);
      expect(destination.region).toBe(f.region);
      expect(destination.cardLine).toBe(f["card line"]);
    });

    it(`"Tours that visit ${destination.shortName}" matches the copy`, () => {
      const line = new RegExp(`\\*\\*Tours that visit ${destination.shortName}:\\*\\* (.*)`).exec(destinationsCopy)?.[1];
      expect(getToursForDestination(destination.slug).map((t) => t.name)).toEqual(line?.split(" · "));
    });
  }
});

describe("cross-references", () => {
  const refs: LinkRef[] = [
    ...tours.flatMap((t) => t.related),
    ...guides.flatMap((g) => g.related),
    ...[...tours, ...destinations, ...guides].flatMap((x) =>
      typeof x.close.button.target === "object" ? [x.close.button.target] : [],
    ),
  ];

  it("every related link resolves to a page that has metadata", () => {
    for (const ref of refs) expect(Object.keys(meta)).toContain(resolveLink(ref).href);
  });

  it("every inline link in rich text points at a known route", () => {
    const texts = JSON.stringify([tours, destinations, guides]);
    const hrefs = [...texts.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1]);
    for (const href of hrefs) expect(Object.keys(meta)).toContain(href);
    expect(parseRichText("[x](/tours)")[0]).toMatchObject({ type: "link" });
  });

  it("every image reference exists in content/media.ts", () => {
    const refs = [...tours, ...destinations, ...guides].map((x) => ("hero" in x ? x.hero.image : x.image));
    for (const ref of refs) expect(() => getMedia(ref)).not.toThrow();
  });

  it("media ids match their keys and shot numbers are unique", () => {
    for (const [key, entry] of Object.entries(media)) expect(entry.id).toBe(key);
    const shots = Object.values(media).map((m) => m.shot);
    expect(new Set(shots).size).toBe(shots.length);
  });

  it("slugs are unique and every content page has metadata", () => {
    for (const list of [tours, destinations, guides]) {
      const slugs = list.map((x) => x.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
    for (const t of tours) expect(meta).toHaveProperty([`/tours/${t.slug}`]);
    for (const d of destinations) expect(meta).toHaveProperty([`/destinations/${d.slug}`]);
    for (const g of guides) expect(meta).toHaveProperty([`/guides/${g.slug}`]);
  });

  it("guide jump links point at real sections", () => {
    for (const guide of guides) {
      const ids = guide.sections.map((s) => s.id);
      for (const link of guide.jumpLinks ?? []) expect(ids).toContain(link.id);
    }
  });
});

describe("facts and seasons", () => {
  it("permit table rows match both tables in the copy deck", () => {
    const home = read("03-home.md");
    const guide = read("06-guides.md");
    for (const row of gorillaPermitRows) {
      expect(home).toContain(`| ${row.visitor} | ${row.standard} | ${row.lowSeason2026} |`);
      expect(guide).toContain(`| ${row.visitorLong ?? row.visitor} | ${row.standard} | ${row.lowSeason2026} | ${row.from2027} |`);
    }
    expect(home).toContain(`| ${permitTables.home.columns.join(" | ")} |`);
    expect(guide).toContain(`| ${permitTables.guide.columns.join(" | ")} |`);
  });

  it("prose that repeats a permit fee agrees with facts.ts", () => {
    const standard = gorillaPermitRows[0].standard; // "USD 800"
    const low = gorillaPermitRows[0].lowSeason2026; // "USD 600"
    expect(tours[0].included[0]).toContain(`${standard}, or ${low}`);
    expect(destinations[0].activities[0].notes?.[0]).toContain(`Permit ${standard} (${low}`);
  });

  it("twelve month notes, in calendar order", () => {
    expect(monthNotes.map((m) => m.month)).toEqual(MONTHS.map((_, i) => i + 1));
    expect(monthNotes.map((m) => m.name)).toEqual(MONTHS);
  });
});
