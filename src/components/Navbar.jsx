import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-1 transition ${
      isActive
        ? "text-purple-400 border-b border-purple-400"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-10 h-16 bg-[#0b1326]/80 backdrop-blur-xl border-b border-white/10">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        ShiftX
      </Link>

      {/* Navigation */}
      <div className="hidden md:flex gap-6">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
      </div>

      {/* Auth */}
      <div className="flex gap-3">
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:border-purple-400 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}