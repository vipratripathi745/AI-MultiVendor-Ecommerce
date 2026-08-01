import {
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Seller/Sidebar";

function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Seller Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Welcome back! Manage your products and track your business.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Products
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  0
                </h2>

              </div>

              <div className="bg-blue-100 p-5 rounded-2xl">

                <FaBoxOpen className="text-3xl text-blue-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Orders
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  0
                </h2>

              </div>

              <div className="bg-green-100 p-5 rounded-2xl">

                <FaShoppingCart className="text-3xl text-green-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Revenue
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  ₹0
                </h2>

              </div>

              <div className="bg-yellow-100 p-5 rounded-2xl">

                <FaRupeeSign className="text-3xl text-yellow-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Pending Orders
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  0
                </h2>

              </div>

              <div className="bg-red-100 p-5 rounded-2xl">

                <FaShoppingCart className="text-3xl text-red-600" />

              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-5">

            <Link
              to="/seller/add-product"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition"
            >

              <FaPlus />

              Add Product

            </Link>

            <Link
              to="/seller/products"
              className="bg-gray-800 hover:bg-black text-white px-8 py-4 rounded-2xl transition"
            >

              My Products

            </Link>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="text-center py-12 text-gray-500">

            <FaBoxOpen className="text-6xl mx-auto mb-5 text-gray-300" />

            <p className="text-lg">
              No recent activity available.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;