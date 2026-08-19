import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration — FerrumEngine
 *
 * Runs against a locally-started Next.js production server.
 * The webServer block automatically builds & starts the app.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: 1,
  reporter: "html",
  timeout: 30_000,

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "off",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npx next start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env["CI"],
    timeout: 60_000,
  },
});
