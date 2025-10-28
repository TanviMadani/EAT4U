import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { recipeAPI } from '../services/api';

const ReviewList = ({ recipeId }) => {
    const { user } = useAuth();
    const { isDarkMode } = useTheme();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await recipeAPI.getReviews(recipeId);
                setReviews(data);
            } catch (err) {
                setError('Failed to load reviews');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [recipeId]);

    const handleDelete = async (reviewId) => {
        try {
            await recipeAPI.deleteReview(recipeId, reviewId);
            setReviews(reviews.filter(review => review._id !== reviewId));
            setShowDeleteModal(null);
        } catch (err) {
            console.error('Failed to delete review:', err);
        }
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`rounded-xl p-6 border ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className={`h-4 w-1/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4`}></div>
                        <div className={`h-4 w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4`}></div>
                        <div className={`h-4 w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {error}
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No reviews yet. Be the first to review this recipe!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-6 border ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center mb-2">
                                <div className="flex items-center text-yellow-400 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < review.rating ? 'fill-current' : ''
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className={`font-medium ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {review.user?.username || 'Anonymous'}
                                </span>
                            </div>
                            <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {user && (user._id === review.user?._id || user.role === 'admin') && (
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {/* Handle edit */}}
                                    className={`p-2 rounded-full ${
                                        isDarkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <FiEdit2 className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDeleteModal(review._id)}
                                    className={`p-2 rounded-full ${
                                        isDarkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {review.comment}
                    </p>
                </motion.div>
            ))}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`rounded-xl shadow-lg p-6 max-w-md w-full mx-4 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                        <h3 className={`text-xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>Delete Review</h3>
                        <p className={`mb-6 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Are you sure you want to delete this review? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className={`px-4 py-2 rounded-full ${
                                    isDarkMode
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteModal)}
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

export default ReviewList; 