import React, { useEffect, useState } from 'react';
import { FiBookOpen, FiUsers, FiCalendar, FiClipboard, FiBarChart } from 'react-icons/fi';
import { FaChalkboardTeacher, FaRegChartBar } from 'react-icons/fa';
import axios from 'axios'; // Add axios for API calls

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({
    stats: [],
    courses: [],
    upcomingEvents: [],
    teacherInfo: {} // Holds teacher's name, assigned class, and subject
  });

  useEffect(() => {
    // Fetch teacher data on component mount
    const fetchData = async () => {
      try {
        // Dummy teacher information
        const teacherResponse = {
          data: {
            name: "Ms. Perera",
            assignedClass: "Class 3A",
            subject: "Mathematics"
          }
        };

        // Dummy data for stats, courses, and upcoming events
        const statsResponse = {
          data: [
            { title: "Total Students", value: 120, trend: "+5%", icon: <FiUsers /> },
            { title: "Courses Taught", value: 5, trend: "-2%", icon: <FiBookOpen /> },
            { title: "Assignments Pending", value: 3, trend: "+1", icon: <FiClipboard /> },
            { title: "Upcoming Events", value: 2, trend: "+1", icon: <FiCalendar /> }
          ]
        };

        const coursesResponse = {
          data: [
            { id: 1, name: "Math 101", students: 30, progress: 60 },
            { id: 2, name: "Science 102", students: 25, progress: 80 },
            { id: 3, name: "English 103", students: 35, progress: 45 },
            { id: 4, name: "History 104", students: 40, progress: 70 }
          ]
        };

        const eventsResponse = {
          data: [
            { id: 1, title: "Math Exam", date: "2025-02-20", time: "10:00 AM" },
            { id: 2, title: "Science Lab", date: "2025-02-22", time: "02:00 PM" }
          ]
        };

        // Update state with fetched data
        setTeacherData({
          stats: statsResponse.data,
          courses: coursesResponse.data,
          upcomingEvents: eventsResponse.data,
          teacherInfo: teacherResponse.data,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

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
              <a href="/teacher/teacherDasboard" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FaChalkboardTeacher className="mr-3 text-gold-500" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/teacher/myCourses" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBookOpen className="mr-3" />
                My Courses
              </a>
            </li>
            <li>
              <a href="/teacher/assignments" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiClipboard className="mr-3" />
                Assignments
              </a>
            </li>
            <li>
              <a href="/teacher/students" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiUsers className="mr-3" />
                Students
              </a>
            </li>
            <li>
              <a href="/teacher/analytics" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
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
            <h1 className="text-3xl font-bold text-maroon-900">Welcome, {teacherData.teacherInfo.name || 'Ms. Perera'}</h1>
            <p className="text-gray-600">
              {teacherData.teacherInfo.assignedClass ? `Class: ${teacherData.teacherInfo.assignedClass}` : 'Assigned Class: Not Available'} 
              {teacherData.teacherInfo.subject ? ` | Subject: ${teacherData.teacherInfo.subject}` : ' | Subject: Not Available'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FiCalendar className="w-6 h-6 text-maroon-900" />
            </button>
            <div className="flex items-center">
              {/* <img 
                src="https://via.placeholder.com/40" 
                alt="Teacher" 
                className="w-10 h-10 rounded-full"
              /> */}
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teacherData.stats.map((stat, index) => (
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
              {teacherData.courses.map(course => (
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
              {teacherData.upcomingEvents.map(event => (
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
                {/* Dummy Data for Submissions */}
                <tr>
  <td className="py-3">Dinesh Perera</td>
  <td className="py-3">Math Homework 1</td>
  <td className="py-3">Submitted</td>
  <td className="py-3">2025-02-05</td>
  <td className="py-3">A</td>
</tr>
<tr>
  <td className="py-3">Nadeesha Kumari</td>
  <td className="py-3">Science Lab Report</td>
  <td className="py-3">Pending</td>
  <td className="py-3">-</td>
  <td className="py-3">-</td>
</tr>
<tr>
  <td className="py-3">Kumudu Silva</td>
  <td className="py-3">English Essay</td>
  <td className="py-3">Submitted</td>
  <td className="py-3">2025-02-06</td>
  <td className="py-3">B+</td>
</tr>

              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
