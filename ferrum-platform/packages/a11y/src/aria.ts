// ===== Ferrum A11y — ARIA Validation Engine =====
//
// Regex-based ARIA validation for HTML strings. Does not require a DOM.
// Checks for the most common accessibility violations in markup.

import type { A11yViolation } from './types';

// ---------------------------------------------------------------------------
// Valid ARIA Roles
// ---------------------------------------------------------------------------

/** Complete list of valid ARIA roles per WAI-ARIA 1.2. */
export const validRoles: string[] = [
  'alert',
  'alertdialog',
  'application',
  'article',
  'banner',
  'blockquote',
  'button',
  'caption',
  'cell',
  'checkbox',
  'code',
  'columnheader',
  'combobox',
  'complementary',
  'contentinfo',
  'definition',
  'deletion',
  'dialog',
  'directory',
  'document',
  'emphasis',
  'feed',
  'figure',
  'form',
  'generic',
  'grid',
  'gridcell',
  'group',
  'heading',
  'img',
  'insertion',
  'link',
  'list',
  'listbox',
  'listitem',
  'log',
  'main',
  'marquee',
  'math',
  'meter',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'navigation',
  'none',
  'note',
  'option',
  'paragraph',
  'presentation',
  'progressbar',
  'radio',
  'radiogroup',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'scrollbar',
  'search',
  'searchbox',
  'separator',
  'slider',
  'spinbutton',
  'status',
  'strong',
  'subscript',
  'superscript',
  'switch',
  'tab',
  'table',
  'tablist',
  'tabpanel',
  'term',
  'textbox',
  'time',
  'timer',
  'toolbar',
  'tooltip',
  'tree',
  'treegrid',
  'treeitem',
];

// ---------------------------------------------------------------------------
// Required ARIA Attributes per Role
// ---------------------------------------------------------------------------

