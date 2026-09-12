"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();

  const token = params.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Basic password length check
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(
        response.data.message ||
          "Password reset successfully!"
      );

      setPassword("");
      setConfirmPassword("");

      // Go back to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      console.log(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Unable to reset password."
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

      {/* Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}
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
              Reset Password
            </h2>

            <p className="text-slate-400 mt-2">
              Create a new password for your account.
            </p>

          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {message}
              <p className="mt-1 text-green-500/80">
                Redirecting to login...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* New Password */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-white
                    placeholder:text-slate-500
                    pl-12
                    pr-12
                    py-3.5
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    hover:text-white
                    cursor-pointer
                  "
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-white
                    placeholder:text-slate-500
                    pl-12
                    pr-12
                    py-3.5
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    hover:text-white
                    cursor-pointer
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                hover:from-indigo-500
                hover:to-purple-500
                text-white
                font-semibold
                py-3.5
                transition-all
                duration-300
                shadow-lg
                shadow-indigo-600/20
                hover:shadow-indigo-600/40
                disabled:opacity-60
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>

          {/* Back to Login */}
          <Link
            href="/login"
            className="
              flex
              items-center
              justify-center
              gap-2
              text-slate-400
              hover:text-white
              text-sm
              mt-6
              transition
            "
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}