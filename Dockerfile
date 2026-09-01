# ═══════════════════════════════════════════════════════════════
# FerrumEngine — Multi-stage Docker Build (Standalone Output)
# ═══════════════════════════════════════════════════════════════
# Usage:
#   docker build -t ferrumengine .
#   docker run -p 3000:3000 --env-file .env.production ferrumengine
#
# Production (standalone — smaller image):
#   docker build --target runner -t ferrumengine:prod .
# ═══════════════════════════════════════════════════════════════

# ── Stage 1: Dependencies ──────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ── Stage 2: Build ─────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for environment variables at build time
ARG DATABASE_URL="file:/dev/null"
ARG CLOUD_API_TOKEN=""
ARG CLOUD_ADMIN_PASSWORD=""
ARG NEXT_PUBLIC_SUPABASE_URL=""
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=""
ARG SUPABASE_SERVICE_ROLE_KEY=""
ARG TRUSTED_PROXY_IPS=""

ENV DATABASE_URL=${DATABASE_URL}
ENV CLOUD_API_TOKEN=${CLOUD_API_TOKEN}
ENV CLOUD_ADMIN_PASSWORD=${CLOUD_ADMIN_PASSWORD}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
ENV TRUSTED_PROXY_IPS=${TRUSTED_PROXY_IPS}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: Production Runner (Standalone) ────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./

# Copy static assets (public/ + .next/static/)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copy worklet files for Paint API
COPY --from=builder /app/public/worklets ./public/worklets

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]

# ── Stage 4: Development ───────────────────────────────────────
FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
