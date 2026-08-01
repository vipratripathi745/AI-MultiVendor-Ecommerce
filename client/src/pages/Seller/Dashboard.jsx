import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Sidebar from "../../components/Seller/Sidebar";
import { getSellerAnalytics } from "../../services/analyticsService";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getSellerAnalytics();
      setAnalytics(response.analytics);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  const dashboard = analytics?.dashboard || {};

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

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Products
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {dashboard.total_products || 0}
                </h2>

              </div>

              <div className="bg-blue-100 p-5 rounded-2xl">

                <FaBoxOpen className="text-3xl text-blue-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Orders
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {dashboard.total_orders || 0}
                </h2>

              </div>

              <div className="bg-green-100 p-5 rounded-2xl">

                <FaShoppingCart className="text-3xl text-green-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Revenue
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  ₹{dashboard.total_revenue || 0}
                </h2>

              </div>

              <div className="bg-yellow-100 p-5 rounded-2xl">

                <FaRupeeSign className="text-3xl text-yellow-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Top Products
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {analytics?.topProducts?.length || 0}
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

        {/* Top Products */}

        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Top Selling Products
          </h2>

          {analytics?.topProducts?.length > 0 ? (

            <div className="space-y-4">

              {analytics.topProducts.map((product, index) => (

                <div
                  key={index}
                  className="flex justify-between border-b pb-3"
                >

                  <span className="font-semibold">
                    {product.name}
                  </span>

                  <span className="text-blue-600">
                    {product.sold} Sold
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No product sales yet.
            </p>

          )}

        </div>

        {/* Recent Orders */}

        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Orders
          </h2>

          {analytics?.recentOrders?.length > 0 ? (

            <div className="space-y-4">

              {analytics.recentOrders.map((order) => (

                <div
                  key={order.id}
                  className="flex justify-between border-b pb-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {order.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {order.status}
                    </p>

                  </div>

                  <span className="font-bold text-green-600">
                    ₹{order.total_amount}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No recent orders.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;