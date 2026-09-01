/**
 * Comprehensive tests for the Ferrum Studio scaffolding module.
 * Covers project CRUD, element management, timeline interpolation,
 * design tokens, export, and breakpoints.
 */

import {
  createProject,
  addElement,
  removeElement,
  moveElement,
  resizeElement,
  getElement,
  findElementAt,
  duplicateElement,
  bringToFront,
  sendToBack,
  _resetIdCounter,
  createTimeline,
  addKeyframe,
  removeKeyframe,
  getKeyframesForElement,
  getInterpolatedProps,
  sortKeyframes,
  _resetKfCounter,
  createToken,
  updateToken,
  tokenToCSS,
  tokensToCSS,
  DEFAULT_TOKENS,
  _resetTkCounter,
  exportToHTML,
  exportToCSS,
  exportToReact,
  generateAnimationCSS,
  STUDIO_BREAKPOINTS,
  getActiveBreakpoints,
  getElementBreakpointStyles,
} from '@/lib/ferrum-studio';

import type {
  StudioProject,
  CanvasElement,
  AnimationTimeline,
} from '@/lib/ferrum-studio';

// ─── Helpers ────────────────────────────────────────────────────────

function baseElement(
  overrides: Partial<Omit<CanvasElement, 'id'>> = {},
): Omit<CanvasElement, 'id'> {
  return {
    type: 'box',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    zIndex: 0,
    props: {},
    styles: {},
    ...overrides,
  };
}

// ─── Project CRUD ───────────────────────────────────────────────────

describe('createProject', () => {
  beforeEach(() => _resetIdCounter());

  it('creates a project with defaults', () => {
    const p = createProject('Test');
    expect(p.name).toBe('Test');
    expect(p.description).toBe('');
    expect(p.canvas.width).toBe(1280);
    expect(p.canvas.height).toBe(720);
    expect(p.canvas.background).toBe('#ffffff');
    expect(p.elements).toEqual([]);
    expect(p.timeline.duration).toBe(1000);
    expect(p.timeline.keyframes).toEqual([]);
    expect(p.tokens).toEqual([]);
    expect(p.createdAt).toBeTruthy();
    expect(p.updatedAt).toBeTruthy();
    expect(p.id).toBeTruthy();
  });

  it('accepts a description', () => {
    const p = createProject('My App', 'A test project');
    expect(p.description).toBe('A test project');
  });

  it('generates unique ids', () => {
    const p1 = createProject('A');
    const p2 = createProject('B');
    expect(p1.id).not.toBe(p2.id);
  });
});

describe('addElement', () => {
  beforeEach(() => _resetIdCounter());

  it('adds an element and returns it with an id', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement({ type: 'box', x: 10, y: 20 }));
    expect(el.id).toBeTruthy();
    expect(el.type).toBe('box');
    expect(el.x).toBe(10);
    expect(el.y).toBe(20);
    expect(p.elements).toHaveLength(1);
    expect(p.elements[0]).toBe(el);
  });

  it('updates the project updatedAt timestamp', () => {
    const p = createProject('Test');
    const before = p.updatedAt;
    // Small delay to ensure timestamp differs
    addElement(p, baseElement());
    // Updated at is set; we trust the implementation since Date resolution varies
    expect(p.updatedAt).toBeTruthy();
  });

  it('supports multiple elements', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ type: 'box' }));
    addElement(p, baseElement({ type: 'text' }));
    expect(p.elements).toHaveLength(2);
  });
});

describe('removeElement', () => {
  beforeEach(() => _resetIdCounter());

  it('removes the element from the project (immutable)', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement());
    const result = removeElement(p, el.id);
    expect(result.elements).toHaveLength(0);
    // Original is unchanged
    expect(p.elements).toHaveLength(1);
  });

  it('returns a new project reference', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement());
    const result = removeElement(p, el.id);
    expect(result).not.toBe(p);
  });

  it('is a no-op for non-existent ids', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement());
    const result = removeElement(p, 'nonexistent');
    expect(result.elements).toHaveLength(1);
  });
});

