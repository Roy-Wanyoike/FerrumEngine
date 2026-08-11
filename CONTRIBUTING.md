# Contributing to FerrumEngine

Thanks for your interest in contributing! This document covers setup, conventions, and the PR process.

## 🛠️ Development Setup

### Prerequisites

- **Node.js 20+** (Node 22 LTS recommended)
- **npm**, **pnpm**, or **bun** (we use `npm` in examples, but any works)
- **Git**

### First-Time Setup

```bash
# 1. Fork & clone
git clone https://github.com/<your-username>/ferrumengine.git
cd ferrumengine

# 2. Add upstream remote
git remote add upstream https://github.com/ferrumcss/ferrumengine.git

# 3. Install dependencies
npm install

# 4. Create a feature branch
git checkout -b feat/my-feature

# 5. Start the dev server
npm run dev   # → http://localhost:3000
```

### Environment

Create a `.env` file:

```env
DATABASE_URL=file:/home/z/my-project/db/custom.db
CLOUD_API_TOKEN=ferrum-dev-2024
```

You do not need production secrets for local development — defaults are baked in.

## 📜 Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Use for |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace, semicolons (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `chore` | Build process, tooling, dependencies |
| `ci` | CI configuration changes |

### Examples

```
feat(effects): add 12 new gradient border effects
fix(persist): handle corrupt DB file gracefully
docs(readme): add API reference table
test(cloud-store): cover token update with version bump
chore(deps): bump next to 16.2.10
```

## 🧪 Testing

All new code must have tests. Run them locally before pushing:

```bash
npm test              # Full suite
npm run test:watch    # Watch mode during development
npm run test:coverage # Coverage report
```

### Test File Conventions

- Tests live in `__tests__/`
- File naming: `<module-name>.test.ts` (or `.test.tsx` for components)
- Use vitest + @testing-library/react
- Test description format: `"Module — feature being tested"`

## ✅ Pre-PR Checklist

Before opening a PR, verify:

- [ ] `npm run typecheck` passes (no TS errors)
- [ ] `npm run lint` passes (no lint errors)
- [ ] `npm test` passes (all tests green)
- [ ] `npm run build` succeeds (production build works)
- [ ] Commit messages follow Conventional Commits
- [ ] If adding a new endpoint, it has tests and is documented in README
- [ ] If adding a new component, it has a snapshot or rendering test

## 🔄 PR Process

1. **Open a PR** against `main` using the [PR template](./.github/PULL_REQUEST_TEMPLATE.md)
2. **CI checks run automatically** — all must pass
3. **Request review** from a maintainer
4. **Address review feedback** with new commits (do NOT squash during review)
5. **Squash-merge** once approved (maintainer will handle this)

### PR Title

Use the same Conventional Commits format as commit messages:

```
feat(effects): add 12 new gradient border effects
fix(persist): handle corrupt DB file gracefully
```

## 🏗️ Project Structure

See [README.md → Architecture](./README.md#-architecture) for the directory layout.

Key conventions:

- **App Router** — All routes live under `src/app/`
- **Server Components by default** — Mark `"use client"` only when hooks/interactivity are needed
- **Single SPA pattern** — The homepage is a client SPA; do not introduce new top-level routes without discussion
- **API routes** — All API routes are under `src/app/api/`; cloud routes require Bearer auth via middleware
- **Persistence** — Cloud store uses file-based JSON persistence at `db/cloud-store.json`

## 🐛 Reporting Bugs

Use the [Bug Report template](./.github/ISSUE_TEMPLATE/bug_report.md). Include:

- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS/Node version
- Screenshots if applicable

## ✨ Requesting Features

Use the [Feature Request template](./.github/ISSUE_TEMPLATE/feature_request.md). Include:

- Use case (what problem does this solve?)
- Proposed solution
- Alternatives considered

## 📜 Code of Conduct

Be kind. Be constructive. Be patient.

- Treat everyone with respect
- Assume good faith
- Give credit where due
- Focus on what's best for the community

Harassment of any kind will not be tolerated.

## ❓ Questions?

Open a [Discussion](https://github.com/ferrumcss/ferrumengine/discussions) — we monitor them.

Thanks for contributing! 🙌
