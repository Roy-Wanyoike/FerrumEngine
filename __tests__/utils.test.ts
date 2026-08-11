import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn() — className utility", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const isHidden = false;
    expect(cn("base", isActive && "active", isHidden && "hidden")).toBe("base active");
  });

  it("should deduplicate conflicting tailwind classes", () => {
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });

  it("should handle undefined and null", () => {
    expect(cn("base", undefined, null)).toBe("base");
  });

  it("should handle empty input", () => {
    expect(cn()).toBe("");
  });

  it("should handle arrays", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("should merge responsive variants correctly", () => {
    const result = cn("text-sm", "md:text-lg", "text-base");
    expect(result).toBe("md:text-lg text-base");
  });
});

// Test timeAgo — from cloud page (extracted logic)
describe("timeAgo() — relative time formatting", () => {
  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  }

  it('should return "just now" for current time', () => {
    expect(timeAgo(new Date().toISOString())).toBe("just now");
  });

  it("should return minutes ago", () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
    expect(timeAgo(fiveMinAgo)).toBe("5m ago");
  });

  it("should return hours ago", () => {
    const threeHrsAgo = new Date(Date.now() - 3 * 3600000).toISOString();
    expect(timeAgo(threeHrsAgo)).toBe("3h ago");
  });

  it("should return days ago", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
    expect(timeAgo(twoDaysAgo)).toBe("2d ago");
  });

  it("should return months ago", () => {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 86400000).toISOString();
    expect(timeAgo(sixtyDaysAgo)).toBe("2mo ago");
  });
});

// Test pathnameToView — URL routing logic
describe("pathnameToView() — URL to view mapping", () => {
  type ViewId =
    | "home" | "principles" | "architecture" | "platform-architecture"
    | "hall-of-fame" | "showcase" | "learning" | "story"
    | "enterprise" | "enterprise-components" | "vision"
    | "effects" | "docs" | "playground";

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

  it("should map / to home", () => {
    expect(pathnameToView("/")).toBe("home");
  });

  it("should map /home to home", () => {
    expect(pathnameToView("/home")).toBe("home");
  });

  it("should map /effects to effects", () => {
    expect(pathnameToView("/effects")).toBe("effects");
  });

  it("should map /playground to playground", () => {
    expect(pathnameToView("/playground")).toBe("playground");
  });

  it("should map /platform-architecture to platform-architecture", () => {
    expect(pathnameToView("/platform-architecture")).toBe("platform-architecture");
  });

  it("should map /enterprise-components to enterprise-components", () => {
    expect(pathnameToView("/enterprise-components")).toBe("enterprise-components");
  });

  it("should handle trailing slashes", () => {
    expect(pathnameToView("/effects/")).toBe("effects");
  });

  it("should fall back to home for unknown paths", () => {
    expect(pathnameToView("/unknown-page")).toBe("home");
    expect(pathnameToView("/api/something")).toBe("home");
  });

  it("should handle all 14 valid views", () => {
    for (const view of VALID_VIEWS) {
      const path = view === "home" ? "/" : `/${view}`;
      expect(pathnameToView(path)).toBe(view);
    }
  });
});
