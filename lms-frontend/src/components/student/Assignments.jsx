import React, { useState, useEffect } from 'react';
import { FiClipboard, FiCheckCircle, FiAlertTriangle, FiClock, FiUpload, FiBookOpen, FiCalendar , FiBarChart} from 'react-icons/fi';
import { FaGraduationCap, FaRegChartBar } from 'react-icons/fa';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for assignments
  useEffect(() => {
    const fetchAssignments = () => {
      setAssignments([
        {
          id: 1,
          title: 'Algebra Basics',
          course: 'Mathematics Grade 10',
          dueDate: '2023-10-15',
          status: 'completed',
          description: 'Complete the basic algebra problems.',
          file: null,
        },
        {
          id: 2,
          title: 'Geometry Quiz',
          course: 'Mathematics Grade 10',
          dueDate: '2023-10-22',
          status: 'pending',
          description: 'A quiz covering basic geometry.',
          file: null,
        },
        {
          id: 3,
          title: 'Motion Worksheet',
          course: 'Physics Fundamentals',
          dueDate: '2023-10-18',
          status: 'in-progress',
          description: 'Complete the worksheet on motion concepts.',
          file: null,
        },
      ]);

      setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    };

    fetchAssignments();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFile = () => {
    if (file && selectedAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? { ...assignment, file: file }
          : assignment
      );
      setAssignments(updatedAssignments);
      setFile(null);
      setSelectedAssignment(null); // Deselect after submission
    }
  };

  const handleDeleteFile = () => {
    if (selectedAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? { ...assignment, file: null }
          : assignment
      );
      setAssignments(updatedAssignments);
      setSelectedAssignment(null); // Deselect after deleting
    }
  };

  const AssignmentCard = ({ assignment }) => (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm mb-6 ${
        selectedAssignment?.id === assignment.id ? 'border-2 border-blue-500' : ''
      }`}
      onClick={() => setSelectedAssignment(assignment)}
    >
      <h3 className="text-xl font-bold text-maroon-900">{assignment.title}</h3>
      <p className="text-sm text-gray-600">{assignment.course}</p>
      <p className="text-sm text-gray-500">{assignment.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
        <div className="flex items-center">
          <div
            className={`mr-3 ${
              assignment.status === 'completed'
                ? 'text-green-500'
                : assignment.status === 'pending'
                ? 'text-red-500'
                : 'text-gold-500'
            }`}
          >
            {assignment.status === 'completed' ? (
              <FiCheckCircle />
            ) : assignment.status === 'pending' ? (
              <FiAlertTriangle />
            ) : (
              <FiClock />
            )}
          </div>
          <span className="text-sm text-gray-600">{assignment.status}</span>
        </div>
      </div>
      {assignment.file && (
        <div className="mt-2">
          <a
            href={URL.createObjectURL(assignment.file)}
            download={assignment.file.name}
            className="text-blue-500"
          >
            Download {assignment.file.name}
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full">
        <div className="p-4 mb-8">
          <h2 className="text-2xl font-bold text-gold-500">Student Portal</h2>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/student/studentDasboard" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FaGraduationCap className="mr-3" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/student/myCourses" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBookOpen className="mr-3" />
                My Courses
              </a>
            </li>
            <li>
              <a href="/student/assignments" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiClipboard className="mr-3  text-gold-500" />
                Assignments
              </a>
            </li>
            <li>
              <a href="/student/schedule" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiCalendar className="mr-3" />
                Schedule
              </a>
            </li>
            <li>
              <a href="/student/grades" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBarChart className="mr-3" />
                Grades
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-maroon-900">My Assignments</h1>
            <p className="text-gray-600">Track your assignments and progress</p>
          </div>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <div className="text-center py-12">
            <FiClipboard className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No assignments yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        )}

        {/* File Upload for Selected Assignment */}
        {selectedAssignment && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-maroon-900">Upload Submission</h3>
            <div className="mt-4">
              <label className="block text-sm text-gray-600" htmlFor="file">
                Upload Your File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleSubmitFile}
                className="bg-maroon-900 text-white p-2 rounded-lg"
              >
                Submit Assignment
              </button>
              {selectedAssignment.file && (
                <button
                  onClick={handleDeleteFile}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Delete Submission
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Assignments;
