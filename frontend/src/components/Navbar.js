import React from "react";
import { NavLink } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-8">
                <h1 className="text-3xl font-extrabold flex items-center">
                    <FaLeaf className="mr-2 text-green-400" /> Carbon Clear
                </h1>
                <ul className="flex space-x-4 items-center text-sm">
                    {["Home", "Dashboard", "Marketplace", "Retirement"].map((item) => (
                        <li key={item}>
                            <NavLink
                                to={`/${item.toLowerCase()}`}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition ${
                                        isActive ? "bg-green-600 text-white" : "hover:text-green-400"
                                    }`
                                }
                            >
                                {item}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <NavLink
                            to="/profile"
                            className="px-4 py-2 rounded-lg font-medium hover:text-blue-400 transition"
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin"
                            className="px-4 py-2 rounded-lg font-medium hover:text-purple-400 transition"
                        >
                            Admin Panel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            className="px-4 py-2 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600 transition"
                        >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
