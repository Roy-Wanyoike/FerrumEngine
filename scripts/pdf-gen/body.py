#!/usr/bin/env python3
"""Ferrum Studio Product Architecture - ReportLab Body Document"""

import os, sys, hashlib, platform
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm, cm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, Table, TableStyle, Image, KeepTogether,
    HRFlowable, ListFlowable, ListItem
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ━━ PATHS ━━
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DIAGRAMS = os.path.join(SCRIPT_DIR, "diagrams")
OUTPUT = os.path.join(os.path.dirname(SCRIPT_DIR), "..", "download", "Ferrum_Studio_Product_Architecture.pdf")
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

# ━━ FONTS ━━
_IS_MAC = platform.system() == 'Darwin'
FONT_DIR = os.path.expanduser('~/.openclaw/workspace/fonts') if _IS_MAC else '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                    italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ━━ CASCADE PALETTE ━━
PAGE_BG       = colors.HexColor('#f1f0ef')
SECTION_BG    = colors.HexColor('#ebebe9')
CARD_BG       = colors.HexColor('#ecebe8')
TABLE_STRIPE  = colors.HexColor('#edeceb')
HEADER_FILL   = colors.HexColor('#63593d')
COVER_BLOCK   = colors.HexColor('#817552')
BORDER        = colors.HexColor('#d3d0c7')
ICON          = colors.HexColor('#938045')
ACCENT        = colors.HexColor('#97781b')
ACCENT_2      = colors.HexColor('#6b4dc7')
TEXT_PRIMARY   = colors.HexColor('#272623')
TEXT_MUTED     = colors.HexColor('#78766f')
SEM_SUCCESS   = colors.HexColor('#479662')
SEM_WARNING   = colors.HexColor('#9d824b')
SEM_ERROR     = colors.HexColor('#914f49')
SEM_INFO      = colors.HexColor('#48729c')

# ━━ STYLES ━━
W, H = A4
MARGIN = 1.0 * inch
AW = W - 2 * MARGIN  # available width

def ps(name, **kw):
    defaults = dict(fontName='FreeSerif', fontSize=14, leading=20, alignment=TA_JUSTIFY,
                    textColor=TEXT_PRIMARY, spaceAfter=8)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

h1_style = ps('H1', fontSize=32, leading=38, fontName='FreeSerif-Bold', spaceBefore=24, spaceAfter=12, alignment=TA_LEFT)
h2_style = ps('H2', fontSize=24, leading=30, fontName='FreeSerif-Bold', spaceBefore=20, spaceAfter=10, alignment=TA_LEFT)
h3_style = ps('H3', fontSize=18, leading=24, fontName='FreeSerif-Bold', spaceBefore=16, spaceAfter=8, alignment=TA_LEFT)
body_style = ps('Body', fontSize=10.5, leading=17, alignment=TA_JUSTIFY)
body_left = ps('BodyLeft', fontSize=10.5, leading=17, alignment=TA_LEFT)
bullet_style = ps('Bullet', fontSize=10.5, leading=17, leftIndent=20, bulletIndent=8, alignment=TA_LEFT)
caption_style = ps('Caption', fontSize=9, leading=13, textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=4, spaceAfter=12)
quote_style = ps('Quote', fontSize=11, leading=18, fontName='FreeSerif-Italic', leftIndent=24, rightIndent=12,
                 textColor=TEXT_MUTED, borderColor=ACCENT, borderWidth=0, borderPadding=0,
                 spaceBefore=12, spaceAfter=12)
toc_h1 = ps('TOCH1', fontSize=12, leading=22, fontName='FreeSerif-Bold', textColor=TEXT_PRIMARY, leftIndent=0)
toc_h2 = ps('TOCH2', fontSize=10.5, leading=20, fontName='FreeSerif', textColor=TEXT_MUTED, leftIndent=20)

# ━━ TABLE STYLES ━━
tbl_header_style = ps('TblH', fontSize=9.5, leading=13, fontName='FreeSerif-Bold', textColor=colors.white, alignment=TA_CENTER)
tbl_cell_style = ps('TblC', fontSize=9, leading=13, alignment=TA_LEFT)
tbl_cell_center = ps('TblCC', fontSize=9, leading=13, alignment=TA_CENTER)

def make_table(headers, rows, col_widths=None):
    if col_widths is None:
        col_widths = [AW / len(headers)] * len(headers)
    data = [[Paragraph(h, tbl_header_style) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), tbl_cell_style) if i == 0 else Paragraph(str(c), tbl_cell_center) for i, c in enumerate(row)])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'FreeSerif-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9.5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ('TOPPADDING', (0, 1), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
        else:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), colors.white))
    t.setStyle(TableStyle(style_cmds))
    return t

def add_heading(text, style, level=0):
    key = f'h_{hashlib.md5(text.encode()).hexdigest()[:8]}'
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def add_image(filename, max_w=AW, max_h=280):
    path = os.path.join(DIAGRAMS, filename)
    img = Image(path)
    ratio = min(max_w / img.drawWidth, max_h / img.drawHeight, 1.0)
    img.drawWidth = img.drawWidth * ratio
    img.drawHeight = img.drawHeight * ratio
    return img

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=12, spaceBefore=6)

def sp(pts=12):
    return Spacer(1, pts)

# ━━ TOC TEMPLATE ━━
from reportlab.platypus import SimpleDocTemplate, BaseDocTemplate, Frame, PageTemplate
from reportlab.lib.pagesizes import A4

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ━━ PAGE CALLBACKS ━━
def page_header_footer(canvas, doc):
    canvas.saveState()
    # header line
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, H - 0.6*inch, W - MARGIN, H - 0.6*inch)
    canvas.setFont('FreeSerif', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, H - 0.5*inch, "Ferrum Studio Product Architecture")
    canvas.drawRightString(W - MARGIN, H - 0.5*inch, "Confidential")
    # footer
    canvas.line(MARGIN, 0.6*inch, W - MARGIN, 0.6*inch)
    canvas.drawCentredString(W/2, 0.4*inch, f"Page {doc.page}")
    canvas.restoreState()

# ━━ BUILD STORY ━━
story = []

# --- TOC ---
toc = TableOfContents()
toc.levelStyles = [toc_h1, toc_h2]
story.append(toc)
story.append(PageBreak())

# ════════════════════════════════════════════════════════════════════
# EXECUTIVE SUMMARY
# ════════════════════════════════════════════════════════════════════
story.append(add_heading("Executive Summary", h1_style, 0))
story.append(Paragraph(
    "Ferrum Studio represents a fundamental rethinking of how user interfaces are designed and built. "
    "Current design-to-development workflows are fractured: designers create static mockups in tools like Figma, "
    "engineers manually translate those mockups into code, and the resulting implementations rarely match the "
    "original design intent. This translation gap costs teams an estimated 30-40% of total development time and "
    "introduces countless opportunities for miscommunication, accessibility regressions, and performance degradation. "
    "Ferrum Studio eliminates this gap entirely by creating a unified environment where design and engineering "
    "converge into a single, intelligent, and production-ready workflow.", body_style))
