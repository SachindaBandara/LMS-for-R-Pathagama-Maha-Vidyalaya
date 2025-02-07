const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  address: String,
  telephone: String,
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Student', studentSchema);