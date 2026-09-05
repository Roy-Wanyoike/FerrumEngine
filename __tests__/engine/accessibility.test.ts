/**
 * Tests for the Accessibility Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode } from '@/engine/core/graph';
import { analyzeAccessibility } from '@/engine/analyzer/accessibility';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return {
    id,
    name: id,
    kind,
    path,
    language: 'ts',
    loc: [1, 10],
    meta,
    contentHash: 'abc',
  };
}

describe('Accessibility Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect images without alt text', () => {
    const comp = makeNode('comp:Avatar', 'component', 'src/components/Avatar.tsx', {
      imgElements: [{ src: '/avatar.png', alt: undefined, line: 5 }],
    });
    addNode(graph, comp);

    const result = analyzeAccessibility(graph);
    const altFindings = result.findings.filter(f => f.ruleId === 'a11y/img-no-alt');
    expect(altFindings.length).toBeGreaterThan(0);
    expect(altFindings[0]!.severity).toBe('high');
  });

  it('should not flag images with alt text', () => {
    const comp = makeNode('comp:GoodAvatar', 'component', 'src/components/GoodAvatar.tsx', {
      imgElements: [{ src: '/avatar.png', alt: 'User avatar' }],
    });
    addNode(graph, comp);

    const result = analyzeAccessibility(graph);
    const altFindings = result.findings.filter(f => f.ruleId === 'a11y/img-no-alt');
    expect(altFindings).toHaveLength(0);
  });

  it('should detect form inputs without labels', () => {
    const comp = makeNode('comp:Form', 'component', 'src/components/Form.tsx', {
      formInputs: [{ name: 'email', hasLabel: false, line: 10 }],
    });
    addNode(graph, comp);

    const result = analyzeAccessibility(graph);
    const labelFindings = result.findings.filter(f => f.ruleId === 'a11y/no-label');
    expect(labelFindings.length).toBeGreaterThan(0);
    expect(labelFindings[0]!.severity).toBe('high');
  });

  it('should detect click handlers without keyboard support on custom elements', () => {
    const comp = makeNode('comp:Card', 'component', 'src/components/Card.tsx', {
      interactiveElements: [{ tag: 'div', onClick: true, onKeyDown: false, line: 15 }],
    });
    addNode(graph, comp);

    const result = analyzeAccessibility(graph);
    const kbFindings = result.findings.filter(f => f.ruleId === 'a11y/no-keyboard-handler');
    expect(kbFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing skip-to-content in layouts', () => {
    const layout = makeNode('layout:root', 'layout', 'src/app/layout.tsx', {
      hasSkipToContent: false,
    });
    addNode(graph, layout);

    const result = analyzeAccessibility(graph);
    const skipFindings = result.findings.filter(f => f.ruleId === 'a11y/no-skip-to-content');
    expect(skipFindings.length).toBeGreaterThan(0);
  });

  it('should not flag layouts with skip-to-content link', () => {
    const layout = makeNode('layout:root', 'layout', 'src/app/layout.tsx', {
      hasSkipToContent: true,
    });
    addNode(graph, layout);

    const result = analyzeAccessibility(graph);
    const skipFindings = result.findings.filter(f => f.ruleId === 'a11y/no-skip-to-content');
    expect(skipFindings).toHaveLength(0);
  });

  it('should return correct analysis metadata', () => {
    const result = analyzeAccessibility(graph);
    expect(result.analyzer).toBe('accessibility');
    expect(result.category).toBe('accessibility');
    expect(result.summary).toBeDefined();
  });
});
