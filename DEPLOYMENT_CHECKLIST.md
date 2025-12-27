# ✅ Railway Deployment Checklist

Use this checklist to ensure a smooth deployment to Railway.

---

## 🔧 Pre-Deployment Preparation

### Code Repository
- [ ] All code is committed to Git
- [ ] Pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` files are in `.gitignore` (never commit secrets!)
- [ ] Latest changes are on main/master branch

### Environment Variables Prepared
- [ ] Generated strong JWT_SECRET (32+ characters)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Know your repository URL
- [ ] Have Railway account ready

---

## 🗄️ Backend Deployment

### Step 1: Create Project
- [ ] Logged into Railway (https://railway.app)
- [ ] Created new project
- [ ] Connected to GitHub repository

### Step 2: Add Database
- [ ] Clicked "+ New" → "Database" → "MySQL"
- [ ] Database is provisioned (green status)
- [ ] Database variables are visible

### Step 3: Configure Backend Service
- [ ] Backend service is created
- [ ] Root directory is set to `/` (or left blank)
- [ ] Following environment variables added:

#### Required Variables
- [ ] `JWT_SECRET` = <your-generated-secret>
- [ ] `NODE_ENV` = `production`
- [ ] `ALLOWED_ORIGINS` = `http://localhost:3000` (temporary)

#### Database Variables (Reference MySQL service)
- [ ] `DB_HOST` = `${{MySQL.MYSQLHOST}}`
- [ ] `DB_PORT` = `${{MySQL.MYSQLPORT}}`
- [ ] `DB_USER` = `${{MySQL.MYSQLUSER}}`
- [ ] `DB_PASSWORD` = `${{MySQL.MYSQLPASSWORD}}`
- [ ] `DB_NAME` = `${{MySQL.MYSQLDATABASE}}`

#### Optional Variables
- [ ] `RATE_LIMIT_WINDOW_MS` = `900000`
- [ ] `RATE_LIMIT_MAX` = `100`

### Step 4: Deploy Backend
- [ ] Variables saved
- [ ] Deployment triggered automatically
- [ ] Watched "Deploy Logs" for errors
- [ ] Deployment status shows "Success"
- [ ] Service is running (green indicator)

### Step 5: Get Backend URL
- [ ] Went to "Settings" → "Networking"
- [ ] Clicked "Generate Domain"
- [ ] Copied backend URL
- [ ] Saved URL: `https://________________________.railway.app`

### Step 6: Verify Backend
- [ ] Tested health check endpoint:
  ```bash
  curl https://your-backend.railway.app/api/health
  ```
- [ ] Received successful JSON response
- [ ] Status shows "OK"

---

## 🎨 Frontend Deployment

### Step 1: Create Frontend Service
- [ ] In same Railway project, clicked "+ New"
- [ ] Selected "GitHub Repo"
- [ ] Chose same repository
- [ ] Confirmed duplicate repo warning (this is OK)

### Step 2: Configure Frontend Service
- [ ] Clicked on new service
- [ ] Went to "Settings"
- [ ] Set "Root Directory" to `/frontend`
- [ ] Set "Start Command" to `npm run start` (if not auto-detected)

### Step 3: Set Environment Variables
- [ ] Added `VITE_API_URL` variable:
  ```
  VITE_API_URL=https://your-backend.railway.app/api
  ```
  (⚠️ Must include `/api` at the end!)
- [ ] Saved variables

### Step 4: Deploy Frontend
- [ ] Deployment triggered automatically
- [ ] Watched "Deploy Logs" for build progress
- [ ] Build completed successfully
- [ ] Service is running

### Step 5: Get Frontend URL
- [ ] Went to "Settings" → "Networking"
- [ ] Clicked "Generate Domain"
- [ ] Copied frontend URL
- [ ] Saved URL: `https://________________________.railway.app`

### Step 6: Verify Frontend
- [ ] Opened frontend URL in browser
- [ ] Page loads without errors
- [ ] No blank white screen
- [ ] Login page is visible

---

## 🔄 Post-Deployment Configuration

### Update Backend CORS
- [ ] Went back to Backend service
- [ ] Clicked "Variables"
- [ ] Updated `ALLOWED_ORIGINS`:
  ```
  ALLOWED_ORIGINS=https://your-frontend.railway.app,http://localhost:3000
  ```
- [ ] Saved (backend will auto-redeploy)
- [ ] Waited for redeploy to complete

