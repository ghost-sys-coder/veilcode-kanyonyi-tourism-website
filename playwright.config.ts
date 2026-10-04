import { defineConfig, devices } from "@playwright/test";

// End-to-end and accessibility checks (AGENTS.md section 0, default 5).
// Runs against a production build so caching, headers and metadata match what Vercel serves.

const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // The production server resizes images with sharp; more than two parallel browsers ran this
  // machine out of memory (S4, 4 October 2026).
  workers: 2,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    // A previous next start can retain an old build on Windows; always test a fresh build.
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
