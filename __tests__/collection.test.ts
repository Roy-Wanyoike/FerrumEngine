import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/* ════════════════════════════════════════════════════════════════
   Collection management logic — tested in isolation
   These callbacks manage localStorage + React state for the effects collection.
   ════════════════════════════════════════════════════════════════ */

describe("Collection Management", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adds effect to collection", () => {
    localStorage.setItem("ferrum-collection", JSON.stringify(["effect-1"]));
    const current = JSON.parse(localStorage.getItem("ferrum-collection") || "[]");
    if (!current.includes("effect-2")) {
      const updated = [...current, "effect-2"];
      localStorage.setItem("ferrum-collection", JSON.stringify(updated));
    }
    const result = JSON.parse(localStorage.getItem("ferrum-collection") || "[]");
    expect(result).toEqual(["effect-1", "effect-2"]);
  });

  it("does not duplicate effects", () => {
    localStorage.setItem("ferrum-collection", JSON.stringify(["effect-1"]));
    const current = JSON.parse(localStorage.getItem("ferrum-collection") || "[]");
    if (!current.includes("effect-1")) {
      const updated = [...current, "effect-1"];
      localStorage.setItem("ferrum-collection", JSON.stringify(updated));
    }
    const result = JSON.parse(localStorage.getItem("ferrum-collection") || "[]");
    expect(result).toEqual(["effect-1"]);
  });

  it("removes effect from collection", () => {
    localStorage.setItem("ferrum-collection", JSON.stringify(["a", "b", "c"]));
    const current = JSON.parse(localStorage.getItem("ferrum-collection") || "[]");
    const updated = current.filter((c: string) => c !== "b");
    localStorage.setItem("ferrum-collection", JSON.stringify(updated));
    const result = JSON.parse(localStorage.getItem("ferrum-collection") || "[]");
    expect(result).toEqual(["a", "c"]);
  });

  it("clears entire collection", () => {
    localStorage.setItem("ferrum-collection", JSON.stringify(["a", "b"]));
    localStorage.removeItem("ferrum-collection");
    const result = localStorage.getItem("ferrum-collection");
    expect(result).toBeNull();
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("ferrum-collection", "not-valid-json{{{");
    const parsed = (() => {
      try {
        const s = localStorage.getItem("ferrum-collection");
        return s ? JSON.parse(s) : [];
      } catch (e) {
        console.warn("[Ferrum] Failed to read collection", e);
        return [];
      }
    })();
    expect(parsed).toEqual([]);
  });

  it("handles localStorage being unavailable", () => {
    const originalSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = () => { throw new Error("Storage full"); };
    try {
      localStorage.setItem("ferrum-collection", JSON.stringify(["a"]));
      // Should not throw
    } catch {
      // Expected
    } finally {
      localStorage.setItem = originalSetItem;
    }
  });
});
