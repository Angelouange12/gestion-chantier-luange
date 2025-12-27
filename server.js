require('dotenv').config();
const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('🔧 Starting server...');
console.log(`📊 Environment: ${NODE_ENV}`);
console.log(`🔌 Port: ${PORT}`);

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Connected to MySQL database');
    console.log(`📍 Database: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    
    // Sync database models (use alter in production for safety)
    if (NODE_ENV === 'production') {
      console.log('🔄 Syncing database models (production mode)...');
      await db.sequelize.sync({ alter: false });
      console.log('✅ Database models synced');
    } else {
      console.log('🔄 Syncing database models (development mode)...');
      await db.sequelize.sync({ alter: true });
      console.log('✅ Database models synced');
    }
    
    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log('🚀 Server is running!');
      console.log(`🌐 API available at: http://localhost:${PORT}/api`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📝 Logs enabled: ${NODE_ENV !== 'production'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('\n🔍 Troubleshooting:');
    console.error('1. Check if MySQL is running');
    console.error('2. Verify database credentials in environment variables');
    console.error('3. Ensure the database exists');
    console.error('4. Check network connectivity to database');
    console.error('\n📋 Environment variables needed:');
    console.error('   - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME');
    
    if (NODE_ENV === 'production') {
      console.error('\n⚠️  In production, exiting...');
      process.exit(1);
    } else {
      console.error('\n⚠️  In development mode, server will not start');
    }
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM signal received: closing HTTP server');
  try {
    await db.sequelize.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT signal received: closing HTTP server');
  try {
    await db.sequelize.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

// Start the server
startServer();