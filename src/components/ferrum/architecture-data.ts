// ============================================================================
// Ferrum Platform — Architecture Documentation Data
// ============================================================================

export interface ArchDiagramNode {
  id: string;
  label: string;
  x: number; // percentage 0-100 (will be multiplied by 8 in an 800-wide SVG)
  y: number; // percentage 0-100 (will be multiplied by 4 in a 400-tall SVG)
  w?: number; // percentage width (default 12)
  h?: number; // percentage height (default 6)
  variant?: "default" | "primary" | "accent" | "muted";
}

export interface ArchDiagramEdge {
  from: string;
  to: string;
  label?: string;
  style?: "solid" | "dashed";
}

export interface ArchSubsystem {
  id: string;
  name: string;
  iconName: string;
  color: string;
  status: "stable" | "beta" | "planned";
  tagline: string;
  overview: string;
  purpose: string;
  problem: string;
  internalArchitecture: string;
  renderingFlow: string;
  dataFlow: string;
  algorithms: string;
  performance: string;
  accessibility: string;
  browserIntegration: string;
  futureRoadmap: string[];
  diagram: {
    nodes: ArchDiagramNode[];
    edges: ArchDiagramEdge[];
  };
}

// ============================================================================
// Complete Architecture Subsystems
// ============================================================================

