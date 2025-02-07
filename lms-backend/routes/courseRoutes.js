const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Create a course
router.post("/", createCourse);

// Get all courses
router.get("/", getAllCourses);

// Update a course
router.put("/:id", updateCourse);

// Delete a course
router.delete("/:id", deleteCourse);

module.exports = router;
