const express = require("express");
const router = express.Router();

const {
  syncMyStats,
  getLatestSnapshot,
} = require("../controllers/snapshotController");

const protect = require("../middleware/authMiddleware");

router.post("/sync", protect, syncMyStats);

router.get("/latest", protect, getLatestSnapshot);

module.exports = router;