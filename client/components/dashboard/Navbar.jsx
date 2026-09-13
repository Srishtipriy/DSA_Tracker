"use client";

import { Bell, RefreshCw, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [syncing, setSyncing] = useState(false);

  // Sync LeetCode data
  const handleSync = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        router.push("/login");
        return;
      }

      setSyncing(true);

      await axios.post(
        "https://dsa-tracker-pixie15.vercel.app/api/snapshot/sync",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stats synced successfully!");

      // Refresh dashboard data
      window.location.reload();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to sync your LeetCode stats."
      );
    } finally {
      setSyncing(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <nav className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-3xl px-8 py-5 flex items-center justify-between mb-8">

      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          👋 Welcome Back
        </h1>

        <p className="text-slate-500 mt-1">
          Track your coding journey effortlessly.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-3 rounded-xl hover:bg-indigo-600 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <RefreshCw
            size={18}
            className={syncing ? "animate-spin" : ""}
          />

          {syncing ? "Syncing..." : "Sync"}
        </button>

        {/* Notification */}
        <button
          className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
        >
          <Bell size={20} />
        </button>

        {/* Profile */}
        <button
          className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
        >
          <UserCircle size={22} />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </nav>
  );
}