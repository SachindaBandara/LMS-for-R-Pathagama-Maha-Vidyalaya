import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const LandingPage = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType) {
      navigate(`/${userType}Login`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-maroon-900 text-white p-4">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">
          R / Pathagama Maha Vidyalaya
        </h1>
        <p className="text-lg md:text-xl text-gray-200">Learning Management System</p>
      </header>

      {/* Account Type Selection Form */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-gray-800 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Select Account Type</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {/* Admin Card */}
            <div
              className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition duration-300 ${
                userType === "admin" ? "border-gold-500 bg-gold-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("admin")}
            >
              <FaUserShield className="text-4xl text-maroon-900 mb-2" />
              <input type="radio" id="admin" name="userType" value="admin" className="hidden" />
              <label htmlFor="admin" className="text-lg font-semibold">Admin</label>
            </div>

            {/* Teacher Card */}
            <div
              className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition duration-300 ${
                userType === "teacher" ? "border-gold-500 bg-gold-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("teacher")}
            >
              <FaChalkboardTeacher className="text-4xl text-maroon-900 mb-2" />
              <input type="radio" id="teacher" name="userType" value="teacher" className="hidden" />
              <label htmlFor="teacher" className="text-lg font-semibold">Teacher</label>
            </div>

            {/* Student Card */}
            <div
              className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition duration-300 ${
                userType === "student" ? "border-gold-500 bg-gold-100" : "border-gray-300"
              }`}
              onClick={() => setUserType("student")}
            >
              <FaUserGraduate className="text-4xl text-maroon-900 mb-2" />
              <input type="radio" id="student" name="userType" value="student" className="hidden" />
              <label htmlFor="student" className="text-lg font-semibold">Student</label>
            </div>
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition duration-300"
            disabled={!userType}
          >
            Next
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="mt-8 text-center text-gray-300 text-sm md:text-base">
        <p>&copy; {new Date().getFullYear()} R/Pathagama School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
