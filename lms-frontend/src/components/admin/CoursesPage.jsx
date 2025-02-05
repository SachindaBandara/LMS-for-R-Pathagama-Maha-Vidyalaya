// src/components/admin/CoursesPage.jsx
import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

const CoursesPage = () => {
  // Sample initial data
  const [courses, setCourses] = useState([
    { id: 1, grade: "Grade 10", subject: "Mathematics" },
    { id: 2, grade: "Grade 10", subject: "Physics" },
    { id: 3, grade: "Grade 11", subject: "Chemistry" },
    { id: 4, grade: "Grade 12", subject: "Biology" },
  ]);

  const [selectedGrade, setSelectedGrade] = useState("Grade 10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
  });

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSubject) {
      // Update existing subject
      setCourses(
        courses.map((course) =>
          course.id === currentSubject.id ? { ...course, ...formData } : course
        )
      );
    } else {
      // Add new subject
      const newSubject = { ...formData, id: Date.now() };
      setCourses([...courses, newSubject]);
    }
    setIsModalOpen(false);
    setFormData({ grade: "", subject: "" });
    setCurrentSubject(null);
  };

  // Handle edit subject
  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setFormData(subject);
    setIsModalOpen(true);
  };

  // Handle delete subject
  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  // Filter subjects by selected grade
  const filteredSubjects = courses.filter((course) => course.grade === selectedGrade);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Same as TeacherDashboard) */}
      <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full">
        <div className="p-4 mb-8">
          <h2 className="text-2xl font-bold text-gold-500">Admin Portal</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FiPlus className="mr-3 text-gold-500" />
                Courses
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Manage Courses</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition duration-300"
          >
            <FiPlus className="inline mr-2" />
            Add Subject
          </button>
        </header>

        {/* Grade Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map((grade) => (
            <button
              key={grade}
              onClick={() => handleGradeSelect(grade)}
              className={`px-4 py-2 rounded-lg ${
                selectedGrade === grade
                  ? "bg-maroon-900 text-white"
                  : "bg-white text-maroon-900 border border-maroon-900"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <div key={subject.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-maroon-900">{subject.subject}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="p-2 text-gold-500 hover:bg-gold-100 rounded-full"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(subject.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">Grade:</span> {subject.grade}
              </p>
            </div>
          ))}
        </div>

        {/* Add/Edit Subject Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-maroon-900 mb-6">
                {currentSubject ? "Edit Subject" : "Add Subject"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="grade" className="block text-gray-700">
                    Grade
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled>
                      Select Grade
                    </option>
                    {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
                  >
                    {currentSubject ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoursesPage;