# DOCUMENTATION INDEX — FerrumEngine/FerrumCSS Platform

> **Generated**: Task ID E0 — Documentation & Specification Engineer
> **Date**: 2026-08-20
> **Scope**: All .md files in project root, docs/adr/, registry/, key component source files, and deleted git-history scripts

---

## Summary

| Metric | Value |
|--------|-------|
| Root .md files indexed | 11 |
| ADRs indexed | 7 |
| Registry files indexed | 6 |
| Component source files analyzed | 7 |
| Deleted git-history scripts analyzed | 5 |
| **Total documents** | **36** |

---

## 1. Root-Level Documents

### 1.1 ARCHITECTURE_DESIGN.md

- **Filename**: `ARCHITECTURE_DESIGN.md`
- **Type**: Architecture document
- **Purpose**: Full platform architecture — current state analysis, target state design, component dependency graph, data flow diagrams, decision rationale, and phased migration path
- **Version/Date**: v2.0, 2026-08-12
- **Author**: Architecture Design Engineer (Task ID: 4)
- **Product Area**: Entire platform
- **Requirements Extracted**:
  - Monolithic Next.js 16 app (Turbopack) serving as marketing/showcase + functional tool suite
  - 542 CSS effects, live playground, interactive docs, cloud dashboard
  - Target architecture: modular monorepo with separate packages for tokens, effects, runtime, compiler
  - 3-phase implementation path (Foundation, Core Platform, Advanced Features)
- **Features Extracted**: Documents the existing 25 features in the feature registry, plus target features (compiler, runtime, VFX, physics engine, framework adapters)
- **Architecture Decisions**:
  - SPA routing via `next/dynamic` (ADR-001)
  - Tailwind CSS v4 (ADR-002)
  - shadcn/ui primitives (ADR-003)
  - JWT auth (ADR-004)
  - Supabase optional (ADR-005)
  - Per-category lazy loading (ADR-006)
  - Security headers (ADR-007)
- **Dependencies**: None
- **Credibility**: **HIGH** — Based on actual code analysis. However, the "Target Architecture" section describes features that do not yet exist in code (compiler, runtime, VFX, physics). The "Current State" section is accurate.

### 1.2 FEATURE_REGISTRY.md

- **Filename**: `FEATURE_REGISTRY.md`
- **Type**: Feature inventory
- **Purpose**: Permanent source of truth for all platform features
- **Version/Date**: Last updated 2026-08-19
- **Author**: Registry Accuracy Agent (Task ID: p3)
- **Product Area**: All features
- **Requirements Extracted**: 25 features catalogued (F001–F025), with implementation files, test coverage, known issues, git history, and last-verified dates
- **Features Extracted**:
  - 23 working features (F001–F017, F018–F025)
  - 2 partial features (F004 mega menu missing keyboard nav, F016 a11y partial)
  - 0 missing features
  - 6 concept-only features (no implementation): Ferrum CLI, Compiler, Runtime, Framework Adapters (beyond React), Physics Engine, VFX Engine
- **Architecture Decisions**: None (descriptive only)
- **Dependencies**: None
- **Credibility**: **HIGH** — Auto-generated from audit with file-level verification. Honest about concept-only features.

### 1.3 FEATURE_RECOVERY_MATRIX.md

- **Filename**: `FEATURE_RECOVERY_MATRIX.md`
- **Type**: Recovery audit
- **Purpose**: Documents what was recovered from deleted scripts and what was discarded
- **Version/Date**: 2026-08-12
- **Author**: Feature Recovery Engineer (Task ID: 2)
- **Product Area**: Build tooling and effects pipeline
- **Requirements Extracted**: 24 KEEP files recovered to `/tools/`, 28 ARCHIVE files, 16 DISCARD files
- **Features Extracted**: The effects generation pipeline (15 Python modules, 12,462 LOC) is the authoritative source of CSS effect definitions
- **Architecture Decisions**: The platform's core CSS effects are generated from Python source modules, not hand-written
- **Dependencies**: `tools/roycss-parts/`, `tools/generate-roycss.py`, `tools/sync-ferrum-files.py`
- **Credibility**: **HIGH** — Direct git analysis, file-level evidence

