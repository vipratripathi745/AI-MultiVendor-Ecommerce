import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAdminAnalytics } from "../../services/analyticsService";

import DashboardCards from "../../components/Admin/DashboardCards";
import RevenueChart from "../../components/Admin/RevenueChart";
import OrdersPieChart from "../../components/Admin/OrdersPieChart";
import TopProductsChart from "../../components/Admin/TopProductsChart";

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
      <div className="text-center py-20 text-3xl">
        Loading Analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-20 text-3xl">
        Analytics Not Available
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Analytics Dashboard
      </h1>

      {/* Dashboard Cards */}

      <DashboardCards
        dashboard={analytics.dashboard}
      />

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <RevenueChart
          data={analytics.monthlyRevenue}
        />

        <OrdersPieChart
          data={analytics.orderStatus}
        />

      </div>

      {/* Top Products */}

      <div className="mt-10">

        <TopProductsChart
          data={analytics.topProducts}
        />

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="text-left">
                Amount
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {analytics.recentOrders.map(
              (order) => (

                <tr
                  key={order.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {order.name}
                  </td>

                  <td>
                    ₹{order.total_amount}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                        ${
                          order.status ===
                          "Delivered"
                            ? "bg-green-600"
                            : order.status ===
                              "Pending"
                            ? "bg-yellow-500"
                            : order.status ===
                              "Cancelled"
                            ? "bg-red-600"
                            : "bg-blue-600"
                        }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Analytics;