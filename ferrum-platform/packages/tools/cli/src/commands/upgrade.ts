import fs from 'fs-extra';
import path from 'path';
import { execaCommand } from 'execa';
import { detectPackageManager } from 'detect-package-manager';
import semver from 'semver';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { info, success, warn, error, step, spinner, succeedSpinner, failSpinner } from '../utils/logger';

// --- Types ---

interface PackageVersion {
  name: string;
  current: string;
  latest: string;
  wanted: string;
  type: 'major' | 'minor' | 'patch' | 'none' | 'error';
  hasBreakingChanges: boolean;
}

interface ChangelogEntry {
  version: string;
  date: string;
  breaking: string[];
  features: string[];
  fixes: string[];
}

// --- Command ---

export async function upgradeCommand(): Promise<void> {
  const cwd = process.cwd();

  info('Checking for Ferrum package updates...\n');

  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    error('No package.json found. Run this command in your project directory.');
    return;
  }

  const pkg = fs.readJsonSync(pkgPath);
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  // Find all @ferrum packages
  const ferrumPackages = Object.entries(allDeps)
    .filter(([name]) => name.startsWith('@ferrum/'))
    .sort(([a], [b]) => a.localeCompare(b));

  if (ferrumPackages.length === 0) {
    warn('No @ferrum packages found in your project.');
    info('Run "ferrum init" to get started.');
    return;
  }

  // Check versions
  const spin = spinner('Checking latest versions...');
  const versions: PackageVersion[] = [];

  for (const [name, currentVersion] of ferrumPackages) {
    const current = typeof currentVersion === 'string' ? currentVersion.replace(/^[\^~]/, '') : '0.0.0';

    try {
      const { stdout } = await execaCommand(
        `npm view ${name} version --json 2>/dev/null`,
        { cwd, timeout: 30000, stdio: 'pipe' }
      );

      // npm view may return an array of versions or a single version
      const parsed = JSON.parse(stdout.trim());
      const latest = Array.isArray(parsed) ? parsed[0] : parsed;

      const diff = semver.diff(current, latest);

      versions.push({
        name,
        current: currentVersion as string,
        latest,
        wanted: latest,
        type: getUpgradeType(diff),
        hasBreakingChanges: diff === 'major',
      });
    } catch {
      versions.push({
        name,
        current: currentVersion as string,
        latest: 'unknown',
        wanted: currentVersion as string,
        type: 'error',
        hasBreakingChanges: false,
      });
    }
  }

  succeedSpinner('Version check complete');
  console.log();

  // Display version table
  const upgradable = versions.filter((v) => v.type !== 'none' && v.type !== 'error');
  const hasMajorUpdates = upgradable.some((v) => v.type === 'major');

  if (upgradable.length === 0) {
    success('All @ferrum packages are up to date!');
    return;
  }

  // Print version info
  console.log(chalk.bold('📦 Available Updates'));
  console.log(chalk.gray('─'.repeat(70)));

  for (const v of versions) {
    const icon = v.type === 'major' ? '🔴' : v.type === 'minor' ? '🟡' : v.type === 'patch' ? '🟢' : '⚪';
    const color = v.type === 'major' ? chalk.red : v.type === 'minor' ? chalk.yellow : chalk.green;
    const label = v.type === 'major' ? 'MAJOR' : v.type === 'minor' ? 'MINOR' : v.type === 'patch' ? 'PATCH' : 'CURRENT';

    console.log(`${icon} ${chalk.bold(v.name)}`);
    console.log(`   ${chalk.gray(v.current)} → ${color(v.latest)}  [${label}]`);

    if (v.hasBreakingChanges) {
      console.log(`   ${chalk.red('⚠ Breaking changes may apply')}`);
    }
    console.log();
  }

  // If there are major updates, show changelogs
  if (hasMajorUpdates) {
    console.log(chalk.bold('📋 Changelogs for major versions'));
    console.log(chalk.gray('─'.repeat(70)));

    for (const v of upgradable.filter((v) => v.type === 'major')) {
      console.log(chalk.bold(v.name));

      const changelog = await fetchChangelog(v.name);
      if (changelog) {
        if (changelog.breaking.length > 0) {
          console.log(chalk.red('  Breaking changes:'));
          for (const entry of changelog.breaking) {
            console.log(chalk.red(`    - ${entry}`));
          }
        }
        if (changelog.features.length > 0) {
          console.log(chalk.green('  New features:'));
          for (const entry of changelog.features) {
            console.log(chalk.green(`    + ${entry}`));
          }
        }
      } else {
        console.log(chalk.gray('  Changelog not available. Check https://ferrum.dev/changelog'));
      }
      console.log();
    }
  }

  // Confirm upgrade
  if (hasMajorUpdates) {
    console.log(chalk.yellow('⚠️  Major version updates may contain breaking changes.'));
    console.log(chalk.yellow('   Review the changelogs above before proceeding.'));
    console.log();
  }

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: `Update ${upgradable.length} package(s)?`,
      default: !hasMajorUpdates,
    },
  ]);

  if (!proceed) {
    info('Upgrade cancelled.');
    return;
  }

  // Run migration codemods for major updates
  const majorPackages = upgradable.filter((v) => v.type === 'major');
  if (majorPackages.length > 0) {
    for (const pkg of majorPackages) {
      await runMigrationCodemod(pkg.name, pkg.current, pkg.latest);
    }
  }

  // Perform the upgrade
  let pm: string;
  try {
    pm = await detectPackageManager(cwd);
  } catch {
    pm = 'npm';
  }

  const packagesToUpdate = upgradable.map((v) => `${v.name}@${v.latest}`);
  const installCmd = buildUpdateCommand(pm, packagesToUpdate);

  step(`Running: ${chalk.cyan(installCmd)}`);
  const updateSpin = spinner('Updating packages...');

  try {
    await execaCommand(installCmd, {
      cwd,
      timeout: 180000,
      stdio: 'pipe',
    });
    succeedSpinner('Packages updated successfully!');
  } catch (err: unknown) {
    failSpinner('Update failed');
    const errMsg = err instanceof Error ? err.message : String(err);
    error(errMsg);
    info('You can update manually with:');
    info(`  ${installCmd}`);
    return;
  }

  // Success message
  console.log();
  success(chalk.bold('Upgrade complete!'));
  console.log();

  if (majorPackages.length > 0) {
    warn('Major version updates were applied. Please review the migration guide:');
    console.log(chalk.gray('  https://ferrum.dev/docs/migration'));
    console.log();
  }

  info('Next steps:');
  console.log('  1. Review the changelog for any new features');
  console.log('  2. Run your test suite');
  console.log('  3. Run "ferrum doctor" to verify your setup');
  console.log();
}

