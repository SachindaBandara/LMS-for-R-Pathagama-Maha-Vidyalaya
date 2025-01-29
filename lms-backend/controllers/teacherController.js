// teacherController.js
const Material = require('../models/Material');

// Upload materials
exports.uploadMaterial = async (req, res) => {
  const { teacherId, subjectId } = req.body;
  const file = req.file;
  try {
    const material = new Material({ teacherId, subjectId, filePath: file.path });
    await material.save();
    res.status(201).json({ message: 'Material uploaded successfully', material });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading material', error });
  }
};

// Get teacher dashboard
exports.getTeacherDashboard = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const materials = await Material.find({ teacherId });
    res.status(200).json({ message: 'Dashboard fetched', materials });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard', error });
  }
};