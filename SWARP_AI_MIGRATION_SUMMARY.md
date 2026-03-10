# SwarpAI Migration Summary: Kimi → Free LLM

## ✅ What We Found

### Current Implementation (`src/app/swarp-ai/api/chat/route.ts`)
- **Current Provider**: Moonshot AI (Kimi)
- **Endpoint**: `https://api.moonshot.ai/v1/chat/completions`
- **Default Model**: `kimi-k2-turbo-preview`
- **Auth**: `MOONSHOT_API_KEY`
- **Features**: Streaming SSE, rate limiting, CORS protection

### Frontend (`src/app/swarp-ai/_components/SwarpAIChat.tsx`)
- React component with streaming support
- Auto-resizing textarea
- Quick action buttons (Code, Docs, Ideas, Build)
- Message history with typing indicators

---

## 🎯 Recommended Solution: OpenRouter + Qwen

### Why OpenRouter?
- ✅ **Actually free** - No credit card required
- ✅ **Qwen 3 Coder** available (`qwen/qwen3-coder:free`)
- ✅ **30+ free models** as fallback
- ✅ **OpenAI-compatible API** - minimal code changes
- ✅ **Works globally** (unlike direct Alibaba Cloud which blocks many countries)
- ✅ **50 requests/day free** (1,000/day with one-time $10 topup)

### Why Qwen?
- 🏆 Top-tier coding performance (beats many paid models)
- 🏆 128K context window
- 🏆 Strong multilingual support (including Chinese)
- 🏆 Optimized for technical Q&A

---

## 🔧 Changes Made

### 1. Updated API Route (`src/app/swarp-ai/api/chat/route.ts`)
```typescript
// Now supports multiple providers:
- openrouter (default) → https://openrouter.ai/api/v1
- groq → https://api.groq.com/openai/v1  
- together → https://api.together.xyz/v1

// Environment-based configuration:
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
SWARP_AI_MODEL=qwen/qwen3-coder:free
```

### 2. Created Configuration Library (`src/lib/ai-config.ts`)
- Provider management utilities
- Model recommendations
- Configuration validation
- Free tier documentation

### 3. Added Admin Dashboard (`src/components/admin/ai-status-panel.tsx`)
- Visual AI status monitoring
- Provider configuration checker
- Test connection functionality
- Model selection guidance

### 4. Updated Environment Template (`.env.example`)
- All new environment variables documented
- Provider-specific model lists
- Clear setup instructions

---

## 🚀 Render + Vercel Deployment Guide

### Render Setup (Backend)

**For Node.js Server (recommended for API routes):**

```yaml
# render.yaml
services:
  - type: web
    name: swarp-foundation
    runtime: node
    plan: starter  # $7/month for always-on
    buildCommand: npm ci && npx prisma generate && npm run build
    startCommand: npm start
    envVars:
      - key: SWARP_AI_PROVIDER
        value: openrouter
      - key: OPENROUTER_API_KEY
        sync: false  # Set in dashboard!
      - key: SWARP_AI_MODEL
        value: qwen/qwen3-coder:free
      - key: SWARP_AI_ALLOWED_ORIGINS
        value: https://your-domain.onrender.com,https://www.your-domain.com
```

**Environment Variables in Render Dashboard:**
| Key | Value |
|-----|-------|
| `SWARP_AI_PROVIDER` | `openrouter` |
| `OPENROUTER_API_KEY` | `sk-or-v1-your-key` |
| `SWARP_AI_MODEL` | `qwen/qwen3-coder:free` |

### Vercel Setup (Frontend)

**Build Settings:**
- Framework: Next.js
- Build Command: `prisma generate && next build`

**Environment Variables:**
```
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-your-key-here
SWARP_AI_MODEL=qwen/qwen3-coder:free
SWARP_AI_ALLOWED_ORIGINS=https://swarppay.com,https://www.swarppay.com
```

---

## 📊 Provider Comparison

| Provider | Free Tier | Best For | Setup Complexity |
|----------|-----------|----------|------------------|
| **OpenRouter** ⭐ | 50 req/day, 20/min | Model variety, Qwen access | Easy |
| **Groq** | 14,400 req/day | Speed, high volume | Easy |
| **Together AI** | $25 credits | Llama 4, fine-tuning | Easy |
| **Moonshot/Kimi** | None | Chinese market | N/A (paid) |

---

## 🆓 Free Model Options

