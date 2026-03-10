# Vercel Deployment Checklist

## Pre-Deploy Audit Results

### ✅ Configuration Status

| Component | Status | Notes |
|-----------|--------|-------|
| Next.js Config | ✅ OK | `next.config.mjs` properly configured |
| Vercel Config | ✅ OK | `vercel.json` with build commands |
| Prisma Schema | ✅ OK | SQLite (ephemeral on Vercel) |
| API Routes | ✅ OK | All use `runtime = "nodejs"` |
| TypeScript | ✅ OK | No obvious type errors |
| Environment | ✅ OK | `.env.example` updated |

### ⚠️ Important Notes

1. **Database (SQLite)**
   - On Vercel: Uses `/tmp/dev.db` (ephemeral)
   - Data resets on each deployment
   - For production: Use PostgreSQL (Neon, Railway, etc.)

2. **Swarp AI**
   - Now supports OpenRouter (free tier)
   - Qwen 3 Coder model available
   - No credit card required

3. **Build Requirements**
   - Node.js >= 18.18
   - `prisma generate` must run before build

---

## Environment Variables Required

### Required for All Deploys

```
NEXTAUTH_SECRET=generate-random-secret
NEXTAUTH_URL=https://your-domain.vercel.app
DATABASE_URL=file:/tmp/dev.db
GOOGLE_CLIENT_ID=from-google-console
GOOGLE_CLIENT_SECRET=from-google-console
ADMIN_EMAILS=your-email@example.com
```

### Required for Swarp AI

```
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=get-from-openrouter
SWARP_AI_MODEL=qwen/qwen3-coder:free
SWARP_AI_ALLOWED_ORIGINS=https://your-domain.vercel.app
```

### Optional (Email Notifications)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-app-password
```

---

## Deploy Steps

1. **Get API Keys**
   - OpenRouter: https://openrouter.ai (free, no CC)
   - Google OAuth: https://console.cloud.google.com

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from above

3. **Deploy**
   - Connect GitHub repo to Vercel
   - Framework: Next.js
   - Build: `prisma generate && next build`
   - Deploy!

---

## Post-Deploy Tests

- [ ] Homepage loads
- [ ] Swarp AI chat works (`/swarp-ai`)
- [ ] Google auth works
- [ ] Dashboard loads after login
- [ ] Admin panel accessible (if email in ADMIN_EMAILS)

---

## Files Modified for This Deploy

1. `src/app/swarp-ai/api/chat/route.ts` - Multi-provider LLM support
2. `src/lib/ai-config.ts` - New: AI configuration utilities
3. `src/components/admin/ai-status-panel.tsx` - New: AI status monitoring
4. `src/components/admin/admin-dashboard.tsx` - Added AI tab
5. `src/app/admin/api/ai-status/route.ts` - New: AI status API
6. `.env.example` - Updated environment variables
7. `vercel.json` - Vercel build configuration
8. `package.json` - Added engines field
9. `VERCEL_DEPLOYMENT.md` - Deployment guide
10. `prisma/schema.prisma` - Added comments about Vercel

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check Node.js version >= 18.18 |
| Database errors | Ensure `DATABASE_URL=file:/tmp/dev.db` |
| AI not working | Check `OPENROUTER_API_KEY` is set |
| Auth not working | Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL` |

---

Ready to deploy! 🚀
