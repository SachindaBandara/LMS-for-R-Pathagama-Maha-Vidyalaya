const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Added bcrypt import
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");

// Admin Login
const loginAdmin = async (req, res) => {
  const { adminNumber, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ adminNumber });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords directly (plaintext)
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and admin info
    res.status(200).json({
      token,
      admin: { id: admin._id, adminNumber: admin.adminNumber },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Teacher Login
const loginTeacher = async (req, res) => {
  const { teacherNumber, password } = req.body;

  try {
    // Check if teacher exists
    const teacher = await Teacher.findOne({ teacherNumber });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords directly (plaintext)
    if (teacher.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and teacher info
    res.status(200).json({
      token,
      teacher: { id: teacher._id, teacherNumber: teacher.teacherNumber },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { loginAdmin, loginTeacher };
