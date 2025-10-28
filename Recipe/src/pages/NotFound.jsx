import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900`}>
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className={`text-9xl font-bold mb-4 ${
                        isDarkMode ? 'text-orange-500' : 'text-orange-500'
                    }`}>404</h1>
                    <h2 className={`text-3xl font-bold mb-4 text-white`}>Page Not Found</h2>
                    <p className={`text-lg mb-8 text-gray-300`}>
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Go Back Home
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound; 