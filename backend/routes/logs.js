const express = require('express');
const router = express.Router();
const LogController = require('../src/controllers/logController');
const { auth, authorize } = require('../src/middlewares/auth');

// Toutes les routes nécessitent une authentification admin
router.use(auth, authorize('admin'));

router.get('/', LogController.getAllLogs);
router.get('/connexions', LogController.getLoginHistory);

module.exports = router;