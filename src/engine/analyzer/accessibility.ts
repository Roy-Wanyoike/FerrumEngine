/**
 * FerrumEngine v2 — Accessibility Analyzer
 *
 * Analyzes the application graph for accessibility issues:
 *   - Images without alt text
 *   - Missing form labels
 *   - Missing ARIA attributes on interactive elements
 *   - Color-only indicators
 *   - Missing keyboard navigation support
 *   - Missing skip-to-content link in layouts
 *   - Low contrast potential
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
} from "../core/types";
import { generateId } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface AccessibilityConfig {
  /** Whether to require skip-to-content links. */
  requireSkipToContent?: boolean;
}

const DEFAULT_CONFIG: AccessibilityConfig = {
  requireSkipToContent: true,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeAccessibility(
  graph: ApplicationGraph,
  config: AccessibilityConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectImagesWithoutAlt(graph));
  findings.push(...detectMissingFormLabels(graph));
  findings.push(...detectMissingAriaAttributes(graph));
  findings.push(...detectColorOnlyIndicators(graph));
  findings.push(...detectMissingKeyboardNavigation(graph));
  findings.push(...detectMissingSkipToContent(graph, cfg));
  findings.push(...detectLowContrastPotential(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "accessibility",
    category: "accessibility",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectImagesWithoutAlt(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "page") continue;

    const meta = node.meta as Record<string, unknown>;
    const imgElements = Array.isArray(meta.imgElements) ? (meta.imgElements as Array<Record<string, unknown>>) : [];

    for (const img of imgElements) {
      const hasAlt = img.alt !== undefined && img.alt !== "";
      const isDecorative = img.role === "presentation" || img.ariaHidden === true;

      if (!hasAlt && !isDecorative) {
        findings.push({
          id: generateId(node.path, `img-no-alt:${String(img.varName ?? img.src ?? "unknown")}`),
          category: "accessibility",
          severity: "high",
          title: `Image without alt text in ${node.name}`,
          description: `An <img> element in ${node.path} is missing the alt attribute. Screen readers cannot describe this image to users.`,
          evidence: [{
            description: `<img> element without alt attribute${img.src ? ` (src: ${img.src})` : ""}`,
            filePath: node.path,
            line: typeof img.line === "number" ? img.line : undefined,
          }],
          affectedNodes: [node.id],
          suggestion: "Add a descriptive alt attribute, or role=\"presentation\" for decorative images.",
          ruleId: "a11y/img-no-alt",
        });
      }

      if (hasAlt && typeof img.alt === "string" && img.alt.trim() === "") {
        // Empty alt is fine for decorative, but let's check if it's truly decorative
        if (!isDecorative) {
          findings.push({
            id: generateId(node.path, `img-empty-alt:${String(img.varName ?? "unknown")}`),
            category: "accessibility",
            severity: "medium",
            title: `Image with empty alt in ${node.name}`,
            description: `An <img> element in ${node.path} has alt=\"\" which hides it from screen readers. If this image conveys information, provide descriptive text.`,
            evidence: [{
              description: `Image has empty alt="" but is not marked as decorative`,
              filePath: node.path,
            }],
            affectedNodes: [node.id],
            suggestion: `Provide descriptive alt text if the image conveys information, or add role="presentation" if purely decorative.`,
            ruleId: "a11y/img-empty-alt",
          });
        }
      }
    }
  }

  return findings;
}

function detectMissingFormLabels(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "page") continue;

    const meta = node.meta as Record<string, unknown>;
    const inputs = Array.isArray(meta.formInputs) ? (meta.formInputs as Array<Record<string, unknown>>) : [];

    for (const input of inputs) {
      const hasLabel = input.hasLabel === true;
      const hasAriaLabel = typeof input.ariaLabel === "string" && input.ariaLabel !== "";
      const hasAriaLabelledBy = typeof input.ariaLabelledBy === "string" && input.ariaLabelledBy !== "";
      const isHidden = input.type === "hidden";

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy && !isHidden) {
        findings.push({
          id: generateId(node.path, `no-label:${String(input.name ?? input.id ?? "unknown")}`),
          category: "accessibility",
          severity: "high",
          title: `Input without label in ${node.name}`,
          description: `A form input in ${node.path} has no associated <label>, aria-label, or aria-labelledby. Screen reader users cannot identify this field.`,
          evidence: [{
            description: `Input "${String(input.name ?? "unknown")}" without accessible name`,
            filePath: node.path,
            line: typeof input.line === "number" ? input.line : undefined,
          }],
          affectedNodes: [node.id],
          suggestion: "Add a <label> element, aria-label, or aria-labelledby attribute to this input.",
          ruleId: "a11y/no-label",
        });
      }
    }
  }

  return findings;
}

