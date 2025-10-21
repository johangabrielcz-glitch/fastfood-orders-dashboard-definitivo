# FastFoodBot Dashboard - Deployment Checklist

Complete this checklist to deploy your application to Vercel.

## ✅ Pre-Deployment

- [ ] **Verify local build works**

  ```bash
  pnpm install
  pnpm build
  pnpm start
  ```

  Test at `http://localhost:3000`

- [ ] **Test API endpoints locally**

  ```bash
  # In another terminal while `pnpm start` is running
  curl http://localhost:3000/api/pedidos
  ```

- [ ] **Review BuilderBot configuration**
  - [ ] Have your `BUILDERBOT_BOT_ID` ready
  - [ ] Have your `BUILDERBOT_API_KEY` ready
  - [ ] Test credentials locally work

- [ ] **Initialize Git repository**
  ```bash
  git init
  git add .
  git commit -m "Initial commit: FastFoodBot dashboard"
  ```

## 📤 GitHub Setup

- [ ] **Create GitHub repository**
  - Go to https://github.com/new
  - Repository name: `fastfoodbot-dashboard` (or your choice)
  - Make it **Private** or **Public**
  - Do NOT initialize with README, .gitignore, or license (we have them)

- [ ] **Push to GitHub**

  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Verify files on GitHub**
  - [ ] Check `vercel.json` is present
  - [ ] Check `VERCEL_DEPLOYMENT.md` is present
  - [ ] Check `.gitignore` excludes `.env`

## 🚀 Vercel Deployment

### Option A: Using Vercel CLI (Recommended)

- [ ] **Install Vercel CLI**

  ```bash
  npm install -g vercel
  ```

- [ ] **Login to Vercel**

  ```bash
  vercel login
  ```

  Creates `.vercel/` folder (DO NOT commit this)

- [ ] **Deploy**
  ```bash
  vercel
  ```
  Follow prompts - it auto-detects your project setup from `vercel.json`

### Option B: Using Vercel Dashboard

- [ ] **Go to Vercel Dashboard**
      Navigate to https://vercel.com/new

- [ ] **Import from Git**
  - Select your GitHub account
  - Find and select `YOUR_REPO`
  - Framework: Select "Other" (already configured)
  - Root Directory: `.`

## 🔐 Configure Environment Variables

On Vercel Dashboard → Project Settings → Environment Variables

- [ ] **Add BUILDERBOT_BOT_ID**
  - Key: `BUILDERBOT_BOT_ID`
  - Value: `5d54ab94-3dae-4d5f-887e-0f3a2983c295` (your actual ID)
  - Environments: Production, Preview, Development

- [ ] **Add BUILDERBOT_API_KEY**
  - Key: `BUILDERBOT_API_KEY`
  - Value: `bb-9782f9c9-10eb-4274-9e89-9bf0a36eedcb` (your actual key)
  - Environments: Production, Preview, Development

- [ ] **Redeploy after adding variables**
  - Go to Deployments
  - Click on the latest deployment
  - Click "Redeploy"

## ✨ Post-Deployment

- [ ] **Test your deployed app**
  - [ ] Visit your deployment URL (shown in Vercel Dashboard)
  - [ ] Check frontend loads properly
  - [ ] Check dashboard displays correctly

- [ ] **Test API endpoints**

  ```bash
  # Get all orders (should be empty)
  curl https://YOUR_DOMAIN.vercel.app/api/pedidos

  # Create a test order
  curl -X POST https://YOUR_DOMAIN.vercel.app/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{
      "id": 999,
      "nombre": "Test User",
      "numero": "584124779301",
      "pedido": "Test Order",
      "total": 99.99
    }'

  # Get orders again (should see the test order)
  curl https://YOUR_DOMAIN.vercel.app/api/pedidos
  ```

- [ ] **Test status update**
  ```bash
  curl -X PATCH https://YOUR_DOMAIN.vercel.app/api/pedidos/999 \
    -H "Content-Type: application/json" \
    -d '{"estado": "en camino"}'
  ```
  _Check WhatsApp message is sent to the number_

## 🔗 BuilderBot Integration

- [ ] **Configure BuilderBot webhook to send orders**
  - In BuilderBot Cloud, create an HTTP action
  - Set URL to: `https://YOUR_DOMAIN.vercel.app/api/pedidos`
  - Set method to: `POST`
  - Test sending an order through WhatsApp bot
  - Verify it appears in the dashboard

- [ ] **Test order status flow**
  - Receive order from WhatsApp bot
  - See it in dashboard
  - Click "En camino" button
  - Verify WhatsApp message sent to customer
  - Click "Entregado" button
  - Verify final message sent

## 📊 Monitoring

- [ ] **Set up basic monitoring**
  - Monitor deployment logs: `vercel logs`
  - Set up error notifications in Vercel Dashboard
  - Monitor API response times

- [ ] **Test error handling**
  - Send invalid data to API
  - Check error messages are helpful
  - Verify invalid requests don't crash server

## 🎉 Done!

Your FastFoodBot Dashboard is now live!

### What to share with your team:

- **App URL**: `https://YOUR_DOMAIN.vercel.app`
- **API Docs**: Available in this repository
- **WhatsApp Bot Webhook**: `https://YOUR_DOMAIN.vercel.app/api/pedidos`

### Useful commands for ongoing management:

```bash
# View all deployments
vercel list

# View deployment logs
vercel logs

# View logs in real-time
vercel logs --follow

# See environment variables
vercel env list

# Add new environment variable
vercel env add VAR_NAME

# Rollback to previous deployment
vercel rollback
```

## 🆘 Troubleshooting

### Deployment failed

- [ ] Check build logs in Vercel Dashboard
- [ ] Verify all dependencies in `package.json`
- [ ] Run `pnpm build` locally to test

### API routes return 404

- [ ] Check `vercel.json` is in root directory
- [ ] Verify environment variables are set
- [ ] Check `/api/*` routes in `vercel.json`

### Environment variables not working

- [ ] Verify variable names match exactly (case-sensitive)
- [ ] Redeploy after adding variables
- [ ] Check variables are set for Production environment

### Frontend returns 404

- [ ] Check `dist/spa/index.html` exists after build
- [ ] Verify `outputDirectory` in `vercel.json` is correct
- [ ] Check SPA rewrite rule in `vercel.json`

## 📚 Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md) - Detailed setup instructions
- [Project README](./README.md) - Project overview
- [API Documentation](./server/README.md) - API endpoints reference

---

✅ Once you complete this checklist, your app is ready for production!
