// ─── @scope Utilities ─────────────────────────────────
// CSS @scope (Chrome 118+) for scoped styles without Shadow DOM.

import type { ModernCSSConfig } from "./types";

/**
 * Generate @scope utility classes for component scoping.
 */
export function generateScopeCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS @scope Utilities
   Scope styles to a subtree without Shadow DOM.
   Chrome 118+.
   ═══════════════════════════════════════════════════ */

@layer ferrum.utilities {
  /* ─── 1. Card scope — styles are scoped to .fr-scope-card ─── */
  @scope (.${p}-scope-card) {
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--fr-colors-gray-600, #4b5563);
    }

    .${p}-card-action {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
    }
  }

  /* ─── 2. Form scope ─── */
  @scope (.${p}-scope-form) {
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    input, textarea, select {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--fr-colors-gray-300, #d1d5db);
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--fr-colors-primary-500, #6366f1);
      box-shadow: 0 0 0 3px var(--fr-colors-primary-100, rgba(99,102,241,0.15));
    }

    .${p}-form-error input,
    .${p}-form-error textarea {
      border-color: var(--fr-colors-red-500, #ef4444);
    }
  }

  /* ─── 3. Table scope ─── */
  @scope (.${p}-scope-table) {
    th {
      text-align: left;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--fr-colors-gray-500, #6b7280);
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--fr-colors-gray-200, #e5e7eb);
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--fr-colors-gray-100, #f3f4f6);
      font-size: 0.875rem;
    }

    tr:hover td {
      background: var(--fr-colors-gray-50, #f9fafb);
    }
  }

  /* ─── 4. Prose/Content scope (for docs, articles) ─── */
  @scope (.${p}-scope-prose) {
    h1 { font-size: 2rem; font-weight: 700; line-height: 1.2; margin: 1.5rem 0 1rem; }
    h2 { font-size: 1.5rem; font-weight: 600; line-height: 1.3; margin: 1.5rem 0 0.75rem; }
    h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; margin: 1.25rem 0 0.5rem; }
    p { margin: 0.75rem 0; line-height: 1.75; }
    ul, ol { padding-left: 1.5rem; margin: 0.75rem 0; }
    li { margin: 0.25rem 0; line-height: 1.6; }
    code {
      font-size: 0.875em;
      padding: 0.15em 0.35em;
      background: var(--fr-colors-gray-100, #f3f4f6);
      border-radius: 0.25rem;
    }
    pre {
      padding: 1rem;
      background: var(--fr-colors-gray-900, #111827);
      color: var(--fr-colors-gray-100, #f3f4f6);
      border-radius: 0.5rem;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.7;
    }
    pre code {
      background: none;
      padding: 0;
    }
    blockquote {
      border-left: 3px solid var(--fr-colors-primary-300, rgba(99,102,241,0.4));
      padding-left: 1rem;
      font-style: italic;
      color: var(--fr-colors-gray-600, #4b5563);
    }
    a {
      color: var(--fr-colors-primary-600, #4f46e5);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    a:hover { color: var(--fr-colors-primary-800, #3730a3); }
    img { border-radius: 0.5rem; max-width: 100%; }
    hr { border: none; border-top: 1px solid var(--fr-colors-gray-200, #e5e7eb); margin: 1.5rem 0; }
  }
}`.trim();
}