const Snapshot = require("../models/Snapshot");
const Friend = require("../models/Friend");

/* -------------------- Latest Snapshot -------------------- */

const getLatestAnalytics = async (req, res) => {
  try {
    const snapshot = await Snapshot.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!snapshot) {
      return res.status(404).json({
        message: "No snapshot found",
      });
    }

    res.json(snapshot);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------- Growth Chart -------------------- */

const getGrowthData = async (req, res) => {
  try {
    const chartData = {};

    // ---------- YOUR SNAPSHOTS ----------
    const mySnapshots = await Snapshot.find({
      user: req.user.id,
    }).sort({ date: 1 });

    mySnapshots.forEach((snap) => {
      const date = snap.date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      if (!chartData[date]) {
        chartData[date] = {
          date,
        };
      }

      chartData[date]["You"] = snap.totalSolved;
    });

    // ---------- FRIENDS ----------
    const friends = await Friend.find({
      user: req.user.id,
    });

    for (const friend of friends) {
      const friendSnapshots = await Snapshot.find({
        friend: friend._id,
      }).sort({ date: 1 });

      friendSnapshots.forEach((snap) => {
        const date = snap.date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });

        if (!chartData[date]) {
          chartData[date] = {
            date,
          };
        }

        chartData[date][friend.name] = snap.totalSolved;
      });
    }

    const result = Object.values(chartData);

    const names = ["You", ...friends.map((f) => f.name)];

    result.forEach((row) => {
      names.forEach((name) => {
        if (row[name] === undefined) {
          row[name] = 0;
        }
      });
    });

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------- Leaderboard -------------------- */

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = [];

    // ---------- YOU ----------
    const mySnapshots = await Snapshot.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    if (mySnapshots.length > 0) {
      const latest = mySnapshots[mySnapshots.length - 1];
      const first = mySnapshots[0];

      leaderboard.push({
        name: "You",
        totalSolved: latest.totalSolved,
        ranking: latest.ranking,
        currentStreak: latest.currentStreak || 0,
        growth: latest.totalSolved - first.totalSolved,
      });
    }

    // ---------- FRIENDS ----------
    const friends = await Friend.find({
      user: req.user.id,
    });

    for (const friend of friends) {
      const snapshots = await Snapshot.find({
        friend: friend._id,
      }).sort({ createdAt: 1 });

      if (snapshots.length === 0) continue;

      const latest = snapshots[snapshots.length - 1];
      const first = snapshots[0];

      leaderboard.push({
        name: friend.name,
        totalSolved: latest.totalSolved,
        ranking: latest.ranking,
        currentStreak: latest.currentStreak || 0,
        growth: latest.totalSolved - first.totalSolved,
      });
    }

    leaderboard.sort((a, b) => b.totalSolved - a.totalSolved);

    res.json(leaderboard);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLatestAnalytics,
  getGrowthData,
  getLeaderboard,
};