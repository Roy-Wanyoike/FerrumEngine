/**
 * Tests for the AI Agent Gateway.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { AgentGateway } from '@/engine/agent/gateway';
import type { AgentIdentity, ProposedChange } from '@/engine/core/types';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import type { GraphNode } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta: {}, contentHash: 'abc' };
}

function makeAgent(overrides: Partial<AgentIdentity> = {}): AgentIdentity {
  return { id: 'test-agent', type: 'ai-assistant', scopes: ['read', 'analyze', 'suggest'], ...overrides };
}

function makeRequest(agent: AgentIdentity, operation: string, params: unknown = {}) {
  return { requestId: 'req-1', agent, operation, params, timestamp: Date.now() };
}

describe('Agent Gateway', () => {
  let gateway: AgentGateway;
  let graph: ReturnType<typeof createGraph>;

  beforeEach(() => {
    gateway = new AgentGateway({ requireHumanApproval: false, autoBlockThreshold: 'critical' });
    graph = createGraph('/test');
  });

  it('should allow read operations for agents with read scope', async () => {
    const agent = makeAgent({ scopes: ['read'] });
    const response = await gateway.handleRequest(makeRequest(agent, 'inspect_project'));
    expect(response.allowed).toBe(true);
  });

  it('should deny operations without required scope', async () => {
    const agent = makeAgent({ scopes: ['read'] });
    const response = await gateway.handleRequest(makeRequest(agent, 'apply_safe_change'));
    expect(response.allowed).toBe(false);
    expect(response.error).toContain('scope');
  });

  it('should deny unknown operations', async () => {
    const agent = makeAgent({ scopes: ['read', 'modify'] });
    const response = await gateway.handleRequest(makeRequest(agent, 'destroy_everything'));
    expect(response.allowed).toBe(false);
    expect(response.error).toContain('Unknown operation');
  });

  it('should require explicit modify scope for autonomous agents', async () => {
    const agent = makeAgent({ type: 'autonomous', scopes: ['read', 'suggest'] });
    const response = await gateway.handleRequest(makeRequest(agent, 'apply_safe_change'));
    expect(response.allowed).toBe(false);
  });

  it('should verify changes against the graph', async () => {
    addNode(graph, makeNode('auth', 'file', 'src/lib/auth.ts'));
    addNode(graph, makeNode('comp', 'component', 'src/comp.tsx'));
    connect(graph, 'comp', 'auth', 'imports');

    const agent = makeAgent({ scopes: ['read', 'modify'] });
    const changes: ProposedChange[] = [{
      filePath: 'src/lib/auth.ts',
      originalHash: 'abc',
      proposedContent: 'new content',
      description: 'Update auth',
    }];
    const response = await gateway.handleRequest(makeRequest(agent, 'apply_safe_change', { changes }), graph);
    expect(response.allowed).toBe(false);
    expect(response.risk).toBe('critical');
  });

  it('should maintain an audit log', async () => {
    const agent = makeAgent({ scopes: ['read'] });
    await gateway.handleRequest(makeRequest(agent, 'inspect_project'));
    await gateway.handleRequest(makeRequest(agent, 'inspect_architecture'));
    const log = gateway.getAuditLog();
    expect(log).toHaveLength(2);
    expect(log[0]!.operation).toBe('inspect_project');
  });

  it('should block changes exceeding maxFilesPerRequest', async () => {
    gateway = new AgentGateway({ maxFilesPerRequest: 2, requireHumanApproval: false, autoBlockThreshold: 'critical' });
    const agent = makeAgent({ scopes: ['read', 'modify'] });
    const changes = Array(5).fill(null).map((_, i) => ({
      filePath: `src/file${i}.ts`, originalHash: 'abc', proposedContent: 'new', description: `Change ${i}`,
    }));
    const response = await gateway.handleRequest(makeRequest(agent, 'apply_safe_change', { changes }), graph);
    expect(response.allowed).toBe(false);
    expect(response.findings!.some(f => f.ruleId === 'gateway/max-files')).toBe(true);
  });
});
