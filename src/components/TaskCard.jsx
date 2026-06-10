import { motion } from "framer-motion";

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}) {
  if (!task?._id) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl shadow-black/25 hover:border-indigo-500/40">
      <div className="flex justify-between items-start gap-3">
        <span className={`text-xs px-3 py-1 rounded-full ${
          task.completed
            ? "bg-emerald-500/15 text-emerald-400"
            : "bg-amber-500/15 text-amber-400"
        }`}>
          {task.completed ? "Completed" : "Pending"}
        </span>

        <motion.label
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2 text-slate-300">
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => onToggle?.(task)}
            className="h-4 w-4 rounded border-white/10 bg-slate-900 text-purple-500 focus:ring-purple-500"/>
          <span className="text-xs">Toggle</span>
        </motion.label>
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">{task.title}</h3>

      <p className="text-slate-400 text-sm mt-3 leading-6">{task.description}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
        <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1">
          Priority: {task.priority || "medium"}
        </span>
        {task.dueDate && (
          <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={() => onEdit?.(task)}
          className="text-blue-400 hover:text-blue-300 text-sm transition">
          Edit
        </button>
        <button
          onClick={() => onDelete?.(task._id)}
          className="text-red-400 hover:text-red-300 text-sm transition">
          Delete
        </button>
      </div>
    </motion.div>
  );
}
