# FerrumEngine Platform Audit Report

**Date**: 2026-08-12 (originally 2025-08-12 — year typo fixed in reconciliation)
**Auditor**: Platform Audit Engineer (Task ID: 3)
**Last verified**: 2026-08-12 (Documentation Reconciliation — Task ID: 10)
**Codebase**: FerrumEngine/FerrumCSS
**Scope**: Full platform — every component, route, link, form, animation, and interaction

---

## Executive Summary

| Severity | Count | Description |
|----------|-------|-------------|
| **CRITICAL** | 0 | No critical issues found |
| **WARNING** | 1 | 7 placeholder nav items (badge added, originally 4)
| **INFO** | 11 | Code quality observations, minor improvements |

> **Reconciliation note (Task ID: 10)**: Original audit found 5 WARNINGs and 11 INFOs. WARNING-1 (dead communityMenu), WARNING-3 (outdated API docs), WARNING-4 (missing aria-label), WARNING-5 (dead mobile nav reference), INFO-3 (aria-modal), INFO-4 (ARIA roles), INFO-6 (_compact prop), INFO-7 (audit try/catch) were all fixed in Phases 8-9 and 10. Remaining: 1 WARNING (placeholder nav items — intentional), 4 INFO items.

**Overall Assessment**: The codebase is well-structured with strong typing, good accessibility patterns, and thorough error handling. No critical issues were found. The warnings are non-blocking but should be addressed before release.

### Code Quality Metrics

| Metric | Value |
|--------|-------|
| Total source files (TS/TSX) | 123 |
| Total LOC (src/) | 19,773 |
| Components (ferrum/) | 55 files |
| API routes | 12 |
| SPA routes | 17 (16 in next.config.ts + 1 static /cloud) |
| ViewIds registered | 17 |
| Test suite | 95/95 passing, 0 skipped |
| Build time | ~3.2s |
| Dynamic chunks | 26+ |

---

## 1. CRITICAL Issues

No critical issues found. All API routes compile and pass TypeScript checks.

---

## 2. WARNING Issues

### WARNING-1: Dead export — `communityMenu` in nav-data.ts

**File**: `src/components/ferrum/nav-data.ts`, line 61
**Severity**: WARNING — dead code, no runtime error

`communityMenu` is defined and exported but never imported by any consumer (nav.tsx, nav-mobile.tsx). The Community nav button in `nav.tsx` (line 95) uses a direct `NavButton` instead of a mega-menu, so `communityMenu` is unreachable.

**Fix**: Remove the `communityMenu` export, or wire it into the desktop nav as a mega-menu trigger.

### WARNING-2: Four nav-data items have no view/href action ("Coming soon")

**File**: `src/components/ferrum/nav-data.ts`, lines 20-24, 30-33
**Severity**: WARNING — confusing UX

The following mega-menu items have neither a `view` nor an `href`, rendering them as non-interactive placeholders with opacity-60 and "Coming soon" labels:

1. **Ferrum Runtime** (platformMenu → Core Engines)
2. **Ferrum Motion** (platformMenu → Core Engines)
3. **Ferrum Physics** (platformMenu → Core Engines)
4. **Ferrum VFX** (platformMenu → Core Engines)
5. **Ferrum Tokens** (platformMenu → Build System)
6. **Ferrum Compiler** (platformMenu → Build System)
7. **Framework Adapters** (platformMenu → Build System)

In `nav-mega-menu.tsx` lines 103-107, these render as `<div aria-disabled="true">` with cursor-default. This is properly handled but may confuse users. The desktop mega-menu correctly shows "Coming soon" via nav-mobile.tsx line 196.

**Recommendation**: Add `badge: "Coming soon"` to these items for desktop consistency.

### WARNING-3: API root endpoint references outdated effect name prefix

**File**: `src/app/api/route.ts`, line 14
**Severity**: WARNING — incorrect documentation

```typescript
endpoints: {
  css: "/api/css?effect=rc-fade-up&format=css",  // "rc-" is the OLD prefix
  all: "/api/css?all=true",
  category: "/api/css?category=hover&minified=true",
  json: "/api/css?category=hover&format=json",
},
```

