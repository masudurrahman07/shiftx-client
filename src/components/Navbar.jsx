import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <FiHome />
          ShiftX
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-sm text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-sm text-gray-700 hover:text-gray-900">About</Link>
        </div>
      </div>
    </nav>
  )
}
