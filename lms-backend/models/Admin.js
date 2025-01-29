// backend/models/Admin.js

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('Admin', adminSchema);
