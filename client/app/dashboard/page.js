"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfileCard from "../../components/dashboard/ProfileCard";
import StatsCards from "../../components/dashboard/StatsCards";
import FriendsCard from "../../components/dashboard/FriendsCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import Leaderboard from "@/components/dashboard/Leaderboard";
import Comparison from "@/components/dashboard/Comparison";
import TopicAnalysis from "@/components/dashboard/TopicAnalysis";
import AIInsights from "@/components/dashboard/AIInsights";
import PerformanceSummary from "@/components/dashboard/PerformanceSummary";

export default function Dashboard() {
  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [hackerrankUrl, setHackerrankUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [snapshot, setSnapshot] = useState(null);
  

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://dsa-tracker-pixie15.vercel.app/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeetcodeUrl(response.data.leetcodeUrl || "");
      setHackerrankUrl(response.data.hackerrankUrl || "");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Get logged-in user
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name || "");
        }

        const token = localStorage.getItem("token");

        // Sync latest LeetCode data
        await axios.post(
          "https://dsa-tracker-pixie15.vercel.app/api/snapshot/sync",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch latest snapshot
        const snapshotResponse = await axios.get(
          "https://dsa-tracker-pixie15.vercel.app/api/snapshot/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSnapshot(snapshotResponse.data);

        // Fetch profile URLs
        await fetchProfile();

      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex flex-col items-center justify-center">

        <div className="h-16 w-16 rounded-full border-4 border-indigo-300 border-t-indigo-600 animate-spin"></div>

        <h2 className="mt-6 text-2xl font-bold text-slate-700">
          Syncing Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          Fetching your latest LeetCode statistics...
        </p>

      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      <main
        id="dashboard"
        className="flex-1 overflow-y-auto px-8 py-6"
      >

        <Navbar />

        {/* Profile */}
        <div id="profile" className="mt-8">
          <ProfileCard
            name={userName}
            leetcodeUrl={leetcodeUrl}
            hackerrankUrl={hackerrankUrl}
          />
        </div>

        {/* Leaderboard */}
        <div id="leaderboard" className="mt-8">
          <Leaderboard />
        </div>

        {/* Stats / Analytics */}
        <div id="analytics" className="mt-8">
          <StatsCards snapshot={snapshot} />
        </div>

        {/* Growth Chart + Performance Summary */}
        <div className="grid grid-cols-12 gap-6 mt-6">

          <div className="col-span-8">
            <AnalyticsChart />
          </div>

          <div className="col-span-4">
            <PerformanceSummary snapshot={snapshot} />
          </div>

        </div>

        {/* Topic Analysis */}
        <div id="topics" className="mt-8">
          <TopicAnalysis />
        </div>

        {/* Comparison */}
        <div id="comparison" className="mt-8">
          <Comparison />
        </div>

        {/* Friends */}
        <div id="friends" className="mt-8">
          <FriendsCard />
        </div>

        {/* AI Insights */}
        <div id="ai-insights" className="mt-8 mb-10">
          <AIInsights />
        </div>

      </main>

    </div>

  </div>
);
}