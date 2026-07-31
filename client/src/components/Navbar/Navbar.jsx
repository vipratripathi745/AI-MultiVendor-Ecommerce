import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

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

        {/* Search */}

        <div className="w-2/5">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link to="/wishlist">
            <FaHeart />
          </Link>

          <Link to="/cart">
            <FaShoppingCart />
          </Link>

          {!user ? (
            <Link to="/login">
              <FaUserCircle />
            </Link>
          ) : (
            <>

              {/* Seller */}

              {user.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="font-semibold"
                >
                  Seller
                </Link>
              )}

              {/* Admin */}

              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="font-semibold text-red-600"
                >
                  Admin
                </Link>
              )}

              <span className="font-semibold">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600"
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