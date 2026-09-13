"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");
    setResetToken("");

    try {
      const response = await axios.post(
        "https://dsa-tracker-pixie15.vercel.app/api/auth/forgot-password",
        { email }
      );

      setMessage(
        response.data.message ||
          "Password reset instructions generated."
      );

      // Store token so we can create the reset link
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken);

        console.log(
          "RESET TOKEN:",
          response.data.resetToken
        );
      }
    } catch (error) {
      console.log(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a20] flex items-center justify-center px-4 relative overflow-hidden">
      
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md">

        <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* LOGO */}
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

          {/* HEADING */}
          <div className="mb-6">

            <h2 className="text-2xl font-semibold text-white">
              Forgot Password?
            </h2>

            <p className="text-slate-400 mt-2">
              Enter your registered email and we'll help you reset
              your password.
            </p>

          </div>

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>

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
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "Processing..."
                : "Send Reset Instructions"}
            </button>

          </form>

          {/* RESET PASSWORD BUTTON */}
          {resetToken && (
            <Link
              href={`/reset-password/${resetToken}`}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white font-semibold py-3.5 transition"
            >
              Reset Password
              <ArrowRight size={18} />
            </Link>
          )}

          {/* BACK TO LOGIN */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm mt-6 transition"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

        </div>
      </div>
    </div>
  );
}