The effect class names in the codebase use the `roycss-` prefix (e.g., `roycss-fade-up`). The `rc-fade-up` example would return a 404. The `/api/css` route itself (line 59) correctly shows `fr-fade-in` as an example, which is also incorrect — should be `roycss-fade-in`.

**Fix**: Update both examples to use `roycss-` prefixed names.

### WARNING-4: Cloud login form missing `aria-label` on password input

**File**: `src/app/cloud/cloud-dashboard-client.tsx`, line 138
**Severity**: WARNING — accessibility

```tsx
<Input type="password" placeholder="Password" value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleLogin()} autoFocus />
```

The password input has no associated `<label>`, `aria-label`, or `aria-labelledby`. Screen readers will announce it as an unlabeled text field.

**Fix**: Add `aria-label="Dashboard password"` to the `<Input>`.

### WARNING-5: `communityMenu` not used in mobile nav either

**File**: `src/components/ferrum/nav-mobile.tsx`, line 155
**Severity**: WARNING — dead data

The mobile nav defines Community as a direct NavButton (`id: "community" as ViewId`), not as a mega-menu trigger. So `communityMenu` is completely unused across both desktop and mobile navigation.

---

## 3. INFO Observations

### INFO-1: Duplicate 404 handling

Both `src/app/not-found.tsx` and `home-client.tsx` lines 341-364 render a 404 page. The SPA router in home-client.tsx handles unknown paths client-side, while Next.js `not-found.tsx` handles server-side 404s. This is intentional (defense in depth) but means two different 404 UIs exist:
- `not-found.tsx`: Uses `<Link href="/">` (full page reload) and has a "Reload Page" button
- `home-client.tsx`: Uses `navigate("home")` (SPA navigation) and has no reload button

**Recommendation**: Consider unifying the 404 design.

### INFO-2: SEO content is `aria-hidden` but contains semantic landmarks

**File**: `src/components/ferrum/seo-content.tsx`

The SEO content is wrapped in `aria-hidden="true"` (line 25) but contains `<nav>` and `<article>` landmarks. While this is correct for hiding from screen readers (the content is for crawlers), some SEO validators may flag the `aria-hidden` on landmarks. This is a known pattern and acceptable.

### INFO-3: ColorCustomizer panel has `role="dialog"` but no `aria-modal`

**File**: `src/components/ferrum/color-customizer.tsx`, line 143

The color picker dropdown uses `role="dialog"` and `aria-label` but lacks `aria-modal="true"`. This means screen readers can still interact with content behind the panel.

**Fix**: Add `aria-modal="true"` or downgrade to `role="listbox"`.

### INFO-4: ThemeToggle dropdown lacks `role="menu"` and `role="menuitem"`

**File**: `src/components/theme-toggle.tsx`, lines 109-135

The theme dropdown uses plain `<button>` elements without ARIA menu pattern (`role="menu"` / `role="menuitem"`, `aria-activedescendant`). Arrow key navigation is handled via JS but the ARIA roles are missing.

### INFO-5: No `<form>` elements used anywhere in the SPA

The entire SPA uses controlled `<Input>` + `onKeyDown` patterns instead of `<form>` + `onSubmit`. While this works, it means:
- No native form validation
- No form `action` attribute for progressive enhancement
- Enter-to-submit is handled manually per-input

This affects: cloud login, color customizer hex input, create team/project/token modals.

### INFO-6: `effects-view.tsx` has unused `_compact` parameter

**File**: `src/components/ferrum/effects-view.tsx`, line 25

```typescript
const HeartButton = memo(function HeartButton({ effectClassName, isInCollection, onToggle, compact: _compact }: {
```

The `compact` prop is accepted but aliased to `_compact` and never used. This is dead code.

### INFO-7: Cloud audit route lacks error handling

**File**: `src/app/api/cloud/audit/route.ts`

Unlike all other API routes, the audit endpoint has no try/catch wrapper:

```typescript
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // ... no try/catch
  const store = getCloudStore();
  const logs = store.getAuditLogs(teamId, limit);
  return NextResponse.json(logs);
}
```

