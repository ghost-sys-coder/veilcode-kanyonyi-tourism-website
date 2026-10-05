import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { formatWhatsAppNumber, normaliseWhatsAppNumber } from "@/config/contact";
import { parseDemoMode } from "@/config/demo";
import { resolveIndexing } from "@/config/indexing";
import { meta } from "@/content/meta";
import { buildLlmsTxt } from "@/lib/seo/llms";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getDestinations } from "@/lib/content/destinations";
import { getGuides } from "@/lib/content/guides";
import { getTours } from "@/lib/content/tours";
import { faqGroups } from "@/lib/content/pages";
import { aboutPageSchema, articleSchema, breadcrumbSchema, faqPageSchema, organizationSchema, serializeJsonLd, touristDestinationSchema, touristTripSchema, websiteSchema } from "@/lib/seo/schema";

describe("demo mode is fail-safe (002 section 2)", () => {
  it.each([
    [undefined, true],
    ["", true],
    ["true", true],
    ["False", true],
    ["no", true],
    ["false", false],
  ])("NEXT_PUBLIC_DEMO_MODE=%s -> demo %s", (value, expected) => {
    expect(parseDemoMode(value)).toBe(expected);
  });
});

describe("indexing is independent of demo copy (002 section 2)", () => {
  it.each([
    [true, undefined, undefined, false],
    [true, "", "production", false],
    [true, "True", "production", false],
    [true, "true", "production", true],
    [true, "false", "production", false],
    [false, undefined, "production", true],
    [false, "false", "production", false],
    [true, "true", "preview", false],
    [false, "true", "preview", false],
    [false, undefined, "preview", false],
  ])("demo=%s, override=%s, deployment=%s -> indexable %s", (demo, value, deployment, expected) => {
    expect(resolveIndexing(demo, value, deployment)).toBe(expected);
  });
});

describe("WhatsApp number", () => {
  it("normalises to digits for wa.me", () => {
    expect(normaliseWhatsAppNumber("+256 750 242627")).toBe("256750242627");
    expect(normaliseWhatsAppNumber("256750242627")).toBe("256750242627");
  });
  it("rejects missing or implausible numbers", () => {
    expect(normaliseWhatsAppNumber(undefined)).toBeNull();
    expect(normaliseWhatsAppNumber("12345")).toBeNull();
  });
  it("formats the Ugandan number the way the copy shows it", () => {
    expect(formatWhatsAppNumber("256750242627")).toBe("+256 750 242627");
  });
});

describe("llms.txt matches docs/copy/11-emails-and-meta.md word for word", () => {
  const copy = readFileSync("docs/copy/11-emails-and-meta.md", "utf8").replace(/\r\n/g, "\n");
  const block = /## llms\.txt[\s\S]*?```markdown\n([\s\S]*?)```/.exec(copy)?.[1];

  it("demo output equals the copy block with {SITE} filled in", () => {
    expect(block).toBeDefined();
    const expected = block!.replaceAll("{SITE}", "https://kanyonyi.veilcode.studio");
    expect(buildLlmsTxt({ origin: "https://kanyonyi.veilcode.studio", demo: true })).toBe(expected);
  });

  it("client builds drop the demo note and keep everything else", () => {
    const live = buildLlmsTxt({ origin: "https://example.com", demo: false });
    expect(live).not.toContain("demonstration website");
    expect(live).toContain("https://example.com/tours/10-day-classic-uganda");
    expect(live).not.toContain("{SITE}");
  });
});

describe("structured data (002 section 9)", () => {
  const FORBIDDEN = ["Review", "AggregateRating", "LocalBusiness", "TravelAgency", "Offer", "AggregateOffer", "PostalAddress", "Person"];
  const types = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.flatMap(types);
    if (value && typeof value === "object") {
      return Object.entries(value).flatMap(([k, v]) => (k === "@type" ? [String(v)] : types(v)));
    }
    return [];
  };

  it("every page's schema uses no type the brief forbids for a fictional operator", () => {
    const all = [
      organizationSchema(), websiteSchema(), breadcrumbSchema([{ label: "Home", href: "/" }]), aboutPageSchema(),
      ...getTours().flatMap((tour) => [touristTripSchema(tour), faqPageSchema(tour.faqs)]),
      ...getDestinations().flatMap((destination) => [touristDestinationSchema(destination), faqPageSchema(destination.faqs)]),
      ...getGuides().map(articleSchema), faqPageSchema(faqGroups.flatMap((group) => group.items)),
    ];
    expect(types(all).filter((t) => FORBIDDEN.includes(t))).toEqual([]);
  });

  it("organization carries no address, phone or contact point", () => {
    const org = organizationSchema() as unknown as Record<string, unknown>;
    expect(org.address).toBeUndefined();
    expect(org.telephone).toBeUndefined();
    expect(org.contactPoint).toBeUndefined();
  });

  it("breadcrumb positions start at 1 with absolute URLs", () => {
    const list = breadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Tours", href: "/tours" },
    ]) as unknown as { itemListElement: { position: number; item: string }[] };
    expect(list.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(list.itemListElement[1].item).toMatch(/^https?:\/\/.+\/tours$/);
  });

  it("escapes < so content can never close the script tag", () => {
    expect(serializeJsonLd({ "@context": "https://schema.org", "@type": "Thing", name: "</script>" })).not.toContain("</script>");
  });
});

describe("routes and metadata", () => {
  it("covers all 22 indexable URLs from the copy deck", () => {
    expect(Object.keys(meta)).toHaveLength(22);
  });

  it("every page canonicalises to its own clean path", () => {
    for (const path of Object.keys(meta) as (keyof typeof meta)[]) {
      expect(pageMetadata(path).alternates?.canonical).toBe(path);
    }
  });

  it("og:title drops the suffix; the home page title is absolute", () => {
    const home = pageMetadata("/");
    expect(home.title).toEqual({ absolute: "Private Gorilla Treks and Safaris in Uganda · Kanyonyi" });
    expect(pageMetadata("/faq").openGraph?.title).toBe("Uganda Safari FAQ");
  });
});
