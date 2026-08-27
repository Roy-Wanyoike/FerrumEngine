#!/usr/bin/env python3
"""
Ferrum Brand Architecture — Body PDF (ReportLab, dark mode)
Generates the 10-chapter brand narrative document body (no cover).
"""

import os, sys, platform

# ─── Paths ───────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'download')
os.makedirs(OUTPUT_DIR, exist_ok=True)
OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'ferrum_brand_architecture_body.pdf')

# ─── Font Registration ───────────────────────────────────────────────────────
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

_IS_MAC = platform.system() == 'Darwin'
FONT_DIR = os.path.expanduser('~/.openclaw/workspace/fonts') if _IS_MAC else '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('FreeSerif',
    normal='FreeSerif', bold='FreeSerif-Bold',
    italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ─── Palette (cascade, dark mode) ────────────────────────────────────────────
from reportlab.lib import colors

PAGE_BG       = colors.HexColor('#10100e')
SECTION_BG    = colors.HexColor('#1d1c1a')
CARD_BG       = colors.HexColor('#2c2a24')
TABLE_STRIPE  = colors.HexColor('#1f1e19')
HEADER_FILL   = colors.HexColor('#524a31')
COVER_BLOCK   = colors.HexColor('#322e20')
BORDER        = colors.HexColor('#59513b')
ICON          = colors.HexColor('#b6a266')
ACCENT        = colors.HexColor('#d9c17a')
ACCENT_2      = colors.HexColor('#58adc9')
TEXT_PRIMARY   = colors.HexColor('#ecebea')
TEXT_MUTED     = colors.HexColor('#8d8b84')
SEM_SUCCESS   = colors.HexColor('#77b18b')
SEM_WARNING   = colors.HexColor('#b0996a')
SEM_ERROR     = colors.HexColor('#c0625a')
SEM_INFO      = colors.HexColor('#7994af')

# ─── Document Setup ──────────────────────────────────────────────────────────
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    KeepTogether, CondPageBreak, Table, TableStyle, PageBreak
)

W, H = A4[0], A4[1]
LEFT_M = 1.1 * inch
RIGHT_M = 1.1 * inch
TOP_M = 1.0 * inch
BOT_M = 1.0 * inch
AVAIL_W = W - LEFT_M - RIGHT_M

# ─── Styles ──────────────────────────────────────────────────────────────────
s_h1 = ParagraphStyle('H1', fontName='FreeSerif-Bold', fontSize=28, leading=34,
    textColor=ACCENT, spaceBefore=24, spaceAfter=12, alignment=TA_LEFT)
s_h2 = ParagraphStyle('H2', fontName='FreeSerif-Bold', fontSize=16, leading=22,
    textColor=TEXT_PRIMARY, spaceBefore=18, spaceAfter=8, alignment=TA_LEFT)
s_h3 = ParagraphStyle('H3', fontName='FreeSerif-Bold', fontSize=13, leading=18,
    textColor=ICON, spaceBefore=14, spaceAfter=6, alignment=TA_LEFT)
s_body = ParagraphStyle('Body', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceAfter=8, alignment=TA_JUSTIFY)
s_body_left = ParagraphStyle('BodyLeft', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceAfter=8, alignment=TA_LEFT)
s_indent = ParagraphStyle('Indent', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceAfter=8, alignment=TA_JUSTIFY, leftIndent=18)
s_quote = ParagraphStyle('Quote', fontName='FreeSerif-Italic', fontSize=13, leading=20,
    textColor=ACCENT, spaceBefore=6, spaceAfter=6, alignment=TA_LEFT)
s_quote_attr = ParagraphStyle('QuoteAttr', fontName='FreeSerif', fontSize=9, leading=13,
    textColor=TEXT_MUTED, spaceAfter=6, alignment=TA_LEFT)
s_kicker = ParagraphStyle('Kicker', fontName='FreeSerif', fontSize=9, leading=12,
    textColor=TEXT_MUTED, spaceBefore=0, spaceAfter=4, alignment=TA_LEFT,
    tracking=2)  # uppercase effect via small caps
s_muted = ParagraphStyle('Muted', fontName='FreeSerif', fontSize=9.5, leading=14,
    textColor=TEXT_MUTED, spaceAfter=6, alignment=TA_LEFT)
s_bullet = ParagraphStyle('Bullet', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceAfter=4, alignment=TA_LEFT,
    leftIndent=24, firstLineIndent=-12, bulletIndent=12)
s_num = ParagraphStyle('Numbered', fontName='FreeSerif', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceAfter=4, alignment=TA_LEFT,
    leftIndent=24, firstLineIndent=-18)
s_table_header = ParagraphStyle('TH', fontName='FreeSerif-Bold', fontSize=10,
    leading=14, textColor=colors.white, alignment=TA_CENTER)
s_table_cell = ParagraphStyle('TC', fontName='FreeSerif', fontSize=10,
    leading=14, textColor=TEXT_PRIMARY, alignment=TA_LEFT)
s_table_cell_c = ParagraphStyle('TCC', fontName='FreeSerif', fontSize=10,
    leading=14, textColor=TEXT_PRIMARY, alignment=TA_CENTER)

# ─── Helpers ─────────────────────────────────────────────────────────────────
def h1(text):
    return Paragraph(f'<b>{text}</b>', s_h1)

def h2(text):
    return Paragraph(f'<b>{text}</b>', s_h2)

def h3(text):
    return Paragraph(f'<b>{text}</b>', s_h3)

def body(text):
    return Paragraph(text, s_body)

def body_l(text):
    return Paragraph(text, s_body_left)

def muted(text):
    return Paragraph(text, s_muted)

def kicker(text):
    return Paragraph(text.upper(), s_kicker)

def bullet(text):
    return Paragraph(f'<bullet>•</bullet> {text}', s_bullet)

def numbered(n, text):
    return Paragraph(f'<b>{n}.</b>  {text}', s_num)

def divider():
    return HRFlowable(width='100%', thickness=0.5, color=BORDER,
        spaceBefore=18, spaceAfter=18)

def gold_line():
    return HRFlowable(width='30%', thickness=2, color=ACCENT,
        spaceBefore=6, spaceAfter=12, hAlign='LEFT')

def pull_quote(text, attribution=''):
    """Gold left border + dark card bg pull quote."""
    inner = Paragraph(text, s_quote)
    parts = [inner]
    if attribution:
        parts.append(Spacer(1, 4))
        parts.append(Paragraph(attribution, s_quote_attr))
    inner_table = Table([[p] for p in parts], colWidths=[AVAIL_W - 40])
    inner_table.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    wrapper = Table([[inner_table]], colWidths=[AVAIL_W - 20])
    wrapper.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('LEFTPADDING', (0, 0), (-1, -1), 16),
        ('RIGHTPADDING', (0, 0), (-1, -1), 16),
        ('TOPPADDING', (0, 0), (-1, -1), 14),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 14),
        ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT),
    ]))
    return wrapper

def spacer(h=12):
    return Spacer(1, h)


# ═══════════════════════════════════════════════════════════════════════════════
# PAGE BACKGROUND CALLBACK
# ═══════════════════════════════════════════════════════════════════════════════
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAGE_BG)
    canvas.rect(0, 0, W, H, fill=True, stroke=False)
    # Footer line
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.4)
    canvas.line(LEFT_M, BOT_M - 14, W - RIGHT_M, BOT_M - 14)
    # Footer text
    canvas.setFillColor(TEXT_MUTED)
    canvas.setFont('FreeSerif', 8)
    canvas.drawString(LEFT_M, BOT_M - 26, 'Ferrum Brand Architecture  |  Confidential')
    canvas.drawRightString(W - RIGHT_M, BOT_M - 26, str(doc.page))
    canvas.restoreState()


# ═══════════════════════════════════════════════════════════════════════════════
# BUILD STORY
# ═══════════════════════════════════════════════════════════════════════════════
story = []

# ─── CHAPTER 1: POSITIONING ──────────────────────────────────────────────────
story.append(kicker('Chapter 1'))
story.append(h1('Positioning'))
story.append(gold_line())

story.append(pull_quote(
    'Ferrum is the rendering infrastructure for the AI-native web.'
))
story.append(spacer(12))

story.append(body(
    'This is not a tagline. It is a category claim. Ferrum does not compete with CSS libraries, '
    'animation frameworks, or design systems. It operates in a category that did not previously exist: '
    'the universal rendering infrastructure layer that sits between developer intent and browser output. '
    'Just as Stripe did not set out to build a better payment API but rather to become the financial '
    'infrastructure of the internet, and just as Cloudflare did not set out to build a better CDN but '
    'rather to become the network infrastructure that every application runs through, Ferrum does not '
    'set out to build a better CSS framework. It sets out to become the rendering layer that every '
    'intelligent interface depends on.'
))
story.append(body(
    'The word "infrastructure" is deliberate. Infrastructure is invisible when it works and catastrophic '
    'when it fails. It is the thing you build on top of, not the thing you think about. When a developer '
    'writes <font name="DejaVuSans">rc-float</font>, they are not thinking about GPU layer promotion, '
    'compositing order, or paint optimization. They are describing what they want. Ferrum handles the '
    'rest. This is the same relationship a developer has with Stripe: they call a single API to process '
    'a payment, and Stripe handles PCI compliance, fraud detection, and bank reconciliation across 195 '
    'countries. The complexity is absorbed by the infrastructure so the developer can focus on their product.'
))
story.append(body(
    'The phrase "AI-native web" is equally deliberate. It does not mean "a web that uses AI." It means '
    'a web whose rendering layer was architected, from its first line of code, for a world where interfaces '
    'are described in natural language and translated into pixels by intelligent systems. Current rendering '
    'tools were designed for humans writing imperative code. Ferrum was designed for intent, whether that '
    'intent comes from a developer typing a class name or from an AI generating one. This architectural '
    'difference, not any individual feature, is what makes Ferrum a new category of software.'
))

story.append(divider())

# ─── CHAPTER 2: VISION ───────────────────────────────────────────────────────
story.append(kicker('Chapter 2'))
story.append(h1('Vision'))
story.append(gold_line())

story.append(pull_quote(
    'A world where every interface is intelligent by default '
    'and the distance between imagination and shipment is zero.'
))
story.append(spacer(12))

story.append(body(
    'Imagine a web where interfaces breathe. A dashboard does not simply display numbers; it counts '
    'up to them, communicating progress and building anticipation. A sidebar does not simply appear; '
    'it slides with weight, communicating hierarchy and spatial relationship. A button does not simply '
    'change color on hover; it responds with physicality, communicating acknowledgment and state. These '
    'are not embellishments. They are information. Motion is a communication channel, and Ferrum\'s '
    'vision is a world where every interface uses that channel fluently, by default, without the '
    'developer needing to become a motion designer to achieve it.'
))
story.append(body(
    'Now imagine a web where AI describes interfaces the way a designer thinks about them: in terms of '
    'intent, not implementation. "A card that floats on hover." "A button that feels heavy when '
    'pressed." "A loading state that shimmers with patience." The rendering layer understands these '
    'descriptions natively and translates them into GPU-accelerated, accessible, performant pixels. '
    'No 50-line animation configurations. No framework-specific boilerplate. No glue code between five '
    'different libraries. The AI generates a single class name, and the rendering infrastructure handles '
    'the rest. This is not a future we are waiting for. It is a future Ferrum\'s architecture was built to serve.'
))
story.append(body(
    'Finally, imagine a web where performance and accessibility are architectural guarantees, not '
    'aspirational goals. Where every animation hits sixty frames per second because the rendering layer '
    'constrains effects to GPU-composited properties. Where every interface is accessible because the '
    'rendering layer treats accessibility as a design constraint, not a post-launch checklist. Where '
    'every visual effect degrades gracefully on low-powered devices because the rendering layer was '
    'designed with progressive enhancement as a core principle. This is the world Ferrum is building toward. '
    'It is a world where the quality of an interface is determined by the quality of the developer\'s '
    'intent, not by the depth of their performance optimization knowledge.'
))

story.append(divider())

# ─── CHAPTER 3: MISSION ──────────────────────────────────────────────────────
story.append(kicker('Chapter 3'))
story.append(h1('Mission'))
story.append(gold_line())

story.append(body(
    'To build the universal rendering layer that makes intelligent interface development fast, '
    'performant, and accessible to every developer, regardless of framework, team size, or AI workflow.'
))
story.append(spacer(8))

