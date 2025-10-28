const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: { type: String },
    dietaryPreferences: [{
        type: String,
        enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free']
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    savedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    achievements: [{
        title: String,
        icon: String,
        description: String,
        progress: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
    return token;
};

// Recipe Model
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [{
        name: String,
        amount: String,
        unit: String
    }],
    instructions: [String],
    prepTime: String,
    cookTime: String,
    difficulty: String,
    category: String,
    tags: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        review: String
    }],
    averageRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// MealPlan Model
const mealPlanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    week: {
        monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
