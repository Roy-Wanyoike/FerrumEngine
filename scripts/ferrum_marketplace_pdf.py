#!/usr/bin/env python3
"""Ferrum Marketplace Architecture — ReportLab PDF Generator."""

import os, sys, hashlib
PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, "scripts"))
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, "scripts/pdf-gen"))

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, Flowable, HRFlowable,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus.doctemplate import SimpleDocTemplate

FONT_DIR = "/usr/share/fonts"

# Register fonts
pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', f'{FONT_DIR}/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', f'{FONT_DIR}/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Italic', f'{FONT_DIR}/truetype/english/Carlito-Italic.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-BoldItalic', f'{FONT_DIR}/truetype/english/Carlito-BoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuMono', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold', italic='Carlito-Italic', boldItalic='Carlito-BoldItalic')
pdfmetrics.registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')

# ━━ Cascade Palette (dark) ━━
PAGE_BG       = colors.HexColor('#141412')
SECTION_BG    = colors.HexColor('#161614')
CARD_BG       = colors.HexColor('#26241f')
TABLE_STRIPE  = colors.HexColor('#191815')
HEADER_FILL   = colors.HexColor('#605637')
COVER_BLOCK   = colors.HexColor('#373121')
BORDER        = colors.HexColor('#544d37')
ICON          = colors.HexColor('#beb393')
ACCENT        = colors.HexColor('#cdad4e')
ACCENT_2      = colors.HexColor('#46a3c2')
TEXT_PRIMARY   = colors.HexColor('#e3e2e0')
TEXT_MUTED     = colors.HexColor('#9b9993')
SEM_SUCCESS   = colors.HexColor('#6db986')
SEM_WARNING   = colors.HexColor('#bea46e')
SEM_ERROR     = colors.HexColor('#c2857f')
SEM_INFO      = colors.HexColor('#7ea1c3')

W, H = A4
OUTPUT = "/home/z/my-project/download/Ferrum_Marketplace_Architecture.pdf"

# ─── Styles ─────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    'DarkBody', fontName='Carlito', fontSize=10, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=6,
))
styles.add(ParagraphStyle(
    'DarkBodyBold', fontName='Carlito-Bold', fontSize=10, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=6,
))
styles.add(ParagraphStyle(
    'H1', fontName='Carlito-Bold', fontSize=22, leading=28,
    textColor=ACCENT, spaceBefore=18, spaceAfter=10,
    borderWidth=0, borderPadding=0,
))
styles.add(ParagraphStyle(
    'H2', fontName='Carlito-Bold', fontSize=16, leading=22,
    textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=8,
))
styles.add(ParagraphStyle(
    'H3', fontName='Carlito-Bold', fontSize=12, leading=17,
    textColor=ACCENT, spaceBefore=10, spaceAfter=6,
))
styles.add(ParagraphStyle(
    'BulletFm', fontName='Carlito', fontSize=10, leading=16,
    textColor=TEXT_PRIMARY, leftIndent=18, bulletIndent=6, spaceAfter=4,
    alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    'CodeFm', fontName='DejaVuMono', fontSize=8.5, leading=13,
    textColor=SEM_INFO, backColor=colors.HexColor('#1a1a1a'),
    borderWidth=1, borderColor=colors.HexColor('#333333'),
    borderPadding=6, spaceAfter=8, spaceBefore=4,
))
styles.add(ParagraphStyle(
    'Caption', fontName='Carlito-Italic', fontSize=9, leading=13,
    textColor=TEXT_MUTED, spaceAfter=10, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    'TocH0', fontName='Carlito-Bold', fontSize=13, leading=20,
    textColor=TEXT_PRIMARY, leftIndent=0,
))
styles.add(ParagraphStyle(
    'TocH1', fontName='Carlito', fontSize=11, leading=18,
    textColor=TEXT_MUTED, leftIndent=18,
))

# ─── TocDocTemplate ────────────────────────────────────────────────────

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def add_heading(text, style, level=0):
    key = f'h_{hashlib.md5(text.encode()).hexdigest()[:8]}'
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

# ─── Helper: Table builder ─────────────────────────────────────────────

