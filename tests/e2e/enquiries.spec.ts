import { randomUUID } from "node:crypto";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-kx-test-id": randomUUID() });
});

async function select(page: Page, id: string, label: string) {
  await page.locator(`#${id}`).click();
  await page.getByRole("option", { name: label, exact: true }).click();
}
async function complete(page: Page) {
  await page.goto("/plan-your-trip?tour=custom");
  await select(page, "travelMonth", "Not sure yet");
  await select(page, "residency", "Outside East Africa");
  await page.getByLabel("Your name").fill("Ada Test");
  await page.getByLabel("Email", { exact: false }).fill("traveller@example.com");
  await page.getByRole("checkbox", { name: /^I agree/ }).check();
}
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test("preselects a known tour, ignores an unknown one, and offers exactly 18 months", async ({ page }) => {
  await page.goto("/plan-your-trip?tour=3-day-bwindi-gorilla-trek");
  await expect(page.locator("#tour")).toContainText("3-Day Bwindi Gorilla Trek");
  await expect(page.locator("#estimate-label")).toBeVisible();
  await expect(page.getByRole("region", { name: "Estimated total" })).toContainText("$3,300");
  await page.locator("#travelMonth").click();
  await expect(page.getByRole("option")).toHaveCount(20); // placeholder, 18 months, unsure
  await page.keyboard.press("Escape");
  await page.goto("/plan-your-trip?tour=missing");
  await expect(page.locator("#tour")).toContainText("Choose a trip");
  await expect(page.locator("#estimate-label")).toHaveCount(0);
});

test("estimate handles solo, seven guests, the stepper limit, custom and currency", async ({ page }) => {
  await page.goto("/plan-your-trip?tour=3-day-bwindi-gorilla-trek");
  const estimate = page.getByRole("region", { name: "Estimated total" });
  await page.getByRole("button", { name: "Remove a traveller" }).click();
  await expect(estimate).toContainText("$2,250");
  await expect(estimate).toContainText("Includes the single room supplement.");
  await expect(page.getByRole("button", { name: "Remove a traveller" })).toBeDisabled();
  await page.getByLabel("How many travellers?").fill("7");
  await expect(estimate).toContainText("$10,150");
  await expect(estimate).toContainText("Groups of seven or more travel in two vehicles");
  await page.getByLabel("How many travellers?").fill("12");
  await expect(page.getByText("For groups larger than 12, tell us in the notes and we'll plan it.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Add a traveller" })).toBeDisabled();
  await select(page, "tour", "Something custom");
  await expect(estimate).toContainText("Priced in your quote");
  await page.evaluate(() => { document.documentElement.dataset.currency = "ugx"; });
  await select(page, "tour", "3-Day Bwindi Gorilla Trek");
  await expect(estimate.locator('[data-ccy="ugx"]')).toBeVisible();
  await expect(estimate.locator('[data-ccy="usd"]')).toBeHidden();
});

