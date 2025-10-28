import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: ({email,password}) => api.post('/auth/login', {email,password}),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh-token'),
};

// Recipe API
export const recipeAPI = {
    getAllRecipes: () => api.get('/recipes'),
    getRecipe: (id) => api.get(`/recipes/${id}`),
    createRecipe: (data) => api.post('/recipes', data),
    updateRecipe: (id, data) => api.put(`/recipes/${id}`, data),
    deleteRecipe: (id) => api.delete(`/recipes/${id}`),
    addFavorite: (id) => api.post(`/recipes/${id}/favorite`),
    removeFavorite: (id) => api.delete(`/recipes/${id}/favorite`),
    getFavorites: () => api.get('/recipes/favorites'),
    searchRecipes: (query) => api.get(`/recipes/search?q=${query}`),
    getRecipesByCategory: (category) => api.get(`/recipes/category/${category}`),
    getRecipesByTag: (tag) => api.get(`/recipes/tag/${tag}`),
    getRecommendedRecipes: () => api.get('/recipes/recommended/recipes'),
    getReviews: (recipeId) => api.get(`/recipes/${recipeId}/reviews`),
    createReview: (recipeId, reviewData) => api.post(`/recipes/${recipeId}/reviews`, reviewData),
    updateReview: (recipeId, reviewId, reviewData) => api.put(`/recipes/${recipeId}/reviews/${reviewId}`, reviewData),
    deleteReview: (recipeId, reviewId) => api.delete(`/recipes/${recipeId}/reviews/${reviewId}`),
};

// User API
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData),
    updatePassword: (data) => api.put('/users/password', data),
    deleteAccount: () => api.delete('/users/account'),
    getRecipes: () => api.get('/users/recipes'),
    getReviews: () => api.get('/users/reviews'),
    getFavorites: () => api.get('/users/favorites'),
    getUserRecipes: (userId) => api.get(`/users/${userId}/recipes`),
    getUserReviews: (userId) => api.get(`/users/${userId}/reviews`),
    saveRecipe: (recipeId) => api.post(`/users/save/${recipeId}`),
    unsaveRecipe: (recipeId) => api.delete(`/users/save/${recipeId}`),
    getSavedRecipes: () => api.get('/users/saved'),
    getMealPlan: () => api.get('/users/meal-plan'),
    updateMealPlan: (mealPlanData) => api.put('/users/meal-plan', mealPlanData),
    uploadAvatar: (formData) => api.post('/users/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};

// Category API
export const categoryAPI = {
    getAllCategories: () => api.get('/categories'),
    getCategory: (id) => api.get(`/categories/${id}`),
    createCategory: (data) => api.post('/categories', data),
    updateCategory: (id, data) => api.put(`/categories/${id}`, data),
    deleteCategory: (id) => api.delete(`/categories/${id}`)
};

// Tag API
export const tagAPI = {
    getAllTags: () => api.get('/tags'),
    getTag: (id) => api.get(`/tags/${id}`),
    createTag: (data) => api.post('/tags', data),
    updateTag: (id, data) => api.put(`/tags/${id}`, data),
    deleteTag: (id) => api.delete(`/tags/${id}`)
};

export default api; 