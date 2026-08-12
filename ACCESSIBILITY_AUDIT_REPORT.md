# WCAG 2.2 AA Accessibility Audit Report

**Project:** FerrumEngine Landing Platform (Next.js 16)
**Date:** Phase 13 — Accessibility Audit
**Scope:** `src/` — all page components, UI primitives, nav, modals, drawers, playground
**Standard:** WCAG 2.2 Level AA

---

## Executive Summary

| Area                        | Rating   |
|-----------------------------|----------|
| Semantic HTML Structure     | ✅ PASS  |
| Keyboard Navigation         | ⚠️ PARTIAL |
| Focus Management            | ⚠️ PARTIAL |
| Color & Contrast            | ⚠️ PARTIAL |
| Motion & Reduced Motion     | ⚠️ PARTIAL |
| ARIA Usage                  | ⚠️ PARTIAL |
| Form & Input Accessibility  | ⚠️ PARTIAL |
| Image Accessibility         | ✅ PASS  |
| Screen Reader Support       | ✅ PASS  |

**Totals:** 3 ✅ PASS · 6 ⚠️ PARTIAL · 0 ❌ FAIL · 0 N/A

**Critical barriers:** None blocking, but several high-priority items need attention before a WCAG AA compliance claim can be made.

---

## 1. Semantic HTML Structure

### Rating: ✅ PASS

**Good practices found:**

| Practice | File:Line | Details |
|----------|-----------|---------|
| `<html lang="en">` | `layout.tsx:194` | Proper language attribute on root element |
| `<main>` landmark | `home-client.tsx:372` | `id="main-content" tabIndex={-1}` for skip-target and focus management |
| `<nav>` landmark | `nav.tsx:67` | `role="navigation" aria-label="Main navigation"` |
| `<footer>` landmark | `footer.tsx:48` | Semantic `<footer>` element used |
| Footer sub-navs | `footer.tsx:77` | Each column: `<nav aria-label="${col.title} links">` |
| `<header>` in hero | `hero-section.tsx:176` | Semantic header element with `id="hero"` |
| `<section>` labels | `effects-view.tsx:243` | `aria-label="Effects grid"` |
| Heading hierarchy | Multiple | h1 (hero) → h2 (sections) → h3 (subsections). No skipping detected. |
| Error boundary | `home-client.tsx:195` | `role="alert"` on error messages |
| 404 page | `not-found.tsx:8` | Uses `<main>`, proper heading hierarchy, `role="alert"` |
| SEO content | `seo-content.tsx:17-160` | Proper landmarks and headings for crawler/indexing accessibility |

**Observations:**

- Most home sections (problem, overview, architecture, etc.) use `<div>` instead of `<section>`. While not a WCAG violation, adding `<section aria-label="...">` would improve screen reader navigation. Low priority.

---

## 2. Keyboard Navigation

### Rating: ⚠️ PARTIAL

**Good practices found:**

| Practice | File:Line | Details |
|----------|-----------|---------|
| Skip-to-content link | `nav.tsx:73-76` | Visible on focus, targets `#main-content`, properly styled |
| Escape on modals | `effects-detail-modal.tsx:52` | Closes modal on Escape |
| Escape on drawer | `collection-drawer.tsx:44` | Closes drawer on Escape |
| Escape on mobile nav | `nav-mobile.tsx:58` | Closes mobile menu on Escape |
| Escape on mega menu | `nav.tsx:50` | Closes mega menu on Escape |
| Tab focus traps | Modal, Drawer, Mobile Nav | All overlays trap Tab/Shift+Tab |
| Arrow key tabs | `effects-detail-modal.tsx:98-110` | ArrowLeft/Right, Home/End on tablist |
| Focus-visible styles | `globals.css:299-303` | Global `:focus-visible` with purple ring |
| Component focus rings | Multiple | `focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2` on buttons |
| Touch targets | Multiple | `min-h-[44px] min-w-[44px]` on icon buttons (44px = WCAG 2.5.8 minimum) |

**Issues found:**

| # | Severity | Issue | File:Line | WCAG Criterion |
|---|----------|-------|-----------|---------------|
| K1 | **Medium** | `NavButton` (nav.tsx:129-138) lacks `aria-current="page"` when active and has no explicit `focus-visible` ring styles | `nav.tsx:131-134` | 2.4.7, 4.1.2 |
| K2 | **Low** | Theme toggle dropdown items have no `role="menuitem"` and don't follow ARIA menu pattern for arrow key navigation | `theme-toggle.tsx:119-131` | 4.1.2 |
| K3 | **Low** | Color customizer popup has no focus trap — Tab key escapes to page behind | `color-customizer.tsx:141-227` | 2.4.3, 2.1.2 |
| K4 | **Low** | Mega menu items (in `MegaMenuPanel`) lack keyboard navigation — only mouse/touch supported | `nav-mega-menu.tsx:24-117` | 2.1.1 |

