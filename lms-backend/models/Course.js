const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
