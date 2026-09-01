/**
 * Ferrum CLI — Init command
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { success, info, warn } from '../utils/formatting';
import type { InitCommandOptions } from '../types';

export async function initProject(options: InitCommandOptions): Promise<void> {
  const dest = path.resolve(options.dest);

  await fs.mkdir(dest, { recursive: true });

  // package.json
  const pkg = {
    name: 'ferrum-project',
    version: '0.1.0',
    private: true,
    scripts: {
      dev: options.typescript ? 'npx tsx index.ts' : 'node index.js',
    },
    dependencies: {
      'ferrum-engine': 'latest',
    },
  };

  if (options.tailwind) {
    pkg.dependencies!['tailwindcss'] = '^4';
  }

  await fs.writeFile(
    path.join(dest, 'package.json'),
    JSON.stringify(pkg, null, 2),
    'utf-8'
  );
  success('Created package.json');

  // CSS file
  const cssContent = `/* FerrumEngine Effects */
/* Import from: https://ferrumcss.space-z.ai/effects */
/* Or use: ferrum-engine CLI to build custom CSS */

@import "https://ferrumcss.space-z.ai/ferrum-effects.css";
`;

  await fs.writeFile(path.join(dest, 'styles.css'), cssContent, 'utf-8');
  success('Created styles.css');

  // HTML file
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FerrumEngine Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 class="roycss-pulse-soft">Hello FerrumEngine!</h1>
</body>
</html>
`;

  await fs.writeFile(path.join(dest, 'index.html'), htmlContent, 'utf-8');
  success('Created index.html');

  // Optionally a TypeScript entry point
  if (options.typescript) {
    const tsContent = `// FerrumEngine project entry
import './styles.css';
console.log('FerrumEngine project ready!');
`;
    await fs.writeFile(path.join(dest, 'index.ts'), tsContent, 'utf-8');
    success('Created index.ts');
  }

  if (options.tailwind) {
    warn('Tailwind CSS 4 added to dependencies. Configure via @import "tailwindcss" in your CSS.');
  }

  info(`Project initialized in ${dest}`);
  info('Run `npm install` to install dependencies.');
}