### Test Full Application
- [ ] Opened frontend URL
- [ ] Opened browser DevTools (F12)
- [ ] Checked Console tab for errors
- [ ] Attempted login with test credentials:
  - Email: `admin@test.com`
  - Password: `Admin123!`
- [ ] Login successful
- [ ] Dashboard loads
- [ ] Navigation works
- [ ] API calls succeed (check Network tab)

---

## 🎯 Optional: Custom Domains

### Backend Custom Domain
- [ ] Own a domain name
- [ ] In Backend service → "Settings" → "Networking"
- [ ] Added custom domain (e.g., `api.mydomain.com`)
- [ ] Updated DNS records as instructed
- [ ] Verified domain (green checkmark)
- [ ] Updated frontend `VITE_API_URL` to new domain
- [ ] Redeployed frontend

### Frontend Custom Domain
- [ ] In Frontend service → "Settings" → "Networking"
- [ ] Added custom domain (e.g., `app.mydomain.com`)
- [ ] Updated DNS records
- [ ] Verified domain
- [ ] Updated backend `ALLOWED_ORIGINS` with new domain
- [ ] Redeployed backend

---

## 🔍 Verification Tests

### Backend Tests
- [ ] Health check returns 200 OK
  ```bash
  curl -I https://your-backend.railway.app/api/health
  ```
- [ ] Can access root endpoint
  ```bash
  curl https://your-backend.railway.app/api
  ```
- [ ] Database connection works (check logs)
- [ ] Migrations ran successfully (check logs)

### Frontend Tests
- [ ] Homepage loads
- [ ] No 404 errors
- [ ] No console errors
- [ ] CSS loads properly
- [ ] Images/icons load
- [ ] Can navigate between pages

### Integration Tests
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes work
- [ ] API calls succeed
- [ ] Data displays correctly
- [ ] CRUD operations work
- [ ] No CORS errors

---

## 📊 Monitoring

### Check Logs
- [ ] Backend service logs show no errors
- [ ] Frontend service logs show no errors
- [ ] Database metrics look healthy

### Set Up Alerts (Optional)
- [ ] Configure Railway alerts for downtime
- [ ] Set up error monitoring
- [ ] Add uptime monitoring

---

## 📝 Documentation

### Update Documentation
- [ ] Documented deployed URLs
- [ ] Saved environment variables securely
- [ ] Updated team documentation
- [ ] Added Railway project link to docs

### Team Access (if applicable)
- [ ] Invited team members to Railway project
- [ ] Set appropriate permissions
- [ ] Shared access credentials securely

---

## 🚨 Troubleshooting Checklist

If something doesn't work, check:

### Backend Issues
- [ ] All environment variables are set
- [ ] Database service is running
- [ ] Database variables are correctly referenced
- [ ] Migrations completed successfully
- [ ] JWT_SECRET is configured
- [ ] Logs don't show errors

### Frontend Issues
- [ ] `VITE_API_URL` is correct
- [ ] URL ends with `/api`
- [ ] Backend is accessible
- [ ] No CORS errors in console
- [ ] Build completed successfully

### Connection Issues
- [ ] Backend URL is correct in frontend
- [ ] Frontend URL is in backend CORS
- [ ] Both services are running
- [ ] Health check works
- [ ] Network tab shows successful requests

---

## ✨ Success Indicators

You're done when:
- ✅ Backend health check returns 200 OK
- ✅ Frontend loads without errors
- ✅ Can login successfully
- ✅ Dashboard displays data
- ✅ Navigation works
- ✅ No console errors
- ✅ No CORS errors
- ✅ API calls succeed
- ✅ All features work as expected

---

## 📞 Need Help?

If you encounter issues:

1. **Check Deploy Logs** in Railway dashboard
2. **Read error messages** carefully
3. **Consult troubleshooting guides**:
   - `RAILWAY_DEPLOY.md` - Full guide
   - `DEPLOYMENT_FIXES_SUMMARY.md` - Common issues
4. **Railway Documentation**: https://docs.railway.app
5. **Railway Discord**: https://discord.gg/railway

---

## 🎉 Deployment Complete!

Congratulations! Your application is now live on Railway! 🚀

**URLs to Remember:**
- Backend: `https://________________________.railway.app`
- Frontend: `https://________________________.railway.app`
- Railway Project: `https://railway.app/project/___________`

**Next Steps:**
- Monitor your application
- Set up backups
- Configure monitoring
- Plan for scaling
- Celebrate! 🎊

---

**Deployment Date**: ________________
**Deployed By**: ________________
**Notes**: ________________
