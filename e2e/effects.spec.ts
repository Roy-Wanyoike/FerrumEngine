import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════════════════════
   EFFECTS PAGE — Gallery, search, and category filtering
   ═══════════════════════════════════════════════════════════════ */

test.describe("Effects Gallery", () => {
  test("effects grid loads with cards", async ({ page }) => {
    await page.goto("/effects");
    // Effects are lazy-loaded — wait for effect cards to appear
    const firstCard = page.locator(".rounded-2xl").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });
  });

  test("search input filters effects", async ({ page }) => {
    await page.goto("/effects");

    // Wait for the search input to hydrate
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible({ timeout: 15_000 });

    // Type a specific query
    await searchInput.fill("fade");
    await page.waitForTimeout(500);

    // Verify that at least one visible card contains the search term
    const cards = page.locator("[class*=rounded-2xl]");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Check that the first card's name contains "fade"
    const firstName = await cards.first().locator("h3").textContent();
    expect(firstName?.toLowerCase()).toContain("fade");
  });

  test("category filter buttons are clickable", async ({ page }) => {
    await page.goto("/effects");

    // Wait for category pills to hydrate
    const firstPill = page.locator("button[aria-pressed]").first();
    await expect(firstPill).toBeVisible({ timeout: 15_000 });

    // Click a non-active category pill
    const inactivePill = page.locator('button[aria-pressed="false"]').first();
    if (await inactivePill.isVisible()) {
      await inactivePill.click();
      await page.waitForTimeout(300);

      // Verify it became active
      await expect(inactivePill).toHaveAttribute("aria-pressed", "true");
    }
  });
});
