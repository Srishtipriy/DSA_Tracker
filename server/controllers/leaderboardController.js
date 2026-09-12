const Friend = require("../models/Friend");
const Snapshot = require("../models/Snapshot");

const getLeaderboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's latest snapshot
    const userSnapshot = await Snapshot.findOne({
      user: userId,
    }).sort({ createdAt: -1 });

    let leaderboard = [];

    // Add user first
    if (userSnapshot) {
      leaderboard.push({
        name: "You",
        totalSolved: userSnapshot.totalSolved,
        ranking: userSnapshot.ranking,
      });
    }

    // Get friends
    const friends = await Friend.find({ user: userId });

    for (const friend of friends) {
      const latest = await Snapshot.findOne({
        friend: friend._id,
      }).sort({ createdAt: -1 });

      if (latest) {
        leaderboard.push({
          name: friend.name,
          totalSolved: latest.totalSolved,
          ranking: latest.ranking,
        });
      }
    }

    // Sort by total solved (desc)
    leaderboard.sort((a, b) => b.totalSolved - a.totalSolved);

    res.json(leaderboard);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getLeaderboard,
};