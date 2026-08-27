// ===== Ferrum A11y — Keyboard Navigation Helpers =====
//
// CSS utilities for keyboard interaction patterns including
// focus traps, roving tabindex, and tab order management.
//
// ARIA Keyboard Interaction Patterns (reference):
// -----------------------------------------------
// Most ARIA widget roles require specific keyboard interactions:
//
// **Roving Tabindex** (toolbar, tablist, menu, menubar, radiogroup, tree):
//   - Tab: moves focus to the next widget / out of the group.
//   - Arrow keys: move focus / selection within the group.
//   - Home / End: move to first / last item.
//   - Only one item in the group has tabindex="0"; others have tabindex="-1".
//
// **Grid / Treegrid**:
//   - Arrow keys: navigate cells.
//   - Page Up / Down: scroll rows.
//   - Home / End: first / last cell in row.
//   - Ctrl + Home / End: first / last cell in grid.
//
// **Combobox**:
//   - Down Arrow: open dropdown, move focus.
//   - Up Arrow: close dropdown, move focus.
//   - Enter: select focused option.
//   - Escape: close dropdown.
//
// **Dialog / Alertdialog**:
//   - Tab: moves focus to next focusable element inside dialog.
//   - Shift + Tab: moves focus to previous.
//   - Escape: closes the dialog.
//
// **Accordion**:
//   - Enter / Space: toggle panel.
//   - Tab: next focusable element.
//
// **Listbox**:
//   - Arrow keys: move selection.
//   - Home / End: first / last option.
//   - Enter: select option.
//
// **Slider**:
//   - Arrow keys: adjust value.
//   - Home / End: min / max value.
//   - Page Up / Down: larger increments.
//
// **Spinbutton**:
//   - Arrow Up / Down: increment / decrement.
//   - Home / End: min / max.

/**
 * Generate CSS for keyboard interaction patterns.
 *
 * @returns CSS string with focus trap, roving tabindex, and keyboard nav utilities.
 */
export function generateKeyboardCSS(): string {
  return `
/* ===== Ferrum A11y — Keyboard Navigation ===== */

/* ---- Focus Trap ---- */
/* Applied to a container that traps focus when active (e.g. modals).
   JS must manage the actual trapping logic; these styles provide
   visual indication and prevent interaction with outside content. */
.fr-focus-trap {
  isolation: isolate;
}

.fr-focus-trap[aria-hidden="true"] {
  display: none;
}

/* Visual indicator that focus is trapped */
.fr-focus-trap::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  pointer-events: auto;
}

/* ---- Roving Tabindex Pattern ---- */
/* The container for a roving tabindex group (toolbar, tablist, etc.) */
.fr-keyboard-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}

/* Items in a roving tabindex group */
.fr-keyboard-nav > [role="tab"],
.fr-keyboard-nav > [role="menuitem"],
.fr-keyboard-nav > [role="radio"],
.fr-keyboard-nav > [role="treeitem"],
.fr-keyboard-nav > [role="option"] {
  cursor: pointer;
}

/* Active (focused) item in a roving tabindex group */
.fr-keyboard-nav > [aria-selected="true"],
.fr-keyboard-nav > [aria-checked="true"] {
  font-weight: 600;
}

/* ---- Tab Order Utilities ---- */
/* Remove from tab order entirely */
.fr-tab-none {
  tabindex: -1;
}

/* Add to tab order (positive tabindex is valid but discouraged) */
.fr-tab-order-1 { z-index: 1; }

/* Ensure element is focusable programmatically but not via Tab */
.fr-tab-focusable {
  outline: none;
}

.fr-tab-focusable:focus-visible {
  outline: var(--fr-focus-width, 3px) solid var(--fr-focus-color, currentColor);
  outline-offset: var(--fr-focus-offset, 2px);
}

/* ---- Keyboard Indicator ---- */
/* Show a visual indicator when keyboard navigation is active.
   Applied via JS when the first keyboard event is detected. */
[data-fr-keyboard="true"] *:focus-visible {
  outline: var(--fr-focus-width, 3px) solid var(--fr-focus-color, currentColor);
  outline-offset: var(--fr-focus-offset, 2px);
}

/* ---- Focus Management Utilities ---- */
/* Return focus to a specific element when a region changes */
[data-fr-return-focus] {
  scroll-margin-top: 1rem;
}

/* Mark an element as the initial focus target in a container */
[data-fr-autofocus]:focus {
  outline: var(--fr-focus-width, 3px) solid var(--fr-focus-color, currentColor);
  outline-offset: var(--fr-focus-offset, 2px);
}

/* ---- Accessible Hide for Keyboard ---- */
/* Hide an element visually but keep it focusable for keyboard users */
.fr-keyboard-only {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}

.fr-keyboard-only:focus {
  position: fixed;
  top: 0;
  left: 0;
  clip: auto;
  clip-path: none;
  width: auto;
  height: auto;
  overflow: visible;
  white-space: normal;
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: #fff;
}`.trim();
}