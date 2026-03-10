# SwarpAI Free LLM Setup Guide

This guide explains how to set up SwarpAI with **free LLM providers** that work reliably on Render (backend) and Vercel (frontend).

---

## 🎯 Recommended: OpenRouter + Qwen (Free Tier)

**OpenRouter** is the best choice because:
- ✅ **Truly free** - No credit card required
- ✅ **Qwen 3 Coder** available (`qwen/qwen3-coder:free`)
- ✅ **30+ free models** as fallback
- ✅ **OpenAI-compatible API** - minimal code changes
- ✅ **Works globally** (unlike direct Alibaba Cloud)
- ✅ **50 requests/day base** (1,000/day with one-time $10 topup)

---

## 🚀 Quick Start

### Step 1: Get Your Free API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up with email or GitHub (no credit card needed)
3. Go to **Keys** → **Create Key**
4. Copy your API key (starts with `sk-or-v1-...`)

### Step 2: Choose Your Model

| Model | Provider | Use Case | Free Tier |
|-------|----------|----------|-----------|
| `qwen/qwen3-coder:free` | OpenRouter | Coding, technical Q&A | 50 req/day |
| `qwen/qwen2.5-72b-instruct:free` | OpenRouter | General conversation | 50 req/day |
| `meta-llama/llama-3.1-8b-instruct:free` | OpenRouter | General purpose | 50 req/day |
| `llama-3.3-70b-versatile` | Groq | Fast responses | 14,400 req/day |
| `mistralai/mistral-7b-instruct:free` | OpenRouter | European compliance | 50 req/day |

### Step 3: Local Development Setup

```bash
# 1. Clone and install
git clone <your-repo>
cd swarp-foundation
npm install

# 2. Set up environment variables
cp .env.example .env

# 3. Edit .env with your OpenRouter key
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-your-key-here
SWARP_AI_MODEL=qwen/qwen3-coder:free
SWARP_AI_ALLOWED_ORIGINS=http://localhost:3000

# 4. Run the development server
npm run dev
```

---

## 🖥️ Render (Backend) Setup

### Option A: Static Site (Free Tier)

If you're using Next.js static export:

```yaml
# render.yaml
services:
  - type: web
    name: swarp-foundation
    runtime: static
    buildCommand: npm ci && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: NODE_VERSION
        value: 20
      - key: SWARP_AI_PROVIDER
        value: openrouter
      - key: OPENROUTER_API_KEY
        sync: false  # Set in Render dashboard
      - key: SWARP_AI_MODEL
        value: qwen/qwen3-coder:free
      - key: SWARP_AI_ALLOWED_ORIGINS
        value: https://your-domain.com,https://www.your-domain.com
```

### Option B: Node.js Server (Required for API routes)

```yaml
# render.yaml
services:
  - type: web
    name: swarp-foundation
    runtime: node
    plan: starter  # $7/month minimum for always-on
    buildCommand: npm ci && npx prisma generate && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 20
      - key: DATABASE_URL
        value: file:./prisma/dev.db
      - key: NEXTAUTH_SECRET
        generateValue: true
      - key: NEXTAUTH_URL
        value: https://your-domain.onrender.com
      # Swarp AI Configuration
      - key: SWARP_AI_PROVIDER
        value: openrouter
      - key: OPENROUTER_API_KEY
        sync: false  # Set this in Render dashboard!
      - key: SWARP_AI_MODEL
        value: qwen/qwen3-coder:free
      - key: SWARP_AI_ALLOWED_ORIGINS
        value: https://your-domain.onrender.com,https://www.your-domain.com
```

### Render Environment Variables Setup

1. In Render Dashboard → Your Service → Environment
2. Add these variables:

| Key | Value | Secret? |
|-----|-------|---------|
| `SWARP_AI_PROVIDER` | `openrouter` | No |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | ✅ Yes |
| `SWARP_AI_MODEL` | `qwen/qwen3-coder:free` | No |
| `SWARP_AI_ALLOWED_ORIGINS` | `https://yoursite.com` | No |

---

## ▲ Vercel (Frontend) Setup

### Deployment Steps

