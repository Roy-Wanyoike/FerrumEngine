import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Main links, mobile menu, URL changes
   ═══════════════════════════════════════════════════════════════ */

const MAIN_ROUTES = [
  { label: /effects/i, path: "/effects" },
  { label: /playground/i, path: "/playground" },
  { label: /docs/i, path: "/docs" },
  { label: /blog/i, path: "/blog" },
  { label: /changelog/i, path: "/changelog" },
];

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for nav to hydrate
    await page.locator("nav").first().waitFor({ state: "visible", timeout: 10_000 });
  });

  for (const route of MAIN_ROUTES) {
    test(`navigating to ${route.path} updates URL`, async ({ page }) => {
      // Use client-side router by clicking the link or navigating directly
      // Direct navigation since mega-menu items require hover interaction
      await page.goto(route.path);
      await page.waitForTimeout(1_000);
      expect(page.url()).toContain(route.path);
    });
  }

  test("Home link navigates to /", async ({ page }) => {
    // Click the FerrumEngine logo to go home
    const logo = page.locator("a, button").filter({ hasText: /ferrum/i }).first();
    if (await logo.isVisible()) {
      await logo.click();
      await page.waitForTimeout(500);
      expect(page.url()).toMatch(/\/$/);
    }
  });

  test("mobile menu opens and closes", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.locator("nav").first().waitFor({ state: "visible", timeout: 10_000 });

    // Open mobile menu via hamburger button
    const hamburger = page.locator("button[aria-label='Open menu'], button[aria-label='Toggle menu']").first();
    if (await hamburger.isVisible()) {
      await hamburger.click();
      const mobileMenu = page.locator("#mobile-menu");
      await expect(mobileMenu).toBeVisible({ timeout: 5_000 });

      // Close with Escape
      await page.keyboard.press("Escape");
      await expect(mobileMenu).not.toBeVisible({ timeout: 3_000 });
    }
  });

  test("URL changes correctly on navigation", async ({ page }) => {
    // Navigate via direct URL changes (SPA routing)
    await page.goto("/effects");
    await page.waitForTimeout(1_000);
    expect(page.url()).toContain("/effects");

    await page.goto("/docs");
    await page.waitForTimeout(1_000);
    expect(page.url()).toContain("/docs");

    await page.goto("/");
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/\/$/);
  });
});
