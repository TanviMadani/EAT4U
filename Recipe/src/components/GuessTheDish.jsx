import { useState } from "react";

const GuessTheDish = () => {
    const questions = [
        {
            ingredients: ["🍅 Tomatoes", "🧀 Cheese", "🌿 Basil", "🍝 Pasta"],
            correct: "Pasta",
            options: ["Pasta", "Pizza", "Salad"],
        },
        {
            ingredients: ["🍞 Bread", "🧈 Butter", "🍓 Jam"],
            correct: "Toast",
            options: ["Toast", "Sandwich", "Pancakes"],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const startGame = () => {
        setShowOptions(true);
        setResult("");
    };

    const checkAnswer = (answer) => {
        if (answer === questions[currentQuestion].correct) {
            setResult("✅ Correct! It's " + answer + "!");
        } else {
            setResult("❌ Oops! Try Again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-purple-500">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold text-gray-800">🎮 Guess the Dish!</h2>
                <p className="text-gray-600 mt-2">
                    Test your culinary knowledge by guessing dishes from their ingredients.
                </p>

                <div className="bg-purple-100 p-4 rounded-lg mt-4">
                    <h3 className="text-gray-700 font-semibold">Current Challenge:</h3>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {questions[currentQuestion].ingredients.map((ingredient, index) => (
                            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full">
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full mt-4 shadow-md transition-all duration-300"
                    onClick={startGame}
                >
                    Play Now
                </button>

                {showOptions && (
                    <div className="mt-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="bg-gray-100 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg m-1"
                                onClick={() => checkAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                <p className="mt-3 font-semibold text-lg">{result}</p>
            </div>
        </div>
    );
};

export default GuessTheDish;