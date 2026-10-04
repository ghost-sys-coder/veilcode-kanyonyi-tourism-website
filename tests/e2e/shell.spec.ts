import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// S2 shell: header, footer, demo notice, consent, WhatsApp, 404, and the SEO files.

test.describe("site shell", () => {
  test("home page has one h1, noindex in meta and header, and a self canonical", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toBe("noindex");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/^https?:\/\/[^/]+\/?$/);
    await expect(page).toHaveTitle("Private Gorilla Treks and Safaris in Uganda · Kanyonyi");
  });

  test("skip link is the first focusable element and moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });

  test("header and footer logo links include the visible wordmark in their accessible name", async ({ page }) => {
    await page.goto("/");
    for (const landmark of ["banner", "contentinfo"] as const) {
      const logo = page.getByRole(landmark).getByRole("link", { name: /Kanyonyi.*Expeditions.*Uganda/i });
      await expect(logo).toHaveCount(1);
      await expect(logo).toHaveAttribute("href", "/");
    }
  });

  test("demo notice can be dismissed for the session", async ({ page }) => {
    await page.goto("/");
    const notice = page.getByText(/Demo site\. Kanyonyi Expeditions is a fictional operator/);
    await expect(notice).toBeVisible();
    await page.locator(".demo-notice").getByRole("button", { name: "Close" }).click();
    await expect(notice).toBeHidden();
    await page.reload();
    await expect(notice).toBeHidden();
  });

  test("consent banner: reject is remembered and loads no Google tag", async ({ page }) => {
    const gaRequests: string[] = [];
    page.on("request", (r) => r.url().includes("googletagmanager.com") && gaRequests.push(r.url()));
    await page.goto("/");
    const banner = page.getByText(/We use analytics cookies/);
    await expect(banner).toBeVisible();
    await page.getByRole("button", { name: "Reject" }).click();
    await expect(banner).toBeHidden();
    await page.reload();
    await expect(banner).toBeHidden();
    expect(gaRequests).toEqual([]);
  });

  test("cookie settings reopens the banner", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Reject" }).click();
    await page.getByRole("button", { name: "Cookie settings" }).click();
    await expect(page.getByRole("button", { name: "Accept analytics" })).toBeFocused();
  });

  test("WhatsApp button opens the planner popover with the right link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Reject" }).click();
    await page.getByRole("button", { name: "Chat with us on WhatsApp" }).click();
    await expect(page.getByText("Talk to a trip planner")).toBeVisible();
    const open = page.getByRole("link", { name: /Open WhatsApp/ });
    await expect(open).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=Hi%2C%20I'm%20interested%20in%20the%20Kanyonyi%20demo%20site\.$/);
  });

  test("currency choice persists across pages", async ({ page, isMobile }) => {
    // Below 640px the toggle lives in the mobile menu.
    const openToggle = async () => {
      if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    };
    await page.goto("/");
    await page.getByRole("button", { name: "Reject" }).click();
    await openToggle();
    await page.getByRole("button", { name: "UGX" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-currency", "ugx");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-currency", "ugx");
    await openToggle();
    await expect(page.getByRole("button", { name: "UGX" })).toHaveAttribute("aria-pressed", "true");
  });

  test("mobile menu opens, lists the nav, and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Reject" }).click();
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    for (const label of ["Tours", "Destinations", "Gorilla permits", "When to go", "About"]) {
      await expect(dialog.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await dialog.getByRole("button", { name: "Close menu" }).click();
    await expect(dialog).toBeHidden();
  });

  test("no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });

  test("home and 404 have no WCAG 2.2 AA violations", async ({ page }) => {
    for (const path of ["/", "/this-trail-goes-nowhere"]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${path} ${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    }
  });

  test("unknown URL returns 404 with the copy deck page", async ({ page }) => {
    const response = await page.goto("/this-trail-goes-nowhere");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This trail doesn't go anywhere");
    await expect(page.getByRole("link", { name: "Gorilla permits explained" })).toHaveAttribute("href", "/guides/uganda-gorilla-permits");
  });
});

test.describe("SEO files", () => {
  test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    const body = await res.text();
    expect(body).toMatch(/Allow: \//);
    expect(body).not.toMatch(/Disallow: \/\s*$/m);
    expect(body).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
  });

  test("sitemap lists all 22 routes on the configured host", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body.match(/<loc>/g)).toHaveLength(22);
    expect(body).toContain("/tours/10-day-classic-uganda</loc>");
  });

  test("llms.txt is plain text and noindexed on the demo", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.headers()["content-type"]).toContain("text/plain");
    expect(res.headers()["x-robots-tag"]).toBe("noindex");
    expect(await res.text()).toMatch(/^# Kanyonyi Expeditions\n/);
  });

  test("structured data parses and includes Organization and WebSite", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.flatMap((b) => [JSON.parse(b)].flat().map((d: { "@type": string }) => d["@type"]));
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite"]));
  });
});

test.describe("photography", () => {
  test("home hero is optimised, described and shared", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("img", { name: /silverback mountain gorilla/i });
    await expect(hero).toBeVisible();
    const src = await hero.evaluate((img: HTMLImageElement) => img.currentSrc);
    expect(src).toContain("/_next/image");
    const res = await page.request.get(src);
    expect(res.ok()).toBe(true);
    // Never wider than it renders: the served file is at most twice the displayed width (2x screens).
    const { rendered, natural } = await hero.evaluate((img: HTMLImageElement) => ({ rendered: img.clientWidth, natural: img.naturalWidth }));
    expect(natural).toBeLessThanOrEqual(rendered * 2 + 64);
    expect((await res.body()).length).toBeLessThan(250 * 1024);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toMatch(/^https?:\/\/.+\.jpg$/);
  });
});
