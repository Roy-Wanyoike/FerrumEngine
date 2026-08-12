# Ferrum Feature Registry
> Auto-generated from audit. Last updated: 2026-08-12

## Summary
- **Total Features**: 21
- **Status**: 18 working, 3 partial, 0 missing (from implementation)
- **Tested Features**: 2 (Collection Drawer, Footer)
- **Components**: 71
- **Routes**: 19 (5 pages, 12 API routes, 2 special)
- **API Endpoints**: 17
- **Source Lines of Code**: 23,733

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Active | Feature is implemented and functional |
| ⚠️ Partial | Feature works but has known gaps |
| 🚫 Missing | Feature referenced but not implemented |
| 📋 Concept-only | Referenced in docs/content but no code exists |

---

## Features

### F001: Dark Theme Toggle
- **Owner**: Platform
- **Category**: Theme
- **Description**: Toggle between dark, light, and system color schemes with dropdown and cycle variants
- **Implementation**: `src/components/theme-toggle.tsx`, `src/components/theme-provider.tsx`
- **Dependencies**: `next-themes`, `lucide-react`
- **Rendering**: Client
- **Documentation**: JSDoc on ThemeToggleProps interface (theme-toggle.tsx:30-35)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**: Theme toggle dropdown lacks `role="menuitem"` and keyboard arrow navigation (A11y K2, F2)

### F002: Color Customizer
- **Owner**: Platform
- **Category**: Theme
- **Description**: Pick a custom accent color for CSS effects via preset palette or hex input, persisted to localStorage
- **Implementation**: `src/components/ferrum/color-customizer.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline comment block (color-customizer.tsx:6-9)
- **Tests**: Not tested
- **Status**: ⚠️ Partial
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**: No focus trap on the popup dialog — Tab key escapes to page behind (A11y F1, K3)

### F003: Main Navigation Bar
- **Owner**: Platform
- **Category**: Navigation
- **Description**: Fixed top navigation with scroll-aware solid background, logo, desktop nav links, GitHub link, and hamburger toggle
- **Implementation**: `src/components/ferrum/nav.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comment (nav.tsx:13-15)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**: NavButton lacks `aria-current="page"` when active (A11y K1)

### F004: Mega Menu Navigation
- **Owner**: Platform
- **Category**: Navigation
- **Description**: Desktop dropdown mega menus for Platform, Docs, and More with hover interaction and keyboard support
- **Implementation**: `src/components/ferrum/nav-mega-menu.tsx`, `src/components/ferrum/nav-data.ts`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline comments (nav-mega-menu.tsx:119-161)
- **Tests**: Not tested
- **Status**: ⚠️ Partial
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**: Mega menu panel lacks keyboard navigation — only mouse/touch supported (A11y K4). 6 platform items are placeholders ("Coming soon")

### F005: Mobile Navigation Overlay
- **Owner**: Platform
- **Category**: Navigation
- **Description**: Full mobile nav overlay with expandable submenus, body scroll lock, focus trap, and escape key handling
- **Implementation**: `src/components/ferrum/nav-mobile.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comment (nav-mobile.tsx:16-18)
- **Tests**: Not tested
- **Status**: ⚠️ Partial
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**: Missing 5 docsMenu items (Learning Center, Interactive Docs, Architecture, Platform Architecture, Blog) — only accessible on desktop. Uses `role="menu"` without `role="menuitem"` on children (A11y A1)

### F006: Scroll Progress Bar
- **Owner**: Platform
- **Category**: Navigation
- **Description**: rAF-throttled scroll progress indicator with gradient bar and circular scroll-to-top button, respects reduced motion
- **Implementation**: `src/components/ferrum/scroll-progress.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comment (scroll-progress.tsx:6-9)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F007: Hero Section with Aurora Animation
- **Owner**: Platform
- **Category**: Hero
- **Description**: Cinematic hero with aurora gradients, noise texture, grid pattern, animated badge rotation, parallax live demo cards, and floating particles
- **Implementation**: `src/components/ferrum/sections/home/hero-section.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comment (hero-section.tsx:11-14)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F008: Effects Gallery with Search and Filter
- **Owner**: Platform
- **Category**: Effects
- **Description**: Browse 542+ CSS effects with sticky filter bar, search, category pills, infinite scroll pagination, and effect preview cards
- **Implementation**: `src/components/ferrum/effects-view.tsx`, `src/components/ferrum/effect-preview.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comment (effects-view.tsx:3-8)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**: Search input has no `aria-label` or associated `<label>` (A11y I1)
- **Bundle Note**: Prefetched after hydration (`webpackPrefetch: true`). Effects data is 3,806 LOC / ~424 KB — largest single data file