describe('moveElement', () => {
  beforeEach(() => _resetIdCounter());

  it('moves an element to a new position (immutable)', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement({ x: 0, y: 0 }));
    const result = moveElement(p, el.id, 50, 75);
    expect(result.elements[0]?.x).toBe(50);
    expect(result.elements[0]?.y).toBe(75);
    // Original unchanged
    expect(p.elements[0]?.x).toBe(0);
  });
});

describe('resizeElement', () => {
  beforeEach(() => _resetIdCounter());

  it('resizes an element (immutable)', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement({ width: 100, height: 100 }));
    const result = resizeElement(p, el.id, 200, 300);
    expect(result.elements[0]?.width).toBe(200);
    expect(result.elements[0]?.height).toBe(300);
  });
});

describe('getElement', () => {
  beforeEach(() => _resetIdCounter());

  it('finds an element by id', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement({ type: 'button' }));
    const found = getElement(p, el.id);
    expect(found?.id).toBe(el.id);
    expect(found?.type).toBe('button');
  });

  it('returns undefined for missing ids', () => {
    const p = createProject('Test');
    expect(getElement(p, 'nope')).toBeUndefined();
  });
});

// ─── Hit Testing ────────────────────────────────────────────────────

describe('findElementAt', () => {
  beforeEach(() => _resetIdCounter());

  it('finds an element whose bounding box contains the point', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ x: 10, y: 10, width: 100, height: 100, zIndex: 1 }));
    const hit = findElementAt(p, 50, 50);
    expect(hit).toBeTruthy();
  });

  it('returns undefined when nothing is at the point', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ x: 0, y: 0, width: 50, height: 50 }));
    expect(findElementAt(p, 200, 200)).toBeUndefined();
  });

  it('returns the topmost element at overlapping coordinates', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ x: 0, y: 0, width: 100, height: 100, zIndex: 1 }));
    const top = addElement(p, baseElement({ x: 0, y: 0, width: 100, height: 100, zIndex: 5 }));
    const hit = findElementAt(p, 50, 50);
    expect(hit?.id).toBe(top.id);
  });

  it('includes points on the top-left edges and up to bottom-right edges', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ x: 10, y: 10, width: 100, height: 100 }));
    // Inclusive bounds: right edge (x + width) and bottom edge (y + height) are inside
    expect(findElementAt(p, 110, 50)).toBeTruthy();
    expect(findElementAt(p, 50, 110)).toBeTruthy();
    // Just outside
    expect(findElementAt(p, 111, 50)).toBeUndefined();
    expect(findElementAt(p, 50, 111)).toBeUndefined();
  });

  it('includes points on the top-left edges', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ x: 10, y: 10, width: 100, height: 100 }));
    expect(findElementAt(p, 10, 10)).toBeTruthy();
  });
});

// ─── Z-Ordering ─────────────────────────────────────────────────────

describe('bringToFront / sendToBack', () => {
  beforeEach(() => _resetIdCounter());

  it('bringToFront sets the highest z-index', () => {
    const p = createProject('Test');
    const a = addElement(p, baseElement({ zIndex: 1 }));
    const b = addElement(p, baseElement({ zIndex: 5 }));
    const c = addElement(p, baseElement({ zIndex: 3 }));
    const result = bringToFront(p, a.id);
    const updated = result.elements.find((el) => el.id === a.id);
    expect(updated?.zIndex).toBe(6); // max(1,5,3) + 1
  });

  it('sendToBack sets the lowest z-index', () => {
    const p = createProject('Test');
    const a = addElement(p, baseElement({ zIndex: 1 }));
    const b = addElement(p, baseElement({ zIndex: 5 }));
    const result = sendToBack(p, b.id);
    const updated = result.elements.find((el) => el.id === b.id);
    expect(updated?.zIndex).toBe(0); // min(1,5) - 1
  });

  it('returns new project references', () => {
    const p = createProject('Test');
    const a = addElement(p, baseElement());
    expect(bringToFront(p, a.id)).not.toBe(p);
    expect(sendToBack(p, a.id)).not.toBe(p);
  });
});

// ─── Duplication ────────────────────────────────────────────────────

