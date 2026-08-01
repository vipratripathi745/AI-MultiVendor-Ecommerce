import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          AI<span className="text-gray-900">Shop</span>
        </Link>

        {/* Search */}

        <div className="hidden md:block w-2/5 relative">

          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-full py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <FaSearch className="absolute left-4 top-3 text-gray-400" />

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-6">

          <Link
            to="/wishlist"
            className="text-xl hover:text-red-500 transition"
          >
            <FaHeart />
          </Link>

          <Link
            to="/cart"
            className="text-xl hover:text-blue-600 transition"
          >
            <FaShoppingCart />
          </Link>

          {!user ? (

            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
            >
              <FaUserCircle />
              Login
            </Link>

          ) : (

            <>

              {user.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Seller
                </Link>
              )}

              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="font-semibold text-red-600 hover:text-red-800"
                >
                  Admin
                </Link>
              )}

              <div className="flex items-center gap-2">

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <span className="hidden md:block font-semibold">
                  {user.name}
                </span>

              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;