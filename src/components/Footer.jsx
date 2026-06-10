import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 opacity-80" />
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-white">ShiftX</h2>
              <p className="max-w-sm text-sm leading-6 text-slate-400">
                Premium task management for teams that want a polished, secure, and efficient workflow.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Quick links
              </h3>
              <div className="grid gap-3 text-sm text-slate-300">
                <a href="#" className="transition-colors duration-200 hover:text-white">Home</a>
                <a href="#" className="transition-colors duration-200 hover:text-white">Dashboard</a>
                <a href="#" className="transition-colors duration-200 hover:text-white">Features</a>
                <a href="#" className="transition-colors duration-200 hover:text-white">Support</a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Social
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400 hover:text-white">
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400 hover:text-white">
                  <FiGithub className="h-5 w-5" />
                </a>
                <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400 hover:text-white">
                  <FiLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 ShiftX. Designed for modern product teams.</p>
              <p className="text-slate-500">Crafted with Tailwind, Framer Motion, and premium glass styling.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