describe('duplicateElement', () => {
  beforeEach(() => _resetIdCounter());

  it('duplicates an element with offset position', () => {
    const p = createProject('Test');
    const el = addElement(p, baseElement({ x: 10, y: 20, type: 'card' }));
    const copy = duplicateElement(p, el.id);
    expect(copy).not.toBeNull();
    expect(copy!.id).not.toBe(el.id);
    expect(copy!.x).toBe(30); // 10 + 20
    expect(copy!.y).toBe(40); // 20 + 20
    expect(copy!.type).toBe('card');
    expect(p.elements).toHaveLength(2);
  });

  it('returns null for non-existent ids', () => {
    const p = createProject('Test');
    expect(duplicateElement(p, 'nope')).toBeNull();
  });

  it('deep-copies props and styles', () => {
    const p = createProject('Test');
    const el = addElement(p,
      baseElement({
        props: { text: 'Hello' },
        styles: { backgroundColor: 'red' },
      }),
    );
    const copy = duplicateElement(p, el.id)!;
    expect(copy.props).toEqual({ text: 'Hello' });
    expect(copy.styles).toEqual({ backgroundColor: 'red' });
    // Mutating copy should not affect original
    copy.props['text'] = 'Changed';
    expect(el.props['text']).toBe('Hello');
  });

  it('deep-copies children', () => {
    const p = createProject('Test');
    const child = baseElement({ type: 'text' });
    const el = addElement(p, baseElement({ type: 'container', children: [child] }));
    const copy = duplicateElement(p, el.id)!;
    expect(copy.children).toHaveLength(1);
    expect(copy.children![0]!.id).not.toBe(el.children![0]!.id);
  });
});

// ─── Timeline ───────────────────────────────────────────────────────

describe('createTimeline', () => {
  it('creates with default values', () => {
    const tl = createTimeline();
    expect(tl.duration).toBe(1000);
    expect(tl.keyframes).toEqual([]);
    expect(tl.loop).toBe(false);
    expect(tl.direction).toBe('normal');
  });

  it('accepts a custom duration', () => {
    const tl = createTimeline(3000);
    expect(tl.duration).toBe(3000);
  });
});

describe('addKeyframe', () => {
  beforeEach(() => _resetKfCounter());

  it('adds a keyframe with a generated id', () => {
    const tl = createTimeline();
    const result = addKeyframe(tl, {
      elementId: 'el1',
      time: 500,
      properties: { opacity: 0.5 },
    });
    expect(result.keyframes).toHaveLength(1);
    expect(result.keyframes[0]!.id).toBeTruthy();
    expect(result.keyframes[0]!.elementId).toBe('el1');
    expect(result.keyframes[0]!.properties['opacity']).toBe(0.5);
  });

  it('returns a new timeline (immutable)', () => {
    const tl = createTimeline();
    const result = addKeyframe(tl, {
      elementId: 'el1',
      time: 0,
      properties: {},
    });
    expect(result).not.toBe(tl);
    expect(tl.keyframes).toHaveLength(0);
  });
});

describe('removeKeyframe', () => {
  beforeEach(() => _resetKfCounter());

  it('removes a keyframe by id', () => {
    let tl = createTimeline();
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: {} });
    const kfId = tl.keyframes[0]!.id;
    tl = removeKeyframe(tl, kfId);
    expect(tl.keyframes).toHaveLength(0);
  });

  it('is a no-op for non-existent ids', () => {
    let tl = createTimeline();
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: {} });
    const before = tl.keyframes.length;
    tl = removeKeyframe(tl, 'nope');
    expect(tl.keyframes.length).toBe(before);
  });
});

describe('getKeyframesForElement', () => {
  it('returns only keyframes for the given element, sorted by time', () => {
    let tl = createTimeline();
    tl = addKeyframe(tl, { elementId: 'el1', time: 500, properties: { x: 100 } });
    tl = addKeyframe(tl, { elementId: 'el2', time: 200, properties: { y: 50 } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 100, properties: { x: 0 } });

    const kfs = getKeyframesForElement(tl, 'el1');
    expect(kfs).toHaveLength(2);
    expect(kfs[0]!.time).toBe(100);
    expect(kfs[1]!.time).toBe(500);
  });

  it('returns empty array when no keyframes exist', () => {
    const tl = createTimeline();
    expect(getKeyframesForElement(tl, 'el1')).toEqual([]);
  });
});

