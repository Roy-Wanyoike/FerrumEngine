import type { SemanticComponent } from "../types";

/**
 * Data Table — full-featured data table.
 * Slots: header, body, footer, pagination
 * Variants: default, striped, compact, bordered
 * States: loading, empty, sortable
 */
export const dataTableComponent: SemanticComponent = {
  name: "data-table",
  className: "fr-data-table",
  description:
    "Full-featured data table with sticky header, zebra striping, responsive scroll, and loading/empty states.",
  slots: [
    {
      name: "header",
      description: "Table header / column titles",
      required: true,
      selector: ".fr-data-table__header",
    },
    {
      name: "body",
      description: "Table body rows",
      required: true,
      selector: ".fr-data-table__body",
    },
    {
      name: "footer",
      description: "Summary or totals row",
      required: false,
      selector: ".fr-data-table__footer",
    },
    {
      name: "pagination",
      description: "Pagination controls",
      required: false,
      selector: ".fr-data-table__pagination",
    },
  ],
  variants: {
    default: {
      className: "fr-data-table--default",
      description: "Clean default table style",
      css: `
.fr-data-table--default {
  border: 1px solid var(--fr-color-gray-200, #e5e7eb);
}`,
    },
    striped: {
      className: "fr-data-table--striped",
      description: "Alternating row background colors",
      css: `
.fr-data-table--striped tbody tr:nth-child(even) {
  background-color: var(--fr-color-gray-50, #f9fafb);
}`,
    },
    compact: {
      className: "fr-data-table--compact",
      description: "Reduced cell padding for dense data",
      css: `
.fr-data-table--compact th,
.fr-data-table--compact td {
  padding: var(--fr-spacing-2, 0.5rem) var(--fr-spacing-3, 0.75rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
}`,
    },
    bordered: {
      className: "fr-data-table--bordered",
      description: "Borders on all cells",
      css: `
.fr-data-table--bordered th,
.fr-data-table--bordered td {
  border: 1px solid var(--fr-color-gray-200, #e5e7eb);
}`,
    },
  },
  states: [
    {
      name: "loading",
      selector: ".fr-data-table--loading",
      css: `
.fr-data-table--loading .fr-data-table__body {
  opacity: 0.5;
  pointer-events: none;
}
.fr-data-table--loading .fr-data-table__body::after {
  content: "Loading data…";
  display: block;
  text-align: center;
  padding: var(--fr-spacing-8, 2rem);
  color: var(--fr-color-gray-400, #9ca3af);
}`,
    },
    {
      name: "empty",
      selector: ".fr-data-table--empty .fr-data-table__body",
      css: `
.fr-data-table--empty .fr-data-table__body {
  text-align: center;
  color: var(--fr-color-gray-400, #9ca3af);
  padding: var(--fr-spacing-12, 3rem) var(--fr-spacing-6, 1.5rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
}`,
    },
    {
      name: "sortable",
      selector: ".fr-data-table__header [data-sortable]",
      css: `
.fr-data-table__header [data-sortable] {
  cursor: pointer;
  user-select: none;
  position: relative;
}
.fr-data-table__header [data-sortable]:hover {
  background-color: var(--fr-color-gray-100, #f3f4f6);
}
.fr-data-table__header [data-sortable]::after {
  content: "↕";
  margin-left: var(--fr-spacing-1, 0.25rem);
  opacity: 0.4;
  font-size: var(--fr-font-size-xs, 0.75rem);
}
.fr-data-table__header [data-sortable]:hover::after {
  opacity: 0.7;
}
.fr-data-table__header [data-sort="asc"]::after {
  content: "↑";
  opacity: 1;
}
.fr-data-table__header [data-sort="desc"]::after {
  content: "↓";
  opacity: 1;
}`,
    },
  ],
  accessibility: {
    role: undefined,
    ariaAttributes: {
      "aria-label": "Data table",
      "aria-describedby": "[optional description id]",
      "aria-sort": "[on sortable headers: ascending|descending|none]",
      "aria-busy": "[true when loading]",
    },
    keyboardInteraction:
      "Tab to navigate between interactive elements. Sortable headers activated with Enter/Space.",
    screenReaderText: "Data table",
  },
  tokens: {
    "--fr-table-bg": "Table background",
    "--fr-table-header-bg": "Header row background",
    "--fr-table-border": "Table border color",
    "--fr-table-hover-bg": "Row hover background",
  },
  css: `
/* ── Data Table ───────────────────────────────────────────── */
.fr-data-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--fr-table-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-radius-lg, 0.5rem);
  background-color: var(--fr-table-bg, var(--fr-color-white, #ffffff));
}

.fr-data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fr-font-size-sm, 0.875rem);
  line-height: var(--fr-line-height-normal, 1.5);
}

.fr-data-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.fr-data-table th {
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-4, 1rem);
  text-align: left;
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-600, #4b5563);
  background-color: var(--fr-table-header-bg, var(--fr-color-gray-50, #f9fafb));
  border-bottom: 2px solid var(--fr-color-gray-200, #e5e7eb);
  white-space: nowrap;
}

.fr-data-table td {
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-4, 1rem);
  color: var(--fr-color-gray-700, #374151);
  border-bottom: 1px solid var(--fr-color-gray-100, #f3f4f6);
  vertical-align: top;
}

.fr-data-table tbody tr {
  transition: background-color 0.1s ease;
}

.fr-data-table tbody tr:hover {
  background-color: var(--fr-table-hover-bg, var(--fr-color-gray-50, #f9fafb));
}

.fr-data-table tbody tr:last-child td {
  border-bottom: none;
}

.fr-data-table__header {
  /* empty — th styling on .fr-data-table th */
}

.fr-data-table__body {
  /* empty — td styling on .fr-data-table td */
}

.fr-data-table__footer td {
  font-weight: var(--fr-font-weight-semibold, 600);
  background-color: var(--fr-color-gray-50, #f9fafb);
  border-top: 2px solid var(--fr-color-gray-200, #e5e7eb);
  border-bottom: none;
}

.fr-data-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-4, 1rem);
  border-top: 1px solid var(--fr-color-gray-200, #e5e7eb);
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-500, #6b7280);
}

.fr-data-table__pagination nav {
  display: flex;
  gap: var(--fr-spacing-1, 0.25rem);
}

@media (prefers-color-scheme: dark) {
  .fr-data-table-wrapper {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-data-table th {
    background-color: var(--fr-color-gray-900, #111827);
    color: var(--fr-color-gray-300, #d1d5db);
    border-bottom-color: var(--fr-color-gray-700, #374151);
  }
  .fr-data-table td {
    color: var(--fr-color-gray-300, #d1d5db);
    border-bottom-color: var(--fr-color-gray-700, #374151);
  }
  .fr-data-table tbody tr:hover {
    background-color: var(--fr-color-gray-700, #374151);
  }
}`,
};