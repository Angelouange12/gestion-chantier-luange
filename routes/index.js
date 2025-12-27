const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const chantierRoutes = require('./chantiers');  // CORRECTION: './chantiers' sans 's' à la fin
const affectationRoutes = require('./affectations');
const logRoutes = require('./logs');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/chantiers', chantierRoutes);
router.use('/affectations', affectationRoutes);
router.use('/logs', logRoutes);

// Route de santé (health check pour Railway)
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Gestion des Chantiers API',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Route racine
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue sur l\'API Gestion des Chantiers',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      chantiers: '/api/chantiers',
      affectations: '/api/affectations',
      logs: '/api/logs',
      health: '/api/health'
    }
  });
});

module.exports = router;