### 1.4 VERIFICATION_REPORT.md

- **Filename**: `VERIFICATION_REPORT.md`
- **Type**: Independent verification
- **Purpose**: Full from-scratch verification — no prior agent claims trusted
- **Version/Date**: 2025-07-14 (v1.1.0-rebuild), updated 2026-08-19 (v1.3.0)
- **Author**: Independent Verification Engineer (Tasks 19-20)
- **Product Area**: Build, tests, routes, components, API, security
- **Requirements Extracted**:
  - TypeScript: 0 errors
  - ESLint: 0 errors
  - 219/219 tests passing (19 files)
  - 35/35 verification checks passed
  - 19 SPA routes, 19 API endpoints, 82 components, 25 features
- **Features Extracted**: All existing features verified working
- **Architecture Decisions**: None (verification only)
- **Dependencies**: None
- **Credibility**: **HIGHEST** — Independent verification with zero trust of prior claims

### 1.5 PLATFORM_AUDIT_REPORT.md

- **Filename**: `PLATFORM_AUDIT_REPORT.md`
- **Type**: Platform audit
- **Purpose**: Full platform audit — every component, route, link, form, animation, and interaction
- **Version/Date**: 2026-08-12
- **Author**: Platform Audit Engineer (Task ID: 3)
- **Product Area**: Full platform
- **Requirements Extracted**: 0 CRITICAL, 1 WARNING (7 placeholder nav items), 11 INFO observations
- **Features Extracted**: 108-feature inventory (from original audit)
- **Architecture Decisions**: None (audit only)
- **Dependencies**: None
- **Credibility**: **HIGH** — Thorough component-by-component analysis

### 1.6 SECURITY_AUDIT_REPORT.md

- **Filename**: `SECURITY_AUDIT_REPORT.md`
- **Type**: Security audit
- **Purpose**: Full security assessment with headers, CSP, auth, and input validation analysis
- **Version/Date**: 2026-08-12
- **Author**: Security & A11y Engineer
- **Product Area**: Security
- **Requirements Extracted**: 7 findings (0 critical, 3 high accepted-risk, 2 medium fixed, 2 low fixed)
- **Features Extracted**: Comprehensive security header suite, CSP, rate limiting, timing-safe auth
- **Architecture Decisions**: Strict CSP in production, `style-src 'unsafe-inline'` accepted as Tailwind trade-off
- **Dependencies**: `next.config.ts` (header config), `src/middleware.ts` (auth + rate limiting)
- **Credibility**: **HIGH** — Evidence-based with specific file/line references

### 1.7 ACCESSIBILITY_AUDIT_REPORT.md

- **Filename**: `ACCESSIBILITY_AUDIT_REPORT.md`
- **Type**: WCAG 2.2 AA audit
- **Purpose**: Comprehensive accessibility assessment
- **Version/Date**: 2026-08-12
- **Author**: Security & A11y Engineer
- **Product Area**: Accessibility
- **Requirements Extracted**: 7/9 categories PASS, 1 PARTIAL (color contrast), 0 FAIL
- **Features Extracted**: Skip link, focus management, reduced motion, focus traps, ARIA usage, keyboard navigation
- **Architecture Decisions**: WCAG 2.2 AA target standard
- **Dependencies**: Multiple component files
- **Credibility**: **HIGH** — Specific fix references with before/after states

### 1.8 PERFORMANCE_BASELINE_REPORT.md

- **Filename**: `PERFORMANCE_BASELINE_REPORT.md`
- **Type**: Performance report
- **Purpose**: Performance budget baseline with metrics and bundle analysis
- **Version/Date**: 2026-08-12
- **Author**: Performance Optimization Engineer
- **Product Area**: Performance
- **Requirements Extracted**: First-load JS ~560KB (186KB gzip), CSS 174KB (58KB gzip), build time 7.6s, 59 JS chunks total
- **Features Extracted**: Effects CSS (570KB) on-demand loaded, per-category lazy loading, performance budgets
- **Architecture Decisions**: 600KB first-load JS budget, 100KB CSS budget
- **Dependencies**: Build tooling
- **Credibility**: **HIGH** — Measured metrics with specific chunk sizes

