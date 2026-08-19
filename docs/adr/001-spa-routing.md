# ADR-001: SPA Routing with next/dynamic

## Status
Accepted

## Context

FerrumEngine is a marketing and documentation website that serves primarily as a single-page application. The site has 19+ distinct views (home, effects gallery, docs, playground, blog, etc.) that need fast client-side transitions.

We considered three routing approaches:

1. **File-system routing** (Next.js App Router conventions): Each view gets its own `app/[view]/page.tsx` file. This provides native SSR/SSG and automatic code-splitting, but creates 19+ route directories, complicates shared layout state (nav, theme, scroll position), and prevents seamless client-side view transitions without full page reloads.

2. **File-system routing with shared layout**: Use `app/[view]/page.tsx` with a shared layout component. Still requires 19+ route files and dealing with Next.js layout nesting semantics.

3. **Client-side SPA routing with `next/dynamic` (ssr:false)**: A single `app/page.tsx` entry point loads a client-side router that dynamically imports view components on demand. All views share a single React tree with no layout remounting.

The site's primary traffic is organic developer traffic to the homepage and effects gallery. Server-side rendering of individual views provides minimal SEO benefit for this use case since Next.js's `metadata` API handles meta tags, and the homepage is statically generated.

## Decision

We use **client-side SPA routing** via `next/dynamic` with `ssr: false`:

- A single `app/page.tsx` renders `HomeClient` which contains the view router.
- Each view component is loaded via `next/dynamic(() => import(...), { ssr: false })`.
- URL changes use `useRouter().push()` from `next/navigation`.
- `next.config.ts` defines a `rewrites()` array that maps all known SPA paths to `/`.
- Document title and meta tags are updated client-side via `useLayoutEffect` to ensure correct values before browser paint.

## Consequences

### Positive
- **Zero layout remounting**: Nav, theme context, and global state persist across all view transitions.
- **Fast navigation**: View transitions are instant client-side operations — no network round-trips.
- **Optimal code-splitting**: Each view is a separate Webpack/Turbopack chunk, loaded only when navigated to.
- **Simplicity**: One route handler (`app/page.tsx`) instead of 19+ route directories.
- **SEO meta tags**: Client-side `useLayoutEffect` updates document title, OG tags, and canonical URL before paint, with Next.js `metadata` as fallback.

### Negative
- **No SSR for individual views**: Search engine crawlers that don't execute JavaScript will only see the homepage shell. This is acceptable because the site's primary content (effects gallery, docs) requires JavaScript anyway, and Googlebot fully executes JS.
- **Initial URL handling**: Next.js rewrites map known paths to `/`, so direct URL access requires the SPA router to parse `window.location` on hydration. The `pathnameToView()` utility handles this.
- **Manual SPA concerns**: Scroll restoration, focus management, and back/forward navigation must be handled explicitly (implemented via `useLayoutEffect` scroll-to-top and focus management).