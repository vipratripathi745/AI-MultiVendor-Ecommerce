import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}

      <Navbar />

      {/* Main Content */}

      <main className="flex-1">

        <Outlet />

      </main>

      {/* Footer */}

      <Footer />

    </div>
  );
}

export default MainLayout;