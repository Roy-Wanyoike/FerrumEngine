import fs from 'fs-extra';
import path from 'path';
import { execaCommand } from 'execa';
import { detectPackageManager } from 'detect-package-manager';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { info, success, warn, error, step, spinner, succeedSpinner, failSpinner } from '../utils/logger';
import { loadConfig, detectFramework, type FrameworkType } from '../utils/config';
import { getInstallCommand, getEntryFiles, getImportStatement } from '../utils/frameworks';

// --- Available Items ---

const COMPONENTS: Record<string, { package: string; import: string; description: string }> = {
  'Animated': {
    package: '@ferrum/react',
    import: `import { Animated } from '@ferrum/react';`,
    description: 'Generic animation wrapper component',
  },
  'MotionDiv': {
    package: '@ferrum/react',
    import: `import { MotionDiv } from '@ferrum/react';`,
    description: 'Animated div component',
  },
  'MotionSpan': {
    package: '@ferrum/react',
    import: `import { MotionSpan } from '@ferrum/react';`,
    description: 'Animated span component',
  },
  'ReducedMotion': {
    package: '@ferrum/react',
    import: `import { ReducedMotion } from '@ferrum/react';`,
    description: 'Reduced motion wrapper',
  },
  'FerrumProvider': {
    package: '@ferrum/react',
    import: `import { FerrumProvider } from '@ferrum/react';`,
    description: 'Token/theme context provider',
  },
  'FAnimated': {
    package: '@ferrum/vue',
    import: `import { FAnimated } from '@ferrum/vue';`,
    description: 'Vue animation wrapper component',
  },
  'FReducedMotion': {
    package: '@ferrum/vue',
    import: `import { FReducedMotion } from '@ferrum/vue';`,
    description: 'Vue reduced motion wrapper',
  },
  'FerrumCSS': {
    package: '@ferrum/next',
    import: `import { FerrumCSS } from '@ferrum/next';`,
    description: 'Next.js CSS loader component',
  },
  'FontLoader': {
    package: '@ferrum/next',
    import: `import { FontLoader } from '@ferrum/next';`,
    description: 'Next.js font loader component',
  },
};

const ANIMATIONS: Record<string, { css: string; usage: string; description: string }> = {
  'fade-in': {
    css: 'ferrum-anim-fade-in',
    usage: '<Animated animation="fade-in">Content</Animated>',
    description: 'Fade in from transparent',
  },
  'fade-out': {
    css: 'ferrum-anim-fade-out',
    usage: '<Animated animation="fade-out">Content</Animated>',
    description: 'Fade out to transparent',
  },
  'slide-up': {
    css: 'ferrum-anim-slide-up',
    usage: '<Animated animation="slide-up">Content</Animated>',
    description: 'Slide in from bottom',
  },
  'slide-down': {
    css: 'ferrum-anim-slide-down',
    usage: '<Animated animation="slide-down">Content</Animated>',
    description: 'Slide in from top',
  },
  'slide-left': {
    css: 'ferrum-anim-slide-left',
    usage: '<Animated animation="slide-left">Content</Animated>',
    description: 'Slide in from right',
  },
  'slide-right': {
    css: 'ferrum-anim-slide-right',
    usage: '<Animated animation="slide-right">Content</Animated>',
    description: 'Slide in from left',
  },
  'scale-up': {
    css: 'ferrum-anim-scale-up',
    usage: '<Animated animation="scale-up">Content</Animated>',
    description: 'Scale up from 0',
  },
  'bounce': {
    css: 'ferrum-anim-bounce',
    usage: '<Animated animation="bounce">Content</Animated>',
    description: 'Bouncing animation',
  },
  'pulse': {
    css: 'ferrum-anim-pulse',
    usage: '<Animated animation="pulse">Content</Animated>',
    description: 'Pulsing opacity animation',
  },
  'shake': {
    css: 'ferrum-anim-shake',
    usage: '<Animated animation="shake">Content</Animated>',
    description: 'Shake animation',
  },
  'spin': {
    css: 'ferrum-anim-spin',
    usage: '<Animated animation="spin">Content</Animated>',
    description: '360 degree spin',
  },
  'zoom-in': {
    css: 'ferrum-anim-zoom-in',
    usage: '<Animated animation="zoom-in">Content</Animated>',
    description: 'Zoom in with scale',
  },
  'flip': {
    css: 'ferrum-anim-flip',
    usage: '<Animated animation="flip">Content</Animated>',
    description: '3D flip animation',
  },
  'rubber-band': {
    css: 'ferrum-anim-rubber-band',
    usage: '<Animated animation="rubber-band">Content</Animated>',
    description: 'Rubber band stretch effect',
  },
};

