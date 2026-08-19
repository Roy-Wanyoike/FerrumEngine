import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════════════════════
   AUTH — Cloud login, demo mode, protected routes
   ═══════════════════════════════════════════════════════════════ */

test.describe("Cloud Authentication", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("/cloud shows login form when not authenticated", async ({ page }) => {
    await page.goto("/cloud");
    // The cloud dashboard lazy-loads and checks auth
    // In production mode, middleware may redirect, but the client component
    // always shows a login form when no token is present
    const loginInput = page.getByPlaceholder(/password/i);
    await expect(loginInput).toBeVisible({ timeout: 15_000 });
  });

  test("login form is visible with submit button", async ({ page }) => {
    await page.goto("/cloud");
    const loginInput = page.getByPlaceholder(/password/i);
    await expect(loginInput).toBeVisible({ timeout: 15_000 });

    // There should be a login/submit button
    const submitBtn = page.getByRole("button", { name: /sign in|login|log in/i });
    await expect(submitBtn.first()).toBeVisible({ timeout: 5_000 });
  });

  test("demo mode accepts any password", async ({ page }) => {
    await page.goto("/cloud");
    const loginInput = page.getByPlaceholder(/password/i);
    await expect(loginInput).toBeVisible({ timeout: 15_000 });

    // Type any password
    await loginInput.fill("test-password-123");

    // Click submit
    const submitBtn = page.getByRole("button", { name: /sign in|login|log in/i }).first();
    await submitBtn.click();

    // Wait for auth to complete — dashboard should appear
    // In demo mode (no CLOUD_ADMIN_PASSWORD env var), any password is accepted
    const dashboard = page.getByText(/overview|teams|projects|tokens/i).first();
    await expect(dashboard).toBeVisible({ timeout: 10_000 });
  });

  test("after login, dashboard tabs are visible", async ({ page }) => {
    await page.goto("/cloud");
    const loginInput = page.getByPlaceholder(/password/i);
    await expect(loginInput).toBeVisible({ timeout: 15_000 });

    await loginInput.fill("any-password");
    const submitBtn = page.getByRole("button", { name: /sign in|login|log in/i }).first();
    await submitBtn.click();

    // Verify dashboard tabs
    const overviewTab = page.getByRole("tab", { name: /overview/i });
    await expect(overviewTab).toBeVisible({ timeout: 10_000 });
  });
});
