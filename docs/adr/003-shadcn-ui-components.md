# ADR-003: shadcn/ui as Component Primitive Library

## Status
Accepted

## Context

The platform needs a consistent set of UI primitives (Button, Badge, Card, Input, Table, etc.) that:

- Follow accessible patterns (ARIA attributes, keyboard navigation, focus management).
- Support dark mode and theme customization.
- Are customizable — not opinionated about visual design.
- Minimize bundle size.

We evaluated:

1. **shadcn/ui**: Copy-paste component primitives built on Radix UI. Components live in the project's codebase, not in `node_modules`. Fully customizable, tree-shaken by default.

2. **Radix UI directly**: Lower-level primitives with full accessibility. Requires more composition work for each component. Larger API surface to learn.

3. **Headless UI**: Similar to Radix but from the Tailwind Labs team. Fewer components available.

4. **Custom from scratch**: Full control but high maintenance burden for accessibility, keyboard handling, and focus management.

## Decision

We use **shadcn/ui** as the component primitive library:

- Components are copied into `src/components/ui/` and owned by the project.
- Components use Radix UI under the hood where needed (Label uses `@radix-ui/react-label`, Button uses `@radix-ui/react-slot` for `asChild`).
- Styling is done via Tailwind CSS utility classes, making them fully theme-compatible.
- We selectively simplify some components (e.g., Tooltip uses CSS-only positioning instead of Radix, Select uses a native `<select>` wrapper instead of Radix Select) to reduce bundle size.

## Consequences

### Positive
- **Full ownership**: Components are source code in the project, not an opaque dependency. Any customization is a direct edit.
- **No version conflicts**: Since components are copied, there's no risk of breaking changes from upstream package updates.
- **Tree-shaking by default**: Each component is imported individually from `@/components/ui/*`.
- **Accessibility built-in**: Radix primitives provide correct ARIA attributes, keyboard navigation, and focus management.
- **Tailwind-native**: Styling matches the rest of the codebase.

### Negative
- **Manual updates**: When shadcn/ui publishes improvements or bug fixes, we must manually re-copy and diff the affected components.
- **Radix dependency**: Some components still depend on `@radix-ui/react-slot` and `@radix-ui/react-label`, adding to `node_modules`.
- **Simplification trade-offs**: Our custom Select (native `<select>`) and Tooltip (CSS-only) sacrifice some features (animated positioning, virtual scrolling) for bundle size. These trade-offs are documented per-component.
- **No type-safe theming**: Unlike styled-components or CSS-in-JS, Tailwind classes are strings — no compile-time guarantee that theme tokens exist.