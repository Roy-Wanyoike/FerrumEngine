// ─── Modern CSS Types ─────────────────────────────────────────────

export interface ModernCSSConfig {
  prefix?: string;
  containerNames?: string[];
  includeScrollDriven?: boolean;
  includeAnchorPositioning?: boolean;
  includeViewTransitions?: boolean;
  includeScope?: boolean;
  minify?: boolean;
}

export interface CascadeLayerOrder {
  reset: string;
  base: string;
  tokens: string;
  utilities: string;
  components: string;
  layouts: string;
  semantic: string;
  paint: string;
  overrides: string;
}