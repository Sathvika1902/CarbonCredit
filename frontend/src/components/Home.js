import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Footer from "./Footer"; 

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <HeroSection />
            <Features />
            <Footer /> 
        </div>
    );
};

export default Home;
