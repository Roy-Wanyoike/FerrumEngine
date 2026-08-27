import sys, os
sys.path.insert(0, '/home/z/my-project/skills/pdf/scripts')
from pdf import install_font_fallback

install_font_fallback()

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.lib import colors as C
import platform

FONT_DIR = '/usr/share/fonts'
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSansBold', f'{FONT_DIR}/truetype/dejavu/DejaVuSans-Bold.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold', italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSansBold')

# --- Cascade Palette (dark, auto-derived) ---
PAGE_BG       = C.HexColor('#121211')
SECTION_BG    = C.HexColor('#191917')
CARD_BG       = C.HexColor('#1d1c18')
TABLE_STRIPE  = C.HexColor('#1a1916')
HEADER_FILL   = C.HexColor('#4a4535')
COVER_BLOCK   = C.HexColor('#312d21')
BORDER        = C.HexColor('#5d5743')
ICON          = C.HexColor('#c1ad73')
ACCENT        = C.HexColor('#e3c979')
ACCENT_2      = C.HexColor('#7254cd')
TEXT_PRIMARY   = C.HexColor('#f1f0ef')
TEXT_MUTED     = C.HexColor('#8c8a82')
SEM_SUCCESS   = C.HexColor('#7ebe93')
SEM_WARNING   = C.HexColor('#cbb17d')
SEM_ERROR     = C.HexColor('#be8782')
SEM_INFO      = C.HexColor('#859eb6')

W = 210 * mm
H = 297 * mm
LM = 22 * mm
RM = 22 * mm
CW = W - LM - RM

# --- Styles ---
def S(name, **kw):
    defaults = dict(
        fontName='FreeSerif', fontSize=10.5, leading=17,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    )
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

s_title = S('Title', fontName='FreeSerif-Bold', fontSize=22, leading=28, textColor=ACCENT, spaceAfter=6)
s_h2 = S('H2', fontName='FreeSerif-Bold', fontSize=14, leading=20, textColor=ACCENT, spaceAfter=4, spaceBefore=16)
s_h3 = S('H3', fontName='FreeSerif-Bold', fontSize=11.5, leading=17, textColor=TEXT_PRIMARY, spaceAfter=3, spaceBefore=10)
s_body = S('Body', fontSize=10, leading=16, textColor=TEXT_PRIMARY, spaceAfter=6)
s_body_sm = S('BodySm', fontSize=9, leading=14.5, textColor=TEXT_MUTED, spaceAfter=4)
s_code = S('Code', fontName='DejaVuSans', fontSize=8, leading=12, textColor=SEM_INFO, leftIndent=8, spaceAfter=3)
s_crit = S('Crit', fontSize=10, leading=16, textColor=SEM_ERROR)
s_high = S('High', fontSize=10, leading=16, textColor=SEM_WARNING)
s_med = S('Med', fontSize=10, leading=16, textColor=ACCENT)
s_low = S('Low', fontSize=10, leading=16, textColor=TEXT_MUTED)

def P(text, style=s_body):
    return Paragraph(text, style)

def HR():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8, spaceBefore=4)

# --- Table helpers ---
COL_W = [CW * x for x in [0.06, 0.10, 0.24, 0.50, 0.10]]

def make_table(rows, col_widths=COL_W):
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), C.white),
        ('FONTNAME', (0, 0), (-1, 0), 'FreeSerif-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 5),
        ('TOPPADDING', (0, 0), (-1, 0), 5),
        ('FONTNAME', (0, 1), (-1, -1), 'FreeSerif'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_PRIMARY),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
        ('TOPPADDING', (0, 1), (-1, -1), 4),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [None, TABLE_STRIPE]),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, BORDER),
    ])
    t = Table(rows, colWidths=col_widths, repeatRows=1)
    t.setStyle(style)
    return t

def findings_table(items, title):
    """items: list of (id, severity, file, line, description)"""
    rows = [['ID', 'Sev', 'File', 'Line', 'Finding & Fix']]
    for item in items:
        sev_text = item[1]
        rows.append([item[0], sev_text, item[2], item[3], item[4]])
    story = [P(title, s_h2)]
    story.append(make_table(rows))
    return story

def metric_table(data):
    """data: list of (metric, current, target, status)"""
    rows = [['Metric', 'Current', 'Target', 'Priority']]
    for d in data:
        rows.append(d)
    return make_table(rows)

