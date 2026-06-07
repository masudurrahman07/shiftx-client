import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        Create Account
      </h1>

      <input
        className="w-full mb-3 p-3 rounded-lg bg-[#0b1326] border border-white/10"
        placeholder="Name"
      />

      <input
        className="w-full mb-3 p-3 rounded-lg bg-[#0b1326] border border-white/10"
        placeholder="Email"
      />

      <input
        className="w-full mb-4 p-3 rounded-lg bg-[#0b1326] border border-white/10"
        placeholder="Password"
        type="password"
      />

      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-black font-semibold">
        Register
      </button>

      <p className="text-sm text-center mt-4 text-gray-400">
        Already have account?{" "}
        <Link to="/login" className="text-indigo-400">
          Login
        </Link>
      </p>

    </div>
  );
}