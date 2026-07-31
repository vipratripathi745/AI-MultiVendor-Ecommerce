import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          AI Shop
        </Link>

        {/* Search Bar */}
        <div className="w-2/5">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/wishlist"
            className="text-xl hover:text-red-500 transition"
          >
            <FaHeart />
          </Link>

          <Link
            to="/cart"
            className="text-xl hover:text-blue-500 transition"
          >
            <FaShoppingCart />
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/seller/dashboard"
                className="font-medium hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-2">
                <FaUserCircle className="text-2xl text-green-600" />

                <span className="font-medium">
                  {user?.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-green-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;