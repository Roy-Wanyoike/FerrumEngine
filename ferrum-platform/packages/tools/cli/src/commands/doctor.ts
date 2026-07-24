import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import chalk from 'chalk';
import { info, success, warn, error, table } from '../utils/logger';
import { loadConfig, validateConfig, detectFramework, type FrameworkType } from '../utils/config';
import { getEntryFiles } from '../utils/frameworks';

// --- Types ---

interface DiagnosticResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  fix?: string;
}

// --- Command ---

export async function doctorCommand(): Promise<void> {
  info('Running Ferrum diagnostics...\n');

  const cwd = process.cwd();
  const results: DiagnosticResult[] = [];

  // --- Check 1: Node.js version ---

  const nodeVersion = process.version;
  const nodeVersionClean = semver.clean(nodeVersion);
  const nodeVersionMajor = nodeVersionClean ? semver.major(nodeVersionClean) : 0;

  if (nodeVersionMajor >= 18) {
    results.push({
      name: 'Node.js version',
      status: 'pass',
      message: `Node.js ${nodeVersion} (>= 18 required)`,
    });
  } else {
    results.push({
      name: 'Node.js version',
      status: 'fail',
      message: `Node.js ${nodeVersion} is below the minimum required version (18.x)`,
      fix: 'Upgrade Node.js to v18 or later: https://nodejs.org/',
    });
  }

  // --- Check 2: Package manager ---

  let packageManager = 'unknown';
  const lockFiles: Record<string, string> = {
    'package-lock.json': 'npm',
    'yarn.lock': 'yarn',
    'pnpm-lock.yaml': 'pnpm',
    'bun.lockb': 'bun',
    'bun.lock': 'bun',
  };

  for (const [file, pm] of Object.entries(lockFiles)) {
    if (fs.existsSync(path.join(cwd, file))) {
      packageManager = pm;
      break;
    }
  }

  results.push({
    name: 'Package manager',
    status: 'pass',
    message: `Detected: ${packageManager}`,
  });

  // --- Check 3: Package.json exists ---

  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    results.push({
      name: 'package.json',
      status: 'pass',
      message: 'Found package.json',
    });
  } else {
    results.push({
      name: 'package.json',
      status: 'fail',
      message: 'No package.json found',
      fix: 'Run "npm init" or "ferrum init" to create a project',
    });
  }

  // --- Check 4: Installed @ferrum packages ---

  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJsonSync(pkgPath);
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

    const ferrumPackages = Object.entries(allDeps)
      .filter(([name]) => name.startsWith('@ferrum/'))
      .sort(([a], [b]) => a.localeCompare(b));

    if (ferrumPackages.length > 0) {
      for (const [name, version] of ferrumPackages) {
        const ver = typeof version === 'string' ? version : 'unknown';
        results.push({
          name: `Package: ${name}`,
          status: 'pass',
          message: `Installed: ${ver}`,
        });
      }
    } else {
      results.push({
        name: '@ferrum packages',
        status: 'fail',
        message: 'No @ferrum packages found in dependencies',
        fix: 'Run "ferrum init" to install and configure Ferrum',
      });
    }
  }

  // --- Check 5: Ferrum config ---

  const config = loadConfig(cwd);
  if (config) {
    const validation = validateConfig(config);
    if (validation.valid) {
      results.push({
        name: 'ferrum.config',
        status: 'pass',
        message: `Valid config (framework: ${config.framework ?? 'auto'}, theme: ${config.theme ?? 'system'})`,
      });
    } else {
      results.push({
        name: 'ferrum.config',
        status: 'fail',
        message: `Invalid config: ${validation.errors.join(', ')}`,
        fix: 'Fix the errors in your ferrum.config.ts',
      });
    }
  } else {
    results.push({
      name: 'ferrum.config',
      status: 'warn',
      message: 'No ferrum config file found',
      fix: 'Run "ferrum init" to create a configuration',
    });
  }

  // --- Check 6: CSS imports ---

  const framework: FrameworkType | undefined = config?.framework ?? detectFramework(cwd);
  if (framework) {
    const entryFiles = getEntryFiles(framework);
    let foundCssImport = false;

    for (const entry of entryFiles) {
      const fullPath = path.join(cwd, entry);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('@ferrum/tokens/css') || content.includes('@ferrum/motion/css')) {
          foundCssImport = true;
          results.push({
            name: 'CSS imports',
            status: 'pass',
            message: `Ferrum CSS imports found in ${entry}`,
          });
          break;
        }
      }
    }

    if (!foundCssImport) {
      results.push({
        name: 'CSS imports',
        status: 'warn',
        message: 'No Ferrum CSS imports found in entry files',
        fix: "Add \"import '@ferrum/tokens/css';\" to your entry file",
      });
    }
  }

  // --- Check 7: Framework detection ---

  if (framework) {
    results.push({
      name: 'Framework',
      status: 'pass',
      message: `Detected: ${framework}`,
    });
  } else {
    results.push({
      name: 'Framework',
      status: 'warn',
      message: 'Could not detect framework',
      fix: 'Set "framework" in ferrum.config.ts',
    });
  }

  // --- Check 8: Conflicting packages ---

  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJsonSync(pkgPath);
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const conflicts: string[] = [];

    if (allDeps['@ferrum/react'] && allDeps['@ferrum/vue']) {
      conflicts.push('Both @ferrum/react and @ferrum/vue are installed');
    }
    if (allDeps['@ferrum/react'] && allDeps['@ferrum/next']) {
      // This is actually fine — @ferrum/next depends on @ferrum/react
    }
    if (allDeps['tailwindcss'] && allDeps['@ferrum/tokens']) {
      conflicts.push('Both Tailwind CSS and @ferrum/tokens are installed (may conflict)');
    }
    if (allDeps['styled-components'] && allDeps['@ferrum/tokens']) {
      conflicts.push('Both styled-components and @ferrum/tokens are installed (check for conflicts)');
    }

    if (conflicts.length > 0) {
      results.push({
        name: 'Conflicting packages',
        status: 'warn',
        message: conflicts.join('; '),
        fix: 'Review and remove conflicting packages if not needed',
      });
    } else {
      results.push({
        name: 'Conflicting packages',
        status: 'pass',
        message: 'No conflicting packages detected',
      });
    }
  }

  // --- Check 9: Token configuration ---

  if (config) {
    const hasTokenOverrides = config.tokens !== undefined && Object.keys(config.tokens).length > 0;
    if (hasTokenOverrides) {
      results.push({
        name: 'Token configuration',
        status: 'pass',
        message: `Custom token overrides found (${Object.keys(config.tokens!).length} categories)`,
      });
    } else {
      results.push({
        name: 'Token configuration',
        status: 'pass',
        message: 'Using default tokens (no overrides)',
      });
    }
  }

  // --- Print Results ---

  console.log();
  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const warned = results.filter((r) => r.status === 'warn').length;

  for (const result of results) {
    const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
    const color = result.status === 'pass' ? chalk.green : result.status === 'fail' ? chalk.red : chalk.yellow;
    console.log(`${icon} ${chalk.bold(result.name)}: ${color(result.message)}`);

    if (result.fix) {
      console.log(chalk.gray(`   Fix: ${result.fix}`));
    }
  }

  // Summary
  console.log();
  console.log(chalk.gray('─'.repeat(60)));
  console.log(
    `  ${chalk.green(`${passed} passed`)}  ${failed > 0 ? chalk.red(`${failed} failed`) : chalk.green(`${failed} failed`)}  ${warned > 0 ? chalk.yellow(`${warned} warnings`) : chalk.green(`${warned} warnings`)}`
  );
  console.log(chalk.gray('─'.repeat(60)));
  console.log();

  if (failed > 0) {
    error('Some checks failed. See the suggestions above to fix them.');
    process.exitCode = 1;
  } else if (warned > 0) {
    warn('All checks passed with warnings. Review suggestions for improvements.');
  } else {
    success('All checks passed! Your Ferrum setup is healthy.');
  }
}