# Vercel Configuration Documentation

This document details all Vercel-specific configurations in this project.

## Configuration Files

### `vercel.json` (Main Configuration)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/spa",
  "installCommand": "pnpm install --frozen-lockfile",
  "nodeVersion": "20.x"
}
```

**What it does:**
- `version: 2` - Uses Vercel Builds V2 (latest)
- `buildCommand` - Runs all builds (client + server)
- `outputDirectory` - Serves `dist/spa/` as static files
- `installCommand` - Installs dependencies with pnpm
- `nodeVersion` - Uses Node.js 20.x runtime

### `api/index.ts` (Serverless Function)

Entry point for all API routes. Wraps Express app with `serverless-http` for Vercel:

```typescript
import serverlessHttp from "serverless-http";
import { createServer } from "../server/index";

const app = createServer();
export default serverlessHttp(app);
```

**How it works:**
- Imports Express app from `server/index.ts`
- Wraps it with `serverless-http` to make it compatible with Vercel serverless functions
- Exports default handler for all `/api/*` routes

### `.gitignore` (Prevents Committing Secrets)

```
.env
.env.local
.env.*.local
.vercel
```

**Important:** Never commit `.env` files to Git. Vercel environment variables are set separately in the dashboard.

### `.vercelignore` (Optimization)

Excludes unnecessary files from deployment:
- `node_modules` - Reinstalled during build
- `dist` - Rebuilt during deployment
- `.git` - Not needed in production
- Development config files

## Environment Variables

### How They Work

1. **Development (Local)**
   - Set in `.env.local` (not committed to git)
   - Loaded automatically by Node.js
   - Accessible in both frontend and backend

2. **Production (Vercel)**
   - Set in Vercel Dashboard → Project Settings → Environment Variables
   - Never written to files or code
   - Injected at build and runtime

### Required Variables

```
BUILDERBOT_BOT_ID=5d54ab94-3dae-4d5f-887e-0f3a2983c295
BUILDERBOT_API_KEY=bb-9782f9c9-10eb-4274-9e89-9bf0a36eedcb
```

### Setting on Vercel

```bash
# Using CLI
vercel env add BUILDERBOT_BOT_ID
vercel env add BUILDERBOT_API_KEY

# Or in Dashboard:
# Project Settings → Environment Variables → Add
```

## Build Process

When you push to GitHub, Vercel:

### 1. Install Dependencies
```bash
pnpm install --frozen-lockfile
```
Ensures reproducible builds.

### 2. Build (npm run build)
```bash
# Runs:
npm run build:client    # Vite → dist/spa/
npm run build:server    # Vite server build (for local use)
```

### 3. Deploy
- Frontend: `dist/spa/` files → Vercel CDN
- API: `api/index.ts` → Vercel Serverless Function

### 4. Routing (vercel.json)
```
/api/* → api/index.ts (serverless function)
/*    → dist/spa/index.html (SPA)
```

## Project Structure for Vercel

```
.
├── api/
│   └── index.ts              ← Vercel API entry point
├── client/
│   ├── pages/
│   ├── components/
│   └── global.css
├── server/
│   ├── index.ts              ← Express app definition
│   ├── routes/               ← API endpoints
│   └── utils/                ← Helpers (BuilderBot integration)
├── shared/
│   └── api.ts                ← Shared types
├── dist/
│   ├── spa/                  ← Built SPA (uploaded to Vercel)
│   └── server/               ← Server build (local only)
├── vercel.json               ← Vercel config
├── vite.config.ts            ← Frontend build config
├── vite.config.server.ts     ← Server build config
├── tsconfig.json             ← TypeScript config
├── package.json              ← Dependencies & scripts
└── .env.local (gitignored)   ← Local env vars
```

## Routing Configuration

### In `vercel.json`

```json
"routes": [
  {
    "src": "/api/(.*)",
    "dest": "/api/index.ts",
    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]
  },
  {
    "src": "/assets/(.*)",
    "dest": "/assets/$1",
    "headers": { "Cache-Control": "public, max-age=31536000, immutable" }
  },
  {
    "src": "/(.*)",
    "dest": "/index.html",
    "status": 200
  }
]
```

**What each route does:**

1. **API Routes** → Serverless Function
   - `/api/pedidos` → Handled by Express in `api/index.ts`
   - `/api/pedidos/:id` → Handled by Express in `api/index.ts`
   - HTTP methods: GET, POST, PATCH, DELETE, etc.

2. **Asset Routes** → CDN Cache
   - `/assets/*` → Cached for 1 year (immutable)
   - Improves performance and reduces bandwidth

3. **SPA Routes** → index.html
   - `/*` → Serves `dist/spa/index.html`
   - React Router handles routing on client side

## Function Configuration

```json
"functions": {
  "api/index.ts": {
    "memory": 1024,
    "maxDuration": 30,
    "runtime": "nodejs20.x"
  }
}
```

**What it means:**
- `memory: 1024` - 1GB RAM per function execution
- `maxDuration: 30` - Max 30 seconds per request
- `runtime: nodejs20.x` - Node.js 20.x runtime

## Deployment Workflow

```
Code Push to GitHub
        ↓
Vercel Detects Changes
        ↓
Detects vercel.json
        ↓
Installs Dependencies (pnpm)
        ↓
Runs Build Command
  ├→ npm run build:client   (dist/spa/)
  └→ npm run build:server   (dist/server/)
        ↓
Creates Deployment
  ├→ Frontend: CDN Edge (dist/spa)
  └→ API: Serverless Function (api/index.ts)
        ↓
Updates Production URL
        ↓
Sets Environment Variables
        ↓
🚀 Live!
```

## Local vs. Vercel Differences

| Aspect | Local Development | Vercel Production |
|--------|-------------------|-------------------|
| Server | Express (Node.js) | Serverless Function |
| Port | 8080 (dev), 3000 (prod) | Auto-managed |
| Database | In-memory | In-memory (ephemeral) |
| File System | Read/Write | Read-only |
| Environment | `npm run dev` or `npm start` | Auto-deployed |
| Environment Vars | `.env.local` | Vercel Dashboard |

## Scalability Considerations

**Current Setup:**
- ✅ Orders stored in-memory (reset on deployment)
- ✅ No external database
- ✅ Suitable for low-traffic (< 1000 requests/day)

**For Production (When Scaling):**
- Add database (Neon, Supabase, etc.)
- Implement caching (Redis)
- Add rate limiting
- Monitor performance (Vercel Analytics)

**To Add Database:**
1. Provision database (e.g., Neon PostgreSQL)
2. Update `server/routes/pedidos.ts` to use database instead of in-memory storage
3. Add database connection string to environment variables
4. Deploy - no changes to Vercel config needed

## Monitoring & Debugging

### View Deployment Status
```bash
vercel status
```

### View Build Logs
```bash
vercel logs
```

### View Real-time Logs
```bash
vercel logs --follow
```

### Test API
```bash
curl https://YOUR_PROJECT.vercel.app/api/pedidos
```

### Check Environment Variables
```bash
vercel env list
```

## Common Vercel Issues & Solutions

### Issue: "Build timed out"
**Solution:** Optimize build process or increase timeout in `vercel.json`:
```json
{ "buildCommand": "npm run build" }
```

### Issue: "Cannot find module"
**Solution:** Ensure all dependencies in `package.json`:
```bash
npm ls  # Check for missing deps
```

### Issue: "Environment variables not working"
**Solution:** 
- Set in Vercel Dashboard (not in code)
- Redeploy after adding variables
- Variable names are case-sensitive

### Issue: "API routes return 404"
**Solution:** 
- Verify `vercel.json` is in root directory
- Check route pattern in `vercel.json` matches your endpoints
- Verify TypeScript file in `api/` directory

## Security Best Practices

1. ✅ **Secrets in Environment Variables**
   - Never commit `.env` files
   - Use Vercel Dashboard to set secrets
   - Rotate keys regularly

2. ✅ **HTTPS Enforced**
   - Vercel automatically enables HTTPS
   - All traffic encrypted

3. ✅ **.gitignore Protection**
   - `node_modules` - Reinstalled fresh
   - `.env` files - Never committed
   - `.vercel` folder - Dev-only

4. ⚠️ **To Add in Future**
   - API authentication/keys
   - Rate limiting
   - CORS restrictions
   - Input validation (already using Zod)

## Rollback Strategy

If deployment has issues:

```bash
# View deployments
vercel list

# Rollback to previous version
vercel rollback

# Or specify version
vercel rollback DEPLOYMENT_ID
```

## Performance Metrics

Vercel provides analytics:
- Go to Project Dashboard
- Click "Analytics"
- Monitor:
  - Response times
  - Error rates
  - Bandwidth usage
  - Serverless Function performance

## Next Steps After Deployment

1. ✅ Test all API endpoints
2. ✅ Verify BuilderBot webhook works
3. ✅ Test WhatsApp message sending
4. ✅ Monitor error logs
5. ✅ Set up alerts for errors
6. ✅ Configure custom domain (optional)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables Guide](https://vercel.com/docs/projects/environment-variables)
- [Express 5 + Serverless HTTP](https://github.com/dougmoscrop/serverless-http)
- [Vite Documentation](https://vitejs.dev/)

---

Your project is fully configured for Vercel. No additional changes needed! 🚀
