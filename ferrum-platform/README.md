# Ferrum Platform

<p align="center">
  <strong>⚡ High-performance CSS design system for modern UIs</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@ferrum/core?style=flat-square&color=2563eb" alt="@ferrum/core" />
  <img src="https://img.shields.io/npm/v/@ferrum/tokens?style=flat-square&color=2563eb" alt="@ferrum/tokens" />
  <img src="https://img.shields.io/npm/v/@ferrum/motion?style=flat-square&color=2563eb" alt="@ferrum/motion" />
  <img src="https://img.shields.io/npm/v/@ferrum/utilities?style=flat-square&color=2563eb" alt="@ferrum/utilities" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-blue.svg" alt="Node.js >= 18" />
</p>

<p align="center">
  <b>Ferrum</b> is a modular, zero-runtime CSS design system built with design tokens, motion primitives, and utility-first patterns. Tree-shakeable, framework-agnostic, and accessible by default.
</p>

---

## Quick Start

```bash
# Using pnpm (recommended)
pnpm add @ferrum/core @ferrum/tokens

# Using npm
npm install @ferrum/core @ferrum/tokens

# Using yarn
yarn add @ferrum/core @ferrum/tokens
```

Import in your app:

```css
@import '@ferrum/tokens';
@import '@ferrum/core';
```

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@ferrum/core` | Base component styles, resets, and core design primitives | ![npm](https://img.shields.io/npm/v/@ferrum/core?style=flat-square) |
| `@ferrum/tokens` | Design tokens as CSS custom properties (colors, spacing, typography, etc.) | ![npm](https://img.shields.io/npm/v/@ferrum/tokens?style=flat-square) |
| `@ferrum/motion` | Animation and transition primitives with GPU-accelerated defaults | ![npm](https://img.shields.io/npm/v/@ferrum/motion?style=flat-square) |
| `@ferrum/utilities` | Utility classes for layout, spacing, and responsive design | ![npm](https://img.shields.io/npm/v/@ferrum/utilities?style=flat-square) |
| `@ferrum/testing` | Testing utilities and Vitest matchers for CSS validation | ![npm](https://img.shields.io/npm/v/@ferrum/testing?style=flat-square) |

## Monorepo Commands

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Run tests with coverage
pnpm test --coverage

# Lint all packages
pnpm lint

# Typecheck all packages
pnpm typecheck

# Run a specific package's scripts
pnpm --filter @ferrum/core build
pnpm --filter @ferrum/tokens dev

# Version packages (via changesets)
pnpm changeset
pnpm version

# Publish packages
pnpm release
```

## Features

- **Zero runtime** — Pure CSS output, no JavaScript runtime overhead
- **Design tokens** — Comprehensive token system with CSS custom properties
- **Framework agnostic** — Works with React, Vue, Svelte, or any HTML
- **Accessible** — Respects `prefers-reduced-motion`, high contrast, and focus states
- **Tree-shakeable** — Import only what you need
- **GPU-accelerated animations** — All motion primitives use `transform` and `opacity`
- **Type-safe** — Full TypeScript support for testing utilities

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, coding standards, and the PR process.

## License

[MIT](./LICENSE) © Ferrum UI