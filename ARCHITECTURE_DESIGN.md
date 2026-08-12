# FerrumEngine Platform — Architecture Design Document

**Version**: 2.0  
**Date**: 2026-08-12  
**Author**: Architecture Design Engineer (Task ID: 4)  
**Scope**: Full platform architecture — current state analysis, target state design, component dependency graph, data flow diagrams, decision rationale, and phased migration path  
**Audience**: Engineering team, technical leadership, onboarding engineers  

---

## Table of Contents

1. [Current State Summary](#1-current-state-summary)
2. [Component Dependency Graph](#2-component-dependency-graph)
3. [Data Flow Architecture](#3-data-flow-architecture)
4. [Target Architecture](#4-target-architecture)
5. [Directory Structure Design](#5-directory-structure-design)
6. [Component Hierarchy & Composition Patterns](#6-component-hierarchy--composition-patterns)
7. [Type System Design](#7-type-system-design)
8. [API Design Patterns](#8-api-design-patterns)
9. [Performance Architecture](#9-performance-architecture)
10. [Security Architecture](#10-security-architecture)
11. [Testing Architecture](#11-testing-architecture)
12. [Build & Deployment Pipeline](#12-build--deployment-pipeline)
13. [Decision Rationale](#13-decision-rationale)
14. [Implementation Phases & Priorities](#14-implementation-phases--priorities)
15. [Appendix: Key Metrics Reference](#15-appendix-key-metrics-reference)

---

## 1. Current State Summary

### 1.1 Platform Overview

FerrumEngine is a **monolithic Next.js 16 application** (Turbopack) using the App Router. It serves as both a marketing/showcase platform for the FerrumEngine product and a functional tool suite (CSS effects gallery with 542 effects, live playground, interactive docs, and a demo cloud dashboard for design token management).

**Scale**: 123 TS/TSX source files, 23,999 LOC, 95/95 tests passing, 0 TypeScript errors, 3.2s build time.

> **Last verified**: 2026-08-12 (Documentation Reconciliation — Task ID: 10)

### 1.2 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        next.config.ts                                  │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  17 SPA rewrites → /     (pathname-based, not hash)               │ │
│  │  CSP, HSTS, COOP, CORP, X-Permitted, Permissions-Policy headers  │ │
│  │  Image optimization (AVIF, WebP)                                   │ │
│  │  Compiler: removeConsole in prod, optimizePackageImports           │ │
│  └───────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│  src/app/                                                              │
│  ├── layout.tsx            Root layout (SEO, JSON-LD, fonts, theme)    │
│  ├── page.tsx              Server component shell → renders HomeClient  │
│  ├── home-loader.tsx       Client boundary (dynamic imports HomeClient) │
│  ├── home-client.tsx       SPA router, AppProvider, 33 dynamic imports │
│  ├── globals.css / critical.css  Tailwind 4 + anti-FOUC               │
│  ├── cloud/                Separate layout + loader + dashboard         │
│  ├── privacy/              Static legal page                           │
│  ├── terms/                Static legal page                           │
│  ├── not-found.tsx         Server 404 handler                          │
│  └── api/                  13 REST API routes + Edge middleware         │
├─────────────────────────────────────────────────────────────────────────┤
│  src/components/                                                        │
│  ├── ui/                   12 primitives (button, card, input, etc.)    │
│  ├── ferrum/               57 files: SPA views, nav, effects, playground│
│  ├── theme-provider.tsx    next-themes wrapper                          │
│  ├── theme-toggle.tsx      Light/dark/system cycle                     │
│  └── logo.tsx              SVG logo component                          │
├─────────────────────────────────────────────────────────────────────────┤
│  src/lib/                                                              │
│  ├── types.ts              ViewId union, NavProps, MegaMenu types       │
│  ├── view-meta.ts          SEO metadata + pathname→ViewId mapping       │
│  ├── ferrum-effects-index.ts  542 effect metadata (92KB)               │
│  ├── ferrum-effects-data.ts   Full CSS strings (424KB)                 │
│  ├── cloud-store.ts        In-memory store + file persistence           │
│  ├── persist.ts            Atomic JSON writes with debouncing           │
│  ├── icon-resolver.tsx     String→Lucide icon map (O(1))               │
│  ├── api-types.ts          Request body types for cloud API             │
│  ├── constants.ts          SITE_URL                                    │
│  ├── utils.ts              cn() tailwind-merge wrapper                   │
│  └── body-scroll-lock.ts   Mobile nav scroll prevention                │
├─────────────────────────────────────────────────────────────────────────┤
│  src/hooks/                                                             │
│  ├── use-focus-trap.ts     Modal/drawer keyboard trap                   │
│  ├── use-cloud-auth.ts     Token login + authFetch wrapper              │
│  └── use-cloud-data.ts     CRUD operations for cloud entities           │
├─────────────────────────────────────────────────────────────────────────┤
│  src/middleware.ts           Auth + rate limiting (Edge Runtime)         │
├─────────────────────────────────────────────────────────────────────────┤
│  public/                                                               │
│  ├── ferrum-effects.css    570KB compiled effects (deferred load)       │
│  ├── logo.svg, favicon.svg Brand assets                                 │
│  ├── sitemap.xml, robots.txt SEO crawl config                          │
│  └── anti-fouc.css         385B theme flash prevention                  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Routing Architecture (SPA Pattern)

The app uses a **two-layer SPA pattern** to work around Next.js 16/Turbopack's restriction on `ssr: false` in Server Components:

```
Browser request: /effects
       │
       ▼
next.config.ts rewrite: /effects → /     (server-side, transparent)
       │
       ▼
page.tsx (Server Component)
  └── home-loader.tsx (Client Component, "use client")
        └── dynamic(() => import("home-client"), { ssr: false })
              └── home-client.tsx (SPA Router)
                    │
                    ├── usePathname() → "/effects"
                    ├── pathnameToView("/effects") → ViewId: "effects"
                    └── EffectsView (loaded via dynamic import with ssr: false)

Key insight: URL stays as /effects in browser bar. Server serves the same
HTML shell for all SPA routes. Client-side JS resolves the view.
```

**Why not native Next.js pages?** All 17 SPA views (+ home) are pure client-side — they use `window`, `localStorage`, `IntersectionObserver`, and have zero SEO benefit from server rendering. The SEO content is handled by `seo-content.tsx` (server-rendered, sr-only). The SPA rewrite pattern avoids 17 nearly-empty page.tsx files and gives instant client-side navigation.

### 1.4 Dependency Tree (Runtime)

```
next (16.1.1)             ← Framework core
  └── react (19.0.0)      ← UI runtime
  └── react-dom (19.0.0)  ← DOM renderer
react (19.0.0)
  └── (peer dep of next)
@radix-ui/react-label (2.1.15)   ← A11y label primitive
@radix-ui/react-slot (1.3.3)     ← Composable slot pattern
lucide-react (0.525.0)             ← Icon library (tree-shaken)
next-themes (0.4.6)                 ← Dark/light/system theme
sonner (2.0.6)                      ← Toast notifications
tailwind-merge (3.3.1)             ← Class conflict resolution
```

**Total: 7 runtime dependencies** (plus Next.js/React which are framework-implicit). Exceptionally lean.

### 1.5 Content Data Inventory

| Data | Source | Size | Load Strategy |
|------|--------|------|---------------|
| 542 CSS effects metadata | `ferrum-effects-index.ts` | 92 KB | Dynamic import (with EffectsView) |
| 542 CSS effects full strings | `ferrum-effects-data.ts` | 424 KB | Dynamic import (on demand per effect) |
| 35 effect categories | `ferrum-effects-index.ts` | ~2 KB | Bundled with effects index |
| Blog posts (6) | Inline in `blog-view.tsx` | ~3 KB | Dynamic import (with BlogView) |
| Changelog entries (8) | Inline in `changelog-view.tsx` | ~4 KB | Dynamic import (with ChangelogView) |
| Interactive lessons (8) | `interactive-docs/lessons-data.ts` | ~8 KB | Dynamic import (with InteractiveDocsView) |
| Documentation | `docs-data.ts` | ~20 KB | Dynamic import (with DocsView) |
| Architecture diagrams | `architecture-data.ts` | ~15 KB | Dynamic import (with ArchitectureDeepDive) |
| Playground presets | `playground-v2-data.ts` | ~5 KB | Dynamic import (with PlaygroundV2) |
| Navigation structure | `nav-data.ts` | ~2 KB | Dynamic import (with Nav) |
| Design tokens (ferrum-tokens) | `ferrum-tokens/index.cjs` | ~8 KB | Build-time reference |
| Cloud data (teams, projects, tokens) | `cloud-store.ts` + `db/cloud-store.json` | Variable | In-memory + file persistence |

### 1.6 Build & CI Profile

| Metric | Value |
|--------|-------|
| Build time (Turbopack) | ~3.2s |
| TypeScript compilation | 0 errors (strict mode) |
| ESLint | 0 errors, 0 warnings |
| Tests (Vitest) | 95/95 passing, 0 skipped |
| Static pages generated | 14 |
| Dynamic API routes | 12 |
| First-Load JS (raw) | ~495 KB |
| First-Load JS (est. gzip) | ~165 KB |
| Initial CSS | ~174 KB |
| Dynamic chunks | 26+ |
| CI pipeline | typecheck → lint → test → build → budget |

---

## 2. Component Dependency Graph

### 2.1 Import Dependency (Simplified)

```
                         ┌─────────────┐
                         │  layout.tsx  │  (Server Component — root)
                         └──────┬──────┘
                                │ renders
                                ▼
                         ┌─────────────┐
                         │   page.tsx  │  (Server Component — shell)
                         └──────┬──────┘
                                │ renders
                                ▼
                    ┌──────────────────────┐
                    │   home-loader.tsx    │  (Client — dynamic boundary)
                    └──────────┬───────────┘
                               │ dynamic(ssr:false)
                               ▼
                    ┌──────────────────────┐
                    │   home-client.tsx    │  (Client — SPA orchestrator)
                    └──────────┬───────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
               ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────────┐
        │ AppProvider│   │ViewRouter│   │ ViewSkeleton │
        └────┬─────┘   └────┬─────┘   └──────────────┘
             │              │
             │    ┌─────────┼──────────┬──────────────┐
             │    │         │          │              │
             │    ▼         ▼          ▼              ▼
             │  ┌──────┐ ┌──────┐ ┌────────┐  ┌──────────┐
             │  │ Nav  │ │Docs  │ │Playground│ │Effects   │
             │  │      │ │View  │ │  V2     │  │View      │
             │  └──┬───┘ └──┬───┘ └───┬────┘  └──┬───────┘
             │     │        │         │           │
             │     ▼        ▼         ▼           ▼
             │  nav-mega  docs-   playground/   effect-
             │  -menu     data     index.tsx    preview
             │     │                  │           │
             │     ▼                  ▼           ▼
             │  nav-data  playground-   effects-
             │            data         detail-modal
             │                             │
             ▼                             ▼
        AppContext                 Collection-
        (effects state)            Drawer
             │
             ▼
        localStorage
        (ferrum-collection)
```

### 2.2 Module Dependency Graph (by directory)

```
src/lib/types.ts              ← Imported by: EVERYTHING (leaf, zero deps)
src/lib/constants.ts           ← Imported by: layout.tsx, home-client.tsx, view-meta.ts
src/lib/utils.ts               ← Imported by: 30+ components (cn() utility)
src/lib/view-meta.ts           ← Imported by: home-client.tsx (imports types.ts)
src/lib/icon-resolver.tsx      ← Imported by: nav, playground, nav-mega-menu
src/lib/ferrum-effects-index.ts← Imported by: effects-view, app-context, effects-detail-modal
src/lib/ferrum-effects-data.ts ← Imported by: effect-preview, /api/css route
src/lib/cloud-store.ts          ← Imported by: 8 cloud API routes
src/lib/persist.ts              ← Imported by: cloud-store.ts
src/lib/api-types.ts            ← Imported by: cloud API routes
src/lib/body-scroll-lock.ts     ← Imported by: nav-mobile.tsx
src/lib/docs-data.ts            ← Imported by: docs-view.tsx
src/lib/architecture-data.ts    ← Imported by: architecture-deep-dive.tsx
src/lib/web-vitals.tsx          ← Imported by: layout.tsx

src/hooks/use-focus-trap.ts     ← Imported by: nav-mobile, effects-detail-modal, collection-drawer
src/hooks/use-cloud-auth.ts     ← Imported by: cloud-dashboard-client.tsx
src/hooks/use-cloud-data.ts     ← Imported by: cloud-dashboard-client.tsx

src/components/ui/*             ← Imported by: 40+ ferrum/ components (zero cross-deps within ui/)
src/components/ferrum/app-context.tsx ← Imported by: home-client.tsx only
src/components/ferrum/nav-data.ts    ← Imported by: nav.tsx, nav-mobile.tsx
src/components/ferrum/nav.tsx        ← Imported by: home-client.tsx (dynamic)
src/components/ferrum/nav-mobile.tsx ← Imported by: nav.tsx
src/components/ferrum/nav-mega-menu.tsx ← Imported by: nav.tsx
```

### 2.3 Circular Dependency Status

**Zero circular dependencies.** Confirmed by audit (Phase 1). The dependency graph is a clean DAG:

```
Direction: types.ts → utils.ts → components → home-client.tsx → page.tsx → layout.tsx

     types.ts (root)
         │
    ┌────┼────┬──────────┬──────────┐
    ▼    ▼    ▼          ▼          ▼
  utils  view- icon-  api-types  body-
         meta  resolver           scroll-lock
    │         │
    ▼         ▼
  ui/     nav-data → nav → nav-mega-menu
  primitives      │
    │             ▼
    ▼         nav-mobile
  ferrum/        │
  components     ▼
    │         use-focus-trap
    ▼
  app-context → home-client → home-loader → page.tsx
```

---

## 3. Data Flow Architecture

### 3.1 Client-Side State Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT-SIDE DATA FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐     read on mount      ┌──────────────┐      │
│  │ localStorage │ ◄──────────────────── │ AppContext   │      │
│  │              │     write on change    │              │      │
│  │ -collection  │ ─────────────────────► │ search       │      │
│  │ -cloud-token │                        │ category     │      │
│  └──────────────┘                        │ selectedFx   │      │
│       ▲                                  │ collection   │      │
│       │ restore on mount                 │ detailOpen   │      │
│       │                                  │ hydrated     │      │
│  ┌────┴─────────┐                        └──────┬───────┘      │
│  │ useCloudAuth │                               │               │
│  │ (cloud token)│                               │ consumed by   │
│  └──────────────┘                               │               │
│                                          ┌─────┴──────┐       │
│                                          │  ViewRouter │       │
│                                          └─────┬──────┘       │
│                                                │               │
│                    ┌───────────────────────────┼──────┐        │
│                    │           │               │      │        │
│                    ▼           ▼               ▼      ▼        │
│               EffectsView  Playground    BlogView DocsView   │
│               (uses state) (own state)  (local)  (local)     │
│                                                                 │
│  STATE BOUNDARIES:                                              │
│  - AppContext: effects search, category, collection, detail     │
│  - Each view manages its own local state (useState)             │
│  - No global state library (no Redux, Zustand, Jotai)           │
│  - Cloud auth: separate hook (useCloudAuth)                     │
│  - Cloud data: separate hook (useCloudData) via fetch           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Server-Side Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER-SIDE DATA FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Request Lifecycle                            │  │
│  │                                                          │  │
│  │  Browser ──► Next.js Server ──► middleware.ts?            │  │
│  │                                  │                       │  │
│  │                     ┌────────────┼────────────┐           │  │
│  │                     ▼            ▼            ▼           │  │
│  │                  Non-cloud   /api/cloud/  /api/cloud/      │  │
│  │                  routes      auth         other            │  │
│  │                     │         │            │               │  │
│  │                     ▼     Rate limit   Rate limit         │  │
│  │                   Pass     (10/15min)  (100/min)          │  │
│  │                     │         │            │               │  │
│  │                     │         ▼            ▼               │  │
│  │                     │      Check auth   Bearer token      │  │
│  │                     │      (password    validation         │  │
│  │                     │       compare)   (timing-safe)      │  │
│  │                     │         │            │               │  │
│  │                     ▼         ▼            ▼               │  │
│  │                   Route Handler (try/catch, validation)     │  │
│  │                         │                                   │  │
│  │                    ┌────┴────┐                               │  │
│  │                    ▼         ▼                               │  │
│  │              Read-only    Read-Write                        │  │
│  │              (effects,   (cloud CRUD)                       │  │
│  │               tokens,       │                               │  │
│  │               health)       ▼                               │  │
│  │                     ┌──────────────┐                        │  │
│  │                     │  CloudStore  │                        │  │
│  │                     │  (singleton) │                        │  │
│  │                     └──────┬───────┘                        │  │
│  │                            │                                │  │
│  │                    ┌───────┴────────┐                       │  │
│  │                    ▼                ▼                       │  │
│  │              In-memory         persist.ts                    │  │
│  │              (arrays)          (debounced                   │  │
│  │                                 atomic JSON                  │  │
│  │                                 write to disk)               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 SPA Navigation Data Flow

```
┌────────────────────────────────────────────────────────────────┐
│                 SPA NAVIGATION FLOW                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  1. User clicks nav link (e.g., "Effects")                     │
│     │                                                          │
│     ▼                                                          │
│  2. Nav.onNavigate("effects") called                           │
│     │                                                          │
│     ▼                                                          │
│  3. ViewRouter.navigate(viewId)                                │
│     └── router.push(viewId === "home" ? "/" : `/${viewId}`)   │
│                                                                │
│  4. Browser URL changes to /effects                            │
│     │                                                          │
│     ▼                                                          │
│  5. Next.js client-side router fires (NO server round-trip)    │
│     │  (URL was already rewritten to / by next.config.ts)      │
│     │                                                          │
│     ▼                                                          │
│  6. ViewRouter re-renders (usePathname() changed)              │
│     └── pathnameToView("/effects") → "effects"                │
│     └── currentView === "effects" → renders EffectsView        │
│                                                                │
│  7. useLayoutEffect: scrollTo(0, "instant")                   │
│     useLayoutEffect: update document.title + meta tags         │
│     useEffect: focus #main-content for screen readers          │
│                                                                │
│  8. If EffectsView not yet loaded:                              │
│     └── Suspense shows ViewSkeleton                            │
│     └── Chunk loads from network/cache                         │
│     └── EffectsView renders                                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.4 State Management Summary

| State Scope | Mechanism | Persistence | Consumers |
|-------------|-----------|-------------|------------|
| SPA route | `usePathname()` + `router.push()` | URL bar | ViewRouter only |
| Theme (dark/light) | `next-themes` (ThemeProvider) | localStorage (`theme`) | Global (CSS class on `<html>`) |
| Effects search/filter | `AppContext` (useState) | None (ephemeral) | EffectsView |
| Effects collection | `AppContext` (useState) | localStorage (`ferrum-collection`) | EffectsView, CollectionDrawer |
| Effect detail modal | `AppContext` (useState) | None (ephemeral) | EffectDetailModal |
| Cloud auth token | `useCloudAuth` (useState) | localStorage (`ferrum-cloud-token`) | CloudDashboard |
| Cloud data | `useCloudData` (fetch) | Server-side (CloudStore + file) | CloudDashboard |
| View-specific state | Local `useState` per component | Varies (some localStorage) | Individual views |
| Toast notifications | `sonner` (external) | None (ephemeral) | Any component |

**Design decision**: No global state library is used. The app has exactly two state scopes: AppContext (effects-related) and per-view local state. This is intentional — the SPA is a collection of independent views that share minimal state. Adding Redux/Zustand would add complexity without benefit.

---

## 4. Target Architecture

### 4.1 Vision

Evolve from a flat monolith to a **modular monorepo with clear package boundaries**, while keeping the deployment as a single Next.js application. The goal is **separation of concerns at the source level**, not microservices. The deployed bundle must remain identical (or smaller) after modularization.

### 4.2 Target High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT TARGET                             │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Single Next.js 16 app (Turbopack)                            │  │
│  │  Built from workspace packages via TypeScript project refs     │  │
│  │  Deployed as: static HTML + serverless functions + edge        │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘

packages/
├── web/                     ← Next.js app (pages, layouts, API routes)
│   ├── src/app/             ← Server pages + API handlers (thin wrappers)
│   ├── src/lib/             ← App-specific config (view-meta, constants)
│   └── src/middleware.ts    ← Edge middleware (auth, rate limiting)
│
├── ui/                      ← Component library (primitives + ferrum)
│   ├── src/primitives/      ← button, card, input, badge, etc.
│   ├── src/ferrum/          ← nav, effects, playground, views
│   └── src/composition/     ← ViewErrorBoundary, ViewSkeleton, NavSkeleton
│
├── effects/                 ← Effect data, index, CSS generation
│   ├── src/index.ts         ← Barrel export + search utilities
│   ├── src/data/            ← Split by category (hover.ts, border.ts, ...)
│   └── src/types.ts         ← FerrumEffectIndex, FerrumCSSEffect, Category
│
├── content/                 ← All editorial/content data
│   ├── src/docs.ts          ← Documentation content
│   ├── src/blog.ts          ← Blog posts (future: MDX files)
│   ├── src/changelog.ts     ← Changelog entries
│   ├── src/lessons.ts       ← Interactive docs lesson data
│   ├── src/architecture.ts  ← Architecture diagrams + descriptions
│   └── src/playground.ts    ← Playground presets + data
│
├── cloud/                   ← Cloud feature (isolated for future extraction)
│   ├── src/store.ts         ← In-memory / future DB store
│   ├── src/persist.ts       ← File persistence (atomic writes)
│   ├── src/auth.ts          ← Auth logic (timing-safe compare)
│   ├── src/middleware.ts    ← Rate limiting, token validation (Edge-compatible)
│   ├── src/api/             ← API route handler logic
│   ├── src/hooks/           ← useCloudAuth, useCloudData
│   └── src/types.ts         ← Team, Project, DesignToken, etc.
│
├── a11y/                    ← Shared accessibility utilities
│   ├── src/use-focus-trap.ts
│   ├── src/body-scroll-lock.ts
│   ├── src/reduced-motion.ts
│   └── src/aria-patterns.tsx ← Dialog, Menu, Tabs ARA wrappers
│
├── tokens/                  ← Design token system
│   ├── src/index.ts         ← Token definitions (oklch values)
│   ├── src/contracts.ts     ← TypeScript interfaces for tokens
│   └── src/tailwind.ts      ← Tailwind CSS custom property mappings
│
└── config/                  ← Shared development configs
    ├── eslint/              ← Shared ESLint config
    ├── typescript/          ← Shared tsconfig bases
    ├── tailwind/            ← Shared Tailwind config
    └── vitest/              ← Shared vitest workspace config
```

### 4.3 Target Dependency Rules

```
@ferrum/tokens    ← No dependencies (leaf package)
@ferrum/a11y      ← No dependencies (leaf package)
@ferrum/effects   ← depends on @ferrum/tokens (for category colors)
@ferrum/content   ← depends on @ferrum/tokens (for content colors)
@ferrum/ui        ← depends on @ferrum/tokens, @ferrum/a11y
@ferrum/cloud     ← No UI deps (pure logic + types + hooks)
apps/web          ← depends on ALL @ferrum/* packages

NO CIRCULAR DEPENDENCIES. Enforced by eslint-plugin-import no-cycle rule.
NO UPWARD DEPENDENCIES. Packages cannot depend on apps/web.
```

### 4.4 Target Rendering Strategy

| Page Type | Current | Target | Rationale |
|-----------|---------|--------|-----------|
| Home (`/`) | Server shell + SPA | Server shell + SPA | Already optimal — hero + SEO content server-rendered |
| Effects (`/effects`) | SPA-only | **Static category pages** + SPA detail | 542 effects are SEO gold; generate category listing at build time |
| Docs (`/docs`) | SPA-only | **MDX-backed** RSC | Documentation should be crawlable, fast first paint |
| Blog (`/blog`) | SPA-only | **MDX-backed** RSC + RSS feed | Blog posts are content; should be crawlable with RSS |
| Changelog (`/changelog`) | SPA-only | **MDX-backed** RSC | Changelog is content; should be crawlable |
| Interactive Docs | SPA-only | SPA-only | Interactive tool — no SEO value in SSR |
| Playground | SPA-only | SPA-only | Interactive tool — no SEO value |
| Cloud | Hybrid (separate page) | Hybrid (separate page) | Auth-gated, no SEO needed |
| Terms/Privacy | Server | Server | Already optimal |

---

## 5. Directory Structure Design

### 5.1 Current Directory Tree (src/)

```
src/
├── app/                          ← Next.js App Router
│   ├── layout.tsx                ← Root layout (Server Component)
│   ├── page.tsx                  ← Home page (Server Component)
│   ├── home-client.tsx           ← SPA orchestrator (497 LOC)
│   ├── home-loader.tsx           ← Client boundary for dynamic import
│   ├── globals.css               ← Full Tailwind CSS
│   ├── critical.css              ← Anti-FOUC inline styles
│   ├── loading.tsx               ← Global loading UI
│   ├── not-found.tsx             ← 404 page
│   ├── error.tsx                 ← Error boundary
│   ├── global-error.tsx          ← Global error boundary
│   ├── cloud/                    ← Cloud dashboard (separate layout)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── cloud-loader.tsx
│   │   ├── cloud-dashboard-client.tsx
│   │   ├── cloud-modals.tsx
│   │   ├── cloud-breadcrumb.tsx
│   │   └── tab-panels.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/                      ← 12 API routes
│       ├── route.ts              ← API index
│       ├── health/route.ts
│       ├── css/route.ts
│       ├── tokens/route.ts
│       ├── analytics/route.ts
│       └── cloud/                ← 8 cloud API routes
│           ├── auth/route.ts
│           ├── teams/route.ts
│           ├── teams/[teamId]/route.ts
│           ├── teams/[teamId]/projects/route.ts
│           ├── projects/[projectId]/tokens/route.ts
│           ├── projects/[projectId]/components/route.ts
│           ├── tokens/[tokenId]/route.ts
│           └── audit/route.ts
│
├── components/
│   ├── ui/                       ← 12 UI primitives (shadcn-style)
│   │   ├── badge.tsx, button.tsx, card.tsx, input.tsx
│   │   ├── label.tsx, modal-overlay.tsx, scroll-area.tsx
│   │   ├── select.tsx, skeleton.tsx, slider.tsx, table.tsx
│   │   └── tooltip.tsx
│   ├── ferrum/                   ← 55 feature/component files
│   │   ├── app-context.tsx       ← Global state provider
│   │   ├── nav.tsx               ← Desktop navigation (139 LOC)
│   │   ├── nav-mobile.tsx        ← Mobile navigation (206 LOC)
│   │   ├── nav-mega-menu.tsx     ← Mega menu panel (162 LOC)
│   │   ├── nav-data.ts           ← Navigation structure data
│   │   ├── effects-view.tsx      ← Effects gallery (266 LOC)
│   │   ├── effects-detail-modal.tsx  ← Effect detail (227 LOC)
│   │   ├── effect-preview.tsx    ← Single effect renderer
│   │   ├── collection-drawer.tsx ← Saved effects drawer
│   │   ├── color-customizer.tsx  ← Theme color picker
│   │   ├── scroll-progress.tsx   ← Reading progress + back-to-top
│   │   ├── seo-content.tsx       ← SEO text (sr-only, server-rendered)
│   │   ├── animated-components.tsx ← Magnetic, ShineButton, PulsingDot
│   │   ├── blog-view.tsx         ← Blog (496 LOC)
│   │   ├── changelog-view.tsx    ← Changelog (510 LOC)
│   │   ├── docs-view.tsx         ← Documentation (517 LOC)
│   │   ├── architecture-deep-dive.tsx  ← Architecture (562 LOC)
│   │   ├── interactive-docs-view.tsx   ← Interactive docs (302 LOC)
│   │   ├── playground-v2-data.ts ← Playground presets
│   │   ├── architecture-data.ts  ← Architecture section data
│   │   └── playground/           ← Playground sub-components
│   │       ├── index.tsx, controls-panel.tsx, effect-sidebar.tsx
│   │       ├── preview-panel.tsx, code-editor.tsx, toolbar.tsx
│   │       └── types.ts
│   │   ├── interactive-docs/     ← Interactive docs sub-components
│   │       ├── explanation-panel.tsx, lesson-sidebar.tsx
│   │       ├── code-playground.tsx, types.ts, lessons-data.ts
│   │   └── sections/             ← Home sections + content views
│   │       ├── home/             ← 12 home page sections
│   │       │   ├── hero-section.tsx, problem-section.tsx
│   │       │   ├── marquee-section.tsx, playground-section.tsx
│   │       │   ├── overview-section.tsx, architecture-section.tsx
│   │       │   ├── dev-journey-section.tsx, live-examples-section.tsx
│   │       │   ├── enterprise-section.tsx, roadmap-section.tsx
│   │       │   ├── community-section.tsx, platform-footer-section.tsx
│   │       │   └── counter.tsx
│   │       ├── enterprise.tsx, showcase-gallery.tsx
│   │       ├── learning-center.tsx, platform-architecture.tsx
│   │       ├── ferrum-story.tsx, vision-manifesto.tsx
│   │       ├── hall-of-fame.tsx, enterprise-components.tsx
│   │       ├── ferrum-principles.tsx, footer.tsx
│   │       ├── illustrations.tsx, section-helpers.tsx
│   │       └── (14 content view files)
│   ├── logo.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── defer-css.tsx
│   ├── deferred-toaster.tsx
│   └── error-page-content.tsx
│
├── lib/                          ← Shared utilities and data
│   ├── types.ts                  ← ViewId union, NavProps, MegaMenu types
│   ├── view-meta.ts              ← SEO metadata + pathname→ViewId
│   ├── icon-resolver.tsx         ← String→Lucide icon O(1) map
│   ├── ferrum-effects-index.ts   ← 542 effect metadata (92KB)
│   ├── ferrum-effects-data.ts    ← Full CSS strings (424KB)
│   ├── cloud-store.ts            ← In-memory entity store (388 LOC)
│   ├── persist.ts                ← Atomic JSON file persistence
│   ├── api-types.ts              ← Cloud API request types
│   ├── docs-data.ts              ← Documentation content
│   ├── architecture-data.ts      ← Architecture section data
│   ├── playground-v2-data.ts     ← (moved, see ferrum/ above)
│   ├── constants.ts              ← SITE_URL
│   ├── utils.ts                  ← cn() wrapper
│   ├── body-scroll-lock.ts       ← Mobile scroll prevention
│   ├── web-vitals.tsx            ← Core Web Vitals reporting
│   └── ferrum-tokens/            ← Design tokens (CJS + DTS)
│       ├── index.cjs
│       └── index.d.ts
│
├── hooks/                        ← 3 custom React hooks
│   ├── use-focus-trap.ts
│   ├── use-cloud-auth.ts
│   └── use-cloud-data.ts
│
└── middleware.ts                 ← Edge middleware (auth + rate limit)
```

### 5.2 Target Directory Tree

```
ferrumengine/
├── package.json                   (workspace root)
├── pnpm-workspace.yaml
├── turbo.json
│
├── packages/
│   ├── @ferrum/tokens/           # Design tokens (leaf, zero deps)
│   │   ├── src/
│   │   │   ├── index.ts         (export all token definitions)
│   │   │   ├── colors.ts        (oklch color palette)
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   ├── contracts.ts     (TypeScript interfaces)
│   │   │   └── tailwind.ts      (CSS custom property mappings)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── @ferrum/a11y/             # Accessibility utilities (leaf, zero deps)
│   │   ├── src/
│   │   │   ├── use-focus-trap.ts
│   │   │   ├── body-scroll-lock.ts
│   │   │   ├── use-reduced-motion.ts
│   │   │   └── aria-patterns.tsx (Dialog, Menu, Tabs ARA wrappers)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── @ferrum/effects/          # Effect system
│   │   ├── src/
│   │   │   ├── index.ts         (barrel + search/filter utilities)
│   │   │   ├── types.ts         (FerrumEffectIndex, FerrumCSSEffect, Category)
│   │   │   └── data/            (split by category for code-splitting)
│   │   │       ├── hover.ts
│   │   │       ├── entrance.ts
│   │   │       ├── buttons.ts
│   │   │       ├── ... (35 category files)
│   │   │       └── index.ts    (combined re-export for full-load)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── @ferrum/content/          # Editorial content
│   │   ├── src/
│   │   │   ├── docs.ts          (documentation tree + content)
│   │   │   ├── blog.ts          (blog posts — future MDX)
│   │   │   ├── changelog.ts     (version history)
│   │   │   ├── lessons.ts       (interactive docs lessons)
│   │   │   ├── architecture.ts  (architecture diagrams + descriptions)
│   │   │   └── playground.ts    (playground presets)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── @ferrum/ui/               # Component library
│   │   ├── src/
│   │   │   ├── primitives/      (button, card, input, badge, etc.)
│   │   │   ├── ferrum/          (nav, effects-view, playground, sections)
│   │   │   ├── composition/     (ViewErrorBoundary, ViewSkeleton, etc.)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── @ferrum/cloud/            # Cloud feature (pure logic, no UI)
│   │   ├── src/
│   │   │   ├── store.ts         (entity store + CRUD)
│   │   │   ├── persist.ts       (atomic file writes)
│   │   │   ├── auth.ts          (timing-safe compare, JWT future)
│   │   │   ├── middleware.ts     (rate limiting, Edge-compatible)
│   │   │   ├── api/             (route handler logic)
│   │   │   │   ├── auth.ts
│   │   │   │   ├── teams.ts
│   │   │   │   ├── projects.ts
│   │   │   │   ├── tokens.ts
│   │   │   │   └── audit.ts
│   │   │   ├── hooks/           (useCloudAuth, useCloudData)
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── @ferrum/config/           # Shared dev configs
│       ├── eslint/
│       ├── typescript/
│       ├── tailwind/
│       └── vitest/
│
├── apps/
│   └── web/                      # Next.js application
│       ├── src/
│       │   ├── app/              (pages, layouts, API route wrappers)
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── home-client.tsx
│       │   │   ├── globals.css
│       │   │   ├── cloud/        (imports from @ferrum/cloud)
│       │   │   └── api/          (thin wrappers delegating to @ferrum/cloud)
│       │   ├── lib/              (app-specific: view-meta, constants, middleware)
│       │   └── middleware.ts     (delegates to @ferrum/cloud/middleware)
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── infra/                       # Infrastructure (not in packages/)
│   ├── docker/
│   ├── caddy/
│   └── ci/
│
└── tools/                       # Build/generation tools (already exists)
    └── roycss-parts/             (CSS effects generation pipeline)
```

---

## 6. Component Hierarchy & Composition Patterns

### 6.1 Current Composition Patterns

The codebase uses three distinct composition patterns:

**Pattern A: Dynamic Import with ssr:false (26 instances)**
```
Server Component (page.tsx)
  └── Client Boundary (home-loader.tsx)    ← "use client", dynamic(ssr:false)
        └── SPA Orchestrator (home-client.tsx)
              └── dynamic(() => import(View), { ssr: false })
                    └── View Component ("use client")
```

**Pattern B: Server Component Shell (3 pages)**
```
Server Component (cloud/page.tsx, privacy/page.tsx, terms/page.tsx)
  └── Client Boundary (cloud-loader.tsx, or direct children)
        └── Client Component ("use client")
```

**Pattern C: UI Primitive Composition**
```
Feature Component
  └── UI Primitives (button, card, input, modal-overlay, etc.)
        └── Radix Primitives (Label, Slot) — for a11y
              └── Tailwind CSS classes
```

### 6.2 Component Size Distribution

```
Size (LOC)    Count   Files
───────────────────────────────────────────────────
1-100          35     UI primitives, hooks, small sections
100-300        25     Sections, nav, scroll-progress, modals
300-500        10     Effects view, blog, changelog, docs, playground parts
500-1000        6     Architecture deep-dive, docs-view, playground controls
1000+           1     (none — largest was split to 302 LOC)

Largest files (by LOC):
  docs-view.tsx:           517 LOC
  architecture-deep-dive:   562 LOC
  changelog-view.tsx:       510 LOC
  blog-view.tsx:            496 LOC
  home-client.tsx:          497 LOC
  playground controls:      471 LOC
  cloud-store.ts:           388 LOC
  middleware.ts:            217 LOC
```

### 6.3 Target Composition Patterns

**Keep all three patterns.** They are well-chosen for their use cases:

1. **Pattern A** remains for SPA views — it's the correct approach for client-only content
2. **Pattern B** remains for SEO-critical pages (terms, privacy) and auth-gated pages (cloud)
3. **Pattern C** remains for UI composition — it's the standard shadcn/ui approach

**Add one new pattern for future RSC content:**

```
Pattern D: MDX-Backed Server Component (target)
  Server Component (blog/[slug]/page.tsx)
    ├── generateStaticParams()  ← Build-time slug generation
    ├── getMDXContent(slug)     ← Load MDX file
    └── MDXRenderer             ← Render with custom components
          └── UI Primitives (from @ferrum/ui)
```

---

## 7. Type System Design

### 7.1 Current Type Architecture

```
src/lib/types.ts              ← SHARED TYPES (source of truth)
  ├── ViewId                  (string union, 17 values)
  ├── NavProps                (currentView + onNavigate)
  ├── MegaMenuItem            (icon, label, description, view?, href?, badge?)
  ├── MegaMenuGroup           (heading + items[])
  ├── FerrumEffectIndex       (name, className, category, displayType)
  ├── FerrumCSSEffect         (extends FerrumEffectIndex + css string)
  ├── Category                (id, name, icon)
  ├── TeamRole                ("OWNER" | "ADMIN" | "MEMBER" | "VIEWER")
  ├── Environment             ("dev" | "staging" | "production")
  ├── TokenType               (7-value union)
  ├── ComponentStatus         (4-value union)
  └── ViewMeta                (title + description)

src/lib/api-types.ts          ← API REQUEST TYPES (separate file, imported by API routes)
  ├── CreateTeamBody          (optional fields, validated at runtime)
  ├── UpdateTeamBody
  ├── CreateProjectBody
  └── CreateTokenBody

src/lib/cloud-store.ts        ← ENTITY TYPES (defined alongside store)
  ├── Team, TeamMember
  ├── Project
  ├── DesignToken, TokenVersion
  ├── Component (cloud component, not UI component)
  └── AuditLog

src/components/ferrum/playground/types.ts  ← PLAYGROUND TYPES (scoped)
src/components/ferrum/interactive-docs/types.ts  ← INTERACTIVE DOCS TYPES (scoped)
src/lib/icon-resolver.tsx    ← LucideIconName (string union, 30 values)
```

### 7.2 Type Safety Strengths

- **Strict TypeScript**: `"strict": true`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`
- **ViewId as string union**: Compile-time guarantee that only valid views can be navigated to
- **Discriminated unions**: TeamRole, Environment, TokenType, ComponentStatus all use string unions
- **Optional fields in API types**: Reflects runtime validation reality (body may be missing fields)

### 7.3 Target Type System Improvements

1. **Move entity types to `@ferrum/cloud/src/types.ts`** — Keep domain types with their domain
2. **Add Zod schemas** for API validation (replace manual runtime checks):
   ```
   @ferrum/cloud/src/schemas/
     team.ts      ← z.object({ name: z.string().min(2).max(50) })
     project.ts  ← z.object({ name: ..., environment: z.enum([...]) })
     token.ts    ← z.object({ name: ..., value: ..., type: ..., namespace: ... })
   ```
3. **Extract ViewId + NavProps to `@ferrum/ui/src/types/navigation.ts`**
4. **Keep effect types in `@ferrum/effects/src/types.ts`**
5. **Add Branded types** for IDs to prevent mixing entity IDs:
   ```
   type TeamId = string & { __brand: "TeamId" };
   type ProjectId = string & { __brand: "ProjectId" };
   type TokenId = string & { __brand: "TokenId" };
   ```

---

## 8. API Design Patterns

### 8.1 Current API Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│  PUBLIC APIs (no auth)                                            │
├───────────────────────────────────────────────────────────────────┤
│  GET  /api               ← API index (lists all endpoints)        │
│  GET  /api/health        ← Health check (uptime, memory, persist) │
│  GET  /api/css?effect=X  ← Single effect CSS retrieval            │
│  GET  /api/css?all=true  ← All effects CSS (bulk)                 │
│  GET  /api/css?cat=X     ← Category-filtered CSS                  │
│  GET  /api/tokens        ← Design token values (JSON)             │
│  POST /api/analytics     ← Analytics event (silently accepted)    │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│  CLOUD APIs (Bearer token auth + rate limiting)                   │
├───────────────────────────────────────────────────────────────────┤
│  POST /api/cloud/auth                        ← Login (password)   │
│  GET  /api/cloud/teams                       ← List teams        │
│  POST /api/cloud/teams                       ← Create team       │
│  GET  /api/cloud/teams/[id]                  ← Get team          │
│  PUT  /api/cloud/teams/[id]                  ← Update team       │
│  DELETE /api/cloud/teams/[id]                ← Delete team       │
│  GET  /api/cloud/teams/[id]/projects         ← List projects     │
│  POST /api/cloud/teams/[id]/projects         ← Create project    │
│  GET  /api/cloud/projects/[id]/tokens        ← List tokens       │
│  POST /api/cloud/projects/[id]/tokens        ← Create token      │
│  GET  /api/cloud/projects/[id]/components    ← List components   │
│  PUT  /api/cloud/tokens/[id]                 ← Update token      │
│  GET  /api/cloud/audit?teamId=X&limit=N      ← Audit log         │
└───────────────────────────────────────────────────────────────────┘
```

### 8.2 API Design Patterns Used

| Pattern | Implementation | Assessment |
|---------|---------------|------------|
| REST resource nesting | `/teams/[id]/projects`, `/projects/[id]/tokens` | ✅ Good — follows REST conventions |
| Consistent error responses | `{ error: string }` with appropriate status codes | ✅ Good |
| Input validation | Manual type/length/enum checks in route handlers | ⚠️ OK — Zod would be stricter |
| Error handling | try/catch in all routes except audit | ⚠️ Fix audit route |
| Rate limiting headers | `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` | ✅ Excellent |
| Auth | Bearer token + timing-safe comparison | ✅ Good (demo-grade) |
| Cascade deletes | Team delete → projects, tokens, components | ✅ Good |
| Audit logging | All mutations logged | ✅ Good |

### 8.3 Target API Improvements

1. **Add Zod validation schemas** — Replace manual runtime checks
2. **Add OpenAPI/Swagger spec** — Auto-generate from Zod schemas
3. **Fix audit route** — Add try/catch (identified in audit WARNING)
4. **Add `try/catch` consistency** — One route (audit) is missing it
5. **Consider tRPC** — If the cloud feature grows, tRPC would provide end-to-end type safety
6. **Add API versioning** — `/api/v1/cloud/...` for backward compatibility

---

## 9. Performance Architecture

### 9.1 Current Performance Profile

```
┌───────────────────────────────────────────────────────────────────┐
│  PERFORMANCE BUDGET STATUS                                         │
├──────────────────┬──────────────┬──────────────┬──────────────────┤
│  Metric          │  Value       │  Budget      │  Status          │
├──────────────────┼──────────────┼──────────────┼──────────────────┤
│  Build time      │  ~3.2s       │  —           │  ✅ Fast          │
│  First-Load JS   │  ~495 KB     │  600 KB      │  ✅ 83%          │
│  Est. gzip JS    │  ~165 KB     │  —           │  ✅ Good          │
│  Total JS (all)  │  ~2,098 KB   │  —           │  ⚠️ 63 chunks    │
│  Largest chunk   │  234 KB      │  250 KB      │  ✅ 94%          │
│  Initial CSS     │  ~174 KB     │  300 KB      │  ✅ 58%          │
│  Effects CSS     │  ~570 KB     │  650 KB      │  ✅ 88%          │
│  Runtime deps    │  7           │  13          │  ✅ Lean          │
└──────────────────┴──────────────┴──────────────┴──────────────────┘
```

### 9.2 Code Splitting Architecture

```
Priority 0 — CRITICAL PATH (loaded immediately, blocks first paint):
  ┌─────────────────────────────────────────────────┐
  │  React + Next.js runtime           (~234 KB)   │  ← Largest chunk (framework)
  │  Framework utilities               (~150 KB)   │
  │  App shell (ViewRouter, AppProvider, types)     │
  │  Critical CSS (anti-FOUC + Tailwind, ~174 KB)  │
  └─────────────────────────────────────────────────┘

Priority 1 — PREFETCHED (loaded after hydration, likely next nav):
  ┌─────────────────────────────────────────────────┐
  │  EffectsView       (~92 KB index + 424 KB data) │  ← webpackPrefetch: true
   │  PlaygroundV2      (full IDE, varies)          │  ← webpackPrefetch: true
   │  DocsView          (documentation, varies)     │  ← webpackPrefetch: true
   │  Nav               (~40 KB with megamenu)      │  ← Dynamic, ssr:false
   │  ScrollProgress    (~5 KB)                     │
  └─────────────────────────────────────────────────┘

Priority 2 — ON NAVIGATION (loaded when user navigates to view):
  ┌─────────────────────────────────────────────────┐
  │  12 home sections  (loaded together for /)      │
  │  10 content views (loaded individually)         │
  │  Blog, Changelog, InteractiveDocs, etc.         │
  └─────────────────────────────────────────────────┘

Priority 3 — ON INTERACTION (loaded when user opens overlay):
  ┌─────────────────────────────────────────────────┐
  │  EffectDetailModal  (per-effect code view)      │
  │  CollectionDrawer   (saved effects panel)       │
  │  CloudModals        (create team/project/token) │
  └─────────────────────────────────────────────────┘

Priority 4 — ON DEMAND (not in JS bundle):
  ┌─────────────────────────────────────────────────┐
  │  ferrum-effects.css  (570 KB, loaded via <link>) │  ← media="print" + JS swap
   │  Google Fonts (Geist Sans + Mono)               │  ← display: swap
   └─────────────────────────────────────────────────┘
```

### 9.3 CSS Loading Strategy

```
Layer 0: anti-FOUC (385 bytes, inline in <head>)
  └── Background color for dark/light theme
   └── color-scheme: dark light declaration

Layer 1: Critical CSS (inline via critical.css import)
  └── Minimal layout styles for above-fold content

Layer 2: Full Tailwind bundle (174 KB, loaded as stylesheet)
  └── All utility classes
   └── Component-scoped styles

Layer 3: Effects CSS (570 KB, on-demand)
  └── Loaded via <link rel="stylesheet" media="print" />
  └── JavaScript switches to media="all" when effects view opens
  └── SWR caching: max-age=86400, stale-while-revalidate=604800
```

### 9.4 Optimization Opportunities

| Optimization | Current | Target | Impact | Effort |
|-------------|---------|--------|--------|--------|
| Effects data splitting | 424 KB monolith | ~50 KB per category chunk | High (75% reduction) | Medium |
| Icon consolidation | 47 import sites | String resolver pattern | Medium (fewer chunks) | Low (partially done) |
| Framework chunk | 234 KB | Defer non-critical framework | Medium | High (RSC streaming) |
| CSS subsetting | 174 KB full | Extract critical subset | Low | Medium |
| Image optimization | AVIF/WebP config | Add priority hints | Low | Low |

---

## 10. Security Architecture

### 10.1 Current Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS (5 layers)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  L1: RESPONSE HEADERS (next.config.ts)                          │
│  ├── Content-Security-Policy (dev: unsafe-inline; prod: 'self') │
│  ├── Strict-Transport-Security (2yr, includeSubDomains, preload)│
│  ├── X-Frame-Options: DENY                                     │
│  ├── X-Content-Type-Options: nosniff                            │
│  ├── Referrer-Policy: strict-origin-when-cross-origin           │
│  ├── Permissions-Policy (camera=(), mic=(), geo=())              │
│  ├── Cross-Origin-Opener-Policy: same-origin ✅                  │
│  ├── Cross-Origin-Resource-Policy: same-origin ✅                │
│  ├── X-Permitted-Cross-Domain-Policies: none ✅                  │
│  └── X-DNS-Prefetch-Control: on                                 │
│                                                                 │
│  L2: EDGE MIDDLEWARE (src/middleware.ts)                         │
│  ├── Bearer token auth (/api/cloud/*)                           │
│  ├── Timing-safe constant-time token comparison (XOR)           │
│  ├── Rate limiting (in-memory Maps, per-IP)                     │
│  │   ├── Auth: 10 req / 15 min                                  │
│  │   └── API: 100 req / min                                     │
│  ├── Periodic cleanup (5 min) to prevent memory leak            │
│  ├── Graceful degradation (no token configured → skip auth)    │
│  └── 429 responses with Retry-After header                      │
│                                                                 │
│  L3: API ROUTE HANDLERS                                         │
│  ├── Input validation (type, length, enum checks)               │
│  ├── try/catch error handling (11/12 routes)                    │
│  └── Structured error responses ({ error: string })             │
│                                                                 │
│  L4: CLIENT-SIDE SECURITY                                       │
│  ├── No eval() / new Function() / innerHTML                      │
│  ├── Syntax highlighting escapes HTML entities                  │
│  ├── dangerouslySetInnerHTML on static JSON-LD only             │
│  ├── No third-party scripts or analytics tracking               │
│  └── Playground preview in sandboxed iframe (srcdoc)            │
│                                                                 │
│  L5: BUILD-TIME                                                  │
│  ├── poweredByHeader: false (removes X-Powered-By)              │
│  ├── productionBrowserSourceMaps: false                         │
│  ├── reactStrictMode: true                                      │
│  └── compiler.removeConsole (excludes error, warn)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 CSP Migration Path

```
CURRENT (Production):
  script-src 'self';                                    ← Good (no unsafe-inline)
  style-src 'self' 'unsafe-inline' ...;                 ← Needs nonce/hashes

TARGET:
  script-src 'self' 'nonce-{NONCE}';                   ← Per-request nonce
  style-src 'self' 'nonce-{NONCE}' https://fonts...;    ← Per-request nonce
  frame-src 'self' blob:;                                ← For playground iframe

MIGRATION STEPS:
  1. Move JSON-LD scripts to external .json files + <script src>
  2. Move SW registration to external /register-sw.js
  3. Generate nonce in layout.tsx via Next.js headers API
  4. Apply nonce to all <Script> and <style> tags
  5. Use CSP hashes for Tailwind (or nonce with Tailwind v4)
```

### 10.3 Auth Future Architecture

```
CURRENT (Demo):                 TARGET (Production):
  Shared static token             Email + password (bcrypt/argon2id)
  Single password                 Multi-user support
   Token in localStorage          JWT in httpOnly secure cookie
  5min token expiry               1h access + 7d refresh tokens
  No user concept                 User entity with role/permissions
  No session revocation           Redis-backed revocation list
```

---

## 11. Testing Architecture

### 11.1 Current Test Suite

```
__tests__/
├── setup.ts                 ← Vitest global setup (jsdom)
├── routing.test.ts          ← SPA route alignment (17 ViewIds)
├── collection.test.ts       ← AppContext collection logic
├── utils.test.ts            ← cn() utility
├── cloud-store.test.ts      ← CloudStore CRUD operations
├── persistence.test.ts      ← File-based persistence
├── rate-limit.test.ts       ← Middleware rate limiting
├── api-routes.test.ts       ← 17 API integration tests (in-process)
└── footer.test.tsx          ← Footer component render

TOTAL: 95 tests, 0 skipped, 0 failures
```

### 11.2 Test Architecture Gaps

```
COVERAGE BY AREA:

  API Routes         ████████████████████ 17 tests  (78%)  ← Good
  State Management   ████████████░░░░░░░░  4 tests  (40%)  ← Needs view-level tests
  Utilities          ████░░░░░░░░░░░░░░░░  2 tests  (20%)  ← Needs hooks tests
  Components         ████░░░░░░░░░░░░░░░░  1 test   ( 1%)  ← 97% untested
  Visual/Render      ░░░░░░░░░░░░░░░░░░░░  0 tests  ( 0%)  ← No E2E
  Accessibility      ░░░░░░░░░░░░░░░░░░░░  0 tests  ( 0%)  ← No a11y testing
```

### 11.3 Target Testing Architecture

```
__tests__/
├── unit/                        ← Pure logic, no DOM
│   ├── cloud-store.test.ts
│   ├── persistence.test.ts
│   ├── rate-limit.test.ts
│   ├── utils.test.ts
│   ├── routing.test.ts
│   └── icon-resolver.test.ts
│
├── integration/                 ← API routes (in-process Next.js)
│   ├── api-routes.test.ts
│   └── middleware.test.ts
│
├── component/                   ← React Testing Library
│   ├── nav.test.tsx
│   ├── effects-view.test.tsx
│   ├── collection.test.tsx
│   ├── app-context.test.tsx
│   └── playground.test.tsx
│
├── hooks/                       ← RenderHook + Testing Library
│   ├── use-focus-trap.test.ts
│   ├── use-cloud-auth.test.ts
│   └── use-cloud-data.test.ts
│
├── a11y/                        ← axe-core + jest-axe
│   ├── nav.a11y.test.tsx
│   ├── effects-view.a11y.test.tsx
│   ├── cloud-dashboard.a11y.test.tsx
│   └── mega-menu.a11y.test.tsx
│
└── e2e/                         ← Playwright (future)
    ├── home.spec.ts
    ├── effects.spec.ts
    ├── playground.spec.ts
    └── cloud.spec.ts

TOOLS:
  vitest          ← Unit + integration + component
  @testing-library/react  ← Component rendering
  @testing-library/jest-dom  ← DOM assertions
  axe-core        ← Automated a11y checks
  playwright      ← E2E (future)
```

---

## 12. Build & Deployment Pipeline

### 12.1 Current Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│  CI PIPELINE: npm run ci                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │ typecheck│──►│   lint   │──►│   test   │──►│  build   │    │
│  │  tsc     │   │  eslint  │   │  vitest  │   │next build│    │
│  └──────────┘   └──────────┘   └──────────┘   └────┬─────┘    │
│       │              │              │               │          │
│       ▼              ▼              ▼               ▼          │
│    0 errors       0 errors      95/95 pass    3.2s, 14 pages    │
│                                                     │          │
│                                                     ▼          │
│                                              ┌──────────────┐  │
│                                              │    budget    │  │
│                                              │ check-budget │  │
│                                              └──────────────┘  │
│                                                     │          │
│                                                     ▼          │
│                                              All hard pass   │
│                                              4 soft warnings │
└─────────────────────────────────────────────────────────────────┘

DEPLOYMENT:
  next build → .next/ → next start (port 3000) → Caddy reverse proxy
  Auto-restart wrapper for sandbox stability
```

### 12.2 Target Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│  TARGET CI PIPELINE                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Stage 1: LINT & TYPECHECK (parallel)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  tsc --noEmit │  │    eslint    │  │  turbo lint (all pkgs) │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                 │
│  Stage 2: TEST (parallel per package)                           │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │
│  │ @ferrum/  │ │ @ferrum/  │ │ @ferrum/  │ │ apps/web  │       │
│  │ effects   │ │ cloud     │ │ ui        │ │           │       │
│  │ vitest    │ │ vitest    │ │ vitest    │ │ vitest    │       │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘       │
│                                                                 │
│  Stage 3: BUILD                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  turbo build  (parallel package builds, dependency order)│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Stage 4: QUALITY GATES                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ bundle budget│  │  a11y audit  │  │  visual regression    │  │
│  │ check-budget │  │  axe-core   │  │  (future: Playwright) │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                 │
│  Stage 5: DEPLOY                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  next build → Docker image → Deploy to edge/VM           │  │
│  │  Health check: GET /api/health → 200 OK                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 12.3 Build Configuration

```
TURBOPACK:  Enabled (default in Next.js 16)
MINIFICATION:  Next.js default (Terser → SWC in future)
SOURCE MAPS:  Disabled in production (saves ~8MB)
IMAGE OPT:   AVIF + WebP via next.config.ts images.formats
CONSOLE:      Removed in prod (except error + warn)
PACKAGE IMP:  lucide-react, sonner (tree-shaken at import level)
ANALYZER:    @next/bundle-analyzer (ANALYZE=true next build)
```

---

## 13. Decision Rationale

### DR-001: SPA-within-SSR Pattern

**Decision**: Use Next.js rewrites to map 17 SPA routes to `/`, with client-side routing via `usePathname()`.

**Context**: The platform has 18 content views that are purely client-side (no SEO benefit from SSR, heavy use of browser APIs). However, we want real URLs for each view (not hash routing) for user experience and link sharing.

**Alternatives considered**:
- 18 separate `page.tsx` files → Rejected: Each would be a 5-line wrapper importing the same client component. Adds maintenance burden with zero benefit.
- Hash routing (`/#/effects`) → Rejected: Poor UX, URLs not shareable, breaks browser back button expectations.
- Full MPA (no SPA) → Rejected: Loses instant navigation, increases server load, no benefit for non-SEO content.

**Rationale**: The rewrite pattern gives us real URLs, instant client-side navigation, and a single HTML shell to optimize. The SEO content is handled by `seo-content.tsx` (server-rendered, screen-reader-only).

**Consequences**: SPA views are not crawlable by search engines. This is acceptable because the marketing copy (hero, descriptions, feature list) IS server-rendered in `seo-content.tsx`. If specific views need crawling (blog, docs), they should be migrated to real pages (see Section 4.4).

### DR-002: No Global State Library

**Decision**: Use React Context (AppContext) for effects-related state and local `useState` for everything else. No Redux, Zustand, or Jotai.

**Context**: The app has 17 views, but only the effects view shares state (search, category, collection, detail modal). All other views are fully independent.

**Alternatives considered**:
- Zustand → Rejected: Adds a dependency for state that's already managed fine with Context. Overkill for 2 pieces of shared state.
- Redux Toolkit → Rejected: Far too heavy for this use case. Boilerplate vs. benefit ratio is negative.
- Jotai → Rejected: Interesting but adds complexity without solving a real problem.

**Rationale**: AppContext is 142 LOC, well-memoized, has zero stale closure risk, and is consumed by exactly 2 components (EffectsView + EffectDetailModal). Adding a state library would increase bundle size and cognitive load without benefit.

### DR-003: Dynamic Imports with ssr:false

**Decision**: All 26 SPA views use `next/dynamic` with `ssr: false`.

**Context**: Views use browser APIs (`window`, `localStorage`, `IntersectionObserver`, `requestAnimationFrame`). They cannot be server-rendered.

**Alternatives considered**:
- RSC with `"use client"` boundary → Rejected: Still attempts SSR on first load, causing hydration mismatch warnings. `ssr: false` is explicit and clean.
- Conditional rendering with `typeof window !== "undefined"` → Rejected: Causes hydration mismatch. Anti-pattern.

**Rationale**: `ssr: false` is the correct tool for components that require browser APIs. It cleanly separates server and client boundaries. Each view gets its own chunk for optimal code-splitting.

### DR-004: Tailwind 4 with oklch Colors

**Decision**: Use Tailwind CSS v4 with oklch color space for design tokens.

**Context**: Tailwind v4 was released with native CSS-first configuration, removing the need for `tailwind.config.js`. oklch provides perceptually uniform color spaces.

**Rationale**: Tailwind 4 reduces configuration surface. oklch allows mathematically precise light/dark theme generation (simply rotate the L channel). Combined with CSS custom properties, this gives us a robust theming system with zero runtime JS.

### DR-005: File-Based Cloud Persistence

**Decision**: Use JSON file with atomic writes (temp + rename) and debounced saving for the cloud store.

**Context**: The cloud feature is a demo/MVP. No real database is needed yet.

**Alternatives considered**:
- SQLite (better-sqlite3) → Rejected: Adds native dependency, complicates deployment. Overkill for demo data.
- Redis → Rejected: Adds infrastructure dependency. Cloud feature doesn't need sub-millisecond reads.
- In-memory only → Rejected: Data lost on server restart. Users would lose their demo teams/projects.

**Rationale**: File-based persistence is zero-dependency, survives restarts, and is fast enough for a single-instance demo. The atomic write pattern (write to .tmp, rename) prevents data corruption. The 200ms debounce coalesces rapid writes.

### DR-006: String-Based Icon Resolution

**Decision**: Icons in data files are referenced by string name (e.g., `icon: "Zap"`), resolved at render time via `icon-resolver.tsx`.

**Context**: Navigation data, playground presets, and effect categories all need icons.

**Alternatives considered**:
- Direct lucide-react imports in data files → Rejected: Makes data files impure (they become JS modules with side-effect imports). Spreads icon code across many chunks.
- Icon component registry (HOC) → Rejected: More complex than a simple string map.

**Rationale**: The string→icon map pattern keeps data files pure (they can be JSON if needed), consolidates icon code into one chunk, and enables `optimizePackageImports` to tree-shake unused icons. The O(1) `Record<string, LucideIcon>` lookup is negligible.

### DR-007: Monorepo Target (Not Microservices)

**Decision**: Target a modular monorepo (pnpm/npm workspaces + Turborepo), NOT microservices.

**Context**: The platform has clear domain boundaries (effects, content, cloud, UI) but is a single product deployed as one unit.

**Alternatives considered**:
- Stay monolithic → Current state works but limits future growth. 23,999 LOC in flat src/ is manageable but getting unwieldy.
- Microservices → Rejected: Massive operational overhead. The platform doesn't have the scale or team size to justify it.
- Separate packages in monorepo → Selected: Best balance of separation and simplicity.

**Rationale**: Turborepo + pnpm workspaces give us package boundaries, independent versioning, and parallel builds — without the operational complexity of microservices. The deployed artifact remains a single Next.js app.

---

## 14. Implementation Phases & Priorities

### Phase 1: Foundation Cleanup (1-2 days, LOW RISK)

Fix all audit findings before any architectural changes.

| # | Task | Source | Effort |
|---|------|--------|--------|
| 1.1 | Fix API doc examples (`rc-`/`fr-` → `roycss-`) | WARNING-3 | 5 min |
| 1.2 | Add `aria-label` to cloud login password | WARNING-4 | 5 min |
| 1.3 | Add `try/catch` to audit route | INFO-7 | 10 min |
| 1.4 | Remove dead `communityMenu` export | WARNING-1 | 5 min |
| 1.5 | Remove unused `_compact` parameter | INFO-6 | 5 min |
| 1.6 | Import version from package.json in health route | INFO-8 | 5 min |
| 1.7 | Unify 404 page design | INFO-1 | 30 min |
| 1.8 | Add `aria-modal` to ColorCustomizer | INFO-3 | 10 min |

**Verification**: `npm run ci` passes. Zero new warnings.

### Phase 2: Monorepo Scaffolding (1-2 days, LOW RISK)

| # | Task | Effort |
|---|------|--------|
| 2.1 | Initialize pnpm workspaces + turbo.json | 2h |
| 2.2 | Extract `@ferrum/tokens` (leaf package) | 1h |
| 2.3 | Extract `@ferrum/a11y` (leaf package) | 1h |
| 2.4 | Configure shared ESLint, TypeScript, Vitest configs | 2h |
| 2.5 | Update all imports to use `@ferrum/*` paths | 3h |

**Verification**: Build output identical. All 95 tests pass. No bundle size change.

### Phase 3: Data Package Extraction (2-3 days, MEDIUM RISK)

| # | Task | Effort |
|---|------|--------|
| 3.1 | Extract `@ferrum/effects` (split data by category) | 4h |
| 3.2 | Extract `@ferrum/content` (docs, blog, changelog, lessons, arch, playground) | 4h |
| 3.3 | Update dynamic imports to reference new package paths | 2h |
| 3.4 | Verify code splitting still works (bundle analysis) | 2h |

**Verification**: Bundle size unchanged or improved. All views functional.

### Phase 4: Component Library Extraction (3-5 days, HIGHER RISK)

| # | Task | Effort |
|---|------|--------|
| 4.1 | Extract `@ferrum/ui/primitives` (12 UI components) | 4h |
| 4.2 | Extract `@ferrum/ui/ferrum` (nav, effects, playground, sections) | 8h |
| 4.3 | Resolve cross-component dependencies (app-context) | 4h |
| 4.4 | Update all imports | 4h |

**Verification**: All views render identically. 0 TypeScript errors. E2E smoke test.

### Phase 5: Cloud Isolation (1-2 days, MEDIUM RISK)

| # | Task | Effort |
|---|------|--------|
| 5.1 | Extract `@ferrum/cloud` (store, persist, auth, middleware, API logic, hooks, types) | 4h |
| 5.2 | API routes become thin wrappers | 2h |

**Verification**: All cloud API tests pass. Auth flow works.

### Phase 6: Security Hardening (Parallel with Phase 3-5)

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 6.1 | Migrate CSP to nonce-based | 🔴 Critical | 4h |
| 6.2 | Fix contrast (create safe tokens, update files) | 🔴 Critical | 6h |
| 6.3 | Fix SW registration (external file or remove) | 🟡 High | 1h |
| 6.4 | Add ARIA menu roles to ThemeToggle | 🟡 High | 1h |

### Phase 7: Testing Expansion (2-3 days, ONGOING)

| # | Task | Effort |
|---|------|--------|
| 7.1 | Add component tests for Nav, EffectsView, Playground | 4h |
| 7.2 | Add hook tests (use-focus-trap, use-cloud-auth) | 2h |
| 7.3 | Add axe-core a11y tests for critical views | 3h |
| 7.4 | Set up Playwright for E2E smoke tests | 4h |

### Phase 8: Content Migration to RSC (FUTURE)

| # | Task | Dependencies | Effort |
|---|------|-------------|--------|
| 8.1 | Blog → MDX with generateStaticParams | Phase 3 | 6h |
| 8.2 | Docs → MDX with RSC streaming | Phase 3 | 8h |
| 8.3 | Changelog → MDX | Phase 3 | 4h |
| 8.4 | Add RSS feed for blog | 8.1 | 2h |
| 8.5 | Generate static category pages for effects | Phase 3 | 4h |

### Phase 9: Production Cloud Auth (FUTURE)

| # | Task | Dependencies | Effort |
|---|------|-------------|--------|
| 9.1 | Replace static token with bcrypt/argon2id | Phase 5 | 4h |
| 9.2 | Add JWT issuance + httpOnly cookie | Phase 5 | 6h |
| 9.3 | Add refresh token flow | 9.2 | 4h |
| 9.4 | Add user entity + registration | 9.2 | 6h |
| 9.5 | Migrate to real database (PostgreSQL/SQLite) | Phase 5 | 8h |
| 9.6 | Add distributed rate limiting (Redis/Upstash) | Phase 5 + infra | 4h |

---

### Priority Matrix

```
         HIGH IMPACT                                          LOW IMPACT
         ┌─────────────────────────────────────────┬─────────────────────────────────────────┐
  LOW   │  Phase 1: Cleanup (1-2 days)             │  Phase 7: Testing expansion (ongoing)   │
  EFFORT │  Phase 2: Monorepo scaffolding (1-2d)    │  Phase 6.4: ARIA menu roles (1h)        │
         │  Phase 6.2: Contrast fix (6h)            │                                         │
         ├─────────────────────────────────────────┼─────────────────────────────────────────┤
  HIGH  │  Phase 3: Data extraction (2-3 days)     │  Phase 8: Content → RSC (future)        │
  EFFORT │  Phase 4: Component extraction (3-5d)    │  Phase 9: Production auth (future)      │
         │  Phase 5: Cloud isolation (1-2 days)     │  Phase 6.1: CSP nonce migration (4h)    │
         └─────────────────────────────────────────┴─────────────────────────────────────────┘

RECOMMENDED ORDER:
  1. Phase 1 (quick wins, unblocks everything)
  2. Phase 2 (enables Phases 3-5)
  3. Phase 3 + Phase 6.2 (parallel — data extraction + contrast fix)
  4. Phase 4 (largest effort, do after data extraction is stable)
  5. Phase 5 (cloud isolation)
  6. Phase 7 (testing, ongoing throughout)
  7. Phase 8-9 (future, when team/resources allow)
```

---

## 15. Appendix: Key Metrics Reference

| Metric | Value | Source |
|--------|-------|--------|
| Total source LoC (src/) | 23,999 | Documentation Reconciliation |
| TS/TSX source files | 123 | Platform Audit Report |
| Component files (.tsx) | 69 | Documentation Reconciliation |
| Features (implemented) | 21 | Feature Registry |
| Components | 69 | Component Registry |
| SPA routes | 18 (17 rewrites + root `/`) | Route Registry |
| Static server pages | 4 (/, /cloud, /privacy, /terms) | Route Registry |
| API endpoints | 17 (13 routes, some multi-method) | API Registry |
| Runtime dependencies | 9 | package.json |
| Dev dependencies | 15 | package.json |
| Tests passing | 95/95 (0 skipped) | Platform Audit Report |
| Build time | ~3.2s | Performance Baseline Report |
| First-Load JS | ~546 KB raw | Performance Baseline Report |
| Initial CSS | ~174 KB | Performance Baseline Report |
| Effects CSS (on-demand) | ~570 KB | next.config.ts headers |
| Dynamic chunks | 59 | Performance Baseline Report |
| Security: Critical | 0 (post-fix) | Security Audit Report |
| Security: High | 3 (auth, rate limiting, IP spoofing — all demo-only) | Security Audit Report |
| A11y: Passing | 7/9 areas | Accessibility Audit Report |
| Git commits | 6 (clean linear) | Git Forensics Report |
| Branches | 2 (main + baseline) | Git Forensics Report |
| Circular dependencies | 0 | Phase 1 Audit |
| ViewId alignment mismatches | 0 | Platform Audit Report |
| Reduced-motion coverage | 13 JS files + global CSS | Platform Audit Report |

---

*This document is the authoritative architecture reference for the FerrumEngine platform. Update when architectural decisions change. Last updated: 2026-08-12 (v2.0).*)
