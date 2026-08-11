import { effects, categories } from "@/lib/ferrum-effects-index";

/**
 * SeoContent — Server-rendered content visible to crawlers.
 *
 * This component renders BEFORE the client-side SPA hydrates. Crawlers
 * (Googlebot, Bingbot, social media scrapers) see real content with the
 * actual effect library, categories, and platform description.
 *
 * Visual design: The container is `sr-only` to keep the UI clean for
 * interactive users, but the HTML is fully present in the initial server
 * response — exactly what search engines need.
 *
 * Performance: This component is server-rendered and ships zero JS.
 * It adds ~2KB to the initial HTML payload.
 */
export function SeoContent() {
  const totalEffects = effects.length;
  const totalCategories = categories.length;
  const topCategories = categories.slice(0, 8);
  const featuredEffects = effects.slice(0, 12);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      <nav aria-label="Site sections">
        <h1>FerrumEngine — The Universal UI Platform</h1>
        <p>
          FerrumEngine is the universal UI platform that unifies motion, VFX,
          components, design tokens, and compiler optimization into one coherent
          system. With {totalEffects} production-ready CSS effects across{" "}
          {totalCategories} categories, 9 framework adapters (React, Vue, Svelte,
          Angular, Solid, Lit, Astro, Next.js), and zero runtime dependencies,
          FerrumEngine is the production-grade choice for modern web UI.
        </p>
        <ul>
          <li><a href="/effects">Browse all {totalEffects} effects</a></li>
          <li><a href="/playground">Try the interactive playground</a></li>
          <li><a href="/docs">Read the documentation</a></li>
          <li><a href="/principles">Understand the design principles</a></li>
          <li><a href="/architecture">Explore the platform architecture</a></li>
          <li><a href="/learning">Learning center and tutorials</a></li>
          <li><a href="/enterprise">Enterprise features</a></li>
          <li><a href="/showcase">Showcase gallery</a></li>
          <li><a href="/vision">Vision and manifesto</a></li>
          <li><a href="/story">Why Ferrum exists</a></li>
        </ul>
      </nav>

      <article>
      <section aria-label="Effects Library">
        <h2>Effects Library</h2>
        <p>
          Browse {totalEffects} production-ready CSS motion effects across{" "}
          {totalCategories} categories including:
        </p>
        <ul>
          {topCategories.map((cat) => (
            <li key={cat.id}>
              <strong>{cat.name}</strong> —{" "}
              {effects.filter((e) => e.category === cat.id).length} effects
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Featured Effects">
        <h2>Featured Effects</h2>
        <ul>
          {featuredEffects.map((effect) => (
            <li key={effect.className}>
              <strong>{effect.name}</strong> ({effect.className}) —{" "}
              {effect.category} category, {effect.displayType} display type
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Platform Capabilities">
        <h2>Platform Capabilities</h2>
        <ul>
          <li>
            <strong>Motion Library</strong>: Entrance, hover, attention, loading,
            exit, and text animations with zero JavaScript runtime.
          </li>
          <li>
            <strong>Visual Effects (VFX)</strong>: Glass morphism, neon borders,
            gradient meshes, ripple effects, skeletons, and Houdini Paint API
            worklets.
          </li>
          <li>
            <strong>Design Tokens</strong>: A single source of truth for colors,
            spacing, typography, motion, elevation, radius, breakpoints, z-index,
            and opacity — with transforms for CSS, SCSS, Tailwind, TypeScript, and
            JSON.
          </li>
          <li>
            <strong>UI Compiler</strong>: A 9-pass optimization pipeline that
            analyzes intent, resolves tokens, eliminates dead code, and produces
            minimal output bundles.
          </li>
          <li>
            <strong>Framework Adapters</strong>: First-class support for React,
            Vue, Svelte, Angular, Solid, Lit, Astro, and Next.js — same API,
            same effects, same performance.
          </li>
          <li>
            <strong>Cloud Platform</strong>: Team collaboration, design token
            management, version control, and audit logs with secure
            authentication.
          </li>
        </ul>
      </section>

      <section aria-label="Getting Started">
        <h2>Getting Started</h2>
        <p>
          Install FerrumEngine via npm, pnpm, or yarn. Import the CSS bundle, add
          the className to any element, and ship. No build step required for
          basic usage. For advanced use cases, use the CLI or framework adapter
          for tree-shaking and token customization.
        </p>
      </section>

      <section aria-label="Why FerrumEngine">
        <h2>Why FerrumEngine?</h2>
        <p>
          Most animation libraries force you to choose: rich effects OR small
          bundle size OR framework lock-in. FerrumEngine breaks this trade-off.
          The core runtime is under 2KB gzipped. Effects are pure CSS — they
          work in any framework, any browser, any build setup. The compiler
          ensures you ship only the effects you actually use.
        </p>
      </section>

      <section aria-label="Performance">
        <h2>Performance</h2>
        <p>
          Zero runtime dependencies. The entire motion library is pure CSS — no
          JavaScript animation engine, no requestAnimationFrame loops, no layout
          thrashing. Effects are GPU-accelerated where possible and respect{" "}
          <code>prefers-reduced-motion</code> by default.
        </p>
      </section>
      </article>
    </div>
  );
}