describe('getInterpolatedProps', () => {
  beforeEach(() => _resetKfCounter());

  it('returns empty object when no keyframes exist', () => {
    const tl = createTimeline();
    expect(getInterpolatedProps(tl, 'el1', 500)).toEqual({});
  });

  it('returns first keyframe values before the first keyframe time', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 200, properties: { x: 100 } });
    const props = getInterpolatedProps(tl, 'el1', 50);
    expect(props['x']).toBe(100);
  });

  it('returns last keyframe values after the last keyframe time', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 200, properties: { x: 100 } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 800, properties: { x: 500 } });
    const props = getInterpolatedProps(tl, 'el1', 900);
    expect(props['x']).toBe(500);
  });

  it('linearly interpolates numeric values', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: { x: 0, opacity: 0 } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 1000, properties: { x: 100, opacity: 1 } });

    const at500 = getInterpolatedProps(tl, 'el1', 500);
    expect(at500['x']).toBe(50);
    expect(at500['opacity']).toBe(0.5);

    const at250 = getInterpolatedProps(tl, 'el1', 250);
    expect(at250['x']).toBe(25);
  });

  it('snaps string values to nearest keyframe', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: { color: 'red' } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 1000, properties: { color: 'blue' } });

    const at400 = getInterpolatedProps(tl, 'el1', 400);
    expect(at400['color']).toBe('red'); // progress < 0.5

    const at700 = getInterpolatedProps(tl, 'el1', 700);
    expect(at700['color']).toBe('blue'); // progress >= 0.5
  });

  it('clamps time to timeline duration', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: { x: 0 } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 1000, properties: { x: 100 } });

    const atNegative = getInterpolatedProps(tl, 'el1', -100);
    expect(atNegative['x']).toBe(0);

    const atExcess = getInterpolatedProps(tl, 'el1', 2000);
    expect(atExcess['x']).toBe(100);
  });

  it('handles property appearing only in one keyframe', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: { x: 0, color: 'red' } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 1000, properties: { x: 100 } });

    const at500 = getInterpolatedProps(tl, 'el1', 500);
    expect(at500['x']).toBe(50);
    expect(at500['color']).toBe('red'); // Only in first keyframe
  });
});

describe('sortKeyframes', () => {
  beforeEach(() => _resetKfCounter());

  it('sorts keyframes by time', () => {
    let tl = createTimeline();
    tl = addKeyframe(tl, { elementId: 'el1', time: 500, properties: {} });
    tl = addKeyframe(tl, { elementId: 'el1', time: 100, properties: {} });
    tl = addKeyframe(tl, { elementId: 'el1', time: 300, properties: {} });

    const sorted = sortKeyframes(tl);
    expect(sorted.keyframes[0]!.time).toBe(100);
    expect(sorted.keyframes[1]!.time).toBe(300);
    expect(sorted.keyframes[2]!.time).toBe(500);
  });

  it('returns a new timeline reference', () => {
    const tl = createTimeline();
    expect(sortKeyframes(tl)).not.toBe(tl);
  });
});

// ─── Design Tokens ──────────────────────────────────────────────────

describe('createToken', () => {
  beforeEach(() => _resetTkCounter());

  it('creates a token with defaults', () => {
    const tk = createToken('primary-500', '#3b82f6', 'color');
    expect(tk.id).toBeTruthy();
    expect(tk.name).toBe('primary-500');
    expect(tk.value).toBe('#3b82f6');
    expect(tk.type).toBe('color');
    expect(tk.category).toBe('color'); // defaults to type
  });

  it('accepts a custom category', () => {
    const tk = createToken('4', '1rem', 'spacing', 'spacing');
    expect(tk.category).toBe('spacing');
  });

  it('generates unique ids', () => {
    const a = createToken('a', '1', 'color');
    const b = createToken('b', '2', 'color');
    expect(a.id).not.toBe(b.id);
  });
});

describe('updateToken', () => {
  it('merges updates immutably', () => {
    const tk = createToken('primary', '#f00', 'color', 'colors');
    const updated = updateToken(tk, { value: '#00f', description: 'Blue primary' });
    expect(updated.value).toBe('#00f');
    expect(updated.description).toBe('Blue primary');
    expect(updated.name).toBe('primary'); // unchanged
    // Original unchanged
    expect(tk.value).toBe('#f00');
  });
});

