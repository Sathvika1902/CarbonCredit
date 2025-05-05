import React from "react";
import heroImage from "../images/background.jpg";

const HeroSection = () => (
    <div
        className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
        style={{ backgroundImage: `url(${heroImage})` }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Enhanced overlay */}
        <div className="text-center z-10 px-6">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                Transparent Carbon Credit Trading
            </h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
                Leverage blockchain for a secure, efficient, and scalable carbon credit ecosystem.
            </p>
            <div className="space-x-4">
                <a
                    href="/dashboard"
                    className="bg-green-500 px-8 py-4 text-xl font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                    Get Started
                </a>
                <a
                    href="/learn-more"
                    className="border border-white px-8 py-4 text-xl font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                >
                    Learn More
                </a>
            </div>
        </div>
    </div>
);

export default HeroSection;
