import React from "react";
import transparencyImg from "../images/blockchain.jpg";
import sustainabilityImg from "../images/sustainability.jpg";
import tradingImg from "../images/trading.jpg";

const features = [
    {
        title: "Transparency",
        img: transparencyImg,
        desc: "Blockchain ensures every carbon credit is traceable and verifiable.",
    },
    {
        title: "Sustainability",
        img: sustainabilityImg,
        desc: "Encourage eco-friendly initiatives by managing carbon offsets effectively.",
    },
    {
        title: "Real-Time Trading",
        img: tradingImg,
        desc: "Facilitate peer-to-peer trading of carbon credits seamlessly.",
    },
];

const Features = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                        >
                            <img
                                src={feature.img}
                                alt={feature.title}
                                className="w-full h-56 object-cover mb-6 rounded-xl"
                            />
                            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
