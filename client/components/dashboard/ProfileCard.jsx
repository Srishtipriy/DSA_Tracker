export default function ProfileCard({
  name,
  leetcodeUrl,
  hackerrankUrl,
}) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/50 p-6">

      {/* Header */}
      <div className="flex items-center gap-5">

        {/* Avatar */}
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">

          {name ? name.charAt(0).toUpperCase() : "U"}

        </div>

        {/* User */}
        <div className="flex-1">

          <p className="text-xs uppercase tracking-widest text-gray-400">
            Welcome Back
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {name || "DSA Explorer"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Keep improving every day 🚀
          </p>

        </div>

      </div>

      {/* Divider */}

      <div className="my-5 border-t border-gray-200"></div>

      {/* Profiles */}

      <div className="grid grid-cols-2 gap-4">

        {/* Leetcode */}

        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-4">

          <p className="font-semibold text-orange-700">
            🟠 LeetCode
          </p>

          {leetcodeUrl ? (
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline break-all mt-2 block"
            >
              Open Profile ↗
            </a>
          ) : (
            <p className="text-sm text-gray-400 mt-2">
              Not Connected
            </p>
          )}

        </div>

        {/* HackerRank */}

        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">

          <p className="font-semibold text-emerald-700">
            🟢 HackerRank
          </p>

          {hackerrankUrl ? (
            <a
              href={hackerrankUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline break-all mt-2 block"
            >
              Open Profile ↗
            </a>
          ) : (
            <p className="text-sm text-gray-400 mt-2">
              Optional
            </p>
          )}

        </div>

      </div>

    </div>
  );
}