import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaClock,
  FaCog,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { getDashboard } from "../../services/dashboardService";

import StatCard from "../../components/Admin/StatCard";
import RecentOrders from "../../components/Admin/RecentOrders";
import RecentUsers from "../../components/Admin/RecentUsers";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setStats(response.stats);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Monitor users, products, orders and business performance.
          </p>

        </div>

        {/* Main Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Users"
            value={stats.total_users}
            color="bg-blue-600"
            icon={<FaUsers />}
          />

          <StatCard
            title="Products"
            value={stats.total_products}
            color="bg-green-600"
            icon={<FaBoxOpen />}
          />

          <StatCard
            title="Orders"
            value={stats.total_orders}
            color="bg-purple-600"
            icon={<FaShoppingCart />}
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.total_revenue}`}
            color="bg-red-600"
            icon={<FaRupeeSign />}
          />

        </div>

        {/* Order Status */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Order Status
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

            <StatCard
              title="Pending"
              value={stats.pending_orders}
              color="bg-yellow-500"
              icon={<FaClock />}
            />

            <StatCard
              title="Processing"
              value={stats.processing_orders}
              color="bg-blue-500"
              icon={<FaCog />}
            />

            <StatCard
              title="Shipped"
              value={stats.shipped_orders}
              color="bg-indigo-500"
              icon={<FaTruck />}
            />

            <StatCard
              title="Delivered"
              value={stats.delivered_orders}
              color="bg-green-600"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Cancelled"
              value={stats.cancelled_orders}
              color="bg-red-500"
              icon={<FaTimesCircle />}
            />

          </div>

        </div>

        {/* Recent Data */}

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Orders
            </h2>

            <RecentOrders
              orders={stats.latestOrders}
            />

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              New Users
            </h2>

            <RecentUsers
              users={stats.latestUsers}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;