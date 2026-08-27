#!/usr/bin/env python3
"""
Ferrum AI Design Intelligence Architecture - Body PDF
ReportLab generation script (no cover — cover is merged separately).
"""

import os, sys, hashlib, re

import platform
_IS_MAC = platform.system() == 'Darwin'
FONT_DIR = os.path.expanduser('~/.openclaw/workspace/fonts') if _IS_MAC else '/usr/share/fonts'

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable, Image, CondPageBreak
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ━━ Cascade Palette ━━
PAGE_BG       = colors.HexColor('#f4f4f4')
SECTION_BG    = colors.HexColor('#eeeff0')
CARD_BG       = colors.HexColor('#e6e9eb')
TABLE_STRIPE  = colors.HexColor('#ebedee')
HEADER_FILL   = colors.HexColor('#3c4f59')
COVER_BLOCK   = colors.HexColor('#5b7581')
BORDER        = colors.HexColor('#c0d1d9')
ICON          = colors.HexColor('#4e819b')
ACCENT        = colors.HexColor('#206c91')
ACCENT_2      = colors.HexColor('#b13d51')
TEXT_PRIMARY   = colors.HexColor('#161818')
TEXT_MUTED     = colors.HexColor('#7c8386')
SEM_SUCCESS   = colors.HexColor('#4f8761')
SEM_WARNING   = colors.HexColor('#9f8144')
SEM_ERROR     = colors.HexColor('#a5554e')
SEM_INFO      = colors.HexColor('#446688')

# ━━ OutlineDocTemplate ━━
class OutlineDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(text, key, level, 0)

# ━━ Styles ━━
MARGIN = 1.0 * inch
AVAILABLE_W = A4[0] - 2 * MARGIN

h1_style = ParagraphStyle(
    name='H1', fontName='FreeSerif-Bold', fontSize=22, leading=28,
    spaceBefore=18, spaceAfter=10, textColor=TEXT_PRIMARY, alignment=TA_LEFT)
h2_style = ParagraphStyle(
    name='H2', fontName='FreeSerif-Bold', fontSize=16, leading=22,
    spaceBefore=14, spaceAfter=8, textColor=ACCENT, alignment=TA_LEFT)
h3_style = ParagraphStyle(
    name='H3', fontName='FreeSerif-Bold', fontSize=12.5, leading=17,
    spaceBefore=10, spaceAfter=6, textColor=TEXT_PRIMARY, alignment=TA_LEFT)
body_style = ParagraphStyle(
    name='Body', fontName='FreeSerif', fontSize=10.5, leading=17,
    spaceBefore=0, spaceAfter=6, textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY)
bullet_style = ParagraphStyle(
    name='Bullet', fontName='FreeSerif', fontSize=10.5, leading=17,
    spaceBefore=2, spaceAfter=2, textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    leftIndent=18, bulletIndent=6, bulletFontSize=10)
code_style = ParagraphStyle(
    name='Code', fontName='DejaVuSans', fontSize=8.5, leading=12,
    spaceBefore=4, spaceAfter=4, textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    leftIndent=12, backColor=colors.HexColor('#f0f2f3'),
    borderPadding=6)
caption_style = ParagraphStyle(
    name='Caption', fontName='FreeSerif-Italic', fontSize=9, leading=13,
    spaceBefore=3, spaceAfter=6, textColor=TEXT_MUTED, alignment=TA_CENTER)
stat_num_style = ParagraphStyle(
    name='StatNum', fontName='FreeSerif-Bold', fontSize=20, leading=24,
    textColor=ACCENT, alignment=TA_CENTER)
stat_label_style = ParagraphStyle(
    name='StatLabel', fontName='FreeSerif', fontSize=8.5, leading=12,
    textColor=TEXT_MUTED, alignment=TA_CENTER)

# (TOC styles removed - using PDF outline bookmarks instead)

# ━━ Helpers ━━
_heading_counter = 0
def heading(text, style, level=0):
    global _heading_counter
    _heading_counter += 1
    key = f'heading{_heading_counter:04d}'
    p = Paragraph(f'<b>{text}</b>', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def para(text):
    return Paragraph(text, body_style)

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', bullet_style)

def make_table(headers, rows, col_widths=None):
    """Build a styled table with Paragraph-wrapped cells."""
    if col_widths is None:
        n = len(headers)
        col_widths = [AVAILABLE_W / n] * n
    data = [[Paragraph(f'<b>{h}</b>', ParagraphStyle(
        name=f'th_{h}', fontName='FreeSerif-Bold', fontSize=9, leading=13,
        textColor=colors.white, alignment=TA_LEFT)) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), ParagraphStyle(
            name=f'td_{c[:8]}', fontName='FreeSerif', fontSize=9, leading=13,
            textColor=TEXT_PRIMARY, alignment=TA_LEFT)) for c in row])
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_STRIPE]),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]
    t.setStyle(TableStyle(style_cmds))
    return t

def callout_box(number, label):
    """Create a small callout metric box."""
    c = Table(
        [[Paragraph(f'<b>{number}</b>', stat_num_style)],
         [Paragraph(label, stat_label_style)]],
        colWidths=[130])
    c.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('BOX', (0, 0), (-1, -1), 1, ACCENT),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    return c

def safe_keep(elements):
    """Keep elements together only if total height is reasonable."""
    total_h = 0
    for el in elements:
        w, h = el.wrap(AVAILABLE_W, A4[1])
        total_h += h
    if total_h <= A4[1] * 0.4:
        return [KeepTogether(elements)]
    elif len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)

# ━━ Page numbering ━━
def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('FreeSerif', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawCentredString(A4[0] / 2, 30, str(doc.page))
    canvas.restoreState()

# ━━ Build Story ━━
OUTPUT = '/home/z/my-project/scripts/ferrum_ai_body.pdf'

doc = OutlineDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=MARGIN,
    title='Ferrum AI Design Intelligence Architecture',
    author='Z.ai', creator='Z.ai',
    subject='Ferrum AI Intelligence Layer Architecture')

story = []

# ═══════════════════════════════════════════════════════════════
# CHAPTER 1: EXECUTIVE SUMMARY & VISION
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 1: Executive Summary and Vision', h1_style, 0))

