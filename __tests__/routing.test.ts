import { describe, it, expect } from "vitest";

/* ════════════════════════════════════════════════════════════════
   pathnameToView — URL segment → ViewId mapping
   This function is embedded in page.tsx so we test the logic here.
   ════════════════════════════════════════════════════════════════ */

type ViewId =
  | "home"
  | "principles"
  | "architecture"
  | "platform-architecture"
  | "hall-of-fame"
  | "showcase"
  | "learning"
  | "story"
  | "enterprise"
  | "enterprise-components"
  | "vision"
  | "effects"
  | "docs"
  | "playground";

const VALID_VIEWS: ViewId[] = [
  "home", "principles", "architecture", "platform-architecture",
  "hall-of-fame", "showcase", "learning", "story",
  "enterprise", "enterprise-components", "vision",
  "effects", "docs", "playground",
];

function pathnameToView(pathname: string): ViewId {
  const segment = pathname.replace(/^\//, "").replace(/\/+$/, "");
  if (segment === "" || segment === "home") return "home";
  if (VALID_VIEWS.includes(segment as ViewId)) return segment as ViewId;
  return "home";
}

/* ════════════════════════════════════════════════════════════════
   Tests
   ════════════════════════════════════════════════════════════════ */

describe("pathnameToView", () => {
  it("maps root '/' to 'home'", () => {
    expect(pathnameToView("/")).toBe("home");
  });

  it("maps '/home' to 'home'", () => {
    expect(pathnameToView("/home")).toBe("home");
  });

  it("maps all 13 non-home routes correctly", () => {
    const nonHomeViews: ViewId[] = [
      "principles", "architecture", "platform-architecture",
      "hall-of-fame", "showcase", "learning", "story",
      "enterprise", "enterprise-components", "vision",
      "effects", "docs", "playground",
    ];

    for (const view of nonHomeViews) {
      expect(pathnameToView(`/${view}`)).toBe(view);
    }
  });

  it("handles trailing slashes", () => {
    expect(pathnameToView("/effects/")).toBe("effects");
    expect(pathnameToView("/effects//")).toBe("effects");
  });

  it("falls back to 'home' for unknown routes", () => {
    expect(pathnameToView("/unknown-page")).toBe("home");
    expect(pathnameToView("/api/something")).toBe("home");
    expect(pathnameToView("/ferrum")).toBe("home");
  });

  it("handles empty string", () => {
    expect(pathnameToView("")).toBe("home");
  });
});
