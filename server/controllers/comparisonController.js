const Friend = require("../models/Friend");
const Snapshot = require("../models/Snapshot");

const getComparison = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get latest user snapshot
    const userSnapshot = await Snapshot.findOne({
      user: userId,
    }).sort({ createdAt: -1 });

    const friends = await Friend.find({ user: userId });

    let result = [];

    // Add user
    if (userSnapshot) {
      result.push({
        name: "You",
        totalSolved: userSnapshot.totalSolved,
        ranking: userSnapshot.ranking,
        easy: userSnapshot.easySolved,
        medium: userSnapshot.mediumSolved,
        hard: userSnapshot.hardSolved,
        streak: userSnapshot.currentStreak || 0,
      });
    }

    // Add friends
    for (const friend of friends) {
      const snap = await Snapshot.findOne({
        friend: friend._id,
      }).sort({ createdAt: -1 });

      if (snap) {
        result.push({
          name: friend.name,
          totalSolved: snap.totalSolved,
          ranking: snap.ranking,
          easy: snap.easySolved,
          medium: snap.mediumSolved,
          hard: snap.hardSolved,
          streak: snap.currentStreak || 0,
        });
      }
    }

    // Sort by solved problems
    result.sort((a, b) => b.totalSolved - a.totalSolved);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getComparison,
};