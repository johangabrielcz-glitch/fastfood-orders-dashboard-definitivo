# Vercel Deployment Guide

This FastFoodBot dashboard is configured and ready for deployment on Vercel with full support for serverless API routes and SPA frontend.

## Quick Start

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: FastFoodBot dashboard"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
npm i -g vercel
vercel
```

Follow the prompts:

- Select your Git provider (GitHub)
- Select your repository
- Framework preset: Choose "Other" (already configured)
- Root directory: `.`

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Import settings will be auto-detected from `vercel.json`
5. Add environment variables (see below)
6. Click "Deploy"

### 3. Configure Environment Variables

On Vercel, add these environment variables in **Project Settings → Environment Variables**:

- `BUILDERBOT_BOT_ID`: Your BuilderBot Cloud bot ID (e.g., `5d54ab94-3dae-4d5f-887e-0f3a2983c295`)
- `BUILDERBOT_API_KEY`: Your BuilderBot Cloud API key (e.g., `bb-9782f9c9-10eb-4274-9e89-9bf0a36eedcb`)

You can set these via CLI during deployment:

```bash
vercel env add BUILDERBOT_BOT_ID
vercel env add BUILDERBOT_API_KEY
```

## Project Structure

```
.
├── api/                      # Vercel serverless function entry point
│   └── index.ts             # Express app wrapped with serverless-http
├── client/                   # React SPA frontend
│   ├── pages/               # Route pages
│   ├── components/          # React components
│   └── global.css           # Global styles
├── server/                   # Express server logic
│   ├── index.ts             # Express app definition
│   ├── routes/              # API route handlers
│   └── utils/               # Utilities (e.g., BuilderBot integration)
├── shared/                   # Shared types and utilities
├── vercel.json              # Vercel configuration (auto-detected)
├── vite.config.ts           # Vite config for SPA build
├── vite.config.server.ts    # Vite config for server build (local use only)
├── vite.config.vercel.ts    # Vite config for Vercel API build
└── package.json             # Dependencies and scripts
```

## Build & Deployment Flow

When you push to GitHub, Vercel automatically:

1. **Detects** `vercel.json` configuration
2. **Runs** `npm run build` (configured in `vercel.json` → `buildCommand`)
   - Builds React SPA → `dist/spa/`
   - Builds Express server for local use → `dist/server/`
   - Builds Vercel API handler → `api/index.mjs` (serverless function)
3. **Routes** requests:
   - `/api/*` → Vercel serverless function (`api/index.mjs`)
   - `/*` → Static SPA (`dist/spa/index.html`)
4. **Deploys** to Vercel's global edge network

## API Endpoints

All existing API endpoints work as-is:

- `POST /api/pedidos` - Create new order
- `GET /api/pedidos` - Get all orders
- `PATCH /api/pedidos/:id` - Update order status (triggers WhatsApp message)
- `DELETE /api/pedidos/:id` - Delete order

Example request from BuilderBot:

```bash
curl -X POST https://YOUR_DOMAIN.vercel.app/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "id": 101,
    "nombre": "Laura Gómez",
    "numero": "584124779301",
    "pedido": "Combo Hamburguesa + Refresco",
    "total": 90
  }'
```

## Local Development

### With Vite Dev Server (Recommended)

```bash
pnpm install
pnpm dev
```

Opens at `http://localhost:8080` with hot reload

### With Production Build

```bash
pnpm build
pnpm start
```

Runs the complete production setup (SPA + Express server)

## Environment Variables

The project uses these environment variables:

- `BUILDERBOT_BOT_ID` - Your BuilderBot Cloud bot ID
- `BUILDERBOT_API_KEY` - Your BuilderBot Cloud API key
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (auto-set to "production" on Vercel)

### Local Development

Create `.env.local` (not tracked by git):

```
BUILDERBOT_BOT_ID=5d54ab94-3dae-4d5f-887e-0f3a2983c295
BUILDERBOT_API_KEY=bb-9782f9c9-10eb-4274-9e89-9bf0a36eedcb
```

## Monitoring & Debugging

### View Deployment Logs

```bash
vercel logs
```

### View Real-time Logs

```bash
vercel logs --follow
```

### Test API

```bash
curl https://YOUR_DOMAIN.vercel.app/api/pedidos
```

## BuilderBot Integration

To send orders from your WhatsApp bot:

1. In BuilderBot Cloud, create an HTTP action
2. Set URL to: `https://YOUR_DOMAIN.vercel.app/api/pedidos`
3. Set method to `POST`
4. Send JSON payload:
   ```json
   {
     "id": "{{order.id}}",
     "nombre": "{{customer.name}}",
     "numero": "{{customer.phone}}",
     "pedido": "{{order.items}}",
     "total": {{order.total}}
   }
   ```

When you update order status in the dashboard, automatic WhatsApp messages are sent to customers via BuilderBot's API.

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify no `.env` secrets are committed
- Check `npm run build` locally first:
  ```bash
  pnpm build
  ```

### API Routes Not Working

- Ensure `vercel.json` routes are correctly configured
- Check that `/api/*` requests have proper headers
- Verify environment variables are set on Vercel

### SPA Routes Return 404

- The `vercel.json` rewrite rule handles this
- Make sure the build outputs `dist/spa/index.html`
- Check in Vercel deployment logs that `outputDirectory` is correct

### Environment Variables Not Loaded

- Variables must be set in Vercel Project Settings
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)
- Use `vercel env list` to verify:
  ```bash
  vercel env list
  ```

## Rollback

To rollback to a previous deployment:

```bash
vercel rollback
```

Then select the previous deployment from the list.

## Performance Optimizations

This setup includes:

- ✅ Edge-optimized SPA serving
- ✅ Serverless API functions (scales automatically)
- ✅ Code splitting & lazy loading (React + Vite)
- ✅ Automatic compression (gzip/brotli)
- ✅ Caching headers on static assets
- ✅ Cold start optimization (lightweight Express server)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Serverless HTTP Guide](https://github.com/dougmoscrop/serverless-http)
- [Express 5 Documentation](https://expressjs.com/)

## Support

For issues or questions:

1. Check the logs: `vercel logs`
2. Review this guide's Troubleshooting section
3. Check Vercel's Status Page: https://www.vercel-status.com/
4. Contact Vercel Support: https://vercel.com/support

---

Your app is now ready for production! 🚀
