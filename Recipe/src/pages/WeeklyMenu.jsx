import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import { 
    FaEdit, 
    FaArrowLeft, 
    FaClock, 
    FaUserFriends,
    FaUtensils,
    FaCoffee,
    FaMoon as FaDinner,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

// Sample weekly menu data
const weeklyMenuData = {
    Monday: {
        breakfast: {
            title: "Healthy Breakfast Bowl",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60",
            description: "Start your day with a nutritious bowl of oats, fruits, and nuts.",
            rating: 4.8,
            time: "15 mins",
            servings: "2",
            color: "bg-yellow-50",
            textColor: "text-yellow-700"
        },
        lunch: {
            title: "Mediterranean Salad",
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=60",
            description: "Fresh and healthy Mediterranean salad with feta and olives.",
            rating: 4.7,
            time: "20 mins",
            servings: "4",
            color: "bg-green-50",
            textColor: "text-green-700"
        },
        dinner: {
            title: "Grilled Salmon",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60",
            description: "Healthy grilled salmon with seasonal vegetables.",
            rating: 4.9,
            time: "30 mins",
            servings: "4",
            color: "bg-blue-50",
            textColor: "text-blue-700"
        }
    },
    Tuesday: {
        breakfast: {
            title: "Avocado Toast",
            image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=60",
            description: "Creamy avocado spread on whole grain toast with poached eggs.",
            rating: 4.8,
            time: "15 mins",
            servings: "2",
            color: "bg-green-50",
            textColor: "text-green-700"
        },
        lunch: {
            title: "Chicken Wrap",
            image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=800&auto=format&fit=crop&q=60",
            description: "Grilled chicken wrap with fresh vegetables and sauce.",
            rating: 4.6,
            time: "20 mins",
            servings: "2",
            color: "bg-orange-50",
            textColor: "text-orange-700"
        },
        dinner: {
            title: "Beef Stir Fry",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=60",
            description: "Quick and flavorful beef stir fry with vegetables.",
            rating: 4.7,
            time: "25 mins",
            servings: "4",
            color: "bg-red-50",
            textColor: "text-red-700"
        }
    },
    Wednesday: {
        breakfast: {
            title: "Smoothie Bowl",
            image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop&q=60",
            description: "Colorful smoothie bowl topped with fresh fruits and granola.",
            rating: 4.9,
            time: "10 mins",
            servings: "2",
            color: "bg-purple-50",
            textColor: "text-purple-700"
        },
        lunch: {
            title: "Quinoa Buddha Bowl",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
            description: "Healthy quinoa bowl with roasted vegetables and tahini dressing.",
            rating: 4.8,
            time: "30 mins",
            servings: "2",
            color: "bg-yellow-50",
            textColor: "text-yellow-700"
        },
        dinner: {
            title: "Pasta Carbonara",
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60",
            description: "Classic Italian pasta with eggs, cheese, and pancetta.",
            rating: 4.9,
            time: "25 mins",
            servings: "4",
            color: "bg-orange-50",
            textColor: "text-orange-700"
        }
    },
    Thursday: {
        breakfast: {
            title: "Greek Yogurt Parfait",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=60",
            description: "Layered Greek yogurt with honey, granola, and berries.",
            rating: 4.7,
            time: "10 mins",
            servings: "2",
            color: "bg-blue-50",
            textColor: "text-blue-700"
        },
        lunch: {
            title: "Tuna Salad",
            image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60",
            description: "Fresh tuna salad with mixed greens and light dressing.",
            rating: 4.6,
            time: "15 mins",
            servings: "2",
            color: "bg-green-50",
            textColor: "text-green-700"
        },
        dinner: {
            title: "Chicken Curry",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60",
            description: "Spicy chicken curry with rice and naan bread.",
            rating: 4.8,
            time: "40 mins",
            servings: "4",
            color: "bg-red-50",
            textColor: "text-red-700"
        }
    },
    Friday: {
        breakfast: {
            title: "Pancakes",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=60",
            description: "Fluffy pancakes with maple syrup and fresh berries.",
            rating: 4.9,
            time: "20 mins",
            servings: "4",
            color: "bg-yellow-50",
            textColor: "text-yellow-700"
        },
        lunch: {
            title: "Sushi Roll",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
            description: "Fresh sushi rolls with premium fish and vegetables.",
            rating: 4.8,
            time: "30 mins",
            servings: "4",
            color: "bg-red-50",
            textColor: "text-red-700"
        },
        dinner: {
            title: "Pizza Margherita",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60",
            description: "Classic Italian pizza with tomatoes, mozzarella, and basil.",
            rating: 4.9,
            time: "45 mins",
            servings: "4",
            color: "bg-orange-50",
            textColor: "text-orange-700"
        }
    },
    Saturday: {
        breakfast: {
            title: "Breakfast Burrito",
            image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=60",
            description: "Hearty breakfast burrito with eggs, beans, and cheese.",
            rating: 4.7,
            time: "20 mins",
            servings: "2",
            color: "bg-orange-50",
            textColor: "text-orange-700"
        },
        lunch: {
            title: "Caesar Salad",
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=60",
            description: "Classic Caesar salad with grilled chicken and croutons.",
            rating: 4.6,
            time: "15 mins",
            servings: "2",
            color: "bg-green-50",
            textColor: "text-green-700"
        },
        dinner: {
            title: "Beef Tacos",
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60",
            description: "Spicy beef tacos with fresh toppings and salsa.",
            rating: 4.8,
            time: "30 mins",
            servings: "4",
            color: "bg-red-50",
            textColor: "text-red-700"
        }
    },
    Sunday: {
        breakfast: {
            title: "French Toast",
            image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=60",
            description: "Golden French toast with powdered sugar and maple syrup.",
            rating: 4.9,
            time: "20 mins",
            servings: "4",
            color: "bg-yellow-50",
            textColor: "text-yellow-700"
        },
        lunch: {
            title: "Roast Chicken",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60",
            description: "Classic roast chicken with herbs and vegetables.",
            rating: 4.8,
            time: "60 mins",
            servings: "6",
            color: "bg-orange-50",
            textColor: "text-orange-700"
        },
        dinner: {
            title: "Vegetable Curry",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60",
            description: "Creamy vegetable curry with aromatic spices.",
            rating: 4.7,
            time: "35 mins",
            servings: "4",
            color: "bg-green-50",
            textColor: "text-green-700"
        }
    }
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = [
    { id: "breakfast", icon: FaCoffee, label: "Breakfast" },
    { id: "lunch", icon: FaUtensils, label: "Lunch" },
    { id: "dinner", icon: FaDinner, label: "Dinner" }
];

const WeeklyMenu = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [isWeekdayBarVisible, setIsWeekdayBarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsWeekdayBarVisible(scrollPosition < 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className="text-gray-300 hover:text-purple-400"
                        >
                            <FaArrowLeft className="w-6 h-6" />
                        </motion.button>
                        <h1 className="text-2xl font-bold text-white">
                            Weekly Menu
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <FaEdit className="w-5 h-5" />
                            {isEditing ? "Save Menu" : "Edit Menu"}
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Sticky Weekday Bar */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: isWeekdayBarVisible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="sticky top-[72px] z-40 bg-gray-800 border-b border-gray-700"
            >
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    const currentIndex = days.indexOf(selectedDay);
                                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : days.length - 1;
                                    setSelectedDay(days[prevIndex]);
                                }}
                                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <FaChevronLeft className="w-5 h-5 text-gray-300" />
                            </button>
                            <h2 className="text-xl font-semibold text-white">
                                {selectedDay}
                            </h2>
                            <button
                                onClick={() => {
                                    const currentIndex = days.indexOf(selectedDay);
                                    const nextIndex = currentIndex < days.length - 1 ? currentIndex + 1 : 0;
                                    setSelectedDay(days[nextIndex]);
                                }}
                                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <FaChevronRight className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {days.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        selectedDay === day
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                >
                                    {day.slice(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {mealTypes.map((mealType) => (
                    <div key={mealType.id} className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <mealType.icon className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-semibold text-white">
                                {mealType.label}
                            </h2>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            {days.map((day) => (
                                <motion.div
                                    key={`${day}-${mealType.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        y: 0,
                                        scale: selectedDay === day ? 1.02 : 1,
                                        boxShadow: selectedDay === day ? "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`relative ${
                                        selectedDay === day ? "ring-2 ring-purple-500 z-10" : ""
                                    }`}
                                >
                                    <div className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 ${
                                        selectedDay === day ? "border-2 border-purple-500" : ""
                                    }`}>
                                        {/* Recipe Image */}
                                        <div className="relative h-56">
                                            <OptimizedImage
                                                src={weeklyMenuData[day]?.[mealType.id]?.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60"}
                                                alt={weeklyMenuData[day]?.[mealType.id]?.title || "Add Recipe"}
                                                className={`w-full h-full object-cover transition-transform duration-300 ${
                                                    selectedDay === day ? "scale-105" : ""
                                                }`}
                                            />
                                            {isEditing && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600">
                                                        Change Recipe
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Recipe Content */}
                                        <div className={`p-6 ${
                                            selectedDay === day ? "bg-purple-900/20" : ""
                                        }`}>
                                            {/* Day Badge */}
                                            <div className="flex justify-end mb-4">
                                                <span className={`text-sm px-3 py-1.5 rounded-full ${
                                                    selectedDay === day 
                                                        ? "bg-purple-900/30 text-purple-300" 
                                                        : "bg-gray-700 text-gray-300"
                                                }`}>
                                                    {day}
                                                </span>
                                            </div>

                                            {/* Recipe Title */}
                                            <h3 className={`font-semibold text-lg mb-3 line-clamp-1 ${
                                                selectedDay === day 
                                                    ? "text-purple-400" 
                                                    : "text-white"
                                            }`}>
                                                {weeklyMenuData[day]?.[mealType.id]?.title || "Add Recipe"}
                                            </h3>

                                            {/* Recipe Description */}
                                            <p className="text-sm text-gray-300 mb-6 line-clamp-3">
                                                {weeklyMenuData[day]?.[mealType.id]?.description || "Click to add a recipe"}
                                            </p>

                                            {/* Recipe Details */}
                                            {weeklyMenuData[day]?.[mealType.id] && (
                                                <div className="flex flex-col gap-4">
                                                    {/* Stats Column */}
                                                    <div className="flex flex-col gap-3 text-sm text-gray-400">
                                                        <div className="flex items-center gap-2">
                                                            <FaClock className="w-4 h-4" />
                                                            <span>Cooking Time: {weeklyMenuData[day][mealType.id].time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaUserFriends className="w-4 h-4" />
                                                            <span>Servings: {weeklyMenuData[day][mealType.id].servings}</span>
                                                        </div>
                                                    </div>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setSelectedRecipe(weeklyMenuData[day][mealType.id])}
                                                        className="w-full text-sm text-purple-400 hover:text-purple-300 font-medium px-4 py-2 rounded-lg bg-purple-900/20 hover:bg-purple-900/30 transition-colors border border-purple-500/30"
                                                    >
                                                        View Recipe
                                                    </motion.button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            {/* Recipe Modal */}
            <AnimatePresence>
                {selectedRecipe && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedRecipe(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-800 rounded-xl max-w-2xl w-full overflow-hidden border border-gray-700"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative h-64">
                                <OptimizedImage
                                    src={selectedRecipe.image}
                                    alt={selectedRecipe.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => setSelectedRecipe(null)}
                                    className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors border border-gray-600"
                                >
                                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {selectedRecipe.title}
                                </h2>
                                <p className="text-gray-300 mb-6">
                                    {selectedRecipe.description}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                                    <div className="flex items-center gap-1">
                                        <FaClock className="w-4 h-4" />
                                        <span>{selectedRecipe.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaUserFriends className="w-4 h-4" />
                                        <span>{selectedRecipe.servings} servings</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    View Full Recipe
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WeeklyMenu;
