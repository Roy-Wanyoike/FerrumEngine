"use client";

import {
  Calendar, Clock, ArrowRight, Tag, Search, User,
  ChevronLeft, ChevronRight, ArrowLeft,
} from "lucide-react";
import { useState, useMemo } from "react";
import { SectionHeader } from "./sections/section-helpers";

/* ═══════════════════════════════════════════════════════════════
   BLOG VIEW — News, engineering posts, release announcements
   ═══════════════════════════════════════════════════════════════ */

interface BlogPost {
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

const blogPosts: BlogPost[] = [
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
      "```css\n.ferrum-fade-in {\n  --ferrum-progress: 0;\n  opacity: calc(var(--ferrum-progress));\n  transform: translateY(calc(20px * (1 - var(--ferrum-progress))));\n  transition: --ferrum-progress 0.5s cubic-bezier(0.16, 1, 0.3, 1);\n}\n```",
      "### The @property Registry\n\nCSS `@property` declarations allow us to define custom property types, enabling smooth interpolation of values that CSS normally treats as discrete. This is the foundation of our entire system.",
      "### Spring Physics in CSS\n\nThe hardest challenge was spring physics — traditionally a JavaScript-only domain. We solved this by pre-computing spring curves at build time and emitting them as cubic-bezier approximations. Our compiler evaluates the spring equation at 100+ sample points and finds the best-fit bezier curve.",
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
      "### The Golden Properties\n\nOnly two CSS properties can be animated purely on the compositor: `transform` and `opacity`. Every FerrumEngine effect is built exclusively from these two properties, plus `clip-path` for shape effects. This means our animations never block the main thread.",
      "### Will-Change Management\n\nOur compiler automatically inserts `will-change: transform, opacity` on animated elements and removes it when animations complete. This promotes elements to their own compositor layers only when needed, avoiding the memory overhead of permanent layer promotion.",
      "```css\n/* Before: triggers layout on every frame */\n.element { transition: width 0.3s, height 0.3s; }\n\n/* After: compositor-only */\n.element { transition: transform 0.3s; /* scale(1) → scale(1.05) instead of width change */ }\n```",
      "### Layer Count Budgets\n\nToo many compositor layers consume GPU memory and can actually hurt performance. Our compiler analyzes the effect tree and merges layers where possible, keeping the total layer count under 30 for any single view.",
      "> On a 2022 MacBook Pro, FerrumEngine effects average 0.2ms per frame — 50× faster than the 10ms budget for 60fps.",
      "### Real-World Impact\n\nWe tested a dashboard with 47 animated elements using FerrumEngine vs. a popular JS animation library. FerrumEngine used 83% less main thread time, resulting in significantly smoother scrolling and input responsiveness.",
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
      "### The Adapter Pattern\n\nFerrumEngine's core is framework-agnostic by design. It outputs CSS classes and Web Animation API calls — universal primitives that every framework can consume. Our adapters are thin wrappers that translate a framework's reactivity into FerrumEngine's trigger API.",
      "### What Each Adapter Does\n\nA typical adapter is under 200 lines of code. It handles three things: mounting effects when components enter the DOM, cleaning up when they leave, and bridging framework state to CSS custom properties.",
      "```jsx\n// React adapter usage\nimport { useFerrumEffect } from '@ferrum/react';\n\nfunction Card() {\n  const ref = useFerrumEffect('fade-in-up');\n  return <div ref={ref}>Content</div>;\n}\n```",
      "Svelte adapter: import { fade } from '@ferrum/svelte' and apply via the use: directive.",
      "### Why Not Pick a Framework?\n\nWe believe motion is a platform concern, not a framework feature. CSS doesn't care if you're using React or Svelte. Neither should your animation library. By staying framework-agnostic, we ensure that teams can adopt FerrumEngine regardless of their stack — and switch frameworks without rewriting their motion layer.",
      "### Community Adapters\n\nThree of our nine adapters — Solid, Qwik, and Astro — were built by community contributors. Our adapter API is documented and designed for extensibility. If your framework isn't supported yet, building an adapter typically takes less than a day.",
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
      "### Categories\n\nOur 35 categories span the full spectrum of interface motion:",
      "- **Entrance**: fade, slide, scale, rotate, and 28 more ways to introduce elements\n- **Exit**: matching exit patterns for every entrance effect\n- **Attention**: pulse, shake, bounce — patterns that draw focus\n- **Loading**: skeleton, shimmer, spin — states that communicate progress\n- **Interaction**: hover, press, toggle — responsive feedback loops\n- **Layout**: reorder, resize, collapse — structural transitions\n- **Parallax**: depth-based scrolling effects\n- **Morph**: shape and path morphing effects\n- **Page Transitions**: full-page navigation animations",
      "### Testing at Scale\n\nEvery effect is tested in three dimensions: visual (does it look right?), performance (does it hit 60fps?), and accessibility (does it respect `prefers-reduced-motion`?). We run 14,000+ automated tests across every effect in our CI pipeline.",
      "### The Size Equation\n\n542 effects in a single CSS file that's 48KB minified and 12KB gzipped. That's 22 bytes per effect. Our compiler tree-shakes aggressively — if you only use 20 effects, your output is under 2KB.",
      "> \"Quantity without quality is noise. 542 effects means 542 hand-tuned, tested, documented animations — each one production-ready on day one.\"\n> — Elena Vasquez, Design Lead",
      "### What's Next\n\nWe're working on user-contributed effects, a visual effect builder, and AI-powered effect recommendations based on your component hierarchy. The 542 number is a starting point, not a ceiling.",
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
      "### Scroll-Driven Animations\n\nCSS scroll-driven animations link animation progress to scroll position — no JavaScript required. This is a game-changer for parallax, progress indicators, and reveal effects. Our compiler already emits scroll-driven animations when the target browser supports them, falling back to Intersection Observer for older browsers.",
      "### View Transitions API\n\nThe View Transitions API provides native page transition animations. FerrumEngine 2.0 integrates with this API to provide framework-agnostic page transitions that feel instant and polished.",
      "### Individual Transform Properties\n\nCSS now supports individual transform properties (`translate`, `rotate`, `scale`) that can be animated independently. This enables more efficient animations — the browser can composite each transform property on its own layer.",
      "```css\n/* Before: animating the full transform string */\n.element { transition: transform 0.3s; }\n\n/* After: animating individual properties */\n.element {\n  transition: translate 0.3s, scale 0.3s;\n  translate: 0 0;\n  scale: 1;\n}\n```",
      "### The Decline of JavaScript Animation\n\nAs CSS becomes more capable, the role of JavaScript in animation shifts from execution to orchestration. FerrumEngine's architecture — CSS-first with JS only for triggering and sequencing — is perfectly aligned with this trend.",
      "### Our Roadmap\n\n- **Q2 2025**: Full scroll-driven animation support with progressive enhancement\n- **Q3 2025**: View Transitions integration for SPA frameworks\n- **Q4 2025**: AI-powered motion design suggestions\n- **Q1 2026**: Real-time collaboration for design tokens\n- **Q2 2026**: Native Web Component support (no adapter needed)",
      "### A Platform Bet\n\nWe're betting big on the web platform. Every feature we build works with browser standards — not against them. When browsers ship new animation capabilities, FerrumEngine effects get faster automatically. That's the power of building on platform primitives.",
    ],
    author: "Marcus Rivera",
    date: "2024-11-15",
    readTime: "9 min read",
    category: "Design",
    tags: ["future", "css", "scroll-driven", "view-transitions", "roadmap"],
    featured: false,
  },
];

