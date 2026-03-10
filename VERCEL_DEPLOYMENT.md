# Vercel Deployment Guide

This guide covers deploying the Swarp Foundation website to Vercel.

## ⚠️ Important: Database Limitations on Vercel

**SQLite on Vercel is ephemeral** - data will be lost on each deployment and doesn't persist between function invocations.

### Options:

1. **SQLite in `/tmp`** (Quick start, data resets on deploy)
2. **PostgreSQL** (Recommended for production - persistent data)

---

## Quick Deploy (SQLite - Ephemeral)

### 1. Prepare Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```
# Required
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Database (ephemeral on Vercel)
DATABASE_URL=file:/tmp/dev.db

# Google OAuth (required for dashboard)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Swarp AI (OpenRouter - free tier)
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-your-key-here
SWARP_AI_MODEL=qwen/qwen3-coder:free
SWARP_AI_ALLOWED_ORIGINS=https://your-domain.vercel.app

# Admin emails
ADMIN_EMAILS=your-email@example.com

# SMTP (optional - for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=info@swarppay.com

# Bank details (shown in dashboard)
NEXT_PUBLIC_BANK_BENEFICIARY=SWARP FOUNDATION S.R.L.
NEXT_PUBLIC_BANK_NAME=Your Bank
NEXT_PUBLIC_BANK_IBAN=YOUR_IBAN
NEXT_PUBLIC_BANK_SWIFT=YOUR_SWIFT
NEXT_PUBLIC_BANK_REFERENCE_PREFIX=PROJECT
```

### 2. Get Free API Keys

**OpenRouter (for Swarp AI):**
1. Go to https://openrouter.ai
2. Sign up (no credit card required)
3. Create API key
4. Copy key starting with `sk-or-v1-...`

**Google OAuth:**
1. Go to https://console.cloud.google.com
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`

### 3. Deploy

1. Connect GitHub repo to Vercel
2. Framework preset: Next.js
3. Build command: `prisma generate && next build`
4. Deploy!

---

## Production Deploy (PostgreSQL - Persistent)

For production with persistent data, use PostgreSQL instead of SQLite.

### Option A: Vercel Postgres (if available)

1. In Vercel Dashboard → Storage → Create Database
2. Choose Postgres
3. Connect to your project
4. Environment variables are auto-configured

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### Option B: Neon Postgre (Free Tier)

1. Go to https://neon.tech
2. Create free account
3. Create new project
4. Get connection string
5. Add to Vercel environment:
   ```
   DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Run migration:
```bash
npx prisma migrate dev --name init
```

### Option C: Railway PostgreSQL

1. Go to https://railway.app
2. Create new project → Add PostgreSQL
3. Copy DATABASE_URL
4. Add to Vercel environment variables

---

## Build Configuration

The `vercel.json` is already configured:

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm ci",
  "framework": "nextjs"
}
```

---

## Troubleshooting

### "Prisma schema validation error"
- Make sure `DATABASE_URL` is set in Vercel environment variables
- For SQLite on Vercel: use `file:/tmp/dev.db`

### "Authentication error" on dashboard
- Check `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Verify Google OAuth credentials and redirect URIs

### "AI service unavailable" on Swarp AI
- Check `OPENROUTER_API_KEY` is set correctly
- Verify `SWARP_AI_ALLOWED_ORIGINS` includes your domain

### "Database not found" errors
- SQLite on Vercel uses `/tmp` which is ephemeral
- Data will reset on each deployment
- For persistent data, switch to PostgreSQL

### Email not sending
- SMTP credentials are optional
- If not configured, emails will be skipped (functionality still works)
- For Gmail: use App Password, not your regular password

---

## Performance Considerations

### Vercel Free Tier Limits:
- Function timeout: 10 seconds (Hobby) / 60 seconds (Pro)
- Memory: 1024 MB
- Concurrent executions: 1000

### Recommendations:
1. **Use Vercel Pro** for production (better performance)
2. **Enable Analytics** to monitor function performance
3. **Use Edge Runtime** where possible (not currently used in this project)

---

## Checklist Before Deploy

- [ ] All environment variables set in Vercel dashboard
- [ ] Google OAuth redirect URI configured
- [ ] OpenRouter API key obtained
- [ ] `NEXTAUTH_SECRET` generated (random string)
- [ ] `NEXTAUTH_URL` matches your domain
- [ ] Database URL configured (SQLite or PostgreSQL)
- [ ] Test build locally: `npm run build`

---

## Post-Deploy Verification

1. **Homepage loads**: Check `/`
2. **Swarp AI works**: Check `/swarp-ai` - send test message
3. **Auth works**: Try signing in with Google
4. **Dashboard loads**: Check `/dashboard` after login
5. **Admin works**: Check `/admin` (if your email is in ADMIN_EMAILS)

---

## Need Help?

- Check Vercel logs: Dashboard → Project → Functions → Logs
- Check build logs: Dashboard → Project → Deployments → Latest
- Contact: info@swarppay.com
