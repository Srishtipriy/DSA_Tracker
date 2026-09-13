"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfileRegisterPage() {
  const router = useRouter();

  const [signupData, setSignupData] = useState(null);

  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [hackerrankUrl, setHackerrankUrl] = useState("");

  useEffect(() => {
    const data = sessionStorage.getItem("signupData");

    if (!data) {
      router.push("/signup");
      return;
    }

    setSignupData(JSON.parse(data));
  }, []);

  const handleCreateAccount = async () => {
    if (!leetcodeUrl) {
      return alert("LeetCode URL is required");
    }

    try {
      await axios.post(
        "https://dsa-tracker-swart-seven.vercel.app/api/auth/register",
        {
          ...signupData,
          leetcodeUrl,
          hackerrankUrl,
        }
      );

      sessionStorage.removeItem("signupData");

      alert("Account created successfully!");

      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Connect Coding Profiles
        </h1>

        <input
          type="text"
          placeholder="LeetCode URL"
          value={leetcodeUrl}
          onChange={(e) => setLeetcodeUrl(e.target.value)}
          className="border rounded w-full p-3 mb-4"
        />

        <input
          type="text"
          placeholder="HackerRank URL (Optional)"
          value={hackerrankUrl}
          onChange={(e) => setHackerrankUrl(e.target.value)}
          className="border rounded w-full p-3 mb-6"
        />

        <button
          onClick={handleCreateAccount}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded cursor-pointer"
        >
          Create Account
        </button>

      </div>

    </div>
  );
}