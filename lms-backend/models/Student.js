// backend/models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  grade: { type: Number, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
