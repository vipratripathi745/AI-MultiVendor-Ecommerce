import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUserCircle } from "react-icons/fa";

function Navbar() {
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
        <div className="flex items-center gap-6 text-xl">

          <Link
            to="/wishlist"
            className="hover:text-red-500 transition"
          >
            <FaHeart />
          </Link>

          <Link
            to="/cart"
            className="hover:text-blue-500 transition"
          >
            <FaShoppingCart />
          </Link>

          <Link
            to="/login"
            className="hover:text-green-500 transition"
          >
            <FaUserCircle />
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;