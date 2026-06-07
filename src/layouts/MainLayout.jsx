import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      <Navbar />

      <main className="flex-1">
  <div className="max-w-7xl mx-auto px-6 py-8">
    <Outlet />
  </div>
</main>
      <Footer />
    </div>
  );
}