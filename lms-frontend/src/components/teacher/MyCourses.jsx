import React, { useState } from 'react';
import { FiBookOpen, FiClipboard, FiUsers, FiBarChart } from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Sidebar from "./Sidebar";

const MyCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Mathematics for Grade 10",
      students: 45,
      progress: 80,
      assignments: [
        { title: "Algebra Homework", dueDate: "2025-02-10" },
        { title: "Geometry Quiz", dueDate: "2025-02-15" },
      ],
      upcomingTasks: ["Grade Algebra Homework", "Prepare for Trigonometry Lecture"],
      details: [
        { name: "Kavindu Perera", status: "Completed" },
        { name: "Sanduni Fernando", status: "Pending" },
        { name: "Amara Jayawardena", status: "Completed" },
      ],
    },
    {
      id: 2,
      title: "Science for Grade 8",
      students: 50,
      progress: 60,
      assignments: [
        { title: "Chemistry Lab Report", dueDate: "2025-02-12" },
        { title: "Physics Quiz", dueDate: "2025-02-20" },
      ],
      upcomingTasks: ["Prepare Lab Equipment", "Grade Physics Quiz"],
      details: [
        { name: "Nimesh Silva", status: "Pending" },
        { name: "Harini Rathnayake", status: "Completed" },
      ],
    },
  ];

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar/>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">My Courses</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-maroon-900">{course.title}</h2>
              <p className="text-gray-600 mb-4">Students Enrolled: {course.students}</p>

              <div className="mb-4">
                <h3 className="font-medium text-gold-600">Upcoming Assignments</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {course.assignments.map((assignment, index) => (
                    <li key={index}>{assignment.title} - Due: {assignment.dueDate}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gold-600">Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gold-500 rounded-full h-2"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{course.progress}% of syllabus covered</p>
              </div>

              <button
                className="bg-maroon-900 text-white px-4 py-2 rounded-lg hover:bg-maroon-800"
                onClick={() => handleViewDetails(course)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Modal for Course Details */}
        {selectedCourse && (
          <Dialog open={!!selectedCourse} onClose={closeModal}>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-maroon-900">{selectedCourse.title}</h2>
              <p className="mb-4 text-gray-600">Detailed Student Progress</p>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2">Student Name</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourse.details.map((student, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{student.name}</td>
                      <td className="py-2">{student.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default MyCourses;
