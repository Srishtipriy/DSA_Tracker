"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    sessionStorage.setItem(
      "signupData",
      JSON.stringify({
        name,
        email,
        password,
      })
    );

    router.push("/profile-register");
  };

  return (
    <div className="min-h-screen bg-[#0b0a20] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-[#11102b] border border-white/10 rounded-2xl p-7 shadow-xl">

          {/* Header */}
          <div className="text-center mb-7">

            <div className="flex justify-center items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>

              <h1 className="text-2xl font-bold text-white">
                DSA Tracker
              </h1>
            </div>

            <p className="text-gray-400 text-sm">
              Create your account
            </p>

          </div>

          {/* Name */}
          <div className="mb-4">

            <label className="text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full bg-[#0b0a20] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Email */}
          <div className="mb-4">

            <label className="text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full bg-[#0b0a20] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Password */}
          <div className="mb-4">

            <label className="text-sm text-gray-300">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#0b0a20] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label className="text-sm text-gray-300">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#0b0a20] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Next */}
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition cursor-pointer"
          >
            Next →
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}