def make_table(headers, rows, col_widths=None):
    """Build a styled table with dark theme."""
    usable = W - 2 * 25 * mm
    n = len(headers)
    if col_widths is None:
        col_widths = [usable / n] * n

    data = [
        [Paragraph(h, ParagraphStyle('th', fontName='Carlito-Bold', fontSize=9, leading=13, textColor=colors.white, alignment=TA_CENTER)) for h in headers]
    ]
    for row in rows:
        data.append([
            Paragraph(str(c), ParagraphStyle('td', fontName='Carlito', fontSize=8.5, leading=13, textColor=TEXT_PRIMARY, alignment=TA_LEFT))
            for c in row
        ])

    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Carlito-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t

# ─── Build Document ────────────────────────────────────────────────────

story = []

# TOC
toc = TableOfContents()
toc.levelStyles = [styles['TocH0'], styles['TocH1']]
story.append(Paragraph('Table of Contents', ParagraphStyle('tocTitle', fontName='Carlito-Bold', fontSize=18, leading=24, textColor=ACCENT, spaceBefore=8, spaceAfter=12)))
story.append(toc)
story.append(PageBreak())

# ─── Chapter 1: Executive Summary ──────────────────────────────────────

story.append(add_heading('1. Executive Summary', styles['H1'], 0))

story.append(Paragraph(
    'Ferrum Marketplace is envisioned as the largest ecosystem for reusable interface intelligence — '
    'an "App Store for UI" that allows creators to publish, distribute, and monetize motion packs, '
    'design systems, AI prompts, industry templates, effects, themes, and components. Unlike traditional '
    'code registries (npm) or design asset stores (Figma Community), Ferrum Marketplace treats UI '
    'intelligence as a first-class asset category: packages that encode not just visual appearance, '
    'but behavioral semantics, accessibility constraints, performance budgets, and device adaptation '
    'logic through the Ferrum UI Compiler intermediate representation (UI-IR).',
    styles['DarkBody']
))

story.append(Paragraph(
    'This architecture document synthesizes research from five established marketplace ecosystems — '
    'Unreal/Fab, Unity Asset Store, Figma Community, npm, and VS Code Marketplace — to propose a '
    'marketplace design that combines the best creator economics of Fab (88/12 revenue split), the '
    'quality control rigor of Unity (pre-submission validation suite), the social discovery of Figma '
    '(likes, collections, creator profiles), the technical architecture of npm (scoped packages, SemVer, '
    'CLI workflow), and the automated security scanning of VS Code. The result is a three-gate quality '
    'system, a tiered 80-90% creator revenue share, and a CLI-first publishing experience powered by '
    'the .fer package format with a centralized registry, search, and delivery infrastructure.',
    styles['DarkBody']
))

story.append(Paragraph(
    'The marketplace is designed to serve six primary industry verticals: Healthcare UI, Finance UI, '
    'AI Dashboards, Gaming Interfaces, Enterprise Systems, and a general-purpose category. Each vertical '
    'has unique regulatory, accessibility, and design requirements that the marketplace quality system '
    'enforces through domain-specific validation rules. The platform will support free and paid tiers, '
    'enterprise private marketplaces, and a promotional engine with editorial curation, trending algorithms, '
    'and seasonal events modeled after Fab\'s event sales system that drives approximately 75% of monthly '
    'revenue for participating creators.',
    styles['DarkBody']
))

# ─── Chapter 2: Competitive Landscape ──────────────────────────────────

story.append(add_heading('2. Competitive Landscape', styles['H1'], 0))
story.append(Paragraph(
    'The following table summarizes the key structural characteristics of five marketplace ecosystems '
    'that informed the Ferrum Marketplace design. Each platform was analyzed across six dimensions: '
    'creator economics, quality control, discovery mechanisms, technical architecture, creator experience, '
    'and the single most transferable innovation. The analysis reveals that no single platform has '
    'perfected all dimensions — each excels in one or two areas while struggling in others, creating a '
    'clear opportunity for Ferrum to synthesize the best patterns into a unified marketplace model.',
    styles['DarkBody']
))

