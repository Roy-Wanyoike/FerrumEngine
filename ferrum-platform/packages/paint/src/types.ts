// ─── Paint API Types ───────────────────────────────────────────────────────────

/** Descriptor for a registered paint worklet. */
export interface PaintWorkletDescriptor {
  /** Unique name registered via registerPaint(). */
  readonly name: string;
  /** CSS custom properties this worklet reads. */
  readonly inputProperties: readonly string[];
  /** CSS class name (e.g. `.fr-glow`). */
  readonly cssClass: string;
  /** Fallback CSS for non-Houdini browsers. */
  readonly fallbackCSS: string;
  /** Full JS source code for the paint worklet (registerPaint call). */
  readonly workletCode: string;
}

/** Options for generating the CSS registration + fallback styles. */
export interface PaintRegistrationOptions {
  /** Base URL where worklet JS files are served. */
  workletBaseURL?: string;
  /** CSS class prefix. Default: "fr" */
  prefix?: string;
  /** Whether to include progressive-enhancement fallback CSS. Default: true */
  includeFallbacks?: boolean;
}

/** A generated paint registration block. */
export interface PaintRegistration {
  /** JavaScript snippet to register worklets. */
  registrationJS: string;
  /** CSS with paint() functions and fallbacks. */
  css: string;
}