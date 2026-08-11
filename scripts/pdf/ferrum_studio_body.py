#!/usr/bin/env python3
"""
Ferrum Studio - Product Architecture Specification
White Paper: 8 chapters covering product architecture, UX design, technical architecture,
component model, rendering architecture, AI integration, engineering roadmap, and MVP definition.
"""

import os, sys, hashlib, platform
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, Image, Flowable, HRFlowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus.tableofcontents import TableOfContents

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FONT SETUP
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FONT_DIR = '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                    italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# Font fallback for mixed text
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'skills', 'pdf', 'scripts'))
try:
    from pdf import install_font_fallback
    install_font_fallback()
except Exception:
    pass  # English-only doc, fallback not critical

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CASCADE PALETTE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE_BG       = colors.HexColor('#f3f3f1')
SECTION_BG    = colors.HexColor('#ecebea')
CARD_BG       = colors.HexColor('#e7e6e3')
TABLE_STRIPE  = colors.HexColor('#f1f0ee')
HEADER_FILL   = colors.HexColor('#534c3a')
COVER_BLOCK   = colors.HexColor('#877b54')
BORDER        = colors.HexColor('#d7d0be')
ICON          = colors.HexColor('#b09545')
ACCENT        = colors.HexColor('#8a7128')
ACCENT_2      = colors.HexColor('#7153cc')
TEXT_PRIMARY   = colors.HexColor('#262522')
TEXT_MUTED     = colors.HexColor('#908e87')
SEM_SUCCESS   = colors.HexColor('#4e9365')
SEM_WARNING   = colors.HexColor('#b38f49')
SEM_ERROR     = colors.HexColor('#944c45')
SEM_INFO      = colors.HexColor('#597999')
WHITE         = colors.white

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STYLES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MARGIN = 1.0 * inch

sH1 = ParagraphStyle('H1', fontName='FreeSerif-Bold', fontSize=26, leading=32,
                      textColor=TEXT_PRIMARY, spaceAfter=12, spaceBefore=24, alignment=TA_LEFT)
sH2 = ParagraphStyle('H2', fontName='FreeSerif-Bold', fontSize=18, leading=24,
                      textColor=HEADER_FILL, spaceAfter=8, spaceBefore=18, alignment=TA_LEFT)
sH3 = ParagraphStyle('H3', fontName='FreeSerif-Bold', fontSize=14, leading=20,
                      textColor=TEXT_PRIMARY, spaceAfter=6, spaceBefore=14, alignment=TA_LEFT)
sBody = ParagraphStyle('Body', fontName='FreeSerif', fontSize=10.5, leading=17,
                        textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=8)
sBodyLeft = ParagraphStyle('BodyLeft', fontName='FreeSerif', fontSize=10.5, leading=17,
                            textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=8)
sBullet = ParagraphStyle('Bullet', fontName='FreeSerif', fontSize=10.5, leading=17,
                          textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=18, bulletIndent=6,
                          spaceAfter=4)
sSubBullet = ParagraphStyle('SubBullet', fontName='FreeSerif', fontSize=10, leading=16,
                             textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=36, bulletIndent=24,
                             spaceAfter=3)
sCallout = ParagraphStyle('Callout', fontName='FreeSerif-Italic', fontSize=11, leading=18,
                           textColor=HEADER_FILL, leftIndent=24, borderPadding=8,
                           spaceAfter=12, spaceBefore=12)
sTableCell = ParagraphStyle('TC', fontName='FreeSerif', fontSize=9.5, leading=14,
                             textColor=TEXT_PRIMARY, wordWrap='CJK')
sTableHeader = ParagraphStyle('TH', fontName='FreeSerif-Bold', fontSize=9.5, leading=14,
                               textColor=WHITE)
sCaption = ParagraphStyle('Caption', fontName='FreeSerif-Italic', fontSize=9, leading=14,
                           textColor=TEXT_MUTED, alignment=TA_LEFT, spaceAfter=6)
sCode = ParagraphStyle('Code', fontName='DejaVuSans', fontSize=8.5, leading=13,
                        textColor=TEXT_PRIMARY, backColor=CARD_BG, borderPadding=6,
                        leftIndent=12, spaceAfter=8, spaceBefore=4)

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# TOC SETUP
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
toc_level0 = ParagraphStyle('TOC0', fontName='FreeSerif-Bold', fontSize=12, leading=22,
                             leftIndent=0, textColor=TEXT_PRIMARY)
toc_level1 = ParagraphStyle('TOC1', fontName='FreeSerif', fontSize=10.5, leading=20,
                             leftIndent=20, textColor=TEXT_MUTED)

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def heading(text, style, level=0):
    key = f'h_{hashlib.md5(text.encode()).hexdigest()[:8]}'
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# HELPERS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AW = A4[0] - 2 * MARGIN  # available width

def safe_keep(elements):
    total = sum(el.wrap(AW, A4[1] - 2 * MARGIN)[1] for el in elements if hasattr(el, 'wrap'))
    if total <= A4[1] * 0.4:
        return [KeepTogether(elements)]
    elif len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)

