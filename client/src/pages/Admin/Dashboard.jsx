import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      <div className="text-center py-20 text-3xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Users"
          value={stats.total_users}
          color="bg-blue-600"
        />

        <StatCard
          title="Products"
          value={stats.total_products}
          color="bg-green-600"
        />

        <StatCard
          title="Orders"
          value={stats.total_orders}
          color="bg-purple-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.total_revenue}`}
          color="bg-red-600"
        />

      </div>

      {/* Order Status */}

      <div className="grid md:grid-cols-5 gap-6 mt-10">

        <StatCard
          title="Pending"
          value={stats.pending_orders}
          color="bg-yellow-500"
        />

        <StatCard
          title="Processing"
          value={stats.processing_orders}
          color="bg-blue-500"
        />

        <StatCard
          title="Shipped"
          value={stats.shipped_orders}
          color="bg-indigo-500"
        />

        <StatCard
          title="Delivered"
          value={stats.delivered_orders}
          color="bg-green-500"
        />

        <StatCard
          title="Cancelled"
          value={stats.cancelled_orders}
          color="bg-red-500"
        />

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-8 mt-12">

        <RecentOrders
          orders={stats.latestOrders}
        />

        <RecentUsers
          users={stats.latestUsers}
        />

      </div>

    </div>
  );
}

export default Dashboard;