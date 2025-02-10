import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { toast } from "react-toastify";

const TeacherLogin = () => {
  const [teacherNumber, setTeacherNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { teacherNumber, password };
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Login successful!");
        
        // Store the token and teacherId in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("teacherId", data.teacherId);
      
        // Navigate to the teacher dashboard
        navigate("/teacher/teacherDashboard");
      } else {
        console.error("Error response from backend:", data);
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo Placeholder */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-maroon-900">Teacher Login</h1>
          <p className="text-gray-500 text-sm">Access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Teacher Number Input */}
          <div>
            <label htmlFor="teacherNumber" className="block text-lg font-medium text-gray-700">
              Teacher Number
            </label>
            <input
              type="text"
              id="teacherNumber"
              value={teacherNumber}
              onChange={(e) => setTeacherNumber(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-900"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-900"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-maroon-900 text-white font-semibold rounded-lg hover:bg-maroon-800 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-gray-500 hover:text-maroon-900">
            Forgot password?
          </a>
        </div>
      </div>

    </div>
  );
};

export default TeacherLogin;