story.append(body(
    'The mission is the bridge between the present and the vision. It defines what Ferrum does today, '
    'with the resources and technology available now, to move the industry toward the world described '
    'in the vision. Every product decision, every architectural choice, and every line of code in Ferrum '
    'should be traceable back to this mission statement. If a feature does not make interface development '
    'faster, more performant, or more accessible, it does not belong in the platform.'
))
story.append(body(
    'The phrase "regardless of framework, team size, or AI workflow" carries significant weight. It '
    'means Ferrum\'s rendering layer must work identically whether a developer is building a React '
    'application for a Fortune 500 company, a Vue prototype for a startup, or an AI-generated interface '
    'from a natural language prompt. The CSS-first architecture ensures framework independence. The modular '
    'subsystem design ensures that a solo developer can use a single package while an enterprise team '
    'leverages the full platform. The intent-to-render paradigm ensures that both human and AI authors '
    'produce the same high-quality output. This is not aspirational. The 866 production-ready effects, '
    '8 framework adapters, and zero-dependency runtime are evidence that this mission is already in progress.'
))
story.append(body(
    'The mission also implies a commitment to simplicity. "Fast" does not mean "fast once you understand '
    'the framework." It means fast from the first line of code. A developer should be able to add Ferrum '
    'to their project, apply a single class, and see a polished, performant effect immediately. The '
    'learning curve should be measured in minutes, not days. The documentation should explain not just '
    'what each effect does, but why it exists and when to use it. The developer experience is not a '
    'feature of Ferrum. It is the product.'
))

story.append(divider())

# ─── CHAPTER 4: PRODUCT PILLARS ──────────────────────────────────────────────
story.append(kicker('Chapter 4'))
story.append(h1('Product Pillars'))
story.append(gold_line())

story.append(body(
    'Product pillars are the strategic themes that define what Ferrum is and what it will never '
    'compromise on. They are not features. They are architectural commitments that every subsystem, '
    'every package, and every release must honor. If a decision conflicts with a pillar, the pillar wins.'
))
story.append(spacer(8))

# Pillar 1
story.append(h2('1. Intent-First Rendering'))
story.append(body(
    'The rendering layer should understand what you want, not how you want it. This is the most '
    'fundamental architectural decision in Ferrum, and it permeates every subsystem. When a developer '
    'applies <font name="DejaVuSans">rc-float</font> to an element, they are declaring an intent: '
    '"this element should feel like it is floating." They are not specifying transform values, keyframe '
    'timing functions, or will-change hints. The runtime determines the optimal way to achieve that '
    'intent given the current browser, device capabilities, and performance profile. This separation of '
    'intent from implementation is what makes Ferrum\'s effects work across frameworks, devices, and '
    'even AI generation contexts. The same intent declaration produces appropriate output whether rendered '
    'in Chrome on a desktop or in Safari on a three-year-old phone.'
))
story.append(body(
    'This pillar also enables one of Ferrum\'s most powerful capabilities: AI compatibility. When an AI '
    'generates UI, it does not think in React hooks or Vue composables. It thinks in visual intent. '
    '"A card that floats on hover" or "a button that feels heavy when pressed." Ferrum\'s intent-first '
    'architecture maps directly to this mental model. AI can generate <font name="DejaVuSans">rc-float'
    '</font>. It cannot generate a 50-line Framer Motion configuration with spring physics, gesture '
    'detection, and reduced-motion media query handling. The simpler the intent declaration, the more '
    'reliable the AI output. This is not a coincidence. It is an architectural principle.'
))

# Pillar 2
story.append(h2('2. Zero-Compromise Performance'))
story.append(body(
    'Performance is not a feature of Ferrum. It is the default state. Every animation targets sixty '
    'frames per second because the rendering layer constrains all effects to GPU-composited properties, '
    'specifically transform and opacity. These are the only two properties that can be animated without '
    'triggering layout or paint, which means they are the only two properties that can be animated '
    'reliably at sixty frames per second on every device, from flagship smartphones to budget tablets. '
    'Every visual effect that cannot be achieved with transform and opacity alone is handled by the '
    'Paint API, which offloads rendering to the GPU without blocking the main thread. This architectural '
    'constraint means that performance is not dependent on the developer\'s knowledge of browser '
    'rendering pipelines. It is guaranteed by the system.'
))
story.append(body(
    'The compiler pipeline reinforces this pillar by eliminating unused CSS through a nine-pass '
    'optimization process. Dead code elimination, token inlining, cascade layer merging, and hex '
    'compression ensure that only the CSS a project actually uses ships to production. This is not a '
    'post-build optimization step. It is an integral part of the development workflow, and it means '
    'that Ferrum projects do not accumulate CSS bloat over time. A project that uses ten effects ships '
    'the CSS for ten effects, not the CSS for eight hundred and sixty-six. This is how infrastructure '
    'should work: the complexity of the full system is available, but the cost is proportional to usage.'
))

# Pillar 3
story.append(h2('3. Universal Compatibility'))
story.append(body(
    'One platform. Every framework. Every browser. Ferrum\'s CSS-first architecture is the foundation '
    'of this pillar. Because Ferrum\'s effects are, at their core, CSS classes and custom properties, '
    'they work everywhere CSS works. A React developer, a Vue developer, a Svelte developer, and a '
    'developer writing plain HTML all access the same effects through the same class names. The framework '
    'adapters do not reimplement effects for each framework. They provide first-class integration, '
    'TypeScript types, and framework-specific APIs, but the rendering layer itself is framework-agnostic. '
    'This means that a design system built on Ferrum can be shared across frameworks within the same '
    'organization without any divergence in visual behavior.'
))
story.append(body(
    'Universal compatibility also means progressive enhancement. Ferrum\'s effects work without '
    'JavaScript. The CSS layer provides the visual output, and JavaScript enhances it with interaction, '
    'gesture detection, and dynamic behavior. If JavaScript fails to load, the interface still looks '
    'correct. If a browser does not support the Paint API, the effect degrades gracefully to a CSS '
    'fallback. This is not an afterthought. It is a design principle embedded in the rendering '
    'architecture from the ground up. The result is interfaces that are resilient by default, not '
    'through manual error handling and fallback code written by the developer.'
))

