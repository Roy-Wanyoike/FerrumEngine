# Platform Audit Report — FerrumEngine

**Date**: 2025-07-12
**Auditor**: Agent 2 — Platform Auditor (Phase 3)
**Scope**: Full feature, route, component, API, and navigation audit.

---

## Summary

| Status | Count |
|--------|-------|
| ✅ WORKING | 42 |
| ⚠️ PARTIAL | 4 |
| ❌ BROKEN | 0 |
| 🚫 MISSING | 2 |
| 🔄 REGRESSION | 1 |

### Critical Issues (3)

1. **Mobile nav missing 5 menu items** — The mobile nav does not expose `docsMenu` items (Learning Center, Interactive Docs, Architecture, Platform Architecture, Blog). These views are only accessible via desktop mega-menu.
2. **Routing test is stale** — `__tests__/routing.test.ts` defines its own `VALID_VIEWS` array that omits `community`, `blog`, `changelog`, `interactive-docs` (added after test was written). The test will pass but doesn't actually validate current routes.
3. **Middleware `throw` on missing env var** — `src/middleware.ts` throws at module scope if `CLOUD_API_TOKEN` is not set. In dev or builds without this env var, the entire app fails to start (not just cloud routes). Should degrade gracefully.

---

## 1. Route & Page Audit

### SPA Routes (next.config.ts rewrites → `/`)

| Route | Component | Dynamic Import | Registered in home-client.tsx | Tests | Status |
|-------|-----------|---------------|------------------------------|-------|--------|
| `/` (home) | HeroSection + 11 sections | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/principles` | FerrumPrinciples | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/architecture` | ArchitectureDeepDive | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/platform-architecture` | PlatformArchitecture | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/hall-of-fame` | HallOfFame | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/showcase` | ShowcaseGallery | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/learning` | LearningCenter | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/story` | FerrumStory | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/enterprise` | Enterprise | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/enterprise-components` | EnterpriseComponentLibrary | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/vision` | VisionManifesto | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/effects` | EffectsView | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/docs` | DocsView | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/playground` | PlaygroundV2 | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/community` | CommunitySection | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/blog` | BlogView | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/changelog` | ChangelogView | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |
| `/interactive-docs` | InteractiveDocsView | ✅ Yes | ✅ Yes | ❌ No | ✅ WORKING |

### Real Next.js Pages (not SPA rewrites)

| Route | File | Status |
|-------|------|--------|
| `/cloud` | `src/app/cloud/page.tsx` | ✅ WORKING — Separate layout, auth-gated dashboard |
| `/privacy` | `src/app/privacy/page.tsx` | ✅ WORKING — Full privacy policy, proper metadata |
| `/terms` | `src/app/terms/page.tsx` | ✅ WORKING — Full ToS, proper metadata |

### SPA Route Config Consistency

- **next.config.ts SPA_ROUTES**: 18 routes ✅
- **types.ts ViewId**: 18 values ✅
- **view-meta.ts VALID_VIEWS**: 18 views ✅
- **view-meta.ts VIEW_META**: 18 entries ✅
- **home-client.tsx rendering**: All 18 views rendered ✅
- **All three sources are in sync.** ✅

---

## 2. Component Audit

### Dead / Unused Code

| File | Status | Notes |
|------|--------|-------|
| `communityMenu` in `nav-data.ts` | ⚠️ DEAD EXPORT | Exported but never imported. `communityMenu` exists in nav-data.ts but no file imports it. |

### All Components — Import & Export Verification

