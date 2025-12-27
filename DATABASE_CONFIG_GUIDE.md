# 🗄️ Database Configuration Guide

This guide explains the database configuration for both local development and Railway deployment.

---

## 📁 Configuration Files

### 1. `.sequelizerc` (Root Directory)
This file tells Sequelize CLI where to find configuration and models:

```javascript
const path = require('path');

module.exports = {
  'config': path.resolve('src', 'config', 'database.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations')
};
```

### 2. `src/config/database.js` (Main Config)
This is the primary database configuration file used by both:
- Sequelize ORM (for the application)
- Sequelize CLI (for migrations and seeds)

---

## 🔧 Configuration Modes

### Development Mode
```javascript
development: {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestion_chantiers',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  dialect: 'mysql'
}
```

**Local Development Setup:**
```bash
# Create .env file
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=gestion_chantiers
```

### Production Mode (Railway)
```javascript
production: {
  username: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT) || 3306,
  dialect: 'mysql'
}
```

**Railway Environment Variables:**

Railway MySQL automatically provides:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`

You need to reference these in your backend service:
```bash
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
```

---

## 🚀 Running Migrations

### Local Development
```bash
# Create database
mysql -u root -p
CREATE DATABASE gestion_chantiers;
exit;

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### Railway Deployment
Migrations run automatically during deployment via the `railway:deploy` script:

```json
"railway:deploy": "npm run db:migrate && npm start"
```

**Note:** Railway sets `NODE_ENV=production` automatically.

---

## 🔍 Troubleshooting

### Issue: "ERROR: connect ECONNREFUSED 127.0.0.1:3306"

**Cause:** Database is not running or credentials are incorrect.

**Solutions:**

#### For Local Development:
1. **Start MySQL:**
   ```bash
   # On Linux
   sudo systemctl start mysql
   
   # On macOS
   brew services start mysql
   
   # On Windows
   net start MySQL
   ```

2. **Verify MySQL is running:**
   ```bash
   mysql -u root -p
   ```

3. **Check credentials in .env:**
   ```bash
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_actual_password
   DB_NAME=gestion_chantiers
   ```

4. **Create database if it doesn't exist:**
   ```sql
   CREATE DATABASE gestion_chantiers;
   ```

#### For Railway Deployment:
1. **Verify MySQL service is running** in Railway dashboard
2. **Check database variables are linked** in backend service
3. **Use variable references**, not hardcoded values:
   ```bash
   DB_HOST=${{MySQL.MYSQLHOST}}
   ```
4. **Check Railway logs** for specific error messages

---

## 📋 Environment Variables Checklist

### Local Development (.env)
- [ ] `DB_HOST=localhost`
- [ ] `DB_PORT=3306`
- [ ] `DB_USER=root`
- [ ] `DB_PASSWORD=<your-password>`
- [ ] `DB_NAME=gestion_chantiers`
- [ ] `JWT_SECRET=<32-char-secret>`
- [ ] `NODE_ENV=development`

### Railway Production
- [ ] MySQL service added to project
- [ ] Database variables linked:
  - `DB_HOST=${{MySQL.MYSQLHOST}}`
  - `DB_PORT=${{MySQL.MYSQLPORT}}`
  - `DB_USER=${{MySQL.MYSQLUSER}}`
  - `DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}`
  - `DB_NAME=${{MySQL.MYSQLDATABASE}}`
- [ ] `JWT_SECRET=<32-char-secret>`
- [ ] `NODE_ENV=production` (auto-set by Railway)

---

## 🧪 Testing Database Connection

### Test Script
Create a test file `test-db.js`:

```javascript
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'gestion_chantiers',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    console.log('📊 Database:', sequelize.config.database);
    console.log('🔌 Host:', sequelize.config.host);
    console.log('🔢 Port:', sequelize.config.port);
    console.log('👤 User:', sequelize.config.username);
  } catch (error) {
    console.error('❌ Unable to connect to database:');
    console.error(error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();
```

**Run test:**
```bash
node test-db.js
```

---

## 📚 Common Commands

```bash
# Create database
npm run db:create

# Run migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo

# Seed database
npm run db:seed

# Undo all seeds
npm run db:seed:undo

# Reset database (undo, migrate, seed)
npm run db:reset

# Start development server
npm run dev

# Start production server
npm start
```

---

## 🔒 Security Best Practices

1. **Never commit .env files** to Git
2. **Use strong database passwords** (production)
3. **Limit database user permissions** (principle of least privilege)
4. **Enable SSL** for production databases
5. **Regular backups** (Railway provides automatic backups)
6. **Rotate credentials** periodically
7. **Monitor database logs** for suspicious activity

---

## 📊 Database Schema

The application uses these main tables:
- `users` - User accounts and authentication
- `chantiers` - Construction sites
- `affectations` - Worker assignments to sites
- `logs` - Audit trail of actions

**View schema:**
```sql
SHOW TABLES;
DESCRIBE users;
DESCRIBE chantiers;
DESCRIBE affectations;
DESCRIBE logs;
```

---

## 🆘 Need Help?

- Check Railway logs for deployment issues
- Verify environment variables are set correctly
- Test database connection locally first
- Consult `RAILWAY_DEPLOY.md` for deployment guide
- Check MySQL service status in Railway dashboard

---

**Last Updated:** December 2024
