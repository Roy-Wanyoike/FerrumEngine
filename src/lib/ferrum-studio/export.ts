/**
 * @module ferrum-studio/export
 * Export utilities for generating production-ready code from a StudioProject.
 * Supports HTML, CSS, and React JSX output formats.
 */

import type { StudioProject, CanvasElement, AnimationTimeline, TimelineKeyframe } from './types';

/** Map element type to semantic HTML tag. */
function elementToTag(el: CanvasElement): string {
  switch (el.type) {
    case 'text':
      return 'p';
    case 'image':
      return 'img';
    case 'button':
      return 'button';
    case 'card':
      return 'section';
    case 'container':
      return 'div';
    default:
      return 'div';
  }
}

/** Build a CSS style string from an element's style map. */
function stylesToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([prop, val]) => `    ${prop}: ${val};`)
    .join('\n');
}

/** Build inline style attribute value. */
function inlineStyle(el: CanvasElement): string {
  const parts: string[] = [
    `position: absolute`,
    `left: ${el.x}px`,
    `top: ${el.y}px`,
    `width: ${el.width}px`,
    `height: ${el.height}px`,
  ];
  if (el.rotation !== 0) {
    parts.push(`transform: rotate(${el.rotation}deg)`);
  }
  if (el.zIndex !== 0) {
    parts.push(`z-index: ${el.zIndex}`);
  }
  for (const [prop, val] of Object.entries(el.styles)) {
    parts.push(`${prop}: ${val}`);
  }
  return parts.join('; ');
}

/** Generate a CSS class name from element id. */
function elementClassName(el: CanvasElement): string {
  return `el-${el.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
}

/** Render element content/children as HTML. */
function renderElementContent(el: CanvasElement, indent: string): string {
  if (el.children && el.children.length > 0) {
    const childIndent = indent + '  ';
    const children = el.children
      .map((child) => renderElementHTML(child, childIndent))
      .join('\n');
    return `\n${children}\n${indent}`;
  }

  // Self-closing for images
  if (el.type === 'image') {
    return '';
  }

  // Use text content from props
  const text = el.props['text'];
  if (typeof text === 'string') {
    return text;
  }

  return '';
}

/** Recursively render an element to HTML. */
function renderElementHTML(el: CanvasElement, indent: string = '    '): string {
  const tag = elementToTag(el);
  const style = inlineStyle(el);

  if (el.type === 'image') {
    const src = el.props['src'] ?? '';
    const alt = el.props['alt'] ?? '';
    return `${indent}<${tag} src="${src}" alt="${alt}" style="${style}" />`;
  }

  const content = renderElementContent(el, indent);
  return `${indent}<${tag} style="${style}">${content}</${tag}>`;
}

/**
 * Export a project as semantic HTML.
 * @param project - The StudioProject to export.
 * @returns A complete HTML document string.
 */
export function exportToHTML(project: StudioProject): string {
  const body = project.elements
    .map((el) => renderElementHTML(el))
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project.name}</title>
</head>
<body>
  <div style="position: relative; width: ${project.canvas.width}px; height: ${project.canvas.height}px; background: ${project.canvas.background};">
${body}
  </div>
</body>
</html>`;
}

/**
 * Export a project as CSS with design tokens and element styles.
 * @param project - The StudioProject to export.
 * @returns A CSS string with :root tokens and element class rules.
 */
export function exportToCSS(project: StudioProject): string {
  const lines: string[] = [];

  // Design tokens as CSS custom properties
  if (project.tokens.length > 0) {
    const tokenLines = project.tokens.map(
      (t) => `  --${t.category}-${t.name}: ${t.value};`,
    );
    lines.push(`:root {\n${tokenLines.join('\n')}\n}`);
  }

  // Element styles as classes
  for (const el of project.elements) {
    const className = elementClassName(el);
    const styleBlock = stylesToString(el.styles);
    if (styleBlock) {
      lines.push(`.${className} {\n${styleBlock}\n}`);
    }
  }

  // Animation keyframes
  if (project.timeline.keyframes.length > 0) {
    lines.push(generateAnimationCSS(project.timeline));
  }

  return lines.join('\n\n');
}

