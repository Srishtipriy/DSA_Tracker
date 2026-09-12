const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getInsights } = require("../controllers/aiController");

router.get("/", protect, getInsights);

module.exports = router;