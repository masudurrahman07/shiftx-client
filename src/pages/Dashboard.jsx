import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiPlus } from "react-icons/fi";
import api from "../services/api";
import TaskDrawer from "../components/TaskDrawer.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";
import TaskCard from "../components/TaskCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const TASKS_PER_PAGE = 5;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks");

      setTasks(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE TASK
  const handleTaskCreated = (task) => {
    setTasks((prev) => [task, ...prev]);

    // always show newest task on first page
    setCurrentPage(1);
  };

  // TOGGLE COMPLETE
  const toggleTask = async (task) => {
    if (!task?._id) return;

    try {
      const res = await api.patch(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? res.data : t
        )
      );
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Delete Task?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#64748b",
      background: "#0f172a",
      color: "#e2e8f0",
      backdrop: "rgba(15,23,42,0.75)",
    });

    if (!result.isConfirmed) return;

    const prev = [...tasks];

    setTasks((p) =>
      p.filter((t) => t._id !== id)
    );

    try {
      await api.delete(`/tasks/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#8b5cf6",
        backdrop: "rgba(15,23,42,0.75)",
      });
    } catch (err) {
      console.error(err);

      setTasks(prev);

      Swal.fire({
        icon: "error",
        title: "Failed to delete",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#ef4444",
        backdrop: "rgba(15,23,42,0.75)",
      });
    }
  };

  // UPDATE TASK
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === updatedTask._id
          ? updatedTask
          : t
      )
    );
  };

  // FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;

    return matchesSearch && matchesFilter;
  });

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(
    filteredTasks.length / TASKS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * TASKS_PER_PAGE;

  const paginatedTasks =
    filteredTasks.slice(
      startIndex,
      startIndex + TASKS_PER_PAGE
    );

  // if page becomes invalid after delete/filter
  useEffect(() => {
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const completedTasks =
    tasks.filter((t) => t.completed).length;

  const pendingTasks =
    tasks.length - completedTasks;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-screen bg-slate-950 text-slate-100"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl before:absolute before:-left-24 before:-top-24 before:h-72 before:w-72 before:rounded-full before:bg-fuchsia-500/10 before:blur-3xl after:absolute after:-right-24 after:top-20 after:h-72 after:w-72 after:rounded-full after:bg-cyan-400/10 after:blur-3xl">
          <div className="relative z-10 space-y-8">
            <header className="grid gap-6 lg:grid-cols-[1.1fr_auto] lg:items-center">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                  Project Overview
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  My Dashboard
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                  Manage your tasks efficiently with a premium, modern workspace designed for fast decision-making.
                </p>
              </div>

              <div className="flex items-center justify-start gap-3 sm:justify-end">
                <motion.button
                  onClick={() => setDrawerOpen(true)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition"
                >
                  <FiPlus className="h-5 w-5" />
                  Create Task
                </motion.button>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:-translate-y-1 sm:hidden"
                >
                  <FiPlus className="h-5 w-5" />
                </button>
              </div>
            </header>

            <section className="grid gap-6 md:grid-cols-3">
              <Stat label="Total Tasks" value={tasks.length} />
              <Stat label="Completed" value={completedTasks} color="text-emerald-400" />
              <Stat label="Pending" value={pendingTasks} color="text-amber-400" />
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.8fr_1fr] xl:grid-cols-[1.8fr_0.9fr_0.9fr]">
              <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 shadow-xl shadow-black/20 transition hover:-translate-y-0.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-tr-3xl rounded-br-3xl bg-gradient-to-b from-violet-500 to-cyan-400" />
                <div className="relative flex items-center gap-3 px-4 py-3">
                  <FiSearch className="h-5 w-5 text-slate-300" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 shadow-xl shadow-black/20 transition hover:-translate-y-0.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-tr-3xl rounded-br-3xl bg-gradient-to-b from-fuchsia-500 to-purple-500" />
                <label className="sr-only" htmlFor="filter-select">
                  Filter tasks
                </label>
                <div className="flex items-center gap-3 px-4 py-3">
                  <FiChevronDown className="h-5 w-5 text-slate-300" />
                  <select
                    id="filter-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full appearance-none bg-transparent text-slate-100 focus:outline-none"
                  >
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {filteredTasks.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-12 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mx-auto mb-8 flex h-44 w-44 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-cyan-400/15 shadow-inner">
                <div className="h-24 w-24 rounded-3xl bg-slate-950/90" />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Nothing here yet</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Your task list is empty.</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
                Create your first task or adjust the filters to discover existing items. Your productivity flow begins here.
              </p>
              <motion.button
                onClick={() => setDrawerOpen(true)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition"
              >
                Create task
              </motion.button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {paginatedTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={(task) => setEditingTask(task)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-3 rounded-[1.75rem] border border-white/10 bg-slate-950/80 px-4 py-4 shadow-xl shadow-black/20 backdrop-blur-xl">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <motion.button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      whileHover={{ y: -2, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex min-w-[44px] items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        currentPage === i + 1
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                          : "bg-white/5 text-slate-300 hover:bg-white/15"
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <TaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onTaskCreated={handleTaskCreated}
      />

      <EditTaskModal
        open={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onTaskUpdated={handleTaskUpdated}
      />
    </motion.main>
  );
}

function Stat({ label, value, color = "text-white" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 opacity-80" />
      <p className="text-sm text-slate-400">{label}</p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`mt-4 text-4xl font-semibold ${color}`}
      >
        {value}
      </motion.h2>
    </motion.div>
  );
}