story.append(Spacer(1, 6))
story.append(make_table(
    ['Platform', 'Assets', 'Creator Split', 'Review Model', 'Key Differentiator'],
    [
        ['Fab (Unreal)', '~100K+', '88/12', 'Manual + automated', 'Best creator economics'],
        ['Unity Store', '~123K+', '70/30', 'Validation suite', 'Pre-submission tooling'],
        ['Figma Community', '~50K+', '85/15', '5-21 day human', 'Social discovery'],
        ['npm', '2.5M+', 'Free (funding)', 'Automated + audit', 'SemVer + CLI workflow'],
        ['VS Code Marketplace', '~60K', 'Free', 'Automated scanning', 'Security + query API'],
    ],
    [28*mm, 22*mm, 28*mm, 32*mm, 45*mm],
))
story.append(Paragraph('Table 1: Marketplace Ecosystem Comparison', styles['Caption']))

# ─── Chapter 3: Marketplace Architecture ────────────────────────────────

story.append(add_heading('3. Marketplace Architecture', styles['H1'], 0))

story.append(add_heading('3.1 Package Format: .fer', styles['H2'], 1))
story.append(Paragraph(
    'Every asset published to Ferrum Marketplace is packaged as a <b>.fer</b> file — a gzipped tar '
    'archive containing a <b>ferrum.json</b> manifest, source files, compiled outputs, and metadata. '
    'This format is directly analogous to npm\'s tarball format (.tgz) but extended with UI-specific '
    'metadata fields that the Ferrum UI Compiler can consume. The manifest is the single source of '
    'truth for the package\'s identity, dependencies, capabilities, and compatibility constraints.',
    styles['DarkBody']
))

story.append(Paragraph('<b>ferrum.json manifest structure:</b>', styles['DarkBodyBold']))
story.append(Paragraph(
    'name (scoped: @creator/package), version (SemVer), description, author, license, '
    'ferrumEngine (min/max version), categories (array from taxonomy), '
    'assets (components, motion-packs, effects, themes, prompts, templates, design-systems), '
    'dependencies (other .fer packages), peerDependencies (framework: react, vue, etc.), '
    'keywords, industry (healthcare, finance, ai, gaming, enterprise), '
    'accessibility (wcag level, reduced-motion support), performance (gpu tier, bundle size budget), '
    'exports (entry points for each supported framework), '
    'repository, homepage, bugs, funding',
    styles['Bullet']
))

story.append(add_heading('3.2 Registry Infrastructure', styles['H2'], 1))
story.append(Paragraph(
    'The registry follows npm\'s battle-tested architecture: a PostgreSQL database for package metadata, '
    'S3-compatible object storage for .fer tarballs, Redis for caching and rate limiting, and Meilisearch '
    'for full-text search with typo tolerance and faceted filtering. The registry exposes a REST API '
    'compatible with the npm registry API format (GET /package/name, PUT /package/name, search endpoints), '
    'enabling ecosystem tooling and IDE integrations from day one. A dedicated CDN (CloudFlare or Fastly) '
    'handles package download delivery with edge caching, ensuring sub-100ms download latency globally.',
    styles['DarkBody']
))

story.append(Paragraph(
    'The registry supports scoped namespacing (@creator/package) to prevent name collisions and establish '
    'brand identity. Verified publishers (completed identity verification, passed quality audit) receive '
    'a verified badge and enhanced revenue share (90% instead of 80%). The registry enforces strict '
    'SemVer (Semantic Versioning 2.0.0) with automated compatibility analysis — when a major version '
    'bump is detected, dependent packages are notified and breaking changes are highlighted in search results.',
    styles['DarkBody']
))

story.append(add_heading('3.3 CLI-First Publishing', styles['H2'], 1))
story.append(Paragraph(
    'The primary publishing workflow is CLI-driven, following npm\'s proven developer experience. '
    'Creators authenticate with <b>ferrum login</b>, prepare their package with <b>ferrum init</b> '
    '(scaffolds ferrum.json), validate locally with <b>ferrum validate</b> (runs the three-gate '
    'quality system client-side), and publish with <b>ferrum publish</b>. The validate command is '
    'directly inspired by Unity\'s Asset Store Validation Suite — it catches formatting errors, '
    'missing metadata, accessibility violations, and performance regressions before submission, '
    'reducing review turnaround time and rejection rates.',
    styles['DarkBody']
))

