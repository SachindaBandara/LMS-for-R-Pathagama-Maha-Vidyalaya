// src/components/Sidebar.jsx
import React from "react";
import { FaChartLine, FaGraduationCap } from "react-icons/fa";
import { FiUsers, FiBook, FiActivity, FiSettings } from "react-icons/fi";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full transition-transform duration-300 ease-in-out">
            {/* Brand Logo */}
            <div className="p-4 mb-8">
                <h2 className="text-2xl font-bold text-gold-500">R/Pathagama LMS</h2>
            </div>

            {/* Navigation Menu */}
            <nav>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gold-100 hover:bg-opacity-20"
                        >
                            <FaChartLine className="mr-3" />
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admin/TeachersPage"
                            className="flex items-center p-3 transition-colors duration-300 ease-in-out hover:bg-gold-100 hover:bg-opacity-20 rounded-lg"
                        >
                            <FiUsers className="mr-3" />
                            Teachers
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admin/StudentsPage"
                            className="flex items-center p-3 transition-colors duration-300 ease-in-out hover:bg-gold-100 hover:bg-opacity-20 rounded-lg"
                        >
                            <FaGraduationCap className="mr-3" />
                            Students
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admin/CoursesPage"
                            className="flex items-center p-3 transition-colors duration-300 ease-in-out hover:bg-gold-100 hover:bg-opacity-20 rounded-lg"
                        >
                            <FiBook className="mr-3" />
                            Courses
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admin/AnalyticsPage"
                            className="flex items-center p-3 transition-colors duration-300 ease-in-out hover:bg-gold-100 hover:bg-opacity-20 rounded-lg"
                        >
                            <FiActivity className="mr-3" />
                            Analytics
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 transition-colors duration-300 ease-in-out hover:bg-gold-100 hover:bg-opacity-20 rounded-lg"
                        >
                            <FiSettings className="mr-3" />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
