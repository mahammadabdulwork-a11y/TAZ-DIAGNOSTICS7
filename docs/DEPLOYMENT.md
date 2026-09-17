# 🚀 TAZ DIAGNOSTIC — Deployment Guide

This guide covers deploying the TAZ DIAGNOSTIC application on Vercel and production cloud servers.

---

## 🌐 Deploying to Vercel

### 1. Deploying the Frontend (`client`)
1. Push your repository to GitHub.
2. In Vercel, click **Add New → Project**.
3. Select `woonnajeevan7-coder/TAZ-DIAGNOSTIC`.
4. Set **Root Directory** to `client`.
5. Vercel auto-detects **Vite** (`npm run build`, output directory `dist`).
6. Click **Deploy**.

> **Note**: SPA client route rewrites are configured in `client/vercel.json`.

---

### 2. Deploying the Backend (`server`)
1. In Vercel, create a second project from the same repository `woonnajeevan7-coder/TAZ-DIAGNOSTIC`.
2. Set **Root Directory** to `server`.
3. Add optional environment variables:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
   - `ULTRAMSG_INSTANCE_ID`, `ULTRAMSG_TOKEN`
4. Click **Deploy**.

---

## 🖥️ Production Environment Variables (`server/.env`)

```env
PORT=5000
NODE_ENV=production

# MySQL Database Config (Optional - falls back to file storage if omitted)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taz_diagnostic
DB_PORT=3306

# WhatsApp Gateway (UltraMsg / Meta API)
ULTRAMSG_INSTANCE_ID=instance12345
ULTRAMSG_TOKEN=token_abc123
```
