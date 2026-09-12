"use client";

import {
  CheckCircle2,
  Circle,
  Flame,
  Trophy,
  Medal,
} from "lucide-react";

export default function StatsCards({ snapshot }) {
  const stats = [
    {
      title: "Total Solved",
      value: snapshot?.totalSolved ?? "--",
      icon: <CheckCircle2 size={22} />,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Easy",
      value: snapshot?.easySolved ?? "--",
      icon: <Circle size={22} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Medium",
      value: snapshot?.mediumSolved ?? "--",
      icon: <Flame size={22} />,
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      title: "Hard",
      value: snapshot?.hardSolved ?? "--",
      icon: <Medal size={22} />,
      bg: "bg-red-100",
      color: "text-red-500",
    },
    {
      title: "Global Rank",
      value: snapshot?.ranking?.toLocaleString() ?? "--",
      icon: <Trophy size={22} />,
      bg: "bg-sky-100",
      color: "text-sky-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 hover:shadow-lg transition"
        >

          <div
            className={`h-11 w-11 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}
          >
            {item.icon}
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-4">
            {item.value}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {item.title}
          </p>

        </div>

      ))}

    </div>
  );
}