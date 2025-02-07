const express = require('express');
const router = express.Router();
const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacherController');

router.post('/', createTeacher);
router.get('/', getAllTeachers);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;