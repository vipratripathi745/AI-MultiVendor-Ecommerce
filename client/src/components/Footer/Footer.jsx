import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-white">

              AI<span className="text-blue-500">Shop</span>

            </h2>

            <p className="mt-5 leading-7">

              AI Shop is your trusted destination for premium
              electronics, fashion, accessories and much more.
              Shop with confidence and enjoy secure payments
              with fast delivery.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-xl font-bold mb-5">

              Quick Links

            </h3>

            <div className="flex flex-col gap-3">

              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>

              <Link to="/wishlist" className="hover:text-blue-400 transition">
                Wishlist
              </Link>

              <Link to="/cart" className="hover:text-blue-400 transition">
                Cart
              </Link>

              <Link to="/orders" className="hover:text-blue-400 transition">
                Orders
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white text-xl font-bold mb-5">

              Contact

            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <FaPhoneAlt className="text-blue-400" />

                +91 6264581136

              </div>

              <div className="flex items-center gap-3">

                <FaEnvelope className="text-blue-400" />

                support@aishop.com

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-blue-400" />

                Jaipur, Rajasthan

              </div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-white text-xl font-bold mb-5">

              Follow Us

            </h3>

            <div className="flex gap-4 text-2xl">

              <a href="#" className="hover:text-blue-500 transition">
                <FaFacebook />
              </a>

              <a href="https://www.instagram.com/mr.__vipra" className="hover:text-pink-500 transition">
                <FaInstagram />
              </a>

              <a href="#" className="hover:text-blue-400 transition">
                <FaLinkedin />
              </a>

              <a href="https://github.com/vipratripathi745" className="hover:text-white transition">
                <FaGithub />
              </a>

            </div>

          </div>

        </div>

        <hr className="my-10 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p>

            © 2026 AI Shop. All Rights Reserved.

          </p>

          <p className="text-sm text-gray-400">

            Built with ❤️ using React, Node.js & PostgreSQL

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;