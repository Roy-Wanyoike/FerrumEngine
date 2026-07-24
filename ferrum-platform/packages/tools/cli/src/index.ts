#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { doctorCommand } from './commands/doctor';
import { analyzeCommand } from './commands/analyze';
import { upgradeCommand } from './commands/upgrade';

const program = new Command();

program
  .name('ferrum')
  .description(chalk.cyan.bold('Ferrum Platform CLI') + ' — Design system setup and management')
  .version('0.0.1', '-v, --version', 'Output the current version');

// --- init ---

program
  .command('init')
  .description('Initialize Ferrum in your project with interactive setup')
  .action(async () => {
    try {
      await initCommand();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red('✖'), 'Init failed:', message);
      process.exitCode = 1;
    }
  });

// --- add ---

program
  .command('add [category] [name]')
  .description('Add a component, animation, theme, or utility to your project')
  .argument('[category]', 'Category: component, animation, theme, utility')
  .argument('[name]', 'Name of the item to add')
  .action(async (category?: string, name?: string) => {
    try {
      await addCommand(category, name);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red('✖'), 'Add failed:', message);
      process.exitCode = 1;
    }
  });

// --- doctor ---

program
  .command('doctor')
  .description('Run diagnostics on your Ferrum setup')
  .action(async () => {
    try {
      await doctorCommand();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red('✖'), 'Doctor failed:', message);
      process.exitCode = 1;
    }
  });

// --- analyze ---

program
  .command('analyze [path]')
  .description('Analyze your CSS bundle size and token usage')
  .argument('[path]', 'Path to a CSS file to analyze (optional)')
  .action(async (filePath?: string) => {
    try {
      await analyzeCommand(filePath);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red('✖'), 'Analyze failed:', message);
      process.exitCode = 1;
    }
  });

// --- upgrade ---

program
  .command('upgrade')
  .description('Upgrade all @ferrum packages to their latest versions')
  .action(async () => {
    try {
      await upgradeCommand();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red('✖'), 'Upgrade failed:', message);
      process.exitCode = 1;
    }
  });

// --- Parse ---

program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}