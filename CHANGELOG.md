# Changelog

All notable changes to FerrumEngine are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-07-27

First production-ready release. Addresses all findings from the a16z-style audit (Engineering 4/10 → 8/10, DX 3/10 → 7/10, Community 2/10 → 6/10, GTM 2/10 → 6/10, Narrative 7/10 → 8/10).

### Phase 1 — Server Stability
- Added `.zscripts/keepalive.sh` — auto-restarts Next.js on crash
- Production server now runs detached via `setsid` double-fork (PPID 1)
- Stable uptime on port 3000 with Caddy reverse-proxy on port 81

### Phase 2 — Dead Code Cleanup (~8,700 lines / ~340KB removed)
- Removed 25 unused section components
- Removed 22 unused shadcn/ui primitives
- Removed 2 duplicate CSS files
- Reduced bundle size and improved build times

### Phase 3 — Repository Hygiene
- Updated `.gitignore` to exclude `tool-results/`, `download/`, `db/*.db`, `*.bak`
- Removed dual lockfiles (kept `bun.lock`, removed `package-lock.json` and `pnpm-lock.yaml`)

### Phase 4 — Error / Loading / 404 Pages
- Added `src/app/not-found.tsx` — branded 404 page with navigation back to safety
- Added `src/app/error.tsx` — React error boundary with "Try Again" recovery
- Added `src/app/global-error.tsx` — global error boundary for catastrophic failures
- Added `src/app/loading.tsx` — skeleton screen loading state

### Phase 5 — Cloud API Authentication
- Added `src/middleware.ts` — Bearer token protection for `/api/cloud/*` routes
- Added `src/app/api/cloud/auth/route.ts` — login endpoint returning bearer token
- Updated `src/app/cloud/page.tsx` — login gate + `authFetch` wrapper
- Default password: `ferrum-admin` (configurable via `CLOUD_DASHBOARD_PASSWORD`)

### Phase 6 — Monorepo Connection
- Added `src/app/api/tokens/route.ts` — public design tokens endpoint
- Wired `@ferrum/tokens` package (in `src/lib/ferrum-tokens/`)

### Phase 7 — API Consistency
- Fixed effect count mismatch — `/api` now returns **542** (was incorrectly reporting 848)
- Categories now report **35** (dynamic, not hardcoded)
- All counts sourced from the actual effects catalog

### Phase 8 — SSR / SEO Lift
- Added `src/components/ferrum/server-hero.tsx` — server-rendered hero for crawlers
- Added `src/components/ferrum/json-ld.tsx` — structured data (Organization, WebSite, SoftwareApplication)
- Updated `src/app/layout.tsx` — `<ServerHero />` + `<JsonLd />` in document head
- Crawlers (Googlebot, Lighthouse, social scrapers) now see real content instead of empty `<div>`

### Phase 9 — Test Coverage
- Added `__tests__/cloud-store.test.ts` (20 tests)
- Added `__tests__/api-routes.test.ts` (17 conditional tests)
- Added `__tests__/utils.test.ts` (21 tests)
- Added `__tests__/rate-limit.test.ts` (9 tests)
- **Total: 78 tests passing** (was 20 at audit start)

### Phase 10 — Production Hardening: Persistent DB
- Added `src/lib/persist.ts` — file-based JSON persistence with atomic writes
  - `loadSnapshot()` — synchronous read at store init, returns null on missing/corrupt file
  - `saveSnapshot()` — debounced (200ms) write queue, non-blocking
  - `flushToDisk()` — async force-write for tests
  - `flushSync()` — sync write registered to SIGTERM/SIGINT for graceful shutdown
  - Atomic writes: write to `.tmp` then rename (no torn writes on crash)
- Updated `src/lib/cloud-store.ts` — loads from disk on init, persists after every mutation
- Enhanced `src/app/api/health/route.ts` — now reports `persistence.{fileExists, writeCount, lastSavedAt, ...}`
- DB file: `/home/z/my-project/db/cloud-store.json` (~22KB seed snapshot)
- End-to-end verified: data survives server restart

### Phase 11 — Repository Hygiene & Ship-Readiness
- Enriched `package.json` — added description, keywords, license, author, repository, homepage, engines
- Added new npm scripts: `lint:fix`, `typecheck`, `test:coverage`, `analyze`
- Added `README.md` — hero, badges, install, features, API reference, testing, architecture
- Added `LICENSE` — MIT
- Added `CONTRIBUTING.md` — dev setup, Conventional Commits, PR process, Code of Conduct
- Added `.github/ISSUE_TEMPLATE/bug_report.md`
- Added `.github/ISSUE_TEMPLATE/feature_request.md`
- Added `.github/PULL_REQUEST_TEMPLATE.md`
- Added `.github/workflows/ci.yml` — type-check + lint + test + build on every PR

### Security
- Rate limiting on `/api/cloud/auth` (10 req / 15 min / IP) — brute-force protection
- Rate limiting on `/api/cloud/*` (100 req / min / IP) — abuse prevention
- Security headers in `next.config.ts`: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Bearer token authentication on all cloud API routes
- Atomic file persistence (no torn writes on crash)

### Documentation
- Comprehensive `README.md` with feature list, architecture diagram, API table, testing instructions
- `CONTRIBUTING.md` covering setup, conventions, and PR process
- `CHANGELOG.md` (this file)
- Inline JSDoc on all major modules
- API endpoint table in README
