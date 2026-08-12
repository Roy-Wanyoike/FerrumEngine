import { describe, it, expect } from "vitest";
import { effects } from "@/lib/ferrum-effects-data";
import { categories } from "@/lib/ferrum-effects-index";

/* ════════════════════════════════════════════════════════════════
   Tests for effects-data.ts — 542 CSS effects data integrity
   ════════════════════════════════════════════════════════════════ */

describe("effects-data — Total count", () => {
  it("should contain exactly 542 effects", () => {
    expect(effects.length).toBe(542);
  });
});

describe("effects-data — No duplicate classNames (slugs)", () => {
  it("should not have duplicate classNames", () => {
    const classNames = effects.map((e) => e.className);
    const unique = new Set(classNames);
    expect(unique.size).toBe(classNames.length);
  });
});

describe("effects-data — Required fields", () => {
  it("every effect should have a name", () => {
    for (const effect of effects) {
      expect(effect.name).toBeTruthy();
      expect(typeof effect.name).toBe("string");
    }
  });

  it("every effect should have a className", () => {
    for (const effect of effects) {
      expect(effect.className).toBeTruthy();
      expect(typeof effect.className).toBe("string");
    }
  });

  it("every effect should have a category", () => {
    for (const effect of effects) {
      expect(effect.category).toBeTruthy();
      expect(typeof effect.category).toBe("string");
    }
  });

  it("every effect should have a displayType", () => {
    for (const effect of effects) {
      expect(effect.displayType).toBeTruthy();
      expect(typeof effect.displayType).toBe("string");
    }
  });

  it("every effect should have a css string", () => {
    for (const effect of effects) {
      expect(effect.css).toBeTruthy();
      expect(typeof effect.css).toBe("string");
      expect(effect.css.length).toBeGreaterThan(5);
    }
  });

  it("all classNames should start with 'roycss-'", () => {
    for (const effect of effects) {
      expect(effect.className).toMatch(/^roycss-/);
    }
  });

  it("no effect should have an empty name", () => {
    for (const effect of effects) {
      expect(effect.name.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("effects-data — CSS string basic validation", () => {
  it("every CSS string should contain at least one opening brace", () => {
    for (const effect of effects) {
      expect(effect.css).toContain("{");
    }
  });

  it("every CSS string should contain at least one closing brace", () => {
    for (const effect of effects) {
      expect(effect.css).toContain("}");
    }
  });

  it("braces should not have more closes than opens in any CSS string", () => {
    // Note: CSS strings in the data file are intentionally truncated
    // (keyframe blocks cut off to save space), so opens > closes is valid.
    // A real error is closes > opens.
    for (const effect of effects) {
      const opens = (effect.css.match(/\{/g) || []).length;
      const closes = (effect.css.match(/\}/g) || []).length;
      expect(opens).toBeGreaterThanOrEqual(closes);
    }
  });

  it("every CSS string should reference its own className", () => {
    // At minimum the CSS should contain the class selector
    for (const effect of effects) {
      expect(effect.css).toContain(effect.className);
    }
  });

  it("CSS strings should not contain TypeScript syntax leaks", () => {
    for (const effect of effects) {
      expect(effect.css).not.toContain("import ");
      expect(effect.css).not.toContain("export ");
      expect(effect.css).not.toContain("interface ");
      expect(effect.css).not.toContain("const ");
    }
  });
});

describe("effects-data — Category distribution", () => {
  const expectedCategories: Record<string, number> = {
    "design-presets": 37,
    "entrance": 36,
    "text": 30,
    "misc": 30,
    "visual-effects": 28,
    "loading": 25,
    "buttons": 25,
    "background": 25,
    "cards": 24,
    "specialized": 21,
    "scroll": 21,
    "attention": 19,
    "hover": 17,
    "exit": 17,
    "nature": 15,
    "filter": 15,
    "borders": 15,
    "glass": 14,
    "particles": 12,
    "page-transition": 12,
    "micro-interaction": 12,
    "cursor": 12,
    "navigation": 10,
    "forms": 10,
    "3d": 10,
    "transform": 9,
    "unique": 7,
    "property": 7,
    "modern-css": 7,
    "image-hover": 7,
    "svg": 3,
    "offset-path": 3,
    "mask": 3,
    "clip-path": 2,
    "blend-modes": 2,
  };

  it("should have exactly 35 unique categories", () => {
    const cats = new Set(effects.map((e) => e.category));
    expect(cats.size).toBe(35);
  });

  it("category counts should match expected distribution", () => {
    const counts: Record<string, number> = {};
    for (const effect of effects) {
      counts[effect.category] = (counts[effect.category] || 0) + 1;
    }
    for (const [cat, expected] of Object.entries(expectedCategories)) {
      expect(counts[cat]).toBe(expected);
    }
  });

  it("sum of all category counts should equal 542", () => {
    const counts: Record<string, number> = {};
    for (const effect of effects) {
      counts[effect.category] = (counts[effect.category] || 0) + 1;
    }
    const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
    expect(total).toBe(542);
  });

  it("every effect's category should exist in the categories index", () => {
    const categoryIds = new Set(categories.map((c) => c.id));
    for (const effect of effects) {
      expect(categoryIds.has(effect.category)).toBe(true);
    }
  });

  it("categories index should have exactly 35 entries", () => {
    expect(categories.length).toBe(35);
  });
});