If `getCloudStore()` or `getAuditLogs()` throws, the server returns an unformatted 500 error.

### INFO-8: `health/route.ts` version is hardcoded

**File**: `src/app/api/health/route.ts`, line 29

```typescript
const VERSION = "0.0.1";
```

This should ideally import from `package.json` for consistency with the layout metadata (which does `import { version } from "../../package.json"`).

### INFO-9: `analytics/route.ts` silently discards valid payloads

**File**: `src/app/api/analytics/route.ts`

The endpoint validates input but doesn't actually store or process the analytics data. It returns `{ ok: true }` for all valid payloads. The comment on line 95 says "silently logged in dev via debug flag" but no logging actually occurs.

### INFO-10: Service Worker registration uses inline script

**File**: `src/app/layout.tsx`, lines 233-237

```tsx
<script dangerouslySetInnerHTML={{ __html: `window.addEventListener("load",function(){...})` }} />
```

This inline script is required for SW registration but is blocked by the production CSP (`script-src 'self'`). The SW will not register in production. Additionally, there's no `public/sw.js` file to register.

---

## 4. Component Inventory

### 4.1 Navigation Components

| Component | File | LOC | Props | Key Interactions | A11y |
|-----------|------|-----|-------|-----------------|------|
| Nav | nav.tsx | 139 | `currentView`, `onNavigate` | Scroll-aware bg, mega-menu, mobile toggle | ✅ skip-link, aria-label, aria-expanded, focus-visible |
| MobileNav | nav-mobile.tsx | 206 | `open`, `onClose`, `currentView`, `onNavigate` | Submenu expand, body scroll lock, focus trap | ✅ role=navigation, focus trap, escape key |
| MegaMenuPanel | nav-mega-menu.tsx | 162 | `groups`, `menuId`, `onNavigate`, `onClose` | Hover/click to open, external links vs nav | ✅ aria-haspopup, aria-expanded |
| DesktopMegaTrigger | nav-mega-menu.tsx | 162 | (part of above) | Mouse enter/leave with 400ms debounce | ✅ aria-expanded, aria-haspopup |
| ScrollProgress | scroll-progress.tsx | 83 | none | rAF-throttled scroll, back-to-top button | ✅ role=progressbar, aria-valuenow, aria-label |

### 4.2 Animated Components

| Component | File | Reduced Motion |
|-----------|------|----------------|
| Magnetic | animated-components.tsx | ✅ Checks `shouldReduceMotion()`, skips transform |
| ShineButton | animated-components.tsx | ✅ Omits shine overlay |
| PulsingDot | animated-components.tsx | ✅ Renders static dot only |

### 4.3 Effects System

| Component | File | LOC | Notes |
|-----------|------|-----|-------|
| EffectsView | effects-view.tsx | 266 | Search, category filter, virtual grid, heart/save |
| EffectPreview | effect-preview.tsx | — | Renders effect CSS in isolated preview |
| EffectDetailModal | effects-detail-modal.tsx | 227 | Code view, copy, add-to-collection |
| CollectionDrawer | collection-drawer.tsx | 131 | Slide-out drawer, copy all, clear |

### 4.4 Playground

| Component | File | LOC |
|-----------|------|-----|
| PlaygroundV2 | playground/index.tsx | 360 |
| ControlsPanel | playground/controls-panel.tsx | 471 |
| EffectSidebar | playground/effect-sidebar.tsx | 234 |
| PreviewPanel | playground/preview-panel.tsx | — |
| CodeEditor | playground/code-editor.tsx | — |
| Toolbar | playground/toolbar.tsx | 224 |

### 4.5 Interactive Docs

| Component | File | LOC |
|-----------|------|-----|
| InteractiveDocsView | interactive-docs-view.tsx | 302 |
| ExplanationPanel | interactive-docs/explanation-panel.tsx | — |
| LessonSidebar | interactive-docs/lesson-sidebar.tsx | — |
| CodePlayground | interactive-docs/code-playground.tsx | — |

### 4.6 Content Views