function detectMissingAriaAttributes(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component") continue;

    const meta = node.meta as Record<string, unknown>;
    const interactiveElements = Array.isArray(meta.interactiveElements)
      ? (meta.interactiveElements as Array<Record<string, unknown>>)
      : [];

    for (const el of interactiveElements) {
      const tag = String(el.tag ?? "div");
      const hasAccessibleName =
        el.ariaLabel !== undefined ||
        el.ariaLabelledBy !== undefined ||
        el.hasTextContent === true ||
        el.hasTitle === true;
      const hasRole = el.role !== undefined;
      const isNative = ["button", "a", "input", "select", "textarea"].includes(tag);

      // Custom interactive elements without accessible name
      if (!isNative && !hasAccessibleName) {
        findings.push({
          id: generateId(node.path, `no-aria:${String(el.varName ?? tag)}`),
          category: "accessibility",
          severity: "high",
          title: `Interactive element without accessible name in ${node.name}`,
          description: `A <${tag}> element in ${node.path} has click/keyboard handlers but no accessible name (aria-label, aria-labelledby, or text content).`,
          evidence: [{
            description: `<${tag}> with click handler but no accessible name`,
            filePath: node.path,
            line: typeof el.line === "number" ? el.line : undefined,
          }],
          affectedNodes: [node.id],
          suggestion: "Add aria-label or aria-labelledby to provide an accessible name for this interactive element.",
          ruleId: "a11y/no-accessible-name",
        });
      }
    }
  }

  return findings;
}

function detectColorOnlyIndicators(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component") continue;

    const meta = node.meta as Record<string, unknown>;
    const colorOnly = meta.colorOnlyIndicators;

    if (Array.isArray(colorOnly) && colorOnly.length > 0) {
      for (const indicator of colorOnly) {
        const ind = indicator as Record<string, unknown>;
        findings.push({
          id: generateId(node.path, `color-only:${String(ind.varName ?? "unknown")}`),
          category: "accessibility",
          severity: "medium",
          title: `Color-only indicator in ${node.name}`,
          description: `${node.path} uses color as the only means of conveying information ("${String(ind.description ?? ind.cssProperty ?? "unknown")}"). This is not accessible to color-blind users.`,
          evidence: [{
            description: "Color used as sole indicator of state/meaning",
            filePath: node.path,
          }],
          affectedNodes: [node.id],
          suggestion: "Add a text label, icon, or pattern in addition to color to convey the information.",
          ruleId: "a11y/color-only",
        });
      }
    }
  }

  return findings;
}

function detectMissingKeyboardNavigation(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component") continue;

    const meta = node.meta as Record<string, unknown>;
    const interactiveElements = Array.isArray(meta.interactiveElements)
      ? (meta.interactiveElements as Array<Record<string, unknown>>)
      : [];

    for (const el of interactiveElements) {
      const hasClick = el.onClick === true;
      const hasKeyDown = el.onKeyDown === true || el.onKeyPress === true;
      const isNativeButton = el.tag === "button" || el.tag === "a";

      if (hasClick && !hasKeyDown && !isNativeButton) {
        findings.push({
          id: generateId(node.path, `no-keyboard:${String(el.varName ?? el.tag)}`),
          category: "accessibility",
          severity: "high",
          title: `Click handler without keyboard support in ${node.name}`,
          description: `A <${String(el.tag)}> element in ${node.path} has an onClick handler but no onKeyDown handler. Keyboard users cannot activate this element.`,
          evidence: [{
            description: `onClick without onKeyDown on <${String(el.tag)}>`,
            filePath: node.path,
            line: typeof el.line === "number" ? el.line : undefined,
          }],
          affectedNodes: [node.id],
          suggestion: "Add onKeyDown handler, or use a native <button> or <a> element which has built-in keyboard support.",
          ruleId: "a11y/no-keyboard-handler",
        });
      }
    }
  }

  return findings;
}

function detectMissingSkipToContent(
  graph: ApplicationGraph,
  cfg: AccessibilityConfig,
): Finding[] {
  const findings: Finding[] = [];

  if (!cfg.requireSkipToContent) return findings;

  for (const node of graph.nodes.values()) {
    if (node.kind !== "layout") continue;

    const meta = node.meta as Record<string, unknown>;
    const hasSkipLink = meta.hasSkipToContent === true || meta.hasSkipLink === true;

    if (!hasSkipLink) {
      findings.push({
        id: generateId(node.path, "no-skip-to-content"),
        category: "accessibility",
        severity: "medium",
        title: `Missing skip-to-content link in ${node.name}`,
        description: `Layout ${node.path} has no skip-to-content link. Keyboard and screen reader users must tab through all navigation to reach main content.`,
        evidence: [{
          description: "No skip-to-content link detected in layout",
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Add a skip-to-content link as the first focusable element in the layout: <a href=\"#main-content\" className=\"sr-only focus:not-sr-only\">Skip to content</a>.",
        ruleId: "a11y/no-skip-to-content",
      });
    }
  }

  return findings;
}

function detectLowContrastPotential(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "style") continue;

    const meta = node.meta as Record<string, unknown>;
    const lowContrastElements = Array.isArray(meta.lowContrastElements)
      ? (meta.lowContrastElements as Array<Record<string, unknown>>)
      : [];

    for (const el of lowContrastElements) {
      findings.push({
        id: generateId(node.path, `low-contrast:${String(el.selector ?? "unknown")}`),
        category: "accessibility",
        severity: "medium",
        title: `Potential low contrast in ${node.name}`,
        description: `${node.path} has elements with potentially low color contrast ("${String(el.selector ?? "unknown")}"). Text may be difficult to read for users with visual impairments.`,
        evidence: [{
          description: `Contrast ratio may be below 4.5:1 for ${String(el.selector ?? "unknown")}`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text per WCAG 2.1 AA.",
        ruleId: "a11y/low-contrast",
      });
    }
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function summarizeFindings(findings: Finding[]) {
  return {
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
    info: findings.filter((f) => f.severity === "info").length,
  };
}
