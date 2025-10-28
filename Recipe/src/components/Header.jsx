import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiMenu, FiX, FiFilter, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const suggestions = [
    "Spaghetti Carbonara",
    "Vegan Tacos",
    "Chicken Biryani",
    "Mango Smoothie",
    "Caesar Salad",
    "Pancakes",
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [filter, setFilter] = useState("All");
    const [showProfile, setShowProfile] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "New recipe added!", time: "2m ago" },
        { id: 2, text: "Weekly menu updated", time: "1h ago" },
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchContainerRef = useRef(null);
    const { isDarkMode } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle Search Suggestions
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            const filtered = suggestions.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredSuggestions([]);
        setIsSearchActive(false);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled 
                ? isDarkMode 
                    ? "bg-gray-900/80 backdrop-blur-md shadow-lg" 
                    : "bg-white/80 backdrop-blur-md shadow-lg"
                : isDarkMode 
                    ? "bg-gray-900" 
                    : "bg-white"
        }`}>
            <div className="flex justify-between items-center py-7 px-8 max-w-7xl mx-auto">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="text-2xl font-bold text-orange-500 cursor-pointer px-3"
                >
                    🍳 EAT4U
                </motion.div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-12">
                    <Link to="/" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-300 font-medium px-3 py-2`}>
                        Home
                    </Link>
                    <Link to="/recipes" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-300 font-medium px-3 py-2`}>
                        Recipes
                    </Link>
                    <Link to="/weekly-menu" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-300 font-medium px-3 py-2`}>
                        Weekly Menu
                    </Link>
                    <Link to="/game" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-300 font-medium px-3 py-2`}>
                        Game
                    </Link>
                    <Link to="/profile" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-300 font-medium px-3 py-2`}>
                        Profile
                    </Link>
                </nav>

                
                {/* Right Side Actions */}
                <div className="hidden md:flex items-center space-x-8">
                    
                    {/* Notifications */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`relative p-2.5 ${
                                isDarkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
                            } transition-colors`}
                        >
                            <FiBell size={24} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </motion.button>
                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    className={`absolute right-0 w-80 ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    } shadow-xl rounded-lg mt-2`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className={`p-4 border-b ${
                                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                    }`}>
                                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Notifications
                                        </h3>
                                    </div>
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className={`p-4 ${
                                            isDarkMode 
                                                ? 'hover:bg-gray-700 text-gray-300' 
                                                : 'hover:bg-orange-50'
                                        } transition-colors`}>
                                            <p className="text-sm">{notification.text}</p>
                                            <p className={`text-xs mt-1 ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>{notification.time}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile Icon (only when logged in) */}
                    {user && (
                    <div className="relative group">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setShowProfile(!showProfile)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                isDarkMode 
                                    ? 'bg-gray-800 hover:bg-gray-700' 
                                    : 'bg-gray-100 hover:bg-gray-200'
                            } transition-colors`}
                        >
                            <FiUser size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                        </motion.button>
                        <AnimatePresence>
                            {showProfile && (
                                <motion.div
                                    className={`absolute right-0 w-48 ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    } shadow-xl rounded-lg mt-2`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className={`p-4 border-b ${
                                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                    }`}>
                                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {user?.username || user?.name || 'Profile'}
                                        </h3>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            to="/profile"
                                            className={`flex items-center px-4 py-2 rounded-lg ${
                                                isDarkMode 
                                                    ? 'hover:bg-gray-700 text-gray-300' 
                                                    : 'hover:bg-orange-50'
                                            } transition-colors`}
                                        >
                                            <FiUser className="mr-2" />
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className={`flex items-center px-4 py-2 rounded-lg ${
                                                isDarkMode 
                                                    ? 'hover:bg-gray-700 text-gray-300' 
                                                    : 'hover:bg-orange-50'
                                            } transition-colors`}
                                        >
                                            <FiSettings className="mr-2" />
                                            Settings
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className={`w-full text-left flex items-center px-4 py-2 rounded-lg ${
                                                isDarkMode 
                                                    ? 'hover:bg-gray-700 text-gray-300' 
                                                    : 'hover:bg-orange-50'
                                            } transition-colors`}
                                        >
                                            <FiLogOut className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    )}

                    {/* Auth Buttons (only when logged out) */}
                    {!user && (
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/login"
                            className={`px-4 py-2 rounded-lg ${
                                isDarkMode 
                                    ? 'text-gray-300 hover:text-orange-500' 
                                    : 'text-gray-600 hover:text-orange-500'
                            } transition-colors font-medium`}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors font-medium"
                        >
                            Sign Up
                        </Link>
                    </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2.5 text-gray-600 hover:text-orange-500 transition-colors"
                >
                    <FiMenu size={24} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`md:hidden ${
                            isDarkMode ? 'bg-gray-900' : 'bg-white'
                        } shadow-lg`}
                    >
                        <div className="flex justify-end p-4">
                            <button
                                onClick={toggleMenu}
                                className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        <nav className="p-4">
                            <Link
                                to="/"
                                className={`block py-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                } hover:text-orange-500 transition-colors`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/recipes"
                                className={`block py-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                } hover:text-orange-500 transition-colors`}
                            >
                                Recipes
                            </Link>
                            <Link
                                to="/weekly-menu"
                                className={`block py-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                } hover:text-orange-500 transition-colors`}
                            >
                                Weekly Menu
                            </Link>
                            <Link
                                to="/game"
                                className={`block py-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                } hover:text-orange-500 transition-colors`}
                            >
                                Game
                            </Link>
                            <Link
                                to="/profile"
                                className={`block py-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                } hover:text-orange-500 transition-colors`}
                            >
                                Profile
                            </Link>
                            <div className="mt-4 space-y-2">
                                <Link
                                    to="/login"
                                    className={`block py-2 ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    } hover:text-orange-500 transition-colors`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block py-2 text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