# Pillar 4
story.append(h2('4. AI-Native Architecture'))
story.append(body(
    'The rendering layer is designed for the AI era. This is not a marketing claim about future plans. '
    'It is a description of the current architecture. Ferrum\'s intent-first design means that every '
    'effect is a declarative class that describes what should happen, and the runtime determines how to '
    'make it happen efficiently. This is precisely the interface that AI systems need. AI excels at '
    'generating declarative descriptions and struggles with imperative configuration. Ferrum\'s '
    'architecture aligns with AI\'s strengths. The Ferrum AI subsystem takes this further by providing '
    'an intelligence layer that understands developer intent and translates it into Ferrum configurations, '
    'producing standard classes and tokens that any developer can read, understand, and modify. This is '
    'fundamentally different from AI that generates opaque, framework-specific code.'
))

# Pillar 5
story.append(h2('5. Open by Default'))
story.append(body(
    'MIT licensed. Open architecture. Plugin SDK. Every subsystem is independently useful. No vendor '
    'lock-in. No paywalled features. Open by default is not a business strategy. It is a belief about '
    'how infrastructure should be built. The most enduring platforms in technology, from Linux to '
    'Chromium to Kubernetes, are open source because infrastructure that depends on a single company\'s '
    'incentives will eventually be outpaced by infrastructure that depends on a community\'s collective '
    'intelligence. Ferrum\'s open architecture means that anyone can extend the platform with a plugin, '
    'contribute a new effect, or adapt a subsystem for their specific use case. The Plugin SDK is not '
    'a premium feature. It is the mechanism by which the platform grows. The ten existing subsystems '
    'are the foundation, but the long-term platform will include contributions from hundreds of '
    'developers who saw a gap and filled it, following the same architectural principles that govern '
    'the core.'
))

story.append(divider())

# ─── CHAPTER 5: CORE VALUES ──────────────────────────────────────────────────
story.append(kicker('Chapter 5'))
story.append(h1('Core Values'))
story.append(gold_line())

story.append(body(
    'Core values are the principles that guide every decision at Ferrum, from API design to bug '
    'prioritization to community governance. They are not aspirational. They are descriptive of how '
    'the project already operates, and they are non-negotiable.'
))
story.append(spacer(8))

# Value 1
story.append(h2('Craft Over Convenience'))
story.append(body(
    'We do not ship "good enough." Every effect, every animation curve, every API surface, and every '
    'line of documentation is crafted for quality. The bar for inclusion in the platform is the same '
    'bar we would apply to code we write for our own projects. This means that some effects take longer '
    'to ship because they require more iteration. It means that some APIs are redesigned multiple times '
    'before stabilization because the first version, while functional, did not meet the standard. It '
    'means that the documentation must explain not just what a feature does, but why it exists and when '
    'to use it. Craft is visible in the details: the way a spring animation decays feels natural '
    'because the physics model was tuned against real-world motion, not because a cubic-bezier value was '
    'chosen by trial and error. Convenience ships fast. Craft ships right.'
))

# Value 2
story.append(h2('Substance Over Hype'))
story.append(body(
    'We let the work speak. Every claim on the Ferrum website is backed by working code that a '
    'developer can run in their browser within thirty seconds of reading the documentation. Every '
    'benchmark is reproducible. Every architectural diagram represents real subsystem boundaries, not '
    'marketing abstractions. The eight hundred and sixty-six effects are not a marketing number. They '
    'are production-ready CSS classes that can be previewed in the playground and applied to a project '
    'with a single import. The ten subsystems are not a roadmap aspiration. Five are stable and shipping, '
    'four are in beta, and one is in research. The status of each is transparent and public. In an '
    'industry where marketing often outpaces reality, Ferrum\'s policy is simple: if it does not exist '
    'in the codebase, it does not exist in the marketing. Period.'
))

# Value 3
story.append(h2('Developers First, Always'))
story.append(body(
    'Ferrum exists because a developer had a problem. Every design decision starts with the developer '
    'experience, and if a decision makes the developer experience worse, it does not ship. This value '
    'manifests in concrete ways. The API is designed so that the simplest possible usage, applying a '
    'single CSS class, produces a polished result. The documentation is structured so that a developer '
    'can find what they need within seconds, not minutes. The type definitions are comprehensive so '
    'that IDE autocompletion catches errors before runtime. The error messages are specific so that '
    'debugging takes minutes, not hours. The playground provides a zero-setup environment where developers '
    'can experiment without installing anything. Every one of these decisions was made because it '
    'improves the life of a developer using Ferrum, not because it serves the platform\'s business goals.'
))

# Value 4
story.append(h2('Platform Thinking'))
story.append(body(
    'We do not build features. We build subsystems that compose. This is a critical distinction. A '
    'feature is a single capability: a button style, an animation preset, a color utility. A subsystem '
    'is a coherent domain of functionality with its own internal architecture, its own extension points, '
    'and its own compositional surface. Ferrum Motion is not a collection of animation presets. It is an '
    'eighteen-module subsystem covering physics simulation, timeline composition, gesture-driven animation, '
    'and adaptive motion. Ferrum Tokens is not a color palette. It is a design decision serialization '
    'system that enables theming, dark mode, brand customization, and design governance without touching '
    'component code. The subsystem model means that each part of the platform is independently useful, '
    'but the whole is exponentially more powerful than the sum of its parts.'
))

# Value 5
story.append(h2('Accessibility as Architecture'))
story.append(body(
    'Accessibility is not a checklist. It is not a post-launch audit. It is not a compliance '
    'requirement to be met with minimum effort. In Ferrum, accessibility is a design constraint built '
    'into the rendering layer. Every effect respects the <font name="DejaVuSans">prefers-reduced-motion'
    '</font> media query because the runtime checks it before applying any animation. Every component '
    'ships with correct ARIA attributes because the component system requires them. Every color contrast '
    'ratio meets WCAG guidelines because the token system enforces them. The principle is simple and '
    'absolute: if a feature cannot be made accessible, it does not ship. This is not a burden. It is '
    'a design discipline that produces better interfaces for everyone, not just for users with '
    'disabilities. An interface that is accessible is an interface that is well-structured, well-labeled, '
    'and well-behaved. These qualities benefit every user.'
))

story.append(divider())

# ─── CHAPTER 6: PRODUCT MANIFESTO ────────────────────────────────────────────
story.append(kicker('Chapter 6'))
story.append(h1('Product Manifesto'))
story.append(gold_line())