story.append(heading('1.1 The Problem with Current AI Code Generation', h2_style, 1))
story.append(para(
    'The current generation of AI-powered development tools, including v0 by Vercel, GitHub Copilot, Claude Code, '
    'Lovable, and Bolt.new, has made significant strides in automating frontend code generation. These tools excel at '
    'translating natural language prompts into functional React components, generating boilerplate code, and accelerating '
    'individual developer workflows. However, they share a fundamental architectural limitation: they treat interface '
    'creation as a code-writing problem rather than a design-systems problem. The output is a collection of JSX files, '
    'CSS modules, or component trees that may look correct in isolation but lack the systemic coherence that '
    'distinguishes a production-grade interface from a prototype.'
))
story.append(para(
    'Figma AI and Adobe Firefly approach the problem from the visual design side, offering intelligent layout '
    'suggestions, auto-arrangement, and style transfer. Yet these tools operate within the bounds of a design tool '
    'ecosystem and struggle to produce the semantic structure, accessibility metadata, responsive behavior, and '
    'framework-specific code that engineers require. The gap between "a beautiful design" and "a production-ready '
    'interface system" remains wide. Ferrum AI is designed to close that gap entirely.'
))

story.append(heading('1.2 The Ferrum AI Thesis', h2_style, 1))
story.append(para(
    'Ferrum AI is the intelligence layer of the Ferrum Universal UI Engine. Its foundational thesis is that generating '
    'a user interface is not equivalent to generating frontend code. A true interface system encompasses visual hierarchy, '
    'typographic rhythm, spatial logic, color psychology, motion language, accessibility guarantees, responsive behavior '
    'across breakpoints, and performance characteristics. Current tools address one or two of these dimensions; Ferrum AI '
    'addresses all of them simultaneously through a unified generation pipeline.'
))
story.append(para(
    'The system accepts four distinct input modalities: natural language descriptions, screenshots, Figma designs, and '
    'existing application codebases. Regardless of input type, the output is always a complete interface system, including '
    'component definitions, layout specifications, style tokens, animation choreography, accessibility annotations, and '
    'production-ready code for the target framework. Ferrum AI does not generate "a button component" in isolation. It '
    'generates the entire button system: primary, secondary, ghost, destructive variants; hover, focus, active, and '
    'disabled states; sizing scale; icon integration rules; and the design tokens that bind them all together.'
))

story.append(heading('1.3 Design Intelligence vs. Code Intelligence', h2_style, 1))
story.append(para(
    'The distinction between design intelligence and code intelligence is central to Ferrum AI\'s architecture. Code '
    'intelligence, as embodied by GitHub Copilot and Claude Code, understands programming patterns, API contracts, and '
    'debugging strategies. Design intelligence, as embodied by Ferrum AI, understands visual composition, spatial '
    'relationships, typographic hierarchy, color theory, motion principles, and human perceptual psychology. The '
    'generation pipeline in Ferrum AI operates through design reasoning first and code emission second. The system '
    'plans the visual and experiential qualities of an interface before writing a single line of code, ensuring that '
    'the resulting system is coherent at every level of abstraction.'
))
story.append(Spacer(1, 12))

# Callout metrics
metrics_row = Table(
    [[callout_box('4', 'Input Modalities'),
      callout_box('8', 'Design Dimensions'),
      callout_box('6+', 'Target Frameworks'),
      callout_box('100%', 'System Output')],
    ],
    colWidths=[AVAILABLE_W / 4] * 4, hAlign='CENTER')
metrics_row.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
]))
story.append(metrics_row)
story.append(Spacer(1, 18))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 2: SYSTEM ARCHITECTURE
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 2: System Architecture', h1_style, 0))

story.append(heading('2.1 High-Level Architecture Overview', h2_style, 1))
story.append(para(
    'Ferrum AI is structured as a multi-stage pipeline architecture where each stage refines and enriches the '
    'intermediate representation before passing it downstream. The architecture follows a principle of progressive '
    'refinement: raw user input is gradually transformed into increasingly specific and actionable representations, '
    'from abstract intent to concrete component trees with associated tokens, styles, motion, and accessibility '
    'metadata. This approach allows each stage to be developed, tested, and optimized independently while '
    'maintaining a clean interface contract between stages.'
))
story.append(para(
    'The system is composed of five primary layers: the Input Ingestion Layer, the Design Reasoning Engine, the '
    'Component Planning System, the Motion and Interaction Generator, and the Production Code Emitter. Each layer '
    'communicates through a typed intermediate representation (IR) that ensures type safety, enables validation at '
    'stage boundaries, and allows for parallel development. The IR serves as the backbone of the system, making it '
    'possible to swap out individual models or algorithms without affecting the rest of the pipeline.'
))

story.append(heading('2.2 Input Ingestion Layer', h2_style, 1))
story.append(para(
    'The Input Ingestion Layer is responsible for normalizing all four input modalities into a unified intent '
    'representation. This layer is critical because the quality of normalization directly determines the quality of '
    'every downstream generation step. Each input modality requires specialized preprocessing, and the layer is '
    'designed as a pluggable adapter pattern where new input types can be added without modifying the core pipeline.'
))

story.append(heading('2.2.1 Natural Language Input', h3_style, 1))
story.append(para(
    'Natural language prompts such as "Create a banking dashboard" are processed through a multi-stage NLP pipeline. '
    'First, the intent classifier identifies the domain (financial, medical, gaming, etc.), the interface type '
    '(dashboard, landing page, form, etc.), and the design mood (premium, enterprise, playful, etc.). Second, the '
    'entity extractor identifies specific components mentioned or implied by the prompt, such as "transaction '
    'history table," "account balance card," or "notification bell." Third, the constraint resolver identifies '
    'implicit requirements like "must be accessible" or "should work on mobile." The output is a structured intent '
    'object that feeds into the Design Reasoning Engine.'
))

story.append(heading('2.2.2 Screenshot Input', h3_style, 1))
story.append(para(
    'Screenshot analysis uses a vision-language model (VLM) to decompose the input image into its constituent UI '
    'elements. The system identifies component boundaries, text content, color palettes, typographic styles, spacing '
    'patterns, and layout structures. Unlike simple screenshot-to-code tools that produce a pixel-perfect reproduction, '
    'Ferrum AI extracts the design system underlying the screenshot: the spacing scale, the color tokens, the '
    'typographic hierarchy, and the component patterns. This means that a single screenshot of a well-designed '
    'application can yield a complete, customizable design system that can be applied to entirely different interfaces.'
))

