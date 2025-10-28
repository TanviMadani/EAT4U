import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { recipeAPI } from '../services/api';
import FormRating from './FormRating';
import FormTextarea from './FormTextarea';

const ReviewForm = ({ recipeId, onReviewSubmitted }) => {
    const { isDarkMode } = useTheme();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await recipeAPI.createReview(recipeId, {
                rating,
                content
            });
            setRating(0);
            setContent('');
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (err) {
            setError('Failed to submit review. Please try again.');
            console.error('Error submitting review:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormRating
                label="Rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
            />
            <FormTextarea
                label="Review"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts about this recipe..."
                required
            />
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-full ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-600'
                    } text-white transition-colors duration-200`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm; 