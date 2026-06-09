import { useEffect, useState } from "react";
import api from "../services/api";
import TaskDrawer from "../components/TaskDrawer.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";
import TaskCard from "../components/TaskCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

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
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
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
      });
    } catch (err) {
      console.error(err);

      setTasks(prev);

      Swal.fire({
        icon: "error",
        title: "Failed to delete",
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
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            My Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your tasks efficiently
          </p>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="
            px-5 py-3
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            rounded-xl
            font-semibold
            hidden sm:block
          "
        >
          + Create Task
        </button>

        <button
          onClick={() => setDrawerOpen(true)}
          className="
            w-12 h-12
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            rounded-full
            font-bold
            text-2xl
            flex items-center justify-center
            sm:hidden
          "
        >
          +
        </button>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <Stat
          label="Total Tasks"
          value={tasks.length}
        />

        <Stat
          label="Completed"
          value={completedTasks}
          color="text-green-400"
        />

        <Stat
          label="Pending"
          value={pendingTasks}
          color="text-yellow-400"
        />

      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-8">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search tasks..."
          className="
            flex-1
            px-4
            py-3
            rounded-xl
            bg-white/5
            border
            border-white/10
          "
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="
            px-4
            py-3
            rounded-xl
            bg-white/5
            border
            border-white/10
          "
        >
          <option value="all">All</option>
          <option value="completed">
            Completed
          </option>
          <option value="pending">
            Pending
          </option>
        </select>

      </div>

      {/* TASKS */}
      {filteredTasks.length === 0 ? (
        <div className="
          text-center
          text-gray-400
          p-10
          bg-white/5
          rounded-xl
        ">
          No tasks found
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {paginatedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={(task) =>
                  setEditingTask(task)
                }
              />
            ))}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">

              {Array.from(
                { length: totalPages },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() =>
                      setCurrentPage(i + 1)
                    }
                    className={`
                      px-4 py-2 rounded-lg transition
                      ${
                        currentPage === i + 1
                          ? "bg-purple-500"
                          : "bg-white/10 hover:bg-white/20"
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                )
              )}

            </div>
          )}
        </>
      )}

      {/* CREATE DRAWER */}
      <TaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onTaskCreated={handleTaskCreated}
      />

      {/* EDIT MODAL */}
      <EditTaskModal
        open={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onTaskUpdated={handleTaskUpdated}
      />

    </div>
  );
}

function Stat({
  label,
  value,
  color = "text-white",
}) {
  return (
    <div className="
      bg-white/5
      border
      border-white/10
      rounded-2xl
      p-6
    ">
      <p className="text-gray-400">
        {label}
      </p>

      <h2
        className={`text-4xl font-bold mt-2 ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}