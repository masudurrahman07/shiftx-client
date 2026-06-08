import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <section className="py-24">

      <div className="max-w-6xl mx-auto text-center">

        <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm mb-8">
          Modern SaaS Task Management
        </div>

        <h1 className="text-6xl font-bold leading-tight">
          Organize Work.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ship Faster.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-400">
          ShiftX helps teams manage tasks, prioritize work,
          track deadlines, and stay productive with a modern,
          distraction-free workspace.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white hover:scale-105 transition"
              >
                Open Dashboard
              </Link>

              <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5">
                {user?.email || "Logged In"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white hover:scale-105 transition"
              >
                Get Started Free
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-purple-500 transition"
              >
                Sign In
              </Link>
            </>
          )}

        </div>

      </div>

    </section>
  );
}