// backend/routes/authRoutes.js

const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// POST: Login (Admin, Teacher, or Student)
router.post('/login', login);

module.exports = router;