# ─── Chapter 4: Revenue Model ──────────────────────────────────────────

story.append(add_heading('4. Creator Economy Model', styles['H1'], 0))

story.append(add_heading('4.1 Revenue Sharing', styles['H2'], 1))
story.append(Paragraph(
    'Ferrum Marketplace adopts a tiered revenue sharing model that rewards quality and consistency. '
    'The base split is 80/20 (creator/platform), but verified publishers who maintain a quality score '
    'above 4.0 and have published at least 5 packages earn an enhanced 90/10 split — the most '
    'creator-friendly rate in any UI asset marketplace. This model is directly inspired by Fab\'s '
    'landmark 88/12 split, which established Fab as the most creator-friendly marketplace in gaming '
    'and drove massive creator adoption. For enterprise private marketplaces, the model shifts to a '
    'subscription-based approach: organizations pay a monthly platform fee per seat, and internal '
    'creators receive recognition and rewards through an internal point system.',
    styles['DarkBody']
))

story.append(Spacer(1, 4))
story.append(make_table(
    ['Tier', 'Creator Share', 'Requirements', 'Benefits'],
    [
        ['Standard', '80%', 'Account + first package', 'Full analytics, community support'],
        ['Verified', '90%', '5+ packages, quality 4.0+', 'Verified badge, priority review'],
        ['Enterprise', 'Custom', 'Organization account', 'Private registry, SLA, SSO'],
        ['Promoted', '80% + bonus', 'Editorial selection', 'Homepage placement, newsletter feature'],
    ],
    [22*mm, 28*mm, 48*mm, 55*mm],
))
story.append(Paragraph('Table 2: Revenue Sharing Tiers', styles['Caption']))

story.append(add_heading('4.2 Pricing Model', styles['H2'], 1))
story.append(Paragraph(
    'Creators set their own prices for paid assets, with a minimum of $2.99 and a recommended range of '
    '$4.99-$49.99 for individual packages and $29.99-$299.99 for bundles and industry templates. The '
    'marketplace supports one-time purchases, subscription access (for design systems and motion packs '
    'that receive ongoing updates), and enterprise site licenses. Free packages are encouraged as '
    'lead generation — following Fab\'s "limited-time free assets" strategy, creators can offer '
    'packages as free for a promotional period to build audience and reviews before switching to paid. '
    'The platform also runs seasonal events (similar to Steam sales) where creators can opt in to '
    'offer discounts of 25-75%, with the platform matching the discount by reducing its commission.',
    styles['DarkBody']
))

# ─── Chapter 5: Quality Control ────────────────────────────────────────

story.append(add_heading('5. Quality Control Framework', styles['H1'], 0))

story.append(Paragraph(
    'Quality control is the most critical differentiator for a UI intelligence marketplace — unlike '
    'game assets or code packages, UI components are installed directly into user-facing products, '
    'where bugs, accessibility violations, and performance regressions have immediate business impact. '
    'Ferrum Marketplace implements a three-gate quality system inspired by Unity\'s validation suite, '
    'Figma\'s human review process, and VS Code\'s automated security scanning.',
    styles['DarkBody']
))

story.append(add_heading('5.1 Gate 1: Automated Validation (ferrum validate)', styles['H2'], 1))
story.append(Paragraph(
    'Every package must pass client-side automated validation before submission. The <b>ferrum validate</b> '
    'command runs a comprehensive test suite that checks: manifest schema compliance (all required fields '
    'present and correctly typed), file structure conventions (consistent naming, no hardcoded paths, '
    'proper .fer packaging), TypeScript/ CSS compilation (zero type errors, zero warnings), accessibility '
    'audit (WCAG 2.1 AA color contrast, focus management, ARIA completeness, reduced-motion support), '
    'performance benchmarks (CSS bundle size under budget, no layout thrashing properties, GPU tier '
    'compatibility rating), and security scan (no eval(), no external network requests, no access to '
    'dangerous Web APIs without user consent). This gate catches approximately 80% of common issues '
    'before human review, dramatically reducing reviewer workload and turnaround time.',
    styles['DarkBody']
))

