const { fetchLeetcodeStats } = require("../services/leetcodeService");

const getLeetcodeStats = async (req, res) => {
  try {
    const stats = await fetchLeetcodeStats(req.params.username);

    if (!stats) {
      return res.status(404).json({
        message: "LeetCode user not found",
      });
    }

    res.json(stats);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Failed to fetch LeetCode data",
    });
  }
};

module.exports = {
  getLeetcodeStats,
};