// backend/models/Admin.js

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  admin_number: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);