story.append(heading('2.2.3 Figma Design Input', h3_style, 1))
story.append(para(
    'Figma integration operates through the Figma REST API and WebSocket real-time collaboration endpoints. The system '
    'reads the Figma document tree, extracts component definitions, style properties, auto-layout rules, variant '
    'groups, and design token annotations. Critically, Ferrum AI does not simply convert Figma frames to HTML. It '
    'analyzes the design system embedded in the Figma file: the component architecture, the prop interfaces implied '
    'by variant groups, the responsive behavior encoded in auto-layout constraints, and the design tokens defined in '
    'Figma Variables. The output is a native Ferrum Component System that preserves the design intent of the original '
    'Figma file while making it fully programmable and extensible.'
))

story.append(heading('2.2.4 Existing Application Analysis', h3_style, 1))
story.append(para(
    'When given an existing React, Vue, Svelte, or Angular application, Ferrum AI performs a static analysis of the '
    'component tree, CSS architecture, and state management patterns. It identifies inconsistencies in the design '
    'system: components that deviate from the spacing scale, colors that fall outside the palette, typography that '
    'violates the hierarchy, and accessibility gaps. The system then generates a comprehensive improvement report with '
    'specific, actionable recommendations, ranked by impact and implementation effort. This mode transforms Ferrum AI '
    'from a generation tool into an intelligent design auditor and system optimizer.'
))

story.append(Spacer(1, 12))

# Architecture layers table
story.append(make_table(
    ['Layer', 'Input', 'Output', 'Key Technology'],
    [
        ['Input Ingestion', 'Raw user input (4 types)', 'Unified Intent IR', 'NLP, VLM, Figma API, AST Parsing'],
        ['Design Reasoning', 'Intent IR', 'Design Specification IR', 'Design Intelligence Model'],
        ['Component Planning', 'Design Spec IR', 'Component Tree IR', 'Component Graph Generator'],
        ['Motion Generator', 'Component Tree IR', 'Motion + Interaction IR', 'Physics Graph, Timeline Engine'],
        ['Code Emitter', 'Full System IR', 'Production code (6+ frameworks)', 'Multi-framework AST Builders'],
    ],
    [AVAILABLE_W * 0.18, AVAILABLE_W * 0.22, AVAILABLE_W * 0.25, AVAILABLE_W * 0.35]))
story.append(Paragraph('<i>Table 1: Ferrum AI pipeline layers and their responsibilities.</i>', caption_style))
story.append(Spacer(1, 18))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 3: AI MODEL STRATEGY
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 3: AI Model Strategy', h1_style, 0))

story.append(heading('3.1 Multi-Model Orchestration', h2_style, 1))
story.append(para(
    'Ferrum AI does not rely on a single foundation model. Instead, it employs a multi-model orchestration strategy '
    'where specialized models are assigned to specific stages of the generation pipeline. This approach recognizes '
    'that no single model excels at all tasks: vision models outperform language models at visual analysis, smaller '
    'fine-tuned models outperform large general models at structured design token generation, and large reasoning '
    'models outperform specialized models at complex design decision-making. The orchestration layer manages model '
    'selection, prompt routing, output validation, and fallback logic.'
))

story.append(heading('3.2 Model Allocation Matrix', h2_style, 1))
story.append(para(
    'The model allocation strategy assigns specific model categories to each pipeline stage based on the cognitive '
    'requirements of the task. Vision-language models handle screenshot and design file analysis because they can '
    'process both pixel data and semantic information simultaneously. Large language models with strong reasoning '
    'capabilities handle design planning and component architecture because these tasks require multi-step logical '
    'inference. Fine-tuned specialist models handle token generation, motion parameter calculation, and code emission '
    'because these tasks benefit from domain-specific pattern recognition rather than general reasoning ability.'
))

story.append(Spacer(1, 12))
story.append(make_table(
    ['Pipeline Stage', 'Primary Model Type', 'Secondary / Fallback', 'Fine-tuning Strategy'],
    [
        ['Intent Classification', 'Large Reasoning LLM', 'Fine-tuned Classifier', 'Domain-specific intent taxonomy'],
        ['Screenshot Analysis', 'Vision-Language Model', 'Layout Detection Model', 'UI component detection dataset'],
        ['Design Reasoning', 'Large Reasoning LLM', 'Design-specific LLM', 'Design principle grounding'],
        ['Token Generation', 'Fine-tuned Specialist', 'Rule-based Fallback', 'Design system pattern corpus'],
        ['Motion Planning', 'Fine-tuned Specialist', 'Physics Simulation', 'Motion design pattern corpus'],
        ['Accessibility Audit', 'Fine-tuned Classifier', 'Rule-based Engine', 'WCAG + ARIA pattern dataset'],
        ['Code Emission', 'Fine-tuned Code LLM', 'AST Template Engine', 'Framework-specific code corpus'],
    ],
    [AVAILABLE_W * 0.20, AVAILABLE_W * 0.22, AVAILABLE_W * 0.22, AVAILABLE_W * 0.36]))
story.append(Paragraph('<i>Table 2: Model allocation matrix across the Ferrum AI pipeline.</i>', caption_style))
story.append(Spacer(1, 18))

story.append(heading('3.3 The Design Reasoning Model', h2_style, 1))
story.append(para(
    'The Design Reasoning Model is the cognitive core of Ferrum AI. It receives the normalized intent from the Input '
    'Ingestion Layer and produces a comprehensive Design Specification that serves as the blueprint for all downstream '
    'generation. Unlike code generation models that operate at the token level, the Design Reasoning Model operates at '
    'the design-decision level. It reasons about visual hierarchy: which elements should dominate attention and why. '
    'It reasons about typographic rhythm: how font sizes, weights, and line heights should relate to create a readable '
    'and aesthetically pleasing hierarchy. It reasons about spatial logic: how spacing should scale to create visual '
    'grouping, separation, and breathing room.'
))
story.append(para(
    'The model is trained on a curated dataset of high-quality design systems, including material design guidelines, '
    'Apple Human Interface Guidelines, IBM Carbon Design System, and hundreds of production design systems from '
    'companies across industries. The training objective is not to memorize specific designs but to internalize the '
    'principles that make designs effective: consistency, hierarchy, contrast, alignment, proximity, and repetition. '
    'This principled approach enables the model to generate novel designs that follow established design theory rather '
    'than simply reproducing patterns from its training data.'
))