story.append(add_heading('5.2 Gate 2: Human Review (48-72 hours)', styles['H2'], 1))
story.append(Paragraph(
    'Packages that pass automated validation enter a human review queue staffed by Ferrum\'s quality '
    'team. Reviewers verify: visual quality and design consistency (screenshots match actual output, '
    'responsive behavior verified across breakpoints), code quality (clean abstractions, proper error '
    'handling, framework-agnostic patterns), documentation completeness (usage examples, API reference, '
    'migration guide for breaking changes), intellectual property compliance (no trademarked assets, '
    'proper license attribution for dependencies), and category placement accuracy. Reviewers use a '
    'standardized scorecard with 12 criteria, each scored 1-5. Packages scoring below 3.0 on any '
    'criterion are rejected with specific feedback. The target turnaround is 48 hours for standard '
    'packages and 24 hours for verified publishers.',
    styles['DarkBody']
))

story.append(add_heading('5.3 Gate 3: Continuous Community Scoring', styles['H2'], 1))
story.append(Paragraph(
    'After publication, every package receives ongoing quality scoring from three signals: user ratings '
    '(1-5 stars, verified purchasers only — inspired by Unity\'s verified review system to prevent '
    'rating manipulation), automated health checks (re-run validation suite weekly on latest version, '
    'flag regressions), and dependency compatibility tracking (alert when peer dependency updates break '
    'the package). Packages whose quality score drops below 2.5 for 30 consecutive days receive a '
    '"quality warning" badge and are deprioritized in search results. Packages below 2.0 for 60 days '
    'are automatically delisted with a 30-day appeal window. This continuous quality enforcement ensures '
    'the marketplace maintains a high quality floor without requiring manual curation of every package.',
    styles['DarkBody']
))

# ─── Chapter 6: Discovery & Search ─────────────────────────────────────

story.append(add_heading('6. Discovery and Search', styles['H1'], 0))

story.append(Paragraph(
    'Discovery is the primary growth lever for any marketplace. Ferrum Marketplace combines four '
    'discovery mechanisms: AI-powered semantic search, social signals, editorial curation, and '
    'algorithmic ranking. Semantic search (inspired by Figma\'s AI-powered plugin search) understands '
    'natural language queries like "healthcare dashboard with dark mode and accessible charts" and '
    'matches against package metadata, code analysis, and usage patterns. Social signals include '
    'install counts, ratings, creator followers (Figma-style creator profiles with follow system), '
    'and user collections/bookmarks. Editorial curation produces "Staff Picks," "Industry Essentials," '
    'and seasonal collections (modeled after Unity\'s "Essentials" program). The ranking algorithm '
    'weights recency, quality score, install velocity, and relevance to produce personalized results.',
    styles['DarkBody']
))

story.append(Spacer(1, 4))
story.append(make_table(
    ['Category', 'Subcategories', 'Example Assets'],
    [
        ['Components', 'Cards, Forms, Navigation, Modals, Data Tables', 'Healthcare Patient Card, Finance Trade Form'],
        ['Motion Packs', 'Entrance, Hover, Scroll, Attention, Loading', 'Cinematic Page Transitions, Micro-Interaction Set'],
        ['Design Systems', 'Full Systems, Color, Typography, Spacing', 'Healthcare Design System (WCAG AAA)'],
        ['Industry Templates', 'Dashboard, Landing, Admin, Portal', 'AI Model Monitoring Dashboard'],
        ['AI Prompts', 'Generation, Refinement, Analysis', 'Generate Accessible Form from Sketch'],
        ['Themes', 'Light, Dark, Brand, Seasonal', 'Fintech Dark Pro, Healthcare Light'],
        ['Effects', 'Visual FX, Filters, Borders, Cursor', 'Glass Morphism Pack, Neon Border Collection'],
    ],
    [30*mm, 50*mm, 73*mm],
))
story.append(Paragraph('Table 3: Asset Category Taxonomy', styles['Caption']))

# ─── Chapter 7: Industry Verticals ─────────────────────────────────────

