"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0b0a20] text-white flex items-center justify-center px-4">

      <div className="text-center max-w-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <span className="font-bold text-xl">DS</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-lg ml-1">🍃🌸  </span>
            DSA Tracker
          <span className="ml-2">🚀</span>
          <span className="text-lg ml-1">🌸🍃</span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
          Keep track of your coding progress, compare your performance
          with friends and stay consistent with your DSA journey.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">

          <button
            onClick={() => router.push("/login")}
            className="px-7 py-3 rounded-lg border border-white/15 text-gray-200 hover:bg-white/10 transition cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="px-7 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
          >
            Sign Up
          </button>

        </div>

        {/* Small bottom text */}
        <p className="text-gray-600 text-sm mt-8">
          Learn • Track • Improve
        </p>

      </div>

    </div>
  );
}