"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://dsa-tracker-swart-seven.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful!");

      router.push("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a20] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Logo + Title */}
          <div className="text-center mb-8">

            <div className="flex items-center justify-center gap-4">

              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-xl font-bold text-white">
                  DS
                </span>
              </div>

              <h1 className="text-3xl font-bold text-white">
                DSA Tracker
              </h1>

            </div>

            <p className="text-slate-400 mt-3">
              Learn • Track • Improve
            </p>

          </div>

          {/* Heading */}
          <div className="mb-6">

            <h2 className="text-2xl font-semibold text-white">
              Welcome Back 👋
            </h2>

            <p className="text-slate-400 mt-1">
              Login to continue your coding journey.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>

                {/* Forgot Password */}
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 pl-12 pr-12 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Bottom Text */}
          <p className="text-center text-slate-500 text-sm mt-7">
            Keep solving. Keep improving. 🚀
          </p>

        </div>

      </div>

    </div>
  );
}