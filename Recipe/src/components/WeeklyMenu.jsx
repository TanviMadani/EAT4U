import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
    FaUtensils, 
    FaCalendarAlt,
    FaArrowRight,
    FaClock,
    FaUserFriends
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const weeklyMenu = [
    {
        day: "Monday",
        recipe: "Spaghetti Carbonara",
        time: "30 mins",
        servings: "4",
        icon: "🍝",
        color: "bg-blue-900/30",
        textColor: "text-blue-400"
    },
    {
        day: "Tuesday",
        recipe: "Chicken Stir Fry",
        time: "25 mins",
        servings: "4",
        icon: "🍗",
        color: "bg-green-900/30",
        textColor: "text-green-400"
    },
    {
        day: "Wednesday",
        recipe: "Beef Tacos",
        time: "35 mins",
        servings: "4",
        icon: "🌮",
        color: "bg-red-900/30",
        textColor: "text-red-400"
    },
    {
        day: "Thursday",
        recipe: "Vegetable Curry",
        time: "40 mins",
        servings: "4",
        icon: "🍛",
        color: "bg-yellow-900/30",
        textColor: "text-yellow-400"
    },
    {
        day: "Friday",
        recipe: "Grilled Salmon",
        time: "30 mins",
        servings: "4",
        icon: "🐟",
        color: "bg-purple-900/30",
        textColor: "text-purple-400"
    },
    {
        day: "Saturday",
        recipe: "Pizza Margherita",
        time: "45 mins",
        servings: "4",
        icon: "🍕",
        color: "bg-orange-900/30",
        textColor: "text-orange-400"
    },
    {
        day: "Sunday",
        recipe: "Roast Chicken",
        time: "60 mins",
        servings: "6",
        icon: "🍗",
        color: "bg-pink-900/30",
        textColor: "text-pink-400"
    }
];

const WeeklyMenu = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    return (
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
                        Your Weekly Menu Preview
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Plan your meals for the week ahead
                    </p>
                </motion.div>

                {/* Weekly Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {weeklyMenu.map((day, index) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`${day.color} ${
                                isDarkMode ? 'bg-gray-800/50' : ''
                            } rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{day.icon}</span>
                                    <h3 className={`text-xl font-semibold ${day.textColor}`}>
                                        {day.day}
                                    </h3>
                                </div>
                                <FaCalendarAlt className={`w-5 h-5 ${day.textColor}`} />
                            </div>
                            <h4 className={`text-lg font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            } mb-2`}>
                                {day.recipe}
                            </h4>
                            <div className={`flex items-center gap-4 text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                <div className="flex items-center gap-1">
                                    <FaClock className="w-4 h-4" />
                                    <span>{day.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaUserFriends className="w-4 h-4" />
                                    <span>{day.servings} servings</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/weekly-menu")}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                    >
                        <FaUtensils className="w-5 h-5" />
                        View Full Weekly Menu
                        <FaArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default WeeklyMenu;