### 1.9 GIT_FORENSICS_REPORT.md

- **Filename**: `GIT_FORENSICS_REPORT.md`
- **Type**: Git history analysis
- **Purpose**: Complete commit timeline and file change analysis
- **Version/Date**: 2026-08-12
- **Author**: Git Forensics Engineer
- **Product Area**: Repository history
- **Requirements Extracted**: 6 linear commits, 222→183 files (39 deleted), 89,552 lines in initial commit
- **Features Extracted**: Initial commit was monolithic (entire platform in one shot), scripts purged in commit 2
- **Architecture Decisions**: None (forensic analysis only)
- **Dependencies**: Git history
- **Credibility**: **HIGHEST** — Direct git log analysis

### 1.10 FINAL_RECONCILIATION_REPORT.md

- **Filename**: `FINAL_RECONCILIATION_REPORT.md`
- **Type**: Reconciliation report
- **Purpose**: Reconciles all 22-phase rebuild changes
- **Version/Date**: 2025-07-14 (v1.1.0-rebuild)
- **Author**: Final Reconciliation & Release Engineer (Tasks 21-22)
- **Product Area**: Full platform
- **Requirements Extracted**: Zero features lost, 175 tests passing, 100% verification score
- **Features Extracted**: Documents the complete change log across 22 phases
- **Architecture Decisions**: None (reconciliation of existing decisions)
- **Dependencies**: All other reports
- **Credibility**: **HIGH** — Comprehensive reconciliation of all prior work

### 1.11 CHANGELOG.md

- **Filename**: `CHANGELOG.md`
- **Type**: Changelog
- **Purpose**: Documents all notable changes from v1.0.0 release
- **Version/Date**: v1.0.0, 2026-07-27
- **Author**: Project maintainers
- **Product Area**: Entire platform
- **Requirements Extracted**: 11 phases of production readiness work (server stability, dead code cleanup, repo hygiene, error pages, cloud auth, monorepo connection, API consistency, SSR/SEO, test coverage, persistent DB, ship-readiness)
- **Features Extracted**: Documents the evolution from initial build to v1.0.0
- **Architecture Decisions**: File-based JSON persistence, rate limiting, security headers
- **Dependencies**: None
- **Credibility**: **HIGH** — Matches git history and code evidence

---

## 2. Architecture Decision Records (docs/adr/)

### 2.1 ADR-001: SPA Routing with next/dynamic
- **Filename**: `docs/adr/001-spa-routing.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies client-side SPA routing over file-system routing
- **Product Area**: Routing architecture
- **Requirements**: 19+ views, fast client-side transitions, shared layout state
- **Credibility**: **IMPLEMENTED** — Matches actual code in `home-client.tsx` and `next.config.ts`

### 2.2 ADR-002: Tailwind CSS v4
- **Filename**: `docs/adr/002-tailwind-css-4.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies Tailwind CSS v4 with @tailwindcss/postcss
- **Product Area**: Styling framework
- **Requirements**: Zero-runtime CSS, dark mode, customizable, tree-shakeable
- **Credibility**: **IMPLEMENTED** — Matches `postcss.config.mjs` and `globals.css`

### 2.3 ADR-003: shadcn/ui Components
- **Filename**: `docs/adr/003-shadcn-ui-components.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies shadcn/ui as component primitive library
- **Product Area**: UI component library
- **Requirements**: Accessible, theme-compatible, customizable, minimal bundle
- **Credibility**: **IMPLEMENTED** — Matches `src/components/ui/` and `components.json`

### 2.4 ADR-004: JWT with httpOnly Cookies
- **Filename**: `docs/adr/004-jwt-authentication.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies JWT tokens in httpOnly cookies for cloud dashboard
- **Product Area**: Authentication
- **Requirements**: XSS-safe, stateless, scalable, CSRF protection
- **Credibility**: **PARTIALLY IMPLEMENTED** — ADR describes a comprehensive JWT+httpOnly+CSRF system. Actual implementation uses a simpler bearer token model with demo-mode fallback. JWT with jose library added in v1.3.0 but full CSRF token rotation is not implemented.

