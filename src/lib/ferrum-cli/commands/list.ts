/**
 * Ferrum CLI — List command
 */

import { effects as allEffects, categories } from '../../ferrum-effects-index';
import { formatTable } from '../utils/formatting';
import type { ListCommandOptions, EffectInfo } from '../types';

export function listEffects(options: ListCommandOptions): EffectInfo[] {
  let filtered = allEffects;

  if (options.category) {
    const cat = options.category.toLowerCase();
    filtered = filtered.filter(
      e => e.category.toLowerCase() === cat
    );
  }

  const result: EffectInfo[] = filtered.map(e => ({
    name: e.name,
    category: e.category,
    displayType: e.displayType,
    cssVariables: [],
    description: `CSS class: ${e.className}`,
  }));

  if (options.json || options.format === 'json') {
    console.log(JSON.stringify(result, null, 2));
  } else {
    const headers = ['#', 'Effect Name', 'Category', 'Display Type'];
    const rows = result.map((e, i) => [
      String(i + 1),
      e.name,
      e.category,
      e.displayType,
    ]);

    console.log(formatTable(headers, rows));

    if (options.verbose) {
      const catCounts = categories.map(c => ({
        id: c.id,
        count: allEffects.filter(e => e.category === c.id).length,
      }));
      console.log('\nCategories:');
      const catHeaders = ['Category', 'ID', 'Effects'];
      const catRows = catCounts.map(c => [
        categories.find(cat => cat.id === c.id)?.name ?? c.id,
        c.id,
        String(c.count),
      ]);
      console.log(formatTable(catHeaders, catRows));
    }
  }

  return result;
}
