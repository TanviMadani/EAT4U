import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    // Get the redirect path from location state or default to home
    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login({ email: formData.email, password: formData.password });
            navigate('/');
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Main Background Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-40"></div>

                {/* Animated Food Icons */}


                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80`}></div>
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative max-w-md w-full space-y-8 p-8 rounded-2xl shadow-2xl bg-gray-800/90 backdrop-blur-md border border-orange-500/30`}
            >
                {/* Logo and Welcome Text */}
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl mb-4"
                    >
                        🍳
                    </motion.div>
                    <h2 className={`text-3xl font-extrabold text-white`}>
                        Welcome Back
                    </h2>
                    <p className={`mt-2 text-sm text-gray-400`}>
                        Sign in to continue your culinary journey
                    </p>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400`}>
                                <FiMail className="h-5 w-5" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                                placeholder="Email address"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400`}>
                                <FiLock className="h-5 w-5" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''
                                    }`}
                            />
                            <label
                                htmlFor="remember-me"
                                className={`ml-2 block text-sm text-gray-300`}
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <FiArrowRight className="h-5 w-5 text-orange-300 group-hover:text-orange-200 transition-colors" />
                        </span>
                        Sign in
                    </motion.button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className={`text-sm text-gray-400`}>
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                        >
                            Create one now
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;