| View | File | LOC |
|------|------|-----|
| BlogView | blog-view.tsx | 496 |
| ChangelogView | changelog-view.tsx | 510 |
| DocsView | docs-view.tsx | 517 |
| ArchitectureDeepDive | architecture-deep-dive.tsx | 562 |
| ShowcaseGallery | sections/showcase-gallery.tsx | 212 |
| LearningCenter | sections/learning-center.tsx | 223 |
| EnterpriseComponents | sections/enterprise-components.tsx | 304 |
| PlatformArchitecture | sections/platform-architecture.tsx | 294 |

### 4.7 Home Sections (12 sections)

All lazy-loaded via `dynamic()` with `ssr: false`:
hero-section, problem-section, marquee-section, playground-section, overview-section, architecture-section, dev-journey-section, live-examples-section, enterprise-section, roadmap-section, community-section, platform-footer-section.

### 4.8 Other Sections

ferrum-principles, ferrum-story, vision-manifesto, hall-of-fame, enterprise, footer, illustrations, section-helpers, counter, learning-center.

### 4.9 UI Primitives

badge, button, card, input, label, modal-overlay, scroll-area, select, skeleton, slider, table, tooltip — all in `src/components/ui/`.

---

## 5. Route Audit

### 5.1 SPA Routes — Alignment Check

| ViewId | next.config.ts | VALID_VIEWS | Nav Data | Status |
|--------|---------------|-------------|----------|--------|
| principles | ✅ | ✅ | — | ✅ |
| architecture | ✅ | ✅ | docsMenu (view) | ✅ |
| platform-architecture | ✅ | ✅ | docsMenu (view) | ✅ |
| hall-of-fame | ✅ | ✅ | moreMenu (view) | ✅ |
| showcase | ✅ | ✅ | NavButton (direct) | ✅ |
| learning | ✅ | ✅ | docsMenu (view) | ✅ |
| story | ✅ | ✅ | moreMenu (view) | ✅ |
| enterprise | ✅ | ✅ | NavButton (direct) | ✅ |
| enterprise-components | ✅ | ✅ | moreMenu (view) | ✅ |
| vision | ✅ | ✅ | moreMenu (view) | ✅ |
| effects | ✅ | ✅ | NavButton (direct) | ✅ |
| docs | ✅ | ✅ | docsMenu (view) | ✅ |
| playground | ✅ | ✅ | NavButton (direct) | ✅ |
| community | ✅ | ✅ | NavButton (direct) | ✅ |
| blog | ✅ | ✅ | docsMenu (view) | ✅ |
| changelog | ✅ | ✅ | moreMenu (view) | ✅ |
| interactive-docs | ✅ | ✅ | docsMenu (view) | ✅ |
| home | (root `/`) | ✅ | Logo button | ✅ |

**Result**: All 17 ViewIds are aligned across types.ts, view-meta.ts, next.config.ts, and nav-data.ts. **Zero mismatches.**

### 5.2 Server Pages

| Page | Metadata/SEO | Status |
|------|--------------|--------|
| / (page.tsx) | Layout-level metadata + SeoContent | ✅ |
| /cloud (cloud/page.tsx + layout.tsx) | Custom metadata in layout.tsx | ✅ |
| /privacy (privacy/page.tsx) | Full metadata, OG, canonical | ✅ |
| /terms (terms/page.tsx) | Full metadata, OG, canonical | ✅ |
| /not-found (not-found.tsx) | Uses Next.js default | ✅ |
| /error (error.tsx) | Uses Next.js default | ✅ |

### 5.3 API Routes

