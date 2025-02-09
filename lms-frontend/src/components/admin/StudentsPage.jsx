import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUserPlus, FiEdit, FiTrash } from "react-icons/fi";
import Sidebar from "./Sidebar"; // Import the Sidebar component

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
      <Sidebar />

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
                    {/* Input fields */}
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
