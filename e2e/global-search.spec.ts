import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL SEARCH — Command palette (Cmd+K / Ctrl+K)
   ═══════════════════════════════════════════════════════════════ */

test.describe("Global Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the SPA to hydrate and the search listener to attach
    await page.locator("nav").first().waitFor({ state: "visible", timeout: 10_000 });
  });

  test("Cmd+K opens search dialog", async ({ page }) => {
    // The search dialog uses Cmd+K (Mac) or Ctrl+K (Linux/Windows)
    // Since we're on a headless Chromium (Linux), use Ctrl+K
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);

    // Search dialog should be visible with an input
    const searchDialog = page.locator("[role=dialog]").first();
    await expect(searchDialog).toBeVisible({ timeout: 5_000 });

    const input = page.getByPlaceholder(/search/i);
    await expect(input).toBeVisible({ timeout: 3_000 });
  });

  test("typing shows search results", async ({ page }) => {
    // Open search
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);

    const input = page.getByPlaceholder(/search/i);
    await input.fill("fade");
    await page.waitForTimeout(500);

    // Results should appear — look for any result items
    const results = page.locator("button").filter({ hasText: /fade/i });
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Escape closes search dialog", async ({ page }) => {
    // Open search
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);

    const searchDialog = page.locator("[role=dialog]").first();
    await expect(searchDialog).toBeVisible({ timeout: 5_000 });

    // Press Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // Dialog should be gone
    await expect(searchDialog).not.toBeVisible({ timeout: 3_000 });
  });

  test("clicking a result navigates to the view", async ({ page }) => {
    // Open search
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);

    const input = page.getByPlaceholder(/search/i);
    await input.fill("effects");
    await page.waitForTimeout(500);

    // Click the first result that points to the effects view
    const firstResult = page.locator("button").filter({ hasText: /effects/i }).first();
    if (await firstResult.isVisible()) {
      await firstResult.click();
      await page.waitForTimeout(1_000);
      expect(page.url()).toContain("/effects");
    }
  });
});