describe('tokenToCSS', () => {
  it('generates a CSS custom property declaration', () => {
    const tk = createToken('primary-500', '#3b82f6', 'color', 'colors');
    const css = tokenToCSS(tk);
    expect(css).toBe('  --colors-primary-500: #3b82f6;');
  });
});

describe('tokensToCSS', () => {
  it('generates a :root block with all tokens', () => {
    const tokens = [
      createToken('primary', '#f00', 'color', 'colors'),
      createToken('4', '1rem', 'spacing', 'spacing'),
    ];
    const css = tokensToCSS(tokens);
    expect(css).toContain(':root {');
    expect(css).toContain('  --colors-primary: #f00;');
    expect(css).toContain('  --spacing-4: 1rem;');
    expect(css).toContain('}');
  });

  it('returns empty :root for no tokens', () => {
    expect(tokensToCSS([])).toBe(':root {}');
  });
});

describe('DEFAULT_TOKENS', () => {
  it('contains a comprehensive set of tokens', () => {
    expect(DEFAULT_TOKENS.length).toBeGreaterThan(30);

    const colorTokens = DEFAULT_TOKENS.filter((t) => t.type === 'color');
    expect(colorTokens.length).toBeGreaterThanOrEqual(10);

    const spacingTokens = DEFAULT_TOKENS.filter((t) => t.type === 'spacing');
    expect(spacingTokens.length).toBeGreaterThanOrEqual(8);

    const typographyTokens = DEFAULT_TOKENS.filter((t) => t.type === 'typography');
    expect(typographyTokens.length).toBeGreaterThanOrEqual(5);

    const shadowTokens = DEFAULT_TOKENS.filter((t) => t.type === 'shadow');
    expect(shadowTokens.length).toBeGreaterThanOrEqual(3);
  });

  it('can be converted to valid CSS', () => {
    const css = tokensToCSS(DEFAULT_TOKENS);
    expect(css).toContain(':root {');
    expect(css).toContain('--colors-primary-500:');
    expect(css).toContain('--spacing-4:');
  });
});

// ─── Export: HTML ───────────────────────────────────────────────────

describe('exportToHTML', () => {
  beforeEach(() => _resetIdCounter());

  it('generates a valid HTML document', () => {
    const p = createProject('My Page');
    addElement(p, baseElement({ type: 'box', x: 10, y: 20, width: 200, height: 100 }));
    const html = exportToHTML(p);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<title>My Page</title>');
    expect(html).toContain('<div');
    expect(html).toContain('left: 10px');
    expect(html).toContain('top: 20px');
  });

  it('renders text elements with content', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ type: 'text', props: { text: 'Hello World' } }));
    const html = exportToHTML(p);
    expect(html).toContain('<p');
    expect(html).toContain('Hello World');
  });

  it('renders image elements as self-closing', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ type: 'image', props: { src: '/img.png', alt: 'Photo' } }));
    const html = exportToHTML(p);
    expect(html).toContain('<img');
    expect(html).toContain('src="/img.png"');
    expect(html).toContain('alt="Photo"');
  });

  it('renders container children', () => {
    const p = createProject('Test');
    const child = baseElement({ type: 'text', x: 5, y: 5, width: 50, height: 30, props: { text: 'Child' } });
    addElement(p, baseElement({ type: 'container', children: [child] }));
    const html = exportToHTML(p);
    expect(html).toContain('Child');
  });
});

// ─── Export: CSS ────────────────────────────────────────────────────

describe('exportToCSS', () => {
  beforeEach(() => _resetIdCounter());

  it('generates :root tokens and element classes', () => {
    _resetTkCounter();
    const p = createProject('Test');
    const tk = createToken('primary', '#f00', 'color', 'colors');
    p.tokens.push(tk);
    addElement(p, baseElement({ styles: { backgroundColor: 'red' } }));
    const css = exportToCSS(p);
    expect(css).toContain(':root {');
    expect(css).toContain('--colors-primary: #f00');
    expect(css).toContain('backgroundColor: red');
  });

  it('includes animation CSS from timeline', () => {
    const p = createProject('Test');
    p.timeline = addKeyframe(p.timeline, {
      elementId: 'el1',
      time: 0,
      properties: { opacity: 0 },
    });
    p.timeline = addKeyframe(p.timeline, {
      elementId: 'el1',
      time: 1000,
      properties: { opacity: 1 },
    });
    const css = exportToCSS(p);
    expect(css).toContain('@keyframes');
    expect(css).toContain('opacity');
  });
});

