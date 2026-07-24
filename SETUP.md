# ✅ FerrumEngine Setup Guide

## 🗄️ Database: Supabase (PostgreSQL)

Your project uses **Supabase** - a PostgreSQL database platform with built-in authentication, real-time features, and easy scalability.

- **Configuration File:** `prisma/schema.prisma`
- **Database Provider:** PostgreSQL (via Supabase)
- **Setup:** Free tier available at https://supabase.com
- **Connection:** Secure connection string from Supabase dashboard

---

## 🔑 Environment Variables Setup

### Required Files
1. **`.env.example`** ✅ (Already created - template with all options)
2. **`.env.local`** ⚠️ (Create this - for your local secrets)

### Step-by-Step Setup

#### 1️⃣ Create Local Environment File
```bash
cp .env.example .env.local
```

#### 2️⃣ Edit `.env.local` with Your Values
```env
# REQUIRED - Add your Supabase connection string
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres?schema=public"
NODE_ENV="development"

# Optional - Update if needed
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"

# Add for authentication (generate a random string)
# NEXTAUTH_SECRET="your_generated_secret"
```

**Getting your Supabase DATABASE_URL:**
1. Go to https://supabase.com and create a new project
2. Navigate to Settings → Database → Connection pooling
3. Copy the connection string (it looks like: `postgresql://user:password@...`)
4. Paste it into `.env.local` as `DATABASE_URL`

---

## ⚠️ What You MUST Add Before Running

### Priority 1: Database (Required)
**Setup Supabase:**
1. Sign up at https://supabase.com (free tier available)
2. Create a new project
3. Get your connection string from Settings → Database → Connection pooling
4. Add to `.env.local`: `DATABASE_URL="postgresql://..."`
5. Run migration: `pnpm exec prisma migrate deploy`

### Priority 2: API Keys (If Using Features)
| Feature | What to Add | Where to Get |
|---------|------------|--------------|
| **Authentication** | `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| **Payments** | `STRIPE_SECRET_KEY` | https://dashboard.stripe.com |
| **Analytics** | `NEXT_PUBLIC_ENABLE_ANALYTICS` | Set to `true` if using |

### Priority 3: Verification
- ✅ Node.js 18+ installed
- ✅ PNPM package manager
- ✅ Git configured

---

## 🚀 Quick Start (10 minutes)

```bash
# 1. Install dependencies
pnpm install

# 2. Create local env file
cp .env.example .env.local

# 3. Get Supabase connection string
# - Go to https://supabase.com and create project
# - Get DATABASE_URL from Settings → Database → Connection pooling
# - Add it to .env.local

# 4. Edit .env.local with your DATABASE_URL
# nano .env.local   # or use your editor

# 5. Run migrations
pnpm exec prisma migrate deploy

# 6. Push schema to database
pnpm exec prisma db push

# 7. Start development server
pnpm dev

# Visit http://localhost:3000
```

---

## 📊 Frontend vs Backend Organization

### Frontend (React/Next.js)
```
src/
├── app/page.tsx           → Homepage
├── app/layout.tsx         → Root layout
├── components/            → UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ui/               → Reusable UI parts
├── hooks/                → Custom React hooks
└── lib/                  → Utilities
```

**Running in Browser:** `http://localhost:3000`

### Backend (API Routes)
```
src/app/api/
├── route.ts             → GET /api
├── posts/
│   ├── route.ts         → GET/POST /api/posts
│   └── [id]/route.ts    → GET/PUT/DELETE /api/posts/[id]
└── users/
    ├── route.ts
    └── [id]/route.ts
```

**Available Endpoints:**
- `GET /api` - API info
- `GET /api/css` - CSS effects (configured)
- Add more: `POST /api/posts`, `GET /api/users`, etc.

---

## 🔍 Environment Variables Explained

### Core Configuration
```env
# Which database to use (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres?schema=public"

# development | production | test
NODE_ENV="development"

# Base URL for your API (for server-to-server calls)
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
```

### Feature Flags (Development Helpers)
```env
# Enable/disable features without code changes
NEXT_PUBLIC_ENABLE_ANALYTICS="false"        # Set to true for tracking

# Logging level
LOG_LEVEL="debug"                           # debug | info | warn | error
```

