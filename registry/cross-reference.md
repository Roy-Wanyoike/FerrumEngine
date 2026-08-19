# Cross-Reference Analysis — FerrumEngine

Rebuilt 2026-08-19 by Registry Accuracy Agent. All paths verified against live filesystem.

---

## Feature → Component → Route → API Mappings

| Feature | ID | Components | Routes | APIs Used |
|---------|----|-----------|--------|-----------|
| Dark Theme Toggle | F001 | `theme-toggle.tsx`, `theme-provider.tsx` | — (global) | — |
| Color Customizer | F002 | `color-customizer.tsx` | — (within effects) | — |
| Main Navigation Bar | F003 | `nav.tsx` | — (global) | — |
| Mega Menu Navigation | F004 | `nav-mega-menu.tsx`, `nav-data.ts` | — (global) | — |
| Mobile Navigation Overlay | F005 | `nav-mobile.tsx` | — (global) | — |
| Scroll Progress Bar | F006 | `scroll-progress.tsx` | — (global) | — |
| Hero Section with Aurora | F007 | `sections/home/hero-section.tsx` | `/` | — |
| Effects Gallery | F008 | `effects-view.tsx`, `effect-preview.tsx` | `/effects` | — |
| Effect Detail Modal | F009 | `effects-detail-modal.tsx` | — (within effects) | — |
| Collection Drawer | F010 | `collection-drawer.tsx` | — (within effects) | — |
| Playground 2.0 | F011 | `playground/index.tsx` + 5 sub-components | `/playground` | — |
| Architecture Deep Dive | F012 | `architecture-deep-dive.tsx`, `architecture-data.ts` | `/architecture` | — |
| Documentation Viewer | F013 | `docs-view.tsx` | `/docs` | — |
| SEO Structured Data | F014 | `layout.tsx`, `seo-content.tsx` | — (global) | — |
| Footer with Links | F015 | `sections/footer.tsx` | — (global) | — |
| Skip Link and Accessibility | F016 | `nav.tsx`, `nav-mobile.tsx`, `effects-detail-modal.tsx`, `collection-drawer.tsx`, `animated-components.tsx`, `body-scroll-lock.ts`, `use-focus-trap.ts` | — (cross-cutting) | — |
| Error Handling and Loading | F017 | `error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`, `error-page-content.tsx`, `home-client.tsx` | — (cross-cutting) | — |
| Cloud Dashboard | F018 | `cloud/*.tsx`, `use-cloud-data.ts`, `use-cloud-auth.ts`, `cloud-store.ts` | `/cloud` | A006-A019 |
| Blog | F019 | `blog-view.tsx`, `blog-data.ts` | `/blog` | — |
| Changelog | F020 | `changelog-view.tsx`, `changelog-data.ts` | `/changelog` | — |
| Interactive Docs | F021 | `interactive-docs-view.tsx` + 4 sub-modules | `/interactive-docs` | — |
| Global Search (Cmd+K) | F022 | `global-search.tsx`, `search-index.ts` | — (overlay) | — |
| Component Catalog | F023 | `component-catalog.tsx` | `/component-catalog` | — |
| Content Section Views | F024 | `sections/ferrum-principles.tsx`, `sections/ferrum-story.tsx`, `sections/platform-architecture.tsx`, `sections/hall-of-fame.tsx`, `sections/showcase-gallery.tsx`, `sections/learning-center.tsx`, `sections/enterprise.tsx`, `sections/enterprise-components.tsx`, `sections/vision-manifesto.tsx`, `sections/illustrations.tsx`, `sections/section-helpers.tsx` | `/principles`, `/story`, `/platform-architecture`, `/hall-of-fame`, `/showcase`, `/learning`, `/enterprise`, `/enterprise-components`, `/vision`, `/community` | — |
| Homepage Sections | F025 | `sections/home/*.tsx` (12 files + counter.tsx) | `/` | — |

---

## Route → ViewId → Component Mapping

| Route | ViewId | Dynamic Import (home-client.tsx) | Status |
|--------|--------|-------------------------------|--------|
| `/` | `home` | HeroSection + 11 home section components | ✅ Working |
| `/principles` | `principles` | FerrumPrinciples | ✅ Working |
| `/architecture` | `architecture` | ArchitectureDeepDive | ✅ Working |
| `/platform-architecture` | `platform-architecture` | PlatformArchitecture | ✅ Working |
| `/hall-of-fame` | `hall-of-fame` | HallOfFame | ✅ Working |
| `/showcase` | `showcase` | ShowcaseGallery | ✅ Working |
| `/learning` | `learning` | LearningCenter | ✅ Working |
| `/story` | `story` | FerrumStory | ✅ Working |
| `/enterprise` | `enterprise` | Enterprise | ✅ Working |
| `/enterprise-components` | `enterprise-components` | EnterpriseComponentLibrary | ✅ Working |
| `/vision` | `vision` | VisionManifesto | ✅ Working |
| `/community` | `community` | CommunitySection | ✅ Working |
| `/effects` | `effects` | EffectsView + EffectDetailModal + CollectionDrawer | ✅ Working |
| `/docs` | `docs` | DocsView | ✅ Working |
| `/playground` | `playground` | PlaygroundV2 | ✅ Working |
| `/blog` | `blog` | BlogView | ✅ Working |
| `/changelog` | `changelog` | ChangelogView | ✅ Working |
| `/interactive-docs` | `interactive-docs` | InteractiveDocsView | ✅ Working |
| `/component-catalog` | `component-catalog` | ComponentCatalog | ✅ Working |
| `/cloud` | — | Separate page (not SPA) | ✅ Working |
| `/privacy` | — | Separate page | ✅ Working |
| `/terms` | — | Separate page | ✅ Working |

