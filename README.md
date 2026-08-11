# FerrumEngine

> A CSS effects engine and design system platform — browse 542 production-ready effects across 35 categories, manage design tokens, and prototype in a live playground.

[![Live Site](https://img.shields.io/badge/Live-ferrumcss.space--z.ai-0ea5e9?style=flat-square)](https://ferrumcss.space-z.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/Tests-78%20passing-22c55e?style=flat-square)](./__tests__)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%E2%89%A520-green?style=flat-square)](./package.json)

---

## ✨ Features

- **542 CSS Effects** across 35 categories (3D, attention, background, hover, loading, text, and more)
- **Design Token Platform** — manage teams, projects, tokens, and components with audit logs
- **Live Playground** — interactive prototype environment with real-time preview
- **Architecture Deep-Dive** — system design and subsystem documentation
- **Cloud Dashboard** — authenticated design-token management with persistence
- **SSR + SEO** — server-rendered hero content, JSON-LD structured data, sitemap, robots.txt
- **Production Hardened** — rate-limited auth, persistent DB, health endpoint, error/loading/404 pages
- **78 passing tests** covering store, persistence, rate limiting, routing, and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (Node 22 LTS recommended)
- npm, pnpm, or bun

### Install & Run

```bash
# Clone the repo
git clone https://github.com/ferrumcss/ferrumengine.git
cd ferrumengine

# Install dependencies (pick one)
npm install        # or: pnpm install / bun install

# Start the dev server
npm run dev        # → http://localhost:3000

# Or run the production build
npm run build
npm start
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=file:/home/z/my-project/db/custom.db
CLOUD_API_TOKEN=ferrum-dev-2024    # Bearer token for /api/cloud/* endpoints
```

The cloud dashboard login password defaults to `ferrum-admin` (override via `CLOUD_DASHBOARD_PASSWORD`).

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run typecheck` | TypeScript strict type-check (no emit) |
| `npm test` | Run vitest test suite |
| `npm run test:watch` | Watch-mode tests |
| `npm run test:coverage` | Tests with coverage report |
| `npm run analyze` | Bundle analyzer |

## 🏗️ Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # REST endpoints
│   │   ├── cloud/                # Authenticated design-token API
│   │   ├── css/                  # Effect CSS export
│   │   ├── health/               # Health check endpoint
│   │   └── tokens/               # Public design-tokens API
│   ├── cloud/                    # Cloud dashboard (login-gated)
│   ├── layout.tsx                # Root layout w/ SSR hero + JSON-LD
│   ├── page.tsx                  # Server-rendered homepage
│   ├── error.tsx                 # Error recovery boundary
│   ├── global-error.tsx          # Global error boundary
│   ├── loading.tsx               # Skeleton loading state
│   └── not-found.tsx             # Branded 404
├── components/
│   └── ferrum/                   # Core UI components
│       ├── effects-view.tsx      # 542 effects browser
│       ├── playground-v2.tsx     # Live playground
│       ├── docs-view.tsx         # Documentation viewer
│       ├── architecture-deep-dive.tsx
│       ├── nav.tsx               # SPA navigation
│       └── ...
├── lib/
│   ├── cloud-store.ts            # Design-token store (persistent)
│   ├── persist.ts                # File-based JSON persistence
│   ├── ferrum-effects-data.ts    # 542 effects catalog
│   └── ...
└── middleware.ts                 # Auth + rate-limit middleware

__tests__/                        # 78 tests across 7 files
db/                               # SQLite + JSON persistence
prisma/                           # Prisma schema
public/                           # Static assets (robots.txt, sitemap.xml, logos)
```

## 🔌 API Reference

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api` | GET | — | Library stats (542 effects, 35 categories) |
| `/api/health` | GET | — | Service health + persistence status |
| `/api/css` | GET | — | CSS export of effects |
| `/api/tokens` | GET | — | Public design tokens |
| `/api/cloud/auth` | POST | — | Login → returns bearer token |
| `/api/cloud/teams` | GET, POST | Bearer | List/create teams |
| `/api/cloud/teams/[id]` | GET, PATCH, DELETE | Bearer | Team CRUD |
| `/api/cloud/teams/[id]/projects` | GET, POST | Bearer | Projects under team |
| `/api/cloud/projects/[id]/tokens` | GET, POST | Bearer | Design tokens |
| `/api/cloud/projects/[id]/components` | GET, POST | Bearer | Components |
| `/api/cloud/tokens/[id]` | PATCH | Bearer | Update token (auto-versions) |
| `/api/cloud/audit` | GET | Bearer | Audit log |

### Rate Limits

- `/api/cloud/auth`: 10 requests / 15 min / IP (brute-force protection)
- `/api/cloud/*` (other): 100 requests / min / IP

## 🧪 Testing

```bash
npm test
```

Test suite covers:

- `cloud-store.test.ts` (20 tests) — Teams, projects, tokens, audit
- `persistence.test.ts` (8 tests) — Round-trip, atomic writes, restart survival
- `rate-limit.test.ts` (9 tests) — Auth brute-force protection, API limits
- `utils.test.ts` (21 tests) — Utility helpers
- `routing.test.ts` (6 tests) — SPA navigation
- `collection.test.ts` (6 tests) — Effects catalog integrity
- `footer.test.tsx` (8 tests) — Footer component rendering

## 🛡️ Production Hardening

- **Persistent DB** — File-based JSON snapshot at `db/cloud-store.json` (atomic writes, debounced, survives restarts)
- **Rate Limiting** — Auth + API rate limits in middleware
- **Health Endpoint** — `/api/health` reports cloud store, persistence, and memory status
- **Error Boundaries** — `error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`
- **SSR/SEO** — Server-rendered hero, JSON-LD structured data, sitemap, robots.txt
- **Security Headers** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, commit conventions, and PR process.

## 📄 License

[MIT](./LICENSE) © FerrumEngine Contributors