### F009: Effect Detail Modal
- **Owner**: Platform
- **Category**: Effects
- **Description**: View CSS source code, usage examples (HTML/React/Vue), copy to clipboard, and save to collection from a modal
- **Implementation**: `src/components/ferrum/effects-detail-modal.tsx`
- **Dependencies**: `lucide-react`, `sonner`
- **Rendering**: Client
- **Documentation**: Inline section comment (effects-detail-modal.tsx:16-18)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F010: Collection Drawer
- **Owner**: Platform
- **Category**: Effects
- **Description**: Slide-in drawer to manage saved effects with copy-all and clear functionality
- **Implementation**: `src/components/ferrum/collection-drawer.tsx`
- **Dependencies**: `lucide-react`, `sonner`
- **Rendering**: Client
- **Documentation**: Inline section comment (collection-drawer.tsx:12-13)
- **Tests**: Tested in `__tests__/collection.test.ts`
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F011: Playground 2.0
- **Owner**: Platform
- **Category**: Playground
- **Description**: Full IDE-like playground with code editor, live preview iframe, device presets, resizable panels, motion/physics/theme controls, export in 7 formats, and keyboard shortcuts
- **Implementation**:
  - `src/components/ferrum/playground/index.tsx`
  - `src/components/ferrum/playground/code-editor.tsx`
  - `src/components/ferrum/playground/controls-panel.tsx`
  - `src/components/ferrum/playground/preview-panel.tsx`
  - `src/components/ferrum/playground/toolbar.tsx`
  - `src/components/ferrum/playground/effect-sidebar.tsx`
  - `src/components/ferrum/playground/types.ts`
  - `src/components/ferrum/playground-v2-data.ts`
- **Dependencies**: `lucide-react`, `sonner`
- **Rendering**: Client
- **Documentation**: Inline section comments throughout playground files
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Bundle Note**: Prefetched after hydration (`webpackPrefetch: true`). Includes built-in WCAG contrast checker

### F012: Architecture Deep Dive
- **Owner**: Platform
- **Category**: Architecture
- **Description**: Full-screen architecture explorer with 10 subsystems, each with 10 tabbed sections, SVG diagrams, and sidebar navigation
- **Implementation**: `src/components/ferrum/architecture-deep-dive.tsx`, `src/components/ferrum/architecture-data.ts`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comments (architecture-deep-dive.tsx:17-19, 82-84)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F013: Documentation Viewer
- **Owner**: Platform
- **Category**: Documentation
- **Description**: Full-screen docs viewer with sidebar navigation, search, code blocks with copy, callouts (info/warning/tip), data tables, API reference blocks, and prev/next navigation
- **Implementation**: `src/components/ferrum/docs-view.tsx`, `src/lib/docs-data.ts`
- **Dependencies**: `lucide-react`, `sonner`
- **Rendering**: Client
- **Documentation**: Inline section comments (docs-view.tsx:239-240, 369-371)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Bundle Note**: Prefetched after hydration (`webpackPrefetch: true`)

### F014: SEO Structured Data and Content
- **Owner**: Platform
- **Category**: SEO
- **Description**: JSON-LD structured data (Organization, WebSite, SoftwareApplication, BreadcrumbList, ItemList), comprehensive meta tags, OpenGraph/Twitter cards, and crawler-visible SEO content
- **Implementation**: `src/app/layout.tsx`, `src/components/ferrum/seo-content.tsx`, `src/lib/view-meta.ts`
- **Dependencies**: None
- **Rendering**: Server
- **Documentation**: JSDoc comments (layout.tsx:117-118, seo-content.tsx:3-16)
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Notes**: seo-content.tsx renders before client-side SPA hydrates. The container is `sr-only` and ships zero JS. Adds ~2KB to initial HTML

