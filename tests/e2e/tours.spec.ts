import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// S5: /tours listing with URL filters, and the six tour pages.

const dismiss = async (page: Page) => {
  await page.getByRole("button", { name: "Reject" }).click();
};
const cardNames = (page: Page) => page.locator("main article h2").allTextContents();

test.describe("/tours listing", () => {
  test("all six tours are in the static HTML, in recommended order", async ({ request }) => {
    const html = await (await request.get("/tours")).text();
    for (const name of [
      "3-Day Bwindi Gorilla Trek",
      "4-Day Murchison Falls Safari",
      "4-Day Kibale Chimps and Queen Elizabeth",
      "7-Day Primates and Savannah",
      "10-Day Classic Uganda",
      "2-Day Jinja and the Nile",
    ]) {
      expect(html).toContain(name);
    }
  });

  test("category chip filters, updates the URL and keeps the canonical", async ({ page }) => {
    await page.goto("/tours");
    await dismiss(page);
    await expect(page.getByText("Showing 6 of 6 trips")).toBeVisible();
    await page.getByRole("button", { name: "Savannah wildlife" }).click();
    await expect(page).toHaveURL(/experience=savannah-wildlife/);
    await expect(page.getByText("Showing 4 trips: Savannah wildlife")).toBeVisible();
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(/\/tours$/);
  });

  test("trip finder parameters: month note, badges and good-month tours first", async ({ page }) => {
    await page.goto("/tours?month=2026-10");
    await dismiss(page);
    await expect(page.getByText(/^October: Afternoon showers are common/)).toBeVisible();
    expect((await cardNames(page)).slice(0, 2)).toEqual(["4-Day Kibale Chimps and Queen Elizabeth", "2-Day Jinja and the Nile"]);
    await expect(page.getByText("Good in October")).toHaveCount(2);
  });

  test("sorting by price puts the Jinja weekend first", async ({ page }) => {
    await page.goto("/tours?sort=price");
    await dismiss(page);
    expect((await cardNames(page))[0]).toBe("2-Day Jinja and the Nile");
  });

  test("no matches shows the copy's empty state, and Clear filters recovers", async ({ page }) => {
    await page.goto("/tours?experience=nile-and-adventure&length=8plus");
    await dismiss(page);
    await expect(page.getByRole("heading", { name: "No trips match all three choices." })).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).first().click();
    await expect(page.getByText("Showing 6 of 6 trips")).toBeVisible();
  });

  test("See itinerary opens the tour page", async ({ page }) => {
    await page.goto("/tours");
    await dismiss(page);
    await page.getByRole("link", { name: "See itinerary" }).first().click();
    await expect(page).toHaveURL(/\/tours\/3-day-bwindi-gorilla-trek$/);
  });
});

test.describe("tour pages", () => {
  test("Bwindi trek: copy, computed prices, structured data and enquiry link", async ({ page }) => {
    await page.goto("/tours/3-day-bwindi-gorilla-trek");
    await dismiss(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("3-Day Bwindi Gorilla Trek");
    await expect(page).toHaveTitle("3-Day Bwindi Gorilla Trek from Kampala | Kanyonyi");
    const prices = page.locator("#prices");
    for (const value of ["$1,650", "$1,450", "$1,420", "$1,220", "$1,340", "$1,140", "$140"]) {
      await expect(prices.getByText(value, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByRole("link", { name: "Ask about this trip" }).first()).toHaveAttribute(
      "href",
      "/plan-your-trip?tour=3-day-bwindi-gorilla-trek",
    );
    const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((b) =>
      [JSON.parse(b)].flat().map((d: { "@type": string }) => d["@type"]),
    );
    expect(types).toEqual(expect.arrayContaining(["TouristTrip", "FAQPage", "BreadcrumbList"]));
    expect(JSON.stringify(types)).not.toMatch(/Offer|Review|AggregateRating|LocalBusiness/);
  });

  test("FAQ answers open from the accordion", async ({ page }) => {
    await page.goto("/tours/3-day-bwindi-gorilla-trek");
    await dismiss(page);
    const answer = page.getByText(/Scheduled light aircraft fly from Entebbe/);
    await expect(answer).toBeHidden();
    await page.getByRole("button", { name: "Can we fly instead of driving?" }).click();
    await expect(answer).toBeVisible();
  });

  test("currency switch shows UGX prices", async ({ page, isMobile }) => {
    test.skip(isMobile, "the toggle is in the mobile menu; covered in shell.spec");
    await page.goto("/tours/4-day-murchison-falls-safari");
    await dismiss(page);
    await page.getByRole("button", { name: "UGX" }).click();
    await expect(page.locator("#prices").getByText("UGX 4,710,000").first()).toBeVisible();
  });

  test("tour without a 'Good to know' omits that jump link", async ({ page }) => {
    await page.goto("/tours/10-day-classic-uganda");
    const nav = page.getByRole("navigation", { name: "On this page" });
    await expect(nav.getByRole("link", { name: "Good to know" })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Day by day" })).toBeVisible();
  });

  test("unknown tour is a 404", async ({ request }) => {
    expect((await request.get("/tours/kidepo-valley")).status()).toBe(404);
  });

  test("no WCAG 2.2 AA violations on the listing and a tour page", async ({ page }) => {
    for (const path of ["/tours", "/tours/7-day-primates-and-savannah"]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${path} ${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    }
  });
});
