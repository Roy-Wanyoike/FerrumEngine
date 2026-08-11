"use client";

import { useEffect, memo } from "react";

/**
 * DeferCSS — handles deferred CSS loading and anti-FOUC.
 *
 * 1. Anti-FOUC: Injects a tiny inline <style> with dark background fallback
 *    so the page never flashes white before Tailwind CSS hydrates via JS.
 *    This runs synchronously via useEffect (React 18 batching ensures it
 *    fires before the browser's next paint when using useLayoutEffect-like
 *    timing, but useEffect is used here for SSR compatibility).
 *
 * 2. ferrum-effects.css: Swaps the <link> from media="print" to media="all"
 *    after the page becomes interactive. The <link> is injected in layout.tsx
 *    with media="print" (so browsers download it but don't block rendering).
 *
 * Wrapped in React.memo — component has no props and returns null;
 * memo prevents unnecessary re-renders when the parent re-renders.
 */
export const DeferCSS = memo(function DeferCSS() {
  useEffect(() => {
    // Anti-FOUC: inject dark background immediately
    const style = document.createElement("style");
    style.id = "ferrum-anti-fouc";
    style.textContent = "html{background-color:#0a0a0a;color:#fafafa;color-scheme:dark}html.light{background-color:#fff;color:#0a0a0a;color-scheme:light}";
    document.head.appendChild(style);

    // Defer ferrum-effects.css: swap media from print to all
    const link = document.querySelector<HTMLLinkElement>(
      'link[href="/ferrum-effects.css"][media="print"]'
    );
    if (!link) return undefined;

    const activate = () => {
      link.media = "all";
    };

    link.addEventListener("load", activate, { once: true });

    // Fallback for browsers that don't fire "load" on cached stylesheets
    if (link.sheet) {
      activate();
    }

    return () => {
      link.removeEventListener("load", activate);
      const el = document.getElementById("ferrum-anti-fouc");
      if (el) el.remove();
    };
  }, []);

  return null;
});
