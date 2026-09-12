const Friend = require("../models/Friend");
const { fetchLeetcodeStats } = require("../services/leetcodeService");

// Add Friend
const addFriend = async (req, res) => {
  try {
    const { name, leetcodeUrl } = req.body;

    // Check if URL is provided
    if (!leetcodeUrl) {
      return res.status(400).json({
        message: "LeetCode URL is required",
      });
    }

    // Extract username from URL
    const match = leetcodeUrl.match(/leetcode\.com\/u\/([^/]+)/);

    if (!match) {
      return res.status(400).json({
        message: "Invalid LeetCode URL",
      });
    }

    const leetcodeUsername = match[1];

    // Check for duplicate friend
    const existingFriend = await Friend.findOne({
      user: req.user.id,
      leetcodeUsername,
    });

    if (existingFriend) {
      return res.status(400).json({
        message: "Friend already added",
      });
    }

    // Save friend
    const friend = await Friend.create({
      user: req.user.id,
      name,
      leetcodeUsername,
      leetcodeUrl,
    });

    res.status(201).json({
      message: "Friend added successfully",
      friend,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Friends
const getFriends = async (req, res) => {
  try {
    const friends = await Friend.find({
      user: req.user.id,
    });

    const friendsWithStats = await Promise.all(
      friends.map(async (friend) => {
        const stats = await fetchLeetcodeStats(friend.leetcodeUsername);

        return {
          ...friend.toObject(),
          stats,
        };
      })
    );

    res.json(friendsWithStats);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete friend
// Delete Friend
const deleteFriend = async (req, res) => {
  try {
    const friend = await Friend.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!friend) {
      return res.status(404).json({
        message: "Friend not found",
      });
    }

    await friend.deleteOne();

    res.json({
      message: "Friend deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//vv
// Update Friend Name

const updateFriend = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Friend name is required",
      });
    }

    const friend = await Friend.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!friend) {
      return res.status(404).json({
        message: "Friend not found",
      });
    }

    friend.name = name;

    await friend.save();

    res.json({
      message: "Friend name updated successfully",
      friend,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


///new  compareFriend
const Snapshot = require("../models/Snapshot");

const compareFriend = async (req, res) => {
  try {
    const friend = await Friend.findById(req.params.id);

    if (!friend) {
      return res.status(404).json({
        message: "Friend not found",
      });
    }

    const mySnapshot = await Snapshot.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    const friendSnapshot = await Snapshot.findOne({
      friend: friend._id,
    }).sort({ createdAt: -1 });

    if (!mySnapshot || !friendSnapshot) {
      return res.status(404).json({
        message: "Snapshots not found",
      });
    }

    res.json({
      you: {
        totalSolved: mySnapshot.totalSolved,
        easySolved: mySnapshot.easySolved,
        mediumSolved: mySnapshot.mediumSolved,
        hardSolved: mySnapshot.hardSolved,
        ranking: mySnapshot.ranking,
      },

      friend: {
        name: friend.name,
        totalSolved: friendSnapshot.totalSolved,
        easySolved: friendSnapshot.easySolved,
        mediumSolved: friendSnapshot.mediumSolved,
        hardSolved: friendSnapshot.hardSolved,
        ranking: friendSnapshot.ranking,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFriend,
  getFriends,
  deleteFriend,
  updateFriend,
  compareFriend,
  
};