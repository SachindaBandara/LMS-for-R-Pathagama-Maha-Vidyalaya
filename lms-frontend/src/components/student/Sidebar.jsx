import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiBookOpen, FiClipboard, FiCalendar, FiBarChart } from "react-icons/fi";

const Sidebar = () => {
    // State to track the active link
    const [activeLink, setActiveLink] = useState("");
    // State to track the hover link
    const [hoverLink, setHoverLink] = useState("");

    const menuItems = [
        { name: "Dashboard", icon: <FaGraduationCap className="mr-3" />, link: "/student/studentDasboard" },
        { name: "My Courses", icon: <FiBookOpen className="mr-3" />, link: "/student/myCourses" },
        { name: "Assignments", icon: <FiClipboard className="mr-3" />, link: "/student/assignments" },
        { name: "Schedule", icon: <FiCalendar className="mr-3" />, link: "/student/schedule" },
        { name: "Grades", icon: <FiBarChart className="mr-3" />, link: "/student/grades" },
    ];

    return (
        <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full transition-transform duration-300 ease-in-out">
            {/* Brand Logo */}
            <div className="p-4 mb-8">
                <h2 className="text-2xl font-bold text-gold-500">Student Portal</h2>
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
                                        : "hover:bg-gold-100 hover:bg-opacity-10"
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
