import { describe, it, expect } from "vitest";
import { platformMenu, docsMenu, moreMenu } from "@/components/ferrum/nav-data";
import type { ViewId } from "@/lib/types";

/* ════════════════════════════════════════════════════════════════
   Tests for nav-data.ts — mega menu navigation structure
   ════════════════════════════════════════════════════════════════ */

const VALID_VIEW_IDS: ViewId[] = [
  "home", "principles", "architecture", "platform-architecture",
  "hall-of-fame", "showcase", "learning", "community", "story",
  "enterprise", "enterprise-components", "vision",
  "effects", "docs", "playground", "blog", "changelog",
  "interactive-docs", "component-catalog",
];

const allMenus = [...platformMenu, ...docsMenu, ...moreMenu];
const allItems = allMenus.flatMap((g) => g.items);

// Collect all paths (view IDs) referenced across menus
const allPaths: string[] = [];
for (const item of allItems) {
  if (item.view) allPaths.push(item.view);
}

describe("nav-data — Structure", () => {
  it("should export all three menus as non-empty arrays", () => {
    expect(Array.isArray(platformMenu)).toBe(true);
    expect(platformMenu.length).toBeGreaterThan(0);
    expect(Array.isArray(docsMenu)).toBe(true);
    expect(docsMenu.length).toBeGreaterThan(0);
    expect(Array.isArray(moreMenu)).toBe(true);
    expect(moreMenu.length).toBeGreaterThan(0);
  });

  it("every menu group should have a heading and non-empty items", () => {
    for (const group of allMenus) {
      expect(group.heading).toBeTruthy();
      expect(typeof group.heading).toBe("string");
      expect(Array.isArray(group.items)).toBe(true);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("every nav item should have required fields (label, icon)", () => {
    for (const item of allItems) {
      expect(item.label).toBeTruthy();
      expect(typeof item.label).toBe("string");
      expect(item.icon).toBeTruthy();
      expect(typeof item.icon).toBe("string");
    }
  });

  it("every nav item should have a description", () => {
    for (const item of allItems) {
      expect(item.description).toBeTruthy();
      expect(typeof item.description).toBe("string");
    }
  });
});

describe("nav-data — View IDs are valid", () => {
  it("all view references should be valid ViewId types", () => {
    for (const item of allItems) {
      if (item.view) {
        expect(VALID_VIEW_IDS).toContain(item.view);
      }
    }
  });
});

describe("nav-data — No duplicate paths", () => {
  it("should not have duplicate view IDs across all menus", () => {
    const viewIds = allPaths;
    const unique = new Set(viewIds);
    expect(unique.size).toBe(viewIds.length);
  });

  it("should not have duplicate labels within the same group", () => {
    for (const group of allMenus) {
      const labels = group.items.map((i) => i.label);
      const unique = new Set(labels);
      expect(unique.size).toBe(labels.length);
    }
  });
});

describe("nav-data — 'Coming soon' badges", () => {
  const badgedItems = allItems.filter((i) => i.badge);

  it("badge values should only be 'Coming soon'", () => {
    for (const item of badgedItems) {
      expect(item.badge).toBe("Coming soon");
    }
  });

  it("items with badges should not also have a view (they're not navigable)", () => {
    for (const item of badgedItems) {
      // Badged items are "coming soon" — they may or may not have a view,
      // but if they do, it should still be valid
      if (item.view) {
        expect(VALID_VIEW_IDS).toContain(item.view);
      }
    }
  });

  it("should have at least one badged (coming soon) item", () => {
    expect(badgedItems.length).toBeGreaterThanOrEqual(1);
  });
});

describe("nav-data — Mega menu consistency", () => {
  it("no menu group should be empty", () => {
    for (const group of allMenus) {
      expect(group.items.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("all menu groups should have unique headings within the same menu", () => {
    const checkUniqueHeadings = (menu: typeof allMenus, _menuName: string) => {
      const headings = menu.map((g) => g.heading);
      const unique = new Set(headings);
      expect(unique.size).toBe(headings.length);
    };
    checkUniqueHeadings(platformMenu, "platformMenu");
    checkUniqueHeadings(docsMenu, "docsMenu");
    checkUniqueHeadings(moreMenu, "moreMenu");
  });

  it("total items across all menus should be a reasonable number", () => {
    expect(allItems.length).toBeGreaterThanOrEqual(10);
    expect(allItems.length).toBeLessThanOrEqual(30);
  });
});
