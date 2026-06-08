import { useEffect, useState } from "react";
import api from "../services/api";
import CreateTaskDrawer from "../components/CreateTaskDrawer";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading tasks...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Dashboard</h1>

          <p className="text-gray-400 mt-2">
            Track your productivity and manage tasks.
          </p>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="
      w-full sm:w-auto
      px-5 py-3
      rounded-xl
      bg-gradient-to-r
      from-purple-500
      to-pink-500
      font-semibold
      hover:scale-105
      transition
      shadow-lg
    "
        >
          + Create Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Stat label="Total Tasks" value={tasks.length} />
        <Stat label="Completed" value={completedTasks} color="text-green-400" />
        <Stat label="Pending" value={pendingTasks} color="text-yellow-400" />
      </div>

      {/* TASKS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between mb-3">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  task.completed
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <h3 className="font-semibold text-lg">{task.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{task.description}</p>
          </div>
        ))}
      </div>

      {/* DRAWER */}
      <CreateTaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}

function Stat({ label, value, color = "text-white" }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-400">{label}</p>
      <h2 className={`text-4xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
