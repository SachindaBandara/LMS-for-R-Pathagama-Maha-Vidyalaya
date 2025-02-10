// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTotalStudents,
  getActiveTeachers,
  getTotalCourses,
  getUserEngagement,
} = require('../controllers/adminController');

// Admin Dashboard Stats
router.get('/stats', async (req, res) => {
  try {
    const [students, teachers, courses, engagement] = await Promise.all([
      getTotalStudents(),
      getActiveTeachers(),
      getTotalCourses(),
      getUserEngagement(),
    ]);

    res.json({
      students,
      teachers,
      courses,
      engagement,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

module.exports = router;