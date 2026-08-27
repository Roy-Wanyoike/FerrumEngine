#!/usr/bin/env python3
"""Ferrum Platform Architecture - Full PDF Generator"""
import os, sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, ListFlowable, ListItem
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

# ─── Paths ───
ASSETS = "/home/z/my-project/download/ferrum-arch/assets"
OUTPUT = "/home/z/my-project/download/Ferrum_Platform_Architecture.pdf"
FONT_DIR = "/usr/share/fonts"
W, H = A4  # 595.27 x 841.89

# ─── Fonts ───
pdfmetrics.registerFont(TTFont('Inter', f'{FONT_DIR}/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('InterB', f'{FONT_DIR}/truetype/liberation/LiberationSans-Bold.ttf'))
registerFontFamily('Inter', normal='Inter', bold='InterB')

# ─── Palette ───
PAGE_BG       = colors.HexColor('#f5f4f4')
SECTION_BG    = colors.HexColor('#ecebe9')
CARD_BG       = colors.HexColor('#edecea')
TABLE_STRIPE  = colors.HexColor('#f2f2f0')
HEADER_FILL   = colors.HexColor('#6e654b')
COVER_BLOCK   = colors.HexColor('#887c58')
BORDER        = colors.HexColor('#d4cdb8')
ICON          = colors.HexColor('#998753')
ACCENT        = colors.HexColor('#a08535')
ACCENT_2      = colors.HexColor('#7659cb')
TEXT_PRIMARY   = colors.HexColor('#161614')
TEXT_MUTED     = colors.HexColor('#84817a')
SEM_SUCCESS   = colors.HexColor('#3b8353')
SEM_WARNING   = colors.HexColor('#977e4c')
SEM_ERROR     = colors.HexColor('#8d4f4a')
SEM_INFO      = colors.HexColor('#527291')

# ─── Styles ───
MARGIN = 1.0 * inch
AW = W - 2 * MARGIN  # available width

sH1 = ParagraphStyle('H1', fontName='InterB', fontSize=28, leading=34, textColor=TEXT_PRIMARY, spaceAfter=6, spaceBefore=0)
sH2 = ParagraphStyle('H2', fontName='InterB', fontSize=20, leading=26, textColor=HEADER_FILL, spaceAfter=6, spaceBefore=18)
sH3 = ParagraphStyle('H3', fontName='InterB', fontSize=15, leading=20, textColor=ACCENT, spaceAfter=4, spaceBefore=12)
sBody = ParagraphStyle('Body', fontName='Inter', fontSize=11, leading=17, textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=8)
sBodySM = ParagraphStyle('BodySM', fontName='Inter', fontSize=10, leading=15, textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=6)
sBullet = ParagraphStyle('Bullet', fontName='Inter', fontSize=10.5, leading=16, textColor=TEXT_PRIMARY, leftIndent=18, bulletIndent=6, spaceAfter=4)
sCaption = ParagraphStyle('Caption', fontName='Inter', fontSize=9, leading=13, textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=12, spaceBefore=4)
sCode = ParagraphStyle('Code', fontName='Courier', fontSize=9, leading=13, textColor=colors.HexColor('#3d3d3d'), backColor=colors.HexColor('#f8f7f5'), leftIndent=8, rightIndent=8, spaceBefore=4, spaceAfter=8, borderPadding=6)
sTableHead = ParagraphStyle('TH', fontName='InterB', fontSize=9.5, leading=13, textColor=colors.white, alignment=TA_CENTER)
sTableCell = ParagraphStyle('TC', fontName='Inter', fontSize=9, leading=13, textColor=TEXT_PRIMARY, wordWrap='CJK')
sNote = ParagraphStyle('Note', fontName='Inter', fontSize=10, leading=15, textColor=HEADER_FILL, leftIndent=12, borderLeftWidth=3, borderLeftColor=ACCENT, paddingLeft=10, spaceBefore=6, spaceAfter=8)

def p(text, style=sBody):
    return Paragraph(text, style)

def h1(text):
    return Paragraph(text, sH1)

def h2(text):
    return Paragraph(text, sH2)

def h3(text):
    return Paragraph(text, sH3)

def bullet(text):
    return Paragraph(f"<bullet>&bull;</bullet> {text}", sBullet)

def note(text):
    return Paragraph(text, sNote)

def code(text):
    return Paragraph(text.replace('\n','<br/>'), sCode)

def img(filename, max_w=AW, max_h=300):
    path = os.path.join(ASSETS, filename)
    im = Image(path)
    ow, oh = im.drawWidth, im.drawHeight
    rw = max_w / ow if ow > max_w else 1.0
    rh = max_h / oh if oh > max_h else 1.0
    r = min(rw, rh)
    im.drawWidth = ow * r
    im.drawHeight = oh * r
    return im

def make_table(headers, rows, col_widths=None):
    """Build a safe table with Paragraph-wrapped cells."""
    hdr = [Paragraph(h, sTableHead) for h in headers]
    data = [hdr]
    for row in rows:
        data.append([Paragraph(str(c), sTableCell) for c in row])
    if col_widths is None:
        n = len(headers)
        col_widths = [AW / n] * n
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'InterB'),
        ('FONTSIZE', (0, 0), (-1, 0), 9.5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t

# ══════════════════════════════════════════════════════════════
# BUILD STORY
# ══════════════════════════════════════════════════════════════
story = []

# ────────── SECTION 1: HIGH-LEVEL ARCHITECTURE ──────────
story.append(h1("1. High-Level Architecture Diagram"))
story.append(p("The Ferrum platform follows a layered architecture where each layer has a clearly defined responsibility and depends only on layers below it. This ensures that changes in one layer never cascade unpredictably into others. The architecture is designed as a modular monolith that can naturally evolve toward distributed packages as the ecosystem grows, following the principle that a well-structured monolith is the ideal starting point for any system that may eventually need to decompose."))
story.append(p("At the top of the stack sit the application-layer products: documentation site, marketing website, interactive playground, visual studio, AI tooling, cloud hosting, and example projects. Each of these is an independent Next.js or Astro application that consumes packages from the layers below. These applications have zero dependencies on each other, enabling independent deployment cycles and team ownership."))
story.append(p("Below the applications, the framework adapter layer provides framework-native APIs for React, Vue, Angular, Svelte, Solid, Astro, Remix, and Qwik. These adapters are intentionally thin wrappers that translate framework-specific component models into calls to the framework-agnostic core. No business logic is duplicated across adapters; each adapter is essentially a translation layer that ensures developers feel at home in their chosen framework while the underlying system remains unified."))
story.append(p("The core packages layer contains the framework-agnostic engine: the CSS effects engine, design token system, motion library, web components, icon library, theme system, and utility functions. These packages represent the single source of truth for all visual and behavioral primitives. Every other layer ultimately depends on this stratum, which is why it carries the strictest quality gates and the most rigorous testing requirements."))
story.append(p("Infrastructure and tooling occupy the foundation: the CLI, build system, shared configuration, testing utilities, browser DevTools extension, and optional analytics. These packages contain zero business logic and exist solely to make developing with and contributing to Ferrum productive. The platform adapter layer (Flutter, React Native, Swift, Android) and the plugin ecosystem (VS Code, Figma, generators, marketplace) extend Ferrum's reach beyond web JavaScript into native platforms and designer tooling."))
story.append(KeepTogether([img('diagram-overview.png', AW, 340), p("Figure 1: Ferrum Platform High-Level Architecture", sCaption)]))

# ────────── SECTION 2: PACKAGE DEPENDENCY GRAPH ──────────
story.append(h1("2. Package Dependency Graph"))
story.append(p("The dependency graph follows a strict acyclic structure with dependencies flowing downward only. Applications may depend on framework adapters and core packages. Framework adapters may depend on core packages and infrastructure. Core packages may depend on other core packages (with strict rules against circular dependencies) and infrastructure. Infrastructure packages depend on nothing within the Ferrum ecosystem. This topological ordering is enforced at build time by Turborepo's dependency analysis and by a custom lint rule that detects any upward or lateral dependency violations."))
story.append(p("The rationale for this strict dependency discipline is twofold. First, it guarantees that a change in a low-level package can only affect packages that explicitly depend on it, making impact analysis trivial. Second, it enables Turborepo to compute a perfect parallel build plan: since there are no circular dependencies, every package can be built as soon as its dependencies are ready. In a monorepo with 30+ packages, this can reduce CI build times from minutes to seconds for unaffected packages."))
story.append(p("Alternatives considered included a flat package structure where all packages could depend on each other freely, and a microservices-style architecture where each package is a separate repository. The flat structure was rejected because it makes dependency analysis impossible and leads to tightly coupled, hard-to-refactor code. The multi-repo approach was rejected because it creates enormous coordination overhead for a project at this stage, and because shared tooling, unified versioning, and atomic cross-package changes are critical for a design system that must present a coherent API surface."))
story.append(KeepTogether([img('diagram-deps.png', AW, 280), p("Figure 2: Package Dependency Graph - Strict Acyclic Topology", sCaption)]))

# ────────── SECTION 3: FOLDER STRUCTURE ──────────
story.append(h1("3. Folder Structure"))
story.append(p("The monorepo uses pnpm workspaces managed by Turborepo for task orchestration. The top-level directory is divided into six primary directories: <b>apps/</b> for deployable applications, <b>packages/</b> for the core library ecosystem, <b>frameworks/</b> for framework-specific adapter packages, <b>platforms/</b> for native platform bridges, <b>plugins/</b> for editor and tooling extensions, and <b>tools/</b> for code generators, codemods, and migration scripts. Supporting directories include <b>scripts/</b> for monorepo-level automation, <b>.github/</b> for CI/CD workflows and issue templates, and <b>docs/</b> for architecture decision records and contributor guides."))
story.append(p("Each package within the monorepo follows a consistent internal structure: <b>src/</b> for source code, <b>tests/</b> for unit and integration tests colocated with the code they test, <b>package.json</b> with explicit <b>exports</b>, <b>types</b>, <b>sideEffects</b>, and <b>files</b> fields. This convention-over-configuration approach means that any developer familiar with one Ferrum package can immediately navigate any other. The <b>tsconfig.json</b> at each package root extends a shared base configuration from <b>@ferrum/tsconfig</b>, ensuring consistent compiler settings across the entire monorepo while allowing per-package overrides when necessary."))
story.append(code("""ferrum/
  apps/            docs/ website/ playground/ studio/ ai/ cloud/ examples/
  packages/        core/ motion/ components/ utilities/ icons/ tokens/
                   themes/ animations/ adapters/ cli/ config/
                   eslint-config/ tsconfig/ build/ testing/
                   analytics/ accessibility/ devtools/
  frameworks/      react/ next/ vue/ nuxt/ angular/ svelte/
                   solid/ astro/ remix/ laravel/ django/
  platforms/       flutter/ react-native/ swift/ android/
  plugins/         vscode/ figma/
  tools/           generators/ codemods/ migration/
  scripts/         .github/  docs/
  turbo.json       pnpm-workspace.yaml  package.json"""))

# ────────── SECTION 4: DOMAIN BOUNDARIES ──────────
story.append(h1("4. Domain Boundaries"))
story.append(p("Domain boundaries define the conceptual ownership and responsibility of each package. A domain boundary means that a package has a single, well-defined concern, exposes a stable public API, and hides its internal implementation. Changes within a domain should never require changes in another domain unless the public API contract changes. This principle, drawn from Domain-Driven Design, ensures that teams can work autonomously on different packages without stepping on each other's toes."))
story.append(p("The core domains are as follows. The <b>Styling domain</b> (@ferrum/core) owns CSS class generation, effect application, and stylesheet output. The <b>Token domain</b> (@ferrum/tokens) owns the design token lifecycle: definition, validation, transformation, and distribution across all output formats. The <b>Motion domain</b> (@ferrum/motion) owns animation primitives, easing functions, orchestration, and GPU-accelerated runtime. The <b>Component domain</b> (@ferrum/components) owns the Web Component definitions that serve as the interoperability layer. The <b>Theme domain</b> (@ferrum/themes) owns theme creation, switching, persistence, and dark/light mode management. The <b>Tooling domain</b> (@ferrum/cli, @ferrum/build) owns the developer experience: scaffolding, building, analyzing, and migrating."))
story.append(p("The key architectural decision here is that domain boundaries are enforced through dependency discipline rather than physical isolation. In a microservices architecture, domains would be separate services communicating over networks. In our modular monolith, domains are separate packages communicating through well-defined TypeScript interfaces. This gives us the benefits of domain isolation (independent development, clear ownership, testable boundaries) without the operational complexity of distributed systems. The transition from monolith to distributed packages, if ever needed, becomes a mechanical process of extracting a package into its own repository with its own CI/CD pipeline."))

# ────────── SECTION 5: PUBLIC APIs ──────────
story.append(h1("5. Public APIs"))
story.append(p("Every Ferrum package exposes a carefully designed public API through the <b>package.json exports</b> field. This is the single entry point for consumers and the contract that governs semantic versioning. Internal modules are never exposed; they exist only within the package's <b>src/</b> directory and are inaccessible to external consumers. This distinction between public and internal APIs is enforced by the build system: only exported paths are included in the published package, and only exported paths generate type declarations."))
story.append(p("The public API design follows the principle of progressive disclosure. The primary export of each package provides the most common functionality with sensible defaults. Subpath exports (e.g., <b>@ferrum/core/effects</b>, <b>@ferrum/core/presets</b>) provide specialized functionality for advanced use cases. This means that a new developer can accomplish 90% of tasks by importing from the package root, while power users can access deeper APIs through explicit subpath imports. The TypeScript type system serves as the machine-readable API documentation, with every exported function, type, and interface fully typed and documented with JSDoc comments."))

story.append(make_table(
    ["Package", "Primary Export", "Subpath Exports", "Key Types"],
    [
        ["@ferrum/core", "applyEffects(), FerrumConfig", "effects/, presets/, plugins/", "FerrumConfig, EffectDefinition"],
        ["@ferrum/tokens", "createTheme(), getToken()", "colors/, spacing/, typography/", "TokenSet, ThemeConfig"],
        ["@ferrum/motion", "animate(), stagger()", "easings/, orchestration/", "AnimationConfig, Timeline"],
        ["@ferrum/components", "FerrumButton, FerrumCard", "layout/, feedback/, data/", "ComponentProps, SlotMap"],
        ["@ferrum/cli", "ferrum init/add/doctor", "commands/, prompts/", "CLIOptions, CommandResult"],
        ["@ferrum/react", "Button, Card, useTheme()", "hooks/, server/", "ReactComponentProps"],
    ],
    [AW*0.15, AW*0.25, AW*0.28, AW*0.32]
))
story.append(p("Table 1: Public API Surface by Package", sCaption))

# ────────── SECTION 6: INTERNAL APIs ──────────
story.append(h1("6. Internal APIs"))
story.append(p("Internal APIs are the interfaces that packages use to communicate with each other within the monorepo. These are not published to npm and are not subject to semantic versioning guarantees. However, they are still typed and documented because they form the integration surface between domains. Internal APIs are defined in each package's <b>src/internal/</b> directory and are marked with an <b>@internal</b> JSDoc tag that prevents them from appearing in generated documentation."))
story.append(p("The most important internal API is the <b>Plugin Host Interface</b>, which defines how the core engine communicates with plugins. This interface consists of a set of strongly-typed hooks (beforeBuild, afterTransform, tokenGenerated, etc.) and a context object that plugins can use to read and modify the build state. The Plugin Host is implemented using a lightweight dependency injection container that resolves plugin dependencies at activation time, ensuring that plugins remain loosely coupled to the core."))
story.append(p("Another critical internal API is the <b>Token Transformer Pipeline</b>, which defines how design tokens flow from their source JSON definitions through a series of transformation steps (alias resolution, format conversion, validation) to their final output formats. This pipeline is designed as a chain of pure functions, each accepting a token set and returning a transformed token set. This functional approach makes the pipeline trivially testable, easy to extend with new transformation steps, and simple to debug by inspecting the intermediate state at each step."))
story.append(p("The <b>Build Orchestration API</b> is the internal interface that Turborepo uses to coordinate builds across packages. Each package exports a <b>build()</b> function that returns a build manifest describing its inputs, outputs, and dependencies. Turborepo reads these manifests to compute the optimal build order and to determine which packages can be skipped when their inputs haven't changed. This API is what enables the dramatic CI performance improvements that a monorepo provides."))

# ────────── SECTION 7: BUILD PIPELINE ──────────
story.append(h1("7. Build Pipeline"))
story.append(p("The build pipeline is a five-stage process: Source Input, Transform, Optimize, Package, and Validate. Each stage has a single responsibility and produces well-defined artifacts that the next stage consumes. This pipeline is executed independently for each package by Turborepo, with parallelism across packages that have no interdependencies. The entire pipeline is orchestrated by a shared build configuration in <b>@ferrum/build</b>, ensuring consistency across all 30+ packages while allowing per-package customization through a <b>ferrum.build.ts</b> configuration file."))
story.append(p("In the Source Input stage, the build system collects all source files: TypeScript/TSX source code, CSS/SCSS stylesheets, design token JSON definitions, and SVG icon sources. These are read from the package's <b>src/</b> directory and from any configured external sources (e.g., token files imported from a design system repository). The Transform stage compiles TypeScript to JavaScript using either esbuild (for speed) or tsc (when preserving type information is critical), processes CSS through PostCSS with the Lightning CSS engine for maximum speed, generates multi-format token outputs using Style Dictionary, and optimizes SVG icons into an icon sprite."))
story.append(p("The Optimize stage performs tree shaking via Rollup to eliminate dead code, code splitting to create minimal ESM bundles, CSS minification via cssnano, and marks packages with the <b>sideEffects: false</b> flag to enable downstream consumers to perform their own tree shaking. The Package stage generates subpath exports, source maps, TypeScript declaration files, and the final <b>package.json</b> with explicit <b>exports</b> entries. Finally, the Validate stage runs bundle size checks against configured budgets, type safety verification, linting, and unit tests. If any validation step fails, the build is aborted and the developer receives actionable error messages."))
story.append(KeepTogether([img('diagram-build.png', AW, 180), p("Figure 3: Five-Stage Build Pipeline", sCaption)]))

# ────────── SECTION 8: RELEASE STRATEGY ──────────
story.append(h1("8. Release Strategy"))
story.append(p("Ferrum follows an automated release strategy powered by semantic-release. When changes land on the <b>main</b> branch, the CI pipeline analyzes the commit messages (following the Conventional Commits specification) to determine the appropriate version bump: a <b>feat:</b> commit triggers a minor version, a <b>fix:</b> commit triggers a patch version, and a <b>feat!:</b> or <b>BREAKING CHANGE:</b> footer triggers a major version. This automation eliminates the human error inherent in manual versioning and ensures that the changelog is always accurate and complete."))
story.append(p("Each package is versioned independently. When a change in <b>@ferrum/core</b> triggers a version bump, only that package and any packages that directly depend on it are republished. This independent versioning is critical for a monorepo with 30+ packages because it means that a typo fix in documentation does not trigger a cascade of version bumps across the entire ecosystem. Turborepo's dependency graph is used to compute the transitive closure of affected packages, and only those packages are built, tested, and published."))
story.append(p("In addition to stable releases, Ferrum publishes canary builds on every commit to the <b>main</b> branch. Canary versions use the format <b>@ferrum/pkg@1.0.0-canary.20240101120000</b>, where the suffix includes a timestamp. This allows early adopters to test the latest changes before they reach stable. Canary builds are published to npm with a <b>canary</b> dist-tag, making them installable via <b>npm install @ferrum/core@canary</b> without affecting stable installations."))
story.append(p("Preview deployments are generated for every pull request using Vercel. Each PR gets a unique preview URL where reviewers can see the documentation site, playground, and any other affected applications running with the proposed changes. This dramatically reduces the feedback loop: instead of checking out a branch and running a local development server, reviewers can simply click a link. Preview deployments are automatically cleaned up when the PR is closed or merged."))

# ────────── SECTION 9: VERSIONING STRATEGY ──────────
story.append(h1("9. Versioning Strategy"))
story.append(p("Ferrum strictly follows Semantic Versioning 2.0.0 (SemVer). Every published package has a version number of the form <b>MAJOR.MINOR.PATCH</b>. Major version zero (0.x.x) indicates initial development where anything may change at any time. Once the API stabilizes, the major version will be bumped to 1.0.0, at which point the backward compatibility contract becomes binding: a patch version bump must not change the public API, a minor version bump may add new APIs but must not change or remove existing ones, and a major version bump may make breaking changes."))
story.append(p("The versioning strategy extends beyond simple SemVer through the concept of <b>package peer dependency ranges</b>. Framework adapter packages (e.g., @ferrum/react) declare peer dependencies on their framework (e.g., react >= 17.0.0) rather than bundling the framework. This means that a single version of @ferrum/react can work with multiple versions of React, as long as the React version falls within the declared range. The trade-off is that consumers must install the peer dependency themselves, but this is the standard pattern for libraries in the React ecosystem and is well-understood by developers."))
story.append(p("Deprecation is handled through a structured process. When an API is to be removed, it is first marked as <b>@deprecated</b> in the JSDoc documentation and a console warning is emitted at runtime. The deprecated API continues to function for at least two minor versions before being removed in the next major version. This gives consumers ample time to migrate. A codemod tool is provided for every deprecation, automating the migration in most cases. The deprecation policy is documented in CONTRIBUTING.md and enforced by a custom ESLint rule that prevents removing an API without going through the deprecation process."))

# ────────── SECTION 10: MIGRATION STRATEGY ──────────
story.append(h1("10. Migration Strategy"))
story.append(p("Migrations between major versions are supported through a combination of automated codemods, detailed migration guides, and a dedicated <b>ferrum migrate</b> CLI command. The CLI command analyzes the consumer's codebase, identifies usages of deprecated or changed APIs, and applies the appropriate transformations automatically. For cases that cannot be automated (such as semantic changes that require human judgment), the CLI outputs a detailed report listing each file and line that needs manual review."))
story.append(p("The migration tooling is built on AST-based codemod technology (using jscodeshift for JavaScript/TypeScript and postcss for CSS transformations). This approach is fundamentally more reliable than regex-based find-and-replace because it understands the syntactic structure of the code. For example, a codemod that renames a function can distinguish between the function being called, the function being referenced as a value, and a different function that happens to have a similar name. The codemod system is extensible: each package can define its own migration scripts that are automatically discovered and executed by the CLI."))
story.append(p("For enterprise teams managing large codebases, the migration strategy includes a <b>compatibility layer</b> that can be temporarily enabled. This layer re-exports old APIs by delegating to their new implementations, allowing teams to migrate incrementally rather than all at once. The compatibility layer is published as a separate package (e.g., <b>@ferrum/compat-v0</b>) that is explicitly opt-in and has a clear deprecation timeline. This approach, inspired by React's react-dom compatibility mode, ensures that no team is forced into a big-bang migration."))

# ────────── SECTION 11: TESTING ARCHITECTURE ──────────
story.append(h1("11. Testing Architecture"))
story.append(p("The testing architecture follows the testing pyramid model with eight distinct layers, each addressing a different concern and operating at a different level of abstraction. At the base of the pyramid, unit tests validate individual functions and classes in isolation using Vitest. These tests are fast (milliseconds), deterministic, and form the majority of the test suite. Every package is required to maintain a minimum of 90% code coverage, measured by line and branch coverage. The coverage threshold is enforced in CI and any PR that drops below the threshold is blocked from merging."))
story.append(p("Component tests sit above unit tests and validate the behavior of individual components (both Web Components and framework-specific components) in a simulated DOM environment. These tests use Testing Library, which encourages testing behavior rather than implementation details. A component test might verify that a button calls its onClick handler when clicked, that a modal traps focus correctly, or that a form displays validation errors when submitted with invalid data. These tests are slower than unit tests (tens of milliseconds) but still fast enough to run on every commit."))
story.append(p("Integration tests validate that multiple packages work together correctly. For example, an integration test might verify that a theme change in @ferrum/themes correctly propagates to components in @ferrum/components and tokens in @ferrum/tokens. Visual regression tests use Chromatic to render component snapshots and detect unintended visual changes. Accessibility tests use axe-core to audit every component against WCAG 2.1 AA criteria. Performance tests measure bundle size, render time, and animation frame rates against established budgets. Cross-browser tests validate rendering in Chrome, Firefox, Safari, and Edge. End-to-end tests use Playwright to validate complete user flows in the documentation site and playground."))

story.append(make_table(
    ["Test Type", "Tool", "Scope", "Speed", "Coverage Req."],
    [
        ["Unit", "Vitest", "Single function/class", "<1ms each", "90% min"],
        ["Component", "Testing Library", "Single component", "~10ms each", "Key paths"],
        ["Integration", "Vitest + DOM", "Multi-package", "~50ms each", "Critical flows"],
        ["Visual Regression", "Chromatic", "Component snapshots", "~500ms each", "All components"],
        ["Accessibility", "axe-core", "WCAG 2.1 AA", "~100ms each", "All components"],
        ["Performance", "Lighthouse + custom", "Bundle size, FPS", "~2s each", "Budget gates"],
        ["Cross-browser", "Playwright", "Chrome/Fx/Safari/Edge", "~3s each", "Top 4 browsers"],
        ["End-to-End", "Playwright", "Full user flows", "~5-30s each", "Critical paths"],
    ],
    [AW*0.15, AW*0.18, AW*0.22, AW*0.18, AW*0.15]
))
story.append(p("Table 2: Testing Pyramid - Eight Layers", sCaption))

# ────────── SECTION 12: CI/CD ARCHITECTURE ──────────
story.append(h1("12. CI/CD Architecture"))
story.append(p("The CI/CD pipeline is implemented entirely in GitHub Actions and orchestrated by Turborepo. Every push to any branch triggers the pipeline, but the behavior differs based on the branch. On feature branches, the pipeline runs all quality gates (type checking, linting, testing, bundle size checking, accessibility auditing, security scanning, and visual regression) and generates a preview deployment. On the main branch, the pipeline additionally runs the release process: version bumping, changelog generation, package publishing to npm, and deployment of production applications."))
story.append(p("Turborepo's incremental build feature is the cornerstone of CI performance. Turborepo computes a content hash for each package's inputs (source files, configuration, dependencies) and caches the build outputs in a remote cache (configured via Turborepo Remote Cache, backed by Vercel or a self-hosted solution). When a CI run starts, Turborepo checks the cache for each package and skips the build if the inputs haven't changed. In a typical PR that modifies one package, this means that 28 out of 30 packages are served from cache, reducing the total CI time from several minutes to under 30 seconds."))
story.append(p("Quality gates are enforced as CI checks that must all pass before a PR can be merged. The gates are: TypeScript type safety (tsc --noEmit with strict mode), ESLint + Prettier formatting, unit test coverage above 90%, bundle size within configured budgets (e.g., @ferrum/core < 15KB gzipped), accessibility audit with zero critical violations, security audit via npm audit and Snyk with zero high-severity vulnerabilities, and visual regression with zero unexpected changes. Each gate produces a clear, actionable error message when it fails, enabling developers to fix issues quickly."))
story.append(KeepTogether([img('diagram-cicd.png', AW, 260), p("Figure 4: CI/CD Pipeline Architecture", sCaption)]))

# ────────── SECTION 13: SECURITY ARCHITECTURE ──────────
story.append(h1("13. Security Architecture"))
story.append(p("Security is not an afterthought but a foundational design principle. The security architecture addresses supply chain protection, dependency management, runtime safety, and content security. Supply chain protection begins with package signing: every published package is signed with a GPG key, and consumers can verify the signature using npm's built-in verification. The CI pipeline runs npm audit and Snyk on every PR, blocking any merge that introduces a dependency with a known high-severity vulnerability. Dependabot is configured for automatic security updates, and a dedicated security policy documents the vulnerability disclosure process."))
story.append(p("Dependency management follows the principle of minimal surface area. Each package declares its dependencies explicitly in package.json, and the CI pipeline enforces that no implicit dependencies exist (i.e., every import must resolve to a declared dependency). Peer dependencies are used for framework packages to avoid version conflicts. Optional dependencies are used for features that are not needed by all consumers (e.g., @ferrum/core's PostCSS plugin is an optional dependency that is only installed when the consumer uses the PostCSS integration path)."))
story.append(p("Runtime security for the plugin system follows a sandboxing model. Plugins run in a restricted execution context that denies filesystem access, network access, and process spawning by default. If a plugin needs elevated permissions, it must declare them in its manifest and the user must explicitly grant them during installation. This is inspired by browser extension permission models and ensures that a malicious or compromised plugin cannot damage the consumer's system. Content Security Policy (CSP) guidance is provided in the documentation for applications that embed FerrumCSS via CDN, with recommended CSP headers that allow the FerrumCSS CDN domain while restricting other sources."))

# ────────── SECTION 14: PERFORMANCE STRATEGY ──────────
story.append(h1("14. Performance Strategy"))
story.append(p("The performance strategy targets a Lighthouse score of 100 across all categories. This is an aggressive target that requires disciplined engineering at every level of the stack. The primary performance lever is minimal output: the core CSS engine produces only the classes that the consumer actually uses, thanks to tree shaking and dead code elimination in the build pipeline. The published package of @ferrum/core has a budget of 15KB gzipped for the minimal import, with the full effects catalog loaded on demand via dynamic imports."))
story.append(p("Animation performance is achieved through GPU acceleration. All motion primitives use CSS transforms and opacity for animations, which are composited on the GPU and do not trigger layout or paint. The motion library provides a <b>will-change</b> management system that applies GPU hints just before an animation starts and removes them after it ends, preventing unnecessary GPU memory consumption. For complex animations that involve multiple elements, the library uses a requestAnimationFrame-based scheduler that batches DOM reads and writes to avoid layout thrashing."))
story.append(p("The design token system contributes to performance by enabling CSS custom property-based theming instead of JavaScript-driven style manipulation. Theme changes propagate through CSS variable updates, which the browser can optimize far more efficiently than JavaScript DOM mutations. Critical CSS is extracted at build time and inlined into the HTML document head, ensuring that the first paint is not blocked by a CSS download. For applications that use the full FerrumCSS catalog, a runtime loader with IntersectionObserver lazily loads effect stylesheets as elements enter the viewport, ensuring that the initial page load includes only the styles needed for above-the-fold content."))

story.append(make_table(
    ["Metric", "Target", "Measurement", "Enforcement"],
    [
        ["Core bundle (gzipped)", "< 15KB", "size-limit", "CI gate"],
        ["Full catalog load", "On-demand", "Dynamic import", "Architecture"],
        ["First Contentful Paint", "< 0.8s", "Lighthouse", "CI gate"],
        ["Lighthouse Performance", "100", "Lighthouse CI", "PR check"],
        ["Animation FPS", "60fps", "Chrome DevTools", "Test suite"],
        ["CSS output per page", "< 5KB", "Build analysis", "Bundle budget"],
        ["JS runtime overhead", "< 2KB", "size-limit", "CI gate"],
        ["Token CSS variables", "Zero runtime JS", "Architecture", "By design"],
    ],
    [AW*0.22, AW*0.18, AW*0.22, AW*0.18]
))
story.append(p("Table 3: Performance Budgets and Targets", sCaption))

# ────────── SECTION 15: PLUGIN ARCHITECTURE ──────────
story.append(h1("15. Plugin Architecture"))
story.append(p("The plugin architecture is built on a hook-based extension system inspired by Webpack's tapable and Vite's plugin API, but designed with stronger type safety and a clearer lifecycle model. Every plugin implements a standard interface: it has a name, a version, a set of hooks it subscribes to, an optional configuration schema (defined using Zod for runtime validation), and activate/deactivate lifecycle methods. Plugins are discovered by the build system through ferrum.config.ts declarations or by auto-discovery from the node_modules/@ferrum-plugin-* namespace."))
story.append(p("The hook system provides well-defined extension points throughout the build pipeline and runtime. Hooks include <b>beforeBuild</b> (called before the build starts, allowing plugins to add or modify source files), <b>afterTransform</b> (called after source transformation, allowing plugins to post-process generated code), <b>tokenGenerated</b> (called when design tokens are generated, allowing plugins to add custom token formats), <b>componentCreated</b> (called when a component is registered, allowing plugins to wrap or extend components), <b>themeApplied</b> (called when a theme is activated, allowing plugins to inject custom styles), <b>cliCommand</b> (called to register custom CLI commands), and <b>devServer</b> (called to modify the development server behavior)."))
story.append(p("The plugin host manages the complete lifecycle of plugins: discovery, validation, activation, execution, and deactivation. Plugins are loaded in a deterministic order based on their declared priority, with built-in plugins running first and third-party plugins running afterward. Each hook execution follows a waterfall model where plugins can modify the data passing through the hook, similar to Webpack's loader chain. The plugin host also provides a dependency injection container that allows plugins to access core services (token registry, component registry, logger) without directly importing from core packages, maintaining loose coupling."))
story.append(KeepTogether([img('diagram-plugin.png', AW, 250), p("Figure 5: Plugin Architecture - Interface, Host, and Discovery", sCaption)]))

# ────────── SECTION 16: AI INTEGRATION ARCHITECTURE ──────────
story.append(h1("16. AI Integration Architecture"))
story.append(p("Ferrum is designed from the ground up to be AI-toolable. This means that every API decision is made with the assumption that an AI agent (such as a coding assistant or design tool) will need to discover, understand, and use the API programmatically. The key to AI toolability is machine-readable metadata: every component, token, and utility function is annotated with structured metadata (descriptions, categories, tags, usage examples) that an AI agent can parse and reason about."))
story.append(p("The AI integration architecture has four layers. The <b>metadata layer</b> provides structured descriptions of every public API surface. This metadata is generated from JSDoc comments and TypeScript types at build time and published as a JSON artifact alongside each package. The <b>generation layer</b> provides APIs that AI agents can call to generate FerrumCSS code. For example, an AI agent can call the <b>generateEffect()</b> API to create a new CSS effect, the <b>generateTheme()</b> API to create a new theme, or the <b>generateComponent()</b> API to scaffold a new component with proper typing and accessibility attributes."))
story.append(p("The <b>transformation layer</b> provides codemod-style APIs for AI-driven code transformation. An AI agent can call the <b>transformCode()</b> API to convert a component from React to Vue, the <b>transformTheme()</b> API to migrate a theme from one version to another, or the <b>transformTokens()</b> API to refactor design tokens. These transformation APIs are the same ones used by the migration CLI, ensuring consistency between human-driven and AI-driven migrations. The <b>validation layer</b> provides APIs that AI agents can use to validate generated code before presenting it to the user, catching type errors, accessibility violations, and performance issues before they reach the developer."))
story.append(p("This architecture ensures that FerrumCSS can be deeply integrated into AI-powered tools like GitHub Copilot, Cursor, v0, and custom design-to-code systems. The metadata layer enables accurate code completion, the generation layer enables proactive code generation, the transformation layer enables intelligent refactoring, and the validation layer enables quality assurance. Together, these layers make FerrumCSS one of the most AI-friendly design systems available, a significant competitive advantage as AI-assisted development becomes the norm."))

# ────────── SECTION 17: FRAMEWORK ADAPTER ARCHITECTURE ──────────
story.append(h1("17. Framework Adapter Architecture"))
story.append(p("The framework adapter architecture is designed around a single principle: zero duplication of business logic. All visual behavior, styling logic, animation orchestration, and theme management live in the framework-agnostic core. Framework adapters are thin translation layers that expose this core functionality through the idiomatic API of their target framework. A React adapter wraps core Web Components in React wrappers with proper ref forwarding, useEffect cleanup, and Context integration. A Vue adapter creates SFC components that delegate to the same core Web Components. An Angular adapter creates standalone components with signal-based inputs."))
story.append(p("The adapter pattern is implemented through a shared <b>AdapterInterface</b> defined in TypeScript. This interface specifies the contract that every adapter must fulfill: it must provide a way to create component wrappers, a way to integrate with the framework's reactivity system, a way to handle server-side rendering, and a way to provide TypeScript types that match the framework's type system. The interface is intentionally minimal to keep adapters thin, but it is also extensible through optional capabilities that adapters can implement when their framework supports advanced features (like React Server Components or Vue's defineAsyncComponent)."))
story.append(p("Server-side rendering compatibility is a first-class concern for every adapter. Each adapter is tested with its framework's SSR solution (Next.js for React, Nuxt for Vue, Angular Universal for Angular, SvelteKit for Svelte) to ensure that components render correctly on the server without hydration mismatches. The core Web Components are designed to be SSR-safe: they register themselves lazily (only when the custom element is first encountered in the DOM) and use the Shadow DOM only for style encapsulation, not for rendering logic. This means that server-rendered HTML is valid, accessible, and progressively enhanced when JavaScript loads on the client."))
story.append(KeepTogether([img('diagram-adapter.png', AW, 230), p("Figure 6: Framework Adapter Architecture - Thin Wrappers over Core", sCaption)]))

# ────────── SECTION 18: DESIGN TOKEN ARCHITECTURE ──────────
story.append(h1("18. Design Token Architecture"))
story.append(p("Design tokens are the single source of truth for all visual properties in the Ferrum ecosystem. The architecture follows a three-layer model: primitive tokens define raw values (e.g., blue-500: #3B82F6), semantic tokens define intent-based aliases (e.g., color-primary: {blue-500}), and component tokens map semantic tokens to specific component properties (e.g., button-background: {color-primary}). This three-layer model ensures that changing a brand color requires updating only one primitive token, and the change propagates automatically to every component and every output format."))
story.append(p("The token pipeline is powered by Style Dictionary, an open-source build system for design tokens. Tokens are defined in a JSON format and transformed through a series of steps: alias resolution (replacing references like {color.primary} with their resolved values), format conversion (generating CSS custom properties, SCSS variables, TypeScript constants, Tailwind config extensions, Flutter ThemeData, SwiftUI colors, Android XML resources, and Figma variables), and validation (ensuring that all references resolve, that all tokens have the expected properties, and that deprecated tokens are flagged). The pipeline runs as part of the build process and can also be invoked independently via the CLI."))
story.append(p("The ESLint rule <b>no-hardcoded-values</b> enforces the token-first architecture at the code level. This rule detects any hardcoded color, spacing, typography, or animation value in component source code and suggests the equivalent token reference. This is a critical quality gate because even a single hardcoded value undermines the entire token system by creating a visual property that cannot be themed, transformed, or propagated across output formats. The rule is configurable per-package: the @ferrum/core package, which defines CSS effects, is exempt from this rule because it must produce concrete CSS values."))
story.append(KeepTogether([img('diagram-tokens.png', AW, 200), p("Figure 7: Design Token Architecture - Source of Truth to Multi-Format Output", sCaption)]))

# ────────── SECTION 19: ENTERPRISE SCALABILITY STRATEGY ──────────
story.append(h1("19. Enterprise Scalability Strategy"))
story.append(p("Enterprise adoption requires that FerrumCSS meet the standards that large engineering organizations demand: reliability, governance, support, and migration assistance. The enterprise scalability strategy addresses these concerns through four pillars: stability guarantees, governance tooling, professional support infrastructure, and migration tooling."))
story.append(p("Stability guarantees are enforced through a combination of semantic versioning, comprehensive testing (the eight-layer testing pyramid described in Section 11), and a formal deprecation policy. Breaking changes are never introduced in minor or patch releases. When a breaking change is necessary, it goes through a formal RFC (Request for Comments) process where the community can review and provide feedback before the change is implemented. The RFC process is inspired by React's RFC model and Rust's RFC model, both of which have proven effective at managing breaking changes in large, widely-adopted projects."))
story.append(p("Governance tooling enables enterprise teams to manage FerrumCSS adoption at scale. The <b>ferrum config lint</b> CLI command scans a codebase for FerrumCSS usage and reports on consistency, detecting patterns like mixed import styles, unused imports, and non-standard theme configurations. The <b>ferrum audit</b> command generates a comprehensive report of all FerrumCSS usage in a codebase, including dependency graphs, bundle size analysis, and accessibility coverage. These tools enable engineering managers to track adoption metrics and enforce coding standards across large teams."))
story.append(p("Professional support infrastructure includes a status page for real-time incident tracking, a dedicated GitHub Discussions forum for community support, and an enterprise support tier (planned) that provides SLA-backed response times, private security advisories, and dedicated engineering liaison. The FerrumCSS documentation is designed as a product in its own right, with interactive examples, API references, and migration guides that are tested alongside the code to ensure accuracy."))

# ────────── SECTION 20: RISK ANALYSIS ──────────
story.append(h1("20. Risk Analysis"))
story.append(p("Every architectural decision carries risk. The following analysis identifies the most significant risks to the Ferrum platform and the mitigation strategies for each. The risks are categorized by domain and assessed by likelihood and impact. The mitigation strategies are designed to reduce either the likelihood or the impact (or both) to an acceptable level."))

story.append(make_table(
    ["Risk", "Likelihood", "Impact", "Mitigation Strategy"],
    [
        ["Monorepo CI slowdown as package count grows", "Medium", "High", "Turborepo remote cache + incremental builds + parallel execution. Monthly CI performance audits."],
        ["Circular dependency introduction", "Medium", "High", "Custom ESLint rule + Turborepo topological sort enforcement + PR review checklist."],
        ["Framework adapter API drift", "Medium", "Medium", "Shared AdapterInterface contract + integration tests per adapter + automated API parity checks."],
        ["Design token format divergence", "Low", "High", "Single Style Dictionary pipeline + validation tests per output format + Figma plugin sync."],
        ["Plugin ecosystem quality", "Medium", "Medium", "Plugin review process + sandboxed execution + permission model + automated testing framework."],
        ["Breaking change backlash", "Low", "High", "RFC process + deprecation period (2 minor versions) + automated codemods + compatibility layer."],
        ["Performance regression", "Medium", "High", "Bundle size budgets as CI gates + Lighthouse CI + performance test suite + monthly benchmarks."],
        ["Supply chain attack", "Low", "Critical", "Package signing + npm audit + Snyk + Dependabot + minimal dependency tree + locked deps."],
        ["Developer onboarding friction", "Medium", "Medium", "ferrum init CLI + interactive docs + playground + VS Code extension + starter templates."],
        ["Platform adapter maintenance burden", "High", "Low", "Prioritize web frameworks first. Native platforms as community-contributed packages."],
    ],
    [AW*0.20, AW*0.10, AW*0.10, AW*0.60]
))
story.append(p("Table 4: Risk Analysis Matrix", sCaption))

story.append(p("The highest-impact risk is a supply chain attack, which is mitigated through a defense-in-depth strategy. Package signing ensures that published artifacts have not been tampered with. Automated dependency auditing catches known vulnerabilities before they enter the codebase. The minimal dependency philosophy reduces the attack surface. And the locked dependency strategy (using pnpm's strict lockfile mode) ensures reproducible installs. While no system can guarantee zero risk, this layered approach reduces the probability and impact of a supply chain compromise to an acceptable level for enterprise adoption."))
story.append(p("The most likely risk is platform adapter maintenance burden, as supporting Flutter, React Native, Swift, and Android alongside a dozen web frameworks creates a significant maintenance surface. The mitigation strategy is to prioritize web frameworks (where the vast majority of usage will occur) and to treat native platform adapters as community-contributed packages with official support from the core team. This approach, used successfully by libraries like Tailwind CSS (which focuses on web) and React Native for Web (which focuses on React), ensures that the core team's limited bandwidth is directed where it creates the most value."))

# ══════════════════════════════════════════════════════════════
# BUILD DOCUMENT
# ══════════════════════════════════════════════════════════════
def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Inter', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, 0.5*inch, "Ferrum Platform Architecture")
    canvas.drawRightString(W - MARGIN, 0.5*inch, f"Page {doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=0.9*inch,
    bottomMargin=0.8*inch,
    title="Ferrum Platform Architecture",
    author="Ferrum Engineering",
    subject="Comprehensive Architecture Document"
)

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(f"PDF built: {OUTPUT}")
print(f"Pages: {doc.page}")