| Route | Methods | Input Validation | Error Handling | Auth | Rate Limit | Status |
|--------|---------|-----------------|----------------|------|-------------|--------|
| /api | GET | N/A | try/catch | None | None | ✅ |
| /api/health | GET | N/A | try/catch per service | None | None | ✅ |
| /api/css | GET | Query param validation | try/catch | None | None | ✅ |
| /api/tokens | GET | N/A | try/catch | None | None | ✅ |
| /api/analytics | POST | Field presence + type checks | try/catch | None | In-memory (30/min) | ✅ |
| /api/cloud/auth | POST | Password string check | try/catch | Timing-safe compare | 10/15min (middleware) | ✅ |
| /api/cloud/teams | GET, POST | Name 2-50 chars | try/catch | Bearer token | 100/min (middleware) | ✅ |
| /api/cloud/teams/[id] | GET, PUT, DELETE | JSON parse | try/catch | Bearer token | 100/min (middleware) | ✅ |
| /api/cloud/teams/[id]/projects | GET, POST | Name 2-60, env enum | try/catch | Bearer token | 100/min (middleware) | ✅ |
| /api/cloud/projects/[id]/tokens | GET, POST | Name, value, type, namespace | try/catch | Bearer token | 100/min (middleware) | ✅ |
| /api/cloud/projects/[id]/components | GET | N/A | try/catch | Bearer token | 100/min (middleware) | ✅ |
| /api/cloud/tokens/[id] | PUT | Field whitelist + type | try/catch | Bearer token | 100/min (middleware) | ✅ |
| /api/cloud/audit | GET | Limit 1-50 clamp | try/catch (added Phase 8-9) | Bearer token | 100/min (middleware) | ✅ |

---

## 6. Navigation Audit

### 6.1 Desktop Nav (nav.tsx)

Top-level items:
- **Platform** → MegaMenu (platformMenu)
- **Playground** → Direct NavButton
- **Showcase** → Direct NavButton
- **Docs** → MegaMenu (docsMenu)
- **Community** → Direct NavButton
- **More** → MegaMenu (moreMenu)
- **Pricing** → Direct NavButton (→ enterprise view)
- **Browse Effects** → CTA button (→ effects view)
- **GitHub** → External link
- **ColorCustomizer** → Dropdown panel
- **ThemeToggle** → Cycle/dropdown

### 6.2 Mobile Nav (nav-mobile.tsx)

Top-level items:
- Platform → Expandable (platformMenu)
- Playground → Direct
- Showcase → Direct
- Docs → Expandable (docsMenu) with PulsingDot
- Community → Direct
- More → Expandable (moreMenu)
- Pricing → Direct (enterprise view)
- Bottom: ThemeToggle, GitHub link, Browse Effects CTA

**Alignment**: Mobile nav items match desktop nav items. ✅

### 6.3 Mega Menu Links Verification

**platformMenu**:
| Item | Action | Valid? |
|------|--------|--------|
| Ferrum Runtime | None (placeholder) | ⚠️ No action |
| Ferrum Motion | None (placeholder) | ⚠️ No action |
| Ferrum Physics | None (placeholder) | ⚠️ No action |
| Ferrum VFX | None (placeholder) | ⚠️ No action |
| Effects Gallery | view: "effects" | ✅ |
| Ferrum Tokens | None (placeholder) | ⚠️ No action |
| Ferrum Compiler | None (placeholder) | ⚠️ No action |
| Framework Adapters | None (placeholder) | ⚠️ No action |

**docsMenu**:
| Item | Action | Valid? |
|------|--------|--------|
| Getting Started | view: "docs" | ✅ |
| Learning Center | view: "learning" | ✅ |
| Interactive Docs | view: "interactive-docs" | ✅ |
| Architecture | view: "architecture" | ✅ |
| Platform Architecture | view: "platform-architecture" | ✅ |
| Blog | view: "blog" | ✅ |

**moreMenu**:
| Item | Action | Valid? |
|------|--------|--------|
| Story | view: "story" | ✅ |
| Vision | view: "vision" | ✅ |
| Hall of Fame | view: "hall-of-fame" | ✅ |
| Enterprise Components | view: "enterprise-components" | ✅ |
| Changelog | view: "changelog" | ✅ |

**communityMenu** (UNUSED — see WARNING-1):
| Item | Action | Valid? |
|------|--------|--------|
| GitHub | href: GITHUB_REPO | ✅ (but unreachable) |

---

## 7. Animation Audit

### 7.1 CSS Keyframes (globals.css)

