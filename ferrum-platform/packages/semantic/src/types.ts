// ─── Semantic Component Contract System ─────────────────────────────────────
// Deliverable #6: Component Contract System & Deliverable #7: Semantic CSS

/**
 * A semantic component definition — the full contract for a UI component.
 * Each component declares its slots, variants, states, accessibility
 * requirements, token dependencies, and the CSS that implements it.
 */
export interface SemanticComponent {
  /** Unique machine-readable name (e.g. "hero", "pricing-card") */
  name: string;
  /** Root CSS class name (e.g. "fr-hero") */
  className: string;
  /** Human-readable description */
  description: string;
  /** Named content areas consumers must/can fill */
  slots: SemanticSlot[];
  /** Visual / layout alternatives */
  variants: Record<string, SemanticVariant>;
  /** Interactive or conditional states */
  states: SemanticState[];
  /** Accessibility contract */
  accessibility: SemanticA11y;
  /** CSS custom properties this component reads (token mapping) */
  tokens: Record<string, string>;
  /** Base CSS for this component (without variants/states) */
  css: string;
}

/**
 * A named content area within a component.
 * Slots define the contract between component authors and consumers.
 */
export interface SemanticSlot {
  /** Machine-readable slot name */
  name: string;
  /** What content is expected */
  description: string;
  /** Whether the slot must be filled */
  required: boolean;
  /** CSS selector for the slot element */
  selector: string;
}

/**
 * A visual variant of a component.
 * Variants are mutually exclusive style alternatives.
 */
export interface SemanticVariant {
  /** CSS class name appended to root (e.g. "fr-hero--centered") */
  className: string;
  /** CSS rules for this variant */
  css: string;
  /** Human-readable description */
  description: string;
}

/**
 * An interactive or conditional state of a component.
 * States are orthogonal to variants and can combine with any variant.
 */
export interface SemanticState {
  /** State name (hover, focus, active, disabled, loading, error, etc.) */
  name: string;
  /** CSS selector for the state (e.g. ".fr-hero:hover") */
  selector: string;
  /** CSS rules applied in this state */
  css: string;
}

/**
 * Accessibility contract for a component.
 * Declares ARIA expectations and keyboard interaction patterns.
 */
export interface SemanticA11y {
  /** ARIA role, if applicable */
  role?: string;
  /** Required/expected ARIA attributes */
  ariaAttributes?: Record<string, string>;
  /** Description of expected keyboard interaction */
  keyboardInteraction?: string;
  /** Screen reader announcement text */
  screenReaderText?: string;
}

/**
 * Configuration for the semantic CSS generator.
 */
export interface SemanticConfig {
  /** Class name prefix — defaults to "fr" */
  prefix?: string;
  /** Only include these components (null/undefined = all) */
  includeComponents?: string[];
  /** Override or extend theme token values */
  themeTokens?: Record<string, string>;
  /** Minify the generated CSS output */
  minify?: boolean;
}

/**
 * A registered component in the component registry.
 */
export interface RegisteredComponent {
  component: SemanticComponent;
  /** When the component was registered */
  registeredAt: number;
}

/** Type guard: check if a value is a SemanticComponent */
export function isSemanticComponent(value: unknown): value is SemanticComponent {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.name === "string" &&
    typeof obj.className === "string" &&
    typeof obj.css === "string" &&
    Array.isArray(obj.slots) &&
    typeof obj.variants === "object" &&
    obj.variants !== null &&
    Array.isArray(obj.states)
  );
}