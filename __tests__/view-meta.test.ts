import { describe, it, expect } from "vitest";
import { VIEW_META, VALID_VIEWS, pathnameToView } from "@/lib/view-meta";
import type { ViewId } from "@/lib/types";

/* ════════════════════════════════════════════════════════════════
   Tests for view-meta.ts — SPA view metadata and routing
   ════════════════════════════════════════════════════════════════ */

const VALID_VIEW_IDS: ViewId[] = [
  "home", "principles", "architecture", "platform-architecture",
  "hall-of-fame", "showcase", "learning", "community", "story",
  "enterprise", "enterprise-components", "vision",
  "effects", "docs", "playground", "blog", "changelog",
  "interactive-docs",
];

describe("view-meta — VALID_VIEWS matches ViewId type", () => {
  it("every entry in VALID_VIEWS should be a valid ViewId", () => {
    for (const view of VALID_VIEWS) {
      expect(VALID_VIEW_IDS).toContain(view);
    }
  });

  it("VALID_VIEWS should not have duplicates", () => {
    const unique = new Set(VALID_VIEWS);
    expect(unique.size).toBe(VALID_VIEWS.length);
  });

  it("VALID_VIEWS should contain all ViewId values", () => {
    // Every possible ViewId should be in VALID_VIEWS
    for (const vid of VALID_VIEW_IDS) {
      expect(VALID_VIEWS).toContain(vid);
    }
  });
});

describe("view-meta — VIEW_META completeness", () => {
  const viewMetaKeys = Object.keys(VIEW_META);

  it("every view in VALID_VIEWS should have an entry in VIEW_META", () => {
    for (const view of VALID_VIEWS) {
      expect(VIEW_META[view]).toBeDefined();
    }
  });

  it("every key in VIEW_META should be in VALID_VIEWS (no orphans)", () => {
    for (const key of viewMetaKeys) {
      expect(VALID_VIEWS).toContain(key);
    }
  });

  it("VIEW_META should have the same number of entries as VALID_VIEWS", () => {
    expect(viewMetaKeys.length).toBe(VALID_VIEWS.length);
  });
});

describe("view-meta — Required metadata fields", () => {
  it("each view should have a non-empty title", () => {
    for (const [key, meta] of Object.entries(VIEW_META)) {
      expect(meta.title).toBeTruthy();
      expect(typeof meta.title).toBe("string");
      expect(meta.title.length).toBeGreaterThan(3);
    }
  });

  it("each view should have a non-empty description", () => {
    for (const [key, meta] of Object.entries(VIEW_META)) {
      expect(meta.description).toBeTruthy();
      expect(typeof meta.description).toBe("string");
      expect(meta.description.length).toBeGreaterThan(10);
    }
  });

  it("all titles should contain 'FerrumEngine' or 'Ferrum'", () => {
    for (const [key, meta] of Object.entries(VIEW_META)) {
      expect(meta.title).toMatch(/Ferrum/i);
    }
  });

  it("home view should be first in VALID_VIEWS", () => {
    expect(VALID_VIEWS[0]).toBe("home");
  });
});

describe("view-meta — pathnameToView edge cases", () => {
  it("should return null (not fallback) for unknown paths", () => {
    expect(pathnameToView("/nonexistent")).toBeNull();
    expect(pathnameToView("/api/health")).toBeNull();
  });

  it("should handle multiple trailing slashes", () => {
    expect(pathnameToView("/effects///")).toBe("effects");
  });

  it("should handle case-sensitive paths (no lowercase normalization)", () => {
    // The implementation does NOT lowercase — uppercase is treated as unknown
    expect(pathnameToView("/Effects")).toBeNull();
  });

  it("should handle paths with query-like segments", () => {
    expect(pathnameToView("/effects?foo=bar")).toBeNull();
  });

  it("should handle all VALID_VIEWS via their path", () => {
    for (const view of VALID_VIEWS) {
      const path = view === "home" ? "/" : `/${view}`;
      expect(pathnameToView(path)).toBe(view);
    }
  });
});
