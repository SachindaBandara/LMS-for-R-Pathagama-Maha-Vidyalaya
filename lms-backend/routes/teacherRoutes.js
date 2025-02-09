const express = require('express');
const router = express.Router();
const {
  createTeacher,
  getAllTeachers,
  getTeacherById, // New function for fetching a single teacher
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');

// Create a new teacher
router.post('/', createTeacher);

// Get all teachers
router.get('/', getAllTeachers);

// Get a specific teacher by ID
router.get('/:id', getTeacherById); // New route

// Update an existing teacher by ID
router.put('/:id', updateTeacher);

// Delete a teacher by ID
router.delete('/:id', deleteTeacher);

module.exports = router;
