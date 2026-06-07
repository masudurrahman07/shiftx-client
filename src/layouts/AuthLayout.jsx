import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1326] text-[#dae2fd] relative overflow-hidden">

      {/* Background glow (ShiftX style) */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full bottom-[-10%] left-[-10%]" />

      {/* Top mini brand */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          ShiftX
        </Link>
      </div>

      {/* Auth page content */}
      <div className="w-full flex items-center justify-center px-4 z-10">
        <Outlet />
      </div>

    </div>
  );
}