/**
 * Ferrum CLI — Info command
 */

import { effects as allEffects } from '../../ferrum-effects-data';
import { categories } from '../../ferrum-effects-index';
import { info } from '../utils/formatting';

export function printInfo(): void {
  const effectCount = allEffects.length;
  const categoryCount = categories.length;
  const totalCSSSize = allEffects.reduce((acc, e) => acc + Buffer.byteLength(e.css, 'utf-8'), 0);

  info('');
  info('  FerrumEngine CLI — Info');
  info('  ═════════════════════');
  info(`  Version:      1.0.0-alpha`);
  info(`  Effects:      ${effectCount}`);
  info(`  Categories:   ${categoryCount}`);
  info(`  Total CSS:    ${formatBytes(totalCSSSize)}`);
  info('');
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
