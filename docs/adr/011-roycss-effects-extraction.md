# ADR-011: RoyCSS Effects Extraction

## Status

Accepted

## Date

2026-09-03

## Context

FerrumEngine has accumulated a significant amount of CSS/visual/effects code that
conceptually belongs to the RoyCSS sister project — not the intelligence engine.
These modules include:

- **ferrum-vfx** — Visual effects (cursor, distortion, glass, gradient, particles)
- **ferrum-motion** — Motion system (spring, timeline, decay, stagger, scroll)
- **ferrum-tokens** — Design tokens (.cjs + .d.ts)
- **ferrum-paint** — Paint API worklets
- **ferrum-effects-data.ts** — Monolithic 3,989-line effects data file
- **effects/** — 36 category effect files + lazy loader
- **public/effects/** — 35 CSS effect files
- **public/worklets/** — 6 paint worklet JS files
- **public/ferrum-effects.css** and **public/ferrum-effects-unified.css**
- **roycss-data.ts**, **roycss-index.ts**, **roycss-loader.ts** — RoyCSS data modules
- **animation-colors.ts** — Color mappings for spotlight/glow effects

This mixing of concerns creates several problems:

1. **Bundle bloat** — The effects data alone is ~570KB of CSS, loaded even for
   consumers who only want the intelligence engine.
2. **Unclear ownership** — Visual effects and intelligence analysis are separate
   domains with different maintainers and release cadences.
3. **Testing friction** — Engine tests must load/transpile all effects code even
   though they never use it.
4. **Package semantics** — FerrumEngine's `package.json` keywords describe
   "intelligence, reliability, analysis" — not "CSS effects, animations".

## Decision

Extract all CSS/effects code into a separate `@roycss/effects` package at
`packages/roycss-effects/` within the monorepo, and replace the moved modules
with thin re-export stubs in the main project.

### Package Structure

```
packages/roycss-effects/
├── src/
│   ├── ferrum-vfx/
│   ├── ferrum-motion/
│   ├── ferrum-tokens/
│   ├── ferrum-paint/
│   ├── effects/
│   ├── ferrum-effects-data.ts
│   ├── ferrum-effects-index.ts
│   ├── ferrum-effects-loader.ts
│   ├── roycss-data.ts
│   ├── roycss-index.ts
│   ├── roycss-loader.ts
│   ├── animation-colors.ts
│   └── types.ts
├── public/
│   ├── effects/
│   ├── worklets/
│   ├── ferrum-effects.css
│   └── ferrum-effects-unified.css
├── index.js
├── index.d.ts
├── package.json
└── README.md
```

### Re-export Stubs

Each moved module is replaced by a thin re-export stub in the original location
that delegates to `@roycss/effects`:

```ts
// src/lib/ferrum-vfx/index.ts
export { createParticles } from '@roycss/effects/ferrum-vfx';
// ... etc
```

This preserves backward compatibility — existing imports like
`import { spring } from '@/lib/ferrum-motion'` continue to work through the stubs.

### TypeScript Path Mapping

The `tsconfig.json` is updated with path aliases:

```json
{
  "@roycss/effects": ["./packages/roycss-effects"],
  "@roycss/effects/*": ["./packages/roycss-effects/src/*"]
}
```

### Workspace Configuration

The root `package.json` is updated with:

```json
{
  "workspaces": ["packages/*"],
  "dependencies": { "@roycss/effects": "*" }
}
```

### Self-contained Types

The `@roycss/effects` package includes its own `types.ts` with the minimal
type definitions (`FerrumCSSEffect`, `FerrumEffectIndex`, `Category`) to avoid
circular dependencies back to the main project.

### Inlined Reduced Motion

The `ferrum-motion/reduced-motion.ts` previously imported from
`ferrum-runtime/reduced-motion`. Since `ferrum-runtime` stays in the main project,
this dependency was inlined into the package to keep it self-contained.

## Consequences

### Positive

- **Clear separation of concerns** — Intelligence engine and visual effects are
  independently versionable and releasable.
- **Smaller engine bundle** — Consumers who only need intelligence don't pull in
  570KB of CSS effects data.
- **Faster engine tests** — No transpilation of effects code during test runs.
- **Better package semantics** — Each package's keywords and description
  accurately reflect its domain.
- **Backward compatible** — Existing imports continue to work via re-export stubs.

### Negative

- **Stub maintenance** — Re-export stubs must be updated if the package's API
  changes. This is minimal overhead since the stubs are thin.
- **Workspace complexity** — The monorepo now has a workspace package, requiring
  workspace-aware tooling (already supported by npm/bun).
- **UI/component tests may break** — Tests that directly import effects modules
  may need path updates. This is expected and acceptable per the extraction scope.

### Neutral

- **Engine tests are unaffected** — The intelligence engine test suite (245 tests)
  passes without modification, confirming the extraction did not break engine logic.

## Related

- GitHub Issue: #32
- Supersedes: ADR-006 (effects lazy-loading — the lazy loader is now part of the package)
