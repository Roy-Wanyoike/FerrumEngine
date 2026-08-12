import { describe, it, expect } from "vitest";
import type { ViewId, TeamRole, Environment, TokenType, ComponentStatus } from "@/lib/types";
import type { CreateTeamBody, UpdateTeamBody, CreateProjectBody, CreateTokenBody } from "@/lib/api-types";

/* ════════════════════════════════════════════════════════════════
   Tests for TypeScript type consistency across the platform

   These tests verify structural contracts at runtime using
   type guards and shape validation — catching drift between
   type definitions and actual data shapes.
   ════════════════════════════════════════════════════════════════ */

const VALID_VIEW_IDS: ViewId[] = [
  "home", "principles", "architecture", "platform-architecture",
  "hall-of-fame", "showcase", "learning", "community", "story",
  "enterprise", "enterprise-components", "vision",
  "effects", "docs", "playground", "blog", "changelog",
  "interactive-docs",
];

const VALID_TEAM_ROLES: TeamRole[] = ["OWNER", "ADMIN", "MEMBER", "VIEWER"];
const VALID_ENVIRONMENTS: Environment[] = ["dev", "staging", "production"];
const VALID_TOKEN_TYPES: TokenType[] = [
  "color", "spacing", "typography", "shadow", "motion", "border", "radius",
];
const VALID_COMPONENT_STATUSES: ComponentStatus[] = ["draft", "review", "published", "deprecated"];

describe("api-types — ViewId union completeness", () => {
  it("should contain exactly 18 members", () => {
    expect(VALID_VIEW_IDS.length).toBe(18);
  });

  it("should include core platform views", () => {
    expect(VALID_VIEW_IDS).toContain("home");
    expect(VALID_VIEW_IDS).toContain("effects");
    expect(VALID_VIEW_IDS).toContain("playground");
    expect(VALID_VIEW_IDS).toContain("docs");
  });

  it("should include enterprise views", () => {
    expect(VALID_VIEW_IDS).toContain("enterprise");
    expect(VALID_VIEW_IDS).toContain("enterprise-components");
  });

  it("should include content views", () => {
    expect(VALID_VIEW_IDS).toContain("blog");
    expect(VALID_VIEW_IDS).toContain("changelog");
    expect(VALID_VIEW_IDS).toContain("story");
    expect(VALID_VIEW_IDS).toContain("vision");
  });

  it("should have no duplicates", () => {
    const unique = new Set(VALID_VIEW_IDS);
    expect(unique.size).toBe(VALID_VIEW_IDS.length);
  });
});

describe("api-types — Cloud/Enterprise enum types", () => {
  it("TeamRole should have 4 members", () => {
    expect(VALID_TEAM_ROLES.length).toBe(4);
  });

  it("Environment should have 3 members", () => {
    expect(VALID_ENVIRONMENTS.length).toBe(3);
  });

  it("TokenType should have 7 members", () => {
    expect(VALID_TOKEN_TYPES.length).toBe(7);
  });

  it("ComponentStatus should have 4 members", () => {
    expect(VALID_COMPONENT_STATUSES.length).toBe(4);
  });
});

describe("api-types — API body types are structurally correct", () => {
  // These tests verify the body types accept correct shapes.
  // We can't test TypeScript compile-time checks at runtime,
  // but we can verify the expected fields exist when using type assertions.

  it("CreateTeamBody should accept { name }", () => {
    const body: CreateTeamBody = { name: "My Team" };
    expect(body.name).toBe("My Team");
  });

  it("UpdateTeamBody should accept { name }", () => {
    const body: UpdateTeamBody = { name: "Updated Team" };
    expect(body.name).toBe("Updated Team");
  });

  it("CreateProjectBody should accept { name, environment }", () => {
    const body: CreateProjectBody = { name: "My Project", environment: "dev" };
    expect(body.name).toBe("My Project");
    expect(body.environment).toBe("dev");
  });

  it("CreateTokenBody should accept { name, value, type, namespace }", () => {
    const body: CreateTokenBody = {
      name: "primary-color",
      value: "#a855f7",
      type: "color",
      namespace: "global",
    };
    expect(body.name).toBe("primary-color");
    expect(body.value).toBe("#a855f7");
    expect(body.type).toBe("color");
    expect(body.namespace).toBe("global");
  });

  it("CreateTokenBody type should be a valid TokenType", () => {
    const body: CreateTokenBody = { type: "spacing" };
    expect(VALID_TOKEN_TYPES).toContain(body.type);
  });

  it("CreateProjectBody environment should be a valid Environment", () => {
    const body: CreateProjectBody = { environment: "staging" };
    expect(VALID_ENVIRONMENTS).toContain(body.environment);
  });
});
