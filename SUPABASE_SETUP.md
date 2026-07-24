# 🚀 Supabase Setup Guide

This guide will help you set up Supabase as your PostgreSQL database for FerrumEngine.

## 📋 Prerequisites

- GitHub account (for sign-up)
- Supabase account (free tier available)
- Your project repository

---

## 🔑 Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (easiest method) or email
4. Verify your email if needed

---

## 🏗️ Step 2: Create a New Project

1. After signing in, click **"New Project"**
2. Choose or create an organization
3. Fill in the project details:
   - **Name:** `ferrumengine-prod` (or your preference)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your location
   - **Pricing Plan:** Select "Free" tier
4. Click **"Create new project"**

**Note:** Project creation takes 1-2 minutes

---

## 🔗 Step 3: Get Your Connection String

### Option A: Connection Pooling (Recommended)
1. Navigate to **Settings** → **Database** → **Connection pooling**
2. Select **"Prisma"** from the dialect dropdown
3. Copy the connection string
4. It will look like:
   ```
   postgresql://postgres.xxxxxxxxxxxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres
   ```

### Option B: Direct Connection
1. Navigate to **Settings** → **Database**
2. Find **"Connection string"** section
3. Select **"Prisma"** dialect
4. Copy the connection string

**⚠️ Important:** Replace `[YOUR-PASSWORD]` with the database password you created in Step 2

---

## 🔐 Step 4: Configure Environment Variables

1. Create `.env.local` in your project root:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres.xxxxx:yourpassword@aws-0-region.pooler.supabase.com:6543/postgres?schema=public"
   ```

3. Keep other variables as needed:
   ```env
   NODE_ENV="development"
   NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
   ```

---

## ⚡ Step 5: Initialize Database Schema

1. Install dependencies (if not done yet):
   ```bash
   pnpm install
   ```

2. Generate Prisma client:
   ```bash
   pnpm exec prisma generate
   ```

3. Create initial migration:
   ```bash
   pnpm exec prisma migrate dev --name init
   ```

4. Or push existing schema:
   ```bash
   pnpm exec prisma db push
   ```

---

## ✅ Step 6: Verify Connection

### Using Prisma Studio

View your database in a GUI:
```bash
pnpm exec prisma studio
```

This opens `http://localhost:5555` with your database tables.

### Check Tables

Look for:
- ✅ `User` table
- ✅ `Post` table
- ✅ Other models from `schema.prisma`

---

## 🚀 Step 7: Start Your Application

```bash
pnpm dev
```

Your app is now connected to Supabase! 🎉

---

## 🔍 Troubleshooting

### Issue: "password authentication failed"
**Solution:**
- Double-check your password in the connection string
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
- Verify in Supabase dashboard under Settings → Database

### Issue: "connection timeout"
**Solution:**
- Check if you selected the correct region
- Ensure connection pooling is enabled
- Check your internet connection
- Try direct connection if pooling doesn't work

### Issue: "relation does not exist"
**Solution:**
```bash
# Push schema to create tables
pnpm exec prisma db push

# Or create migration
pnpm exec prisma migrate dev --name init
```

### Issue: "Client not connected"
**Solution:**
```bash
# Regenerate Prisma client
pnpm exec prisma generate

# Restart dev server
pnpm dev
```

---

## 🎯 Next Steps

1. **Test the connection:**
   ```bash
   pnpm exec prisma studio
   ```

2. **Create your first record:**
   - Open `http://localhost:5555`
   - Add a user or post
   - Verify it works

3. **Update your API:**
   - Create endpoints in `src/app/api/`
   - Use Prisma to query Supabase

4. **Deploy to production:**
   - Use same connection string
   - Or create production Supabase project

---

## 📊 Database Management

### View Tables Online

1. Go to Supabase dashboard
2. Click **"Table Editor"** in left sidebar
3. Browse your tables
4. Add/edit/delete records directly

### Backup Your Data

1. Go to **Settings** → **Backups**
2. Enable automatic backups (free on paid plans)
3. Download backups if needed

### Monitor Database

1. Go to **Database** → **Realtime** (optional feature)
2. Enable real-time subscriptions if using
3. Monitor connections under **Settings**

---

## 🔐 Security Tips

### 1. Keep Password Safe
- Don't commit `.env.local`
- Don't share connection strings
- Rotate passwords regularly

### 2. Use Different Passwords
- Dev: Use free Supabase project
- Production: Use separate Supabase project with different password

### 3. Environment Separation
```env
# .env.local (development)
DATABASE_URL="postgresql://...dev..."

# .env.production.local (production)
DATABASE_URL="postgresql://...prod..."
```

### 4. Database Permissions
- Supabase has role-based access
- Restrict API access in **Settings** → **API**
- Enable Row Level Security (RLS) for sensitive data

---

## 📚 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- [Prisma + Supabase Guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases)
- [Connection Pooling Guide](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

---

## 🆘 Need Help?

- **Supabase Support:** [supabase.com/docs](https://supabase.com/docs)
- **Prisma Support:** [prisma.io/docs](https://www.prisma.io/docs/)
- **GitHub Issues:** Check our repository

---

**Status:** ✅ Ready to Deploy  
**Last Updated:** 2026-07-24  
**Database:** PostgreSQL via Supabase