story.append(body(
    'This manifesto is a declaration of beliefs about the present and future of interface engineering. '
    'It is not a marketing document. It is the intellectual foundation on which every architectural '
    'decision in Ferrum rests. If you disagree with these beliefs, Ferrum is not the platform for you. '
    'If you agree, welcome.'
))
story.append(spacer(8))

story.append(h2('The Rendering Layer Is the Most Important Layer'))
story.append(body(
    'Every application has a rendering layer. It is the thing that turns code into pixels. It is '
    'where performance lives or dies. It is where accessibility succeeds or fails. It is where the user '
    'forms their first and most lasting impression of your product. And yet, for thirty years, the '
    'rendering layer has been treated as an afterthought. Frameworks optimize for developer ergonomics. '
    'Libraries optimize for feature count. Design systems optimize for visual consistency. Nobody '
    'optimizes for the rendering layer itself. Ferrum does. The rendering layer is not a feature of '
    'Ferrum. It is the product. Every other capability, from motion to tokens to AI integration, exists '
    'to make the rendering layer more powerful, more performant, and more intelligent.'
))

story.append(h2('The Fragmentation Tax Is Unsustainable'))
story.append(body(
    'A typical production frontend in 2025 depends on five to ten specialized tools. Tailwind CSS for '
    'styling. Framer Motion for animation. Radix UI for accessible components. Storybook for '
    'documentation. A design token system for theming. A CSS-in-JS solution for dynamic styles. An '
    'icon library. A testing framework. Each tool is excellent at its job, but together they form a '
    'patchwork with overlapping responsibilities, conflicting mental models, and version synchronization '
    'problems. The glue code between tools becomes the largest and most fragile part of the codebase. '
    'Teams spend thirty to forty percent of their engineering time on undifferentiated infrastructure '
    'that should not need to exist. This is not a theoretical problem. It is the daily reality of every '
    'frontend team building non-trivial applications. The fragmentation tax is real, measurable, and '
    'unsustainable. Ferrum absorbs this tax by providing a unified platform where the integration between '
    'subsystems is handled by the architecture, not by the developer.'
))

story.append(h2('AI Changes the Rendering Layer Fundamentally'))
story.append(body(
    'When AI generates a user interface, it does not think in React hooks or Vue composables. It thinks '
    'in visual intent. "A card that elevates on hover." "A button with a satisfying press animation." '
    '"A gradient background that shifts with the scroll position." These are descriptions of intent, and '
    'they map directly to Ferrum\'s declarative class system. AI can generate '
    '<font name="DejaVuSans">rc-float</font>. It cannot generate a fifty-line animation configuration '
    'that handles spring physics, gesture detection, interrupted animations, reduced-motion preferences, '
    'and GPU layer promotion. The gap between AI\'s natural output and current tooling\'s input format '
    'is the single largest bottleneck in AI-generated UI. Ferrum closes that gap by making the input '
    'format identical to the output format: a single class name that describes intent. This is not a '
    'feature we plan to add. It is the reason the architecture was designed this way from the beginning.'
))

story.append(h2('Performance by Architecture, Not by Discipline'))
story.append(body(
    'The prevailing approach to frontend performance is discipline-based. Developers are expected to '
    'memorize which CSS properties trigger layout, which animations cause jank, which images should be '
    'lazy-loaded, and which JavaScript should be code-split. Performance becomes a knowledge problem, '
    'and the result is that only the most experienced developers on a team can produce performant code. '
    'Ferrum inverts this model. Performance is an architectural guarantee. By constraining all effects '
    'to GPU-composited properties and offloading complex rendering to the Paint API, the system ensures '
    'that every animation, every transition, and every visual effect is performant by default. The '
    'developer does not need to know what a compositing layer is. They need to know that '
    '<font name="DejaVuSans">rc-float</font> makes an element float, and it will be fast on every '
    'device. This is how infrastructure should work: the expertise is embedded in the system, not '
    'required of the user.'
))

story.append(h2('The Future Is Platforms, Not Libraries'))
story.append(body(
    'The history of developer tools is a history of increasing abstraction. Assembly gave way to C. '
    'C gave way to higher-level languages. Languages gave way to frameworks. Frameworks gave way to '
    'platforms. Each transition absorbed complexity into a higher layer, freeing developers to focus on '
    'their product rather than their infrastructure. Chromium absorbed browser rendering complexity so '
    'that web developers could focus on content. Kubernetes absorbed container orchestration complexity '
    'so that platform engineers could focus on services. Stripe absorbed payment processing complexity '
    'so that application developers could focus on their business logic. The frontend is the next '
    'domain ready for this transition. The rendering layer, with its intersection of performance, '
    'accessibility, motion, visual effects, and AI integration, is too complex for individual libraries '
    'to handle. It requires a platform. Ferrum is that platform.'
))

story.append(divider())

# ─── CHAPTER 7: WHY FERRUM EXISTS ────────────────────────────────────────────
story.append(kicker('Chapter 7'))
story.append(h1('Why Ferrum Exists'))
story.append(gold_line())

story.append(body(
    'Ferrum did not start with a feature list. It started with a question: why, in 2025, do frontend '
    'developers still spend weeks building infrastructure that should already exist? The question was '
    'not hypothetical. It came from the direct experience of building production applications where the '
    'most creative and impactful part of the work, designing interfaces that feel alive, was constantly '
    'delayed by the least creative part: wiring together animation libraries, style systems, component '
    'libraries, and documentation tools into a coherent whole.'
))
story.append(body(
    'The specific moment of frustration was familiar to any frontend developer who has built a non-trivial '
    'application. A designer hands off a beautiful prototype with smooth transitions, thoughtful micro-'
    'interactions, and a cohesive visual language. The developer begins implementation and immediately '
    'discovers that the animation library does not support the specific easing curve. The style system '
    'does not support the specific color token structure. The component library does not match the '
    'prototype\'s interaction patterns. The documentation tool does not support interactive examples. '
    'Each gap requires a custom solution, and each custom solution adds to the maintenance burden. What '
    'was supposed to be two weeks of implementation becomes six weeks of infrastructure work followed '
    'by a compromise: the shipped interface looks ninety percent like the prototype, but the last ten '
    'percent, the part that makes it feel premium, was cut because the tools could not support it.'
))
story.append(body(
    'Ferrum exists to eliminate that gap between what a designer envisions and what a developer ships, '
    'not by building a better prototyping tool or a better animation library, but by building the '
    'rendering infrastructure that makes the entire pipeline coherent. When the rendering layer, the '
    'motion system, the visual effects engine, the component library, the design token system, and the '
    'documentation platform all share the same architecture, the same design principles, and the same '
    'intent-based API, the gaps disappear. The designer\'s vision and the developer\'s implementation '
    'converge because they are both expressed in the same language: the language of intent that Ferrum '
    'speaks natively.'
))

