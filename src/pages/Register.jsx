import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="bg-[#171f33]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-8">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-gray-400 mt-2">Join ShiftX and start managing your work smarter</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-white/10 focus:border-purple-500 focus:outline-none"
              placeholder="Type Your Name"/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-white/10 focus:border-purple-500 focus:outline-none"
              placeholder="Type Your Email" />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-white/10 focus:border-purple-500 focus:outline-none"
              placeholder="Enter password" />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-white/10 focus:border-purple-500 focus:outline-none"
              placeholder="Confirm password"/>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
