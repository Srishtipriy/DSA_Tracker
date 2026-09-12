const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const friendRoutes = require("./routes/friendRoutes");
const leetcodeRoutes = require("./routes/leetcodeRoutes");
const snapshotRoutes = require("./routes/snapshotRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const historyRoutes = require("./routes/historyRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const comparisonRoutes = require("./routes/comparisonRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const topicRoutes = require("./routes/topicRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/snapshot", snapshotRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/ai", aiRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("🚀 AI DSA Tracker API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});