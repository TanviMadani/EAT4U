const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

// Validate environment variables
if (!process.env.JWT_SECRET) {
    logger.error('JWT_SECRET is not defined in environment variables');
    throw new Error('JWT_SECRET is required');
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please provide all required fields" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        // Check if user exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create user
        user = new User({
            username,
            email,
            password
        });

        await user.save();

        // Generate token
        const token = user.generateAuthToken();

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        logger.error('Registration error:', err);
        res.status(500).json({ msg: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        logger.info('Login attempt:', { 
            email: req.body.email,
            timestamp: new Date().toISOString(),
            ip: req.ip
        });

        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            logger.warn('Login attempt with missing fields:', { email: !!email, password: !!password });
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('Login attempt with non-existent email:', { email });
            return res.status(404).json({ msg: "User not found" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            logger.warn('Login attempt with invalid password:', { email });
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Generate token
        const token = user.generateAuthToken();
        logger.info('Successful login:', { 
            userId: user._id,
            email: user.email,
            timestamp: new Date().toISOString()
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        logger.error('Login error:', { 
            error: err.message,
            stack: err.stack,
            email: req.body.email
        });
        res.status(500).json({ msg: "Server error" });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        logger.error('Get current user error:', err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser
};
