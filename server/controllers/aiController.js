const Snapshot = require("../models/Snapshot");
const Friend = require("../models/Friend");

const getInsights = async (req, res) => {
  try {
    // ---------------- YOUR SNAPSHOTS ----------------
    const snapshots = await Snapshot.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    if (snapshots.length === 0) {
      return res.status(404).json({
        message: "No snapshots found",
      });
    }

    const latest = snapshots[snapshots.length - 1];
    const previous =
      snapshots.length > 1
        ? snapshots[snapshots.length - 2]
        : null;

    const insights = [];

    // ==========================================================
    // STEP 1 - GROWTH INSIGHT
    // ==========================================================

    if (previous) {
      const growth =
        latest.totalSolved - previous.totalSolved;

      if (growth > 0) {
        insights.push({
          type: "success",
          title: "Great Progress 🚀",
          description: `You solved ${growth} new problems since your last sync.`,
        });
      } else {
        insights.push({
          type: "warning",
          title: "No Progress",
          description:
            "No new problems solved since your last sync.",
        });
      }
    }

    // ==========================================================
    // HARD PROBLEM INSIGHT
    // ==========================================================

    if (
      latest.mediumSolved > 0 &&
      latest.hardSolved <
        latest.mediumSolved * 0.2
    ) {
      insights.push({
        type: "warning",
        title: "Solve More Hard Problems",
        description:
          "Your Hard problem count is low compared to Medium. Try solving 2-3 Hard questions every week.",
      });
    }

    // ==========================================================
    // STEP 3 - TOPIC RECOMMENDATION
    // ==========================================================

    if (latest.topics && latest.topics.length > 0) {
      const weakest = [...latest.topics].sort(
        (a, b) => a.solved - b.solved
      )[0];

      const strongest = [...latest.topics].sort(
        (a, b) => b.solved - a.solved
      )[0];

      insights.push({
        type: "info",
        title: "Topic Recommendation 📚",
        description: `Your strongest topic is ${strongest.name} (${strongest.solved} solved). Improve ${weakest.name} (${weakest.solved} solved) to become more balanced.`,
      });
    }

    // ==========================================================
    // STEP 5 - WEEKLY GOAL
    // ==========================================================

    const target =
      Math.ceil(latest.totalSolved / 50) * 50 + 50;

    const remaining =
      target - latest.totalSolved;

    insights.push({
      type: "info",
      title: "Weekly Goal 🎯",
      description: `Current: ${latest.totalSolved} | Target: ${target} | Remaining: ${remaining} problems.`,
    });

    // ==========================================================
    // STEP 2 & 6 - FRIEND COMPARISON + CHALLENGE
    // ==========================================================

    const friends = await Friend.find({
      user: req.user.id,
    });

    let bestFriend = null;

    for (const friend of friends) {
      const friendSnapshot =
        await Snapshot.findOne({
          friend: friend._id,
        }).sort({
          createdAt: -1,
        });

      if (!friendSnapshot) continue;

      if (
        !bestFriend ||
        friendSnapshot.totalSolved >
          bestFriend.totalSolved
      ) {
        bestFriend = {
          name: friend.name,
          totalSolved:
            friendSnapshot.totalSolved,
        };
      }
    }

    if (bestFriend) {
      const diff =
        bestFriend.totalSolved -
        latest.totalSolved;

      if (diff > 0) {
        insights.push({
          type: "warning",
          title: "Friend Challenge 🏆",
          description: `Solve ${diff} more problems to overtake ${bestFriend.name}.`,
        });

        insights.push({
          type: "info",
          title: "Leaderboard",
          description: `${bestFriend.name} is currently leading with ${bestFriend.totalSolved} solved problems.`,
        });
      } else if (diff < 0) {
        insights.push({
          type: "success",
          title: "You're Leading! 🎉",
          description: `You're ahead of ${bestFriend.name} by ${Math.abs(
            diff
          )} problems. Keep it up!`,
        });
      } else {
        insights.push({
          type: "info",
          title: "Neck to Neck",
          description: `You and ${bestFriend.name} have solved the same number of problems.`,
        });
      }
    }

    // ==========================================================
    // RANKING
    // ==========================================================

    if (latest.ranking > 0) {
      if (latest.ranking < 100000) {
        insights.push({
          type: "success",
          title: "Excellent Ranking ⭐",
          description: `Your current ranking is ${latest.ranking}. Keep maintaining your consistency.`,
        });
      } else {
        insights.push({
          type: "info",
          title: "Ranking",
          description: `Current Global Ranking: ${latest.ranking}`,
        });
      }
    }

    // ==========================================================
    // STREAK
    // ==========================================================

    if (latest.currentStreak === 0) {
      insights.push({
        type: "warning",
        title: "Maintain Your Streak 🔥",
        description:
          "Solve at least one problem daily to build consistency.",
      });
    } else {
      insights.push({
        type: "success",
        title: "Current Streak 🔥",
        description: `${latest.currentStreak} days.`,
      });
    }

    res.json(insights);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getInsights,
};