"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InsightsCard() {
  const [snapshot, setSnapshot] = useState(null);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/analytics/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;
        setSnapshot(data);

        const ai = [];

        // Difficulty Analysis
        if (data.hardSolved < 30) {
          ai.push({
            emoji: "🔥",
            text: "Solve more Hard problems to improve interview readiness.",
          });
        }

        if (data.mediumSolved > data.easySolved) {
          ai.push({
            emoji: "💪",
            text: "Great! You're solving more Medium than Easy problems.",
          });
        }

        // Ranking
        if (data.ranking < 100000) {
          ai.push({
            emoji: "🏆",
            text: "Excellent ranking! You're among the top LeetCode users.",
          });
        } else {
          ai.push({
            emoji: "📈",
            text: "Keep practicing consistently to improve your ranking.",
          });
        }

        // Total Solved
        if (data.totalSolved >= 500) {
          ai.push({
            emoji: "🎯",
            text: "Amazing milestone! 500+ problems solved.",
          });
        } else if (data.totalSolved >= 300) {
          ai.push({
            emoji: "🚀",
            text: "You're getting close to the 500 solved milestone.",
          });
        } else {
          ai.push({
            emoji: "📚",
            text: "Stay consistent. Small daily progress leads to big improvements.",
          });
        }

        // Topic Analysis
        if (data.topics && data.topics.length > 0) {
          const strongest = data.topics.reduce((a, b) =>
            a.solved > b.solved ? a : b
          );

          const weakest = data.topics.reduce((a, b) =>
            a.solved < b.solved ? a : b
          );

          ai.push({
            emoji: "🏅",
            text: `Your strongest topic is ${strongest.name}.`,
          });

          ai.push({
            emoji: "📖",
            text: `Spend more time practicing ${weakest.name}.`,
          });
        }

        setInsights(ai);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Insights
      </h2>

      {snapshot ? (
        <div className="space-y-3">
          {insights.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded"
            >
              <span className="text-lg mr-2">{item.emoji}</span>
              {item.text}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
}