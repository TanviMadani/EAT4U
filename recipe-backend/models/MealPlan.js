const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    week: {
        monday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }],
        tuesday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }],
        wednesday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }],
        thursday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }],
        friday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }],
        saturday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }],
        sunday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }]
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
module.exports = MealPlan;