| Keyframe | Purpose | Reduced Motion |
|----------|---------|----------------|
| `ferrum-gradient-shift` | Gradient text shimmer | ✅ Killed by global `*` rule |
| `ferrum-aurora-1/2/3` | Hero background blobs | ✅ Explicitly killed by named rule |
| `ferrum-grid-drift` | Grid background animation | ✅ Killed by global rule |
| `ferrum-shimmer-bar` | Loading shimmer | ✅ Killed by global rule |
| `ferrum-pipeline-pulse` | Architecture section | ✅ Killed by global rule |
| `fade-up` | General entrance | ✅ Killed by global rule |
| `fadeIn` | Docs/nav transitions | ✅ Killed by global rule |
| `slideInLeft` | Docs sidebar | ✅ Killed by global rule |
| `fadeSlideUp` | General entrance | ✅ Killed by global rule |

### 7.2 Global Reduced Motion (globals.css:286-296)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .ferrum-aurora, .ferrum-aurora-1, .ferrum-aurora-2, .ferrum-aurora-3 {
    animation: none !important;
  }
}
```

**Coverage**: Comprehensive — kills ALL animations and transitions globally. ✅

### 7.3 JS-level Reduced Motion

Components with JS-level checks (13 files):
- `animated-components.tsx` — `shouldReduceMotion()` via matchMedia
- `scroll-progress.tsx` — `prefersReduced` check for smooth vs instant scroll
- `blog-view.tsx`, `changelog-view.tsx` — Intersection Observer animations
- `playground/controls-panel.tsx`, `playground/index.tsx` — Preview animations
- `architecture-data.ts`, `docs-data.ts` — Animation delays in section data
- `learning-center.tsx`, `vision-manifesto.tsx` — Scroll-triggered animations
- `logo.tsx` — SVG animation control
- `seo-content.tsx` — Animation mentions in content

### 7.4 Framer Motion Usage

**None found.** The codebase does not use `framer-motion`. All animations are CSS-native or JS (rAF/threshold). ✅

### 7.5 will-change Usage

- `scroll-progress.tsx:48` — `will-change-[width]` on progress bar ✅
- No excessive `will-change` usage found.

---

## 8. Form Audit

### 8.1 Cloud Dashboard Forms

| Form | Location | Input Type | Validation | Submit Handler | A11y |
|------|----------|------------|------------|----------------|------|
| Login | cloud-dashboard-client.tsx:138 | Password | `!loginPassword` | Enter key or button | ⚠️ Missing aria-label |
| Create Team | cloud-modals.tsx:19 | Text | `!teamName.trim()` | Enter key or button | ✅ Label + htmlFor |
| Create Project | cloud-modals.tsx:41 | Text + Select | `!projName.trim()` | Enter key or button | ✅ Label + htmlFor |
| Create Token | cloud-modals.tsx:73 | Text + Select | `!name.trim() \|\| !value.trim()` | Button only | ✅ Label + htmlFor |
| Edit Token | cloud-modals.tsx:114 | Text | None client-side | Button only | ✅ Label + htmlFor |

### 8.2 Effects Search

| Control | Location | Type | Validation | A11y |
|---------|----------|------|------------|------|
| Search input | effects-view.tsx:226 | Text | None | ✅ aria-label="Search effects" |
| Category pills | effects-view.tsx:236-238 | Button group | N/A | ✅ aria-pressed |

### 8.3 Color Customizer

| Control | Location | Type | Validation | A11y |
|---------|----------|------|------------|------|
| Hex input | color-customizer.tsx:206 | Text | `isValidHex()` | ✅ aria-label="Hex color value" |
| Apply button | color-customizer.tsx:218 | Button | `disabled={!isValidHex}` | ✅ |
| Preset swatches | color-customizer.tsx:187-199 | Button | N/A | ⚠️ Missing aria-label (has title) |

### 8.4 Interactive Docs Code Editor

| Control | Location | Type | Notes |
|---------|----------|------|-------|
| Code textarea | interactive-docs/code-playground.tsx | Textarea | User-edited code |
| Device size toggles | interactive-docs/code-playground.tsx | Button group | Desktop/Tablet/Mobile |
| Run/Reset/Solution/Copy | interactive-docs/code-playground.tsx | Buttons | Per-lesson controls |

---

## 9. Data Flow Audit

### 9.1 State Management

**AppContext** (`app-context.tsx`):
- Scope: Effects search, category, selected effect, detail modal, collection, hydration
- Pattern: `createContext` + `useContext` with provider
- Persistence: `localStorage` for collection (key: `ferrum-collection`)
- Hydration: `requestAnimationFrame` deferred read from localStorage
- Memoization: `useMemo` on value object, `useCallback` on all setters
- Error boundary: `ViewErrorBoundary` class component wraps each view

**Assessment**: Clean, minimal, well-memoized. No stale closure risks. ✅

### 9.2 Cloud State

**CloudStore** (`cloud-store.ts`):
- Pattern: Singleton class with in-memory arrays + file-based persistence
- Persistence: `persist.ts` — debounced (200ms), atomic writes (temp + rename), graceful shutdown
- Audit: All mutations logged with `addAudit()`
- Cascade deletes: Team → Members + Projects + Tokens + Components
- Thread safety: N/A (single-threaded Node.js)

**Assessment**: Appropriate for demo/MVP. Not production-ready (no real DB, no auth). ✅ for current scope.

### 9.3 API Type Safety

**api-types.ts**: Defines `CreateTeamBody`, `UpdateTeamBody`, `CreateProjectBody`, `CreateTokenBody` — all fields optional (validated at runtime). Routes use these types for request body parsing.

**Assessment**: Adequate. Could be stricter with Zod validation. ✅

### 9.4 Middleware

**middleware.ts** (217 LOC):
- Scope: `/api/cloud/:path*` only
- Auth: Constant-time token comparison, graceful degradation when `CLOUD_API_TOKEN` not set
- Rate limiting: In-memory Maps with periodic cleanup (5min), separate windows for auth (15min/10 req) and API (1min/100 req)
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`

