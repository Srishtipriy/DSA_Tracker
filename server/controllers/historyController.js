const Snapshot = require("../models/Snapshot");

const getHistory = async (req, res) => {
  try {
    const snapshots = await Snapshot.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    const history = snapshots.map((snapshot) => ({
      date: snapshot.createdAt.toLocaleDateString(),
      solved: snapshot.totalSolved,
    }));

    res.json(history);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getHistory,
};