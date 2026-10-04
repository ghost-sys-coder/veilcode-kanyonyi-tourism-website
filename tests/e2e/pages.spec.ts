import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// S6: every new route, with real production HTML and a 360px pass on each template.
const routes = [
  "/destinations", "/destinations/bwindi", "/destinations/kibale",
  "/destinations/queen-elizabeth", "/destinations/murchison-falls",
  "/guides", "/guides/uganda-gorilla-permits", "/guides/best-time-to-visit-uganda",
  "/guides/what-to-pack-gorilla-trekking-safari", "/faq", "/about", "/booking-terms", "/privacy",
  "/plan-your-trip",
];
const schemas = async (page: Page) => (await page.locator('script[type="application/ld+json"]').allTextContents())
  .flatMap((text) => [JSON.parse(text)].flat());

for (const path of routes) {
  test(`${path}: 200, one h1, self canonical, noindex, axe and 360px layout`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(path);
    expect(new URL(canonical!).search).toBe("");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    expect(response?.headers()["x-robots-tag"]).toBe("noindex");
    const data = await schemas(page);
    expect(data.map((entry) => entry["@type"])).toContain("BreadcrumbList");
    expect(JSON.stringify(data)).not.toMatch(/"@type":"(?:Offer|AggregateOffer|Review|AggregateRating|LocalBusiness|TravelAgency|PostalAddress|Person)"/);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    await page.setViewportSize({ width: 360, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("destination hub links to all four parks and shows sourced drive times", async ({ page }) => {
  await page.goto("/destinations");
  await expect(page.locator("main article")).toHaveCount(4);
  await expect(page.getByRole("table")).toContainText("8 to 9 hours");
  expect((await schemas(page)).find((d) => d["@type"] === "ItemList").itemListElement).toHaveLength(4);
  await page.getByRole("button", { name: "Reject" }).click();
  await page.getByRole("link", { name: "Explore Bwindi", exact: true }).click();
  await expect(page).toHaveURL(/\/destinations\/bwindi$/);
});

test("destinations derive only the tours that visit and emit real park identity", async ({ page }) => {
  const expected: Record<string, string[]> = {
    bwindi: ["3-Day Bwindi Gorilla Trek", "7-Day Primates and Savannah", "10-Day Classic Uganda"],
    kibale: ["4-Day Kibale Chimps and Queen Elizabeth", "7-Day Primates and Savannah", "10-Day Classic Uganda"],
    "queen-elizabeth": ["4-Day Kibale Chimps and Queen Elizabeth", "7-Day Primates and Savannah", "10-Day Classic Uganda"],
    "murchison-falls": ["4-Day Murchison Falls Safari", "10-Day Classic Uganda"],
  };
  for (const [slug, tours] of Object.entries(expected)) {
    await page.goto(`/destinations/${slug}`);
    expect(await page.locator("#tours article h3").allTextContents()).toEqual(tours);
    const destination = (await schemas(page)).find((d) => d["@type"] === "TouristDestination");
    expect(destination.containedInPlace).toEqual({ "@type": "Country", name: "Uganda" });
    expect(destination.sameAs[0]).toMatch(/^https:\/\/en.wikipedia.org\//);
    expect(destination.includesAttraction.length).toBeGreaterThan(0);
  }
});

test("guide index links to three dated guides", async ({ page }) => {
  await page.goto("/guides");
  await expect(page.locator("main article")).toHaveCount(3);
  await expect(page.locator("main article").getByText("Guide · Updated 4 October 2026", { exact: true })).toHaveCount(3);
  expect((await schemas(page)).find((d) => d["@type"] === "ItemList").itemListElement).toHaveLength(3);
});

test("permit guide renders all rate columns, jump links and Article data", async ({ page }) => {
  await page.goto("/guides/uganda-gorilla-permits");
  const table = page.getByRole("table", { name: "Prices in 2026 and 2027" });
  await expect(table.getByRole("columnheader")).toHaveCount(4);
  await expect(table.getByRole("row")).toHaveCount(5);
  await expect(table).toContainText("Foreign resident (with a valid Ugandan or East African residence permit)");
  await expect(table).toContainText("UGX 300,000");
  await expect(table).toContainText("USD 500");
  await expect(page.getByText(/Low-season rates for 2027 had not been published/)).toBeVisible();
  await expect(page.locator("#how-to-book ol li")).toHaveCount(4);
  await page.getByRole("button", { name: "Reject" }).click();
  await page.getByRole("navigation", { name: "In this guide" }).getByRole("link", { name: "How to book", exact: true }).click();
  await expect(page).toHaveURL(/#how-to-book$/);
  const article = (await schemas(page)).find((d) => d["@type"] === "Article");
  expect(article.author).toEqual({ "@type": "Organization", name: "Kanyonyi Expeditions planning team" });
  expect(article.dateModified).toBe("2026-10-04");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
});

test("season guide renders its comparison table and all twelve monthEntry blocks", async ({ page }) => {
  await page.goto("/guides/best-time-to-visit-uganda");
  await expect(page.getByRole("table").getByRole("columnheader")).toHaveCount(3);
  expect(await page.locator("#month-by-month h3").allTextContents()).toEqual([
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ]);
  await expect(page.getByRole("navigation", { name: "Related" }).getByRole("link", { name: "All tours" })).toHaveAttribute("href", "/tours");
});

test("packing guide renders lists, health stamp, related links and WhatsApp action", async ({ page }) => {
  await page.goto("/guides/what-to-pack-gorilla-trekking-safari");
  await expect(page.locator("#for-the-gorilla-trek li")).toHaveCount(10);
  await expect(page.getByText("Checked 4 October 2026. Entry rules can change; check official sources before you travel.")).toBeVisible();
  await expect(page.locator("main").getByRole("link", { name: /^Chat on WhatsApp/ })).toHaveAttribute("href", /https:\/\/wa.me\/256750242627\?text=/);
});

test("FAQ has all 16 questions in HTML and JSON-LD; keyboard opens an answer", async ({ page, request }) => {
  const html = await (await request.get("/faq")).text();
  expect(html).toContain("Most visitors need one. Apply online");
  await page.goto("/faq");
  await expect(page.locator("main button[data-slot='accordion-trigger']")).toHaveCount(16);
  const faq = (await schemas(page)).find((d) => d["@type"] === "FAQPage");
  expect(faq.mainEntity).toHaveLength(16);
  const trigger = page.getByRole("button", { name: "Do we need a visa?", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/^Most visitors need one\. Apply online/)).toBeVisible();
});

test("about labels its sample team and has AboutPage rather than Person schema", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByText(/^Demo note: on a live site/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sarah Namutebi", exact: true })).toBeVisible();
  expect((await schemas(page)).find((d) => d["@type"] === "AboutPage").mainEntity["@id"]).toMatch(/\/#organization$/);
});

test("demo policies use demo variants and label their sample status", async ({ page }) => {
  for (const path of ["/booking-terms", "/privacy"]) {
    await page.goto(path);
    await expect(page.locator("main").getByRole("alert")).toContainText("Sample policy for a demonstration site.");
    expect(await page.locator("main").textContent()).not.toContain("[CLIENT:");
  }
  await expect(page.getByText("12 months, then deleted. Ask us to delete it sooner and we will.")).toBeVisible();
  await expect(page.getByText("VeilCode Studio · frank@veilcode.studio · Kampala, Uganda", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What we collect", exact: true })).toHaveCount(0);
  await page.goto("/booking-terms");
  await expect(page.getByText(/^Kanyonyi Expeditions is a fictional operator created/)).toBeVisible();
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(4);
});

test("unknown destination and guide slugs return 404", async ({ request }) => {
  for (const path of ["/destinations/kidepo", "/guides/missing-guide"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test("every sitemap URL returns 200 with one h1 and a self canonical on the sitemap host", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toHaveLength(22);
  for (const url of urls) {
    const response = await request.get(new URL(url).pathname);
    expect(response.status(), url).toBe(200);
    const html = await response.text();
    expect(html.match(/<h1(?:\s|>)/g), url).toHaveLength(1);
    const canonical = /<link(?=[^>]*rel="canonical")(?=[^>]*href="([^"]+)")[^>]*>/.exec(html)?.[1];
    // Next omits the origin's trailing slash in the root canonical; these are the same URL.
    expect(canonical, url).toBeDefined();
    expect(new URL(canonical!).href, url).toBe(new URL(url).href);
    expect(response.headers()["x-robots-tag"], url).toBe("noindex");
    expect(html, url).toMatch(/<meta(?=[^>]*name="robots")(?=[^>]*content="[^"]*noindex)[^>]*>/);
    expect(html, url).toMatch(/<title>[^<]+<\/title>/);
    expect(html, url).toMatch(/<meta(?=[^>]*name="description")(?=[^>]*content="[^"]+")[^>]*>/);
    const ogUrl = /<meta(?=[^>]*property="og:url")(?=[^>]*content="([^"]+)")[^>]*>/.exec(html)?.[1];
    expect(new URL(ogUrl!).href, url).toBe(new URL(url).href);
    const ogImage = /<meta(?=[^>]*property="og:image")(?=[^>]*content="([^"]+)")[^>]*>/.exec(html)?.[1];
    expect(new URL(ogImage!).origin, url).toBe(new URL(url).origin);
  }
});

test("all sitemap pages fit at 360px and every internal link and jump target resolves", async ({ page, request }) => {
  test.setTimeout(90_000);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
  const paths = new Set(urls.map((url) => url.pathname));
  const idsByPath = new Map<string, Set<string>>();
  const links: { from: string; to: string; hash: string }[] = [];
  await page.setViewportSize({ width: 360, height: 800 });
  for (const url of urls) {
    await page.goto(url.pathname);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), url.pathname).toBe(true);
    idsByPath.set(url.pathname, new Set(await page.locator("[id]").evaluateAll((nodes) => nodes.map((node) => node.id))));
    const hrefs = await page.locator("a[href]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
    for (const href of hrefs) {
      const target = new URL(href, url);
      if (target.origin !== url.origin) continue;
      expect(paths.has(target.pathname), `${url.pathname} links to ${href}`).toBe(true);
      links.push({ from: url.pathname, to: target.pathname, hash: target.hash });
    }
  }
  for (const link of links.filter((link) => link.hash)) {
    expect(idsByPath.get(link.to)?.has(decodeURIComponent(link.hash.slice(1))), `${link.from} links to ${link.to}${link.hash}`).toBe(true);
  }
});
