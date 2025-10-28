import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiStar, FiHeart, FiShare2, FiEdit2, FiTrash2, FiBook } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { recipeAPI } from '../services/api';
import FormRating from './FormRating';
import FormTextarea from './FormTextarea';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewError, setReviewError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await recipeAPI.getRecipe(id);
                setRecipe(data);
                setIsFavorite(data.isFavorite);
            } catch (err) {
                setError('Failed to load recipe');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleFavorite = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            if (isFavorite) {
                await recipeAPI.removeFavorite(id);
                setIsFavorite(false);
            } else {
                await recipeAPI.addFavorite(id);
                setIsFavorite(true);
            }
        } catch (err) {
            console.error('Failed to update favorite status:', err);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            // Show success message
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await recipeAPI.deleteRecipe(id);
            navigate('/recipes');
        } catch (err) {
            console.error('Failed to delete recipe:', err);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewError(null);

        try {
            await recipeAPI.createReview(id, {
                content: reviewContent,
                rating: reviewRating
            });
            setShowReviewForm(false);
            setReviewContent('');
            setReviewRating(0);
            // Refresh recipe data to show new review
            const updatedRecipe = await recipeAPI.getRecipe(id);
            setRecipe(updatedRecipe);
        } catch (err) {
            setReviewError('Failed to submit review');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className={`h-64 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} mb-6`}></div>
                        <div className={`h-8 w-3/4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-4`}></div>
                        <div className={`h-4 w-1/2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-8`}></div>
                        <div className="space-y-4">
                            <div className={`h-4 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
                            <div className={`h-4 w-5/6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
                            <div className={`h-4 w-4/6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
                        <p className="mb-8">{error || 'The recipe you are looking for does not exist.'}</p>
                        <button
                            onClick={() => navigate('/recipes')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
                        >
                            Back to Recipes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Recipe Header */}
                <div className="mb-8">
                    <div className="relative">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-96 object-cover rounded-xl shadow-lg"
                        />
                        {user && (user.id === recipe.author.id || user.isAdmin) && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(`/recipes/${id}/edit`)}
                                    className="bg-white text-gray-900 p-2 rounded-full shadow-lg"
                                >
                                    <FiEdit2 className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDeleteModal(true)}
                                    className="bg-red-500 text-white p-2 rounded-full shadow-lg"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        <h1 className={`text-3xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            {recipe.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className={`flex items-center gap-1 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                <FiUser className="w-4 h-4" />
                                <span>{recipe.author.username}</span>
                            </div>
                            <div className={`flex items-center gap-1 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                <FiClock className="w-4 h-4" />
                                <span>{recipe.prepTime + recipe.cookTime} mins</span>
                            </div>
                            <div className={`flex items-center gap-1 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                <FiBook className="w-4 h-4" />
                                <span>{recipe.category}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipe Actions */}
                <div className="flex items-center gap-4 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFavorite}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                            isFavorite
                                ? 'bg-orange-500 text-white'
                                : isDarkMode
                                    ? 'bg-gray-800 text-gray-300'
                                    : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                            isDarkMode
                                ? 'bg-gray-800 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        <FiShare2 className="w-5 h-5" />
                        <span>Share</span>
                    </motion.button>
                </div>

                {/* Recipe Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Ingredients */}
                    <div className={`md:col-span-1 rounded-xl p-6 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-sm`}>
                        <h2 className={`text-xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Ingredients
                        </h2>
                        <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center gap-2 ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions */}
                    <div className={`md:col-span-2 rounded-xl p-6 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-sm`}>
                        <h2 className={`text-xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Instructions
                        </h2>
                        <ol className="space-y-4">
                            {recipe.instructions.map((instruction, index) => (
                                <li
                                    key={index}
                                    className={`flex gap-4 ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                                >
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                                    }`}>
                                        {index + 1}
                                    </span>
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-8">
                    <h2 className={`text-xl font-bold mb-4 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    isDarkMode
                                        ? 'bg-gray-800 text-gray-300'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Reviews
                        </h2>
                        {user && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowReviewForm(true)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
                            >
                                Write a Review
                            </motion.button>
                        )}
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className={`mb-8 p-6 rounded-xl ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-sm`}>
                            <h3 className={`text-lg font-medium mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Write a Review
                            </h3>
                            <form onSubmit={handleReviewSubmit}>
                                <FormRating
                                    label="Rating"
                                    name="rating"
                                    value={reviewRating}
                                    onChange={(e) => setReviewRating(Number(e.target.value))}
                                    required
                                />
                                <FormTextarea
                                    label="Review"
                                    name="content"
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                    placeholder="Share your thoughts about this recipe..."
                                    required
                                />
                                {reviewError && (
                                    <p className="text-red-500 text-sm mb-4">{reviewError}</p>
                                )}
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewForm(false)}
                                        className={`px-4 py-2 rounded-full ${
                                            isDarkMode
                                                ? 'bg-gray-700 text-gray-300'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {recipe.reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`p-6 rounded-xl ${
                                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                                } shadow-sm`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={review.user.avatar}
                                            alt={review.user.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className={`font-medium ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {review.user.username}
                                            </p>
                                            <p className={`text-sm ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiStar className="w-5 h-5 text-orange-500 fill-current" />
                                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                            {review.rating}
                                        </span>
                                    </div>
                                </div>
                                <p className={`${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    {review.content}
                                </p>
                            </div>
                        ))}
                        {recipe.reviews.length === 0 && (
                            <p className={`text-center py-8 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                No reviews yet. Be the first to review this recipe!
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`rounded-xl shadow-lg p-6 max-w-md w-full mx-4 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                        <h3 className={`text-xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Delete Recipe
                        </h3>
                        <p className={`mb-6 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Are you sure you want to delete this recipe? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className={`px-4 py-2 rounded-full ${
                                    isDarkMode
                                        ? 'bg-gray-700 text-gray-300'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail; 