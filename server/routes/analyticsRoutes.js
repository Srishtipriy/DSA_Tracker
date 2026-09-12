const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getLatestAnalytics,
  getGrowthData,
  getLeaderboard,
} = require("../controllers/analyticsController");

router.get("/latest", protect, getLatestAnalytics);

router.get("/growth", protect, getGrowthData);

router.get("/leaderboard", protect, getLeaderboard);

module.exports = router;