**Recommendations:**

1. **K1:** Add `aria-current={currentView === view ? "page" : undefined}` to `NavButton`.
2. **K2:** Either add `role="menuitem"` to dropdown options and handle arrow keys, or use a proper ARIA listbox/combobox pattern.
3. **K3:** Use the existing `useFocusTrap` hook for the color customizer popup.
4. **K4:** Add keyboard event handling to `MegaMenuPanel` so Tab navigates through items and Escape closes.

---

## 3. Focus Management

### Rating: ⚠️ PARTIAL

**Good practices found:**

| Practice | File:Line | Details |
|----------|-----------|---------|
| Focus trap hook | `use-focus-trap.ts:16-65` | Reusable, handles Tab/Shift+Tab wrapping and Escape |
| Modal focus management | `effects-detail-modal.tsx:33-68` | Stores `previousFocusRef`, focuses first element, restores on close |
| Drawer focus management | `collection-drawer.tsx:32-59` | Same pattern — store, focus first, restore |
| Mobile nav focus trap | `nav-mobile.tsx:62-71` | Inline focus trap implementation |
| Route change focus | `home-client.tsx:247-252` | Focuses `#main-content` on view change for screen reader announcement |
| Hamburger refocus | `nav.tsx:61` | `useEffect` refocuses hamburger button when mobile menu closes |
| ModalOverlay | `modal-overlay.tsx:26-79` | Uses `useFocusTrap`, `aria-labelledby`, body scroll lock |
| Architecture sidebar | `architecture-deep-dive.tsx:14` | Uses `useFocusTrap` hook |

**Issues found:**

| # | Severity | Issue | File:Line | WCAG Criterion |
|---|----------|-------|-----------|---------------|
| F1 | **Medium** | Color customizer dialog (line 143) has `role="dialog"` but NO focus trap — Tab escapes | `color-customizer.tsx:141-227` | 2.4.3, 1.3.2 |
| F2 | **Low** | Theme toggle dropdown (line 110) has no focus containment | `theme-toggle.tsx:109-134` | 2.4.3 |
| F3 | **Low** | Some views (docs, playground, architecture) rendered WITHOUT `<main>` landmark — no `id="main-content"` | `home-client.tsx:299-339` | 1.3.1, 2.4.1 |

**Recommendations:**

1. **F1 (High priority):** Wrap the color customizer popup with `useFocusTrap` and store/restore previous focus.
2. **F2:** Consider adding basic focus containment for the theme dropdown.
3. **F3:** Wrap docs, playground, and architecture views in `<main id="main-content" tabIndex={-1}>` for consistent landmark and focus target behavior.

---

## 4. Color & Contrast

### Rating: ⚠️ PARTIAL

**Good practices found:**

| Practice | File:Line | Details |
|----------|-----------|---------|
| Design tokens | `globals.css:161-203` | Colors defined as CSS custom properties (oklch) in `:root` and `.dark` |
| `color-scheme` | `layout.tsx:109-110`, `globals.css:14,17` | Properly declared for light/dark |
| Primary text contrast | `globals.css:164/186` | Foreground/background tokens provide high contrast |
| Focus ring color | `globals.css:300` | Purple ring `rgb(168, 85, 247)` visible in both themes |
| Contrast checker | `controls-panel.tsx:376-396` | Playground has built-in contrast ratio display |

**Issues found:**

| # | Severity | Issue | File:Line | WCAG Criterion |
|---|----------|-------|-----------|---------------|
| C1 | **High** | `text-muted-foreground/40` used extensively for body text, descriptions, labels — estimated 2.5:1–3:1 contrast ratio (fails AA 4.5:1 for normal text) | 48+ files across components | 1.4.3 |
| C2 | **Medium** | `text-muted-foreground/50` used for section descriptions and navigation labels — estimated 3:1–3.5:1 (borderline for large text, fails for normal) | 48+ files | 1.4.3 |
| C3 | **Low** | `text-muted-foreground/30` used for very subtle labels — estimated 1.8:1–2.5:1 (fails AA) | Multiple files | 1.4.3 |

**Detailed analysis:**

- **Dark mode:** `--muted-foreground: oklch(0.70 0.008 260)` ≈ `#a1a1aa` on `--background: oklch(0.11 0.005 260)` ≈ `#18181b`
  - Full opacity: ~9.5:1 ✅
  - At 50%: ~3.5:1 ❌ (fails 4.5:1 for normal text)
  - At 40%: ~2.5:1 ❌
  - At 30%: ~1.8:1 ❌

