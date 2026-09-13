"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function LeaderboardCard() {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState("totalSolved");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    sortLeaderboard(sortBy);
  }, [sortBy]);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://dsa-tracker-pixie15.vercel.app/api/analytics/leaderboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlayers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sortLeaderboard = (type) => {
    const sorted = [...players].sort((a, b) => {
      return (b[type] || 0) - (a[type] || 0);
    });

    setPlayers(sorted);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">
          🏆 Leaderboard
        </h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="totalSolved">Total Solved</option>
          <option value="ranking">Ranking</option>
          <option value="currentStreak">Current Streak</option>
          <option value="growth">Growth</option>
        </select>
      </div>

      {players.map((player, index) => (
        <div
          key={index}
          className="flex justify-between border-b py-3"
        >
          <div>
            <h3 className="font-semibold">
              #{index + 1} {player.name}
            </h3>

            <p>
              Solved: {player.totalSolved}
            </p>
          </div>

          <div className="text-right">
            <p>Rank: {player.ranking}</p>
            <p>Growth: +{player.growth}</p>
          </div>
        </div>
      ))}
    </div>
  );
}