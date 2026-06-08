export default function TaskCard({
  task,
  onToggle,
  onDelete,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-indigo-500/40 transition">

      <div className="flex justify-between items-start">

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            task.completed
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
      </div>

      <h3 className="mt-4 font-semibold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-400 text-sm mt-2">
        {task.description}
      </p>

      <button
        onClick={() => onDelete(task._id)}
        className="mt-5 text-red-400 text-sm"
      >
        Delete
      </button>
    </div>
  );
}