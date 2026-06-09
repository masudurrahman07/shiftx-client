export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}) {
  console.log("TASK ID:", task?._id);
  if (!task?._id) return null; // 🛑 safety guard

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-indigo-500/40 transition">

      <div className="flex justify-between items-start">

        <span className={`text-xs px-3 py-1 rounded-full ${
          task.completed
            ? "bg-green-500/10 text-green-400"
            : "bg-yellow-500/10 text-yellow-400"
        }`}>
          {task.completed ? "Completed" : "Pending"}
        </span>

        <input
          type="checkbox"
          checked={Boolean(task.completed)}
          onChange={() => onToggle?.(task)}
        />
      </div>

      <h3 className="mt-4 font-semibold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-400 text-sm mt-2">
        {task.description}
      </p>

      <div className="mt-3 text-xs text-gray-400">
        Priority: {task.priority || "medium"}
      </div>

      {task.dueDate && (
        <div className="text-xs text-gray-500 mt-1">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      <div className="mt-5 flex justify-end gap-4">

        <button
          onClick={() => onEdit?.(task)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(task._id)}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Delete
        </button>

      </div>
    </div>
  );
}