story.append(Paragraph(
    "The core thesis of Ferrum Studio is simple but ambitious: <b>user interfaces should be built visually, "
    "with the same depth and precision that game developers use in Unreal Engine Blueprints</b>. Just as "
    "Blueprints allowed non-programmers to create complex game logic through a node-based visual system, "
    "Ferrum Studio enables designers and engineers to compose UI components, define motion behaviors, "
    "configure responsive layouts, and generate production-quality code, all within a single canvas. "
    "Every component in Ferrum Studio is not merely a visual element but an intelligent entity that "
    "understands its own states, interactions, accessibility requirements, responsive behavior, motion "
    "rules, and data bindings.", body_style))
story.append(Paragraph(
    "The product is built on six foundational pillars. First, a <b>Design Canvas</b> that supports "
    "component composition, layout creation, responsive container design, design system management, "
    "and full application screen authoring. Second, a <b>Component Intelligence</b> system where "
    "every component self-describes its behavioral contract. Third, a <b>Motion Design System</b> "
    "inspired by After Effects, Unreal Sequencer, and Framer, providing timeline animation, physics "
    "simulation, spring dynamics, gesture interactions, and scroll-driven behaviors. Fourth, a "
    "<b>Physics Graph</b> that enables node-based UI physics, allowing natural movement through "
    "spring systems, mass, velocity, and friction parameters. Fifth, an <b>AI Design Assistant</b> "
    "that can generate complete interface layouts from natural language prompts, including component "
    "selection, motion choreography, and accessibility validation. Sixth, a <b>Code Generation</b> "
    "engine that exports to React, Vue, Svelte, Angular, Web Components, and HTML/CSS with "
    "production-quality, readable, and maintainable output.", body_style))
story.append(Paragraph(
    "Ferrum Studio targets three distinct audiences: designers seeking deeper control over interaction "
    "and motion without learning to code, engineers wanting to accelerate UI development through visual "
    "tools while maintaining code quality, and cross-functional teams that need a shared workspace "
    "bridging design and implementation. The competitive landscape includes Figma (dominant in static "
    "design but weak in interaction and code generation), Framer (strong interactions but limited "
    "component intelligence), Webflow (template-bound and rigid), and traditional IDEs (powerful but "
    "purely code-driven). Ferrum Studio occupies a unique position by combining the creative freedom "
    "of design tools with the engineering rigor of code-native development.", body_style))

# Key Metrics callout
metrics_data = [
    [Paragraph('<b>6</b>', ps('Metric', fontSize=22, alignment=TA_CENTER, textColor=ACCENT)),
     Paragraph('<b>366+</b>', ps('Metric2', fontSize=22, alignment=TA_CENTER, textColor=ACCENT)),
     Paragraph('<b>6</b>', ps('Metric3', fontSize=22, alignment=TA_CENTER, textColor=ACCENT)),
     Paragraph('<b>0 KB</b>', ps('Metric4', fontSize=22, alignment=TA_CENTER, textColor=ACCENT)),
     Paragraph('<b>&lt;100ms</b>', ps('Metric5', fontSize=22, alignment=TA_CENTER, textColor=ACCENT)),
     Paragraph('<b>30+</b>', ps('Metric6', fontSize=22, alignment=TA_CENTER, textColor=ACCENT))],
    [Paragraph('Target Frameworks', ps('ML', fontSize=8, alignment=TA_CENTER, textColor=TEXT_MUTED)),
     Paragraph('Built-in Effects', ps('ML2', fontSize=8, alignment=TA_CENTER, textColor=TEXT_MUTED)),
     Paragraph('Core Pillars', ps('ML3', fontSize=8, alignment=TA_CENTER, textColor=TEXT_MUTED)),
     Paragraph('JS Runtime', ps('ML4', fontSize=8, alignment=TA_CENTER, textColor=TEXT_MUTED)),
     Paragraph('First Paint', ps('ML5', fontSize=8, alignment=TA_CENTER, textColor=TEXT_MUTED)),
     Paragraph('Pages in Doc', ps('ML6', fontSize=8, alignment=TA_CENTER, textColor=TEXT_MUTED))],
]
cw = AW / 6
mt = Table(metrics_data, colWidths=[cw]*6, rowHeights=[36, 18])
mt.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
    ('BOX', (0, 0), (-1, -1), 1, BORDER),
    ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, 0), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
]))
story.append(sp(16))
story.append(mt)

# ════════════════════════════════════════════════════════════════════
# CHAPTER 1: PRODUCT ARCHITECTURE
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("1. Product Architecture", h1_style, 0))
story.append(Paragraph(
    "The product architecture of Ferrum Studio is designed around a singular principle: <b>the design "
    "surface is the source of truth, and code is a derived artifact</b>. This inversion of the traditional "
    "workflow, where code is the source and design is a downstream representation, enables Ferrum Studio "
    "to provide a fundamentally different experience from existing tools. Every element on the canvas "
    "is a living, intelligent entity that carries semantic meaning, behavioral contracts, and the "
    "complete information necessary to generate production-ready code for any target framework.", body_style))

story.append(add_heading("1.1 Design Canvas", h2_style, 1))
story.append(Paragraph(
    "The Design Canvas is the primary workspace in Ferrum Studio. Unlike Figma's frame-based system "
    "or Webflow's template-driven approach, the Ferrum Canvas operates as a constraint-based layout "
    "engine inspired by Apple's Auto Layout and CSS Grid. Designers can drag components from the "
    "component library onto the canvas, compose them into nested hierarchies, and define responsive "
    "breakpoints that govern how layouts reflow across screen sizes. The canvas supports five distinct "
    "creation modes: Component Mode for building reusable UI elements, Layout Mode for arranging "
    "components within responsive containers, Design System Mode for managing tokens, themes, and "
    "shared styles, Screen Mode for authoring complete application views with navigation flows, and "
    "Prototype Mode for connecting screens with transitions and gestures.", body_style))
story.append(Paragraph(
    "Each mode shares a common rendering infrastructure but presents a tailored set of tools and "
    "panels. In Component Mode, the inspector shows component properties, variant definitions, and "
    "slot configurations. In Layout Mode, it reveals constraint editors, grid configuration, and "
    "responsive preview controls. In Design System Mode, it surfaces the token hierarchy, theme "
    "switcher, and usage analytics showing where each token is applied. This progressive disclosure "
    "ensures that beginners see a simple, approachable interface while experts have access to "
    "deep configuration at every level of the component tree.", body_style))

story.append(add_heading("1.2 Component Intelligence", h2_style, 1))
story.append(Paragraph(
    "Every component in Ferrum Studio is more than a visual shape or a collection of styled elements. "
    "The Component Intelligence Protocol defines a standard interface that every component must "
    "implement. This interface specifies six behavioral dimensions: <b>States</b> (default, hover, "
    "focus, active, disabled, loading, error), <b>Interactions</b> (click, long-press, swipe, drag, "
    "keyboard navigation), <b>Accessibility</b> (ARIA roles, labels, live regions, keyboard shortcuts, "
    "screen reader announcements), <b>Responsive Behavior</b> (breakpoint-specific layouts, container "
    "queries, fluid scaling), <b>Motion Rules</b> (enter/exit animations, state transitions, "
    "micro-interactions), and <b>Data Bindings</b> (props, computed values, event handlers, async "
    "data sources). These six dimensions are not optional add-ons but intrinsic properties of every "
    "component, ensuring that accessibility and responsive behavior are never afterthoughts.", body_style))
