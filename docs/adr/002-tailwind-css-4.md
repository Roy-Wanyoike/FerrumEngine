# ADR-002: Tailwind CSS v4 with @tailwindcss/postcss

## Status
Accepted

## Context

The FerrumEngine platform needs a utility-first CSS framework for rapid UI development across 19+ views and 12+ UI components. CSS must be:

- **Zero-runtime**: No JavaScript CSS-in-JS at runtime — all styles compiled at build time.
- **Dark mode support**: System-aware theme switching with manual override.
- **Customizable**: FerrumEngine's brand colors, typography, and spacing tokens.
- **Tree-shakeable**: Only used utility classes should appear in the production CSS bundle.

We evaluated:

1. **Tailwind CSS v3** (`tailwindcss`, `postcss`, `autoprefixer`): Mature, well-documented, but requires a `tailwind.config.ts` configuration file and uses a JavaScript-based JIT engine.

2. **Tailwind CSS v4** (`@tailwindcss/postcss`): Next-generation engine written in Rust (Oxide). Configuration is CSS-first using `@theme` directives. No separate config file needed. PostCSS plugin replaces the v3 PostCSS pipeline. Faster builds.

3. **Vanilla CSS / CSS Modules**: Full control but significantly slower development velocity.

## Decision

We use **Tailwind CSS v4** with the `@tailwindcss/postcss` plugin:

- PostCSS configuration uses `@tailwindcss/postcss` as the sole Tailwind plugin.
- Theme customization is done via `@theme` blocks in the global CSS file.
- CSS custom properties (variables) are used for theming — the `dark:` variant toggles a `dark` class on `<html>`.
- `next-themes` manages the theme state.

## Consequences

### Positive
- **Faster builds**: Oxide engine compiles CSS ~10x faster than v3's JavaScript JIT.
- **CSS-first config**: Theme tokens live in CSS (`@theme` blocks) rather than a JavaScript config file, co-locating visual design with style code.
- **Smaller config surface**: No `tailwind.config.ts` needed — reduces configuration drift.
- **Automatic content detection**: v4 auto-detects template file paths; no `content` array configuration.
- **Full dark mode**: `dark:` variant works with class-based toggling via `next-themes`.

### Negative
- **Newer ecosystem**: Tailwind v4 is newer than v3; some third-party plugins may not yet support it.
- **Migration risk**: Upgrading from v3 to v4 involves config format changes (handled during initial setup).
- **CSP interaction**: Tailwind generates `<style>` tags at build/runtime, requiring `'unsafe-inline'` in `style-src` CSP directive. This is a known trade-off documented in the security headers configuration.