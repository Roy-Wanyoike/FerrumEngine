// ============================================================
// Blog Posts — Shared data for blog-view and global search
// ============================================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "announcing-ferrumengine-2-0",
    title: "Announcing FerrumEngine 2.0",
    excerpt: "A complete rewrite of the core runtime, a new compiler pipeline, and 200+ new effects. FerrumEngine 2.0 is the biggest release in our history.",
    content: [
      "Today we're shipping FerrumEngine 2.0 — the culmination of 14 months of work from our core team and over 80 community contributors. This is the most significant release since FerrumEngine's initial launch, and it fundamentally reimagines what a CSS motion platform can be.",
      "### A New Runtime Architecture\n\nThe 2.0 runtime is a ground-up rewrite. We moved from a single-pass CSS generator to a 9-pass compiler pipeline that optimizes every effect for the target browser's composite layer model. The result? Up to 40% smaller output and guaranteed 60fps animations, even on mid-range mobile devices.",
      "### 200+ New Effects\n\nFerrumEngine now ships with 542 production-ready effects — up from 338 in 1.x. New categories include Parallax, Morph, Page Transitions, and Stagger. Each effect has been hand-tuned by our design team and tested across 14 browser versions.",
      "### Framework Adapters for Everyone\n\nWe're shipping adapters for React, Vue 3, Svelte, Solid, Preact, Qwik, Astro, Angular, and Vanilla JS. Each adapter is less than 2KB gzipped and provides a native-feeling API for its framework.",
      "> \"FerrumEngine 2.0 isn't just an upgrade — it's a paradigm shift. The compiler pipeline alone has changed how we think about CSS animation performance.\"\n> — Sarah Chen, Lead Engineer",
      "### Zero Dependencies, Still True\n\nDespite the massive feature expansion, our zero-runtime-dependency promise holds. FerrumEngine 2.0 adds no new dependencies. Everything — from spring physics to the VFX engine — is built from scratch on top of the Web Animations API and CSS custom properties.",
      "### Migration from 1.x\n\nWe've published a codemod that handles 95% of the migration automatically. For the remaining 5%, our migration guide covers every breaking change with before/after examples. Most teams report under 30 minutes of migration time.",
      "Get started with `npx ferrum init --v2` or read the full migration guide in our documentation.",
    ],
    author: "Marcus Rivera",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Release",
    tags: ["v2.0", "compiler", "runtime", "release"],
    featured: true,
  },
  {
    slug: "zero-dependency-css",
    title: "Zero-Dependency CSS: How We Did It",
    excerpt: "Building a 542-effect animation library with zero runtime dependencies required rethinking every assumption about CSS tooling.",
    content: [
      "When we started FerrumEngine, we made an audacious promise: zero runtime dependencies. No GSAP, no anime.js, no Framer Motion — pure CSS and the Web Animations API. Here's how we made it work.",
      "### The Dependency Problem\n\nMost animation libraries depend on JavaScript runtime code to interpolate values, manage timelines, and sync state. This creates several problems: bundle size inflation, main-thread contention, and framework lock-in. We wanted none of that.",
      "### CSS Custom Properties as State\n\nOur breakthrough was using CSS custom properties (variables) as a state transport layer. Instead of JavaScript tracking animation progress, we push values into `--ferrum-progress` and let CSS `calc()` and `clamp()` handle the rest.",
      "### The @property Registry\n\nCSS `@property` declarations allow us to define custom property types, enabling smooth interpolation of values that CSS normally treats as discrete. This is the foundation of our entire system.",
      "### Spring Physics in CSS\n\nThe hardest challenge was spring physics — traditionally a JavaScript-only domain. We solved this by pre-computing spring curves at build time and emitting them as cubic-bezier approximations.",
      "> The result: springs that feel physically accurate, run entirely on the compositor thread, and add zero bytes to your JavaScript bundle.",
      "### What This Means for You\n\nZero dependencies means: smaller bundles, faster page loads, no version conflicts, no supply chain risk, and animations that work even when JavaScript fails. Your motion layer is as reliable as your CSS.",
    ],
    author: "Sarah Chen",
    date: "2025-01-08",
    readTime: "6 min read",
    category: "Engineering",
    tags: ["css", "zero-dependency", "architecture", "custom-properties"],
    featured: false,
  },
  {
    slug: "gpu-accelerated-motion-design",
    title: "GPU-Accelerated Motion Design",
    excerpt: "How FerrumEngine's compiler ensures every animation runs on the GPU compositor thread — and why that matters for your users.",
    content: [
      "60fps is not a luxury — it's a baseline. But achieving it consistently across devices requires understanding how browsers composite animations. Here's our approach.",
      "### The Compositor Thread\n\nModern browsers have two threads relevant to animation: the main thread (where JavaScript runs) and the compositor thread (which handles visual compositing). Animations that trigger layout or paint must run on the main thread, competing with your application code.",
      "### The Golden Properties\n\nOnly two CSS properties can be animated purely on the compositor: `transform` and `opacity`. Every FerrumEngine effect is built exclusively from these two properties, plus `clip-path` for shape effects.",
      "### Will-Change Management\n\nOur compiler automatically inserts `will-change: transform, opacity` on animated elements and removes it when animations complete.",
      "### Layer Count Budgets\n\nToo many compositor layers consume GPU memory and can actually hurt performance. Our compiler analyzes the effect tree and merges layers where possible.",
      "> On a 2022 MacBook Pro, FerrumEngine effects average 0.2ms per frame — 50× faster than the 10ms budget for 60fps.",
      "### Real-World Impact\n\nWe tested a dashboard with 47 animated elements using FerrumEngine vs. a popular JS animation library. FerrumEngine used 83% less main thread time.",
    ],
    author: "Alex Petrov",
    date: "2024-12-20",
    readTime: "7 min read",
    category: "Design",
    tags: ["performance", "gpu", "compositor", "optimization"],
    featured: false,
  },
  {
    slug: "framework-agnostic-by-design",
    title: "Framework Agnostic by Design",
    excerpt: "Why we built 9 framework adapters instead of picking sides — and how our architecture makes framework support nearly free.",
    content: [
      "The JavaScript framework landscape is more diverse than ever. React, Vue, Svelte, Solid, Angular — each has its own reactivity model, lifecycle hooks, and rendering paradigm. Supporting all of them seems like a massive undertaking. It isn't.",
      "### The Adapter Pattern\n\nFerrumEngine's core is framework-agnostic by design. It outputs CSS classes and Web Animation API calls — universal primitives that every framework can consume.",
      "### What Each Adapter Does\n\nA typical adapter is under 200 lines of code. It handles three things: mounting effects when components enter the DOM, cleaning up when they leave, and bridging framework state to CSS custom properties.",
      "### Why Not Pick a Framework?\n\nWe believe motion is a platform concern, not a framework feature. CSS doesn't care if you're using React or Svelte. Neither should your animation library.",
      "### Community Adapters\n\nThree of our nine adapters — Solid, Qwik, and Astro — were built by community contributors. Our adapter API is documented and designed for extensibility.",
    ],
    author: "Marcus Rivera",
    date: "2024-12-10",
    readTime: "5 min read",
    category: "Engineering",
    tags: ["adapters", "react", "vue", "svelte", "framework"],
    featured: false,
  },
  {
    slug: "542-effects-and-counting",
    title: "542 Effects and Counting",
    excerpt: "Behind the numbers: how we built, tested, and curated the largest open-source CSS effects library.",
    content: [
      "542 effects. 35 categories. 9 framework adapters. Zero dependencies. Let's talk about how we got here.",
      "### The Curation Process\n\nNot every animation is worth shipping. We evaluated over 1,200 candidate effects and narrowed them down to 542 based on four criteria: real-world usefulness, performance characteristics, accessibility impact, and aesthetic quality.",
      "### Categories\n\nOur 35 categories span the full spectrum of interface motion: Entrance, Exit, Attention, Loading, Interaction, Layout, Parallax, Morph, and Page Transitions.",
      "### Testing at Scale\n\nEvery effect is tested in three dimensions: visual (does it look right?), performance (does it hit 60fps?), and accessibility (does it respect `prefers-reduced-motion`?). We run 14,000+ automated tests across every effect in our CI pipeline.",
      "### The Size Equation\n\n542 effects in a single CSS file that's 48KB minified and 12KB gzipped. That's 22 bytes per effect.",
      "> \"Quantity without quality is noise. 542 effects means 542 hand-tuned, tested, documented animations — each one production-ready on day one.\"\n> — Elena Vasquez, Design Lead",
      "### What's Next\n\nWe're working on user-contributed effects, a visual effect builder, and AI-powered effect recommendations based on your component hierarchy.",
    ],
    author: "Elena Vasquez",
    date: "2024-11-28",
    readTime: "6 min read",
    category: "Community",
    tags: ["effects", "library", "testing", "open-source"],
    featured: false,
  },
  {
    slug: "the-future-of-web-animation",
    title: "The Future of Web Animation",
    excerpt: "From CSS scroll-driven animations to the View Transitions API — the web platform is catching up. Here's how FerrumEngine is positioning for the next decade.",
    content: [
      "Web animation is undergoing a renaissance. Browser vendors are shipping features that were impossible just two years ago. Here's our take on what's coming and how FerrumEngine is evolving with the platform.",
      "### Scroll-Driven Animations\n\nCSS scroll-driven animations link animation progress to scroll position — no JavaScript required. This is a game-changer for parallax, progress indicators, and reveal effects.",
      "### View Transitions API\n\nThe View Transitions API provides native page transition animations. FerrumEngine 2.0 integrates with this API to provide framework-agnostic page transitions.",
      "### Individual Transform Properties\n\nCSS now supports individual transform properties (`translate`, `rotate`, `scale`) that can be animated independently.",
      "### The Decline of JavaScript Animation\n\nAs CSS becomes more capable, the role of JavaScript in animation shifts from execution to orchestration.",
      "### Our Roadmap\n\n- **Q2 2025**: Full scroll-driven animation support with progressive enhancement\n- **Q3 2025**: View Transitions integration for SPA frameworks\n- **Q4 2025**: AI-powered motion design suggestions\n- **Q1 2026**: Real-time collaboration for design tokens\n- **Q2 2026**: Native Web Component support",
      "### A Platform Bet\n\nWe're betting big on the web platform. Every feature we build works with browser standards — not against them.",
    ],
    author: "Marcus Rivera",
    date: "2024-11-15",
    readTime: "9 min read",
    category: "Design",
    tags: ["future", "css", "scroll-driven", "view-transitions", "roadmap"],
    featured: false,
  },
];
