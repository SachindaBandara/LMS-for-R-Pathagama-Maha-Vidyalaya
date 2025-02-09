import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUserPlus, FiEdit, FiTrash } from "react-icons/fi";
import { FiActivity, FiBook, FiSettings, FiUsers } from "react-icons/fi";
import { FaChartLine, FaGraduationCap } from "react-icons/fa";

const StudentsPage = () => {
  // State management
  const [students, setStudents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Initial form state
  const initialState = {
    studentNumber: "",
    name: "",
    gender: "",
    birthday: "",
    grade: "",
    address: "",
    telephone: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  // Fetch students based on selected grade
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students", {
          params: { grade: selectedGrade },
        });
        setStudents(response.data);
      } catch (error) {
        toast.error("Failed to fetch students");
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedGrade) {
      fetchStudents();
    } else {
      setStudents([]);
      setIsLoading(false);
    }
  }, [selectedGrade]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = currentStudent
        ? { ...formData, password: formData.password || undefined }
        : formData;

      if (currentStudent) {
        const response = await axios.put(
          `/api/students/${currentStudent._id}`,
          payload
        );
        setStudents(
          students.map((s) =>
            s._id === response.data._id ? response.data : s
          )
        );
      } else {
        const response = await axios.post("/api/students", payload);
        setStudents([...students, response.data]);
      }

      setIsModalOpen(false);
      setFormData(initialState);
      toast.success(
        `Student ${currentStudent ? "updated" : "added"} successfully`
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // Handle delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  // Handle edit student
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
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
                <FiUsers className="mr-3" />
                Teachers
              </a>
            </li>
            <li>
              <a href="/admin/StudentsPage" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FaGraduationCap className="mr-3  text-gold-500" />
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
      <main className="ml-64 flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-maroon-900 mb-4 md:mb-0">
            Manage Students
          </h1>
          <button
            onClick={() => {
              setFormData(initialState);
              setCurrentStudent(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition duration-300 w-full md:w-auto"
          >
            <FiUserPlus className="inline mr-2" />
            Add Student
          </button>
        </header>

        {/* Grade Selection */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map((grade) => (
            <button
              key={grade}
              onClick={() => handleGradeSelect(grade)}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg ${
                selectedGrade === grade
                  ? "bg-maroon-900 text-white"
                  : "bg-white text-maroon-900 border border-maroon-900"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {isLoading ? (
          <p className="text-center text-gray-500 py-8">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No students found. Add a new student!
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Student Number",
                    "Name",
                    "Gender",
                    "Birthday",
                    "Grade",
                    "Address",
                    "Telephone",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="p-3 text-sm whitespace-nowrap">
                      {student.studentNumber}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {student.name}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {student.gender}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {new Date(student.birthday).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {student.grade}
                    </td>
                    <td className="p-3 text-sm max-w-[200px] truncate">
                      {student.address}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {student.telephone || "N/A"}
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 text-gold-500 hover:bg-gold-100 rounded-full"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                        >
                          <FiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Student Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-maroon-900 mb-6">
                  {currentStudent ? "Edit Student" : "Add Student"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Student Number */}
                    <div>
                      <label
                        htmlFor="studentNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Student Number
                      </label>
                      <input
                        type="text"
                        id="studentNumber"
                        name="studentNumber"
                        value={formData.studentNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* Birthday */}
                    <div>
                      <label
                        htmlFor="birthday"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Birthday
                      </label>
                      <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Grade */}
                    <div>
                      <label
                        htmlFor="grade"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Grade
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Grade</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={`Grade ${i + 1}`}>
                            Grade {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Telephone */}
                    <div>
                      <label
                        htmlFor="telephone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Telephone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Address (Full Width) */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Password (Full Width) */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required={!currentStudent}
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-maroon-900 text-white rounded-md hover:bg-maroon-800"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentsPage;