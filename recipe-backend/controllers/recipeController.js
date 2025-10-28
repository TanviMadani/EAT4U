const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const User = require('../models/User');

const createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe({
            ...req.body,
            author: req.user._id
        });
        
        if (req.file) {
            recipe.image = await uploadToCloud(req.file);
        }
        
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRecipes = async (req, res) => {
    try {
        const { search, cuisine, difficulty, dietaryTags } = req.query;
        const query = {};

        if (search) {
            query.$text = { $search: search };
        }
        if (cuisine) {
            query.cuisine = cuisine;
        }
        if (difficulty) {
            query.difficulty = difficulty;
        }
        if (dietaryTags) {
            query.dietaryTags = { $in: dietaryTags.split(',') };
        }

        const recipes = await Recipe.find(query)
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('author', 'username')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'username'
                }
            });
        
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this recipe' });
        }

        Object.assign(recipe, req.body);
        await recipe.save();

        res.json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this recipe' });
        }

        await recipe.remove();
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRecommendedRecipes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { dietaryPreferences } = user;

        const recommendedRecipes = await Recipe.find({
            dietaryTags: { $in: dietaryPreferences }
        })
        .sort({ 'ratings.average': -1 })
        .limit(10);

        res.json(recommendedRecipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getRecommendedRecipes
};
