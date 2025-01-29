// src/pages/LandingPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType) {
      navigate(`/${userType}Login`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-6">Select Account Type</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="radio"
            id="admin"
            name="userType"
            value="admin"
            onChange={(e) => setUserType(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="admin">Admin</label>
        </div>
        <div>
          <input
            type="radio"
            id="teacher"
            name="userType"
            value="teacher"
            onChange={(e) => setUserType(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="teacher">Teacher</label>
        </div>
        <div>
          <input
            type="radio"
            id="student"
            name="userType"
            value="student"
            onChange={(e) => setUserType(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="student">Student</label>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
