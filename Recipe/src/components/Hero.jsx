import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-[600px] md:h-[700px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <OptimizedImage
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=60"
                    alt="Delicious food spread"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Discover Delicious Recipes
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        Find and cook amazing recipes from around the world. 
                        Start your culinary journey today!
                    </p>

                    {/* Search Bar */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search for recipes..."
                                className="w-full px-6 py-4 rounded-lg bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/recipes")}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Explore Recipes
                            <FaArrowRight />
                        </motion.button>
                    </div>

                    {/* Featured Categories */}
                    <div className="flex flex-wrap gap-4">
                        {["Italian", "Asian", "Mexican", "Indian", "Mediterranean"].map((category) => (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
