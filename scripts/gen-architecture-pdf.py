#!/usr/bin/env python3
"""
FerrumEngine Architecture Blueprint PDF Generator
Generates a comprehensive 25-35 page architecture document.
"""

import os
import sys
import hashlib
import subprocess
import tempfile
import platform

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm, cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable, CondPageBreak, Frame, PageTemplate
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfgen import canvas

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PATHS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PDF_SKILL_DIR = os.environ.get('PDF_SKILL_DIR', '/home/z/my-project/skills/pdf')
SCRIPTS_DIR = os.path.join(PDF_SKILL_DIR, 'scripts')
OUTPUT_PATH = '/home/z/my-project/download/ferrum-architecture-blueprint.pdf'
COVER_HTML = '/home/z/my-project/scripts/cover-architecture.html'

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CASCADE PALETTE (dark mode)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE_BG       = colors.HexColor('#151412')
SECTION_BG    = colors.HexColor('#23211e')
CARD_BG       = colors.HexColor('#252420')
TABLE_STRIPE  = colors.HexColor('#1c1a17')
HEADER_FILL   = colors.HexColor('#3f3927')
COVER_BLOCK   = colors.HexColor('#3c382e')
BORDER        = colors.HexColor('#514931')
ICON          = colors.HexColor('#b7aa83')
ACCENT        = colors.HexColor('#dfc77f')
ACCENT_2      = colors.HexColor('#896ed9')
TEXT_PRIMARY  = colors.HexColor('#f0f0ee')
TEXT_MUTED    = colors.HexColor('#85827b')
SEM_SUCCESS   = colors.HexColor('#85c399')
SEM_WARNING   = colors.HexColor('#c8ad77')
SEM_ERROR     = colors.HexColor('#c48882')
SEM_INFO      = colors.HexColor('#708daa')

TABLE_HEADER_COLOR = HEADER_FILL
TABLE_HEADER_TEXT  = colors.HexColor('#f0f0ee')
TABLE_ROW_EVEN     = colors.HexColor('#1a1816')
TABLE_ROW_ODD      = TABLE_STRIPE

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FONT SETUP
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_IS_MAC = platform.system() == 'Darwin'
FONT_DIR = os.path.expanduser('~/.openclaw/workspace/fonts') if _IS_MAC else '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
# NotoSansSC variable font - skip if not compatible (English doc uses FreeSerif primarily)
try:
    pdfmetrics.registerFont(TTFont('NotoSansSC', f'{FONT_DIR}/truetype/chinese/NotoSansSC[wght].ttf'))
    pdfmetrics.registerFont(TTFont('NotoSansSC-Bold', f'{FONT_DIR}/truetype/chinese/NotoSansSC[wght].ttf'))
    registerFontFamily('NotoSansSC', normal='NotoSansSC', bold='NotoSansSC-Bold')
except Exception:
    pass