- **Light mode:** `--muted-foreground: oklch(0.25 0.015 260)` ≈ `#3f3f46` on `--background: oklch(0.985 0.002 260)` ≈ `#fafafa`
  - Full opacity: ~11:1 ✅
  - At 50%: ~4.0:1 ❌
  - At 40%: ~2.8:1 ❌
  - At 30%: ~2.0:1 ❌

**Recommendations:**

1. **C1 (Critical for WCAG AA):** Replace `text-muted-foreground/40` with `text-muted-foreground/70` minimum for any text that conveys information. The 40% opacity level is decorative-only.
2. **C2:** Increase `text-muted-foreground/50` to at least `text-muted-foreground/65` for readable text content.
3. **C3:** Reserve `/30` opacity exclusively for decorative elements (dividers, placeholder dots) and never use it on readable text.
4. Consider creating explicit contrast-safe tokens: `--text-muted-safe` at ~65-70% opacity.

---

## 5. Motion & Reduced Motion

### Rating: ⚠️ PARTIAL

**Good practices found:**

| Practice | File:Line | Details |
|----------|-----------|---------|
| Global CSS media query | `globals.css:286-296` | `@media (prefers-reduced-motion: reduce)` kills all animation-duration, transition-duration, scroll-behavior |
| Aurora animations | `globals.css:293-295` | Explicitly stopped with `animation: none !important` |
| Magnetic component | `animated-components.tsx:37` | Checks `shouldReduceMotion()` before applying transform |
| ShineButton | `animated-components.tsx:85` | Conditionally renders shine effect only if not reduced motion |
| PulsingDot | `animated-components.tsx:101-113` | Renders static dot when reduced motion |
| Scroll-to-top | `scroll-progress.tsx:35-36` | `behavior: prefersReduced ? "instant" : "smooth"` |
| Marquee | `marquee-section.tsx:14` | `aria-hidden="true"` — decorative, not announced |
| Hero demo | `hero-section.tsx:42` | `aria-hidden="true"` — decorative |

**Issues found:**

| # | Severity | Issue | File:Line | WCAG Criterion |
|---|----------|-------|-----------|---------------|
| M1 | **Medium** | Logo SVG uses SMIL `<animate>` and `<animateTransform>` (lines 127-209) which are NOT affected by CSS `prefers-reduced-motion` media query | `logo.tsx:127-209` | 2.3.3 |
| M2 | **Low** | Hero section uses inline `style={{ animation: "..." }}` on pipeline pulse cards (line 121) which ARE stopped by the global CSS rule, but the CSS rule uses `!important` which may conflict with specificity expectations | `hero-section.tsx:121, 79` | 2.3.3 |

**Recommendations:**

1. **M1:** Add `media="(prefers-reduced-motion: no-preference)"` attribute to the inline SVG animations, or wrap them in CSS animations that respect the media query. Alternatively, add a CSS rule: `@media (prefers-reduced-motion: reduce) svg animate, svg animateTransform { display: none; }`

---

## 6. ARIA Usage

### Rating: ⚠️ PARTIAL

**Good practices found (46 files with ARIA attributes):**

| Pattern | File:Line | Details |
|---------|-----------|---------|
| `aria-label` on nav | `nav.tsx:67` | `aria-label="Main navigation"` |
| `aria-expanded` on hamburger | `nav.tsx:115` | `aria-expanded={mobileOpen}` |
| `aria-controls` on hamburger | `nav.tsx:115` | `aria-controls="mobile-menu"` |
| `aria-expanded` on mega trigger | `nav-mega-menu.tsx:147` | `aria-expanded={activeMenu === menuId}` |
| `aria-haspopup` | `nav-mega-menu.tsx:148`, `theme-toggle.tsx:101` | Indicates popup presence |
| `aria-modal` on dialogs | `effects-detail-modal.tsx:78`, `collection-drawer.tsx:68`, `modal-overlay.tsx:70` | `aria-modal="true"` |
| `aria-label` on drawer | `collection-drawer.tsx:69` | `aria-label={title}` |
| `role="tablist/tab/tabpanel"` | `effects-detail-modal.tsx:112,119,131` | Full tabs pattern with `aria-selected`, roving tabindex |
| `role="switch"` + `aria-checked` | `controls-panel.tsx:368-369` | Reduced motion toggle |
| `role="progressbar"` | `scroll-progress.tsx:43-47` | With `aria-valuenow/min/max` |
| `aria-live="polite"` | `effects-view.tsx:232,248`, `counter.tsx:21` | Collection count, filter results, animated counters |
| `aria-hidden` decorative | `hero-section.tsx:42,177`, `marquee-section.tsx:14`, `scroll-progress.tsx:59`, `not-found.tsx:10` | Properly marks decorative elements |
| `aria-label` on icon buttons | `effects-view.tsx:103,105`, `collection-drawer.tsx:119`, `scroll-progress.tsx:57` | All icon-only buttons have descriptive labels |
| `aria-pressed` on category pills | `effects-view.tsx:127` | Toggle button pattern |
| `aria-labelledby` | `modal-overlay.tsx:71` | Proper dialog labeling |
| `sr-only` text | `nav.tsx:106`, `color-customizer.tsx:137` | Screen reader only labels |

