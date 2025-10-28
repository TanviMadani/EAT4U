import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import OptimizedImage from "./OptimizedImage";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "New York, USA",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 5,
        text: "This recipe website has transformed my cooking journey! The variety of recipes and detailed instructions make it easy to create delicious meals."
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Toronto, Canada",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 5,
        text: "The weekly menu planner is a game-changer. It helps me organize my meals and discover new recipes I wouldn't have tried otherwise."
    },
    {
        id: 3,
        name: "Emma Davis",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 5,
        text: "I love how the recipes are categorized and the search functionality is so intuitive. It's my go-to website for cooking inspiration!"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-gray-600">
                        Join our community of food lovers and share your experience
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full"
                        >
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    {/* User Image */}
                                    <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-orange-100">
                                        <OptimizedImage
                                            src={testimonials[currentIndex].image}
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Review Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex justify-center md:justify-start mb-2">
                                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className="w-5 h-5 text-yellow-400 fill-current"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            "{testimonials[currentIndex].text}"
                                        </p>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {testimonials[currentIndex].name}
                                            </h4>
                                            <p className="text-gray-500">
                                                {testimonials[currentIndex].location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <FiChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <FiChevronRight className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-3 h-3 rounded-full transition duration-300 ${
                                    index === currentIndex
                                        ? "bg-orange-500"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Add Review Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 mx-auto block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2"
                >
                    <FiPlus className="w-5 h-5" />
                    Add Your Review
                </motion.button>
            </div>
        </section>
    );
};

export default Testimonials; 