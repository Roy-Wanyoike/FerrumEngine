import { describe, it, expect } from "vitest";
import { VALID_VIEWS, pathnameToView } from "@/lib/view-meta";
import type { ViewId } from "@/lib/types";

/* ════════════════════════════════════════════════════════════════
   Tests — pathnameToView imported from @/lib/view-meta (source of truth)
   ════════════════════════════════════════════════════════════════ */

describe("pathnameToView", () => {
  it("maps root '/' to 'home'", () => {
    expect(pathnameToView("/")).toBe("home");
  });

  it("maps '/home' to 'home'", () => {
    expect(pathnameToView("/home")).toBe("home");
  });

  it(`maps all ${VALID_VIEWS.length - 1} non-home routes correctly`, () => {
    const nonHomeViews: ViewId[] = VALID_VIEWS.filter((v) => v !== "home");

    for (const view of nonHomeViews) {
      expect(pathnameToView(`/${view}`)).toBe(view);
    }
  });

  it("handles trailing slashes", () => {
    expect(pathnameToView("/effects/")).toBe("effects");
    expect(pathnameToView("/effects//")).toBe("effects");
  });

  it("falls back to null for unknown routes", () => {
    expect(pathnameToView("/unknown-page")).toBe(null);
    expect(pathnameToView("/api/something")).toBe(null);
    expect(pathnameToView("/ferrum")).toBe(null);
  });

  it("handles empty string", () => {
    expect(pathnameToView("")).toBe("home");
  });
});
