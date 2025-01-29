// backend/controllers/authController.js

const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' });
};

// Login handler for all users
const login = async (req, res) => {
  const { userType, userNumber, password } = req.body;

  try {
    let user;

    // Check if userType is valid and fetch the user from the database
    if (userType === 'admin') {
      user = await Admin.findOne({ adminNumber: userNumber });
    } else if (userType === 'teacher') {
      user = await Teacher.findOne({ teacherNumber: userNumber });
    } else if (userType === 'student') {
      user = await Student.findOne({ studentNumber: userNumber });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id, userType);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, userType, userNumber },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
