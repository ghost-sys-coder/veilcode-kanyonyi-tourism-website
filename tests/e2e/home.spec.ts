import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const dismiss = async (page: Page) => page.getByRole("button", { name: "Reject" }).click();

test("home renders all ten sections in order, six tours, four parks and honest demo reviews", async ({ page, request }, testInfo) => {
  const html = await (await request.get("/")).text();
  for (const text of ["3-Day Bwindi Gorilla Trek", "10-Day Classic Uganda", "Queen Elizabeth", "How fit do I need to be?"]) expect(html).toContain(text);
  await page.goto("/");
  await dismiss(page);
  const headings = await page.locator("main h2").allTextContents();
  expect(headings).toEqual([
    "How we run our trips", "Six ways to see Uganda", "The gorilla permit decides your dates",
    "Every month has a reason", "Four parks, each for a different reason", "From first message to Entebbe arrivals",
    "What travellers say", "Three things people ask before booking", "Tell us when. We'll do the rest.",
  ]);
  await expect(page.locator("#trips article")).toHaveCount(6);
  await expect(page.locator("#destinations article")).toHaveCount(4);
  await expect(page.locator("#reviews")).toContainText("We don't write reviews for a demo.");
  const json = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("");
  expect(json).not.toMatch(/"@type"\s*:\s*"(?:Offer|AggregateOffer|Review|AggregateRating|LocalBusiness|TravelAgency|PostalAddress|Person)"/);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element: HTMLImageElement) => element.decode());
  }
  await page.locator("#home-hero").scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("home.png"), fullPage: true });
});

test("trip finder defaults navigate to all tours", async ({ page }) => {
  await page.goto("/");
  await dismiss(page);
  await page.getByRole("button", { name: "Find trips", exact: true }).click();
  await expect(page).toHaveURL(/\/tours$/);
  await expect(page.getByText("Showing 6 of 6 trips")).toBeVisible();
});

test("finder sends selected filters, twelve rolling months and one tour_search event", async ({ page }) => {
  await page.goto("/");
  await dismiss(page);
  // A local spy verifies our event payload without loading Google or accepting analytics.
  await page.evaluate(() => {
    window.dataLayer = [];
    window.gtag = (...args: unknown[]) => { window.dataLayer!.push(args); };
  });
  const finder = page.getByRole("form", { name: "Find trips" });
  await finder.getByRole("combobox", { name: /What do you want to see/ }).click();
  await page.getByRole("option", { name: "Savannah wildlife", exact: true }).click();
  await finder.getByRole("combobox", { name: /When are you travelling/ }).click();
  const options = await page.getByRole("option").allTextContents();
  expect(options).toHaveLength(13);
  expect(options[0]).toBe("Any month");
  const first = options[1];
  await page.getByRole("option", { name: first, exact: true }).click();
  const expectedMonth = await finder.locator('input[name="month"]').inputValue();
  await finder.getByRole("combobox", { name: /How much time/ }).click();
  await page.getByRole("option", { name: "Up to a week", exact: true }).click();
  await finder.getByRole("button", { name: "Find trips" }).click();
  await expect(page).toHaveURL(/\/tours\?/);
  const url = new URL(page.url());
  expect(Object.fromEntries(url.searchParams)).toEqual({ experience: "savannah-wildlife", length: "7", month: expectedMonth });
  await expect(page.getByText(`Showing 3 trips: Savannah wildlife, ${first}, Up to a week`)).toBeVisible();
  const searches = await page.evaluate(() => window.dataLayer?.filter((event) => Array.isArray(event) && event[1] === "tour_search"));
  expect(searches).toEqual([["event", "tour_search", { experience: "savannah-wildlife", month: expectedMonth, length: "7" }]]);
});