story.append(divider())

# ─── CHAPTER 8: WHY EXISTING TOOLS ARE NO LONGER ENOUGH ──────────────────────
story.append(kicker('Chapter 8'))
story.append(h1('Why Existing Frontend Tools<br/>Are No Longer Enough'))
story.append(gold_line())

story.append(body(
    'This is not a critique of any specific tool or company. The tools in the current frontend ecosystem '
    'are, individually, excellent. The problem is not quality. The problem is structure. The current '
    'ecosystem was designed for a web that no longer exists, and the structural assumptions embedded in '
    'these tools are now liabilities.'
))
story.append(spacer(8))

story.append(h2('The Integration Nightmare'))
story.append(body(
    'When a production team selects its frontend toolchain, it is typically choosing five to eight '
    'specialized tools, each optimized for a narrow domain: one for styling, one for animation, one for '
    'accessible components, one for design tokens, one for documentation, one for testing. Each tool has '
    'its own API design philosophy, its own configuration format, its own type system, and its own '
    'release cadence. The integration between these tools, the glue code that makes them work together, '
    'becomes the largest and most fragile part of the codebase. Version conflicts between the styling '
    'tool and the animation library are resolved through wrapper abstractions that add complexity. '
    'Design tokens defined in the token system must be manually synchronized with the component library '
    'and the animation presets. Documentation examples must be updated whenever any dependency changes. '
    'The maintenance burden of the integration layer often exceeds the maintenance burden of the actual '
    'product features. This is not a failure of any individual tool. It is a failure of the ecosystem '
    'structure.'
))

story.append(h2('Performance Is Optional, Not Architectural'))
story.append(body(
    'In the current ecosystem, performance is a property that developers must actively maintain. They '
    'must know which CSS properties trigger layout thrashing. They must manually add '
    '<font name="DejaVuSans">will-change</font> hints to elements that will be animated. They must '
    'audit their animation libraries for frames that exceed the sixteen-millisecond budget. They must '
    'profile their paint operations to ensure that blur effects are not killing mobile performance. This '
    'knowledge is specialized, and it is unevenly distributed across teams. The result is that '
    'performance quality varies wildly between projects, between teams, and even between pages within '
    'the same application. Performance should not require expertise. It should be an architectural '
    'guarantee provided by the rendering infrastructure, the same way that type safety is guaranteed '
    'by a type system. A developer should not need to understand GPU compositing to write a smooth '
    'animation, the same way they do not need to understand memory allocation to write a variable '
    'assignment in a high-level language.'
))

story.append(h2('No Shared Philosophy'))
story.append(body(
    'The tools in the current ecosystem were built by different teams, at different times, for different '
    'problems. They do not share a common design philosophy. Tailwind CSS believes in utility-first, '
    'single-responsibility classes. Framer Motion believes in declarative animation with imperative '
    'escape hatches. Radix UI believes in unstyled, accessible primitives. Each philosophy is internally '
    'consistent, but they were not designed to coexist. When a developer uses all three, they must '
    'mentally context-switch between three different paradigms, each with its own vocabulary, its own '
    'mental model, and its own set of tradeoffs. The cognitive overhead is significant, and it increases '
    'with every tool added to the stack. A unified platform with a single design philosophy eliminates '
    'this overhead entirely. The developer learns one paradigm, one vocabulary, and one mental model, '
    'and it applies consistently across every aspect of interface development.'
))

story.append(h2('The AI Generation Gap'))
story.append(body(
    'AI is changing how interfaces are created, and the current tooling was not designed for this '
    'reality. AI code assistants generate UI by producing framework-specific imperative code: React '
    'components with useState hooks, Framer Motion configurations with useAnimation controls, Tailwind '
    'classes with responsive prefixes. This output is complex, verbose, and fragile. A single change '
    'in requirements often requires regenerating hundreds of lines of interconnected code. The rendering '
    'layer needs to understand intent, not implementation. A CSS class like '
    '<font name="DejaVuSans">rc-glow</font> is a complete, self-contained intent declaration. An AI '
    'can generate it reliably because it is a single token with a clear semantic meaning. A Framer Motion '
    'configuration is a multi-line imperative program with state management, lifecycle hooks, and '
    'conditional logic. An AI can generate it, but the result is more likely to contain bugs, edge '
    'cases, and inconsistencies. The current tooling\'s imperative API surface is the single largest '
    'barrier to reliable AI-generated UI. Ferrum\'s declarative, intent-based API eliminates this barrier.'
))

story.append(divider())

# ─── CHAPTER 9: WHY FERRUM IS DIFFERENT ─────────────────────────────────────
story.append(kicker('Chapter 9'))
story.append(h1('Why Ferrum Is Different'))
story.append(gold_line())

story.append(body(
    'Ferrum is different not because of any single feature, but because of its architecture. Features '
    'can be copied. Architectures cannot. The decisions that make Ferrum different are structural, not '
    'superficial, and they compound over time to create a gap that feature-by-feature competition cannot close.'
))
story.append(spacer(8))

story.append(h2('Platform, Not Library'))
story.append(body(
    'A library solves one problem. A platform solves the ecosystem of problems around that problem. '
    'Framer Motion solves animation. Tailwind CSS solves styling. Radix UI solves accessible components. '
    'Each is excellent within its domain. Ferrum does not compete with any of them on their own terms. '
    'It competes by providing a unified platform where motion, styling, components, tokens, VFX, '
    'compilation, and AI integration are architecturally coherent. The ten subsystems are not ten '
    'libraries packaged together. They are ten subsystems designed to compose, with shared design '
    'principles, shared token systems, and shared rendering pipelines. The result is that the '
    'integration overhead, the thirty to forty percent infrastructure tax that teams pay today, '
    'drops to near zero. The platform handles the integration. The developer handles the product.'
))