story.append(add_heading('7. Industry Verticals', styles['H1'], 0))

story.append(Paragraph(
    'Ferrum Marketplace is designed from the ground up to serve specialized industry verticals, '
    'each with unique regulatory, accessibility, and design requirements that the quality control '
    'framework enforces through domain-specific validation rules. This vertical-first approach is '
    'a key differentiator from general-purpose marketplaces like npm, where a healthcare component '
    'and a gaming UI component are treated identically despite having vastly different quality requirements.',
    styles['DarkBody']
))

story.append(add_heading('7.1 Healthcare UI', styles['H2'], 1))
story.append(Paragraph(
    'Healthcare UI packages must pass enhanced accessibility validation: WCAG 2.1 AA minimum (AAA '
    'recommended), FDA 21 CFR Part 11 compliance hints (audit trail patterns, electronic signature '
    'flows), HIPAA-ready data handling patterns (no PHI in component state, secure input masking), '
    'and clinical workflow awareness (critical action confirmation, status color coding following '
    'medical standards). Packages in this vertical are reviewed by reviewers with healthcare domain '
    'expertise, ensuring that color choices, terminology, and interaction patterns are clinically '
    'appropriate. Example packages: Patient Dashboard Template, Vital Signs Chart Component, EHR '
    'Navigation System, Clinical Decision Support Alert Component.',
    styles['DarkBody']
))

story.append(add_heading('7.2 Finance UI', styles['H2'], 1))
story.append(Paragraph(
    'Finance UI packages must demonstrate: real-time data handling patterns (WebSocket integration '
    'patterns, efficient DOM updates for streaming data), precision formatting (correct number '
    'localization, currency symbol placement, significant digit handling), security awareness '
    '(no sensitive data in component props, masked input patterns, session timeout UI), and '
    'regulatory compliance hints (MiFID II, Dodd-Frank disclosure patterns, GDPR data minimization). '
    'The marketplace quality system enforces that finance components include proper number formatting '
    'tests and keyboard navigation for all interactive elements, as finance professionals are '
    'power keyboard users who expect tab navigation through trade forms and data grids.',
    styles['DarkBody']
))

story.append(add_heading('7.3 AI Dashboards', styles['H2'], 1))
story.append(Paragraph(
    'AI Dashboard packages are the fastest-growing vertical and require: model performance visualization '
    '(loss curves, confusion matrices, feature importance displays), real-time inference monitoring '
    '(latency indicators, throughput counters, error rate sparklines), data pipeline status displays '
    '(ETL pipeline health, data freshness indicators), and experiment tracking UI components (A/B '
    'test result comparison, hyperparameter search visualization). These packages integrate with '
    'the Ferrum UI Compiler to automatically adapt their motion quality based on the user\'s device '
    'capabilities — a complex dashboard with 50+ charts will reduce to minimal motion on a '
    'low-end device to maintain 60fps interaction responsiveness.',
    styles['DarkBody']
))

story.append(add_heading('7.4 Gaming Interfaces', styles['H2'], 1))
story.append(Paragraph(
    'Gaming Interface packages push the boundaries of what\'s possible with CSS and the Ferrum effect '
    'library. They require: WebGL integration patterns (game canvas overlay UI, HUD components that '
    'respond to game state), high-performance animation (60fps minimum, GPU-composited properties '
    'only, minimal layout recalculation), immersive design patterns (fullscreen layouts, custom cursor '
    'effects, audio-visual synchronization), and accessibility overlays (subtitles, colorblind modes, '
    'input remapping UI). The Ferrum UI Compiler\'s device capability adaptation is particularly '
    'valuable here — a gaming UI package can declare "targets GPU tier 2+" and the compiler will '
    'automatically generate CSS fallbacks for tier 1 devices or Canvas/WebGL backends for tier 3.',
    styles['DarkBody']
))

