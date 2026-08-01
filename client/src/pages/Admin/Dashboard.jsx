import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import Sidebar from "../../components/Admin/Sidebar";
import { getAdminAnalytics } from "../../services/analyticsService";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAdminAnalytics();
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

        <h1 className="text-5xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between">

              <div>

                <p>Total Users</p>

                <h2 className="text-4xl font-bold mt-3">
                  {dashboard.total_users}
                </h2>

              </div>

              <FaUsers className="text-5xl text-blue-600" />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between">

              <div>

                <p>Total Products</p>

                <h2 className="text-4xl font-bold mt-3">
                  {dashboard.total_products}
                </h2>

              </div>

              <FaBoxOpen className="text-5xl text-green-600" />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between">

              <div>

                <p>Total Orders</p>

                <h2 className="text-4xl font-bold mt-3">
                  {dashboard.total_orders}
                </h2>

              </div>

              <FaShoppingCart className="text-5xl text-orange-500" />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between">

              <div>

                <p>Total Revenue</p>

                <h2 className="text-4xl font-bold mt-3">
                  ₹{dashboard.total_revenue}
                </h2>

              </div>

              <FaRupeeSign className="text-5xl text-red-500" />

            </div>

          </div>

        </div>

        {/* Top Products */}

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Top Selling Products
          </h2>

          {analytics?.topProducts?.length > 0 ? (

            <div className="space-y-4">

              {analytics.topProducts.map((product,index)=>(
                <div
                  key={index}
                  className="flex justify-between border-b pb-3"
                >

                  <span>{product.name}</span>

                  <span className="font-bold text-blue-600">
                    {product.sold} Sold
                  </span>

                </div>
              ))}

            </div>

          ) : (

            <p>No Product Sales Yet.</p>

          )}

        </div>

        {/* Recent Orders */}

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Orders
          </h2>

          {analytics?.recentOrders?.length > 0 ? (

            <div className="space-y-4">

              {analytics.recentOrders.map((order)=>(
                <div
                  key={order.id}
                  className="flex justify-between border-b pb-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {order.name}
                    </h3>

                    <p className="text-gray-500">
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

            <p>No Orders Found.</p>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;