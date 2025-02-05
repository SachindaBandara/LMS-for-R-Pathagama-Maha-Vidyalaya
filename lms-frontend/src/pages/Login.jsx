const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '1234';

// Function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' });
};

// Login handler for all users
const login = async (req, res) => {
  const { userType, userNumber, password } = req.body;

  try {
    // Map userType to respective model and field
    const userTypes = {
      admin: { model: Admin, field: 'adminNumber' },
      teacher: { model: Teacher, field: 'teacherNumber' },
      student: { model: Student, field: 'studentNumber' },
    };

    // Validate userType
    if (!userTypes[userType]) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    // Fetch user model and search field
    const { model, field } = userTypes[userType];

    // Query the database for the user
    const user = await model.findOne({ [field]: userNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, userType);

    // Return success response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, userType, userNumber },
    });
  } catch (error) {
    console.error('Login Error: ', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
