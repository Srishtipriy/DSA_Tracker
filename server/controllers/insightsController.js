const Snapshot = require("../models/Snapshot");

const getInsights = async (req, res) => {
  try {
    const latest = await Snapshot.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        message: "No snapshot found",
      });
    }

    const insights = [];

    if (latest.mediumSolved > latest.easySolved) {
      insights.push("You solve more Medium problems than Easy ones.");
    }

    if (latest.hardSolved < 50) {
      insights.push("Try solving more Hard problems.");
    }

    if (latest.totalSolved >= 200) {
      insights.push("Excellent progress! You've solved over 200 problems.");
    }

    if (latest.ranking < 100000) {
      insights.push("Great global ranking! Keep participating regularly.");
    }

    if (insights.length === 0) {
      insights.push("Keep solving consistently. You're making progress.");
    }

    res.json(insights);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getInsights,
};