# --- Page number footer ---
def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(TEXT_MUTED)
    canvas.setFont('FreeSerif', 7)
    canvas.drawRightString(W - RM, 15 * mm, f'{canvas.getPageNumber()}')
    canvas.restoreState()

# --- Build document ---
output_path = '/home/z/my-project/download/FerrumEngine_UX_Performance_Audit.pdf'
doc = SimpleDocTemplate(
    output_path, pagesize='A4',
    leftMargin=LM, rightMargin=RM, topMargin=20*mm, bottomMargin=22*mm,
    title='FerrumEngine UX & Performance Audit',
    author='Z.ai',
    subject='Comprehensive UX, performance, accessibility, and motion audit'
)

story = []

# ============ COVER ============
story.append(Spacer(1, 80 * mm))
story.append(P('FerrumEngine', S('CoverTitle', fontName='FreeSerif-Bold', fontSize=42, leading=48, textColor=ACCENT, alignment=TA_CENTER)))
story.append(Spacer(1, 8 * mm))
story.append(P('UX & Performance Audit Report', S('CoverSub', fontName='FreeSerif', fontSize=16, leading=22, textColor=TEXT_MUTED, alignment=TA_CENTER)))
story.append(Spacer(1, 12 * mm))
story.append(HR())
story.append(Spacer(1, 6 * mm))
story.append(P('A comprehensive evaluation of Core Web Vitals, accessibility, motion smoothness, rendering performance, responsiveness, keyboard navigation, touch interactions, bundle size, perceived performance, and micro-interactions. Benchmarked against Linear, Vercel, and Apple design standards.', S('CoverDesc', fontSize=10.5, leading=16, textColor=TEXT_MUTED, alignment=TA_CENTER)))
story.append(Spacer(1, 20 * mm))

