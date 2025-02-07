const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Hash password before saving
// studentSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model('Student', studentSchema);