pdfmetrics.registerFont(TTFont('SarasaMonoSC', f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold', italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FONT FALLBACK
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sys.path.insert(0, SCRIPTS_DIR)
try:
    from pdf import install_font_fallback
    install_font_fallback()
except ImportError:
    pass

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PAGE DIMENSIONS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE_W, PAGE_H = A4
LEFT_MARGIN = 0.9 * inch
RIGHT_MARGIN = 0.9 * inch
TOP_MARGIN = 0.85 * inch
BOTTOM_MARGIN = 0.85 * inch
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN
MAX_KEEP_HEIGHT = PAGE_H * 0.40

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STYLES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOC_TITLE_STYLE = ParagraphStyle(
    name='TOCTitle', fontName='FreeSerif', fontSize=22, leading=28,
    textColor=TEXT_PRIMARY, spaceAfter=18, spaceBefore=6,
)

TOC_H1_STYLE = ParagraphStyle(
    name='TOCLevel0', fontName='FreeSerif', fontSize=12, leading=20,
    textColor=TEXT_PRIMARY, leftIndent=10, spaceBefore=4, spaceAfter=2,
)

TOC_H2_STYLE = ParagraphStyle(
    name='TOCLevel1', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_MUTED, leftIndent=30, spaceBefore=2, spaceAfter=1,
)

H1_STYLE = ParagraphStyle(
    name='H1', fontName='FreeSerif-Bold', fontSize=20, leading=26,
    textColor=TEXT_PRIMARY, spaceBefore=20, spaceAfter=10,
)

H2_STYLE = ParagraphStyle(
    name='H2', fontName='FreeSerif-Bold', fontSize=14, leading=20,
    textColor=ACCENT, spaceBefore=14, spaceAfter=8,
)

H3_STYLE = ParagraphStyle(
    name='H3', fontName='FreeSerif-Bold', fontSize=11.5, leading=16,
    textColor=ICON, spaceBefore=10, spaceAfter=6,
)

BODY_STYLE = ParagraphStyle(
    name='Body', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=6,
)

BODY_LEFT = ParagraphStyle(
    name='BodyLeft', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=6,
)

BULLET_STYLE = ParagraphStyle(
    name='Bullet', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=18, spaceAfter=3,
    bulletIndent=6, bulletFontName='FreeSerif',
)

CODE_STYLE = ParagraphStyle(
    name='Code', fontName='DejaVuSans', fontSize=8.5, leading=12,
    textColor=ACCENT, backColor=colors.HexColor('#1a1816'),
    borderColor=BORDER, borderWidth=0.5, borderPadding=8,
    leftIndent=12, rightIndent=12, spaceAfter=8, spaceBefore=8,
)

CAPTION_STYLE = ParagraphStyle(
    name='Caption', fontName='FreeSerif-Italic', fontSize=9, leading=13,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=4, spaceAfter=12,
)

TABLE_HEADER_STYLE = ParagraphStyle(
    name='TableHeader', fontName='FreeSerif-Bold', fontSize=9.5, leading=14,
    textColor=TABLE_HEADER_TEXT, alignment=TA_CENTER,
)

TABLE_CELL_STYLE = ParagraphStyle(
    name='TableCell', fontName='FreeSerif', fontSize=9, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER,
)

TABLE_CELL_LEFT = ParagraphStyle(
    name='TableCellLeft', fontName='FreeSerif', fontSize=9, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
)

CALLOUT_STYLE = ParagraphStyle(
    name='Callout', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    backColor=colors.HexColor('#1f1d1a'),
    borderColor=ACCENT, borderWidth=1.5, borderPadding=10,
    leftIndent=8, rightIndent=8, spaceAfter=10, spaceBefore=10,
)

PULL_QUOTE_STYLE = ParagraphStyle(
    name='PullQuote', fontName='FreeSerif-Italic', fontSize=12, leading=19,
    textColor=ACCENT, alignment=TA_LEFT,
    leftIndent=24, rightIndent=24, spaceAfter=10, spaceBefore=10,
)

META_STYLE = ParagraphStyle(
    name='Meta', fontName='FreeSerif', fontSize=8, leading=11,
    textColor=TEXT_MUTED, alignment=TA_LEFT,
)

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# DOCUMENT TEMPLATE WITH DARK BACKGROUND
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class FerrumDocTemplate(SimpleDocTemplate):
    """Custom doc template with dark page background and TOC support."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_count = 0

    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))


def draw_page_background(canvas_obj, doc):
    """Draw dark background, border, and footer on every page."""
    canvas_obj.saveState()
    # Dark background fill
    canvas_obj.setFillColor(PAGE_BG)
    canvas_obj.rect(0, 0, PAGE_W, PAGE_H, fill=True, stroke=False)
    # Top accent rule
    canvas_obj.setStrokeColor(ACCENT)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(LEFT_MARGIN, PAGE_H - 0.55 * inch, PAGE_W - RIGHT_MARGIN, PAGE_H - 0.55 * inch)
    # Bottom line
    canvas_obj.setStrokeColor(BORDER)
    canvas_obj.setLineWidth(0.3)
    canvas_obj.line(LEFT_MARGIN, BOTTOM_MARGIN - 0.25 * inch, PAGE_W - RIGHT_MARGIN, BOTTOM_MARGIN - 0.25 * inch)
    # Page number
    canvas_obj.setFont('FreeSerif', 8)
    canvas_obj.setFillColor(TEXT_MUTED)
    page_num = canvas_obj.getPageNumber()
    canvas_obj.drawCentredString(PAGE_W / 2, 0.4 * inch, f"FerrumEngine Architecture Blueprint  |  Page {page_num}")
    canvas_obj.restoreState()


def draw_first_page(canvas_obj, doc):
    """First page (TOC page) gets a slightly different treatment."""
    draw_page_background(canvas_obj, doc)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# HELPER FUNCTIONS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
def heading_key(text):
    return 'h_' + hashlib.md5(text.encode()).hexdigest()[:8]


def add_heading(text, style, level=0):
    key = heading_key(text)
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


def add_h1(text):
    return [CondPageBreak(100), add_heading(f'<b>{text}</b>', H1_STYLE, level=0)]


def add_h2(text):
    return [add_heading(f'<b>{text}</b>', H2_STYLE, level=1)]


def add_h3(text):
    return [add_heading(f'<b>{text}</b>', H3_STYLE, level=1)]


def body(text):
    return Paragraph(text, BODY_STYLE)


def body_l(text):
    return Paragraph(text, BODY_LEFT)


def bullet(text):
    return Paragraph(f'<bullet>•</bullet> {text}', BULLET_STYLE)


def callout(text):
    return Paragraph(text, CALLOUT_STYLE)


def pull_quote(text):
    return Paragraph(f'<i>"{text}"</i>', PULL_QUOTE_STYLE)


def spacer(h=12):
    return Spacer(1, h)


def hr():
    return HRFlowable(width="100%", color=BORDER, thickness=0.5, spaceBefore=6, spaceAfter=6)


def make_table(headers, rows, col_widths=None):
    """Build a styled table with header row."""
    header_row = [Paragraph(f'<b>{h}</b>', TABLE_HEADER_STYLE) for h in headers]
    data = [header_row]
    for row in rows:
        data.append([Paragraph(str(c), TABLE_CELL_LEFT) for c in row])

    if col_widths is None:
        col_count = len(headers)
        col_widths = [CONTENT_W / col_count] * col_count

    tbl = Table(data, colWidths=col_widths, hAlign='CENTER')

    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('GRID', (0, 0), (-1, -1), 0.4, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]
    # Alternating row colors
    for i in range(1, len(data)):
        bg = TABLE_ROW_ODD if i % 2 == 0 else TABLE_ROW_EVEN
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))

    tbl.setStyle(TableStyle(style_cmds))
    return tbl


def safe_keep(elements):
    """Wrap in KeepTogether if reasonable height."""
    total = 0
    for el in elements:
        w, h = el.wrap(CONTENT_W, PAGE_H)
        total += h
    if total <= MAX_KEEP_HEIGHT:
        return [KeepTogether(elements)]
    elif len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BUILD STORY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story = []

# ──────────────────────────────────────
# TABLE OF CONTENTS
# ──────────────────────────────────────
story.append(Paragraph('<b>Table of Contents</b>', TOC_TITLE_STYLE))
story.append(spacer(12))

toc = TableOfContents()
toc.levelStyles = [TOC_H1_STYLE, TOC_H2_STYLE]
story.append(toc)
story.append(PageBreak())

# ──────────────────────────────────────
# 1. EXECUTIVE SUMMARY
# ──────────────────────────────────────
story.extend(add_h1('1. Executive Summary'))

story.append(body(
    'FerrumEngine stands at a critical inflection point. The current platform, while functional, '
    'carries significant technical debt accumulated through rapid feature development. With approximately '
    '20,000 lines of source code, a 2MB JavaScript payload (541KB gzipped), and 47 client components '
    '(91% client-side rendered), the architecture has reached the limits of sustainable growth. The '
    'monolithic section-based structure, while effective during early development, now impedes '
    'iteration speed, performance optimization, and platform extensibility.'
))

story.append(spacer(6))

story.append(body(
    'This Architecture Blueprint presents a comprehensive redesign strategy to transform FerrumEngine '
    'into a world-class UI infrastructure platform. The target state envisions an initial JavaScript '
    'payload under 200KB gzipped, server-first rendering with selective client hydration, a modular '
    'monorepo structure where every package is independently installable and consumable, and a '
    'performance budget enforced at every level of the continuous integration pipeline.'
))

story.append(spacer(6))

story.append(callout(
    '<b>Core Objective:</b> Reduce the initial JavaScript payload from 541KB to under 200KB '
    'gzipped (a 3.4x reduction), increase server-rendered components from 9% to over 30%, '
    'and establish a modular package architecture that supports FerrumStudio, FerrumCloud, '
    'and third-party integrations.'
))

story.append(spacer(6))

story.append(body(
    'The migration will follow a five-phase approach over ten weeks, progressing from critical '
    'security and dead-code elimination through bundle optimization, architectural restructuring, '
    'performance tuning, and final polish. Each phase has clearly defined acceptance criteria '
    'and measurable outcomes, ensuring that progress is verifiable and regressions are immediately '
    'detectable.'
))

story.append(spacer(6))

story.append(body(
    'This blueprint addresses not only the technical dimensions of the redesign but also the '
    'developer experience implications, the platform extensibility requirements for future products, '
    'and the risk mitigations necessary to maintain production stability throughout the migration. '
    'The following sections provide the complete analysis, target architecture, migration plan, '
    'and governance framework required to execute this transformation successfully.'
))

story.extend(add_h2('1.1 Scope and Audience'))

story.append(body(
    'This document is intended for the FerrumEngine engineering team, technical leadership, and '
    'stakeholders responsible for platform decisions. It covers the full scope of the architecture '
    'redesign from current-state analysis through implementation to governance. Supplementary '
    'documents will detail individual package APIs, component migration guides, and CI/CD pipeline '
    'configurations referenced herein.'
))

# ──────────────────────────────────────
# 2. CURRENT ARCHITECTURE ANALYSIS
# ──────────────────────────────────────
story.extend(add_h1('2. Current Architecture Analysis'))

story.append(body(
    'A thorough analysis of the existing FerrumEngine codebase reveals several structural patterns '
    'that, while pragmatic during initial development, create compounding technical debt. This section '
    'presents the quantitative metrics that define the current state and identifies the specific '
    'areas requiring architectural intervention.'
))

story.extend(add_h2('2.1 Codebase Metrics'))

story.append(body(
    'The platform currently consists of approximately 20,000 lines of source code across 47 '
    'identifiable client components. Of these components, 91% are marked as client-only with the '
    '"use client" directive, meaning they execute entirely in the browser with no server-side '
    'rendering capability. Only 9% of components participate in server-side rendering, severely '
    'limiting the platform\'s ability to deliver fast initial page loads and SEO-optimized content.'
))

story.append(body(
    'The dependency tree contains 12 direct runtime dependencies with a total node_modules footprint '
    'of 493MB. The most significant contributor is lucide-react at 33MB on disk, which imports the '
    'entire icon library despite the application using only 43 individual icons. This represents '
    'approximately 750x bloat relative to the actual icons consumed.'
))

story.append(spacer(6))

story.extend(add_h2('2.2 Performance Metrics Comparison'))

story.append(spacer(8))

metrics_table = make_table(
    ['Metric', 'Current', 'Target', 'Gap'],
    [
        ['Initial JS (gzip)', '541 KB', '<200 KB', '3.4x reduction'],
        ['Initial CSS', '296 KB', '<80 KB', '3.7x reduction'],
        ['Effects CSS (on-demand)', '635 KB', '<500 KB', 'Dedup + compress'],
        ['Largest chunk', '227 KB', '<100 KB', '2.3x reduction'],
        ['Runtime deps', '12', '<15', 'OK'],
        ['Server components', '9%', '>30%', '3.3x increase'],
        ['Largest file', '3,855 lines', '<500 lines', 'Split into modules'],
        ['node_modules', '493 MB', '<200 MB', 'Remove unused'],
        ['lucide-react', '33 MB disk', '<2 MB disk', 'Icon registry'],
        ['Build time', '8.8s', '<15s', 'OK'],
    ],
    col_widths=[CONTENT_W * 0.30, CONTENT_W * 0.18, CONTENT_W * 0.18, CONTENT_W * 0.34]
)
story.append(metrics_table)
story.append(Paragraph('Table 1: Current vs. Target Performance Metrics', CAPTION_STYLE))
story.append(spacer(12))

story.extend(add_h2('2.3 Structural Analysis'))

story.append(body(
    'The current codebase is organized as a single Next.js application with a flat sections directory. '
    'Each section corresponds to a major feature area (Hero, Features, Pricing, etc.) and contains '
    'its components, styles, and data dependencies in a self-contained but not independently '
    'extractable unit. The largest single file spans 3,855 lines, containing a monolithic component '
    'with deeply nested sub-components that cannot be lazy-loaded or shared across sections.'
))

story.append(body(
    'CSS is distributed across multiple files with significant duplication. The global stylesheet '
    'consumes 296KB, while on-demand effect stylesheets add an additional 635KB when loaded. '
    'Analysis reveals approximately 30% duplication between the global and effect stylesheets, '
    'suggesting that a unified CSS architecture with intelligent code-splitting could reduce the '
    'total CSS footprint by 40-50%.'
))

story.append(body(
    'The 2MB total JavaScript bundle (541KB gzipped) is dominated by a single chunk of 227KB that '
    'contains core framework code, shared utilities, and several components that are loaded on '
    'every page regardless of whether they are needed. This "all-or-nothing" chunking strategy '
    'means that even the simplest landing page pays the cost of components used only in deeply '
    'nested feature pages.'
))

story.extend(add_h2('2.4 Critical Pain Points'))

story.append(body(
    'Three pain points emerge from the structural analysis as the highest-priority concerns. First, '
    'the icon system bloat (lucide-react at 33MB for 43 icons) inflates both the disk footprint '
    'and the install time, while contributing unnecessary code to the bundle through tree-shaking '
    'edge cases. Second, the monolithic section structure prevents component reuse across sections, '
    'forcing duplication of similar functionality and increasing the maintenance burden. Third, '
    'the absence of a server components strategy means that every page ships the full client '
    'rendering overhead, even for pages that are fundamentally static (landing pages, marketing '
    'copy, documentation).'
))

story.append(spacer(6))

story.extend(add_h3('Icon System Bloat'))

story.append(body(
    'The lucide-react package ships over 1,200 icons as individual ES modules. The application '
    'imports 43 of these icons, but the import structure does not enable reliable tree-shaking. '
    'The result is that the entire package (33MB on disk, contributing approximately 15KB gzipped '
    'to the bundle) is included in the production build. Replacing this with a custom icon registry '
    'containing only the 43 required icons as inline SVG components eliminates the dependency '
    'entirely.'
))

story.extend(add_h3('Monolithic Section Structure'))

story.append(body(
    'The current sections directory contains seven top-level sections, each with an average of '
    '6.7 components. Components within a section are tightly coupled to their parent section, '
    'making extraction difficult. Cross-section shared components (buttons, cards, layout '
    'primitives) are duplicated across multiple sections, creating maintenance inconsistencies '
    'and divergent styling implementations over time.'
))

story.extend(add_h3('Absence of Server Components Strategy'))

story.append(body(
    'Only 9% of components are server components. The remaining 91% are marked with "use client" '
    'out of habit rather than necessity, since most contain no client-only APIs. Migrating these '
    'components to server components requires identifying which ones genuinely need browser APIs '
    '(event handlers, useState, useEffect, refs) and converting the rest. The conversion is '
    'mechanical but labor-intensive, requiring careful attention to data flow patterns.'
))

story.extend(add_h2('2.5 Technical Debt Inventory'))

story.append(spacer(8))

debt_table = make_table(
    ['Debt Category', 'Severity', 'Effort to Fix', 'Business Impact'],
    [
        ['Icon system bloat', 'High', 'Low (1 day)', 'High install/build cost'],
        ['CSS duplication', 'Medium', 'Medium (3 days)', 'Inconsistent styling'],
        ['Monolithic file (3,855 lines)', 'High', 'Medium (1 week)', 'Slow iteration'],
        ['Excessive client components', 'High', 'High (2 weeks)', 'Slow page loads'],
        ['Missing server actions', 'Medium', 'Medium (1 week)', 'No mutation pattern'],
        ['No package boundaries', 'High', 'High (3 weeks)', 'Cannot extract packages'],
        ['Missing performance budget', 'High', 'Low (2 days)', 'No regression protection'],
        ['Inconsistent naming', 'Low', 'Low (2 days)', 'Onboarding friction'],
    ],
    col_widths=[CONTENT_W * 0.28, CONTENT_W * 0.15, CONTENT_W * 0.22, CONTENT_W * 0.35]
)
story.append(debt_table)
story.append(Paragraph('Table 2: Technical Debt Inventory', CAPTION_STYLE))
story.append(spacer(10))

# ──────────────────────────────────────
# 3. ARCHITECTURE PRINCIPLES
# ──────────────────────────────────────
story.extend(add_h1('3. Architecture Principles'))

story.append(body(
    'The FerrumEngine redesign is guided by six foundational principles that inform every technical '
    'decision, from package boundaries to rendering strategy to CI enforcement. These principles '
    'are not aspirational guidelines; they are inviolable constraints enforced through automated '
    'tooling and code review processes.'
))

story.extend(add_h2('3.1 Performance First'))

story.append(body(
    'Every architectural decision must be evaluated against its performance impact. The platform '
    'maintains a hard budget of sub-200KB initial JavaScript (gzipped) and targets sub-1-second '
    'Largest Contentful Paint (LCP) on 4G connections. Performance budgets are not recommendations; '
    'they are CI gates that block merges when exceeded. No feature, regardless of business value, '
    'may ship if it causes a budget violation without an explicit exemption approved by the '
    'architecture team.'
))

story.extend(add_h2('3.2 Server-First Rendering'))

story.append(body(
    'The default rendering mode for all components is server-side. Client-side rendering is an '
    'opt-in decision that requires justification. Interactive components that genuinely require '
    'browser APIs (event handlers, DOM manipulation, client state) are marked as client components, '
    'but the goal is to minimize the hydration boundary. Static content, data-fetching components, '
    'and layout structures render entirely on the server, sending pre-rendered HTML to the browser '
    'with zero JavaScript cost for those sections.'
))

story.extend(add_h2('3.3 Radical Modularity'))

story.append(body(
    'Every package in the FerrumEngine monorepo is independently installable, versionable, and '
    'consumable. A consumer should be able to install @ferrum/components without pulling in '
    '@ferrum/effects or @ferrum/motion. Package boundaries are defined by responsibility, not by '
    'convenience. Internal implementation details are hidden behind public APIs, and cross-package '
    'dependencies flow in one direction through clearly defined interfaces.'
))

story.extend(add_h2('3.4 Zero-Regression'))

story.append(body(
    'Once a performance metric enters the acceptable range, it must never regress without explicit '
    'approval. The CI pipeline runs automated budget checks on every pull request, comparing the '
    'proposed bundle size, build time, and dependency count against established baselines. Any '
    'regression beyond a configurable threshold (default: 5%) fails the build and requires the '
    'author to either optimize the change or request a budget adjustment.'
))

story.extend(add_h2('3.5 Developer Experience'))

story.append(body(
    'The platform must provide a type-safe, auto-completing development experience. All public APIs '
    'are defined with TypeScript types that are exported alongside the implementation. Documentation '
    'is generated from code, not maintained separately. New contributors should be able to install '
    'the monorepo, understand the package structure within 30 minutes, and make their first '
    'contribution within two hours.'
))

story.extend(add_h2('3.6 Platform Extensibility'))

story.append(body(
    'The architecture anticipates future products (FerrumStudio, FerrumCloud, Marketplace) and '
    'provides a plugin-based extension system. Core packages expose hooks, configuration surfaces, '
    'and lifecycle events that external consumers can use to integrate with the platform without '
    'modifying core code. This plugin architecture ensures that the platform can grow without '
    ' accumulating feature-specific coupling in the core packages.'
))

story.extend(add_h2('3.7 Principle Enforcement'))

story.append(body(
    'Principles are enforced through three mechanisms: automated CI checks, code review checklists, '
    'and architecture decision records (ADRs). Automated CI checks verify measurable principles '
    '(performance budgets, file size limits, dependency counts). Code review checklists guide '
    'reviewers through non-automatable principles (modularity, extensibility). ADRs document '
    'principle trade-offs when a decision must deviate from a principle, providing context for '
    'future maintainers.'
))

story.append(spacer(6))

story.append(callout(
    '<b>Principle Hierarchy:</b> When principles conflict, Performance First takes precedence '
    'over Developer Experience (a slower development workflow is preferable to a slower product). '
    'Zero-Regression takes precedence over Radical Modularity (a package boundary that would '
    'cause a regression must be reworked). Platform Extensibility never overrides the other '
    'principles; extensions must respect the constraints of the core platform.'
))

# ──────────────────────────────────────
# 4. TARGET ARCHITECTURE
# ──────────────────────────────────────
story.extend(add_h1('4. Target Architecture'))

story.append(body(
    'The target architecture is organized into four distinct layers: the Edge/CDN layer for global '
    'distribution and edge computation, the Application layer built on Next.js 16 App Router, '
    'the Shared Layer containing independently consumable packages, and the Data and Persistence '
    'layer for state management and storage. Each layer has clearly defined responsibilities and '
    'interfaces with adjacent layers.'
))

story.append(spacer(8))

# Architecture diagram as a table
arch_diagram_style = ParagraphStyle(
    name='ArchDiagram', fontName='DejaVuSans', fontSize=7.5, leading=10.5,
    textColor=ACCENT, alignment=TA_LEFT,
    backColor=colors.HexColor('#1a1816'),
    borderColor=BORDER, borderWidth=0.5, borderPadding=10,
    leftIndent=8, rightIndent=8, spaceAfter=10, spaceBefore=10,
)

arch_code = (
    'TARGET ARCHITECTURE:<br/>'
    '+-------------------------------------------------+<br/>'
    '|            CDN / Edge Layer                      |<br/>'
    '|     (Cloudflare Workers / Vercel Edge)            |<br/>'
    '+-------------------------------------------------+<br/>'
    '|            Next.js 16 App Router                  |<br/>'
    '|  +----------+ +----------+ +------------------+  |<br/>'
    '|  | Server   | | API      | | Edge Middleware |  |<br/>'
    '|  | Components| | Routes   | | (Auth/Rate)     |  |<br/>'
    '|  +----------+ +----------+ +------------------+  |<br/>'
    '+-------------------------------------------------+<br/>'
    '|          Shared Layer Packages                    |<br/>'
    '|  +--------+ +--------+ +-------+ +-----------+  |<br/>'
    '|  |@ferrum/| |@ferrum/| |@ferrum| |@ferrum/   |  |<br/>'
    '|  |effects | |tokens  | |motion | |components |  |<br/>'
    '|  +--------+ +--------+ +-------+ +-----------+  |<br/>'
    '+-------------------------------------------------+<br/>'
    '|          Data and Persistence                     |<br/>'
    '|  +----------+ +--------------+ +--------------+ |<br/>'
    '|  | In-Mem   | | File Persist | | Optional DB  | |<br/>'
    '|  | Store    | | (JSON)       | | (Prisma)     | |<br/>'
    '|  +----------+ +--------------+ +--------------+ |<br/>'
    '+-------------------------------------------------+'
)

story.append(Paragraph(arch_code, arch_diagram_style))
story.append(Paragraph('Figure 1: Target Architecture Overview', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('4.1 Rendering Strategy'))

story.append(body(
    'The rendering strategy follows an Islands Architecture pattern where the majority of the page '
    'is server-rendered HTML, with selective hydration applied only to interactive islands. The '
    'framework uses Next.js 16 App Router with React Server Components as the default, and client '
    'components are explicitly declared with "use client" only when browser APIs are required.'
))

story.append(body(
    'The hydration boundary is minimized through three techniques. First, static content blocks '
    '(hero sections, feature descriptions, pricing tables) are pure Server Components with zero '
    'client JavaScript. Second, interactive components (navigation menus, form inputs, theme '
    'switchers) are loaded as isolated client islands using dynamic imports with React.lazy and '
    'Suspense boundaries. Third, shared state is managed through URL search params and server '
    'actions rather than client-side state managers, reducing the need for hydration.'
))

story.extend(add_h2('4.2 Package Architecture'))

story.append(body(
    'The shared layer comprises five core packages, each with a distinct responsibility and a '
    'minimal dependency footprint. The packages are designed for zero peer-dependency conflicts '
    'and tree-shaking compatibility.'
))

story.append(body(
    'The shared layer follows a strict layered dependency model where packages can only depend '
    'on packages at the same or lower layers. Base layer packages (tokens, effects) have no '
    'internal dependencies. Mid-layer packages (motion, css-engine) depend only on base packages. '
    'Top-layer packages (components, compiler) depend on mid and base layers. This prevents '
    'circular dependencies and ensures that the deepest packages remain the most stable.'
))

story.append(spacer(8))

pkg_table = make_table(
    ['Package', 'Responsibility', 'Key Exports', 'Dependencies'],
    [
        ['@ferrum/effects', 'CSS effect definitions and generators', 'createEffect, EffectPresets, EffectConfig', 'None'],
        ['@ferrum/tokens', 'Design tokens (color, spacing, typography)', 'tokens/, theme(), TokenResolver', 'None'],
        ['@ferrum/motion', 'Animation utilities and presets', 'animate(), spring(), TransitionGroup', 'None'],
        ['@ferrum/components', 'UI component library', 'Button, Card, Modal, Nav, Layout', 'tokens, motion'],
        ['@ferrum/css-engine', 'Core CSS runtime and compilation', 'compileCSS(), injectStyles(), runtime', 'tokens'],
        ['@ferrum/compiler', 'Build optimization and bundling', 'optimize(), analyze(), BudgetChecker', 'css-engine'],
    ],
    col_widths=[CONTENT_W * 0.15, CONTENT_W * 0.25, CONTENT_W * 0.30, CONTENT_W * 0.30]
)
story.append(pkg_table)
story.append(Paragraph('Table 2: Shared Layer Package Architecture', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('4.3 Data Flow Architecture'))

story.append(body(
    'Data flows unidirectionally from server to client through a layered caching strategy. '
    'Server Components fetch data directly from the persistence layer (in-memory store, JSON files, '
    'or optional Prisma database) and render it into HTML. Client Components receive data through '
    'React props, server actions, or URL search parameters -- never through client-side API calls '
    'for initial page loads.'
))

story.append(body(
    'Mutations follow the server actions pattern: client components dispatch server actions that '
    'execute on the server, update the data layer, and trigger revalidation of Next.js cache. This '
    'eliminates the need for client-side data fetching libraries (React Query, SWR) for the primary '
    'data flow, though they may be optionally used for real-time collaborative features in '
    'FerrumStudio.'
))

story.extend(add_h2('4.4 Caching Strategy'))

story.append(body(
    'The caching strategy operates at three levels. At the edge, Cloudflare Workers or Vercel Edge '
    'Functions cache fully rendered pages with a 60-second TTL, serving responses from the nearest '
    'POP to the user. At the application level, Next.js ISR (Incremental Static Regeneration) '
    'pre-renders static pages at build time and revalidates them on a configurable interval. At '
    'the component level, React.cache memoizes expensive server-side computations (data fetching, '
    'token resolution) across requests within a single render pass.'
))

story.extend(add_h2('4.5 Edge Middleware Layer'))

story.append(body(
    'The edge middleware layer handles authentication validation, rate limiting, and request '
    'rewriting before the request reaches the application server. Authentication tokens are '
    'validated against a JWT signature cached at the edge, eliminating the need to call the origin '
    'for every authenticated request. Rate limiting is implemented using a sliding window counter '
    'stored in Cloudflare KV or Vercel Edge Config, providing per-IP and per-user throttling with '
    'sub-millisecond overhead.'
))

story.append(body(
    'Geolocation-based routing directs users to the nearest regional origin server, reducing latency '
    'for users far from the primary data center. The middleware also handles A/B test assignment, '
    'feature flag evaluation, and bot detection, keeping these concerns out of the application code '
    'and ensuring consistent behavior across all routes.'
))

story.extend(add_h2('4.6 Observability Integration'))

story.append(body(
    'The architecture integrates observability at every layer. Edge functions emit structured logs '
    'to the monitoring platform with request IDs for distributed tracing. Application-level metrics '
    'include Core Web Vitals (collected via the web-vitals library and reported to analytics), '
    'server-side render times (collected via Next.js instrumentation hooks), and cache hit/miss '
    'ratios. Package-level metrics track build time per package, bundle contribution per package, '
    'and dependency count per package.'
))

# ──────────────────────────────────────
# 5. MODULAR MONOREPO DESIGN
# ──────────────────────────────────────
story.extend(add_h1('5. Modular Monorepo Design'))

story.append(body(
    'The monorepo is structured using Turborepo for task orchestration and pnpm workspaces for '
    'dependency management. This combination provides fast, deterministic builds with intelligent '
    'caching and strict package boundary enforcement.'
))

story.append(spacer(8))

# Monorepo tree as code block
mono_code = (
    'ferrum-platform/<br/>'
    '+-- packages/<br/>'
    '|   +-- effects/         # @ferrum/effects<br/>'
    '|   +-- tokens/          # @ferrum/tokens<br/>'
    '|   +-- motion/           # @ferrum/motion<br/>'
    '|   +-- components/       # @ferrum/components<br/>'
    '|   +-- compiler/         # @ferrum/compiler<br/>'
    '|   +-- css-engine/       # @ferrum/css-engine<br/>'
    '+-- apps/<br/>'
    '|   +-- website/          # Next.js marketing site<br/>'
    '|   +-- studio/           # Future: Visual editor<br/>'
    '|   +-- cloud/            # Future: Cloud dashboard<br/>'
    '|   +-- docs/             # Future: Documentation site<br/>'
    '+-- tools/<br/>'
    '|   +-- budget-check/     # CI performance enforcement<br/>'
    '|   +-- effects-gen/      # Effect generation tooling<br/>'
    '+-- turbo.json<br/>'
    '+-- pnpm-workspace.yaml<br/>'
    '+-- package.json'
)
story.append(Paragraph(mono_code, CODE_STYLE))
story.append(Paragraph('Figure 2: Monorepo Directory Structure', CAPTION_STYLE))
story.append(spacer(8))

story.extend(add_h2('5.1 Package Boundaries'))

story.append(body(
    'Each package in the monorepo has a clearly defined public API surface exported from its '
    'index.ts file. Internal implementation files (prefixed with an underscore) are not exported '
    'and may change without semver consideration. The Turborepo pipeline enforces that packages '
    'may only import from declared dependencies in their package.json; any undeclared import '
    'triggers a build error.'
))

story.append(body(
    'The public API of each package is documented through TypeScript type exports. Every exported '
    'function, class, and type is annotated with JSDoc comments that describe its purpose, '
    'parameters, return value, and usage examples. These annotations are extracted at build time '
    'to generate the API documentation site, ensuring that documentation and code remain in sync.'
))

story.append(body(
    'Dependency relationships between packages flow in a single direction to prevent circular '
    'dependencies. The base packages (@ferrum/effects, @ferrum/tokens) have zero internal '
    'dependencies. The component package depends on tokens and motion, but not on css-engine '
    'or compiler. The compiler package depends on css-engine but not on components, ensuring that '
    'build tooling does not create runtime coupling.'
))

story.extend(add_h2('5.2 Dependency Graph'))

story.append(body(
    'The following dependency relationships define the import graph. Arrows indicate "depends on": '
    'components depends on tokens and motion; css-engine depends on tokens; compiler depends on '
    'css-engine; effects has no internal dependencies. Apps depend on any combination of packages '
    'based on their needs. Tools depend on compiler and css-engine for build-time analysis.'
))

story.extend(add_h2('5.3 Workspace Configuration'))

story.append(body(
    'pnpm workspaces provide strict dependency isolation. Each package has its own node_modules '
    'with symlinks to workspace dependencies, preventing version conflicts and ensuring that '
    'packages are always tested against their declared dependency versions. Turborepo configures '
    'task pipelines in turbo.json, defining which tasks depend on which packages and enabling '
    'remote caching of build artifacts.'
))

story.extend(add_h2('5.4 Package Deep Dive'))

story.extend(add_h3('@ferrum/tokens'))

story.append(body(
    'The tokens package is the foundation of the design system. It exports TypeScript constants '
    'for color values, spacing units, typography scales, breakpoints, and animation timing functions. '
    'The package has zero runtime dependencies and produces zero JavaScript at runtime when consumed '
    'by server components (tokens are inlined at build time). The public API includes a TokenResolver '
    'function that resolves token references in CSS-in-JS contexts and a theme() function that '
    'generates CSS custom properties for runtime theme switching.'
))

story.extend(add_h3('@ferrum/effects'))

story.append(body(
    'The effects package contains CSS effect definitions (shadows, blurs, gradients, animations) '
    'as composable units. Each effect is defined as a JavaScript object that describes its CSS '
    'output, allowing the css-engine to generate optimized CSS at build time. The package exports '
    'a createEffect() factory, an EffectPresets collection of curated effects, and an EffectConfig '
    'type for TypeScript consumers. Effects are consumed by the components package and by '
    'applications directly.'
))

story.extend(add_h3('@ferrum/motion'))

story.append(body(
    'The motion package provides animation utilities built on the Web Animations API. It exports '
    'an animate() function that returns a controllable animation instance, a spring() function for '
    'physics-based motion, and a TransitionGroup component for orchestrating enter/exit animations. '
    'The package is tree-shakeable; consumers who do not use motion pay zero bundle cost. Motion '
    'respects the prefers-reduced-motion media query by default, with an opt-out for cases where '
    'motion is essential to functionality.'
))

story.extend(add_h3('@ferrum/components'))

story.append(body(
    'The components package is the primary UI library. It exports approximately 40 components '
    'ranging from primitives (Button, Input, Card) to complex compositions (Navigation, Modal, '
    'DataTable). Components are server-compatible by default, with explicit "use client" markers '
    'only on components that genuinely require browser APIs. The package depends on @ferrum/tokens '
    'for design values and @ferrum/motion for animation utilities, but has no dependency on '
    '@ferrum/effects or @ferrum/css-engine.'
))

story.extend(add_h3('@ferrum/css-engine'))

story.append(body(
    'The css-engine package provides the runtime CSS compilation and injection system. It exports '
    'a compileCSS() function that transforms effect definitions into optimized CSS strings, an '
    'injectStyles() function that inserts CSS into the document (browser) or collects it for SSR '
    '(server), and a runtime singleton that manages style deduplication. The package is the only '
    'consumer of @ferrum/tokens at runtime; all other packages consume tokens at build time.'
))

story.extend(add_h3('@ferrum/compiler'))

story.append(body(
    'The compiler package provides build-time tooling for the FerrumEngine platform. It exports '
    'an optimize() function that applies platform-specific optimizations (dead code elimination, '
    'CSS deduplication, asset inlining), an analyze() function that produces bundle analysis '
    'reports, and a BudgetChecker class that validates build artifacts against the performance '
    'budget. The package is consumed by the budget-check tool and by applications during their '
    'build process.'
))

# ──────────────────────────────────────
# 6. PERFORMANCE OPTIMIZATION STRATEGY
# ──────────────────────────────────────
story.extend(add_h1('6. Performance Optimization Strategy'))

story.append(body(
    'Performance optimization is the central concern of this redesign. This section details the '
    'specific strategies for reducing bundle size, optimizing CSS, restructuring code-splitting, '
    'migrating to server components, and optimizing fonts and animations.'
))

story.extend(add_h2('6.1 Bundle Size Reduction Roadmap'))

story.append(spacer(8))

bundle_table = make_table(
    ['Phase', 'Action', 'Expected Reduction', 'Cumulative'],
    [
        ['1', 'Remove dead code and unused exports', '~80 KB', '80 KB saved'],
        ['2', 'Replace lucide-react with icon registry', '~33 MB disk / ~15 KB gz', '15 KB gz saved'],
        ['3', 'Implement route-based code splitting', '~120 KB from initial chunk', '200 KB saved'],
        ['4', 'Extract CSS to on-demand chunks', '~150 KB from initial', '350 KB saved'],
        ['5', 'Tree-shake and optimize imports', '~50 KB residual', '400 KB saved'],
        ['6', 'Server components migration', '~300 KB to server', '700 KB saved'],
    ],
    col_widths=[CONTENT_W * 0.08, CONTENT_W * 0.38, CONTENT_W * 0.24, CONTENT_W * 0.30]
)
story.append(bundle_table)
story.append(Paragraph('Table 3: Bundle Size Reduction Roadmap', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('6.2 Icon System Overhaul'))

story.append(body(
    'The current icon system imports from lucide-react, which adds 33MB to node_modules and '
    'contributes approximately 15KB to the gzipped bundle. Of the 1,200+ icons available in the '
    'library, the application uses only 43. The new icon system creates a barrel file that exports '
    'only the 43 required icons as individual SVG components, reducing the disk footprint from 33MB '
    'to under 2MB and eliminating the entire lucide-react dependency.'
))

story.append(body(
    'Each icon is defined as a React functional component that renders an inline SVG with currentColor '
    'fill. This approach has zero JavaScript runtime cost for the icon rendering (the SVG is part of '
    'the server-rendered HTML) and supports theming through CSS custom properties without additional '
    'JavaScript.'
))

story.extend(add_h2('6.3 CSS Architecture'))

story.append(body(
    'The unified CSS architecture consolidates all styles into a single stylesheet that is '
    'intelligently code-split at build time. Critical CSS (styles required for above-the-fold '
    'content on the initial viewport) is inlined into the HTML document head, eliminating a render-'
    'blocking network request. Non-critical styles are loaded asynchronously as separate chunks '
    'that download in parallel with JavaScript.'
))

story.append(spacer(6))

story.extend(add_h3('Critical CSS Extraction'))

story.append(body(
    'Critical CSS extraction identifies the minimal set of styles required to render the above-the-fold '
    'content of each route. The extraction process analyzes the component tree of the route, traces '
    'all style dependencies, and generates a CSS string that is inlined into the HTML response. This '
    'inline CSS typically contains 10-20KB of styles (compared to the current 296KB global stylesheet), '
    'dramatically reducing the first-paint time by eliminating the CSS render-blocking resource.'
))

story.append(body(
    'The critical CSS extraction runs at build time and is cached in the build artifacts. Changes '
    'to component styles or route structure trigger re-extraction only for the affected routes, '
    'maintaining fast build times even as the number of routes grows. The extraction tool is '
    'implemented in the @ferrum/compiler package and integrated into the Next.js build pipeline '
    'through a custom webpack plugin.'
))

story.extend(add_h3('Effect CSS On-Demand Loading'))

story.append(body(
    'Effects CSS, which currently adds 635KB on demand, will be deduplicated and compressed. '
    'Analysis shows approximately 30% duplication between the global and effect stylesheets. '
    'After deduplication, minification, and Brotli compression, the effects CSS target is under '
    '500KB (a 21% reduction) with only the specific effect modules loaded when their corresponding '
    'components are rendered.'
))

story.extend(add_h2('6.4 Code Splitting Strategy'))

story.append(body(
    'Code splitting operates at two levels: route-based and component-level. Route-based splitting '
    'is automatic through Next.js App Router, where each route segment becomes a separate chunk '
    'that loads only when navigated to. Component-level splitting uses dynamic imports for heavy '
    'components (code editors, data visualizations, interactive demos) that are not needed on the '
    'initial page load.'
))

story.append(body(
    'The largest chunk target is under 100KB (down from the current 227KB). Chunks exceeding this '
    'threshold trigger a CI warning and require either further splitting or an explicit justification '
    'documented in the pull request. Suspense boundaries with loading skeletons ensure that '
    'asynchronous chunks do not create layout shifts or blank content areas.'
))

story.extend(add_h2('6.5 Server Components Migration'))

story.append(body(
    'The migration from client to server components follows a prioritized approach. Components '
    'with no interactivity (static text, images, layout structures) convert first, yielding '
    'immediate JavaScript savings with minimal code changes. Components with light interactivity '
    '(hover effects, CSS transitions) convert second, using CSS-only solutions where possible. '
    'Components with heavy interactivity (form inputs, drag-and-drop, complex state) convert last, '
    'and may remain as client components with optimized boundaries.'
))

story.append(spacer(8))

server_table = make_table(
    ['Component Category', 'Count', 'Migration Priority', 'Expected JS Savings'],
    [
        ['Static content blocks', '18', 'Phase 3 (Immediate)', '~120 KB'],
        ['Layout and navigation', '8', 'Phase 3 (Immediate)', '~40 KB'],
        ['Light interactive elements', '12', 'Phase 4 (Optimized)', '~80 KB'],
        ['Heavy interactive widgets', '9', 'Phase 4 (Boundary optimized)', '~60 KB'],
    ],
    col_widths=[CONTENT_W * 0.25, CONTENT_W * 0.10, CONTENT_W * 0.35, CONTENT_W * 0.30]
)
story.append(server_table)
story.append(Paragraph('Table 4: Server Components Migration Priority', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('6.6 Font and Asset Optimization'))

story.append(body(
    'Font loading uses the next/font system with font-display: swap to prevent invisible text '
    'during loading. Fonts are self-hosted (not loaded from external CDNs) to eliminate DNS lookup '
    'latency and ensure privacy compliance. Subsetting is applied to include only the character '
    'ranges required by the application (Latin + common symbols), reducing font file sizes by '
    'approximately 60% compared to full Unicode fonts.'
))

story.append(body(
    'Image assets use Next.js Image component with automatic format negotiation (AVIF, WebP, JPEG '
    'fallback), responsive sizing, and lazy loading for below-the-fold images. SVG icons are '
    'inlined as React components. The target is zero render-blocking resources on the critical path.'
))

story.extend(add_h2('6.7 Animation Performance'))

story.append(body(
    'Animations respect the prefers-reduced-motion media query, disabling or reducing motion for '
    'users who have expressed this preference at the OS level. CSS animations are preferred '
    'over JavaScript-driven animations, using transform and opacity properties that can be '
    'handled by the GPU compositor without triggering layout recalculations.'
))

story.append(body(
    'The will-change property is applied judiciously to elements that are known to animate '
    'frequently (hero transitions, scroll-driven parallax), but is not applied globally to avoid '
    'excessive memory consumption. GPU layers are managed manually: animations that promote '
    'elements to their own compositing layer include a cleanup step that removes will-change after '
    'the animation completes.'
))

# ──────────────────────────────────────
# 7. MIGRATION PLAN
# ──────────────────────────────────────
story.extend(add_h1('7. Migration Plan'))

story.append(body(
    'The migration follows a five-phase plan executed over ten weeks. Each phase has a clear '
    'scope, deliverables, and gate criteria that must be met before proceeding to the next phase. '
    'The phases are designed to deliver incremental value: each phase leaves the platform in a '
    'better state than it was before, even if subsequent phases are delayed.'
))

story.append(spacer(8))

# Gantt-style table
gantt_style = ParagraphStyle(
    name='Gantt', fontName='DejaVuSans', fontSize=7.5, leading=10.5,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    backColor=colors.HexColor('#1a1816'),
    borderColor=BORDER, borderWidth=0.5, borderPadding=8,
)

phase_table_data = [
    [Paragraph('<b>Phase</b>', TABLE_HEADER_STYLE),
     Paragraph('<b>Timeline</b>', TABLE_HEADER_STYLE),
     Paragraph('<b>Focus Area</b>', TABLE_HEADER_STYLE),
     Paragraph('<b>Key Deliverables</b>', TABLE_HEADER_STYLE)],
    [Paragraph('Phase 1', TABLE_CELL_STYLE),
     Paragraph('Week 1-2', TABLE_CELL_STYLE),
     Paragraph('Critical fixes', TABLE_CELL_LEFT),
     Paragraph('Auth security patch, dead code removal, budget CI setup', TABLE_CELL_LEFT)],
    [Paragraph('Phase 2', TABLE_CELL_STYLE),
     Paragraph('Week 3-4', TABLE_CELL_STYLE),
     Paragraph('Bundle optimization', TABLE_CELL_LEFT),
     Paragraph('Icon registry, CSS inlining, chunk splitting, tree-shaking', TABLE_CELL_LEFT)],
    [Paragraph('Phase 3', TABLE_CELL_STYLE),
     Paragraph('Week 5-6', TABLE_CELL_STYLE),
     Paragraph('Architecture restructure', TABLE_CELL_LEFT),
     Paragraph('Monorepo setup, package extraction, SSR migration start', TABLE_CELL_LEFT)],
    [Paragraph('Phase 4', TABLE_CELL_STYLE),
     Paragraph('Week 7-8', TABLE_CELL_STYLE),
     Paragraph('Performance tuning', TABLE_CELL_LEFT),
     Paragraph('Server components, streaming SSR, edge deployment', TABLE_CELL_LEFT)],
    [Paragraph('Phase 5', TABLE_CELL_STYLE),
     Paragraph('Week 9-10', TABLE_CELL_STYLE),
     Paragraph('Polish and stability', TABLE_CELL_LEFT),
     Paragraph('Monitoring, observability, documentation, final audit', TABLE_CELL_LEFT)],
]

phase_table = Table(phase_table_data, colWidths=[CONTENT_W * 0.12, CONTENT_W * 0.12, CONTENT_W * 0.20, CONTENT_W * 0.56], hAlign='CENTER')
phase_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
    ('GRID', (0, 0), (-1, -1), 0.4, BORDER),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('BACKGROUND', (0, 1), (-1, 1), TABLE_ROW_EVEN),
    ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
    ('BACKGROUND', (0, 3), (-1, 3), TABLE_ROW_EVEN),
    ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
    ('BACKGROUND', (0, 5), (-1, 5), TABLE_ROW_EVEN),
]))
story.append(phase_table)
story.append(Paragraph('Table 5: Migration Phase Summary', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('7.1 Phase 1: Critical (Weeks 1-2) -- DONE'))

story.append(body(
    'Phase 1 addresses the most urgent security and hygiene issues. The primary deliverables are: '
    'patching any authentication vulnerabilities identified in the security audit, removing dead '
    'code and unused dependencies, and establishing the performance budget CI pipeline that will '
    'govern all subsequent changes.'
))

story.append(body(
    'This phase has been completed. The authentication system has been secured, approximately 15% '
    'of the codebase identified as dead code has been removed, and the budget-check tool is '
    'operational in CI, blocking any merge that increases the bundle size beyond the configured '
    'threshold.'
))

story.extend(add_h2('7.2 Phase 2: Bundle Optimization (Weeks 3-4)'))

story.append(body(
    'Phase 2 focuses on reducing the JavaScript payload through three parallel workstreams. The icon '
    'registry replaces lucide-react with a custom barrel file containing only the 43 icons in use. '
    'CSS inlining extracts critical styles into the document head and loads the remainder '
    'asynchronously. Chunk splitting reorganizes the webpack/Turbopack output to ensure that '
    'no single chunk exceeds 100KB.'
))

story.extend(add_h2('7.3 Phase 3: Architecture Restructure (Weeks 5-6)'))

story.append(body(
    'Phase 3 restructures the codebase into the modular monorepo format described in Section 5. '
    'The existing flat directory structure is replaced with packages/apps/tools organization. Core '
    'functionality is extracted into @ferrum/* packages with public APIs. The SSR migration begins, '
    'converting static content components to server components.'
))

story.extend(add_h2('7.4 Phase 4: Performance Tuning (Weeks 7-8)'))

story.append(body(
    'Phase 4 completes the SSR migration for all eligible components, implements streaming SSR '
    'for progressively-rendered pages, and configures edge deployment. Performance profiling tools '
    'are used to identify remaining bottlenecks, and the performance budget thresholds are tightened '
    'based on the improved baseline.'
))

story.extend(add_h2('7.5 Phase 5: Polish (Weeks 9-10)'))

story.append(body(
    'Phase 5 adds monitoring and observability infrastructure (Core Web Vitals tracking, bundle '
    'size trend graphs, build time dashboards), finalizes documentation for all public APIs, and '
    'conducts a comprehensive performance audit against the acceptance criteria defined in Section 9.'
))

story.extend(add_h2('7.6 Phase Dependencies and Critical Path'))

story.append(body(
    'The phases have sequential dependencies that define the critical path. Phase 2 (bundle '
    'optimization) depends on Phase 1 (critical fixes) because the budget CI must be operational '
    'before bundle changes can be safely validated. Phase 3 (architecture restructure) depends on '
    'Phase 2 because the package boundaries require the bundle optimizations to be in place to '
    'validate that extraction does not regress performance. Phase 4 (performance tuning) depends '
    'on Phase 3 because server component migration requires the package structure to be in place. '
    'Phase 5 (polish) depends on Phase 4 because monitoring configuration requires the final '
    'deployment architecture to be stable.'
))

story.append(body(
    'Within each phase, workstreams execute in parallel where dependencies allow. For example, in '
    'Phase 2, the icon registry work, CSS inlining work, and chunk splitting work can proceed '
    'simultaneously since they touch different parts of the build pipeline. Daily standups and '
    'weekly phase reviews ensure that parallel workstreams remain coordinated and that integration '
    'issues are identified early.'
))

story.extend(add_h2('7.7 Rollback Strategy'))

story.append(body(
    'Each phase includes a rollback strategy that can be executed if the phase introduces '
    'unacceptable regressions. The rollback strategy relies on feature flags that gate new '
    'behavior behind runtime configuration. If a phase causes production issues, the feature '
    'flags can be toggled to revert to the previous behavior without a code deployment. Feature '
    'flags are managed through a configuration service that supports instant propagation to all '
    'edge nodes.'
))

# ──────────────────────────────────────
# 8. PERFORMANCE BUDGET SPECIFICATION
# ──────────────────────────────────────
story.extend(add_h1('8. Performance Budget Specification'))

story.append(body(
    'The performance budget is the governance mechanism that ensures the architecture redesign '
    'delivers lasting value. Budgets are defined as hard limits enforced in CI, not aspirational '
    'targets. Any merge that violates a budget fails the build and requires either optimization '
    'or a documented exemption.'
))

story.extend(add_h2('8.1 Budget Values'))

story.append(spacer(8))

budget_table = make_table(
    ['Budget Category', 'Limit', 'Enforcement', 'Violation Action'],
    [
        ['Initial JS (gzip)', '<200 KB', 'CI per-PR check', 'Block merge'],
        ['Initial CSS', '<80 KB', 'CI per-PR check', 'Block merge'],
        ['Largest chunk', '<100 KB', 'CI build analysis', 'Warn + block'],
        ['LCP (p75)', '<1.0s', 'RUM monitoring', 'Alert + investigate'],
        ['FID (p75)', '<100ms', 'RUM monitoring', 'Alert + investigate'],
        ['CLS', '<0.1', 'RUM monitoring', 'Alert + investigate'],
        ['Build time', '<15s', 'CI timing gate', 'Warn if >12s'],
        ['Dependency count', '<15 direct', 'CI dependency audit', 'Warn + review'],
        ['Largest file', '<500 lines', 'CI line-count check', 'Warn + refactor'],
        ['node_modules', '<200 MB', 'CI disk check', 'Warn + audit'],
    ],
    col_widths=[CONTENT_W * 0.20, CONTENT_W * 0.18, CONTENT_W * 0.24, CONTENT_W * 0.38]
)
story.append(budget_table)
story.append(Paragraph('Table 6: Performance Budget Specification', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('8.2 Core Web Vitals Targets'))

story.append(body(
    'The Core Web Vitals targets align with Google\'s "Good" thresholds and extend them where '
    'FerrumEngine\'s performance requirements are more stringent. Largest Contentful Paint (LCP) '
    'targets sub-1-second at the 75th percentile, which is below Google\'s "Good" threshold of '
    '2.5 seconds. First Input Delay (FID) targets sub-100ms, below the "Good" threshold of '
    '100ms. Cumulative Layout Shift (CLS) targets below 0.1, matching the "Good" threshold.'
))

story.extend(add_h2('8.3 CI Enforcement Script'))

story.append(body(
    'The budget enforcement runs as a CI step on every pull request. The script builds the project, '
    'analyzes the output artifacts, and compares them against the budget thresholds. Results are '
    'posted as a PR comment with a detailed breakdown of budget utilization, trending comparisons '
    'against the last 10 builds, and specific recommendations for any violations.'
))

story.append(body(
    'The enforcement script supports both strict mode (any violation blocks the merge) and warning '
    'mode (violations post a warning but allow the merge with an explicit approval comment). The '
    'default is strict mode for bundle size and dependency count, and warning mode for build time.'
))

story.extend(add_h2('8.4 Dependency Limits'))

story.append(body(
    'Direct runtime dependencies are capped at 15 (current: 12, target: under 15). This limit '
    'prevents dependency bloat and encourages the team to evaluate each new dependency against '
    'its value proposition. When a new dependency is proposed, the review must include: the '
    'specific problem it solves, alternatives considered, bundle size impact, license compatibility, '
    'and maintenance activity of the upstream project.'
))

story.extend(add_h2('8.5 Budget Adjustment Process'))

story.append(body(
    'Budget adjustments are rare and require explicit approval from the architecture team. The process '
    'for requesting a budget adjustment is: (1) document the proposed change and its budget impact, '
    '(2) explain why the change cannot be optimized to fit within the existing budget, (3) propose '
    'a compensating optimization elsewhere in the budget, and (4) submit for architecture review. '
    'Approved adjustments are recorded in an ADR and reflected in the budget configuration.'
))

story.extend(add_h2('8.6 File Size Governance'))

story.append(body(
    'Individual files are limited to 500 lines of code. Files exceeding this limit trigger a CI '
    'warning and are tracked in a technical debt backlog. The limit encourages developers to decompose '
    'large components into smaller, composable units that are easier to test, review, and maintain. '
    'This governance applies to all file types: components, utilities, styles, tests, and configuration.'
))

# ──────────────────────────────────────
# 9. ACCEPTANCE CRITERIA
# ──────────────────────────────────────
story.extend(add_h1('9. Acceptance Criteria'))

story.append(body(
    'Each migration phase has measurable acceptance criteria that must be verified before the phase '
    'is considered complete. Criteria are defined with specific measurement methods and target values '
    'to ensure objective evaluation.'
))

story.append(spacer(8))

ac_table = make_table(
    ['Phase', 'Criterion', 'Measurement', 'Target'],
    [
        ['1', 'Auth vulnerabilities patched', 'Security audit scan', 'Zero critical/high'],
        ['1', 'Dead code removed', 'Bundle analysis diff', '>15% reduction'],
        ['1', 'Budget CI operational', 'CI pipeline test', 'Green on test PR'],
        ['2', 'Icon system replaced', 'Bundle analysis', 'lucide-react removed'],
        ['2', 'Critical CSS inlined', 'Lighthouse audit', 'Zero render-blocking CSS'],
        ['2', 'Largest chunk reduced', 'Build artifact analysis', '<150 KB'],
        ['3', 'Monorepo operational', 'Build from clean clone', 'All packages build'],
        ['3', 'Packages extractable', 'npm pack test', 'Each installs independently'],
        ['3', 'SSR migration started', 'Component audit', '>20% server components'],
        ['4', 'SSR migration complete', 'Component audit', '>30% server components'],
        ['4', 'Initial JS under budget', 'Bundle analysis', '<200 KB gzip'],
        ['4', 'Edge deployment', 'Deploy to edge', 'Successful on staging'],
        ['5', 'Monitoring deployed', 'Dashboard verification', 'All vitals tracked'],
        ['5', 'Documentation complete', 'API doc review', 'All publics documented'],
        ['5', 'Final audit passed', 'Full budget check', 'All criteria met'],
    ],
    col_widths=[CONTENT_W * 0.08, CONTENT_W * 0.28, CONTENT_W * 0.30, CONTENT_W * 0.34]
)
story.append(ac_table)
story.append(Paragraph('Table 7: Acceptance Criteria by Phase', CAPTION_STYLE))
story.append(spacer(10))

story.append(body(
    'Acceptance criteria are verified through automated CI checks where possible and manual review '
    'where automated measurement is not available. The architecture team conducts a formal review at '
    'the end of each phase, and the phase is not considered complete until all criteria are met or '
    'explicitly deferred with a documented rationale and a revised timeline.'
))

story.extend(add_h2('9.2 Phase Exit Criteria'))

story.append(body(
    'Each phase has a formal exit criteria review conducted by the architecture team. The review '
    'follows a standardized checklist: all acceptance criteria verified, all new tests passing, '
    'all budget targets met, no open P1 bugs, documentation updated for changed APIs, and rollback '
    'strategy tested. The exit criteria review produces a sign-off document that becomes part of the '
    'project record.'
))

story.append(body(
    'Phases may not proceed until their exit criteria are formally approved. If a phase cannot '
    'meet all criteria within its allocated timeline, the affected criteria are either resolved '
    'through scope reduction (deferring non-essential deliverables to a later phase) or timeline '
    'extension (adding 1-2 weeks with documented justification). Neither option requires architectural '
    'approval, but timeline extensions beyond 2 weeks require stakeholder communication.'
))

# ──────────────────────────────────────
# 10. RISK ASSESSMENT
# ──────────────────────────────────────
story.extend(add_h1('10. Risk Assessment'))

story.append(body(
    'Every architectural migration carries risk. This section identifies the most significant '
    'risks, assesses their probability and impact, and defines mitigation strategies that reduce '
    'the risk to an acceptable level.'
))

story.append(spacer(8))

risk_table = make_table(
    ['Risk', 'Probability', 'Impact', 'Mitigation'],
    [
        ['Server component migration introduces rendering bugs',
         'Medium', 'High',
         'Incremental migration with visual regression testing at each step'],
        ['Performance budget too aggressive, blocking needed features',
         'Low', 'Medium',
         'Budget adjustment process with architecture team review'],
        ['Monorepo complexity increases build times',
         'Medium', 'Medium',
         'Turborepo remote caching and incremental builds'],
        ['Package API changes break downstream consumers',
         'Low', 'High',
         'Semver enforcement, changelog generation, deprecation warnings'],
        ['Edge deployment introduces latency in non-edge regions',
         'Low', 'Low',
         'Regional fallback to origin server, CDN cache warm-up'],
        ['Dependency removal breaks subtle functionality',
         'Medium', 'High',
         'Comprehensive test suite expansion before removal'],
        ['CSS deduplication causes visual regressions',
         'Medium', 'Medium',
         'Visual regression testing with pixel-diff comparison'],
        ['Team velocity decreases during migration',
         'High', 'Medium',
         'Phased approach with incremental value delivery'],
    ],
    col_widths=[CONTENT_W * 0.22, CONTENT_W * 0.10, CONTENT_W * 0.08, CONTENT_W * 0.60]
)
story.append(risk_table)
story.append(Paragraph('Table 8: Risk Assessment Matrix', CAPTION_STYLE))
story.append(spacer(10))

story.extend(add_h2('10.1 Highest Priority Risks'))

story.append(body(
    'The two highest-priority risks are server component migration rendering bugs and dependency '
    'removal breaking functionality. Both carry Medium probability and High impact. Mitigation for '
    'server component migration relies on incremental conversion: each component is migrated '
    'individually, tested in isolation, and verified through visual regression testing before '
    'merge. This approach limits the blast radius of any single migration error.'
))

story.append(body(
    'Dependency removal risk is mitigated by expanding the test suite before any removal. Each '
    'dependency targeted for removal is first wrapped in a compatibility shim that logs usage. '
    'Production monitoring over a one-week period confirms that the dependency is truly unused '
    'before the removal proceeds.'
))

story.extend(add_h2('10.2 Risk Monitoring'))

story.append(body(
    'Risks are monitored continuously through the migration. A risk register is maintained in '
    'the project management system with status updates at each phase review. The architecture '
    'team conducts a risk assessment review at the start of each phase, updating probability '
    'and impact assessments based on evidence from the previous phase.'
))

story.append(body(
    'New risks discovered during implementation are added to the register immediately and triaged '
    'by the architecture team. High-impact risks trigger an immediate mitigation plan, while '
    'lower-impact risks are added to the backlog for the next sprint cycle.'
))

story.extend(add_h2('10.3 Contingency Planning'))

story.append(body(
    'Each risk has a defined contingency trigger and response. If a phase exceeds its timeline '
    'by more than 30%, the architecture team convenes a scope review to determine whether '
    'deliverables should be deferred or the timeline should be extended. If a performance '
    'regression is detected in production that cannot be resolved within 24 hours, the rollback '
    'strategy (feature flags) is activated to restore the previous behavior.'
))

story.append(body(
    'Resource allocation contingencies address the risk of key personnel unavailability. Critical '
    'path tasks (budget CI, monorepo setup, server component migration) are assigned to at least '
    'two team members to ensure knowledge redundancy. Non-critical path tasks (documentation, '
    'polish, monitoring dashboard) can be deferred without impacting the migration timeline.'
))

story.extend(add_h2('10.4 Post-Migration Validation'))

story.append(body(
    'After all five phases are complete, a comprehensive post-migration validation is conducted. '
    'This validation covers four dimensions: performance verification (all budget targets met, '
    'Core Web Vitals at target), functional verification (all user-facing features working, no '
    'visual regressions), architecture verification (all packages independently installable, '
    'all boundaries enforced), and process verification (CI pipeline stable, monitoring operational, '
    'documentation current). The validation is conducted by a cross-functional team including '
    'engineering, product, and QA.'
))

story.append(callout(
    '<b>Success Definition:</b> The migration is considered successful when all acceptance criteria '
    'from Section 9 are met, all performance budgets from Section 8 are satisfied, and the '
    'platform has maintained zero-downtime throughout the migration. Partial success (e.g., '
    'achieving the performance budget but deferring the monorepo restructure) is documented as '
    'such and carries forward as technical debt in the next planning cycle.'
))


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BUILD DOCUMENT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
def main():
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    # Step 1: Generate body PDF
    body_pdf_path = OUTPUT_PATH.replace('.pdf', '_body.pdf')

    doc = FerrumDocTemplate(
        body_pdf_path,
        pagesize=A4,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
        title='FerrumEngine Architecture Blueprint',
        author='FerrumEngine Architecture Team',
        creator='FerrumEngine',
        subject='Next-Decade Platform Design',
    )

    frame = Frame(
        LEFT_MARGIN, BOTTOM_MARGIN,
        CONTENT_W, PAGE_H - TOP_MARGIN - BOTTOM_MARGIN,
        id='normal'
    )

    doc.addPageTemplates([
        PageTemplate(id='First', frames=frame, onPage=draw_first_page),
        PageTemplate(id='Later', frames=frame, onPage=draw_page_background),
    ])

    # Insert template switch after first page
    from reportlab.platypus.doctemplate import NextPageTemplate
    story.insert(0, NextPageTemplate('First'))
    # Find the PageBreak after TOC and insert template switch before it
    for i, item in enumerate(story):
        if isinstance(item, PageBreak):
            story.insert(i, NextPageTemplate('Later'))
            break

    doc.multiBuild(story)
    print(f'Body PDF generated: {body_pdf_path}')

    # Step 2: Render cover HTML to PDF
    cover_pdf_path = OUTPUT_PATH.replace('.pdf', '_cover.pdf')
    try:
        subprocess.run([
            'node', os.path.join(SCRIPTS_DIR, 'html2poster.js'),
            COVER_HTML, '--output', cover_pdf_path,
            '--width', '794px',
        ], check=True, capture_output=True, text=True, timeout=60)
        print(f'Cover PDF rendered: {cover_pdf_path}')
    except subprocess.CalledProcessError as e:
        print(f'Cover render failed: {e.stderr}')
        print('Proceeding without cover...')

    # Step 3: Merge cover + body
    if os.path.exists(cover_pdf_path):
        try:
            from pypdf import PdfReader, PdfWriter

            writer = PdfWriter()

            # Cover page
            cover_reader = PdfReader(cover_pdf_path)
            cover_page = cover_reader.pages[0]
            box = cover_page.mediabox
            w, h = float(box.width), float(box.height)
            if abs(w - PAGE_W) > 0.1 or abs(h - PAGE_H) > 0.1:
                cover_page.scale_to(PAGE_W, PAGE_H)
            writer.add_page(cover_page)

            # Body pages
            body_reader = PdfReader(body_pdf_path)
            for page in body_reader.pages:
                box = page.mediabox
                w, h = float(box.width), float(box.height)
                if abs(w - PAGE_W) > 2 or abs(h - PAGE_H) > 2:
                    page.scale_to(PAGE_W, PAGE_H)
                writer.add_page(page)

            writer.add_metadata({
                '/Title': 'FerrumEngine Architecture Blueprint - Next-Decade Platform Design',
                '/Author': 'FerrumEngine Architecture Team',
                '/Creator': 'FerrumEngine',
                '/Subject': 'Architecture Blueprint for FerrumEngine Platform Redesign',
            })

            with open(OUTPUT_PATH, 'wb') as f:
                writer.write(f)

            print(f'Merged PDF saved: {OUTPUT_PATH}')

            # Clean up temp files
            os.remove(body_pdf_path)
            os.remove(cover_pdf_path)

        except ImportError:
            print('pypdf not available, using body PDF as output')
            import shutil
            shutil.copy2(body_pdf_path, OUTPUT_PATH)
    else:
        import shutil
        shutil.copy2(body_pdf_path, OUTPUT_PATH)

    print(f'Final PDF: {OUTPUT_PATH}')


if __name__ == '__main__':
    main()
