# 🚀 Railway Deployment Guide - Gestion Chantier

Complete step-by-step guide to deploy your Construction Site Management application on Railway.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

Before starting, ensure you have:

- ✅ A Railway account ([Sign up here](https://railway.app))
- ✅ Your code pushed to GitHub/GitLab/Bitbucket
- ✅ Basic understanding of environment variables
- ✅ Credit card (for Railway - free tier available)

---

## 📂 Project Structure

This is a monorepo with two services:

```
gestion-chantier-luange/
├── backend (root directory)
│   ├── server.js
│   ├── package.json
│   ├── railway.json
│   └── src/
└── frontend/
    ├── package.json
    ├── railway.json
    └── src/
```

**Important**: You need to deploy TWO separate services on Railway:
1. Backend API (with MySQL database)
2. Frontend Application

---

## 🗄️ Backend Deployment

### Step 1: Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `gestion-chantier-luange`
5. Click **"Deploy Now"**

### Step 2: Add MySQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add MySQL"**
4. Railway will automatically create the database and set environment variables:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`

### Step 3: Configure Backend Service

1. Click on your backend service
2. Go to **"Settings"** tab
3. Set **"Root Directory"** to: `/` (root, not /backend)
4. Under **"Environment"** tab, add these variables:

```bash
# JWT Configuration (REQUIRED)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_change_this
JWT_EXPIRE=7d

# Server Configuration
NODE_ENV=production
PORT=5000

# CORS (Update after frontend deployment)
ALLOWED_ORIGINS=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**🔑 Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Connect Database to Backend

1. In your backend service, click **"Variables"** tab
2. Click **"+ New Variable"** → **"Add Reference"**
3. Link all MySQL variables from your database:
   - `MYSQLHOST` → `DB_HOST`
   - `MYSQLPORT` → `DB_PORT`
   - `MYSQLUSER` → `DB_USER`
   - `MYSQLPASSWORD` → `DB_PASSWORD`
   - `MYSQLDATABASE` → `DB_NAME`

Or use the short form:
```bash
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
```

### Step 5: Deploy Backend

1. Railway will automatically deploy after you save variables
2. Wait for deployment (check **"Deployments"** tab)
3. Once deployed, click **"Settings"** → **"Networking"**
4. Click **"Generate Domain"** to get your public URL
5. Copy your backend URL (e.g., `https://your-backend.railway.app`)

### Step 6: Verify Backend

Test your backend is working:
```bash
curl https://your-backend.railway.app/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎨 Frontend Deployment

### Step 1: Create Frontend Service

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose the same repository
4. Railway will detect it's a duplicate - that's OK!

### Step 2: Configure Frontend Service

1. Click on the new service
2. Go to **"Settings"** tab
3. Set **"Root Directory"** to: `/frontend`
4. Set **"Start Command"** to: `npm run start`

### Step 3: Set Environment Variables

1. Go to **"Variables"** tab
2. Add the backend URL (from Step 5 of Backend Deployment):

```bash
VITE_API_URL=https://your-backend.railway.app/api
```

⚠️ **Important**: Include `/api` at the end!

### Step 4: Deploy Frontend

1. Railway will automatically deploy
2. Wait for build to complete (3-5 minutes)
3. Go to **"Settings"** → **"Networking"**
4. Click **"Generate Domain"**
5. Copy your frontend URL (e.g., `https://your-frontend.railway.app`)

---

## 🔧 Post-Deployment Configuration

### Update CORS in Backend

Now that you have your frontend URL, update backend CORS:

1. Go to your **Backend service**
2. Click **"Variables"** tab
3. Update `ALLOWED_ORIGINS`:

```bash
ALLOWED_ORIGINS=https://your-frontend.railway.app,http://localhost:3000
```

4. Save and redeploy (Railway will auto-redeploy)

### Test the Application

1. Open your frontend URL: `https://your-frontend.railway.app`
2. Try to login with default credentials:
   - Email: `admin@test.com`
   - Password: `Admin123!`

### Set Up Custom Domain (Optional)

#### For Backend:
1. Go to Backend service → **"Settings"** → **"Networking"**
2. Add your custom domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed by Railway

#### For Frontend:
1. Go to Frontend service → **"Settings"** → **"Networking"**
2. Add your custom domain (e.g., `app.yourdomain.com`)
3. Update DNS records

---

## 🛠️ Troubleshooting

### Backend Issues

#### Database Connection Failed
```
❌ Failed to start server: connect ECONNREFUSED
```

**Solution:**
1. Verify all MySQL variables are set correctly
2. Check database is running in Railway dashboard
3. Ensure variable references are correct: `${{MySQL.MYSQLHOST}}`

#### Migration Errors
```
❌ ERROR: Database migration failed
```

**Solution:**
1. Check database credentials
2. Ensure database exists and is accessible
3. Run migrations manually:
   ```bash
   # In Railway service, go to "Deploy Logs"
   # Or SSH into service and run:
   npm run db:migrate
   ```

#### JWT Secret Missing
```
❌ JWT_SECRET is required
```

**Solution:**
1. Add `JWT_SECRET` in backend environment variables
2. Use a secure random string (minimum 32 characters)

### Frontend Issues

#### Blank Page / White Screen
**Solution:**
1. Check browser console for errors (F12)
2. Verify `VITE_API_URL` is set correctly
3. Ensure backend is running and accessible

#### CORS Errors
```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Check backend `ALLOWED_ORIGINS` includes your frontend URL
2. Ensure URL format is correct (https://...)
3. Redeploy backend after updating CORS

#### API Connection Failed
```
❌ Network Error / ERR_CONNECTION_REFUSED
```

**Solution:**
1. Verify `VITE_API_URL` includes `/api` at the end
2. Test backend directly: `curl https://your-backend.railway.app/api/health`
3. Check backend is deployed and running

### General Issues

#### Build Failed
```
❌ Build failed with exit code 1
```

**Solution:**
1. Check **"Deploy Logs"** in Railway for specific errors
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are in `package.json`
4. Check Node version compatibility

#### Service Crashed / Not Starting
**Solution:**
1. Check **"Deploy Logs"** for crash reason
2. Verify environment variables are set
3. Check start command is correct
4. Ensure port is set to Railway's `$PORT` variable

---

## 📊 Monitoring & Logs

### View Logs
1. Go to your service in Railway
2. Click **"Deployments"** tab
3. Click on latest deployment
4. View **"Deploy Logs"** and **"Service Logs"**

### Health Check
- Backend: `https://your-backend.railway.app/api/health`
- Frontend: Just open the URL

### Database Management
1. Go to MySQL service in Railway
2. Click **"Data"** tab to view tables
3. Or use **"Connect"** tab to get connection string for external tools

---

## 🔐 Security Best Practices

1. ✅ **Never commit** `.env` files to Git
2. ✅ Use **strong JWT_SECRET** (32+ characters)
3. ✅ Enable **SSL/TLS** for custom domains
4. ✅ Regularly **update dependencies**: `npm update`
5. ✅ Monitor **logs** for suspicious activity
6. ✅ Set up **rate limiting** (already configured)
7. ✅ Use **environment variables** for all secrets

---

## 🚀 Quick Deployment Checklist

### Backend ✅
- [ ] Repository pushed to GitHub
- [ ] MySQL database added to Railway
- [ ] Database variables linked to backend
- [ ] JWT_SECRET set
- [ ] CORS configured
- [ ] Backend deployed successfully
- [ ] Health check endpoint working
- [ ] Public domain generated

### Frontend ✅
- [ ] Root directory set to `/frontend`
- [ ] VITE_API_URL configured with backend URL
- [ ] Frontend deployed successfully
- [ ] Can access login page
- [ ] Public domain generated

### Final Steps ✅
- [ ] Updated backend CORS with frontend URL
- [ ] Tested login functionality
- [ ] Verified API calls work
- [ ] Checked for console errors
- [ ] Documented URLs for team

---

## 📞 Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Project Issues**: Create an issue in your repository

---

## 🎉 Success!

Your application should now be live and accessible:

- 🌐 **Frontend**: https://your-frontend.railway.app
- 🔌 **Backend**: https://your-backend.railway.app
- 🗄️ **Database**: Managed by Railway

---

**Last Updated**: December 2024
**Version**: 1.0.0
