import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [adminNumber, setAdminNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { adminNumber, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        dispatch(login(data.admin));
        navigate("/admin/adminDashboard");
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
          <h1 className="text-3xl font-bold text-maroon-900">Admin Login</h1>
          <p className="text-gray-500 text-sm">Access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Admin Number Input */}
          <div>
            <label
              htmlFor="adminNumber"
              className="block text-lg font-medium text-gray-700"
            >
              Admin Number
            </label>
            <input
              type="text"
              id="adminNumber"
              value={adminNumber}
              onChange={(e) => setAdminNumber(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-900"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
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

export default AdminLogin;
