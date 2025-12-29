# Railway Configuration Variables

# These variables are automatically set by Railway or should be manually added

# Node Environment - Keep as 'production' but install all deps
NODE_ENV=production

# Railway automatically provides these MySQL variables:
# MYSQLHOST
# MYSQLPORT  
# MYSQLDATABASE
# MYSQLUSER
# MYSQLPASSWORD

# You must manually add these:
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=7d
ALLOWED_ORIGINS=https://your-frontend.railway.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# For Railway deployment, dependencies are installed with:
# npm install --production=false
# This ensures sequelize-cli is available for migrations