const THEMES: Record<string, { description: string; config: string }> = {
  'light': {
    description: 'Light theme (white backgrounds, dark text)',
    config: `theme: 'light'`,
  },
  'dark': {
    description: 'Dark theme (dark backgrounds, light text)',
    config: `theme: 'dark'`,
  },
  'system': {
    description: 'System preference (follows OS setting)',
    config: `theme: 'system'`,
  },
};

const UTILITIES: Record<string, { package: string; import: string; description: string; example: string }> = {
  'useMotion': {
    package: '@ferrum/react',
    import: `import { useMotion } from '@ferrum/react';`,
    description: 'Hook for imperative animation control',
    example: `const { ref, isAnimating, replay } = useMotion('fade-in', { duration: 500 });\nreturn <div ref={ref}>Animated</div>;`,
  },
  'useReducedMotion': {
    package: '@ferrum/react',
    import: `import { useReducedMotion } from '@ferrum/react';`,
    description: 'Hook to detect prefers-reduced-motion',
    example: `const reducedMotion = useReducedMotion();\nif (reducedMotion) { /* show static */ }`,
  },
  'useTokens': {
    package: '@ferrum/react',
    import: `import { useTokens } from '@ferrum/react';`,
    description: 'Hook to access design token values',
    example: `const { getColor, getSpacing } = useTokens();\nconst primary = getColor('accent-primary');`,
  },
  'useFerrum': {
    package: '@ferrum/react',
    import: `import { useFerrum } from '@ferrum/react';`,
    description: 'Hook to access full Ferrum context',
    example: `const { theme, tokens, setTheme } = useFerrum();`,
  },
  'useMotion (Vue)': {
    package: '@ferrum/vue',
    import: `import { useMotion } from '@ferrum/vue';`,
    description: 'Composable for animation control (Vue)',
    example: `const { elementRef, isAnimating, replay } = useMotion('fade-in');`,
  },
  'useTokens (Vue)': {
    package: '@ferrum/vue',
    import: `import { useTokens } from '@ferrum/vue';`,
    description: 'Composable for design tokens (Vue)',
    example: `const { getColor, getSpacing } = useTokens();`,
  },
};

// --- Command ---