story.append(heading('3.4 Context Window and Memory Architecture', h2_style, 1))
story.append(para(
    'Design reasoning requires maintaining awareness of dozens of interconnected decisions simultaneously. A color '
    'choice affects typography contrast, which affects accessibility compliance, which affects component styling, '
    'which affects the visual hierarchy. To manage this complexity, Ferrum AI employs a hierarchical memory '
    'architecture with three tiers. The first tier is the active context window, which holds the current generation '
    'state and immediate design decisions. The second tier is the design system memory, which holds the accumulated '
    'tokens, components, and rules generated so far in the current session. The third tier is the cross-session '
    'memory, which holds user preferences, project design systems, and organizational brand guidelines that persist '
    'across multiple Ferrum AI sessions.'
))
story.append(para(
    'This hierarchical approach allows the system to maintain global coherence even when individual generation steps '
    'operate on small context windows. When the code emitter generates a specific component, it queries the design '
    'system memory to ensure that its tokens, spacing, and styling are consistent with every other component in the '
    'system. This eliminates the "drift" problem that plagues current AI code generators, where individually '
    'generated components gradually diverge from each other in style and behavior.'
))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 4: DATA REQUIREMENTS
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 4: Data Requirements', h1_style, 0))

story.append(heading('4.1 Training Data Taxonomy', h2_style, 1))
story.append(para(
    'The quality of Ferrum AI\'s output is directly proportional to the quality, diversity, and structure of its '
    'training data. Unlike code generation models that can be trained on raw source code from public repositories, '
    'design intelligence requires carefully curated datasets that capture not just what a design looks like but why '
    'it looks that way. The training data taxonomy is organized into four primary categories: design system '
    'specifications, design-decision rationales, component behavior patterns, and user-perception metrics.'
))

story.append(heading('4.1.1 Design System Specifications', h3_style, 1))
story.append(para(
    'This category includes complete design system documentation from production applications: token definitions '
    '(color, spacing, typography, elevation, border-radius), component APIs (props, variants, states), layout '
    'systems (grid specifications, breakpoint definitions, container queries), and motion specifications (easing '
    'curves, duration scales, choreography rules). Sources include open-source design systems such as Material '
    'Design, Carbon, Fluent, Ant Design, and Chakra UI, as well as proprietary design systems contributed by '
    'partner organizations under data-sharing agreements. Each design system is normalized into a standard schema '
    'that captures the complete structure of the system, not just its visual output.'
))

story.append(heading('4.1.2 Design-Decision Rationales', h3_style, 1))
story.append(para(
    'This is the most critical and most difficult data category to assemble. It captures not just the final design '
    'artifact but the reasoning process that led to it: why a specific color was chosen over alternatives, why a '
    'layout uses a 12-column grid instead of 8 or 16, why a component uses a specific interaction pattern. This '
    'data is sourced from design case studies, post-mortem analyses, design system documentation with rationale '
    'annotations, and structured interviews with senior designers. The goal is to teach the Design Reasoning Model '
    'not just what good design looks like but how good designers think about design problems.'
))

story.append(heading('4.1.3 Component Behavior Patterns', h3_style, 1))
story.append(para(
    'Component behavior data captures the full state machine of UI components: every state (default, hover, focus, '
    'active, disabled, loading, error, success), every transition between states, every responsive adaptation, and '
    'every accessibility requirement. This data is structured as state-transition diagrams with associated styling '
    'rules, motion specifications, and ARIA annotations. The dataset includes thousands of component variants across '
    'different design systems, industries, and interaction paradigms, providing the model with a comprehensive '
    'vocabulary of component behavior patterns to draw from during generation.'
))

story.append(heading('4.1.4 User-Perception Metrics', h3_style, 1))
story.append(para(
    'This category captures quantitative data about how users perceive and interact with interface designs. It '
    'includes eye-tracking studies that reveal visual hierarchy effectiveness, A/B test results that measure the '
    'impact of specific design decisions on conversion and engagement, accessibility audit results that quantify '
    'compliance gaps, and performance benchmarks that measure rendering efficiency. This data grounds the Design '
    'Reasoning Model in empirical reality, ensuring that its outputs are not just theoretically sound but '
    'demonstrably effective at achieving user-facing goals.'
))

story.append(heading('4.2 Data Quality and Curation Pipeline', h2_style, 1))
story.append(para(
    'Raw data undergoes a multi-stage curation pipeline before entering the training corpus. The pipeline includes '
    'automated schema validation (ensuring data conforms to the Ferrum Design Schema), deduplication (removing '
    'near-duplicate design systems that would bias the model), quality scoring (assigning a reliability score based '
    'on source authority, recency, and completeness), and bias auditing (detecting and mitigating over-representation '
    'of specific industries, aesthetic styles, or cultural perspectives). The curation pipeline runs continuously, '
    'incorporating new data sources and re-evaluating existing ones as the model evolves.'
))
story.append(Spacer(1, 12))

story.append(make_table(
    ['Data Category', 'Est. Volume', 'Primary Sources', 'Key Challenge'],
    [
        ['Design Systems', '500+ systems', 'Open-source, Partners', 'Schema normalization'],
        ['Decision Rationales', '10K+ decisions', 'Case studies, Interviews', 'Structured extraction'],
        ['Component Behaviors', '50K+ state machines', 'Production apps, Libraries', 'Completeness of states'],
        ['User Perception', '100K+ data points', 'A/B tests, Eye-tracking', 'Standardization'],
    ],
    [AVAILABLE_W * 0.22, AVAILABLE_W * 0.18, AVAILABLE_W * 0.30, AVAILABLE_W * 0.30]))
story.append(Paragraph('<i>Table 3: Training data categories, volumes, and challenges.</i>', caption_style))
story.append(Spacer(1, 18))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 5: PROMPT SYSTEM DESIGN
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 5: Prompt System Design', h1_style, 0))

story.append(heading('5.1 Prompt Architecture Philosophy', h2_style, 1))
story.append(para(
    'Ferrum AI\'s prompt system is fundamentally different from the simple prompt-response pattern used by tools like '
    'v0 and Claude Code. Where those tools use a single monolithic prompt that asks the model to "generate a UI from '
    'this description," Ferrum AI decomposes the generation task into a structured sequence of specialized prompts, '
    'each targeting a specific cognitive capability of the model. This decomposition serves three purposes: it enables '
    'parallel execution where stages are independent, it allows for intermediate validation and correction between '
    'stages, and it makes the system\'s reasoning process transparent and debuggable.'
))

