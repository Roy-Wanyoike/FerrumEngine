// ============================================================
// FerrumEngine Documentation Content
// Senior Technical Writer — comprehensive reference
// ============================================================

export interface DocSection {
  id: string;
  title: string;
  icon: string;
  label?: string;
  content: DocBlock[];
}

export type DocBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "callout"; variant: "info" | "warning" | "tip"; title: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "api"; name: string; params: { name: string; type: string; required?: boolean; default?: string; desc: string }[]; returns?: string; desc: string };

export const docSections: DocSection[] = [
  // ────────────────────────────────────────────────
  // SECTION 1: GETTING STARTED
  // ────────────────────────────────────────────────
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "Rocket",
    content: [
      { type: "heading", text: "Welcome to FerrumEngine", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine is a production-ready CSS effects library providing 928 hand-crafted effects across 11 categories. Each effect is a single CSS class you can apply to any HTML element — no JavaScript runtime, no build step required, and zero dependencies. Whether you're building a marketing page, a SaaS dashboard, or an interactive portfolio, FerrumEngine gives you the visual polish your project needs in seconds, not hours.",
      },
      { type: "heading", text: "Installation", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine offers four installation methods to fit any workflow. Choose the one that matches your project's toolchain. All methods deliver the same complete stylesheet — the only difference is how the file reaches the browser.",
      },
      { type: "heading", text: "CDN (Fastest Start)", level: 3 },
      {
        type: "paragraph",
        text: "Add a single link tag to your HTML head. No npm, no bundler config, no PostCSS plugin. The CDN serves a compressed, cacheable CSS file with a content hash for long-term caching. This is the recommended approach for prototypes, static sites, and any project where you want to move fast.",
      },
      {
        type: "code",
        lang: "html",
        code: `<link
  rel="stylesheet"
  href="https://cdn.ferrumcss.com/ferrum.min.css"
/>`,
        caption: "Add to your <head> tag — works in any HTML file",
      },
      { type: "heading", text: "npm (Recommended for Production)", level: 3 },
      {
        type: "paragraph",
        text: "Install the package through your preferred package manager. This gives you version pinning, tree-shaking support, and integration with your build pipeline. The CSS file is located at the package root for easy importing.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# npm
npm install ferrumcss

# pnpm (preferred for monorepos)
pnpm add ferrumcss

# yarn
yarn add ferrumcss

# bun
bun add ferrumcss`,
      },
      {
        type: "paragraph",
        text: "After installing, import the stylesheet in your application's entry point. The exact file depends on your framework — see the Framework Integration section for detailed setup guides for React, Next.js, Vue, Svelte, Angular, and more.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* In your global CSS file */
@import 'ferrumcss/ferrum.css';`,
        caption: "Import in your main stylesheet",
      },
      { type: "heading", text: "Quick Start", level: 2 },
      {
        type: "paragraph",
        text: "Once FerrumEngine is loaded, using an effect is as simple as adding a class name to an element. Every effect in the library follows the rc- prefix convention — the standard FerrumEngine effect namespace. The class name directly describes what the effect does, making the API self-documenting and discoverable through autocomplete in any modern editor.",
      },
      {
        type: "code",
        lang: "html",
        code: `<!-- Fade up on page load -->
<div class="rc-fade-up">
  <h1>Welcome to my site</h1>
</div>

<!-- Pulse attention effect -->
<button class="rc-pulse">Click me</button>

<!-- 3D card tilt on hover -->
<div class="rc-tilt-card">
  <img src="/hero.jpg" alt="Hero" />
</div>

<!-- Typewriter text effect -->
<span class="rc-text-typewriter" data-text="Hello World">
  Hello World
</span>`,
        caption: "Apply effects by adding classes to any HTML element",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Pro tip: Preview before committing",
        text: "Use the built-in Playground to browse all 848 effects, customize parameters like duration and easing, and copy production-ready code with one click. Open it from the navigation bar or press the playground button on any effect card.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 2: CORE CONCEPTS
  // ────────────────────────────────────────────────
  {
    id: "core-concepts",
    title: "Core Concepts",
    icon: "Layers",
    content: [
      { type: "heading", text: "How FerrumEngine Works", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine is a pure CSS library — every effect is defined entirely in CSS using @keyframes, transitions, and selectors. There is no JavaScript runtime, no DOM manipulation, and no animation loop. This architecture decision delivers three critical advantages: first, effects work even when JavaScript fails or is disabled; second, there is zero overhead on the main thread; and third, the library integrates seamlessly with any framework or rendering approach, including server-side rendering and static site generation.",
      },
      { type: "heading", text: "Effect Categories", level: 2 },
      {
        type: "paragraph",
        text: "The 848 effects are organized into 11 categories based on their purpose and interaction model. Categories are not just organizational — they reflect distinct usage patterns and CSS technique families. Understanding these categories helps you quickly find the right effect and predict its behavior.",
      },
      {
        type: "table",
        headers: ["Category", "Count", "Trigger", "Description"],
        rows: [
          ["Core Animations", "126", "Page load / toggle", "Entrance, exit, bounce, shake, pulse, spring, and attention-drawing animations"],
          ["Hover", "73", "Mouse hover", "Scale, glow, lift, border-draw, tilt, color shift, and overlay reveals"],
          ["Text", "43", "Page load / hover", "Wave, gradient, neon, glitch, typewriter, chrome, and stroke text effects"],
          ["Backgrounds", "96", "Page load", "Gradient animations, particles, starfield, aurora, kaleidoscope, and organic motion"],
          ["Loaders", "46", "Page load", "Spinners, dots, bars, progress indicators, pacman, and skeleton shimmers"],
          ["3D & Transforms", "50", "Hover / load", "Card flips, cube rotations, perspective, fold, depth, and book effects"],
          ["Buttons & Cards", "109", "Hover / click", "Ripple, fill, shine, lift, glass, border, press, and neon transitions"],
          ["Forms & Inputs", "10", "Focus / interaction", "Focus glow, floating labels, toggle switches, and input animations"],
          ["Navigation & UI", "22", "Click / state", "Accordion, tabs, dropdowns, modals, toasts, and stepper transitions"],
          ["Scroll & Micro", "50", "Scroll / click", "Parallax, sticky headers, reveals, indicators, and micro-interactions"],
          ["Advanced", "181", "Various", "Hologram, VHS, mesh gradient, spotlight, glass, cursor, and unique FX"],
        ],
        caption: "Complete category reference with trigger behavior and counts",
      },
      { type: "heading", text: "Class Naming Convention", level: 2 },
      {
        type: "paragraph",
        text: "Every effect class follows the rc-{category}-{name} pattern. The prefix rc- prevents collisions with your own CSS classes and with other libraries. Category names are shortened to keep class names practical — for example, rc-fade-up (not rc-entrance-fade-up). When you see a class name, you can immediately identify its category and purpose.",
      },
      {
        type: "code",
        lang: "text",
        code: `rc-{effect-name}

Examples:
  rc-fade-up          → Core: fade + translate up
  rc-pulse            → Core: continuous pulse
  rc-hover-lift       → Hover: lift on cursor
  rc-text-typewriter  → Text: typewriter reveal
  rc-tilt-card        → Buttons & Cards: 3D tilt on hover
  rc-skeleton-shimmer → Loaders: shimmer loading
  rc-glitch           → Advanced: glitch distortion`,
        caption: "Class naming pattern and examples",
      },
      { type: "heading", text: "Trigger Models", level: 2 },
      {
        type: "paragraph",
        text: "Effects use one of three trigger models, and understanding which model an effect uses is essential for correct application. Entrance and attention effects play automatically when the element enters the DOM — they use CSS animation properties. Hover effects activate on mouse hover using the :hover pseudo-class. Exit effects require you to toggle a class (typically adding an is-exiting class to trigger the departure animation). This design means most effects require zero JavaScript to function.",
      },
      {
        type: "table",
        headers: ["Trigger", "CSS Mechanism", "JS Required?", "Example"],
        rows: [
          ["Page load", "@keyframes + animation property", "No", "rc-fade-up, rc-pulse"],
          ["Hover", ":hover pseudo-class + transition", "No", "rc-hover-lift, rc-hover-glow"],
          ["Class toggle", "animation triggered by class", "Yes (minimal)", "rc-fade-out, rc-exit-slide"],
        ],
      },
      { type: "heading", text: "CSS Architecture", level: 2 },
      {
        type: "paragraph",
        text: "The stylesheet is organized in a layered architecture. Custom properties (CSS variables) are defined first in a :root block, providing a single configuration point. Base keyframe definitions follow, containing the raw animation sequences. Effect classes are defined last, each composing keyframes, transitions, and timing functions into a ready-to-use API. This layered approach means you can override any custom property to globally adjust effect behavior without modifying individual classes.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 3: FRAMEWORK INTEGRATION
  // ────────────────────────────────────────────────
  {
    id: "framework-integration",
    title: "Framework Integration",
    icon: "Puzzle",
    label: "Guides",
    content: [
      { type: "heading", text: "Overview", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine is framework-agnostic by design. Since it's pure CSS, it works with every frontend framework and meta-framework without special configuration. The integration steps below show how to import the stylesheet in each ecosystem. Once imported, all 848 effect classes are available to use on any element — no component wrappers, no hooks, no provider components needed.",
      },
      { type: "heading", text: "React", level: 2 },
      {
        type: "paragraph",
        text: "Import the CSS file in your application's entry point or in a top-level layout component. In Create React App, this is typically src/index.css. In Vite-based projects, import it in your main.tsx. The library has zero JavaScript dependencies, so there's nothing else to install or configure.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// main.tsx or index.tsx
import 'ferrumcss/ferrum.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Any component
export function Hero() {
  return (
    <div className="rc-fade-up">
      <h1>Powered by FerrumEngine</h1>
      <p className="rc-text-typewriter" data-text="Beautiful effects">
        Beautiful effects
      </p>
    </div>
  );
}`,
        caption: "React setup with Vite",
      },
      { type: "heading", text: "Next.js (App Router)", level: 2 },
      {
        type: "paragraph",
        text: "For Next.js 13+ with the App Router, the recommended approach depends on your performance needs. For the smallest initial bundle, dynamically load the CSS using a useEffect hook so it doesn't block the server-rendered HTML. For simplicity, you can also import it directly in your global CSS file or layout.tsx. Both approaches are production-valid.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Option A: Dynamic loading (recommended for performance)
// In your layout or page component
'use client';
import { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/ferrum.css'; // copy to /public
    document.head.appendChild(link);
  }, []);

  return <div>{children}</div>;
}

// Option B: Direct import in globals.css
// @import 'ferrumcss/ferrum.css';`,
        caption: "Next.js App Router integration",
      },
      { type: "heading", text: "Vue 3", level: 2 },
      {
        type: "code",
        lang: "vue",
        code: `<!-- main.ts -->
import { createApp } from 'vue';
import 'ferrumcss/ferrum.css';
import App from './App.vue';

createApp(App).mount('#app');

<!-- App.vue -->
<template>
  <section class="rc-fade-up">
    <h1>Vue + FerrumEngine</h1>
    <button class="rc-pulse-hover">Hover me</button>
  </section>
</template>`,
        caption: "Vue 3 Composition API setup",
      },
      { type: "heading", text: "Svelte", level: 2 },
      {
        type: "code",
        lang: "svelte",
        code: `<!-- +layout.svelte -->
<script>
  import 'ferrumcss/ferrum.css';
</script>

<slot />

<!-- Any component -->
<div class="rc-fade-up">
  <h1>Svelte + FerrumEngine</h1>
</div>`,
        caption: "SvelteKit layout import",
      },
      { type: "heading", text: "Angular", level: 2 },
      {
        type: "code",
        lang: "typescript",
        code: `// styles.css (referenced in angular.json)
@import 'ferrumcss/ferrum.css';

// any.component.ts
@Component({
  selector: 'app-hero',
  template: \`
    <div class="rc-fade-up">
      <h1>Angular + FerrumEngine</h1>
    </div>
  \`
})
export class HeroComponent {}`,
        caption: "Angular CLI integration",
      },
      { type: "heading", text: "Other Frameworks", level: 2 },
      {
        type: "paragraph",
        text: "For Preact, SolidJS, Astro, Qwik, or any other framework, the pattern is the same: import the CSS file once in your app's entry point, then use class names on your elements. Astro users should import in the layout component's frontmatter script tag. Vanilla HTML projects can simply use the CDN link. If your framework supports CSS modules or scoped styles, FerrumEngine classes are global by design and will work alongside your scoped classes without conflict.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Framework-specific tips",
        text: "In React and Vue, use the className prop (not class). In Svelte and Angular, use the standard class attribute. For server components in Next.js, FerrumEngine classes work fine because they're pure CSS with no client-side JavaScript.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 4: EFFECTS CATALOG
  // ────────────────────────────────────────────────
  {
    id: "effects-catalog",
    title: "Effects Catalog",
    icon: "Sparkles",
    label: "Reference",
    content: [
      { type: "heading", text: "Browsing Effects", level: 2 },
      {
        type: "paragraph",
        text: "The FerrumEngine landing page includes a fully interactive gallery where you can browse, search, and preview every effect. Use the category filter bar to narrow results by type, or the search field to find effects by name. Click any effect card to open its detail modal, which shows a live preview, the complete CSS code, framework-specific usage examples, and customization controls for duration, delay, easing, and iteration count.",
      },
      { type: "heading", text: "Using the Gallery", level: 3 },
      {
        type: "list",
        items: [
          "Scroll down to the Motion section to see the full effect grid with infinite-scroll pagination",
          "Use the horizontal category bar to filter by effect type (Entrance, Hover, Text, 3D, etc.)",
          "Type in the search box to filter by effect name, class name, or category",
          "Click any effect card to open the code detail modal with live preview and copy-to-clipboard",
          "Use the framework tabs (HTML, React, Vue, Svelte, Angular, Preact, Solid, Astro) in the modal to get framework-specific code",
          "Customize duration, delay, timing function, and iteration count using the sliders in the modal",
          "Save effects to your Collection for later reference — persisted in localStorage",
        ],
      },
      { type: "heading", text: "Most Popular Effects", level: 2 },
      {
        type: "paragraph",
        text: "These are the most frequently used effects based on community usage patterns. They represent the core effects that cover the majority of UI animation needs in production applications.",
      },
      {
        type: "table",
        headers: ["Class", "Category", "Best For", "Performance"],
        rows: [
          ["rc-fade-up", "Entrance", "Hero sections, feature reveals", "GPU-accelerated"],
          ["rc-fade-in", "Entrance", "General content appearance", "GPU-accelerated"],
          ["rc-slide-up", "Entrance", "List items, cards", "GPU-accelerated"],
          ["rc-hover-lift", "Hover", "Cards, buttons, links", "GPU-accelerated"],
          ["rc-hover-glow", "Hover", "CTA buttons, highlights", "GPU-accelerated"],
          ["rc-pulse", "Attention", "Notifications, badges", "Minimal paint"],
          ["rc-text-typewriter", "Text", "Hero headlines, taglines", "Minimal paint"],
          ["rc-tilt-card", "Cards", "Product cards, testimonials", "GPU-accelerated"],
          ["rc-skeleton-shimmer", "Skeleton", "Content loading states", "GPU-accelerated"],
          ["rc-ripple", "Buttons", "Action buttons, forms", "GPU-accelerated"],
        ],
        caption: "Top 10 most-used effects in production",
      },
      { type: "heading", text: "Choosing the Right Effect", level: 2 },
      {
        type: "paragraph",
        text: "When selecting effects for your UI, consider three factors: purpose, performance budget, and user preference. Entrance effects should be subtle and fast (200-600ms) to avoid delaying perceived load time. Hover effects provide immediate feedback and should feel responsive — keep them under 300ms. Attention-seeking effects like pulse and bounce should be used sparingly, reserved for notifications, empty states, or critical call-to-action elements. Always test with prefers-reduced-motion enabled to ensure your effects degrade gracefully.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 5: CUSTOMIZATION
  // ────────────────────────────────────────────────
  {
    id: "customization",
    title: "Customization",
    icon: "Palette",
    content: [
      { type: "heading", text: "CSS Custom Properties", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine exposes a set of CSS custom properties (variables) that let you globally adjust how effects behave without modifying the source CSS. Override these variables in your own stylesheet to change default durations, easing curves, color accents, and more. The custom properties are defined on :root, so they cascade to all elements and can be overridden at any specificity level — globally, per component, or per element.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* Override globally in your stylesheet */
:root {
  /* Timing */
  --rc-duration: 0.6s;
  --rc-delay: 0s;
  --rc-easing: cubic-bezier(0.16, 1, 0.3, 1);

  /* Colors (used by glow, shadow, gradient effects) */
  --rc-color-primary: #a855f7;
  --rc-color-secondary: #ec4899;

  /* Transforms */
  --rc-translate-y: -20px;
  --rc-scale: 1.05;

  /* Reduced motion — effects degrade to instant */
  --rc-duration-reduced: 0.01ms;
}

/* Override per-component */
.my-hero {
  --rc-duration: 1s;
  --rc-translate-y: -40px;
}

/* Override per-element */
<button style="--rc-duration: 0.3s" class="rc-fade-up">
  Fast fade
</button>`,
        caption: "Global, component-level, and inline custom property overrides",
      },
      { type: "heading", text: "Modifying Individual Effects", level: 2 },
      {
        type: "paragraph",
        text: "If custom properties don't provide enough control, you can override individual effect styles directly. Since FerrumEngine uses standard CSS, you can redeclare any animation, transition, or transform property with higher specificity. The recommended approach is to create wrapper classes in your own stylesheet that extend or modify FerrumEngine effects, keeping the original classes untouched for future updates.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* Extend an existing effect */
.hero-fade {
  composes: rc-fade-up;
  animation-duration: 1.2s;
  animation-timing-function: ease-out;
  animation-delay: 0.3s;
}

/* Override a hover effect */
.cta-button {
  composes: rc-hover-lift;
  --rc-translate-y: -4px;
  box-shadow: 0 8px 30px rgba(168, 85, 247, 0.3);
}

/* Create a variant with different colors */
.glow-blue {
  composes: rc-hover-glow;
  --rc-color-primary: #3b82f6;
}`,
        caption: "Creating effect variants using composes and custom properties",
      },
      { type: "heading", text: "Animation Timing", level: 2 },
      {
        type: "paragraph",
        text: "The duration, delay, and easing of any effect can be customized through CSS custom properties or inline styles. FerrumEngine includes 10 curated easing presets that you can apply by overriding --rc-easing. Each easing curve is tuned for a specific feel — from snappy and responsive to smooth and cinematic.",
      },
      {
        type: "table",
        headers: ["Easing", "CSS Value", "Feel"],
        rows: [
          ["Default", "cubic-bezier(0.16, 1, 0.3, 1)", "Smooth deceleration (emphasized)"],
          ["Ease Out", "cubic-bezier(0, 0, 0.2, 1)", "Standard deceleration"],
          ["Ease In Out", "cubic-bezier(0.4, 0, 0.2, 1)", "Symmetric acceleration/deceleration"],
          ["Bounce Out", "cubic-bezier(0.34, 1.56, 0.64, 1)", "Playful overshoot"],
          ["Sharp", "cubic-bezier(0.4, 0, 0.6, 1)", "Quick, mechanical"],
          ["Spring", "cubic-bezier(0.175, 0.885, 0.32, 1.275)", "Physics-based spring"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Performance note",
        text: "Avoid durations longer than 1 second for entrance effects — they create a perceived delay. Hover effects should stay under 300ms for responsive feel. For scroll-triggered animations, 400-600ms provides a good balance between visibility and flow.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 6: API REFERENCE
  // ────────────────────────────────────────────────
  {
    id: "api-reference",
    title: "API Reference",
    icon: "FileCode",
    label: "Reference",
    content: [
      { type: "heading", text: "CSS Classes", level: 2 },
      {
        type: "paragraph",
        text: "The complete API surface of FerrumEngine is its CSS class names. There are 848 effect classes plus a set of utility and modifier classes. Each effect class applies a self-contained animation or transition — no parent containers, no JavaScript initialization, no configuration objects. This section documents the patterns that all classes follow.",
      },
      { type: "heading", text: "Effect Class Pattern", level: 3 },
      {
        type: "code",
        lang: "css",
        code: `/* Every effect class applies:
   1. An animation or transition declaration
   2. Timing defaults from custom properties
   3. Transform/composable properties
   4. Fallbacks for reduced-motion preference
*/

.rc-fade-up {
  animation: rc-fade-up var(--rc-duration, 0.6s)
    var(--rc-easing, cubic-bezier(0.16, 1, 0.3, 1))
    var(--rc-delay, 0s)
    var(--rc-iteration, 1)
    both;
}

/* Corresponding keyframe */
@keyframes rc-fade-up {
  from {
    opacity: 0;
    transform: translateY(var(--rc-translate-y, -20px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
        caption: "Anatomy of a FerrumEngine effect class",
      },
      { type: "heading", text: "Custom Properties Reference", level: 2 },
      {
        type: "paragraph",
        text: "These are the CSS custom properties you can override to control effect behavior globally, per-component, or per-element. All properties have sensible defaults, so you only need to override the ones you want to change.",
      },
      {
        type: "api",
        name: "--rc-duration",
        desc: "Default animation duration applied to all effects. Override per-element using inline style or in a stylesheet rule.",
        params: [
          { name: "Initial value", type: "0.6s", desc: "Default duration for all effects" },
          { name: "Recommended range", type: "0.2s – 1.2s", desc: "Keep entrance effects under 1s, hover under 300ms" },
        ],
      },
      {
        type: "api",
        name: "--rc-delay",
        desc: "Delay before the animation starts. Useful for staggered entrance effects where elements appear sequentially.",
        params: [
          { name: "Initial value", type: "0s", desc: "Animations start immediately" },
          { name: "Stagger pattern", type: "calc(var(--i, 0) * 0.1s)", desc: "Use with CSS counter for sequential delays" },
        ],
      },
      {
        type: "api",
        name: "--rc-easing",
        desc: "Default timing function. FerrumEngine uses an emphasized ease-out curve by default, which creates a natural deceleration feel.",
        params: [
          { name: "Initial value", type: "cubic-bezier(0.16, 1, 0.3, 1)", desc: "Emphasized ease-out" },
        ],
      },
      {
        type: "api",
        name: "--rc-color-primary",
        desc: "Primary accent color used by glow, shadow, and gradient-based effects. Accepts any CSS color value.",
        params: [
          { name: "Initial value", type: "#a855f7", desc: "Purple accent color" },
        ],
      },
      {
        type: "api",
        name: "--rc-color-secondary",
        desc: "Secondary accent color for dual-tone effects like gradient animations and border glows.",
        params: [
          { name: "Initial value", type: "#ec4899", desc: "Pink accent color" },
        ],
      },
      { type: "heading", text: "Utility Classes", level: 2 },
      {
        type: "paragraph",
        text: "Beyond the 848 effects, FerrumEngine includes utility classes for common animation patterns. These utilities don't create effects on their own — they modify how other effects behave, provide accessibility support, or offer common animation primitives.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* Accessibility: disable all animations */
.rc-no-motion {
  animation: none !important;
  transition: none !important;
}

/* Stagger helper: use with CSS custom property --i */
.rc-stagger > * {
  --i: 0;
  animation-delay: calc(var(--i) * 0.1s);
}
.rc-stagger > *:nth-child(1) { --i: 0; }
.rc-stagger > *:nth-child(2) { --i: 1; }
.rc-stagger > *:nth-child(3) { --i: 2; }
/* ... up to nth-child(10) */

/* Animation state utilities */
.rc-paused { animation-play-state: paused; }
.rc-running { animation-play-state: running; }
.rc-reverse { animation-direction: reverse; }`,
        caption: "Utility classes for stagger, pause, and accessibility",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 7: PERFORMANCE
  // ────────────────────────────────────────────────
  {
    id: "performance",
    title: "Performance",
    icon: "Gauge",
    content: [
      { type: "heading", text: "Performance Philosophy", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine is engineered for production-grade performance. Every design decision — from GPU-accelerated transforms to the lazy-loading CSS architecture — is guided by the principle that visual polish must never come at the cost of user experience. The library achieves sub-100ms first paint impact, zero layout shift, and zero main-thread JavaScript overhead.",
      },
      { type: "heading", text: "Bundle Optimization", level: 2 },
      {
        type: "paragraph",
        text: "The complete uncompressed CSS file is 172 KB, which compresses to approximately 28 KB with gzip and 22 KB with Brotli. This is comparable to a single medium-complexity web font. However, for optimal performance, FerrumEngine supports dynamic loading — load the CSS only when the user opens a code modal or playground, not on the initial page render. This approach reduces the critical path to zero bytes of CSS overhead.",
      },
      {
        type: "table",
        headers: ["Metric", "Value", "Notes"],
        rows: [
          ["Uncompressed CSS", "172 KB", "Complete library with all 848 effects"],
          ["Gzipped", "~28 KB", "Standard compression on most CDNs"],
          ["Brotli", "~22 KB", "Modern compression, supported by all major CDNs"],
          ["JavaScript overhead", "0 KB", "Pure CSS — no runtime JS"],
          ["First Paint impact", "< 100ms", "With dynamic loading strategy"],
          ["CLS score", "0.00", "No layout shift from animations"],
          ["LCP impact", "0ms", "Animations don't block largest contentful paint"],
        ],
      },
      { type: "heading", text: "GPU Acceleration", level: 2 },
      {
        type: "paragraph",
        text: "All transform-based effects (fade, slide, scale, rotate, 3D) use only transform and opacity properties, which are composited on the GPU. This means animations run on a separate compositor thread and never trigger layout or paint on the main thread. The browser can animate these properties at 60fps even when the main thread is busy with JavaScript execution. Effects that use box-shadow or background properties are optimized with will-change hints where appropriate.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* GPU-accelerated: composited on the GPU */
.rc-fade-up {
  /* Uses only opacity + transform → GPU compositor */
  animation: rc-fade-up 0.6s ease both;
}

@keyframes rc-fade-up {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* If you need to override, stay on the compositor:
   ✅ opacity, transform, filter
   ❌ width, height, margin, padding, top, left
*/`,
        caption: "GPU compositor-friendly animation properties",
      },
      { type: "heading", text: "Dynamic Loading Strategy", level: 2 },
      {
        type: "paragraph",
        text: "For the best initial load performance, load FerrumEngine dynamically only when needed. This is especially effective for content-heavy pages where CSS effects are a progressive enhancement rather than a core requirement. The implementation uses a simple DOM API to inject a stylesheet link when the user first interacts with the effects gallery or opens a modal.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `// Load FerrumEngine only when the user opens the gallery
let cssLoaded = false;

function loadFerrumEngine() {
  if (cssLoaded) return;
  cssLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/ferrum.css';
  document.head.appendChild(link);
}

// Call on first interaction with effects
galleryButton.addEventListener('click', loadFerrumEngine);`,
        caption: "Dynamic CSS loading pattern",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Performance budget tip",
        text: "If you only need a subset of effects, you can copy individual keyframes and classes from the source CSS into your own stylesheet. This eliminates unused CSS entirely. The online Playground's export feature lets you select specific effects and download only their CSS.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 8: ACCESSIBILITY
  // ────────────────────────────────────────────────
  {
    id: "accessibility",
    title: "Accessibility",
    icon: "Shield",
    content: [
      { type: "heading", text: "Accessible by Default", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine is built with accessibility as a core requirement, not an afterthought. Every effect respects the user's prefers-reduced-motion media query, meaning users who have enabled the \"reduce motion\" setting in their operating system will see content appear instantly without animation. This is implemented at the CSS level using a @media (prefers-reduced-motion: reduce) block that disables all animation and transition properties, ensuring zero JavaScript is needed for compliance.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* Built into FerrumEngine — automatically applied */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
        caption: "Reduced motion support is built into the library",
      },
      { type: "heading", text: "WCAG Compliance", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine effects are designed to meet WCAG 2.1 Level AA and AAA criteria for animation. The key requirements are: animations must not flash more than three times per second (SC 2.3.1), users must be able to pause or disable animations (SC 2.2.2), and content must be perceivable without animation (SC 1.1.1). Because FerrumEngine effects are decorative enhancements — not information carriers — they naturally satisfy these criteria. Content is always in the DOM regardless of animation state, and the reduced-motion media query provides the disable mechanism.",
      },
      { type: "heading", text: "ARIA and Semantic HTML", level: 2 },
      {
        type: "paragraph",
        text: "Effects don't interfere with ARIA attributes or semantic HTML structure. Since animations are applied via CSS classes, they don't change the accessibility tree. Screen readers perceive no difference between an animated and non-animated element. However, for effects that temporarily hide content (such as exit animations), ensure the element's aria-hidden attribute is synchronized with the animation state to prevent screen readers from announcing invisible content.",
      },
      {
        type: "code",
        lang: "html",
        code: `<!-- Good: content is accessible regardless of animation -->
<div class="rc-fade-up" role="alert">
  Notification: Your changes have been saved.
</div>

<!-- For exit animations, manage aria-hidden with JS -->
<div
  class="rc-fade-out"
  aria-hidden={isExiting}
  onanimationend={() => removeElement()}
>
  Dismissing notification...
</div>`,
        caption: "Accessibility patterns for animated content",
      },
      { type: "heading", text: "Keyboard Navigation", level: 2 },
      {
        type: "paragraph",
        text: "Hover-based effects in FerrumEngine respond to :focus-within and :focus-visible in addition to :hover, ensuring keyboard users get the same visual feedback as mouse users. Interactive elements like buttons and links with hover effects will show the effect when focused via Tab key navigation. The library does not add any focus trap or keyboard event handlers — these are the responsibility of your application's JavaScript, since they depend on your specific UI structure and interaction patterns.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Testing for accessibility",
        text: "Always test your animated interfaces with keyboard-only navigation and with prefers-reduced-motion enabled. Use browser DevTools to emulate the reduced-motion preference (Rendering > Emulate CSS media feature > prefers-reduced-motion: reduce) and verify that all content is visible and functional without animations.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 9: PLAYGROUND
  // ────────────────────────────────────────────────
  {
    id: "playground",
    title: "Playground",
    icon: "Terminal",
    content: [
      { type: "heading", text: "Interactive Playground", level: 2 },
      {
        type: "paragraph",
        text: "The FerrumEngine Playground is a built-in interactive tool that lets you experiment with any of the 848 effects in real time. Open it from the navigation bar or from any effect card's detail modal. The playground renders a live preview alongside a code editor, so you can see changes instantly as you adjust parameters.",
      },
      { type: "heading", text: "Features", level: 2 },
      {
        type: "list",
        items: [
          "Live preview with instant visual feedback as you change any parameter",
          "Effect browser with search and category filtering to quickly find the right effect",
          "Duration slider (0.1s – 3.0s) for fine-tuning animation speed",
          "Delay control (0s – 2.0s) for creating staggered entrance sequences",
          "Timing function selector with visual previews of each easing curve",
          "Iteration count control (1, 2, 3, infinite) for looping animations",
          "Framework-specific code output with one-click copy for HTML, React, Vue, Svelte, Angular, Preact, Solid, and Astro",
          "Collection save — bookmark effects for later without leaving the playground",
        ],
      },
      { type: "heading", text: "Using the Playground", level: 2 },
      {
        type: "paragraph",
        text: "The playground interface is divided into two panels: the preview panel on the left shows the effect applied to a sample element, and the controls panel on the right provides sliders and selectors for customization. At the bottom, a code block shows the current effect's CSS source code, which updates live as you adjust parameters. Use the framework tabs above the code block to switch between output formats, then click the copy button to grab the code.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Workflow tip",
        text: "Use the Collection feature to save effects as you browse. Open multiple effects, customize their parameters, then review your saved collection and copy all the code at once. This is faster than revisiting each effect individually.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // SECTION 10: CONTRIBUTING
  // ────────────────────────────────────────────────
  {
    id: "contributing",
    title: "Contributing",
    icon: "Users",
    content: [
      { type: "heading", text: "Welcome, Contributors", level: 2 },
      {
        type: "paragraph",
        text: "FerrumEngine is open source under the MIT License, and we welcome contributions from everyone. Whether you're fixing a typo in the documentation, adding a new effect, improving performance, or reporting a bug, every contribution helps make the library better for the entire community. This guide covers the development workflow, coding standards, and PR process.",
      },
      { type: "heading", text: "Development Setup", level: 2 },
      {
        type: "code",
        lang: "bash",
        code: `# Clone the repository
git clone https://github.com/roy-wanyoike/FerrumEngine.git
cd FerrumEngine

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Run the build
pnpm build

# Run linting
pnpm lint`,
        caption: "Local development environment setup",
      },
      { type: "heading", text: "Project Structure", level: 2 },
      {
        type: "code",
        lang: "text",
        code: `FerrumEngine/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Landing page (main application)
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── globals.css     # Global styles + FerrumEngine design system
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── ferrum/         # Ferrum-specific components
│   │   │   └── navigation.tsx
│   │   └── ui/             # shadcn/ui component library
│   └── lib/
│       ├── ferrum-effects-index.ts # Lightweight effect index (fast load)
│       └── ferrum-effects-loader.ts # Dynamic full data loader
├── public/
│   └── ferrum-effects.css          # Effect CSS (loaded dynamically)
└── package.json`,
        caption: "Project directory structure",
      },
      { type: "heading", text: "Adding a New Effect", level: 2 },
      {
        type: "paragraph",
        text: "To add a new effect, you need to create the CSS keyframes and class definition in the stylesheet, add the effect to the data index, and optionally add it to the visual gallery. Follow these steps precisely to ensure the effect integrates correctly with the search, filter, and code modal systems.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Define the @keyframes in ferrum-effects.css with the rc-{name} naming convention",
          "Create the .rc-{name} class that references the keyframe with CSS custom property defaults",
          "Add the effect to the effectsIndex array in ferrum-effects-index.ts with name, className, category, and displayType",
          "Add the effect to the full effectsData array in ferrum-effects-data.ts with the complete CSS code string",
          "Update the categoryCounts in ferrum-effects-index.ts if you added a new category",
          "Test in the browser: search, filter by category, open code modal, verify all framework tabs generate correct code",
          "Run pnpm lint and pnpm build to verify no errors",
        ],
      },
      { type: "heading", text: "Coding Standards", level: 2 },
      {
        type: "list",
        items: [
          "TypeScript strict mode for all TypeScript files — no any types",
          "CSS: use custom properties (--rc-*) for all configurable values",
          "CSS: prefer transform and opacity for animations (GPU compositor)",
          "CSS: always include prefers-reduced-motion overrides",
          "React: use functional components with hooks only",
          "Naming: rc-{category}-{name} for CSS classes, camelCase for TypeScript identifiers",
          "Accessibility: all interactive elements must be keyboard-accessible",
          "Performance: animations must not trigger layout (no width/height/margin animations)",
        ],
      },
      { type: "heading", text: "Pull Request Process", level: 2 },
      {
        type: "paragraph",
        text: "Fork the repository, create a feature branch from main, make your changes, and open a pull request. Include a clear description of what the PR does and why. For new effects, include a screen recording or GIF showing the effect in action. For bug fixes, include a description of the bug, the steps to reproduce, and the fix. All PRs must pass CI (build + lint) before merging. The maintainer reviews PRs on a regular basis and will provide feedback within a few days.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Community channels",
        text: "Join the FerrumEngine community on Discord for discussions, feature requests, and help. Star the repository on GitHub if you find the library useful — it helps others discover it and supports the project's growth.",
      },
    ],
  },
];

// Sidebar navigation structure (nested for TOC)
export interface NavGroup {
  label: string;
  items: { id: string; title: string }[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Introduction",
    items: [
      { id: "getting-started", title: "Getting Started" },
      { id: "core-concepts", title: "Core Concepts" },
    ],
  },
  {
    label: "Usage",
    items: [
      { id: "framework-integration", title: "Framework Integration" },
      { id: "effects-catalog", title: "Effects Catalog" },
      { id: "customization", title: "Customization" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "api-reference", title: "API Reference" },
      { id: "performance", title: "Performance" },
      { id: "accessibility", title: "Accessibility" },
    ],
  },
  {
    label: "Advanced",
    items: [
      { id: "playground", title: "Playground" },
      { id: "contributing", title: "Contributing" },
    ],
  },
];