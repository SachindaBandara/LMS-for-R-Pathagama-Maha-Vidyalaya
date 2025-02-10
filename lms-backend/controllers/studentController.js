//controllers/studentControllers
const Student = require('../models/Student');

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Students by Grade
exports.getStudentsByGrade = async (req, res) => {
  try {
    const students = await Student.find({ grade: req.query.grade }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student Count
exports.getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    console.log('Query executed successfully. Student count:', count); // Debug log
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching student count:', error.message);
    res.status(500).json({ message: 'Failed to retrieve student count', error });
  }
};


