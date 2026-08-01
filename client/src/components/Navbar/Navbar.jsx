import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { useSearch } from "../../context/SearchContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { search, setSearch } = useSearch();

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
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-full py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <FaSearch className="absolute left-4 top-3 text-gray-400" />

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <Link
            to="/wishlist"
            className="relative text-xl hover:text-red-500 transition"
          >
            <FaHeart />
          </Link>

          <Link
            to="/cart"
            className="relative text-xl hover:text-blue-600 transition"
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

            <div className="flex items-center gap-4">

              {/* Profile */}

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                  {user.name.charAt(0).toUpperCase()}

                </div>

                <div className="hidden lg:block">

                  <h3 className="font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>

                </div>

              </Link>

              {/* Orders */}

              <Link
                to="/orders"
                className="hidden md:flex items-center gap-2 hover:text-blue-600 transition"
              >

                <FaClipboardList />

                <span>
                  Orders
                </span>

              </Link>

              {/* Seller */}

              {user.role === "seller" && (

                <Link
                  to="/seller/dashboard"
                  className="hidden lg:block font-semibold text-blue-600 hover:text-blue-800"
                >
                  Seller
                </Link>

              )}

              {/* Admin */}

              {user.role === "admin" && (

                <Link
                  to="/admin/dashboard"
                  className="hidden lg:block font-semibold text-red-600 hover:text-red-700"
                >
                  Admin
                </Link>

              )}

              {/* Logout */}

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
              >

                <FaSignOutAlt />

                <span className="hidden md:block">
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;