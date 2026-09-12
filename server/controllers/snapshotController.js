const Snapshot = require("../models/Snapshot");
const Profile = require("../models/Profile");
const Friend = require("../models/Friend");
const { fetchLeetcodeStats } = require("../services/leetcodeService");

const syncMyStats = async (req, res) => {
  try {
    // ===========================
    // USER PROFILE
    // ===========================
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile || !profile.leetcodeUrl) {
      return res.status(404).json({
        message: "LeetCode URL not found",
      });
    }

    // ===========================
    // EXTRACT USERNAME
    // ===========================
    const username = profile.leetcodeUrl
      .replace("https://leetcode.com/u/", "")
      .replace("https://www.leetcode.com/u/", "")
      .replace(/\//g, "");

    // ===========================
    // FETCH LIVE LEETCODE DATA
    // ===========================
    const stats = await fetchLeetcodeStats(username);

    if (!stats) {
      return res.status(500).json({
        message: "Unable to fetch LeetCode profile.",
      });
    }

    // ===========================
    // TODAY
    // ===========================
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let snapshot = await Snapshot.findOne({
      user: req.user.id,
      date: {
        $gte: today,
      },
    });

    // ===========================
    // UPDATE EXISTING SNAPSHOT
    // ===========================
    if (snapshot) {
      snapshot.totalSolved = stats.totalSolved;
      snapshot.easySolved = stats.easySolved;
      snapshot.mediumSolved = stats.mediumSolved;
      snapshot.hardSolved = stats.hardSolved;
      snapshot.ranking = stats.ranking;
      snapshot.topics = stats.topics;

      await snapshot.save();
    }

    // ===========================
    // CREATE NEW SNAPSHOT
    // ===========================
    else {
      snapshot = await Snapshot.create({
        user: req.user.id,

        platform: "leetcode",

        totalSolved: stats.totalSolved,
        easySolved: stats.easySolved,
        mediumSolved: stats.mediumSolved,
        hardSolved: stats.hardSolved,

        ranking: stats.ranking,

        contestRating: 0,
        acceptanceRate: 0,
        currentStreak: 0,
        longestStreak: 0,

        topics: stats.topics,
      });
    }

    // ===========================
    // FRIEND SYNC
    // ===========================
    const friends = await Friend.find({
      user: req.user.id,
    });

    for (const friend of friends) {
      const friendStats = await fetchLeetcodeStats(
        friend.leetcodeUsername
      );

      if (!friendStats) continue;

      let friendSnapshot = await Snapshot.findOne({
        friend: friend._id,
        date: {
          $gte: today,
        },
      });

      if (friendSnapshot) {
        friendSnapshot.totalSolved = friendStats.totalSolved;
        friendSnapshot.easySolved = friendStats.easySolved;
        friendSnapshot.mediumSolved = friendStats.mediumSolved;
        friendSnapshot.hardSolved = friendStats.hardSolved;
        friendSnapshot.ranking = friendStats.ranking;
        friendSnapshot.topics = friendStats.topics;

        await friendSnapshot.save();
      } else {
        await Snapshot.create({
          friend: friend._id,

          platform: "leetcode",

          totalSolved: friendStats.totalSolved,
          easySolved: friendStats.easySolved,
          mediumSolved: friendStats.mediumSolved,
          hardSolved: friendStats.hardSolved,

          ranking: friendStats.ranking,

          contestRating: 0,
          acceptanceRate: 0,
          currentStreak: 0,
          longestStreak: 0,

          topics: friendStats.topics,
        });
      }
    }

    res.json({
      message: "Sync successful",
      snapshot,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

//-----------------------
// Get latest snapshot
const getLatestSnapshot = async (req, res) => {
  try {
    const snapshot = await Snapshot.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!snapshot) {
      return res.status(404).json({
        message: "No snapshot found",
      });
    }

    res.status(200).json(snapshot);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  syncMyStats,
  getLatestSnapshot,
};