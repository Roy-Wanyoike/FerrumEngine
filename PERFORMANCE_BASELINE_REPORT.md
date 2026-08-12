# FerrumEngine Performance Baseline Report

**Date**: 2026-08-12  
**Next.js Version**: 16.3.0 (Turbopack)  
**Node**: Production build  
**Build ID**: Phase 6-7 Baseline

---

## 1. Build Summary

| Metric | Value |
|---|---|
| **Compile time** | 3.6s |
| **TypeScript check** | 4.3s |
| **Static page generation** | 423ms (14 pages) |
| **Config load** | 98ms |
| **Total build time** | ~8.3s |
| **Total `.next/` size** | 75 MB |
| **Static assets size** | 2.6 MB |
| **Build errors** | 0 |
| **Build warnings** | 1 (middleware deprecation) |

### Routes Generated

| Type | Routes | Count |
|---|---|---|
| Static (○) | `/`, `/_not-found`, `/cloud`, `/privacy`, `/terms` | 5 |
| Dynamic (ƒ) | `/api`, `/api/analytics`, `/api/cloud/*`, `/api/css`, `/api/health`, `/api/tokens` | 12 |
| **Total** | | **17** |

### Build Warnings
- `middleware` file convention is deprecated → should migrate to `proxy`

---

## 2. Bundle Size Analysis

### First-Load JS (Critical Path — `/` route)

10 chunks loaded on initial page hit:

| Chunk | Raw Size | Est. Gzip |
|---|---|---|
| `2ts65czrjjd_k.js` | 228 KB | ~71 KB |
| `01l32msd8my4u.js` | 150 KB | ~41 KB |
| `11jq0c2_zavac.js` | 31 KB | ~10 KB |
| `3e-9zbvdsq9vm.js` | 30 KB | ~9 KB |
| `1odhgbirpttg8.js` | 12 KB | ~4 KB |
| `1p4k3nwgwvowg.js` | 12 KB | ~4 KB |
| `1pl__il7s8t-n.js` | 11 KB | ~3 KB |
| `turbopack-0tor58xkx9rnr.js` | 9 KB | ~3 KB |
| `0oeds6xg-zier.js` | 7 KB | ~2 KB |
| `0lq-1mxxxv5tl.js` | <1 KB | <1 KB |
| **TOTAL** | **495 KB** | **~165 KB** |

### Total Client JS

- **63 JS chunks** in `.next/static/chunks/`
- **Total raw JS**: 2,098 KB (2.0 MB)
- **Largest chunk**: 234 KB (`2ts65czrjjd_k.js`) — likely React/Next.js runtime core
- **Smallest chunk**: 436 B
- **Gzip ratio** (sampled): ~3:1 raw-to-gzip

### Total Client CSS

| File | Raw Size |
|---|---|
| `3z3yltyczoa89.css` (main Tailwind) | 169 KB |
| `03c6yop4mqd3w.css` (component-scoped) | 3.9 KB |
| **TOTAL** | **174 KB** |

---

## 3. Code Splitting Analysis

### Architecture
The app uses an aggressive code-splitting strategy via `next/dynamic` in `src/app/home-client.tsx`:

- **ALL 26 view/section components are dynamically imported** with `ssr: false`
- Only the `ViewRouter` shell, `AppProvider`, and skeleton fallbacks are in the critical path
- The sync imports are limited to: `react`, `next/navigation`, `next/dynamic`, `app-context`, `constants`, `view-meta`, `types`

### Dynamic Import Map (26 total)

#### With `webpackPrefetch: true` (3 modules — prefetched after hydration)
| Module | Source File | Notes |
|---|---|---|
| `EffectsView` | `components/ferrum/effects-view` | Heaviest: 92K index + 424K data |
| `PlaygroundV2` | `components/ferrum/playground` | Full playground with code editor |
| `DocsView` | `components/ferrum/docs-view` | Documentation browser |

#### Home Sections (12 — loaded when `currentView === 'home'`)
| Module | Source File |
|---|---|
| `HeroSection` | `sections/home/hero-section` |
| `ProblemSection` | `sections/home/problem-section` |
| `PlatformMarquee` | `sections/home/marquee-section` |
| `PlaygroundSection` | `sections/home/playground-section` |
| `PlatformOverviewSection` | `sections/home/overview-section` |
| `ArchitectureSection` | `sections/home/architecture-section` |
| `DeveloperJourneySection` | `sections/home/dev-journey-section` |
| `LiveExamplesSection` | `sections/home/live-examples-section` |
| `EnterpriseSection` | `sections/home/enterprise-section` |
| `PlatformRoadmapSection` | `sections/home/roadmap-section` |
| `CommunitySection` | `sections/home/community-section` |
| `PlatformFooter` | `sections/home/platform-footer-section` |

