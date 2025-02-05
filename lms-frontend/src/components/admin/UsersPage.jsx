// src/pages/UsersPage.jsx
import React, { useState } from 'react';
import { FiUserPlus, FiEdit, FiTrash } from 'react-icons/fi';

const UsersPage = () => {
  // Sample initial data
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Ms. Perera",
      assignedClass: "Grade 10",
      subjects: ["Mathematics", "Physics"],
      teacherNumber: "T001",
    },
    {
      id: 2,
      name: "Mr. Silva",
      assignedClass: "Grade 11",
      subjects: ["Chemistry", "Biology"],
      teacherNumber: "T002",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    assignedClass: "",
    subjects: "",
    teacherNumber: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTeacher) {
      // Update existing teacher
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === currentTeacher.id ? { ...teacher, ...formData } : teacher
        )
      );
    } else {
      // Add new teacher
      const newTeacher = { ...formData, id: Date.now() };
      setTeachers([...teachers, newTeacher]);
    }
    setIsModalOpen(false);
    setFormData({ name: "", assignedClass: "", subjects: "", teacherNumber: "", password: "" });
    setCurrentTeacher(null);
  };

  // Handle edit teacher
  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setFormData(teacher);
    setIsModalOpen(true);
  };

  // Handle delete teacher
  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Same as TeacherDashboard) */}
      <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full">
        <div className="p-4 mb-8">
          <h2 className="text-2xl font-bold text-gold-500">Teacher Portal</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FiUserPlus className="mr-3 text-gold-500" />
                Users
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Manage Teachers</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition duration-300"
          >
            <FiUserPlus className="inline mr-2" />
            Add Teacher
          </button>
        </header>

        {/* Teacher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-maroon-900">{teacher.name}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="p-2 text-gold-500 hover:bg-gold-100 rounded-full"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">Class:</span> {teacher.assignedClass}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Subjects:</span> {teacher.subjects.join(", ")}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Teacher Number:</span> {teacher.teacherNumber}
              </p>
            </div>
          ))}
        </div>

        {/* Add/Edit Teacher Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-maroon-900 mb-6">
                {currentTeacher ? "Edit Teacher" : "Add Teacher"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="assignedClass" className="block text-gray-700">
                    Assigned Class
                  </label>
                  <input
                    type="text"
                    id="assignedClass"
                    name="assignedClass"
                    value={formData.assignedClass}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subjects" className="block text-gray-700">
                    Subjects
                  </label>
                  <input
                    type="text"
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="teacherNumber" className="block text-gray-700">
                    Teacher Number
                  </label>
                  <input
                    type="text"
                    id="teacherNumber"
                    name="teacherNumber"
                    value={formData.teacherNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
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
                    {currentTeacher ? "Update" : "Add"}
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

export default UsersPage;