import { describe, expect, it } from "vitest";
import { meta, titleSuffix } from "@/content/meta";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

// Copy rules from docs/copy/00-README.md, 01-voice.md and 11-emails-and-meta.md.

const BANNED = [
  "breathtaking", "unforgettable", "once-in-a-lifetime", "hidden gem", "adventure awaits", "embark",
  "unparalleled", "nestled", "tapestry", "immerse yourself", "bucket list", "curated", "seamless",
  "world-class", "unique experience", "journey of a lifetime", "the real africa", "off the beaten path",
  "guaranteed sighting",
];

function allStrings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => allStrings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => allStrings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

const rendered = [
  ...allStrings(site, "site"),
  ...allStrings(ui, "ui"),
  ...allStrings(meta, "meta"),
];

describe("page metadata (11-emails-and-meta.md)", () => {
  for (const [path, entry] of Object.entries(meta)) {
    it(`${path} title is 60 characters or fewer`, () => {
      const full = "absoluteTitle" in entry ? entry.absoluteTitle : entry.title + titleSuffix;
      expect(full.length).toBeLessThanOrEqual(60);
    });
    it(`${path} description is 155 characters or fewer`, () => {
      expect(entry.description.length).toBeLessThanOrEqual(155);
    });
  }
});

describe("rendered copy", () => {
  it("contains no em dashes", () => {
    expect(rendered.filter(([, s]) => s.includes("—"))).toEqual([]);
  });

  it("contains no unreplaced [CLIENT: ...] placeholders", () => {
    expect(rendered.filter(([, s]) => s.includes("[CLIENT"))).toEqual([]);
  });

  it("contains no banned phrases", () => {
    const hits = rendered.filter(([, s]) => BANNED.some((b) => s.toLowerCase().includes(b)));
    expect(hits).toEqual([]);
  });

  it("never names a kanyonyi mailbox", () => {
    expect(rendered.filter(([, s]) => /kanyonyi[^\s]*@|@[^\s]*kanyonyi/i.test(s))).toEqual([]);
  });
});