story.append(heading('5.2 The Prompt Pipeline', h2_style, 1))
story.append(para(
    'Each stage of the Ferrum AI pipeline is driven by a carefully engineered prompt template that provides the model '
    'with the exact context, constraints, and output format it needs to produce high-quality results. The prompt '
    'pipeline is a directed acyclic graph where each node is a prompt invocation and each edge is a data dependency. '
    'The system supports conditional branching: if the accessibility auditor detects violations, the pipeline can '
    'loop back to the component planning stage with specific correction instructions.'
))

story.append(heading('5.2.1 Intent Resolution Prompt', h3_style, 1))
story.append(para(
    'The intent resolution prompt takes the raw user input and produces a structured intent object. It is engineered '
    'to extract domain context, identify implicit requirements, resolve ambiguities, and establish the design mood. '
    'The prompt includes few-shot examples from each domain (financial, medical, gaming, etc.) and each mood '
    '(premium, enterprise, playful, etc.) to anchor the model\'s classification behavior. The output is a JSON '
    'schema with fields for domain, interface_type, design_mood, implied_components, accessibility_requirements, '
    'performance_constraints, and brand_alignment.'
))

story.append(heading('5.2.2 Design Specification Prompt', h3_style, 1))
story.append(para(
    'The design specification prompt receives the intent object and produces a comprehensive design specification '
    'covering all eight dimensions of design intelligence: visual hierarchy, typography, spacing, color psychology, '
    'motion language, accessibility, responsive behavior, and performance. This prompt is the longest and most '
    'carefully engineered in the system. It includes design theory principles as ground rules, industry-specific '
    'design patterns as references, and a structured output schema that ensures the model addresses every dimension. '
    'The design specification serves as the single source of truth for all downstream generation stages.'
))

story.append(heading('5.2.3 Component Architecture Prompt', h3_style, 1))
story.append(para(
    'The component architecture prompt translates the design specification into a concrete component tree. It '
    'identifies the atomic components needed, their composition patterns, their prop interfaces, their state '
    'machines, and their relationships to the design tokens defined in the specification. This prompt is designed '
    'to produce component architectures that are not just functional but extensible: each component is defined with '
    'a clear API surface that allows engineers to customize behavior without modifying the component\'s internal '
    'logic, following the principle of "open for extension, closed for modification."'
))

story.append(heading('5.2.4 Motion and Interaction Prompt', h3_style, 1))
story.append(para(
    'The motion and interaction prompt receives the component tree and the design specification\'s motion language '
    'section, and produces a complete motion choreography for the interface. It defines timing curves, duration '
    'scales, stagger patterns, scroll-linked behaviors, gesture responses, and page transition choreography. The '
    'prompt is grounded in motion design principles from animation theory, material motion guidelines, and the '
    'physics-based animation systems used in tools like Framer and After Effects. The output is a structured motion '
    'graph that the code emitter translates into framework-specific animation code.'
))

story.append(heading('5.2.5 Code Generation Prompt', h3_style, 1))
story.append(para(
    'The code generation prompt is the final stage of the pipeline. It receives the complete system IR (design '
    'specification, component tree, motion graph, and accessibility annotations) and produces production-ready code '
    'for the target framework. This prompt is uniquely engineered for each supported framework (React, Vue, Svelte, '
    'Angular, Web Components, HTML+CSS) and includes framework-specific best practices, performance optimization '
    'patterns, and accessibility implementation patterns. The code output includes not just component code but also '
    'token files, type definitions, utility functions, and documentation comments.'
))

story.append(heading('5.3 Prompt Engineering Principles', h2_style, 1))
story.append(para(
    'The prompt system is governed by five engineering principles that ensure consistency, quality, and '
    'maintainability across the entire pipeline. First, the principle of structured output: every prompt produces '
    'machine-parseable output in a defined schema, never free-form text. Second, the principle of progressive '
    'context: each prompt receives exactly the context it needs from upstream stages, neither more nor less. Third, '
    'the principle of validation gates: each prompt\'s output is validated against schema constraints before being '
    'passed downstream. Fourth, the principle of deterministic fallbacks: when a model produces invalid output, '
    'the system falls back to rule-based generation rather than failing. Fifth, the principle of explainability: '
    'every design decision is accompanied by a human-readable rationale that can be reviewed and overridden by '
    'the designer or engineer.'
))
story.append(Spacer(1, 12))

story.append(make_table(
    ['Prompt Stage', 'Input Schema', 'Output Schema', 'Validation Strategy'],
    [
        ['Intent Resolution', 'Raw user input', 'Intent IR (JSON)', 'Schema + Domain check'],
        ['Design Specification', 'Intent IR', 'Design Spec IR', 'Completeness check (8 dims)'],
        ['Component Planning', 'Design Spec IR', 'Component Tree IR', 'Acyclic graph validation'],
        ['Motion Generation', 'Component Tree + Motion Spec', 'Motion Graph IR', 'Physics plausibility check'],
        ['Code Emission', 'Full System IR', 'Framework source files', 'AST parse + lint validation'],
    ],
    [AVAILABLE_W * 0.20, AVAILABLE_W * 0.22, AVAILABLE_W * 0.25, AVAILABLE_W * 0.33]))
story.append(Paragraph('<i>Table 4: Prompt pipeline stages with schemas and validation.</i>', caption_style))
story.append(Spacer(1, 18))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 6: EVALUATION FRAMEWORK
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 6: Evaluation Framework', h1_style, 0))

story.append(heading('6.1 Multi-Dimensional Quality Assessment', h2_style, 1))
story.append(para(
    'Evaluating the output of a design intelligence system requires a fundamentally different approach than evaluating '
    'code generation. Code can be assessed by running tests, checking type correctness, and measuring performance '
    'benchmarks. Design quality, however, is inherently multi-dimensional and partially subjective. Ferrum AI\'s '
    'evaluation framework addresses this challenge by decomposing "quality" into eight measurable dimensions, each '
    'with automated quantitative metrics and periodic human evaluation protocols.'
))

