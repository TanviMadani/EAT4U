import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import WeeklyMenu from "../components/WeeklyMenu";
import FeaturedRecipes from "../components/FeaturedRecipes";
import UserInteraction from "../components/UserInteraction";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <Header />
            <main className="flex-grow">
                <section className="mb-16">
                    <Hero />
                </section>
                <section className="mb-20 bg-gray-800">
                    <UserInteraction />
                </section>
                <section className="mb-20 bg-gray-900">
                    <FeaturedRecipes />
                </section>
                <section className="mb-20 bg-gray-800">
                    <Categories />
                </section>
                <section className="mb-20 bg-gray-900">
                    <WeeklyMenu />
                </section>
                <section className="mb-20 bg-gray-800">
                    <Testimonials />
                </section>
                <section className="mb-20 bg-gray-900">
                    <CTA />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