test("invalid submit focuses the summary, links errors to fields and keeps values", async ({ page }) => {
  await page.goto("/plan-your-trip");
  await page.getByLabel("Your name").fill("Ada");
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  const summary = page.getByRole("alert").filter({ hasText: "Please fix" });
  await expect(summary).toBeFocused();
  await expect(summary.getByRole("link")).toHaveCount(5);
  await summary.getByRole("link", { name: 'Choose a trip, or "Something custom".' }).click();
  await expect(page.locator("#tour")).toBeFocused();
  await expect(page.locator("#tour")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Your name")).toHaveValue("Ada");
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
});

test("successful enquiry replaces the form, focuses confirmation and emits no PII", async ({ page }) => {
  await page.addInitScript(() => {
    window.dataLayer = [];
    window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
  });
  await complete(page);
  await page.getByLabel("Anything else we should know?").fill("A private note");
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  const heading = page.getByRole("heading", { name: "That's the enquiry flow working, Ada." });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
  await expect(page.getByRole("form", { name: "Send enquiry" })).toHaveCount(0);
  await expect(page.locator("main")).toContainText(/KX-\d+/);
  await expect(page.getByRole("link", { name: "See who built this", exact: true })).toHaveAttribute("href", "https://veilcode.studio");
  const events = await page.evaluate(() => window.dataLayer);
  expect(events?.filter((e) => Array.isArray(e) && e[1] === "start_enquiry")).toHaveLength(1);
  expect(events?.filter((e) => Array.isArray(e) && e[1] === "submit_enquiry")).toHaveLength(1);
  expect(JSON.stringify(events)).not.toContain("traveller@example.com");
  expect(JSON.stringify(events)).not.toContain("Ada Test");
  expect(JSON.stringify(events)).not.toContain("private note");
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
});

test("network failure keeps the form, values and WhatsApp recovery", async ({ page }) => {
  await complete(page);
  await page.route("**/plan-your-trip**", async (route) => route.request().method() === "POST" ? route.abort("internetdisconnected") : route.continue());
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Your enquiry didn't send" })).toBeVisible();
  await expect(page.getByLabel("Your name")).toHaveValue("Ada Test");
  await expect(page.getByRole("button", { name: "Send enquiry", exact: true })).toBeEnabled();
  await expect(page.getByRole("alert").getByRole("link", { name: /^Chat on WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa.me\/256750242627/);
});

for (const [scenario, message] of [["server-error", "Something went wrong on our side"], ["rate-limit", "You've sent several enquiries"]]) {
  test(`${scenario} is recoverable and uses approved copy`, async ({ page }) => {
    await page.setExtraHTTPHeaders({ "x-kx-test-id": randomUUID(), "x-kx-test-scenario": scenario });
    await complete(page);
    await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
    await expect(page.getByRole("alert").filter({ hasText: message })).toBeFocused();
    await expect(page.getByLabel("Your name")).toHaveValue("Ada Test");
    expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
  });
}

test("a stored enquiry still succeeds when both email sends fail", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-kx-test-id": randomUUID(), "x-kx-test-scenario": "email-failure" });
  await complete(page);
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.getByRole("heading", { name: "That's the enquiry flow working, Ada." })).toBeVisible();
  await expect(page.getByText(/^Didn't get our email in 10 minutes/)).toBeVisible();
});

test("honeypot returns a normal-looking success without a conversion event", async ({ page }) => {
  await page.addInitScript(() => { window.dataLayer = []; window.gtag = (...args: unknown[]) => window.dataLayer!.push(args); });
  await complete(page);
  await page.locator('[name="website"]').evaluate((input) => { (input as HTMLInputElement).value = "bot-filled"; });
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.getByRole("heading", { name: "That's the enquiry flow working, Ada." })).toBeVisible();
  expect(await page.evaluate(() => window.dataLayer!.filter((e) => Array.isArray(e) && e[1] === "submit_enquiry"))).toHaveLength(0);
});

test("form, open select and wrapped resident choice pass axe and 360px layout", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/plan-your-trip");
  await expect(page.getByRole("heading", { name: "This is a working demo" })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `test-results/enquiry-${testInfo.project.name}-360.png`, fullPage: true });
  await page.locator("#residency").click();
  expect((await new AxeBuilder({ page }).exclude("[data-base-ui-focus-guard]").withTags(tags).analyze()).violations).toEqual([]);
  await page.getByRole("option", { name: /^In Uganda/ }).click();
  await expect(page.locator("#residency")).toContainText("South Sudan or DRC");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
});

test("native fallback submits and renders a reference without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: testInfo.project.use.baseURL, extraHTTPHeaders: { "x-kx-test-id": randomUUID() } });
  const page = await context.newPage();
  await page.goto("/plan-your-trip?tour=custom");
  await page.locator("#travelMonth-native").selectOption("not-sure");
  await page.locator("#residency-native").selectOption("outside-east-africa");
  await page.locator("#name").fill("Ada Test");
  await page.locator("#email").fill("traveller@example.com");
  await page.locator("#consent-native").check();
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.getByRole("heading", { name: "That's the enquiry flow working, Ada." })).toBeVisible();
  await expect(page.locator("main")).toContainText(/KX-\d+/);
  await context.close();
});
