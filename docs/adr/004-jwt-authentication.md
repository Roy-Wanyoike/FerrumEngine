# ADR-004: JWT with httpOnly Cookies for Cloud Dashboard Auth

## Status
Accepted

## Context
The FerrumEngine platform includes a `/cloud` dashboard for team collaboration, design token management, and analytics. This dashboard requires authentication to protect sensitive data.

Authentication requirements:

- **Secure**: Credentials must never be exposed to JavaScript.
- **Stateless**: The API is stateless — no server-side sessions.
- **Scalable**: Auth tokens must work across multiple server instances.
- **CSRF protection**: Must prevent cross-site request forgery.

We evaluated:

1. **JWT in localStorage**: Simple but vulnerable to XSS attacks — any injected script can steal the token.

2. **JWT in httpOnly cookies**: Token stored in an httpOnly, Secure, SameSite cookie. Not accessible to JavaScript. Requires CSRF protection (SameSite=Strict/Lax + CSRF token for mutations).

3. **Server-side sessions**: Store session ID in cookie, session data in database/store. Adds state to the server, complicates horizontal scaling.

4. **OAuth2/OIDC only**: Delegate auth to a third-party provider (Auth0, Clerk, etc.). Adds external dependency and cost.

## Decision

We use **JWT tokens stored in httpOnly cookies**:

- On successful login, the server sets a `Set-Cookie` header with the JWT in an `httpOnly`, `Secure`, `SameSite=Lax` cookie.
- The JWT contains a `sub` (user ID), `exp` (expiration), and custom claims (team role, permissions).
- API routes verify the JWT using a shared secret or public key.
- A separate CSRF token is generated for mutation endpoints (POST/PUT/DELETE).
- Token refresh uses a rotating refresh token in a separate httpOnly cookie.
- The Supabase integration provides the user store; the JWT is our own layer on top.

## Consequences

### Positive
- **XSS-safe**: Tokens are not accessible to JavaScript, eliminating the primary XSS token-theft vector.
- **Stateless**: No server-side session store needed — JWT is self-contained.
- **Scalable**: Any server instance can verify the JWT using the shared secret.
- **Standard**: JWT is a well-understood standard with wide library support.

### Negative
- **Cookie size limits**: JWTs should be kept small (under 4KB). Large payloads require splitting or reference tokens.
- **No instant revocation**: Since JWTs are stateless, a revoked token is valid until `exp`. Short expiration times (15 minutes) and refresh token rotation mitigate this.
- **CSRF complexity**: httpOnly cookies are automatically sent with requests, requiring CSRF protection for state-changing operations. SameSite=Lax provides baseline protection.
- **Refresh token management**: Rotating refresh tokens add complexity — must track used refresh tokens to prevent replay attacks.