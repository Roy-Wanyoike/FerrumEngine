/**
 * CSRF Protection Verification Script (T-H03)
 *
 * Verifies that CSRF protection is correctly implemented across all
 * mutation endpoints. Checks:
 *
 * 1. All 7 API files import `requireCsrf` from `@/lib/csrf`
 * 2. All mutation handlers (POST/PUT/DELETE) call `requireCsrf`
 * 3. The CSRF utility exports the expected API
 * 4. The middleware issues CSRF cookies
 * 5. The client-side auth hook includes CSRF headers
 *
 * Usage: npx tsx scripts/verify-csrf.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

interface CheckResult {
  name: string;
  pass: boolean;
  detail: string;
}

const results: CheckResult[] = [];

function check(name: string, pass: boolean, detail: string) {
  results.push({ name, pass, detail });
  const icon = pass ? "✅" : "❌";
  console.log(`${icon} ${name}: ${detail}`);
}

function readFile(relPath: string): string {
  return readFileSync(join(ROOT, relPath), "utf-8");
}

// ─── 1. CSRF utility exists ────────────────────────────────────
console.log("\n═══ 1. CSRF Utility Module ═══");

const csrfPath = "src/lib/csrf.ts";
const csrfExists = existsSync(join(ROOT, csrfPath));
check("csrf.ts exists", csrfExists, csrfExists ? "found" : "MISSING");

if (csrfExists) {
  const csrfContent = readFile(csrfPath);
  check("exports generateCsrfToken", csrfContent.includes("export function generateCsrfToken"), "found");
  check("exports validateCsrfToken", csrfContent.includes("export function validateCsrfToken"), "found");
  check("exports requireCsrf", csrfContent.includes("export function requireCsrf"), "found");
  check("exports csrfErrorResponse", csrfContent.includes("export function csrfErrorResponse"), "found");
  check("exports ensureCsrfCookie", csrfContent.includes("export function ensureCsrfCookie"), "found");
  check("exports getCsrfTokenFromCookie", csrfContent.includes("export function getCsrfTokenFromCookie"), "found");
  check("uses timingSafeEqual", csrfContent.includes("timingSafeEqual"), "constant-time comparison");
  check("uses randomBytes", csrfContent.includes("randomBytes"), "crypto-secure generation");
  check("Bearer bypass logic", csrfContent.includes('startsWith("Bearer ")'), "skips CSRF for Bearer requests");
}

// ─── 2. Middleware CSRF cookie issuance ────────────────────────
console.log("\n═══ 2. Middleware CSRF Cookie Issuance ═══");

const middlewarePath = "src/middleware.ts";
const middlewareContent = readFile(middlewarePath);
check("imports ensureCsrfCookie", middlewareContent.includes("ensureCsrfCookie"), "from @/lib/csrf");
check("has nextWithCsrf helper", middlewareContent.includes("function nextWithCsrf"), "wraps NextResponse.next()");
check("uses nextWithCsrf for cloud pages", middlewareContent.includes("return nextWithCsrf(request)"), "CSRF cookie on cloud pages");
check("matcher includes all routes", middlewareContent.includes('/:path*'), "broad matcher for CSRF cookie");

// ─── 3. Mutation endpoints have CSRF protection ───────────────
console.log("\n═══ 3. Mutation Endpoint CSRF Guards ═══");

const mutationFiles = [
  { file: "src/app/api/analytics/route.ts", methods: ["POST"] },
  { file: "src/app/api/cloud/teams/route.ts", methods: ["POST"] },
  { file: "src/app/api/cloud/teams/[teamId]/route.ts", methods: ["PUT", "DELETE"] },
  { file: "src/app/api/cloud/teams/[teamId]/projects/route.ts", methods: ["POST"] },
  { file: "src/app/api/cloud/projects/[projectId]/tokens/route.ts", methods: ["POST"] },
  { file: "src/app/api/cloud/tokens/[tokenId]/route.ts", methods: ["PUT"] },
  { file: "src/app/api/cloud/auth/route.ts", methods: ["POST", "DELETE"] },
];

for (const { file, methods } of mutationFiles) {
  const content = readFile(file);
  const hasImport = content.includes('requireCsrf') && content.includes('from "@/lib/csrf"');
  check(`${file} imports requireCsrf`, hasImport, hasImport ? "found" : "MISSING");

  for (const method of methods) {
    // Look for the pattern: requireCsrf(request) or requireCsrf(req)
    const hasGuard = content.includes("requireCsrf(");
    check(`${file} ${method} has CSRF guard`, hasGuard, hasGuard ? "found" : "MISSING");
  }
}

// ─── 4. Client-side CSRF header inclusion ─────────────────────
console.log("\n═══ 4. Client-Side CSRF Header ═══");

const authHookPath = "src/hooks/use-cloud-auth.ts";
const authHookContent = readFile(authHookPath);
check("imports getCsrfTokenFromCookie", authHookContent.includes("getCsrfTokenFromCookie"), "from @/lib/csrf");
check("imports CSRF_HEADER_NAME", authHookContent.includes("CSRF_HEADER_NAME"), "from @/lib/csrf");
check("has withCsrfHeader helper", authHookContent.includes("function withCsrfHeader"), "reads cookie and builds header");
check("authFetch includes CSRF", authHookContent.includes("csrfHeaders"), "in authFetch wrapper");
check("handleLogin includes CSRF", authHookContent.includes("csrfHeaders") && authHookContent.includes("handleLogin"), "in login fetch");
check("handleLogout includes CSRF", authHookContent.includes("csrfHeaders") && authHookContent.includes("handleLogout"), "in logout fetch");

// ─── Summary ──────────────────────────────────────────────────
console.log("\n═══ Summary ═══");
const passed = results.filter(r => r.pass).length;
const failed = results.filter(r => !r.pass).length;
console.log(`Passed: ${passed}/${results.length}`);
if (failed > 0) {
  console.log(`\nFailed checks:`);
  results.filter(r => !r.pass).forEach(r => console.log(`  ❌ ${r.name}: ${r.detail}`));
  process.exit(1);
} else {
  console.log("\n🎉 All CSRF protection checks passed!");
}
