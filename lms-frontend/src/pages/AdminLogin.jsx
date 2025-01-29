// src/pages/AdminLogin.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminNumber, setAdminNumber] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { adminNumber, password };
    dispatch(login(userData));
    navigate('/adminDashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="adminNumber" className="block text-lg">
            Admin Number
          </label>
          <input
            type="text"
            id="adminNumber"
            value={adminNumber}
            onChange={(e) => setAdminNumber(e.target.value)}
            className="mt-2 p-2 w-64 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 w-64 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
