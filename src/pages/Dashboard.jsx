import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            My Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Track your productivity and manage tasks.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">
          + Create Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400">Total Tasks</p>
          <h2 className="text-4xl font-bold mt-2">
            {tasks.length}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400">Pending</p>
          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {pendingTasks}
          </h2>
        </div>

      </div>

      {/* TASKS */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Your Tasks
        </h2>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="text-xl font-semibold mb-2">
            No Tasks Yet
          </h3>

          <p className="text-gray-400">
            Create your first task to get started.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <div className="flex justify-between items-center mb-4">

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    task.completed
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </span>

                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                />
              </div>

              <h3 className="font-semibold text-lg">
                {task.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {task.description}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}