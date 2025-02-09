// src/components/admin/AdminDashboard.jsx
import React from 'react';
import { FiUsers, FiBook, FiDollarSign, FiActivity, FiSettings } from 'react-icons/fi';
import { FaChartLine, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Students", value: "2,456", icon: <FaGraduationCap className="w-6 h-6" />, trend: "+12%" },
    { title: "Active Teachers", value: "48", icon: <FiUsers className="w-6 h-6" />, trend: "+5%" },
    { title: "Courses", value: "86", icon: <FiBook className="w-6 h-6" />, trend: "+23%" },
    { title: "User Engagement", value: "78%", icon: <FiActivity className="w-6 h-6" />, trend: "+15%" },
  ];

  const recentActivities = [
    { id: 1, title: "New course uploaded", time: "15 min ago", type: "course" },
    { id: 2, title: "User registration completed", time: "30 min ago", type: "user" },
    { id: 3, title: "System update completed", time: "2 hrs ago", type: "system" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/adminLogin"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full">
        <div className="p-4 mb-8">
          <h2 className="text-2xl font-bold text-gold-500">R/Pathagama LMS</h2>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FaChartLine className="mr-3 text-gold-500" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/TeachersPage" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiUsers className="mr-3" />
                Teachers
              </a>
            </li>
            <li>
              <a href="/admin/StudentsPage" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FaGraduationCap className="mr-3" />
                Students
              </a>
            </li>
            <li>
              <a href="/admin/CoursesPage" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBook className="mr-3" />
                Courses
              </a>
            </li>
            <li>
              <a href="/admin/AnalyticsPage" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiActivity className="mr-3" />
                Analytics
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiSettings className="mr-3" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <span className="sr-only">Notifications</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                  <p className="text-3xl font-bold text-maroon-900 mt-2">{stat.value}</p>
                  <span className="text-green-500 text-sm">{stat.trend}</span>
                </div>
                <div className="p-3 bg-gold-100 rounded-full">
                  {React.cloneElement(stat.icon, { className: "w-6 h-6 text-gold-500" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Enrollment Trends</h3>
            <div className="h-64 bg-gray-100 rounded-lg">
              {/* Chart would go here */}
              <canvas id="enrollmentChart"></canvas>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full mr-3 ${
                    activity.type === 'course' ? 'bg-green-100' :
                    activity.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <FiActivity className={
                      activity.type === 'course' ? 'text-green-500' :
                      activity.type === 'user' ? 'text-blue-500' : 'text-gray-500'
                    } />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Last Active</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3">Pasindu Pathum</td>
                  <td className="py-3">Student</td>
                  <td className="py-3">Active</td>
                  <td className="py-3">10 min ago</td>
                  <td className="py-3">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline ml-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Ms. Perera</td>
                  <td className="py-3">Teacher</td>
                  <td className="py-3">Inactive</td>
                  <td className="py-3">1 day ago</td>
                  <td className="py-3">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline ml-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Mr. Saman Kumara</td>
                  <td className="py-3">Admin</td>
                  <td className="py-3">Active</td>
                  <td className="py-3">5 min ago</td>
                  <td className="py-3">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline ml-2">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
