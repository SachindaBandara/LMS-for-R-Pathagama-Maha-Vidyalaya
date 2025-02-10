const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudentsByGrade,
  updateStudent,
  deleteStudent,
  getStudentCount,
} = require('../controllers/studentController');

// Routes
router.post('/', createStudent);
router.get('/', getStudentsByGrade);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/count', getStudentCount); // This route must exist

module.exports = router;
