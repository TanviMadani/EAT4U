import React from 'react';
import { useTheme } from '../context/ThemeContext';

const FormSelect = ({
    label,
    name,
    value,
    error,
    touched,
    onChange,
    onBlur,
    options,
    placeholder,
    required = false,
    className = '',
    ...props
}) => {
    const { isDarkMode } = useTheme();

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
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                    error && touched
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : isDarkMode
                            ? 'border-gray-700 focus:border-orange-500 focus:ring-orange-500'
                            : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                } ${
                    isDarkMode
                        ? 'bg-gray-800 text-white'
                        : 'bg-white text-gray-900'
                } focus:outline-none focus:ring-2 transition-colors duration-200 appearance-none`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && touched && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default FormSelect; 