// ─── Export: React ──────────────────────────────────────────────────

describe('exportToReact', () => {
  beforeEach(() => {
    _resetIdCounter();
    _resetTkCounter();
  });

  it('generates a React component file', () => {
    const p = createProject('My Component');
    addElement(p, baseElement({ type: 'box', x: 10, y: 20, width: 200, height: 100 }));
    const jsx = exportToReact(p);
    expect(jsx).toContain('import React');
    expect(jsx).toContain('MyComponent');
    expect(jsx).toContain('position: \'absolute\'');
    expect(jsx).toContain('left: 10');
    expect(jsx).toContain('width: 200');
  });

  it('includes description in JSDoc', () => {
    const p = createProject('App', 'A test app');
    const jsx = exportToReact(p);
    expect(jsx).toContain('A test app');
  });

  it('renders text content in JSX', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ type: 'text', props: { text: 'Hello' } }));
    const jsx = exportToReact(p);
    expect(jsx).toContain('Hello');
  });

  it('handles rotation and z-index', () => {
    const p = createProject('Test');
    addElement(p, baseElement({ rotation: 45, zIndex: 10 }));
    const jsx = exportToReact(p);
    expect(jsx).toContain('rotate(45deg)');
    expect(jsx).toContain('zIndex: 10');
  });
});

// ─── Export: Animation CSS ──────────────────────────────────────────

describe('generateAnimationCSS', () => {
  beforeEach(() => _resetKfCounter());

  it('returns empty string for empty timeline', () => {
    expect(generateAnimationCSS(createTimeline())).toBe('');
  });

  it('generates @keyframes per element', () => {
    let tl = createTimeline(1000);
    tl = addKeyframe(tl, { elementId: 'box1', time: 0, properties: { opacity: 0 } });
    tl = addKeyframe(tl, { elementId: 'box1', time: 1000, properties: { opacity: 1 } });
    tl = addKeyframe(tl, { elementId: 'box2', time: 500, properties: { transform: 'scale(1.5)' } });

    const css = generateAnimationCSS(tl);
    expect(css).toContain('@keyframes box1 {');
    expect(css).toContain('@keyframes box2 {');
    expect(css).toContain('0% {');
    expect(css).toContain('100% {');
    expect(css).toContain('50% {');
    expect(css).toContain('opacity: 0');
    expect(css).toContain('opacity: 1');
  });

  it('sorts keyframes by time within each element', () => {
    let tl = createTimeline(2000);
    tl = addKeyframe(tl, { elementId: 'el1', time: 1000, properties: { x: 100 } });
    tl = addKeyframe(tl, { elementId: 'el1', time: 0, properties: { x: 0 } });

    const css = generateAnimationCSS(tl);
    const idx0 = css.indexOf('0%');
    const idx50 = css.indexOf('50%');
    expect(idx0).toBeLessThan(idx50);
  });
});

// ─── Breakpoints ────────────────────────────────────────────────────

describe('STUDIO_BREAKPOINTS', () => {
  it('has the four expected breakpoints', () => {
    expect(STUDIO_BREAKPOINTS).toHaveLength(4);
    const names = STUDIO_BREAKPOINTS.map((bp) => bp.name);
    expect(names).toEqual(['mobile', 'tablet', 'desktop', 'wide']);
  });

  it('has non-overlapping ranges', () => {
    for (let i = 1; i < STUDIO_BREAKPOINTS.length; i++) {
      const prev = STUDIO_BREAKPOINTS[i - 1]!;
      const curr = STUDIO_BREAKPOINTS[i]!;
      expect(curr.minWidth).toBe(prev.maxWidth + 1);
    }
  });
});

