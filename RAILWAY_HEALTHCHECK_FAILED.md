# 🚨 Railway Health Check Failed - Troubleshooting

## ❌ Problem

Build succeeded but health check failed:
```
Attempt #1-14 failed with service unavailable
1/1 replicas never became healthy!
```

## 🔍 What This Means

- ✅ **Build phase completed** successfully
- ✅ **Docker image created** successfully
- ❌ **Application failed to start** or isn't responding to health checks
- ❌ **Health check endpoint** `/api/health` is not responding

---

## 🛠️ Common Causes & Solutions

### 1. Database Connection Issues (Most Likely)

**Cause:** Backend can't connect to MySQL database.

**Solution:**

#### A. Check Database Variables Are Linked

In Railway dashboard:
1. Go to your **Backend service**
2. Click **"Variables"** tab
3. Verify these variables are set:

```bash
# These should reference your MySQL service
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# These are also required
JWT_SECRET=your-32-character-secret-here
NODE_ENV=production
```

#### B. Check MySQL Service is Running

1. In Railway dashboard, verify **MySQL service** has green status
2. Click on MySQL service
3. Check it's not in "crashed" or "deploying" state

#### C. View Backend Logs

**Critical Step:** Check what error is preventing startup:

1. Go to your **Backend service**
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"View Logs"**
5. Look for error messages, especially:
   - `connect ECONNREFUSED`
   - `Access denied for user`
   - `Unknown database`
   - `ER_ACCESS_DENIED_ERROR`

---

### 2. Missing Environment Variables

**Cause:** Required variables not set.

**Solution:**

Check these are configured in Railway:

```bash
# REQUIRED
JWT_SECRET=<generate-with-crypto>
NODE_ENV=production
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# OPTIONAL (but recommended)
ALLOWED_ORIGINS=http://localhost:3000
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 3. Port Binding Issues

**Cause:** App not listening on Railway's PORT variable.

**Solution:**

The code is already configured correctly:
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', ...);
```

But verify in logs that it says:
```
🚀 Server is running!
🌐 API available at: http://localhost:XXXX/api
```

---

### 4. Migration Failures

**Cause:** Database migrations failed during startup.

**Solution:**

The `railway:deploy` script runs migrations first:
```json
"railway:deploy": "npm run db:migrate && npm start"
```

Check logs for migration errors:
- Look for `ERROR: ` in migration output
- Check if tables already exist
- Verify database permissions

**If migrations fail repeatedly:**
1. Comment out migrations temporarily
2. Add to package.json:
   ```json
   "railway:deploy": "npm start"
   ```
3. Run migrations manually after app starts

---

### 5. Application Crashes on Startup

**Cause:** Code errors preventing startup.

**Solution:**

Check logs for:
- JavaScript errors
- Module not found errors
- Syntax errors
- Unhandled promise rejections

---

## 🔧 Immediate Actions

### Step 1: Check Logs (MOST IMPORTANT)

```bash
Railway Dashboard → Backend Service → Deployments → Latest → View Logs
```

Look for the **exact error message** at the bottom of logs.

### Step 2: Verify Database Connection

In Railway:
1. Click **MySQL service**
2. Go to **"Connect"** tab
3. Copy the connection details
4. Verify they match your backend variables

### Step 3: Test Variables

Add this temporary debug to see what's configured:
1. Go to Backend service → Variables
2. Temporarily add:
   ```bash
   DEBUG=true
   ```
3. Redeploy and check logs for configuration output

---

## 📋 Troubleshooting Checklist

### Database
- [ ] MySQL service is running (green status)
- [ ] Database variables are linked correctly
- [ ] Using `${{MySQL.VARIABLENAME}}` syntax
- [ ] Database is accessible from backend

### Environment Variables
- [ ] JWT_SECRET is set (32+ characters)
- [ ] NODE_ENV=production
- [ ] All DB_* variables are set
- [ ] No typos in variable names

### Application
- [ ] Check logs for startup errors
- [ ] Migrations completed successfully
- [ ] Server started message appears
- [ ] Port binding is correct (0.0.0.0)

### Network
- [ ] Health check path is `/api/health`
- [ ] App is listening on Railway's PORT
- [ ] No firewall blocking health checks

---

## 🚀 Quick Fix Steps

### Option 1: Check and Fix Variables (Most Common Fix)

1. **Add JWT_SECRET** if missing:
   ```bash
   # In Railway Backend Variables
   JWT_SECRET=abc123...your-32-char-secret
   ```

2. **Link MySQL variables**:
   ```bash
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   ```

3. **Save and redeploy**

### Option 2: Skip Migrations Temporarily

If migrations are failing:

1. Edit `package.json` locally:
   ```json
   "railway:deploy": "npm start"
   ```

2. Commit and push:
   ```bash
   git add package.json
   git commit -m "Temporarily skip migrations"
   git push
   ```

3. Once app starts, run migrations manually

### Option 3: Increase Health Check Timeout

Sometimes migrations take longer:

1. Update `railway.json`:
   ```json
   {
     "healthcheckTimeout": 600
   }
   ```

2. Commit and push

---

## 📊 What to Look For in Logs

### Good Signs ✅
```
🔧 Starting server...
📊 Environment: production
✅ Connected to MySQL database
📍 Database: xxx.railway.app:3306
✅ Database models synced
🚀 Server is running!
```

### Bad Signs ❌
```
❌ Failed to start server
ERROR: connect ECONNREFUSED
ERROR: Access denied for user
ERROR: Unknown database
ER_ACCESS_DENIED_ERROR
```

---

## 💡 Most Likely Solution

Based on the health check failure, **99% chance it's one of these:**

1. **JWT_SECRET not set** ← Check this first!
2. **Database variables not linked** ← Check this second!
3. **MySQL service not running** ← Check this third!

---

## 📞 Next Steps

1. **Go to Railway Dashboard NOW**
2. **Click on Backend service**
3. **Go to "Deployments" → Latest → "View Logs"**
4. **Copy the error message**
5. **Look for the patterns mentioned above**
6. **Fix the issue**
7. **Redeploy automatically happens**

---

## 🔄 After Fixing

Once you fix the issue:
- Railway will auto-redeploy
- Wait 2-3 minutes for startup
- Health check should succeed
- You'll see: `✅ Service is healthy!`

---

## 🆘 If Still Stuck

Share the **exact error from logs** and I can help pinpoint the issue!

**Common error patterns:**
- `ECONNREFUSED` → Database connection
- `Access denied` → Wrong credentials
- `Unknown database` → Database doesn't exist
- `JWT_SECRET` → Missing environment variable
- Module errors → Dependencies issue

---

**Let's check those logs and fix this!** 🔍
