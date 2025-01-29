// studentController.js
const Assignment = require('../models/Assignment');

// Upload assignment
exports.uploadAssignment = async (req, res) => {
  const { studentId, subjectId } = req.body;
  const file = req.file;
  try {
    const assignment = new Assignment({ studentId, subjectId, filePath: file.path });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading assignment', error });
  }
};

// Get student dashboard
exports.getStudentDashboard = async (req, res) => {
  const { studentId } = req.params;
  try {
    const assignments = await Assignment.find({ studentId });
    res.status(200).json({ message: 'Dashboard fetched', assignments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard', error });
  }
};