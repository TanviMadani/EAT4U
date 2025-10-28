import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import OptimizedImage from "../components/OptimizedImage";
import { 
    FaArrowLeft, 
    FaClock, 
    FaUserFriends, 
    FaFire,
    FaUtensils,
    FaLeaf,
    FaDrumstickBite,
    FaSeedling
} from "react-icons/fa";

// Recipe data (same as in FeaturedRecipes)
const recipes = [
    {
        id: 1,
        title: "Classic Margherita Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        time: "45 mins",
        servings: "4",
        category: "Italian",
        description: "A traditional Italian pizza with fresh tomatoes, mozzarella, and basil.",
        ingredients: [
            "Pizza dough",
            "Fresh tomatoes",
            "Mozzarella cheese",
            "Fresh basil",
            "Extra virgin olive oil",
            "Salt and pepper"
        ],
        instructions: [
            "Preheat the oven to 450°F (230°C).",
            "Roll out the pizza dough.",
            "Top with tomatoes, mozzarella, and basil.",
            "Drizzle with olive oil and season.",
            "Bake for 12-15 minutes until crispy."
        ],
        nutrition: {
            calories: 450,
            protein: "15g",
            carbs: "65g",
            fat: "12g",
            fiber: "8g"
        }
    },
    {
        id: 2,
        title: "Grilled Salmon with Vegetables",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        time: "30 mins",
        servings: "4",
        category: "Seafood",
        description: "Healthy grilled salmon served with seasonal vegetables.",
        ingredients: [
            "4 salmon fillets",
            "Mixed vegetables",
            "Olive oil",
            "Lemon",
            "Herbs",
            "Salt and pepper"
        ],
        instructions: [
            "Season salmon with herbs and lemon.",
            "Grill salmon for 6-8 minutes.",
            "Sauté vegetables until tender.",
            "Serve salmon with vegetables."
        ],
        nutrition: {
            calories: 350,
            protein: "25g",
            carbs: "15g",
            fat: "20g",
            fiber: "5g"
        }
    },
    {
        id: 3,
        title: "Chicken Stir Fry",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=60",
        rating: 4.7,
        time: "25 mins",
        servings: "4",
        category: "Asian",
        description: "Quick and flavorful chicken stir fry with fresh vegetables.",
        ingredients: [
            "Chicken breast",
            "Mixed vegetables",
            "Soy sauce",
            "Garlic",
            "Ginger",
            "Oil"
        ],
        instructions: [
            "Slice chicken and vegetables.",
            "Stir fry chicken until cooked.",
            "Add vegetables and sauce; cook until tender.",
            "Serve hot with rice."
        ],
        nutrition: { calories: 380, protein: "28g", carbs: "30g", fat: "14g", fiber: "4g" }
    },
    {
        id: 4,
        title: "Beef Tacos",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        time: "35 mins",
        servings: "4",
        category: "Mexican",
        description: "Spicy beef tacos with fresh toppings and homemade salsa.",
        ingredients: [
            "Tortillas",
            "Ground beef",
            "Taco seasoning",
            "Lettuce",
            "Tomatoes",
            "Cheese"
        ],
        instructions: [
            "Cook beef with seasoning.",
            "Warm tortillas.",
            "Assemble tacos with toppings.",
            "Serve with salsa."
        ],
        nutrition: { calories: 420, protein: "22g", carbs: "38g", fat: "18g", fiber: "5g" }
    },
    {
        id: 5,
        title: "Vegetable Curry",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60",
        rating: 4.6,
        time: "40 mins",
        servings: "4",
        category: "Indian",
        description: "Creamy vegetable curry with aromatic spices and coconut milk.",
        ingredients: [
            "Mixed vegetables",
            "Coconut milk",
            "Curry powder",
            "Onion",
            "Garlic",
            "Oil"
        ],
        instructions: [
            "Sauté onion, garlic, and spices.",
            "Add vegetables and coconut milk.",
            "Simmer until tender.",
            "Serve with rice or naan."
        ],
        nutrition: { calories: 360, protein: "9g", carbs: "45g", fat: "14g", fiber: "8g" }
    },
    {
        id: 6,
        title: "Pasta Carbonara",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        time: "30 mins",
        servings: "4",
        category: "Italian",
        description: "Classic Italian pasta with eggs, cheese, pancetta, and black pepper.",
        ingredients: [
            "Spaghetti",
            "Eggs",
            "Pancetta",
            "Parmesan",
            "Black pepper",
            "Salt"
        ],
        instructions: [
            "Cook pasta until al dente.",
            "Cook pancetta until crisp.",
            "Toss hot pasta with eggs, cheese, and pancetta.",
            "Serve immediately."
        ],
        nutrition: { calories: 520, protein: "20g", carbs: "62g", fat: "22g", fiber: "3g" }
    },
    {
        id: 7,
        title: "Sushi Roll",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        time: "50 mins",
        servings: "4",
        category: "Japanese",
        description: "Fresh sushi rolls with premium fish and vegetables.",
        ingredients: [
            "Sushi rice",
            "Nori",
            "Fish or vegetables",
            "Soy sauce",
            "Wasabi",
            "Pickled ginger"
        ],
        instructions: [
            "Prepare sushi rice.",
            "Place rice on nori and add fillings.",
            "Roll tightly and slice.",
            "Serve with soy sauce."
        ],
        nutrition: { calories: 310, protein: "12g", carbs: "54g", fat: "5g", fiber: "2g" }
    },
    {
        id: 8,
        title: "Greek Salad",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=60",
        rating: 4.7,
        time: "20 mins",
        servings: "4",
        category: "Mediterranean",
        description: "Fresh and healthy Greek salad with feta cheese and olives.",
        ingredients: [
            "Tomatoes",
            "Cucumbers",
            "Onions",
            "Olives",
            "Feta",
            "Olive oil"
        ],
        instructions: [
            "Chop vegetables.",
            "Toss with olives, feta, and olive oil.",
            "Season and serve."
        ],
        nutrition: { calories: 220, protein: "6g", carbs: "12g", fat: "16g", fiber: "3g" }
    }
];

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    
    // Find the recipe based on ID
    const recipe = recipes.find(r => r.id === parseInt(id));

    // If recipe not found, redirect to home
    React.useEffect(() => {
        if (!recipe) {
            navigate('/');
        }
    }, [recipe, navigate]);

    // Ensure page starts at top when opening/changing recipes
    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [id]);

    if (!recipe) {
        return null;
    }

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "vegetarian":
                return FaLeaf;
            case "non-vegetarian":
                return FaDrumstickBite;
            case "vegan":
                return FaSeedling;
            default:
                return FaUtensils;
        }
    };

    const CategoryIcon = getCategoryIcon(recipe.category);

    return (
        <div className={`min-h-screen bg-gray-900`}>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(-1)}
                            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                        >
                            <FaArrowLeft className="w-6 h-6" />
                        </motion.button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Recipe Details
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Image and Basic Info */}
                    <div className="space-y-6">
                        {/* Recipe Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <OptimizedImage
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-[400px] object-cover"
                            />
                        </motion.div>

                        {/* Basic Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {recipe.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {recipe.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <FaClock className="w-5 h-5 text-orange-500" />
                                    <span>{recipe.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <FaUserFriends className="w-5 h-5 text-orange-500" />
                                    <span>{recipe.servings} servings</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <FaFire className="w-5 h-5 text-orange-500" />
                                    <span>{recipe.nutrition.calories} kcal</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <CategoryIcon className="w-5 h-5 text-orange-500" />
                                    <span>{recipe.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Ingredients and Instructions */}
                    <div className="space-y-6">
                        {/* Ingredients */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Ingredients
                            </h3>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                                    >
                                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Instructions
                            </h3>
                            <ol className="space-y-4">
                                {recipe.instructions.map((instruction, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-4 text-gray-600 dark:text-gray-300"
                                    >
                                        <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center font-semibold">
                                            {index + 1}
                                        </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Nutrition Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Nutrition Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-500">
                                        {recipe.nutrition.calories}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Calories
                                    </div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-500">
                                        {recipe.nutrition.protein}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Protein
                                    </div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-500">
                                        {recipe.nutrition.carbs}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Carbs
                                    </div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-500">
                                        {recipe.nutrition.fat}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Fat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RecipeDetail; 