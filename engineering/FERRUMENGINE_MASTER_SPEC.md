# FERRUMENGINE MASTER SPECIFICATION

> **Generated**: Task ID E0 — Documentation & Specification Engineer
> **Date**: 2026-08-20
> **Method**: Systematic extraction from all documentation, source code, and git history
> **Principle**: Every claim is verified against actual code. Marketing aspirational content is clearly labeled.

---

## Terminology

| Symbol | Meaning |
|--------|----------|
| ✅ IMPLEMENTED | Code exists and is functional |
| 🟡 PARTIAL | Partially implemented, known gaps |
| 🔴 CLAIMED | Referenced in marketing/docs but NO code exists |
| ⚫ N/A | Not applicable to current codebase |

---

## 1. Product Vision

### 1.1 What the Website CLAIMS

From hero-section.tsx and overview-section.tsx:
- "Ferrum is a universal UI platform that unifies motion, visual effects, components, design tokens, and compiler optimization into one coherent system."
- "The operating system for modern interfaces."
- "Works with every framework. Zero runtime dependencies. Built for the age of AI-generated interfaces."

### 1.2 What ACTUALLY Exists

FerrumEngine is a **CSS effects library** with:
- 542 CSS effect classes across 35 categories (`src/lib/ferrum-effects-data.ts`, 3,807 LOC)
- A design token system with 14 scales and 5 output formats (`src/lib/ferrum-tokens/`)
- A Next.js 16 showcase website demonstrating the effects

### 1.3 Evidence

- `src/lib/ferrum-effects-data.ts:1-5` — "Effects: 542 | Categories: 35"
- `src/lib/docs-data.ts:35` — "FerrumEngine is a production-ready CSS effects library providing 542 hand-crafted effects across 35 categories"
- `src/lib/ferrum-tokens/index.d.ts:273-288` — FerrumTokens interface with 14 scales
- `FEATURE_REGISTRY.md:371-381` — Explicitly lists 6 concept-only features including Compiler, Runtime, Adapters, Physics, VFX

### 1.4 Gap Analysis

The "universal UI platform" and "operating system" framing is **marketing aspirational language**. The actual product is a CSS effects library. The broader platform vision (compiler, runtime, VFX, AI) exists only as marketing content and roadmap items with no implementation.

---

## 2. Core CSS Effects Library

### 2.1 Effect Count: 542

| Claim | Actual | Evidence |
|-------|--------|----------|
| 542 effects | ✅ 542 | `ferrum-effects-data.ts:3` — confirmed in file header |
| 35 categories | ✅ 35 | `ferrum-effects-data.ts:3` — confirmed; 35 category files in `src/lib/effects/by-category/` |
| Zero JavaScript runtime | ✅ True | Effects are pure CSS classes (`.roycss-*`), no JS required |
| Zero dependencies | ✅ True | CSS file has no import requirements |
| GPU accelerated | 🟡 Partial | CSS uses `transform` and `opacity` (composited), but not all effects are optimized |

### 2.2 Effect Generation Pipeline

| Claim | Actual | Evidence |
|-------|--------|----------|
| Python source of truth | ✅ True | `tools/roycss-parts/` — 15 modules, 12,462 LOC |
| Master orchestrator | ✅ True | `tools/generate-roycss.py` (210 LOC) |
| V3 pipeline | ✅ True | `tools/generate_roycss_v3.py` (447 LOC) |
| Sync/branding bridge | ✅ True | `tools/sync-ferrum-files.py` (133 LOC) |
| 5 newer modules not yet integrated | ✅ True | `FEATURE_RECOVERY_MATRIX.md:176` — borders, cursor, forms, navigation, visual_effects |
| Next-gen effects (design_new_effects.py) | ✅ True | 1,298 LOC using @starting-style, @property, scroll-driven, etc. Not in production |

### 2.3 Effect Categories

35 categories exist in production: 3D, attention, background, blend-modes, borders, buttons, cards, clip-path, cursor, entrance, exit, filter, forms, glass, hover, image-hover, loading, mask, micro-interaction, misc, modern-css, nature, navigation, offset-path, particles, property, scroll, specialized, svg, text, transform, transition, unique, visual-effects

### 2.4 Effects CSS File

- `public/ferrum-effects.css` — 24,141 LOC, 570 KB raw
- Loaded on-demand (not in initial bundle)
- Contains all keyframes and effect class definitions

---

## 3. Design Token System

### 3.1 Token Scales

