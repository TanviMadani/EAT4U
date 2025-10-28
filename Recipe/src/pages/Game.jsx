import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaCheck, FaTimes, FaRedo } from "react-icons/fa";

const dishes = [
    { name: "Margherita Pizza", ingredients: ["Tomatoes", "Cheese", "Basil", "Dough"] },
    { name: "Pasta Alfredo", ingredients: ["Pasta", "Cheese", "Cream", "Garlic"] },
    { name: "Caesar Salad", ingredients: ["Lettuce", "Cheese", "Croutons", "Dressing"] },
    { name: "Chicken Stir Fry", ingredients: ["Chicken", "Vegetables", "Soy Sauce", "Rice"] },
    { name: "Beef Tacos", ingredients: ["Beef", "Tortillas", "Lettuce", "Tomatoes"] }
];

const Game = () => {
    const [currentDish, setCurrentDish] = useState(null);
    const [guess, setGuess] = useState("");
    const [result, setResult] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        // Select a random dish when component mounts
        const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
        setCurrentDish(randomDish);
    }, []);

    const handleGuess = () => {
        const userGuess = guess.trim().toLowerCase();
        const isUserCorrect = userGuess === currentDish.name.toLowerCase();
        
        setIsCorrect(isUserCorrect);
        setResult(isUserCorrect ? "Correct! Well done!" : "Try again!");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleGuess();
        }
    };

    const resetGame = () => {
        const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
        setCurrentDish(randomDish);
        setGuess("");
        setResult("");
        setIsCorrect(false);
    };

    if (!currentDish) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-700"
            >
                <div className="flex items-center justify-center mb-6">
                    <FaUtensils className="w-12 h-12 text-purple-500" />
                    <h1 className="text-3xl font-bold text-white ml-3">Guess the Dish!</h1>
                </div>
                <p className="text-gray-300 mb-6">Can you guess the dish from the given ingredients?</p>
                
                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 mb-6">
                    <h2 className="text-lg font-semibold text-purple-400 mb-4">Current Challenge:</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {currentDish.ingredients.map((ingredient, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-purple-600/30 text-purple-300 px-4 py-2 rounded-full text-sm border border-purple-500/30"
                            >
                                {ingredient}
                            </motion.span>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-4">
                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                        placeholder="Enter your guess..."
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGuess}
                        className="w-full bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                    >
                        Submit Guess
                    </motion.button>
                </div>
                
                {result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`mt-6 p-4 rounded-xl ${
                            isCorrect 
                                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isCorrect ? <FaCheck className="w-5 h-5" /> : <FaTimes className="w-5 h-5" />}
                            <span className="font-semibold">{result}</span>
                        </div>
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetGame}
                    className="mt-6 w-full bg-gray-700 text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                    <FaRedo className="w-4 h-4" />
                    Try Another Dish
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Game;