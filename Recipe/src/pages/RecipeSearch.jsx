import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { 
    FaSearch, 
    FaFilter, 
    FaTimes, 
    FaChevronLeft,
    FaChevronRight,
    FaLeaf,
    FaDrumstickBite,
    FaSeedling,
    FaClock,
    FaStar,
    FaFire,
    FaUtensils,
    FaChevronDown
} from "react-icons/fa";
import OptimizedImage from "../components/OptimizedImage";

// Sample recipe data
const sampleRecipes = [
    {
        id: 1,
        title: "Mediterranean Pasta",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60",
        description: "Fresh pasta with Mediterranean vegetables and herbs.",
        time: "30 mins",
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.8,
        calories: 450
    },
    // Add more sample recipes here
];

const RecipeSearch = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipes, setRecipes] = useState(sampleRecipes);

    // Filter options
    const filterOptions = {
        categories: [
            { id: "vegetarian", label: "Vegetarian", icon: FaLeaf },
            { id: "non-vegetarian", label: "Non-Vegetarian", icon: FaDrumstickBite },
            { id: "vegan", label: "Vegan", icon: FaSeedling }
        ],
        timeRanges: [
            { id: "quick", label: "< 30 mins", icon: FaClock },
            { id: "medium", label: "30-60 mins", icon: FaClock },
            { id: "long", label: "> 60 mins", icon: FaClock }
        ],
        difficulty: [
            { id: "easy", label: "Easy", icon: FaUtensils },
            { id: "intermediate", label: "Intermediate", icon: FaUtensils },
            { id: "expert", label: "Expert", icon: FaUtensils }
        ]
    };

    const handleFilterToggle = (filter) => {
        setSelectedFilters(prev => {
            const exists = prev.find(f => f.id === filter.id);
            if (exists) {
                return prev.filter(f => f.id !== filter.id);
            }
            return [...prev, filter];
        });
    };

    return (
        <div className={`min-h-screen bg-gray-900`}>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                        >
                            <FaChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Recipe Search
                        </h1>
                    </div>
                </div>
            </header>

            {/* Search and Filters Section */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by ingredient or recipe name..."
                        className="w-full px-6 py-4 pl-12 text-lg rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none shadow-lg"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* Filter Tags */}
                {selectedFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {selectedFilters.map((filter) => (
                            <motion.div
                                key={filter.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"
                            >
                                <filter.icon className="w-4 h-4" />
                                <span>{filter.label}</span>
                                <button
                                    onClick={() => handleFilterToggle(filter)}
                                    className="hover:text-orange-700 dark:hover:text-orange-300"
                                >
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Filter Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <FaFilter className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">Filters</span>
                    <FaChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Filter Dropdown */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                        >
                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleFilterToggle(category)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                                                selectedFilters.find(f => f.id === category.id)
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            <category.icon className="w-4 h-4" />
                                            <span>{category.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Ranges */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Time</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.timeRanges.map((time) => (
                                        <button
                                            key={time.id}
                                            onClick={() => handleFilterToggle(time)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                                                selectedFilters.find(f => f.id === time.id)
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            <time.icon className="w-4 h-4" />
                                            <span>{time.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Difficulty</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.difficulty.map((level) => (
                                        <button
                                            key={level.id}
                                            onClick={() => handleFilterToggle(level)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                                                selectedFilters.find(f => f.id === level.id)
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            <level.icon className="w-4 h-4" />
                                            <span>{level.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Recipe Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Recipe Image */}
                            <div className="relative h-48">
                                <OptimizedImage
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Recipe Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                                    {recipe.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                    {recipe.description}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <FaClock className="w-4 h-4" />
                                            <span>{recipe.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaFire className="w-4 h-4" />
                                            <span>{recipe.calories} kcal</span>
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
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    currentPage === page
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === 3}
                        className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeSearch; 