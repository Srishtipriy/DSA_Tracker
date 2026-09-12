const express = require("express");
const router = express.Router();

const { getLeetcodeStats } = require("../controllers/leetcodeController");

router.get("/:username", getLeetcodeStats);

module.exports = router;