### F015: Footer with Links
- **Owner**: Platform
- **Category**: Footer
- **Description**: Site footer with product, developer, legal, and resources link columns, GitHub link, sponsor button, and branding
- **Implementation**: `src/components/ferrum/sections/footer.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Inline section comment (footer.tsx:9-11)
- **Tests**: Tested in `__tests__/footer.test.tsx`
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F016: Skip Link and Accessibility
- **Owner**: Platform
- **Category**: Accessibility
- **Description**: Skip-to-content link in navigation, focus management on route changes, focus-visible rings on interactive elements, reduced-motion support, body scroll lock, focus traps in modals/drawers/mobile nav
- **Implementation**:
  - `src/components/ferrum/nav.tsx`
  - `src/components/ferrum/nav-mobile.tsx`
  - `src/components/ferrum/effects-detail-modal.tsx`
  - `src/components/ferrum/collection-drawer.tsx`
  - `src/components/ferrum/animated-components.tsx`
  - `src/lib/body-scroll-lock.ts`
  - `src/hooks/use-focus-trap.ts`
- **Dependencies**: None
- **Rendering**: Client
- **Documentation**: Not documented as a cohesive feature
- **Tests**: Not tested
- **Status**: ⚠️ Partial
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Known Issues**:
  - Contrast: `text-muted-foreground/40` used on readable text fails WCAG AA 4.5:1 (C1)
  - Color customizer popup lacks focus trap (F1)
  - Mobile nav ARIA role mismatch (A1)
  - Logo SVG SMIL animations ignore `prefers-reduced-motion` (M1)
  - Effects search input missing `aria-label` (I1)
  - Full-screen views (docs, playground, architecture) missing `<main>` landmark (F3)

### F017: Error Handling and Loading States
- **Owner**: Platform
- **Category**: Error Handling
- **Description**: Global error boundary, route-level error page, 404 page, skeleton loading states for nav/cards/hero, and ViewErrorBoundary in the SPA router
- **Implementation**:
  - `src/app/error.tsx`
  - `src/app/global-error.tsx`
  - `src/app/not-found.tsx`
  - `src/app/loading.tsx`
  - `src/components/error-page-content.tsx`
  - `src/app/home-client.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Hybrid
- **Documentation**: Not documented
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12

### F018: Cloud Dashboard
- **Owner**: Platform
- **Category**: Cloud
- **Description**: Team collaboration dashboard with auth, team/project/token management, tab-based UI, breadcrumb, modals for creating teams/projects/tokens, and audit logs
- **Implementation**:
  - `src/app/cloud/page.tsx`
  - `src/app/cloud/layout.tsx`
  - `src/app/cloud/cloud-dashboard-client.tsx`
  - `src/app/cloud/cloud-loader.tsx`
  - `src/app/cloud/cloud-breadcrumb.tsx`
  - `src/app/cloud/cloud-modals.tsx`
  - `src/app/cloud/tab-panels.tsx`
  - `src/hooks/use-cloud-data.ts`
  - `src/hooks/use-cloud-auth.ts`
- **Dependencies**: None (uses custom hooks)
- **Rendering**: Hybrid
- **Documentation**: Not documented
- **Tests**: Cloud store tested in `__tests__/cloud-store.test.ts`; auth/routing tested in `__tests__/api-routes.test.ts`
- **Status**: ✅ Active
- **Git History**: Present since initial commit (`db3a4c9`)
- **Last Verified**: 2026-08-12
- **Security Notes**:
  - Uses static shared API token (not per-session JWT) — demo mode only
  - Single shared password for all users
  - Token stored in localStorage (vulnerable to XSS exfiltration)
  - In-memory rate limiting is per-instance only (ineffective in serverless)
  - IP spoofing possible via `x-real-ip` header trust
  - Middleware throws if `CLOUD_API_TOKEN` env var is missing (crashes entire app)