def make_table(data, col_widths=None):
    """Build a safe table with Paragraph-wrapped cells and cascade colors."""
    if col_widths is None:
        n = len(data[0]) if data else 1
        col_widths = [AW / n] * n
    assert sum(col_widths) <= AW + 1, f"Table overflow: {sum(col_widths):.0f} > {AW:.0f}"
    wrapped = []
    for i, row in enumerate(data):
        r = []
        for cell in row:
            if i == 0:
                r.append(Paragraph(str(cell), sTableHeader))
            else:
                r.append(Paragraph(str(cell), sTableCell))
        wrapped.append(r)
    t = Table(wrapped, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
        else:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), WHITE))
    t.setStyle(TableStyle(style_cmds))
    return t

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=12, spaceBefore=12)

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', sBullet)

def sub_bullet(text):
    return Paragraph(f'<bullet>-</bullet> {text}', sSubBullet)

def callout(text):
    return Paragraph(text, sCallout)

def body(text):
    return Paragraph(text, sBody)

def caption(text):
    return Paragraph(text, sCaption)

def h1(text):
    return heading(text, sH1, 0)

def h2(text):
    return heading(text, sH2, 1)

def h3(text):
    return heading(text, sH3, 1)

def spacer(h=8):
    return Spacer(1, h)

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PAGE TEMPLATE (header/footer)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
def page_template(canvas, doc):
    canvas.saveState()
    canvas.setFont('FreeSerif', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, A4[1] - 36, 'Ferrum Studio Architecture Specification')
    canvas.drawRightString(A4[0] - MARGIN, A4[1] - 36, 'July 2026')
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, A4[1] - 44, A4[0] - MARGIN, A4[1] - 44)
    # Footer
    canvas.setFont('FreeSerif', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawCentredString(A4[0] / 2, 28, f'Page {doc.page}')
    canvas.restoreState()

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CONTENT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story = []

# TOC
toc = TableOfContents()
toc.levelStyles = [toc_level0, toc_level1]
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════
# CHAPTER 1: PRODUCT ARCHITECTURE
# ═══════════════════════════════════════════════════════════════
story.append(h1('1. Product Architecture'))
story.append(spacer(6))

story.append(h2('1.1 Vision and Positioning'))
story.append(body(
    'Ferrum Studio is envisioned as the definitive visual development environment for the Ferrum Universal UI Engine. '
    'It is not a website builder, not a prototyping tool, and not a design-only application. Rather, it occupies an entirely '
    'new product category: a <b>production interface authoring environment</b> where designers and engineers collaborate '
    'on the same artifact, and the output is not a mockup or a prototype but deployable, framework-agnostic, accessible, '
    'and performant code. The guiding metaphor is "Unreal Engine Blueprint for user interfaces," drawing from the way '
    'Unreal Engine empowers game developers to wire complex behaviors visually while retaining full programmatic control.'
))
story.append(body(
    'The fundamental insight driving Ferrum Studio is that the current design-to-development workflow is irreparably '
    'broken. Designers create in Figma, engineers translate to code, and the translation process loses intent, introduces '
    'bugs, and creates an adversarial relationship between design and implementation. Ferrum Studio eliminates this '
    'translation layer entirely by making the visual canvas the source of truth, with code generation as a deterministic '
    'compilation step. The designer and the engineer see the same system from different perspectives, not different systems.'
))

story.append(h2('1.2 Competitive Landscape Analysis'))
story.append(body(
    'To build something genuinely new, we must understand what exists. Six major tools inform the design of Ferrum Studio, '
    'each contributing distinct architectural lessons while revealing the gaps that Ferrum must fill.'
))

story.append(h3('Figma: The Collaboration Benchmark'))
story.append(body(
    'Figma established the modern standard for collaborative design with its real-time multiplayer canvas, component '
    'variants and properties system, and plugin ecosystem. Its auto-layout engine brought CSS-like flexbox/grid thinking '
    'to design tools. However, Figma is fundamentally a <b>pixel-pushing design tool</b>. It outputs static frames, not '
    'interactive components. Its "code" panel generates inspection values (CSS properties) but not production code. Its '
    'component system lacks states, interactions, accessibility attributes, and responsive behavior. Figma proves that '
    'a great visual canvas must exist, but also that design-only tools inevitably create a handoff gap.'
))

story.append(h3('Framer: The Interaction Pioneer'))
story.append(body(
    'Framer demonstrated that code-level interactions could be made visual. Its motion design system, scroll-based '
    'animations, and component states brought a layer of interactivity that Figma could not match. Framer sites are '
    'genuinely interactive and feel premium. The key lesson from Framer is that <b>motion must be a first-class citizen '
    'in any visual builder</b>, not an afterthought or a code-only concern. However, Framer remains a website builder '
    'with limited component intelligence, no physics engine, and no multi-framework export. Its animation system, while '
    'impressive, is not composable in the way that a node-based physics graph would allow.'
))

story.append(h3('Webflow: The Visual DOM'))
story.append(body(
    'Webflow proved that designers could build real websites without writing code, using a visual representation of the '
    'DOM tree, CSS properties panel, and responsive breakpoint controls. Its CMS integration and hosting platform made '
    'it a full-stack website solution. The lesson for Ferrum Studio is that <b>direct DOM manipulation in a visual '
    'interface works</b> and that responsive controls must be integrated into the canvas, not relegated to a preview '
    'mode. Webflow limitations include no motion physics, limited component state management, and a single-framework '
    'output (HTML/CSS/JS only).'
))

story.append(h3('Unreal Engine Blueprint: The Node Graph Model'))
story.append(body(
    'The most direct inspiration for Ferrum Studio comes from Unreal Engine Blueprint, a visual scripting system where '
    'developers wire nodes together to create complex game behaviors. Blueprint demonstrates that <b>node-based graphs '
    'can express arbitrarily complex logic</b> while remaining readable and debuggable. The key architectural concept '
    'borrowed from Blueprint is the execution graph: a directed acyclic graph where nodes represent operations (transforms, '
    'conditions, physics calculations) and edges represent data flow. Ferrum Studio adapts this model for UI: instead of '
    'game logic nodes, we have component property nodes, motion curve nodes, physics parameter nodes, and responsive '
    'breakpoint nodes. The graph is the source of truth; the canvas view and code view are both projections of it.'
))

story.append(h3('Apple Interface Builder: The Native Standard'))
story.append(body(
    'Apple Interface Builder (now part of Xcode) established the pattern of visual layout editing for native applications, '
    'with constraints-based layout (Auto Layout), storyboards for screen flow, and direct integration with the build system. '
    'Its strength is the seamless designer-to-compiler pipeline: what you see in Interface Builder is what the app renders. '
    'The lesson for Ferrum is that <b>the visual editor must be the compiler frontend</b>, not a disconnected tool that '
    'generates code to be manually integrated. Interface Builder limitations include platform lock-in (iOS/macOS only), '
    'no motion design, no web export, and a WYSIWYG approach that does not scale to complex responsive layouts.'
))

story.append(h3('Storybook: The Component Catalog Pattern'))
story.append(body(
    'Storybook pioneered the idea of developing UI components in isolation with documented props, states, and variations. '
    'Its addon system (controls, actions, a11y, viewport) created a de facto standard for component documentation. The key '
    'lesson is that <b>every component in Ferrum Studio must have a Storybook-like panel</b> showing all its states, '
    'responsive variants, accessibility attributes, and supported interactions. Storybook limitations include no visual '
    'editing, no motion design, no layout composition, and a development-only workflow that does not include designers.'
))

story.append(h2('1.3 Product Architecture Overview'))
story.append(body(
    'Ferrum Studio is structured as a layered architecture where each layer builds on the one below. The design canvas '
    'is the user-facing layer. Below it sits the component intelligence layer, which manages component state, '
    'accessibility, responsive behavior, and data bindings. Below that is the motion engine, which provides physics-based '
    'animation, timeline editing, and gesture interactions. The rendering layer translates the abstract component tree into '
    'optimized output for each target framework. At the base, the core runtime provides the zero-dependency execution '
    'engine that powers everything.'
))

t = make_table([
    ['Layer', 'Responsibility', 'Key Technologies'],
    ['Design Canvas', 'Visual editing, drag-and-drop, selection, property inspection', 'WebGL/Canvas 2D, React'],
    ['Component Intelligence', 'States, a11y, responsive, data bindings, validation', 'Custom schema, ARIA engine'],
    ['Motion Engine', 'Physics, timelines, gestures, scroll, page transitions', 'Spring physics, WASM'],
    ['Rendering Layer', 'Multi-framework code generation, optimization, tree-shaking', 'AST transforms, IR'],
    ['Core Runtime', 'Zero-dependency execution, design tokens, plugin system', 'Rust/WASM, token engine'],
], [AW * 0.22, AW * 0.48, AW * 0.30])
story.append(t)
story.append(caption('Table 1.1: Ferrum Studio layered architecture'))

story.append(h2('1.4 Key Architectural Decisions'))
story.append(bullet('<b>Canvas-native, not DOM-wrapping:</b> The design canvas is a custom rendering surface (Canvas 2D or WebGL), not a styled DOM tree. This gives pixel-perfect control over rendering, eliminates browser layout quirks, and allows the canvas to render components exactly as they will appear in production, regardless of framework.'))
story.append(bullet('<b>Graph as source of truth:</b> Every design is stored as a directed graph (the "Ferrum Graph"), not as a tree of DOM nodes. This allows the same graph to be projected as a visual canvas, as a component tree, as a set of framework-specific code files, or as a set of design tokens.'))
story.append(bullet('<b>Framework-agnostic IR:</b> Before generating code for any specific framework, the Ferrum Graph is compiled to an intermediate representation (IR) that expresses layout, styling, behavior, and motion in framework-independent terms. Each framework then has a backend that translates the IR to native code.'))
story.append(bullet('<b>Incremental compilation:</b> Code generation is not a batch process. As the user edits the canvas, the system incrementally updates only the affected IR nodes and regenerates only the changed output files. This provides sub-second feedback.'))
story.append(bullet('<b>Plugin architecture:</b> Every subsystem (motion curves, physics solvers, code generators, linters, accessibility checkers) is implemented as a plugin with a well-defined API. Third parties can extend Ferrum Studio without modifying the core.'))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 2: UX DESIGN
# ═══════════════════════════════════════════════════════════════
story.append(h1('2. UX Design'))

story.append(h2('2.1 Design Philosophy'))
story.append(body(
    'The UX of Ferrum Studio follows three principles derived from studying the six reference tools. First, '
    '<b>progressive disclosure</b>: the interface should be approachable for a designer who wants to drag, drop, '
    'and style components visually, while exposing the full power of the node graph, physics parameters, and code '
    'generation for engineers who need fine-grained control. Second, <b>spatial consistency</b>: the canvas, the '
    'inspector, the component tree, and the timeline should share a single spatial model so that selecting an element '
    'in any view highlights it in all others. Third, <b>zero-surprise rendering</b>: what the user sees on the canvas '
    'must be pixel-identical to what ships in production. Any rendering difference between canvas and output is a bug.'
))

story.append(h2('2.2 Interface Layout'))
story.append(body(
    'The primary interface is organized into four zones, inspired by the layout patterns of Figma, Unreal Engine, and '
    'After Effects. The left panel contains the component tree (a hierarchical list of all elements on the canvas) and '
    'the asset library (reusable components, design tokens, and templates). The center is the design canvas, which '
    'occupies the majority of the screen real estate and supports infinite pan and zoom. The right panel is the '
    'inspector, showing properties of the selected element organized into collapsible sections: Layout, Style, Motion, '
    'States, Accessibility, and Data. The bottom panel is the timeline and motion editor, which can be toggled between '
    'a keyframe timeline (After Effects style) and a node graph (Unreal Blueprint style).'
))

t = make_table([
    ['Zone', 'Contents', 'Reference'],
    ['Left Panel', 'Component tree, asset library, design tokens, layers', 'Figma layers + UE Content Browser'],
    ['Center Canvas', 'Design surface, artboards, responsive previews', 'Figma canvas + Webflow designer'],
    ['Right Inspector', 'Layout, style, motion, states, a11y, data bindings', 'Figma properties + UE Details'],
    ['Bottom Panel', 'Timeline editor, node graph, physics parameters', 'After Effects + UE Blueprint'],
], [AW * 0.18, AW * 0.48, AW * 0.34])
story.append(t)
story.append(caption('Table 2.1: Interface layout zones'))

story.append(h2('2.3 Design Canvas'))
story.append(body(
    'The design canvas is the heart of Ferrum Studio. Unlike Figma, which uses a vector-based frame system, '
    'and unlike Webflow, which uses a live DOM, Ferrum Studio renders on a custom canvas that directly interprets '
    'the Ferrum Graph. This means the canvas can show motion previews, physics simulations, and responsive '
    'breakpoint transitions in real time, all within the same visual surface. Users place components by dragging '
    'them from the asset library onto the canvas. Components snap to a configurable grid and can be arranged '
    'using flexbox, grid, or absolute positioning. The canvas supports multi-selection, grouping, alignment '
    'guides, and smart distribution (equal spacing between elements).'
))
story.append(body(
    'Responsive design is handled through an integrated breakpoint system. Users define breakpoints (e.g., '
    'mobile at 375px, tablet at 768px, desktop at 1280px), and the canvas can switch between them instantly. '
    'Layout changes at each breakpoint are stored as overrides in the component graph, not as separate designs. '
    'This means a single component can have different padding, font sizes, and layout modes at each breakpoint, '
    'and the code generator produces the appropriate media queries or container queries automatically.'
))

story.append(h2('2.4 Component Inspector'))
story.append(body(
    'The inspector panel adapts its content based on the selected element type. For a layout container, it shows '
    'flex/grid properties, gap controls, and alignment options. For a text element, it shows typography controls '
    'with design token integration. For an interactive element (button, input, toggle), it shows state definitions '
    '(default, hover, focus, active, disabled, loading) and accessibility attributes (ARIA roles, labels, '
    'descriptions). Every property in the inspector is bound to a design token by default, ensuring consistency '
    'across the entire system. Users can override tokens locally, and the system tracks which properties are '
    'token-driven and which are hardcoded, providing a visual indicator of token coverage.'
))

story.append(h2('2.5 Timeline and Motion Editor'))
story.append(body(
    'The bottom panel provides two views for designing motion: a keyframe timeline and a node graph. The keyframe '
    'timeline follows the After Effects paradigm where users set keyframes at specific time points for any animatable '
    'property (position, scale, rotation, opacity, color, border-radius, and custom properties). The system '
    'interpolates between keyframes using configurable easing curves: linear, ease-in, ease-out, ease-in-out, '
    'spring (with configurable mass, stiffness, and damping), bounce, and elastic. The node graph view, inspired '
    'by Unreal Engine Blueprint, allows users to wire motion behaviors as dataflow graphs. A scroll-triggered '
    'animation, for example, would be represented as a ScrollPosition node connected to a RangeMapper node '
    'connected to a Transform node. This graph-based approach enables complex, multi-trigger animations that '
    'would be extremely difficult to express with keyframes alone.'
))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 3: TECHNICAL ARCHITECTURE
# ═══════════════════════════════════════════════════════════════
story.append(h1('3. Technical Architecture'))

story.append(h2('3.1 System Architecture'))
story.append(body(
    'Ferrum Studio is built as a desktop-class web application using Electron (or Tauri for a lighter footprint) '
    'with a multi-process architecture. The renderer process hosts the React-based UI (canvas, panels, inspector). '
    'the main process manages file I/O, plugin hosting, and native integrations. A dedicated worker process runs '
    'the compiler and code generation pipeline, keeping the UI responsive even during large project compilations. '
    'An optional local server process provides live preview on real devices over the network, similar to Figma Dev Mode.'
))

story.append(h2('3.2 Core Technology Stack'))
story.append(body(
    'The frontend is built with React 19 and TypeScript, using a custom canvas renderer that communicates with the '
    'Ferrum Graph through a bidirectional state synchronization protocol. The state management layer uses a conflict-free '
    'replicated data type (CRDT) implementation to support real-time collaboration without a central server bottleneck. '
    'The plugin system runs in isolated Web Workers with a message-passing API, preventing plugins from blocking '
    'the UI or accessing each other\'s state. The compiler pipeline is written in Rust and compiled to WebAssembly, '
    'providing near-native performance for code generation, tree-shaking, and optimization.'
))

t = make_table([
    ['Subsystem', 'Technology', 'Rationale'],
    ['UI Framework', 'React 19 + TypeScript', 'Component model, ecosystem, team expertise'],
    ['Canvas Renderer', 'Custom Canvas 2D / WebGL', 'Pixel-perfect rendering, performance'],
    ['State Management', 'CRDT (Yjs-based)', 'Real-time collaboration without conflicts'],
    ['Plugin Runtime', 'Web Workers + message-passing', 'Isolation, security, performance'],
    ['Compiler', 'Rust to WebAssembly', 'Speed, tree-shaking, multi-backend codegen'],
    ['Motion Engine', 'Custom spring physics in WASM', 'Consistent cross-platform physics'],
    ['File Format', 'Ferrum Graph (.ferrum)', 'JSON-based, git-friendly, human-readable'],
], [AW * 0.18, AW * 0.30, AW * 0.52])
story.append(t)
story.append(caption('Table 3.1: Core technology stack'))

story.append(h2('3.3 Data Model: The Ferrum Graph'))
story.append(body(
    'Every project in Ferrum Studio is stored as a Ferrum Graph, a directed acyclic graph where nodes represent '
    'design primitives (components, styles, tokens, motion curves, physics parameters) and edges represent '
    'relationships (parent-child, reference, override, binding). The graph is serialized as JSON and stored in a '
    '.ferrum file, which is designed to be human-readable, git-friendly (minimal diffs), and efficient to parse. '
    'The graph supports three types of nodes: <b>element nodes</b> (representing visual components), <b>style nodes</b> '
    '(representing design tokens, utility classes, and inline styles), and <b>behavior nodes</b> (representing motion, '
    'interaction, and data-binding logic). Edges can be typed as "contains" (parent-child), "references" (token usage), '
    '"overrides" (responsive breakpoint changes), or "binds" (data flow connections).'
))

story.append(h2('3.4 Real-Time Collaboration'))
story.append(body(
    'Collaboration is implemented using a CRDT-based approach inspired by Figma and Yjs. Each user\'s edits are '
    'applied to their local copy of the Ferrum Graph, and changes are broadcast to other users via WebSocket. The '
    'CRDT merge algorithm guarantees that all users converge to the same state regardless of network conditions, '
    'without requiring a central coordination server. Presence information (cursor positions, selections, active '
    'panels) is transmitted separately at high frequency to provide a smooth multiplayer experience. The system '
    'supports offline editing with automatic reconciliation when connectivity is restored, making it suitable for '
    'teams working across unreliable networks.'
))

story.append(h2('3.5 Plugin Architecture'))
story.append(body(
    'Plugins in Ferrum Studio are isolated modules that extend the editor\'s functionality through a well-defined API. '
    'Each plugin runs in its own Web Worker and communicates with the host via a structured message-passing protocol. '
    'Plugins can add new component types, motion curves, physics solvers, code generator backends, linter rules, '
    'accessibility checkers, and import/export formats. The plugin API is versioned and backward-compatible, ensuring '
    'that plugins continue to work across minor version updates. A built-in plugin marketplace allows users to discover '
    'and install community plugins with one click.'
))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 4: COMPONENT MODEL
# ═══════════════════════════════════════════════════════════════
story.append(h1('4. Component Model'))

story.append(h2('4.1 Component Intelligence'))
story.append(body(
    'Every component in Ferrum Studio is not just a visual element but an intelligent entity that understands its '
    'own behavior across multiple dimensions. A Button component, for example, knows its visual states (default, hover, '
    'focus, active, disabled, loading), its accessibility requirements (ARIA role="button", keyboard interaction, focus '
    'management), its responsive behavior (full-width on mobile, auto-width on desktop), its motion rules (press scale '
    'animation, focus ring transition, loading spinner), and its data bindings (label text from a token, disabled '
    'state from a context, click handler from an event). This intelligence is encoded in the component\'s schema, '
    'which is part of the Ferrum Graph and is used by the inspector, the code generator, and the accessibility checker.'
))

story.append(h2('4.2 Component Schema'))
story.append(body(
    'Each component type is defined by a schema that specifies its properties, states, slots, events, and constraints. '
    'The schema is written in a declarative format and stored as part of the component library. The inspector panel '
    'reads the schema to determine which properties to show and how to organize them. The code generator reads the '
    'schema to produce the correct props interface, state management code, and event handlers. The accessibility '
    'checker reads the schema to verify that required ARIA attributes are present and that keyboard navigation works '
    'correctly.'
))

t = make_table([
    ['Schema Field', 'Description', 'Example'],
    ['Properties', 'Configurable values exposed in inspector', 'variant: "primary" | "secondary" | "ghost"'],
    ['States', 'Visual/behavioral states with transitions', 'default, hover, focus, active, disabled, loading'],
    ['Slots', 'Named content areas for children', 'icon, label, trailing-icon'],
    ['Events', 'User interaction callbacks', 'onClick, onFocus, onMouseEnter'],
    ['Constraints', 'Validation rules for property values', 'padding must be >= 0, fontSize must be > 0'],
    ['A11y Rules', 'Required accessibility attributes', 'role, aria-label, aria-disabled, tabIndex'],
    ['Responsive', 'Breakpoint-specific overrides', 'fullWidth: true on mobile, false on desktop'],
    ['Motion', 'Default animation definitions', 'press: { scale: 0.97, duration: 150ms }'],
], [AW * 0.18, AW * 0.38, AW * 0.44])
story.append(t)
story.append(caption('Table 4.1: Component schema fields'))

story.append(h2('4.3 Component Composition'))
story.append(body(
    'Components compose through a slot-based system. A Card component might have a "header" slot, a "body" slot, and '
    'a "footer" slot. Users can drag other components (text, images, buttons, custom components) into these slots, and '
    'the system validates that only allowed component types are placed in each slot. This composition model maps '
    'directly to framework-specific patterns: React children/slots, Vue named slots, Svelte slot elements, Angular '
    'content projection, and Web Components shadow DOM slots. The code generator produces the appropriate composition '
    'syntax for each target framework, ensuring that the visual composition the designer created is faithfully '
    'reproduced in code.'
))

story.append(h2('4.4 Design Token Integration'))
story.append(body(
    'Design tokens are first-class citizens in Ferrum Studio. Every visual property (color, spacing, typography, border '
    'radius, shadow, opacity) can be bound to a design token. Tokens are organized into semantic groups (colors.primary, '
    'spacing.md, typography.heading1) and can reference other tokens (colors.primary.background references '
    'colors.base.blue.500). The token system supports multiple output formats: CSS custom properties, SCSS variables, '
    'Tailwind theme extensions, JavaScript/TypeScript objects, and JSON. When a token value changes, all components '
    'bound to that token update instantly on the canvas, and the change is propagated to all generated code files.'
))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 5: RENDERING ARCHITECTURE
# ═══════════════════════════════════════════════════════════════
story.append(h1('5. Rendering Architecture'))

story.append(h2('5.1 Multi-Framework Code Generation'))
story.append(body(
    'The rendering architecture is built around an intermediate representation (IR) that serves as the compilation '
    'target for the Ferrum Graph and the source for framework-specific code generators. The IR expresses layout '
    '(flexbox, grid, absolute positioning), styling (properties, tokens, responsive overrides), behavior (states, '
    'events, interactions), and motion (animations, transitions, physics parameters) in a framework-independent format. '
    'Each framework backend translates the IR into native code: React JSX components, Vue SFC files, Svelte components, '
    'Angular components with template and stylesheet files, or standard Web Components with HTML templates and CSS. '
    'The generated code is designed to be readable, maintainable, and production-quality, not a minified or obfuscated '
    'output that developers cannot modify.'
))

story.append(h2('5.2 Intermediate Representation (IR)'))
story.append(body(
    'The IR is a JSON-based format that describes the component tree in terms of framework-agnostic abstractions. '
    'Each IR node has a type (element, component, text, slot), a set of properties (layout, style, a11y, motion), '
    'a list of children, and a list of responsive overrides indexed by breakpoint name. The IR is designed to be '
    'lossless: every piece of information in the Ferrum Graph that affects the visual output or behavior is preserved '
    'in the IR. This ensures that the generated code is a complete and faithful reproduction of the design.'
))

story.append(h2('5.3 Code Quality Standards'))
story.append(body(
    'Generated code must meet the same quality standards as hand-written code. This means: meaningful component and '
    'prop names derived from the semantic structure of the design (not "Div1", "Div2"); TypeScript types for all props '
    'and state; proper event handler typing; CSS that uses logical properties and respects the user\'s preferred color '
    'scheme; ARIA attributes that match the component\'s accessibility schema; and motion definitions that respect '
    'the user\'s prefers-reduced-motion setting. The code generator also produces a Storybook story file for each '
    'component, documenting all its variants, states, and responsive behaviors.'
))

story.append(h2('5.4 Optimization Pipeline'))
story.append(body(
    'After code generation, an optimization pipeline runs to reduce bundle size and improve runtime performance. '
    'This includes dead code elimination (removing unused styles, utilities, and components), tree-shaking '
    '(importing only the specific functions needed from the Ferrum runtime), CSS compression (merging duplicate '
    'rules, shortening values, eliminating redundant declarations), and token inlining (replacing token references '
    'with their resolved values in production builds while keeping them as variables in development builds). The '
    'pipeline is configurable: users can choose between a development mode (readable code, source maps, token '
    'variables preserved) and a production mode (optimized, compressed, tokens inlined).'
))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 6: AI INTEGRATION STRATEGY
# ═══════════════════════════════════════════════════════════════
story.append(h1('6. AI Integration Strategy'))

story.append(h2('6.1 Ferrum AI Designer'))
story.append(body(
    'The AI integration in Ferrum Studio is not a separate chatbot or a magic "generate" button. Instead, AI is '
    'woven into every step of the design process as an intelligent assistant that understands the Ferrum Graph and '
    'can suggest, generate, and modify design elements in place. The AI Designer is activated through a natural '
    'language prompt bar (similar to Figma\'s "Make Designs" but deeply integrated with the full component and motion '
    'system) or through contextual suggestions that appear when the system detects an opportunity to assist.'
))

story.append(h2('6.2 Prompt-to-Interface Pipeline'))
story.append(body(
    'When a user enters a prompt like "Create a healthcare analytics dashboard with patient metrics, alert cards, '
    'and smooth card transitions," the AI Designer follows a structured pipeline. First, the <b>intent parser</b> '
    'analyzes the prompt to extract the component types (dashboard layout, metric cards, alert cards), the visual '
    'style (healthcare implies clean, high-contrast, WCAG AA compliant), the motion requirements (smooth card '
    'transitions implies spring physics with staggered entrance), and the data requirements (patient metrics implies '
    'number displays, trend indicators, status badges). Second, the <b>layout generator</b> creates a responsive '
    'grid structure with appropriate containers. Third, the <b>component placer</b> instantiates the appropriate '
    'components from the library and configures their properties. Fourth, the <b>motion designer</b> adds entrance '
    'animations, hover states, and scroll-triggered behaviors. Fifth, the <b>token applicator</b> applies the '
    'healthcare theme (colors, typography, spacing) from the design token system. Sixth, the <b>accessibility '
    'auditor</b> verifies that all components meet WCAG AA standards and adds any missing ARIA attributes.'
))

story.append(h2('6.3 Multi-Modal Input Support'))
story.append(body(
    'The AI Designer supports four input modalities beyond text prompts. <b>Screenshot-to-UI</b> allows users to '
    'upload a screenshot of an existing interface, which the AI analyzes to extract layout structure, color scheme, '
    'typography, and component types, then recreates it as a fully editable Ferrum Studio project. <b>Figma-to-Ferrum</b> '
    'imports Figma files via the Figma API, converting frames to components, auto-layout to flex/grid, and Figma '
    'components to Ferrum component instances. <b>Design-system-to-app</b> takes a design token JSON file (or connects '
    'to a Figma Variables API) and generates a complete themed component library. <b>Sketch-to-code</b> accepts '
    'hand-drawn wireframes (processed through a vision model) and converts them into structured layouts.'
))

story.append(h2('6.4 AI Safety and Determinism'))
story.append(body(
    'AI-generated designs are always represented as Ferrum Graph nodes, meaning they are fully editable, versionable, '
    'and inspectable by the user. The AI never writes code directly; it produces graph modifications that are then '
    'compiled through the standard IR pipeline. This ensures that AI-generated output benefits from the same '
    'optimization, accessibility checking, and code quality standards as manually designed components. Users can '
    'accept, reject, or modify any AI suggestion before it is committed to the graph, and every AI action is '
    'recorded in the undo history for easy rollback.'
))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 7: ENGINEERING ROADMAP
# ═══════════════════════════════════════════════════════════════
story.append(h1('7. Engineering Roadmap'))

story.append(h2('7.1 Phase Overview'))
story.append(body(
    'The engineering roadmap is organized into four phases spanning approximately 24 months, from MVP to full platform. '
    'Each phase delivers a functional product that can be used independently, while building toward the complete '
    'vision of a universal interface authoring environment.'
))

t = make_table([
    ['Phase', 'Timeline', 'Focus', 'Key Deliverables'],
    ['MVP', 'Months 1-6', 'Core canvas + code gen', 'Drag-and-drop canvas, component library, React/Vue export, design tokens'],
    ['Phase 2', 'Months 7-12', 'Motion + collaboration', 'Timeline editor, spring physics, real-time collab, multi-framework export'],
    ['Phase 3', 'Months 13-18', 'Intelligence + AI', 'Node graph, AI Designer, screenshot-to-UI, a11y auditor, plugin API'],
    ['Phase 4', 'Months 19-24', 'Platform + ecosystem', 'Plugin marketplace, cloud preview, Figma import, team workspace'],
], [AW * 0.10, AW * 0.14, AW * 0.24, AW * 0.52])
story.append(t)
story.append(caption('Table 7.1: Engineering roadmap phases'))

story.append(h2('7.2 Phase 1: MVP (Months 1-6)'))
story.append(body(
    'The MVP delivers a functional visual editor that can generate production-quality React and Vue components. '
    'The canvas supports drag-and-drop component placement, flexbox and grid layout, responsive breakpoint switching, '
    'and a property inspector. The component library includes 30 foundational components (Button, Input, Card, Dialog, '
    'Navigation, Typography, Image, etc.), each with full state definitions and accessibility attributes. The code '
    'generator produces clean, typed, framework-specific components with design token integration. The design token '
    'system supports semantic grouping and CSS custom property export. This phase establishes the core architecture: '
    'the Ferrum Graph data model, the IR compilation pipeline, and the plugin system foundation.'
))

story.append(h2('7.3 Phase 2: Motion and Collaboration (Months 7-12)'))
story.append(body(
    'Phase 2 adds the motion engine and real-time collaboration. The timeline editor supports keyframe animation '
    'with configurable easing curves. The spring physics engine provides natural-feeling motion for enter/exit '
    'animations, hover states, and layout transitions. Scroll-triggered animations and page transitions are added. '
    'Real-time collaboration uses CRDTs for conflict-free concurrent editing. Svelte and Angular code generators are '
    'added, bringing the total to four framework backends. The component library expands to 60+ components including '
    'data display components (Table, Chart, Stat, Badge) and feedback components (Toast, Progress, Skeleton, Alert).'
))

story.append(h2('7.4 Phase 3: Intelligence and AI (Months 13-18)'))
story.append(body(
    'Phase 3 introduces the node graph editor (Unreal Blueprint-style), the AI Designer, and advanced intelligence '
    'features. The node graph allows users to wire complex behaviors visually: data bindings, conditional rendering, '
    'dynamic styling, and multi-step interactions. The AI Designer supports text-to-interface generation with a '
    'structured pipeline (intent parsing, layout generation, component placement, motion design, token application, '
    'accessibility auditing). Screenshot-to-UI and Figma-to-Ferrum import are added. An automated accessibility '
    'auditor runs on every design change and reports violations with suggested fixes. The plugin API is finalized '
    'and documented, enabling third-party extensions.'
))

story.append(h2('7.5 Phase 4: Platform and Ecosystem (Months 19-24)'))
story.append(body(
    'The final phase transforms Ferrum Studio from a tool into a platform. A plugin marketplace allows the community '
    'to discover, install, and publish extensions. Cloud preview provides shareable URLs for design reviews. Team '
    'workspace features include project permissions, design review workflows, and version history with visual diffs. '
    'A CLI tool enables Ferrum Studio integration into CI/CD pipelines. Web Components and HTML/CSS export backends '
    'are added. Performance optimizations bring large-project handling (1000+ components) to sub-second canvas '
    'response times. The documentation and developer onboarding experience are polished for public launch.'
))

story.append(spacer(12))

# ═══════════════════════════════════════════════════════════════
# CHAPTER 8: MVP DEFINITION
# ═══════════════════════════════════════════════════════════════
story.append(h1('8. MVP Definition'))

story.append(h2('8.1 MVP Scope'))
story.append(body(
    'The MVP is the minimum viable product that proves the core value proposition: that a visual editor can produce '
    'production-quality, framework-specific components with design tokens, accessibility, and responsive behavior. '
    'The MVP does not include motion design, AI features, collaboration, or the node graph. These are deferred to '
    'later phases. The MVP focuses exclusively on getting the design-to-code pipeline right.'
))

story.append(h2('8.2 MVP Feature List'))

t = make_table([
    ['Feature', 'Description', 'Priority'],
    ['Design Canvas', 'Drag-and-drop component placement with flexbox/grid layout', 'P0'],
    ['Component Library', '30 foundational components with states and a11y attributes', 'P0'],
    ['Property Inspector', 'Layout, style, states, accessibility panels', 'P0'],
    ['Responsive Editing', 'Breakpoint switching with per-breakpoint overrides', 'P0'],
    ['Design Tokens', 'Semantic token system with CSS custom property export', 'P0'],
    ['React Code Gen', 'TypeScript React components with proper typing', 'P0'],
    ['Vue Code Gen', 'Vue 3 SFC with Composition API and TypeScript', 'P0'],
    ['Project Management', 'Create, open, save, and export Ferrum projects', 'P1'],
    ['Undo/Redo', 'Full history with keyboard shortcuts', 'P1'],
    ['Component Variants', 'Define and use component variants (size, color, style)', 'P1'],
    ['Keyboard Shortcuts', 'Full keyboard navigation and shortcut system', 'P1'],
    ['Dark Mode', 'System-aware dark/light theme for the editor UI', 'P2'],
], [AW * 0.20, AW * 0.58, AW * 0.22])
story.append(t)
story.append(caption('Table 8.1: MVP feature list with priorities'))

story.append(h2('8.3 MVP Success Metrics'))
story.append(body(
    'The MVP is considered successful when it meets the following quantitative criteria. A designer with no coding '
    'experience should be able to create a responsive landing page with a navigation bar, hero section, feature '
    'grid, and footer in under 30 minutes. The generated React code should pass ESLint with zero errors and zero '
    'warnings. The generated components should achieve a Lighthouse accessibility score of 95 or above. The canvas '
    'should maintain 60fps during interactions with up to 200 visible components. The code generation pipeline should '
    'complete in under 2 seconds for a project with 50 components.'
))

story.append(h2('8.4 MVP Technical Requirements'))
story.append(bullet('<b>Runtime:</b> Electron 30+ (or Tauri 2.0) for cross-platform desktop support (macOS, Windows, Linux).'))
story.append(bullet('<b>Bundle size:</b> Application download under 150MB. Generated component runtime under 20KB gzipped.'))
story.append(bullet('<b>Performance:</b> Canvas rendering at 60fps with 200 components. Code generation under 2 seconds for 50-component projects.'))
story.append(bullet('<b>Compatibility:</b> Generated React code compatible with React 18+. Generated Vue code compatible with Vue 3.4+.'))
story.append(bullet('<b>Accessibility:</b> All generated components pass WCAG 2.1 AA. Keyboard navigation works in both editor and output.'))
story.append(bullet('<b>File format:</b> .ferrum files under 5MB for a 50-component project. Git-diffable (line-level changes).'))

story.append(h2('8.5 Out of Scope for MVP'))
story.append(body(
    'The following features are explicitly deferred to post-MVP phases to maintain focus on the core value proposition. '
    'Motion design (timeline editor, spring physics, scroll animations) is Phase 2. Real-time collaboration (multiplayer '
    'editing, presence, comments) is Phase 2. AI features (prompt-to-interface, screenshot-to-UI, Figma import) is '
    'Phase 3. The node graph editor is Phase 3. Plugin marketplace and third-party extensions are Phase 4. Cloud '
    'hosting, shareable previews, and CI/CD integration are Phase 4. Svelte, Angular, and Web Components code '
    'generators are Phase 2-4. These exclusions ensure the MVP team can focus on building a rock-solid design-to-code '
    'pipeline before adding complexity.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BUILD
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT = '/home/z/my-project/download/Ferrum_Studio_Architecture_Specification.pdf'
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

doc = TocDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN + 20, bottomMargin=MARGIN + 10,
    title='Ferrum Studio Architecture Specification',
    author='Ferrum Engine Architecture Team',
    subject='Product Architecture for Ferrum Studio Visual Development Environment',
)

doc.multiBuild(story, onLaterPages=page_template, onFirstPage=page_template)
print(f'Body PDF generated: {OUTPUT}')