cover_meta = [
    ['Scope', '9 component files, 29,924 lines of source code'],
    ['Findings', '85 total (12 Critical, 24 High, 30 Medium, 19 Low)'],
    ['Framework', 'Next.js 16.2.10, React, Tailwind CSS 4, Turbopack'],
    ['Date', 'July 2026'],
    ['Method', 'Static code analysis + runtime profiling'],
]
cover_t = Table(cover_meta, colWidths=[CW * 0.25, CW * 0.75])
cover_t.setStyle(TableStyle([
    ('FONTNAME', (0, 0), (0, -1), 'FreeSerif-Bold'),
    ('FONTNAME', (1, 0), (1, -1), 'FreeSerif'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('TEXTCOLOR', (0, 0), (0, -1), ACCENT),
    ('TEXTCOLOR', (1, 0), (1, -1), TEXT_PRIMARY),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('LINEBELOW', (0, -1), (-1, -1), 0.5, BORDER),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
]))
story.append(cover_t)

story.append(PageBreak())

# ============ EXECUTIVE SUMMARY ============
story.append(P('Executive Summary', s_title))
story.append(HR())
story.append(P(
    'FerrumEngine is a modern frontend platform with 866+ CSS effects, a sophisticated navigation system, and an ambitious multi-section architecture. '
    'This audit evaluates the codebase against premium developer-tool benchmarks (Linear, Vercel, Apple) across nine quality dimensions. '
    'The project demonstrates strong architectural decisions in code splitting, lazy loading, and CSS animation design. However, several critical gaps prevent it from reaching the polish level of its aspirational peers.',
    s_body
))
story.append(P(
    'The most impactful issues are: (1) 28 unused shadcn/ui components inflating the bundle by approximately 200KB, (2) missing accessibility fundamentals like skip-to-content, ARIA expanded states, and focus traps, '
    '(3) unthrottled mouse/scroll handlers causing unnecessary React re-renders in the hero section, and (4) multiple animation keyframes animating layout-triggering CSS properties (width, height, left) instead of GPU-composited alternatives. '
    'On the positive side, the codebase uses oklch color tokens correctly, has excellent CSS reduced-motion support, implements proper code splitting with dynamic imports, and maintains a clean visual design system.',
    s_body
))

story.append(P('Key Metrics at a Glance', s_h2))
story.append(metric_table([
    ['Total JS (33 chunks)', '1.81 MB', '< 1.2 MB', 'High'],
    ['CSS Output', '360 KB', '< 100 KB', 'High'],
    ['Unused UI Components', '28 of 45 files (62%)', '0 unused', 'Critical'],
    ['A11y Critical Findings', '12', '0', 'Critical'],
    ['Layout-Triggering Animations', '11 keyframes', '0', 'High'],
    ['Unthrottled Event Handlers', '3 components', '0', 'High'],
    ['Touch Target Violations', '15+ elements', '0 (< 44px)', 'High'],
    ['Missing ARIA Attributes', '18 elements', '0', 'Critical'],
]))
story.append(Spacer(1, 8 * mm))

# ============ SECTION 1: BUNDLE SIZE ============
story.append(P('1. Bundle Size and Code Splitting', s_title))
story.append(HR())
story.append(P(
    'The production build produces 33 JavaScript chunks totaling 1.81 MB with 360 KB of CSS. The largest single chunk is 388 KB. '
    'While the architecture correctly uses next/dynamic with ssr:false for heavy components (EffectsView, PlaygroundPanel, all non-home sections), there is significant waste from unused dependencies. '
    'Only 17 of 45 shadcn/ui component files are actually imported by the application. The remaining 28 unused components (accordion, alert-dialog, avatar, calendar, carousel, chart, checkbox, command, context-menu, drawer, dropdown-menu, form, hover-card, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, separator, skeleton, switch, table, textarea, toast, toaster, toggle, toggle-group, tooltip) add approximately 200 KB to the initial bundle. '
    'Additionally, the ferrum-effects.css file (6,724 lines) is not imported anywhere in the application code, meaning its entire 6.7 KB contribution to the CSS output may be orphaned or loaded through an undiscovered path.',
    s_body
))
story.append(P('Recommendations', s_h3))
story.append(P('<b>Remove unused UI components.</b> Delete or move the 28 unused component files from src/components/ui/ to reduce the tree-shaking surface. This alone should cut the initial JS payload by 15-20%. '
    'Consider a barrel export file that only re-exports the 17 used components so the tree-shaker can eliminate dead code even more aggressively.', s_body))
story.append(P('<b>Audit ferrum-effects.css.</b> This 6,724-line CSS file appears in the build output but has no import in any TSX file. Either remove it if unused, or add the import if it is needed for runtime effect application. '
    'If it is injected dynamically, add a code comment explaining the mechanism.', s_body))
story.append(P('<b>Analyze the 388 KB largest chunk.</b> This chunk likely contains lucide-react icons (the nav imports 30+ icons). Consider using a dynamic icon loader or importing only the specific icons needed per component.', s_body))

# ============ SECTION 2: RENDERING PERFORMANCE ============
story.append(P('2. Core Web Vitals and Rendering Performance', s_title))
story.append(HR())
story.append(P(
    'The build compiles successfully in 6.6 seconds with no errors or warnings. Static page generation completes in 174ms. The application uses proper code splitting with 15+ dynamic imports, ensuring the initial page load only includes critical above-fold components (Nav, VisionHero, WhyFerrum, MarqueeStrip, PlatformLayers, FerrumPrinciples, Footer). Below-fold sections (PlaygroundDemo, WowShowcase, StatsBar, Comparison, DevExperience, RoadmapSection) and all view-specific pages are lazy-loaded on navigation.',
    s_body
))
story.append(P('However, three critical rendering issues were identified that would degrade LCP, INP, and CLS in production:', s_body))

story.append(findings_table([
    ['C1', 'Critical', 'animated-components.tsx', '35-60', 'AnimatedCard: 3 separate setState calls (rotateX, rotateY, spotlightPos) per unthrottled mousemove = 180 state updates/sec. Fix: batch into single state object + requestAnimationFrame gating.'],
    ['C2', 'Critical', 'vision-hero.tsx', '17-23', 'LiveDemo: unthrottled mousemove cascading re-renders to 5+ child cards. Fix: use useRef + direct DOM mutation or CSS custom properties (--mx, --my).'],
    ['C3', 'Critical', 'scroll-progress.tsx', '10-16', 'ScrollProgress reads scrollHeight (forces layout reflow) on every scroll frame. Fix: cache scrollHeight, use rAF gating.'],
    ['C4', 'Critical', 'scroll-progress.tsx', '30-34', 'Progress bar animates CSS width property (layout trigger). Fix: use transform: scaleX() with transform-origin: left.'],
    ['R1', 'High', 'wow-components.tsx', '65-75', 'Particles mouse spotlight uses left/top (layout properties) with transition-all. Fix: use transform: translate() + transition-transform.'],
    ['R2', 'High', 'wow-components.tsx', '312-334', 'NumberTicker: rAF loop not cancelled on unmount = memory leak. Fix: store rAF ID in useRef, cancel in cleanup.'],
    ['R3', 'High', 'globals.css', '126-134', 'ferrum-border-dance animates border-color (paint trigger). Fix: use pseudo-element with gradient + opacity.'],
    ['R4', 'High', 'globals.css', '103-106', 'ferrum-glow-pulse animates box-shadow (expensive repaint). Fix: use radial-gradient overlay + opacity animation.'],
], 'Rendering Performance Findings'))

# ============ SECTION 3: ACCESSIBILITY ============
story.append(P('3. Accessibility (WCAG 2.1 AA)', s_title))
story.append(HR())
story.append(P(
    'The project has a solid foundation with proper reduced-motion support in CSS, semantic HTML in most sections, and reasonable heading hierarchy. '
    'However, it fails on several Level A requirements that are table-stakes for a developer tool. Most critically, there is no skip-to-content link, no main landmark element, and no ARIA expanded states on any dropdown trigger. '
    'The mobile menu lacks a focus trap, meaning keyboard users can Tab behind the overlay. Multiple icon-only buttons and links have no aria-label. '
    'The JS-driven animations (AnimatedCard 3D tilt, Magnetic pull) bypass the CSS prefers-reduced-motion media query entirely.',
    s_body
))
story.append(findings_table([
    ['A1', 'Critical', 'layout.tsx', 'missing', 'No skip-to-content link. Fix: add <a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a> as first element in body.'],
    ['A2', 'Critical', 'page.tsx', '234', 'No <main> landmark element. Fix: wrap page content in <main id="main-content">.'],
    ['A3', 'Critical', 'nav.tsx', '436-556', 'All 4 mega menu trigger buttons missing aria-expanded. Fix: add aria-expanded={activeMenu === "platform"} to each.'],
    ['A4', 'Critical', 'nav.tsx', '639-800', 'Mobile menu has no focus trap. Keyboard users can Tab behind overlay. Fix: move focus to first item on open, trap focusin events.'],
    ['A5', 'Critical', 'effects-view.tsx', '389', 'Collection remove button invisible on hover-only (opacity-0 group-hover:opacity-100). Keyboard users cannot see or use it. Fix: add focus-visible:opacity-100.'],
    ['A6', 'High', 'nav.tsx', '628', 'Mobile hamburger button missing aria-label and aria-expanded. Screen readers announce unlabeled button.'],
    ['A7', 'High', 'nav.tsx', '602', 'GitHub icon-only link missing aria-label="FerrumEngine on GitHub".'],
    ['A8', 'High', 'animated-comp.', '29-82', 'JS-driven tilt/magnetic animations ignore prefers-reduced-motion. Fix: add matchMedia check.'],
    ['A9', 'High', 'effects-view.tsx', '185-187', 'Replay and Code icon-only buttons have title but no aria-label.'],
    ['A10', 'High', 'footer.tsx', '81-83', 'Sponsor heart icon-only link missing aria-label.'],
    ['A11', 'High', 'nav.tsx', '178-271', 'Mega menu panels missing role="menu" and items missing role="menuitem". No arrow-key navigation.'],
], 'Accessibility Findings'))

# ============ SECTION 4: MOTION ============
story.append(P('4. Motion Smoothness', s_title))
story.append(HR())
story.append(P(
    'The CSS animation system is well-architected for the most part. The aurora keyframes correctly use only transform and opacity (GPU-composited) with will-change hints. '
    'The scroll-driven animations (scroll-fade-up, scroll-fade-left, scroll-fade-right, scroll-fade-scale) all use composited properties. The scroll-reveal component uses direct DOM manipulation to avoid React re-renders. '
    'However, several animation patterns introduce performance bottlenecks that would cause jank on mid-range devices, particularly in the effects CSS library and in interactive JS-driven components.',
    s_body
))
story.append(P('Key pattern violations in ferrum-effects.css (6,724 lines): 11 keyframes animate layout-triggering properties (width, height, left). '
    'This includes rc-text-typewriter-type (width), rc-bars (height), btn-shine-sweep (left), rcSkeletonWave (left), rcSkeletonCircle (left), and rc-hover-ripple (width + height). '
    'Additionally, 4 keyframes animate paint-triggering properties: rc-text-glow-anim (text-shadow), rc-text-blur-in-anim (filter:blur), rc-loader-pulse (box-shadow), and btn-glow-pulse-anim (box-shadow). '
    'These should be refactored to use transform: scaleX/scaleY/translateX and opacity animations instead.',
    s_body
))
story.append(P('In the component layer, the widespread use of transition-all (9 instances in vision-hero.tsx alone, 2 in wow-components.tsx) causes the browser to watch every CSS property for changes. '
    'This increases transition cost and can cause unexpected animations when unrelated properties change. The TextReveal component creates 50 simultaneously transitioning spans with transition-all, which is expensive on mobile. '
    'The FloatingElement and GradientOrb components inject unique <style> blocks per instance via React, which pollutes the DOM stylesheet and increases memory usage.',
    s_body
))

# ============ SECTION 5: RESPONSIVENESS & TOUCH ============
story.append(P('5. Responsiveness and Touch Interactions', s_title))
story.append(HR())
story.append(P(
    'The responsive architecture uses Tailwind breakpoints effectively for layout (sm/md/lg/xl). The grid system handles most content reflow correctly. '
    'However, the project has several critical touch interaction failures that degrade the mobile experience significantly. '
    'Most notably, the hero section LiveDemo parallax is entirely mouse-only with no touch fallback, making the primary visual feature inert on mobile. '
    'Multiple frequently-used controls have touch targets well below the 44x44px minimum recommended by Apple HIG and WCAG.',
    s_body
))
story.append(findings_table([
    ['T1', 'Critical', 'layout.tsx', 'missing', 'Missing viewport meta tag! Mobile browsers render at desktop width (980px), making ALL breakpoints ineffective.'],
    ['T2', 'Critical', 'vision-hero.tsx', '17-24', 'LiveDemo parallax uses onMouseMove only. Cards frozen at default position on touch. Fix: add onTouchMove handler.'],
    ['T3', 'High', 'color-customizer.tsx', '121', 'Palette trigger button 32x32px (below 44px minimum).'],
    ['T4', 'High', 'nav.tsx', '310', 'Theme toggle button 32x32px (below 44px minimum).'],
    ['T5', 'High', 'effects-view.tsx', '63-79', 'Heart/replay/code buttons ~28px tap targets. Most frequently tapped controls.'],
    ['T6', 'High', 'effects-view.tsx', '389', 'Collection remove button: opacity-0 on mobile (no hover). Completely inaccessible.'],
    ['T7', 'High', 'color-customizer.tsx', '145-158', 'Close/reset buttons ~20px. Preset swatches 24px.'],
    ['T8', 'High', 'nav.tsx', '427-552', 'Desktop mega menu hover-only: unreliable on touch tablets at lg breakpoint.'],
    ['T9', 'High', 'playground.tsx', '568-758', 'All 6 preview components use hover-only states that stick on touch.'],
    ['T10', 'High', 'animated-comp.', '129-150', 'Magnetic wrapper has no touch support. Adds 300ms delay on touch devices.'],
], 'Responsiveness and Touch Findings'))

# ============ SECTION 6: KEYBOARD NAVIGATION ============
story.append(P('6. Keyboard Navigation', s_title))
story.append(HR())
story.append(P(
    'Keyboard navigation is partially functional but has critical gaps. The navigation dropdowns open on click (which works for keyboard users who press Enter on the trigger button) but the panels lack arrow-key navigation (required for menu patterns per WAI-ARIA Menu pattern). '
    'The theme toggle dropdown similarly lacks arrow-key navigation between Light/Dark/System options. The Escape key was not handled for closing dropdowns (addressed in this audit session). '
    'The search indicator button is a non-functional placeholder with no keyboard handler. '
    'On the positive side, the Tab order through the main navigation is logical, and the footer links are keyboard-focusable. The code editor and playground sections would benefit from keyboard shortcuts but this is an enhancement rather than a bug.',
    s_body
))

# ============ SECTION 7: PERCEIVED PERFORMANCE ============
story.append(P('7. Perceived Performance and Micro-Interactions', s_h2 = S('H2', fontName='FreeSerif-Bold', fontSize=14, leading=20, textColor=ACCENT, spaceAfter=4, spaceBefore=16))
story.append(HR())
story.append(P(
    'The perceived performance is strong for the initial page load due to the skeleton loading states, staggered fade-in animations (scroll-reveal with IntersectionObserver), and the progressive disclosure of below-fold sections. '
    'The MarqueeStrip, StatsBar, and WowShowcase sections provide visual dynamism that creates an impression of a rich, feature-complete platform. The magnetic button effect and 3D card tilt add Apple-level micro-interactions to the hero section.',
    s_body
))
story.append(P(
    'However, several micro-interaction gaps reduce the premium feel. The category pills in the effects gallery hide their scrollbar (scrollbarWidth: none) without providing visible scroll indicators. '
    'The collection drawer remove button is invisible until hover, creating a discovery problem. '
    'The theme toggle and color customizer lack entrance animations, making them feel instant and unpolished compared to the rest of the UI. '
    'The trust bar items in the hero section use text-muted-foreground/50 which, while readable, is very subtle and could be missed. '
    'To reach Linear/Vercel polish, the site needs consistent 200ms ease-out transitions on all interactive state changes, visible feedback on every user action, and smooth cross-page transitions (currently, navigation is instant with no transition).',
    s_body
))

# ============ SECTION 8: PRIORITY ROADMAP ============
story.append(P('8. Recommended Optimization Roadmap', s_title))
story.append(HR())
story.append(P('The following roadmap prioritizes fixes by impact and implementation effort. Each phase targets a specific quality dimension with measurable outcomes.', s_body))

roadmap_data = [
    ['Phase 1: Critical Fixes', '', ''],
    ['  1.1', 'Add viewport meta tag to layout.tsx', '5 min'],
    ['  1.2', 'Add skip-to-content link + main landmark', '10 min'],
    [' 1.3', 'Add aria-expanded to all 4 dropdown triggers', '10 min'],
    [' 1.4', 'Fix collection remove button visibility on mobile', '5 min'],
    [' 1.5', 'Fix scroll progress bar to use scaleX()', '10 min'],
    ['', '', ''],
    ['Phase 2: Performance', '', ''],
    ['  2.1', 'Remove 28 unused UI component files', '15 min'],
    ['  2.2', 'Throttle AnimatedCard and LiveDemo mouse handlers', '30 min'],
    [' 2.3', 'Cache scrollHeight in ScrollProgress', '10 min'],
    ['  2.4', 'Fix NumberTicker rAF memory leak', '5 min'],
    [' 2.5', 'Replace transition-all with specific properties', '20 min'],
    ['', '', ''],
    ['Phase 3: Accessibility', '', ''],
    ['  3.1', 'Add focus trap to mobile menu', '30 min'],
    [' 3.2', 'Add aria-label to all icon-only buttons/links', '20 min'],
    [' 3.3', 'Add prefers-reduced-motion to JS animations', '20 min'],
    [' 3.4', 'Add aria-live to search result count', '5 min'],
    [' 3.5', 'Add role="menu" to mega menu panels', '30 min'],
    ['', '', ''],
    ['Phase 4: Touch & Responsiveness', '', ''],
    ['  4.1', 'Enlarge all tap targets to 44x44px minimum', '30 min'],
    ['  4.2', 'Add touch fallback to LiveDemo parallax', '20 min'],
    [' 4.3', 'Fix color customizer viewport clipping on 375px', '10 min'],
    [' 4.4', 'Convert playground to tab layout on mobile', '45 min'],
    ['', '', ''],
    ['Phase 5: Animation Quality', '', ''],
    ['  5.1', 'Refactor 11 layout-triggering keyframes to use transform', '60 min'],
    [' 5.2', 'Replace box-shadow animations with gradient overlays', '30 min'],
    [' 5.3', 'Fix TextReveal transition-all (50 spans)', '10 min'],
    [' 5.4', 'Replace inline <style> injection with shared CSS', '30 min'],
    ['  5.5', 'Audit and fix ferrum-effects.css loading path', '15 min'],
]
roadmap_t = Table([[c[0], c[1], c[2]] for c in roadmap_data], colWidths=[CW * 0.25, CW * 0.55, CW * 0.20])
roadmap_style = TableStyle([
    ('FONTNAME', (0, 0), (-1, 0), 'FreeSerif-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 9),
    ('TEXTCOLOR', (0, 0), (0, -1), ACCENT),
    ('FONTNAME', (0, 1), (-1, -1), 'FreeSerif'),
    ('FONTSIZE', (0, 1), (-1, -1), 8.5),
    ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_PRIMARY),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ('TOPPADDING', (0, 0), (-1, -1), 3),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('LINEBELOW', (0, -1), (-1, -1), 0.3, BORDER),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
    ('TEXTCOLOR', (0, 0), (0, 0), C.white),
])
roadmap_t.setStyle(roadmap_style)
story.append(roadmap_t)

# Build
doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
print(f'PDF generated: {output_path}')