### F019: Blog
- **Owner**: Platform
- **Category**: Content
- **Description**: Blog with 6 posts, search, category filter, and full article view
- **Implementation**: `src/components/ferrum/blog-view.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Not documented
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Added in commit `88fa612` (2026-08-12)
- **Last Verified**: 2026-08-12
- **Notes**: 496 LOC. Dynamically imported via `next/dynamic` with `ssr: false`. Content is hardcoded (no CMS). Not accessible from mobile nav (missing from docsMenu items)

### F020: Changelog
- **Owner**: Platform
- **Category**: Content
- **Description**: Changelog with 8 version entries, timeline layout, and type filters
- **Implementation**: `src/components/ferrum/changelog-view.tsx`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Not documented
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Added in commit `88fa612` (2026-08-12)
- **Last Verified**: 2026-08-12
- **Notes**: 510 LOC. Dynamically imported. Content is hardcoded. Accessible from mobile nav via "More" menu

### F021: Interactive Documentation
- **Owner**: Platform
- **Category**: Documentation
- **Description**: Interactive docs with 8 lessons, code editor, iframe live preview, device size toggles, and progress tracking
- **Implementation**: `src/components/ferrum/interactive-docs-view.tsx`, `src/components/ferrum/interactive-docs/types.ts`
- **Dependencies**: `lucide-react`
- **Rendering**: Client
- **Documentation**: Not documented
- **Tests**: Not tested
- **Status**: ✅ Active
- **Git History**: Added in commit `88fa612` (2026-08-12)
- **Last Verified**: 2026-08-12
- **Notes**: 1,522 LOC (3x over 500-line component limit — needs splitting). Dynamically imported. Content hardcoded in `LESSONS` array. Uses `dangerouslySetInnerHTML` for lesson explanation (safe — static content only). Not accessible from mobile nav

---

## Concept-Only Features (No Implementation)

The following are referenced in documentation, blog content, and navigation as "Coming soon" placeholders. They have **no code implementation** — this is a landing platform that documents the FerrumEngine vision.

| Concept | Referenced In | Status |
|---------|--------------|--------|
| Ferrum CLI (`ferrum init`, `ferrum build`) | Blog, docs content | 📋 Concept-only |
| Ferrum Compiler (9-pass pipeline) | Docs, changelog | 📋 Concept-only |
| Ferrum Runtime (zero-dependency execution) | Docs, nav data | 📋 Concept-only |
| Framework Adapters (Vue, Svelte, Angular) | Docs, playground export | 📋 Concept-only |
| Physics Engine (spring physics, RK4) | Docs, playground controls | 📋 Concept-only |
| VFX Engine (particles, visual effects) | Docs | 📋 Concept-only |
| Global Search (Cmd+K) | Platform audit | 🚫 Missing |

---

## SPA Route Map

| Route | View Component | Feature ID(s) | Status |
|--------|---------------|---------------|--------|
| `/` | HeroSection + 11 home sections | F007, F014, F015 | ✅ Working |
| `/principles` | FerrumPrinciples | — | ✅ Working |
| `/architecture` | ArchitectureDeepDive | F012 | ✅ Working |
| `/platform-architecture` | PlatformArchitecture | — | ✅ Working |
| `/hall-of-fame` | HallOfFame | — | ✅ Working |
| `/showcase` | ShowcaseGallery | — | ✅ Working |
| `/learning` | LearningCenter | — | ✅ Working |
| `/story` | FerrumStory | — | ✅ Working |
| `/enterprise` | Enterprise | — | ✅ Working |
| `/enterprise-components` | EnterpriseComponentLibrary | — | ✅ Working |
| `/vision` | VisionManifesto | — | ✅ Working |
| `/community` | CommunitySection | — | ✅ Working |
| `/effects` | EffectsView + Modal + Drawer | F008, F009, F010 | ✅ Working |
| `/docs` | DocsView | F013 | ✅ Working |
| `/playground` | PlaygroundV2 | F011 | ✅ Working |
| `/blog` | BlogView | F019 | ✅ Working |
| `/changelog` | ChangelogView | F020 | ✅ Working |
| `/interactive-docs` | InteractiveDocsView | F021 | ✅ Working |
| `/cloud` | Cloud Dashboard | F018 | ✅ Working (separate page) |
| `/terms` | Terms of Service | — | ✅ Working (separate page) |
| `/privacy` | Privacy Policy | — | ✅ Working (separate page) |

---

## Test Coverage Summary

| Test File | Scope | Features Covered | Status |
|-----------|-------|-----------------|--------|
| `api-routes.test.ts` | Public API routes | F018 (cloud auth) | ✅ Passing |
| `rate-limit.test.ts` | Analytics rate limiting | F018 (analytics) | ✅ Passing |
| `cloud-store.test.ts` | Cloud data store | F018 | ✅ Passing |
| `persistence.test.ts` | JSON file persistence | F018 | ✅ Passing |
| `collection.test.ts` | Collection functionality | F010 | ✅ Passing |
| `footer.test.tsx` | Footer component | F015 | ✅ Passing |
| `utils.test.ts` | Utility functions | — | ✅ Passing |
| `routing.test.ts` | pathnameToView mapping | — | ⚠️ Stale (missing 4 views) |

**Total**: 95/95 tests passing. Coverage gaps exist for component rendering, navigation, playground, and theme toggle.

---

## Security Posture

| Area | Status | Notes |
|------|--------|-------|
| Dependency vulnerabilities | ✅ Clean | 0 CVEs in `npm audit` |
| CSP | 🔴 Critical | `script-src 'unsafe-inline'` negates XSS protection |
| Auth (cloud) | 🟠 High | Static shared token, no JWT, no per-user identity |
| Rate limiting | 🟠 High | In-memory only; ineffective in serverless; IP spoofing possible |
| Input validation | 🟡 Medium | Missing validation on team update and token value length |
| Headers | ✅ Good | HSTS, X-Frame-Options, X-Content-Type-Options all correct |
| Third-party scripts | ✅ None | Zero external scripts, analytics, or tracking |
| Source maps | ✅ Disabled | `productionBrowserSourceMaps: false` |
| Console stripping | ✅ Enabled | `console.log` removed in production |

*See `SECURITY_AUDIT_REPORT.md` for full details.*

---

*This registry is the permanent source of truth for all FerrumEngine platform features. Update this file when features are added, modified, or deprecated.*