const Review = require('../models/Review');
const Recipe = require('../models/Recipe');

const createReview = async (req, res) => {
    try {
        const { recipeId, rating, comment } = req.body;

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Check if user has already reviewed this recipe
        const existingReview = await Review.findOne({
            recipe: recipeId,
            user: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({ error: 'You have already reviewed this recipe' });
        }

        // Create review
        const review = new Review({
            recipe: recipeId,
            user: req.user._id,
            rating,
            comment
        });

        await review.save();

        // Update recipe ratings
        const reviews = await Review.find({ recipe: recipeId });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / reviews.length;

        recipe.ratings = {
            average: averageRating,
            count: reviews.length
        };

        await recipe.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRecipeReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ recipe: req.params.recipeId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this review' });
        }

        Object.assign(review, req.body);
        await review.save();

        // Update recipe ratings
        const recipe = await Recipe.findById(review.recipe);
        const reviews = await Review.find({ recipe: recipe._id });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / reviews.length;

        recipe.ratings = {
            average: averageRating,
            count: reviews.length
        };

        await recipe.save();

        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this review' });
        }

        await review.remove();

        // Update recipe ratings
        const recipe = await Recipe.findById(review.recipe);
        const reviews = await Review.find({ recipe: recipe._id });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0;

        recipe.ratings = {
            average: averageRating,
            count: reviews.length
        };

        await recipe.save();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getRecipeReviews,
    updateReview,
    deleteReview
};
