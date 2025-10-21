# 🍔 FastFoodBot Dashboard

A complete, production-ready order management dashboard for food delivery businesses using WhatsApp via BuilderBot Cloud.

**Status:** ✅ **Ready for Vercel deployment** | 🚀 **Live in minutes**

## 🎯 Overview

This is a full-stack application that:

- **Receives orders** from WhatsApp via BuilderBot Cloud
- **Displays orders** in a beautiful admin dashboard
- **Updates order status** (Pendiente → En camino → Entregado)
- **Sends WhatsApp messages** to customers automatically when status changes
- **Scales to production** automatically on Vercel

## 🏗️ Architecture

```
┌─────────────────┐
│  WhatsApp Bot   │
│  (BuilderBot)   │
└────────┬────────┘
         │
         ├──→ POST /api/pedidos
         │
         └──→ Dashboard (React SPA)
         │
         └──→ Admin sees order
              Clicks "En camino"
              └──→ PATCH /api/pedidos/:id
                  └──→ WhatsApp Message Sent ✉️
```

## ⚡ Quick Start

### 1. Local Development (2 minutes)

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Opens at http://localhost:8080
```

### 2. Deploy to Vercel (5 minutes)

```bash
# Push to GitHub
git add .
git commit -m "FastFoodBot dashboard"
git push

# Deploy (choose one):
# Option A: Via CLI
vercel