story.append(h2('CSS-First with Progressive Enhancement'))
story.append(body(
    'Ferrum\'s rendering layer is CSS-first. This means that the visual output of every effect is '
    'produced by CSS, not by JavaScript. JavaScript enhances the experience with interaction, gesture '
    'detection, and dynamic behavior, but the base visual is pure CSS. This architectural decision has '
    'profound implications. It means that Ferrum\'s effects work without JavaScript, providing instant '
    'visual feedback even before the JavaScript bundle has loaded. It means that Ferrum\'s effects work '
    'in any rendering context that supports CSS: email clients, PDF generators, server-side rendering '
    'pipelines, and web views in native applications. It means that the performance characteristics are '
    'determined by the browser\'s CSS engine, which is one of the most optimized pieces of software '
    'in existence, rather than by a JavaScript animation loop running on the main thread.'
))

story.append(h2('The Subsystem Model'))
story.append(body(
    'Ferrum is structured as ten subsystems: Runtime, Motion, Physics, VFX, Components, Tokens, '
    'Compiler, AI, Studio, and Cloud. Each subsystem is independently useful. A developer who only needs '
    'design tokens can use Ferrum Tokens without touching any other subsystem. A developer who only needs '
    'motion can use Ferrum Motion in isolation. But when subsystems are used together, they are '
    'exponentially more powerful. Ferrum Motion can use Ferrum Physics for realistic spring dynamics. '
    'Ferrum Components can use Ferrum Tokens for automatic theming. Ferrum AI can use the entire platform '
    'as its output format, generating standard Ferrum classes and tokens rather than opaque framework code. '
    'This compositional power is the result of the shared architecture. It cannot be replicated by '
    'combining independent libraries, because independent libraries do not share a common token system, '
    'a common rendering pipeline, or a common design philosophy.'
))

story.append(h2('AI-Native from Day One'))
story.append(body(
    'Most existing tools are adding AI capabilities as an afterthought. Ferrum was designed for the AI '
    'era from its first line of code. The intent-first architecture, the declarative class system, and '
    'the token-based configuration format were all chosen because they align with how AI systems generate '
    'and manipulate UI. The Ferrum AI subsystem is not a chatbot bolted onto a CSS framework. It is an '
    'intelligence layer that understands developer intent and translates it into Ferrum configurations, '
    'producing output that is human-readable, human-modifiable, and human-deployable. This is a '
    'fundamentally different approach to AI integration, and it is only possible because the rendering '
    'layer was designed with this use case in mind from the beginning.'
))

story.append(divider())

# ─── CHAPTER 10: MESSAGING HIERARCHY ────────────────────────────────────────
story.append(kicker('Chapter 10'))
story.append(h1('Messaging Hierarchy'))
story.append(gold_line())

story.append(body(
    'The messaging hierarchy defines how Ferrum is communicated at different levels of depth, from a '
    'single sentence to a full architectural specification. Every piece of external communication, from '
    'a tweet to a documentation page to a conference talk, should operate at the appropriate tier. '
    'Going deeper than the audience needs creates confusion. Going shallower creates vagueness. The '
    'hierarchy exists to ensure precision at every level.'
))
story.append(spacer(8))

# Tier 1
story.append(h2('Tier 1: The Core Message'))
story.append(body(
    '<b>Audience:</b> Everyone. Developers, designers, executives, investors, and the broader tech community. '
    'This is what someone should know after encountering Ferrum for the first time, whether through a tweet, '
    'a conference talk, or a passing mention in a conversation.'
))
story.append(pull_quote(
    'Ferrum is the rendering infrastructure for the AI-native web.'
))
story.append(spacer(6))
story.append(body(
    'This single sentence accomplishes three things. First, it positions Ferrum in a category, '
    '"rendering infrastructure," that immediately distinguishes it from CSS libraries, animation frameworks, '
    'and design systems. Second, it identifies the scope, "the web," which signals that this is not a '
    'native mobile framework or a desktop application toolkit. Third, it signals the timeline, "AI-native," '
    'which communicates that Ferrum is built for the future, not optimized for the past.'
))

# Tier 2
story.append(h2('Tier 2: The Value Proposition'))
story.append(body(
    '<b>Audience:</b> Developers and technical leaders who are interested enough to click through to the '
    'website or read a blog post. They want to understand what Ferrum does and why they should care, '
    'but they are not yet ready to evaluate specific features.'
))
story.append(body(
    'At this tier, the messaging expands to cover the five product pillars: intent-first rendering, '
    'zero-compromise performance, universal compatibility, AI-native architecture, and open by default. '
    'Each pillar is expressed as a benefit, not a feature. "Zero-compromise performance" communicates '
    'that the developer does not need to optimize animations manually. "Universal compatibility" '
    'communicates that the developer\'s existing framework choice is respected. "AI-native architecture" '
    'communicates that Ferrum will not become obsolete as AI tooling improves. The messaging at this tier '
    'answers the question, "Why should I spend time evaluating this?"'
))

# Tier 3
story.append(h2('Tier 3: The Technical Story'))
story.append(body(
    '<b>Audience:</b> Developers who are actively evaluating Ferrum for adoption. They need to understand '
    'the architecture, the subsystem model, and how Ferrum integrates with their existing workflow. They '
    'are reading the documentation, trying the playground, and considering the migration path.'
))
story.append(body(
    'At this tier, the messaging introduces the ten subsystems, explains the intent-to-render pipeline, '
    'and provides concrete integration guides for each supported framework. The eight hundred and sixty-six '
    'effects become relevant at this tier, not as a marketing number, but as a searchable, filterable, '
    'previewable catalog. The eight framework adapters become relevant as a specific answer to "will this '
    'work with my stack?" The compiler pipeline becomes relevant as a specific answer to "will this '
    'bloat my bundle?" The messaging at this tier answers the question, "How do I actually use this?"'
))

