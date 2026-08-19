# ADR-006: Per-Category Lazy Loading of Effects Data

## Status
Accepted

## Context

The FerrumEngine platform ships 542+ CSS motion effects across 35 categories. The effects data is stored as TypeScript modules that export CSS strings and metadata.

Challenges:

- **Bundle size**: The full effects dataset is ~424KB of CSS data plus ~92KB of index metadata. Loading all effects upfront would significantly increase the initial JavaScript bundle.
- **User behavior**: Users typically browse one or two categories at a time, not all 35.
- **Perceived performance**: The effects gallery should feel fast even with 542+ items.

We evaluated:

1. **Bundle all effects upfront**: Simplest approach but adds ~500KB+ to the initial JS bundle, harming Lighthouse scores and slow-connection users.

2. **Fetch from API**: Load effects via API routes on demand. Adds network latency and server load.

3. **Per-category dynamic imports**: Each category is a separate chunk. When a user selects a category, its data is loaded via `import()`. The index (category names, effect counts, icons) is loaded upfront.

4. **Streaming with Suspense**: React 18 Suspense boundaries for progressive loading.

## Decision

We use **per-category lazy loading** via dynamic imports:

- The effects index (542 entries with name, category, displayType) is loaded as a single chunk with the effects view.
- Category data (actual CSS strings) is organized into 35 separate modules in `src/lib/effects/by-category/`.
- A `lazy-loader.ts` module provides `loadCategoryData(categoryId)` which dynamically imports the category module.
- When a user clicks a category in the effects gallery, the loader fetches the category chunk, and React Suspense shows a skeleton until the data is ready.
- The collection drawer and detail modal work with already-loaded effect data.

## Consequences

### Positive
- **Small initial bundle**: Only the effects index (~92KB) is loaded with the effects view. Individual category CSS data is loaded on demand (~5-15KB per category).
- **Fast perceived performance**: Category selection feels instant because the index is already loaded. CSS data loads in <100ms from the bundle cache.
- **Build-time code-splitting**: Turbopack/Webpack automatically creates separate chunks for each category module.
- **Prefetching opportunity**: Frequently-accessed categories can be prefetched via `webpackPrefetch` comments.

### Negative
- **Loader complexity**: The `lazy-loader.ts` module must handle import errors, caching, and deduplication of in-flight requests.
- **Category data not in initial HTML**: If a user directly links to a specific effect, the category data must be loaded client-side before the effect can be displayed.
- **35 additional chunks**: The build output includes 35+ dynamic chunks for categories. This increases the total number of network requests when browsing many categories.
- **Cache invalidation**: Changes to category data files invalidate their specific chunks, requiring cache-busting per category.