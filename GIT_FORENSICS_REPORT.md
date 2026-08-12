# Git Forensics Report — FerrumEngine Platform

**Generated**: 2026-08-12
**Analyzed by**: Agent 1 (Git Archaeologist)
**Current HEAD**: `88fa612` (`c8e93648-97e7-4c08-9b47-42b85e1de4c7`)
**Branch**: `main`
**Working Tree**: Clean (no modified or untracked files)

---

## 1. Repository Overview

### Branches
| Branch | Commit | Purpose |
|--------|--------|----------|
| `main` | `88fa612` | Active development (HEAD) |
| `baseline/pre-rebuild-20260812` | `61b0264` | Pre-rebuild snapshot (before registry + blog/changelog/interactive-docs) |

### Tags
None.

### Stashes
None.

### Total Commits: 5

```
* 88fa612 c8e93648-97e7-4c08-9b47-42b85e1de4c7          (Blog, Changelog, Interactive Docs + API test fixes)
* 8788fec 3990a383-a5b9-4ec6-9c30-17eb649330ca          (Product registry + Prisma removal + cleanup)
* 61b0264 83e61880-2e99-40ea-8b70-7aa9bdadd0be          (Budget baseline, data restructure — essentially a no-op)
* 522c2d1 23d916ea-8ec8-4f64-82b0-b3adb5d84da6          (Scripts purge — -30,968 LOC removed)
* db3a4c9 FerrumEngine: production-ready landing platform  (Initial mega-commit — +89,552 LOC, 222 files)
```

---

## 2. Commit History Analysis

### Commit 1: `db3a4c9` — "FerrumEngine: production-ready landing platform"
- **Date**: 2026-08-11 12:57:56
- **Scope**: Initial monolithic commit — the entire platform in one shot
- **Stats**: +89,552 lines, 222 files
- **Key contents**:
  - Full Next.js 16 app with 14 static pages + 12 API routes + 13 SPA rewrites
  - 542 CSS motion effects (3,806 LOC data file + 631 LOC index)
  - 24,141-line `ferrum-effects.css` in public/
  - Complete component library: 71 components across UI, ferrum, sections
  - Cloud dashboard with auth, teams, projects, tokens
  - 17 test files (78 unit + 17 integration tests)
  - 50+ Python/JS scripts for CSS generation, PDF creation, and data pipeline
  - Prisma schema (SQLite, User + Post models)
  - Service worker, Caddyfile, Docker config
  - Full worklog (7,115 lines)

