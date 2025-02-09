const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create Teacher
exports.createTeacher = async (req, res) => {
  try {
    const { name, assignedClass, subjects, teacherNumber, password } = req.body;

    // Validate required fields
    if (!name || !assignedClass || !subjects || !teacherNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if teacher number is unique
    const existingTeacher = await Teacher.findOne({ teacherNumber });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save teacher
    const teacher = new Teacher({
      name,
      assignedClass,
      subjects,
      teacherNumber,
      password: hashedPassword,
    });

    await teacher.save();
    res.status(201).json({
      message: 'Teacher created successfully',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        assignedClass: teacher.assignedClass,
        subjects: teacher.subjects,
        teacherNumber: teacher.teacherNumber,
      },
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password'); // Exclude passwords
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a Single Teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select('-password'); // Exclude password
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { password, ...updateFields } = req.body;

    // Hash the password if it is being updated
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({
      message: 'Teacher updated successfully',
      teacher,
    });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(400).json({ message: 'Invalid data provided' });
  }
};

// Delete Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Teacher Login
exports.loginTeacher = async (req, res) => {
  const { teacherNumber, password } = req.body;

  try {
    // Validate required fields
    if (!teacherNumber || !password) {
      return res.status(400).json({ message: 'Both teacher number and password are required' });
    }

    // Check if teacher exists
    const teacher = await Teacher.findOne({ teacherNumber });
    if (!teacher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token and teacher info
    res.status(200).json({
      message: 'Login successful',
      token,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        teacherNumber: teacher.teacherNumber,
        assignedClass: teacher.assignedClass,
        subjects: teacher.subjects,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