const CATEGORIES = ["All", "Engineering", "Design", "Release", "Community"] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

/* ── Helper: format date ── */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Helper: render content blocks ── */
function renderContentBlock(block: string, idx: number) {
  // Code block
  if (block.startsWith("```")) {
    const lines = block.split("\n");
    const lang = lines[0]?.replace("```", "").trim() ?? "";
    const code = lines.slice(1, -1).join("\n");
    return (
      <div key={idx} className="my-6 rounded-xl border border-border/50 bg-foreground/[0.03] overflow-hidden">
        {lang && (
          <div className="px-4 py-2 border-b border-border/50 bg-foreground/[0.02]">
            <span className="text-xs font-mono text-muted-foreground/60">{lang}</span>
          </div>
        )}
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground/80 leading-relaxed">{code}</code>
        </pre>
      </div>
    );
  }

  // Blockquote
  if (block.startsWith("> ")) {
    const quoteText = block.replace(/^> /gm, "").trim();
    return (
      <blockquote key={idx} className="my-6 pl-4 border-l-2 border-purple-500/50 italic text-muted-foreground/80">
        <p className="leading-relaxed whitespace-pre-line">{quoteText}</p>
      </blockquote>
    );
  }

  // Heading
  if (block.startsWith("### ")) {
    return (
      <h2 key={idx} className="mt-10 mb-4 text-2xl font-bold text-foreground">
        {block.replace("### ", "")}
      </h2>
    );
  }

  // Unordered list items
  if (block.startsWith("- **")) {
    const items = block.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul key={idx} className="my-4 space-y-2">
        {items.map((item, i) => {
          const match = item.match(/^- \*\*(.+?)\*\*:?(.*)/);
          return (
            <li key={i} className="flex gap-3 text-muted-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
              <span>
                <strong className="text-foreground font-semibold">{match?.[1]}</strong>
                {match?.[2] && `: ${match[2]}`}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  // Regular paragraph
  return (
    <p key={idx} className="my-4 text-lg leading-relaxed text-muted-foreground/80">
      {block}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG VIEW COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function BlogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  /* ── Filtered posts ── */
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  /* ── Post detail navigation ── */
  const postIndex = selectedPost ? blogPosts.findIndex((p) => p.slug === selectedPost.slug) : -1;
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  /* ── Detail view ── */
  if (selectedPost) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground/60">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{selectedPost.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(selectedPost.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedPost.readTime}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {selectedPost.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-8">
            {selectedPost.title}
          </h1>

          {/* Content */}
          <article className="animate-in fade-in-0 duration-500">
            {selectedPost.content.map(renderContentBlock)}
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground/40" />
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/[0.04] text-muted-foreground/70 border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => setSelectedPost(prevPost)}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-colors text-left"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground/50 group-hover:-translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/65 mb-0.5">Previous</p>
                  <p className="text-sm font-medium text-foreground truncate">{prevPost.title}</p>
                </div>
              </button>
            ) : <div />}
            {nextPost ? (
              <button
                onClick={() => setSelectedPost(nextPost)}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-colors text-left sm:text-right sm:flex-row-reverse"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/65 mb-0.5">Next</p>
                  <p className="text-sm font-medium text-foreground truncate">{nextPost.title}</p>
                </div>
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    );
  }

  /* ── Listing view ── */
  return (
    <div className="pt-20 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="pt-12 pb-8">
          <SectionHeader
            label="Blog"
            title="Latest from the Lab"
            subtitle="Engineering deep-dives, release announcements, and design insights from the FerrumEngine team."
          />
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            <input
              type="text"
              placeholder="Search posts..."
              aria-label="Search blog posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-foreground/[0.03] border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                    : "bg-foreground/[0.03] text-muted-foreground/60 border-border/50 hover:bg-foreground/[0.05] hover:text-foreground/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        {featuredPost && (
          <button
            onClick={() => setSelectedPost(featuredPost)}
            className="group w-full mb-10 rounded-2xl border border-purple-500/20 overflow-hidden text-left transition-all hover:border-purple-500/40"
          >
            <div className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-purple-500/[0.07] via-transparent to-pink-500/[0.05]">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Featured
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/[0.05] text-muted-foreground/70 border border-border/50">
                  {featuredPost.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3 group-hover:text-purple-300 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-muted-foreground/70 max-w-3xl leading-relaxed mb-5">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/50">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(featuredPost.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <ArrowRight className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        )}

        {/* Post grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedPost(post)}
                className="group text-left rounded-2xl border border-border/50 bg-foreground/[0.015] p-5 hover:bg-foreground/[0.03] hover:border-border transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground/65">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground/60 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/65">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                {/* Tags */}
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-foreground/[0.03] text-muted-foreground/40 border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground/65 text-lg">No posts found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}