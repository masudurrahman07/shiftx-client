import React from 'react'

export default function TaskCard({ task }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="font-semibold">{task?.title || 'Task Title'}</h3>
      <p className="text-sm text-gray-600 mt-1">{task?.description || 'Task description placeholder.'}</p>
    </div>
  )
}