story.append(heading('6.2 The Eight Quality Dimensions', h2_style, 1))
story.append(para(
    'Each quality dimension is assessed independently, and the composite quality score is a weighted average. The '
    'weights are configurable per project: a medical application might weight accessibility higher, while a gaming '
    'interface might weight motion and visual impact higher. This configurability ensures that the evaluation '
    'framework adapts to the specific priorities of each use case rather than imposing a one-size-fits-all standard.'
))

story.append(heading('6.2.1 Visual Hierarchy Score', h3_style, 1))
story.append(para(
    'Measured by analyzing the contrast ratios between heading levels, the size ratios between primary and secondary '
    'content, and the spatial prominence of key interactive elements. The system uses a simulated eye-tracking model '
    'that predicts where a user\'s attention would be drawn first, second, and third upon encountering the interface. '
    'The score reflects how closely the predicted attention sequence matches the intended information hierarchy '
    'specified in the design rationale.'
))

story.append(heading('6.2.2 Design System Consistency Score', h3_style, 1))
story.append(para(
    'Measured by checking that all components use tokens from the defined design system, that spacing follows the '
    'specified scale, that colors belong to the defined palette, and that typography follows the established '
    'hierarchy. This dimension catches the "drift" problem where individually generated components gradually diverge '
    'from the system\'s design tokens. A perfect consistency score means every visual property in every component '
    'can be traced back to a design system token.'
))

story.append(heading('6.2.3 Accessibility Compliance Score', h3_style, 1))
story.append(para(
    'Measured by running an automated WCAG 2.2 AA audit on the generated output. This includes color contrast '
    'ratios (minimum 4.5:1 for body text, 3:1 for large text), keyboard navigation completeness, ARIA annotation '
    'coverage, focus indicator visibility, screen reader compatibility, and reduced-motion support. The system '
    'also performs semantic HTML validation to ensure that the component structure conveys the correct meaning to '
    'assistive technologies. Any critical WCAG violation results in an automatic pipeline correction loop.'
))

story.append(heading('6.2.4 Responsive Behavior Score', h3_style, 1))
story.append(para(
    'Measured by rendering the generated interface at multiple viewport widths (320px, 375px, 768px, 1024px, 1440px, '
    '1920px) and checking for layout breaks, overflow issues, content truncation, and inappropriate layout shifts. '
    'The system evaluates whether the responsive behavior follows the breakpoint strategy defined in the design '
    'specification and whether content reflows maintain the intended visual hierarchy at each breakpoint.'
))

story.append(heading('6.2.5 Motion Quality Score', h3_style, 1))
story.append(para(
    'Measured by analyzing the timing, easing, and choreography of generated animations against motion design '
    'principles. The evaluation checks that animation durations fall within recommended ranges (100-500ms for micro-'
    'interactions, 300-1000ms for transitions), that easing curves feel natural (prefer ease-out for entering '
    'elements, ease-in for exiting), that stagger patterns create rhythmic sequences, and that all animations respect '
    'the user\'s prefers-reduced-motion setting. The physics plausibility check ensures that motion parameters '
    'correspond to physically realistic behavior.'
))

story.append(heading('6.2.6 Code Quality Score', h3_style, 1))
story.append(para(
    'Measured by running framework-specific linting tools, type checkers, and static analysis on the generated code. '
    'The evaluation checks for correct TypeScript types, proper component composition patterns, absence of code '
    'duplication, adherence to framework conventions, and performance anti-patterns. The code quality score ensures '
    'that the generated output is not just visually correct but engineer-ready: code that a senior developer would '
    'accept into a production codebase without significant refactoring.'
))

story.append(heading('6.2.7 Performance Score', h3_style, 1))
story.append(para(
    'Measured by estimating the rendering performance of the generated interface using a combination of static '
    'analysis and synthetic rendering benchmarks. The evaluation checks for excessive re-renders, unoptimized '
    'image handling, layout thrashing, bundle size impact, and cumulative layout shift (CLS). The performance '
    'score is calibrated against industry benchmarks: the generated interface should meet or exceed the performance '
    'characteristics of hand-coded production interfaces for equivalent complexity.'
))

story.append(heading('6.2.8 Design Mood Fidelity Score', h3_style, 1))
story.append(para(
    'This is the most uniquely "Ferrum AI" dimension. It measures how faithfully the generated interface reflects '
    'the intended design mood (premium, enterprise, playful, medical, financial, gaming) as specified in the user\'s '
    'intent. The assessment uses a classifier trained on a dataset of mood-labeled interfaces to evaluate whether the '
    'generated output would be perceived by human users as belonging to the target mood category. This dimension '
    'captures the qualitative, aesthetic aspect of design that purely technical metrics miss.'
))
story.append(Spacer(1, 12))

story.append(make_table(
    ['Dimension', 'Weight (Default)', 'Automated', 'Human Review'],
    [
        ['Visual Hierarchy', '15%', 'Yes', 'Periodic'],
        ['Design System Consistency', '15%', 'Yes', 'On-demand'],
        ['Accessibility Compliance', '20%', 'Yes', 'Periodic'],
        ['Responsive Behavior', '10%', 'Yes', 'Periodic'],
        ['Motion Quality', '10%', 'Yes', 'On-demand'],
        ['Code Quality', '10%', 'Yes', 'Continuous'],
        ['Performance', '10%', 'Yes', 'Periodic'],
        ['Design Mood Fidelity', '10%', 'Classifier', 'Periodic'],
    ],
    [AVAILABLE_W * 0.28, AVAILABLE_W * 0.18, AVAILABLE_W * 0.20, AVAILABLE_W * 0.34]))
story.append(Paragraph('<i>Table 5: Evaluation dimensions with default weights and review cadence.</i>', caption_style))
story.append(Spacer(1, 18))

story.append(heading('6.3 Benchmark Suite and Regression Testing', h2_style, 1))
story.append(para(
    'The evaluation framework includes a curated benchmark suite of 200 generation tasks spanning all four input '
    'modalities, all six design moods, and all supported frameworks. Each task has a reference output that was '
    'manually reviewed and approved by senior designers and engineers. The benchmark suite runs on every model '
    'update to detect regressions: any decrease in a quality dimension score beyond a defined threshold triggers '
    'an automatic alert and blocks the model deployment until the regression is investigated and resolved. This '
    'continuous regression testing ensures that Ferrum AI\'s output quality monotonically improves over time, never '
    'degrading as new features are added or models are updated.'
))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 7: ENGINEERING ROADMAP
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 7: Engineering Roadmap', h1_style, 0))

