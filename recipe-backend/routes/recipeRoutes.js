const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const logger = require('../utils/logger');
const validateRecipe = require('../middleware/recipeValidation');

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate('author', 'username profilePicture')
            .sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        logger.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Error fetching recipes' });
    }
});

// Get single recipe
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('author', 'username profilePicture')
            .populate('ratings.user', 'username profilePicture');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        logger.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Error fetching recipe' });
    }
});

// Create recipe
router.post('/', validateRecipe, async (req, res) => {
    try {
        // Format ingredients array
        const formattedIngredients = req.body.ingredients.map(ingredient => ({
            name: ingredient.name.trim(),
            amount: ingredient.amount.trim(),
            unit: ingredient.unit.trim()
        }));

        // Format instructions array
        const formattedInstructions = req.body.instructions.map(instruction => 
            instruction.trim()
        );

        const recipe = new Recipe({
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            image: req.body.image || 'https://via.placeholder.com/300x200?text=No+Image',
            ingredients: formattedIngredients,
            instructions: formattedInstructions,
            prepTime: req.body.prepTime.trim(),
            cookTime: req.body.cookTime.trim(),
            difficulty: req.body.difficulty.trim(),
            category: req.body.category.trim(),
            tags: req.body.tags?.map(tag => tag.trim()) || [],
            author: req.body.author // Should be a valid ObjectId
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        logger.error('Error creating recipe:', error);
        res.status(500).json({ 
            message: 'Error creating recipe',
            error: error.message 
        });
    }
});

// Update recipe
router.put('/:id', validateRecipe, async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                ingredients: req.body.ingredients.map(ingredient => ({
                    name: ingredient.name.trim(),
                    amount: ingredient.amount.trim(),
                    unit: ingredient.unit.trim()
                })),
                instructions: req.body.instructions.map(instruction => 
                    instruction.trim()
                )
            },
            { new: true, runValidators: true }
        );
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        logger.error('Error updating recipe:', error);
        res.status(500).json({ message: 'Error updating recipe' });
    }
});

// Delete recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        logger.error('Error deleting recipe:', error);
        res.status(500).json({ message: 'Error deleting recipe' });
    }
});

module.exports = router;
