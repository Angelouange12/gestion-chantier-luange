# 🚀 Railway Quick Start Guide

Ultra-quick guide to deploy Gestion Chantier on Railway in 10 minutes.

---

## 📝 Prerequisites
- Railway account
- GitHub repository

---

## ⚡ Quick Steps

### 1️⃣ Backend + Database (5 min)

```bash
# Step 1: Create Railway Project
1. Go to railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repo

# Step 2: Add MySQL
1. Click "+ New" → "Database" → "MySQL"
2. Wait for database to provision

# Step 3: Configure Backend
1. Click backend service → "Variables"
2. Add these variables:

JWT_SECRET=<generate-random-32-char-string>
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:3000

3. Link database variables:
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# Step 4: Deploy & Get URL
1. Settings → Networking → "Generate Domain"
2. Copy URL: https://your-backend.railway.app
```

### 2️⃣ Frontend (3 min)

```bash
# Step 1: Create New Service
1. Click "+ New" → "GitHub Repo" → Same repo
2. Settings → Root Directory: "/frontend"

# Step 2: Set Backend URL
1. Variables tab → Add:
VITE_API_URL=https://your-backend.railway.app/api

# Step 3: Deploy & Get URL
1. Settings → Networking → "Generate Domain"
2. Copy URL: https://your-frontend.railway.app
```

### 3️⃣ Update CORS (2 min)

```bash
# In Backend Service → Variables → Update:
ALLOWED_ORIGINS=https://your-frontend.railway.app,http://localhost:3000
```

---

## ✅ Test Deployment

1. Open frontend URL
2. Login with:
   - Email: `admin@test.com`
   - Password: `Admin123!`

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| CORS Error | Update backend ALLOWED_ORIGINS |
| Blank Page | Check VITE_API_URL in frontend |
| Database Error | Verify MySQL variables are linked |
| 500 Error | Check backend logs in Railway |

---

## 📌 Important URLs

- **Health Check**: `https://your-backend.railway.app/api/health`
- **Frontend**: `https://your-frontend.railway.app`
- **Railway Docs**: https://docs.railway.app

---

## 🔑 Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

**Full Guide**: See `RAILWAY_DEPLOY.md` for detailed instructions.
