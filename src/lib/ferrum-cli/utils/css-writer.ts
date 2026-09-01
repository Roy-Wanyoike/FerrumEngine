/**
 * Ferrum CLI — CSS output utilities
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { FerrumCSSEffect } from '../../types';

export function generateEffectCSS(effects: FerrumCSSEffect[]): string {
  const parts: string[] = [
    '/* ============================================ */',
    '/* FerrumEngine — Generated Effects CSS       */',
    `/* Effects: ${effects.length}                           */`,
    '/* ============================================ */',
    '',
  ];

  for (const effect of effects) {
    parts.push(`/* ${effect.name} [${effect.category}] */`);
    parts.push(effect.css);
    parts.push('');
  }

  return parts.join('\n');
}

export function minifyCSS(css: string): string {
  return (
    css
      // Remove block comments
      .replace(/\/\*[^]*?\*\//g, '')
      // Collapse whitespace (excluding newlines inside strings)
      .replace(/\s+/g, ' ')
      // Remove spaces around { } : ; ,
      .replace(/\s*\{\s*/g, '{')
      .replace(/\s*\}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',')
      // Remove leading space
      .trim()
  );
}

export async function writeOutputFile(content: string, filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}