/** Map of ARIA role → required attributes. */
const requiredAttrsByRole: Record<string, string[]> = {
  alert: [],
  alertdialog: ['aria-labelledby', 'aria-describedby'],
  button: [],
  checkbox: ['aria-checked'],
  combobox: ['aria-expanded', 'aria-controls'],
  dialog: ['aria-labelledby', 'aria-modal'],
  grid: [],
  gridcell: [],
  link: [],
  listbox: ['aria-label'],
  menu: [],
  menubar: [],
  menuitem: [],
  option: [],
  progressbar: ['aria-valuenow'],
  radio: ['aria-checked'],
  radiogroup: [],
  scrollbar: ['aria-controls', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin'],
  slider: ['aria-valuenow'],
  spinbutton: ['aria-valuenow'],
  switch: ['aria-checked'],
  tab: ['aria-selected', 'aria-controls'],
  tablist: [],
  tabpanel: ['aria-labelledby'],
  tree: [],
  treegrid: [],
  treeitem: ['aria-expanded'],
  heading: ['aria-level'],
  img: ['aria-label'],
  list: [],
  listitem: [],
  log: [],
  marquee: [],
  meter: [],
  navigation: [],
  region: ['aria-label'],
  search: [],
  status: [],
  timer: [],
  toolbar: [],
  tooltip: [],
};

/**
 * Return the required ARIA attributes for a given role.
 *
 * @param role - An ARIA role string.
 * @returns Array of required attribute names.
 */
export function requiredARIAAttrs(role: string): string[] {
  return requiredAttrsByRole[role] ?? [];
}

// ---------------------------------------------------------------------------
// ARIA Validation
// ---------------------------------------------------------------------------

/**
 * Check whether a tag has a given attribute (handles attribute without value).
 */
function hasAttr(tag: string, attr: string): boolean {
  const regex = new RegExp(`\\b${attr}\\b(?:\\s*=\\s*(?:"[^"]*"|'[^']*'|\\S+))?`, 'i');
  return regex.test(tag);
}

/**
 * Get the value of an attribute from a tag string.
 */
function getAttr(tag: string, attr: string): string | null {
  const regex = new RegExp(`${attr}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i');
  const match = tag.match(regex);
  return match ? (match[1] ?? match[2] ?? null) : null;
}

/** Check if a tag is focusable. */
function isFocusable(tag: string): boolean {
  const tagName = (tag.match(/^<(\w+)/) ?? ['', ''])[1].toLowerCase();
  const focusableTags = ['a', 'button', 'input', 'select', 'textarea', 'details', 'summary'];
  if (focusableTags.includes(tagName)) return true;
  if (hasAttr(tag, 'tabindex')) return true;
  return false;
}

/**
 * Validate an HTML string for common ARIA accessibility issues.
 *
 * Detects at least 10 categories of violations:
 *   1. Missing alt on <img>
 *   2. Empty alt on meaningful <img>
 *   3. Missing label on <input>
 *   4. Missing label on <textarea>
 *   5. Missing label on <select>
 *   6. Missing aria-expanded on toggle buttons
 *   7. Role without required attributes
 *   8. Invalid role
 *   9. aria-hidden on focusable elements
 *  10. Duplicate IDs
 *  11. Missing <label> for form controls
 *  12. Positive tabindex
 *  13. Missing lang attribute on <html>
 *  14. Empty heading elements
 *  15. <iframe> without title
 *
 * @param html - Raw HTML string to validate.
 * @returns Array of ARIA violations found.
 */
export function validateARIA(html: string): A11yViolation[] {
  const violations: A11yViolation[] = [];

  // 1. Missing alt on <img>
  const imgRegex = /<img\b[^>]*?>/gi;
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'alt') && !hasAttr(tag, 'role')) {
      violations.push({
        rule: 'img-alt-missing',
        severity: 'error',
        message: '<img> element is missing alt attribute. All images must have alternative text.',
        context: tag,
        suggestion: 'Add alt="description" for meaningful images or alt="" for decorative images.',
      });
    }
  }

  // 2. <img> with role="presentation" but missing alt=""
  const imgRoleRegex = /<img\b[^>]*?role\s*=\s*["']presentation["'][^>]*?>/gi;
  while ((match = imgRoleRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'alt')) {
      violations.push({
        rule: 'img-presentation-missing-alt',
        severity: 'warning',
        message: 'Decorative <img> with role="presentation" should include alt="" to be safe in all screen readers.',
        context: tag,
        suggestion: 'Add alt="" to explicitly mark as decorative.',
      });
    }
  }

  // 3. Missing label on <input> (no associated <label>, aria-label, or aria-labelledby)
  const inputRegex = /<input\b[^>]*?>/gi;
  while ((match = inputRegex.exec(html)) !== null) {
    const tag = match[0];
    const inputType = getAttr(tag, 'type')?.toLowerCase();
    const hiddenTypes = ['hidden', 'submit', 'reset', 'button', 'image'];
    if (hiddenTypes.includes(inputType ?? '')) continue;

    const id = getAttr(tag, 'id');
    const hasLabel = hasAttr(tag, 'aria-label') || hasAttr(tag, 'aria-labelledby') || hasAttr(tag, 'title');
    const hasAssociatedLabel = id && new RegExp(`<label[^>]*?for\\s*=\\s*["']${escapeRegex(id)}["']`, 'i').test(html);

    if (!hasLabel && !hasAssociatedLabel) {
      violations.push({
        rule: 'input-missing-label',
        severity: 'error',
        message: '<input> element has no associated <label>, aria-label, or aria-labelledby.',
        context: tag,
        suggestion: 'Add an associated <label>, aria-label, or aria-labelledby attribute.',
      });
    }
  }

  // 4. Missing label on <textarea>
  const textareaRegex = /<textarea\b[^>]*?>/gi;
  while ((match = textareaRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'aria-label') && !hasAttr(tag, 'aria-labelledby')) {
      violations.push({
        rule: 'textarea-missing-label',
        severity: 'error',
        message: '<textarea> element has no associated label or accessible name.',
        context: tag,
        suggestion: 'Add an aria-label or associate a <label> element.',
      });
    }
  }

  // 5. Missing label on <select>
  const selectRegex = /<select\b[^>]*?>/gi;
  while ((match = selectRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'aria-label') && !hasAttr(tag, 'aria-labelledby')) {
      violations.push({
        rule: 'select-missing-label',
        severity: 'error',
        message: '<select> element has no associated label or accessible name.',
        context: tag,
        suggestion: 'Add an aria-label or associate a <label> element.',
      });
    }
  }

  // 6. Missing aria-expanded on toggle buttons (buttons with aria-pressed or data-toggle)
  const toggleButtonRegex = /<button\b[^>]*?(?:aria-pressed|data-toggle|data-bs-toggle)[^>]*?>/gi;
  while ((match = toggleButtonRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'aria-expanded')) {
      violations.push({
        rule: 'button-toggle-missing-expanded',
        severity: 'warning',
        message: 'Toggle button is missing aria-expanded attribute.',
        context: tag,
        suggestion: 'Add aria-expanded="false" (closed) or aria-expanded="true" (open).',
      });
    }
  }

  // 7. Role without required attributes
  const roleAttrRegex = /role\s*=\s*["']([\w-]+)["']/gi;
  while ((match = roleAttrRegex.exec(html)) !== null) {
    const role = match[1];
    const required = requiredARIAAttrs(role);
    if (required.length > 0) {
      // Get the full tag context
      const tagStart = html.lastIndexOf('<', match.index);
      const tagEnd = html.indexOf('>', match.index);
      if (tagStart >= 0 && tagEnd > tagStart) {
        const tag = html.substring(tagStart, tagEnd + 1);
        const missing = required.filter((attr) => !hasAttr(tag, attr));
        if (missing.length > 0) {
          violations.push({
            rule: 'role-missing-required-attr',
            severity: 'error',
            message: `Role "${role}" is missing required ARIA attributes: ${missing.join(', ')}.`,
            context: tag,
            suggestion: `Add ${missing.map((a) => `${a}="..."`).join(', ')} to the element.`,
          });
        }
      }
    }
  }

  // 8. Invalid role
  const allRolesRegex = /role\s*=\s*["']([\w-]+)["']/gi;
  while ((match = allRolesRegex.exec(html)) !== null) {
    const role = match[1];
    if (!validRoles.includes(role)) {
      violations.push({
        rule: 'invalid-role',
        severity: 'error',
        message: `"${role}" is not a valid ARIA role.`,
        context: match[0],
        suggestion: `Use one of: ${validRoles.slice(0, 10).join(', ')}, ... (see WAI-ARIA 1.2).`,
      });
    }
  }

  // 9. aria-hidden on focusable elements
  const ariaHiddenRegex = /<(\w+)(?:\s[^>]*)?\saria-hidden\s*=\s*["'](?:true|yes)["'][^>]*?>/gi;
  while ((match = ariaHiddenRegex.exec(html)) !== null) {
    const tag = match[0];
    if (isFocusable(tag)) {
      violations.push({
        rule: 'aria-hidden-focusable',
        severity: 'error',
        message: 'Element has aria-hidden="true" but is focusable. Focusable elements must not be hidden from assistive technology.',
        context: tag,
        suggestion: 'Remove aria-hidden, or make the element non-focusable (remove tabindex, use role="presentation").',
      });
    }
  }

  // 10. Duplicate IDs
  const idRegex = /id\s*=\s*["']([^"']+)["']/gi;
  const idMap = new Map<string, number>();
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1];
    const count = (idMap.get(id) ?? 0) + 1;
    idMap.set(id, count);
  }
  for (const [id, count] of idMap) {
    if (count > 1) {
      violations.push({
        rule: 'duplicate-id',
        severity: 'error',
        message: `ID "${id}" is used ${count} times. IDs must be unique within a document.`,
        context: `id="${id}"`,
        suggestion: 'Make each ID unique, or use a class if styling is the purpose.',
      });
    }
  }

  // 11. Positive tabindex
  const tabindexRegex = /tabindex\s*=\s*["'](\+?\d+)["']/gi;
  while ((match = tabindexRegex.exec(html)) !== null) {
    const val = parseInt(match[1], 10);
    if (val > 0) {
      violations.push({
        rule: 'positive-tabindex',
        severity: 'warning',
        message: `tabindex="${val}" creates an unexpected tab order. Use tabindex="0" to add to natural order or tabindex="-1" for programmatic focus.`,
        context: match[0],
        suggestion: 'Replace with tabindex="0" and use DOM order to control sequence.',
      });
    }
  }

  // 12. Missing lang attribute on <html>
  const htmlTagRegex = /<html\b[^>]*?>/i;
  const htmlTagMatch = html.match(htmlTagRegex);
  if (htmlTagMatch && !hasAttr(htmlTagMatch[0], 'lang')) {
    violations.push({
      rule: 'html-missing-lang',
      severity: 'error',
      message: '<html> element is missing a lang attribute. Screen readers use this to select the correct pronunciation.',
      context: htmlTagMatch[0],
      suggestion: 'Add lang="en" (or the appropriate language code).',
    });
  }

  // 13. Empty heading elements
  const headingRegex = /<h([1-6])\b[^>]*?>\s*<\/h[1-6]>/gi;
  while ((match = headingRegex.exec(html)) !== null) {
    violations.push({
      rule: 'empty-heading',
      severity: 'warning',
      message: `Empty <h${match[1]}> element found. Headings should contain descriptive text for screen reader navigation.`,
      context: match[0],
      suggestion: 'Add meaningful text content to the heading, or remove the empty heading.',
    });
  }

  // 14. <iframe> without title
  const iframeRegex = /<iframe\b[^>]*?>/gi;
  while ((match = iframeRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'title') && !hasAttr(tag, 'aria-label')) {
      violations.push({
        rule: 'iframe-missing-title',
        severity: 'error',
        message: '<iframe> element is missing a title attribute. Screen readers use this to describe the embedded content.',
        context: tag,
        suggestion: 'Add a descriptive title attribute, e.g. title="Navigation menu".',
      });
    }
  }

  // 15. <a> without href
  const aNoHrefRegex = /<a\b(?![^>]*?href\s*=)[^>]*?>/gi;
  while ((match = aNoHrefRegex.exec(html)) !== null) {
    const tag = match[0];
    if (!hasAttr(tag, 'role')) {
      violations.push({
        rule: 'anchor-no-href',
        severity: 'warning',
        message: '<a> element without href attribute. This creates a placeholder link that is not focusable in all browsers.',
        context: tag,
        suggestion: 'Add href="url" or role="button" if it acts as a button.',
      });
    }
  }

  return violations;
}

