import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";

export default function TaskDrawer({ open, onClose, onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/tasks", {
        title: form.title,
        description: form.description,
        priority: form.priority,
        dueDate: form.dueDate || null,
      });

      onTaskCreated(res.data);

      await Swal.fire({
        icon: "success",
        title: "Task Created!",
        text: "Your task has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#8b5cf6",
        backdrop: "rgba(15,23,42,0.75)",
      });

      setForm({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });

      onClose();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: "Failed to create task. Please try again.",
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
      {open && (
        <motion.div
          key="task-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex">
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="relative ml-auto h-full w-full max-w-md overflow-y-auto bg-[#0f172a] border-l border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <h2 className="text-2xl font-bold">Create Task</h2>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required/>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"/>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-slate-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="low" className="bg-slate-800 text-white">
                  Low Priority
                </option>
                <option value="medium" className="bg-slate-800 text-white">
                  Medium Priority
                </option>
                <option value="high" className="bg-slate-800 text-white">
                  High Priority
                </option>
              </select>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"/>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl border border-white/20 text-slate-200 transition hover:bg-white/5">
                  Cancel</button>
                <motion.button
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white transition disabled:opacity-60">
                  {loading ? "Creating..." : "Create"}
                </motion.button>
              </div>
            </form>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
