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
        <h1>FerrumEngine — Frontend Intelligence & Reliability Engine</h1>
        <p>
          FerrumEngine is a Frontend Intelligence & Reliability Engine that provides
          Application Graph analysis, 7 Analyzers (architecture, performance, security,
          reliability, testing, accessibility, dependencies), Reliability Scoring with
          A-F grades across 7 dimensions, Change Impact Analysis with risk classification,
          and an AI Agent Gateway with structured API and scope permissions.
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
      <section aria-label="Intelligence Engine">
        <h2>Intelligence Engine</h2>
        <p>
          FerrumEngine provides {totalCategories} analysis categories across {totalEffects} capabilities:
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
            <strong>Application Graph</strong>: 22 node types, 18 edge types mapping
            components, routes, and dependencies into a queryable graph.
          </li>
          <li>
            <strong>7 Analyzers</strong>: Architecture, performance, security,
            reliability, testing, accessibility, and dependency analysis in one pass.
          </li>
          <li>
            <strong>Reliability Scoring</strong>: A-F grades across 7 dimensions
            with per-dimension breakdown and trend tracking.
          </li>
          <li>
            <strong>Change Impact Analysis</strong>: Risk classification for every
            change — breaking, degraded, or safe.
          </li>
          <li>
            <strong>AI Agent Gateway</strong>: Structured API with scope permissions
            for safe AI codebase access and modification.
          </li>
          <li>
            <strong>Flight Recorder</strong>: Runtime observability for frontends.
            Capture, replay, and debug production issues.
          </li>
        </ul>
      </section>

      <section aria-label="Getting Started">
        <h2>Getting Started</h2>
        <p>
          Install FerrumEngine via npm, pnpm, or yarn. Run the analyze command to
          build the Application Graph, execute all 7 analyzers, and get your
          reliability score. Use the AI Agent Gateway for structured codebase access.
          Zero config required for basic usage.
        </p>
      </section>

      <section aria-label="Why FerrumEngine">
        <h2>Why FerrumEngine?</h2>
        <p>
          Most frontend tooling analyzes one dimension at a time. ESLint catches code
          issues. Lighthouse measures performance. npm audit finds vulnerabilities.
          FerrumEngine unifies all analysis through an Application Graph, giving you
          correlated findings, reliability scores, and change impact analysis in a
          single pass.
        </p>
      </section>

      <section aria-label="Performance">
        <h2>Performance</h2>
        <p>
          The Application Graph is built once and queried many times. Analyzers
          run in parallel where possible. Reliability scoring uses configurable
          weights and caching for fast incremental updates. The Flight Recorder
          has minimal runtime overhead and respects user preferences.
        </p>
      </section>
      </article>
    </div>
  );
}
