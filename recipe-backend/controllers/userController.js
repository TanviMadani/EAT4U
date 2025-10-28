const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('favoriteRecipes')
            .populate('savedRecipes');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user fields
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        // Return updated user without password
        const updatedUser = await User.findById(user._id).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePreferences = async (req, res) => {
    try {
        const { dietaryPreferences } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.dietaryPreferences = dietaryPreferences;
        await user.save();

        res.json({ message: 'Preferences updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    updatePreferences
};
