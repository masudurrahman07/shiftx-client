export default function Dashboard() {
  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-gray-400">
          You have 12 tasks remaining for this sprint
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD */}
        <div className="glass rounded-2xl p-6 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />

          <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
            Completed
          </span>

          <h3 className="mt-3 font-bold">Design System Audit</h3>
          <p className="text-gray-400 text-sm mt-2">
            Review Material 3 updates and align components
          </p>

          <div className="mt-5 flex justify-between">
            <input type="checkbox" defaultChecked />
          </div>
        </div>

      </div>

    </div>
  );
}