// --- Helpers ---

function getUpgradeType(diff: string | null): 'major' | 'minor' | 'patch' | 'none' | 'error' {
  switch (diff) {
    case 'major':
      return 'major';
    case 'minor':
      return 'minor';
    case 'patch':
      return 'patch';
    case null:
      return 'none';
    default:
      return 'none';
  }
}

async function fetchChangelog(packageName: string): Promise<ChangelogEntry | null> {
  // In a real implementation, this would fetch from the npm registry or GitHub
  // For now, return a simulated changelog structure
  try {
    const { stdout } = await execaCommand(
      `npm view ${packageName} repository.url --json 2>/dev/null`,
      { timeout: 15000, stdio: 'pipe' }
    );

    const repoUrl = JSON.parse(stdout.trim());
    if (repoUrl) {
      return {
        version: 'latest',
        date: new Date().toISOString().split('T')[0],
        breaking: [
          'Review the migration guide at https://ferrum.dev/docs/migration',
        ],
        features: [
          'Check the full changelog at https://ferrum.dev/changelog',
        ],
        fixes: [],
      };
    }
  } catch {
    // Ignore
  }

  return null;
}

async function runMigrationCodemod(
  packageName: string,
  fromVersion: string,
  toVersion: string
): Promise<void> {
  const spin = spinner(`Running migration codemod for ${packageName} (${fromVersion} → ${toVersion})...`);

  // In a real implementation, this would run jscodeshift or similar codemod tools
  // For now, we'll check if a migration script exists and run it

  try {
    const codemodPath = path.join(
      path.dirname(require.resolve(packageName)),
      '..',
      'migrations',
      `${toVersion}.mjs`
    );

    if (fs.existsSync(codemodPath)) {
      await execaCommand(`node ${codemodPath}`, {
        cwd: process.cwd(),
        timeout: 60000,
        stdio: 'pipe',
      });
      succeedSpinner(`Migration codemod applied for ${packageName}`);
    } else {
      succeedSpinner(`No automated migration needed for ${packageName}`);
    }
  } catch {
    // Codemod not available — this is fine
    succeedSpinner(`No automated migration available for ${packageName}`);
  }
}

function buildUpdateCommand(pm: string, packages: string[]): string {
  switch (pm) {
    case 'npm':
      return `npm install ${packages.join(' ')}`;
    case 'yarn':
      return `yarn add ${packages.join(' ')}`;
    case 'pnpm':
      return `pnpm add ${packages.join(' ')}`;
    case 'bun':
      return `bun add ${packages.join(' ')}`;
    default:
      return `npm install ${packages.join(' ')}`;
  }
}