| Component | File | Has `"use client"` | Used | Status |
|-----------|------|-------------------|------|--------|
| Nav | `ferrum/nav.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| NavMobile | `ferrum/nav-mobile.tsx` | ✅ | nav.tsx | ✅ WORKING |
| MegaMenuPanel | `ferrum/nav-mega-menu.tsx` | ✅ | nav.tsx | ✅ WORKING |
| DesktopMegaTrigger | `ferrum/nav-mega-menu.tsx` | ✅ | nav.tsx | ✅ WORKING |
| EffectsView | `ferrum/effects-view.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| EffectDetailModal | `ferrum/effects-detail-modal.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| EffectPreview | `ferrum/effect-preview.tsx` | ✅ | effects-view, effects-detail-modal | ✅ WORKING |
| CollectionDrawer | `ferrum/collection-drawer.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| PlaygroundV2 | `ferrum/playground/index.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| CodePanel | `ferrum/playground/code-editor.tsx` | ✅ | playground/index.tsx | ✅ WORKING |
| ControlsPanel | `ferrum/playground/controls-panel.tsx` | ✅ | playground/index.tsx | ✅ WORKING |
| ActivityBar / ComponentSidebar | `ferrum/playground/effect-sidebar.tsx` | ✅ | playground/index.tsx | ✅ WORKING |
| LivePreview | `ferrum/playground/preview-panel.tsx` | ✅ | playground/index.tsx | ✅ WORKING |
| TopToolbar | `ferrum/playground/toolbar.tsx` | ✅ | playground/index.tsx | ✅ WORKING |
| DocsView | `ferrum/docs-view.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| ArchitectureDeepDive | `ferrum/architecture-deep-dive.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| BlogView | `ferrum/blog-view.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| ChangelogView | `ferrum/changelog-view.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| InteractiveDocsView | `ferrum/interactive-docs-view.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| ScrollProgress | `ferrum/scroll-progress.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| ColorCustomizer | `ferrum/color-customizer.tsx` | ✅ | nav.tsx | ✅ WORKING |
| AppProvider / useAppState | `ferrum/app-context.tsx` | ✅ | home-client.tsx | ✅ WORKING |
| AnimatedComponents | `ferrum/animated-components.tsx` | ✅ | nav.tsx | ✅ WORKING |
| SeoContent | `ferrum/seo-content.tsx` | N/A (server) | page.tsx | ✅ WORKING |
| SectionHeader | `sections/section-helpers.tsx` | N/A (memo) | 11 files | ✅ WORKING |
| DemoIllustration | `sections/illustrations.tsx` | N/A (static) | hall-of-fame, showcase-gallery | ✅ WORKING |
| ThemeToggle | `theme-toggle.tsx` | ✅ | nav.tsx, nav-mobile.tsx | ✅ WORKING |
| ThemeProvider | `theme-provider.tsx` | ✅ | layout.tsx | ✅ WORKING |
| FerrumLogo | `logo.tsx` | ✅ | footer.tsx, platform-footer-section.tsx | ✅ WORKING |
| ErrorPageContent | `error-page-content.tsx` | ✅ | error.tsx, global-error.tsx | ✅ WORKING |
| ModalOverlay | `ui/modal-overlay.tsx` | ✅ | cloud-modals.tsx | ✅ WORKING |
| All UI primitives | `ui/*.tsx` | ✅ where needed | Multiple consumers | ✅ WORKING |
| DeferredToaster | `deferred-toaster.tsx` | ✅ | layout.tsx | ✅ WORKING |
| DeferCSS | `defer-css.tsx` | ✅ | layout.tsx | ✅ WORKING |

---

## 3. API Route Audit

| Endpoint | Method | Handler | Error Handling | Auth | Tests | Status |
|----------|--------|---------|---------------|------|-------|--------|
| `/api` | GET | ✅ | ✅ try/catch | N/A (public) | ✅ api-routes.test.ts | ✅ WORKING |
| `/api/css` | GET | ✅ | ✅ try/catch, 404s | N/A (public) | ✅ api-routes.test.ts | ✅ WORKING |
| `/api/tokens` | GET | ✅ | ✅ try/catch | N/A (public) | ❌ No direct test | ✅ WORKING |
| `/api/analytics` | POST | ✅ | ✅ try/catch, 400, 429 | Rate-limited (30/min) | ✅ rate-limit.test.ts | ✅ WORKING |
| `/api/health` | GET | ✅ | ✅ 503 on degraded | N/A (public) | ❌ No test | ✅ WORKING |
| `/api/cloud/auth` | POST | ✅ | ✅ 400, 401, 500 | Rate-limited (10/15min) | ✅ api-routes.test.ts | ✅ WORKING |
| `/api/cloud/teams` | GET/POST | ✅ | ✅ try/catch, 400, 404 | Middleware Bearer | ❌ No test | ✅ WORKING |
| `/api/cloud/teams/[teamId]` | GET/PUT/DELETE | ✅ | ✅ try/catch, 400, 404 | Middleware Bearer | ❌ No test | ✅ WORKING |
| `/api/cloud/teams/[teamId]/projects` | GET/POST | ✅ | ✅ try/catch, 400, 404 | Middleware Bearer | ❌ No test | ✅ WORKING |
| `/api/cloud/projects/[projectId]/tokens` | GET/POST | ✅ | ✅ try/catch, 400, 404 | Middleware Bearer | ❌ No test | ✅ WORKING |
| `/api/cloud/projects/[projectId]/components` | GET | ✅ | ✅ try/catch | Middleware Bearer | ❌ No test | ✅ WORKING |
| `/api/cloud/tokens/[tokenId]` | PUT | ✅ | ✅ try/catch, 400, 404 | Middleware Bearer | ❌ No test | ✅ WORKING |
| `/api/cloud/audit` | GET | ✅ | ⚠️ No try/catch | Middleware Bearer | ❌ No test | ⚠️ PARTIAL — Missing error handling |

**Auth middleware**: `src/middleware.ts` provides Bearer token auth + rate limiting for all `/api/cloud/*` routes (except `/api/cloud/auth` which is rate-limited but unauthenticated). ✅

**Critical middleware issue**: The middleware calls `throw new Error(...)` at module scope if `CLOUD_API_TOKEN` env var is missing. This crashes the entire dev server / build, not just cloud routes. ⚠️

---

## 4. Navigation Audit

### Desktop Navigation (nav.tsx + nav-mega-menu.tsx)

| Menu Item | Type | Target | Valid | Status |
|-----------|------|--------|-------|--------|
| Platform (mega) | Menu | — | ✅ | ✅ WORKING |
| └ Effects Gallery | view | `effects` | ✅ | ✅ WORKING |
| └ Ferrum Runtime | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| └ Ferrum Motion | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| └ Ferrum Physics | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| └ Ferrum VFX | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| └ Ferrum Tokens | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| └ Ferrum Compiler | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| └ Framework Adapters | — | No action | ✅ (placeholder) | ⚠️ PARTIAL — "Coming soon" |
| Playground | Direct | `playground` | ✅ | ✅ WORKING |
| Showcase | Direct | `showcase` | ✅ | ✅ WORKING |
| Docs (mega) | Menu | — | ✅ | ✅ WORKING |
| └ Getting Started | view | `docs` | ✅ | ✅ WORKING |
| └ Learning Center | view | `learning` | ✅ | ✅ WORKING |
| └ Interactive Docs | view | `interactive-docs` | ✅ | ✅ WORKING |
| └ Architecture | view | `architecture` | ✅ | ✅ WORKING |
| └ Platform Architecture | view | `platform-architecture` | ✅ | ✅ WORKING |
| └ Blog | view | `blog` | ✅ | ✅ WORKING |
| Community | Direct | `community` | ✅ | ✅ WORKING |
| More (mega) | Menu | — | ✅ | ✅ WORKING |
| └ Story | view | `story` | ✅ | ✅ WORKING |
| └ Vision | view | `vision` | ✅ | ✅ WORKING |
| └ Hall of Fame | view | `hall-of-fame` | ✅ | ✅ WORKING |
| └ Enterprise Components | view | `enterprise-components` | ✅ | ✅ WORKING |
| └ Changelog | view | `changelog` | ✅ | ✅ WORKING |
| Pricing | Direct | `enterprise` | ✅ | ✅ WORKING |
| Browse Effects (CTA) | Direct | `effects` | ✅ | ✅ WORKING |
| GitHub | External | GitHub repo | ✅ | ✅ WORKING |

### Mobile Navigation (nav-mobile.tsx)

| Item | Target | Accessible | Status |
|------|--------|-----------|--------|
| Platform (mega) | Expandable sub-menu | ✅ | ✅ WORKING |
| └ Effects Gallery | `effects` | ✅ | ✅ WORKING |
| └ [other Platform items] | Placeholder/Coming soon | ✅ | ✅ WORKING |
| Playground | `playground` | ✅ | ✅ WORKING |
| Showcase | `showcase` | ✅ | ✅ WORKING |
| Docs | `docs` (direct) | ✅ | ⚠️ PARTIAL — No sub-menu |
| Community | `community` | ✅ | ✅ WORKING |
| More (mega) | Expandable sub-menu | ✅ | ✅ WORKING |
| └ Story | `story` | ✅ | ✅ WORKING |
| └ Vision | `vision` | ✅ | ✅ WORKING |
| └ Hall of Fame | `hall-of-fame` | ✅ | ✅ WORKING |
| └ Enterprise Components | `enterprise-components` | ✅ | ✅ WORKING |
| └ Changelog | `changelog` | ✅ | ✅ WORKING |
| Pricing | `enterprise` | ✅ | ✅ WORKING |
| Browse Effects (CTA) | `effects` | ✅ | ✅ WORKING |
| **Learning Center** | **Not accessible** | **❌** | **🚫 MISSING from mobile** |
| **Interactive Docs** | **Not accessible** | **❌** | **🚫 MISSING from mobile** |
| **Architecture** | **Not accessible** | **❌** | **🚫 MISSING from mobile** |
| **Platform Architecture** | **Not accessible** | **❌** | **🚫 MISSING from mobile** |
| **Blog** | **Not accessible** | **❌** | **🚫 MISSING from mobile** |

### Footer Links (sections/footer.tsx)

| Link | Target | Valid | Status |
|------|--------|-------|--------|
| Effects Gallery | `/effects` | ✅ | ✅ WORKING |
| Playground | `/playground` | ✅ | ✅ WORKING |
| Roadmap | `/#roadmap` | ✅ (id exists) | ✅ WORKING |
| Documentation | `/docs` | ✅ | ✅ WORKING |
| GitHub Repo | External | ✅ | ✅ WORKING |
| Architecture | `/architecture` | ✅ | ✅ WORKING |
| CSS Download | `/api/css?all=true&minified=true` | ✅ | ✅ WORKING |
| Privacy Policy | `/privacy` | ✅ | ✅ WORKING |
| Terms of Service | `/terms` | ✅ | ✅ WORKING |
| Principles | `/principles` | ✅ | ✅ WORKING |
| Developer Journey | `/#developer-journey` | ✅ (id exists) | ✅ WORKING |

### Dead Navigation Data

| Export | File | Status |
|--------|------|--------|
| `communityMenu` | `nav-data.ts` | ⚠️ DEAD — exported but never imported |

---

## 5. Feature Completeness Check

### Theming

| Feature | Status | Notes |
|---------|--------|-------|
| Dark/Light/System toggle | ✅ WORKING | 3-mode dropdown in nav, cycle variant available |
| Theme persistence | ✅ WORKING | `next-themes` with localStorage |
| Color customizer | ✅ WORKING | Preset palette + hex input, persisted to localStorage |
| Anti-FOUC | ✅ WORKING | `public/anti-fouc.css` applied before hydration |

### Search & Filtering

| Feature | Status | Notes |
|---------|--------|-------|
| Effects search | ✅ WORKING | Real-time search by name, className, category |
| Category filter pills | ✅ WORKING | Sticky filter bar with horizontal scroll |
| Clear search | ✅ WORKING | Clear button + empty state with reset |
| Global search | 🚫 MISSING | No site-wide search functionality |

### Effects Gallery

| Feature | Status | Notes |
|---------|--------|-------|
| Effect cards | ✅ WORKING | 4-column responsive grid |
| Infinite scroll | ✅ WORKING | IntersectionObserver, 48-item pages |
| Effect preview | ✅ WORKING | Live CSS preview in cards |
| Effect detail modal | ✅ WORKING | Full CSS code, preview, save, copy |
| Replay animation | ✅ WORKING | Per-card replay button |
| Collection/save | ✅ WORKING | Heart icon, localStorage persistence |
| Collection drawer | ✅ WORKING | Slide-in drawer, copy all, clear |
| Copy to clipboard | ✅ WORKING | Modal + drawer + collection + playground |

### Code Playground

| Feature | Status | Notes |
|---------|--------|-------|
| Live preview | ✅ WORKING | iframe-based with real-time updates |
| Code editor | ✅ WORKING | Editable code panel with syntax display |
| Export formats | ✅ WORKING | React, Vue, Svelte, Angular, HTML, CSS |
| Component selection | ✅ WORKING | Card, button, badge, input, avatar, toggle |
| Effect overlay | ✅ WORKING | Apply effects to components |
| Motion controls | ✅ WORKING | Duration, delay, easing, iterations |
| Theme controls | ✅ WORKING | Background, text, border, accent color |
| Physics config | ✅ WORKING | Spring tension, friction, mass |
| Device preview | ✅ WORKING | Desktop, tablet, mobile, custom width |
| View modes | ✅ WORKING | Split, code-only, preview-only |
| Keyboard shortcuts | ✅ WORKING | Cmd+1/2/3, Cmd+B, Cmd+E, Cmd+S, Cmd+C, Esc |
| Resizable panels | ✅ WORKING | Drag-to-resize sidebar, controls, split |
| Metrics display | ✅ WORKING | DOM nodes, animations, render time |
| Copy & export | ✅ WORKING | Clipboard + file download |
| Reduced motion | ✅ WORKING | Toggle to set duration to 0 |

### Navigation

| Feature | Status | Notes |
|---------|--------|-------|
| Desktop mega menu | ✅ WORKING | 3 menus: Platform, Docs, More |
| Mobile nav drawer | ✅ WORKING | Full-screen overlay, scrollable |
| Mobile focus trap | ✅ WORKING | Tab cycling, escape to close |
| Body scroll lock | ✅ WORKING | Mobile nav + modals + drawers |
| Skip to content | ✅ WORKING | `sr-only` link in nav |
| Scroll-aware nav | ✅ WORKING | Solid background after 40px scroll |
| Active view highlight | ✅ WORKING | NavButton highlights current view |
| Keyboard navigation | ✅ WORKING | Escape closes menus, tab navigation |
| Mobile sub-menu coverage | ⚠️ PARTIAL | Missing docsMenu items (see §4) |

### Accessibility

| Feature | Status | Notes |
|---------|--------|-------|
| ARIA labels | ✅ WORKING | All buttons, links, dialogs labeled |
| Focus management | ✅ WORKING | Modals/drawers restore focus on close |
| Focus trapping | ✅ WORKING | Custom implementation in modal/drawer |
| `prefers-reduced-motion` | ✅ WORKING | Scroll-to-top, playground support |
| Semantic HTML | ✅ WORKING | `<nav>`, `<main>`, `<section>`, `<footer>` |
| Min touch targets | ✅ WORKING | `min-w-[44px] min-h-[44px]` on all buttons |

### Error Handling

| Feature | Status | Notes |
|---------|--------|-------|
| 404 page (SPA) | ✅ WORKING | Custom 404 in ViewRouter |
| 404 page (Next.js) | ✅ WORKING | `not-found.tsx` with design-matched UI |
| Error boundary | ✅ WORKING | `ViewErrorBoundary` wrapping each view |
| Error page | ✅ WORKING | `error.tsx` with reset button |
| Global error | ✅ WORKING | `global-error.tsx` with own `<html>` |

### Loading States

| Feature | Status | Notes |
|---------|--------|-------|
| Root loading.tsx | ✅ WORKING | Full-page skeleton (nav + hero + cards) |
| Nav skeleton | ✅ WORKING | Matches nav dimensions during hydration |
| View skeleton | ✅ WORKING | Generic skeleton for Suspense boundaries |
| Effects skeleton | ✅ WORKING | 12 skeleton cards during hydration |
| Cloud loader | ✅ WORKING | `cloud-loader.tsx` defers dashboard JS |

### SEO

| Feature | Status | Notes |
|---------|--------|-------|
| Dynamic document.title | ✅ WORKING | Updated per view via `useLayoutEffect` |
| OG meta tags | ✅ WORKING | og:title, og:description, og:url, og:type |
| Twitter meta tags | ✅ WORKING | twitter:title, twitter:description |
| Canonical URL | ✅ WORKING | Updated dynamically per view |
| SEO content for crawlers | ✅ WORKING | `seo-content.tsx` sr-only server-rendered content |
| Privacy/Terms metadata | ✅ WORKING | Proper Next.js Metadata exports |
| sitemap.xml | ✅ WORKING | Present in public/ |
| robots.txt | ✅ WORKING | Present in public/ |

### Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| Security headers | ✅ WORKING | CSP, HSTS, X-Frame-Options, etc. |
| Asset caching | ✅ WORKING | Immutable cache for static assets |
| Bundle analysis | ✅ WORKING | `@next/bundle-analyzer` configured |
| Console stripping | ✅ WORKING | Production removes console.log/debug |
| Package import optimization | ✅ WORKING | lucide-react, sonner optimized |
| Service worker | ✅ WORKING | `public/sw.js` present |
| Middleware auth + rate limiting | ✅ WORKING | Per-IP in-memory rate limiting |
| Cloud API token auth | ✅ WORKING | Bearer token via middleware |
| Cloud audit logging | ✅ WORKING | GET /api/cloud/audit with filters |

---

## 6. Test Coverage

| Test File | Scope | Status |
|-----------|-------|--------|
| `routing.test.ts` | pathnameToView mapping | 🔄 REGRESSION — Stale VALID_VIEWS list (missing community, blog, changelog, interactive-docs) |
| `api-routes.test.ts` | Public API routes | ✅ WORKING |
| `rate-limit.test.ts` | Analytics rate limiting | ✅ WORKING |
| `cloud-store.test.ts` | Cloud data store | ✅ WORKING |
| `persistence.test.ts` | JSON file persistence | ✅ WORKING |
| `collection.test.ts` | Collection functionality | ✅ WORKING |
| `footer.test.tsx` | Footer component | ✅ WORKING |
| `utils.test.ts` | Utility functions | ✅ WORKING |

**Coverage gaps**: No tests for component rendering, navigation, playground, or theme toggle. This is expected for a landing platform but noted for future improvement.

---

## 7. Detailed Findings

### 🚫 MISSING Features

1. **Mobile nav: docsMenu items not exposed** — 5 views (learning, interactive-docs, architecture, platform-architecture, blog) are only accessible via the desktop Docs mega-menu. Mobile users have no way to reach them except by typing the URL directly.

2. **Global search** — No site-wide search (e.g., Cmd+K) that searches across docs, effects, blog posts, etc.

### ⚠️ PARTIAL Features

1. **Mobile nav: Docs is a direct link, not expandable** — The mobile "Docs" button navigates directly to `/docs` instead of expanding to show sub-items like the desktop mega-menu does.

2. **Nav placeholder items** — 6 items in the Platform mega-menu (Ferrum Runtime, Motion, Physics, VFX, Tokens, Compiler, Adapters) have no navigation target and display as disabled/"Coming soon". This is intentional but noted.

3. **Audit log API missing error handling** — `GET /api/cloud/audit` has no try/catch wrapper unlike all other API routes.

4. **Middleware crashes without env var** — Missing `CLOUD_API_TOKEN` env var causes a module-level throw that prevents the app from starting entirely, rather than gracefully degrading.

### 🔄 REGRESSION

1. **Routing test stale** — `__tests__/routing.test.ts` has its own copy of `VALID_VIEWS` that is missing 4 views added since the test was written (community, blog, changelog, interactive-docs). The test doesn't import from `@/lib/view-meta`.

### Dead Code

1. **`communityMenu` export** — Defined in `nav-data.ts` but never imported anywhere.

---

## 8. Recommended Actions

### Priority: HIGH

1. **Add docsMenu items to mobile nav** — Import `docsMenu` in `nav-mobile.tsx` and add a "Docs" expandable section similar to how Platform and More work.

2. **Fix routing test** — Import `VALID_VIEWS` from `@/lib/view-meta` instead of maintaining a duplicate list, or update the local list to match.

3. **Graceful middleware env var handling** — Change `throw new Error(...)` to a warning log or conditional middleware skip when `CLOUD_API_TOKEN` is not set.

### Priority: MEDIUM

4. **Remove dead `communityMenu` export** or use it in the mobile nav.

5. **Add try/catch to `/api/cloud/audit`** route for consistency.

### Priority: LOW

6. **Consider global search** (Cmd+K) for site-wide content discovery.

7. **Add component rendering tests** for critical views (effects, playground, nav).

---

*End of audit report.*
