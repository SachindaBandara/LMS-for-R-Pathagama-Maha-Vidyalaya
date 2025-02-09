import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChartLine, FaGraduationCap } from "react-icons/fa";
import { FiUsers, FiBook, FiActivity, FiSettings } from "react-icons/fi";

const Sidebar = () => {
    // State to track the active link
    const [activeLink, setActiveLink] = useState("");
    // State to track the hover link
    const [hoverLink, setHoverLink] = useState("");

    const menuItems = [
        { name: "Dashboard", icon: <FaChartLine className="mr-3" />, link: "/admin/AdminDashboard" },
        { name: "Teachers", icon: <FiUsers className="mr-3" />, link: "/admin/TeachersPage" },
        { name: "Students", icon: <FaGraduationCap className="mr-3" />, link: "/admin/StudentsPage" },
        { name: "Courses", icon: <FiBook className="mr-3" />, link: "/admin/CoursesPage" },
        { name: "Analytics", icon: <FiActivity className="mr-3" />, link: "/admin/AnalyticsPage" },
        { name: "Settings", icon: <FiSettings className="mr-3" />, link: "#" },
    ];

    return (
        <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full transition-transform duration-300 ease-in-out">
            {/* Brand Logo */}
            <div className="p-4 mb-8">
                <h2 className="text-2xl font-bold text-gold-500">R/Pathagama LMS</h2>
            </div>

            {/* Navigation Menu */}
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.link}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out ${
                                    activeLink === item.name
                                        ? "bg-gold-500 text-maroon-900"
                                        : hoverLink === item.name
                                        ? "hover:bg-gold-500 hover:text-maroon-900"
                                        : "hover:bg-gold-500 hover:text-maroon-900"
                                }`}
                                onClick={() => setActiveLink(item.name)}
                                onMouseEnter={() => setHoverLink(item.name)}
                                onMouseLeave={() => setHoverLink("")}
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
