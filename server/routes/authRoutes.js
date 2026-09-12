const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", registerUser);

// ================= LOGIN =================
router.post("/login", loginUser);

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", forgotPassword);

// ================= RESET PASSWORD =================
router.post("/reset-password/:token", resetPassword);

module.exports = router;