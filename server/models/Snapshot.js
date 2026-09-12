const mongoose = require("mongoose");

const snapshotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
      default: null,
    },

    platform: {
      type: String,
      default: "leetcode",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    // Core Problem Stats
    totalSolved: {
      type: Number,
      default: 0,
    },

    easySolved: {
      type: Number,
      default: 0,
    },

    mediumSolved: {
      type: Number,
      default: 0,
    },

    hardSolved: {
      type: Number,
      default: 0,
    },

    // Ranking
    ranking: {
      type: Number,
      default: 0,
    },

    // Advanced Analytics (future use)
    contestRating: {
      type: Number,
      default: 0,
    },

    acceptanceRate: {
      type: Number,
      default: 0,
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    topics: [
  {
    name: String,
    solved: Number,
    lastPracticed: Date,
  },
],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Snapshot", snapshotSchema);