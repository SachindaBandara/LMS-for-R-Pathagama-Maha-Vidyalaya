// src/pages/StudentDashboard.jsx
import React from 'react';
import { FiBookOpen, FiCalendar, FiClipboard, FiBarChart, FiBell } from 'react-icons/fi';
import { FaGraduationCap, FaRegChartBar } from 'react-icons/fa';
import Sidebar from './Sidebar';

const StudentDashboard = () => {
  const stats = [
    { title: "Active Courses", value: "6", icon: <FiBookOpen className="w-6 h-6" /> },
    { title: "Assignments Due", value: "3", icon: <FiClipboard className="w-6 h-6" /> },
    { title: "Avg. Grade", value: "85%", icon: <FaRegChartBar className="w-6 h-6" /> },
    { title: "Attendance", value: "92%", icon: <FiBarChart className="w-6 h-6" /> },
  ];

  const courses = [
    { id: 1, name: "Mathematics", progress: 75, teacher: "Ms. Perera" },
    { id: 2, name: "Sinhala", progress: 60, teacher: "Mr. Silva" },
    { id: 3, name: "Science", progress: 45, teacher: "Ms. Fernando" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Mathematics Exam", date: "2024-03-25", time: "9:00 AM" },
    { id: 2, title: "Science Fair", date: "2024-04-01", time: "10:00 AM" },
  ];

  const recentAssignments = [
    { id: 1, course: "Mathematics", title: "Algebra Homework", dueDate: "2024-03-22", status: "Pending" },
    { id: 2, course: "Physics", title: "Kinematics Problems", dueDate: "2024-03-24", status: "Submitted" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
<Sidebar/>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-maroon-900">Welcome,G.A.P. Pathum</h1>
            <p className="text-gray-600">Grade 10 Student</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FiBell className="w-6 h-6 text-maroon-900" />
            </button>
            <div className="flex items-center">
              {/* <img 
                src="https://via.placeholder.com/40" 
                alt="Student" 
                className="w-10 h-10 rounded-full"
              /> */}
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
                    <span className="text-sm text-gray-500">by {course.teacher}</span>
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

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
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

        {/* Recent Assignments */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Assignments</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Course</th>
                  <th className="pb-3">Assignment</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAssignments.map(assignment => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="py-3">{assignment.course}</td>
                    <td className="py-3">{assignment.title}</td>
                    <td className="py-3">{assignment.dueDate}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        assignment.status === "Pending" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      }`}>
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;