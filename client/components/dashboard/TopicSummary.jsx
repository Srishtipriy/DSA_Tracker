"use client";

export default function TopicSummary({
  strongest,
  weakest,
}) {
  return (
    <div className="space-y-6">

      {/* Strongest */}

      <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-green-100 border border-green-200 p-6 shadow-lg">

        <p className="text-emerald-700 font-semibold">
          🏆 Strongest Topic
        </p>

        <h2 className="text-3xl font-bold mt-3 text-slate-800">
          {strongest?.name || "--"}
        </h2>

        <p className="text-slate-500 mt-2">
          {strongest?.solved || 0} Problems Solved
        </p>

      </div>

      {/* Weakest */}

      <div className="rounded-3xl bg-gradient-to-br from-rose-50 to-red-100 border border-red-200 p-6 shadow-lg">

        <p className="text-red-700 font-semibold">
          📉 Weakest Topic
        </p>

        <h2 className="text-3xl font-bold mt-3 text-slate-800">
          {weakest?.name || "--"}
        </h2>

        <p className="text-slate-500 mt-2">
          {weakest?.solved || 0} Problems Solved
        </p>

      </div>

    </div>
  );
}