story.append(heading('7.1 Roadmap Philosophy', h2_style, 1))
story.append(para(
    'The engineering roadmap for Ferrum AI follows a "depth before breadth" philosophy. Rather than building '
    'shallow support for all features simultaneously, the roadmap prioritizes building deep, high-quality support '
    'for a narrow set of capabilities, then progressively expanding. Each phase delivers a functional, testable '
    'increment that provides value to users while laying the foundation for the next phase. This approach minimizes '
    'risk, enables early user feedback, and ensures that each capability is thoroughly validated before building '
    'dependent features on top of it.'
))

story.append(heading('7.2 Phase 1: Foundation (Months 1-3)', h2_style, 1))
story.append(para(
    'The foundation phase establishes the core infrastructure that all subsequent phases depend on. This includes '
    'the intermediate representation (IR) schema, the pipeline orchestration framework, the design token system, '
    'and the natural language input adapter. The primary deliverable of this phase is a working pipeline that can '
    'accept a natural language description and produce a complete design specification with tokens, typography, '
    'spacing, and color palette. The code emitter in this phase targets HTML+CSS only, providing a simplified '
    'but complete output path.'
))
story.append(bullet('Define and implement the IR schema (v1.0) for all pipeline stages'))
story.append(bullet('Build the pipeline orchestration framework with validation gates'))
story.append(bullet('Implement the design token system (color, spacing, typography, elevation, radius)'))
story.append(bullet('Develop the natural language input adapter with intent classification'))
story.append(bullet('Train the initial Design Reasoning Model on curated design system corpus'))
story.append(bullet('Build the HTML+CSS code emitter as the first target framework'))
story.append(bullet('Establish the evaluation framework with automated quality metrics'))

story.append(heading('7.3 Phase 2: Intelligence Expansion (Months 4-6)', h2_style, 1))
story.append(para(
    'The intelligence expansion phase adds the Design Intelligence Model\'s deeper reasoning capabilities and '
    'expands input modality support. The primary deliverable is a system that can analyze screenshots and produce '
    'design systems from visual references. This phase also introduces the component planning system and the '
    'accessibility validation layer, enabling the generation of complete component trees with ARIA annotations '
    'and keyboard navigation support. The code emitter is extended to support React as a second target framework.'
))
story.append(bullet('Integrate vision-language model for screenshot analysis'))
story.append(bullet('Build the component planning system with state machine generation'))
story.append(bullet('Implement the accessibility validation layer (WCAG 2.2 AA)'))
story.append(bullet('Develop the React code emitter with TypeScript support'))
story.append(bullet('Add the Figma API adapter for design file ingestion'))
story.append(bullet('Expand the evaluation benchmark suite to 100 tasks'))

story.append(heading('7.4 Phase 3: Motion and Multi-Framework (Months 7-9)', h2_style, 1))
story.append(para(
    'The motion and multi-framework phase introduces the motion generation system and extends code emission to all '
    'target frameworks. The motion system includes the Physics Graph for natural motion, the timeline choreography '
    'engine for complex animation sequences, and the gesture response system for touch-based interactions. This '
    'phase also adds the existing application analysis mode, enabling Ferrum AI to audit and improve existing '
    'codebases. The code emitter is extended to Vue, Svelte, Angular, and Web Components.'
))
story.append(bullet('Build the Physics Graph for spring-based natural motion'))
story.append(bullet('Implement the timeline choreography engine'))
story.append(bullet('Develop gesture response system (scroll, hover, drag, pinch)'))
story.append(bullet('Add code emitters for Vue, Svelte, Angular, and Web Components'))
story.append(bullet('Build the existing application analysis and recommendation engine'))
story.append(bullet('Implement the design mood classification system'))

story.append(heading('7.5 Phase 4: Intelligence Maturation (Months 10-12)', h2_style, 1))
story.append(para(
    'The intelligence maturation phase focuses on quality, performance, and advanced capabilities. This includes '
    'the hierarchical memory system for cross-session design system persistence, the collaborative editing '
    'infrastructure for team workflows, and the advanced design reasoning capabilities such as brand personality '
    'transfer and cross-platform adaptation. The evaluation framework is expanded to its full 200-task benchmark '
    'suite, and the model is refined based on accumulated user feedback and quality metrics from earlier phases.'
))
story.append(bullet('Implement the hierarchical memory system (active, design system, cross-session)'))
story.append(bullet('Build collaborative editing infrastructure with conflict resolution'))
story.append(bullet('Develop brand personality transfer and cross-platform adaptation'))
story.append(bullet('Expand evaluation benchmark to 200 tasks with human review protocol'))
story.append(bullet('Optimize pipeline latency (target: under 30 seconds for standard generation)'))
story.append(bullet('Launch the Ferrum AI Design Intelligence Model with full pipeline support'))
story.append(Spacer(1, 12))

story.append(make_table(
    ['Phase', 'Timeline', 'Key Deliverable', 'Target Frameworks'],
    [
        ['1 - Foundation', 'Months 1-3', 'NL to Design Spec pipeline', 'HTML+CSS'],
        ['2 - Intelligence', 'Months 4-6', 'Screenshot + Figma input, Components', 'HTML+CSS, React'],
        ['3 - Motion', 'Months 7-9', 'Motion system, Multi-framework', 'React, Vue, Svelte, Angular'],
        ['4 - Maturation', 'Months 10-12', 'Memory, Collaboration, Full quality', 'All 6+ frameworks'],
    ],
    [AVAILABLE_W * 0.18, AVAILABLE_W * 0.18, AVAILABLE_W * 0.38, AVAILABLE_W * 0.26]))
story.append(Paragraph('<i>Table 6: Engineering roadmap phases with timelines and deliverables.</i>', caption_style))
story.append(Spacer(1, 18))


# ═══════════════════════════════════════════════════════════════
# CHAPTER 8: MVP SCOPE & DEFINITION
# ═══════════════════════════════════════════════════════════════
story.append(heading('Chapter 8: MVP Scope and Definition', h1_style, 0))

story.append(heading('8.1 MVP Scope Definition', h2_style, 1))
story.append(para(
    'The Ferrum AI MVP encompasses the complete Phase 1 deliverable: a working end-to-end pipeline from natural '
    'language input to HTML+CSS output, with a design reasoning engine that produces coherent design systems. The '
    'MVP is intentionally scoped to demonstrate the core thesis of Ferrum AI, that generating a complete interface '
    'system produces fundamentally better results than generating isolated code snippets, while keeping the '
    'implementation surface area manageable for a first release.'
))

