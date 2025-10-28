import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { 
    FiUser, FiEdit2, FiHeart, FiCalendar, FiAward, 
    FiSettings, FiStar, FiLogOut, FiTrash2, FiPlus,
    FiShare2, FiDownload, FiSave, FiRefreshCw
} from "react-icons/fi";

const Profile = () => {
    const { isDarkMode } = useTheme();
    const { user: authUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("saved");
    const [user, setUser] = useState({
        name: authUser?.username || authUser?.name || "User",
        bio: "Cooking Enthusiast | Loves Italian & Quick Meals",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
        savedRecipes: [
            {
                id: 1,
                title: "Classic Margherita Pizza",
                image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
                rating: 4.8,
                time: "30 mins",
                difficulty: "Easy",
                category: "Dinner"
            },
            {
                id: 2,
                title: "Fresh Pasta Carbonara",
                image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
                rating: 4.9,
                time: "45 mins",
                difficulty: "Medium",
                category: "Dinner"
            },
            {
                id: 3,
                title: "Healthy Buddha Bowl",
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
                rating: 4.7,
                time: "25 mins",
                difficulty: "Easy",
                category: "Lunch"
            }
        ],
        weeklyPlan: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        achievements: [
            {
                id: 1,
                title: "Master Chef",
                icon: "🏅",
                description: "Cooked 50 recipes",
                progress: 100
            },
            {
                id: 2,
                title: "Healthy Eater",
                icon: "🥗",
                description: "Made 5 vegan meals",
                progress: 60
            },
            {
                id: 3,
                title: "Social Butterfly",
                icon: "🦋",
                description: "Shared 10 recipes",
                progress: 80
            }
        ],
        preferences: {
            dietary: ["Vegetarian", "Gluten-Free"],
            allergies: ["Nuts"],
            notifications: true
        }
    });

    const toggleDietaryPreference = (preference) => {
        setUser(prev => {
            const exists = prev.preferences.dietary.includes(preference);
            const updatedDietary = exists
                ? prev.preferences.dietary.filter(p => p !== preference)
                : [...prev.preferences.dietary, preference];
            return {
                ...prev,
                preferences: { ...prev.preferences, dietary: updatedDietary }
            };
        });
    };

    const toggleAllergy = (allergy) => {
        setUser(prev => {
            const exists = prev.preferences.allergies.includes(allergy);
            const updatedAllergies = exists
                ? prev.preferences.allergies.filter(a => a !== allergy)
                : [...prev.preferences.allergies, allergy];
            return {
                ...prev,
                preferences: { ...prev.preferences, allergies: updatedAllergies }
            };
        });
    };

    const toggleNotifications = () => {
        setUser(prev => ({
            ...prev,
            preferences: { ...prev.preferences, notifications: !prev.preferences.notifications }
        }));
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const handleViewRecipe = (id) => {
        navigate(`/recipe/${id}`);
    };

    const handleToggleSaved = (id) => {
        setUser(prev => ({
            ...prev,
            savedRecipes: prev.savedRecipes.filter(r => r.id !== id)
        }));
    };

    const handleWriteReview = () => {
        navigate('/recipes');
    };

    const handleSavePreferences = () => {
        // Placeholder success feedback
        alert('Preferences saved');
    };

    const handleSharePlan = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: 'My Weekly Meal Plan', url }).catch(() => {});
        } else {
            navigator.clipboard?.writeText(url);
            alert('Link copied to clipboard');
        }
    };

    const handleDownloadPlan = () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user.weeklyPlan, null, 2));
        const a = document.createElement('a');
        a.setAttribute('href', dataStr);
        a.setAttribute('download', 'meal-plan.json');
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account?')) {
            // Placeholder: just logout for now
            logout();
            navigate('/');
        }
    };

    useEffect(() => {
        if (authUser) {
            setUser(prev => ({
                ...prev,
                name: authUser.username || authUser.name || prev.name
            }));
        }
    }, [authUser]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen bg-gray-900`}
        >
            {/* Hero Section */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`relative overflow-hidden bg-gray-800 shadow-lg`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-500/5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="relative"
                        >
                            <div className="relative">
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-xl"
                                />
                                <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
                                >
                                    <FiEdit2 className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                        <div className="text-center md:text-left">
                            <motion.h1 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}
                            >
                                {getGreeting()}, {user.name}! 👋
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}
                            >
                                {user.bio}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide"
                >
                    {["saved", "preferences", "reviews"].map((tab) => (
                        <motion.button
                            key={tab}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full capitalize transition-colors ${
                                activeTab === tab
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-orange-100'
                            }`}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "saved" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {user.savedRecipes.map((recipe) => (
                                <motion.div
                                    key={recipe.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={`rounded-xl overflow-hidden shadow-xl ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                                            {recipe.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <h3 className={`text-xl font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {recipe.title}
                                            </h3>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleToggleSaved(recipe.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <FiHeart className="w-6 h-6" />
                                            </motion.button>
                                        </div>
                                        <div className="mt-4 flex items-center space-x-4 text-sm">
                                            <span className={`flex items-center ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                <FiStar className="w-5 h-5 text-yellow-400 mr-1" />
                                                {recipe.rating}
                                            </span>
                                            <span className={`${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {recipe.time}
                                            </span>
                                            <span className={`${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {recipe.difficulty}
                                            </span>
                                        </div>
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleViewRecipe(recipe.id)}
                                            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
                                        >
                                            View Recipe
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    

                    {activeTab === "preferences" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`rounded-xl p-8 ${
                                isDarkMode ? 'bg-gray-800' : 'bg-white'
                            } shadow-xl`}
                        >
                            <h2 className={`text-3xl font-bold mb-8 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Preferences & Settings
                            </h2>
                            
                            {/* Dietary Preferences */}
                            <div className="mb-10">
                                <h3 className={`text-xl font-semibold mb-6 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Dietary Preferences
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Vegetarian", "Vegan", "Keto", "Gluten-Free", "Low-Carb"].map((pref) => (
                                        <motion.button
                                            key={pref}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleDietaryPreference(pref)}
                                            className={`px-6 py-3 rounded-full ${
                                                user.preferences.dietary.includes(pref)
                                                    ? 'bg-orange-500 text-white shadow-lg'
                                                    : isDarkMode
                                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {pref}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Allergy Filters */}
                            <div className="mb-10">
                                <h3 className={`text-xl font-semibold mb-6 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Allergy Filters
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Nuts", "Dairy", "Shellfish", "Eggs", "Soy"].map((allergy) => (
                                        <motion.button
                                            key={allergy}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleAllergy(allergy)}
                                            className={`px-6 py-3 rounded-full ${
                                                user.preferences.allergies.includes(allergy)
                                                    ? 'bg-red-500 text-white shadow-lg'
                                                    : isDarkMode
                                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {allergy}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div className="mb-10">
                                <h3 className={`text-xl font-semibold mb-6 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Notification Settings
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            Meal Plan Reminders
                                        </span>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={toggleNotifications}
                                            className={`relative inline-flex h-7 w-14 items-center rounded-full ${
                                                user.preferences.notifications ? 'bg-orange-500' : 'bg-gray-500'
                                            }`}
                                        >
                                            <motion.span 
                                                animate={{ x: user.preferences.notifications ? 28 : 7 }}
                                                className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg"
                                            />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSavePreferences}
                                className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg text-lg font-semibold"
                            >
                                Save Preferences
                            </motion.button>
                        </motion.div>
                    )}

                    {activeTab === "reviews" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`rounded-xl p-8 ${
                                isDarkMode ? 'bg-gray-800' : 'bg-white'
                            } shadow-xl`}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className={`text-3xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Your Reviews
                                </h2>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWriteReview}
                                    className="flex items-center space-x-3 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
                                >
                                    <FiStar className="w-6 h-6" />
                                    <span className="text-lg">Write a Review</span>
                                </motion.button>
                            </div>
                            <div className="space-y-6">
                                {/* Sample Review */}
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className={`p-6 rounded-lg ${
                                        isDarkMode ? 'bg-gray-700' : 'bg-orange-50'
                                    } shadow-lg`}
                                >
                                    <div className="flex items-center space-x-6">
                                        <img
                                            src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=100&auto=format&fit=crop&q=60"
                                            alt="Recipe"
                                            className="w-20 h-20 rounded-lg object-cover shadow-md"
                                        />
                                        <div>
                                            <h3 className={`text-xl font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                Classic Margherita Pizza
                                            </h3>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <FiStar className="w-5 h-5 text-yellow-400" />
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                                                    4.8
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`mt-6 text-lg ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        Amazing recipe! The crust was perfect and the sauce was delicious. Will definitely make this again!
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Account Actions */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-8 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-xl`}
                >
                    <h2 className={`text-3xl font-bold mb-8 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Account Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => alert('Edit Profile clicked')}
                            className={`flex items-center space-x-4 p-6 rounded-lg ${
                                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-50 hover:bg-orange-100'
                            } transition-colors shadow-lg`}
                        >
                            <FiUser className="w-6 h-6 text-orange-500" />
                            <span className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Edit Profile
                            </span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={logout}
                            className={`flex items-center space-x-4 p-6 rounded-lg ${
                                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-50 hover:bg-orange-100'
                            } transition-colors shadow-lg`}
                        >
                            <FiLogOut className="w-6 h-6 text-orange-500" />
                            <span className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Logout
                            </span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDeleteAccount}
                            className={`flex items-center space-x-4 p-6 rounded-lg ${
                                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-50 hover:bg-orange-100'
                            } transition-colors shadow-lg`}
                        >
                            <FiTrash2 className="w-6 h-6 text-red-500" />
                            <span className="text-lg text-red-500">
                                Delete Account
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile; 