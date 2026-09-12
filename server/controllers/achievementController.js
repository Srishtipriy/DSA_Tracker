const Snapshot = require("../models/Snapshot");

const getAchievements = async (req, res) => {
  try {
    const latest = await Snapshot.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        message: "No snapshot found",
      });
    }

    const achievements = [];

    if (latest.totalSolved >= 100) {
      achievements.push({
        title: "💯 Century Solver",
        description: "Solved 100+ problems",
      });
    }

    if (latest.totalSolved >= 250) {
      achievements.push({
        title: "🚀 DSA Explorer",
        description: "Solved 250+ problems",
      });
    }

    if (latest.hardSolved >= 50) {
      achievements.push({
        title: "🔥 Hard Problem Slayer",
        description: "Solved 50+ hard problems",
      });
    }

    if (latest.ranking > 0 && latest.ranking <= 100000) {
      achievements.push({
        title: "🏆 Top 100K",
        description: "Reached Top 100K global ranking",
      });
    }

    if (latest.currentStreak >= 30) {
      achievements.push({
        title: "⚡ Consistency Master",
        description: "30-day coding streak",
      });
    }

    res.json(achievements);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAchievements,
};