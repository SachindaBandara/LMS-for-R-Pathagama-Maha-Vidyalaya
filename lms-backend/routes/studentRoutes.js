const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudentsByGrade,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/', getStudentsByGrade);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;