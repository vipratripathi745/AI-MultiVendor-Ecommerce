import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChartLine } from "react-icons/fa";

import { getAdminAnalytics } from "../../services/analyticsService";

import DashboardCards from "../../components/Admin/DashboardCards";
import RevenueChart from "../../components/Admin/RevenueChart";
import OrdersPieChart from "../../components/Admin/OrdersPieChart";
import TopProductsChart from "../../components/Admin/TopProductsChart";
import EmptyState from "../../components/Common/EmptyState";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAdminAnalytics();

      setAnalytics(response.analytics);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Analytics...
      </div>
    );
  }
  if (!analytics) {
    return (
      <EmptyState
        title="Analytics Not Available"
        description="Analytics data will appear once your platform has users, products and orders."
        buttonText="Go to Dashboard"
        buttonLink="/admin/dashboard"
      />
    );
  }


  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold flex items-center gap-4">

            <FaChartLine className="text-indigo-600" />

            Analytics Dashboard

          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Monitor business growth, revenue and platform performance.
          </p>

        </div>

        {/* Dashboard Cards */}

        <DashboardCards
          dashboard={analytics.dashboard}
        />

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Monthly Revenue
            </h2>

            <RevenueChart
              data={analytics.monthlyRevenue}
            />

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Order Status
            </h2>

            <OrdersPieChart
              data={analytics.orderStatus}
            />

          </div>

        </div>

        {/* Top Products */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Top Selling Products
          </h2>

          <TopProductsChart
            data={analytics.topProducts}
          />

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-3xl shadow-xl mt-10 overflow-hidden">

          <div className="px-6 py-5 border-b">

            <h2 className="text-2xl font-bold">
              Recent Orders
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {analytics.recentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-5 font-semibold">
                      {order.name}
                    </td>

                    <td className="px-6 py-5">

                      <span className="font-bold text-green-600 text-lg">
                        ₹{order.total_amount}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-gray-600">

                      {new Date(
                        order.created_at
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;