/**
 * @roycss/effects — RoyCSS Production-ready CSS effects library
 *
 * Main entry point that re-exports all sub-modules.
 */

module.exports = {
  get ferrumVfx() { return require('./src/ferrum-vfx/index'); },
  get ferrumMotion() { return require('./src/ferrum-motion/index'); },
  get ferrumPaint() { return require('./src/ferrum-paint/index'); },
  get ferrumEffectsData() { return require('./src/ferrum-effects-data'); },
  get ferrumEffectsIndex() { return require('./src/ferrum-effects-index'); },
  get ferrumEffectsLoader() { return require('./src/ferrum-effects-loader'); },
  get effects() { return require('./src/effects/lazy-loader'); },
  get roycssData() { return require('./src/roycss-data'); },
  get roycssIndex() { return require('./src/roycss-index'); },
  get roycssLoader() { return require('./src/roycss-loader'); },
  get animationColors() { return require('./src/animation-colors'); },
};
