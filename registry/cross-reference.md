# Cross-Reference Analysis — FerrumEngine

Generated as part of Phase 2 Product Registry. Scans the entire `src/` directory for inconsistencies, gaps, and optimization opportunities.

---

## 1. Features Implemented but Not Documented

| Feature | Category | Implementation Files | Documentation Gap |
|---------|----------|---------------------|-------------------|
| Color Customizer | theme | `color-customizer.tsx` | Has inline comment but no standalone docs or user-facing guide |
| Scroll Progress Bar | navigation | `scroll-progress.tsx` | Has inline comment but no user guide |
| Effects Gallery (search/filter/pagination) | effects | `effects-view.tsx` | Has inline comment but no separate documentation |
| Collection Drawer | effects | `collection-dinder.tsx` | Has inline comment only |
| Architecture Deep Dive | architecture | `architecture-deep-dive.tsx` | Has section comments but no high-level feature doc |
| Documentation Viewer | documentation | `docs-view.tsx` | Has section comments but no standalone guide |
| Footer with Links | footer | `footer.tsx` | Tested but no feature-level documentation |
| Error Handling / Loading States | error-handling | Multiple files | Zero documentation — no error handling strategy doc |
| Cloud Dashboard | cloud | Multiple files | Zero documentation — entire feature is undocumented |
| Skip Link / Accessibility | accessibility | Scattered across files | No cohesive accessibility documentation |

**Total: 10 features with incomplete documentation**

---

## 2. Features Documented but Code Missing

| Documentation | Location | Issue |
|-------------|----------|-------|
| `@radix-ui/react-label` in UI components | `src/components/ui/label.tsx` | **Not imported anywhere in the app** — the Label component is dead code. Only used internally within its own file. |
| Button component (`src/components/ui/button.tsx`) | Registered as C001 | **Not used by any component in the project** — defined but never imported. Only uses `@radix-ui/react-slot`. Dead code. |
| Card component (`src/components/ui/card.tsx`) | Registered as C002 | **Not imported anywhere in the codebase** — defined but never used. Dead code. |
| Illustrations component | `src/components/ferrum/sections/illustrations.tsx` | Defined (349 lines) but **not imported by any file**. No exports consumed. Dead code. |
| PlatformHomepage component | `src/components/ferrum/sections/platform-homepage.tsx` | Defined (12 lines) but **not imported by any file**. Dead code. |

**Total: 5 components defined but unused (potential dead code)**

---

## 3. Components with No Tests

| Component | Path | Lines | Has Tests | Priority |
|-----------|------|-------|-----------|----------|
| Button | `src/components/ui/button.tsx` | 66 | ❌ | Low (unused) |
| Card | `src/components/ui/card.tsx` | 91 | ❌ | Low (unused) |
| Input | `src/components/ui/input.tsx` | 20 | ❌ | Medium |
| Badge | `src/components/ui/badge.tsx` | 49 | ❌ | Medium |
| Tooltip | `src/components/ui/tooltip.tsx` | 48 | ❌ | Medium |
| Label | `src/components/ui/label.tsx` | 23 | ❌ | Low (unused) |
| Slider | `src/components/ui/slider.tsx` | 43 | ❌ | Medium |
| Select | `src/components/ui/select.tsx` | 45 | ❌ | Medium |
| Skeleton | `src/components/ui/skeleton.tsx` | 13 | ❌ | Low |
| ScrollArea | `src/components/ui/scroll-area.tsx` | 25 | ❌ | Low |
| ModalOverlay | `src/components/ui/modal-overlay.tsx` | 79 | ❌ | Medium |
| Table | `src/components/ui/table.tsx` | 115 | ❌ | Medium |
| Logo | `src/components/logo.tsx` | 223 | ❌ | Low (SVG component) |
| ThemeProvider | `src/components/theme-provider.tsx` | 10 | ❌ | Low (trivial wrapper) |
| ThemeToggle | `src/components/theme-toggle.tsx` | 185 | ❌ | **High** |
| Nav (main nav) | `src/components/ferrum/nav.tsx` | 139 | ❌ | **High** |
| MobileNav | `src/components/ferrum/nav-mobile.tsx` | 202 | ❌ | **High** |
| MegaMenuPanel | `src/components/ferrum/nav-mega-menu.tsx` | 162 | ❌ | **High** |
| ScrollProgress | `src/components/ferrum/scroll-progress.tsx` | 83 | ❌ | Medium |
| ColorCustomizer | `src/components/ferrum/color-customizer.tsx` | 230 | ❌ | **High** |
| AppContext | `src/components/ferrum/app-context.tsx` | 142 | ❌ | Medium |
| AnimatedComponents | `src/components/ferrum/animated-components.tsx` | 231 | ❌ | Medium |
| EffectsView | `src/components/ferrum/effects-view.tsx` | 267 | ❌ | **High** |
| EffectDetailModal | `src/components/ferrum/effects-detail-modal.tsx` | 228 | ❌ | **High** |
| EffectPreview | `src/components/ferrum/effect-preview.tsx` | 75 | ❌ | Medium |
| CollectionDrawer | `src/components/ferrum/collection-drawer.tsx` | 131 | ❌ | Medium |
| DocsView | `src/components/ferrum/docs-view.tsx` | 518 | ❌ | **High** |
| ArchitectureDeepDive | `src/components/ferrum/architecture-deep-dive.tsx` | 563 | ❌ | **High** |
| PlaygroundV2 | `src/components/ferrum/playground/index.tsx` | 361 | ❌ | **High** |
| All playground sub-components | Various | ~1200 total | ❌ | **High** |
| All section components | Various | ~3700 total | ❌ | Medium |
| All cloud dashboard components | Various | ~850 total | ❌ | Medium |
| ErrorPageContent | `src/components/error-page-content.tsx` | 55 | ❌ | Low |
| DeferCSS | `src/components/defer-css.tsx` | 54 | ❌ | Low |