#### Non-Home Views (10 — loaded on navigation)
| Module | Source File |
|---|---|
| `HallOfFame` | `sections/hall-of-fame` |
| `FerrumStory` | `sections/ferrum-story` |
| `Enterprise` | `sections/enterprise` |
| `PlatformArchitecture` | `sections/platform-architecture` |
| `LearningCenter` | `sections/learning-center` |
| `ShowcaseGallery` | `sections/showcase-gallery` |
| `VisionManifesto` | `sections/vision-manifesto` |
| `EnterpriseComponentLibrary` | `sections/enterprise-components` |
| `BlogView` | `components/ferrum/blog-view` |
| `ChangelogView` | `components/ferrum/changelog-view` |

#### Full-Screen Views (2 — separate layout, no footer)
| Module | Source File |
|---|---|
| `InteractiveDocsView` | `components/ferrum/interactive-docs-view` (1,522 LoC) |
| `ArchitectureDeepDive` | `components/ferrum/architecture-deep-dive` (562 LoC) |

#### Modals / Drawers (2)
| Module | Source File |
|---|---|
| `EffectDetailModal` | `components/ferrum/effects-detail-modal` |
| `CollectionDrawer` | `components/ferrum/collection-drawer` |

#### UI Chrome (2)
| Module | Source File | Notes |
|---|---|---|
| `Nav` | `components/ferrum/nav` | ~678 LoC with megamenu; deferred to avoid Radix in server HTML |
| `ScrollProgress` | `components/ferrum/scroll-progress` | Small, non-critical |

---

## 4. CSS Analysis

### Critical CSS (Anti-FOUC)

- **File**: `src/app/critical.css` — **385 B**, 16 lines
- Inline/inlined before JS to prevent white flash
- Sets `background-color: #0a0a0a` (dark) or `#ffffff` (light) based on `.light` class
- Includes `color-scheme` for native element theming

### Global CSS

- **File**: `src/app/globals.css` — **10 KB**, 318 lines
- Tailwind directives + custom CSS variables

### Build Output CSS

- **Main chunk**: `3z3yltyczoa89.css` — 169 KB (Tailwind-compiled, includes all used utility classes)
- **Scoped chunk**: `03c6yop4mqd3w.css` — 3.9 KB (component-specific styles)
- **Total in bundle**: 174 KB

### Effects CSS (On-Demand)

- **File**: `public/ferrum-effects.css` — **570 KB**, 24,141 lines
- Loaded on-demand when the effects playground is opened
- NOT in the initial critical path

---

## 5. Source Code Metrics

| Metric | Value |
|---|---|
| **Total source LoC** | 23,733 |
| **Component files** | 66 (.tsx in `src/components/`)
| **Total source files** | 120 (.ts + .tsx + .css) |
| **Largest file** | `ferrum-effects-data.ts` (3,806 LoC) |
| **Largest component** | `interactive-docs-view.tsx` (1,522 LoC) |

### Top 10 Largest Source Files

| File | LoC |
|---|---|
| `lib/ferrum-effects-data.ts` | 3,806 |
| `components/ferrum/interactive-docs-view.tsx` | 1,522 |
| `lib/docs-data.ts` | 984 |
| `components/ferrum/playground-v2-data.ts` | 819 |
| `components/ferrum/architecture-data.ts` | 742 |
| `lib/ferrum-effects-index.ts` | 631 |
| `components/ferrum/architecture-deep-dive.tsx` | 562 |
| `components/ferrum/docs-view.tsx` | 517 |
| `components/ferrum/changelog-view.tsx` | 510 |
| `components/ferrum/blog-view.tsx` | 496 |

---

## 6. Dependency Analysis

### Production Dependencies (9 total)

| Package | Version | Role |
|---|---|---|
| `next` | ^16.1.1 | Framework |
| `react` | ^19.0.0 | UI runtime |
| `react-dom` | ^19.0.0 | DOM renderer |
| `lucide-react` | ^0.525.0 | Icon library (47 files import it) |
| `@radix-ui/react-slot` | ^1.3.3 | Accessible slot primitive |
| `@radix-ui/react-label` | ^2.1.15 | Accessible label primitive |
| `next-themes` | ^0.4.6 | Theme switching (2 files import it) |
| `sonner` | ^2.0.6 | Toast notifications |
| `tailwind-merge` | ^3.3.1 | Class merging utility |

### Tree-Shaking Analysis

| Package | Import Sites | Tree-Shakeable? |
|---|---|---|
| `lucide-react` | **47 files** | ✅ Yes — Next.js `optimizePackageImports` enabled, individual icon imports detected |
| `next-themes` | **2 files** | ✅ Yes — small package, only ThemeProvider used |

