import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}

        <div>

          <h1 className="text-3xl font-extrabold text-blue-400">

            AIShop

          </h1>

          <p className="text-gray-400 mt-5 leading-7">

            AIShop is a modern multi-vendor eCommerce
            platform where customers can shop,
            sellers can manage products, and
            administrators can monitor the entire
            marketplace.

          </p>

          <div className="flex gap-4 mt-6">

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://github.com/vipratripathi745"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
            >
              <FaGithub />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div>

          <h2 className="text-xl font-bold mb-5">

            Quick Links

          </h2>

          <div className="space-y-3">

            <Link
              to="/"
              className="block text-gray-400 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="block text-gray-400 hover:text-white"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="block text-gray-400 hover:text-white"
            >
              Wishlist
            </Link>

            <Link
              to="/orders"
              className="block text-gray-400 hover:text-white"
            >
              My Orders
            </Link>

          </div>

        </div>

        {/* Customer */}

        <div>

          <h2 className="text-xl font-bold mb-5">

            Customer Service

          </h2>

          <div className="space-y-3 text-gray-400">

            <p>Help Center</p>

            <p>Shipping Policy</p>

            <p>Return Policy</p>

            <p>Privacy Policy</p>

            <p>Terms & Conditions</p>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h2 className="text-xl font-bold mb-5">

            Contact

          </h2>

          <div className="space-y-4 text-gray-400">

            <div className="flex gap-3">

              <FaMapMarkerAlt className="mt-1" />

              <span>
                Jaipur, Rajasthan, India
              </span>

            </div>

            <div className="flex gap-3">

              <FaPhone className="mt-1" />

              <span>+91 9876543210</span>

            </div>

            <div className="flex gap-3">

              <FaEnvelope className="mt-1" />

              <span>
                support@aishop.com
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center text-gray-400">

        © {new Date().getFullYear()} AIShop •
        Multi Vendor E-Commerce Platform.
        Built with ❤️ using React, Node.js &
        MySQL.

      </div>

    </footer>
  );
}

export default Footer;