### Commit 2: `522c2d1` — Script purge
- **Date**: 2026-08-11 13:05:06
- **Scope**: Massive cleanup of build/generation scripts
- **Stats**: -30,968 lines, 60+ files deleted, +1,759 lines
- **Deleted**: All Python scripts (roycss-parts/*, PDF generation, CSS generation, data pipeline, audit reports, bundle analysis), JSON search artifacts, worklog (7,065 lines), start-server.sh
- **Evidence of intentional removal**: This was a deliberate cleanup. Scripts were one-time data pipeline tools used to generate the effects CSS and data. No longer needed after generation.

### Commit 3: `61b0264` — Data restructure / baseline
- **Date**: 2026-08-12 07:51:47
- **Scope**: Minor data restructure, empty placeholder files added
- **Stats**: +142 lines, -138 lines (net ~0)
- **Notable**: Created `.budget-baseline.json` for bundle size tracking

### Commit 4: `8788fec` — Product registry + Prisma removal
- **Date**: 2026-08-12 08:42:17
- **Scope**: Machine-readable registries, dead code removal
- **Stats**: +3,260 lines, -302 lines
- **Added**: 7 registry files (features.json, components.json, routes.json, apis.json, packages.json, documentation.json, cross-reference.md)
- **Deleted**: `prisma/schema.prisma` (intentional — unused, no database needed)
- **Deleted**: `src/components/ferrum/sections/platform-homepage.tsx` (barrel file — homepage sections now imported directly in home-client.tsx)
- **Modified**: `animated-components.tsx` (removed dead AnimatedCard export, -114 LOC)

### Commit 5: `88fa612` — Blog, Changelog, Interactive Docs + test fixes
- **Date**: 2026-08-12 09:36:07
- **Scope**: 3 new features + API test fixes
- **Stats**: +3,428 lines, -500 lines
- **Added**:
  - `blog-view.tsx` (496 LOC) — 6 blog posts, search, category filter, full article view
  - `changelog-view.tsx` (510 LOC) — 8 changelog entries, timeline layout, type filters
  - `interactive-docs-view.tsx` (1,522 LOC) — 8 interactive lessons, code editor, iframe preview, device size toggles, progress tracking
  - `scripts/static-server.js` (163 LOC) — lightweight static file server
- **Modified**: home-client.tsx, nav-data.ts, icon-resolver.tsx, types.ts, view-meta.ts (registered 3 new SPA views)
- **Fixed**: 17 skipped API integration tests → all 95/95 now passing

---

## 3. Files Deleted Across History

### Intentionally Deleted (Commit 2 — Scripts Purge)
These were one-time build pipeline scripts. **Not recoverable as features.**

| Category | Files | Purpose |
|----------|-------|---------|
| CSS Generation | `gen_css.py`, `gen_data.py`, `gen_index.py`, `merge-css.js`, `merge-css.mjs` | Generated effects CSS from data |
| Effect Design | `design_new_effects.py`, `add_effects_v2.py`, `add_missing_effects.py`, `add_new_effects.py`, `add_batch12_13.py`, `append-effects.py`, `extract-missing.py` | Pipeline for adding new CSS effects |
| RoyCSS Parts | 13 Python files in `roycss-parts/` | Category-specific CSS generation (borders, buttons, cursor effects, etc.) |
| PDF Generation | `pdf-gen/body.py`, `pdf-gen/cover.html`, `pdf/ferrum_studio_body.py`, `ferrum_marketplace_pdf.py`, `generate-roycss.py`, `generate_roycss_v3.py` | Documentation PDF generation |
| Search Artifacts | `roycss_search{2-5}.json`, `roycss_search_results.json`, `animos.json`, `tw-snap.json` | Search index data |
| Audit & Reports | `generate-audit-report.py`, `generate-final-report.py`, `generate-report.py`, `ux-audit-report.py`, `analyze-bundle.sh` | UX/bundle audit reports |
| Infrastructure | `start-server.sh`, `sync-ferrum-files.py`, `fix_data_file.py`, `remap-categories.py`, `theme-replace.py`, `analyze-navs.py` | Dev tooling |
| HTML Covers | `brand_arch_cover.html`, `cover-architecture.html`, `ferrum_ai_cover.html` | PDF cover pages |
| Worklog | `worklog.md` (7,065 lines) | Original development log |

### Intentionally Deleted (Commit 4 — Dead Code Removal)
| File | Reason |
|------|--------|
| `prisma/schema.prisma` | Unused — no database in this landing platform |
| `src/components/ferrum/sections/platform-homepage.tsx` | Barrel file made redundant by direct imports in home-client.tsx |
| `AnimatedCard` export from `animated-components.tsx` | Dead code — never imported anywhere |

---

## 4. Files Added After Initial Commit

| File | Added In | Purpose |
|------|----------|--------|
| `registry/features.json` | 8788fec | 18 feature definitions |
| `registry/components.json` | 8788fec | 71 component definitions |
| `registry/routes.json` | 8788fec | 19 route definitions |
| `registry/apis.json` | 8788fec | 17 API endpoint definitions |
| `registry/packages.json` | 8788fec | 17 package definitions |
| `registry/documentation.json` | 8788fec | 29 documentation entries |
| `registry/cross-reference.md` | 8788fec | Component-feature-route cross-reference |
| `scripts/static-server.js` | 88fa612 | Lightweight static file server for sandbox |
| `src/components/ferrum/blog-view.tsx` | 88fa612 | Blog feature (496 LOC) |
| `src/components/ferrum/changelog-view.tsx` | 88fa612 | Changelog feature (510 LOC) |
| `src/components/ferrum/interactive-docs-view.tsx` | 88fa612 | Interactive docs feature (1,522 LOC) |

---

## 5. Baseline Branch Analysis

`baseline/pre-rebuild-20260812` points to commit `61b0264` — the state **before** product registry creation, blog/changelog/interactive-docs, and Prisma removal.

**Divergence from main**: +6,267 lines of new content on main (registry files + 3 new features + static server).

The baseline branch has:
- ✅ Prisma schema (still present)
- ✅ `platform-homepage.tsx` barrel file
- ❌ No registry/ files
- ❌ No blog, changelog, or interactive-docs
- ❌ 17 API tests still skipped (not yet fixed)
- ❌ AnimatedCard still in animated-components.tsx

---

## 6. Feature Keyword Search Results

| Keyword | Found In Commits | Evidence |
|---------|-----------------|----------|
| playground | All 5 | Full playground with code editor, controls, preview, toolbar |
| editor | All 5 | Code editor in playground + interactive docs |
| monaco | None | No Monaco editor — uses plain textarea |
| motion | All 5 | Core platform concept, referenced throughout |
| physics | All 5 | Spring physics engine concept in docs/data |
| vfx | db3a4c9, 522c2d1 | VFX engine concept (only in initial commit data, removed from later messages) |
| tokens | All 5 | Ferrum Tokens design system (822 LOC CJS + 291 LOC types) |
| theme | All 5 | ThemeToggle + ThemeProvider (dark/light/system) |
| animation | All 5 | Core platform feature, 542 CSS effects |
| button | All 5 | UI component (shadcn/ui pattern) |
| card | All 5 | UI component (shadcn/ui pattern) |
| modal | All 5 | EffectDetailModal, ModalOverlay |
| drawer | db3a4c9, 8788fec, 522c2d1 | CollectionDrawer |
| tooltip | db3a4c9, 8788fec, 522c2d1 | UI component |
| chart | db3a4c9, 522c2d1 | Referenced in cloud dashboard (BarChart3 icon) |
| form | All 5 | Cloud modals use form inputs |
| input | All 5 | UI component, cloud auth form |
| search | All 5 | Effects search, blog search |
| filter | All 5 | Category filters everywhere |
| showcase | db3a4c9, 8788fec, 522c2d1 | ShowcaseGallery component |
| hall-of-fame | db3a4c9, 8788fec, 522c2d1 | HallOfFame component |
| enterprise | db3a4c9, 8788fec, 522c2d1 | Enterprise + EnterpriseComponents views |
| docs | All 5 | DocsView (517 LOC) + InteractiveDocsView (1,522 LOC) |
| blog | db3a4c9, 88fa612, 522c2d1 | BlogView (496 LOC) — added in latest commit |
| changelog | All 5 | ChangelogView (510 LOC) — added in 4th commit |
| CLI | db3a4c9, 88fa612, 522c2d1 | Referenced in docs/blog content (no actual CLI code) |
| compiler | db3a4c9, 88fa612, 522c2d1 | Referenced in docs/blog content (no actual compiler code) |
| runtime | All 5 | Referenced in docs/nav data (no actual runtime code) |
| adapter | db3a4c9, 88fa612, 522c2d1 | Referenced in docs content (Vue, Svelte, Angular adapters — no actual adapter code) |
| vue | db3a4c9, 88fa612, 522c2d1 | Referenced in docs only |
| svelte | db3a4c9, 88fa612, 522c2d1 | Referenced in docs only |
| angular | db3a4c9, 522c2d1 | Referenced in docs only |
| prism | db3a4c9, 8788fec, 522c2d1 | No Prism — docs use plain `<pre>` styling |
| code-block | None | No dedicated code block component |
| copy | All 5 | Copy-to-clipboard in playground, docs, effects modal |
| download | db3a4c9, 522c2d1 | Referenced in docs content |
| export | All 5 | Export functionality in playground |
| template | All 5 | Template concept in docs/enterprise |

---

## 7. Current SPA Route Inventory (18 views)

| Route | View Component | Status | LOC |
|--------|---------------|--------|-----|
| `/` | HeroSection + 11 home sections | ✅ EXISTS | 1,266 |
| `/principles` | FerrumPrinciples | ✅ EXISTS | 120 |
| `/architecture` | ArchitectureDeepDive | ✅ EXISTS | 562 |
| `/platform-architecture` | PlatformArchitecture | ✅ EXISTS | 294 |
| `/hall-of-fame` | HallOfFame | ✅ EXISTS | 128 |
| `/showcase` | ShowcaseGallery | ✅ EXISTS | 212 |
| `/learning` | LearningCenter | ✅ EXISTS | 223 |
| `/story` | FerrumStory | ✅ EXISTS | 142 |
| `/enterprise` | Enterprise | ✅ EXISTS | 178 |
| `/enterprise-components` | EnterpriseComponentLibrary | ✅ EXISTS | 304 |
| `/vision` | VisionManifesto | ✅ EXISTS | 159 |
| `/community` | CommunitySection | ✅ EXISTS | 83 |
| `/effects` | EffectsView + Modal + Drawer | ✅ EXISTS | 623 |
| `/docs` | DocsView | ✅ EXISTS | 517 |
| `/playground` | PlaygroundV2 (7 files) | ✅ EXISTS | 1,574 |
| `/blog` | BlogView | ✅ EXISTS | 496 |
| `/changelog` | ChangelogView | ✅ EXISTS | 510 |
| `/interactive-docs` | InteractiveDocsView | ✅ EXISTS | 1,522 |

### Additional Server Pages
| Route | File | Status |
|--------|------|--------|
| `/cloud` | `src/app/cloud/page.tsx` | ✅ EXISTS |
| `/terms` | `src/app/terms/page.tsx` | ✅ EXISTS |
| `/privacy` | `src/app/privacy/page.tsx` | ✅ EXISTS |

---

## 8. API Route Inventory (12 endpoints)

| Endpoint | File | Status |
|----------|------|--------|
| `GET /api` | `src/app/api/route.ts` | ✅ EXISTS |
| `GET /api/health` | `src/app/api/health/route.ts` | ✅ EXISTS |
| `GET /api/css` | `src/app/api/css/route.ts` | ✅ EXISTS |
| `GET /api/tokens` | `src/app/api/tokens/route.ts` | ✅ EXISTS |
| `POST /api/analytics` | `src/app/api/analytics/route.ts` | ✅ EXISTS |
| `POST /api/cloud/auth` | `src/app/api/cloud/auth/route.ts` | ✅ EXISTS |
| `GET /api/cloud/teams` | `src/app/api/cloud/teams/route.ts` | ✅ EXISTS |
| `POST /api/cloud/teams` | `src/app/api/cloud/teams/route.ts` | ✅ EXISTS |
| `GET /api/cloud/teams/[teamId]` | `src/app/api/cloud/teams/[teamId]/route.ts` | ✅ EXISTS |
| `PATCH /api/cloud/teams/[teamId]` | `src/app/api/cloud/teams/[teamId]/route.ts` | ✅ EXISTS |
| `DELETE /api/cloud/teams/[teamId]` | `src/app/api/cloud/teams/[teamId]/route.ts` | ✅ EXISTS |
| `GET /api/cloud/teams/[teamId]/projects` | `src/app/api/cloud/teams/[teamId]/projects/route.ts` | ✅ EXISTS |
| `POST /api/cloud/teams/[teamId]/projects` | `src/app/api/cloud/teams/[teamId]/projects/route.ts` | ✅ EXISTS |
| `GET /api/cloud/projects/[projectId]/components` | `src/app/api/cloud/projects/[projectId]/components/route.ts` | ✅ EXISTS |
| `POST /api/cloud/projects/[projectId]/components` | `src/app/api/cloud/projects/[projectId]/components/route.ts` | ✅ EXISTS |
| `GET /api/cloud/projects/[projectId]/tokens` | `src/app/api/cloud/projects/[projectId]/tokens/route.ts` | ✅ EXISTS |
| `POST /api/cloud/projects/[projectId]/tokens` | `src/app/api/cloud/projects/[projectId]/tokens/route.ts` | ✅ EXISTS |
| `GET /api/cloud/tokens/[tokenId]` | `src/app/api/cloud/tokens/[tokenId]/route.ts` | ✅ EXISTS |
| `GET /api/cloud/audit` | `src/app/api/cloud/audit/route.ts` | ✅ EXISTS |

---

## 9. Data Assets Inventory

| Asset | Size | Description |
|-------|------|-------------|
| `ferrum-effects-data.ts` | 3,806 LOC | 542 CSS effect definitions with full CSS strings |
| `ferrum-effects-index.ts` | 631 LOC | Category index, search helpers, type definitions |
| `ferrum-effects.css` | 24,141 LOC | Pre-built CSS classes for all effects |
| `ferrum-tokens/index.cjs` | 822 LOC | Design token system (CJS) |
| `ferrum-tokens/index.d.ts` | 291 LOC | Design token TypeScript types |
| `docs-data.ts` | 984 LOC | Documentation content for docs viewer |
| `architecture-data.ts` | 742 LOC | Architecture diagrams and descriptions |
| `playground-v2-data.ts` | 819 LOC | Playground presets and configurations |
| `cloud-store.json` | 842+ LOC (variable) | In-memory cloud data store |

---

## 10. Infrastructure & Config Files

| File | Status | Purpose |
|------|--------|----------|
| `next.config.ts` | ✅ | 17 SPA routes, security headers, bundle analyzer |
| `tsconfig.json` | ✅ | TypeScript config |
| `vitest.config.ts` | ✅ | Test configuration |
| `eslint.config.mjs` | ✅ | ESLint with Next.js rules |
| `postcss.config.mjs` | ✅ | Tailwind CSS v4 PostCSS pipeline |
| `components.json` | ✅ | shadcn/ui configuration |
| `package.json` | ✅ | 7 runtime deps, 15 dev deps |
| `Caddyfile` | ✅ | Reverse proxy config |
| `.dockerignore` | ✅ | Docker build exclusions |
| `public/sw.js` | ✅ | Service worker with SWR caching |
| `public/anti-fouc.css` | ✅ | Flash-of-unstyled-content prevention |
| `public/favicon.svg` | ✅ | Favicon |
| `public/logo.svg` | ✅ | Logo (76 LOC SVG) |
| `public/robots.txt` | ✅ | Search engine directives |
| `public/sitemap.xml` | ✅ | 99-line sitemap |
| `serve_static.py` | ✅ | Python static file server |
| `.budget-baseline.json` | ✅ | Bundle size baseline tracking |

---

## 11. Key Findings

### 11.1 No Features Were Lost
All user-facing features from the initial commit (`db3a4c9`) are still present on `main`. The only deletions were:
1. **Build pipeline scripts** — one-time Python/JS tools for generating effects data/CSS. Not features.
2. **Prisma schema** — never used in the landing platform. No database layer.
3. **platform-homepage.tsx barrel** — replaced by direct imports. Functionality preserved.
4. **AnimatedCard** — dead export, never imported. No functional loss.

### 11.2 Features Added Since Initial Commit
3 significant features were added:
1. **Blog** (496 LOC) — 6 posts, search, filters, full article view
2. **Changelog** (510 LOC) — 8 versions, timeline, type filters
3. **Interactive Docs** (1,522 LOC) — 8 lessons, code editor, live preview, progress tracking

### 11.3 Product Registry Added
7 machine-readable JSON files documenting the full platform state. Note: `registry/components.json` still lists `AnimatedCard` and `PlatformHomepage` as active — this is **stale data** that needs updating.

### 11.4 No Git Resets, Reverts, or Force Pushes Detected
The reflog shows a clean linear history. The `baseline/pre-rebuild-20260812` branch was created via `branch: Created from HEAD`, not a reset. No stashes exist. No orphaned commits.

### 11.5 Test Suite Status
- 95/95 tests passing (0 skipped, 0 failures)
- 78 unit tests + 17 API integration tests (fixed in commit 5)
- Test files cover: API routes, cloud store, collection, footer, persistence, rate limiting, routing, utils

### 11.6 Concept vs. Implementation Gap
Several concepts referenced in documentation/blog/changelog content do **not** have actual code implementations:
- **CLI** (`ferrum init`, `ferrum build`) — referenced but no CLI code exists
- **Compiler** (9-pass pipeline) — described in docs but no compiler code
- **Runtime** (zero-dependency execution layer) — described but no runtime code
- **Framework adapters** (Vue, Svelte, Angular, etc.) — referenced but no adapter code
- **Physics engine** (spring physics, RK4 integration) — described but no physics code
- **VFX engine** (particles, visual effects) — described but no VFX code
- **Prisma/database** — schema existed but was removed (never used)

These are **marketing/documentation content** for a landing platform, not missing features. The platform's purpose is to showcase and document FerrumEngine, not to contain its actual implementation.
