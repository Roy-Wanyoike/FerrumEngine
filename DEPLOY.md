# Deploying FerrumEngine

## Prerequisites

- **Node.js** 20+ (v18 minimum, 20+ recommended)
- **npm** (comes with Node.js)
- **Supabase** account (for cloud features — optional for local-only mode)

## Environment Variables

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

Key variables:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL for cloud features |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL (default: `http://localhost:3000`) |
| `JWT_SECRET` | No | Secret for signing auth tokens |

> **Note:** FerrumEngine works fully in local-only mode without any Supabase credentials. Cloud features (team workspaces, cross-device sync) require Supabase.

## Quick Deploy (Self-Hosted)

### Option A: From Launch ZIP

1. **Extract the archive:**
   ```bash
   unzip ferrum-launch-v1.2.0.zip -d ferrumengine
   cd ferrumengine
   ```

2. **Install production dependencies:**
   ```bash
   npm install --omit=dev
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Set up database (if using Supabase):**
   - Go to your Supabase project dashboard → SQL Editor
   - Run the contents of `supabase/migrations/001_initial_schema.sql`

5. **Start the server:**
   ```bash
   npm run start:raw
   ```

   The app will be available at `http://localhost:3000`.

### Option B: From Git Clone

```bash
git clone https://github.com/ferrumcss/ferrumengine.git
cd ferrumengine
npm install
npm run build
npm run start:raw
```

## Vercel Deploy (Recommended for Production)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — click **Deploy**
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
5. Run the Supabase migration SQL in your Supabase dashboard

Vercel handles builds, SSL, CDN, and automatic scaling.

## Docker Deploy

### Build

```bash
docker build -t ferrumengine .
```

### Run

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_service_key \
  -e JWT_SECRET=your_jwt_secret \
  ferrumengine
```

### Docker Compose

```yaml
services:
  ferrumengine:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    restart: unless-stopped
```

## Health Check

After deploying, verify the health endpoint:

```bash
curl https://your-domain.com/api/health
```

Expected response:

```json
{ "status": "ok" }
```

## Troubleshooting

| Issue | Solution |
|---|---|
| Build fails | Ensure Node.js 20+ is installed (`node -v`) |
| Port 3000 in use | Set `PORT=3001 npm run start:raw` |
| Supabase connection fails | Verify URL and keys in `.env.local` |
| CSS not loading | Ensure `public/ferrum-effects.css` exists |
