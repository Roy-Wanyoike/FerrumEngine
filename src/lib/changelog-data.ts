// ============================================================
// Changelog Entries — Shared data for changelog-view and global search
// ============================================================

export interface ChangelogChange {
  type: "added" | "fixed" | "changed" | "deprecated" | "removed" | "security";
  items: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  title: string;
  description: string;
  changes: ChangelogChange[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2025-01-28",
    type: "minor",
    title: "Scroll-Driven Animations & Performance Dashboard",
    description: "Native scroll-driven animation support with progressive enhancement, and a new performance monitoring dashboard for analyzing animation frame rates.",
    changes: [
      {
        type: "added",
        items: [
          "Native CSS scroll-driven animation support with automatic fallback to Intersection Observer",
          "Performance Dashboard component for real-time FPS monitoring of animated elements",
          "`useFerrumScrollProgress()` hook for React adapters",
          "`@ferrum/astro` adapter with View Transitions API integration",
          "Visual effect builder (beta) with drag-and-drop keyframe editing",
        ],
      },
      {
        type: "changed",
        items: [
          "Compiler output is now 15% smaller on average due to improved CSS property deduplication",
          "Spring physics engine now uses RK4 integration for more accurate trajectories",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed memory leak in effect cleanup when components unmount during animation",
          "Corrected `prefers-reduced-motion` behavior to fully disable transforms, not just transitions",
          "Resolved z-index stacking context issue with glass morphism effects in Safari",
        ],
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-01-15",
    type: "major",
    title: "FerrumEngine 2.0 — The Complete Rewrite",
    description: "Ground-up rewrite of the runtime, new 9-pass compiler pipeline, 200+ new effects, and 9 framework adapters. The biggest release in FerrumEngine history.",
    changes: [
      {
        type: "added",
        items: [
          "Complete runtime rewrite with 9-pass compiler pipeline",
          "200+ new effects across 12 new categories (Parallax, Morph, Page Transitions, Stagger, etc.)",
          "Framework adapters: React, Vue 3, Svelte, Solid, Preact, Qwik, Astro, Angular, Vanilla JS",
          "Design token system with CSS custom property generation",
          "`ferrum init` CLI with project scaffolding and migration tools",
          "Automatic codemod for v1.x → v2.0 migration (95% automated)",
          "VFX engine with particle systems, noise-based effects, and blend modes",
        ],
      },
      {
        type: "changed",
        items: [
          "Effect class names follow new naming convention: `ferrum-{category}-{name}`",
          "Configuration file format changed from `.ferrumrc` to `ferrum.config.ts`",
          "Minimum Node.js version raised to 18.0",
        ],
      },
      {
        type: "removed",
        items: [
          "Dropped support for Internet Explorer 11",
          "Removed deprecated `ferrum.animate()` imperative API (use Web Animations API directly)",
          "Removed `ferrum-plugin-postcss` (functionality integrated into core compiler)",
        ],
      },
    ],
  },
  {
    version: "1.5.0",
    date: "2024-10-20",
    type: "minor",
    title: "Spring Physics & Gesture Library",
    description: "Introduced spring-based animation physics and a gesture recognition layer for drag, fling, and pinch interactions.",
    changes: [
      {
        type: "added",
        items: [
          "Spring physics engine with configurable mass, stiffness, and damping parameters",
          "Gesture recognition: drag, fling, pinch-to-zoom, and swipe detection",
          "`useSpring` and `useGesture` hooks for React adapter",
          "12 new spring-based entrance/exit effects",
          "Interactive playground presets for spring parameter tuning",
        ],
      },
      {
        type: "changed",
        items: [
          "Improved bezier curve fitting algorithm for spring-to-CSS conversion (3x faster)",
          "Reduced package size by 8% through CSS output optimization",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed spring overshoot causing elements to briefly escape their bounding box",
          "Resolved gesture conflicts between horizontal swipe and vertical scroll",
        ],
      },
    ],
  },
  {
    version: "1.4.0",
    date: "2024-08-12",
    type: "minor",
    title: "Accessibility First",
    description: "Comprehensive accessibility improvements including full prefers-reduced-motion support, ARIA live regions for dynamic content, and screen reader announcements for state changes.",
    changes: [
      {
        type: "added",
        items: [
          "Full `prefers-reduced-motion` support: effects gracefully degrade to instant transitions",
          "ARIA live region utilities for animated content changes",
          "`useReducedMotion()` hook for conditional effect rendering",
          "High-contrast mode support for all effect categories",
          "Accessibility audit report and WCAG 2.2 AA compliance documentation",
        ],
      },
      {
        type: "changed",
        items: [
          "Default easing curves adjusted for reduced motion sensitivity",
          "Animation durations now capped at 1s by default (configurable)",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed screen reader announcing animation class names as content",
          "Resolved focus management issues with modal entrance animations",
          "Corrected color contrast ratios for effect preview badges",
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "2024-06-05",
    type: "minor",
    title: "Compiler Pipeline v2 & Tree Shaking",
    description: "New multi-pass compiler with dead code elimination, effect composition analysis, and up to 60% smaller production bundles.",
    changes: [
      {
        type: "added",
        items: [
          "Multi-pass compiler pipeline with effect dependency graph analysis",
          "Dead code elimination: only emit CSS for effects actually used in your project",
          "Effect composition: combine multiple effects into a single optimized class",
          "`ferrum analyze` CLI command for bundle size estimation",
          "Source map support for compiled CSS output",
        ],
      },
      {
        type: "changed",
        items: [
          "Build performance improved by 4x through parallel CSS generation",
          "Watch mode now uses incremental compilation (only rebuilds changed effects)",
        ],
      },
      {
        type: "deprecated",
        items: [
          "`ferrum.bundle()` API deprecated in favor of automatic tree-shaking via the compiler",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed compiler crash on effects with circular dependency references",
          "Resolved CSS specificity conflicts when composing multiple effects",
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2024-03-18",
    type: "minor",
    title: "Interactive Effects & Hover System",
    description: "New hover, press, and toggle effect categories with automatic state management and smooth transition chaining.",
    changes: [
      {
        type: "added",
        items: [
          "48 new hover effects (scale, glow, tilt, border reveal, shadow lift)",
          "24 new press/active state effects",
          "Toggle effect system with enter/exit state pairs",
          "Automatic transition chaining: hover → active → hover-out sequence",
          "Vue 3 adapter with Composition API support",
        ],
      },
      {
        type: "changed",
        items: [
          "Hover effects now use `:hover` pseudo-class instead of JavaScript event listeners",
          "Improved touch device detection for hover effect fallback behavior",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed hover effect flicker on rapid mouse enter/leave cycles",
          "Resolved toggle effect state desync in React StrictMode",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2024-01-10",
    type: "minor",
    title: "Design Tokens & Theming",
    description: "Integrated design token system with automatic CSS custom property generation and theme switching support.",
    changes: [
      {
        type: "added",
        items: [
          "Design token system: colors, spacing, typography, shadows, borders, radii",
          "Automatic CSS custom property generation from token definitions",
          "Theme switching with smooth token transitions",
          "Token CLI: `ferrum tokens export` for generating framework-specific token files",
          "30 new loading/shimmer/skeleton effects",
        ],
      },
      {
        type: "changed",
        items: [
          "Effect duration values can now reference design tokens",
          "Easing curves exported as reusable token values",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed token inheritance in nested component trees",
          "Resolved theme transition flash on initial page load",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2023-10-01",
    type: "major",
    title: "FerrumEngine 1.0 — Initial Release",
    description: "The first stable release of FerrumEngine: 338 CSS motion effects, React and Vue adapters, and a zero-dependency runtime.",
    changes: [
      {
        type: "added",
        items: [
          "338 production-ready CSS motion effects across 23 categories",
          "React adapter with `useFerrumEffect` and `FerrumProvider`",
          "Vue 3 adapter with `v-ferrum` directive",
          "Zero runtime dependencies — pure CSS and Web Animations API",
          "Interactive playground with live preview and code export",
          "Comprehensive documentation with quickstart guides",
          "CLI tool for project initialization and effect management",
        ],
      },
      {
        type: "security",
        items: [
          "CSS output sanitization to prevent style injection via effect names",
          "Content Security Policy compatibility: no inline styles or eval()",
        ],
      },
    ],
  },
];
