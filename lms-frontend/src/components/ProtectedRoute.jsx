import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  return children; // Render the children (protected component)
};

export default ProtectedRoute;