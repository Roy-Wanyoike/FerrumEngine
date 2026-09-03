/**
 * Ferrum Plugin SDK — Plugin Registry
 *
 * Stores registered plugins and provides lookup by name or hook.
 * Validates manifests on registration and prevents name collisions.
 */

import { PluginError } from './types';
import { PluginHook } from './types';
import { validateManifest } from './validators';
import type { Plugin, PluginRegistry } from './types';

/**
 * In-memory plugin registry.
 *
 * Maintains an insertion-ordered list of plugins and an index
 * for O(1) name lookups.
 */
export class PluginRegistryImpl implements PluginRegistry {
  private readonly plugins = new Map<string, Plugin>();

  /** @inheritdoc */
  public register(plugin: Plugin): void {
    const result = validateManifest(plugin.manifest);
    if (!result.valid) {
      throw new PluginError(
        `Invalid manifest for plugin "${plugin.manifest.name}": ${result.errors.join('; ')}`,
        plugin.manifest.name,
      );
    }

    if (this.plugins.has(plugin.manifest.name)) {
      throw new PluginError(
        `Plugin "${plugin.manifest.name}" is already registered.`,
        plugin.manifest.name,
      );
    }

    this.plugins.set(plugin.manifest.name, plugin);
  }

  /** @inheritdoc */
  public unregister(pluginName: string): boolean {
    return this.plugins.delete(pluginName);
  }

  /** @inheritdoc */
  public getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  /** @inheritdoc */
  public getPluginsByHook(hook: PluginHook): Plugin[] {
    const matched: Plugin[] = [];
    for (const plugin of this.plugins.values()) {
      if (plugin.manifest.hooks.includes(hook)) {
        matched.push(plugin);
      }
    }
    return matched;
  }

  /** @inheritdoc */
  public getAll(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /** @inheritdoc */
  public has(name: string): boolean {
    return this.plugins.has(name);
  }

  /** @inheritdoc */
  public clear(): void {
    this.plugins.clear();
  }
}