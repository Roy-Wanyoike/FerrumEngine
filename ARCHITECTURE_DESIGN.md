# FerrumEngine Architecture Design Document

**Version**: 1.0  
**Date**: 2026-08-12  
**Scope**: Full platform architecture — current state, target state, and migration path  
**Audience**: Engineering team, technical leadership  

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Target Architecture](#2-target-architecture)
3. [Rendering Strategy](#3-rendering-strategy)
4. [Performance Architecture](#4-performance-architecture)
5. [Security Architecture](#5-security-architecture)
6. [Accessibility Architecture](#6-accessibility-architecture)
7. [Package Boundaries](#7-package-boundaries)
8. [Migration Path](#8-migration-path)

---

## 1. Current Architecture

### 1.1 Overview

FerrumEngine is a **monolithic Next.js 16 application** using the App Router. It serves as both a marketing/showcase platform and a functional tool (CSS effects gallery, playground, cloud dashboard).

```
┌─────────────────────────────────────────────────────┐
│                   next.config.ts                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  18 SPA rewrites → /  (next/dynamic, ssr:false)│   │
│  │  3 real pages: /cloud, /terms, /privacy       │   │
│  │  12 API routes (Edge middleware auth)          │   │
│  └──────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  src/app/                                            │
│  ├── layout.tsx          (root layout, SEO, CSP)     │
│  ├── page.tsx            (server shell)               │
│  ├── home-client.tsx     (SPA router, 26 lazy views)  │
│  ├── home-loader.tsx     (skeleton suspense boundary)  │
│  ├── globals.css         (Tailwind v4, 318 lines)     │
│  ├── critical.css        (385B anti-FOUC)             │
│  ├── error.tsx / not-found.tsx / global-error.tsx    │
│  ├── cloud/              (separate layout, auth)      │
│  └── api/                (12 route handlers)          │
├─────────────────────────────────────────────────────┤
│  src/components/                                    │
│  ├── ui/                 (11 shadcn-style primitives) │
│  ├── ferrum/             (46 feature components)      │
│  │   ├── nav*.tsx        (navigation system)          │
│  │   ├── effects-*.tsx   (gallery + modal + drawer)   │
│  │   ├── playground/     (7-file IDE playground)      │
│  │   ├── sections/       (12 marketing sections)      │
│  │   └── app-context.tsx (global client state)        │
│  ├── theme-*.tsx         (theming system)             │
│  └── error-page-content.tsx                            │
├─────────────────────────────────────────────────────┤
│  src/lib/                  (data + utilities)          │
│  ├── ferrum-effects-data.ts  (3,806 LOC, 542 effects) │
│  ├── ferrum-effects-index.ts (631 LOC, search helpers) │
│  ├── docs-data.ts           (984 LOC)                  │
│  ├── cloud-store.ts         (in-memory JSON store)     │
│  └── view-meta.ts, types.ts, utils.ts, ...           │
├─────────────────────────────────────────────────────┤
│  src/hooks/                (3 custom hooks)            │
│  src/middleware.ts           (auth + rate limiting)     │
│  public/                    (sw.js, CSS, SVG, etc.)    │
│  registry/                  (7 JSON audit files)       │
└─────────────────────────────────────────────────────┘
```

### 1.2 Key Architectural Decisions (Current)

| Decision | Rationale | Trade-off |
|----------|-----------|-----------|
| SPA-in-SSR (all views via rewrites) | Instant client navigation, no full-page reloads | All views are client-rendered; no SEO per-view (mitigated by sr-only SEO content) |
| Single `home-client.tsx` router | Centralized view switching, shared state via AppProvider | 399+ LOC file, single point of complexity |
| In-memory data store (cloud) | No database dependency, simple demo | No persistence across restarts, single-instance only |
| `next/dynamic` with `ssr: false` for all views | Aggressive code splitting, small initial JS | Every view is a client-only chunk; no server components for views |
| CSS-native primitives (no Radix Dialog/Sheet) | Smaller bundle, more control | More maintenance burden for a11y patterns |

### 1.3 Dependency Graph (Current)

```
Runtime (9 deps):
  next ^16.1.1          ← Framework (not tree-shakeable)
  react ^19.0.0         ← UI runtime (not tree-shakeable)
  react-dom ^19.0.0     ← DOM renderer (not tree-shakeable)
  lucide-react ^0.525.0 ← Icons (47 files, tree-shaken via optimizePackageImports)
  next-themes ^0.4.6    ← Theme switching (2 files)
  sonner ^2.0.6         ← Toast notifications (5 files)
  tailwind-merge ^3.3.1 ← Class merging (1 file)
  @radix-ui/react-slot  ← Accessible slot (2 files: button, badge)
  @radix-ui/react-label ← Accessible label (1 file: label)

Dev (8 deps):
  tailwindcss, @tailwindcss/postcss, tw-animate-css  ← Styling
  typescript, @types/react, @types/node              ← Type checking
  vitest, @testing-library/react, @testing-library/jest-dom ← Testing
  @next/bundle-analyzer                                 ← Bundle analysis
  eslint, eslint-config-next                           ← Linting
```

### 1.4 Data Architecture

| Data | Storage | Size | Persistence |
|------|---------|------|-------------|
| 542 CSS effects | Static TypeScript (`ferrum-effects-data.ts`) | 3,806 LOC / ~424 KB | Build-time constant |
| Blog posts (6) | Hardcoded in `blog-view.tsx` | 496 LOC | Build-time constant |
| Changelog entries (8) | Hardcoded in `changelog-view.tsx` | 510 LOC | Build-time constant |
| Interactive lessons (8) | Hardcoded in `interactive-docs-view.tsx` | 1,522 LOC | Build-time constant |
| Documentation content | Static TypeScript (`docs-data.ts`) | 984 LOC | Build-time constant |
| Architecture data | Static TypeScript (`architecture-data.ts`) | 742 LOC | Build-time constant |
| Cloud data (teams/projects/tokens) | In-memory JSON (`cloud-store.ts` + `db/cloud-store.json`) | Variable | File-based, write-on-change |
| Design tokens | CJS module (`ferrum-tokens/index.cjs`) | 822 LOC | Build-time constant |

---

## 2. Target Architecture

### 2.1 Vision

Move from a monolithic Next.js app to a **modular monorepo** with clear package boundaries, while keeping the deployment as a single application. The goal is **separation of concerns at the source level**, not microservices.

```
┌──────────────────────────────────────────────────────┐
│                   Deployment Target                    │
│  ┌────────────────────────────────────────────────┐  │
│  │  Single Next.js 16 app (turbopack)              │  │
│  │  Build from workspace packages                  │  │
│  │  Deploy as edge-optimized static + serverless   │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘

packages/
├── web/                     ← Next.js app (app router, pages, API)
├── ui/                      ← Component library (primitives + ferrum)
├── effects/                 ← Effect data, index, CSS generation
├── content/                 ← Blog, changelog, docs, lessons data
├── cloud/                   ← Cloud store, auth, API routes
├── tokens/                  ← Design token system
├── a11y/                    ← Shared a11y hooks & utilities
├── config/                  ← ESLint, TS, Tailwind, Vitest configs
└── infra/                   ← Docker, Caddy, CI/CD configs
```

### 2.2 Design Principles

1. **Zero runtime overhead from modularization** — Packages are linked at build time, not at runtime. The deployed bundle is identical whether monolithic or monorepo.
2. **Explicit dependency direction** — `web` depends on `ui`, `effects`, `content`, `cloud`, `a11y`. `ui` depends on `a11y` and `tokens`. `effects` depends on `tokens`. No circular dependencies.
3. **Each package has its own tests** — `vitest` runs per-package with workspace config.
4. **Data lives with its consumer** — Effect data in `effects/`, content in `content/`, cloud data in `cloud/`.
5. **Shared utilities are extracted, not duplicated** — `cn()`, `body-scroll-lock`, `use-focus-trap` go to `a11y/` or `ui/`.

---

## 3. Rendering Strategy

### 3.1 Current Strategy

The app uses a **hybrid server-first + SPA client navigation** model:

1. **Initial request** → Next.js serves a statically generated HTML shell (`/` page) with:
   - Full `<head>` with meta tags, JSON-LD, OG tags
   - Critical CSS (385B anti-FOUC) inlined
   - `seo-content.tsx` rendered server-side (sr-only, zero JS)
   - Skeleton loading UI (nav + hero + cards)
   - No view content — all views are `next/dynamic` with `ssr: false`

2. **Hydration** → Client JS loads (~495 KB raw / ~165 KB gzip), SPA router activates:
   - Hash-based view switching via `window.location.hash`
   - `useEffect` listens to `hashchange` events
   - Dynamically imported view components load on demand
   - URL rewrites via `next.config.ts` map `/effects`, `/docs`, etc. → `/`

3. **Client navigation** → No server round-trip:
   - View components loaded via `React.lazy()` (26 dynamic imports)
   - 3 modules prefetched after hydration (Effects, Playground, Docs)
   - View transitions show skeleton fallbacks via `Suspense`
   - `document.title` and `<meta>` tags updated via `useLayoutEffect`

### 3.2 Target Rendering Strategy

Maintain the SPA approach for content views but improve server rendering for SEO-critical pages:

| Page Type | Current | Target | Rationale |
|-----------|---------|--------|-----------|
| Home (`/`) | Server shell + SPA | Server shell + SPA | Already optimal — hero + SEO content server-rendered |
| Effects (`/effects`) | SPA-only | **Server-generated** listing + SPA detail | 542 effects are SEO gold; generate category pages at build time |
| Docs (`/docs`) | SPA-only | **MDX-backed** with RSC | Documentation should be server-rendered for SEO and performance |
| Blog (`/blog`) | SPA-only | **MDX-backed** with RSC + RSS | Blog posts are content; should be crawlable |
| Playground | SPA-only | SPA-only | Interactive tool — no SEO value in server rendering |
| Cloud | Hybrid | Hybrid (separate page) | Auth-gated, no SEO needed |
| Terms/Privacy | Server | Server | Already optimal |

### 3.3 Lazy Loading Strategy

```
Priority 0 (critical path — in initial HTML):
  layout.tsx, page.tsx, seo-content.tsx, critical.css, anti-FOUC

Priority 1 (prefetched after hydration):
  EffectsView, PlaygroundV2, DocsView

Priority 2 (loaded on navigation):
  All section components, BlogView, ChangelogView, InteractiveDocsView

Priority 3 (loaded on interaction):
  EffectDetailModal, CollectionDrawer, CloudModals

Priority 4 (on-demand, not in bundle):
  ferrum-effects.css (570 KB) — loaded via <link> when effects view opens
```

---

## 4. Performance Architecture

### 4.1 Current Performance Profile

| Metric | Value | Budget | Status |
|--------|-------|--------|--------|
| Build time | ~8.3s | — | ✅ Fast |
| First-Load JS (raw) | 495 KB | 600 KB | ✅ 83% of budget |
| First-Load JS (gzip est.) | ~165 KB | — | ✅ Good |
| Total client JS | 2,098 KB (63 chunks) | — | ⚠️ Heavy total |
| Largest chunk | 234 KB | 250 KB | ✅ 92% of budget |
| Initial CSS | 174 KB | 300 KB | ✅ 58% of budget |
| Effects CSS (on-demand) | 570 KB | 650 KB | ✅ 88% of budget |
| Runtime deps | 9 | 13 | ✅ Lean |

### 4.2 Code Splitting Architecture

```
Critical Path (loaded immediately):
  └── React + Next.js runtime chunk (~228 KB raw)
      Framework utilities chunk (~150 KB raw)
      App shell (ViewRouter, AppProvider, types, view-meta)
      Critical CSS (174 KB compiled Tailwind)

Prefetched (after hydration):
  ├── EffectsView (~92 KB + 424 KB data)
  ├── PlaygroundV2 (full IDE)
  └── DocsView

On-Demand (per view):
  ├── 12 home sections (loaded together when home view active)
  ├── 10 non-home views (loaded individually on navigation)
  └── 2 full-screen views (Architecture, Interactive Docs)

Interaction-Triggered:
  ├── EffectDetailModal (opened per-effect)
  ├── CollectionDrawer (opened on demand)
  └── Cloud modals (opened in dashboard)
```

### 4.3 Streaming & Suspense

The app currently uses `Suspense` boundaries for:
- **Nav loading** → Skeleton nav during hydration
- **View transitions** → Generic skeleton per view
- **Effects cards** → 12-card skeleton grid
- **Cloud dashboard** → `cloud-loader.tsx` defers dashboard JS

**Target**: Add React `Suspense` streaming for server components:
- Stream home sections individually (hero first, then sections below fold)
- Stream blog post content (title + meta first, body streams)
- Use `loading.tsx` files for each route segment

### 4.4 Critical CSS Strategy

```
Layer 0: anti-FOUC (385 B, inline in <head>)
  - Background color for dark/light theme
  - color-scheme declaration

Layer 1: Critical CSS (~2 KB target)
  - Layout (nav height, grid, spacing)
  - Typography (font sizes, line heights)
  - Above-fold hero styles

Layer 2: Full Tailwind bundle (174 KB, deferred)
  - All utility classes
  - Component-scoped styles (3.9 KB)

Layer 3: Effects CSS (570 KB, on-demand)
  - Only loaded when effects view is opened
  - Stale-while-revalidate via service worker
```

### 4.5 Optimization Roadmap

1. **Largest chunk** (229 KB → target <200 KB): Analyze React/Next.js runtime chunk; evaluate if framework features can be deferred
2. **Effects data splitting** (3,806 LOC): Split by category, load only active category's data (~50 KB per chunk vs 424 KB all-at-once)
3. **Interactive docs splitting** (1,522 LOC): Extract sub-components (code blocks, navigation panels, content sections)
4. **Icon consolidation** (47 import sites): Expand `icon-resolver.tsx` adoption to reduce lucide-react import surface
5. **Middleware migration**: Migrate from deprecated `middleware` to Next.js 16 `proxy` convention

---

## 5. Security Architecture

### 5.1 Current Security Posture

```
┌─────────────────────────────────────────────────┐
│                   Security Layers                │
├─────────────────────────────────────────────────┤
│ L1: Response Headers (next.config.ts)            │
│  ├── HSTS (2 years, preload-ready)               │
│  ├── X-Frame-Options: DENY                       │
│  ├── X-Content-Type-Options: nosniff             │
│  ├── Referrer-Policy: strict-origin-when-cross   │
│  ├── Permissions-Policy (partial)                │
│  ├── CSP (unsafe-inline — CRITICAL)              │
│  └── poweredByHeader: false                      │
├─────────────────────────────────────────────────┤
│ L2: Middleware (src/middleware.ts)                │
│  ├── Bearer token auth (/api/cloud/*)            │
│  ├── Timing-safe token comparison (XOR)          │
│  ├── Rate limiting (in-memory, per-IP)           │
│  │   ├── Auth: 10 req / 15 min                   │
│  │   └── API: 100 req / min                      │
│  └── 429 responses with Retry-After              │
├─────────────────────────────────────────────────┤
│ L3: API Route Handlers                            │
│  ├── Input validation (type, length, enum)       │
│  ├── try/catch error handling (mostly)           │
│  └── Structured error responses                  │
├─────────────────────────────────────────────────┤
│ L4: Client-Side                                  │
│  ├── No eval() / new Function()                  │
│  ├── Syntax highlighting escapes HTML entities   │
│  ├── dangerouslySetInnerHTML on static data only │
│  └── No third-party scripts/analytics            │
└─────────────────────────────────────────────────┘
```

### 5.2 CSP Target Architecture

**Current (broken)**:
```
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

**Target**:
```
script-src 'self' 'nonce-{NONCE}';
style-src 'self' 'nonce-{NONCE}' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: blob:;
connect-src 'self' blob:;
frame-src 'self' blob:;  (for playground preview iframe)
```

**Migration steps**:
1. Extract all inline `<script>` blocks to external `.js` files
2. Generate nonce per-request in `layout.tsx` via Next.js headers
3. Apply nonce to all `<Script>` components
4. Move service worker registration to external file
5. Use CSP hashes for Tailwind inline styles (or switch to nonce-based)

### 5.3 Auth Target Architecture

**Current**: Static shared token, single password, localStorage storage  
**Target** (for production cloud features):

```
┌──────────────────────────────────────────────┐
│              Auth Flow                        │
├──────────────────────────────────────────────┤
│ 1. User submits credentials (email + password)│
│ 2. Server validates against bcrypt/argon2id  │
│ 3. Server issues JWT (exp: 1h, sub: userId)  │
│ 4. JWT stored in httpOnly secure cookie      │
│ 5. Middleware validates JWT on each request   │
│ 6. Refresh token for session continuity      │
│ 7. Server-side revocation list (Redis/DB)     │
└──────────────────────────────────────────────┘
```

### 5.4 Headers Strategy

| Header | Current | Target | Priority |
|--------|---------|--------|----------|
| `Content-Security-Policy` | `unsafe-inline` | Nonce-based | 🔴 Critical |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Same | ✅ Done |
| `X-Frame-Options` | `DENY` | Same | ✅ Done |
| `X-Content-Type-Options` | `nosniff` | Same | ✅ Done |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Same | ✅ Done |
| `Permissions-Policy` | 3 permissions | 12 permissions | 🟡 Medium |
| `Cross-Origin-Opener-Policy` | Missing | `same-origin` | 🟢 Low |
| `Cross-Origin-Resource-Policy` | Missing | `same-origin` | 🟢 Low |
| `X-Permitted-Cross-Domain-Policies` | Missing | `none` | 🟢 Low |

---

## 6. Accessibility Architecture

### 6.1 WCAG 2.2 AA Compliance Framework

```
┌──────────────────────────────────────────────────┐
│           A11y Architecture Layers                │
├──────────────────────────────────────────────────┤
│ L1: Foundation (✅ PASS)                          │
│  ├── Semantic HTML (nav, main, footer, section)   │
│  ├── lang="en" on <html>                         │
│  ├── Heading hierarchy (h1 → h2 → h3, no skip)   │
│  ├── Image accessibility (no <img>, SVGs labeled) │
│  └── Screen reader support (aria-live, role=alert)│
├──────────────────────────────────────────────────┤
│ L2: Keyboard & Focus (⚠️ PARTIAL)                 │
│  ├── Skip-to-content link ✅                       │
│  ├── Focus traps (modal, drawer, mobile nav) ✅    │
│  ├── Focus management (store/restore) ✅           │
│  ├── Focus-visible rings ✅                         │
│  ├── Touch targets (44px minimum) ✅               │
│  ├── Mega menu keyboard nav ❌                      │
│  ├── Theme dropdown ARIA ❌                         │
│  └── Color customizer focus trap ❌                 │
├──────────────────────────────────────────────────┤
│ L3: Visual (⚠️ PARTIAL)                            │
│  ├── Design tokens (oklch) ✅                       │
│  ├── Color scheme (light/dark) ✅                   │
│  ├── Muted text contrast ❌ (40-50% opacity fails)  │
│  └── prefers-reduced-motion ⚠️ (SMIL animations)    │
├──────────────────────────────────────────────────┤
│ L4: ARIA (⚠️ PARTIAL)                              │
│  ├── 46 files with ARIA attributes ✅               │
│  ├── Mobile nav role mismatch ❌                    │
│  └── Theme toggle dropdown roles ❌                 │
└──────────────────────────────────────────────────┘
```

### 6.2 A11y Design Patterns

| Pattern | Implementation | Status | Fix |
|---------|---------------|--------|-----|
| Focus trap | `useFocusTrap` hook | ✅ Working | Apply to color customizer |
| Body scroll lock | `body-scroll-lock.ts` | ✅ Working | — |
| Skip-to-content | `nav.tsx:73-76` | ✅ Working | — |
| `aria-modal` dialog | `effects-detail-modal.tsx` | ✅ Working | — |
| Tab/Tabpanel pattern | `effects-detail-modal.tsx:112-131` | ✅ Working | — |
| `aria-live` regions | `effects-view.tsx:232,248` | ✅ Working | Add view announcement |
| `role="progressbar"` | `scroll-progress.tsx:43-47` | ✅ Working | — |
| `role="switch"` | `controls-panel.tsx:368-369` | ✅ Working | — |
| Contrast-safe tokens | — | ❌ Missing | Create `--text-muted-safe` at 65-70% |
| ARIA menu pattern | `nav-mobile.tsx` | ❌ Broken | Remove `role="menu"` or add `menuitem` |

### 6.3 Target A11y Architecture

1. **Contrast token system**: Replace all `text-muted-foreground/40` and `/50` usage with a new `--text-muted-safe` token at 70% opacity. Add lint rule to prevent low-opacity text.
2. **Focus management wrapper**: Create a `<FocusManagedView>` component that automatically wraps content in `<main>`, manages focus on mount, and announces view changes via `aria-live`.
3. **A11y test infrastructure**: Add `@axe-core/react` to the test suite. Run automated a11y checks on every PR for critical views (nav, effects, playground, cloud).
4. **Reduced motion**: Add CSS rule `@media (prefers-reduced-motion: reduce) svg animate, svg animateTransform { display: none; }` to kill SMIL animations.

---

## 7. Package Boundaries

### 7.1 Proposed Monorepo Structure

```
ferrumengine/
├── package.json                  (workspace root)
├── pnpm-workspace.yaml           (or npm workspaces)
├── turbo.json                    (build orchestration)
│
├── packages/
│   ├── @ferrum/tokens/           # Design token system
│   │   ├── src/index.ts          (token definitions, oklch values)
│   │   ├── src/contracts.ts      (TypeScript interfaces)
│   │   └── package.json          (zero deps, exports types + values)
│   │
│   ├── @ferrum/a11y/             # Shared accessibility utilities
│   │   ├── src/use-focus-trap.ts
│   │   ├── src/body-scroll-lock.ts
│   │   ├── src/focus-managed-view.tsx
│   │   ├── src/reduced-motion.ts
│   │   └── src/aria-patterns.tsx  (Dialog, Menu, Tabs wrappers)
│   │
│   ├── @ferrum/ui/               # Component library
│   │   ├── src/primitives/       (button, card, input, badge, etc.)
│   │   ├── src/ferrum/           (nav, effects, playground, etc.)
│   │   └── package.json          (depends on @ferrum/tokens, @ferrum/a11y)
│   │
│   ├── @ferrum/effects/          # Effect data & utilities
│   │   ├── src/data/             (split by category: hover.ts, border.ts, ...)
│   │   ├── src/index.ts          (barrel + search helpers)
│   │   ├── src/types.ts
│   │   └── src/css/              (CSS generation utilities)
│   │
│   ├── @ferrum/content/          # All content data
│   │   ├── src/docs.ts           (documentation content)
│   │   ├── src/blog.ts           (blog posts — future: MDX files)
│   │   ├── src/changelog.ts      (changelog entries)
│   │   ├── src/lessons.ts        (interactive docs lessons)
│   │   ├── src/architecture.ts   (architecture diagrams + descriptions)
│   │   └── src/playground.ts     (playground presets + data)
│   │
│   └── @ferrum/cloud/            # Cloud feature (auth, store, API)
│       ├── src/store.ts          (in-memory / future DB store)
│       ├── src/auth.ts           (auth logic)
│       ├── src/middleware.ts     (rate limiting, token validation)
│       ├── src/api/              (API route handlers)
│       └── src/types.ts
│
├── apps/
│   └── web/                      # Next.js application
│       ├── src/app/              (pages, layouts, API routes)
│       ├── src/app/cloud/        (cloud page — imports from @ferrum/cloud)
│       ├── src/app/api/          (API routes — delegates to @ferrum/cloud)
│       ├── src/lib/              (app-specific utilities)
│       └── package.json          (depends on all @ferrum/* packages)
│
├── configs/                      # Shared dev configs
│   ├── eslint/                   (shared ESLint config)
│   ├── typescript/               (shared tsconfig bases)
│   ├── tailwind/                 (shared Tailwind config)
│   └── vitest/                   (shared vitest config)
│
└── infra/                       # Infrastructure
    ├── docker/                   (Dockerfile, docker-compose)
    ├── caddy/                    (Caddyfile)
    └── ci/                       (GitHub Actions, etc.)
```

### 7.2 Dependency Rules

```
@ferrum/tokens    ← No dependencies (leaf package)
@ferrum/a11y      ← No dependencies (leaf package)
@ferrum/effects   ← depends on @ferrum/tokens
@ferrum/content   ← depends on @ferrum/tokens (for colors in content)
@ferrum/ui        ← depends on @ferrum/tokens, @ferrum/a11y
@ferrum/cloud     ← depends on @ferrum/tokens (for API types)
apps/web          ← depends on ALL @ferrum/* packages
```

**No circular dependencies allowed.** Enforced by `eslint-plugin-import` with `no-cycle` rule.

### 7.3 What Stays in `apps/web`

- Next.js pages and layouts (`src/app/`)
- API route handlers (thin wrappers delegating to `@ferrum/cloud`)
- `home-client.tsx` (SPA router — app-specific orchestration)
- `view-meta.ts` (routing configuration — app-specific)
- `middleware.ts` (Next.js middleware — must be in app)
- `globals.css`, `critical.css` (app-specific styling)
- `next.config.ts` (app-specific build config)

---

## 8. Migration Path

### Phase 1: Foundation (Low Risk)

**Goal**: Extract leaf packages with zero breaking changes.

| Step | Action | Risk | Effort |
|------|--------|------|--------|
| 1.1 | Initialize workspace (pnpm/npm workspaces + turbo) | Low | 2h |
| 1.2 | Extract `@ferrum/tokens` from `src/lib/ferrum-tokens/` | Low | 1h |
| 1.3 | Extract `@ferrum/a11y` (use-focus-trap, body-scroll-lock) | Low | 1h |
| 1.4 | Configure shared eslint, tsconfig, vitest | Low | 2h |
| 1.5 | Update imports in `apps/web` to use `@ferrum/*` | Low | 3h |

**Verification**: Build output identical. All 95 tests pass. No bundle size change.

### Phase 2: Data Extraction (Medium Risk)

**Goal**: Move data files to dedicated packages.

| Step | Action | Risk | Effort |
|------|--------|------|--------|
| 2.1 | Extract `@ferrum/effects` (split data by category) | Medium | 4h |
| 2.2 | Extract `@ferrum/content` (docs, blog, changelog, lessons, architecture, playground data) | Medium | 4h |
| 2.3 | Update dynamic imports to reference new package paths | Low | 2h |
| 2.4 | Verify code splitting still works (bundle analysis) | Medium | 2h |

**Verification**: Bundle size unchanged or improved (if category splitting reduces effects chunk). All views functional.

### Phase 3: Component Library (Higher Risk)

**Goal**: Extract UI and Ferrum components.

| Step | Action | Risk | Effort |
|------|--------|------|--------|
| 3.1 | Extract `@ferrum/ui/primitives` (11 UI components) | Medium | 4h |
| 3.2 | Extract `@ferrum/ui/ferrum` (nav, effects, playground, etc.) | High | 8h |
| 3.3 | Resolve cross-component dependencies (app-context, shared state) | High | 4h |
| 3.4 | Update all imports | Medium | 4h |

**Verification**: All views render identically. No TypeScript errors. Full E2E smoke test.

### Phase 4: Cloud Extraction (Medium Risk)

**Goal**: Isolate cloud feature for independent evolution.

| Step | Action | Risk | Effort |
|------|--------|------|--------|
| 4.1 | Extract `@ferrum/cloud` (store, auth, middleware, API types) | Medium | 4h |
| 4.2 | API routes in `apps/web` become thin wrappers | Low | 2h |
| 4.3 | Fix middleware env var crash (graceful degradation) | Low | 0.5h |
| 4.4 | Add input validation to team update and token endpoints | Low | 1h |

**Verification**: All cloud API tests pass. Auth flow works. Middleware degrades gracefully without env var.

### Phase 5: Security & A11y Hardening (Parallel Track)

These can run in parallel with Phase 2-4.

| Step | Action | Priority | Effort |
|------|--------|----------|--------|
| 5.1 | Migrate CSP to nonce-based | 🔴 Critical | 4h |
| 5.2 | Fix contrast (create safe tokens, update 48+ files) | 🔴 Critical | 6h |
| 5.3 | Add `aria-label` to search inputs | 🟡 High | 0.5h |
| 5.4 | Add focus trap to color customizer | 🟡 High | 1h |
| 5.5 | Fix mobile nav role mismatch | 🟡 High | 1h |
| 5.6 | Add `aria-current="page"` to NavButton | 🟡 High | 0.5h |
| 5.7 | Kill SMIL animations on reduced motion | 🟡 High | 0.5h |
| 5.8 | Add docsMenu items to mobile nav | 🟡 High | 2h |
| 5.9 | Expand Permissions-Policy | 🟢 Medium | 0.5h |
| 5.10 | Add COOP/CORP headers | 🟢 Low | 0.5h |
| 5.11 | Fix routing test (import VALID_VIEWS from view-meta) | 🟢 Low | 0.5h |
| 5.12 | Remove dead `communityMenu` export | 🟢 Low | 0.5h |

### Phase 6: Future Enhancements

| Enhancement | Description | Dependencies |
|-------------|-------------|-------------|
| MDX content | Move blog/docs/lessons from hardcoded TS to MDX files | Phase 2 (content extraction) |
| Global search (Cmd+K) | Site-wide search across effects, docs, blog | Phase 2 (content extraction) |
| JWT auth | Replace static token with proper JWT + user store | Phase 4 (cloud extraction) |
| Distributed rate limiting | Redis/Upstash for production deployments | Phase 4 + infra |
| E2E tests | Playwright/Cypress for critical user flows | Phase 3 (stable component API) |
| Middleware → Proxy | Migrate from deprecated middleware to Next.js 16 proxy | None |

---

## Appendix: Key Metrics Reference

| Metric | Value | Source |
|--------|-------|--------|
| Total source LoC | 23,733 | Performance Baseline Report |
| Component files | 66 (.tsx) | Performance Baseline Report |
| Total source files | 120 (.ts + .tsx + .css) | Performance Baseline Report |
| Features | 21 (18 implemented + 3 new) | Feature Registry |
| Components | 71 | Component Registry |
| Routes | 19 (5 pages + 12 API + 2 special) | Route Registry |
| API Endpoints | 17 | API Registry |
| Packages | 17 (9 runtime + 8 dev) | Package Registry |
| Documentation entries | 29 | Documentation Registry |
| Test cases | 95/95 passing | Platform Audit Report |
| Git commits | 5 (clean linear history) | Git Forensics Report |
| Branches | 2 (main + baseline) | Git Forensics Report |
| Security findings | 2 critical, 4 high, 5 medium, 4 low | Security Audit Report |
| A11y areas passing | 3/9 | Accessibility Audit Report |

---

*This document is the authoritative architecture reference for the FerrumEngine platform. Update when architectural decisions change.*