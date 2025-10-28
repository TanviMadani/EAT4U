const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const validateRecipe = [
    // Title validation
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),

    // Description validation
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),

    // Ingredients validation
    body('ingredients')
        .isArray()
        .withMessage('Ingredients must be an array')
        .notEmpty()
        .withMessage('At least one ingredient is required'),
    body('ingredients.*.name')
        .trim()
        .notEmpty()
        .withMessage('Ingredient name is required'),
    body('ingredients.*.amount')
        .trim()
        .notEmpty()
        .withMessage('Amount is required'),
    body('ingredients.*.unit')
        .trim()
        .notEmpty()
        .withMessage('Unit is required'),

    // Instructions validation
    body('instructions')
        .isArray()
        .withMessage('Instructions must be an array')
        .notEmpty()
        .withMessage('At least one instruction is required'),
    body('instructions.*')
        .trim()
        .notEmpty()
        .withMessage('Instruction cannot be empty')
        .isLength({ min: 10 })
        .withMessage('Each instruction must be at least 10 characters long'),

    // Time validation
    body('prepTime')
        .trim()
        .notEmpty()
        .withMessage('Preparation time is required'),
    body('cookTime')
        .trim()
        .notEmpty()
        .withMessage('Cooking time is required'),

    // Difficulty validation
    body('difficulty')
        .trim()
        .notEmpty()
        .withMessage('Difficulty level is required')
        .isIn(['Easy', 'Medium', 'Hard'])
        .withMessage('Difficulty must be Easy, Medium, or Hard'),

    // Category validation
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'])
        .withMessage('Category must be Breakfast, Lunch, Dinner, Dessert, Snack, or Drink'),

    // Author validation
    body('author')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid author ID');
            }
            return true;
        }),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRecipe; 