story.append(Paragraph(
    "The intelligence system extends beyond individual components to compositions. When a designer "
    "composes a card component containing a button and places it inside a scrollable list, the "
    "system automatically infers the card's scroll-triggered animation behavior, validates that the "
    "button's focus ring meets WCAG contrast requirements, and generates the appropriate ARIA "
    "landmark roles for the list container. This compositional intelligence is what distinguishes "
    "Ferrum Studio from tools that treat components as isolated visual units.", body_style))

story.append(add_heading("1.3 Competitive Analysis", h2_style, 1))
story.append(Paragraph(
    "To understand Ferrum Studio's unique positioning, we conducted a comparative analysis against "
    "six industry-leading tools across eight critical dimensions. The analysis reveals that no "
    "existing tool comprehensively addresses the intersection of visual design, motion engineering, "
    "code generation, and AI-assisted creation.", body_style))

comp_headers = ["Dimension", "Figma", "Framer", "Webflow", "UE Blueprint", "Interface Builder", "Storybook", "Ferrum Studio"]
comp_rows = [
    ["Visual Design", "Strong", "Strong", "Strong", "None", "Basic", "None", "Strong"],
    ["Interaction Design", "Basic", "Strong", "Medium", "Strong", "Basic", "None", "Strong"],
    ["Motion Physics", "None", "Medium", "Basic", "Strong", "None", "None", "Strong"],
    ["Code Generation", "Plugin", "React Only", "Limited", "Native", "Native", "None", "Multi-Framework"],
    ["AI Assistance", "Basic", "None", "None", "None", "None", "None", "Strong"],
    ["Accessibility", "Plugin", "Basic", "Basic", "None", "Strong", "Strong", "Strong"],
    ["Real-time Collab", "Strong", "Basic", "Basic", "None", "None", "None", "Strong"],
    ["Open Architecture", "Plugin", "Limited", "None", "Strong", "None", "Strong", "Strong"],
]
story.append(sp(6))
cw7 = [AW*0.14, AW*0.10, AW*0.10, AW*0.10, AW*0.11, AW*0.13, AW*0.10, AW*0.12]  # tweaked to sum < AW
# Adjust to exactly fit
remainder = AW - sum(cw7)
cw7[0] += remainder
story.append(make_table(comp_headers, comp_rows, cw7))
story.append(Paragraph("Table 1: Competitive analysis across eight dimensions of visual development.", caption_style))

story.append(Paragraph(
    "The comparison table reveals that Ferrum Studio is the only tool that scores 'Strong' across "
    "all eight dimensions. Figma excels in visual design and collaboration but lacks native motion "
    "physics and code generation. Framer provides strong interactions but is limited to React output. "
    "Webflow constrains designers within templates. Unreal Engine Blueprint offers powerful node-based "
    "logic but no visual design surface. Apple Interface Builder generates native code but lacks "
    "cross-platform support. Storybook provides component documentation without design capabilities. "
    "Ferrum Studio synthesizes the strengths of each tool into a single, coherent environment.", body_style))

# System Architecture Diagram
story.append(add_heading("1.4 System Overview", h2_style, 1))
story.append(Paragraph(
    "The following diagram illustrates the high-level system architecture of Ferrum Studio, organized "
    "into three layers: the User Interface layer where designers and engineers interact with the tool, "
    "the Core Engine layer that powers all design, motion, and generation capabilities, and the "
    "Infrastructure layer that provides foundational services such as plugin management, real-time "
    "collaboration, and AI inference.", body_style))