### 2.5 ADR-005: Supabase Integration
- **Filename**: `docs/adr/005-supabase-integration.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies Supabase as optional database with in-memory fallback
- **Product Area**: Database layer
- **Requirements**: Zero-config dev, production durability, clean abstraction
- **Credibility**: **PARTIALLY IMPLEMENTED** — In-memory fallback exists. Supabase client and schema exist (`src/lib/supabase.ts`, `supabase/types.ts`, `supabase/migrations/`), but cloud dashboard currently uses in-memory store with file persistence. Supabase is wired but not active.

### 2.6 ADR-006: Per-Category Lazy Loading
- **Filename**: `docs/adr/006-effects-lazy-loading.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies per-category dynamic imports for effects data
- **Product Area**: Performance / effects loading
- **Requirements**: Small initial bundle, fast perceived performance, build-time code-splitting
- **Credibility**: **IMPLEMENTED** — Matches `src/lib/effects/by-category/` (35 modules) and `src/lib/effects/lazy-loader.ts`

### 2.7 ADR-007: Security Headers with Strict CSP
- **Filename**: `docs/adr/007-security-headers-csp.md`
- **Type**: ADR (Accepted)
- **Purpose**: Justifies comprehensive security headers
- **Product Area**: Security
- **Requirements**: XSS/clickjacking prevention, MIME sniffing protection, Spectre mitigation
- **Credibility**: **IMPLEMENTED** — Matches `next.config.ts` header configuration exactly

---

## 3. Registry Files (registry/)

### 3.1 registry/features.json
- **Type**: Machine-readable feature inventory
- **Purpose**: 25 features with IDs, names, statuses, and source files
- **Credibility**: **HIGH** — Auto-verified against filesystem

### 3.2 registry/apis.json
- **Type**: Machine-readable API inventory
- **Purpose**: 19 API endpoints with methods, auth requirements, descriptions
- **Credibility**: **HIGH** — Matches actual route files

### 3.3 registry/routes.json
- **Type**: Machine-readable route inventory
- **Purpose**: All routes (static, SPA, API) mapped
- **Credibility**: **HIGH** — Verified against codebase

### 3.4 registry/components.json
- **Type**: Machine-readable component inventory
- **Purpose**: All components with file paths and rendering mode
- **Credibility**: **HIGH** — Verified against filesystem

### 3.5 registry/packages.json
- **Type**: Machine-readable dependency inventory
- **Purpose**: All npm packages with versions and roles
- **Credibility**: **HIGH** — Matches `package.json`

### 3.6 registry/documentation.json
- **Type**: Machine-readable documentation inventory
- **Purpose**: Lists all reports, ADRs, and other docs with verification metadata
- **Credibility**: **HIGH** — Self-referencing but verified

### 3.7 registry/cross-reference.md
- **Type**: Cross-reference matrix
- **Purpose**: Maps features→components→routes→APIs, identifies dead code
- **Credibility**: **HIGH** — Verified against live filesystem, identifies 5 dead files

---

## 4. Component Source Files (Marketing Claims)

### 4.1 hero-section.tsx
- **Filename**: `src/components/ferrum/sections/home/hero-section.tsx`
- **Type**: Marketing/hero component
- **Claims**: "542+ Motion Effects", "9 Framework Adapters", "Zero Dependencies", "AI-Ready Architecture", "Universal UI Platform", "GPU Accelerated", "TypeScript Native", "MIT Licensed"
- **Credibility**: **MIXED** — 542 effects is VERIFIED. "9 Framework Adapters" is CLAIMED but only React is implemented. "Zero Dependencies" refers to CSS effects only (true). "AI-Ready Architecture" is MARKETING. "GPU Accelerated" is partially true (CSS uses transform/opacity).