### OpenRouter Free Models
```typescript
// Recommended for Swarp AI:
'qwen/qwen3-coder:free'           // Best for coding/technical Q&A
'qwen/qwen2.5-72b-instruct:free'  // General conversation
'meta-llama/llama-3.1-8b-instruct:free'  // Fast, efficient
'mistralai/mistral-7b-instruct:free'     // European compliance
'google/gemini-2.0-flash-exp:free'       // Multimodal, 1M context
```

### Groq Free Models
```typescript
'llama-3.3-70b-versatile'  // Most capable
'llama-3.1-8b-instant'      // Fastest
'mixtral-8x7b-32768'        // Good reasoning
```

---

## 🔑 Step-by-Step Setup

### 1. Get OpenRouter API Key (2 minutes)
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up (email or GitHub)
3. Keys → Create Key
4. Copy key (starts with `sk-or-v1-...`)

### 2. Update Local Environment
```bash
# .env.local
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-your-key-here
SWARP_AI_MODEL=qwen/qwen3-coder:free
SWARP_AI_ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Test Locally
```bash
npm run dev
# Navigate to http://localhost:3000/swarp-ai
```

### 4. Deploy to Render
1. Connect GitHub repo to Render
2. Add environment variables in dashboard
3. Deploy!

### 5. Deploy to Vercel
1. Import repo to Vercel
2. Add environment variables
3. Deploy!

---

## ⚠️ Important Notes

### Rate Limits (Free Tier)
- **OpenRouter**: 20 req/min, 50/day base → 1,000/day with $10 topup
- **Groq**: 14,400/day, 70K tokens/min (very generous!)
- **Vercel**: 10s function timeout on free tier (may cut off long responses)

### CORS Configuration
Your `SWARP_AI_ALLOWED_ORIGINS` must include:
- Local: `http://localhost:3000`
- Production: `https://yourdomain.com`
- WWW variant: `https://www.yourdomain.com`

### Fallback Strategy
If you hit rate limits, you can quickly switch providers:
```env
# Switch from OpenRouter to Groq
SWARP_AI_PROVIDER=groq
GROQ_API_KEY=gsk_your_key
SWARP_AI_MODEL=llama-3.3-70b-versatile
```

---

## 🔍 Monitoring & Debugging

### Admin Dashboard
Visit `/admin` → **AI Configuration** tab to:
- Check provider status
- Test API connection
- View available models
- Verify environment variables

### Logs
```bash
# Check API route logs
# Render: Dashboard → Service → Logs
# Vercel: Dashboard → Project → Functions → Logs
```

### Common Errors

| Error | Solution |
|-------|----------|
| "AI service unavailable" | Check API key is set correctly |
| "Rate limit exceeded" | Wait 1 min or switch to Groq |
| "Forbidden" | Add domain to `SWARP_AI_ALLOWED_ORIGINS` |
| "Model not found" | Use correct model ID for provider |

---

## 📚 Files Created/Modified

### Modified
- `src/app/swarp-ai/api/chat/route.ts` - Multi-provider support
- `.env.example` - New environment variables
- `src/components/admin/admin-dashboard.tsx` - Added AI tab

### Created
- `src/lib/ai-config.ts` - Configuration utilities
- `src/components/admin/ai-status-panel.tsx` - Status monitoring
- `src/app/admin/api/ai-status/route.ts` - Status API endpoint
- `SWARP_AI_SETUP.md` - Full setup guide

---

## 💰 Cost Comparison (If Upgrading)

| Provider | 1M Input Tokens | 1M Output Tokens | Free Tier |
|----------|----------------|------------------|-----------|
| OpenRouter | $0.10-2.00 | $0.20-5.00 | ✅ 50/day |
| Groq | $0.27 | $0.59 | ✅ 14,400/day |
| Together AI | $0.18 | $0.80 | ✅ $25 credits |
| Moonshot | $2.00 | $8.00 | ❌ None |

---

## ✅ Migration Checklist

- [x] Code updated to support OpenRouter/Groq
- [x] Admin panel with AI status monitoring
- [x] Environment configuration documented
- [x] Setup guide created
- [ ] Sign up for OpenRouter account
- [ ] Create and copy API key
- [ ] Set environment variables in Render
- [ ] Set environment variables in Vercel
- [ ] Test chat functionality
- [ ] Monitor rate limits

---

**Questions?** Check `SWARP_AI_SETUP.md` for detailed instructions or contact the team.
