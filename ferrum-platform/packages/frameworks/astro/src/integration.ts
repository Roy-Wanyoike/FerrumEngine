// @ts-nocheck — Astro types are a peer dependency

import type { AstroIntegration } from 'astro';

/**
 * FerrumCSS Astro integration.
 * Adds client directives and injects token CSS variables.
 */
export function ferrumIntegration(): AstroIntegration {
  return {
    name: '@ferrum/astro',
    hooks: {
      'astro:config:setup'(setupOptions: Record<string, any>) {
        const { addClientDirectives } = setupOptions as any;
        if (!addClientDirectives) return;
        // Register client:* directives for Ferrum motion
        addClientDirectives({
          name: 'ferrum-motion',
          entry: '@ferrum/astro/client-directives.js',
        });
      },
    },
  };
}

/**
 * Client directive names exported for reference.
 */
export const FERRUM_DIRECTIVES = {
  motion: 'client:ferrum-motion',
} as const;