**Assessment**: Well-documented, production-grade patterns for a single-instance deployment. ✅

---

## 10. Prioritized Recommendations

> **Note (Task ID: 10 — Documentation Reconciliation)**: The following issues from the original audit have been **fixed in subsequent phases** and are no longer actionable:
>
> - **WARNING-1**: `communityMenu` removed (Phase 8-9)
> - **WARNING-3**: `rc-fade-in`/`fr-fade-in` → `roycss-fade-in` in both API routes (Phase 8-9 + 10)
> - **WARNING-4**: `aria-label="Dashboard password"` added (Phase 8-9)
> - **WARNING-5**: N/A — `communityMenu` removed entirely
> - **INFO-3**: `aria-modal="true"` added (Phase 8-9)
> - **INFO-4**: `role="menu"` + `role="menuitem"` added (Phase 8-9)
> - **INFO-6**: `_compact` prop removed (Phase 8-9)
> - **INFO-7**: try/catch added to audit route (Phase 8-9)
>
> Remaining open items:

### P0 — Fix Immediately

No P0 issues.

### P1 — Fix Before Release

1. **WARNING-2**: Add `badge: "Coming soon"` to placeholder nav items — **DONE** (Phase 8-9)
2. **INFO-8**: Import version from package.json in health route

### P2 — Improve Quality

~~4. **WARNING-1**: Remove unused `communityMenu` export~~ — **DONE**
~~5. **WARNING-2**: Add `badge: "Coming soon"` to placeholder nav items~~ — **DONE**
~~6. **INFO-3**: Add `aria-modal` to ColorCustomizer dialog~~ — **DONE**
~~7. **INFO-4**: Add ARIA menu roles to ThemeToggle dropdown~~ — **DONE**
~~8. **INFO-6**: Remove unused `_compact` parameter from HeartButton~~ — **DONE**
9. **INFO-8**: Import version from package.json in health route

### P3 — Nice to Have

11. **INFO-1**: Unify 404 page design
12. **INFO-5**: Consider using `<form>` elements for better validation/progressive enhancement
13. **INFO-9**: Either implement analytics storage or remove the endpoint
14. **INFO-10**: Fix service worker registration (blocked by CSP) or remove it
