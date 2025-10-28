import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiSearch, FiClock, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const RecipeList = () => {
    const { isDarkMode } = useTheme();
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedTags, setSelectedTags] = useState([]);

    // Sample data
    const sampleRecipes = [
        {
            _id: '1',
            title: 'Classic Pancakes',
            description: 'Fluffy and delicious pancakes perfect for breakfast',
            image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
            difficulty: 'Easy',
            prepTime: '10 mins',
            cookTime: '15 mins',
            category: 'Breakfast',
            tags: ['breakfast', 'pancakes', 'quick'],
            averageRating: 4.5,
            ratings: [{ rating: 5 }, { rating: 4 }],
            author: { _id: '1', username: 'ChefJohn' }
        },
        {
            _id: '2',
            title: 'Spaghetti Carbonara',
            description: 'Creamy Italian pasta dish with eggs, cheese, and pancetta',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
            difficulty: 'Medium',
            prepTime: '15 mins',
            cookTime: '20 mins',
            category: 'Dinner',
            tags: ['pasta', 'italian', 'dinner'],
            averageRating: 4.8,
            ratings: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
            author: { _id: '2', username: 'ItalianChef' }
        },
        {
            _id: '3',
            title: 'Chocolate Chip Cookies',
            description: 'Classic homemade cookies with melty chocolate chips',
            image: 'https://images.unsplash.com/photo-1558964122-2a5b7b3e5b3d',
            difficulty: 'Easy',
            prepTime: '15 mins',
            cookTime: '12 mins',
            category: 'Dessert',
            tags: ['dessert', 'cookies', 'baking'],
            averageRating: 4.9,
            ratings: [{ rating: 5 }, { rating: 5 }, { rating: 5 }],
            author: { _id: '3', username: 'BakerGirl' }
        }
    ];

    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const allTags = ['breakfast', 'pancakes', 'quick', 'pasta', 'italian', 'dinner', 'dessert', 'cookies', 'baking'];

    const filteredRecipes = sampleRecipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter;
        const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => recipe.tags.includes(tag));
        return matchesSearch && matchesCategory && matchesDifficulty && matchesTags;
    });

    return (
        <div className={`min-h-screen bg-gray-900`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 md:mb-0`}>Recipes</h1>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('grid')}
                                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                                    viewMode === 'grid' 
                                        ? 'bg-orange-500 text-white' 
                                        : isDarkMode 
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                <FiGrid className="w-5 h-5" />
                                Grid
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                                    viewMode === 'list' 
                                        ? 'bg-orange-500 text-white' 
                                        : isDarkMode 
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                <FiList className="w-5 h-5" />
                                List
                            </motion.button>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <span className="text-lg">+</span>
                            Create Recipe
                        </motion.button>
                    </div>
                </div>

                <div className={`rounded-xl shadow-sm p-6 mb-8 border ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search recipes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'border-gray-200'
                                    }`}
                                />
                                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-400'
                                }`} />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 md:col-span-2">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className={`flex-1 min-w-[150px] px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border-gray-200'
                                }`}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <select
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value)}
                                className={`flex-1 min-w-[150px] px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border-gray-200'
                                }`}
                            >
                                <option value="all">All Difficulties</option>
                                {difficulties.map(difficulty => (
                                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                                ))}
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={`flex-1 min-w-[150px] px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border-gray-200'
                                }`}
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="rating">Highest Rated</option>
                                <option value="prepTime">Prep Time</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className={`text-lg font-medium mb-3 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        }`}>Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map(tag => (
                                <motion.button
                                    key={tag}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSelectedTags(prev => 
                                            prev.includes(tag)
                                                ? prev.filter(t => t !== tag)
                                                : [...prev, tag]
                                        );
                                    }}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        selectedTags.includes(tag)
                                            ? 'bg-orange-500 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                    {filteredRecipes.map(recipe => (
                        <motion.div
                            key={recipe._id}
                            className={`${
                                viewMode === 'grid' ? 'col-span-1' : 'col-span-2'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link to={`/recipe/${recipe._id}`} className="block">
                                <div className={`${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700 hover:border-orange-500' 
                                        : 'bg-white border-gray-200 hover:border-orange-500'
                                } rounded-lg shadow-md border-2 transition-all duration-300 h-full flex flex-col`}>
                                    {/* Recipe Image */}
                                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                                        <img
                                            src={recipe.image || '/placeholder-recipe.jpg'}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleFavorite(recipe._id);
                                                }}
                                                className={`p-2 rounded-full ${
                                                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                                                } shadow-md`}
                                            >
                                                <FiHeart
                                                    className={`w-5 h-5 ${
                                                        recipe.isFavorite ? 'text-red-500' : 'text-gray-400'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Recipe Content */}
                                    <div className="p-4 flex-grow flex flex-col">
                                        <h3 className={`text-lg font-semibold mb-2 ${
                                            isDarkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            {recipe.title}
                                        </h3>
                                        <p className={`text-sm mb-4 ${
                                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                            {recipe.description}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    {recipe.prepTime} prep • {recipe.cookTime} cook
                                                </span>
                                                <span className={`text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    {recipe.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredRecipes.length === 0 && (
                    <div className="text-center py-12">
                        <FiSearch className={`text-5xl mb-4 mx-auto ${
                            isDarkMode ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-lg ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>No recipes found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeList; 