test("month bars work with keyboard, retain a selection and link to that month's tours", async ({ page }) => {
  await page.goto("/");
  await dismiss(page);
  const seasons = page.locator("#seasons");
  const april = seasons.getByRole("button", { name: "April: Green season", exact: true });
  await april.focus();
  await page.keyboard.press("Space");
  await expect(april).toHaveAttribute("aria-pressed", "true");
  await expect(seasons.getByRole("heading", { name: "April", exact: true })).toBeVisible();
  await expect(seasons.getByText(/The wettest month in most parks/)).toBeVisible();
  const selectedYear = (await seasons.getByRole("link", { name: "Show April trips" }).getAttribute("href"))!.match(/month=(\d{4})/)![1];
  if (selectedYear >= "2027") {
    await expect(seasons.getByText("Travelling in 2027?", { exact: true })).toBeVisible();
    await expect(seasons.locator("#month-note")).not.toContainText("USD 600");
  }
  await page.keyboard.press("Space");
  await expect(april).toHaveAttribute("aria-pressed", "true");
  const link = seasons.getByRole("link", { name: "Show April trips" });
  await expect(link).toHaveAttribute("href", /^\/tours\?month=\d{4}-04$/);
  await link.click();
  await expect(page.getByText(/^April: The wettest month/)).toBeVisible();
  await expect(page.locator("main article")).toHaveCount(6);
  if (selectedYear >= "2027") {
    await expect(page.getByText("Cheaper permits", { exact: true })).toHaveCount(0);
    await expect(page.getByText(/April:.*USD 600/)).toHaveCount(0);
  }
});

test("home permit table keeps official currencies and FAQ answers open", async ({ page }) => {
  await page.goto("/");
  await dismiss(page);
  const permits = page.locator("#permits");
  await expect(permits.getByRole("columnheader")).toHaveCount(3);
  await expect(permits.getByRole("cell", { name: "USD 800", exact: true })).toBeVisible();
  await expect(permits.getByRole("cell", { name: "UGX 300,000", exact: true })).toHaveCount(2);
  await expect(permits).toContainText("Checked 4 October 2026");
  await page.getByRole("button", { name: "How fit do I need to be?", exact: true }).click();
  await expect(page.getByText(/If you can walk uphill steadily/)).toBeVisible();
});

test("home prices restore UGX before hydration without changing official permit fees", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("kx-currency", "ugx"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-currency", "ugx");
  await expect(page.locator('#trips [data-ccy="usd"]').first()).toBeHidden();
  await expect(page.locator('#trips [data-ccy="ugx"]').first()).toBeVisible();
  await expect(page.locator("#permits").getByRole("cell", { name: "USD 800", exact: true })).toBeVisible();
});

test("home has no WCAG 2.2 AA violations at 360px, including open finder and selected month", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await dismiss(page);
  await page.locator("#seasons").getByRole("button", { name: "March: Long rains begin" }).click();
  const check = async () => {
    const results = await new AxeBuilder({ page })
      // Base UI's invisible focus guards redirect focus and are intentionally aria-hidden.
      // Their implementation is unchanged; actual selects/options remain in the full audit.
      .exclude("[data-base-ui-focus-guard]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  };
  await check();
  await page.screenshot({ path: testInfo.outputPath("home-360.png"), fullPage: true });
  await page.getByRole("combobox", { name: /When are you travelling/ }).click();
  await check();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("combobox", { name: /When are you travelling/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("combobox", { name: /How much time/ })).toBeFocused();
});

test("home hero is LCP, reserves image space and shows only one sun action per viewport", async ({ page }) => {
  await page.addInitScript(() => {
    const metrics = { lcpId: "", lcpTag: "", cls: 0 };
    Object.assign(window, { homeMetrics: metrics });
    new PerformanceObserver((list) => {
      const entries = list.getEntries() as (PerformanceEntry & { element?: Element })[];
      metrics.lcpId = entries.at(-1)?.element?.closest("section")?.id ?? "";
      metrics.lcpTag = entries.at(-1)?.element?.tagName ?? "";
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await page.locator("#home-hero img").evaluate((image: HTMLImageElement) => image.decode());
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.evaluate(() => (window as unknown as { homeMetrics: { lcpId: string } }).homeMetrics.lcpId)).toBe("home-hero");
  await expect.poll(() => page.evaluate(() => (window as unknown as { homeMetrics: { lcpTag: string } }).homeMetrics.lcpTag)).toBe("IMG");
  const hero = page.locator("#home-hero img");
  await expect(hero).toHaveAttribute("data-nimg", "fill");
  const cls = await page.evaluate(() => (window as unknown as { homeMetrics: { cls: number } }).homeMetrics.cls);
  expect(cls).toBeLessThanOrEqual(0.01);
  await dismiss(page);
  for (const target of [page.getByRole("button", { name: "Find trips", exact: true }), page.getByRole("heading", { name: "Tell us when. We'll do the rest." })]) {
    await target.scrollIntoViewIfNeeded();
    const count = await page.locator("main .bg-sun, header .bg-sun").evaluateAll((elements) => elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    }).length);
    expect(count).toBeLessThanOrEqual(1);
  }
});
