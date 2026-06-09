import { useEffect, useState } from "react";
import api from "../services/api";

export default function EditTaskModal({
  open,
  onClose,
  task,
  onTaskUpdated,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    completed: false,
  });

  const [loading, setLoading] = useState(false);

  // Sync form when task changes
  useEffect(() => {
    if (!task) return;

    setForm({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "medium",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      completed: Boolean(task.completed),
    });
  }, [task]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task || !task._id) {
      console.error("Missing task or task._id");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        description: form.description,
        priority: form.priority,
        completed: form.completed,
      };

      if (form.dueDate !== "") {
        payload.dueDate = form.dueDate;
      }

      const res = await api.patch(
        `/tasks/${task._id}`,
        payload
      );

      // IMPORTANT: always use backend response
      if (onTaskUpdated) {
        onTaskUpdated(res.data);
      }

      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Safety: don't render if closed
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f172a] w-full max-w-md rounded-2xl border border-white/10 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
            placeholder="Title"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
            placeholder="Description"
            rows="4"
          />

          {/* PRIORITY */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* DUE DATE */}
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          />

          {/* COMPLETED */}
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="completed"
              checked={form.completed}
              onChange={handleChange}
            />
            Completed
          </label>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-white/20 rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-semibold"
            >
              {loading ? "Saving..." : "Update"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}