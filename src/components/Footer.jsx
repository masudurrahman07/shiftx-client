export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-white/10 bg-surface">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div>
          <h2 className="text-xl font-bold text-primary">ShiftX</h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Smart task management for modern teams.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>

        <div className="text-sm text-gray-500">
          © 2026 ShiftX
        </div>

      </div>
    </footer>
  );
}