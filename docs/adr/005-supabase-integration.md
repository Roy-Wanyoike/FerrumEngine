# ADR-005: Supabase as Optional Database Layer with In-Memory Fallback

## Status
Accepted

## Context

The FerrumEngine cloud dashboard needs persistent storage for:

- User accounts and team memberships
- Design token collections
- Saved effects and playground configurations
- Analytics event data
- Component versioning

Requirements:

- **Optional**: The core FerrumEngine platform (effects, docs, playground) must work without any database.
- **Development simplicity**: Local development should not require a Supabase instance.
- **Production persistence**: Production deployments use Supabase for durable storage.

We evaluated:

1. **Supabase**: Open-source Firebase alternative with PostgreSQL, auth, realtime, and storage. Generous free tier. Self-hostable.

2. **Firebase**: Google-managed NoSQL. Tight coupling to Google ecosystem. Vendor lock-in.

3. **PlanetScale**: Serverless MySQL. Good for edge but requires separate auth.

4. **In-memory only**: Fast and simple but no persistence across server restarts. Acceptable for demo/development.

5. **Prisma + any database**: ORM adds type safety but another dependency layer.

## Decision

We use **Supabase as the optional database layer** with an in-memory fallback:

- A `cloudStore` abstraction (`src/lib/cloud-store.ts`) defines the data access interface.
- In development (no `SUPABASE_URL` env var), an in-memory store provides full CRUD operations.
- In production, Supabase client handles persistence via the same interface.
- The `useSupabase` hook (`src/hooks/use-supabase.ts`) provides React components with typed data access.
- Auth via Supabase Auth is integrated into the cloud dashboard's login flow.

## Consequences

### Positive
- **Zero-config development**: `npm run dev` works without any database setup.
- **Production durability**: Supabase provides PostgreSQL-backed persistence, row-level security, and realtime subscriptions.
- **Clean abstraction**: The `cloudStore` interface means swapping Supabase for another provider requires changing only the store implementation.
- **Generous free tier**: Supabase's free tier (500MB database, 50K monthly active users) is sufficient for early-stage usage.
- **Self-hostable**: If needed, Supabase can be self-hosted for full data control.

### Negative
- **Two code paths**: The in-memory fallback and Supabase implementation must stay in sync. Schema changes require updating both.
- **Supabase dependency**: Production requires a Supabase project. If Supabase service is down, the cloud dashboard is unavailable.
- **In-memory limitations**: The fallback doesn't persist across server restarts and has no multi-instance support (each server process has its own store).
- **Row-level security complexity**: Supabase RLS policies add a layer of authorization that must be carefully managed.