import React, { useState } from "react";
import {
  FiBookOpen,
  FiClipboard,
  FiUsers,
  FiBarChart,
  FiPlus,
  FiDownload,
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Sidebar from './Sidebar';

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Homework 1",
      dueDate: "2025-02-15",
      description: "Solve the equations in Chapter 2.",
      submissions: 20,
      totalStudents: 25,
      files: [],
      material: [],
    },
    {
      id: 2,
      title: "Science Project",
      dueDate: "2025-02-20",
      description: "Build a simple model of the solar system.",
      submissions: 18,
      totalStudents: 25,
      files: [],
      material: [],
    },
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
    description: "",
    files: [],
    material: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const handleCreateAssignment = () => {
    const newId = assignments.length + 1;
    setAssignments([
      ...assignments,
      { id: newId, ...newAssignment, submissions: 0, totalStudents: 25 },
    ]);
    setNewAssignment({ title: "", dueDate: "", description: "", files: [], material: [] });
    setShowModal(false);
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    const updatedFiles = [...newAssignment[type], ...Array.from(files)];
    setNewAssignment({ ...newAssignment, [type]: updatedFiles });
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      dueDate: assignment.dueDate,
      description: assignment.description,
      files: assignment.files,
      material: assignment.material,
    });
    setShowModal(true);
  };

  const handleUpdateAssignment = () => {
    setAssignments(assignments.map((assignment) =>
      assignment.id === editingAssignment.id ? { ...editingAssignment, ...newAssignment } : assignment
    ));
    setNewAssignment({ title: "", dueDate: "", description: "", files: [], material: [] });
    setEditingAssignment(null);
    setShowModal(false);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const pieData = assignments.map((assignment) => ({
    name: assignment.title,
    value: assignment.submissions,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Assignments</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600 flex items-center"
          >
            <FiPlus className="mr-2" /> Create Assignment
          </button>
        </header>

        {/* Circular Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Assignment Completion Analysis</h2>
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Assignments</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Submissions</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{assignment.title}</td>
                  <td className="py-3 px-4">{assignment.dueDate}</td>
                  <td className="py-3 px-4">
                    {assignment.submissions}/{assignment.totalStudents}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 mr-2" onClick={() => handleEditAssignment(assignment)}>
                      Edit
                    </button>
                    <button className="text-red-500" onClick={() => handleDeleteAssignment(assignment.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Creating or Editing Assignment */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">{editingAssignment ? "Edit Assignment" : "Create Assignment"}</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, title: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, description: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-gray-700">Upload Files</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "files")}
                  className="w-full border rounded-lg p-2 mt-1"
                />
                <ul className="mt-2">
                  {newAssignment.files.map((file, index) => (
                    <li key={index} className="text-sm">{file.name}</li>
                  ))}
                </ul>
              </div>

              {/* Material Upload */}
              <div className="mb-4">
                <label className="block text-gray-700">Upload Teaching Materials</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "material")}
                  className="w-full border rounded-lg p-2 mt-1"
                />
                <ul className="mt-2">
                  {newAssignment.material.map((file, index) => (
                    <li key={index} className="text-sm">{file.name}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={editingAssignment ? handleUpdateAssignment : handleCreateAssignment}
                  className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
                >
                  {editingAssignment ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Assignments;
