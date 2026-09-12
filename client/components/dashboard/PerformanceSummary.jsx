"use client";

import {
  Trophy,
  CheckCircle2,
  Circle,
  Flame,
  Medal,
} from "lucide-react";

export default function PerformanceSummary({ snapshot }) {
  const items = [
    {
      title: "Total Solved",
      value: snapshot?.totalSolved ?? "--",
      icon: <CheckCircle2 size={18} />,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Easy",
      value: snapshot?.easySolved ?? "--",
      icon: <Circle size={18} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Medium",
      value: snapshot?.mediumSolved ?? "--",
      icon: <Flame size={18} />,
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      title: "Hard",
      value: snapshot?.hardSolved ?? "--",
      icon: <Medal size={18} />,
      bg: "bg-red-100",
      color: "text-red-500",
    },
    {
      title: "Global Rank",
      value: snapshot?.ranking?.toLocaleString() ?? "--",
      icon: <Trophy size={18} />,
      bg: "bg-sky-100",
      color: "text-sky-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 h-full">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        📊 Performance Summary
      </h2>

      <div className="space-y-4">

        {items.map((item) => (

          <div
            key={item.title}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition"
          >

            <div className="flex items-center gap-3">

              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>

              <span className="font-medium text-slate-600">
                {item.title}
              </span>

            </div>

            <span className="text-xl font-bold text-slate-800">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}