### 4.2 overview-section.tsx
- **Filename**: `src/components/ferrum/sections/home/overview-section.tsx`
- **Type**: Marketing/product-grid component
- **Claims**:
  - **Motion Engine**: "Spring physics engine, scroll-driven animations, gesture recognition, timeline composition, 542+ ready-to-use effects, zero jank on mobile" → SPRING PHYSICS: NOT IMPLEMENTED. SCROLL-DRIVEN: Some CSS scroll-driven effects exist in the pipeline but NOT in production effects. GESTURE: NOT IMPLEMENTED. TIMELINE: NOT IMPLEMENTED. EFFECTS: IMPLEMENTED (542 CSS classes).
  - **Visual Effects**: "Glass morphism, liquid effects, atmospheric particles, distortion shaders, energy fields, neon borders, 7 Paint API worklets, hardware accelerated" → GLASS/LIQUID/NEON CSS EFFECTS EXIST (as CSS classes). PARTICLES: NOT IMPLEMENTED. DISTORTION SHADERS: NOT IMPLEMENTED. PAINT API WORKLETS: NOT IMPLEMENTED.
  - **Component System**: "16 semantic components, ARIA-first design, theme-aware, composable, framework adapters, TypeScript native" → 16 COMPONENTS: NOT IMPLEMENTED (no such component library). ARIA-FIRST: Platform itself has good ARIA, but there is no separate component system.
  - **Compiler & Tokens**: "9-pass optimization, tree-shaking, DCE, 5 output formats, runtime theming, cross-platform tokens, dead code elimination" → TOKENS EXIST (ferrum-tokens with 14 token scales and 5 output formats). COMPILER: NOT IMPLEMENTED. TREE-SHAKING/DCE: NOT IMPLEMENTED as a compiler.
- **Credibility**: **LOW FOR ADVANCED FEATURES, HIGH FOR CSS EFFECTS AND TOKENS**

