import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import OptimizedImage from "./OptimizedImage";

const CTA = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <OptimizedImage
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Delicious food spread"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Ready to Transform Your Cooking Journey?
                        </h2>
                        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                            Join our community of food lovers and discover thousands of delicious recipes,
                            meal planning tools, and cooking tips to elevate your culinary skills.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
                        >
                            Get Started Now
                            <FiArrowRight className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
                        >
                            Explore Recipes
                        </motion.button>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="text-3xl mb-3">🍳</div>
                            <h3 className="text-white font-semibold mb-2">Easy Recipes</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">Step-by-step instructions for perfect results</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="text-3xl mb-3">📱</div>
                            <h3 className="text-white font-semibold mb-2">Mobile Friendly</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">Access your recipes anywhere, anytime</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="text-3xl mb-3">👥</div>
                            <h3 className="text-white font-semibold mb-2">Community</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">Share and connect with food lovers</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTA; 