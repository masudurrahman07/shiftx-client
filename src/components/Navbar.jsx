import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-1 transition ${
      isActive
        ? "text-purple-400 border-b border-purple-400"
        : "text-gray-400 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-10 h-16 bg-[#0b1326]/80 backdrop-blur-xl border-b border-white/10">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        ShiftX
      </Link>

      {/* Nav */}
      <div className="hidden md:flex gap-6">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      </div>

      {/* AUTH AREA */}
      {!user ? (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/10"
          >
            Profile ▾
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-[#111a2e] border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full text-left px-4 py-2 hover:bg-white/10"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}