export async function addCommand(category?: string, name?: string): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const framework: FrameworkType = config?.framework ?? detectFramework(cwd) ?? 'react';

  // Determine which category to show
  let selectedCategory: string;

  if (category && ['component', 'animation', 'theme', 'utility'].includes(category)) {
    selectedCategory = category;
  } else if (name) {
    // Try to auto-detect category from name
    if (COMPONENTS[name]) selectedCategory = 'component';
    else if (ANIMATIONS[name]) selectedCategory = 'animation';
    else if (THEMES[name]) selectedCategory = 'theme';
    else if (UTILITIES[name]) selectedCategory = 'utility';
    else {
      error(`Unknown item: "${name}"`);
      info('Run "ferrum add" to see available options.');
      return;
    }
  } else {
    // Interactive selection
    const { cat } = await inquirer.prompt([
      {
        type: 'list',
        name: 'cat',
        message: 'What would you like to add?',
        choices: [
          { name: '🧩 Component', value: 'component' },
          { name: '🎬 Animation', value: 'animation' },
          { name: '🎨 Theme', value: 'theme' },
          { name: '🔧 Utility / Hook', value: 'utility' },
        ],
      },
    ]);
    selectedCategory = cat;
  }

  // Get the item
  let selectedItem: string;

  switch (selectedCategory) {
    case 'component': {
      // Filter components relevant to the framework
      const relevantComponents: Record<string, typeof COMPONENTS[string]> = {};
      for (const [key, value] of Object.entries(COMPONENTS)) {
        // Show React components for React/Next, Vue for Vue, etc.
        if (
          (framework === 'react' || framework === 'next') && !value.package.includes('vue') ||
          framework === 'vue' && value.package.includes('vue') ||
          (framework === 'angular' || framework === 'svelte' || framework === 'vanilla')
        ) {
          relevantComponents[key] = value;
        }
      }

      if (name && relevantComponents[name]) {
        selectedItem = name;
      } else {
        const { comp } = await inquirer.prompt([
          {
            type: 'list',
            name: 'comp',
            message: 'Select a component:',
            choices: Object.entries(relevantComponents).map(([key, value]) => ({
              name: `${key} — ${value.description}`,
              value: key,
            })),
          },
        ]);
        selectedItem = comp;
      }

      const component = relevantComponents[selectedItem];
      if (!component) {
        error(`Component "${selectedItem}" not available for ${framework}`);
        return;
      }

      await addPackage(component.package, cwd);
      showUsage(component.import, COMPONENTS[selectedItem]?.description ?? '');
      break;
    }

    case 'animation': {
      if (name && ANIMATIONS[name]) {
        selectedItem = name;
      } else {
        const { anim } = await inquirer.prompt([
          {
            type: 'list',
            name: 'anim',
            message: 'Select an animation:',
            choices: Object.entries(ANIMATIONS).map(([key, value]) => ({
              name: `${key} — ${value.description}`,
              value: key,
            })),
          },
        ]);
        selectedItem = anim;
      }

      const animation = ANIMATIONS[selectedItem];
      await addPackage('@ferrum/motion', cwd);

      console.log();
      success(`Animation: ${chalk.cyan(selectedItem)}`);
      info(`CSS class: ${chalk.gray(animation.css)}`);
      info(`Usage:`);
      console.log(chalk.gray('─'.repeat(50)));
      console.log(animation.usage);
      console.log(chalk.gray('─'.repeat(50)));
      console.log();
      break;
    }

    case 'theme': {
      if (name && THEMES[name]) {
        selectedItem = name;
      } else {
        const { thm } = await inquirer.prompt([
          {
            type: 'list',
            name: 'thm',
            message: 'Select a theme:',
            choices: Object.entries(THEMES).map(([key, value]) => ({
              name: `${key} — ${value.description}`,
              value: key,
            })),
          },
        ]);
        selectedItem = thm;
      }

      const theme = THEMES[selectedItem];
      info(`Theme set to ${chalk.cyan(selectedItem)} (${theme.description})`);

      // Update ferrum config if it exists
      const configFiles = ['ferrum.config.ts', 'ferrum.config.js', 'ferrum.config.json'];
      const existingConfigFile = configFiles.find((f) => fs.existsSync(path.join(cwd, f)));
      if (existingConfigFile) {
        const configPath = path.join(cwd, existingConfigFile);
        let content = fs.readFileSync(configPath, 'utf-8');

        // Replace theme value
        content = content.replace(
          /theme:\s*['"][^'"]+['"]/,
          `theme: '${selectedItem}'`
        );

        fs.writeFileSync(configPath, content, 'utf-8');
        success(`Updated ${chalk.cyan(existingConfigFile)}`);
      } else {
        info(`To apply: set ${chalk.cyan(theme.config)} in your ferrum.config.ts`);
      }
      break;
    }

    case 'utility': {
      if (name && UTILITIES[name]) {
        selectedItem = name;
      } else {
        const { util } = await inquirer.prompt([
          {
            type: 'list',
            name: 'util',
            message: 'Select a utility/hook:',
            choices: Object.entries(UTILITIES).map(([key, value]) => ({
              name: `${key} — ${value.description}`,
              value: key,
            })),
          },
        ]);
        selectedItem = util;
      }

      const utility = UTILITIES[selectedItem];
      await addPackage(utility.package, cwd);
      showUsage(utility.import, utility.description, utility.example);
      break;
    }
  }
}

// --- Helpers ---

async function addPackage(pkgName: string, cwd: string): Promise<void> {
  const spin = spinner(`Checking if ${chalk.cyan(pkgName)} is installed...`);

  // Check if package is already in dependencies
  const pkgPath = path.join(cwd, 'package.json');
  let alreadyInstalled = false;
  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJsonSync(pkgPath);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    alreadyInstalled = pkgName in deps;
  }

  if (alreadyInstalled) {
    succeedSpinner(`${chalk.cyan(pkgName)} is already installed`);
    return;
  }

  succeedSpinner(`${chalk.cyan(pkgName)} is not installed yet`);

  let pm: string;
  try {
    pm = await detectPackageManager(cwd);
  } catch {
    pm = 'npm';
  }

  const cmd = getInstallCommand(pm, [pkgName]);
  step(`Installing: ${cmd}`);

  const installSpin = spinner(`Running: ${cmd}`);
  try {
    await execaCommand(cmd, { cwd, timeout: 120000, stdio: 'pipe' });
    succeedSpinner(`Installed ${chalk.cyan(pkgName)}`);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    failSpinner(`Failed to install ${pkgName}`);
    error(errMsg);
  }
}

function showUsage(importStatement: string, description: string, example?: string): void {
  console.log();
  success(`${description}`);
  info(`Import:`);
  console.log(chalk.gray('─'.repeat(50)));
  console.log(importStatement);
  if (example) {
    console.log();
    info('Usage:');
    console.log(example);
  }
  console.log(chalk.gray('─'.repeat(50)));
  console.log();
}