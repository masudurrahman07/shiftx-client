import React from 'react'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskCard />
          <TaskCard />
        </div>
      </main>
    </div>
  )
}
