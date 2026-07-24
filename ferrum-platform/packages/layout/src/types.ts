export interface LayoutConfig {
  prefix?: string;
  minify?: boolean;
}

export interface LayoutDefinition {
  name: string;
  description: string;
  generateCSS: (prefix: string) => string;
}