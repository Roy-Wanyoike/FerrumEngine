import { describe, it, expect } from "vitest";
import { docSections } from "@/lib/docs-data";

/* ════════════════════════════════════════════════════════════════
   Tests for docs-data.ts — documentation content structure
   ════════════════════════════════════════════════════════════════ */

const VALID_BLOCK_TYPES = ["paragraph", "heading", "code", "callout", "list", "table", "api"];
const VALID_CALLOUT_VARIANTS = ["info", "warning", "tip"];

function getAllSectionIds(): string[] {
  return docSections.map((s) => s.id);
}

describe("docs-data — Top-level structure", () => {
  it("should export a non-empty array of docSections", () => {
    expect(Array.isArray(docSections)).toBe(true);
    expect(docSections.length).toBeGreaterThanOrEqual(5);
  });

  it("should have a reasonable number of sections (8-15)", () => {
    expect(docSections.length).toBeGreaterThanOrEqual(8);
    expect(docSections.length).toBeLessThanOrEqual(15);
  });
});

describe("docs-data — Section IDs are unique", () => {
  it("should not have duplicate section IDs", () => {
    const ids = getAllSectionIds();
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("section IDs should be kebab-case strings", () => {
    for (const section of docSections) {
      expect(section.id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("docs-data — Required section fields", () => {
  it("every section should have id, title, icon, and content", () => {
    for (const section of docSections) {
      expect(section.id).toBeTruthy();
      expect(section.title).toBeTruthy();
      expect(section.icon).toBeTruthy();
      expect(Array.isArray(section.content)).toBe(true);
      expect(section.content.length).toBeGreaterThan(0);
    }
  });

  it("section titles should be non-trivial", () => {
    for (const section of docSections) {
      expect(section.title.length).toBeGreaterThan(2);
    }
  });
});

describe("docs-data — Block types are valid", () => {
  it("every block should have a recognized type", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        expect(VALID_BLOCK_TYPES).toContain(block.type);
      }
    }
  });

  it("paragraph blocks should have text", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "paragraph") {
          expect(block.text).toBeTruthy();
          expect(block.text.length).toBeGreaterThan(5);
        }
      }
    }
  });

  it("heading blocks should have text", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "heading") {
          expect(block.text).toBeTruthy();
          expect(block.text.length).toBeGreaterThan(1);
        }
      }
    }
  });

  it("code blocks should have lang and code", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "code") {
          expect(block.lang).toBeTruthy();
          expect(block.code).toBeTruthy();
          expect(block.code.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("callout blocks should have valid variant, title, and text", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "callout") {
          expect(VALID_CALLOUT_VARIANTS).toContain(block.variant);
          expect(block.title).toBeTruthy();
          expect(block.text).toBeTruthy();
        }
      }
    }
  });

  it("list blocks should have non-empty items array", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "list") {
          expect(Array.isArray(block.items)).toBe(true);
          expect(block.items.length).toBeGreaterThan(0);
          for (const item of block.items) {
            expect(typeof item).toBe("string");
            expect(item.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it("table blocks should have headers and rows", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "table") {
          expect(Array.isArray(block.headers)).toBe(true);
          expect(block.headers.length).toBeGreaterThan(0);
          expect(Array.isArray(block.rows)).toBe(true);
          expect(block.rows.length).toBeGreaterThan(0);
          // Each row should have the same number of columns as headers
          for (const row of block.rows) {
            expect(row.length).toBe(block.headers.length);
          }
        }
      }
    }
  });

  it("api blocks should have name, desc, and params array", () => {
    for (const section of docSections) {
      for (const block of section.content) {
        if (block.type === "api") {
          expect(block.name).toBeTruthy();
          expect(block.desc).toBeTruthy();
          expect(Array.isArray(block.params)).toBe(true);
        }
      }
    }
  });
});

describe("docs-data — Content completeness", () => {
  it("should include a 'getting-started' section", () => {
    const ids = getAllSectionIds();
    expect(ids).toContain("getting-started");
  });

  it("should include a 'core-concepts' section", () => {
    const ids = getAllSectionIds();
    expect(ids).toContain("core-concepts");
  });

  it("should include an 'api-reference' section", () => {
    const ids = getAllSectionIds();
    expect(ids).toContain("api-reference");
  });

  it("each section should have a meaningful amount of content (>= 3 blocks)", () => {
    for (const section of docSections) {
      expect(section.content.length).toBeGreaterThanOrEqual(3);
    }
  });
});
