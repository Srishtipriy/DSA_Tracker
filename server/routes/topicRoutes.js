const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getTopics } = require("../controllers/topicController");

router.get("/", protect, getTopics);

module.exports = router;