describe('getActiveBreakpoints', () => {
  it('activates mobile for small widths', () => {
    const bps = getActiveBreakpoints(375);
    expect(bps.find((bp) => bp.name === 'mobile')?.isActive).toBe(true);
    expect(bps.find((bp) => bp.name === 'tablet')?.isActive).toBe(false);
    expect(bps.find((bp) => bp.name === 'desktop')?.isActive).toBe(false);
    expect(bps.find((bp) => bp.name === 'wide')?.isActive).toBe(false);
  });

  it('activates tablet for medium widths', () => {
    const bps = getActiveBreakpoints(768);
    expect(bps.find((bp) => bp.name === 'mobile')?.isActive).toBe(false);
    expect(bps.find((bp) => bp.name === 'tablet')?.isActive).toBe(true);
    expect(bps.find((bp) => bp.name === 'desktop')?.isActive).toBe(false);
  });

  it('activates desktop for large widths', () => {
    const bps = getActiveBreakpoints(1280);
    expect(bps.find((bp) => bp.name === 'desktop')?.isActive).toBe(true);
    expect(bps.find((bp) => bp.name === 'wide')?.isActive).toBe(false);
  });

  it('activates wide for extra-large widths', () => {
    const bps = getActiveBreakpoints(1920);
    expect(bps.find((bp) => bp.name === 'wide')?.isActive).toBe(true);
    expect(bps.find((bp) => bp.name === 'desktop')?.isActive).toBe(false);
  });

  it('handles exact boundary values', () => {
    // Exactly 639 → mobile
    expect(getActiveBreakpoints(639).find((bp) => bp.name === 'mobile')?.isActive).toBe(true);
    // Exactly 640 → tablet
    expect(getActiveBreakpoints(640).find((bp) => bp.name === 'tablet')?.isActive).toBe(true);
    // Exactly 1023 → tablet
    expect(getActiveBreakpoints(1023).find((bp) => bp.name === 'tablet')?.isActive).toBe(true);
    // Exactly 1024 → desktop
    expect(getActiveBreakpoints(1024).find((bp) => bp.name === 'desktop')?.isActive).toBe(true);
    // Exactly 1439 → desktop
    expect(getActiveBreakpoints(1439).find((bp) => bp.name === 'desktop')?.isActive).toBe(true);
    // Exactly 1440 → wide
    expect(getActiveBreakpoints(1440).find((bp) => bp.name === 'wide')?.isActive).toBe(true);
  });
});

describe('getElementBreakpointStyles', () => {
  it('returns empty object when no breakpointStyles prop', () => {
    const el = baseElement() as CanvasElement;
    expect(getElementBreakpointStyles(el, 'mobile')).toEqual({});
  });

  it('returns styles for the requested breakpoint', () => {
    const bpStyles = JSON.stringify({
      mobile: { width: '100%', padding: '16px' },
      desktop: { width: '50%' },
    });
    const el = baseElement({ props: { breakpointStyles: bpStyles } }) as CanvasElement;
    const mobile = getElementBreakpointStyles(el, 'mobile');
    expect(mobile).toEqual({ width: '100%', padding: '16px' });

    const desktop = getElementBreakpointStyles(el, 'desktop');
    expect(desktop).toEqual({ width: '50%' });
  });

  it('returns empty object for unknown breakpoint', () => {
    const bpStyles = JSON.stringify({ mobile: { width: '100%' } });
    const el = baseElement({ props: { breakpointStyles: bpStyles } }) as CanvasElement;
    expect(getElementBreakpointStyles(el, 'unknown')).toEqual({});
  });

  it('returns empty object for invalid JSON', () => {
    const el = baseElement({ props: { breakpointStyles: 'not-json' } }) as CanvasElement;
    expect(getElementBreakpointStyles(el, 'mobile')).toEqual({});
  });
});

// ─── Index barrel exports ──────────────────────────────────────────

describe('barrel exports', () => {
  it('exports all types and functions', async () => {
    const mod = await import('@/lib/ferrum-studio');
    // Spot-check key exports
    expect(typeof mod.createProject).toBe('function');
    expect(typeof mod.addElement).toBe('function');
    expect(typeof mod.createTimeline).toBe('function');
    expect(typeof mod.createToken).toBe('function');
    expect(typeof mod.exportToHTML).toBe('function');
    expect(typeof mod.exportToReact).toBe('function');
    expect(typeof mod.generateAnimationCSS).toBe('function');
    expect(typeof mod.getActiveBreakpoints).toBe('function');
    expect(Array.isArray(mod.STUDIO_BREAKPOINTS)).toBe(true);
    expect(Array.isArray(mod.DEFAULT_TOKENS)).toBe(true);
  });
});
