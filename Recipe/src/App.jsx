import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import WeeklyMenu from "./pages/WeeklyMenu";
import RecipeSearch from "./pages/RecipeSearch";
import RecipeDetail from "./pages/RecipeDetail";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext.jsx";
import ReviewForm from "./components/ReviewForm.jsx";
import RecommendedRecipes from "./components/RecommendedRecipes.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import RecipeList from "./components/RecipeList.jsx";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
                        <main className="flex-grow">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />

                                {/* Routes without protection */}
                                <Route path="/weekly-menu" element={<WeeklyMenu />} />
                                <Route path="/recipes" element={<RecipeList />} />
                                <Route path="/recipes/category/:category" element={<RecipeList />} />
                                <Route path="/recipes/search" element={<RecipeSearch />} />
                                <Route path="/recipe/:id" element={<RecipeDetail />} />
                                <Route path="/game" element={<Game />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/recipes/create" element={<RecipeForm />} />
                                <Route path="/recipes/:id/edit" element={<RecipeForm />} />
                                <Route path="/recipes/:id/review" element={<ReviewForm />} />
                                <Route path="/recommended" element={<RecommendedRecipes />} />
                                <Route path="/404" element={<NotFound />} />
                                <Route path="*" element={<Navigate to="/404" replace />} />
                            </Routes>

                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;




/*
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                
                                <Route path="/weekly-menu" element={
                                    <ProtectedRoute>
                                        <WeeklyMenu />
                                    </ProtectedRoute>
                                } />
                                <Route path="/recipes" element={<RecipeList />} />
                                <Route path="/recipes/category/:category" element={<RecipeList />} />
                                <Route path="/recipes/search" element={
                                    <ProtectedRoute>
                                        <RecipeSearch />
                                    </ProtectedRoute>
                                } />
                                <Route path="/recipe/:id" element={
                                    <ProtectedRoute>
                                        <RecipeDetail />
                                    </ProtectedRoute>
                                } />
                                <Route path="/game" element={
                                    <ProtectedRoute>
                                        <Game />
                                    </ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } />
                                <Route path="/recipes/create" element={<RecipeForm />} />
                                <Route path="/recipes/:id/edit" element={<RecipeForm />} />
                                <Route path="/recipes/:id/review" element={<ReviewForm />} />
                                <Route path="/recommended" element={<RecommendedRecipes />} />
                                <Route path="/404" element={<NotFound />} />
                                <Route path="*" element={<Navigate to="/404" replace />} />
                            </Routes> */