### 4.3 platform-architecture.tsx
- **Filename**: `src/components/ferrum/sections/platform-architecture.tsx`
- **Type**: Marketing/architecture visualization
- **Claims**: 10 subsystems (Runtime, Motion, Physics, VFX, Components, Tokens, Compiler, AI, Studio, Cloud) with status labels (Stable/Beta/Planned)
- **Reality**: Only Tokens and the website itself are implemented. All 10 subsystems are claimed as a platform vision.
- **Framework Adapters**: Claims 9 adapters (React, Vue, Svelte, Angular, Next.js, Nuxt, Astro, Vanilla, Solid) — Reality: CSS effects work with any framework (they're CSS classes), but there are NO dedicated adapter packages.
- **Credibility**: **MARKETING ASPIRATIONAL** — Describes a future vision, not current state

### 4.4 roadmap-section.tsx
- **Filename**: `src/components/ferrum/sections/home/roadmap-section.tsx`
- **Type**: Marketing/roadmap visualization
- **Claims**: 14 packages across 4 maturity tiers (Stable, Beta, Alpha, Research/Planned)
  - Stable: Ferrum Tokens, Ferrum Core, Ferrum Motion, Framework Adapters (9)
  - Beta: VFX, Motion Engine, Compiler, Paint (Houdini), Layout, A11y
  - Alpha: CLI, Plugin SDK
  - Research/Planned: Studio, AI
- **Reality**: Only "Ferrum Core" (CSS effects) and partial "Ferrum Tokens" exist. All other roadmap items are concept-only.
- **Credibility**: **MARKETING ASPIRATIONAL** — This is a product roadmap/vision, not implemented features

### 4.5 architecture-section.tsx
- **Filename**: `src/components/ferrum/sections/home/architecture-section.tsx`
- **Type**: Marketing/architecture diagram
- **Claims**: 7-layer architecture (Framework Adapters, Runtime, Motion Engine, VFX Engine, Component System, Design Tokens, Compiler Pipeline)
- **Credibility**: **MARKETING ASPIRATIONAL** — Same as platform-architecture.tsx

### 4.6 docs-data.ts
- **Filename**: `src/lib/docs-data.ts`
- **Type**: Documentation content (985 LOC)
- **Sections**: Getting Started, Core Concepts, Framework Integration, Effects Catalog, Customization, API Reference, Performance, Accessibility, Playground, Contributing
- **Claims**: "542 hand-crafted effects across 35 categories", "no JavaScript runtime, no build step required, zero dependencies"
- **Notable**: Does NOT mention Compiler, VFX Engine, Motion Engine, Paint API, Physics, Runtime, or any advanced features. Documentation is honest about what the product actually is (a CSS effects library).
- **Credibility**: **HIGH** — Accurately describes the CSS effects library without overclaiming

### 4.7 ferrum-effects-data.ts
- **Filename**: `src/lib/ferrum-effects-data.ts`
- **Type**: Effect data (3,807 LOC)
- **Claims**: "542 effects, 35 categories"
- **Credibility**: **VERIFIED** — File header confirmed, count matches index

### 4.8 ferrum-tokens/index.d.ts
- **Filename**: `src/lib/ferrum-tokens/index.d.ts`
- **Type**: Token type definitions (292 LOC)
- **Claims**: 14 token scales (colors, spacing, radius, fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacings, shadows, durations, easings, breakpoints, zIndex, opacity)
- **Claims**: 5 output format transformers (CSS variables, Tailwind config, SCSS, JSON, TypeScript types)
- **Credibility**: **VERIFIED** — Type definitions match implementation in `index.cjs`

---

## 5. Deleted Git-History Scripts

### 5.1 scripts/pdf-gen/cover.html
- **Type**: PDF cover HTML template (ReportLab snapshot)
- **Purpose**: Visual cover page for "Ferrum Studio Product Architecture" PDF
- **Credibility**: N/A — Presentation artifact, no spec content

### 5.2 scripts/pdf/ferrum_studio_cover.html
- **Type**: PDF cover HTML template
- **Purpose**: Alternate cover for Ferrum Studio PDF
- **Credibility**: N/A — Presentation artifact

### 5.3 scripts/generate-final-report.py
- **Type**: Report generator (169 LOC)
- **Purpose**: One-time release readiness report generation from audit findings JSON
- **Spec Content**: Contains evidence of audit finding IDs and fix tracking, confirming the audit-repair workflow occurred
- **Credibility**: Historical record, already baked into current reports

### 5.4 scripts/ferrum_marketplace_pdf.py
- **Type**: PDF generator (648 LOC)
- **Purpose**: One-time marketplace architecture PDF
- **Spec Content**: Contains marketplace architecture description (marketing vision for a marketplace component). No implementation spec.
- **Credibility**: Historical artifact, marketing content

### 5.5 scripts/ux-audit-report.py
- **Type**: PDF generator (402 LOC)
- **Purpose**: One-time UX audit PDF report generator
- **Spec Content**: UX audit findings rendering. The underlying data is already in PLATFORM_AUDIT_REPORT.md.
- **Credibility**: Historical artifact, data already captured in other reports

---

## 6. Credibility Summary

| Category | Documents | Credibility | Notes |
|----------|-----------|-------------|-------|
| Audit reports (9) | ARCHITECTURE_DESIGN, FEATURE_REGISTRY, VERIFICATION, PLATFORM_AUDIT, SECURITY_AUDIT, ACCESSIBILITY_AUDIT, PERFORMANCE_BASELINE, GIT_FORENSICS, FINAL_RECONCILIATION | **HIGH** | Evidence-based, file-level references |
| ADRs (7) | 001-007 | **HIGH** (5 fully implemented, 2 partially) | Matched to code |
| Registry (7) | features, apis, routes, components, packages, documentation, cross-reference | **HIGH** | Auto-verified |
| Documentation content (1) | docs-data.ts | **HIGH** | Honestly describes CSS effects library |
| Marketing sections (4) | hero, overview, platform-architecture, roadmap, architecture-section | **LOW** for advanced features | Describes aspirational vision, not implementation |
| Effect data (1) | ferrum-effects-data.ts | **HIGHEST** | Verifiable count |
| Token types (1) | ferrum-tokens/index.d.ts | **HIGHEST** | Type-safe definitions |
| Deleted scripts (5) | Various | N/A | Historical artifacts |

### Key Finding

There is a **significant gap** between what the marketing sections claim (10-subsystem platform, 9 framework adapters, physics engine, VFX engine, compiler, AI) and what actually exists in the codebase (a CSS effects library with 542 effects, a design token system, and a well-built Next.js showcase website). The audit reports and registry are honest about this distinction. The marketing sections are aspirational product vision, not current implementation.