| Claim | Actual | Evidence |
|-------|--------|----------|
| 16 semantic color scales | ✅ 16 | `index.d.ts:20-37` — primary, secondary, accent, success, warning, danger, info, muted, foreground, background, border, card, popover, ring, input, destructive |
| Spacing scale | ✅ 25 values | `index.d.ts:40-76` — 0 through 96 |
| Radius scale | ✅ 9 values | `index.d.ts:79-90` |
| Font family/sizes/weights | ✅ All present | `index.d.ts:92-117` |
| Line height/letter spacing | ✅ Present | `index.d.ts:118-138` |
| Shadow scale | ✅ 7 values | `index.d.ts:140-158` |
| Duration scale | ✅ 6 values | `index.d.ts:160-167` |
| Easing scale | ✅ 9 values | `index.d.ts:168-180` |
| Breakpoint scale | ✅ 5 values | `index.d.ts:182-189` |
| Z-index scale | ✅ 8 values | `index.d.ts:191-201` |
| Opacity scale | ✅ 21 values | `index.d.ts:203-226` |

### 3.2 Token Output Formats

| Format | Claimed | Implemented | Evidence |
|--------|---------|-------------|----------|
| CSS custom properties | ✅ | ✅ | `tokensToCssVariables()` in `index.d.ts:234` |
| Tailwind config | ✅ | ✅ | `tokensToTailwindConfig()` in `index.d.ts:242` |
| SCSS variables | ✅ | ✅ | `tokensToScssVariables()` in `index.d.ts:250` |
| JSON | ✅ | ✅ | `tokensToJson()` in `index.d.ts:258` |
| TypeScript types | ✅ | ✅ | `tokensToTypeScriptTypes()` in `index.d.ts:268` |

### 3.3 Token API

| Endpoint | Implemented | Evidence |
|----------|-------------|----------|
| `/api/tokens` (GET) | ✅ | `src/app/api/tokens/route.ts` — Returns token metadata and sample values |

### 3.4 Gap Analysis

The token system is genuinely implemented. The "16 semantic scales" claim matches the 16 color scales plus 13 non-color scales (total 14 export categories). The "5 output formats" claim is accurate. The tokens are used in the `/api/tokens` endpoint and wired into the platform.

---

## 4. Framework Adapters

### 4.1 What the Website CLAIMS

From platform-architecture.tsx:
- 9 framework adapters: React, Vue, Svelte, Angular, Next.js, Nuxt, Astro, Vanilla, Solid
- All labeled "Stable" except Solid ("Beta")

### 4.2 What ACTUALLY Exists

The CSS effects are framework-agnostic by nature (they are CSS classes). No dedicated adapter packages exist. The docs-data.ts provides usage examples for React, Vue, Svelte, Angular, and mentions Preact, Solid, and Astro as "load the CSS via <link>".

### 4.3 Evidence

- `platform-architecture.tsx:138-148` — Lists 9 frameworks with "stable"/"beta" status
- `docs-data.ts:221-222` — "FerrumEngine is framework-agnostic by design. Since it's pure CSS, it works with every frontend framework"
- `FEATURE_REGISTRY.md:378` — Explicitly lists "Framework Adapters (Vue, Svelte, Angular)" as concept-only

### 4.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED** — There are no adapter packages. The "framework integration" is simply "include the CSS file." This is honest in docs-data.ts but misleading in the platform-architecture.tsx visualization where adapters are shown as "Stable."

---

## 5. Ferrum Runtime

### 5.1 What the Website CLAIMS

From platform-architecture.tsx:
- "Zero-dependency execution layer. Framework-agnostic core with hot-swap and tree-shaking."
- Status: "Stable"

### 5.2 What ACTUALLY Exists

No Ferrum Runtime package or module exists in the codebase.

### 5.3 Evidence

- `FEATURE_REGISTRY.md:377` — "Ferrum Runtime (zero-dependency execution)" listed as concept-only
- No `runtime/` directory, no `ferrum-runtime` package

### 5.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 6. Motion Engine

### 6.1 What the Website CLAIMS

From overview-section.tsx:
- "Spring physics engine, scroll-driven animations, gesture recognition, and timeline composition"
- "Not just movement — motion with purpose."
- "542+ ready-to-use effects, Zero jank on mobile"

From roadmap-section.tsx:
- "Ferrum Motion" — Stable
- "Ferrum Motion Engine" — Beta

### 6.2 What ACTUALLY Exists