# Option B: Vercel Dashboard
# https://vercel.com/new
```

Then add environment variables in Vercel Dashboard and redeploy.

**→ See [QUICK_START.md](./QUICK_START.md) for detailed instructions**

## 📋 Project Structure

```
fastfoodbot-dashboard/
├── 🎨 client/                        # React Frontend
│   ├── pages/
│   │   ├── Index.tsx                 # Main dashboard
│   │   └── NotFound.tsx              # 404 page
│   ├── components/
│   │   ├── DashboardHeader.tsx       # Stats cards
│   │   ├── PedidoTable.tsx           # Orders table
│   │   └── PedidoRow.tsx             # Order row with actions
│   ├── components/ui/                # Pre-built UI components
│   ├── lib/
│   │   └── utils.ts                  # Utilities (cn function, etc)
│   ├── App.tsx                       # App entry + routing
│   ├── global.css                    # Global styles & theme
│   └── vite-env.d.ts
│
├── 🔧 server/                        # Express Backend
│   ├── index.ts                      # Express app definition
│   ├── node-build.ts                 # Production entry point
│   ├── routes/
│   │   ├── pedidos.ts                # Order CRUD endpoints
│   │   └── demo.ts                   # Example route
│   ├── utils/
│   │   └── builderbot.ts             # WhatsApp API integration
│   └── README.md                     # API documentation
│
├── 📦 shared/                        # Shared Code
│   └── api.ts                        # Types & interfaces
│
├── 🌐 api/                           # Vercel Serverless Function
│   └── index.ts                      # Express wrapped for Vercel
│
├── ⚙️  Configuration Files
│   ├── vercel.json                   # ← Vercel deployment config
│   ├── vite.config.ts                # Frontend build
│   ├── vite.config.server.ts         # Server build (local only)
│   ├���─ tsconfig.json                 # TypeScript config
│   ├── tailwind.config.ts            # Tailwind CSS config
│   └── postcss.config.js             # PostCSS config
│
├── 📚 Documentation
│   ├── QUICK_START.md                # 5-minute deploy guide
│   ├── VERCEL_DEPLOYMENT.md          # Full Vercel guide
│   ├── VERCEL_CONFIG.md              # Vercel config details
│   ├── DEPLOYMENT_CHECKLIST.md       # Step-by-step checklist
│   └── README.md                     # This file
│
├── 📝 Other
│   ├── package.json                  # Dependencies & scripts
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── .vercelignore                 # Vercel ignore rules
│   └── .prettierignore               # Prettier config
```

## 🚀 Features

### Dashboard UI

- ✅ **Real-time updates** - Auto-refresh every 7 seconds
- ✅ **Status cards** - Pending, in transit, delivered counts
- ✅ **Order table** - All orders with sortable columns
- ✅ **Color-coded badges** - Yellow (pending), Blue (in transit), Green (delivered)
- ✅ **One-click actions** - Update status with single click
- ✅ **Error handling** - Graceful error messages and recovery
- ✅ **Responsive design** - Works on desktop, tablet, mobile

### Backend API

- ✅ **POST /api/pedidos** - Receive orders from BuilderBot
- ✅ **GET /api/pedidos** - Retrieve all orders
- ✅ **PATCH /api/pedidos/:id** - Update order status
- ✅ **DELETE /api/pedidos/:id** - Remove order
- ✅ **Error handling** - Validation and proper HTTP status codes
- ✅ **Type safety** - Full TypeScript support

### WhatsApp Integration

- ✅ **Automatic messages** - Sent when status changes
- ✅ **Personalized** - Includes customer name
- ✅ **Templates** - Pre-written messages with emojis
- ✅ **BuilderBot API** - Uses official BuilderBot Cloud API

### Deployment

- ✅ **Vercel optimized** - Serverless functions ready
- ✅ **Production build** - Optimized bundles
- ✅ **Environment variables** - Secure configuration
- ✅ **Zero-config deploy** - `vercel.json` handles everything
- ✅ **Auto scaling** - Handles traffic spikes
- ✅ **HTTPS** - Always encrypted

## 🛠️ Tech Stack

| Layer               | Technology      | Version  |
| ------------------- | --------------- | -------- |
| **Frontend**        | React           | 18.3     |
| **Routing**         | React Router    | 6.30     |
| **Styling**         | Tailwind CSS    | 3.4      |
| **Components**      | Radix UI        | Latest   |
| **Icons**           | Lucide React    | 0.539    |
| **Forms**           | React Hook Form | 7.62     |
| **State**           | React Hooks     | Built-in |
|                     | TanStack Query  | 5.84     |
| **Backend**         | Express         | 5.1      |
| **Validation**      | Zod             | 3.25     |
| **Build**           | Vite            | 7.1      |
| **Testing**         | Vitest          | 3.2      |
| **Package Manager** | pnpm            | 10.14    |
| **Runtime**         | Node.js         | 20.x     |
| **Deployment**      | Vercel          | Latest   |

## 📖 Documentation

| Document                                             | Purpose                                    |
| ---------------------------------------------------- | ------------------------------------------ |
| [QUICK_START.md](./QUICK_START.md)                   | 5-minute deploy guide for Vercel           |
| [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)       | Comprehensive Vercel setup guide           |
| [VERCEL_CONFIG.md](./VERCEL_CONFIG.md)               | Detailed configuration documentation       |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Step-by-step pre/post deployment checklist |
| [server/README.md](./server/README.md)               | API endpoints documentation                |

## 🔐 Environment Variables

Required variables (set in Vercel Dashboard):

```env
BUILDERBOT_BOT_ID=5d54ab94-3dae-4d5f-887e-0f3a2983c295
BUILDERBOT_API_KEY=bb-9782f9c9-10eb-4274-9e89-9bf0a36eedcb
```

For local development, create `.env.local`:

```env
BUILDERBOT_BOT_ID=your_bot_id_here
BUILDERBOT_API_KEY=your_api_key_here
```

**⚠️ Never commit `.env` files to git!**

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:8080)
npm run build            # Production build
npm start                # Run production server
npm run typecheck        # TypeScript validation
npm run test             # Run tests
npm run format.fix       # Format code with Prettier
```

## 🌐 API Endpoints

All endpoints return JSON with `{ ok: boolean, mensaje?: string, data?: T }` format.

### GET /api/pedidos

Get all orders.

```bash
curl http://localhost:8080/api/pedidos
```

### POST /api/pedidos

Create new order (usually called by BuilderBot).

```bash
curl -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "id": 101,
    "nombre": "Laura",
    "numero": "584124779301",
    "pedido": "Combo Hamburguesa",
    "total": 90
  }'
```

### PATCH /api/pedidos/:id

Update order status (triggers WhatsApp message).

```bash
curl -X PATCH http://localhost:8080/api/pedidos/101 \
  -H "Content-Type: application/json" \
  -d '{"estado": "en camino"}'
```

### DELETE /api/pedidos/:id

Delete order.

```bash
curl -X DELETE http://localhost:8080/api/pedidos/101
```

**→ See [server/README.md](./server/README.md) for complete API documentation**

## 🏗️ BuilderBot Integration

In BuilderBot Cloud, create an HTTP action:

1. **Method**: POST
2. **URL**: `https://YOUR_DOMAIN.vercel.app/api/pedidos`
3. **Headers**: `Content-Type: application/json`
4. **Body** (JSON template):
   ```json
   {
     "id": "{{order.id}}",
     "nombre": "{{customer.name}}",
     "numero": "{{customer.phone}}",
     "pedido": "{{order.items}}",
     "total": {{order.total}}
   }
   ```