/**
 * Export a project as React JSX.
 * @param project - The StudioProject to export.
 * @returns A React component file as a string.
 */
export function exportToReact(project: StudioProject): string {
  const elements = project.elements
    .map((el) => renderReactElement(el, '      '))
    .join('\n');

  return `import React from 'react';

/**
 * ${project.name}
${project.description ? ` * ${project.description}` : ''}
 */
export default function ${toPascalCase(project.name)}() {
  return (
    <div
      style={{
        position: 'relative',
        width: ${project.canvas.width},
        height: ${project.canvas.height},
        background: '${project.canvas.background}',
      }}
    >
${elements}
    </div>
  );
}
`;
}

/** Render an element as React JSX. */
function renderReactElement(el: CanvasElement, indent: string = '      '): string {
  const tag = elementToTag(el);
  const style = reactStyleObject(el);

  if (el.type === 'image') {
    const src = el.props['src'] ?? '';
    const alt = el.props['alt'] ?? '';
    return `${indent}<${tag} src="${src}" alt="${alt}" style={{${style}}} />`;
  }

  const content = renderReactContent(el, indent);
  return `${indent}<${tag} style={{${style}}}>${content}</${tag}>`;
}

/** Generate React content/children. */
function renderReactContent(el: CanvasElement, indent: string): string {
  if (el.children && el.children.length > 0) {
    const childIndent = indent + '  ';
    const children = el.children
      .map((child) => renderReactElement(child, childIndent))
      .join('\n');
    return `\n${children}\n${indent}`;
  }
  if (el.type === 'image') return '';
  const text = el.props['text'];
  if (typeof text === 'string') return text;
  return '';
}

/** Build a React style object string from element properties. */
function reactStyleObject(el: CanvasElement): string {
  const parts: string[] = [
    `position: 'absolute'`,
    `left: ${el.x}`,
    `top: ${el.y}`,
    `width: ${el.width}`,
    `height: ${el.height}`,
  ];
  if (el.rotation !== 0) {
    parts.push(`transform: 'rotate(${el.rotation}deg)'`);
  }
  if (el.zIndex !== 0) {
    parts.push(`zIndex: ${el.zIndex}`);
  }
  for (const [prop, val] of Object.entries(el.styles)) {
    parts.push(`'${prop}': '${val}'`);
  }
  return parts.join(', ');
}

/** Convert a name to PascalCase for React component naming. */
function toPascalCase(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Generate a CSS @keyframes block from an animation timeline.
 * Groups keyframes by element, producing one @keyframes rule per element.
 *
 * @param timeline - The AnimationTimeline to convert.
 * @returns A CSS string with @keyframes rules.
 */
export function generateAnimationCSS(timeline: AnimationTimeline): string {
  if (timeline.keyframes.length === 0) return '';

  // Group keyframes by element
  const elementMap = new Map<string, TimelineKeyframe[]>();
  for (const kf of timeline.keyframes) {
    const existing = elementMap.get(kf.elementId) ?? [];
    existing.push(kf);
    elementMap.set(kf.elementId, existing);
  }

  const rules: string[] = [];

  for (const [elementId, keyframes] of elementMap) {
    const sorted = [...keyframes].sort((a, b) => a.time - b.time);
    const kfLines = sorted
      .map((kf) => {
        const pct = Math.round((kf.time / timeline.duration) * 100);
        const props = Object.entries(kf.properties)
          .map(([prop, val]) => `      ${prop}: ${val};`)
          .join('\n');
        return `  ${pct}% {\n${props}\n  }`;
      })
      .join('\n');

    rules.push(`@keyframes ${elementId} {\n${kfLines}\n}`);
  }

  return rules.join('\n\n');
}