export const ARCHITECTURE_SUBSYSTEMS: ArchSubsystem[] = [
  // ==========================================================================
  // 1. Runtime
  // ==========================================================================
  {
    id: "runtime",
    name: "Runtime",
    iconName: "Cpu",
    color: "emerald",
    status: "stable",
    tagline: "Zero-dependency browser execution layer",
    overview:
      "The framework-agnostic core that bridges declarative intent with DOM mutations. Handles effect registration, state observation, and dynamic CSS class application in under 2KB gzipped.",
    purpose:
      "The Runtime serves as the execution backbone of the entire Ferrum platform, providing the contract between high-level declarative APIs and low-level DOM operations. Every other subsystem — components, motion, physics, VFX — depends on the Runtime's effect registration and class application mechanisms. The Runtime itself has zero internal dependencies, operating entirely against standard DOM APIs. Its contract is simple: accept an intent descriptor, resolve token references, and produce minimal DOM mutations. This makes it the only module that directly touches the DOM, enforcing a single mutation pathway.",
    problem:
      "Without the Runtime, developers must manually wire state changes to DOM updates using framework-specific reactivity systems (React's setState, Vue's ref, Svelte's assignments) or imperative DOM manipulation (document.querySelector, classList.toggle). Existing solutions like Alpine.js (15KB gzipped) couple observation and rendering into one monolithic layer. Tailwind's runtime is CSS-only and cannot react to state. The cost of not having a dedicated runtime is duplicated mutation logic across every component library, inconsistent class application ordering (causing specificity bugs), and no central cache for resolved token values — leading to redundant style recalculations on every state change.",
    internalArchitecture:
      "The Runtime is decomposed into four core modules: EffectRegistry, DOMObserver, TokenResolver, and CSSExecutor, plus the supporting StyleCache. EffectRegistry maintains a Map<EffectId, EffectDescriptor> of all registered side effects, supporting both eager and lazy initialization. DOMObserver wraps MutationObserver to detect external DOM changes and invalidate affected caches. TokenResolver traverses the token hierarchy (Primitive → Semantic → Component) via a directed acyclic graph, resolving each Ferrum class name to its final CSS class set. CSSExecutor batches DOM writes using a microtask queue, ensuring all mutations within a single event loop tick are coalesced into one style recalculation. Communication between modules uses direct function calls — no event bus — because the call graph is a known, shallow tree. The dependency direction is strictly left-to-right: Intent → Registry/Observer → Resolver → Executor → DOM.",
    renderingFlow:
      "A render cycle begins when an effect is registered or a state observation fires. The Runtime does not schedule its own frames; instead, it responds to the host framework's commit phase (React's useEffect, Vue's watchEffect, or Svelte's $effect). When triggered, the CSSExecutor collects all pending intent updates into a single batch. It then calls TokenResolver to expand any Ferrum utility classes into their resolved CSS class set. The resolved classes are diffed against the element's current classList using a bitmask comparison. Only the delta (classes to add, classes to remove) is applied via element.classList.add() and element.classList.remove(). This triggers a single style recalculation in the browser's rendering pipeline, followed by layout (if the changes affect geometry) and composite. Because the Runtime only manipulates classList and never inline styles, the browser can optimize the paint phase by referencing cached stylesheet rules.",
    dataFlow:
      "Input enters as an IntentDescriptor object containing { element, classes, options }. The EffectRegistry stores this descriptor keyed by a unique effect ID. When a state change occurs, the observer signals the CSSExecutor with the changed element references. The CSSExecutor queries TokenResolver, which walks the token graph: for each class name, it checks PrimitiveTokens → SemanticTokens → ComponentTokens, returning a Set<string> of resolved CSS classes. The CSSExecutor then computes the diff between the resolved set and the element's current classList (stored in StyleCache as a Map<Element, Set<string>>). The diff produces two arrays — additions and removals — which are applied to the DOM. State lives exclusively in the StyleCache (a WeakMap<Element, Set<string>>) and the EffectRegistry (a Map<string, EffectDescriptor>). No state is stored on DOM elements themselves.",
    algorithms:
      "The core algorithm is class diffing, implemented as a set symmetric difference between the resolved target class set and the cached current class set. This runs in O(n) where n is the number of classes on the element (typically <20). Token resolution uses a trie-based lookup on the token graph, achieving O(k) where k is the depth of the token hierarchy (max 3). Effect registration uses a hash map insertion at O(1). The microtask batching queue uses a simple FIFO linked list with O(1) enqueue and O(n) drain (where n is the number of pending effects, typically <50 per frame). The MutationObserver callback uses a debounce of 16ms (one frame) to coalesce rapid external mutations into a single cache invalidation pass.",
    performance:
      "The Runtime weighs 1.8KB gzipped (2.7KB minified, 4.1KB uncompressed). Memory footprint is approximately 120 bytes per observed element (WeakMap entry + Set of class strings). In benchmarks against raw classList.toggle, the Runtime adds less than 0.1ms overhead per 100 class changes. The microtask batching ensures that 100 simultaneous state changes result in exactly one style recalculation. Startup cost is sub-millisecond: the EffectRegistry and StyleCache are lazy-initialized on first use. The Runtime handles 10,000+ observed elements without frame drops, with degradation only appearing above ~50,000 elements due to MutationObserver callback overhead.",
    accessibility:
      "The Runtime preserves all ARIA attributes and roles during class mutations because it operates exclusively on classList — never on element attributes or content. When removing classes, it never strips ARIA-related attributes. The Runtime respects the document's live region announcements by not triggering unnecessary DOM mutations that would fire AccessibleNode change events. It integrates with the prefers-reduced-motion media query by exposing a Runtime.reducedMotion boolean that motion and VFX subsystems query before registering animation effects. Focus management is preserved: the Runtime does not move focus or modify tabindex during any operation.",
    browserIntegration:
      "The Runtime uses MutationObserver to detect external DOM changes and invalidate the StyleCache. It uses queueMicrotask() for batching DOM writes, falling back to Promise.resolve().then() in Safari 14.0. Class mutations use the standard Element.classList API (add, remove, toggle), which is supported in all browsers back to IE10. The Runtime does not use ResizeObserver, IntersectionObserver, or requestAnimationFrame — those are delegated to the motion and physics subsystems. Progressive enhancement: if MutationObserver is unavailable (IE9), the Runtime skips cache invalidation and performs full re-resolution on every update, incurring a ~0.05ms per-element penalty. The Runtime is compatible with Shadow DOM; it accepts ShadowRoot-scoped elements and resolves tokens within the shadow boundary.",
    futureRoadmap: [
      "Add EffectScheduler with priority-based execution ordering (idle vs. visual vs. critical) using requestIdleCallback",
      "Implement TransactionalDOM for atomic multi-element updates that roll back on error",
      "Support CSS.toggle() API (CSS Typed OM) when available for native class toggling without JS overhead",
      "Add dev-mode instrumentation that logs every mutation path with timing data to Chrome DevTools Performance panel",
      "Implement cross-document Runtime instance sharing for multi-window applications via BroadcastChannel",
    ],
    diagram: {
      nodes: [
        { id: "intent", label: "Intent Layer", x: 5, y: 15, variant: "primary" },
        { id: "registry", label: "EffectRegistry", x: 28, y: 8, variant: "default" },
        { id: "observer", label: "DOMObserver", x: 28, y: 55, variant: "default" },
        { id: "resolver", label: "TokenResolver", x: 52, y: 15, variant: "default" },
        { id: "executor", label: "CSSExecutor", x: 75, y: 15, variant: "default" },
        { id: "dom", label: "DOM Update", x: 75, y: 55, variant: "accent" },
        { id: "cache", label: "StyleCache", x: 52, y: 55, variant: "muted" },
      ],
      edges: [
        { from: "intent", to: "registry", label: "register()" },
        { from: "intent", to: "observer", label: "observe()" },
        { from: "registry", to: "resolver", label: "resolve tokens" },
        { from: "observer", to: "executor", label: "mutations" },
        { from: "resolver", to: "executor", label: "expanded CSS" },
        { from: "executor", to: "dom", label: "apply classes" },
        { from: "executor", to: "cache", label: "cache hit?" },
        { from: "cache", to: "executor", label: "cached", style: "dashed" },
      ],
    },
  },

  // ==========================================================================
  // 2. Compiler
  // ==========================================================================
  {
    id: "compiler",
    name: "Compiler",
    iconName: "Terminal",
    color: "sky",
    status: "stable",
    tagline: "9-pass CSS optimization pipeline",
    overview:
      "Transforms developer-written intent into optimized CSS through a deterministic multi-pass pipeline: Parse → Analyze → Dead Code Elimination → Token Inlining → @Layer Merging → Hex Compression → Selector Minification → Output Generation → Validation.",
    purpose:
      "The Compiler transforms human-readable Ferrum class names and token references into the smallest possible CSS output. It is depended on by the Runtime (which consumes its output as <style> blocks or CSS modules), the Cloud subsystem (which invokes it during build), and the Studio (which triggers recompilation on live edits). The Compiler depends on the Tokens subsystem for token resolution during the Token Inlining pass. Its contract: accept source CSS + token definitions, produce optimized CSS that preserves visual fidelity while minimizing bytes. It is a pure function with no side effects — same input always produces the same output.",
    problem:
      "Without the Compiler, developers ship unoptimized CSS with dead rules, verbose hex colors (#ffffff instead of #fff), unmerged @layer blocks, and un-inlined token references that require runtime resolution. Tailwind's JIT compiler (PostCSS plugin, 38KB) handles dead code elimination but does not perform hex compression, @layer merging, or selector minification as separate passes. CSSNano (the standard postcss-minifier) operates on generic CSS and cannot understand Ferrum's token semantics, so it cannot inline tokens at build time. LightningCSS (29KB Rust-WASM) is fast but lacks Ferrum-specific optimizations like semantic-to-primitive token flattening. The cost of not having a dedicated compiler is 40-60% larger CSS bundles and increased runtime token resolution overhead.",
    internalArchitecture:
      "The Compiler is structured as a 9-stage pipeline where each pass is a pure function of type (AST, Context) → (AST, Context). The stages are: (1) Parser — converts CSS source into an AST using a custom CSS3-compliant parser (not PostCSS, to avoid the dependency). (2) Analyzer — walks the AST to build a dependency graph of selectors, tokens, and @layer references. (3) DeadCodeElim — performs reachability analysis on the dependency graph to remove unused rules. (4) TokenInliner — replaces semantic token references (var(--color-primary)) with their resolved primitive values from the Tokens subsystem. (5) LayerMerger — combines multiple @layer blocks targeting the same layer name into a single block, reducing rule count. (6) HexCompressor — converts #aabbcc → #abc and #000000 → #000. (7) SelectorMinifier — rewrites class selectors to shortest unique prefixes (e.g., .ferrum-button-primary → .fb-p). (8) OutputGenerator — serializes the AST back to CSS string. (9) Validator — runs the W3C CSS Validation Service algorithm locally to check for syntax errors. Communication between passes is via the shared (AST, Context) tuple — no global state. Each pass can be independently tested and disabled.",
    renderingFlow:
      "The Compiler does not render to the screen. Its output flow is: source files → Parse (string to AST) → 7 optimization passes (AST to AST) → Output (AST to CSS string). However, when integrated with the dev server (Studio or local dev), the Compiler's output flows into a <style> tag injected via document.adoptedStyleSheets or a <link> tag with a blob URL. In production builds (Cloud subsystem), the Compiler outputs a .css file that is uploaded to the CDN. The Compiler's output is always a valid CSS stylesheet — never JavaScript — ensuring it can be loaded as a render-blocking or non-blocking resource depending on the deployment strategy.",
    dataFlow:
      "Input: { source: string, tokens: TokenMap, options: CompilerOptions }. The source string is tokenized by the Parser into a CST (concrete syntax tree), then transformed into an AST (abstract syntax tree) by stripping whitespace and comments. The Analyzer produces a Context object containing { dependencyGraph: DAG<RuleNode>, usedTokens: Set<string>, layerMap: Map<string, RuleNode[]> }. DeadCodeElim traverses the DAG from entry nodes (rules referenced by HTML class names) and marks reachable nodes; unreachable nodes are pruned. TokenInliner replaces each var(--token-name) in property values with the resolved value from the TokenMap. The Context object is mutated in-place at each pass, accumulating metadata for downstream passes. Output: { css: string, stats: { originalBytes, outputBytes, rulesRemoved, tokensInlined } }.",
    algorithms:
      "Dead code elimination uses a reverse reachability analysis on the selector dependency DAG — O(V+E) where V is the number of CSS rules and E is the number of token/selector references. Token inlining is a straightforward AST traversal with hash map lookups — O(N) where N is the number of AST nodes containing var() expressions. @Layer merging uses a string-keyed grouping operation — O(N log N) due to sorting by layer name for deterministic output. Selector minification uses a prefix trie (radix tree) to find the shortest unique prefix for each class name — O(N * K) where K is the average class name length. Hex compression is a regex-based pass — O(N). The overall pipeline complexity is dominated by the DAG reachability analysis at O(V+E).",
    performance:
      "The Compiler processes a 100KB CSS file in 12ms on a mid-range laptop (M1, 16GB RAM). The 9-pass pipeline adds approximately 2ms of overhead compared to a single-pass minifier. Output reduction averages 42% (range: 28-58% depending on token density). Memory usage peaks at 3x the input file size during AST construction (a 100KB file uses ~300MB during parsing, dropping to ~50MB after tree pruning). The Parser is the bottleneck, accounting for 60% of total compilation time. For incremental compilation (Studio use case), only the changed file and its dependents are re-parsed and re-analyzed, reducing recompilation to <2ms for a single-file edit.",
    accessibility:
      "The Compiler preserves all @media (prefers-contrast: high), @media (prefers-color-scheme: dark), and @media (prefers-reduced-motion: reduce) queries — they are never stripped as dead code even if no HTML element currently references them, because they may be toggled at runtime. The Validator pass checks that color contrast pairs specified in the token map meet WCAG AA (4.5:1 for normal text, 3:1 for large text) and logs warnings for non-compliant pairs. Selector minification never shortens ARIA-related selectors (.aria-hidden, .sr-only, [role=alert]) to ensure assistive technology compatibility.",
    browserIntegration:
      "The Compiler is a build-time tool and does not run in the browser. However, its output is consumed by the browser via <style> tags or external stylesheets. The output uses standard CSS features: @layer (Chrome 99+, Firefox 97+, Safari 15.4+), var() (all modern browsers), and @media queries (universal). For browsers that do not support @layer, the Compiler can optionally flatten layers into specificity-order rules via a post-processing pass. The Compiler does not use any browser APIs itself. In the Studio dev server, compilation happens in a Web Worker using Comlink for thread communication, ensuring the main thread remains responsive.",
    futureRoadmap: [
      "Add CSS Container Query support with automatic @container rule generation from component token metadata",
      "Implement speculative compilation that pre-compiles likely-next-edits based on IDE cursor position",
      "Add WASM-based Parser using a Rust-generated module for 3-5x faster AST construction on large files",
      "Support CSS Nesting (Level 3) with automatic unnesting for older browsers as a compiler pass",
      "Add source map generation that maps minified selectors back to original Ferrum class names for debugging",
    ],
    diagram: {
      nodes: [
        { id: "src", label: "Source CSS", x: 3, y: 35, variant: "primary" },
        { id: "parse", label: "Parser", x: 15, y: 10, variant: "default" },
        { id: "analyze", label: "Analyzer", x: 28, y: 10, variant: "default" },
        { id: "dce", label: "DeadCodeElim", x: 41, y: 10, variant: "default" },
        { id: "inline", label: "TokenInliner", x: 15, y: 50, variant: "default" },
        { id: "layer", label: "LayerMerger", x: 28, y: 50, variant: "default" },
        { id: "hex", label: "HexCompressor", x: 41, y: 50, variant: "default" },
        { id: "mini", label: "SelectorMin", x: 54, y: 35, variant: "default" },
        { id: "output", label: "Output Gen", x: 70, y: 35, variant: "default" },
        { id: "validate", label: "Validator", x: 84, y: 35, variant: "default" },
        { id: "css", label: "Optimized CSS", x: 95, y: 35, variant: "accent" },
      ],
      edges: [
        { from: "src", to: "parse", label: "raw CSS" },
        { from: "parse", to: "analyze", label: "AST" },
        { from: "analyze", to: "dce", label: "DAG" },
        { from: "dce", to: "inline", label: "pruned AST", style: "dashed" },
        { from: "dce", to: "mini", label: "optimized" },
        { from: "inline", to: "layer", label: "inlined AST" },
        { from: "layer", to: "hex", label: "merged" },
        { from: "hex", to: "mini", label: "compressed" },
        { from: "mini", to: "output", label: "minified AST" },
        { from: "output", to: "validate", label: "CSS string" },
        { from: "validate", to: "css", label: "validated" },
      ],
    },
  },

  // ==========================================================================
  // 3. Motion
  // ==========================================================================
  {
    id: "motion",
    name: "Motion",
    iconName: "Zap",
    color: "violet",
    status: "stable",
    tagline: "Physics-aware animation orchestration",
    overview:
      "Translates interaction intents into fluid animations through spring dynamics, timeline composition, gesture recognition, and adaptive motion that respects prefers-reduced-motion.",
    purpose:
      "The Motion subsystem provides the animation orchestration layer that all interactive components depend on for transitions, enter/exit animations, layout shifts, and gesture-driven motion. It depends on the Runtime for effect registration and DOM class application, and on the Physics subsystem for spring dynamics and constraint resolution. The Components subsystem consumes Motion's public API (useSpring, useTimeline, useGesture) to animate component state changes. Its contract: accept an animation descriptor (duration, easing, properties, trigger), produce frame-by-frame style updates at 60fps, and clean up all resources when the animation completes or is cancelled.",
    problem:
      "Without the Motion subsystem, developers must manually compose animations using CSS transitions (limited to start/end states), CSS @keyframes (no dynamic parameters), or JavaScript animation libraries. Framer Motion (28KB gzipped) provides React-specific animation primitives but cannot operate framework-agnostically. GSAP (23KB gzipped) is imperative and does not integrate with a token-based design system. Web Animations API (WAAPI) is low-level and lacks spring physics, gesture orchestration, and prefers-reduced-motion adaptation. The Popmotion library (8KB) provides springs but no timeline composition or gesture recognition. The cost of not having Motion is either jarring instant state changes or manually wiring 3-4 separate libraries per project, each with different cancelation semantics and cleanup requirements.",
    internalArchitecture:
      "Motion is decomposed into six modules: GestureRecognizer, SpringSolver, TimelineComposer, AnimationScheduler, ReducedMotionAdapter, and CompositorBridge. GestureRecognizer listens for pointer/touch events and classifies them into gesture types (drag, pinch, swipe, hover) using a threshold-based state machine. SpringSolver implements a damped harmonic oscillator (mass-spring-damper system) configurable via { stiffness, damping, mass }. TimelineComposer sequences multiple animations (springs, keyframes, callbacks) into a directed acyclic graph of animation nodes with dependency edges. AnimationScheduler drives the animation loop using requestAnimationFrame, calling the SpringSolver or keyframe interpolator on each frame and pushing resolved values to the CompositorBridge. ReducedMotionAdapter wraps all animation outputs, replacing them with instant state changes or reduced-duration transitions when prefers-reduced-motion: reduce is active. CompositorBridge converts animation values to CSS transform/opacity properties and applies them via the Runtime's CSSExecutor. Module communication is event-driven: GestureRecognizer emits gesture events consumed by TimelineComposer; AnimationScheduler emits frame events consumed by CompositorBridge.",
    renderingFlow:
      "A motion sequence begins when a trigger fires (mount, unmount, state change, or gesture). The AnimationScheduler registers a requestAnimationFrame callback. On each frame, the scheduler reads the current time (performance.now()), computes the elapsed time since animation start, and passes it to the active animation node. For spring-based animations, the SpringSolver runs N substeps of Verlet integration (default N=4) per frame to maintain numerical stability. The solver outputs { x, v } (position and velocity). For keyframe animations, a cubic Hermite spline interpolates between keyframe values. The CompositorBridge maps resolved values to CSS properties: position → translate3d(), opacity → opacity, scale → scale3d(). These are applied via Element.style.transform and Element.style.opacity — using inline styles rather than classList to avoid triggering layout. This ensures the animation stays on the GPU compositor thread (composite-only property changes) and never triggers layout or paint. When the animation completes (spring velocity < 0.01px/frame or keyframe progress = 1.0), the scheduler cancels the rAF callback and optionally applies the final state as a class via the Runtime.",
    dataFlow:
      "Input: MotionDescriptor { target: Element, properties: AnimationProperties[], easing: EasingConfig, duration?: number, trigger: TriggerType }. The GestureRecognizer produces GestureEvent { type, startPoint, currentPoint, velocity, startTime }. The SpringSolver takes SpringConfig { stiffness: number, damping: number, mass: number, initialVelocity: number } and produces per-frame FrameUpdate { value: number, velocity: number, done: boolean }. TimelineComposer maintains a TimelineGraph { nodes: AnimationNode[], edges: DependencyEdge[] } where each node is either a SpringNode, KeyframeNode, or CallbackNode. The AnimationScheduler stores active animations in a Map<AnimationId, ActiveAnimation> where ActiveAnimation { node: AnimationNode, startTime: number, cancelToken: AbortController }. State lives in the scheduler's active animation map and the compositor bridge's property cache (WeakMap<Element, Map<string, number>>). Output: per-frame style mutations via Element.style.setProperty().",
    algorithms:
      "Spring dynamics use semi-implicit Euler integration with configurable substeps (default 4 per frame) to solve the ODE: a = (-k * x - d * v) / m, where k=stiffness, d=damping, m=mass. This runs in O(1) per spring per substep. Gesture recognition uses a finite state machine with states: idle → pending → active → settled, with transition thresholds (5px movement to enter active, 150ms idle to settle). Swipe detection uses velocity-based classification: if final velocity > 0.5px/ms in any axis, classify as swipe. Timeline scheduling uses a min-heap priority queue keyed by next-wake-time, enabling efficient scheduling of multiple concurrent animations at O(log n) per insert. Keyframe interpolation uses cubic Hermite splines (Catmull-Rom variant) for smooth transitions between keyframes, computed in O(1) per property per frame. The ReducedMotionAdapter checks prefers-reduced-motion once per session via matchMedia and caches the result — O(1) per frame.",
    performance:
      "The Motion subsystem adds 4.2KB gzipped (6.1KB minified). Per-spring frame cost is ~0.02ms (4 substeps of Euler integration on a single property). The scheduler handles 200 concurrent spring animations at 60fps on a mid-range device before dropping frames. Memory per active animation: ~64 bytes (FrameUpdate + configuration). GestureRecognizer adds zero overhead when no gesture listeners are registered (event listeners are attached on-demand). The CompositorBridge uses will-change: transform on animated elements to promote them to their own compositor layer, reducing paint cost to zero during animation. Total frame budget usage for a typical 3-property spring animation: 0.08ms (well within the 16.67ms budget). Compared to Framer Motion's React reconciliation overhead (~0.5ms per animated component), Motion is 6x faster for framework-agnostic use.",
    accessibility:
      "The ReducedMotionAdapter is always active and checks window.matchMedia('(prefers-reduced-motion: reduce)') on initialization and on change events. When reduced motion is preferred, spring animations are replaced with instant state changes (duration: 0ms, no easing), keyframe animations are skipped entirely, and gesture-driven animations (drag, swipe) still function but without momentum/inertia — the element snaps to the nearest valid position. The Motion subsystem never modifies aria-live regions or focus during animation. Enter/exit animations use visibility: hidden on the exit element during the animation to prevent screen readers from announcing transitional states. All motion triggers respect the user's motion preference without requiring developer configuration.",
    browserIntegration:
      "The AnimationScheduler uses requestAnimationFrame for the main animation loop. The CompositorBridge uses Element.style.transform and Element.style.opacity for GPU-composited animations (avoiding layout and paint). The GestureRecognizer uses pointer events (PointerEvent API) for unified mouse/touch/pen input, falling back to separate mouse and touch event listeners in Safari 12. The will-change CSS property is set on animated elements to hint GPU layer promotion; it is removed after animation completion to free GPU memory. The matchMedia API is used for prefers-reduced-motion detection. For browsers without WAAPI (IE11), the scheduler falls back to a setTimeout-based loop at ~60fps with a 16ms interval, accepting potential frame drops. The Motion subsystem does not use Web Animations API because it requires greater control over spring physics than WAAPI's easing model supports.",
    futureRoadmap: [
      "Add View Transitions API integration for cross-document and cross-view animated transitions",
      "Implement animation worklets (CSS Houdini) to offload spring computation to a dedicated worklet thread",
      "Add shared layout animation support with FLIP (First, Last, Invert, Play) technique for list reordering",
      "Support scroll-linked animations via scroll-timeline and view-timeline CSS properties",
      "Add gesture velocity prediction using Kalman filtering for smoother drag-and-drop interactions",
    ],
    diagram: {
      nodes: [
        { id: "gesture", label: "GestureRecognizer", x: 3, y: 15, variant: "primary" },
        { id: "timeline", label: "TimelineComposer", x: 24, y: 15, variant: "default" },
        { id: "spring", label: "SpringSolver", x: 24, y: 60, variant: "default" },
        { id: "scheduler", label: "AnimationScheduler", x: 48, y: 35, variant: "default" },
        { id: "reduced", label: "ReducedMotionAdapter", x: 72, y: 60, variant: "muted" },
        { id: "compositor", label: "CompositorBridge", x: 72, y: 15, variant: "default" },
        { id: "output", label: "GPU Compositor", x: 93, y: 35, variant: "accent" },
      ],
      edges: [
        { from: "gesture", to: "timeline", label: "GestureEvent" },
        { from: "timeline", to: "scheduler", label: "AnimationNode[]" },
        { from: "spring", to: "scheduler", label: "FrameUpdate" },
        { from: "scheduler", to: "reduced", label: "check motion pref" },
        { from: "reduced", to: "compositor", label: "adapted values" },
        { from: "scheduler", to: "compositor", label: "raw values" },
        { from: "compositor", to: "output", label: "transform/opacity" },
        { from: "gesture", to: "spring", label: "velocity seed", style: "dashed" },
      ],
    },
  },

  // ==========================================================================
  // 4. Physics
  // ==========================================================================
  {
    id: "physics",
    name: "Physics",
    iconName: "Atom",
    color: "rose",
    status: "stable",
    tagline: "Verlet integration dynamics engine",
    overview:
      "Provides realistic motion models — spring dynamics, gravity, collision detection, and constraint systems — using Verlet integration for numerical stability at 60fps.",
    purpose:
      "The Physics subsystem provides the numerical simulation backbone for physically-based UI interactions. It is depended on by the Motion subsystem (which uses its spring solver for physics-aware animations), the VFX subsystem (which uses its particle physics for particle systems), and directly by developers building physics-driven UIs (draggable panels with inertia, pull-to-refresh with spring return, gravity-based sorting). It depends on nothing — it is a pure mathematical engine with no DOM or browser API dependencies. Its contract: accept a PhysicsWorld state and a timestep, advance the simulation by that timestep, and return the updated state.",
    problem:
      "Without the Physics subsystem, developers must either implement physics from scratch (requiring knowledge of numerical integration, constraint solving, and collision detection) or use game physics engines like Matter.js (35KB gzipped, designed for 2D games with gravity and rigid body dynamics) or Cannon.js (40KB, designed for 3D WebGL scenes). These engines are massively over-engineered for UI physics: they include features like angular momentum, friction models, and broad-phase collision detection optimized for hundreds of objects — none of which are needed for a UI spring or a gravity-based card shuffle. The cost of not having a UI-specific physics engine is either broken physics (springs that oscillate forever, velocities that diverge) or a 35KB dependency for what should be a 2KB solution.",
    internalArchitecture:
      "Physics is decomposed into six modules: VerletIntegrator, SpringSystem, GravityField, CollisionDetector, ConstraintSolver, and RenderBridge. VerletIntegrator stores particle state as { position: Vec2, oldPosition: Vec2, acceleration: Vec2, mass: number, pinned: boolean }[]. Velocity is implicit: velocity = position - oldPosition. SpringSystem maintains a list of Spring { a: Particle, b: Particle, restLength: number, stiffness: number, damping: number } and applies Hooke's law forces each step. GravityField applies a constant downward acceleration vector (configurable direction and magnitude). CollisionDetector implements circle-circle and circle-boundary collision tests with elastic collision response. ConstraintSolver enforces distance constraints using Jakobsen's iterative relaxation method (default 8 iterations). RenderBridge is a thin adapter that converts particle positions to CSS transform values. Module communication is pull-based: the VerletIntegrator is the central coordinator, calling SpringSystem.applyForces(), GravityField.applyForces(), then integrating, then CollisionDetector.detect(), then ConstraintSolver.solve() in sequence each step.",
    renderingFlow:
      "The Physics subsystem does not render directly. The RenderBridge is called by the AnimationScheduler (from the Motion subsystem) on each rAF frame. The flow is: rAF fires → AnimationScheduler calls PhysicsWorld.step(dt) → VerletIntegrator runs one integration step → RenderBridge reads updated particle positions → converts to translate3d(x, y, 0) → applies via Element.style.transform. Because the Physics subsystem outputs absolute positions (not deltas), the RenderBridge sets the full transform each frame. This ensures GPU compositing (transform is a composite-only property) and avoids layout triggers. For particle systems, the RenderBridge batches all particle position updates into a single style recalculation using a DocumentFragment or requestAnimationFrame batch.",
    dataFlow:
      "Input: PhysicsWorldConfig { particles: ParticleConfig[], springs: SpringConfig[], gravity: Vec2, bounds: Rect, constraints: ConstraintConfig[] }. Internal state: PhysicsWorld { particles: Particle[], springs: Spring[], constraints: Constraint[] }. Each timestep: (1) clear all accelerations, (2) SpringSystem computes spring forces and adds to particle.acceleration, (3) GravityField adds gravity to all non-pinned particles, (4) VerletIntegrator computes new positions: newPos = 2*pos - oldPos + acc*dt*dt, (5) CollisionDetector checks all particle pairs (O(n²) brute force, spatial hash for n>50), (6) ConstraintSolver iterates 8 times over all constraints, adjusting positions to satisfy distance constraints. Output: updated Particle[].position for each particle. State lives entirely in the PhysicsWorld object — no external state references.",
    algorithms:
      "Verlet integration: newPos = 2*pos - oldPos + acc*dt². O(n) per step, where n is particle count. Implicit velocity: v = (pos - oldPos) / dt. Spring forces: F = -k * (|dx| - rest) * normalize(dx) - d * v, where k=stiffness, d=damping, dx=displacement vector. O(m) per step where m is spring count. Collision detection: circle-circle uses distance check (dx² + dy² < r1² + r2²), O(n²) brute force, O(n) average with spatial hashing (grid cell size = max collision radius). Collision response: elastic collision with conservation of momentum, O(1) per collision pair. Constraint solving: Jakobsen's relaxation — for each constraint, compute error = distance - restLength, move both particles by error/2 along the constraint axis. O(c * k) where c is constraint count and k is iteration count (default 8). Spatial hashing uses a grid with cell size 2*maxRadius, achieving O(n) average-case collision detection.",
    performance:
      "The Physics subsystem adds 2.1KB gzipped. A simulation with 100 particles, 50 springs, and boundary collision runs at 0.04ms per step on a mid-range device. With spatial hashing enabled, collision detection for 500 particles costs 0.12ms per step. Memory per particle: 32 bytes (2 Vec2 for position/oldPosition + 1 Vec2 for acceleration + mass + pinned flag). Memory per spring: 24 bytes (2 particle refs + restLength + stiffness + damping). The engine maintains 60fps with up to 300 particles and 150 springs before frame drops begin. Verlet integration is preferred over Euler or RK4 for UI physics because it requires storing only one additional position vector (no explicit velocity), reducing memory by 8 bytes per particle, and is inherently more stable for stiff springs (stiffness > 500).",
    accessibility:
      "The Physics subsystem does not directly interact with accessibility APIs because it operates on numerical state, not DOM. However, the RenderBridge (when called by Motion's ReducedMotionAdapter) can disable physics simulation entirely when prefers-reduced-motion: reduce is active, replacing animated physics with instant state transitions. Developers can also set PhysicsWorld.paused = true to freeze the simulation and manually set final positions. The subsystem never modifies focus, ARIA attributes, or screen reader announcements. Physics-driven UIs should provide keyboard-accessible alternatives (e.g., arrow keys to move a draggable element) as a separate concern handled by the Components layer.",
    browserIntegration:
      "The Physics subsystem has zero browser API dependencies. It is a pure TypeScript module operating on arrays of numbers. The RenderBridge adapter uses Element.style.transform to output positions. For the Motion subsystem integration, the AnimationScheduler provides the rAF loop and timing. The Physics subsystem can also run in a Web Worker for heavy simulations (500+ particles) using transferable ArrayBuffers for particle position data, reducing main-thread overhead to a single postMessage per frame. No fallbacks are needed because the subsystem uses only standard JavaScript math operations (Math.sqrt, Math.atan2, Math.sin, Math.cos).",
    futureRoadmap: [
      "Add 3D physics support with Vec3 particles and plane/sphere collision detection for 3D transform-based UIs",
      "Implement ragdoll physics for multi-joint component animations (accordion, collapsible panels with physical inertia)",
      "Add physics-based layout engine that resolves flexbox/grid layouts using constraint satisfaction instead of CSS algorithms",
      "Support soft-body physics using pressure-based simulation for deformable UI elements (elastic cards, jelly buttons)",
      "Add physics recording and playback API for deterministic replay of physics interactions in tests and demos",
    ],
    diagram: {
      nodes: [
        { id: "config", label: "World Config", x: 3, y: 10, variant: "primary" },
        { id: "particles", label: "Particles", x: 20, y: 10, variant: "default" },
        { id: "springs", label: "SpringSystem", x: 20, y: 50, variant: "default" },
        { id: "gravity", label: "GravityField", x: 20, y: 80, variant: "muted" },
        { id: "verlet", label: "VerletIntegrator", x: 48, y: 35, variant: "default" },
        { id: "collision", label: "CollisionDetector", x: 72, y: 10, variant: "default" },
        { id: "constraints", label: "ConstraintSolver", x: 72, y: 55, variant: "default" },
        { id: "render", label: "RenderBridge", x: 92, y: 35, variant: "accent" },
      ],
      edges: [
        { from: "config", to: "particles", label: "init" },
        { from: "config", to: "springs", label: "spring defs" },
        { from: "config", to: "gravity", label: "gravity vec" },
        { from: "particles", to: "verlet", label: "positions" },
        { from: "springs", to: "verlet", label: "forces" },
        { from: "gravity", to: "verlet", label: "acceleration" },
        { from: "verlet", to: "collision", label: "new positions" },
        { from: "verlet", to: "constraints", label: "new positions" },
        { from: "collision", to: "render", label: "resolved pos" },
        { from: "constraints", to: "render", label: "satisfied pos" },
      ],
    },
  },

  // ==========================================================================
  // 5. VFX
  // ==========================================================================
  {
    id: "vfx",
    name: "VFX",
    iconName: "Sparkles",
    color: "pink",
    status: "stable",
    tagline: "GPU-accelerated visual effects pipeline",
    overview:
      "Visual effects engine producing glass morphism, atmospheric blur, distortion fields, particle systems, and shader-driven effects using CSS Paint API and Houdini worklets.",
    purpose:
      "The VFX subsystem provides the visual effects layer that transforms standard UI components into visually rich, branded experiences. It is depended on by the Components subsystem (which applies VFX presets like glass, glow, gradient-mesh to component surfaces), the Studio (which provides a VFX editor panel), and directly by developers for custom effects. It depends on the Physics subsystem for particle dynamics, the Motion subsystem for effect transitions, and the Tokens subsystem for theme-aware effect parameters. Its contract: accept an effect descriptor (type, parameters, target element), produce the visual output using the most efficient browser API available (CSS Paint API > canvas > CSS filters), and clean up GPU resources when the effect is removed.",
    problem:
      "Without the VFX subsystem, developers must manually compose visual effects using a combination of CSS backdrop-filter (limited to blur/brightness/contrast, no custom effects), CSS filters (no per-pixel control), SVG filters (verbose, hard to parameterize, poor performance on mobile), or WebGL shaders (massive complexity, requires a rendering pipeline). Libraries like Three.js (150KB+) are designed for 3D scenes, not UI effects. PixiJS (25KB) is 2D-canvas-based and cannot integrate with DOM layout. GSAP's SplitText and MorphSVG plugins handle text effects but not glass morphism or particle systems. The cost of not having VFX is either flat, unbranded UIs or 50-150KB of dependencies for each effect category, with no unified API or theme integration.",
    internalArchitecture:
      "VFX is decomposed into six modules: EffectComposer, PaintWorkletManager, ParticleSystem, ShaderCompiler, LayerStack, and HoudiniBridge. EffectComposer is the top-level orchestrator that accepts EffectDescriptor objects and routes them to the appropriate renderer. PaintWorkletManager registers CSS Paint Worklets (Houdini) for custom paint effects (gradient meshes, noise patterns, custom borders). ParticleSystem manages particle pools, using the Physics subsystem for dynamics and a pooled Float32Array for position/velocity/color data. ShaderCompiler transpiles a GLSL-like DSL into CSS Paint Worklet JavaScript or WebGL fragment shaders, depending on browser support. LayerStack manages the compositing order of multiple effects on a single element (e.g., glass morphism + glow + grain). HoudiniBridge is the abstraction layer that detects CSS Paint API support and falls back to <canvas> rendering when unavailable. Module communication uses a shared EffectContext object passed through the render chain, containing the target element, resolved parameters, and a cleanup function.",
    renderingFlow:
      "Effect rendering depends on the effect type and browser capability. For Houdini-supported browsers: (1) EffectComposer resolves effect parameters via Tokens, (2) PaintWorkletManager ensures the required worklet is registered (one-time paintWorklet.addModule() call), (3) the element's background-image is set to paint(effect-name, ...params), (4) the browser invokes the worklet's paint() method during the paint phase, executing the effect code on a dedicated paint thread. For non-Houdini browsers: (1) EffectComposer creates an offscreen <canvas> element, (2) the effect is rendered to the canvas context using Canvas2D API, (3) the canvas is converted to a data URL and set as the element's background-image. For GPU-heavy effects (particle systems, distortion fields): (1) a <canvas> with WebGL context is created and positioned behind/over the target element using CSS position: absolute, (2) particle positions from Physics are uploaded as a Float32Array to a WebGL buffer, (3) a fragment shader renders the particles, (4) the canvas composits with the DOM element via CSS mix-blend-mode.",
    dataFlow:
      "Input: EffectDescriptor { type: EffectType, target: Element, params: Record<string, number | string | Color>, transition?: TransitionConfig }. The EffectComposer resolves params against the Tokens subsystem, replacing token references with actual values. For paint worklets: resolved params are serialized and passed as CSS custom property arguments to paint(effect-name, var(--param1), var(--param2)). The worklet reads these via ctx.style.getPropertyValue(). For canvas fallback: params are passed directly to the canvas rendering function. For particle systems: the ParticleSystem receives particle configs (count, emitter shape, lifetime, color gradient), initializes a Float32Array pool, and on each frame receives updated positions from the Physics subsystem. Output: for worklet effects — a paint() invocation; for canvas effects — a background-image data URL; for WebGL effects — a composited <canvas> element.",
    algorithms:
      "Glass morphism uses layered backdrop-filter: blur(20px) saturate(180%) brightness(105%) with a semi-transparent background gradient, rendered entirely in CSS (no JS per-frame cost). Particle rendering uses instanced drawing on WebGL: all particles share one quad geometry, with per-particle data (position, size, color, opacity) stored in a Float32Array and uploaded as instanced attributes — O(n) draw calls become O(1). Noise generation for grain/distortion effects uses a permutation-table-based Perlin noise algorithm, O(1) per pixel lookup. Gradient mesh effects use barycentric interpolation across a triangulated control point grid — O(f²) where f is the number of control points per axis (typically 3-5, so O(9-25)). The LayerStack composites multiple effects using CSS isolation: createIsolated() to form a new stacking context, then apply each effect as a CSS property in order.",
    performance:
      "The VFX subsystem core is 3.8KB gzipped (paint worklet scripts are loaded on-demand, averaging 0.5-2KB each). Glass morphism has zero per-frame JS cost — it is entirely CSS. Particle systems render 1,000 particles at 0.3ms per frame using WebGL instanced drawing. Canvas fallback for paint effects costs 0.5-2ms per frame depending on effect complexity and canvas size. GPU memory: a 1920×1080 glass morphism effect uses ~8MB of GPU memory for the backdrop buffer; a 1,000-particle system uses ~32KB for position/velocity data. Effects are lazy-initialized: no GPU resources are allocated until an effect is first applied. Cleanup is explicit: removing an effect calls revokeObjectURL() for canvas-based effects and disconnects WebGL contexts. The VFX subsystem degrades gracefully: if WebGL is unavailable, particles fall back to absolutely-positioned DOM elements with CSS transforms (supporting up to ~100 particles at 60fps).",
    accessibility:
      "The VFX subsystem respects prefers-reduced-motion by replacing animated effects (particle systems, distortion fields, animated gradients) with static equivalents (static gradient, solid background). Glass morphism is preserved in reduced-motion mode because it is a static visual treatment, not an animation. All VFX elements are decorative and marked with aria-hidden=\"true\" on generated wrapper elements. The subsystem never adds focusable elements or modifies the tab order. For effects that overlay content (blur overlays, distortion fields), a transparent pointer-events: none is set on the effect layer, ensuring keyboard and screen reader access to underlying interactive elements. High-contrast mode (prefers-contrast: high) automatically disables transparency and glass effects, replacing them with solid, high-contrast backgrounds.",
    browserIntegration:
      "Primary rendering path: CSS Paint API (paintWorklet.addModule()) available in Chrome 65+, Edge 79+, Opera 52+. Fallback: Canvas 2D API (available in all browsers). WebGL fallback: WebGLRenderingContext for particle systems (Chrome 9+, Firefox 4+, Safari 5.1+). The HoudiniBridge detects support via 'paintWorklet' in CSS and falls back within 5ms. backdrop-filter is used for glass morphism with -webkit-backdrop-filter prefix for Safari 9-14. WebGL2 is preferred when available for instanced drawing (O(1) draw calls); WebGL1 fallback uses individual draw calls (O(n)). The ShaderCompiler outputs different code paths: GLSL 300 ES for WebGL2, GLSL 100 ES for WebGL1, and Canvas2D drawing commands for no-WebGL fallback. All effects use will-change: filter on elements with backdrop-filter to promote GPU layer creation.",
    futureRoadmap: [
      "Add CSS @property support for animatable gradient mesh control points with smooth interpolation",
      "Implement WebGPU compute shader backend for particle systems, enabling 10,000+ particles at 60fps",
      "Add SVG filter graph support for composable, chained filter effects with per-node parameter control",
      "Support CSS Anchor Positioning API for effects that anchor to positioned elements without JavaScript layout",
      "Add effect recording and export as CSS-only snippets (no JS runtime) for static effect use cases",
    ],
    diagram: {
      nodes: [
        { id: "descriptor", label: "EffectDescriptor", x: 3, y: 25, variant: "primary" },
        { id: "composer", label: "EffectComposer", x: 22, y: 25, variant: "default" },
        { id: "worklet", label: "PaintWorkletMgr", x: 44, y: 5, variant: "default" },
        { id: "particle", label: "ParticleSystem", x: 44, y: 35, variant: "default" },
        { id: "shader", label: "ShaderCompiler", x: 44, y: 65, variant: "default" },
        { id: "layer", label: "LayerStack", x: 68, y: 25, variant: "default" },
        { id: "houdini", label: "HoudiniBridge", x: 68, y: 65, variant: "muted" },
        { id: "gpu", label: "GPU Output", x: 90, y: 25, variant: "accent" },
        { id: "canvas", label: "Canvas Fallback", x: 90, y: 65, variant: "muted" },
      ],
      edges: [
        { from: "descriptor", to: "composer", label: "effect config" },
        { from: "composer", to: "worklet", label: "paint effect" },
        { from: "composer", to: "particle", label: "particle config" },
        { from: "composer", to: "shader", label: "shader DSL" },
        { from: "worklet", to: "layer", label: "paint output" },
        { from: "particle", to: "layer", label: "positions" },
        { from: "shader", to: "houdini", label: "compiled shader" },
        { from: "layer", to: "gpu", label: "composite" },
        { from: "houdini", to: "canvas", label: "no Houdini" },
        { from: "houdini", to: "gpu", label: "Houdini OK", style: "dashed" },
      ],
    },
  },

  // ==========================================================================
  // 6. Components
  // ==========================================================================
  {
    id: "components",
    name: "Components",
    iconName: "Blocks",
    color: "blue",
    status: "stable",
    tagline: "16 accessible semantic UI primitives",
    overview:
      "Production-ready UI components with built-in accessibility, theme awareness, motion integration, and framework adapters for React, Vue, Svelte, Angular, and vanilla HTML.",
    purpose:
      "The Components subsystem provides the user-facing UI primitive layer that developers directly import and use. It depends on the Runtime (for DOM class application), the Tokens subsystem (for theme-aware styling), the Motion subsystem (for built-in animation presets), and the VFX subsystem (for visual effect presets). The Studio and Marketplace subsystems depend on Components for their own UI and for cataloging available components. Its contract: each component exports a consistent API (props/config object) across all framework adapters, renders semantic HTML with built-in ARIA, and integrates with the Ferrum token system for automatic theme application.",
    problem:
      "Without the Components subsystem, developers must build UI primitives from scratch or use third-party component libraries that don't integrate with Ferrum's token system. Radix UI (React-only, no Vue/Svelte adapters) provides accessible primitives but requires manual styling. Headless UI (React/Vue, no Svelte/Angular) offers unstyled components but lacks motion integration. Shadcn/ui (React-only) copies components into the project, creating maintenance burden. Chakra UI (React-only, 42KB runtime) has its own token system that conflicts with Ferrum's. The cost of not having Components is either inaccessible, unstyled HTML elements or a fragmented component ecosystem where each library uses different APIs, styling approaches, and accessibility patterns.",
    internalArchitecture:
      "Components is structured around a ComponentFactory pattern with five supporting modules: ComponentFactory, A11yManager, ThemeAdapter, MotionBridge, and FrameworkAdapter. ComponentFactory is a registry of 16 component definitions (Button, Input, Select, Dialog, Toast, Tooltip, Tabs, Accordion, Dropdown, Checkbox, Radio, Switch, Slider, Modal, Drawer, Popover), each defined as a schema: { tagName, defaultClasses, slots, a11yConfig, motionConfig, vfxConfig }. A11yManager handles ARIA attribute management, keyboard interaction patterns (roving tabindex, arrow key navigation, Escape to close), and focus trapping for modals/drawers. ThemeAdapter maps component variants (primary, secondary, ghost, destructive) to token-based CSS classes. MotionBridge applies enter/exit animations and interaction feedback (hover scale, press scale) using the Motion subsystem. FrameworkAdapter is an abstract interface with concrete implementations for React (React.forwardRef + Context), Vue (defineComponent + provide/inject), Svelte (svelte:component + context), Angular (Directive + Injectable), and vanilla HTML (Custom Elements + data attributes). Each adapter translates the component schema into the framework's native component model.",
    renderingFlow:
      "Component rendering follows the framework's lifecycle. For React: (1) ComponentFactory.create('Button', props) returns a React element, (2) React renders the element to the DOM during the commit phase, (3) useEffect registers the element with the Runtime's EffectRegistry, (4) ThemeAdapter resolves variant classes and applies them via the Runtime, (5) MotionBridge registers enter animation via the Motion subsystem, (6) A11yManager attaches keyboard listeners and sets ARIA attributes. For Custom Elements (vanilla HTML): (1) customElements.define('f-button', FerrumButton), (2) connectedCallback triggers Runtime registration, (3) attributeChangedCallback handles prop updates and re-resolves tokens, (4) disconnectedCallback cleans up Runtime effects and Motion animations. In all frameworks, the component renders a single semantic HTML element (e.g., <button>, <dialog>, <input>) with Ferrum classes applied via the Runtime — never inline styles for static properties.",
    dataFlow:
      "Input: ComponentProps { variant?: string, size?: string, disabled?: boolean, children?: ReactNode, ...componentSpecificProps }. The ComponentFactory looks up the component schema by name, then passes props through: (1) A11yManager computes ARIA attributes: role, aria-expanded, aria-selected, aria-controls, aria-labelledby based on component type and state. (2) ThemeAdapter maps variant+size to CSS classes: e.g., variant='primary' → 'bg-primary text-primary-foreground hover:bg-primary/90', size='lg' → 'h-12 px-6 text-lg'. (3) MotionBridge determines animation classes: mount → 'animate-in fade-in', unmount → 'animate-out fade-out'. All resolved classes are merged into a single Set<string> and passed to the Runtime's CSSExecutor for batch application. State lives in the framework's state management (React useState, Vue ref, Svelte stores) for interactive state (open/close, selected value) and in the Runtime's StyleCache for resolved CSS classes.",
    algorithms:
      "Roving tabindex for keyboard navigation uses a circular array index: on ArrowDown, increment index mod itemCount; on ArrowUp, decrement. O(1) per keystroke. Focus trapping in modals uses a Tab key interceptor that cycles focus through a cached list of focusable elements (querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex=\"-1\")')). O(n) to build the list on open, O(1) per Tab keystroke. Toast notification stacking uses a max-heap priority queue ordered by timestamp, with auto-dismiss timers managed via setTimeout — O(log n) insert, O(1) extract-max. Component variant resolution uses a two-level lookup table: variant → baseClasses, then baseClasses merged with size modifier classes — O(1) per component. The FrameworkAdapter uses a visitor pattern to traverse the component schema and generate framework-specific code, O(schema_size) per component.",
    performance:
      "The Components subsystem adds 6.5KB gzipped for all 16 components (tree-shakeable to ~0.4KB per component). Each mounted component consumes ~200 bytes of memory (WeakMap entry in StyleCache + ARIA state + motion config). First render of a Button component (including Runtime registration, token resolution, and class application) takes 0.15ms. A complex component like Dialog (with focus trap, backdrop, animation) adds 1.2ms to initial render. The Components subsystem adds zero per-frame cost for static components; animated components (Drawer, Toast) delegate to the Motion subsystem at 0.08ms per frame. All 16 components rendered simultaneously consume ~3.2KB of additional memory. Framework adapter overhead: React adapter adds ~0.05ms per component mount vs. raw HTML (due to React reconciliation); Custom Elements adapter adds ~0.1ms due to connectedCallback overhead.",
    accessibility:
      "Every component is built against the WAI-ARIA Authoring Practices Guide (APG) patterns. Button uses native <button> element with type='button' default. Dialog uses <dialog> element (Chrome 37+, Firefox 98+, Safari 15.4+) with fallback to role='dialog' and aria-modal='true'. Focus trapping is implemented via a FocusTrapController that intercepts Tab and Shift+Tab. Select implements the combobox pattern (ARIA 1.2) with aria-expanded, aria-controls, aria-activedescendant. Tabs use roving tabindex with arrow key navigation. Accordion uses the disclosure pattern with aria-expanded on each trigger. All components support keyboard operation exclusively — no mouse-required interactions. Toast uses role='status' and aria-live='polite' for screen reader announcements. Color contrast for all text-on-background combinations meets WCAG AA (4.5:1 normal, 3:1 large). Focus indicators use a 2px outline-offset ring visible in all color schemes.",
    browserIntegration:
      "Components use semantic HTML elements as their foundation: <button>, <input>, <select>, <dialog>, <details>, <nav>, <ul>/<li>. The <dialog> element's .showModal() and .close() APIs are used for modals, with a fallback to a div+role=dialog+inert attribute in Firefox <98 and Safari <15.4. The :focus-visible pseudo-class is used for keyboard focus indicators (Chrome 86+, Firefox 85+, Safari 15.4+) with a :focus fallback for older browsers. Custom Elements use the standard customElements.define() API (Chrome 54+, Firefox 63+, Safari 10.1+). The popover API (Chrome 114+, Safari 17+) is used for Tooltip and Dropdown positioning, with a fallback to absolute positioning via Floating UI logic. All event listeners use the passive option for scroll and touch events to avoid blocking the main thread.",
    futureRoadmap: [
      "Add 8 more components: DataTable, Calendar, DatePicker, Command Palette, Sidebar, Breadcrumb, Pagination, Avatar Group",
      "Implement React Server Component variants that render to static HTML with progressive enhancement for interactivity",
      "Add form validation integration with constraint validation API and custom error message rendering",
      "Support the CSS @scope rule for component-scoped styles without Shadow DOM isolation overhead",
      "Add built-in dark/light mode toggle component with system preference detection and manual override",
    ],
    diagram: {
      nodes: [
        { id: "schema", label: "Component Schema", x: 3, y: 30, variant: "primary" },
        { id: "factory", label: "ComponentFactory", x: 22, y: 30, variant: "default" },
        { id: "a11y", label: "A11yManager", x: 44, y: 5, variant: "default" },
        { id: "theme", label: "ThemeAdapter", x: 44, y: 30, variant: "default" },
        { id: "motion", label: "MotionBridge", x: 44, y: 55, variant: "default" },
        { id: "adapter", label: "FrameworkAdapter", x: 68, y: 30, variant: "default" },
        { id: "react", label: "React/Vue/Svelte", x: 88, y: 10, variant: "muted" },
        { id: "angular", label: "Angular", x: 88, y: 35, variant: "muted" },
        { id: "html", label: "Custom Elements", x: 88, y: 60, variant: "muted" },
        { id: "output", label: "DOM + ARIA", x: 94, y: 85, variant: "accent" },
      ],
      edges: [
        { from: "schema", to: "factory", label: "16 definitions" },
        { from: "factory", to: "a11y", label: "a11y config" },
        { from: "factory", to: "theme", label: "variant+size" },
        { from: "factory", to: "motion", label: "motion config" },
        { from: "a11y", to: "adapter", label: "ARIA attrs" },
        { from: "theme", to: "adapter", label: "CSS classes" },
        { from: "motion", to: "adapter", label: "animations" },
        { from: "adapter", to: "react", label: "React adapter" },
        { from: "adapter", to: "angular", label: "Angular adapter" },
        { from: "adapter", to: "html", label: "CE adapter" },
        { from: "react", to: "output", style: "dashed" },
        { from: "angular", to: "output", style: "dashed" },
        { from: "html", to: "output", style: "dashed" },
      ],
    },
  },

  // ==========================================================================
  // 7. Tokens
  // ==========================================================================
  {
    id: "tokens",
    name: "Tokens",
    iconName: "Palette",
    color: "amber",
    status: "stable",
    tagline: "Design decisions as structured data",
    overview:
      "Three-tier token system (Primitive → Semantic → Component) that transforms brand values into 16 semantic color scales, spacing scales, type scales, and shadow scales outputable as CSS, Tailwind, SCSS, JSON, or TypeScript.",
    purpose:
      "The Tokens subsystem is the single source of truth for all visual design decisions in the Ferrum platform. It is depended on by every other subsystem: the Runtime resolves tokens at runtime, the Compiler inlines tokens at build time, Components uses component-level tokens for variant styling, VFX uses tokens for effect parameters, and Studio displays token values in its inspector. The Tokens subsystem depends on nothing — it is a pure data layer. Its contract: accept a brand configuration (colors, spacing, typography), produce a structured token map with three tiers, and export it in multiple output formats.",
    problem:
      "Without the Tokens subsystem, design values are scattered across CSS custom properties, Tailwind config files, JavaScript constants, and component prop defaults — with no single source of truth. Style Dictionary (from Amazon, 85KB) provides token management but requires extensive plugin configuration and does not natively support the Primitive → Semantic → Component three-tier model. Tailwind's theme configuration is one-tier (directly maps to utility classes) and does not separate brand primitives from semantic meanings. Open Color and Radix Colors provide color palettes but not spacing, typography, or shadow tokens. The cost of not having Tokens is inconsistent design values across components, no systematic way to generate dark mode or high-contrast themes, and manual effort to maintain multiple format outputs (CSS variables, Tailwind config, SCSS variables).",
    internalArchitecture:
      "Tokens is decomposed into five modules: PrimitiveTokens, SemanticResolver, ComponentMapper, FormatGenerator, and ThemeProvider. PrimitiveTokens stores raw design values: colors (as hex/hsl/oklch), spacing (as px/rem multiples of a 4px base), typography (font-family, font-size, line-height, font-weight, letter-spacing), shadows (box-shadow values), and border-radii. SemanticResolver maps primitives to semantic names using a ThemeConfig: e.g., color.primary → PrimitiveTokens.colors.emerald.600, spacing.4 → PrimitiveTokens.spacing[4 * 4]px. ComponentMapper creates component-specific tokens that reference semantic tokens: e.g., button.primary.background → semantic.color.primary, button.primary.padding → semantic.spacing[2]. FormatGenerator traverses the resolved token tree and serializes to CSS custom properties (:root { --color-primary: ... }), Tailwind theme extension (module.exports = { theme: { extend: { colors: { primary: ... } } } }), SCSS variables ($color-primary: ...), JSON, or TypeScript constants. ThemeProvider is a runtime adapter that injects CSS custom properties into the document and listens for theme changes. Communication is purely functional: PrimitiveTokens → SemanticResolver → ComponentMapper → FormatGenerator, with ThemeProvider as a side-effectful output.",
    renderingFlow:
      "Tokens do not render visually. However, the ThemeProvider's output flow is: (1) on initialization, ThemeProvider resolves the current theme (light/dark/system) and all token values, (2) it generates a CSS string of custom properties (:root { --ferrum-color-primary: oklch(0.7 0.15 160); ... }), (3) this CSS is injected via a <style> tag or document.adoptedStyleSheets, (4) the browser processes the custom properties during the cascade resolution phase of style computation. When the theme changes (e.g., user toggles dark mode), ThemeProvider re-resolves all semantic tokens against the new theme's primitive mapping and updates the CSS custom properties. This triggers a style recalculation for all elements using var(--ferrum-*) references, but because custom properties are resolved during cascade (not layout), the performance impact is minimal. In the Compiler path, tokens are inlined at build time — no CSS custom properties are emitted, reducing runtime overhead to zero.",
    dataFlow:
      "Input: ThemeConfig { colors: { primary, secondary, accent, ... }, spacing: { base: 4 }, typography: { fontFamilies, fontSizes, lineHeights, ... }, shadows: { sm, md, lg, ... }, borderRadius: { sm, md, lg, ... } }. The PrimitiveTokens layer stores these raw values as a flat Record<string, string | number>. The SemanticResolver creates a second layer: Record<string, TokenReference> where each value is a reference to a primitive (e.g., { value: '{colors.emerald.600}', type: 'color' }). The ComponentMapper creates a third layer: Record<string, TokenReference> referencing semantic tokens. The resolved token tree is a nested object: { primitive: PrimitiveTokens, semantic: SemanticTokens, component: ComponentTokens }. FormatGenerator receives this tree and a target format, traversing it with a recursive visitor pattern. Output: format-specific string (CSS, Tailwind, SCSS, JSON, TypeScript). The ThemeProvider caches the resolved CSS string and only regenerates on theme change.",
    algorithms:
      "Token resolution uses a three-level pointer chase: component token → semantic token → primitive value. Each level is a hash map lookup, O(1) per token. Theme switching requires re-resolving all semantic tokens against the new theme's primitive mapping — O(n) where n is the number of semantic tokens (typically ~200). CSS custom property generation traverses the resolved tree in DFS order — O(n). Format generation uses a visitor pattern with format-specific visitors, each implementing visitColor(), visitSpacing(), visitTypography() methods — O(n) per format. Color space conversion (oklch → sRGB) uses the CSS Color Level 4 specification's conversion matrices, computed in O(1) per color. The ThemeProvider uses a Proxy object to intercept token access and trigger lazy resolution — unresolved tokens are computed on first access and cached.",
    performance:
      "The Tokens subsystem is 1.4KB gzipped. A full theme with 200 semantic tokens and 50 component tokens generates a CSS custom property block of ~4KB. Theme switching (re-resolving all tokens + updating the <style> tag) takes 0.3ms. The FormatGenerator produces all 5 output formats in 2ms total for a standard theme. Memory: the token tree for a standard theme occupies ~15KB (nested objects with string keys and string/number values). Runtime token resolution via CSS var() has zero JS overhead — the browser resolves custom properties natively during cascade. Build-time token inlining (Compiler path) adds ~1ms to compilation for a standard project. The ThemeProvider's CSS injection uses document.adoptedStyleSheets (Chrome 73+, Firefox 101+, Safari 16.4+) which is faster than <style> tag insertion by ~0.1ms per injection.",
    accessibility:
      "The Tokens subsystem enforces WCAG AA contrast ratios at the token definition level. The SemanticResolver validates that every text-on-background color pair meets the 4.5:1 contrast requirement (3:1 for large text ≥18pt or 14pt bold) using the APCA (Advanced Perceptual Contrast Algorithm) or the WCAG 2.1 relative luminance formula. If a contrast pair fails validation, a warning is logged during theme generation with the actual contrast ratio and the required minimum. The Tokens subsystem provides a built-in high-contrast theme that overrides semantic color tokens with high-contrast equivalents (e.g., primary text on background achieves 7:1+ contrast). Dark mode tokens are validated independently — a color that passes AA in light mode may fail in dark mode, so both themes are validated. Color blindness simulation is available as a FormatGenerator option that outputs deuteranopia, protanopia, and tritanopia-safe token variants.",
    browserIntegration:
      "CSS custom properties (var()) are used for runtime theming — supported in all modern browsers (Chrome 49+, Firefox 31+, Safari 9.1+). The oklch() color function (used for perceptually uniform color spaces) is supported in Chrome 111+, Firefox 113+, Safari 15.4+ with a fallback to hsl() for older browsers generated by the FormatGenerator. document.adoptedStyleSheets is used for theme injection when available, falling back to a <style> tag in the document head. The matchMedia API detects prefers-color-scheme, prefers-contrast, and forced-colors (Windows High Contrast Mode). Under forced-colors, the Tokens subsystem's CSS custom properties are overridden by the browser's high-contrast palette, and the FormatGenerator outputs a forced-colors stylesheet that uses Canvas/CSS system colors. The @media (prefers-color-scheme: dark) query wraps dark mode token overrides.",
    futureRoadmap: [
      "Add OKLCH-based color interpolation for smooth, perceptually uniform theme transitions using CSS @property",
      "Implement Design Token Community Group (DTCG) format export for interoperability with Figma and other design tools",
      "Add automatic dark mode token generation using luminance-preserving color mapping algorithms",
      "Support container query tokens that resolve differently based on container size for responsive component theming",
      "Add token versioning and migration system that tracks token renames and generates codemod scripts",
    ],
    diagram: {
      nodes: [
        { id: "brand", label: "Brand Config", x: 3, y: 30, variant: "primary" },
        { id: "primitive", label: "PrimitiveTokens", x: 22, y: 10, variant: "default" },
        { id: "semantic", label: "SemanticResolver", x: 46, y: 10, variant: "default" },
        { id: "component", label: "ComponentMapper", x: 70, y: 10, variant: "default" },
        { id: "format", label: "FormatGenerator", x: 46, y: 55, variant: "default" },
        { id: "theme", label: "ThemeProvider", x: 70, y: 55, variant: "default" },
        { id: "css", label: "CSS / Tailwind / SCSS", x: 88, y: 35, variant: "accent" },
        { id: "json", label: "JSON / TypeScript", x: 88, y: 70, variant: "muted" },
      ],
      edges: [
        { from: "brand", to: "primitive", label: "raw values" },
        { from: "primitive", to: "semantic", label: "map semantics" },
        { from: "semantic", to: "component", label: "map components" },
        { from: "primitive", to: "format", label: "flat tokens" },
        { from: "semantic", to: "format", label: "resolved tokens" },
        { from: "component", to: "format", label: "component tokens" },
        { from: "format", to: "css", label: "serialize" },
        { from: "format", to: "json", label: "serialize" },
        { from: "format", to: "theme", label: "CSS vars" },
        { from: "theme", to: "css", label: "inject", style: "dashed" },
      ],
    },
  },

  // ==========================================================================
  // 8. Studio
  // ==========================================================================
  {
    id: "studio",
    name: "Studio",
    iconName: "Monitor",
    color: "purple",
    status: "beta",
    tagline: "Visual interface builder with live code sync",
    overview:
      "Design environment where every visual change produces real Ferrum code. Bidirectional sync between canvas and code panel eliminates the design-to-implementation gap.",
    purpose:
      "The Studio subsystem provides the visual design and development environment for building Ferrum-based interfaces. It depends on the Compiler (for live CSS compilation), the Runtime (for live preview rendering), the Components subsystem (for the component palette), the Tokens subsystem (for the theme editor), and the VFX subsystem (for the effect editor). The Marketplace subsystem depends on Studio for its component preview capability. Its contract: maintain a bidirectional sync between a visual canvas (what you see) and a code editor (what you write), where changes in either are immediately reflected in the other. Every visual manipulation must produce valid, importable Ferrum code.",
    problem:
      "Without Studio, developers design in Figma (which exports static CSS/HTML that doesn't use Ferrum's token system or component API) and then manually translate the design into Ferrum code — a process that loses design intent, introduces translation errors, and cannot be iterated visually. Framer's visual editor (React-only) generates proprietary JSON, not standard code. Webflow exports custom HTML/CSS with no Ferrum integration. Builder.io generates React components but requires a separate CMS. The cost of not having Studio is a persistent design-to-code gap that costs 2-4 hours per component for manual translation and makes visual iteration impossible without round-tripping through the design tool.",
    internalArchitecture:
      "Studio is decomposed into six modules: CanvasRenderer, CodeSyncEngine, PropertyInspector, DragEngine, SelectionManager, and PreviewRenderer. CanvasRenderer renders the design as live HTML in a sandboxed <iframe> using srcdoc, with the full Ferrum Runtime and compiled CSS injected. CodeSyncEngine maintains a bidirectional mapping between the abstract syntax tree (AST) of the code and the DOM tree in the canvas. When code changes, the AST diff is applied to the canvas DOM. When the canvas DOM changes (via drag, resize, property edit), the DOM diff is reverse-mapped to code edits. PropertyInspector displays and edits the selected element's Ferrum classes, component props, token references, and inline overrides. DragEngine handles element positioning via pointer events, snapping to a configurable grid (default 8px). SelectionManager tracks the selected element, manages multi-selection (Shift+click), and renders selection handles with resize affordances. PreviewRenderer renders a device-frame preview (mobile, tablet, desktop) by resizing the iframe and applying viewport meta tags. Module communication uses a central StateStore (Zustand) with subscriptions — CanvasRenderer and CodeSyncEngine subscribe to each other's changes via store observers.",
    renderingFlow:
      "The Studio's rendering flow has two paths. Code-to-Canvas: (1) User types in the code editor, (2) CodeSyncEngine parses the input into an AST (using a TypeScript compiler API subset), (3) AST diff against previous state identifies changed nodes, (4) CanvasRenderer receives the diff and applies minimal DOM mutations to the iframe's document, (5) the iframe's Ferrum Runtime re-resolves any changed token classes and applies updates. Canvas-to-Code: (1) User drags/resizes/edits an element on the canvas, (2) SelectionManager identifies the target DOM node, (3) DragEngine computes the new position/size, (4) CodeSyncEngine maps the DOM node back to its AST counterpart using a stable node ID (data-ferrum-id attribute), (5) the AST is updated with new class values or style properties, (6) the code editor's text buffer is updated via an edit operation (insert/replace at specific line:column positions). The iframe is rendered using a sandboxed srcdoc that includes all Ferrum CSS (compiled by the Compiler on-the-fly) and the Runtime.",
    dataFlow:
      "Input: { code: string, theme: ThemeConfig, components: ComponentRegistry }. Internal state: StudioState { codeAST: ASTNode, canvasDOM: Document, selection: Element | null, history: HistoryEntry[] }. The CodeSyncEngine maintains a bidirectional map: Map<ASTNodeId, DOMNodeId> and Map<DOMNodeId, ASTNodeId>. When code changes: newAST = parse(code), diff = computeASTDiff(prevAST, newAST), CanvasRenderer applies diff to iframe DOM. When canvas changes: domMutation = computeDOMMutation(prevDOM, currentDOM), codeEdit = reverseMap(domMutation, astNodeMap), codeEditor.applyEdit(codeEdit). The PropertyInspector reads the selected element's classList and maps each Ferrum class to its token definition (for display in the inspector panel). The DragEngine outputs position/size as Ferrum spacing tokens (e.g., p-4, m-2, w-64) rather than raw pixel values, ensuring the generated code uses the token system. History entries store { code: string, selection: string | null, timestamp: number } for undo/redo (Ctrl+Z/Ctrl+Y).",
    algorithms:
      "Code-to-canvas sync uses a tree diffing algorithm based on Zhang-Shasha's tree edit distance algorithm, O(n²) worst case but O(n) average for typical UI code where changes are localized. Canvas-to-code reverse mapping uses a stable ID scheme: each AST node is assigned a deterministic ID based on its path in the tree (e.g., \"div.0.button.1\"), stored as a data-ferrum-id attribute on the corresponding DOM node. This enables O(1) lookup from DOM node to AST node. Drag snapping uses a grid-alignment algorithm: snap position = round(rawPosition / gridSize) * gridSize, with an 8px threshold for snap activation. Multi-selection uses a bounding box union algorithm for collective move/resize. History management uses a linear undo stack with a branch point for redo — O(1) push, O(1) undo/redo. The PropertyInspector's token-to-class mapping uses a reverse index built from the Tokens subsystem's output: Map<string, TokenDefinition> — O(1) per class lookup.",
    performance:
      "The Studio adds 28KB gzipped to the application bundle (loaded lazily when Studio is opened). The sandboxed iframe initializes in ~150ms (including Ferrum CSS compilation and Runtime setup). Code-to-canvas sync latency: <16ms for single-line edits (within one frame), <100ms for multi-line edits. Canvas-to-code sync latency: <32ms for drag operations (two frames to detect+map+apply). The CodeSyncEngine can handle code files up to 5,000 lines before sync latency degrades above 100ms. Memory usage: ~5MB for a 1,000-line code file (AST + DOM mirror + history stack). The iframe sandbox uses srcdoc (not a separate origin) to avoid cross-origin overhead. The Compiler runs in a Web Worker for live CSS compilation, processing incremental edits in <2ms. The Studio supports up to 500 DOM elements in the canvas before interaction latency becomes noticeable (>50ms for drag operations).",
    accessibility:
      "The Studio's own UI (panels, toolbar, code editor) is fully accessible: all panels are keyboard-navigable with Tab/Shift+Tab, the code editor supports standard text editing shortcuts, and all actions have keyboard equivalents (Delete to remove selected element, Ctrl+D to duplicate). The canvas content (the designed interface) is not interactive for assistive technologies — it is a visual preview. A \"View Source\" mode provides the generated code in a screen-reader-friendly text format. The PropertyInspector uses ARIA live regions to announce property changes. High-contrast mode is supported: the Studio's UI panels use the application's high-contrast theme, and the canvas renders the designed interface with the high-contrast token variant. The Studio respects prefers-reduced-motion by disabling canvas animations and drag inertia.",
    browserIntegration:
      "The canvas uses a sandboxed <iframe> with srcdoc attribute, avoiding cross-origin restrictions while maintaining DOM isolation. The code editor uses the ContentEditable API or a textarea with syntax highlighting overlay (depending on the chosen editor integration). The Compiler runs in a Web Worker via Comlink for non-blocking compilation. The ResizeObserver API monitors the Studio panel widths to trigger responsive layout recalculations. The Clipboard API is used for copy/paste of elements and code. The File System Access API (Chrome 86+) is used for direct file open/save when available, falling back to <input type='file'> and download links. The visual preview uses CSS contain: strict on the iframe body to limit style recalculation scope. The DragEngine uses PointerEvent with setPointerCapture for reliable drag tracking across element boundaries.",
    futureRoadmap: [
      "Add collaborative editing via CRDT (Conflict-free Replicated Data Type) for real-time multi-user Studio sessions",
      "Implement component wiring mode that visually connects component props to data sources, events, and state stores",
      "Add responsive breakpoint editor with visual viewport resize and breakpoint-specific layout controls",
      "Support design token live-editing with immediate canvas feedback and automatic palette suggestion via OKLCH interpolation",
      "Add Studio extension API that allows plugins to add custom panels, inspectors, and canvas interactions",
    ],
    diagram: {
      nodes: [
        { id: "code", label: "Code Editor", x: 3, y: 15, variant: "primary" },
        { id: "sync", label: "CodeSyncEngine", x: 25, y: 35, variant: "default" },
        { id: "canvas", label: "CanvasRenderer", x: 50, y: 15, variant: "default" },
        { id: "selection", label: "SelectionManager", x: 50, y: 55, variant: "default" },
        { id: "drag", label: "DragEngine", x: 73, y: 55, variant: "default" },
        { id: "inspector", label: "PropertyInspector", x: 73, y: 15, variant: "default" },
        { id: "preview", label: "PreviewRenderer", x: 93, y: 35, variant: "accent" },
      ],
      edges: [
        { from: "code", to: "sync", label: "AST diff" },
        { from: "sync", to: "canvas", label: "DOM mutations" },
        { from: "canvas", to: "sync", label: "DOM diff" },
        { from: "sync", to: "code", label: "code edits" },
        { from: "canvas", to: "selection", label: "click target" },
        { from: "selection", to: "drag", label: "drag start" },
        { from: "selection", to: "inspector", label: "element props" },
        { from: "drag", to: "sync", label: "position change" },
        { from: "inspector", to: "sync", label: "class change" },
        { from: "canvas", to: "preview", label: "viewport resize" },
      ],
    },
  },

  // ==========================================================================
  // 9. AI
  // ==========================================================================
  {
    id: "ai",
    name: "AI",
    iconName: "Bot",
    color: "violet",
    status: "planned",
    tagline: "Intent-to-render intelligence layer",
    overview:
      "Understands developer intent and produces standard Ferrum classes and tokens — not black-box code. Structured pipeline: Intent Parsing → Context Analysis → Architecture Mapping → Code Generation → Validation.",
    purpose:
      "The AI subsystem serves as the intelligent interface between natural language or visual intent and the Ferrum platform's structured APIs. It will be depended on by Studio (for natural language design commands like 'make this button more prominent'), the Cloud subsystem (for automated code review suggestions), and directly by developers via a CLI and API. It depends on the Tokens subsystem (for valid token references), the Components subsystem (for valid component APIs), and the Compiler (for validating generated code). Its contract: accept a natural language intent or visual context, produce valid Ferrum code (class names, component JSX, token references) that can be directly compiled and rendered, with a confidence score and explanation.",
    problem:
      "Without the AI subsystem, developers must memorize all 16 component APIs, 200+ token names, and the correct class composition patterns for each design goal. GitHub Copilot generates generic HTML/Tailwind code that doesn't use Ferrum's component abstractions or token system. Vercel v0 generates React components with inline styles, not Ferrum classes. ChatGPT produces code that may reference non-existent tokens or use incorrect component props. The cost of not having AI is a steep learning curve (est. 4-8 hours for a new developer to become productive), frequent trips to documentation, and generated code that requires manual correction to conform to Ferrum conventions.",
    internalArchitecture:
      "The AI subsystem is planned as a five-stage pipeline: IntentParser, ContextAnalyzer, ArchitectureMapper, CodeGenerator, and ValidationEngine. IntentParser accepts natural language input and extracts structured intent: { action: 'style' | 'layout' | 'animate' | 'create', target: Element | Component, properties: Record<string, string> }. ContextAnalyzer examines the surrounding code, active theme, and component hierarchy to determine constraints (available tokens, component prop types, layout context). ArchitectureMapper matches the intent to Ferrum's internal architecture — determining which subsystem (Components, Tokens, Motion, VFX) should handle the request and which specific API to invoke. CodeGenerator produces Ferrum code using a template-based approach (not LLM freeform generation): it selects from a curated set of code templates indexed by intent pattern, fills in token references and prop values, and outputs the result. ValidationEngine runs the generated code through the Compiler (for CSS validity) and a lightweight type checker (for component prop validity). Communication between stages uses a shared PipelineContext object passed sequentially through each stage.",
    renderingFlow:
      "The AI subsystem does not render to the screen directly. Its output flow is: user input → IntentParser → ContextAnalyzer → ArchitectureMapper → CodeGenerator → ValidationEngine → code output. The code output is then displayed in the Studio's code editor (with diff highlighting against existing code) or applied directly to the canvas (with a preview). In the CLI context, the output is printed to stdout or written to a file. The AI subsystem uses a streaming response model: the CodeGenerator produces tokens incrementally, allowing the Studio to display generated code as it streams (similar to ChatGPT's streaming output). This is implemented via an async generator function (function* with yield) that the consumer iterates over.",
    dataFlow:
      "Input: { intent: string, context: { code: string, cursorPosition: Position, theme: ThemeConfig, componentRegistry: ComponentRegistry } }. The IntentParser produces: ParsedIntent { action: ActionType, target: string, properties: Map<string, string>, confidence: number }. The ContextAnalyzer enriches this with: AnalysisContext { availableTokens: TokenMap, componentProps: PropSchema[], layoutContext: LayoutInfo }. The ArchitectureMapper outputs: MappedAction { subsystem: SubsystemId, api: string, params: Record<string, string> }. The CodeGenerator produces: GeneratedCode { code: string, explanation: string, confidence: number, alternatives: GeneratedCode[] }. The ValidationEngine produces: ValidationResult { valid: boolean, errors: ValidationError[], warnings: ValidationWarning[] }. If validation fails, the CodeGenerator is re-invoked with the error context (max 2 retries). Final output: the validated GeneratedCode object. All intermediate data is ephemeral — nothing is persisted to disk during the pipeline.",
    algorithms:
      "Intent parsing uses a fine-tuned text classification model (planned: a 125M parameter encoder-decoder) that maps natural language to structured intent with ~92% accuracy on internal benchmarks. The model uses a constrained decoding approach where the output vocabulary is limited to valid Ferrum API names and token names, preventing hallucinated APIs. Context analysis uses a sliding window over the surrounding code (512 tokens) to extract relevant component and token usage patterns — O(n) where n is the context window size. Architecture mapping uses a rule-based classifier with 45 intent patterns mapped to specific subsystem APIs — O(1) per classification after pattern matching. Code generation uses template-based generation with a template index of ~200 patterns, selected by a similarity score between the MappedAction and template metadata — O(t) where t is the number of templates (constant 200). Validation uses the Compiler's parser for CSS validation and a JSON Schema validator for component props — O(n) where n is the generated code length.",
    performance:
      "The AI subsystem is planned to add 12KB gzipped (excluding model weights, which will be served from a CDN and loaded on first use). Intent parsing latency: ~200ms for a single sentence (model inference on a 125M parameter model, served via WebAssembly with SIMD acceleration). Full pipeline latency (intent → validated code): ~500ms target. Model weight size: ~250MB quantized (INT8), loaded from CDN on first AI interaction, cached in the browser's Cache API. Subsequent interactions: ~150ms (model is warm, only tokenization + inference). The streaming CodeGenerator begins outputting code within 300ms of input, with the first meaningful code appearing at ~400ms. Memory usage during inference: ~350MB (model weights in WASM memory + context buffer). The AI subsystem is designed to run entirely client-side (no server round-trip) for privacy and latency reasons, with an optional server-side fallback for complex multi-step intents.",
    accessibility:
      "The AI subsystem's natural language interface is inherently accessible — developers can describe their intent in plain language without needing to navigate complex UIs. The Studio integration will support voice input (via the Web Speech API) as an alternative to typing, enabling hands-free interaction. Generated code explanations will be announced via ARIA live regions for screen reader users. The AI subsystem will respect prefers-reduced-motion by avoiding animation-heavy suggestions when reduced motion is active (e.g., suggesting instant transitions instead of spring animations). All AI-generated code will be validated for accessibility (correct ARIA attributes, keyboard navigation, color contrast) by the ValidationEngine before being presented to the developer.",
    browserIntegration:
      "The AI subsystem's model inference runs in a Web Worker using WebAssembly with WASM SIMD support (Chrome 91+, Firefox 89+, Safari 16.4+) for 2-3x faster matrix operations. The Web Speech API (SpeechRecognition interface) is used for voice input when available (Chrome 33+, Safari 14.1+), falling back to a text input field. The Cache API stores the quantized model weights for offline use after the first download. The AI subsystem uses the Fetch API with a service worker interceptor to serve model weights from the Cache API when offline. SharedArrayBuffer is used for shared memory between the main thread and the AI Worker, requiring Cross-Origin-Isolation headers (Cross-Origin-Opener-Policy: same-origin, Cross-Origin-Embedder-Policy: require-corp). For browsers that do not support SharedArrayBuffer, the AI falls back to a server-side inference endpoint via the Cloud subsystem.",
    futureRoadmap: [
      "Implement multimodal intent parsing that accepts screenshots/sketches as input and produces Ferrum layout code",
      "Add interactive refinement loop where AI suggests 3 alternatives and the developer selects or iterates",
      "Support component generation from natural language description with full ARIA and keyboard navigation",
      "Add code explanation mode that annotates existing Ferrum code with natural language descriptions of each section",
      "Implement batch migration mode that converts existing Tailwind/Bootstrap code to Ferrum components and tokens",
    ],
    diagram: {
      nodes: [
        { id: "input", label: "User Intent", x: 3, y: 35, variant: "primary" },
        { id: "parser", label: "IntentParser", x: 20, y: 10, variant: "default" },
        { id: "context", label: "ContextAnalyzer", x: 20, y: 55, variant: "default" },
        { id: "mapper", label: "ArchMapper", x: 42, y: 35, variant: "default" },
        { id: "generator", label: "CodeGenerator", x: 64, y: 10, variant: "default" },
        { id: "validator", label: "ValidationEngine", x: 64, y: 55, variant: "default" },
        { id: "retry", label: "Retry Loop", x: 84, y: 55, variant: "muted" },
        { id: "output", label: "Valid Code", x: 94, y: 10, variant: "accent" },
      ],
      edges: [
        { from: "input", to: "parser", label: "NL text" },
        { from: "input", to: "context", label: "code context" },
        { from: "parser", to: "mapper", label: "ParsedIntent" },
        { from: "context", to: "mapper", label: "AnalysisContext" },
        { from: "mapper", to: "generator", label: "MappedAction" },
        { from: "generator", to: "validator", label: "GeneratedCode" },
        { from: "validator", to: "output", label: "valid ✓" },
        { from: "validator", to: "retry", label: "errors" },
        { from: "retry", to: "generator", label: "retry", style: "dashed" },
      ],
    },
  },

  // ==========================================================================
  // 10. Cloud
  // ==========================================================================
  {
    id: "cloud",
    name: "Cloud",
    iconName: "Cloud",
    color: "sky",
    status: "planned",
    tagline: "Edge-deployed build and analytics pipeline",
    overview:
      "Build (compile + optimize), Deploy (CDN + edge caching), and Observe (Real User Metrics + a11y monitoring) services for one-click project deployment.",
    purpose:
      "The Cloud subsystem provides the infrastructure layer that enables Ferrum projects to be built, deployed, and monitored with zero configuration. It is depended on by Studio (for one-click preview deployment), Marketplace (for component demo hosting), and directly by developers via the CLI (ferrum deploy). It depends on the Compiler (for CSS optimization during build), the AI subsystem (for automated code review), and the Tokens subsystem (for theme consistency validation). Its contract: accept a project directory, produce an optimized build artifact, deploy it to a CDN with edge caching, and provide real-time performance and accessibility metrics via an Observable API.",
    problem:
      "Without the Cloud subsystem, developers must manually configure build tools (Vite, Webpack, esbuild), set up CI/CD pipelines (GitHub Actions, Netlify, Vercel), configure CDN caching headers, and integrate separate monitoring services (Vercel Analytics, Datadog, axe Monitor). Vercel provides deployment but is not Ferrum-aware — it cannot run the Ferrum Compiler's 9-pass optimization pipeline or validate token consistency. Netlify deploys but doesn't provide Ferrum-specific performance baselines. Cloudflare Pages deploys to the edge but lacks Ferrum token analytics. The cost of not having Cloud is 2-4 hours of DevOps setup per project, no Ferrum-specific optimization during deployment, and fragmented monitoring across 3-4 separate services.",
    internalArchitecture:
      "Cloud is planned as three service modules plus two shared modules: BuildPipeline, CDNDeployer, EdgeCacher, MetricsCollector, and A11yMonitor. BuildPipeline orchestrates the build process: (1) discover Ferrum config, (2) run Compiler (CSS optimization), (3) tree-shake unused components, (4) inline critical CSS, (5) generate optimized HTML. CDNDeployer uploads build artifacts to a CDN (planned: Cloudflare R2 or AWS CloudFront) and configures routing rules. EdgeCacher manages edge caching: cache headers (Cache-Control: public, max-age=31536000, immutable for hashed assets), cache invalidation on redeployment, and stale-while-revalidate for HTML. MetricsCollector collects Real User Metrics (RUM): Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS), Interaction to Next Paint (INP) using the Performance Observer API. A11yMonitor runs automated accessibility audits on each deployment using axe-core and reports violations. Module communication uses a message queue (planned: Cloudflare Queues or AWS SQS) — BuildPipeline publishes a 'build-complete' event consumed by CDNDeployer and MetricsCollector.",
    renderingFlow:
      "The Cloud subsystem does not render to a screen. Its output flow is: project source → BuildPipeline → CDNDeployer → EdgeCacher → user's browser. When a user requests a page: (1) the CDN edge node checks its cache, (2) if cache hit, return cached response (0ms server time), (3) if cache miss, fetch from origin, cache the response, and return it. The MetricsCollector's rendering-related flow: (1) the deployed page includes a Ferrum RUM script (<1KB), (2) the script uses PerformanceObserver to measure LCP, FID, CLS, INP, (3) metrics are batched and sent via navigator.sendBeacon() to the Cloud metrics endpoint, (4) MetricsCollector aggregates metrics per deployment and per page. The A11yMonitor's flow: (1) after deployment, a headless browser (Puppeteer/Playwright) loads each page, (2) axe-core audits the DOM for WCAG violations, (3) violations are stored and surfaced in the Cloud dashboard.",
    dataFlow:
      "Input: { projectDir: string, config: FerrumConfig }. BuildPipeline output: { assets: Map<string, Buffer>, html: string, css: string, js: string, manifest: Manifest }. CDNDeployer output: { urls: Map<string, string>, deploymentId: string }. EdgeCacher output: { cacheStatus: 'hit' | 'miss' | 'stale', ttl: number }. MetricsCollector input: { LCP: number, FID: number, CLS: number, INP: number, url: string, deploymentId: string, timestamp: number }. MetricsCollector output: { aggregated: { p75: { LCP, FID, CLS, INP }, p95: { LCP, FID, CLS, INP }, timeseries: MetricPoint[] } }. A11yMonitor input: { url: string, standards: ('wcag2a' | 'wcag2aa' | 'wcag21aa')[] }. A11yMonitor output: { violations: AxeViolation[], passes: number, incomplete: number }. State lives in the CDN's cache (for assets), a time-series database (for metrics), and a document store (for a11y violations).",
    algorithms:
      "Critical CSS inlining uses a two-pass approach: (1) render the page in a headless browser, (2) extract all computed CSS rules for above-the-fold elements using getComputedStyle() — O(n) where n is the number of DOM elements. Tree-shaking uses static analysis of import/require statements to build a dependency graph, then performs reachability analysis from entry points — O(V+E) on the module graph. Edge caching uses a content-addressable storage scheme: cache key = SHA-256(content), enabling automatic deduplication — O(1) lookup. Metrics aggregation uses a t-digest algorithm for percentile computation (p75, p95, p99) on streaming data — O(1) insert, O(1) query. Cache invalidation uses tag-based invalidation: each deployment generates a unique tag, and all assets are tagged with their deployment ID — O(1) per invalidation, O(n) where n is the number of edge nodes to propagate to.",
    performance:
      "Build time for a standard Ferrum project (50 components, 200 token references): ~3 seconds (Compiler: 0.5s, tree-shaking: 1s, critical CSS: 1s, HTML generation: 0.5s). Deployment time (upload to CDN): ~2 seconds for a 500KB build artifact. Edge cache hit rate target: >95% for static assets. Time to first byte (TTFB) from edge: <50ms globally. The RUM script adds <1KB to the page and <0.1ms to page load time. Metrics batched via sendBeacon() incur zero network overhead on the main thread. A11yMonitor audit time: ~5 seconds per page (headless browser load + axe-core scan). The Cloud dashboard displays metrics with a 30-second latency from collection to display.",
    accessibility:
      "The Cloud subsystem builds accessibility into the deployment pipeline rather than treating it as an afterthought. The A11yMonitor runs axe-core against every deployed page and blocks deployment if critical violations (WCAG Level A failures) are detected — this can be configured as a warning or error via ferrum.config.ts. The MetricsCollector tracks a11y-specific metrics: percentage of images with alt text, percentage of interactive elements with visible focus indicators, number of pages with valid lang attribute. The Cloud dashboard includes an a11y score (0-100) computed from the weighted average of: WCAG violation count (40%), RUM accessibility metric scores (30%), and manual audit results (30%). The RUM script detects assistive technology usage via the 'prefers-reduced-motion' and 'forced-colors' media queries and reports usage percentages.",
    browserIntegration:
      "The Cloud subsystem's RUM script uses the Performance Observer API (PerformanceObserver.supportedEntryTypes) to measure Core Web Vitals: LCP via 'largest-contentful-paint' entry type, FID via 'first-input' entry type, CLS via 'layout-shift' entry type, INP via 'interaction-to-next-paint' entry type. The navigator.sendBeacon() API is used for metric transmission (guaranteed delivery even on page unload). The Cache API is used on the client side for service worker-based offline caching of deployed assets. The A11yMonitor uses Puppeteer's page.accessibility.snapshot() for accessibility tree inspection and axe-core's axe.run() for WCAG compliance testing. The Cloud CDN uses standard HTTP caching headers (Cache-Control, ETag, Last-Modified) and supports Brotli (Content-Encoding: br) and Zstandard (Content-Encoding: zstd) compression for maximum transfer efficiency.",
    futureRoadmap: [
      "Add automatic image optimization pipeline using sharp/libvips for AVIF/WebP conversion and responsive srcset generation",
      "Implement edge functions (Cloudflare Workers / Deno Deploy) for server-side token resolution and A/B theme testing",
      "Add real-user a11y testing by collecting DOM snapshots and running axe-core in the user's browser context",
      "Support multi-region deployment with automatic latency-based routing and P95 TTFB <100ms globally",
      "Add deployment rollback with instant cache invalidation and blue-green deployment strategy",
    ],
    diagram: {
      nodes: [
        { id: "source", label: "Project Source", x: 3, y: 30, variant: "primary" },
        { id: "build", label: "BuildPipeline", x: 22, y: 30, variant: "default" },
        { id: "deploy", label: "CDNDeployer", x: 44, y: 10, variant: "default" },
        { id: "edge", label: "EdgeCacher", x: 66, y: 10, variant: "default" },
        { id: "metrics", label: "MetricsCollector", x: 44, y: 60, variant: "default" },
        { id: "a11y", label: "A11yMonitor", x: 66, y: 60, variant: "default" },
        { id: "browser", label: "User Browser", x: 88, y: 30, variant: "accent" },
        { id: "dashboard", label: "Dashboard", x: 88, y: 70, variant: "muted" },
      ],
      edges: [
        { from: "source", to: "build", label: "source files" },
        { from: "build", to: "deploy", label: "optimized build" },
        { from: "deploy", to: "edge", label: "upload" },
        { from: "edge", to: "browser", label: "cached assets" },
        { from: "browser", to: "metrics", label: "RUM data" },
        { from: "build", to: "a11y", label: "deployed URLs" },
        { from: "a11y", to: "dashboard", label: "violations" },
        { from: "metrics", to: "dashboard", label: "aggregated" },
      ],
    },
  },

  // ==========================================================================
  // 11. Marketplace
  // ==========================================================================
  {
    id: "marketplace",
    name: "Marketplace",
    iconName: "Store",
    color: "orange",
    status: "planned",
    tagline: "Community component and effect registry",
    overview:
      "Publish, discover, and install community-built components, effect presets, theme packages, and integration plugins. Versioned, reviewed, and tree-shakeable.",
    purpose:
      "The Marketplace subsystem provides the community ecosystem layer that extends Ferrum's built-in 16 components with an open-ended library of user-contributed packages. It is depended on by Studio (for browsing and installing packages directly in the design environment), the CLI (for ferrum add <package> commands), and the Cloud subsystem (for hosting package demos and documentation). It depends on the Compiler (to compile and validate submitted packages), the Tokens subsystem (to validate package token usage), and the Components subsystem (to validate that packages extend the component API correctly). Its contract: accept a package submission (source code, metadata, documentation), validate it against Ferrum's API contracts, store it in a versioned registry, and make it installable via CLI or Studio with full tree-shaking support.",
    problem:
      "Without the Marketplace, developers cannot share Ferrum components, effect presets, or theme packages. npm serves as a generic package registry but has no Ferrum-specific validation — packages may use incorrect tokens, break component APIs, or include accessibility violations. Storybook provides component documentation but no installation, versioning, or dependency management. Figma's Community plugin system is design-only with no code output. The cost of not having a Marketplace is duplicated effort across teams (everyone builds their own data table, their own carousel, their own dark theme), no quality assurance for shared code, and no discoverability mechanism for community contributions.",
    internalArchitecture:
      "Marketplace is planned as six modules: PackageRegistry, VersionManager, TreeShaker, ReviewSystem, DependencyResolver, and Installer. PackageRegistry stores package metadata in a document database: { name, author, description, version, keywords, category, downloads, rating }. VersionManager implements semantic versioning (semver) with support for version ranges (^, ~, >=) and deprecation notices. TreeShaker analyzes package entry points and marks exports as tree-shakeable by verifying they have no side effects (no global mutations, no DOM access at module scope). ReviewSystem provides automated and manual review: automated checks (Compiler validation, a11y audit, bundle size check, token usage validation) run on submission; manual reviews by community maintainers handle API design and code quality. DependencyResolver builds a dependency graph from package.json declarations and checks for version conflicts, circular dependencies, and duplicate sub-dependencies using a flattening algorithm. Installer resolves dependencies, downloads packages, and integrates them into the project's ferrum.config.ts and token definitions. Module communication uses an event-driven architecture: package submission triggers ReviewSystem, review approval triggers Registry update, install triggers DependencyResolver then Installer.",
    renderingFlow:
      "The Marketplace does not render directly. However, the Studio integration flow is: (1) user opens the Marketplace panel in Studio, (2) PackageRegistry returns a paginated list of packages with search/filter, (3) user clicks \"Install\" on a package, (4) DependencyResolver analyzes the package's dependencies, (5) Installer downloads the package source and adds it to the project, (6) the Compiler recompiles the project with the new package, (7) the Studio canvas updates with the newly available component or effect. For the web-based Marketplace UI: (1) user visits marketplace.ferrum.dev, (2) PackageRegistry returns search results, (3) each package has a live demo rendered in a sandboxed iframe (same mechanism as Studio's CanvasRenderer), (4) one-click copy of the install command (ferrum add @ferrum/package-name) is provided.",
    dataFlow:
      "Input (submission): { source: PackageSource, metadata: PackageMetadata, readme: string, examples: Example[] }. The ReviewSystem validates: (1) Compiler.compile(source.css) succeeds, (2) axe-core audit of example pages passes WCAG AA, (3) bundle size < 50KB gzipped, (4) all token references exist in the Ferrum token map. Output (submission): { status: 'approved' | 'rejected' | 'pending', violations: Violation[] }. Input (installation): { packageName: string, version?: string, projectConfig: FerrumConfig }. The DependencyResolver outputs: { resolution: Map<string, ResolvedVersion>, conflicts: Conflict[] }. The Installer outputs: { installed: string[], modifiedFiles: string[] }. The PackageRegistry stores: { packages: PackageRecord[], versions: VersionRecord[], downloads: DownloadRecord[] }. Search uses a full-text index (planned: a inverted index built from name + description + keywords) with BM25 ranking.",
    algorithms:
      "Dependency resolution uses a constraint satisfaction algorithm: (1) build a dependency graph from all package.json files, (2) for each dependency, find the maximum version satisfying all version range constraints (MVS — Minimal Version Selection algorithm, used by npm 7+), O(V + E) where V is the number of packages and E is the number of dependency edges. Tree-shaking analysis uses a side-effect detection algorithm: statically analyze each module for global mutations (assignments to window, document, globalThis), DOM access at module scope (document.querySelector, createElement outside functions), and console.log — O(n) per module where n is the AST node count. Search ranking uses BM25 (Best Matching 25) over the inverted index — O(q + k) where q is the query length and k is the number of results. Version range matching uses semver's comparison algorithm: parse version string → compare major.minor.patch numerically — O(1) per comparison.",
    performance:
      "The Marketplace client-side library adds 3.2KB gzipped. Package search latency target: <100ms for the first 20 results (fetched from a CDN-backed API). Package installation: <5 seconds for a single package with <10 dependencies (download + compile + integrate). The ReviewSystem's automated checks complete in ~10 seconds per package (Compiler: 1s, a11y audit: 5s, bundle analysis: 2s, token validation: 2s). The web Marketplace UI targets a Lighthouse Performance score of >95 (LCP <1.2s, CLS <0.05, FID <50ms). The PackageRegistry index for 10,000 packages is ~5MB, loaded incrementally with infinite scroll. The Installer uses streaming download (ReadableStream) to begin compilation before the full package is downloaded, reducing perceived installation time by ~30%.",
    accessibility:
      "The Marketplace web UI is fully accessible: package cards use <article> elements with aria-label describing the package name and rating. Search uses a <search> landmark with an associated <label>. Filter controls use native <select> elements or <fieldset>+<legend> groups. Package details use heading hierarchy (h1 for package name, h2 for sections). The live demo iframe includes a title attribute describing the demo content. Star ratings use aria-valuenow, aria-valuemin, aria-valuemax on a role='img' element with an sr-only text description. Install buttons use aria-live='polite' regions to announce installation status changes. The CLI interface outputs machine-readable JSON (--json flag) for accessibility tooling integration.",
    browserIntegration:
      "The Marketplace web UI uses standard HTML semantic elements, CSS Grid for the package grid layout, and CSS scroll-snap for category carousels. The live demo iframes use the sandbox attribute with allow-scripts allow-same-origin to enable Ferrum Runtime execution while preventing access to the parent page. Service Worker caching (Cache API) stores the package index and downloaded packages for offline browsing. The Web Share API (navigator.share) is used for the \"Share Package\" button on mobile. The File System Access API is used in Studio for direct package installation into the project directory. The Clipboard API copies install commands. The Notification API notifies the user when a package they depend on releases a new version (with opt-in permission). The Marketplace API uses standard HTTP (GET for search, POST for submission, PUT for updates) with JSON responses and Bearer token authentication.",
    futureRoadmap: [
      "Add visual package builder that generates Ferrum component code from a component specification form",
      "Implement automated accessibility certification with a 'Ferrum A11y Certified' badge for packages passing all checks",
      "Add package collections (curated lists by topic: 'E-commerce Kit', 'Dashboard Starter', 'Landing Page Pack')",
      "Support monorepo packages with multiple exportable components/effects from a single submission",
      "Add package analytics dashboard showing download trends, dependency graph visualization, and usage examples",
    ],
    diagram: {
      nodes: [
        { id: "author", label: "Package Author", x: 3, y: 25, variant: "primary" },
        { id: "review", label: "ReviewSystem", x: 22, y: 10, variant: "default" },
        { id: "registry", label: "PackageRegistry", x: 22, y: 55, variant: "default" },
        { id: "resolver", label: "DependencyResolver", x: 48, y: 35, variant: "default" },
        { id: "shaker", label: "TreeShaker", x: 48, y: 70, variant: "muted" },
        { id: "installer", label: "Installer", x: 72, y: 25, variant: "default" },
        { id: "version", label: "VersionManager", x: 72, y: 60, variant: "default" },
        { id: "project", label: "Ferrum Project", x: 93, y: 35, variant: "accent" },
      ],
      edges: [
        { from: "author", to: "review", label: "submit package" },
        { from: "author", to: "registry", label: "metadata" },
        { from: "review", to: "registry", label: "approved" },
        { from: "registry", to: "resolver", label: "package + deps" },
        { from: "registry", to: "shaker", label: "source modules" },
        { from: "resolver", to: "installer", label: "resolved deps" },
        { from: "shaker", to: "installer", label: "shake map" },
        { from: "installer", to: "version", label: "lock versions" },
        { from: "installer", to: "project", label: "integrated" },
        { from: "version", to: "project", label: "version lock", style: "dashed" },
      ],
    },
  },
];