# 🚀 Railway Deployment Guide - Gestion Chantier

## 📋 Prerequisites

- A Railway account (sign up at https://railway.app)
- Git installed on your local machine
- This project repository

---

## 🎯 Deployment Overview

This project consists of two main parts:
1. **Backend API** (Node.js + Express + MySQL)
2. **Frontend** (React + Vite)

You'll need to deploy them as separate services on Railway.

---

## 📦 Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
cd /home/rumariza/Downloads/gestion-chantier-luange
git init
git add .
git commit -m "Initial commit for Railway deployment"
```

### 1.2 Push to GitHub (recommended)

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Deploy Backend + Database

### 2.1 Create New Project on Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 2.2 Add MySQL Database

1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will automatically create a MySQL instance
4. Note: Railway provides these environment variables automatically:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

### 2.3 Configure Backend Service

1. Click "New" → "GitHub Repo" → Select your repo
2. In the service settings:
   - **Root Directory**: Set to `Gestion-Chantier-Backend`
   - **Start Command**: `npm run railway:deploy`
   - **Build Command**: `npm install`

3. Add Environment Variables (Settings → Variables):
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-change-this
   JWT_EXPIRE=7d
   ALLOWED_ORIGINS=https://your-frontend-domain.railway.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

   **Note**: Railway automatically connects MySQL variables, so you don't need to manually set DB_HOST, DB_USER, etc.

4. Click "Deploy"

### 2.4 Generate Domain

1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy the generated URL (e.g., `https://your-backend.railway.app`)
4. **Save this URL** - you'll need it for the frontend!

---

## 🎨 Step 3: Deploy Frontend

### 3.1 Create Frontend Service

1. In the same Railway project, click "New"
2. Select "GitHub Repo" → Your repository
3. In the service settings:
   - **Root Directory**: Set to `frontend`
   - **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`
   - **Build Command**: `npm install && npm run build`

### 3.2 Configure Environment Variables

1. Go to Settings → Variables
2. Add the following variable:
   ```
   VITE_API_URL=https://your-backend-domain.railway.app/api
   ```
   ⚠️ **Important**: Replace `your-backend-domain.railway.app` with your actual backend URL from Step 2.4

3. Add other variables:
   ```
   VITE_APP_NAME=Gestion Chantier
   VITE_APP_VERSION=1.0.0
   ```

### 3.3 Deploy

1. Click "Deploy"
2. Wait for the build to complete

### 3.4 Generate Domain

1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy the generated URL (e.g., `https://your-frontend.railway.app`)

---

## 🔄 Step 4: Update CORS Configuration

### 4.1 Update Backend CORS

1. Go back to your **Backend service** in Railway
2. Update the `ALLOWED_ORIGINS` environment variable:
   ```
   ALLOWED_ORIGINS=https://your-frontend-domain.railway.app
   ```
   (Use the frontend URL from Step 3.4)

3. Redeploy the backend service

---

## ✅ Step 5: Initialize Database

### 5.1 Run Migrations

Railway will automatically run migrations on deployment thanks to the `railway:deploy` script.

If you need to run them manually:

1. Go to your backend service
2. Open the deployment logs
3. Check for migration success messages

### 5.2 Seed Initial Data (Optional)

To add initial data:

1. SSH into your backend service (if Railway provides shell access)
2. Run: `npm run db:seed`

Or you can create an API endpoint to seed data and call it once after deployment.

---

## 🧪 Step 6: Test Your Deployment

### 6.1 Test Backend

Visit: `https://your-backend-domain.railway.app/api/health`

You should see a health check response.

### 6.2 Test Frontend

1. Visit: `https://your-frontend-domain.railway.app`
2. Try logging in with test credentials
3. Test all major features

---

## 🔧 Common Issues & Solutions

### Issue 1: CORS Errors

**Solution**: Make sure `ALLOWED_ORIGINS` in backend includes your frontend domain without trailing slash.

### Issue 2: Database Connection Errors

**Solution**: 
- Ensure MySQL service is running in Railway
- Check that database environment variables are properly linked
- Verify the backend service has the MySQL service as a dependency

### Issue 3: Build Failures

**Solution**:
- Check the build logs in Railway
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Issue 4: Environment Variables Not Working

**Solution**:
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)
- For Vite variables, ensure they start with `VITE_`

---

## 📊 Monitoring

### View Logs

1. Go to your service in Railway
2. Click "Deployments"
3. Select a deployment to view logs

### Database Access

1. Click on your MySQL service
2. Go to "Data" tab to view tables
3. Use the provided connection string for direct access

---

## 🔄 Continuous Deployment

Railway automatically redeploys when you push to your main branch.

To deploy manually:
1. Go to your service
2. Click "Deploy"
3. Select "Redeploy"

---

## 💰 Cost Estimation

Railway Pricing:
- **Hobby Plan**: $5/month includes $5 credit
- **Usage**: ~$0.000463/GB-hour for compute
- **MySQL**: Additional storage and compute costs

Estimated monthly cost: $5-20 depending on usage.

---

## 🔐 Security Checklist

✅ Change default JWT_SECRET to a strong random string (32+ characters)
✅ Set proper ALLOWED_ORIGINS (no wildcards in production)
✅ Use strong database passwords (Railway generates these)
✅ Enable rate limiting (already configured)
✅ Keep dependencies updated
✅ Monitor error logs regularly

---

## 📝 Post-Deployment Checklist

- [ ] Backend health endpoint returns 200
- [ ] Frontend loads without errors
- [ ] Login functionality works
- [ ] Database tables are created
- [ ] CORS is properly configured
- [ ] Environment variables are set
- [ ] Custom domains configured (optional)
- [ ] SSL certificates are active (Railway provides free SSL)
- [ ] Error monitoring is set up

---

## 🆘 Support

If you encounter issues:

1. Check Railway documentation: https://docs.railway.app
2. Review deployment logs in Railway dashboard
3. Check GitHub issues for similar problems
4. Railway Discord community: https://discord.gg/railway

---

## 🎉 Success!

Your application should now be live on Railway! 

- **Frontend**: https://your-frontend-domain.railway.app
- **Backend**: https://your-backend-domain.railway.app/api
- **Database**: Managed by Railway MySQL

Remember to:
- Keep your JWT_SECRET secure
- Regularly backup your database
- Monitor usage to avoid unexpected costs
- Update dependencies for security patches

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
