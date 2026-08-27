/**
 * Modern CSS Reset — inspired by Josh Comeau's approach
 * https://www.joshwcomeau.com/css/custom-css-reset/
 */

export const resetCSS = `
/* ===== Ferrum Modern CSS Reset ===== */

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  hanging-punctuation: first last;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

html:focus-within {
  scroll-behavior: smooth;
}

body {
  font-family: var(--ferrum-fonts-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
  color: var(--ferrum-colors-foreground, #0f172a);
  background-color: var(--ferrum-colors-background, #ffffff);
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

form,
input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
  text-wrap: balance;
}

a {
  color: inherit;
  text-decoration: inherit;
}

ul,
ol {
  list-style: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}

input,
textarea,
select {
  border: none;
  outline: none;
  background: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

#root,
#__next {
  isolation: isolate;
}

/* Remove default spinner for number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Remove search input clear button */
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

/* Remove default tap highlight on mobile */
a,
button,
input,
textarea,
select {
  -webkit-tap-highlight-color: transparent;
}

/* Remove default appearance for all interactive elements */
input,
button,
textarea,
select {
  appearance: none;
}

/* Reset fieldset */
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`.trim();