/** Escape special regex characters in a string. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// ARIA Helper CSS (development visualization)
// ---------------------------------------------------------------------------

/**
 * Generate CSS that helps visualize ARIA attributes during development.
 *
 * These styles add visual indicators for ARIA roles and states, making it
 * easier for developers to see the accessibility structure. Intended for
 * development only — include behind a feature flag or dev-only build.
 *
 * @returns CSS string.
 */
export function generateARIAHelperCSS(): string {
  return `
/* ===== Ferrum A11y — ARIA Development Helpers ===== */
/* WARNING: These styles are for development only.
   They add visual indicators for ARIA attributes. */

/* Show role attributes as a small badge */
[data-role]::after,
[role]::after {
  content: "role: " attr(role);
  position: absolute;
  top: -1.25rem;
  left: 0;
  font-size: 0.625rem;
  line-height: 1;
  padding: 0.125rem 0.375rem;
  background: #6366f1;
  color: #fff;
  border-radius: 0.25rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  font-family: monospace;
}

/* Highlight elements with aria-hidden */
[aria-hidden="true"] {
  outline: 2px dashed #f59e0b !important;
  opacity: 0.6;
}

/* Show aria-expanded state */
[aria-expanded="true"] {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.5);
}

[aria-expanded="false"] {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5);
}

/* Show aria-selected state */
[aria-selected="true"] {
  background-color: rgba(34, 197, 94, 0.15) !important;
}

[aria-selected="false"] {
  background-color: rgba(239, 68, 68, 0.1) !important;
}

/* Show aria-checked state */
[aria-checked="true"] {
  box-shadow: inset 0 0 0 4px rgba(34, 197, 94, 0.4);
}

/* Highlight aria-current */
[aria-current] {
  text-decoration-thickness: 3px;
  text-decoration-color: #f59e0b;
}

/* Show aria-live regions */
[aria-live] {
  outline: 2px dotted #8b5cf6 !important;
}

[aria-live="polite"]::before {
  content: "live: polite";
  display: block;
  font-size: 0.5rem;
  color: #8b5cf6;
  font-family: monospace;
}

[aria-live="assertive"]::before {
  content: "live: assertive";
  display: block;
  font-size: 0.5rem;
  color: #ef4444;
  font-family: monospace;
  font-weight: bold;
}

/* Highlight invalid aria attributes (dev only) */
[data-invalid="true"] {
  outline: 2px solid #ef4444 !important;
  background-color: rgba(239, 68, 68, 0.05);
}

/* Show tabindex values */
[tabindex]::before {
  content: "tab:" attr(tabindex);
  display: block;
  font-size: 0.5rem;
  color: #06b6d4;
  font-family: monospace;
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #06b6d4;
  color: #fff;
  padding: 0.0625rem 0.25rem;
  border-radius: 0.25rem;
  z-index: 9999;
  pointer-events: none;
}

/* Show aria-label text */
[aria-label]::after {
  content: "🏷 " attr(aria-label);
  display: block;
  font-size: 0.5rem;
  color: #059669;
  font-family: monospace;
  position: absolute;
  bottom: -1.25rem;
  left: 0;
  background: #059669;
  color: #fff;
  padding: 0.0625rem 0.25rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
}`.trim();
}