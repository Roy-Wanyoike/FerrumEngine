/**
 * Type-safe request body types for Cloud API routes.
 * Each type uses optional fields because the body is validated at runtime.
 */

import type { TokenType, Environment } from "./types";

/** POST /api/cloud/teams */
export interface CreateTeamBody {
  name?: string;
}

/** PUT /api/cloud/teams/[teamId] */
export interface UpdateTeamBody {
  name?: string;
}

/** POST /api/cloud/teams/[teamId]/projects */
export interface CreateProjectBody {
  name?: string;
  environment?: Environment;
}

/** POST /api/cloud/projects/[projectId]/tokens */
export interface CreateTokenBody {
  name?: string;
  value?: string;
  type?: TokenType;
  namespace?: string;
}
