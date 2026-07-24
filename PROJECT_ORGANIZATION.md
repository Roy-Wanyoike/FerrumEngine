# FerrumEngine Project Organization

## 📊 Project Architecture

This is a **full-stack Next.js 16** application with integrated frontend and backend:

```
FerrumEngine-project/
│
├── 📁 Frontend (React/Next.js Client)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── layout.tsx               # Root layout
│   │   │   ├── globals.css              # Global styles
│   │   │   ├── ferrum-effects.css       # Custom effects/animations
│   │   │   └── api/                     # ← Backend API routes
│   │   ├── components/                  # React UI components
│   │   ├── hooks/                       # Custom React hooks
│   │   └── lib/                         # Utility functions
│   ├── public/                          # Static assets
│   ├── next.config.ts                   # Next.js configuration
│   └── tailwind.config.ts               # Tailwind CSS configuration
│
├── 📁 Backend (Next.js API Routes)
│   └── src/app/api/                     # API endpoints
│       ├── route.ts                     # Default API route
│       ├── [resource]/route.ts          # Dynamic routes
│       └── middleware.ts (optional)     # Request middleware
│
├── 📁 Database
│   ├── prisma/
│   │   ├── schema.prisma                # Database schema (PostgreSQL)
│   │   └── migrations/                  # Database migrations
│   └── Environment: DATABASE_URL        # Supabase connection string
│
├── 📁 Configuration Files
│   ├── tsconfig.json                    # TypeScript config
│   ├── eslint.config.mjs                # ESLint rules
│   ├── postcss.config.mjs               # PostCSS processing
│   ├── Caddyfile                        # Web server config
│   └── components.json                  # Component library config
│
├── 📁 Environment & Dependencies
│   ├── .env.example                     # Environment variables template
│   ├── .env.local                       # Local env (never commit) ⚠️
│   ├── package.json                     # Dependencies
│   └── pnpm-lock.yaml                   # Locked versions
│
├── 📁 Development Tools
│   ├── ferrum-platform/                 # Monorepo packages (if used)
│   └── mini-services/                   # Microservices (in .gitignore)
│
└── 📁 Documentation
    ├── README.md                        # Project overview
    ├── worklog.md                       # Development log
    └── PROJECT_ORGANIZATION.md          # This file
```

## 🎯 How Frontend & Backend Work Together

### Frontend → Backend Flow
```
React Component (src/components/)
    ↓
User Interaction (Click, Form Submit)
    ↓
API Call to /api/[endpoint] (src/app/api/)
    ↓
Backend Logic (Database, Processing)
    ↓
Response back to Component
    ↓
UI Update
```

### Example: Creating a Post
```typescript
// Frontend (src/components/PostForm.tsx)
const createPost = async (title: string, content: string) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });
  return response.json();
};

// Backend (src/app/api/posts/route.ts)
export async function POST(request: Request) {
  const { title, content } = await request.json();
  const post = await prisma.post.create({
    data: { title, content, authorId: 'user-id' }
  });
  return Response.json(post);
}
```

## 🗄️ Database Setup

### Current Configuration
- **Database Type:** PostgreSQL (via Supabase)
- **ORM:** Prisma (type-safe database access)
- **Schema:** `prisma/schema.prisma`
- **Features:** Authentication, real-time updates, built-in security

### Setup Supabase
1. Create account at https://supabase.com
2. Create new project (free tier available)
3. Get connection string from Settings → Database → Connection pooling
4. Add `DATABASE_URL` to `.env.local`
5. Run `pnpm exec prisma migrate deploy`

### Models Available
```prisma
User {
  id: String (unique)
  email: String (unique)
  name: String?
  createdAt: DateTime
  updatedAt: DateTime
}

Post {
  id: String (unique)
  title: String
  content: String?
  published: Boolean
  authorId: String
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Database Commands
```bash
# Initialize database
pnpm exec prisma migrate dev --name init

# Generate Prisma client
pnpm exec prisma generate

# View database GUI
pnpm exec prisma studio

# Reset database (dev only)
pnpm exec prisma migrate reset
```

## 🔑 Environment Variables Setup

### Step 1: Copy Template
```bash
cp .env.example .env.local
```

### Step 2: Required Variables (Must Fill)
| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | Database connection | `postgresql://user:pass@db.supabase.co:5432/postgres` |
| `NODE_ENV` | Environment type | `development` |

### Step 3: Optional Variables (For Features)
| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | API endpoint | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Authentication | Auto-generated key |
| `STRIPE_SECRET_KEY` | Payment processing | `sk_live_...` |

### Step 4: ⚠️ Important Security Notes
- **Never commit `.env.local`** - It's in `.gitignore`
- **Use `.env.example`** to document required variables
- **Generate secrets** for production:
  ```bash
  openssl rand -base64 32  # Generate random secret
  ```
- **Different env files** for different environments:
  - `.env.local` - Local development
  - `.env.production.local` - Production secrets
  - `.env.test.local` - Testing secrets

## 🚀 Running the Project

### Development
```bash
# Install dependencies
pnpm install

# Set up database
pnpm exec prisma migrate dev

# Start dev server (with hot reload)
pnpm dev
# Runs on http://localhost:3000
```

### Production
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 File Organization Best Practices

### Frontend (src/)
```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Root page
│   ├── layout.tsx         # Layout wrapper
│   ├── [resource]/        # Dynamic routes
│   └── api/               # ← API routes (backend)
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ui/               # UI components (buttons, cards, etc.)
├── hooks/                # Custom React hooks
│   └── usePost.ts
├── lib/                  # Utilities & helpers
│   ├── utils.ts
│   ├── constants.ts
│   └── types.ts
└── styles/              # Global styles
    └── globals.css
```

### Backend (src/app/api/)
```
src/app/api/
├── posts/
│   ├── route.ts         # GET /api/posts, POST /api/posts
│   └── [id]/route.ts    # GET /api/posts/[id], PUT, DELETE
├── users/
│   ├── route.ts
│   └── [id]/route.ts
└── middleware.ts        # Request validation, auth checks
```

## 🔄 API Route Patterns

### Collection Route (src/app/api/posts/route.ts)
```typescript
// GET /api/posts - List all posts
export async function GET(request: Request) {}

// POST /api/posts - Create new post
export async function POST(request: Request) {}
```

### Item Route (src/app/api/posts/[id]/route.ts)
```typescript
// GET /api/posts/123 - Get specific post
export async function GET(request: Request, { params }: Props) {}

// PUT /api/posts/123 - Update post
export async function PUT(request: Request, { params }: Props) {}

// DELETE /api/posts/123 - Delete post
export async function DELETE(request: Request, { params }: Props) {}
```

## 🛡️ Next Steps

1. **Fill in `.env.local`** with your database URL and API keys
2. **Set up database**: `pnpm exec prisma migrate dev`
3. **Create API routes** in `src/app/api/` as needed
4. **Build components** in `src/components/`
5. **Run dev server**: `pnpm dev`

## 📚 Additional Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Database:** PostgreSQL via Supabase  
**Framework:** Next.js 16 with React 19  
**Type Safety:** TypeScript + Prisma  
**Styling:** Tailwind CSS  
**Last Updated:** 2026-07-24
