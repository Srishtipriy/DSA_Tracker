"use client";

import {
  LayoutDashboard,
  Trophy,
  BarChart3,
  Users,
  BrainCircuit,
  GitCompare,
  UserCircle,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      target: "dashboard",
    },
    {
      title: "Leaderboard",
      icon: <Trophy size={20} />,
      target: "leaderboard",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      target: "analytics",
    },
    {
      title: "Topic Analysis",
      icon: <BrainCircuit size={20} />,
      target: "topics",
    },
    {
      title: "Friends",
      icon: <Users size={20} />,
      target: "friends",
    },
    {
      title: "Comparison",
      icon: <GitCompare size={20} />,
      target: "comparison",
    },
    {
      title: "Profile",
      icon: <UserCircle size={20} />,
      target: "profile",
    },
  ];

  const handleNavigation = (target) => {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="w-72 h-screen bg-[#2e2c39] text-white flex flex-col flex-shrink-0">

      {/* Logo */}
      <div className="px-8 py-8 border-b border-white/10">
        <h1 className="text-3xl font-bold">
          DSA Tracker
        </h1>

        <p className="text-slate-300 mt-2">
          Learn • Track • Improve
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8 overflow-hidden">
        <div className="space-y-2">

          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.target)}
              className="
                w-full
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-xl
                text-slate-300
                hover:bg-indigo-500
                hover:text-white
                transition-all
                duration-300
                cursor-pointer
              "
            >
              {item.icon}

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          ))}

        </div>
      </div>

      {/* Bottom Motivation Card */}
      <div className="p-5">
        <div
          className="
            rounded-2xl
            bg-pink-200/20
            backdrop-blur-xl
            border
            border-pink-300/30
            p-5
          "
        >
          <h3 className="text-pink-200 font-semibold text-lg">
            🌸 Keep Growing
          </h3>

          <p className="text-pink-100 text-sm mt-2 leading-6">
            Small improvements every day become big achievements tomorrow.
          </p>
        </div>
      </div>

    </aside>
  );
}