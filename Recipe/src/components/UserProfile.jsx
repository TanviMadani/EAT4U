import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiLock, FiMail, FiUser, FiCalendar, FiStar, FiBook, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const UserProfile = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('recipes');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userAPI.getProfile();
                setProfile(data);
            } catch (err) {
                setError('Failed to load profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        try {
            await userAPI.deleteAccount();
            logout();
            navigate('/');
        } catch (err) {
            console.error('Failed to delete account:', err);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen bg-gray-900 py-8`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className={`h-32 w-32 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mx-auto mb-4`}></div>
                        <div className={`h-8 w-1/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mx-auto mb-4`}></div>
                        <div className={`h-4 w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mx-auto mb-8`}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className={`min-h-screen bg-gray-900 py-8`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
                        <p className="mb-8">{error || 'Unable to load your profile.'}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gray-900 py-8`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <img
                            src={profile.avatar || 'https://via.placeholder.com/150'}
                            alt={profile.username}
                            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full"
                        >
                            <FiEdit2 className="w-5 h-5" />
                        </motion.button>
                    </div>
                    <h1 className={`text-3xl font-bold mt-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {profile.username}
                    </h1>
                    <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Member since {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Profile Info */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8`}>
                    <div className={`rounded-xl shadow-sm p-6 border ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <h2 className={`text-xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>Account Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiUser className={`w-5 h-5 mr-2 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <div>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>Username</p>
                                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {profile.username}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FiMail className={`w-5 h-5 mr-2 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <div>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>Email</p>
                                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {profile.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FiCalendar className={`w-5 h-5 mr-2 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <div>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>Joined</p>
                                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {new Date(profile.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl shadow-sm p-6 border ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <h2 className={`text-xl font-bold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>Statistics</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`text-center p-4 rounded-lg ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <FiBook className={`w-8 h-8 mx-auto mb-2 ${
                                    isDarkMode ? 'text-orange-500' : 'text-orange-500'
                                }`} />
                                <p className={`text-2xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>{profile.recipeCount || 0}</p>
                                <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>Recipes</p>
                            </div>
                            <div className={`text-center p-4 rounded-lg ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <FiStar className={`w-8 h-8 mx-auto mb-2 ${
                                    isDarkMode ? 'text-orange-500' : 'text-orange-500'
                                }`} />
                                <p className={`text-2xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>{profile.reviewCount || 0}</p>
                                <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>Reviews</p>
                            </div>
                            <div className={`text-center p-4 rounded-lg ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <FiHeart className={`w-8 h-8 mx-auto mb-2 ${
                                    isDarkMode ? 'text-orange-500' : 'text-orange-500'
                                }`} />
                                <p className={`text-2xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>{profile.favoriteCount || 0}</p>
                                <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>Favorites</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('recipes')}
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'recipes'
                                    ? 'text-orange-500 border-b-2 border-orange-500'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:text-gray-300'
                                        : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            My Recipes
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'reviews'
                                    ? 'text-orange-500 border-b-2 border-orange-500'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:text-gray-300'
                                        : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            My Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('favorites')}
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'favorites'
                                    ? 'text-orange-500 border-b-2 border-orange-500'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:text-gray-300'
                                        : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Favorites
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className={`rounded-xl shadow-sm p-6 border ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    {activeTab === 'recipes' && (
                        <div>
                            <h3 className={`text-lg font-medium mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>My Recipes</h3>
                            {/* Recipe list will go here */}
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div>
                            <h3 className={`text-lg font-medium mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>My Reviews</h3>
                            {/* Review list will go here */}
                        </div>
                    )}
                    {activeTab === 'favorites' && (
                        <div>
                            <h3 className={`text-lg font-medium mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>Favorite Recipes</h3>
                            {/* Favorite recipes list will go here */}
                        </div>
                    )}
                </div>

                {/* Account Actions */}
                <div className="mt-8 flex justify-end gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className={`px-4 py-2 rounded-full ${
                            isDarkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Logout
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                    >
                        Delete Account
                    </motion.button>
                </div>

                {/* Delete Account Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`rounded-xl shadow-lg p-6 max-w-md w-full mx-4 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>Delete Account</h3>
                            <p className={`mb-6 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className={`px-4 py-2 rounded-full ${
                                        isDarkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile; 