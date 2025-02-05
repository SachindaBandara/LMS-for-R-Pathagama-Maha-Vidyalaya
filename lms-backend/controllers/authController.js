const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  const { adminNumber, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ adminNumber });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords directly (plaintext)
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and admin info
    res.status(200).json({
      token,
      admin: { id: admin._id, adminNumber: admin.adminNumber },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginAdmin };
