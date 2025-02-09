// src/components/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import { FiActivity } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Students", value: "2,456", icon: <FaGraduationCap className="w-6 h-6" />, trend: "+12%" },
    { title: "Active Teachers", value: "48", icon: <FiActivity className="w-6 h-6" />, trend: "+5%" },
    { title: "Courses", value: "86", icon: <FiActivity className="w-6 h-6" />, trend: "+23%" },
    { title: "User Engagement", value: "78%", icon: <FiActivity className="w-6 h-6" />, trend: "+15%" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <span className="sr-only">Notifications</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="ml-2">Admin User</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-maroon-900 mt-2">
                    {stat.value}
                  </p>
                  <span className="text-green-500 text-sm">{stat.trend}</span>
                </div>
                <div className="p-3 bg-gold-100 rounded-full">
                  {React.cloneElement(stat.icon, { className: "w-6 h-6 text-gold-500" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
