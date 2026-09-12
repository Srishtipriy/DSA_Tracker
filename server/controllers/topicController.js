const Snapshot = require("../models/Snapshot");

const getTopics = async (req, res) => {
  try {
    const snapshot = await Snapshot.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!snapshot) {
      return res.status(404).json({
        message: "No snapshot found",
      });
    }

    const topics = snapshot.topics || [];

    let strongestTopic = null;
    let weakestTopic = null;

    if (topics.length > 0) {
      strongestTopic = topics.reduce((a, b) =>
        a.solved > b.solved ? a : b
      );

      weakestTopic = topics.reduce((a, b) =>
        a.solved < b.solved ? a : b
      );
    }

    res.json({
      topics,
      strongestTopic,
      weakestTopic,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getTopics,
};