- 542 CSS animation effects (verified) — these are static CSS classes with `@keyframes` and transitions
- No JavaScript motion engine (no spring physics, no gesture recognition, no timeline composition)
- Scroll-driven animations exist as CSS classes in the generation pipeline (`scroll_easing_presets.py`) and in `design_new_effects.py` but are NOT in the production effects

### 6.3 Evidence

- `FEATURE_REGISTRY.md:379` — "Physics Engine (spring physics, RK4)" listed as concept-only
- `ferrum-effects-data.ts` — Contains only CSS class definitions, no JS runtime
- `tools/roycss-parts/scroll_easing_presets.py` — Contains scroll-driven effect definitions (not in production)
- `tools/design_new_effects.py` — Uses `@starting-style` and scroll-driven animations (not in production)

### 6.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED** — The motion effects (CSS animations) exist, but the "Motion Engine" as a JavaScript runtime (spring physics, gesture recognition, timeline composition) does not exist.

---

## 7. VFX Engine

### 7.1 What the Website CLAIMS

From overview-section.tsx:
- "Glass morphism, liquid effects, atmospheric particles, distortion shaders, energy fields, neon borders"
- "Running at 60fps via Houdini Paint API worklets. No WebGL required. No canvas overhead. Pure CSS."
- "7 Paint API worklets, Hardware accelerated"

From roadmap-section.tsx:
- "Ferrum VFX" — Beta

### 7.2 What ACTUALLY Exists

- CSS glass morphism effects (as CSS classes in the effects library)
- CSS neon/glow effects (as CSS classes)
- No Houdini Paint API worklets
- No particle systems
- No distortion shaders
- No "VFX Engine" module

### 7.3 Evidence

- `FEATURE_REGISTRY.md:380` — "VFX Engine (particles, visual effects)" listed as concept-only
- `tools/roycss-parts/visual_effects.py` — Contains advanced CSS effects (border beams, neon, aurora) — but these are NOT yet in production effects
- No `paint-worklet` files anywhere in the codebase

### 7.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED** — Basic visual CSS effects exist. Houdini Paint API worklets, particle systems, and distortion shaders do not.

---

## 8. Component System

### 8.1 What the Website CLAIMS

From overview-section.tsx:
- "16 production-ready components designed around intent, not implementation"
- "A hero section knows it's a hero. A pricing card knows it's a pricing card"
- "Semantic HTML with ARIA built in, theme-aware, and composable"

From platform-architecture.tsx:
- "Ferrum Components" — Status: Stable
- "16 semantic UI primitives. Accessible by default, theme-aware, and composable."

### 8.2 What ACTUALLY Exists

The platform website itself uses shadcn/ui components (12 UI primitives in `src/components/ui/`) and custom Ferrum components (53 files in `src/components/ferrum/`). However, there is NO standalone reusable component library/package for external consumers.

### 8.3 Evidence

- `src/components/ui/` — 12 shadcn/ui primitives (Button, Badge, Card, Input, Label, ModalOverlay, ScrollArea, Select, Slider, Skeleton, Table, Tooltip)
- `registry/cross-reference.md:123-127` — Lists dead/unused UI components (button.tsx, card.tsx, label.tsx not imported)
- No `@ferrum/components` package

### 8.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED** — The website has UI components for its own use, but there is no external component library. The "16 semantic components" claim refers to a planned product, not existing code.

---

## 9. Ferrum Compiler

### 9.1 What the Website CLAIMS

From overview-section.tsx:
- "A 9-pass compilation pipeline that parses, analyzes, tree-shakes, and optimizes your CSS"
- "9-pass optimization, Tree-shaking & DCE, 5 output formats, Runtime theming, Cross-platform tokens, Dead code elimination"

From architecture-section.tsx:
- "Parse → Analyze → Optimize → Tree-shake → Output"

From roadmap-section.tsx:
- "Ferrum Compiler" — Beta

### 9.2 What ACTUALLY Exists

No compiler exists. The CSS effects are pre-generated from Python scripts and shipped as static files.

### 9.3 Evidence

- `FEATURE_REGISTRY.md:376` — "Ferrum Compiler (9-pass pipeline)" listed as concept-only
- No `compiler/` directory, no compilation logic in any source file
- `tools/generate-roycss.py` — This is a build-time Python script, not a CSS compiler

### 9.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 10. Ferrum Physics

### 10.1 What the Website CLAIMS

From platform-architecture.tsx:
- "Realistic forces, collision detection, constraint solver, and rigid/soft body dynamics"
- Status: "Stable"

