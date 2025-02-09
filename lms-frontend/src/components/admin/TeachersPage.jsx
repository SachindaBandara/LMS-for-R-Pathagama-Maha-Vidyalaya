import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUserPlus, FiEdit, FiTrash, FiActivity, FiBook, FiSettings, FiUsers } from "react-icons/fi";
import { FaChartLine, FaGraduationCap } from "react-icons/fa";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]); // State for teachers
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const initialState = {
    name: "",
    assignedClass: "",
    subjects: "",
    teacherNumber: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/teachers");
        if (Array.isArray(response.data)) {
          setTeachers(response.data); // Ensure it's an array
        } else {
          toast.error("Unexpected data format from the server.");
        }
      } catch (error) {
        toast.error("Failed to fetch teachers");
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchTeachers();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle add/edit form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTeacher) {
        // Update teacher
        const response = await axios.put(
          `/api/teachers/${currentTeacher._id}`,
          formData
        );
        setTeachers(
          teachers.map((teacher) =>
            teacher._id === response.data._id ? response.data : teacher
          )
        );
      } else {
        // Add new teacher
        const response = await axios.post("/api/teachers", formData);
        setTeachers([...teachers, response.data]);
      }
      setIsModalOpen(false);
      setFormData(initialState);
      toast.success(`Teacher ${currentTeacher ? "updated" : "added"} successfully`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation failed. Please try again."
      );
    }
  };

  // Handle delete teacher
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  // Handle edit teacher
  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setFormData(teacher);
    setIsModalOpen(true);
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
                <FaChartLine className="mr-3" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/TeachersPage" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiUsers className="mr-3 text-gold-500" />
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
          <h1 className="text-3xl font-bold text-maroon-900">Manage Teachers</h1>
          <button
            onClick={() => {
              setFormData(initialState);
              setCurrentTeacher(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition duration-300"
          >
            <FiUserPlus className="inline mr-2" />
            Add Teacher
          </button>
        </header>

        {/* Loading Indicator */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading teachers...</p>
        ) : teachers.length === 0 ? (
          <p className="text-center text-gray-500">No teachers found. Add a new teacher!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher._id} className="bg-white p-6 rounded-xl shadow-sm">
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
                      onClick={() => handleDelete(teacher._id)}
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
        )}

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
                    Subjects (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subjects: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
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

export default TeachersPage;
