import React from "react";
import { motion } from "framer-motion";
import {
    FiCoffee,
    FiSun,
    FiMoon
} from "react-icons/fi";
import { GiCupcake } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import { GiLeafSwirl } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext";

const categories = [
    {
        name: "Breakfast",
        icon: FiCoffee,
        color: "bg-amber-900/30",
        hoverColor: "hover:bg-amber-900/40",
        borderColor: "border-amber-700",
        textColor: "text-amber-400",
        description: "Start your day with delicious breakfast recipes",
        recipeCount: 23
    },
    {
        name: "Lunch",
        icon: FiSun,
        color: "bg-emerald-900/30",
        hoverColor: "hover:bg-emerald-900/40",
        borderColor: "border-emerald-700",
        textColor: "text-emerald-400",
        description: "Fresh and healthy lunch ideas",
        recipeCount: 18
    },
    {
        name: "Dinner",
        icon: FiMoon,
        color: "bg-rose-900/30",
        hoverColor: "hover:bg-rose-900/40",
        borderColor: "border-rose-700",
        textColor: "text-rose-400",
        description: "Satisfying dinner recipes for the whole family",
        recipeCount: 32
    },
    {
        name: "Snacks",
        icon: GiCupcake,
        color: "bg-pink-900/30",
        hoverColor: "hover:bg-pink-900/40",
        borderColor: "border-pink-700",
        textColor: "text-pink-400",
        description: "Quick and tasty snack recipes",
        recipeCount: 15
    },
    {
        name: "Desserts",
        icon: FaBirthdayCake,
        color: "bg-purple-900/30",
        hoverColor: "hover:bg-purple-900/40",
        borderColor: "border-purple-700",
        textColor: "text-purple-400",
        description: "Sweet treats and dessert recipes",
        recipeCount: 28
    },
    {
        name: "Vegan",
        icon: GiLeafSwirl,
        color: "bg-blue-900/30",
        hoverColor: "hover:bg-blue-900/40",
        borderColor: "border-blue-700",
        textColor: "text-blue-400",
        description: "Plant-based and vegan recipes",
        recipeCount: 20
    }
];

const Categories = () => {
    const { isDarkMode } = useTheme();

    return (
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    } mb-4`}>
                        🍽️ Recipe Categories
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Explore recipes by category
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="mb-8 flex justify-center gap-4 flex-wrap">
                    <button className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                        All Categories
                    </button>
                    <button className={`px-4 py-2 rounded-full ${
                        isDarkMode 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}>
                        Popular
                    </button>
                    <button className={`px-4 py-2 rounded-full ${
                        isDarkMode 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}>
                        Newest
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="group cursor-pointer"
                        >
                            <div className={`relative overflow-hidden rounded-xl border-2 ${
                                isDarkMode 
                                    ? `${category.borderColor} ${category.color} ${category.hoverColor} bg-gray-800/50` 
                                    : `${category.borderColor} ${category.color} ${category.hoverColor}`
                            } transition-all duration-300 shadow-lg hover:shadow-xl`}>

                                {/* Category Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            {/* Render Icon Component Dynamically */}
                                            <div className={`p-3 rounded-lg ${
                                                isDarkMode 
                                                    ? `${category.color} ${category.hoverColor} bg-gray-800/50` 
                                                    : `${category.color} ${category.hoverColor}`
                                            } transition-colors duration-300`}>
                                                {React.createElement(category.icon, {
                                                    className: `w-8 h-8 ${category.textColor}`
                                                })}
                                            </div>
                                            <h3 className={`text-xl font-semibold ${category.textColor}`}>
                                                {category.name}
                                            </h3>
                                        </div>
                                        <span className={`text-sm ${category.textColor} ${
                                            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                                        } px-3 py-1 rounded-full`}>
                                            {category.recipeCount} recipes
                                        </span>
                                    </div>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {category.description}
                                    </p>
                                </div>

                                {/* Hover Effect Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${
                                    isDarkMode ? 'from-gray-900/20' : 'from-black/10'
                                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
