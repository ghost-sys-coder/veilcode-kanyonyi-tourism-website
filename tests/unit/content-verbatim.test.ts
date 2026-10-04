import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as content from "@/lib/content/all";
import { richTextToPlain } from "@/lib/content/rich-text";

// The copy deck is approved word for word (00-README.md rule 1). Every string in content/ must
// appear in docs/copy exactly, once Markdown formatting is stripped. Splitting a line into
// fields is fine (each part must still match); rewording is not.

const COPY_DIR = "docs/copy";

function normalise(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\*\*|`/g, "")
    .replace(/ †/g, "") // fact-register markers in 09-faq.md; stored as usesRegisteredFact
    .replace(/\{, including someone under 15 if yes\}/g, ", including someone under 15")
    .replace(/\{whatsapp or "not given"\}/g, '{} or "not given"') // approved fallback inside a placeholder
    .replace(/\{[^}]*\}/g, "{}") // placeholder names differ ({first name} vs {firstName})
    .replace(/(^|[\s(])\*(?=\S)|(?<=\S)\*(?=[\s).,:;?]|$)/gm, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

const corpus = normalise(
  readdirSync(COPY_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readFileSync(join(COPY_DIR, f), "utf8"))
    .join("\n"),
);

// Keys whose values are identifiers, data or new text by design (image alt text is written
// at sourcing time, 13-photo-brief.md), not approved copy.
const SKIP_KEYS = new Set([
  "slug", "href", "id", "kind", "type", "target", "sameAs", "sourceUrl", "validUntil", "datePublished",
  "dateModified", "checkedOn", "src", "og", "licence", "photographer", "sourceName", "alt", "caption",
  "categories", "image", "gallery", "destinations", "anchor", "month", "primaryHref", "linkHref",
]);

const isData = (s: string) =>
  /^[a-z0-9-]+$/.test(s) || s.startsWith("/") || /^https?:\/\//.test(s) || /^\d{4}-\d{2}-\d{2}$/.test(s);

function strings(value: unknown, path: string): [string, string][] {
  if (typeof value === "string") return isData(value) ? [] : [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => (SKIP_KEYS.has(k) ? [] : strings(v, `${path}.${k}`)));
  }
  return [];
}

describe("verbatim check is effective", () => {
  it("inspects a meaningful number of strings", () => {
    const total = Object.entries(content).flatMap(([n, v]) => strings(v, n)).length;
    expect(total).toBeGreaterThan(300);
  });

  it("rejects a reworded line and accepts the original", () => {
    expect(corpus.includes(normalise("Drive to Bwindi, trek to a habituated gorilla family, drive back."))).toBe(true);
    expect(corpus.includes(normalise("Drive to Bwindi, trek to a gorilla family, drive back."))).toBe(false);
  });
});

describe("content matches docs/copy word for word", () => {
  for (const [name, value] of Object.entries(content)) {
    it(name, () => {
      const missing = strings(value, name)
        .map(([path, s]) => [path, normalise(richTextToPlain(s))] as const)
        .filter(([, s]) => s.length > 0 && !corpus.includes(s));
      expect(missing).toEqual([]);
    });
  }
});
