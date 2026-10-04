// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { fill } from "@/lib/content/format";
import { Inline } from "@/lib/content/inline";
import { parseRichText, richTextToPlain } from "@/lib/content/rich-text";

describe("parseRichText", () => {
  it("returns plain text untouched", () => {
    expect(parseRichText("Six seats, six windows")).toEqual([{ type: "text", value: "Six seats, six windows" }]);
  });

  it("parses bold, italic and links in order", () => {
    expect(
      parseRichText("Kanyonyi comes from *akanyonyi*. Since **1 March 2026**, see [the guide](/guides/uganda-gorilla-permits)."),
    ).toEqual([
      { type: "text", value: "Kanyonyi comes from " },
      { type: "italic", value: "akanyonyi" },
      { type: "text", value: ". Since " },
      { type: "bold", value: "1 March 2026" },
      { type: "text", value: ", see " },
      { type: "link", label: "the guide", href: "/guides/uganda-gorilla-permits" },
      { type: "text", value: "." },
    ]);
  });

  it("leaves an unmatched asterisk as text", () => {
    expect(richTextToPlain("Facts marked with * are checked")).toBe("Facts marked with * are checked");
  });

  it("flattens to plain text for meta and JSON-LD", () => {
    expect(richTextToPlain("**Waterproof boots,** see [packing](/guides/x)")).toBe("Waterproof boots, see packing");
  });
});

describe("Inline", () => {
  it("renders internal links as same-tab links", () => {
    const { container } = render(<p><Inline text="Read [the permit guide](/guides/uganda-gorilla-permits)" /></p>);
    const link = container.querySelector("a")!;
    expect(link.getAttribute("href")).toBe("/guides/uganda-gorilla-permits");
    expect(link.getAttribute("target")).toBeNull();
  });

  it("opens external links in a new tab and says so to screen readers", () => {
    const { container } = render(<p><Inline text="[See who built this](https://veilcode.studio)" /></p>);
    const link = container.querySelector("a")!;
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.textContent).toBe("See who built this (opens in a new tab)");
  });

  it("renders emphasis", () => {
    const { container } = render(<p><Inline text="from *akanyonyi*, **Luganda**" /></p>);
    expect(container.querySelector("em")?.textContent).toBe("akanyonyi");
    expect(container.querySelector("strong")?.textContent).toBe("Luganda");
  });
});

describe("fill", () => {
  it("fills placeholders", () => {
    expect(fill("Explore {destination}", { destination: "Bwindi" })).toBe("Explore Bwindi");
  });

  it("throws rather than render a raw placeholder", () => {
    expect(() => fill("Good in {month}", {})).toThrow(/month/);
  });
});