**Issues found:**

| # | Severity | Issue | File:Line | WCAG Criterion |
|---|----------|-------|-----------|---------------|
| A1 | **Medium** | Mobile nav uses `role="menu"` (line 78) but items use `<button>` without `role="menuitem"` — ARIA spec requires children of `role="menu"` to have `role="menuitem"` | `nav-mobile.tsx:78,86-113` | 4.1.2 |
| A2 | **Low** | Theme toggle dropdown has no `role="menu"` or `role="listbox"` on the container, and items have no ARIA role | `theme-toggle.tsx:110-134` | 4.1.2 |
| A3 | **Low** | Some `title` attributes on buttons (e.g., `effects-view.tsx:103` `title="Replay"`) duplicate the `aria-label` — not harmful but redundant | Multiple | — |

**Recommendations:**

1. **A1:** Either add `role="menuitem"` to all mobile nav buttons, or change the container from `role="menu"` to a generic `<div>` with `aria-label="Mobile navigation"` (which it already has). The simplest fix is removing `role="menu"` since the items don't behave as ARIA menu items (no arrow key navigation between them).
2. **A2:** Add `role="menu"` to the dropdown container and `role="menuitem"` to each option, or use `role="listbox"` + `role="option"`.

---

## 7. Form & Input Accessibility

### Rating: ⚠️ PARTIAL

**Good practices found:**

| Practice | File:Line | Details |
|----------|-----------|---------|
| `aria-label` on color inputs | `controls-panel.tsx:289,296,309,316` | All color picker and hex inputs labeled |
| `aria-label` on sliders | `controls-panel.tsx:99,114,210,225,240,255,326,342` | All sliders have descriptive labels |
| `aria-valuenow/min/max` on sliders | `slider.tsx:27-31` | Full range semantics |
| `aria-label` on selects | `select.tsx:10,34`, `controls-panel.tsx:131,164,178,192` | All select elements labeled |
| `aria-label` on hex input | `color-customizer.tsx:215` | `aria-label="Hex color value"` |
| `focus-visible` on Input | `input.tsx:11` | `focus-visible:border-ring focus-visible:ring-ring/50` |
| `aria-invalid` handling | `input.tsx:12` | `aria-invalid:ring-destructive/20` |
| Touch target size | Multiple buttons | `min-h-[44px]` on interactive elements |

**Issues found:**

| # | Severity | Issue | File:Line | WCAG Criterion |
|---|----------|-------|-----------|---------------|
| I1 | **High** | Effects view search input has NO `aria-label` or associated `<label>` — relies only on `placeholder` text | `effects-view.tsx:226` | 1.3.1, 3.3.2 |
| I2 | **Medium** | Blog view search input needs verification for `aria-label` | `blog-view.tsx` | 1.3.1 |
| I3 | **Low** | Playground sidebar search input needs verification | `effect-sidebar.tsx` | 1.3.1 |

**Recommendations:**

1. **I1 (High priority):** Add `aria-label="Search effects"` to the `<Input>` in `effects-view.tsx:226`.
2. **I2, I3:** Audit these inputs and add `aria-label` if missing.

---

## 8. Image Accessibility

### Rating: ✅ PASS

| Practice | Details |
|----------|---------|
| No `<img>` elements | No raster/bitmap images found in TSX components — the platform uses CSS, SVG, and icon fonts exclusively |
| Logo SVG has `aria-label` | `logo.tsx:25`: `aria-label="FerrumEngine logo"` |
| Decorative SVGs marked | `scroll-progress.tsx:59`, `not-found.tsx:10,25,32`: `aria-hidden="true"` on decorative icons |
| Icon-only buttons labeled | All Lucide icon buttons have `aria-label` (e.g., `effects-view.tsx:103-105`, `collection-drawer.tsx:119`) |
| `sr-only` for icon context | `nav.tsx:106`, `color-customizer.tsx:137`: Screen-reader-only text supplements icons |
| Hero demo marked decorative | `hero-section.tsx:42`: `aria-hidden="true"` on visual demo |
| Marquee marked decorative | `marquee-section.tsx:14`: `aria-hidden="true"` |

