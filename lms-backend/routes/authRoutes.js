const express = require("express");
const { loginAdmin, loginTeacher } = require("../controllers/authController");

const router = express.Router();

// Login routes
router.post("/login", loginAdmin);
router.post("/login", loginTeacher); 

module.exports = router;
