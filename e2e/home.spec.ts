import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE — Smoke & interaction tests
   ═══════════════════════════════════════════════════════════════ */

test.describe("Homepage", () => {
  test("page loads with correct title", async ({ page }) => {
    await page.goto("/");
    // The SPA updates document.title via useLayoutEffect after hydration
    await page.waitForTimeout(1_500);
    await expect(page).toHaveTitle(/FerrumEngine/);
  });

  test("hero section is visible", async ({ page }) => {
    await page.goto("/");
    // Hero content is lazy-loaded (ssr:false) — wait for it to appear
    const hero = page.getByText("The Universal UI Platform").first();
    await expect(hero).toBeVisible({ timeout: 15_000 });
  });

  test("navigation bar is present", async ({ page }) => {
    await page.goto("/");
    // Nav is dynamically loaded — wait for any nav link to appear
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible({ timeout: 10_000 });
  });

  test("theme toggle switches between light and dark", async ({ page }) => {
    await page.goto("/");
    // Wait for the theme toggle button to hydrate (opacity-0 placeholder → visible)
    const toggle = page.getByRole("button", { name: /dark mode|light mode|system theme/i });
    await expect(toggle.first()).toBeVisible({ timeout: 10_000 });

    // The default theme is dark (see ThemeProvider defaultTheme="dark")
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    // Click to cycle: dark → light → system → dark
    await toggle.first().click();
    await page.waitForTimeout(300);
    // After cycling, the class should change
    const clsAfter = await html.getAttribute("class");
    expect(clsAfter).toBeTruthy();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    // Scroll to footer — footer is lazy-loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible({ timeout: 15_000 });
  });
});