---

## 9. Screen Reader Support

### Rating: ✅ PASS

| Practice | File:Line | Details |
|----------|-----------|---------|
| Focus management on route change | `home-client.tsx:247-252` | Focuses `#main-content` so screen readers announce the new view |
| `aria-live` for dynamic counts | `effects-view.tsx:232`: collection count badge, `effects-view.tsx:248`: filter results count |
| `aria-live` for animated values | `counter.tsx:21`: `aria-live="polite" aria-atomic="true"` on counter |
| `role="alert"` on errors | `home-client.tsx:195`: error boundary, `not-found.tsx:16`: 404 message |
| Skip-to-content | `nav.tsx:73-76` | Allows keyboard users to bypass navigation |
| SEO content for crawlers | `seo-content.tsx:17-160` | Structured content with landmarks and headings (visually hidden but in DOM) |
| Meaningful page titles | `home-client.tsx:258-296` | `document.title` updated per view with descriptive titles |
| JSON-LD structured data | `layout.tsx:120-186` | Organization, WebSite, SoftwareApplication, BreadcrumbList schemas |

**Observations:**

- Route changes don't use an `aria-live` region to announce the new view name. The focus shift to `#main-content` provides implicit announcement, but an explicit `aria-live="assertive"` region with the view title would be more reliable. This is a nice-to-have improvement.

---

## Prioritized Fix List

### Critical (Fix before claiming WCAG AA compliance)

| # | Area | Issue | Effort |
|---|------|-------|--------|
| C1 | Color | Replace `text-muted-foreground/40` with higher-opacity alternatives for all readable text | Medium |
| I1 | Forms | Add `aria-label="Search effects"` to effects view search input | Trivial |

### High Priority

| # | Area | Issue | Effort |
|---|------|-------|--------|
| C2 | Color | Audit and increase `text-muted-foreground/50` usage on body text | Medium |
| F1 | Focus | Add focus trap to color customizer popup | Small |
| K1 | Keyboard | Add `aria-current="page"` to active NavButton | Trivial |
| A1 | ARIA | Fix mobile nav `role="menu"` mismatch (remove role or add menuitem roles) | Small |
| M1 | Motion | Stop SVG SMIL animations on reduced-motion preference | Small |

### Medium Priority

| # | Area | Issue | Effort |
|---|------|-------|--------|
| F3 | Focus | Wrap docs/playground/architecture views in `<main>` landmark | Small |
| K4 | Keyboard | Add keyboard navigation to mega menu panel | Medium |
| C3 | Color | Audit `text-muted-foreground/30` — ensure never used on readable text | Small |

### Low Priority (Polish)

| # | Area | Issue | Effort |
|---|------|-------|--------|
| K2 | Keyboard | Improve theme toggle ARIA pattern | Small |
| K3 | Focus | Add focus trap to theme toggle dropdown | Small |
| F2 | Focus | Add focus containment to theme dropdown | Small |
| A2 | ARIA | Add roles to theme toggle dropdown items | Small |
| A3 | ARIA | Clean up redundant `title` + `aria-label` on icon buttons | Trivial |

---

## Files Audited

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/home-client.tsx`
- `src/app/not-found.tsx`
- `src/app/globals.css`
- `src/app/critical.css`
- `src/components/ferrum/nav.tsx`
- `src/components/ferrum/nav-mobile.tsx`
- `src/components/ferrum/nav-mega-menu.tsx`
- `src/components/ferrum/sections/footer.tsx`
- `src/components/ferrum/sections/home/hero-section.tsx`
- `src/components/ferrum/sections/home/marquee-section.tsx`
- `src/components/ferrum/sections/home/counter.tsx`
- `src/components/ferrum/effects-detail-modal.tsx`
- `src/components/ferrum/collection-drawer.tsx`
- `src/components/ferrum/effects-view.tsx`
- `src/components/ferrum/scroll-progress.tsx`
- `src/components/ferrum/color-customizer.tsx`
- `src/components/ferrum/animated-components.tsx`
- `src/components/ferrum/architecture-deep-dive.tsx`
- `src/components/ferrum/seo-content.tsx`
- `src/components/ferrum/playground/controls-panel.tsx`
- `src/components/theme-toggle.tsx`
- `src/components/logo.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/modal-overlay.tsx`
- `src/hooks/use-focus-trap.ts`
- `src/lib/body-scroll-lock.ts`