**Total: 69 of 71 components have NO tests (97% untested)**
Only `Footer` has tests (`__tests__/footer.test.tsx`).

---

## 4. Components with No Accessibility Attributes

| Component | Path | Missing A11y | Notes |
|-----------|------|-------------|-------|
| Card | `src/components/ui/card.tsx` | No a11y props | Unused component |
| Badge | `src/components/ui/badge.tsx` | No a11y props | |
| Input | `src/components/ui/input.tsx` | Partial | Has focus-visible via cn(), but no explicit aria-label pattern |
| Tooltip | `src/components/ui/tooltip.tsx` | Built-in (Radix) | Uses native Radix a11y |
| Skeleton | `src/components/ui/skeleton.tsx` | Has aria-hidden | ✅ Good |
| ScrollArea | `src/components/ui/scroll-area.tsx` | None | No role or labels |
| Table | `src/components/ui/table.tsx` | Partial | Has semantic HTML but no captions by default |
| HeroSection | `sections/home/hero-section.tsx` | Uses aria-hidden on decorative elements | ✅ Good pattern |
| All home sections | Various | No aria-labels on sections | Most sections lack section-level aria-labels |
| ShowcaseGallery | `sections/showcase-gallery.tsx` | No aria-labels | |
| HallOfFame | `sections/hall-of-fame.tsx` | No aria-labels | |
| Enterprise/EnterpriseComponents | Various | No aria-labels | |
| LearningCenter | `sections/learning-center.tsx` | No aria-labels | |
| PlatformArchitecture | `sections/platform-architecture.tsx` | No aria-labels | |
| Illustrations | `sections/illustrations.tsx` | No a11y | Unused |

**Total: ~15 components lack proper accessibility attributes**

---

## 5. API Routes Not Called by Any Frontend Code

| API Route | Method | Called By Frontend? | Notes |
|-----------|--------|-------------------|-------|
| `/api` | GET | ❌ (no direct fetch) | Only referenced via link in nav-data, not programmatically called |
| `/api/health` | GET | ❌ | Only for external monitoring tools |
| `/api/tokens` | GET | ❌ | Not called by any frontend code |
| `/api/analytics` | POST | ❌ | Not called by any frontend code (planned integration) |

**Total: 4 public API routes not called by frontend**

Note: All `/api/cloud/*` routes ARE called via `use-cloud-data.ts` and `use-cloud-auth.ts` hooks.

---

## 6. Dependencies That Could Be Removed

| Package | Version | Status | Recommendation |
|---------|---------|--------|----------------|
| `@radix-ui/react-label` | ^2.1.7 | **Removable** | Only used in `label.tsx` which itself is not imported anywhere. Dead dependency chain. |
| `@radix-ui/react-slot` | ^1.2.3 | Review | Used in `button.tsx` and `badge.tsx`, but both are dead components. If removed, this dep goes too. |
| `class-variance-authority` | — | **Already removed** | Listed in initial component analysis but NOT in `package.json` — already cleaned up. |

**Potential savings: 2 dependencies (`@radix-ui/react-label`, `@radix-ui/react-slot`) if dead UI components are removed.**

---

## 7. Files Exceeding Size Budgets

| File | Lines | Category | Budget | Status |
|------|-------|----------|-------|--------|
| `src/lib/ferrum-effects-data.ts` | 3,806 | Data | — | Data file, acceptable. Largest file in the project. |
| `src/lib/ferrum-effects-index.ts` | 631 | Data | — | Index file, acceptable. |
| `src/lib/docs-data.ts` | 984 | Data | — | Inline documentation content, acceptable. |
| `src/components/ferrum/architecture-data.ts` | ~2,200 | Data | — | Inline architecture documentation, acceptable. |
| `src/components/ferrum/playground-v2-data.ts` | ~880 | Data | — | Playground templates and code generators, acceptable. |
| `src/components/ferrum/playground/controls-panel.tsx` | 472 | Component | — | Largest component. Consider splitting Motion/Physics/Theme/A11y sections. |
| `src/components/ferrum/docs-view.tsx` | 518 | Component | — | Largest component. Consider extracting sidebar and content renderer. |
| `src/components/ferrum/architecture-deep-dive.tsx` | 563 | Component | — | Complex but well-structured with clear tab system. |
| `src/components/ferrum/sections/illustrations.tsx` | 349 | Component | — | **Dead code** — not imported anywhere. Could be removed entirely. |
| `src/components/ferrum/sections/home/hero-section.tsx` | 268 | Template | — | Complex hero, acceptable for a showcase page. |
| `src/components/ferrum/sections/enterprise-components.tsx` | 304 | Template | — | Acceptable. |
| `src/components/ferrum/sections/home/playground-section.tsx` | 190 | Template | — | Acceptable. |
| `src/components/logo.tsx` | 223 | Component | — | SVG logo, acceptable. |
| `src/lib/ferrum-tokens/index.cjs` | 822 | Data | — | Compiled token output, acceptable. |

**Total: 13 files over 200 lines. No files exceed reasonable budgets, but `illustrations.tsx` (349 lines) and `architecture-data.ts` (~2200 lines) should be reviewed.**

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total features identified | 18 |
| Total components | 71 |
| Total routes (page + API + special) | 19 |
| Total API endpoints | 17 |
| Total packages | 17 |
| Total documentation entries | 29 |
| Features with no docs | 10 |
| Dead/unused components | 5 |
| Components without tests | 69/71 (97%) |
| Components lacking a11y | ~15 |
| Uncalled public APIs | 4 |
| Removable dependencies | 2 |
| Files over 200 lines | 13 |
