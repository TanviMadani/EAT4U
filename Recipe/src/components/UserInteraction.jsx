import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    FiSearch, 
    FiX, 
    FiCheck, 
    FiPlay,
    FiChevronDown
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

const ingredients = [
    { id: 1, name: "Chicken", category: "meat", color: "bg-red-100 text-red-700" },
    { id: 2, name: "Beef", category: "meat", color: "bg-red-100 text-red-700" },
    { id: 3, name: "Rice", category: "grain", color: "bg-yellow-100 text-yellow-700" },
    { id: 4, name: "Pasta", category: "grain", color: "bg-yellow-100 text-yellow-700" },
    { id: 5, name: "Tomatoes", category: "vegetable", color: "bg-green-100 text-green-700" },
    { id: 6, name: "Carrots", category: "vegetable", color: "bg-green-100 text-green-700" },
    { id: 7, name: "Cheese", category: "dairy", color: "bg-blue-100 text-blue-700" },
    { id: 8, name: "Milk", category: "dairy", color: "bg-blue-100 text-blue-700" },
    { id: 9, name: "Eggs", category: "dairy", color: "bg-blue-100 text-blue-700" },
    { id: 10, name: "Onions", category: "vegetable", color: "bg-green-100 text-green-700" }
];

const UserInteraction = () => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const toggleIngredient = (ingredient) => {
        setSelectedIngredients(prev => 
            prev.find(i => i.id === ingredient.id)
                ? prev.filter(i => i.id !== ingredient.id)
                : [...prev, ingredient]
        );
    };

    const removeIngredient = (ingredientId) => {
        setSelectedIngredients(prev => prev.filter(i => i.id !== ingredientId));
    };

    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-16 bg-transparent">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Find Your Perfect Recipe
                    </h2>
                    <p className="text-lg text-gray-300">
                        Select ingredients and discover delicious recipes
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Ingredient Finder */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                    >
                        <h3 className="text-xl font-semibold mb-6 text-white">Ingredient-based Recipe Finder</h3>
                        
                        {/* Search Input */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search ingredients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                            />
                            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Selected Ingredients */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedIngredients.map(ingredient => (
                                <motion.span
                                    key={ingredient.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className={`bg-gray-700 text-gray-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm`}
                                >
                                    {ingredient.name}
                                    <button
                                        onClick={() => removeIngredient(ingredient.id)}
                                        className="hover:text-red-400 transition-colors duration-200"
                                    >
                                        <FiX />
                                    </button>
                                </motion.span>
                            ))}
                        </div>

                        {/* Ingredients Dropdown */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg flex items-center justify-between hover:border-orange-500 transition-colors duration-300"
                            >
                                <span>Select Ingredients</span>
                                <FiChevronDown className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </motion.button>
                            
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                >
                                    {filteredIngredients.map(ingredient => (
                                        <motion.button
                                            key={ingredient.id}
                                            whileHover={{ backgroundColor: "rgba(255, 165, 0, 0.1)" }}
                                            onClick={() => toggleIngredient(ingredient)}
                                            className={`w-full px-4 py-3 flex items-center gap-3 transition-colors duration-200 ${
                                                selectedIngredients.find(i => i.id === ingredient.id)
                                                    ? 'bg-orange-900/30'
                                                    : 'hover:bg-gray-700'
                                            } text-gray-200`}
                                        >
                                            {selectedIngredients.find(i => i.id === ingredient.id) ? (
                                                <FiCheck className="text-green-400" />
                                            ) : (
                                                <div className="w-5 h-5 border border-gray-500 rounded" />
                                            )}
                                            <span>{ingredient.name}</span>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Find Recipes Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Find Recipes
                        </motion.button>
                    </motion.div>

                    {/* Game Teaser */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-white/20 p-3 rounded-full">
                                <FaGamepad className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Guess the Dish!</h3>
                        </div>
                        
                        <p className="mb-6 text-gray-100">
                            Test your culinary knowledge by guessing dishes from their ingredients.
                            Can you identify the recipe from the clues?
                        </p>

                        {/* Game Preview */}
                        <div className="bg-white/10 rounded-lg p-4 mb-6 backdrop-blur-sm">
                            <h4 className="font-semibold mb-3">Current Challenge:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 px-4 py-2 rounded-full">🍅 Tomatoes</span>
                                <span className="bg-white/20 px-4 py-2 rounded-full">🧀 Cheese</span>
                                <span className="bg-white/20 px-4 py-2 rounded-full">🌿 Basil</span>
                                <span className="bg-white/20 px-4 py-2 rounded-full">🍝 Pasta</span>
                            </div>
                        </div>

                        {/* Play Now Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => navigate("/game")}
                        >
                            Play Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default UserInteraction; 