1. **Import your repo** to Vercel
2. **Configure build settings**:
   - Framework: Next.js
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next`

3. **Environment Variables** in Vercel Dashboard:

```
SWARP_AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-your-key-here
SWARP_AI_MODEL=qwen/qwen3-coder:free
SWARP_AI_ALLOWED_ORIGINS=https://swarppay.com,https://www.swarppay.com
```

### Vercel Pro Tips

- **Free tier**: Serverless functions timeout after 10 seconds
- **Hobby plan**: API routes may cold-start (add warm-up ping)
- For production AI features, consider **Vercel Pro** ($20/mo) for:
  - 60s function timeout
  - Better concurrency

---

## 🔀 Provider Comparison & Fallback Strategy

### Multi-Provider Setup (Recommended for Production)

You can configure multiple providers and fallback between them:

```typescript
// lib/ai-config.ts
export const AI_PROVIDERS = {
  openrouter: {
    baseUrl: 'https://openrouter.ai/api/v1',
    models: {
      qwen: 'qwen/qwen3-coder:free',
      llama: 'meta-llama/llama-3.1-8b-instruct:free',
      mistral: 'mistralai/mistral-7b-instruct:free',
    }
  },
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1',
    models: {
      llama: 'llama-3.3-70b-versatile',
      mixtral: 'mixtral-8x7b-32768',
    }
  }
};
```

### Rate Limit Management

| Provider | Free Requests | Per-Minute | Strategy |
|----------|---------------|------------|----------|
| OpenRouter | 50/day | 20/min | Primary - general use |
| Groq | 14,400/day | 70K TPM | Backup - high volume |
| Together AI | $25 credits | - | Emergency - paid fallback |

---

## 🛠️ Troubleshooting

### "Rate limit exceeded" (429 Error)

**Solution**: Switch to Groq for higher limits:
```env
SWARP_AI_PROVIDER=groq
GROQ_API_KEY=gsk_your_key
SWARP_AI_MODEL=llama-3.3-70b-versatile
```

### "AI service temporarily unavailable" (502/503)

**Checklist**:
1. ✅ API key is correct and not expired
2. ✅ Environment variable name matches provider:
   - OpenRouter: `OPENROUTER_API_KEY`
   - Groq: `GROQ_API_KEY`
   - Together: `TOGETHER_API_KEY`
3. ✅ `SWARP_AI_ALLOWED_ORIGINS` includes your domain
4. ✅ Model name is correct for the provider

### "Forbidden" (403 Error)

Your domain is not in `SWARP_AI_ALLOWED_ORIGINS`. Add it:
```env
SWARP_AI_ALLOWED_ORIGINS=https://localhost:3000,https://swarppay.com,https://www.swarppay.com
```

### OpenRouter Specific: "You have been rate limited"

- Free tier: 20 requests/minute, 50/day
- Wait 1 minute, or
- Top up $10 (one-time) → increases to 1,000/day

---

## 📊 Cost Comparison (If You Upgrade)

| Provider | Cost per 1M Tokens | Free Tier | Best For |
|----------|-------------------|-----------|----------|
| **OpenRouter** | $0.10-2.00 | 50 req/day | Flexibility |
| **Groq** | $0.27-0.59 | 14,400 req/day | Speed |
| **Together AI** | $0.18-0.80 | $25 credits | Llama 4 |
| **Moonshot/Kimi** | $2-8 | None | Chinese market |

---

## 🔐 Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Use secret storage** on Render/Vercel for API keys
3. **Restrict CORS origins** - Don't use `*` in production
4. **Monitor usage** - Check provider dashboards regularly
5. **Rotate keys** - Every 90 days for production

---

## 📚 Additional Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [Together AI Documentation](https://docs.together.ai/)
- [Qwen Models on OpenRouter](https://openrouter.ai/qwen)

---

## ✅ Summary Checklist

- [ ] Sign up at [openrouter.ai](https://openrouter.ai)
- [ ] Create and copy API key
- [ ] Set `SWARP_AI_PROVIDER=openrouter`
- [ ] Set `OPENROUTER_API_KEY=sk-or-v1-...`
- [ ] Set `SWARP_AI_MODEL=qwen/qwen3-coder:free`
- [ ] Add your domains to `SWARP_AI_ALLOWED_ORIGINS`
- [ ] Deploy to Render (Node.js server) or Vercel
- [ ] Test the chat at `/swarp-ai`

---

**Questions?** Reach out to the team at info@swarppay.com