story.append(sp(6))
story.append(add_image("sys-arch.png", AW, 240))
story.append(Paragraph("Figure 1: Ferrum Studio system architecture showing three-layer design with data flow between subsystems.", caption_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 2: UX DESIGN PHILOSOPHY
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("2. UX Design Philosophy", h1_style, 0))
story.append(Paragraph(
    "Ferrum Studio's UX philosophy is rooted in a fundamental belief: <b>the tool should feel like "
    "an instrument, not a piece of software</b>. This distinction is critical. An instrument, whether "
    "a piano, a camera, or a drafting table, becomes an extension of the creator's hands and mind. "
    "The creator does not think about operating the instrument; they think about creating. Ferrum "
    "Studio aspires to this same ideal, where the interface disappears and the designer or engineer "
    "thinks only about the interface they are building. This philosophy manifests across five core "
    "design principles that govern every interaction pattern, panel layout, and workflow in the "
    "application.", body_style))

story.append(add_heading("2.1 Progressive Disclosure", h2_style, 1))
story.append(Paragraph(
    "The principle of progressive disclosure ensures that Ferrum Studio presents information and "
    "controls at the appropriate level of complexity for each user's current task. A beginner "
    "dragging a button onto the canvas sees only the essential properties: label text, color, and "
    "size. As the user gains confidence and begins exploring more advanced capabilities, additional "
    "controls for hover states, animation timing, accessibility roles, and responsive variants "
    "become available. This is not achieved by hiding features behind menus or settings panels, "
    "but through context-sensitive UI that reveals depth organically. The inspector panel uses a "
    "collapsible section system where each section expands to show its sub-properties only when "
    "the user interacts with that dimension of the component. A spring animation section, for "
    "example, shows mass and stiffness sliders only when the user selects a spring-based easing "
    "curve from the timeline editor.", body_style))

story.append(add_heading("2.2 The Node Graph as Primary Interface", h2_style, 1))
story.append(Paragraph(
    "Borrowing from Unreal Engine Blueprint's visual scripting system and the dataflow paradigm of "
    "tools like Node-RED and Blender's shader nodes, Ferrum Studio uses a node graph as its primary "
    "interface for complex configurations. While simple property editing happens in the inspector "
    "panel, any configuration involving multiple interconnected values, such as a physics-based "
    "animation that depends on scroll position, gesture velocity, and spring parameters, is edited "
    "through a visual node graph. Nodes represent values, operations, and transformations. Connections "
    "between nodes define data flow and dependencies. The graph is not a replacement for the canvas "
    "but a complementary view that appears in a dedicated panel or as an overlay when editing complex "
    "behaviors. This dual-mode interaction, direct manipulation on canvas plus node-based configuration "
    "for complexity, accommodates both visual thinkers and logical thinkers.", body_style))

story.append(add_heading("2.3 Workspace Layout", h2_style, 1))
story.append(Paragraph(
    "The Ferrum Studio workspace follows a panel-based architecture that users can customize to their "
    "workflow. The default layout consists of five primary zones. The central <b>Canvas Area</b> "
    "occupies the majority of screen real estate and renders the current design. The left <b>Component "
    "Tree</b> panel displays the hierarchical structure of the current screen or component, allowing "
    "quick selection and reordering. The right <b>Inspector Panel</b> shows contextual properties "
    "for the selected element, organized into collapsible sections. The bottom <b>Timeline and Motion "
    "Editor</b> provides a track-based interface for animating properties over time, with dedicated "
    "modes for timeline keyframes, physics parameters, and scroll-driven behaviors. The floating "
    "<b>AI Assistant Panel</b> can be invoked from any context to provide intelligent suggestions, "
    "generate layouts, or answer questions about the current design.", body_style))
story.append(Paragraph(
    "Each panel is dockable, resizable, and can be torn off into floating windows for multi-monitor "
    "setups. The canvas supports zoom levels from 10% to 6400% and pan in any direction. A "
    "minimap in the bottom-right corner provides spatial orientation when working at high zoom "
    "levels. Keyboard shortcuts follow industry conventions from Figma (for designers) and VS Code "
    "(for engineers), with a fully customizable keybinding system.", body_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 3: TECHNICAL ARCHITECTURE
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("3. Technical Architecture", h1_style, 0))
story.append(Paragraph(
    "The technical architecture of Ferrum Studio is designed for performance, extensibility, and "
    "long-term maintainability. The codebase is organized as a monorepo managed by Turborepo, "
    "containing core packages for the runtime engine, renderer, component system, motion engine, "
    "AI service layer, code generator, and plugin SDK. The application shell is built with "
    "Electron for desktop and a web-based version that runs in modern browsers, sharing the same "
    "core libraries through a platform abstraction layer.", body_style))

story.append(add_heading("3.1 Layered Architecture", h2_style, 1))
story.append(Paragraph(
    "Ferrum Studio employs a layered architecture that separates concerns into distinct, independently "
    "testable modules. At the foundation lies the <b>Runtime Core</b>, implemented in Rust and "
    "compiled to WebAssembly for browser deployment. The Runtime Core manages the immutable state "
    "graph, the component registry, the event system, and the plugin host. It is designed to be "
    "framework-agnostic and can be embedded in any JavaScript environment. Above the Runtime Core "
    "sits the <b>Canvas Renderer</b>, which provides the visual rendering surface using a dual-"
    "renderer approach: a design-mode renderer that provides WYSIWYG editing capabilities with "
    "selection handles, guides, and measurement overlays, and a production renderer that generates "
    "the actual output a user would see, enabling true pixel-perfect preview.", body_style))
story.append(Paragraph(
    "The <b>Component System</b> layer manages component definitions, instantiation, composition, "
    "and the Component Intelligence Protocol. Each component is defined as a schema that describes "
    "its properties, slots, events, and behavioral contracts. The <b>Motion Engine</b> provides "
    "physics simulation, timeline interpolation, and gesture recognition, running at 60fps on the "
    "main thread with heavy computations offloaded to Web Workers. The <b>AI Service Layer</b> "
    "communicates with local and cloud-based AI models for design generation, analysis, and "
    "suggestions. The <b>Code Generator</b> consumes the component tree and motion definitions to "
    "produce framework-specific source code through an Abstract Syntax Tree (AST) representation, "
    "ensuring that generated code is syntactically correct and follows best practices.", body_style))

story.append(add_heading("3.2 State Management", h2_style, 1))
story.append(Paragraph(
    "State management in Ferrum Studio uses an immutable state graph inspired by the approach taken "
    "by Figma's operational transformation system and modern CRDT (Conflict-free Replicated Data Type) "
    "implementations. Every modification to the design, whether a property change, a component "
    "addition, or a motion keyframe adjustment, is represented as an operation against the state "
    "graph. Operations are applied atomically, logged for undo/redo, and broadcast to all connected "
    "collaborators in real time. The state graph is structured as a tree of nodes, where each node "
    "represents a component instance with its properties, children, and behavioral configuration. "
    "This tree structure enables efficient diffing, selective re-rendering, and conflict resolution "
    "when multiple users edit simultaneously.", body_style))

story.append(add_heading("3.3 Real-time Collaboration", h2_style, 1))
story.append(Paragraph(
    "Collaboration in Ferrum Studio is built on a CRDT-based system that allows multiple designers "
    "and engineers to work on the same project simultaneously without locking. The system uses "
    "Yjs, a high-performance CRDT implementation, as its synchronization layer. Each client maintains "
    "a local copy of the state graph and broadcasts operations to all other clients through a "
    "WebSocket relay server. The CRDT guarantees eventual consistency: all clients converge to the "
    "same state regardless of the order in which operations arrive. Cursor positions, selections, "
    "and viewport states are also synchronized, providing a live presence experience similar to "
    "Figma. The collaboration system is designed to work over high-latency connections, queuing "
    "operations locally and flushing them when connectivity is restored.", body_style))

story.append(add_heading("3.4 File Format", h2_style, 1))
story.append(Paragraph(
    "Projects are stored in a JSON-based file format called <b>.ferrum</b>, which contains the "
    "component tree, design tokens, motion definitions, AI generation metadata, and references to "
    "binary assets (images, fonts, videos) stored alongside the project file. The format is "
    "human-readable, diffable, and designed for version control with Git. Binary assets are "
    "content-addressed and stored in a .ferrum-assets directory, ensuring that identical assets "
    "are stored only once regardless of how many components reference them. The file format also "
    "includes a lock file that pins exact versions of external dependencies and plugin versions, "
    "ensuring reproducible builds across different machines and environments.", body_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 4: COMPONENT MODEL
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("4. Component Model", h1_style, 0))
story.append(Paragraph(
    "The Ferrum Component Model is the conceptual foundation upon which the entire system is built. "
    "Unlike Web Components, which define a custom element with encapsulated rendering, or React "
    "components, which are functions returning markup, Ferrum components are <b>graph nodes with "
    "typed ports</b> that describe their complete behavioral contract. This section defines the "
    "component model's structure, lifecycle, composition rules, and variant system in detail.", body_style))

story.append(add_heading("4.1 Component as Graph Node", h2_style, 1))
story.append(Paragraph(
    "In Ferrum Studio, every component is represented as a node in a directed graph. Each node has "
    "typed input ports (properties, slots, event handlers, data sources) and output ports (rendered "
    "output, emitted events, computed values). This graph-based representation enables visual "
    "programming: users can connect output ports of one component to input ports of another, "
    "creating data flows and event chains without writing code. For example, a slider component's "
    "value output can be connected to a card component's rotation input, creating a direct "
    "manipulation interface where dragging the slider rotates the card in real time.", body_style))
story.append(Paragraph(
    "The graph model also enables the AI system to reason about component relationships. When the AI "
    "generates a layout, it constructs a component graph rather than a flat tree, allowing it to "
    "express complex relationships like conditional rendering, data loops, and event chains. The "
    "graph is compiled down to a tree representation for code generation, with graph edges becoming "
    "prop drilling, context providers, or event emitters depending on the target framework.", body_style))

story.append(add_heading("4.2 Component Lifecycle", h2_style, 1))
story.append(Paragraph(
    "Every component in Ferrum Studio follows a well-defined lifecycle consisting of four phases: "
    "<b>Design</b>, where the component is created and its visual appearance, properties, and "
    "variants are defined on the canvas; <b>Validate</b>, where the component's behavioral contract "
    "is checked against the Component Intelligence Protocol, ensuring that all required states, "
    "accessibility attributes, and responsive configurations are specified; <b>Generate</b>, where "
    "the component and its dependencies are compiled into framework-specific code; and <b>Runtime</b>, "
    "where the generated code executes in the target application. Each phase has well-defined "
    "entry and exit criteria, and the system can move components between phases independently. "
    "A component that fails validation, for example, can still be used in design mode but will "
    "produce warnings when code is generated.", body_style))

story.append(add_heading("4.3 Variant System", h2_style, 1))
story.append(Paragraph(
    "The variant system enables a single component definition to produce multiple visual and "
    "behavioral configurations. Ferrum Studio supports four variant dimensions: <b>Responsive "
    "Variants</b> define how a component's layout and appearance change across breakpoints, using "
    "container queries and fluid scaling; <b>Theme Variants</b> define how a component adapts to "
    "different color schemes, typography scales, and spacing systems; <b>State Variants</b> define "
    "the component's appearance in each interactive state (default, hover, focus, active, disabled, "
    "loading, error); and <b>Size Variants</b> define predefined size configurations (small, medium, "
    "large) that adjust padding, font size, and icon size proportionally. Variants compose: a "
    "component can be in a 'hover' state variant, a 'dark' theme variant, and a 'mobile' responsive "
    "variant simultaneously, and the system resolves the correct property values through a "
    "priority-based cascade system.", body_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 5: RENDERING ARCHITECTURE
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("5. Rendering Architecture", h1_style, 0))
story.append(Paragraph(
    "The rendering architecture of Ferrum Studio is one of its most technically ambitious components. "
    "It must serve two fundamentally different purposes: providing a real-time, interactive WYSIWYG "
    "editing experience on the design canvas, and generating pixel-perfect output that matches "
    "what the user designed. To achieve both goals, Ferrum Studio employs a <b>dual-renderer "
    "architecture</b> that separates the concerns of editing and production output.", body_style))

story.append(add_heading("5.1 Dual-Renderer Approach", h2_style, 1))
story.append(Paragraph(
    "The Design Renderer operates on the HTML Canvas or WebGL and is optimized for interactive "
    "performance. It renders the component tree with editing overlays: selection handles, alignment "
    "guides, measurement annotations, and drag previews. The Design Renderer prioritizes frame rate "
    "over visual fidelity, simplifying complex effects during drag operations and restoring full "
    "quality on release. The Production Renderer, in contrast, generates the exact output that "
    "end users would see. It processes the full component tree with all motion definitions, "
    "responsive rules, and accessibility attributes applied. The Production Renderer can output "
    "to an in-app preview panel, an external browser window, or the code generator's AST pipeline. "
    "Both renderers consume the same component tree and state graph, ensuring that what the designer "
    "sees in preview is exactly what the generated code produces.", body_style))

story.append(add_heading("5.2 Motion Rendering Pipeline", h2_style, 1))
story.append(Paragraph(
    "Motion rendering in Ferrum Studio follows a multi-stage pipeline. First, the <b>Motion Intention</b> "
    "stage determines which animations should be active based on the current user interaction, "
    "scroll position, and component state. Second, the <b>Physics Resolution</b> stage computes "
    "physics-based animations by evaluating spring equations, computing velocity and position "
    "for each animated property at the current frame time. Third, the <b>Timeline Interpolation</b> "
    "stage handles keyframe-based animations, interpolating between keyframes using the specified "
    "easing function. Fourth, the <b>Gesture Resolution</b> stage processes active gestures "
    "(swipe, pinch, drag) and maps their progress values to animation parameters. Finally, the "
    "<b>Composition</b> stage merges all animation values, resolves conflicts, and applies the "
    "final values to the rendered output. This pipeline runs at 60fps on the main thread for the "
    "design renderer and in a Web Worker for the production renderer to avoid blocking UI "
    "responsiveness.", body_style))

story.append(add_heading("5.3 Responsive Layout Engine", h2_style, 1))
story.append(Paragraph(
    "The responsive layout engine uses a constraint-based approach similar to Apple's Auto Layout "
    "and CSS Flexbox/Grid. Components define their layout preferences through a set of constraints: "
    "intrinsic size (content-driven), fixed size (explicit width/height), flexible size (min/max "
    "with flex grow/shrink), and alignment (leading, trailing, center, space-between). The engine "
    "resolves constraints iteratively, first computing intrinsic sizes for leaf components, then "
    "propagating constraints up through the tree to determine container sizes, and finally "
    "distributing remaining space according to flex properties. Container queries are supported "
    "natively, allowing components to adapt based on the size of their parent container rather "
    "than the viewport, enabling truly modular responsive design.", body_style))
story.append(sp(6))
story.append(add_image("render-pipeline.png", AW, 200))
story.append(Paragraph("Figure 2: Dual-renderer architecture showing the split between Design Renderer and Production Renderer.", caption_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 6: MOTION DESIGN SYSTEM
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("6. Motion Design System", h1_style, 0))
story.append(Paragraph(
    "Motion is not a decorative afterthought in Ferrum Studio; it is a first-class design dimension "
    "with the same depth and tooling as visual design. The Motion Design System provides a "
    "comprehensive suite of tools for creating, editing, and previewing animations, inspired by the "
    "best animation tools across industries: After Effects for timeline editing, Unreal Sequencer "
    "for cinematic timing, and Framer for interaction-driven motion. The system supports six "
    "categories of motion, each with dedicated editing interfaces and configuration options.", body_style))

story.append(add_heading("6.1 Timeline Animation Editor", h2_style, 1))
story.append(Paragraph(
    "The Timeline Animation Editor provides a track-based interface for creating keyframe animations. "
    "Each animated property (position, rotation, scale, opacity, color, border-radius, and custom "
    "properties) gets its own track. Keyframes are placed on the timeline to mark specific values "
    "at specific times. The editor supports multiple easing functions per keyframe segment, "
    "including linear, ease-in, ease-out, ease-in-out, cubic-bezier with draggable control points, "
    "and spring-based easing. Keyframes can be copied, pasted, and mirrored for symmetric "
    "animations. The timeline also supports nested animations, where a component's animation "
    "is staggered relative to its parent's timeline, enabling coordinated entrance and exit "
    "effects for lists and grids. An onion-skinning mode shows ghost frames from adjacent "
    "keyframes, helping designers visualize the animation arc.", body_style))

story.append(add_heading("6.2 Physics Animation", h2_style, 1))
story.append(Paragraph(
    "Physics-based animation brings natural, organic motion to interfaces. Instead of specifying "
    "exact keyframes, designers define physical properties: mass (how heavy the element feels), "
    "stiffness (how strongly the spring pulls), damping (how quickly oscillation decays), and "
    "initial velocity. The physics engine solves the spring differential equation in real time, "
    "producing motion that responds naturally to user input. A card that follows a spring curve "
    "will overshoot its target position slightly and oscillate before settling, creating a "
    "satisfying tactile feel. The physics system also supports chain reactions, where the output "
    "of one spring drives the input of another, creating complex cascading animations from simple "
    "parameters. Gravity, friction, and collision detection are available for more advanced "
    "physical simulations.", body_style))
story.append(sp(6))
story.append(add_image("physics-graph.png", AW, 180))
story.append(Paragraph("Figure 3: Physics node graph showing the flow from user scroll input through spring physics to natural movement output.", caption_style))

story.append(add_heading("6.3 Gesture Interactions and Scroll Behavior", h2_style, 1))
story.append(Paragraph(
    "Ferrum Studio provides a gesture system that maps physical user interactions (touch, mouse, "
    "trackpad) to animation parameters. Supported gestures include swipe (directional, with "
    "velocity tracking), pinch (scale and rotation), long-press (with haptic feedback on supported "
    "devices), and drag (with inertia and snap points). Each gesture is configured through the "
    "node graph, connecting gesture output values (progress, velocity, direction) to animation "
    "input ports (property values, animation playback rate, timeline scrub position). Scroll-driven "
    "animations are a first-class feature: designers can bind any component property to the scroll "
    "position of any ancestor container, creating effects like parallax backgrounds, reveal-on-scroll "
    "sections, sticky headers with progressive shrinkage, and scroll-linked progress indicators. "
    "The scroll behavior system uses the Intersection Observer API in production and a simulated "
    "scroll model in the design canvas for accurate preview without requiring actual scrolling.", body_style))

story.append(add_heading("6.4 Motion Token System", h2_style, 1))
story.append(Paragraph(
    "Just as visual design uses design tokens for colors, typography, and spacing, motion design "
    "in Ferrum Studio uses motion tokens for animation parameters. A motion token defines a named "
    "set of animation properties: duration (e.g., 'duration-fast' = 150ms), easing function "
    "(e.g., 'ease-standard' = cubic-bezier(0.4, 0, 0.2, 1)), spring configuration "
    "(e.g., 'spring-bouncy' = { stiffness: 300, damping: 20, mass: 1 }), and choreography "
    "rules (e.g., 'stagger-list' = 50ms delay between items). Motion tokens are defined at the "
    "design system level and referenced by components, ensuring that all animations across an "
    "application share consistent timing and feel. The AI system uses motion tokens when generating "
    "animations, ensuring that AI-created motion adheres to the project's motion design language.", body_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 7: AI INTEGRATION STRATEGY
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("7. AI Integration Strategy", h1_style, 0))
story.append(Paragraph(
    "The Ferrum AI Designer represents the most transformative aspect of Ferrum Studio. Rather than "
    "treating AI as a novelty feature that generates static layouts from text prompts, Ferrum Studio "
    "integrates AI deeply into every stage of the design workflow. The AI system understands the "
    "semantic meaning of user intent, the structural constraints of the target platform, the "
    "behavioral requirements of interactive components, and the aesthetic principles of the "
    "project's design system. The result is an AI assistant that generates not just visual "
    "mockups but complete, interactive, accessible, and production-ready interface definitions.", body_style))

story.append(add_heading("7.1 Natural Language to UI Pipeline", h2_style, 1))
story.append(Paragraph(
    "The AI pipeline transforms a natural language prompt into a complete UI definition through "
    "seven stages. <b>Prompt Understanding</b> parses the user's intent, extracting the target "
    "domain (healthcare, e-commerce, SaaS), the type of interface (dashboard, landing page, form), "
    "key data entities and their relationships, and any explicit style or layout preferences. "
    "<b>Layout Generation</b> produces a hierarchical layout structure with appropriate containers, "
    "sections, and spacing based on design principles and the extracted intent. <b>Component "
    "Selection</b> maps each layout region to appropriate components from the project's component "
    "library or the built-in library, considering the data type, interaction requirements, and "
    "visual hierarchy. <b>Motion Choreography</b> assigns appropriate entrance animations, hover "
    "effects, and transitions to each component, using the project's motion tokens to maintain "
    "consistency. <b>Token Assignment</b> applies the project's design tokens for colors, typography, "
    "and spacing, ensuring the generated UI matches the existing design system. <b>Accessibility "
    "Validation</b> checks the generated layout against WCAG guidelines, adding ARIA attributes, "
    "keyboard navigation, and focus management as needed. Finally, <b>Code Output</b> generates "
    "the framework-specific code through the standard code generation pipeline.", body_style))
story.append(sp(6))
story.append(add_image("ai-pipeline.png", AW, 140))
story.append(Paragraph("Figure 4: End-to-end AI pipeline from natural language prompt through seven generation stages to code output.", caption_style))

story.append(add_heading("7.2 Model Architecture and Inference", h2_style, 1))
story.append(Paragraph(
    "The AI system uses a hybrid model architecture. A fine-tuned large language model (LLM) handles "
    "prompt understanding, component selection, and code generation, while a smaller, specialized "
    "model handles layout generation through a constrained decoding approach that ensures structurally "
    "valid layouts. The layout model is trained on a dataset of high-quality interface designs "
    "annotated with structural metadata (component types, hierarchy depth, spacing patterns). "
    "Inference is optimized through model quantization, speculative decoding, and caching of "
    "frequently generated patterns. For latency-sensitive operations like real-time suggestions "
    "as the user types, a lightweight model runs locally in the browser via WebAssembly, while "
    "more complex generation tasks are offloaded to a cloud API. The system also supports local "
    "model deployment for teams with data privacy requirements, using ONNX Runtime or llama.cpp "
    "for in-process inference.", body_style))

story.append(add_heading("7.3 AI-Assisted Workflow", h2_style, 1))
story.append(Paragraph(
    "The AI assistant integrates into the workflow at multiple touchpoints. In the <b>Generate</b> "
    "mode, the user provides a prompt and the AI creates a complete UI from scratch. In the "
    "<b>Refine</b> mode, the user selects an existing component or layout and asks the AI to "
    "suggest improvements, such as better spacing, alternative color treatments, or additional "
    "responsive breakpoints. In the <b>Iterate</b> mode, the user and AI engage in a conversational "
    "loop, with the AI making targeted modifications based on feedback. The AI also provides "
    "proactive suggestions: when it detects that a component lacks accessibility attributes, when "
    "a layout would break at a certain breakpoint, or when a motion definition could be improved "
    "with physics-based easing. These suggestions appear as non-intrusive inline hints that the "
    "user can accept, dismiss, or modify before applying.", body_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 8: CODE GENERATION
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("8. Code Generation", h1_style, 0))
story.append(Paragraph(
    "Code generation is the bridge between the visual design environment and the production codebase. "
    "Ferrum Studio's code generator is not a template engine that substitutes values into "
    "pre-written code strings. Instead, it uses an Abstract Syntax Tree (AST) approach that "
    "constructs code programmatically, guaranteeing syntactic correctness, consistent formatting, "
    "and adherence to framework-specific best practices. The generator produces code that a human "
    "engineer would write, not code that looks like it was machine-generated.", body_style))

story.append(add_heading("8.1 Intermediate Representation", h2_style, 1))
story.append(Paragraph(
    "The key to multi-framework code generation is the <b>Intermediate Representation (IR)</b>, "
    "a framework-agnostic description of the component tree, its properties, behaviors, and "
    "relationships. The IR captures the semantic intent of the design without prescribing "
    "implementation details. For example, a component with a hover state transition is described "
    "in the IR as having an interactive state that modifies its visual properties, without "
    "specifying whether this is implemented via CSS transitions, React state hooks, or Vue "
    "watchers. Each framework-specific generator then translates the IR into idiomatic code "
    "for that framework. This decoupling means that adding support for a new framework requires "
    "only writing a new IR-to-AST translator, without modifying the core generation pipeline.", body_style))

story.append(add_heading("8.2 Framework-Specific Generators", h2_style, 1))
story.append(Paragraph(
    "Ferrum Studio includes generators for six target frameworks. The <b>React Generator</b> "
    "produces functional components with hooks, using useState for state management, useRef for "
    "animations, and CSS Modules or Tailwind CSS for styling. The <b>Vue Generator</b> produces "
    "Composition API components with script setup, reactive references, and scoped CSS. The "
    "<b>Svelte Generator</b> produces Svelte components using reactive declarations, transitions, "
    "and scoped styles. The <b>Angular Generator</b> produces standalone components with input/output "
    "decorators, RxJS-based animations, and Angular Material-compatible styling. The <b>Web Components "
    "Generator</b> produces custom elements using Lit or vanilla JavaScript with Shadow DOM "
    "encapsulation. The <b>HTML/CSS Generator</b> produces framework-free static HTML with "
    "standalone CSS, suitable for email templates, static sites, or integration into any backend "
    "rendering system.", body_style))

code_headers = ["Framework", "Component Style", "State Management", "Styling", "Animation"]
code_rows = [
    ["React", "Functional + Hooks", "useState / useReducer", "CSS Modules / Tailwind", "Framer Motion / CSS"],
    ["Vue", "Composition API", "ref / reactive", "Scoped CSS", "Vue Transition"],
    ["Svelte", "Svelte Component", "$state / reactive", "Scoped Styles", "Svelte Transition"],
    ["Angular", "Standalone Component", "Signals / RxJS", "Component CSS", "Angular Animations"],
    ["Web Components", "Lit / Vanilla", "Properties / Attributes", "Shadow DOM CSS", "Web Animations API"],
    ["HTML/CSS", "Static Markup", "N/A", "Stand-alone CSS", "CSS Transitions"],
]
story.append(sp(6))
cw5 = [AW*0.14, AW*0.22, AW*0.22, AW*0.22, AW*0.20]
remainder5 = AW - sum(cw5)
cw5[-1] += remainder5
story.append(make_table(code_headers, code_rows, cw5))
story.append(Paragraph("Table 2: Framework-specific code generation strategy for each target platform.", caption_style))

story.append(add_heading("8.3 Code Quality Guarantees", h2_style, 1))
story.append(Paragraph(
    "Generated code must meet the same quality standards as hand-written code. To achieve this, "
    "the code generator applies a set of post-processing passes after AST construction. The "
    "<b>Formatting Pass</b> applies framework-specific formatting rules using Prettier's AST-based "
    "formatter, ensuring consistent indentation, line breaks, and quotation style. The <b>Import "
    "Optimization Pass</b> analyzes which types, hooks, and utilities are actually used and "
    "removes unused imports, reducing bundle size. The <b>Accessibility Pass</b> verifies that "
    "all ARIA attributes, keyboard handlers, and focus management code are correctly implemented "
    "in the generated output. The <b>Performance Pass</b> adds memoization (React.memo, "
    "computed properties) where beneficial, extracts constant values outside render functions, "
    "and uses efficient event delegation patterns. The result is code that is readable, "
    "maintainable, and production-quality, suitable for direct integration into real projects.", body_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 9: ENGINEERING ROADMAP
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("9. Engineering Roadmap", h1_style, 0))
story.append(Paragraph(
    "The engineering roadmap is organized into four phases spanning 24 months, progressing from "
    "a functional MVP to a full-featured product with advanced AI capabilities and enterprise "
    "features. Each phase has clear deliverables, success metrics, and team composition "
    "requirements. The roadmap is designed to deliver value to users at every phase, ensuring "
    "that early adopters can use the product for real work even before all features are complete.", body_style))

story.append(add_heading("9.1 Phase 1: MVP (Months 1-6)", h2_style, 1))
story.append(Paragraph(
    "The MVP focuses on proving the core value proposition: a visual design canvas that generates "
    "production-quality React code. Key deliverables include the Design Canvas with drag-and-drop "
    "component placement, a basic component library of 20 core components (Button, Input, Card, "
    "Navigation, Modal, Toast, Table, Form, Tabs, Accordion, Avatar, Badge, Divider, Progress, "
    "Skeleton, Tooltip, Dropdown, Breadcrumb, Switch), an Inspector Panel for property editing, "
    "a Component Tree for hierarchy navigation, a React code generator with CSS Modules output, "
    "a manual motion editor with duration and easing controls, and basic project save/load "
    "functionality. The MVP targets individual designers and engineers who want to prototype "
    "interfaces quickly and export clean React code. Success metrics: 100 beta users, 70% code "
    "generation acceptance rate, less than 2-second code generation time for a 20-component screen.", body_style))

story.append(add_heading("9.2 Phase 2: Motion and Multi-Framework (Months 7-12)", h2_style, 1))
story.append(Paragraph(
    "Phase 2 introduces the Motion Design System and expands code generation to multiple frameworks. "
    "Key deliverables include the Timeline Animation Editor with keyframe support, the Physics "
    "Engine with spring simulation, gesture recognition for swipe and drag, Vue and Svelte code "
    "generators, the AI prototype (layout generation from text prompts, limited to single-screen "
    "designs), the design token system with theme switching, and the intermediate representation "
    "(IR) for framework-agnostic code generation. This phase targets small teams that need "
    "cross-framework consistency and designers who want to add sophisticated motion to their "
    "interfaces. Success metrics: 500 active users, 85% code acceptance rate, support for 3 "
    "frameworks, AI generates usable layouts in under 5 seconds.", body_style))

story.append(add_heading("9.3 Phase 3: AI and Collaboration (Months 13-18)", h2_style, 1))
story.append(Paragraph(
    "Phase 3 brings the AI Design Assistant to full capability and introduces real-time collaboration. "
    "Key deliverables include the full AI pipeline (prompt understanding through code output), "
    "the Component Intelligence Protocol (all six behavioral dimensions), real-time collaboration "
    "with CRDT-based sync, the Plugin SDK for third-party extensions, the Component Marketplace "
    "for sharing and discovering components, the node graph editor for visual programming, and "
    "Angular and Web Components code generators. This phase targets design teams and engineering "
    "organizations that need collaborative workflows and AI-accelerated design. Success metrics: "
    "2,000 active users, 90% code acceptance rate, real-time collaboration supporting 10+ "
    "simultaneous editors, 100+ components in the marketplace.", body_style))

story.append(add_heading("9.4 Phase 4: Enterprise and Scale (Months 19-24)", h2_style, 1))
story.append(Paragraph(
    "The final phase focuses on enterprise readiness and advanced capabilities. Key deliverables "
    "include advanced AI features (multi-screen generation, design system learning, accessibility "
    "auditing), performance optimization (large project support with 1000+ components, lazy "
    "loading, virtual scrolling in the component tree), enterprise features (SSO/SAML integration, "
    "audit logging, role-based access control, on-premises deployment option), a mobile companion "
    "app for reviewing and annotating designs on the go, HTML/CSS code generator, and the Paint "
    "API integration for custom rendering effects. This phase targets enterprise design systems "
    "teams and organizations with strict compliance and deployment requirements. Success metrics: "
    "10,000 active users, 95% code acceptance rate, sub-200ms interaction latency for projects "
    "with 500+ components.", body_style))

road_headers = ["Phase", "Timeline", "Focus Areas", "Key Deliverables", "Target Users"]
road_rows = [
    ["Phase 1", "Months 1-6", "Core Canvas + React Gen", "20 components, Inspector, React output", "Individuals"],
    ["Phase 2", "Months 7-12", "Motion + Multi-Framework", "Timeline, Physics, Vue/Svelte, AI proto", "Small Teams"],
    ["Phase 3", "Months 13-18", "AI + Collaboration", "Full AI, CRDT collab, Plugin SDK", "Design Teams"],
    ["Phase 4", "Months 19-24", "Enterprise + Scale", "Advanced AI, SSO, on-prem, mobile", "Organizations"],
]
story.append(sp(6))
cw_road = [AW*0.10, AW*0.14, AW*0.22, AW*0.32, AW*0.12]  # slight adjustment
remainder_r = AW - sum(cw_road)
cw_road[3] += remainder_r
story.append(make_table(road_headers, road_rows, cw_road))
story.append(Paragraph("Table 3: Four-phase engineering roadmap spanning 24 months.", caption_style))

# ════════════════════════════════════════════════════════════════════
# CHAPTER 10: MVP DEFINITION
# ════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(add_heading("10. MVP Definition", h1_style, 0))
story.append(Paragraph(
    "The Minimum Viable Product defines the smallest set of features that demonstrates Ferrum Studio's "
    "core value proposition: visually designing interfaces and generating production-quality code. "
    "The MVP is not a prototype or a demo; it is a functional tool that individual designers and "
    "engineers can use for real work. This section defines the scope boundaries, primary user "
    "stories, technical architecture, success metrics, and launch criteria for the MVP.", body_style))

story.append(add_heading("10.1 Scope Boundaries", h2_style, 1))
story.append(Paragraph(
    "The MVP includes the Design Canvas with basic layout capabilities (flexbox-based, no grid), "
    "a component library of 20 core components, an Inspector Panel for property and style editing, "
    "a Component Tree for hierarchy navigation and reordering, React code generation with CSS "
    "Modules, a manual motion editor supporting duration and easing configuration, project save/load "
    "in the .ferrum format, and a basic export dialog. The MVP explicitly defers: physics-based "
    "animation, the timeline editor, AI assistance, real-time collaboration, multi-framework code "
    "generation (only React), the node graph editor, the plugin system, the component marketplace, "
    "and enterprise features. These deferred features are planned for Phases 2-4 and are documented "
    "in the engineering roadmap.", body_style))

story.append(add_heading("10.2 Primary User Stories", h2_style, 1))
stories = [
    ("US-1: Canvas Interaction", "As a designer, I want to drag components from a library onto a canvas, resize and position them using handles, and see a live preview of the layout, so that I can quickly create interface mockups visually."),
    ("US-2: Property Editing", "As a designer, I want to select any component and edit its properties (text, color, spacing, border, shadow) in an inspector panel, so that I can customize the appearance without writing CSS."),
    ("US-3: Component Hierarchy", "As a designer, I want to view and reorder the component tree using drag-and-drop, so that I can organize my layout structure efficiently."),
    ("US-4: Code Export", "As an engineer, I want to export the current design as React components with CSS Modules, so that I can integrate the generated code into my project directly."),
    ("US-5: Motion Basics", "As a designer, I want to configure entrance animations for components by setting duration and easing, so that I can add motion to my designs without writing keyframe CSS."),
    ("US-6: Project Persistence", "As a user, I want to save my project and reopen it later with all components and configurations preserved, so that I can work on designs iteratively."),
    ("US-7: Responsive Preview", "As a designer, I want to preview my design at different viewport widths (mobile, tablet, desktop), so that I can verify responsive behavior before export."),
]
for title, desc in stories:
    story.append(Paragraph(f'<b>{title}</b>', body_left))
    story.append(Paragraph(desc, body_style))

story.append(add_heading("10.3 Feature Priority Matrix", h2_style, 1))
prio_headers = ["Feature", "Priority", "MVP Phase"]
prio_rows = [
    ["Design Canvas (drag, resize, position)", "Must Have", "Phase 1"],
    ["20 Core Components", "Must Have", "Phase 1"],
    ["Inspector Panel", "Must Have", "Phase 1"],
    ["Component Tree", "Must Have", "Phase 1"],
    ["React Code Generation", "Must Have", "Phase 1"],
    ["Basic Motion Editor", "Must Have", "Phase 1"],
    ["Project Save/Load", "Must Have", "Phase 1"],
    ["Responsive Preview", "Should Have", "Phase 1"],
    ["Timeline Animation Editor", "Should Have", "Phase 2"],
    ["Physics Engine", "Should Have", "Phase 2"],
    ["Vue/Svelte Generators", "Should Have", "Phase 2"],
    ["AI Layout Generation", "Could Have", "Phase 2-3"],
    ["Real-time Collaboration", "Could Have", "Phase 3"],
    ["Plugin SDK", "Could Have", "Phase 3"],
    ["Component Marketplace", "Won't Have (MVP)", "Phase 3"],
    ["Enterprise SSO/Compliance", "Won't Have (MVP)", "Phase 4"],
]
story.append(sp(6))
cw_prio = [AW*0.45, AW*0.20, AW*0.20]
remainder_p = AW - sum(cw_prio)
cw_prio[0] += remainder_p
story.append(make_table(prio_headers, prio_rows, cw_prio))
story.append(Paragraph("Table 4: MoSCoW feature priority matrix for MVP scoping.", caption_style))

story.append(add_heading("10.4 MVP Tech Stack", h2_style, 1))
story.append(Paragraph(
    "The MVP is built with a modern, performant technology stack. The application shell uses "
    "Electron for cross-platform desktop support, with a web version that runs in modern browsers "
    "for immediate access without installation. The core editor is built with React 19 and "
    "TypeScript, using a custom canvas renderer based on HTML5 Canvas for the design surface. "
    "State management uses Zustand for its simplicity and performance characteristics. The component "
    "system is defined in a schema format and rendered through a custom reconciler that bridges "
    "the Ferrum component model to React components. The code generator uses the Babel AST API "
    "to construct React component code programmatically, ensuring syntactic correctness. The file "
    "system uses the File System Access API for native file dialogs and the .ferrum JSON format "
    "for project storage. Unit tests use Vitest, and end-to-end tests use Playwright.", body_style))

story.append(add_heading("10.5 Success Metrics and Launch Criteria", h2_style, 1))
story.append(Paragraph(
    "The MVP is considered launch-ready when it meets the following criteria: all seven primary user "
    "stories are implemented and passing automated tests, the React code generator produces code "
    "that passes ESLint with zero errors and zero warnings for all 20 core components, the design "
    "canvas maintains 60fps during drag operations with up to 50 components, code generation for "
    "a 20-component screen completes in under 2 seconds, the application starts up in under 3 "
    "seconds on a mid-range laptop, and at least 50 beta users have used the tool for real "
    "projects over a 2-week testing period with a net promoter score (NPS) of 30 or higher. "
    "Post-launch, the team will track weekly active users, code generation acceptance rate (the "
    "percentage of generated code that users keep without modification), and time-to-first-export "
    "(how long it takes a new user to generate their first code export).", body_style))

# ━━ BUILD ━━
doc = TocDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=0.85*inch, bottomMargin=0.85*inch,
    title="Ferrum Studio Product Architecture",
    author="Z.ai",
    subject="Product Architecture for Ferrum Studio Visual Development Environment",
)
doc.multiBuild(story, onLaterPages=page_header_footer, onFirstPage=page_header_footer)
print(f"Body PDF generated: {OUTPUT}")