export default function Home() {
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto text-center">

      <h1 className="text-5xl font-bold">
        ShiftX — Smart Task Management
      </h1>

      <p className="text-gray-400 mt-4 max-w-xl mx-auto">
        Organize tasks, track progress, and boost productivity.
      </p>

      <div className="mt-8 flex gap-4 justify-center">
        <a className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-black rounded-xl"
           href="/register">
          Get Started
        </a>

        <a className="px-6 py-3 border border-white/20 rounded-xl"
           href="/login">
          Login
        </a>
      </div>

    </div>
  )
}