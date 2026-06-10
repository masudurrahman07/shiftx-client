import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../services/api";
import Swal from "sweetalert2";

export default function EditTaskModal({ open, onClose, task, onTaskUpdated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    completed: false,
  });

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task?._id) {
      console.error("Missing task ID");
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

      const res = await api.patch(`/tasks/${task._id}`, payload);

      onTaskUpdated?.(res.data);

      await Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "Your task has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#8b5cf6",
        backdrop: "rgba(15,23,42,0.75)",
      });

      onClose();
    } catch (err) {
      console.error("Update failed:", err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the task.",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#ef4444",
        backdrop: "rgba(15,23,42,0.75)",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="edit-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-bold mb-5">Edit Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Title"
                required/>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Description"
                rows="4"/>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-slate-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="low" className="bg-slate-800 text-white">Low Priority</option>
                <option value="medium" className="bg-slate-800 text-white">Medium Priority</option>
                <option value="high" className="bg-slate-800 text-white">High Priority</option>
              </select>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"/>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="completed"
                  checked={form.completed}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/10 bg-slate-900 text-purple-500 focus:ring-purple-500"/>Completed
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl border border-white/20 text-slate-200 transition hover:bg-white/5">
                  Cancel
                </button>
                <motion.button
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-white transition disabled:opacity-60">
                  {loading ? "Saving..." : "Update"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