story.append(add_heading('7.5 Enterprise Systems', styles['H2'], 1))
story.append(Paragraph(
    'Enterprise System packages serve internal tools, admin panels, and B2B SaaS interfaces. They '
    'require: role-based access control UI patterns (permission-aware component variants, RBAC '
    'visualization), data governance displays (data lineage, access audit logs, compliance dashboards), '
    'enterprise theming support (white-label ready, brand customization API, multi-tenant theme '
    'switching), and internationalization (i18n-ready components, RTL support, locale-aware formatting). '
    'Enterprise packages are the primary revenue drivers for the marketplace\'s private registry '
    'feature — organizations can host a private Ferrum Marketplace instance with curated packages '
    'tailored to their tech stack, design system, and compliance requirements.',
    styles['DarkBody']
))

# ─── Chapter 8: Developer Experience ────────────────────────────────────

story.append(add_heading('8. Developer Experience', styles['H1'], 0))

story.append(Paragraph(
    'The developer experience is designed to be frictionless from discovery to production deployment. '
    'The journey begins with search — a developer types "accessible healthcare form with validation" '
    'into the marketplace search, which returns ranked results with live previews, compatibility '
    'badges, and one-click install buttons. Installation is a single CLI command: '
    '<b>ferrum add @mayoclinic/patient-form</b>, which downloads the .fer package, extracts it to '
    'node_modules, and generates framework-specific imports. For React projects, this produces '
    'TypeScript components with full type definitions; for Vue, it generates SFC files with composition '
    'API; for plain CSS, it generates a stylesheet with BEM-style class names.',
    styles['DarkBody']
))

story.append(Paragraph(
    'Post-installation, the Ferrum UI Compiler automatically processes installed packages during the '
    'build step. When a developer writes a Ferrum intent like <b>&lt;Card motion="premium" '
    'material="glass"/&gt;</b>, the compiler checks if the project has installed a motion pack that '
    'provides a "premium" quality definition, and if so, uses the packaged effect definitions instead '
    'of the defaults. This creates a seamless pipeline from marketplace discovery to compiled output, '
    'where the compiler acts as the intelligent middleware between intent and rendering, automatically '
    'selecting the best installed effects, adapting to device capabilities, and enforcing accessibility '
    'and performance constraints — all without the developer writing a single line of CSS.',
    styles['DarkBody']
))

# ─── Chapter 9: Technical Architecture ──────────────────────────────────

story.append(add_heading('9. Technical Architecture', styles['H1'], 0))

story.append(add_heading('9.1 System Architecture', styles['H2'], 1))
story.append(Paragraph(
    'The marketplace backend follows a microservices architecture with four primary services: the '
    '<b>Registry Service</b> (package metadata CRUD, versioning, search indexing), the <b>Storage '
    'Service</b> (.fer tarball upload/download, CDN cache management), the <b>Review Service</b> '
    '(review queue management, scorecard processing, quality score computation), and the <b>Analytics '
    'Service</b> (install tracking, revenue reporting, usage telemetry). Services communicate via '
    'a message queue (Redis Streams or Apache Kafka) for event-driven workflows: package publish triggers '
    'validation, validation pass triggers review, review approval triggers indexing and CDN propagation.',
    styles['DarkBody']
))

story.append(Spacer(1, 4))
story.append(make_table(
    ['Service', 'Technology', 'Responsibility', 'SLA'],
    [
        ['Registry API', 'Node.js + Fastify', 'Package CRUD, search, auth', '99.9%'],
        ['Storage', 'AWS S3 + CloudFront', '.fer tarball hosting', '99.99%'],
        ['Search', 'Meilisearch', 'Full-text + semantic search', '99.9%'],
        ['Review', 'Node.js + BullMQ', 'Queue, scoring, notifications', '48hr turnaround'],
        ['Analytics', 'ClickHouse', 'Installs, revenue, usage', '24hr freshness'],
        ['CDN', 'CloudFlare', 'Global package delivery', '<100ms p95'],
        ['Auth', 'OAuth 2.0 + JWT', 'Publisher identity, tokens', '99.99%'],
        ['Payments', 'Stripe Connect', 'Creator payouts, purchases', 'T+7 payout'],
    ],
    [30*mm, 38*mm, 55*mm, 30*mm],
))
story.append(Paragraph('Table 4: Service Architecture Overview', styles['Caption']))

