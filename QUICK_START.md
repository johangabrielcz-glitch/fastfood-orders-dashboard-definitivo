# 🚀 Quick Start: Deploy to Vercel

This project is **fully configured for Vercel deployment**. Follow these steps to get your FastFoodBot dashboard live in minutes.

## 📋 Prerequisites

- GitHub account
- Vercel account (free at vercel.com)
- BuilderBot credentials (Bot ID and API Key)

## 🎯 5-Minute Deploy

### Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git if not already done
git init
git add .
git commit -m "FastFoodBot dashboard - ready for production"

# Create repo on GitHub at https://github.com/new
# Then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (2 minutes)

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B: Vercel Dashboard**
1. Go to https://vercel.com/new
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Deploy"

### Step 3: Add Environment Variables (1 minute)

On Vercel Dashboard → Project Settings → Environment Variables

Add:
- `BUILDERBOT_BOT_ID`: `5d54ab94-3dae-4d5f-887e-0f3a2983c295`
- `BUILDERBOT_API_KEY`: `bb-9782f9c9-10eb-4274-9e89-9bf0a36eedcb`

Then **Redeploy** your project.

## ✅ Done!

Your app is live at: `https://YOUR_PROJECT.vercel.app`

## 🧪 Quick Test

```bash
# Test the API works
curl https://YOUR_PROJECT.vercel.app/api/pedidos

# Create a test order
curl -X POST https://YOUR_PROJECT.vercel.app/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "id": 999,
    "nombre": "Test User",
    "numero": "584124779301",
    "pedido": "Test Order",
    "total": 99.99
  }'
```

## 📚 Documentation

- **Full deployment guide**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Deployment checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **API documentation**: [server/README.md](./server/README.md)

## 🔄 What's Configured

✅ **Frontend**
- React SPA with React Router
- Builds to `dist/spa/`
- Automatically served at `/`

✅ **Backend API**
- Express server wrapped with `serverless-http`
- All `/api/*` routes handled automatically
- WhatsApp integration with BuilderBot

✅ **Build Process**
- `npm run build` creates all necessary files
- Vite handles frontend, server, and API builds
- No manual configuration needed

✅ **Routing**
- `vercel.json` configures all routes
- Static assets served with caching
- SPA routes fallback to `index.html`
- API routes go to serverless function

✅ **Environment Variables**
- Safely configured in Vercel Dashboard
- Never committed to git
- Available in both frontend and backend

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm run build` locally to debug |
| API returns 404 | Check environment variables are set |
| Frontend not loading | Verify `vercel.json` is in root |
| WhatsApp messages not sending | Check credentials and BuilderBot configuration |

## 🎛️ Local Development

```bash
# Start dev server with hot reload
npm run dev
# Opens at http://localhost:8080

# Build for production
npm run build

# Test production build locally
npm start
# Opens at http://localhost:3000
```

## 📞 Need Help?

1. Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions
2. Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for step-by-step guide
3. Check Vercel logs: `vercel logs`
4. See [server/README.md](./server/README.md) for API documentation

---

**You're all set!** Your app is production-ready. 🎉
