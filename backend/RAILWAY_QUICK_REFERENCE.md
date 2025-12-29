# 🚂 Railway Deployment Quick Reference

## 📁 Files Created for Railway Deployment

### Root Directory
- `railway.json` - Railway configuration for root
- `nixpacks.json` - Nixpacks configuration for root
- `Procfile` - Process configuration
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variable template
- `setup-railway.sh` - Quick setup script
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Complete deployment guide

### Backend (`Gestion-Chantier-Backend/`)
- `railway.json` - Backend Railway configuration
- `nixpacks.json` - Backend Nixpacks configuration
- `.env.example` - Backend environment template
- `.gitignore` - Backend ignore rules
- Updated `package.json` with `railway:deploy` script

### Frontend (`frontend/`)
- `railway.json` - Frontend Railway configuration
- `nixpacks.json` - Frontend Nixpacks configuration
- `.env.example` - Frontend environment template
- `.gitignore` - Frontend ignore rules
- Updated `package.json` with `railway:deploy` script
- Updated `vite.config.js` for production builds

---

## ⚡ Quick Deploy Commands

### Before Deployment
```bash
# Run the setup script
./setup-railway.sh

# Or manually copy environment files
cp Gestion-Chantier-Backend/.env.example Gestion-Chantier-Backend/.env
cp frontend/.env.example frontend/.env
```

### Push to GitHub
```bash
git init
git add .
git commit -m "Prepare for Railway deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## 🔧 Environment Variables Cheat Sheet

### Backend Environment Variables (Railway)
```bash
# Automatically provided by Railway MySQL:
MYSQLHOST
MYSQLPORT
MYSQLDATABASE
MYSQLUSER
MYSQLPASSWORD

# You need to add manually:
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret-minimum-32-characters
JWT_EXPIRE=7d
ALLOWED_ORIGINS=https://your-frontend.railway.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend Environment Variables (Railway)
```bash
VITE_API_URL=https://your-backend.railway.app/api
VITE_APP_NAME=Gestion Chantier
VITE_APP_VERSION=1.0.0
```

---

## 🎯 Railway Dashboard Quick Links

### Backend Service
1. **Root Directory**: `Gestion-Chantier-Backend`
2. **Start Command**: `npm run railway:deploy`
3. **Build Command**: `npm install`

### Frontend Service
1. **Root Directory**: `frontend`
2. **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`
3. **Build Command**: `npm install && npm run build`

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All files committed to Git
- [ ] Pushed to GitHub
- [ ] Railway account created
- [ ] JWT_SECRET generated (32+ characters)

### Railway Setup
- [ ] Project created on Railway
- [ ] MySQL database added
- [ ] Backend service created from GitHub
- [ ] Backend environment variables set
- [ ] Backend domain generated
- [ ] Frontend service created from GitHub
- [ ] Frontend environment variables set (with backend URL)
- [ ] Frontend domain generated
- [ ] Backend ALLOWED_ORIGINS updated with frontend URL

### Post-Deployment
- [ ] Backend health check working
- [ ] Frontend loads successfully
- [ ] Login functionality tested
- [ ] Database tables created
- [ ] CORS working properly

---

## 🐛 Quick Troubleshooting

### CORS Errors
```bash
# Update backend ALLOWED_ORIGINS
ALLOWED_ORIGINS=https://your-frontend.railway.app
```

### Database Connection Issues
- Ensure MySQL service is linked to backend
- Check database variables are auto-populated
- Verify migrations ran successfully

### Build Failures
- Check Railway build logs
- Verify package.json scripts
- Ensure all dependencies are listed

### Environment Variables Not Working
- Redeploy after changing variables
- Check variable names (case-sensitive)
- For Vite, ensure prefix with `VITE_`

---

## 📊 Monitoring

### View Logs
```
Railway Dashboard → Service → Deployments → View Logs
```

### Database Access
```
Railway Dashboard → MySQL Service → Data Tab
```

### Health Check URLs
```
Backend: https://your-backend.railway.app/api/health
Frontend: https://your-frontend.railway.app
```

---

## 🔄 Update Deployment

### Auto Deploy (Recommended)
```bash
# Just push to GitHub
git add .
git commit -m "Update feature"
git push
# Railway automatically redeploys
```

### Manual Deploy
```
Railway Dashboard → Service → Deploy → Redeploy
```

---

## 💡 Pro Tips

1. **Generate Strong JWT_SECRET**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Check Railway Usage**:
   - Dashboard → Project → Usage Tab

3. **Custom Domains**:
   - Railway → Service → Settings → Domains → Add Custom Domain

4. **Backup Database**:
   - Railway → MySQL → Data → Export

5. **View Real-time Logs**:
   - Railway → Service → Deployments → View Logs

---

## 📞 Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Project Guide**: See `RAILWAY_DEPLOYMENT_GUIDE.md`

---

## 🎉 Deployment URLs Structure

```
Backend API:    https://gestion-chantier-backend-production.up.railway.app
Frontend App:   https://gestion-chantier-frontend-production.up.railway.app
MySQL Database: Internal Railway connection (auto-configured)
```

**Note**: Replace with your actual Railway-generated domains!
