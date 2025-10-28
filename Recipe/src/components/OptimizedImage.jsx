import React, { useState } from "react";
import { motion } from "framer-motion";

const OptimizedImage = ({ src, alt, className = "" }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading Placeholder */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />
                </motion.div>
            )}

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

export default OptimizedImage; 