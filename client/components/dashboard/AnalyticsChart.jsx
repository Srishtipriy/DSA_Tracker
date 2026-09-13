"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function AnalyticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchGrowth();
  }, []);

  const fetchGrowth = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://dsa-tracker-swart-seven.vercel.app/api/analytics/growth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show only the latest 5 days on the graph
      setData(res.data.slice(-5));
    } catch (err) {
      console.log(err);
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-800">
          📈 Growth Comparison
        </h2>

        <p className="text-slate-500 mt-3">
          No snapshot history available yet.
        </p>
      </div>
    );
  }

  const friendNames = Object.keys(data[0]).filter(
    (key) => key !== "date" && key !== "You"
  );

  const colors = [
    "#16a34a",
    "#dc2626",
    "#0e99bc",
    "#b4f717",
    "#9333ea",
    "#f8722a",
    "#ee2af8",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          📈 You vs Friends Growth
        </h2>

        <p className="text-slate-500 mt-2">
          Compare your coding progress with your friends over time.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="You"
            radius={[8, 8, 0, 0]}
            fill="#092cf3"
          />

          {friendNames.map((name, index) => (
            <Bar
              key={name}
              dataKey={name}
              radius={[8, 8, 0, 0]}
              fill={colors[index % colors.length]}
            />
          ))}

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}