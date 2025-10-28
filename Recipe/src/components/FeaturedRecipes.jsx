import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaStar, FaClock, FaUserFriends } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";
import { useTheme } from "../context/ThemeContext";

const featuredRecipes = [
    {
        id: 1,
        title: "Classic Margherita Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        time: "45 mins",
        servings: "4",
        category: "Italian",
        description: "A traditional Italian pizza with fresh tomatoes, mozzarella, and basil."
    },
    {
        id: 2,
        title: "Grilled Salmon with Vegetables",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        time: "30 mins",
        servings: "4",
        category: "Seafood",
        description: "Healthy grilled salmon served with seasonal vegetables."
    },
    {
        id: 3,
        title: "Chicken Stir Fry",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=60",
        rating: 4.7,
        time: "25 mins",
        servings: "4",
        category: "Asian",
        description: "Quick and flavorful chicken stir fry with fresh vegetables."
    },
    {
        id: 4,
        title: "Beef Tacos",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        time: "35 mins",
        servings: "4",
        category: "Mexican",
        description: "Spicy beef tacos with fresh toppings and homemade salsa."
    },
    {
        id: 5,
        title: "Vegetable Curry",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60",
        rating: 4.6,
        time: "40 mins",
        servings: "4",
        category: "Indian",
        description: "Creamy vegetable curry with aromatic spices and coconut milk."
    },
    {
        id: 6,
        title: "Pasta Carbonara",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        time: "30 mins",
        servings: "4",
        category: "Italian",
        description: "Classic Italian pasta with eggs, cheese, pancetta, and black pepper."
    },
    {
        id: 7,
        title: "Sushi Roll",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        time: "50 mins",
        servings: "4",
        category: "Japanese",
        description: "Fresh sushi rolls with premium fish and vegetables."
    },
    {
        id: 8,
        title: "Greek Salad",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=60",
        rating: 4.7,
        time: "20 mins",
        servings: "4",
        category: "Mediterranean",
        description: "Fresh and healthy Greek salad with feta cheese and olives."
    }
];

const FeaturedRecipes = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    return (
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className={`text-3xl md:text-4xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    } mb-4`}>
                        Featured Recipes
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discover our most popular and delicious recipes
                    </p>
                </motion.div>

                {/* Recipes Scroll Container */}
                <div className="relative">
                    {/* Scroll Container */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-6 pb-6 snap-x snap-mandatory">
                            {featuredRecipes.map((recipe, index) => (
                                <motion.div
                                    key={recipe.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="min-w-[300px] md:min-w-[350px] snap-center"
                                >
                                    <div className={`${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    } rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
                                        {/* Recipe Image */}
                                        <div className="relative h-48">
                                            <OptimizedImage
                                                src={recipe.image}
                                                alt={recipe.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className={`absolute top-4 right-4 ${
                                                isDarkMode 
                                                    ? 'bg-gray-800 text-gray-300' 
                                                    : 'bg-white text-gray-800'
                                            } px-3 py-1 rounded-full text-sm font-medium`}>
                                                {recipe.category}
                                            </div>
                                        </div>

                                        {/* Recipe Content */}
                                        <div className="p-6">
                                            <h3 className={`text-xl font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            } mb-2`}>
                                                {recipe.title}
                                            </h3>
                                            <p className={`${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            } text-sm mb-4 line-clamp-2`}>
                                                {recipe.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className={`flex items-center gap-4 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    <div className="flex items-center gap-1">
                                                        <FaStar className="w-4 h-4 text-yellow-400" />
                                                        <span>{recipe.rating}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FaClock className="w-4 h-4" />
                                                        <span>{recipe.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FaUserFriends className="w-4 h-4" />
                                                        <span>{recipe.servings}</span>
                                                    </div>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                                >
                                                    View Recipe
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {featuredRecipes.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    isDarkMode 
                                        ? 'bg-gray-700 hover:bg-orange-500' 
                                        : 'bg-gray-300 hover:bg-orange-500'
                                } cursor-pointer transition-colors duration-300`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedRecipes;