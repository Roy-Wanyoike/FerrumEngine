# Contributing to Ferrum Platform

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Development Setup

### Prerequisites

- **Node.js** >= 18
- **pnpm** 9+
- **Git**

### Install Dependencies

```bash
git clone https://github.com/ferrum-ui/ferrum-platform.git
cd ferrum-platform
pnpm install
```

### Build

```bash
pnpm build
```

This uses [Turborepo](https://turbo.build/) to build all packages in the correct dependency order.

### Development Mode

For watch-mode builds during development:

```bash
pnpm dev
```

## Project Structure

```
ferrum-platform/
├── .changeset/          # Changeset entries for versioning
├── .github/workflows/   # CI/CD pipelines
├── packages/
│   ├── core/            # Base component styles and resets
│   ├── tokens/          # Design tokens as CSS custom properties
│   ├── motion/          # Animation and transition primitives
│   ├── utilities/       # Utility classes for layout and spacing
│   └── testing/         # Testing utilities and Vitest matchers
├── apps/
│   ├── docs/            # Documentation site
│   └── playground/      # Interactive playground
├── scripts/             # Build and release scripts
├── pnpm-workspace.yaml  # Workspace configuration
├── turbo.json           # Turborepo pipeline config
└── package.json         # Root package.json
```

## Coding Standards

### CSS

- Use CSS custom properties (design tokens) for all color, spacing, and typography values
- Never hardcode hex, rgb, or hsl color values — always use `var(--token-name)`
- Animations must only use GPU-accelerated properties (`transform`, `opacity`)
- Always provide a `prefers-reduced-motion` override for any animation
- Use logical properties where possible (e.g., `margin-inline-start` over `margin-left`)

### TypeScript

- All packages use strict TypeScript (`strict: true`)
- Export types alongside runtime values
- Use `interface` for object shapes, `type` for unions and utilities
- Prefer `const` over `let`, never use `var`

### General

- Run `pnpm lint` and `pnpm typecheck` before committing
- Ensure all tests pass with `pnpm test`
- Keep bundle sizes within budget (checked in CI)

## PR Process

1. **Create a branch** from `main`
2. **Make changes** following the coding standards above
3. **Add tests** for any new functionality
4. **Run the full check suite**: `pnpm lint && pnpm typecheck && pnpm test`
5. **Add a changeset**: `pnpm changeset` (select affected packages and bump type)
6. **Open a PR** — a preview deployment will be automatically created
7. **Address review feedback** — push updates to the same branch
8. **Squash and merge** when approved

### PR Checklist

- [ ] Linting passes (`pnpm lint`)
- [ ] Typecheck passes (`pnpm typecheck`)
- [ ] All tests pass (`pnpm test`)
- [ ] Changeset added (`pnpm changeset`)
- [ ] New features have tests
- [ ] Documentation updated (if applicable)

## Testing Requirements

All packages must maintain test coverage. Use the `@ferrum/testing` package for CSS-specific assertions:

```typescript
import { parseCSS, hasVariable, createTokenTester, createMotionTester } from '@ferrum/testing';

// Parse and inspect CSS output
const { rules } = parseCSS(generatedCSS);

// Check for token presence
expect(generatedCSS).toHaveToken('--color-primary');

// Validate animations
expect(generatedCSS).toHaveAnimation('fadeIn');
expect(generatedCSS).toUseGPUProperties('fadeIn');
expect(generatedCSS).toHaveReducedMotionOverride();

// Programmatic token testing
const tester = createTokenTester(tokens);
expect(tester.allTokensPresent(css)).toBe(true);
expect(tester.noHardcodedColors(css)).toBe(true);
```

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring without behavior change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks |
| `revert` | Revert a previous commit |

### Scopes

Use the package name as the scope: `core`, `tokens`, `motion`, `utilities`, `testing`, `docs`, or `playground`.

### Examples

```
feat(core): add focus ring utility class
fix(motion): correct easing curve for slide-in animation
docs(readme): update quick start instructions
test(testing): add GPU property matcher
chore: update dependencies