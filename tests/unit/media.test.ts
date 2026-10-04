import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { media } from "@/content/media";

// 13-photo-brief.md: every image recorded with photographer, source and licence; never hotlinked;
// DESIGN.md section 7: never ship an image wider than it renders (sources capped at 2400px).
// Under Vitest a static image import resolves to its path ("/public/images/..."), not Next's
// StaticImageData, so dimensions are read from the files themselves.

const IMAGE_DIR = "public/images";
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? files(join(dir, d.name)) : [join(dir, d.name)]));
const pathOf = (src: unknown) => String(src).replace(/^\//, "");
const size = async (src: unknown) => {
  const { width, height } = await sharp(pathOf(src)).metadata();
  return [width, height];
};

describe("photography", () => {
  it("all 15 planned shots are sourced", () => {
    const missing = Object.values(media).filter((m) => !m.photo).map((m) => m.id);
    expect(missing).toEqual([]);
  });

  for (const entry of Object.values(media)) {
    it(`${entry.id} is credited, licensed, self-hosted and capped at 2400px`, async () => {
      const photo = entry.photo!;
      expect(photo.photographer.length).toBeGreaterThan(0);
      expect(photo.sourceUrl).toMatch(/^https:\/\/unsplash\.com\/photos\//);
      expect(photo.licence).toBe("Unsplash License");
      expect(pathOf(photo.src)).toMatch(/^public\/images\//);
      const [width] = await size(photo.src);
      expect(width).toBeLessThanOrEqual(2400);
      expect(entry.alt).not.toMatch(/^(image|photo|picture) of/i);
      expect(entry.alt.endsWith(".")).toBe(true);
    });
  }

  it("source files stay under 1 MB", () => {
    for (const file of files(IMAGE_DIR)) expect(statSync(file).size, file).toBeLessThan(1024 * 1024);
  });

  it("every page hero has a 1200 × 630 Open Graph crop", async () => {
    const ogs = Object.values(media).filter((m) => m.photo?.og);
    expect(ogs.length).toBe(14);
    for (const m of ogs) expect(await size(m.photo!.og)).toEqual([1200, 630]);
  });
});
