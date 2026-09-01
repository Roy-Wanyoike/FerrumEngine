# AI Agent Gateway & Safety Gate — Deep Dive

> FerrumEngine's Agent Gateway is the safety layer between autonomous AI
> agents and production code. It ensures that AI-generated changes are
> analyzed, risk-assessed, and approved before they reach your codebase.

---

## Table of Contents

1. [The Problem](#the-problem)
2. [Gateway Protocol](#gateway-protocol)
3. [Structured API](#structured-api)
4. [Scope-Based Permission System](#scope-based-permission-system)
5. [Sandboxing & Isolation](#sandboxing--isolation)
6. [Approval Policies](#approval-policies)
7. [Audit Logging](#audit-logging)
8. [Autonomous Verification Loop](#autonomous-verification-loop)
9. [Configuration Reference](#configuration-reference)
10. [Security Model](#security-model)
11. [Integration Examples](#integration-examples)

---

## The Problem

AI coding agents (Claude, GPT, Copilot Workspace, Cursor, Devin, etc.) can
generate code at superhuman speed. But speed without safety is a liability.

Current problems:

1. **No blast radius awareness** — Agents don't know what their changes
   will affect transitively
2. **No security boundary checking** — Agents may inadvertently modify
   authentication, authorization, or payment logic
3. **No audit trail** — When an AI makes a mistake, there's no record
   of what was requested, what was allowed, and why
4. **No risk assessment** — Every change is treated equally, regardless
   of whether it touches a utility function or the auth middleware
5. **No feedback loop** — Agents generate code but can't verify it
   against the project's actual architecture

FerrumEngine's Agent Gateway solves all five problems by acting as a
**safety gate** that sits between the agent and the codebase.

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│  AI Agent   │────▶│  Ferrum Gateway  │────▶│  Codebase    │
│ (Claude,    │     │  ┌────────────┐  │     │              │
│  GPT, etc.) │◀────│  │ Permission  │  │     │              │
│             │     │  │ Validation  │  │     │              │
│             │────▶│  │ Risk Assess │  │────▶│              │
│             │     │  │ Impact Trace│  │     │              │
│             │◀────│  │ Audit Log   │  │     │              │
│             │     │  └────────────┘  │     │              │
└─────────────┘     └──────────────────┘     └──────────────┘
```

---

## Gateway Protocol

Every interaction between an AI agent and Ferrum follows a strict protocol:

### Step 1: Authentication

The agent identifies itself with an `AgentIdentity`:

```typescript
const agent: AgentIdentity = {
  id: "claude-code-assistant",
  type: "ai-assistant",     // human | ai-assistant | autonomous
  scopes: ["read", "analyze", "suggest", "modify"],
};
```

### Step 2: Request

The agent sends a structured `AgentRequest`:

```typescript
const request: AgentRequest = {
  requestId: "req_abc123",
  agent,
  operation: "apply_safe_change",
  params: {
    changes: [
      {
        filePath: "src/lib/utils.ts",
        originalHash: "a4f2c1",
        proposedContent: "...new content...",
        description: "Add formatDate function with timezone support",
      },
    ],
  },
  timestamp: Date.now(),
};
```

### Step 3: Permission Validation

Ferrum checks if the agent has the required scope for the requested operation.

### Step 4: Analysis

For `modify` operations, Ferrum runs the full analysis pipeline:
1. Impact analysis on proposed changes
2. Security boundary check
3. Blast radius assessment
4. Risk classification

### Step 5: Response

Ferrum returns a structured `AgentResponse`:

```typescript
const response: AgentResponse = {
  requestId: "req_abc123",
  allowed: true,
  risk: "low",
  findings: [],
  durationMs: 34,
};
```

---

## Structured API

### `inspect_project()`

Returns a summary of the project's structure and health.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_001",
  agent,
  operation: "inspect_project",
  params: { includeScores: true },
  timestamp: Date.now(),
}, graph);

// Response:
// {
//   allowed: true,
//   data: {
//     stats: { totalNodes: 4823, totalEdges: 15742, ... },
//     scores: { overall: 72, grade: "C", dimensions: [...] },
//     framework: "nextjs",
//   }
// }
```

**Required scope:** `read`

### `inspect_architecture()`

Returns the architectural layer structure and any violations.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_002",
  agent,
  operation: "inspect_architecture",
  params: {},
  timestamp: Date.now(),
}, graph);

// Response includes:
// - Layer hierarchy
// - Layer violations (e.g., components importing from pages)
// - Circular dependencies
// - Coupling hotspots
```

**Required scope:** `read`

### `inspect_dependencies()`

Returns the dependency graph for a specific node.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_003",
  agent,
  operation: "inspect_dependencies",
  params: { nodeId: "n_1a2b3c", depth: 3 },
  timestamp: Date.now(),
}, graph);

// Response includes:
// - Direct dependencies
// - Transitive dependencies (up to specified depth)
// - Dependency paths to specific targets
```

**Required scope:** `read`

### `inspect_user_journey()`

Returns the nodes and edges involved in a user journey.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_004",
  agent,
  operation: "inspect_user_journey",
  params: { journey: "checkout-flow" },
  timestamp: Date.now(),
}, graph);

// Response includes:
// - Journey steps and their components
// - API calls per step
// - Test coverage per step
// - Security-sensitive steps
```

**Required scope:** `read`

### `analyze_change()`

Runs impact analysis on proposed changes without modifying files.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_005",
  agent,
  operation: "analyze_change",
  params: {
    changedFiles: ["src/lib/auth.ts"],
  },
  timestamp: Date.now(),
}, graph);

// Response:
// {
//   allowed: true,
//   data: {
//     risk: "critical",
//     affectedRoutes: ["/dashboard", "/settings"],
//     affected: [...],
//     securityImplications: [...],
//     recommendedVerification: [...],
//   }
// }
```

**Required scope:** `analyze`

### `verify_change()`

Verifies a proposed code change and returns approval/denial.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_006",
  agent,
  operation: "verify_change",
  params: {
    changes: [
      {
        filePath: "src/lib/utils.ts",
        originalHash: "a4f2c1",
        proposedContent: "...new content...",
        description: "Add formatDate with timezone support",
      },
    ],
  },
  timestamp: Date.now(),
}, graph);

// Response:
// {
//   allowed: true,
//   data: {
//     approved: true,
//     risk: "low",
//     findings: [],
//     requiredActions: ["Run existing test suite to verify no regressions"],
//   }
// }
```

**Required scope:** `analyze`

### `propose_change()`

A structured way for an agent to propose a change with full context.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_007",
  agent,
  operation: "suggest_refactor",
  params: {
    target: "src/components/UserProfile.tsx",
  	reason: "Component exceeds 500 lines, violates arch/file-size rule",
      suggestion: "Extract avatar section into AvatarSection component",
    },
  timestamp: Date.now(),
}, graph);
```

**Required scope:** `suggest`

### `apply_safe_change()`

The critical operation — requests permission to actually modify files.

```typescript
const response = await gateway.handleRequest({
  requestId: "req_008",
  agent,
  operation: "apply_safe_change",
  params: {
    changes: [
      {
        filePath: "src/lib/utils.ts",
        originalHash: "a4f2c1",
        proposedContent: "...new content...",
        description: "Add formatDate function with timezone support",
      },
    ],
  },
  timestamp: Date.now(),
}, graph);
```

**Required scope:** `modify`

This operation triggers the full verification pipeline:
1. Permission check (agent has `modify` scope)
2. File count check (within `maxFilesPerRequest`)
3. Impact analysis (blast radius)
4. Security check (security-sensitive code)
5. Risk assessment (auto-block threshold)
6. Human approval check (if configured)

---

## Scope-Based Permission System

FerrumEngine uses a 6-level scope system. Each scope grants access to
a specific set of operations.

### Scopes

| Scope | Description | Operations Granted |
|-------|-------------|-------------------|
| `read` | Read-only project inspection | `inspect_project`, `inspect_architecture`, `inspect_dependencies`, `inspect_user_journey`, `explain` |
| `analyze` | Run analysis without modifying | `analyze_change`, `analyze_security`, `analyze_performance`, `analyze_accessibility`, `analyze_reliability` |
| `test` | Run test suites | `run_tests`, `detect_regressions` |
| `suggest` | Suggest changes (no modify) | `suggest_refactor`, `generate_test_plan` |
| `modify` | Apply code changes | `apply_safe_change`, `prepare_pull_request` |
| `deploy` | Trigger deployments | `deploy` |

### Scope Hierarchy

Scopes are hierarchical — higher scopes imply lower ones:

```
deploy ⊃ modify ⊃ suggest ⊃ test ⊃ analyze ⊃ read
```

An agent with `modify` scope implicitly has `read`, `analyze`, `test`, and
`suggest` scopes.

### Agent Types

| Type | Description | Restrictions |
|------|-------------|--------------|
| `human` | A human developer operating through the API | No additional restrictions |
| `ai-assistant` | An AI that assists a human (Copilot, Cursor) | May be rate-limited; always requires human approval for `modify` |
| `autonomous` | A fully autonomous agent (Devin, CI agent) | Must have explicit `modify` scope; may be blocked by `autoBlockThreshold` |

### Permission Check Example

```typescript
// Agent with read-only scope tries to modify code
const response = await gateway.handleRequest({
  requestId: "req_denied",
  agent: {
    id: "readonly-bot",
    type: "ai-assistant",
    scopes: ["read"],  // No modify scope!
  },
  operation: "apply_safe_change",
  params: { changes: [...] },
  timestamp: Date.now(),
}, graph);

// Response:
// {
//   allowed: false,
//   error: "Operation 'apply_safe_change' requires one of these scopes: modify. Agent has: read"
// }
```

---

## Sandboxing & Isolation

### Proposed Change Validation

Every `apply_safe_change` request includes `originalHash` — the content hash
of the file before the change. FerrumEngine validates this hash to prevent:

1. **Stale changes** — Agent based its change on an old version of the file
2. **Race conditions** — Another process modified the file between analysis and application
3. **Version confusion** — Agent is editing the wrong branch/version

```typescript
interface ProposedChange {
  filePath: string;        // Which file to change
  originalHash: string;    // Content hash BEFORE the change
  proposedContent: string; // New file content
  description: string;     // Human-readable description
}
```

### Content Hash Mismatch

If `originalHash` doesn't match the current file's hash, the change is
denied:

```typescript
// Gateway checks:
const currentHash = contentHash(fs.readFileSync(change.filePath, 'utf-8'));
if (currentHash !== change.originalHash) {
  return {
    allowed: false,
    error: `Content hash mismatch for ${change.filePath}. File may have been modified since analysis. Re-analyze and retry.`
  };
}
```

### File Count Limiting

Agents are limited in how many files they can change in a single request.
This prevents:

1. **Accidental mass deletion** — An agent going haywire and rewriting everything
2. **Review overwhelm** — Changes too large for humans to review
3. **Blast radius amplification** — Larger change sets have non-linear risk

```typescript
// Default: max 20 files per request
if (changes.length > this.config.maxFilesPerRequest) {
  findings.push({
    severity: "high",
    title: `Agent requests ${changes.length} file changes (max: ${this.config.maxFilesPerRequest})`,
    description: "Large change sets increase regression risk and make review difficult.",
  });
}
```

---

## Approval Policies

### Auto-Block Threshold

The gateway can be configured to automatically block changes above a
certain risk level:

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: "critical",  // Block CRITICAL risk changes
});
```

| Threshold | Behavior |
|-----------|----------|
| `undefined` | Never auto-block (human reviews everything) |
| `"critical"` | Auto-block only CRITICAL risk changes |
| `"high"` | Auto-block HIGH and CRITICAL risk changes |
| `"medium"` | Auto-block MEDIUM, HIGH, and CRITICAL risk changes |
| `"low"` | Block everything (maximum safety) |

### Human Approval

When `requireHumanApproval` is true (default), `modify` operations return
`requiresHumanApproval: true` even if the change passes all checks:

```typescript
const response = await gateway.handleRequest({
  operation: "apply_safe_change",
  // ...
}, graph);

if (response.data?.requiresHumanApproval) {
  // Show the change to a human for final approval
  showDiffToUser(response.data.verification);
  const approved = await waitForHumanApproval();
  if (approved) applyChanges();
}
```

---

## Audit Logging

Every request to the gateway is recorded in an immutable audit log.

### Audit Entry

```typescript
interface AuditEntry {
  timestamp: number;     // When the request was made
  agentId: string;       // Which agent made the request
  agentType: string;     // human | ai-assistant | autonomous
  operation: string;     // What operation was requested
  allowed: boolean;      // Was it allowed?
  risk?: RiskLevel;      // Risk assessment (if applicable)
  reason?: string;       // Why it was denied (if denied)
  durationMs: number;    // How long the check took
}
```

### Accessing the Audit Log

```typescript
const gateway = new AgentGateway({
  onAudit: (entry) => {
    // Real-time callback for streaming to external systems
    sendToLoggingService(entry);
  },
});

// Get full log
const log = gateway.getAuditLog();
console.log(`${log.length} total requests`);
console.log(`${log.filter(e => !e.allowed).length} denied requests`);

// Filter by agent
const claudeLog = log.filter(e => e.agentId === "claude-code");

// Filter by time range
const recentLog = log.filter(e => e.timestamp > Date.now() - 86400000);
```

### Audit Log Use Cases

1. **Incident investigation** — "What did the AI agent change before the outage?"
2. **Compliance** — Regulatory requirements for tracking who/what/when changed code
3. **Agent behavior analysis** — How often does an agent get blocked? Why?
4. **Cost allocation** — Track which agents are making the most requests

---

## Autonomous Verification Loop

The killer feature of the Agent Gateway is the **autonomous verification loop** —
a structured protocol where an AI agent and FerrumEngine iterate until a
change passes all checks.

### Loop Protocol

```
1. Agent writes code change
         │
         ▼
2. Agent calls ferrum.verify_change(change)
         │
         ▼
3. Ferrum analyzes and returns findings
         │
         ▼
4. Agent receives feedback + findings
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 PASS     FAIL
    │         │
    ▼         ▼
 Apply    Agent fixes
 change   based on findings
              │
              ▼
           Go to step 2
```

### Pseudocode

```typescript
async function autonomousChange(
  gateway: AgentGateway,
  graph: ApplicationGraph,
  agent: AgentIdentity,
  filePath: string,
  originalContent: string,
  targetDescription: string,
  maxIterations = 5,
): Promise<AgentResponse | null> {
  let currentContent = originalContent;

  for (let i = 0; i < maxIterations; i++) {
    // Agent proposes change
    const proposedContent = await aiModel.generateCode({
      filePath,
      currentContent,
      target: targetDescription,
      // Include previous findings if this is a retry
      previousFindings: i > 0 ? lastFindings : undefined,
    });

    // Verify with Ferrum
    const response = await gateway.handleRequest({
      requestId: `req_loop_${i}`,
      agent,
      operation: "apply_safe_change",
      params: {
        changes: [
          {
            filePath,
            originalHash: contentHash(currentContent),
            proposedContent,
            description: targetDescription,
          },
        ],
      },
      timestamp: Date.now(),
    }, graph);

    if (response.allowed) {
      return response; // PASS
    }

    // FAIL — give agent the findings and retry
    lastFindings = response.findings ?? [];
    currentContent = currentContent; // Don't apply — try again
  }

  return null; // Exceeded max iterations
}
```

### Example: Fixing a Layer Violation

```
Iteration 1:
  Agent: Proposes adding import of auth.ts in Button.tsx
  Ferrum: DENIED — "Architectural violation: components/ imports from lib/auth.
           Components should not depend on auth directly. Use a hook instead."

Iteration 2:
  Agent: Creates useAuth hook in hooks/, imports auth.ts there,
          imports useAuth in Button.tsx
  Ferrum: ALLOWED — No violations detected. Risk: LOW.

Result: Agent learns the project's architectural rules through feedback.
```

---

## Configuration Reference

```typescript
interface GatewayConfig {
  /** Risk level above which changes are auto-blocked. */
  autoBlockThreshold?: RiskLevel;      // Default: "critical"

  /** Maximum files an agent can change in one request. */
  maxFilesPerRequest?: number;         // Default: 20

  /** Whether to require human approval for 'modify' scope. */
  requireHumanApproval?: boolean;      // Default: true

  /** Real-time audit log callback. */
  onAudit?: (entry: AuditEntry) => void;
}
```

### Example Configurations

#### Strict (for production)

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: "high",
  maxFilesPerRequest: 5,
  requireHumanApproval: true,
});
```

#### Permissive (for prototyping)

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: undefined,  // Never auto-block
  maxFilesPerRequest: 50,
  requireHumanApproval: false,     // Trust the agent
});
```

#### CI/CD (for automated pipelines)

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: "medium",
  maxFilesPerRequest: 10,
  requireHumanApproval: false,  // CI has no human
  onAudit: (entry) => {
    // Stream to centralized logging
    process.stdout.write(JSON.stringify(entry) + '\n');
  },
});
```

---

## Security Model

### Threat Model

| Threat | Mitigation |
|--------|-----------|
| Unauthorized agent | Scope-based permissions; agent must authenticate |
| Prompt injection via code | Agent Gateway doesn't execute code, only analyzes it |
| Mass file modification | `maxFilesPerRequest` limit |
| Stale content attacks | `originalHash` validation |
| Privilege escalation | Scope hierarchy enforced; `autonomous` type requires explicit `modify` |
| Audit log tampering | Audit entries are immutable once written |
| Data exfiltration | `read` scope doesn't expose file contents, only graph structure |

### What the Gateway Does NOT Do

1. **Does not execute code** — The gateway analyzes proposed changes
   structurally. It never runs the proposed code.
2. **Does not store file contents** — The gateway works with the graph
   model and content hashes, not raw file content.
3. **Does not make network requests** — The gateway is fully offline.
   No data leaves the machine.
4. **Does not replace code review** — Human approval (when configured)
   is still the final gate.

---

## Integration Examples

### Claude Code Integration

```typescript
// claude-tools.ts
import { AgentGateway } from '@/engine';
import { buildGraph } from '@/engine';

const { graph } = buildGraph(process.cwd());
const gateway = new AgentGateway({
  autoBlockThreshold: "high",
  requireHumanApproval: true,
});

export async function verifyWithFerrum(
  filePath: string,
  newContent: string,
): Promise<{ approved: boolean; feedback?: string }> {
  const oldContent = fs.readFileSync(filePath, 'utf-8');
  const response = await gateway.handleRequest({
    requestId: crypto.randomUUID(),
    agent: {
      id: "claude-code",
      type: "ai-assistant",
      scopes: ["read", "analyze", "suggest", "modify"],
    },
    operation: "apply_safe_change",
    params: {
      changes: [{
        filePath,
        originalHash: contentHash(oldContent),
        proposedContent: newContent,
        description: "Claude Code generated change",
      }],
    },
    timestamp: Date.now(),
  }, graph);

  return {
    approved: response.allowed,
    feedback: response.findings?.map(f => f.description).join('\n'),
  };
}
```

### CI/CD Gate

```yaml
# GitHub Actions
- name: Verify AI-generated changes
  run: |
    # Collect all files modified by the AI agent
    CHANGED=$(git diff --name-only HEAD~1 | grep -E '\.(ts|tsx|js|jsx)$')

    # Run impact analysis
    ferrum impact $CHANGED --format json --output impact.json

    # Block CRITICAL changes
    RISK=$(jq -r '.risk' impact.json)
    if [ "$RISK" = "critical" ]; then
      echo "::error::CRITICAL risk change detected. Human review required."
      jq -r '.recommendedVerification[]' impact.json
      exit 1
    fi
```

---

*This document describes the Agent Gateway as implemented in
`src/engine/agent/gateway.ts`.*