### 10.2 What ACTUALLY Exists

Nothing. No physics engine of any kind.

### 10.3 Evidence

- `FEATURE_REGISTRY.md:379` — "Physics Engine (spring physics, RK4)" listed as concept-only
- No physics-related code anywhere in `src/`

### 10.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 11. Ferrum Paint (Houdini)

### 11.1 What the Website CLAIMS

From roadmap-section.tsx:
- "Ferrum Paint (Houdini)" — Beta

From overview-section.tsx:
- "7 Paint API worklets"

### 11.2 What ACTUALLY Exists

Nothing. No Houdini Paint API worklets.

### 11.3 Evidence

- No `paint-worklet` or `houdini` files in codebase
- Grep for "PaintWorklet", "registerPaint" returns no results

### 11.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 12. Ferrum Layout

### 12.1 What the Website CLAIMS

From roadmap-section.tsx:
- "Ferrum Layout" — Beta

### 12.2 What ACTUALLY Exists

Nothing. No layout system.

### 12.3 Evidence

- No layout-related packages or modules

### 12.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 13. Ferrum A11y

### 13.1 What the Website CLAIMS

From roadmap-section.tsx:
- "Ferrum A11y" — Beta

### 13.2 What ACTUALLY Exists

The platform website itself has good accessibility practices (WCAG 2.2 AA), but there is no separate accessibility library/package.

### 13.3 Evidence

- `ACCESSIBILITY_AUDIT_REPORT.md` — 7/9 categories PASS
- `src/hooks/use-focus-trap.ts` — Focus trap hook (internal use only)
- `src/lib/body-scroll-lock.ts` — Body scroll lock (internal use only)

### 13.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED** — Website has a11y, but no standalone a11y package.

---

## 14. Ferrum CLI

### 14.1 What the Website CLAIMS

From roadmap-section.tsx:
- "Ferrum CLI" — Alpha
- Referenced in blog content as `ferrum init`, `ferrum build`

### 14.2 What ACTUALLY Exists

Nothing. No CLI tool.

### 14.3 Evidence

- `FEATURE_REGISTRY.md:375` — "Ferrum CLI (`ferrum init`, `ferrum build`)" listed as concept-only

### 14.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 15. Ferrum Plugin SDK

### 15.1 What the Website CLAIMS

From roadmap-section.tsx:
- "Ferrum Plugin SDK" — Alpha

### 15.2 What ACTUALLY Exists

Nothing.

### 15.3 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 16. Ferrum Studio

### 16.1 What the Website CLAIMS

From platform-architecture.tsx:
- "Visual interface builder with drag-and-drop canvas, live preview, and export to code"
- Status: "Planned"

### 16.2 What ACTUALLY Exists

The Playground 2.0 is a code editor with live preview, but it is NOT a visual/drag-and-drop builder.

### 16.3 Evidence

- `src/components/ferrum/playground/` — Code-based playground, not visual builder
- No drag-and-drop canvas, no visual component placement

### 16.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED** — The Playground is a code playground, not a visual builder.

---

## 17. Ferrum AI

### 17.1 What the Website CLAIMS

From platform-architecture.tsx:
- "Intent-to-render intelligence. Natural language to UI, effect recommendation, code generation"
- Status: "Planned" (renamed "Research" in roadmap)

### 17.2 What ACTUALLY Exists

Nothing.

### 17.3 Evidence

- No AI/ML code anywhere in the codebase

### 17.4 Gap Analysis

🔴 **CLAIMED BUT NOT IMPLEMENTED**

---

## 18. Ferrum Cloud

### 18.1 What the Website CLAIMS

From platform-architecture.tsx:
- "One-click deploy, edge CDN distribution, analytics dashboard, and team collaboration"
- Status: "Planned"

### 18.2 What ACTUALLY Exists

A demo cloud dashboard at `/cloud` with:
- Team CRUD (`/api/cloud/teams`)
- Project management (`/api/cloud/teams/[id]/projects`)
- Token management (`/api/cloud/projects/[id]/tokens`)
- Component listing (`/api/cloud/projects/[id]/components`)
- Audit logging (`/api/cloud/audit`)
- Authentication (bearer token with timing-safe comparison)
- File-based persistence (`src/lib/persist.ts`)
- In-memory store fallback

### 18.3 Evidence

