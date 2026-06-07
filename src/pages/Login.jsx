import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1326] text-[#dae2fd] relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
      >

        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          ShiftX Login
        </h1>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-[#171f33] border border-white/10 outline-none focus:border-indigo-400"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#171f33] border border-white/10 outline-none focus:border-indigo-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-gray-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-black hover:scale-[1.02] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          No account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}