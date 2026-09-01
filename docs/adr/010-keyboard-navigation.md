# ADR-010: Mega Menu Keyboard Navigation

## Status
Accepted

## Context

FerrumEngine's navigation includes mega menus that display grouped links and actions in large dropdown panels. These menus must be fully operable via keyboard to meet WCAG 2.1 AA criteria (2.1.1 Keyboard, 2.4.7 Focus Visible, 2.4.3 Focus Order, 4.1.2 Name, Role, Value).

The WAI-ARIA Menu pattern ([`menu` / `menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)) specifies how keyboard navigation should work for menu widgets. We need to support:

- Opening/closing the menu panel
- Navigating between items within the panel
- Cycling between sibling mega menus
- Preventing focus from escaping the panel (focus trap)
- Activating items via keyboard

## Decision

### Architecture: Two-Handler Split

Keyboard handling is split into two separate handlers to avoid ambiguity and keep each handler's responsibility clear:

1. **Trigger keydown handler** (`handleTriggerKeyDown`) — attached to the `<button>` that opens the panel. Handles:
   - `ArrowDown` — opens the panel (or moves focus into it if already open)
   - `ArrowLeft` / `ArrowRight` — cycles focus between sibling mega menu triggers (only when this panel is closed)

2. **Panel keydown handler** (`handlePanelKeyDown`) — attached to the panel `<div>`. Handles:
   - `ArrowDown` / `ArrowUp` — moves focus to the next/previous interactive element (wraps at boundaries)
   - `Home` / `End` — jumps to the first/last interactive element
   - `Space` — activates the currently focused item (needed because `<a>` elements don't respond to Space)
   - `ArrowLeft` / `ArrowRight` — switches to the adjacent mega menu panel

3. **Focus trap** (`useFocusTrap` hook) — document-level listener that handles:
   - `Tab` / `Shift+Tab` — wraps focus between the first and last focusable elements inside the container
   - `Escape` — calls the provided `onEscape` callback (closes the menu and refocuses the trigger)

### Key Bindings Summary

| Key | Context | Action |
|---|---|---|
| `ArrowDown` | Trigger (closed) | Open panel; auto-focus first item |
| `ArrowDown` | Trigger (open) | Move focus into panel's first item |
| `ArrowDown` | Panel | Move focus to next interactive element (wraps) |
| `ArrowUp` | Panel | Move focus to previous interactive element (wraps) |
| `ArrowLeft` | Trigger (closed) | Focus previous sibling mega menu trigger |
| `ArrowLeft` | Panel | Switch to previous mega menu panel |
| `ArrowRight` | Trigger (closed) | Focus next sibling mega menu trigger |
| `ArrowRight` | Panel | Switch to next mega menu panel |
| `Home` | Panel | Focus first interactive element |
| `End` | Panel | Focus last interactive element |
| `Space` | Panel | Activate focused menuitem (click) |
| `Escape` | Panel (focus trap) | Close panel, refocus trigger button |
| `Tab` / `Shift+Tab` | Panel (focus trap) | Wrap focus within panel |

### Focus Trap Implementation

The `useFocusTrap` hook (`src/hooks/use-focus-trap.ts`) is a reusable React hook that:

- Accepts a `containerRef`, an `isOpen` boolean, and an optional `onEscape` callback
- When `isOpen` is true, attaches a document-level `keydown` listener
- For `Tab` / `Shift+Tab`: queries all focusable elements within the container using the selector `button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])`, then wraps focus from last→first or first→last
- For `Escape`: calls the provided callback
- Automatically cleans up the listener when `isOpen` becomes false or the component unmounts

The hook is intentionally generic and not coupled to the mega menu — it can be reused for modals, sidebars, and any other focus-trapping container.

### Auto-Focus on Open

When the mega menu panel opens, a `useEffect` with `requestAnimationFrame` focuses the first interactive element inside the panel. The `requestAnimationFrame` wrapper ensures the DOM has been painted before attempting to set focus, avoiding race conditions with React's rendering cycle.

### ARIA Attributes

| Attribute | Element | Value | Purpose |
|---|---|---|---|
| `aria-expanded` | Trigger `<button>` | `true` / `false` | Indicates whether the menu panel is open |
| `aria-haspopup` | Trigger `<button>` | `"true"` | Signals the button controls a popup menu |
| `aria-controls` | Trigger `<button>` | `"mega-menu-panel-{menuId}"` | Associates the button with its panel by ID |
| `role="menu"` | Panel grid `<div>` | — | Identifies the container as a menu widget |
| `aria-label` | Panel grid `<div>` | `"{menuId} menu"` | Provides an accessible name for the menu |
| `role="menuitem"` | Item `<button>` and `<a>` | — | Identifies each interactive item as a menu item |
| `role="presentation"` | Group `<div>` | — | Removes semantic meaning from the visual grouping container |
| `aria-disabled` | Static item `<div>` | `"true"` | Marks non-interactive items |
| `aria-hidden="true"` | Invisible spacer `<div>` | — | Hides the 8px gap spacer from assistive technology |

### Cycling Between Sibling Menus

The `cycleMenuIdx` utility function computes the next/previous index in a circular manner: `(currentIdx + direction + total) % total`. This enables wrapping from the last menu back to the first (and vice versa).

When ArrowLeft/ArrowRight is pressed on a closed trigger, `focusSiblingTrigger` queries the DOM for the target trigger button using the `[aria-controls="mega-menu-panel-{targetMenuId}"]` selector and calls `.focus()` on it.

When ArrowLeft/ArrowRight is pressed inside an open panel, `onMenuEnter(targetMenuId)` is called, which switches the active menu. The new panel's auto-focus effect then moves focus to its first item.

## Consequences

### Positive
- **Full keyboard operability**: All mega menu functionality is accessible without a mouse
- **WCAG 2.1 AA compliance**: Meets keyboard, focus management, and ARIA requirements
- **Reusable focus trap**: `useFocusTrap` can be shared across modals, drawers, and other overlay components
- **Clean separation**: The trigger handler and panel handler have distinct responsibilities, making the code easier to reason about and test
- **Consistent with WAI-ARIA**: The key bindings follow the WAI-ARIA Menu/menubar pattern closely

### Negative
- **Document-level listener**: The focus trap uses a document-level `keydown` listener, which is a common pattern but adds a global listener when the menu is open
- **DOM queries for sibling navigation**: `focusSiblingTrigger` queries the DOM directly. This is necessary because sibling trigger components don't share a parent state reference for focus management
- **`requestAnimationFrame` timing**: Auto-focus uses `requestAnimationFrame` to avoid race conditions, adding a single-frame delay before focus moves to the first item

## Related
- Source: `src/components/ferrum/nav-mega-menu.tsx`
- Focus trap: `src/hooks/use-focus-trap.ts`
- A11y utilities: `src/lib/ferrum-a11y/keyboard.ts`, `src/lib/ferrum-a11y/focus.ts`
- Task: T-C04 (Mega Menu Keyboard Navigation)
