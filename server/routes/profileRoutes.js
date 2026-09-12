const express = require("express");
const { saveProfile, getProfile } = require("../controllers/profileController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/save", protect, saveProfile);
router.get("/", protect, getProfile);

module.exports = router;            //getProfile()  gets your saved urls