const express = require("express");
const { loginAdmin, loginTeacher } = require("../controllers/authController");

const router = express.Router();

// Login routes
router.post("/login/admin", loginAdmin); 
router.post("/login/teacher", loginTeacher); 

module.exports = router;