story.append(heading('8.2 MVP Functional Scope', h2_style, 1))
story.append(para(
    'The MVP supports natural language input with intent classification for three design moods: enterprise, playful, '
    'and premium. The design reasoning engine produces complete design specifications covering all eight quality '
    'dimensions. The component planning system generates atomic component trees with variant support (primary, '
    'secondary, ghost states). The code emitter produces semantic HTML with inline CSS custom properties, '
    'ensuring that the output is both visually correct and structurally sound. Accessibility is enforced at the '
    'generation level, not as a post-generation audit: all generated interfaces include ARIA annotations, keyboard '
    'navigation support, and color contrast compliance by construction.'
))

story.append(heading('8.3 MVP Non-Goals', h2_style, 1))
story.append(para(
    'The MVP explicitly excludes several capabilities that are planned for later phases. Screenshot input, Figma '
    'integration, and existing application analysis are deferred to Phase 2. The motion generation system is '
    'deferred to Phase 3. Multi-framework code emission beyond HTML+CSS is deferred to Phase 2 (React) and Phase 3 '
    '(remaining frameworks). The hierarchical memory system and collaborative editing are deferred to Phase 4. The '
    'design mood classifier supports only three moods in the MVP; the full set of six (adding medical, financial, '
    'and gaming) will be available in Phase 3 after sufficient training data has been collected for those domains.'
))

story.append(heading('8.4 Success Criteria', h2_style, 1))
story.append(para(
    'The MVP is considered successful when it meets the following quantitative criteria across the evaluation '
    'framework\'s eight dimensions. These thresholds are calibrated against the output quality of existing AI code '
    'generation tools (v0, Claude Code, Bolt.new) on equivalent tasks, ensuring that Ferrum AI\'s MVP represents '
    'a meaningful quality improvement over the current state of the art.'
))
story.append(Spacer(1, 12))

story.append(make_table(
    ['Quality Dimension', 'MVP Threshold', 'Current SOTA Baseline', 'Improvement Target'],
    [
        ['Visual Hierarchy', '75%', '55%', '+20 percentage points'],
        ['Design System Consistency', '90%', '40%', '+50 percentage points'],
        ['Accessibility Compliance', '95% (AA)', '60%', '+35 percentage points'],
        ['Responsive Behavior', '70%', '50%', '+20 percentage points'],
        ['Motion Quality', 'N/A (deferred)', 'N/A', 'N/A'],
        ['Code Quality', '85%', '70%', '+15 percentage points'],
        ['Performance', '80%', '65%', '+15 percentage points'],
        ['Design Mood Fidelity', '70%', '35%', '+35 percentage points'],
    ],
    [AVAILABLE_W * 0.24, AVAILABLE_W * 0.18, AVAILABLE_W * 0.26, AVAILABLE_W * 0.32]))
story.append(Paragraph('<i>Table 7: MVP success thresholds compared to current state-of-the-art baselines.</i>', caption_style))
story.append(Spacer(1, 18))

story.append(heading('8.5 Competitive Positioning', h2_style, 1))
story.append(para(
    'Ferrum AI\'s MVP is positioned at the intersection of AI code generation and AI design tools, a space that '
    'no existing tool fully occupies. v0 by Vercel generates impressive React components from prompts but operates '
    'at the component level, not the system level. Claude Code excels at code reasoning and refactoring but lacks '
    'design intelligence entirely. Figma AI provides intelligent design assistance within the Figma ecosystem but '
    'cannot produce production code. Bolt.new and Lovable generate full applications but treat design as a secondary '
    'concern to functionality. Ferrum AI\'s unique value proposition is treating design intelligence as the primary '
    'capability and code generation as the natural consequence of good design reasoning.'
))
story.append(para(
    'This positioning is defensible because it requires a fundamentally different architecture: a multi-stage '
    'pipeline with intermediate design representations, specialized models for each design dimension, and a '
    'quality evaluation framework that measures design quality alongside code quality. Competitors who approach '
    'the problem from the code generation side would need to build an entirely new design reasoning layer, while '
    'competitors who approach from the design tool side would need to build a production code emission system. '
    'Ferrum AI is building both simultaneously from a unified architectural foundation, creating a technical moat '
    'that deepens with each phase of development.'
))

story.append(heading('8.6 Risk Assessment and Mitigation', h2_style, 1))
story.append(para(
    'The primary technical risk is the quality of the Design Reasoning Model, which is the most novel and '
    'ambitious component of the system. Mitigation strategies include a phased rollout with human-in-the-loop '
    'validation, a comprehensive evaluation framework with automated regression testing, and a fallback to rule-'
    'based generation when the model produces low-confidence outputs. The primary market risk is the speed of '
    'competitor innovation, particularly from well-resourced companies like Vercel and Figma. Mitigation '
    'strategies include focusing on the unique design-intelligence positioning, building deep integrations with '
    'the Ferrum Universal UI Engine ecosystem, and cultivating a community of design-system-conscious developers '
    'who value systemic quality over rapid prototyping speed.'
))
story.append(Spacer(1, 12))

story.append(make_table(
    ['Risk Category', 'Risk', 'Probability', 'Mitigation Strategy'],
    [
        ['Technical', 'Design Reasoning Model quality below threshold', 'Medium', 'Phased rollout + fallback rules'],
        ['Technical', 'Pipeline latency exceeds 30-second target', 'Low', 'Parallel stage execution + caching'],
        ['Market', 'Competitor launches similar capability', 'Medium', 'Deepen design-intelligence moat'],
        ['Data', 'Insufficient training data for niche domains', 'Medium', 'Partner data-sharing agreements'],
        ['Adoption', 'Users prefer faster, less thorough tools', 'Low', 'Demonstrate quality advantage with benchmarks'],
    ],
    [AVAILABLE_W * 0.14, AVAILABLE_W * 0.34, AVAILABLE_W * 0.12, AVAILABLE_W * 0.40]))
story.append(Paragraph('<i>Table 8: Risk assessment matrix with mitigation strategies.</i>', caption_style))
story.append(Spacer(1, 18))

# ━━ Build ━━
doc.build(story, onLaterPages=page_footer, onFirstPage=page_footer)
print(f'Body PDF generated: {OUTPUT}')