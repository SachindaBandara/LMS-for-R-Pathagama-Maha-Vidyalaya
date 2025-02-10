import React, { useState } from "react";
import {
  FiBookOpen,
  FiClipboard,
  FiUsers,
  FiBarChart,
  FiFilter,
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Sidebar from './Sidebar'

const StudentsPage = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      number: "S001",
      name: "Amara Perera",
      course: "Mathematics",
      attendance: "90%",
      submissions: 8,
    },
    {
      id: 2,
      number: "S002",
      name: "Nimal Wickramasinghe",
      course: "Science",
      attendance: "85%",
      submissions: 6,
    },
    {
      id: 3,
      number: "S003",
      name: "Kamal Silva",
      course: "English",
      attendance: "92%",
      submissions: 10,
    },
  ]);

  const [filters, setFilters] = useState({ class: "", subject: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredStudents = students.filter(
    (student) =>
      (!filters.class || student.class === filters.class) &&
      (!filters.subject || student.course === filters.subject)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     <Sidebar/>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Students</h1>
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Class</label>
              <input
                type="text"
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Enter class"
              />
            </div>
            <div>
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Enter subject"
              />
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Student List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left">Student Number</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Attendance</th>
                <th className="py-3 px-4 text-left">Submissions</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{student.number}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.course}</td>
                  <td className="py-3 px-4">{student.attendance}</td>
                  <td className="py-3 px-4">{student.submissions}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-blue-500 mr-2"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Student Details</h2>
              <p><strong>Student Number:</strong> {selectedStudent.number}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Course:</strong> {selectedStudent.course}</p>
              <p><strong>Attendance:</strong> {selectedStudent.attendance}</p>
              <p><strong>Submissions:</strong> {selectedStudent.submissions}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentsPage;
