export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="text-gray-400 mt-2">
            Manage tasks, track progress, and stay productive.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition">
          + Create Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">24</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm">Completed</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">18</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm">In Progress</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">4</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm">Overdue</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">2</h2>
        </div>

      </div>

      {/* TASK SECTION */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Recent Tasks
        </h2>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white">
            All
          </button>

          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            Completed
          </button>

          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            Pending
          </button>
        </div>
      </div>

      {/* TASK GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD 1 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500/50 transition">

          <div className="flex justify-between items-start">
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
              Completed
            </span>

            <input type="checkbox" checked readOnly />
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Design System Audit
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Review Material UI updates and align all reusable components.
          </p>

          <div className="mt-5 flex justify-between text-sm text-gray-500">
            <span>Due: Jun 12</span>
            <span>UI Team</span>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500/50 transition">

          <div className="flex justify-between items-start">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400">
              In Progress
            </span>

            <input type="checkbox" />
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            API Integration
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Connect backend services and implement JWT authentication.
          </p>

          <div className="mt-5 flex justify-between text-sm text-gray-500">
            <span>Due: Jun 15</span>
            <span>Backend</span>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500/50 transition">

          <div className="flex justify-between items-start">
            <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400">
              Pending
            </span>

            <input type="checkbox" />
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Deploy Production Build
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Prepare frontend deployment and configure environment variables.
          </p>

          <div className="mt-5 flex justify-between text-sm text-gray-500">
            <span>Due: Jun 18</span>
            <span>DevOps</span>
          </div>
        </div>

      </div>

    </div>
  );
}