// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';


import AdminDashboard from './components/admin/AdminDashboard';
import TeachersPage from './components/admin/TeachersPage'
import StudentsPage from './components/admin/StudentsPage';
import CoursesPage from './components/admin/CoursesPage';
import AnalyticsPage from './components/admin/AnalyticsPage';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachersPage" element={<TeachersPage />} />
        <Route path="/admin/studentsPage" element={<StudentsPage />} />
        <Route path="/admin/coursesPage" element={<CoursesPage />} />
        <Route path="/admin/analyticsPage" element={<AnalyticsPage />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