### `optimizePackageImports`
- **Status**: Enabled (Turbopack experiment)
- Applies to: `lucide-react` (primary beneficiary — 47 import sites)

---

## 7. Performance Budget Assessment

**Script**: `scripts/check-budget.mjs`  
**Baseline**: `.budget-baseline.json` (saved 2026-08-11)

### Results: ✅ ALL HARD BUDGETS PASSED (2 soft warnings)

| Check | Actual | Budget | % | Status |
|---|---|---|---|---|
| **First-Load JS (gzip est.)** | 495 KB | 600 KB | 83% | ✅ PASS |
| First-Load JS (soft) | 495 KB | 500 KB | 99% | ✅ PASS (borderline) |
| **Largest Chunk** | 229 KB | 250 KB | 92% | ✅ PASS |
| Largest Chunk (soft) | 229 KB | 200 KB | 114% | ⚠️ WARNING |
| **Initial CSS** | 174 KB | 300 KB | 58% | ✅ PASS |
| Initial CSS (soft) | 174 KB | 200 KB | 87% | ✅ PASS |
| **Effects CSS** | 570 KB | 650 KB | 88% | ✅ PASS |
| **Runtime deps** | 9 | 13 | 69% | ✅ PASS |
| Runtime deps (soft) | 9 | 10 | 90% | ✅ PASS |
| **node_modules** | 488.6 MB | 700 MB | 70% | ✅ PASS |
| node_modules (soft) | 488.6 MB | 400 MB | 122% | ⚠️ WARNING |

### Trend vs Previous Baseline

| Metric | Current | Baseline | Change |
|---|---|---|---|
| First-Load JS | 495 KB | 565 KB | 📉 **-12%** |
| CSS | 174 KB | 297 KB | 📉 **-41%** |

### File Size Violations (7 files exceed 500-line max)

| File | Lines | Max | Over |
|---|---|---|---|
| `interactive-docs-view.tsx` | 1,523 | 500 | +1,023 |
| `playground-v2-data.ts` | 820 | 4,000 (data) | +320 |
| `architecture-data.ts` | 743 | 4,000 (data) | +243 |
| `ferrum-effects-index.ts` | 632 | 500 | +132 |
| `architecture-deep-dive.tsx` | 563 | 500 | +63 |
| `docs-view.tsx` | 518 | 500 | +18 |
| `changelog-view.tsx` | 511 | 500 | +11 |

---

## 8. Top 5 Optimization Opportunities

### 1. Reduce Largest Chunk (229 KB → target <200 KB)
- The `2ts65czrjjd_k.js` chunk (likely React/Next runtime + shared framework code) is the single biggest first-load bottleneck
- **Action**: Analyze chunk contents, check if any non-critical framework features can be deferred or replaced with lighter alternatives

### 2. Lazy-Load Effects Data (3,806 LoC / ~424 KB)
- `ferrum-effects-data.ts` is the largest source file and is likely pulled into the effects view chunk
- **Action**: Consider splitting effects data into smaller sub-chunks by category, loading only the active category's data

### 3. Split `interactive-docs-view.tsx` (1,522 LoC)
- 3x over the 500-line component limit
- **Action**: Extract sub-components (code blocks, navigation panels, content sections) into separate files

### 4. Reduce `lucide-react` Import Surface (47 files)
- While tree-shaking is enabled via `optimizePackageImports`, 47 import sites is high
- **Action**: Consider an icon registry/resolver pattern to consolidate imports and enable better dead-code elimination
- Note: `src/lib/icon-resolver.tsx` already exists — audit adoption

### 5. Migrate Middleware to Proxy
- Next.js 16 deprecated `middleware` in favor of `proxy`
- **Action**: Run `npx @next/codemod@canary middleware-to-proxy .` and validate auth/routing behavior

---

## 9. Key Metrics Summary

```
┌─────────────────────────────┬──────────────┐
│ Metric                      │ Value        │
├─────────────────────────────┼──────────────┤
│ Build Time                  │ ~8.3s        │
│ First-Load JS (raw)         │ 495 KB       │
│ First-Load JS (~gzip)       │ ~165 KB      │
│ Total Client JS             │ 2,098 KB     │
│ Total Client CSS            │ 174 KB       │
│ JS Chunks                   │ 63           │
│ CSS Chunks                  │ 2            │
│ Largest JS Chunk            │ 234 KB       │
│ Second Largest JS Chunk     │ 154 KB       │
│ Dynamic Imports             │ 26           │
│ Prefetched Modules          │ 3            │
│ Runtime Dependencies        │ 9            │
│ Source LoC                   │ 23,733       │
│ Component Files             │ 66           │
│ Budget Status               │ ✅ PASS      │
│ Soft Warnings               │ 2            │
└─────────────────────────────┴──────────────┘
```
