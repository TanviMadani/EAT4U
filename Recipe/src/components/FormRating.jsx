import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiStar } from 'react-icons/fi';

const FormRating = ({
    label,
    name,
    value,
    error,
    touched,
    onChange,
    onBlur,
    required = false,
    className = '',
    maxRating = 5,
    ...props
}) => {
    const { isDarkMode } = useTheme();
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (rating) => {
        onChange({ target: { name, value: rating } });
    };

    const handleMouseEnter = (rating) => {
        setHoverRating(rating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className={`block text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div
                className="flex items-center"
                onMouseLeave={handleMouseLeave}
            >
                {[...Array(maxRating)].map((_, index) => {
                    const rating = index + 1;
                    const isFilled = rating <= (hoverRating || value);
                    
                    return (
                        <button
                            key={rating}
                            type="button"
                            onClick={() => handleClick(rating)}
                            onMouseEnter={() => handleMouseEnter(rating)}
                            className={`focus:outline-none ${
                                isFilled ? 'text-orange-500' : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                            }`}
                        >
                            <FiStar
                                className={`w-6 h-6 transition-colors duration-200 ${
                                    isFilled ? 'fill-current' : ''
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            {error && touched && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default FormRating; 