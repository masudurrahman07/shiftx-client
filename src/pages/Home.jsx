import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClipboard, FiShield, FiZap, FiSmartphone } from "react-icons/fi";
import { AuthContext } from "../providers/AuthProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const featureCards = [
  {
    title: "Task Management",
    description: "Plan, assign, and track every task with a clean board designed for focus.",
    icon: FiClipboard,
  },
  {
    title: "Secure Authentication",
    description: "Safe login and user sessions keep your workspace protected at every step.",
    icon: FiShield,
  },
  {
    title: "Fast Performance",
    description: "Experience smooth interactions and fast loading across every screen.",
    icon: FiZap,
  },
  {
    title: "Responsive Design",
    description: "ShiftX looks great on mobile, tablet, and desktop without compromise.",
    icon: FiSmartphone,
  },
];

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.26),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_18%)]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-40 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-72 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <section className="relative px-6 pt-24 pb-20 sm:pt-28 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-200/80 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              Modern SaaS task platform
            </span>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Move work forward with a
              <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">modern productivity engine.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              ShiftX gives teams a polished workspace for planning, collaborating, and shipping tasks quickly.
              Built with speed, security, and beautiful design in mind.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/20 transition-transform duration-300 hover:-translate-y-1"
                  >
                    Open Dashboard
                  </Link>
                  <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200">
                    {user?.email || "Logged In"}
                  </span>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/20 transition-transform duration-300 hover:-translate-y-1"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-slate-100 transition hover:border-violet-400"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
              Why choose ShiftX
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Built for teams that expect more from their task workflow.
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-300">
              ShiftX combines intelligent task organization with premium visual polish, so your team can move faster while staying aligned and secure.
            </p>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-cyan-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Unified workspaces</h3>
                  <p className="mt-2 text-slate-400">Keep tasks, status, and team context in one elegant dashboard.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-fuchsia-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Faster decisions</h3>
                  <p className="mt-2 text-slate-400">Move from planning to action with instant clarity and fewer clicks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-violet-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Security by design</h3>
                  <p className="mt-2 text-slate-400">Protect your team and data with robust authentication and layer security.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="glass flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="rounded-3xl bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-400/10 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Launch faster</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">From inbox to done in one elegant flow.</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Ready-to-use task boards across every project.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Mobile-friendly pages with smooth responsive scaling.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-400">Subtle motion and polished interactions make work feel premium.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-10 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Ready to level up</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Make ShiftX the center of your team’s daily workflow.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                A premium experience for teams that want clean task operations, secure access, and faster delivery in one polished workspace.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition-transform duration-300 hover:-translate-y-1"
              >
                {user ? "Go to Dashboard" : "Start Free Trial"}
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