---

## SPA Route Consistency

| Source | Count | Value |
|--------|-------|-------|
| ViewId union type (types.ts) | 19 | All 19 unique view identifiers |
| VIEW_META entries (view-meta.ts) | 19 | Matches ViewId exactly |
| VALID_VIEWS array (view-meta.ts) | 19 | Matches ViewId exactly |
| SPA_ROUTES (next.config.ts) | 18 | All ViewIds except "home" (served at /) |
| Dynamic imports (home-client.tsx) | 18 | 18 view-level imports matching SPA_ROUTES |
| Nav menu items (nav-data.ts) | 18 | All SPA routes have nav entries |

**Consistency: ✅ All sources aligned** (19 ViewIds = 19 VIEW_META = 18 SPA_ROUTES + home = 18 dynamic view imports)

---

## API Route → Frontend Caller Mapping

| API Route | Methods | Frontend Caller |
|-----------|---------|----------------|
| `/api` | GET | External (not called by frontend) |
| `/api/health` | GET | External monitoring tools |
| `/api/css` | GET | `sections/footer.tsx` (CSS download link) |
| `/api/tokens` | GET | External (not called by frontend) |
| `/api/analytics` | POST | Not yet integrated |
| `/api/cloud/auth` | POST, DELETE | `use-cloud-auth.ts` |
| `/api/cloud/teams` | GET, POST | `use-cloud-data.ts`, `cloud-modals.tsx` |
| `/api/cloud/teams/[teamId]` | GET, PUT, DELETE | `use-cloud-data.ts` |
| `/api/cloud/teams/[teamId]/projects` | GET, POST | `use-cloud-data.ts`, `cloud-modals.tsx` |
| `/api/cloud/projects/[projectId]/components` | GET | `use-cloud-data.ts` |
| `/api/cloud/projects/[projectId]/tokens` | GET, POST | `use-cloud-data.ts`, `cloud-modals.tsx` |
| `/api/cloud/tokens/[tokenId]` | PUT | `use-cloud-data.ts` |
| `/api/cloud/audit` | GET | `use-cloud-data.ts` |

---

## Components Without Tests

| Component | Priority |
|-----------|----------|
| Most UI primitives (button, card, input, badge, etc.) | Low-Medium |
| Most section views | Medium |
| Playground sub-components | High |
| Nav / Mobile Nav / Mega Menu | High |
| Effects View / Modal / Drawer | High |
| Docs View / Architecture Deep Dive | High |
| Theme Toggle | High |

**Tested**: Footer (`footer.test.tsx`), Collection (`collection.test.ts`), Nav data (`nav-data.test.ts`), Scroll progress (`scroll-progress.test.tsx`), Docs data (`docs-data.test.ts`), Effects data (`effects-data.test.ts`), View meta (`view-meta.test.ts`), Routing (`routing.test.ts`), API routes (`api-routes.test.ts`), Rate limiting (`rate-limit.test.ts`), Cloud store (`cloud-store.test.ts`), Persistence (`persistence.test.ts`), API types (`api-types.test.ts`), Utils (`utils.test.ts`), Blog view (`blog-view.test.tsx`), Changelog view (`changelog-view.test.tsx`), Docs view (`docs-view.test.tsx`), Effects view (`effects-view.test.tsx`), Nav (`nav.test.tsx`)

---

## Dead / Potentially Removable Code

| File | Status |
|------|--------|
| `src/components/ferrum/sections/illustrations.tsx` | Not imported anywhere — dead code |
| `src/components/ui/button.tsx` | Not imported anywhere — dead code |
| `src/components/ui/card.tsx` | Not imported anywhere — dead code |
| `src/components/ui/label.tsx` | Only used within its own file — dead code |
| `src/hooks/use-supabase.ts` | Not imported anywhere — dead code |

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total features | 25 |
| Total components | 82 |
| Total routes (static + SPA + API) | 42 |
| Total API endpoints | 19 |
| Total packages (deps + devDeps) | 27 |
| Total documentation files | 20 |
| ViewId count | 19 |
| SPA routes | 18 |
| Static page routes | 4 (+ 1 not-found) |
| Components without tests | Most (18 test files exist for data/lib/routing) |
| Dead/unused files | 5 |