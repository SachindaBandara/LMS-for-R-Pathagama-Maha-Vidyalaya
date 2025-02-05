// src/pages/TeacherDashboard.jsx
import React from 'react';
import { FiBookOpen, FiUsers, FiCalendar, FiClipboard, FiBarChart } from 'react-icons/fi';
import { FaChalkboardTeacher, FaRegChartBar } from 'react-icons/fa';

const TeacherDashboard = () => {
  const stats = [
    { title: "Total Students", value: "142", icon: <FiUsers className="w-6 h-6" />, trend: "+8%" },
    { title: "Active Courses", value: "5", icon: <FiBookOpen className="w-6 h-6" /> },
    { title: "Assignments Due", value: "23", icon: <FiClipboard className="w-6 h-6" /> },
    { title: "Avg. Grade", value: "82%", icon: <FaRegChartBar className="w-6 h-6" /> },
  ];

  const courses = [
    { id: 1, name: "Mathematics Grade 10", progress: 75, students: 32 },
    { id: 2, name: "Physics Grade 11", progress: 60, students: 28 },
    { id: 3, name: "Chemistry Grade 12", progress: 45, students: 25 },
  ];

  const upcomingEvents = [
    { id: 1, title: "Parent-Teacher Meeting", date: "2024-03-25", time: "2:00 PM" },
    { id: 2, title: "Curriculum Workshop", date: "2024-04-01", time: "9:00 AM" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full">
        <div className="p-4 mb-8">
          <h2 className="text-2xl font-bold text-gold-500">Teacher Portal</h2>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FaChalkboardTeacher className="mr-3 text-gold-500" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBookOpen className="mr-3" />
                My Courses
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiClipboard className="mr-3" />
                Assignments
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiUsers className="mr-3" />
                Students
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBarChart className="mr-3" />
                Analytics
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-maroon-900">Welcome, Ms. Perera</h1>
            <p className="text-gray-600">Mathematics Department</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FiCalendar className="w-6 h-6 text-maroon-900" />
            </button>
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Teacher" 
                className="w-10 h-10 rounded-full"
              />
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
                  {stat.trend && <span className="text-green-500 text-sm">{stat.trend}</span>}
                </div>
                <div className="p-3 bg-gold-100 rounded-full">
                  {React.cloneElement(stat.icon, { className: "w-6 h-6 text-gold-500" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* My Courses */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">My Courses</h3>
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{course.name}</h4>
                    <span className="text-sm text-gold-600">{course.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gold-500 rounded-full h-2" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Calendar */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Schedule</h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center p-3 border rounded-lg">
                  <div className="p-2 bg-gold-100 rounded-lg mr-4">
                    <FiCalendar className="text-gold-600" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Calendar Integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Submissions</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Assignment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Submitted</th>
                  <th className="pb-3">Grade</th>
                </tr>
              </thead>
              <tbody>
                {/* Table rows would go here */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;