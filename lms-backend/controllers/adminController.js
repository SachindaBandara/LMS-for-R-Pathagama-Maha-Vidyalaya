// adminController.js
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');

// Add grade
exports.addGrade = async (req, res) => {
  const { gradeName } = req.body;
  try {
    const grade = new Grade({ gradeName });
    await grade.save();
    res.status(201).json({ message: 'Grade added successfully', grade });
  } catch (error) {
    res.status(500).json({ message: 'Error adding grade', error });
  }
};

// Add student
exports.addStudent = async (req, res) => {
  const { name, gradeId, id, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, gradeId, id, password: hashedPassword });
    await student.save();
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};

// Add teacher
exports.addTeacher = async (req, res) => {
  const { name, gradeId, subjectId, id, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ name, gradeId, subjectId, id, password: hashedPassword });
    await teacher.save();
    res.status(201).json({ message: 'Teacher added successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher', error });
  }
};