# Tier 4
story.append(h2('Tier 4: The Architectural Foundation'))
story.append(body(
    '<b>Audience:</b> Contributors, platform engineers, and technical architects who need to understand '
    'Ferrum deeply enough to extend it, integrate it into complex systems, or make architectural decisions '
    'based on it. They are reading the design documents, studying the compiler pipeline, and evaluating '
    'the plugin SDK.'
))
story.append(body(
    'At this tier, the messaging provides full access to the ten subsystem design documents, each of '
    'which describes the subsystem\'s internal architecture, data flow, extension points, and design '
    'rationale. The nine-pass compiler pipeline is documented in detail. The plugin SDK is documented '
    'with examples. The runtime\'s effect registration, token resolution, and plugin lifecycle are fully '
    'specified. This is not marketing. It is engineering documentation for engineers who need to make '
    'informed decisions about their infrastructure.'
))

# Messaging vocabulary
story.append(h2('Approved Vocabulary'))
story.append(body(
    'The words we use shape how people perceive Ferrum. The following vocabulary has been carefully chosen '
    'to reinforce the platform positioning and should be used consistently across all communication.'
))

# Vocabulary table
vocab_data = [
    [Paragraph('<b>Term</b>', s_table_header),
     Paragraph('<b>Use When</b>', s_table_header),
     Paragraph('<b>Avoid Instead</b>', s_table_header)],
    [Paragraph('Rendering infrastructure', s_table_cell),
     Paragraph('Describing what Ferrum is', s_table_cell),
     Paragraph('CSS framework, animation library, design system', s_table_cell)],
    [Paragraph('Universal rendering layer', s_table_cell),
     Paragraph('Emphasizing framework independence', s_table_cell),
     Paragraph('Multi-framework library, cross-platform tool', s_table_cell)],
    [Paragraph('Intent-to-render', s_table_cell),
     Paragraph('Describing the architecture paradigm', s_table_cell),
     Paragraph('Declarative, utility-first, convention-over-configuration', s_table_cell)],
    [Paragraph('Subsystem', s_table_cell),
     Paragraph('Referring to Motion, Tokens, etc.', s_table_cell),
     Paragraph('Module, package, feature, plugin', s_table_cell)],
    [Paragraph('Effect', s_table_cell),
     Paragraph('Referring to a visual/interaction output', s_table_cell),
     Paragraph('Component, utility, class, animation', s_table_cell)],
    [Paragraph('Platform', s_table_cell),
     Paragraph('Referring to Ferrum as a whole', s_table_cell),
     Paragraph('Tool, library, framework, kit', s_table_cell)],
    [Paragraph('Describe the experience.', s_table_cell),
     Paragraph('The brand tagline', s_table_cell),
     Paragraph('Write the code. Ship the feature.', s_table_cell)],
]

vocab_table = Table(vocab_data, colWidths=[AVAIL_W * 0.25, AVAIL_W * 0.40, AVAIL_W * 0.35],
                     hAlign='CENTER')
vocab_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white if False else TABLE_STRIPE),
    ('BACKGROUND', (0, 2), (-1, 2), CARD_BG),
    ('BACKGROUND', (0, 3), (-1, 3), TABLE_STRIPE),
    ('BACKGROUND', (0, 4), (-1, 4), CARD_BG),
    ('BACKGROUND', (0, 5), (-1, 5), TABLE_STRIPE),
    ('BACKGROUND', (0, 6), (-1, 6), CARD_BG),
    ('BACKGROUND', (0, 7), (-1, 7), TABLE_STRIPE),
    ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))

story.append(spacer(8))
story.append(vocab_table)
story.append(spacer(6))
story.append(muted('Table 1: Approved vocabulary for external communication'))

story.append(spacer(18))

story.append(h2('Forbidden Language'))
story.append(body(
    'The following language patterns undermine the platform positioning and must be avoided in all '
    'external communication, including documentation, blog posts, social media, and conference talks.'
))

forbidden_data = [
    [Paragraph('<b>Forbidden Pattern</b>', s_table_header),
     Paragraph('<b>Why It Undermines Positioning</b>', s_table_header)],
    [Paragraph('"Just another CSS library"', s_table_cell),
     Paragraph('Trivializes the platform to a single category that Ferrum transcends. It is a rendering '
               'infrastructure with CSS as its foundation, not a CSS library with some extras.', s_table_cell)],
    [Paragraph('"The [X] of CSS" / "[X] for your frontend"', s_table_cell),
     Paragraph('Frames Ferrum as a marginal improvement within an existing category rather than as the '
               'creator of a new category. Infrastructure does not describe itself as a better version of something else.', s_table_cell)],
    [Paragraph('Naming specific competitors in marketing', s_table_cell),
     Paragraph('Elevates competitors to peers and invites feature-by-feature comparisons that miss the '
               'structural point. Ferrum competes on architecture, not features. Competitor analysis belongs '
               'in internal strategy documents, not public messaging.', s_table_cell)],
    [Paragraph('"866 effects" as the primary value prop', s_table_cell),
     Paragraph('Reduces Ferrum to a feature count. The effects are evidence of the platform\'s depth, '
               'not the value proposition itself. The value proposition is the unified rendering layer.', s_table_cell)],
    [Paragraph('"Coming soon" without a timeline', s_table_cell),
     Paragraph('Destroys trust. Every "coming soon" must be accompanied by a specific status: alpha, beta, '
               'or planned with a quarterly target. If it cannot be scheduled, it should not be mentioned.', s_table_cell)],
]

forbidden_table = Table(forbidden_data, colWidths=[AVAIL_W * 0.35, AVAIL_W * 0.65],
                         hAlign='CENTER')
forbidden_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, 1), TABLE_STRIPE),
    ('BACKGROUND', (0, 2), (-1, 2), CARD_BG),
    ('BACKGROUND', (0, 3), (-1, 3), TABLE_STRIPE),
    ('BACKGROUND', (0, 4), (-1, 4), CARD_BG),
    ('BACKGROUND', (0, 5), (-1, 5), TABLE_STRIPE),
    ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))

story.append(spacer(8))
story.append(forbidden_table)
story.append(spacer(6))
story.append(muted('Table 2: Language patterns that undermine platform positioning'))


# ═══════════════════════════════════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════════════════════════════════
doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    leftMargin=LEFT_M,
    rightMargin=RIGHT_M,
    topMargin=TOP_M,
    bottomMargin=BOT_M,
    title='Ferrum Brand Architecture',
    author='Z.ai',
    creator='Z.ai',
    subject='Brand narrative, positioning, and messaging foundation for the Ferrum Universal UI Platform'
)

doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f'Body PDF generated: {OUTPUT_PATH}')