- `src/app/cloud/` — 7 component files
- `src/lib/cloud-store.ts` — Data store with teams, projects, tokens, audit
- `src/lib/persist.ts` — File-based JSON persistence with atomic writes
- `src/middleware.ts` — Auth and rate limiting
- 12 API routes (A006–A019 in `registry/apis.json`)

### 18.4 Gap Analysis

🟡 **PARTIAL** — The dashboard exists as a demo. Missing: one-click deploy, edge CDN, real analytics (analytics endpoint exists but is a no-op rate-limited POST), actual multi-user auth.

---

## 19. Showcase Website

### 19.1 What EXISTS (Verified)

| Feature | Status | Evidence |
|---------|--------|----------|
| Homepage with hero, 12 sections | ✅ | `src/components/ferrum/sections/home/` (12 files) |
| Effects gallery with search/filter | ✅ | `effects-view.tsx`, `effect-preview.tsx`, 542 effects |
| Effect detail modal | ✅ | `effects-detail-modal.tsx` |
| Collection drawer | ✅ | `collection-drawer.tsx` |
| Playground 2.0 | ✅ | `playground/` (6 files) |
| Architecture deep dive | ✅ | `architecture-deep-dive.tsx`, `architecture-data.ts` |
| Documentation viewer | ✅ | `docs-view.tsx`, `docs-data.ts` (10 sections) |
| Interactive docs | ✅ | `interactive-docs-view.tsx` (8 lessons) |
| Blog | ✅ | `blog-view.tsx` (6 posts, hardcoded) |
| Changelog | ✅ | `changelog-view.tsx` (8 entries) |
| Component catalog | ✅ | `component-catalog.tsx` |
| Global search (Cmd+K) | ✅ | `global-search.tsx`, `search-index.ts` |
| Cloud dashboard | ✅ | `/cloud` route, 7 components, 12 API routes |
| Dark theme toggle | ✅ | `theme-toggle.tsx`, `theme-provider.tsx` |
| Color customizer | ✅ | `color-customizer.tsx` |
| Navigation (desktop + mobile + mega menu) | ✅ | `nav.tsx`, `nav-mega-menu.tsx`, `nav-mobile.tsx` |
| Scroll progress | ✅ | `scroll-progress.tsx` |
| SEO (JSON-LD, meta tags, sitemap) | ✅ | `seo-content.tsx`, `view-meta.tsx`, `layout.tsx` |
| Error handling (error, 404, loading) | ✅ | `error.tsx`, `not-found.tsx`, `loading.tsx`, `global-error.tsx` |
| SPA routing | ✅ | 19 views via `home-client.tsx` with `next/dynamic` |
| Content section views (10 pages) | ✅ | principles, story, platform-architecture, hall-of-fame, showcase, learning, enterprise, enterprise-components, vision, community |
| API endpoints | ✅ | 19 endpoints (A001–A019) |
| Security headers | ✅ | Comprehensive (CSP, HSTS, COOP, CORP, etc.) |
| Rate limiting | ✅ | Auth (10/15min), API (100/min), analytics (30/min) |
| Persistent storage | ✅ | File-based JSON with atomic writes |
| Tests | ✅ | 219 tests, 19 files, all passing |
| WCAG 2.2 AA accessibility | 🟡 | 7/9 PASS, 1 PARTIAL (contrast), 0 FAIL |
| Supabase integration | 🟡 | Schema and client exist, but using in-memory fallback |

---

## 20. Build & Deployment

### 20.1 What EXISTS

| Feature | Status | Evidence |
|---------|--------|----------|
| Next.js 16 with Turbopack | ✅ | `package.json`, `next.config.ts` |
| TypeScript strict mode | ✅ | `tsconfig.json` |
| Tailwind CSS v4 | ✅ | `postcss.config.mjs`, `globals.css` |
| shadcn/ui components | ✅ | `src/components/ui/` (12 primitives) |
| ESLint | ✅ | `eslint.config.mjs` |
| Vitest | ✅ | `vitest.config.ts`, 219 tests |
| Playwright E2E | ✅ | `e2e/` directory (5 spec files) |
| GitHub Actions CI | ✅ | `.github/workflows/ci.yml`, `release.yml` |
| Docker | ✅ | `Dockerfile` |
| Caddy config | ✅ | `Caddyfile` |
| Service worker | ✅ | `public/sw.js` |

---

## 21. API Specification

### 21.1 Public Endpoints

