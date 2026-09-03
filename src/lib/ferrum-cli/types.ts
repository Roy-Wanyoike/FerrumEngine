/**
 * Ferrum CLI — Type definitions
 */

export interface CLIConfig {
  output: string;
  format: 'css' | 'json';
  minify: boolean;
  categories: string[];
  effects: string[];
  tokens: boolean;
  verbose: boolean;
}

export interface BuildCommandOptions extends CLIConfig {
  input?: string;
  output: string;
}

export interface InitCommandOptions {
  template: 'basic' | 'full';
  typescript: boolean;
  tailwind: boolean;
  dest: string;
}

export interface ListCommandOptions {
  category?: string;
  format: 'table' | 'json';
  json: boolean;
  verbose: boolean;
}

export interface EffectInfo {
  name: string;
  category: string;
  displayType: string;
  cssVariables: string[];
  description: string;
}

export interface BuildResult {
  outputPath: string;
  effectCount: number;
  totalSize: number;
  categories: string[];
}
