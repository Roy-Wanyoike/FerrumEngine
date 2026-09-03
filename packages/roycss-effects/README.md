# @roycss/effects

> **RoyCSS** — Production-ready CSS effects library, extracted from FerrumEngine.

## Overview

This package contains all CSS/visual/effects code that belongs to the RoyCSS sister project,
separated from the FerrumEngine intelligence core. The extraction follows ADR-011 to maintain
a clean separation of concerns: FerrumEngine handles **intelligence & reliability**, while
RoyCSS handles **visual effects & motion**.

## What's Included

### Modules

| Module | Description |
|--------|-------------|
| `ferrum-vfx` | Visual effects — cursor glow, distortion, glass morphism, gradient mesh, particles |
| `ferrum-motion` | Motion system — spring physics, timeline, decay, stagger, scroll-triggered |
| `ferrum-tokens` | Design tokens — colors, spacing, typography, shadows, durations, breakpoints |
| `ferrum-paint` | Paint API worklets — glow, glass, ripple, noise, gradient-mesh, confetti |
| `effects` | Lazy-loaded effect categories (36 categories, 568 effects) |
| `ferrum-effects-data` | Monolithic effects data (3,989 lines) with full CSS strings |
| `ferrum-effects-index` | Lightweight effect index (names & categories only, no CSS) |
| `ferrum-effects-loader` | Dynamic loader for full effect data |
| `roycss-data` | RoyCSS v3.0 auto-generated data |
| `roycss-index` | RoyCSS lightweight index |
| `roycss-loader` | RoyCSS dynamic loader |
| `animation-colors` | Tailwind color → RGBA mapping for spotlight/glow effects |

### Static Assets

- **CSS effects** — 35 category CSS files + unified bundles
- **Paint worklets** — 6 Houdini Paint API worklet JS files

## Installation

```bash
npm install @roycss/effects
```

## Usage

```ts
// Import from sub-paths
import { spring, decay } from '@roycss/effects/ferrum-motion';
import { createParticles, applyGlass } from '@roycss/effects/ferrum-vfx';
import { effects } from '@roycss/effects/ferrum-effects-data';
import { registerFerrumPaintWorklets } from '@roycss/effects/ferrum-paint';

// Or import everything from the root
import { spring, createParticles } from '@roycss/effects';
```

## Architecture

```
@roycss/effects/
├── src/
│   ├── ferrum-vfx/        # Visual effects
│   ├── ferrum-motion/     # Motion system
│   ├── ferrum-tokens/     # Design tokens
│   ├── ferrum-paint/      # Paint API worklets
│   ├── effects/           # Effect categories + lazy loader
│   ├── ferrum-effects-data.ts    # Full effects data
│   ├── ferrum-effects-index.ts   # Lightweight index
│   ├── ferrum-effects-loader.ts  # Dynamic loader
│   ├── roycss-data.ts     # RoyCSS data
│   ├── roycss-index.ts    # RoyCSS index
│   ├── roycss-loader.ts   # RoyCSS loader
│   ├── animation-colors.ts # Color mappings
│   └── types.ts           # Shared type definitions
├── public/
│   ├── effects/           # 35 CSS effect files
│   ├── worklets/          # 6 paint worklet JS files
│   ├── ferrum-effects.css
│   └── ferrum-effects-unified.css
├── index.js               # Main entry
├── index.d.ts             # Type declarations
└── package.json
```

## License

MIT