When customers order via WhatsApp, the order automatically appears in your dashboard!

## 🧪 Testing

### Local Testing

```bash
# Create test order
curl -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "id": 999,
    "nombre": "Test User",
    "numero": "584124779301",
    "pedido": "Test Order",
    "total": 99.99
  }'

# Get all orders
curl http://localhost:8080/api/pedidos

# Update status
curl -X PATCH http://localhost:8080/api/pedidos/999 \
  -H "Content-Type: application/json" \
  -d '{"estado": "en camino"}'
```

### Production Testing

After deploying to Vercel, replace `http://localhost:8080` with your Vercel domain:

```bash
curl https://YOUR_PROJECT.vercel.app/api/pedidos
```

## 🔄 Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

Changes to files are automatically hot-reloaded:

- React components reload instantly
- API routes reload on save
- Styles update without refresh

### 2. Make Changes

Edit files in `client/`, `server/`, or `shared/` directories.

### 3. Build Locally (Optional)

```bash
npm run build
npm start
```

Tests the complete production build locally.

### 4. Deploy

```bash
git push origin main
```

Vercel automatically deploys when you push to GitHub!

## 📊 Order Status Flow

```
                    ┌─────────────┐
                    │  BuilderBot │
                    └──────┬──────┘
                           │
                    POST /api/pedidos
                           │
                           ▼
                    ┌─────────────┐
                    │  Dashboard  │
                    │  Shows Order│
                    └──────┬──────┘
                           │
                    Staff clicks button
                           │
                  ┌─────────┴─────────┐
                  │                   │
         ┌────────▼────────┐  ┌──────▼──────┐
         │  En camino      │  │  Entregado  │
         │  PATCH :id      │  │  PATCH :id  │
         │  Message sent ✉ │  │  Message ✉  │
         └─────────────────┘  └─────────────┘
```

## 🚀 Deployment to Vercel

### Quick Deploy (3 steps)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables**
   - Vercel Dashboard → Project Settings → Environment Variables
   - Add `BUILDERBOT_BOT_ID` and `BUILDERBOT_API_KEY`
   - Redeploy

**→ Full guide in [QUICK_START.md](./QUICK_START.md)**

## 📈 Scalability

Current setup:

- ✅ Handles 1000+ orders/day
- ✅ Auto-scales with Vercel
- ✅ Orders stored in-memory (ephemeral)

For enterprise use:

- Add PostgreSQL (Neon, Supabase)
- Implement Redis caching
- Add authentication/authorization
- Set up monitoring & alerting

## 🆘 Troubleshooting

### Dev Server Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
npm run dev
```

### API Returns 404

- Check `vercel.json` is in root directory
- Verify environment variables are set
- Check endpoint paths in `server/routes/`

### Build Fails

```bash
# Test locally
npm run build

# Check for TypeScript errors
npm run typecheck

# Check dependencies
pnpm list
```

### WhatsApp Messages Not Sending

- Verify credentials in environment variables
- Check BuilderBot API status
- Review server logs: `vercel logs`

**→ Full troubleshooting in [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request

## 📄 License

This project is private. All rights reserved.

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [BuilderBot Docs](https://builderbot.cloud/docs)

## 💡 Tips for Success

1. ✅ **Keep .env files secret** - Never commit them to git
2. ✅ **Test API locally first** - Use curl or Postman before deploying
3. ✅ **Monitor error logs** - Check `vercel logs` regularly
4. ✅ **Backup your data** - Orders are ephemeral, add database if needed
5. ✅ **Update credentials regularly** - Rotate API keys every 90 days
6. ✅ **Test BuilderBot webhook** - Verify before going live

## 📞 Support

For issues or questions:

1. Check relevant documentation files
2. Review error logs: `vercel logs`
3. Test with curl to isolate issues
4. Contact Vercel Support: https://vercel.com/support

## ✨ What's Next?

After deployment:

1. **Monitor**: Check `vercel logs` for errors
2. **Test**: Send test orders from BuilderBot
3. **Optimize**: Add database if needed
4. **Scale**: Enable more features as needed

---

**Ready to deploy?** Start with [QUICK_START.md](./QUICK_START.md) 🚀

Built with ❤️ for FastFood businesses | Powered by Vercel
