"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/ai",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInsights(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-500",
          title: "text-green-700",
          icon: "✅",
        };

      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-500",
          title: "text-yellow-700",
          icon: "⚠️",
        };

      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-500",
          title: "text-blue-700",
          icon: "💡",
        };

      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-400",
          title: "text-gray-700",
          icon: "📌",
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">
          🤖 AI Insights
        </h2>

        <p className="text-gray-500">
          Loading insights...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          🤖 AI Insights
        </h2>

        <button
          onClick={fetchInsights}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          Refresh
        </button>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No insights available.
        </div>
      ) : (
        <div className="space-y-5">
          {insights.map((item, index) => {
            const style = getColor(item.type);

            return (
              <div
                key={index}
                className={`${style.bg} border-l-4 ${style.border} rounded-xl p-5 shadow-sm hover:shadow-md transition`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    {style.icon}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold ${style.title}`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-700 mt-2 leading-7">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}