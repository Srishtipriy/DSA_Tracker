const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getComparison } = require("../controllers/comparisonController");

router.get("/", protect, getComparison);

module.exports = router;