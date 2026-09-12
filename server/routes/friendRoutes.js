const express = require("express");

const router = express.Router();

const {
  addFriend,
  getFriends,
  deleteFriend,
  compareFriend,
  updateFriend,
} = require("../controllers/friendController");

const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addFriend);

router.get("/", protect, getFriends);

router.delete("/:id", protect, deleteFriend);

router.put("/:id", protect, updateFriend);

router.get("/:id/compare", protect, compareFriend);

module.exports = router;