### Third-Party Services (Optional)
```env
# Authentication
NEXTAUTH_SECRET="generated-secret-key"      # Auth encryption key
NEXTAUTH_URL="http://localhost:3000"        # Auth callback URL

# Payments
STRIPE_SECRET_KEY="sk_test_..."             # Stripe test key
STRIPE_PUBLISHABLE_KEY="pk_test_..."        # Public Stripe key
```

---

## 💾 Database Commands

### Initialize (First Time)
```bash
# Deploy existing migrations to Supabase
pnpm exec prisma migrate deploy

# Push current schema to database
pnpm exec prisma db push
```

### Manage
```bash
# View database in Prisma Studio (local view)
pnpm exec prisma studio

# Create a new migration after schema changes
pnpm exec prisma migrate dev --name add_model_name

# Deploy migrations to production
pnpm exec prisma migrate deploy
```

### Generate
```bash
# Update Prisma client after schema changes
pnpm exec prisma generate
```

---

## 🛡️ Security Best Practices

### DO ✅
- ✅ Add `.env.local` to `.gitignore` (already done)
- ✅ Use `.env.example` to document all variables
- ✅ Generate strong secrets: `openssl rand -base64 32`
- ✅ Use environment-specific files (`.env.local`, `.env.production.local`)
- ✅ Never log sensitive data
- ✅ Rotate API keys regularly

### DON'T ❌
- ❌ Commit `.env.local` to git
- ❌ Share API keys publicly
- ❌ Hardcode secrets in code
- ❌ Use same keys for dev and production
- ❌ Share `.env` files via email/chat

---

## 📝 Current API Structure

### Root API
```typescript
// GET /api
{
  name: "FerrumEngine",
  version: "1.0.0",
  effects: 848,
  categories: 11,
  endpoints: {
    css: "/api/css?effect=fade-in&format=css",
    all: "/api/css?format=all"
  }
}
```

### Available Paths
- `/api` - Info endpoint ✅
- `/api/css` - CSS effects ✅
- Add new: `/api/posts`, `/api/users`, etc.

---

## 🧪 Testing Setup

### Run Tests
```bash
pnpm test
```

### Run Tests (Watch Mode)
```bash
pnpm test:watch
```

### Lint Code
```bash
pnpm lint
```

### Format Code
```bash
pnpm format
```

---

## 🐛 Common Issues & Solutions

### Issue: "DATABASE_URL not found"
**Solution:** Create `.env.local` with:
```env
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"
```
Get the connection string from Supabase Settings → Database → Connection pooling

### Issue: "Prisma client not generated"
**Solution:** Run:
```bash
pnpm exec prisma generate
```

### Issue: "Port 3000 already in use"
**Solution:** Run on different port:
```bash
pnpm dev -p 3001
```

### Issue: "NEXT_PUBLIC_* variables not available"
**Solution:** Restart dev server after updating `.env.local`

---

## 📚 File Reference

| File | Purpose | Status |
|------|---------|--------|
| `.env.example` | Template with all variables | ✅ Ready |
| `.env.local` | Your local secrets | ⚠️ Create & Fill |
| `PROJECT_ORGANIZATION.md` | Project structure guide | ✅ Ready |
| `prisma/schema.prisma` | Database schema | ✅ Ready |
| `src/app/api/` | Backend API routes | ✅ Ready |
| `src/components/` | Frontend components | ✅ Ready |

---

## ✨ Next Steps

1. **Setup Environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

2. **Initialize Database:**
   ```bash
   pnpm exec prisma migrate dev --name init
   ```

3. **Start Development:**
   ```bash
   pnpm dev
   ```

4. **Create API Endpoints:**
   - Create `src/app/api/posts/route.ts`
   - Create `src/app/api/users/route.ts`
   - Add database queries with Prisma

5. **Build Components:**
   - Create components in `src/components/`
   - Use hooks from `src/hooks/`
   - Import utilities from `src/lib/`

---

## 📞 Useful Links

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Client Setup](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration)
- [API Routes Best Practices](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Last Updated:** 2026-07-24  
**Database:** PostgreSQL via Supabase  
**Framework:** Next.js 16  
**Status:** Ready to Configure ✅
