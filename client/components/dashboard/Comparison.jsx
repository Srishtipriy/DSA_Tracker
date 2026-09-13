"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Comparison() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dsa-tracker-swart-seven.vercel.app/api/comparison",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        ⚔️ Friend Comparison
      </h2>

      {data.map((user, index) => (
        <div
          key={index}
          className="border-b py-3 flex justify-between"
        >
          <div>
            <p className="font-bold">
              {index + 1}. {user.name}
            </p>

            <p className="text-sm text-gray-600">
              E:{user.easy} | M:{user.medium} | H:{user.hard}
            </p>
          </div>

          <div className="text-right">
            <p>{user.totalSolved} solved</p>
            <p className="text-sm text-gray-500">
              Rank: {user.ranking}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}