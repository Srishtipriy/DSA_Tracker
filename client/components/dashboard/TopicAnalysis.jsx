"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, TrendingDown, BookOpen } from "lucide-react";

export default function TopicAnalysis() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://dsa-tracker-swart-seven.vercel.app/api/topics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTopics(res.data.topics);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTopics();
  }, []);

  const importantTopics = [
    "Array",
    "String",
    "Hash Table",
    "Linked List",
    "Stack",
    "Queue",
    "Tree",
    "Binary Tree",
    "Graph Theory",
    "Binary Search",
    "Two Pointers",
    "Sliding Window",
    "Greedy",
    "Dynamic Programming",
  ];

  const displayNames = {
    "Graph Theory": "Graphs",
    "Dynamic Programming": "DP",
  };

  const filteredTopics = topics.filter((topic) =>
    importantTopics.includes(topic.name)
  );

  const maxSolved =
    filteredTopics.length > 0
      ? Math.max(...filteredTopics.map((t) => t.solved))
      : 1;

  const strongest =
    filteredTopics.length > 0
      ? filteredTopics.reduce((a, b) =>
          a.solved > b.solved ? a : b
        )
      : null;

  const weakest =
    filteredTopics.length > 0
      ? filteredTopics.reduce((a, b) =>
          a.solved < b.solved ? a : b
        )
      : null;

  return (
    <section className="mt-8">

      {/* Heading */}
      <div className="mb-6">

        <h2 className="text-3xl font-bold text-slate-800">
          📚 Topic Analysis
        </h2>

        <p className="text-slate-500 mt-1">
          Detailed breakdown of problems solved by topic
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT CARD */}

        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-indigo-600" />

            <h3 className="text-2xl font-bold">
              Problems Solved by Topic
            </h3>

          </div>

          <div className="space-y-6">

            {filteredTopics.map((topic, index) => {

              const percentage =
                (topic.solved / maxSolved) * 100;

              const colors = [
                "from-blue-500 to-indigo-500",
                "from-purple-500 to-pink-500",
                "from-emerald-500 to-green-500",
                "from-red-500 to-orange-500",
                "from-yellow-500 to-amber-500",
                "from-cyan-500 to-blue-500",
                "from-fuchsia-500 to-violet-500",
              ];

              return (
                <div key={topic.name}>

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold text-slate-700">
                      {displayNames[topic.name] || topic.name}
                    </span>

                    <span className="font-bold">
                      {topic.solved}
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        colors[index % colors.length]
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          {/* Strongest */}

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-6">

            <div className="flex items-center gap-3 mb-5">

              <Trophy className="text-green-600" />

              <h3 className="text-xl font-bold">
                Topic Strength
              </h3>

            </div>

            <div className="rounded-2xl bg-green-50 border border-green-200 p-5">

              <p className="text-green-700 font-semibold">
                🏆 Strongest Topic
              </p>

              <h2 className="text-4xl font-bold text-green-700 mt-3">
                {displayNames[strongest?.name] || strongest?.name || "-"}
              </h2>

              <p className="text-slate-600 mt-2">
                {strongest?.solved || 0} problems solved
              </p>

            </div>

          </div>

          {/* Weakest */}

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-6">

            <div className="rounded-2xl bg-red-50 border border-red-200 p-5">

              <div className="flex items-center gap-3">

                <TrendingDown className="text-red-600" />

                <p className="text-red-700 font-semibold">
                  Weakest Topic
                </p>

              </div>

              <h2 className="text-4xl font-bold text-red-700 mt-4">
                {displayNames[weakest?.name] || weakest?.name || "-"}
              </h2>

              <p className="text-slate-600 mt-2">
                {weakest?.solved || 0} problems solved
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}