| ID | Route | Method | Auth | Status | Evidence |
|----|-------|--------|------|--------|----------|
| A001 | `/api` | GET | No | ✅ | `src/app/api/route.ts` |
| A002 | `/api/health` | GET | No | ✅ | `src/app/api/health/route.ts` |
| A003 | `/api/css` | GET | No | ✅ | `src/app/api/css/route.ts` |
| A004 | `/api/tokens` | GET | No | ✅ | `src/app/api/tokens/route.ts` |
| A005 | `/api/analytics` | POST | No | ✅ | `src/app/api/analytics/route.ts` |

### 21.2 Cloud Endpoints (Auth Required)

| ID | Route | Method | Status | Evidence |
|----|-------|--------|--------|----------|
| A006 | `/api/cloud/auth` | POST | ✅ | `src/app/api/cloud/auth/route.ts` |
| A007 | `/api/cloud/auth` | DELETE | ✅ | `src/app/api/cloud/auth/route.ts` |
| A008 | `/api/cloud/teams` | GET | ✅ | `src/app/api/cloud/teams/route.ts` |
| A009 | `/api/cloud/teams` | POST | ✅ | `src/app/api/cloud/teams/route.ts` |
| A010 | `/api/cloud/teams/[teamId]` | GET | ✅ | `src/app/api/cloud/teams/[teamId]/route.ts` |
| A011 | `/api/cloud/teams/[teamId]` | PUT | ✅ | `src/app/api/cloud/teams/[teamId]/route.ts` |
| A012 | `/api/cloud/teams/[teamId]` | DELETE | ✅ | `src/app/api/cloud/teams/[teamId]/route.ts` |
| A013 | `/api/cloud/teams/[teamId]/projects` | GET | ✅ | `src/app/api/cloud/teams/[teamId]/projects/route.ts` |
| A014 | `/api/cloud/teams/[teamId]/projects` | POST | ✅ | `src/app/api/cloud/teams/[teamId]/projects/route.ts` |
| A015 | `/api/cloud/projects/[projectId]/components` | GET | ✅ | `src/app/api/cloud/projects/[projectId]/components/route.ts` |
| A016 | `/api/cloud/projects/[projectId]/tokens` | GET | ✅ | `src/app/api/cloud/projects/[projectId]/tokens/route.ts` |
| A017 | `/api/cloud/projects/[projectId]/tokens` | POST | ✅ | `src/app/api/cloud/projects/[projectId]/tokens/route.ts` |
| A018 | `/api/cloud/tokens/[tokenId]` | PUT | ✅ | `src/app/api/cloud/tokens/[tokenId]/route.ts` |
| A019 | `/api/cloud/audit` | GET | ✅ | `src/app/api/cloud/audit/route.ts` |

---

## 22. Summary: What Exists vs. What's Claimed

| Category | Website Claims | Actually Implemented | Gap |
|----------|---------------|---------------------|-----|
| CSS Effects (542) | ✅ | ✅ | None |
| Design Tokens | ✅ 16 scales, 5 formats | ✅ 14+ scales, 5 formats | Minor (count differs) |
| Framework Adapters (9) | ✅ Stable | 🔴 No adapter packages | Major |
| Ferrum Runtime | ✅ Stable | 🔴 Does not exist | Total |
| Motion Engine (JS) | ✅ Stable + Beta | 🔴 No JS runtime | Total |
| Physics Engine | ✅ Stable | 🔴 Does not exist | Total |
| VFX Engine (Paint API) | ✅ Beta | 🔴 No worklets | Total |
| Component System (16) | ✅ Stable | 🔴 No external library | Total |
| Compiler (9-pass) | ✅ Beta | 🔴 Does not exist | Total |
| Layout System | ✅ Beta | 🔴 Does not exist | Total |
| A11y Package | ✅ Beta | 🔴 No external package | Total |
| CLI | 🟡 Alpha | 🔴 Does not exist | Total |
| Plugin SDK | 🟡 Alpha | 🔴 Does not exist | Total |
| Studio (Visual Builder) | 🟡 Planned | 🔴 Code playground only | Total |
| AI | 🟡 Research | 🔴 Does not exist | Total |
| Cloud Dashboard | 🟡 Planned | 🟡 Demo exists | Partial |
| Showcase Website | ✅ | ✅ | None |

**Bottom line**: The website is a well-built showcase for a CSS effects library. The "platform" vision (10 subsystems, 14 packages, 9 framework adapters, compiler, runtime, VFX, physics, AI) is aspirational marketing with no implementation. The actual product value is the 542 CSS effects and the design token system.
