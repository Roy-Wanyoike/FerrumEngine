/**
 * Ferrum Performance Budget
 *
 * Enforced in CI to prevent regression. Any PR that exceeds these
 * thresholds MUST be rejected by the CI pipeline.
 *
 * These budgets are calibrated against:
 *   - Google's Core Web Vitals "Good" thresholds
 *   - Vercel's deployment size limits
 *   - Linear's sub-200KB initial load philosophy
 *
 * Last measured (2025-07-29):
 *   - Initial JS: ~158KB gzip (~474KB raw, target: <200KB gzip / <600KB raw)
 *   - Standalone: 38MB (down from 54MB)
 *   - Build: 7.7s compile, 7.6s typecheck
 *   - Tests: 78 passing, 17 skipped
 *   - JS chunks: 42 (down from 49)
 *   - Server components: 20/26 section files
 *   - Runtime deps: 10 (down from 14)
 */

const KB = 1024;

export const PERFORMANCE_BUDGET = {
  /* ── Bundle Size ───────────────────────────────────────────── */
  bundle: {
    /** Total JS transferred on first page load (compressed estimate) */
    maxInitialJS: 200 * KB,
    /** First-load JS raw (gzip is ~1/3 of raw; 200KB gzip ≈ 600KB raw) */
    maxInitialJSRaw: 600 * KB,
    /** Soft limit for first-load JS raw (warn, don't fail) */
    softLimitInitialJSRaw: 500 * KB,
    /** Soft limit for CSS (warn, don't fail) */
    softLimitInitialCSS: 60 * KB,
    /** Total CSS transferred on first page load */
    maxInitialCSS: 80 * KB,
    /** Any single chunk must not exceed this (raw) */
    maxChunkSize: 250 * KB,
    /** Soft limit for largest chunk */
    softLimitChunkSize: 200 * KB,
    /** Public CSS file (ferrum-effects.css) — loaded on demand */
    maxEffectsCSS: 650 * KB,
    /** Server bundle (standalone output) */
    maxServerBundle: 45 * KB * KB,
    /** Total JS across all chunks (uncompressed) */
    maxTotalJS: 2200 * KB,
  },

  /* ── Per-Route Budgets ─────────────────────────────────────── */
  routes: {
    /** / (homepage) — first-load budget */
    homepage: {
      maxJS: 600 * KB,
      maxCSS: 80 * KB,
    },
    /** /playground — lazy-loaded, can be larger */
    playground: {
      maxJS: 400 * KB,
      maxCSS: 20 * KB,
    },
    /** /cloud — authenticated route, moderate budget */
    cloud: {
      maxJS: 300 * KB,
      maxCSS: 40 * KB,
    },
    /** /effects — CSS-heavy view */
    effects: {
      maxJS: 200 * KB,
      maxCSS: 30 * KB,
    },
  },

  /* ── Core Web Vitals ───────────────────────────────────────── */
  vitals: {
    /** Largest Contentful Paint — target: < 1.2s on fast 4G */
    maxLCP: 2500,
    /** Interaction to Next Paint — target: < 200ms */
    maxINP: 200,
    /** Cumulative Layout Shift — target: < 0.05 */
    maxCLS: 0.1,
    /** Time to Interactive — target: < 2.0s */
    maxTTI: 3500,
    /** Total Blocking Time — target: < 200ms */
    maxTBT: 600,
  },

  /* ── Build Time ────────────────────────────────────────────── */
  build: {
    /** Cold production build must complete within */
    maxBuildTimeMs: 120_000,
    /** TypeScript type-check must complete within */
    maxTypeCheckMs: 30_000,
  },

  /* ── Dependencies ──────────────────────────────────────────── */
  deps: {
    /** Maximum number of runtime dependencies (hard limit) */
    maxRuntimeDeps: 13,
    /** Soft limit — warn approaching maximum */
    softLimitRuntimeDeps: 10,
    /** Maximum node_modules size (with lockfile) */
    maxNodeModulesMB: 200,
    /** Soft limit for node_modules size */
    softLimitNodeModulesMB: 400,
    /** Any single dependency must not exceed this */
    maxSingleDepMB: 10,
    /** Maximum number of unique Lucide icons */
    maxIconCount: 60,
  },

  /* ── Architecture ──────────────────────────────────────────── */
  architecture: {
    /** Maximum lines per component file */
    maxFileLines: 500,
    /** Maximum lines per data file */
    maxDataFileLines: 4000,
    /** Minimum percentage of server components */
    minServerComponentPct: 15,
    /** Maximum synchronous imports on critical path */
    maxCriticalSyncImports: 2,
  },
} as const;

export type BudgetCategory = keyof typeof PERFORMANCE_BUDGET;
