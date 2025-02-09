import React, { useState, useEffect } from 'react';
import { FiBook, FiClock, FiAlertTriangle, FiCheckCircle, FiBarChart, FiBookOpen, FiCalendar, FiClipboard } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  // Dummy data for available courses
  useEffect(() => {
    const fetchCourses = () => {
      setAvailableCourses([
        { id: 3, title: "Biology Grade 10", teacher: "Dr. Fernando", schedule: "Wed/Fri 2:00 PM" },
        { id: 4, title: "Chemistry Essentials", teacher: "Ms. Jayasuriya", schedule: "Mon/Thu 10:00 AM" },
        { id: 5, title: "History and Culture", teacher: "Mr. Wijesinghe", schedule: "Tue/Fri 1:00 PM" },
      ]);

      // Simulate loading delay
      setTimeout(() => setLoading(false), 1000);
    };

    fetchCourses();
  }, []);

  // Dummy data for enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = () => {
      setEnrolledCourses([
        {
          id: 1,
          title: "Mathematics Grade 10",
          progress: 65,
          teacher: "Ms. Perera",
          schedule: "Mon/Wed 9:00 AM",
          assignments: [
            { title: "Algebra Basics", due: "2023-10-15", status: "completed" },
            { title: "Geometry Quiz", due: "2023-10-22", status: "pending" },
          ],
        },
        {
          id: 2,
          title: "Physics Fundamentals",
          progress: 40,
          teacher: "Mr. Silva",
          schedule: "Tue/Thu 11:00 AM",
          assignments: [
            { title: "Motion Worksheet", due: "2023-10-18", status: "in-progress" },
          ],
        },
      ]);
    };

    fetchEnrolledCourses();
  }, []);

  const handleEnroll = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      const courseToEnroll = availableCourses.find((course) => course.id === parseInt(selectedCourse));
      setEnrolledCourses((prev) => [...prev, { ...courseToEnroll, progress: 0, assignments: [] }]);
      setAvailableCourses((prev) => prev.filter((course) => course.id !== parseInt(selectedCourse)));
      setShowEnrollModal(false);
      setSelectedCourse("");
    }
  };

  const CourseCard = ({ course }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-maroon-900">{course.title}</h2>
          <p className="text-gray-600">{course.teacher}</p>
        </div>
        <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm">
          {course.schedule}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Course Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gold-500 rounded-full h-2" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Upcoming Assignments:</h3>
      <div className="space-y-2">
        {course.assignments.length > 0 ? (
          course.assignments.map((assignment, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className={`mr-3 ${
                assignment.status === 'completed' ? 'text-green-500' : 
                assignment.status === 'pending' ? 'text-red-500' : 'text-gold-500'
              }`}>
                {assignment.status === 'completed' ? <FiCheckCircle /> :
                 assignment.status === 'pending' ? <FiAlertTriangle /> : <FiClock />}
              </div>
              <div>
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(assignment.due).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No assignments yet.</p>
        )}
      </div>
    </div>
  );

  const EnrollModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-maroon-900 mb-4">Enroll in New Course</h2>
        <form className="space-y-4" onSubmit={handleEnroll}>
          <div>
            <label className="block text-gray-700 mb-2">Select Course</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg" 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Choose a course</option>
              {availableCourses.map((course) => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowEnrollModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-maroon-900 text-white rounded-lg hover:bg-maroon-800"
            >
              Enroll
            </button>
          </div>
        </form>
      </div>
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
                <FiBookOpen className="mr-3  text-gold-500" />
                My Courses
              </a>
            </li>
            <li>
              <a href="/student/assignments" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiClipboard className="mr-3" />
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
            <h1 className="text-3xl font-bold text-maroon-900">My Courses</h1>
            <p className="text-gray-600">Track your learning progress</p>
          </div>
          <button
            onClick={() => setShowEnrollModal(true)}
            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
          >
            Enroll in New Course
          </button>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <FiBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No enrolled courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {showEnrollModal && <EnrollModal />}
      </main>
    </div>
  );
};

export default MyCourses;
