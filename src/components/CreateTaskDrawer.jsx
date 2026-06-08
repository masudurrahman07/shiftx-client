import { useState } from "react";
import api from "../services/api";

export default function CreateTaskDrawer({ open, onClose, onTaskCreated }) {
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
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0f172a] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <h2 className="text-2xl font-bold">Create Task</h2>

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
            rows="4"
          />

          {/* PRIORITY */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          {/* DUE DATE */}
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          />

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
              className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}