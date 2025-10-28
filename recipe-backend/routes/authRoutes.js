const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');
const logger = require('../utils/logger');

// Request logging middleware
const requestLogger = (req, res, next) => {
    logger.info('Incoming request:', {
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.method === 'POST' ? req.body : undefined,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });
    next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    logger.error('Error occurred:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

// Apply request logging to all routes
router.use(requestLogger);

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res, next) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});



// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res, next) => {
    try {
        await getCurrentUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Apply error handling middleware
router.use(errorHandler);

module.exports = router;