story.append(add_heading('9.2 Package Lifecycle', styles['H2'], 1))
story.append(Paragraph(
    'The package lifecycle follows a strict state machine: Draft (local, not submitted), Submitted '
    '(passed validate, in review queue), In Review (assigned to reviewer), Revisions Required '
    '(failed review, feedback provided), Published (live on marketplace), Deprecated (superseded by '
    'newer version), Delisted (quality score below threshold or creator request). Each state transition '
    'emits an event that triggers downstream actions — for example, Published triggers search re-indexing, '
    'CDN cache warming for the tarball, notification to followers, and analytics initialization. The '
    'state machine is persisted in PostgreSQL with audit logging for every transition, providing full '
    'traceability for dispute resolution and quality investigations.',
    styles['DarkBody']
))

# ─── Chapter 10: Roadmap ────────────────────────────────────────────────

story.append(add_heading('10. Roadmap', styles['H1'], 0))

story.append(Spacer(1, 4))
story.append(make_table(
    ['Phase', 'Timeline', 'Deliverables', 'Success Metric'],
    [
        ['Alpha', 'Q3 2025', 'Registry API, CLI, basic search, manual review', '100 packages, 50 creators'],
        ['Beta', 'Q4 2025', 'Automated validation, payments, analytics dashboard', '500 packages, 200 creators'],
        ['v1.0', 'Q1 2026', 'AI search, social features, enterprise private registries', '2K packages, 1K creators'],
        ['v2.0', 'Q2 2026', 'Industry verticals, curated collections, events engine', '5K packages, 5K creators'],
        ['v3.0', 'Q3 2026', 'AI-assisted creation, auto-packaging, cross-runtime', '10K packages, 10K creators'],
    ],
    [20*mm, 25*mm, 65*mm, 43*mm],
))
story.append(Paragraph('Table 5: Marketplace Roadmap', styles['Caption']))

story.append(Paragraph(
    'The roadmap prioritizes establishing the core infrastructure first (registry, CLI, review pipeline) '
    'before layering on discovery and social features. This mirrors npm\'s growth trajectory, where the '
    'technical foundation enabled organic ecosystem growth. The industry verticals expansion in v2.0 is '
    'the key differentiator — by providing domain-specific validation rules and curated collections for '
    'healthcare, finance, AI, gaming, and enterprise, the marketplace becomes the default destination '
    'for industry-specific UI intelligence, creating a moat that general-purpose marketplaces cannot '
    'easily replicate. The v3.0 vision of AI-assisted creation (where the Ferrum AI generates .fer '
    'packages from natural language descriptions) represents the long-term goal: a fully automated '
    'pipeline from intent to published, reviewed, and optimized UI intelligence assets.',
    styles['DarkBody']
))

# ─── Build ───────────────────────────────────────────────────────────────

doc = TocDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=25*mm,
    rightMargin=25*mm,
    topMargin=20*mm,
    bottomMargin=20*mm,
    title='Ferrum Marketplace Architecture',
    author='FerrumEngine',
    subject='Ecosystem marketplace for reusable interface intelligence assets',
)

from reportlab.platypus import PageTemplate, Frame

def dark_page_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAGE_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Accent bar at top
    canvas.setFillColor(ACCENT)
    canvas.rect(0, H - 3, W, 3, fill=1, stroke=0)
    # Footer
    canvas.setFillColor(TEXT_MUTED)
    canvas.setFont('Carlito', 7)
    canvas.drawString(25*mm, 12*mm, 'Ferrum Marketplace Architecture')
    canvas.drawRightString(W - 25*mm, 12*mm, f'Page {doc.page}')
    # Subtle bottom accent
    canvas.setFillColor(ACCENT)
    canvas.rect(25*mm, 10*mm, W - 50*mm, 0.5, fill=1, stroke=0)
    canvas.restoreState()

frame = Frame(25*mm, 20*mm, W - 50*mm, H - 40*mm, id='main')
template = PageTemplate(id='dark', frames=frame, onPage=dark_page_bg)
doc.addPageTemplates([template])

doc.multiBuild(story)
print(f"PDF generated: {OUTPUT} ({os.path.getsize(OUTPUT)/1024:.0f} KB)")