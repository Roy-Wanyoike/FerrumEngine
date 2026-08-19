# ADR-007: Comprehensive Security Headers with Strict CSP

## Status
Accepted

## Context

As a public-facing web platform, FerrumEngine must protect against common web vulnerabilities:

- **XSS (Cross-Site Scripting)**: Injected scripts stealing user data or performing actions.
- **Clickjacking**: Malicious sites embedding FerrumEngine in iframes.
- **MIME sniffing**: Browsers interpreting files as a different type than intended.
- **Information leakage**: Exposing server technology or referrer information.
- **Spectre-class attacks**: Cross-origin data extraction via timing side-channels.

Next.js provides `poweredByHeader: false` and basic headers, but production security requires a comprehensive header strategy.

We evaluated:

1. **Minimal headers**: Only `X-Frame-Options` and `X-Content-Type-Options`. Easy but leaves many attack vectors open.

2. **Comprehensive headers with strict CSP**: Full suite of security headers including Content-Security-Policy. Maximum protection but requires careful directive management to avoid breaking functionality.

3. **Helmet.js / middleware approach**: Use a library like Helmet. Adds a dependency; Next.js's `headers()` config is sufficient.

## Decision

We implement **comprehensive security headers** via Next.js `headers()` configuration in `next.config.ts`:

### Headers Applied to All Routes:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking via iframes |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), ...` | Disables browser APIs not used |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS, preload-eligible |
| `X-DNS-Prefetch-Control` | `on` | Allows DNS prefetch for performance |
| `Cross-Origin-Opener-Policy` | `same-origin` | Prevents Spectre-class cross-origin attacks |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents cross-origin resource loading |
| `X-Permitted-Cross-Domain-Policies` | `none` | Prevents Adobe crossdomain policy abuse |

### Content-Security-Policy:

- **Production**: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' ...`
- **Development**: `script-src 'self' 'unsafe-inline'` required for Turbopack HMR.
- **`style-src 'unsafe-inline'`**: Required by Tailwind CSS's JIT compilation. This is a documented trade-off — replacing with `sha256-` hashes would require hashing all generated style blocks.

### Static Asset Caching:
- `.js`, `.css`, `.woff2`, images: `public, max-age=31536000, immutable` (1 year, content-addressed).
- `ferrum-effects.css`: `stale-while-revalidate` with 1-day max-age and 7-day SWR.

## Consequences

### Positive
- **Defense in depth**: Multiple independent layers protect against different attack classes.
- **HSTS preload eligible**: The `preload` directive allows submission to the HSTS preload list for universal HTTPS enforcement.
- **Spectre mitigation**: `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin` prevent cross-origin timing attacks.
- **Zero dependencies**: All headers are configured in `next.config.ts` — no additional packages.

### Negative
- **`style-src 'unsafe-inline'`**: Tailwind CSS requires inline styles. This weakens CSP protection against CSS injection. Can be hardened with nonce-based CSP in the future.
- **Development vs. production CSP divergence**: `'unsafe-inline'` for scripts in development creates a different security posture. Must be tested in both modes.
- **`X-Frame-Options: DENY`**: Prevents any iframe embedding, including legitimate use cases like embedding FerrumEngine demos in documentation sites. Can be relaxed to `SAMEORIGIN` if needed.
- **Header maintenance**: New features (e.g., embedding third-party widgets) may require CSP directive updates.
- **`font-src` allows Google Fonts**: The CSP allows fonts from `fonts.gstatic.com`. Self-hosting fonts would remove this external dependency.