const express = require('express');
const router = express.Router();
const AuthController = require('../src/controllers/authController');
const { auth } = require('../src/middlewares/auth');
const { validateLogin } = require('../src/middlewares/validation');

// Public routes
router.post('/login', validateLogin, AuthController.login);

// Protected routes - IMPORTANT: ajouter le middleware 'auth'
router.post('/logout', auth, AuthController.logout);
router.get('/profile', auth, AuthController.getProfile);

module.exports = router;